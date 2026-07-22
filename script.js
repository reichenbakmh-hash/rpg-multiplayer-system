// ==================== CONFIGURATION ====================

const GAME_CONFIG = {
    seasons: {
        spring: { name: 'Printemps', emoji: '🌸', months: [3, 4, 5] },
        summer: { name: 'Été', emoji: '☀️', months: [6, 7, 8] },
        autumn: { name: 'Automne', emoji: '🍂', months: [9, 10, 11] },
        winter: { name: 'Hiver', emoji: '❄️', months: [12, 1, 2] }
    },
    
    questRarities: {
        'E': { name: 'Très facile', xp: 5, color: '#95a5a6', icon: '⭐' },
        'D': { name: 'Facile', xp: 10, color: '#3498db', icon: '⭐' },
        'C': { name: 'Simple', xp: 20, color: '#3498db', icon: '⭐⭐' },
        'B': { name: 'Moyen', xp: 30, color: '#9b59b6', icon: '⭐⭐' },
        'A': { name: 'Difficile', xp: 40, color: '#9b59b6', icon: '⭐⭐⭐' },
        'S': { name: 'Hebdomadaire', xp: 60, color: '#f39c12', icon: '⭐⭐⭐' },
        'SS': { name: 'Mensuelle', xp: 80, color: '#e74c3c', icon: '⭐⭐⭐⭐' },
        'SSS': { name: 'Annuelle', xp: 100, color: '#e74c3c', icon: '⭐⭐⭐⭐⭐' }
    },

    classesInfo: {
        warrior: { emoji: '⚔️', name: 'Guerrier', color: '#e74c3c' },
        mage: { emoji: '🔮', name: 'Mage', color: '#9b59b6' },
        archer: { emoji: '🏹', name: 'Archer', color: '#2ecc71' },
        paladin: { emoji: '✨', name: 'Paladin', color: '#f39c12' }
    },

    // Jours de fêtes internationales
    internationalHolidays: [
        { date: '03-08', name: 'Journée des Femmes', emoji: '👩' },
        { date: '03-21', name: 'Journée Mondiale de l\'Eau', emoji: '💧' },
        { date: '04-22', name: 'Jour de la Terre', emoji: '🌍' },
        { date: '05-01', name: 'Fête du Travail', emoji: '👨‍💼' },
        { date: '06-05', name: 'Journée Mondiale de l\'Environnement', emoji: '🌱' },
        { date: '06-21', name: 'Journée de la Musique', emoji: '🎵' },
        { date: '10-31', name: 'Halloween', emoji: '👻' },
        { date: '12-25', name: 'Noël', emoji: '🎄' }
    ],

    // Fêtes locales à Madagascar
    madagascarHolidays: [
        { date: '01-01', name: 'Nouvel An', emoji: '🎆' },
        { date: '03-29', name: 'Commémoration de la Rébellion de 1947', emoji: '🇲🇬' },
        { date: '05-01', name: 'Fête du Travail', emoji: '👨‍💼' },
        { date: '06-26', name: 'Fête de l\'Indépendance', emoji: '🇲🇬' },
        { date: '08-15', name: 'Assomption', emoji: '⛪' },
        { date: '11-01', name: 'Toussaint', emoji: '🕯️' },
        { date: '12-25', name: 'Noël', emoji: '🎄' }
    ],

    // Fêtes au Japon
    japanHolidays: [
        { date: '01-01', name: 'Nouvel An Japonais', emoji: '🎋' },
        { date: '01-10', name: 'Jour de la Majorité', emoji: '👘' },
        { date: '02-11', name: 'Fondation du Japon', emoji: '🏯' },
        { date: '03-21', name: 'Équinoxe du Printemps', emoji: '🌸' },
        { date: '05-03', name: 'Fête de la Constitution', emoji: '📜' },
        { date: '05-05', name: 'Jour des Enfants', emoji: '🎏' },
        { date: '07-15', name: 'Fête de Obon', emoji: '🏮' },
        { date: '09-23', name: 'Équinoxe d\'Automne', emoji: '🍂' },
        { date: '11-03', name: 'Jour de la Culture', emoji: '🎭' },
        { date: '11-23', name: 'Jour de Remerciement', emoji: '🙏' }
    ]
};

// ==================== DATA MANAGEMENT ====================

class GameData {
    constructor() {
        this.load();
    }

    load() {
        const data = localStorage.getItem('rpg_game_data');
        if (data) {
            const parsed = JSON.parse(data);
            this.players = parsed.players || {};
            this.quests = parsed.quests || {};
            this.raids = parsed.raids || [];
            this.achievements = parsed.achievements || {};
            this.calendar = parsed.calendar || {};
            this.soundEnabled = parsed.soundEnabled !== false;
        } else {
            this.players = {};
            this.quests = {};
            this.raids = [];
            this.achievements = {};
            this.calendar = {};
            this.soundEnabled = true;
        }
    }

    save() {
        const data = {
            players: this.players,
            quests: this.quests,
            raids: this.raids,
            achievements: this.achievements,
            calendar: this.calendar,
            soundEnabled: this.soundEnabled
        };
        localStorage.setItem('rpg_game_data', JSON.stringify(data));
    }

    reset() {
        localStorage.removeItem('rpg_game_data');
        this.load();
    }
}

// ==================== QUEST SYSTEM ====================

class QuestSystem {
    constructor() {
        this.quests = new Map();
        this.generateDailyQuests();
        this.generateWeeklyQuests();
        this.generateMonthlyQuests();
        this.generateAnnualQuests();
        this.generateSpecialQuests();
    }

    generateDailyQuests() {
        const dailyRarities = ['E', 'D', 'C', 'B', 'A'];
        const questTitles = {
    E: ['Boire 2 verres d’eau', 'Marcher 500 pas', 'Lire 1 page d’un livre', 'Faire 5 respirations profondes'],
    D: ['Faire 10 pompes', 'Écrire 3 lignes de journal', 'tenir 2h sans téléphone', 'Envoyer un message à un ami'],
    C: ['Cuisiner un repas maison', 'Apprendre 5 mots en anglais', 'Faire 15 minutes de méditation'],
    B: ['Courir 2 km', 'Compléter une tâche importante', 'Apprendre une nouvelle compétence'],
    A: ['Faire 1 heure de sport', 'Terminer un projet en cours', 'Passer une journée sans réseaux sociaux']
};
        };

        dailyRarities.forEach(rarity => {
            const count = { E: 5, D: 4, C: 3, B: 2, A: 1 }[rarity];
            for (let i = 0; i < count; i++) {
                const questId = `daily_${rarity}_${i}`;
                const titles = questTitles[rarity];
                const quest = {
                    id: questId,
                    type: 'daily',
                    rarity: rarity,
                    title: titles[Math.floor(Math.random() * titles.length)],
                    xp: GAME_CONFIG.questRarities[rarity].xp,
                    gold: Math.floor(GAME_CONFIG.questRarities[rarity].xp * 1.5),
                    difficulty: rarity,
                    completed: false,
                    completedAt: null
                };
                this.quests.set(questId, quest);
            }
        });
    }

    generateWeeklyQuests() {
        const weeklyQuests = [
            { title: 'Nettoyer la chambre', description: 'tout devrait être bien rangé avec pj' },
            { title: 'Trésor caché', description: 'Trouvez un ami qui parle japonais et demandez lui de ses nouvelles en japonais et si vous ne connaissez personne parlez à un inconnu' },
            { title: 'Duel épique', description: 'Battez des ennemis ensemble dans un jeu vidéo' },
            { title: 'Protéger la cité', description: 'Posez votre téléphone et allez vérifier vos objets et déterminez les choses dont vous ne pretez pas attention en général' }
        ];

        const week = Math.floor(new Date().getTime() / (7 * 24 * 60 * 60 * 1000));
        const quest = weeklyQuests[week % weeklyQuests.length];
        
        const questId = `weekly_${week}`;
        this.quests.set(questId, {
            id: questId,
            type: 'weekly',
            rarity: 'S',
            title: quest.title,
            description: quest.description,
            xp: 60,
            gold: 90,
            difficulty: 'S',
            completed: false,
            completedAt: null
        });
    }

    generateMonthlyQuests() {
        const monthlyQuests = [
            { title: 'Dominez le donjons', description: 'Atteignez le 10e étage' },
            { title: 'Maître du combat', description: 'Gagnez 20 combats dans un jeu' },
            { title: 'Trésor des dragons', description: 'Récupérez une somme d argent en faisant une affaire' },
            { title: 'Héros légendaire', description: 'aidez les gens dans leur taches durant plus de 120h' }
        ];

        const month = new Date().toISOString().slice(0, 7);
        const questIndex = parseInt(month.split('-').join('')) % monthlyQuests.length;
        const quest = monthlyQuests[questIndex];

        const questId = `monthly_${month}`;
        this.quests.set(questId, {
            id: questId,
            type: 'monthly',
            rarity: 'SS',
            title: quest.title,
            description: quest.description,
            xp: 80,
            gold: 120,
            difficulty: 'SS',
            completed: false,
            completedAt: null
        });
    }

    generateAnnualQuests() {
        const year = new Date().getFullYear();
        const questId = `annual_${year}`;
        
        if (!this.quests.has(questId)) {
            this.quests.set(questId, {
                id: questId,
                type: 'annual',
                rarity: 'SSS',
                title: 'Conquérir le coeur de plusieurs personnes avec plus de 60 personnes',
                description: 'Devenir le plus grand héros du royaume en aidant un nombre massif de personnes avec plus de 86 personnes',
                xp: 100,
                gold: 200,
                difficulty: 'SSS',
                completed: false,
                completedAt: null
            });
        }
    }

    generateSpecialQuests() {
        const today = new Date();
        const dateStr = `${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
        
        // Vérifier les fêtes internationales
        GAME_CONFIG.internationalHolidays.forEach(holiday => {
            if (holiday.date === dateStr) {
                const questId = `special_${holiday.name}_${today.getFullYear()}`;
                this.quests.set(questId, {
                    id: questId,
                    type: 'special',
                    rarity: 'A',
                    title: `Célébration: ${holiday.name}`,
                    description: `Complétez les défis spéciaux de ${holiday.name}`,
                    emoji: holiday.emoji,
                    xp: 50,
                    gold: 75,
                    difficulty: 'A',
                    completed: false,
                    completedAt: null
                });
            }
        });

        // Vérifier les fêtes à Madagascar
        GAME_CONFIG.madagascarHolidays.forEach(holiday => {
            if (holiday.date === dateStr) {
                const questId = `special_madagascar_${holiday.name}_${today.getFullYear()}`;
                this.quests.set(questId, {
                    id: questId,
                    type: 'special',
                    rarity: 'A',
                    title: `🇲🇬 ${holiday.name}`,
                    description: `Célébrez avec les habitants de Madagascar`,
                    emoji: holiday.emoji,
                    xp: 50,
                    gold: 75,
                    difficulty: 'A',
                    completed: false,
                    completedAt: null
                });
            }
        });

        // Vérifier les fêtes au Japon
        GAME_CONFIG.japanHolidays.forEach(holiday => {
            if (holiday.date === dateStr) {
                const questId = `special_japan_${holiday.name}_${today.getFullYear()}`;
                this.quests.set(questId, {
                    id: questId,
                    type: 'special',
                    rarity: 'A',
                    title: `🏯 ${holiday.name}`,
                    description: `Participez aux célébrations japonaises`,
                    emoji: holiday.emoji,
                    xp: 50,
                    gold: 75,
                    difficulty: 'A',
                    completed: false,
                    completedAt: null
                });
            }
        });
    }

    getQuestsByType(type) {
        return Array.from(this.quests.values()).filter(q => q.type === type);
    }

    getSpecialEventToday() {
        const today = new Date();
        const dateStr = `${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
        
        let event = null;
        
        GAME_CONFIG.internationalHolidays.forEach(holiday => {
            if (holiday.date === dateStr) event = holiday;
        });
        
        if (!event) {
            GAME_CONFIG.madagascarHolidays.forEach(holiday => {
                if (holiday.date === dateStr) event = holiday;
            });
        }
        
        if (!event) {
            GAME_CONFIG.japanHolidays.forEach(holiday => {
                if (holiday.date === dateStr) event = holiday;
            });
        }
        
        return event;
    }
}

// ==================== PLAYER SYSTEM ====================

class Player {
    constructor(id, name, playerClass) {
        this.id = id;
        this.name = name;
        this.class = playerClass;
        this.level = 1;
        this.xp = 0;
        this.xpNeeded = 100;
        this.gold = 0;
        this.completedQuests = [];
        this.skills = this.initializeSkills();
        this.badges = [];
        this.createdAt = new Date().toISOString();
    }

    initializeSkills() {
        const baseSkills = {
            warrior: { strength: 1.2, defense: 1.0, speed: 0.8 },
            mage: { strength: 0.8, defense: 0.8, speed: 1.1 },
            archer: { strength: 1.0, defense: 0.9, speed: 1.2 },
            paladin: { strength: 1.1, defense: 1.2, speed: 0.9 }
        };
        return baseSkills[this.class] || baseSkills.warrior;
    }

    gainXP(amount) {
        this.xp += amount;
        let leveledUp = false;

        while (this.xp >= this.xpNeeded) {
            this.xp -= this.xpNeeded;
            this.level++;
            this.xpNeeded = Math.floor(this.xpNeeded * 1.15);
            leveledUp = true;
        }

        return leveledUp;
    }

    gainGold(amount) {
        this.gold += amount;
    }

    completeQuest(questId) {
        if (!this.completedQuests.includes(questId)) {
            this.completedQuests.push(questId);
        }
    }

    getXPPercentage() {
        return (this.xp / this.xpNeeded) * 100;
    }

    addBadge(badge) {
        if (!this.badges.includes(badge)) {
            this.badges.push(badge);
        }
    }

    getHP() {
        return 100 + (this.level * 10) + (this.skills.defense * 50);
    }

    getAttackPower() {
        return 10 + (this.level * 5) + (this.skills.strength * 20);
    }
}

// ==================== RAID SYSTEM ====================

class RaidSystem {
    constructor() {
        this.raids = [];
        this.currentRaid = null;
    }

    createRaid(name, floors, players) {
        const raid = {
            id: Date.now(),
            name: name,
            totalFloors: parseInt(floors),
            currentFloor: 1,
            players: players,
            status: 'active',
            rewards: {
                xp: 50 * parseInt(floors),
                gold: 75 * parseInt(floors)
            },
            createdAt: new Date().toISOString()
        };
        this.raids.push(raid);
        return raid;
    }

    deleteRaid(raidId) {
        this.raids = this.raids.filter(r => r.id !== raidId);
    }

    getRaidById(raidId) {
        return this.raids.find(r => r.id === raidId);
    }

    generateFloorEnemy(floor) {
        const difficulty = Math.floor(floor / 2) + 1;
        const enemyNames = [
            'Gobelin avarice', 'Orc gourmandise', 'Zombie procrastination', 'bordélique', 'Troll colère',
            'la malbouffe', 'Ecran', 'jus', 'injures', 'égo'
        ];
        
        const name = enemyNames[Math.floor(Math.random() * enemyNames.length)];
        const hp = 30 + (floor * 20) + (difficulty * 15);
        
        return {
            name: `${name} (Étage ${floor})`,
            hp: hp,
            maxHp: hp,
            attackPower: 5 + (floor * 3)
        };
    }

    startRaidBattle(raidId) {
        const raid = this.getRaidById(raidId);
        if (raid) {
            this.currentRaid = {
                ...raid,
                currentEnemy: this.generateFloorEnemy(raid.currentFloor),
                playerHPs: raid.players.reduce((acc, p) => {
                    acc[p.id] = p.getHP();
                    return acc;
                }, {})
            };
            return this.currentRaid;
        }
        return null;
    }

    playerAttackEnemy(playerId) {
        if (!this.currentRaid) return null;
        
        const player = this.currentRaid.players.find(p => p.id === playerId);
        if (!player) return null;

        const damage = Math.floor(player.getAttackPower() * (0.8 + Math.random() * 0.4));
        this.currentRaid.currentEnemy.hp = Math.max(0, this.currentRaid.currentEnemy.hp - damage);

        // Ennemi contre-attaque
        if (this.currentRaid.currentEnemy.hp > 0) {
            const allPlayers = this.currentRaid.players;
            allPlayers.forEach(p => {
                const enemyDamage = Math.floor(this.currentRaid.currentEnemy.attackPower * (0.5 + Math.random() * 0.5));
                this.currentRaid.playerHPs[p.id] = Math.max(0, this.currentRaid.playerHPs[p.id] - enemyDamage);
            });
        }

        return {
            damage: damage,
            enemyHp: this.currentRaid.currentEnemy.hp,
            playerHPs: this.currentRaid.playerHPs,
            floorComplete: this.currentRaid.currentEnemy.hp <= 0
        };
    }

    healTeam(playerId) {
        if (!this.currentRaid) return null;

        const player = this.currentRaid.players.find(p => p.id === playerId);
        if (!player) return null;

        const healAmount = player.getAttackPower();
        this.currentRaid.players.forEach(p => {
            const maxHp = p.getHP();
            this.currentRaid.playerHPs[p.id] = Math.min(maxHp, this.currentRaid.playerHPs[p.id] + healAmount);
        });

        return this.currentRaid.playerHPs;
    }

    completeFloor() {
        if (this.currentRaid && this.currentRaid.currentFloor < this.currentRaid.totalFloors) {
            this.currentRaid.currentFloor++;
            this.currentRaid.currentEnemy = this.generateFloorEnemy(this.currentRaid.currentFloor);
            return true;
        } else if (this.currentRaid && this.currentRaid.currentFloor === this.currentRaid.totalFloors) {
            this.currentRaid.status = 'completed';
            return true;
        }
        return false;
    }

    isTeamDefeated() {
        return Object.values(this.currentRaid.playerHPs).every(hp => hp <= 0);
    }
}

// ==================== ACHIEVEMENTS ====================

const ACHIEVEMENTS = [
    { id: 'first_quest', icon: '📜', name: 'Première Quête', description: 'Complétez votre première quête', condition: (p) => p.completedQuests.length >= 1 },
    { id: 'quest_master', icon: '🎯', name: 'Maître des Quêtes', description: 'Complétez 10 quêtes', condition: (p) => p.completedQuests.length >= 10 },
    { id: 'level_5', icon: '⬆️', name: 'Niveau 5', description: 'Atteignez le niveau 5', condition: (p) => p.level >= 5 },
    { id: 'level_10', icon: '⬆️⬆️', name: 'Niveau 10', description: 'Atteignez le niveau 10', condition: (p) => p.level >= 10 },
    { id: 'level_25', icon: '👑', name: 'Roi du Combat', description: 'Atteignez le niveau 25', condition: (p) => p.level >= 25 },
    { id: 'gold_farmer', icon: '💰', name: 'Collecteur d\'Or', description: 'Gagnez 500 pièces d\'or', condition: (p) => p.gold >= 500 },
    { id: 'rich', icon: '💎', name: 'Riche', description: 'Gagnez 2000 pièces d\'or', condition: (p) => p.gold >= 2000 },
    { id: 'hard_worker', icon: '💪', name: 'Travailleur Acharné', description: 'Complétez 50 quêtes', condition: (p) => p.completedQuests.length >= 50 },
    { id: 'speedrunner', icon: '⚡', name: 'Rapidité', description: 'Complétez 5 quêtes SSS', condition: (p) => p.completedQuests.filter(q => q.includes('annual')).length >= 5 }
];

// ==================== SOUND SYSTEM ====================

class SoundSystem {
    constructor() {
        this.bgm = document.getElementById('bgm');
        this.soundEffect = document.getElementById('soundEffect');
        this.enabled = true;
    }

    playBGM() {
        if (this.enabled && this.bgm) {
            this.bgm.play().catch(() => {});
        }
    }

    stopBGM() {
        if (this.bgm) {
            this.bgm.pause();
        }
    }

    playSound(soundName) {
        if (!this.enabled) return;
        
        const soundMap = {
            'quest_complete': 'data:audio/wav;base64,UklGRiYAAABXQVZFZm10IBAAAAABAAEAQB8AAAB9AAACABAAZGF0YQIAAAAAAA==',
            'level_up': 'data:audio/wav;base64,UklGRiYAAABXQVZFZm10IBAAAAABAAEAQB8AAAB9AAACABAAZGF0YQIAAAAAAA==',
            'xp_gain': 'data:audio/wav;base64,UklGRiYAAABXQVZFZm10IBAAAAABAAEAQB8AAAB9AAACABAAZGF0YQIAAAAAAA==',
            'click': 'data:audio/wav;base64,UklGRiYAAABXQVZFZm10IBAAAAABAAEAQB8AAAB9AAACABAAZGF0YQIAAAAAAA=='
        };

        if (this.soundEffect && soundMap[soundName]) {
            this.soundEffect.src = soundMap[soundName];
            this.soundEffect.play().catch(() => {});
        }
    }

    toggle() {
        this.enabled = !this.enabled;
        if (this.enabled) {
            this.playBGM();
        } else {
            this.stopBGM();
        }
    }
}

// ==================== UI ANIMATIONS ====================

function createConfetti() {
    const confettiContainer = document.getElementById('confetti');
    confettiContainer.innerHTML = '';

    for (let i = 0; i < 50; i++) {
        const piece = document.createElement('div');
        piece.className = 'confetti-piece';
        piece.style.left = Math.random() * 100 + '%';
        piece.style.backgroundColor = ['#667eea', '#764ba2', '#48bb78', '#f39c12', '#e74c3c'][Math.floor(Math.random() * 5)];
        piece.style.setProperty('--x', (Math.random() - 0.5) * 200 + 'px');
        piece.style.setProperty('--rotation', Math.random() * 360 + 'deg');
        
        confettiContainer.appendChild(piece);
        
        setTimeout(() => piece.remove(), 3000);
    }
}

function showXPNotification(xp, x, y) {
    const notif = document.getElementById('xpNotification');
    notif.textContent = `+${xp} XP`;
    notif.style.left = x + 'px';
    notif.style.top = y + 'px';
    notif.classList.add('xp-float');
    
    setTimeout(() => notif.classList.remove('xp-float'), 1500);
}

function showDamageNotification(damage, x, y) {
    const notif = document.getElementById('damageNotification');
    notif.textContent = `-${damage} HP`;
    notif.style.left = x + 'px';
    notif.style.top = y + 'px';
    notif.classList.add('damage-float');
    
    setTimeout(() => notif.classList.remove('damage-float'), 1500);
}

// ==================== GLOBAL INSTANCES ====================

const gameData = new GameData();
const questSystem = new QuestSystem();
const raidSystem = new RaidSystem();
const soundSystem = new SoundSystem();

// ==================== UI FUNCTIONS ====================

function getCurrentSeason() {
    const month = new Date().getMonth() + 1;
    for (const [season, config] of Object.entries(GAME_CONFIG.seasons)) {
        if (config.months.includes(month)) {
            return config;
        }
    }
    return GAME_CONFIG.seasons.spring;
}

function formatDate(date = new Date()) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('fr-FR', options);
}

function updateHeader() {
    document.getElementById('currentDate').textContent = formatDate();
    
    const season = getCurrentSeason();
    document.getElementById('currentSeason').textContent = `${season.emoji} ${season.name}`;
    
    const specialEvent = questSystem.getSpecialEventToday();
    const eventText = specialEvent ? `${specialEvent.emoji} ${specialEvent.name}` : 'Aucun';
    document.getElementById('specialEvent').textContent = eventText;
}

function openAddPlayerModal() {
    document.getElementById('addPlayerModal').classList.add('show');
}

function closeAddPlayerModal() {
    document.getElementById('addPlayerModal').classList.remove('show');
    document.getElementById('newPlayerName').value = '';
}

function addPlayer() {
    const name = document.getElementById('newPlayerName').value.trim();
    const playerClass = document.getElementById('newPlayerClass').value;

    if (!name) {
        alert('Veuillez entrer un nom de joueur');
        return;
    }

    const playerId = Date.now().toString();
    const player = new Player(playerId, name, playerClass);
    gameData.players[playerId] = player;
    gameData.save();

    closeAddPlayerModal();
    renderPlayers();
    soundSystem.playSound('click');
}

function deletePlayer(playerId) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce joueur ?')) {
        delete gameData.players[playerId];
        gameData.save();
        renderPlayers();
    }
}

function openPlayerDetailsModal(playerId) {
    const player = gameData.players[playerId];
    if (!player) return;

    const content = document.getElementById('playerDetailsContent');
    const achievements = ACHIEVEMENTS.filter(a => a.condition(player));

    content.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
            <div>
                <h2>${GAME_CONFIG.classesInfo[player.class].emoji} ${player.name}</h2>
                <p style="color: #718096;">Classe: ${GAME_CONFIG.classesInfo[player.class].name}</p>
            </div>
            <button class="btn-secondary" onclick="deletePlayer('${playerId}'); closePlayerDetailsModal();">Supprimer</button>
        </div>

        <div class="player-stats">
            <div class="stat-row">
                <span class="stat-label">Niveau:</span>
                <span class="stat-value">${player.level}</span>
            </div>
            <div class="stat-row">
                <span class="stat-label">XP Totale:</span>
                <span class="stat-value">${player.xp}/${player.xpNeeded}</span>
            </div>
            <div class="stat-row">
                <span class="stat-label">Or:</span>
                <span class="stat-value">💰 ${player.gold}</span>
            </div>
            <div class="stat-row">
                <span class="stat-label">Quêtes complétées:</span>
                <span class="stat-value">${player.completedQuests.length}</span>
            </div>
            <div class="stat-row">
                <span class="stat-label">Badges:</span>
                <span class="stat-value">${player.badges.length}</span>
            </div>
        </div>

        <div class="xp-container">
            <div class="xp-label">
                <span>Progression:</span>
                <span>${Math.round(player.getXPPercentage())}%</span>
            </div>
            <div class="xp-bar">
                <div class="xp-fill" style="width: ${player.getXPPercentage()}%">
                    <div class="xp-text">${player.xp}/${player.xpNeeded}</div>
                </div>
            </div>
        </div>

        <h3 style="margin-top: 25px; margin-bottom: 15px;">🏆 Réalisations (${achievements.length}/${ACHIEVEMENTS.length})</h3>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
            ${achievements.map(a => `
                <div style="background: #fef5e7; padding: 10px; border-radius: 8px; text-align: center;">
                    <div style="font-size: 1.5em; margin-bottom: 5px;">${a.icon}</div>
                    <div style="font-weight: 600; color: #2c3e50; font-size: 0.9em;">${a.name}</div>
                </div>
            `).join('')}
        </div>

        <h3 style="margin-top: 25px; margin-bottom: 15px;">⚔️ Compétences</h3>
        <div class="player-stats">
            <div class="stat-row">
                <span class="stat-label">Force:</span>
                <span class="stat-value">${(player.skills.strength * 100).toFixed(0)}%</span>
            </div>
            <div class="stat-row">
                <span class="stat-label">Défense:</span>
                <span class="stat-value">${(player.skills.defense * 100).toFixed(0)}%</span>
            </div>
            <div class="stat-row">
                <span class="stat-label">Vitesse:</span>
                <span class="stat-value">${(player.skills.speed * 100).toFixed(0)}%</span>
            </div>
            <div class="stat-row">
                <span class="stat-label">HP Totals:</span>
                <span class="stat-value">${Math.floor(player.getHP())}</span>
            </div>
            <div class="stat-row">
                <span class="stat-label">Puissance d\'attaque:</span>
                <span class="stat-value">${Math.floor(player.getAttackPower())}</span>
            </div>
        </div>
    `;

    document.getElementById('playerDetailsModal').classList.add('show');
}

function closePlayerDetailsModal() {
    document.getElementById('playerDetailsModal').classList.remove('show');
}

function renderPlayers() {
    const playersList = document.getElementById('playersList');
    playersList.innerHTML = '';

    Object.values(gameData.players).forEach(player => {
        const classInfo = GAME_CONFIG.classesInfo[player.class];
        const xpPercent = player.getXPPercentage();

        const playerCard = document.createElement('div');
        playerCard.className = 'player-card';
        playerCard.style.cursor = 'pointer';
        playerCard.onclick = () => openPlayerDetailsModal(player.id);

        playerCard.innerHTML = `
            <div class="player-header">
                <div style="display: flex; gap: 12px; align-items: center;">
                    <div class="player-avatar player-class-${player.class}">
                        ${classInfo.emoji}
                    </div>
                    <div class="player-info">
                        <h3>${player.name}</h3>
                        <p class="player-class">${classInfo.name}</p>
                        ${player.level >= 10 ? `<div class="player-badge">⭐ Niveau ${player.level}</div>` : ''}
                    </div>
                </div>
            </div>

            <div class="player-stats">
                <div class="stat-row">
                    <span class="stat-label">Niveau:</span>
                    <span class="stat-value">${player.level}</span>
                </div>
                <div class="stat-row">
                    <span class="stat-label">Quêtes:</span>
                    <span class="stat-value">${player.completedQuests.length}</span>
                </div>
                <div class="stat-row">
                    <span class="stat-label">Or:</span>
                    <span class="stat-value">💰 ${player.gold}</span>
                </div>
                <div class="stat-row">
                    <span class="stat-label">Badges:</span>
                    <span class="stat-value">${player.badges.length}🎖️</span>
                </div>
            </div>

            <div class="xp-container">
                <div class="xp-label">
                    <span>XP:</span>
                    <span>${Math.round(xpPercent)}%</span>
                </div>
                <div class="xp-bar">
                    <div class="xp-fill" style="width: ${xpPercent}%">
                        <div class="xp-text">${player.xp}/${player.xpNeeded}</div>
                    </div>
                </div>
            </div>
        `;

        playersList.appendChild(playerCard);
    });

    if (Object.keys(gameData.players).length === 0) {
        playersList.innerHTML = '<p style="text-align: center; color: #718096; grid-column: 1/-1;">Aucun joueur. Créez-en un pour commencer !</p>';
    }
}

function completeQuest(questId) {
    if (!Object.keys(gameData.players).length) {
        alert('Veuillez créer un joueur d\'abord');
        return;
    }

    const modal = document.createElement('div');
    modal.className = 'modal show';
    modal.style.zIndex = '2001';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close" onclick="this.parentElement.parentElement.remove()">&times;</span>
            <h2>Sélectionner un joueur</h2>
            <div style="display: flex; flex-direction: column; gap: 10px;">
                ${Object.values(gameData.players).map(p => `
                    <button class="btn-primary" style="width: 100%; text-align: left;" onclick="
                        completeQuestForPlayer('${questId}', '${p.id}');
                        this.parentElement.parentElement.parentElement.remove();
                    ">
                        ${GAME_CONFIG.classesInfo[p.class].emoji} ${p.name} (Niveau ${p.level})
                    </button>
                `).join('')}
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

function completeQuestForPlayer(questId, playerId) {
    const player = gameData.players[playerId];
    const quest = questSystem.quests.get(questId);

    if (!player || !quest || quest.completed) return;

    quest.completed = true;
    quest.completedAt = new Date().toISOString();
    player.completeQuest(questId);
    player.gainXP(quest.xp);
    player.gainGold(quest.gold);

    const leveledUp = player.gainXP(0);
    if (leveledUp) {
        createConfetti();
        document.querySelector('.player-card')?.classList.add('level-up-pulse');
        soundSystem.playSound('level_up');
    }

    // Vérifier les réalisations
    updateAchievements(player);

    gameData.save();
    renderQuests();
    renderPlayers();
    renderAchievements();
    soundSystem.playSound('quest_complete');
}

function updateAchievements(player) {
    ACHIEVEMENTS.forEach(achievement => {
        if (achievement.condition(player) && !player.badges.includes(achievement.id)) {
            player.addBadge(achievement.id);
        }
    });
}

function renderQuests(filter = 'all') {
    const questsList = document.getElementById('questsList');
    questsList.innerHTML = '';

    let quests = Array.from(questSystem.quests.values());

    if (filter !== 'all') {
        quests = quests.filter(q => q.type === filter);
    }

    quests.forEach(quest => {
        const rarity = GAME_CONFIG.questRarities[quest.rarity];
        const isCompleted = quest.completed;

        const questCard = document.createElement('div');
        questCard.className = `quest-card ${isCompleted ? 'completed' : ''} rarity-${quest.rarity.toLowerCase()}`;
        
        const difficultyStars = '⭐'.repeat(['E', 'D'].includes(quest.rarity) ? 1 : ['C', 'B'].includes(quest.rarity) ? 2 : 3);

        questCard.innerHTML = `
            <div class="quest-header">
                <div>
                    <h3 class="quest-title">${quest.emoji || ''} ${quest.title}</h3>
                    <p class="quest-description">${quest.description || ''}</p>
                </div>
                <span class="quest-rarity">${quest.rarity}</span>
            </div>

            <div class="quest-rewards">
                <div class="quest-xp">📊 ${quest.xp} XP</div>
                <div class="quest-gold">💰 ${quest.gold} Gold</div>
            </div>

            <span class="quest-type">${rarity.name}</span>

            <div class="quest-footer">
                <div class="quest-difficulty">
                    ${difficultyStars} ${['E', 'D'].includes(quest.rarity) ? '' : ['C', 'B'].includes(quest.rarity) ? '' : ''}
                </div>
                <button class="btn-complete" onclick="completeQuest('${quest.id}')" ${isCompleted ? 'disabled' : ''}>
                    ${isCompleted ? '✓ Complétée' : 'Compléter'}
                </button>
            </div>
        `;

        questsList.appendChild(questCard);
    });
}

function renderAchievements() {
    const achievementsList = document.getElementById('achievementsList');
    achievementsList.innerHTML = '';

    ACHIEVEMENTS.forEach(achievement => {
        const unlockedByPlayers = Object.values(gameData.players).filter(p => p.badges.includes(achievement.id));
        const unlocked = unlockedByPlayers.length > 0;

        const card = document.createElement('div');
        card.className = `achievement-card ${unlocked ? 'unlocked' : 'locked'}`;
        
        card.innerHTML = `
            <div class="achievement-icon">${achievement.icon}</div>
            <h3>${achievement.name}</h3>
            <p>${achievement.description}</p>
            <div class="achievement-progress">
                ${unlocked ? `Débloquée par ${unlockedByPlayers.length} joueur(s)` : 'Non débloquée'}
            </div>
        `;

        achievementsList.appendChild(card);
    });
}

function renderCalendar() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const calendarView = document.getElementById('calendarView');
    const calendarMonth = document.getElementById('calendarMonth');
    
    const monthNames = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
                        'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
    calendarMonth.textContent = `${monthNames[month]} ${year}`;

    calendarView.innerHTML = '';

    // Headers des jours
    const dayHeaders = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
    dayHeaders.forEach(day => {
        const header = document.createElement('div');
        header.style.fontWeight = '700';
        header.style.textAlign = 'center';
        header.style.padding = '10px';
        header.textContent = day;
        calendarView.appendChild(header);
    });

    // Jours du calendrier
    const currentDate = new Date(startDate);
    while (currentDate <= lastDay || currentDate.getDay() !== 1) {
        const dayCell = document.createElement('div');
        dayCell.className = 'calendar-day';

        if (currentDate.getMonth() !== month) {
            dayCell.classList.add('other-month');
        }

        const dateStr = `${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`;
        const hasSpecialEvent = [
            ...GAME_CONFIG.internationalHolidays,
            ...GAME_CONFIG.madagascarHolidays,
            ...GAME_CONFIG.japanHolidays
        ].some(e => e.date === dateStr);

        if (currentDate.toDateString() === now.toDateString()) {
            dayCell.classList.add('today');
        } else if (hasSpecialEvent) {
            dayCell.classList.add('event');
        }

        dayCell.innerHTML = `
            <div class="calendar-day-number">${currentDate.getDate()}</div>
            ${hasSpecialEvent ? '<div class="calendar-day-quests">✨</div>' : ''}
        `;

        calendarView.appendChild(dayCell);
        currentDate.setDate(currentDate.getDate() + 1);
    }
}

function prevMonth() {
    // Implémenter la navigation du calendrier
}

function nextMonth() {
    // Implémenter la navigation du calendrier
}

function openCreateRaidModal() {
    if (!Object.keys(gameData.players).length) {
        alert('Veuillez créer au moins un joueur');
        return;
    }

    const playersList = document.getElementById('raidPlayersList');
    playersList.innerHTML = '';

    Object.values(gameData.players).forEach(player => {
        const checkbox = document.createElement('div');
        checkbox.className = 'checkbox-item';
        checkbox.innerHTML = `
            <input type="checkbox" id="raid-player-${player.id}" value="${player.id}">
            <label for="raid-player-${player.id}">
                ${GAME_CONFIG.classesInfo[player.class].emoji} ${player.name}
            </label>
        `;
        playersList.appendChild(checkbox);
    });

    document.getElementById('createRaidModal').classList.add('show');
}

function closeCreateRaidModal() {
    document.getElementById('createRaidModal').classList.remove('show');
}

function createRaid() {
    const raidName = document.getElementById('raidName').value.trim();
    const raidFloors = document.getElementById('raidFloors').value;
    
    const selectedPlayers = Array.from(document.querySelectorAll('#raidPlayersList input:checked'))
        .map(checkbox => gameData.players[checkbox.value])
        .filter(p => p);

    if (!raidName) {
        alert('Veuillez entrer un nom pour le raid');
        return;
    }

    if (selectedPlayers.length < 2) {
        alert('Sélectionnez au moins 2 joueurs');
        return;
    }

    raidSystem.createRaid(raidName, raidFloors, selectedPlayers);
    gameData.raids = raidSystem.raids;
    gameData.save();

    closeCreateRaidModal();
    renderRaids();
    soundSystem.playSound('click');
}

function renderRaids() {
    const raidsList = document.getElementById('raidsList');
    raidsList.innerHTML = '';

    raidSystem.raids.forEach(raid => {
        const progressPercent = ((raid.currentFloor - 1) / raid.totalFloors) * 100;
        const playersText = raid.players.map(p => p.name).join(', ');

        const raidCard = document.createElement('div');
        raidCard.className = 'raid-card';

        raidCard.innerHTML = `
            <div class="raid-header">🏰 ${raid.name}</div>
            
            <div class="raid-info">
                <div class="raid-stat">
                    <div class="raid-stat-label">Étage</div>
                    <div class="raid-stat-value">${raid.currentFloor}/${raid.totalFloors}</div>
                </div>
                <div class="raid-stat">
                    <div class="raid-stat-label">Joueurs</div>
                    <div class="raid-stat-value">${raid.players.length}</div>
                </div>
                <div class="raid-stat">
                    <div class="raid-stat-label">État</div>
                    <div class="raid-stat-value">${raid.status === 'active' ? '🟢' : '✓'}</div>
                </div>
            </div>

            <div class="raid-players">
                👥 ${playersText}
            </div>

            <div class="raid-progress">
                Progression:
                <div class="raid-progress-bar">
                    <div class="raid-progress-fill" style="width: ${progressPercent}%"></div>
                </div>
            </div>

            <div class="raid-buttons">
                <button class="btn-raid-battle" onclick="startRaidBattle(${raid.id})">
                    ⚔️ Combattre
                </button>
                <button class="btn-raid-delete" onclick="deleteRaid(${raid.id})">
                    🗑️ Supprimer
                </button>
            </div>
        `;

        raidsList.appendChild(raidCard);
    });

    if (raidSystem.raids.length === 0) {
        raidsList.innerHTML = '<p style="text-align: center; color: #718096; grid-column: 1/-1;">Aucun raid. Créez-en un pour commencer une aventure coopérative !</p>';
    }
}

function startRaidBattle(raidId) {
    const raid = raidSystem.startRaidBattle(raidId);
    if (!raid) return;

    const modal = document.getElementById('raidBattleModal');
    const content = document.getElementById('raidBattleContent');

    const renderBattle = () => {
        const enemy = raidSystem.currentRaid.currentEnemy;
        const playerHPs = raidSystem.currentRaid.playerHPs;

        content.innerHTML = `
            <h2>Étage ${raidSystem.currentRaid.currentFloor}/${raidSystem.currentRaid.totalFloors}</h2>
            
            <div class="raid-battle-container">
                <div class="raid-floor-info">
                    <div class="raid-floor-title">Ennemi</div>
                    <div class="raid-floor-enemies">
                        <div class="raid-enemy">
                            <div class="raid-enemy-name">${enemy.name}</div>
                            <div class="raid-enemy-hp">HP: ${Math.max(0, enemy.hp)}/${enemy.maxHp}</div>
                            <div class="raid-enemy-hp-bar">
                                <div class="raid-enemy-hp-fill" style="width: ${Math.max(0, (enemy.hp / enemy.maxHp) * 100)}%"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="raid-team-status">
                    <div class="raid-team-title">Équipe</div>
                    <div class="raid-team-members">
                        ${raidSystem.currentRaid.players.map(p => `
                            <div class="raid-member">
                                <div class="raid-member-name">${GAME_CONFIG.classesInfo[p.class].emoji} ${p.name}</div>
                                <div class="raid-member-hp">HP: ${Math.max(0, playerHPs[p.id])}/${p.getHP()}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>

            <div class="raid-actions">
                <button class="btn-attack" onclick="playerAttack()">⚔️ Attaquer</button>
                <button class="btn-heal" onclick="playerHeal()">💚 Soigner</button>
            </div>
        `;
    };

    window.playerAttack = () => {
        if (raidSystem.currentRaid.players.length > 0) {
            const firstPlayer = raidSystem.currentRaid.players[0];
            const result = raidSystem.playerAttackEnemy(firstPlayer.id);
            
            if (result.enemyHp <= 0) {
                if (raidSystem.completeFloor()) {
                    if (raidSystem.currentRaid.status === 'completed') {
                        completeRaidBattle();
                    } else {
                        renderBattle();
                    }
                }
            } else {
                if (raidSystem.isTeamDefeated()) {
                    alert('L\'équipe a été vaincue !');
                    closeRaidBattle();
                } else {
                    renderBattle();
                }
            }
        }
    };

    window.playerHeal = () => {
        if (raidSystem.currentRaid.players.length > 0) {
            const firstPlayer = raidSystem.currentRaid.players[0];
            raidSystem.healTeam(firstPlayer.id);
            renderBattle();
        }
    };

    window.completeRaidBattle = () => {
        raidSystem.currentRaid.players.forEach(player => {
            player.gainXP(raidSystem.currentRaid.rewards.xp);
            player.gainGold(raidSystem.currentRaid.rewards.gold);
            updateAchievements(player);
        });

        gameData.save();
        createConfetti();
        alert(`🎉 Raid complété ! Récompense: ${raidSystem.currentRaid.rewards.xp} XP, ${raidSystem.currentRaid.rewards.gold} Gold`);
        closeRaidBattle();
        renderRaids();
        renderPlayers();
        renderAchievements();
    };

    window.closeRaidBattle = () => {
        modal.classList.remove('show');
        raidSystem.currentRaid = null;
    };

    renderBattle();
    modal.classList.add('show');
}

function deleteRaid(raidId) {
    if (confirm('Supprimer ce raid ?')) {
        raidSystem.deleteRaid(raidId);
        gameData.raids = raidSystem.raids;
        gameData.save();
        renderRaids();
    }
}

function toggleSound() {
    soundSystem.toggle();
    gameData.soundEnabled = soundSystem.enabled;
    gameData.save();
    
    const btn = document.getElementById('soundToggle');
    btn.textContent = soundSystem.enabled ? '🔊' : '🔇';
}

function resetAllData() {
    if (confirm('⚠️ Êtes-vous sûr ? Toutes les données seront supprimées !')) {
        gameData.reset();
        renderPlayers();
        renderQuests();
        renderAchievements();
        renderRaids();
    }
}

// ==================== TAB NAVIGATION ====================

document.addEventListener('DOMContentLoaded', () => {
    updateHeader();
    renderPlayers();
    renderQuests();
    renderAchievements();
    renderCalendar();
    renderRaids();

    // Setup tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            
            e.target.classList.add('active');
            const tabId = e.target.dataset.tab + '-tab';
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Setup quest filters
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            renderQuests(e.target.dataset.filter);
        });
    });

    // Load sound state
    if (gameData.soundEnabled) {
        soundSystem.playBGM();
    }
});
