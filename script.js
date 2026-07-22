/* ==========================================================================
   ⚔️ RPG QUEST MASTER - SCRIPT PRINCIPAL ÉLABORÉ (SCRIPT.JS)
   ========================================================================== */

'use strict';

// ==================== 1. CONFIGURATION & DONNÉES DU JEU ====================

const STORAGE_KEY = 'rpg_quest_master_data_v3';

const GAME_CONFIG = {
  leveling: {
    baseXP: 100,
    growth: 1.22
  },
  quests: {
    dailyCounts: { E: 5, D: 4, C: 3, B: 2, A: 1 },
    undoWindowMs: 10 * 60 * 1000 // 10 minutes
  },
  seasons: {
    spring: { name: 'Printemps Éthéré', emoji: '🌸', months: [3, 4, 5] },
    summer: { name: 'Été Flamboyant', emoji: '☀️', months: [6, 7, 8] },
    autumn: { name: 'Automne Mystique', emoji: '🍂', months: [9, 10, 11] },
    winter: { name: 'Hiver Glacial', emoji: '❄️', months: [12, 1, 2] }
  },
  questRarities: {
    E: { name: 'E - Très facile', xp: 15, gold: 5, color: '#475569', icon: '⚪' },
    D: { name: 'D - Facile', xp: 30, gold: 12, color: '#94a3b8', icon: '🟢' },
    C: { name: 'C - Simple', xp: 55, gold: 25, color: '#22c55e', icon: '🔵' },
    B: { name: 'B - Moyen', xp: 90, gold: 45, color: '#06b6d4', icon: '🟣' },
    A: { name: 'A - Difficile', xp: 140, gold: 75, color: '#f97316', icon: '🟠' },
    S: { name: 'S - Hebdomadaire', xp: 250, gold: 150, color: '#ef4444', icon: '🔴' },
    SS: { name: 'SS - Mensuelle', xp: 500, gold: 350, color: '#a855f7', icon: '🔮' },
    SSS: { name: 'SSS - Annuelle Légendaire', xp: 1200, gold: 1000, color: '#ffd700', icon: '👑' }
  },
  classesInfo: {
    warrior: { emoji: '⚔️', name: 'Guerrier de Sang', color: '#ef4444', primaryStat: 'physique' },
    mage: { emoji: '🔮', name: 'Mage Arcanique', color: '#a855f7', primaryStat: 'intelligence' },
    archer: { emoji: '🏹', name: 'Ranger de l’Ombre', color: '#22c55e', primaryStat: 'creativite' },
    paladin: { emoji: '✨', name: 'Paladin Lumineux', color: '#f59e0b', primaryStat: 'discipline' }
  },
  statDefinitions: {
    physique: { label: 'Physique', emoji: '💪' },
    intelligence: { label: 'Intelligence', emoji: '🧠' },
    discipline: { label: 'Discipline', emoji: '🎯' },
    social: { label: 'Social', emoji: '🤝' },
    creativite: { label: 'Créativité', emoji: '🎨' },
    sante: { label: 'Santé', emoji: '❤️' },
    finance: { label: 'Finance', emoji: '💰' }
  },
  internationalHolidays: [
    { type: 'date', date: '01-01', name: 'Nouvel An', emoji: '🎆', stat: 'discipline' },
    { type: 'date', date: '03-08', name: 'Journée des Femmes', emoji: '👩', stat: 'social' },
    { type: 'date', date: '04-22', name: 'Jour de la Terre', emoji: '🌍', stat: 'sante' },
    { type: 'date', date: '05-01', name: 'Fête du Travail', emoji: '👨‍💼', stat: 'discipline' },
    { type: 'date', date: '06-21', name: 'Fête de la Musique', emoji: '🎵', stat: 'creativite' },
    { type: 'date', date: '10-31', name: 'Halloween', emoji: '👻', stat: 'social' },
    { type: 'date', date: '12-25', name: 'Noël', emoji: '🎄', stat: 'social' }
  ]
};

const STAT_QUEST_POOLS = {
  physique: [
    'Réaliser 25 séries d’exercices physiques',
    'Session de marche active de 30 minutes',
    'Séance complète d’étirements musculaires',
    'Monter 100 marches d’escalier d’affilée'
  ],
  intelligence: [
    'Lire 25 pages d’un livre d’apprentissage',
    'Résoudre une énigme ou un problème complexe',
    'Suivre un cours ou tutoriel instructif',
    'Rédiger un résumé de connaissances acquises'
  ],
  discipline: [
    'Planifier l’intégralité de la journée du lendemain',
    'Session de focus profond (Pomodoro 45 min)',
    'Ranger et purifier complètement le bureau',
    'Exécuter la routine matinale sans déviation'
  ],
  social: [
    'Prendre des nouvelles d’un ami ou proche',
    'Exprimer un compliment sincère à quelqu’un',
    'Participer à une discussion de groupe constructive',
    'Aider activement un collègue ou membre de guilde'
  ],
  creativite: [
    'Écrire 300 mots de création littéraire',
    'Réaliser un dessin, schéma ou concept visuel',
    'Proposer une solution innovante à un problème',
    'Composer ou arranger un motif musical'
  ],
  sante: [
    'Boire au minimum 2 Litres d’eau pure',
    'Session de méditation et respiration de 10 min',
    'Consommer un repas 100% équilibré et naturel',
    'Éteindre tous les écrans 1 heure avant le coucher'
  ],
  finance: [
    'Catégoriser et enregistrer toutes les dépenses du jour',
    'Économiser une somme dédiée au coffre de guilde',
    'Analyser son budget hebdomadaire',
    'Éviter tout achat impulsif durant la journée'
  ]
};

const LOOT_TABLE = [
  { rarity: 'common', weight: 55, name: 'Potion de Volonté', stat: 'discipline', bonus: 2, icon: '🧪' },
  { rarity: 'rare', weight: 28, name: 'Bague d’Endurance', stat: 'physique', bonus: 4, icon: '💍' },
  { rarity: 'epic', weight: 12, name: 'Grimoire d’Omniscience', stat: 'intelligence', bonus: 7, icon: '📖' },
  { rarity: 'legendary', weight: 5, name: 'Couronne du Monarque', stat: 'all', bonus: 12, icon: '👑' }
];

const ACHIEVEMENTS = [
  { id: 'first_quest', icon: '📜', name: 'Éveil du Héros', description: 'Compléter votre première quête', condition: p => p.completedQuests.length >= 1 },
  { id: 'quest_10', icon: '🎯', name: 'Aventurier Assidu', description: 'Accomplir 10 quêtes au total', condition: p => p.completedQuests.length >= 10 },
  { id: 'quest_50', icon: '⚔️', name: 'Tueur de Démons', description: 'Accomplir 50 quêtes', condition: p => p.completedQuests.length >= 50 },
  { id: 'level_5', icon: '🌟', name: 'Ascension I', description: 'Atteindre le niveau 5', condition: p => p.level >= 5 },
  { id: 'level_15', icon: '🔥', name: 'Ascension II', description: 'Atteindre le niveau 15', condition: p => p.level >= 15 },
  { id: 'gold_1000', icon: '💰', name: 'Pactole Rutilant', description: 'Accumuler 1000 Pièces d’Or', condition: p => p.gold >= 1000 }
];

// ==================== 2. FONCTIONS UTILITAIRES & HELPERS ====================

const $ = (id) => document.getElementById(id);

function safeJsonParse(val, fallback) {
  try { return val ? JSON.parse(val) : fallback; }
  catch { return fallback; }
}

function deepClone(obj) { return JSON.parse(JSON.stringify(obj)); }

function uid(prefix = 'id') {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
}

function pad2(n) { return String(n).padStart(2, '0'); }

function dateKey(d = new Date()) {
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function getCurrentSeason() {
  const m = new Date().getMonth() + 1;
  return Object.values(GAME_CONFIG.seasons).find(s => s.months.includes(m)) || GAME_CONFIG.seasons.spring;
}

function seedFromString(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = ((h << 5) - h) + str.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

function pickDeterministic(arr, seed) {
  if (!arr || !arr.length) return null;
  return arr[seed % arr.length];
}

function showToast(msg, type = 'info') {
  let container = $('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  toast.className = `rpg-toast ${type} show`;
  toast.textContent = msg;
  container.appendChild(toast);
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}

function showFloatingText(text, x, y, type = 'xp') {
  const el = document.createElement('div');
  el.className = type === 'damage' ? 'damage-notification damage-float' : 'xp-notification xp-float';
  el.textContent = text;
  el.style.left = `${x}px`;
  el.style.top = `${y}px`;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 1200);
}

function createConfetti() {
  const zone = $('confetti');
  if (!zone) return;
  zone.innerHTML = '';
  for (let i = 0; i < 35; i++) {
    const p = document.createElement('div');
    p.style.position = 'absolute';
    p.style.left = Math.random() * 100 + '%';
    p.style.top = '-10px';
    p.style.width = '8px';
    p.style.height = '8px';
    p.style.background = ['#ffd700', '#6366f1', '#a855f7', '#22c55e', '#ef4444'][Math.floor(Math.random() * 5)];
    p.style.borderRadius = '50%';
    p.style.transition = 'all 2.5s cubic-bezier(0.25, 1, 0.5, 1)';
    zone.appendChild(p);

    setTimeout(() => {
      p.style.transform = `translate(${(Math.random() - 0.5) * 300}px, ${window.innerHeight + 20}px) rotate(${Math.random() * 720}deg)`;
      p.style.opacity = '0';
    }, 50);
    setTimeout(() => p.remove(), 2600);
  }
}

// ==================== 3. GESTION DE L'ÉTAT DU JEU (STATE) ====================

let GameState = {
  player: null,
  quests: [],
  raids: [],
  logs: [],
  chatMessages: [],
  activeTab: 'quests',
  questFilter: 'all'
};

function getRequiredXP(level) {
  return Math.floor(GAME_CONFIG.leveling.baseXP * Math.pow(GAME_CONFIG.leveling.growth, level - 1));
}

function getPlayerTitle(level) {
  if (level >= 30) return '👑 Souverain Divin';
  if (level >= 20) return '⚔️ Légende Vivante';
  if (level >= 10) return '🔥 Champion Arcanique';
  if (level >= 5) return '🛡️ Aventurier Aguerri';
  return '🌱 Novice Prometteur';
}

function createDefaultPlayer(name = 'Chasseur S-Rank', pClass = 'warrior') {
  return {
    id: uid('player'),
    name: name,
    class: pClass,
    level: 1,
    xp: 0,
    gold: 50,
    stats: { physique: 10, intelligence: 10, discipline: 10, social: 10, creativite: 10, sante: 10, finance: 10 },
    inventory: [
      { id: uid('item'), name: 'Anneau de Débutant', stat: 'discipline', bonus: 1, icon: '💍', equipped: true }
    ],
    achievements: [],
    completedQuests: [],
    streak: { current: 1, lastDate: dateKey() }
  };
}

function createDefaultRaids() {
  return [
    {
      id: uid('raid'),
      name: 'Seigneur des Ombres Ignis',
      description: 'Un boss primordial résidant dans la faille temporelle. Infligez des dégâts en complétant vos quêtes !',
      maxHp: 1000,
      currentHp: 750,
      rewards: { xp: 500, gold: 300 },
      icon: '🐉'
    }
  ];
}

function loadState() {
  const saved = safeJsonParse(localStorage.getItem(STORAGE_KEY), null);
  if (saved) {
    GameState = saved;
  } else {
    GameState.player = createDefaultPlayer();
    GameState.raids = createDefaultRaids();
    generateDailyQuests();
    saveState();
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(GameState));
}

// ==================== 4. SYSTEME DE QUÊTES & RAIDS ====================

function generateDailyQuests() {
  const today = dateKey();
  const seed = seedFromString(today);
  const newQuests = [];

  // Quêtes quotidiennes générées dynamiquement
  Object.entries(GAME_CONFIG.statDefinitions).forEach(([statKey, statInfo], idx) => {
    const pool = STAT_QUEST_POOLS[statKey] || ['Mission spéciale de ' + statInfo.label];
    const title = pickDeterministic(pool, seed + idx);
    const rarity = idx % 2 === 0 ? 'D' : 'C';

    newQuests.push({
      id: uid('quest'),
      title: title,
      description: `Développe ta stat [${statInfo.label}] pour renforcer ton personnage.`,
      rarity: rarity,
      type: 'daily',
      stat: statKey,
      xp: GAME_CONFIG.questRarities[rarity].xp,
      gold: GAME_CONFIG.questRarities[rarity].gold,
      dateCreated: today,
      completed: false
    });
  });

  // Quête Légendaire Annuelle SSS
  newQuests.push({
    id: uid('quest_sss'),
    title: 'Ascension Ultimatum SSS',
    description: 'Atteignez un cap majeur de vie cette année pour débloquer le rang suprême.',
    rarity: 'SSS',
    type: 'annual',
    stat: 'discipline',
    xp: GAME_CONFIG.questRarities.SSS.xp,
    gold: GAME_CONFIG.questRarities.SSS.gold,
    dateCreated: today,
    completed: false
  });

  GameState.quests = [...GameState.quests.filter(q => q.type !== 'daily' || q.completed), ...newQuests];
}

function completeQuest(questId, event) {
  const quest = GameState.quests.find(q => q.id === questId);
  if (!quest || quest.completed) return;

  quest.completed = true;
  quest.completedAt = Date.now();

  const player = GameState.player;
  player.xp += quest.xp;
  player.gold += quest.gold;
  player.completedQuests.push(quest.id);

  // Augmentation de stat
  if (quest.stat && player.stats[quest.stat] !== undefined) {
    player.stats[quest.stat] += 1;
  }

  // Animation Effet Flottant (XP & Or)
  if (event && event.clientX) {
    showFloatingText(`+${quest.xp} XP`, event.clientX, event.clientY - 20, 'xp');
  }

  // Dégâts au Boss de Raid
  damageActiveRaids(quest.xp, event);

  // Vérifier Level Up
  checkLevelUp();

  // Tirage de Loot
  if (Math.random() < 0.35) {
    triggerLootDrop();
  }

  // Log de l'action
  addLog(`Quête accomplie : ${quest.title} (+${quest.xp} XP, +${quest.gold} Or)`, quest.id);

  saveState();
  renderAll();
  createConfetti();
  showToast(`Quête terminée ! +${quest.xp} XP / +${quest.gold} Or`, 'success');
}

function damageActiveRaids(damageAmount, event) {
  GameState.raids.forEach(raid => {
    if (raid.currentHp > 0) {
      raid.currentHp = Math.max(0, raid.currentHp - damageAmount);
      if (event && event.clientX) {
        showFloatingText(`-${damageAmount} HP`, event.clientX + 40, event.clientY - 40, 'damage');
      }
      if (raid.currentHp === 0) {
        GameState.player.xp += raid.rewards.xp;
        GameState.player.gold += raid.rewards.gold;
        showToast(`VICTOIRE DE RAID ! Boss ${raid.name} vaincu !`, 'success');
      }
    }
  });
}

function checkLevelUp() {
  const player = GameState.player;
  let req = getRequiredXP(player.level);

  while (player.xp >= req) {
    player.xp -= req;
    player.level += 1;
    req = getRequiredXP(player.level);
    showToast(`🎉 MONTÉE DE NIVEAU ! Vous êtes désormais Niveau ${player.level} !`, 'success');
  }
}

function triggerLootDrop() {
  const loot = LOOT_TABLE[Math.floor(Math.random() * LOOT_TABLE.length)];
  const item = {
    id: uid('item'),
    name: loot.name,
    stat: loot.stat,
    bonus: loot.bonus,
    icon: loot.icon,
    equipped: false
  };
  GameState.player.inventory.push(item);
  showToast(`🎁 BUTIN TROUVÉ : ${item.icon} ${item.name} (+${item.bonus} ${item.stat})`, 'info');
}

function undoQuestCompletion(logId) {
  const logIndex = GameState.logs.findIndex(l => l.id === logId);
  if (logIndex === -1) return;

  const log = GameState.logs[logIndex];
  if (!log.questId) return;

  const quest = GameState.quests.find(q => q.id === log.questId);
  if (quest && quest.completed) {
    quest.completed = false;
    GameState.player.xp = Math.max(0, GameState.player.xp - quest.xp);
    GameState.player.gold = Math.max(0, GameState.player.gold - quest.gold);
    
    // Retrait du journal
    GameState.logs.splice(logIndex, 1);
    
    saveState();
    renderAll();
    showToast('Action annulée avec succès.', 'warning');
  }
}

function addLog(text, questId = null) {
  GameState.logs.unshift({
    id: uid('log'),
    text: text,
    questId: questId,
    timestamp: Date.now()
  });
  if (GameState.logs.length > 30) GameState.logs.pop();
}

// ==================== 5. RENDU DE L'INTERFACE (UI RENDERERS) ====================

function renderHero() {
  const p = GameState.player;
  if (!p) return;

  const reqXp = getRequiredXP(p.level);
  const xpPercent = Math.min(100, Math.floor((p.xp / reqXp) * 100));
  const season = getCurrentSeason();

  // Injection du Header Hero
  const heroContainer = $('heroPanel');
  if (heroContainer) {
    heroContainer.innerHTML = `
      <div class="hero-main">
        <div class="hero-badge glow-effect">${season.emoji} Saison ${season.name}</div>
        <h1>${escapeHtml(p.name)}</h1>
        <p class="hero-subtitle">${getPlayerTitle(p.level)} • Classe: <strong>${GAME_CONFIG.classesInfo[p.class]?.name || 'Guerrier'}</strong></p>
      </div>
      <div class="hero-stats-summary">
        <div style="margin-bottom: 10px; font-weight:700;">Niveau ${p.level} • <span style="color:#ffd700;">💰 ${p.gold} Or</span></div>
        <div class="xp-bar-container" title="${p.xp} / ${reqXp} XP">
          <div class="xp-bar-fill" style="width: ${xpPercent}%;"></div>
        </div>
        <div style="font-size:0.85rem; color:var(--text-secondary); margin-top:5px; text-align:right;">${p.xp} / ${reqXp} XP (${xpPercent}%)</div>
      </div>
    `;
  }
}

function renderQuests() {
  const container = $('questsContainer');
  if (!container) return;

  let filtered = GameState.quests;
  if (GameState.questFilter !== 'all') {
    filtered = filtered.filter(q => q.type === GameState.questFilter || q.rarity === GameState.questFilter);
  }

  if (filtered.length === 0) {
    container.innerHTML = `<div style="grid-column: 1/-1; text-align:center; padding: 40px; color: var(--text-muted);">Aucune quête trouvée pour ce filtre.</div>`;
    return;
  }

  container.innerHTML = filtered.map(q => {
    const rarityInfo = GAME_CONFIG.questRarities[q.rarity] || GAME_CONFIG.questRarities.E;
    return `
      <div class="quest-card rarity-${q.rarity.toLowerCase()} ${q.completed ? 'completed' : ''}">
        <div>
          <div class="quest-header">
            <div class="quest-title">${escapeHtml(q.title)}</div>
            <span class="quest-rarity">${rarityInfo.icon} ${q.rarity}</span>
          </div>
          <div class="quest-description">${escapeHtml(q.description)}</div>
          <div class="quest-rewards">
            <span class="quest-xp">+${q.xp} XP</span>
            <span class="quest-gold">💰 +${q.gold}</span>
            ${q.stat ? `<span class="quest-xp" style="color:#22c55e;">+1 ${GAME_CONFIG.statDefinitions[q.stat]?.label || ''}</span>` : ''}
          </div>
        </div>
        <div class="quest-footer">
          ${q.completed 
            ? `<button class="btn-complete" disabled style="background:#334155; cursor:default;">✔️ Accomplie</button>` 
            : `<button class="btn-complete" onclick="completeQuest('${q.id}', event)">Valider la Quête</button>`}
        </div>
      </div>
    `;
  }).join('');
}

function renderPlayers() {
  const container = $('playersContainer');
  if (!container) return;

  const p = GameState.player;
  const classInfo = GAME_CONFIG.classesInfo[p.class] || GAME_CONFIG.classesInfo.warrior;

  container.innerHTML = `
    <div class="player-card">
      <div class="player-header">
        <div class="player-avatar player-class-${p.class}">${classInfo.emoji}</div>
        <div class="player-info">
          <h3>${escapeHtml(p.name)}</h3>
          <span class="player-badge">${classInfo.name}</span>
        </div>
      </div>
      <div>
        <strong>Stats IRL :</strong>
        <div class="stats-grid" style="display:grid; grid-template-columns: repeat(2, 1fr); gap:8px; margin-top:8px;">
          ${Object.entries(p.stats).map(([k, v]) => `
            <div style="background:rgba(255,255,255,0.05); padding:8px; border-radius:8px; font-size:0.9rem;">
              ${GAME_CONFIG.statDefinitions[k]?.emoji || '📊'} ${GAME_CONFIG.statDefinitions[k]?.label || k}: <strong>${v}</strong>
            </div>
          `).join('')}
        </div>
      </div>
      <div>
        <strong>Équipement & Inventaire :</strong>
        <div style="display:flex; gap:8px; flex-wrap:wrap; margin-top:8px;">
          ${p.inventory.map(item => `
            <span style="background:rgba(99, 102, 241, 0.2); border:1px solid rgba(99, 102, 241, 0.4); padding:4px 10px; border-radius:999px; font-size:0.85rem;">
              ${item.icon} ${escapeHtml(item.name)} (+${item.bonus} ${item.stat})
            </span>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

function renderRaids() {
  const container = $('raidsContainer');
  if (!container) retu
