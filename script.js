/* RPG Quest Master
   Script complet avec:
   - joueurs / quêtes / raids
   - stats IRL + titres
   - inventaire + loot
   - logs d’actions + annulation
   - Firebase Auth
   - chat groupe + DM temps réel
   - sauvegarde localStorage + sync cloud optionnelle
   - onglet Social injecté automatiquement si absent
*/

'use strict';

// ==================== CONFIGURATION ====================

const STORAGE_KEY = 'rpg_game_data_v2';
const CLOUD_STATE_COLLECTION = 'userStates';
const USERS_COLLECTION = 'users';
const MESSAGES_COLLECTION = 'messages';

const GAME_CONFIG = {
  leveling: {
    baseXP: 100,
    growth: 1.18
  },
  quests: {
    dailyCounts: { E: 5, D: 4, C: 3, B: 2, A: 1 },
    undoWindowMs: 10 * 60 * 1000
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
    { type: 'date', date: '03-08', name: 'Journée des Femmes', emoji: '👩', stat: 'social' },
    { type: 'date', date: '03-21', name: 'Journée Mondiale de l’Eau', emoji: '💧', stat: 'sante' },
    { type: 'date', date: '04-22', name: 'Jour de la Terre', emoji: '🌍', stat: 'sante' },
    { type: 'date', date: '05-01', name: 'Fête du Travail', emoji: '👨‍💼', stat: 'discipline' },
    { type: 'date', date: '06-05', name: 'Journée Mondiale de l’Environnement', emoji: '🌱', stat: 'sante' },
    { type: 'date', date: '06-21', name: 'Journée de la Musique', emoji: '🎵', stat: 'creativite' },
    { type: 'date', date: '10-31', name: 'Halloween', emoji: '👻', stat: 'social' },
    { type: 'date', date: '12-25', name: 'Noël', emoji: '🎄', stat: 'social' }
  ],
  madagascarHolidays: [
    { type: 'date', date: '01-01', name: 'Nouvel An', emoji: '🎆', stat: 'discipline' },
    { type: 'date', date: '03-29', name: 'Commémoration de la Rébellion de 1947', emoji: '🇲🇬', stat: 'discipline' },
    { type: 'date', date: '05-01', name: 'Fête du Travail', emoji: '👨‍💼', stat: 'discipline' },
    { type: 'date', date: '06-26', name: 'Fête de l’Indépendance', emoji: '🇲🇬', stat: 'social' },
    { type: 'date', date: '08-15', name: 'Assomption', emoji: '⛪', stat: 'sante' },
    { type: 'date', date: '11-01', name: 'Toussaint', emoji: '🕯️', stat: 'social' },
    { type: 'date', date: '12-25', name: 'Noël', emoji: '🎄', stat: 'social' }
  ],
  japanHolidays: [
    { type: 'date', date: '01-01', name: 'Nouvel An Japonais', emoji: '🎋', stat: 'discipline' },
    { type: 'date', date: '01-10', name: 'Jour de la Majorité', emoji: '👘', stat: 'social' },
    { type: 'date', date: '02-11', name: 'Fondation du Japon', emoji: '🏯', stat: 'discipline' },
    { type: 'date', date: '03-21', name: 'Équinoxe du Printemps', emoji: '🌸', stat: 'creativite' },
    { type: 'date', date: '05-03', name: 'Fête de la Constitution', emoji: '📜', stat: 'intelligence' },
    { type: 'date', date: '05-05', name: 'Jour des Enfants', emoji: '🎏', stat: 'social' },
    { type: 'range', month: 8, startDay: 13, endDay: 16, name: 'Obon', emoji: '🏮', stat: 'social' },
    { type: 'date', date: '09-23', name: 'Équinoxe d’Automne', emoji: '🍂', stat: 'creativite' },
    { type: 'date', date: '11-03', name: 'Jour de la Culture', emoji: '🎭', stat: 'creativite' },
    { type: 'date', date: '11-23', name: 'Jour de Remerciement', emoji: '🙏', stat: 'social' }
  ]
};

const STAT_QUEST_POOLS = {
  physique: ['Faire 20 squats', 'Marcher 20 minutes', 'Faire 10 pompes', 'Monter des escaliers pendant 10 minutes', 'Faire une séance d’étirements', 'Bouger sans écran pendant 30 minutes'],
  intelligence: ['Lire 20 minutes', 'Apprendre 10 mots nouveaux', 'Résoudre un problème difficile', 'Regarder un cours utile', 'Écrire un résumé de ce que tu apprends', 'Étudier un sujet sans distraction'],
  discipline: ['Planifier ta journée', 'Ranger ton espace de travail', 'Faire 25 minutes de focus profond', 'Terminer une tâche commencée', 'Respecter une routine complète', 'Ne pas procrastiner pendant 1 heure'],
  social: ['Envoyer un message sincère', 'Parler positivement à quelqu’un', 'Prendre des nouvelles d’un proche', 'Aider une personne concrètement', 'Faire un compliment honnête', 'Créer un lien avec quelqu’un de nouveau'],
  creativite: ['Écrire 100 mots', 'Dessiner quelque chose', 'Imaginer une idée de projet', 'Créer une mini histoire', 'Faire un croquis rapide', 'Réinventer une tâche quotidienne'],
  sante: ['Boire suffisamment d’eau', 'Dormir à heure régulière', 'Respirer profondément 5 minutes', 'Manger plus proprement sur un repas', 'Faire une pause sans écran', 'Marcher après un repas'],
  finance: ['Noter toutes tes dépenses du jour', 'Économiser une petite somme', 'Éviter un achat impulsif', 'Faire un mini budget', 'Comparer un prix avant d’acheter', 'Mettre de côté pour un objectif']
};

const QUEST_POOLS = {
  weekly: [
    { title: 'Duel épique', description: 'Terminer une activité coopérative avec un autre joueur.' },
    { title: 'Trésor caché', description: 'Découvrir ou apprendre quelque chose de nouveau hors routine.' },
    { title: 'Protection du royaume', description: 'Réduire une source de désordre dans ton environnement.' },
    { title: 'Marche du héros', description: 'Cumuler une grosse session d’activité physique.' }
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

const LOOT_TABLE = [
  {
    rarity: 'common',
    weight: 60,
    items: [
      { name: 'Potion de concentration', stat: 'discipline', bonus: 1 },
      { name: 'Bracelet de marche', stat: 'physique', bonus: 1 },
      { name: 'Carnet de notes', stat: 'intelligence', bonus: 1 }
    ]
  },
  {
    rarity: 'rare',
    weight: 25,
    items: [
      { name: 'Talisman du focus', stat: 'discipline', bonus: 2 },
      { name: 'Bague de vitalité', stat: 'sante', bonus: 2 },
      { name: 'Pendentif de charisme', stat: 'social', bonus: 2 }
    ]
  },
  {
    rarity: 'epic',
    weight: 10,
    items: [
      { name: 'Grimoire de sagesse', stat: 'intelligence', bonus: 3 },
      { name: 'Amulette du guerrier', stat: 'physique', bonus: 3 },
      { name: 'Masque du créateur', stat: 'creativite', bonus: 3 }
    ]
  },
  {
    rarity: 'legendary',
    weight: 5,
    items: [
      { name: 'Couronne du maître', stat: 'discipline', bonus: 5 },
      { name: 'Cristal de prospérité', stat: 'finance', bonus: 5 },
      { name: 'Sceau de légende', stat: 'all', bonus: 5 }
    ]
  }
];

const ACHIEVEMENTS = [
  { id: 'first_quest', icon: '📜', name: 'Première quête', description: 'Compléter une quête', condition: p => p.completedQuests.length >= 1 },
  { id: 'quest_master', icon: '🎯', name: 'Maître des quêtes', description: 'Compléter 10 quêtes', condition: p => p.completedQuests.length >= 10 },
  { id: 'level_5', icon: '⬆️', name: 'Niveau 5', description: 'Atteindre le niveau 5', condition: p => p.level >= 5 },
  { id: 'level_10', icon: '⬆️⬆️', name: 'Niveau 10', description: 'Atteindre le niveau 10', condition: p => p.level >= 10 },
  { id: 'level_25', icon: '👑', name: 'Roi du combat', description: 'Atteindre le niveau 25', condition: p => p.level >= 25 },
  { id: 'gold_farmer', icon: '💰', name: 'Collecteur d’or', description: 'Gagner 500 pièces', condition: p => p.gold >= 500 },
  { id: 'rich', icon: '💎', name: 'Riche', description: 'Gagner 2000 pièces', condition: p => p.gold >= 2000 },
  { id: 'hard_worker', icon: '💪', name: 'Travailleur acharné', description: 'Compléter 50 quêtes', condition: p => p.completedQuests.length >= 50 },
  { id: 'discipline_master', icon: '🎯', name: 'Maître de la discipline', description: 'Atteindre 100 en discipline', condition: p => p.stats.discipline >= 100 },
  { id: 'intelligence_master', icon: '🧠', name: 'Sage', description: 'Atteindre 100 en intelligence', condition: p => p.stats.intelligence >= 100 },
  { id: 'finance_master', icon: '💰', name: 'Magnat', description: 'Atteindre 100 en finance', condition: p => p.stats.finance >= 100 },
  { id: 'streak_7', icon: '🔥', name: 'Série de feu', description: 'Avoir une série de 7 jours', condition: p => p.streak.current >= 7 }
];

const QUEST_TYPE_ORDER = { daily: 1, weekly: 2, monthly: 3, annual: 4, special: 5 };

// ==================== HELPERS ====================

const $ = (id) => document.getElementById(id);

function safeJsonParse(value, fallback) {
  try {
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function deepClone(value) {
  return JSON.parse(JSON.stringify(value));
}

function uid(prefix = 'id') {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

function pad2(value) {
  return String(value).padStart(2, '0');
}

function dateKey(date = new Date()) {
  return `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(date.getDate())}`;
}

function monthKey(date = new Date()) {
  return `${date.getFullYear()}-${pad2(date.getMonth() + 1)}`;
}

function slugify(text) {
  return String(text)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_|_$/g, '');
}

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
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

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function sum(values) {
  return values.reduce((acc, v) => acc + v, 0);
}

function getISOWeekKey(date = new Date()) {
  const tmp = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const day = tmp.getUTCDay() || 7;
  tmp.setUTCDate(tmp.getUTCDate() + 4 - day);
  const yearStart = new Date(Date.UTC(tmp.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil((((tmp - yearStart) / 86400000) + 1) / 7);
  return `${tmp.getUTCFullYear()}-W${pad2(weekNo)}`;
}

function matchesHoliday(holiday, date = new Date()) {
  const key = `${pad2(date.getMonth() + 1)}-${pad2(date.getDate())}`;
  if (holiday.type === 'date') return holiday.date === key;
  if (holiday.type === 'range') {
    return date.getMonth() + 1 === holiday.month && date.getDate() >= holiday.startDay && date.getDate() <= holiday.endDay;
  }
  return false;
}

function getStrongestStat(stats) {
  return Object.entries(stats).sort((a, b) => b[1] - a[1])[0]?.[0] || 'discipline';
}

function getWeakestStat(stats) {
  return Object.entries(stats).sort((a, b) => a[1] - b[1])[0]?.[0] || 'discipline';
}

function getLootRarity() {
  const roll = Math.random() * 100;
  let acc = 0;
  for (const tier of LOOT_TABLE) {
    acc += tier.weight;
    if (roll <= acc) return tier;
  }
  return LOOT_TABLE[0];
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

function showToast(message, type = 'info') {
  let container = $('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `rpg-toast ${type}`;
  toast.textContent = message;
  container.appendChild(toast);

  requestAnimationFrame(() => toast.classList.add('show'));
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 250);
  }, 2200);
}

function injectEnhancementStyles() {
  if ($('rpg-enhancement-styles')) return;
  const style = document.createElement('style');
  style.id = 'rpg-enhancement-styles';
  style.textContent = `
    .rpg-toast {
      position: fixed;
      right: 20px;
      bottom: 20px;
      transform: translateY(20px);
      opacity: 0;
      padding: 12px 16px;
      border-radius: 14px;
      background: rgba(17, 24, 39, 0.94);
      color: #fff;
      font-weight: 600;
      box-shadow: 0 12px 28px rgba(0,0,0,.25);
      z-index: 4000;
      transition: all .25s ease;
      backdrop-filter: blur(10px);
      max-width: min(92vw, 360px);
    }
    .rpg-toast.show { opacity: 1; transform: translateY(0); }
    .rpg-toast.success { border-left: 4px solid #2ecc71; }
    .rpg-toast.warning { border-left: 4px solid #f39c12; }
    .rpg-toast.error { border-left: 4px solid #e74c3c; }
    .rpg-toast.info { border-left: 4px solid #3498db; }

    .player-title {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 6px 10px;
      margin-top: 8px;
      border-radius: 999px;
      background: linear-gradient(135deg, rgba(102,126,234,.15), rgba(118,75,162,.15));
      font-weight: 700;
      font-size: .9rem;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 10px;
      margin-top: 16px;
    }

    .stat-chip, .mini-card {
      border-radius: 14px;
      background: rgba(255,255,255,.82);
      padding: 10px 12px;
      box-shadow: 0 8px 18px rgba(0,0,0,.06);
      border: 1px solid rgba(255,255,255,.65);
    }

    .stat-chip strong, .mini-card strong {
      display: block;
      font-size: .95rem;
      margin-bottom: 4px;
    }

    .inventory-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
      gap: 10px;
      margin-top: 10px;
    }

    .inventory-item {
      border-radius: 14px;
      padding: 10px 12px;
      background: linear-gradient(135deg, rgba(102,126,234,.08), rgba(118,75,162,.08));
      border: 1px solid rgba(102,126,234,.12);
    }

    .quest-focus-banner {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      align-items: center;
      padding: 10px 12px;
      border-radius: 16px;
      background: linear-gradient(135deg, rgba(102,126,234,.10), rgba(118,75,162,.10));
      border: 1px solid rgba(102,126,234,.14);
      margin-bottom: 14px;
    }

    .social-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 16px;
      align-items: start;
    }

    .social-card {
      border-radius: 22px;
      background: rgba(255,255,255,.92);
      box-shadow: 0 16px 36px rgba(0,0,0,.08);
      padding: 16px;
      border: 1px solid rgba(255,255,255,.7);
    }

    .social-card h3 {
      margin-bottom: 12px;
    }

    .chat-shell {
      display: flex;
      flex-direction: column;
      gap: 10px;
      min-height: 340px;
    }

    .chat-messages {
      max-height: 320px;
      overflow: auto;
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding-right: 4px;
    }

    .chat-message {
      padding: 10px 12px;
      border-radius: 14px;
      background: rgba(102,126,234,.06);
      border: 1px solid rgba(102,126,234,.10);
    }

    .chat-message.me {
      background: rgba(46,204,113,.08);
      border-color: rgba(46,204,113,.16);
      align-self: flex-end;
    }

    .chat-meta {
      font-size: .78rem;
      color: #718096;
      margin-bottom: 4px;
    }

    .chat-input-row {
      display: flex;
      gap: 8px;
    }

    .chat-input-row input,
    .auth-fields input,
    .auth-fields select {
      width: 100%;
      border: 1px solid rgba(148,163,184,.35);
      border-radius: 12px;
      padding: 10px 12px;
      outline: none;
      background: #fff;
    }

    .chat-user-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
      max-height: 320px;
      overflow: auto;
    }

    .chat-user {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 8px;
      border: 1px solid rgba(148,163,184,.25);
      border-radius: 14px;
      padding: 10px 12px;
      background: #fff;
      cursor: pointer;
    }

    .chat-user.active {
      border-color: rgba(102,126,234,.4);
      background: linear-gradient(135deg, rgba(102,126,234,.08), rgba(118,75,162,.08));
    }

    .badge-soft {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 4px 8px;
      border-radius: 999px;
      background: rgba(102,126,234,.12);
      font-size: .8rem;
      font-weight: 700;
      color: #1f2937;
    }

    .stat-pulse {
      animation: statPulse .7s ease;
    }

    @keyframes statPulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.04); }
      100% { transform: scale(1); }
    }
  `;
  document.head.appendChild(style);
}

function ensureOptionalUI() {
  const mainContent = document.querySelector('.main-content');
  const navTabs = document.querySelector('.nav-tabs');
  if (!mainContent || !navTabs) return;

  if (!document.getElementById('social-tab')) {
    if (!navTabs.querySelector('[data-tab="social"]')) {
      const btn = document.createElement('button');
      btn.className = 'tab-btn';
      btn.dataset.tab = 'social';
      btn.textContent = '💬 Social';
      navTabs.appe
