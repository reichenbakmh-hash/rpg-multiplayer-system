// ==================== CONFIGURATION ====================

const GAME_CONFIG = {
  leveling: {
    baseXP: 100,
    growth: 1.18
  },
  seasons: {
    spring: { name: 'Printemps', emoji: '🌸', months: [3, 4, 5] },
    summer: { name: 'Été', emoji: '☀️', months: [6, 7, 8] },
    autumn: { name: 'Automne', emoji: '🍂', months: [9, 10, 11] },
    winter: { name: 'Hiver', emoji: '❄️', months: [12, 1, 2] }
  },
  questRarities: {
    E: { name: 'Très facile', xp: 5, color: '#95a5a6', icon: '⭐' },
    D: { name: 'Facile', xp: 10, color: '#3498db', icon: '⭐' },
    C: { name: 'Simple', xp: 20, color: '#2ecc71', icon: '⭐⭐' },
    B: { name: 'Moyen', xp: 30, color: '#9b59b6', icon: '⭐⭐' },
    A: { name: 'Difficile', xp: 40, color: '#f39c12', icon: '⭐⭐⭐' },
    S: { name: 'Hebdomadaire', xp: 60, color: '#e67e22', icon: '⭐⭐⭐' },
    SS: { name: 'Mensuelle', xp: 80, color: '#e74c3c', icon: '⭐⭐⭐⭐' },
    SSS: { name: 'Annuelle', xp: 100, color: '#c0392b', icon: '⭐⭐⭐⭐⭐' }
  },
  classesInfo: {
    warrior: { emoji: '⚔️', name: 'Guerrier', color: '#e74c3c' },
    mage: { emoji: '🔮', name: 'Mage', color: '#9b59b6' },
    archer: { emoji: '🏹', name: 'Archer', color: '#2ecc71' },
    paladin: { emoji: '✨', name: 'Paladin', color: '#f39c12' }
  },
  internationalHolidays: [
    { type: 'date', date: '03-08', name: 'Journée des Femmes', emoji: '👩' },
    { type: 'date', date: '03-21', name: 'Journée Mondiale de l\'Eau', emoji: '💧' },
    { type: 'date', date: '04-22', name: 'Jour de la Terre', emoji: '🌍' },
    { type: 'date', date: '05-01', name: 'Fête du Travail', emoji: '👨‍💼' },
    { type: 'date', date: '06-05', name: 'Journée Mondiale de l\'Environnement', emoji: '🌱' },
    { type: 'date', date: '06-21', name: 'Journée de la Musique', emoji: '🎵' },
    { type: 'date', date: '10-31', name: 'Halloween', emoji: '👻' },
    { type: 'date', date: '12-25', name: 'Noël', emoji: '🎄' }
  ],
  madagascarHolidays: [
    { type: 'date', date: '01-01', name: 'Nouvel An', emoji: '🎆' },
    { type: 'date', date: '03-29', name: 'Commémoration de la Rébellion de 1947', emoji: '🇲🇬' },
    { type: 'date', date: '05-01', name: 'Fête du Travail', emoji: '👨‍💼' },
    { type: 'date', date: '06-26', name: 'Fête de l\'Indépendance', emoji: '🇲🇬' },
    { type: 'date', date: '08-15', name: 'Assomption', emoji: '⛪' },
    { type: 'date', date: '11-01', name: 'Toussaint', emoji: '🕯️' },
    { type: 'date', date: '12-25', name: 'Noël', emoji: '🎄' }
  ],
  japanHolidays: [
    { type: 'date', date: '01-01', name: 'Nouvel An Japonais', emoji: '🎋' },
    { type: 'date', date: '01-10', name: 'Jour de la Majorité', emoji: '👘' },
    { type: 'date', date: '02-11', name: 'Fondation du Japon', emoji: '🏯' },
    { type: 'date', date: '03-21', name: 'Équinoxe du Printemps', emoji: '🌸' },
    { type: 'date', date: '05-03', name: 'Fête de la Constitution', emoji: '📜' },
    { type: 'date', date: '05-05', name: 'Jour des Enfants', emoji: '🎏' },
    { type: 'range', month: 8, startDay: 13, endDay: 16, name: 'Obon', emoji: '🏮' },
    { type: 'date', date: '09-23', name: 'Équinoxe d\'Automne', emoji: '🍂' },
    { type: 'date', date: '11-03', name: 'Jour de la Culture', emoji: '🎭' },
    { type: 'date', date: '11-23', name: 'Jour de Remerciement', emoji: '🙏' }
  ]
};

const QUEST_POOLS = {
  daily: {
    E: ['Boire 2 verres d’eau', 'Faire 5 respirations profondes', 'Marcher 500 pas', 'Lire 1 page d’un livre', 'Ranger un petit espace'],
    D: ['Faire 10 pompes', 'Écrire 3 lignes de journal', 'Envoyer un message positif à un ami', 'Rester 2h sans téléphone', 'S’étirer 10 minutes'],
    C: ['Cuisiner un repas maison', 'Apprendre 5 mots dans une langue', 'Méditer 15 minutes', 'Préparer la to-do du lendemain', 'Nettoyer un coin de la chambre'],
    B: ['Courir 2 km', 'Compléter une tâche importante', 'Apprendre une nouvelle compétence', 'Faire 45 minutes de travail profond', 'Aider quelqu’un concrètement'],
    A: ['Faire 1 heure de sport', 'Terminer un projet en cours', 'Passer une journée sans réseaux sociaux', 'Réaliser une session de concentration de 2h', 'Dormir à heure fixe']
  },
  weekly: [
    { title: 'Duel épique', description: 'Terminer une activité coopérative avec un autre joueur.' },
    { title: 'Trésor caché', description: 'Découvrir ou apprendre quelque chose de nouveau hors routine.' },
    { title: 'Protection du royaume', description: 'Réduire une source de désordre dans ton environnement.' },
    { title: 'Marche du héros', description: 'Cumuler une grosse session de marche ou d’activité physique.' }
  ],
  monthly: [
    { title: 'Domination des donjons', description: 'Boucler une mission exigeante du mois.' },
    { title: 'Maître du combat', description: 'Finir un objectif personnel marquant.' },
    { title: 'Trésor des dragons', description: 'Faire un vrai progrès financier ou d’organisation.' },
    { title: 'Héros légendaire', description: 'Soutenir plusieurs personnes ou projets sur la durée.' }
  ],
  annual: [
    { title: 'Conquête du royaume', description: 'Achever un objectif de fond qui change ton niveau global.' },
    { title: 'Ascension ultime', description: 'Tenir une discipline importante sur toute l’année.' },
    { title: 'Légende vivante', description: 'Construire quelque chose de solide, utile et durable.' },
    { title: 'Couronnement', description: 'Atteindre un cap majeur que tu visais depuis longtemps.' }
  ]
};

const ACHIEVEMENTS = [
  { id: 'first_quest', icon: '📜', name: 'Première quête', description: 'Compléter une quête', condition: p => p.completedQuests.length >= 1 },
  { id: 'quest_master', icon: '🎯', name: 'Maître des quêtes', description: 'Compléter 10 quêtes', condition: p => p.completedQuests.length >= 10 },
  { id: 'level_5', icon: '⬆️', name: 'Niveau 5', description: 'Atteindre le niveau 5', condition: p => p.level >= 5 },
  { id: 'level_10', icon: '⬆️⬆️', name: 'Niveau 10', description: 'Atteindre le niveau 10', condition: p => p.level >= 10 },
  { id: 'level_25', icon: '👑', name: 'Roi du combat', description: 'Atteindre le niveau 25', condition: p => p.level >= 25 },
  { id: 'gold_farmer', icon: '💰', name: 'Collecteur d’or', description: 'Gagner 500 pièces', condition: p => p.gold >= 500 },
  { id: 'rich', icon: '💎', name: 'Riche', description: 'Gagner 2000 pièces', condition: p => p.gold >= 2000 },
  { id: 'hard_worker', icon: '💪', name: 'Travailleur acharné', description: 'Compléter 50 quêtes', condition: p => p.completedQuests.length >= 50 }
];

// ==================== HELPERS ====================

const $ = (id) => document.getElementById(id);

const safeJsonParse = (value, fallback) => {
  try { return value ? JSON.parse(value) : fallback; } catch { return fallback; }
};

const pad2 = (value) => String(value).padStart(2, '0');

const escapeHtml = (text) => String(text)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#039;');

const slugify = (text) => String(text)
  .toLowerCase()
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .replace(/[^a-z0-9]+/g, '_')
  .replace(/^_|_$/g, '');

const uid = (prefix = 'id') => `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

const monthKey = (date = new Date()) => `${date.getFullYear()}-${pad2(date.getMonth() + 1)}`;
const dateKey = (date = new Date()) => `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(date.getDate())}`;

function getISOWeekKey(date = new Date()) {
  const tmp = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const day = tmp.getUTCDay() || 7;
  tmp.setUTCDate(tmp.getUTCDate() + 4 - day);
  const yearStart = new Date(Date.UTC(tmp.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil((((tmp - yearStart) / 86400000) + 1) / 7);
  return `${tmp.getUTCFullYear()}-W${pad2(weekNo)}`;
}

function formatDate(date = new Date()) {
  return date.toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

function getCurrentSeason() {
  const month = new Date().getMonth() + 1;
  return Object.values(GAME_CONFIG.seasons).find(season => season.months.includes(month)) || GAME_CONFIG.seasons.spring;
}

function matchesHoliday(holiday, date = new Date()) {
  const key = `${pad2(date.getMonth() + 1)}-${pad2(date.getDate())}`;

  if (holiday.type === 'date') {
    return holiday.date === key;
  }

  if (holiday.type === 'range') {
    return date.getMonth() + 1 === holiday.month && date.getDate() >= holiday.startDay && date.getDate() <= holiday.endDay;
  }

  return false;
}

function seedFromString(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = ((h << 5) - h) + str.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

function pickDeterministic(array, seed) {
  if (!array.length) return null;
  return array[seed % array.length];
}

function uniqById(items) {
  return [...new Map(items.map(item => [item.id, item])).values()];
}

function createConfetti() {
  const zone = $('confetti');
  if (!zone) return;

  zone.innerHTML = '';
  for (let i = 0; i < 40; i++) {
    const el = document.createElement('div');
    el.className = 'confetti-piece';
    el.style.left = Math.random() * 100 + '%';
    el.style.setProperty('--x', (Math.random() - 0.5) * 200 + 'px');
    el.style.setProperty('--rotation', Math.random() * 360 + 'deg');
    zone.appendChild(el);
    setTimeout(() => el.remove(), 2800);
  }
}

// ==================== MODELS ====================

class Player {
  constructor(id, name, playerClass, data = {}) {
    this.id = id;
    this.name = name;
    this.class = playerClass;
    this.level = data.level ?? 1;
    this.xp = data.xp ?? 0;
    this.xpNeeded = data.xpNeeded ?? GAME_CONFIG.leveling.baseXP;
    this.gold = data.gold ?? 0;
    this.completedQuests = Array.isArray(data.completedQuests) ? data.completedQuests : [];
    this.skills = data.skills || this.initializeSkills();
    this.badges = Array.isArray(data.badges) ? data.badges : [];
    this.createdAt = data.createdAt || new Date().toISOString();
  }

  static fromJSON(data) {
    return new Player(data.id, data.name, data.class, data);
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      class: this.class,
      level: this.level,
      xp: this.xp,
      xpNeeded: this.xpNeeded,
      gold: this.gold,
      completedQuests: this.completedQuests,
      skills: this.skills,
      badges: this.badges,
      createdAt: this.createdAt
    };
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
    let leveledUp = 0;

    while (this.xp >= this.xpNeeded) {
      this.xp -= this.xpNeeded;
      this.level += 1;
      this.xpNeeded = Math.floor(GAME_CONFIG.leveling.baseXP * Math.pow(GAME_CONFIG.leveling.growth, this.level - 1));
      leveledUp += 1;
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

  addBadge(badgeId) {
    if (!this.badges.includes(badgeId)) {
      this.badges.push(badgeId);
    }
  }

  getXPPercentage() {
    return Math.max(0, Math.min(100, (this.xp / this.xpNeeded) * 100));
  }

  getHP() {
    return 100 + (this.level * 10) + (this.skills.defense * 50);
  }

  getAttackPower() {
    return 10 + (this.level * 5) + (this.skills.strength * 20);
  }
}

class QuestSystem {
  constructor() {
    this.quests = new Map();
    this.refresh();
  }

  refresh(now = new Date()) {
    const active = this.generateActiveQuests(now);
    const existing = GameData.instance ? GameData.instance.quests : {};
    this.quests = new Map(active.map(q => {
      const saved = existing[q.id];
      return [q.id, saved ? { ...q, ...saved } : q];
    }));
    return this.quests;
  }

  generateActiveQuests(now = new Date()) {
    const list = [];
    list.push(...this.generateDailyQuests(now));
    list.push(this.generateWeeklyQuest(now));
    list.push(this.generateMonthlyQuest(now));
    list.push(this.generateAnnualQuest(now));
    list.push(...this.generateSpecialQuests(now));
    return uniqById(list.filter(Boolean));
  }

  generateDailyQuests(now = new Date()) {
    const daySeedBase = dateKey(now);
    const counts = { E: 5, D: 4, C: 3, B: 2, A: 1 };

    return Object.entries(counts).flatMap(([rarity, count]) => {
      const pool = QUEST_POOLS.daily[rarity];
      return Array.from({ length: count }, (_, index) => {
        const seed = seedFromString(`${daySeedBase}-${rarity}-${index}`);
        const title = pickDeterministic(pool, seed);
        const rarityInfo = GAME_CONFIG.questRarities[rarity];

        return {
          id: `daily_${daySeedBase}_${rarity}_${index}`,
          type: 'daily',
          rarity,
          title,
          description: 'Quête quotidienne générée automatiquement.',
          xp: rarityInfo.xp,
          gold: Math.floor(rarityInfo.xp * 1.5),
          completed: false,
          completedAt: null
        };
      });
    });
  }

  generateWeeklyQuest(now = new Date()) {
    const week = getISOWeekKey(now);
    const seed = seedFromString(week);
    const quest = pickDeterministic(QUEST_POOLS.weekly, seed);

    return {
      id: `weekly_${week}`,
      type: 'weekly',
      rarity: 'S',
      title: quest.title,
      description: quest.description,
      xp: GAME_CONFIG.questRarities.S.xp,
      gold: 90,
      completed: false,
      completedAt: null
    };
  }

  generateMonthlyQuest(now = new Date()) {
    const key = monthKey(now);
    const seed = seedFromString(key);
    const quest = pickDeterministic(QUEST_POOLS.monthly, seed);

    return {
      id: `monthly_${key}`,
      type: 'monthly',
      rarity: 'SS',
      title: quest.title,
      description: quest.description,
      xp: GAME_CONFIG.questRarities.SS.xp,
      gold: 120,
      completed: false,
      completedAt: null
    };
  }

  generateAnnualQuest(now = new Date()) {
    const year = now.getFullYear();
    const seed = seedFromString(String(year));
    const quest = pickDeterministic(QUEST_POOLS.annual, seed);

    return {
      id: `annual_${year}`,
      type: 'annual',
      rarity: 'SSS',
      title: quest.title,
      description: quest.description,
      xp: GAME_CONFIG.questRarities.SSS.xp,
      gold: 200,
      completed: false,
      completedAt: null
    };
  }

  generateSpecialQuests(now = new Date()) {
    const all = [
      ...GAME_CONFIG.internationalHolidays,
      ...GAME_CONFIG.madagascarHolidays,
      ...GAME_CONFIG.japanHolidays
    ];

    return all.filter(h => matchesHoliday(h, now)).map(holiday => ({
      id: `special_${slugify(holiday.name)}_${dateKey(now)}`,
      type: 'special',
      rarity: 'A',
      title: `${holiday.emoji} ${holiday.name}`,
      description: `Participez à la célébration de ${holiday.name}.`,
      xp: 50,
      gold: 75,
      completed: false,
      completedAt: null
    }));
  }

  getQuest(questId) {
    return this.quests.get(questId);
  }

  getQuestList(type = 'all') {
    const values = Array.from(this.quests.values());
    return type === 'all' ? values : values.filter(q => q.type === type);
  }

  getSpecialEventsToday(now = new Date()) {
    return [
      ...GAME_CONFIG.internationalHolidays,
      ...GAME_CONFIG.madagascarHolidays,
      ...GAME_CONFIG.japanHolidays
    ].filter(h => matchesHoliday(h, now));
  }
}

class GameData {
  static instance = null;

  constructor() {
    GameData.instance = this;
    this.load();
  }

  load() {
    const data = safeJsonParse(localStorage.getItem('rpg_game_data'), null) || {};

    this.players = {};
    Object.entries(data.players || {}).forEach(([id, playerData]) => {
      this.players[id] = Player.fromJSON(playerData);
    });

    this.quests = data.quests || {};
    this.achievements = data.achievements || {};
    this.calendar = data.calendar || {};
    this.soundEnabled = data.soundEnabled !== false;
  }

  save() {
    const data = {
      players: Object.fromEntries(Object.entries(this.players).map(([id, p]) => [id, p.toJSON()])),
      quests: this.quests,
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

class SoundSystem {
  constructor() {
    this.enabled = true;
    this.bgm = $('bgm');
    this.soundEffect = $('soundEffect');
  }

  syncFromData(enabled) {
    this.enabled = enabled;
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

  playSound() {
    if (!this.enabled || !this.soundEffect) return;
    this.soundEffect.currentTime = 0;
    this.soundEffect.play().catch(() => {});
  }

  toggle() {
    this.enabled = !this.enabled;
    if (this.enabled) {
      this.playBGM();
    } else {
      this.stopBGM();
    }
    return this.enabled;
  }
}

// ==================== STATE ====================

const gameData = new GameData();
const questSystem = new QuestSystem();
const soundSystem = new SoundSystem();
let currentCalendarDate = new Date();
let activeQuestFilter = 'all';

// merge quest data on startup
questSystem.quests.forEach((quest, id) => {
  if (!gameData.quests[id]) {
    gameData.quests[id] = quest;
  }
});
gameData.save();

// ==================== PLAYER / QUEST ACTIONS ====================

function updateAchievements(player) {
  ACHIEVEMENTS.forEach(achievement => {
    if (achievement.condition(player) && !player.badges.includes(achievement.id)) {
      player.addBadge(achievement.id);
    }
  });
}

function addPlayer() {
  const nameInput = $('newPlayerName');
  const classInput = $('newPlayerClass');
  const name = nameInput ? nameInput.value.trim() : '';
  const playerClass = classInput ? classInput.value : 'warrior';

  if (!name) {
    alert('Veuillez entrer un nom de joueur');
    return;
  }

  const playerId = uid('player');
  gameData.players[playerId] = new Player(playerId, name, playerClass);
  gameData.save();

  if (nameInput) {
    nameInput.value = '';
  }

  closeAddPlayerModal();
  renderAll();
  soundSystem.playSound();
}

function deletePlayer(playerId) {
  if (!confirm('Êtes-vous sûr de vouloir supprimer ce joueur ?')) return;
  delete gameData.players[playerId];
  gameData.save();
  renderAll();
}

function completeQuest(questId) {
  if (!Object.keys(gameData.players).length) {
    alert('Veuillez créer un joueur d’abord');
    return;
  }

  const quest = questSystem.getQuest(questId) || gameData.quests[questId];
  if (!quest || quest.completed) return;

  const modal = document.createElement('div');
  modal.className = 'modal show';
  modal.style.zIndex = '2001';
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close" onclick="this.parentElement.parentElement.remove()">&times;</span>
      <h2>Sélectionner un joueur</h2>
      <div style="display:flex;flex-direction:column;gap:10px;">
        ${Object.values(gameData.players).map(player => `
          <button class="btn-primary" style="width:100%;text-align:left;" onclick="completeQuestForPlayer('${questId}','${player.id}'); this.closest('.modal').remove();">
            ${GAME_CONFIG.classesInfo[player.class].emoji} ${escapeHtml(player.name)} (Niveau ${player.level})
          </button>
        `).join('')}
      </div>
    </div>`;
  document.body.appendChild(modal);
}

function completeQuestForPlayer(questId, playerId) {
  const player = gameData.players[playerId];
  const quest = questSystem.getQuest(questId) || gameData.quests[questId];
  if (!player || !quest || quest.completed) return;

  const leveledUp = player.gainXP(quest.xp);
  player.gainGold(quest.gold);
  player.completeQuest(questId);
  updateAchievements(player);

  quest.completed = true;
  quest.completedAt = new Date().toISOString();
  gameData.quests[questId] = quest;
  gameData.save();

  if (leveledUp > 0) {
    createConfetti();
  }

  renderAll();
  soundSystem.playSound();
}

function updatePlayerBadges() {
  Object.values(gameData.players).forEach(player => updateAchievements(player));
}

// ==================== RENDERERS ====================

function updateHeader() {
  const dateEl = $('currentDate');
  const seasonEl = $('currentSeason');
  const eventEl = $('specialEvent');

  if (dateEl) {
    dateEl.textContent = formatDate();
  }

  if (seasonEl) {
    const season = getCurrentSeason();
    seasonEl.textContent = `${season.emoji} ${season.name}`;
  }

  if (eventEl) {
    const events = questSystem.getSpecialEventsToday();
    eventEl.textContent = events.length ? events.map(e => `${e.emoji} ${e.name}`).join(' • ') : 'Aucun';
  }
}

function renderPlayers() {
  const list = $('playersList');
  if (!list) return;

  list.innerHTML = '';
  const players = Object.values(gameData.players);

  if (!players.length) {
    list.innerHTML = '<p style="text-align:center;color:#718096;grid-column:1/-1;">Aucun joueur. Créez-en un pour commencer !</p>';
    return;
  }

  players.forEach(player => {
    const classInfo = GAME_CONFIG.classesInfo[player.class];
    const card = document.createElement('div');
    card.className = 'player-card';
    card.style.cursor = 'pointer';
    card.onclick = () => openPlayerDetailsModal(player.id);

    const xp = player.getXPPercentage();

    card.innerHTML = `
      <div class="player-header">
        <div style="display:flex;gap:12px;align-items:center;">
          <div class="player-avatar player-class-${player.class}">${classInfo.emoji}</div>
          <div class="player-info">
            <h3>${escapeHtml(player.name)}</h3>
            <p class="player-class">${classInfo.name}</p>
            ${player.level >= 10 ? `<div class="player-badge">⭐ Niveau ${player.level}</div>` : ''}
          </div>
        </div>
      </div>

      <div class="player-stats">
        <div class="stat-row"><span class="stat-label">Niveau:</span><span class="stat-value">${player.level}</span></div>
        <div class="stat-row"><span class="stat-label">Quêtes:</span><span class="stat-value">${player.completedQuests.length}</span></div>
        <div class="stat-row"><span class="stat-label">Or:</span><span class="stat-value">💰 ${player.gold}</span></div>
        <div class="stat-row"><span class="stat-label">Badges:</span><span class="stat-value">${player.badges.length}🎖️</span></div>
      </div>

      <div class="xp-container">
        <div class="xp-label"><span>XP:</span><span>${Math.round(xp)}%</span></div>
        <div class="xp-bar">
          <div class="xp-fill" style="width:${xp}%">
            <div class="xp-text">${player.xp}/${player.xpNeeded}</div>
          </div>
        </div>
      </div>
    `;

    list.appendChild(card);
  });
}

function openPlayerDetailsModal(playerId) {
  const player = gameData.players[playerId];
  if (!player) return;

  const modal = $('playerDetailsModal');
  const content = $('playerDetailsContent');
  if (!modal || !content) return;

  const achievements = ACHIEVEMENTS.filter(a => a.condition(player));

  content.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;">
      <div>
        <h2>${GAME_CONFIG.classesInfo[player.class].emoji} ${escapeHtml(player.name)}</h2>
        <p style="color:#718096;">Classe: ${GAME_CONFIG.classesInfo[player.class].name}</p>
      </div>
      <button class="btn-secondary" onclick="deletePlayer('${playerId}'); closePlayerDetailsModal();">Supprimer</button>
    </div>

    <div class="player-stats">
      <div class="stat-row"><span class="stat-label">Niveau:</span><span class="stat-value">${player.level}</span></div>
      <div class="stat-row"><span class="stat-label">XP:</span><span class="stat-value">${player.xp}/${player.xpNeeded}</span></div>
      <div class="stat-row"><span class="stat-label">Or:</span><span class="stat-value">💰 ${player.gold}</span></div>
      <div class="stat-row"><span class="stat-label">Quêtes complétées:</span><span class="stat-value">${player.completedQuests.length}</span></div>
      <div class="stat-row"><span class="stat-label">Badges:</span><span class="stat-value">${player.badges.length}</span></div>
      <div class="stat-row"><span class="stat-label">HP total:</span><span class="stat-value">${Math.floor(player.getHP())}</span></div>
      <div class="stat-row"><span class="stat-label">Attaque:</span><span class="stat-value">${Math.floor(player.getAttackPower())}</span></div>
    </div>

    <div class="xp-container">
      <div class="xp-label"><span>Progression:</span><span>${Math.round(player.getXPPercentage())}%</span></div>
      <div class="xp-bar">
        <div class="xp-fill" style="width:${player.getXPPercentage()}%">
          <div class="xp-text">${player.xp}/${player.xpNeeded}</div>
        </div>
      </div>
    </div>

    <h3 style="margin-top:25px;margin-bottom:15px;">🏆 Réalisations (${achievements.length}/${ACHIEVEMENTS.length})</h3>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
      ${achievements.map(a => `
        <div style="background:#fef5e7;padding:10px;border-radius:8px;text-align:center;">
          <div style="font-size:1.5em;margin-bottom:5px;">${a.icon}</div>
          <div style="font-weight:600;color:#2c3e50;font-size:0.9em;">${a.name}</div>
        </div>
      `).join('')}
    </div>
  `;

  modal.classList.add('show');
}

function closePlayerDetailsModal() {
  $('playerDetailsModal')?.classList.remove('show');
}

function renderQuests(filter = 'all') {
  activeQuestFilter = filter;
  const list = $('questsList');
  if (!list) return;

  list.innerHTML = '';
  const quests = questSystem.getQuestList(filter).sort((a, b) => a.type.localeCompare(b.type) || a.rarity.localeCompare(b.rarity));

  if (!quests.length) {
    list.innerHTML = '<p style="text-align:center;color:#718096;grid-column:1/-1;">Aucune quête disponible pour ce filtre.</p>';
    return;
  }

  quests.forEach(quest => {
    const rarity = GAME_CONFIG.questRarities[quest.rarity];
    const card = document.createElement('div');
    card.className = `quest-card ${quest.completed ? 'completed' : ''} rarity-${quest.rarity.toLowerCase()}`;
    const stars = '⭐'.repeat(quest.rarity === 'E' || quest.rarity === 'D' ? 1 : quest.rarity === 'C' || quest.rarity === 'B' ? 2 : 3);

    card.innerHTML = `
      <div class="quest-header">
        <div>
          <h3 class="quest-title">${quest.title}</h3>
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
        <div class="quest-difficulty">${stars}</div>
        <button class="btn-complete" onclick="completeQuest('${quest.id}')" ${quest.completed ? 'disabled' : ''}>
          ${quest.completed ? '✓ Complétée' : 'Compléter'}
        </button>
      </div>
    `;

    list.appendChild(card);
  });
}

function renderAchievements() {
  const list = $('achievementsList');
  if (!list) return;

  list.innerHTML = '';

  ACHIEVEMENTS.forEach(achievement => {
    const unlockedPlayers = Object.values(gameData.players).filter(p => p.badges.includes(achievement.id));
    const unlocked = unlockedPlayers.length > 0;

    const card = document.createElement('div');
    card.className = `achievement-card ${unlocked ? 'unlocked' : 'locked'}`;
    card.innerHTML = `
      <div class="achievement-icon">${achievement.icon}</div>
      <h3>${achievement.name}</h3>
      <p>${achievement.description}</p>
      <div class="achievement-progress">
        ${unlocked ? `Débloquée par ${unlockedPlayers.length} joueur(s)` : 'Non débloquée'}
      </div>
    `;

    list.appendChild(card);
  });
}

function renderCalendar() {
  const view = $('calendarView');
  const monthLabel = $('calendarMonth');
  if (!view || !monthLabel) return;

  const year = currentCalendarDate.getFullYear();
  const month = currentCalendarDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDate = new Date(firstDay);
  startDate.setDate(startDate.getDate() - ((firstDay.getDay() + 6) % 7));

  const monthNames = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
  monthLabel.textContent = `${monthNames[month]} ${year}`;
  view.innerHTML = '';

  ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].forEach(day => {
    const header = document.createElement('div');
    header.style.fontWeight = '700';
    header.style.textAlign = 'center';
    header.style.padding = '10px';
    header.textContent = day;
    view.appendChild(header);
  });

  const currentDate = new Date(startDate);
  const today = new Date();

  while (currentDate <= lastDay || ((currentDate.getDay() + 6) % 7) !== 0) {
    const dayCell = document.createElement('div');
    dayCell.className = 'calendar-day';

    if (currentDate.getMonth() !== month) {
      dayCell.classList.add('other-month');
    }

    const hasSpecialEvent = [
      ...GAME_CONFIG.internationalHolidays,
      ...GAME_CONFIG.madagascarHolidays,
      ...GAME_CONFIG.japanHolidays
    ].some(event => matchesHoliday(event, currentDate));

    if (currentDate.toDateString() === today.toDateString()) {
      dayCell.classList.add('today');
    } else if (hasSpecialEvent) {
      dayCell.classList.add('event');
    }

    dayCell.innerHTML = `
      <div class="calendar-day-number">${currentDate.getDate()}</div>
      ${hasSpecialEvent ? '<div class="calendar-day-quests">✨</div>' : ''}
    `;

    view.appendChild(dayCell);
    currentDate.setDate(currentDate.getDate() + 1);
  }
}

function prevMonth() {
  currentCalendarDate = new Date(currentCalendarDate.getFullYear(), currentCalendarDate.getMonth() - 1, 1);
  renderCalendar();
}

function nextMonth() {
  currentCalendarDate = new Date(currentCalendarDate.getFullYear(), currentCalendarDate.getMonth() + 1, 1);
  renderCalendar();
}

function openAddPlayerModal() {
  $('addPlayerModal')?.classList.add('show');
}

function closeAddPlayerModal() {
  $('addPlayerModal')?.classList.remove('show');
  if ($('newPlayerName')) {
    $('newPlayerName').value = '';
  }
}

function openCreateRaidModal() {
  if (!$('createRaidModal')) return;
  $('createRaidModal').classList.add('show');
}

function closeCreateRaidModal() {
  $('createRaidModal')?.classList.remove('show');
}

function resetAllData() {
  if (!confirm('⚠️ Êtes-vous sûr ? Toutes les données seront supprimées !')) return;
  gameData.reset();
  questSystem.refresh();
  renderAll();
}

function toggleSound() {
  const enabled = soundSystem.toggle();
  gameData.soundEnabled = enabled;
  gameData.save();

  const btn = $('soundToggle');
  if (btn) {
    btn.textContent = enabled ? '🔊' : '🔇';
  }
}

// ==================== GLOBAL RENDER ====================

function renderAll() {
  updateHeader();
  updatePlayerBadges();
  questSystem.refresh();
  renderPlayers();
  renderQuests(activeQuestFilter);
  renderAchievements();
  renderCalendar();
  gameData.save();
}

// ==================== INIT ====================

document.addEventListener('DOMContentLoaded', () => {
  questSystem.refresh();
  updateHeader();
  renderAll();
  soundSystem.syncFromData(gameData.soundEnabled);
  if (gameData.soundEnabled) {
    soundSystem.playBGM();
  }

  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

      e.currentTarget.classList.add('active');
      const tabId = e.currentTarget.dataset.tab + '-tab';
      $(tabId)?.classList.add('active');
    });
  });

  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      e.currentTarget.classList.add('active');
      renderQuests(e.currentTarget.dataset.filter || 'all');
    });
  });
});

// expose for inline HTML onclick handlers
window.addPlayer = addPlayer;
window.deletePlayer = deletePlayer;
window.completeQuest = completeQuest;
window.completeQuestForPlayer = completeQuestForPlayer;
window.openAddPlayerModal = openAddPlayerModal;
window.closeAddPlayerModal = closeAddPlayerModal;
window.openPlayerDetailsModal = openPlayerDetailsModal;
window.closePlayerDetailsModal = closePlayerDetailsModal;
window.prevMonth = prevMonth;
window.nextMonth = nextMonth;
window.toggleSound = toggleSound;
window.resetAllData = resetAllData;
