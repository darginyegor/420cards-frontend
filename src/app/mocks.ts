import { Player } from './interfaces/player';
import { ProfileAvatar } from './interfaces/profile-avatar';
import { PunchLineCard } from './interfaces/punch-line-card';
import { SetupCard } from './interfaces/setup-card';

export const PROFILE_AVATARS: ProfileAvatar[] = [
  {
    emoji: '🍆',
    color: '#eee9f0',
    colors: ['#aad35d', '#4f00d2'],
    imageUrl: 'https://em-content.zobj.net/source/apple/354/eggplant_1f346.png',
  },
  {
    emoji: '🌿',
    color: '#eef6e1',
    colors: ['#8cc653', '#ffff74'],
    imageUrl: 'https://em-content.zobj.net/source/apple/354/herb_1f33f.png',
  },
  {
    emoji: '👺',
    color: '#ffc5c5',
    colors: ['#c65353', '#ffab74'],
    imageUrl: 'https://em-content.zobj.net/source/apple/354/goblin_1f47a.png',
  },
  {
    emoji: '✨',
    color: '#FFF8DD',
    colors: ['#ffeb7b', '#ffb260'],
    imageUrl: 'https://em-content.zobj.net/source/apple/354/sparkles_2728.png',
  },
  {
    emoji: '🎃',
    color: '#fff4e6',
    colors: ['#ff9c67', '#d3ff60'],
    imageUrl:
      'https://em-content.zobj.net/source/apple/354/jack-o-lantern_1f383.png',
  },
  {
    emoji: '👽',
    color: '#e9ffff',
    colors: ['#646d6d', '#96bbbb'],
    imageUrl: 'https://em-content.zobj.net/source/apple/354/alien_1f47d.png',
  },
  {
    emoji: '💩',
    color: '#ffe7d0',
    colors: ['#857162', '#7d3d00'],
    imageUrl:
      'https://em-content.zobj.net/source/apple/354/pile-of-poo_1f4a9.png',
  },
  {
    emoji: '🪖',
    color: '#F2FFDD',
    colors: ['#4b5f35', '#5a3e37'],
    imageUrl:
      'https://em-content.zobj.net/source/apple/354/military-helmet_1fa96.png',
  },
  {
    emoji: '🦀',
    color: '#f2a68d',
    colors: ['#e0643b', '#2294d4'],
    imageUrl: 'https://em-content.zobj.net/source/apple/354/crab_1f980.png',
  },
  {
    emoji: '👻',
    color: '#f0f0f0',
    colors: ['#767675', '#c24c87'],
    imageUrl: 'https://em-content.zobj.net/source/apple/354/ghost_1f47b.png',
  },
  {
    emoji: '🐠',
    color: '#ebfffd',
    colors: ['#99F9FF', '#FFF96C'],
    imageUrl:
      'https://em-content.zobj.net/source/apple/354/tropical-fish_1f420.png',
  },
  {
    emoji: '🎀',
    color: '#fce7ff',
    colors: ['#ec90b0', '#b73363'],
    imageUrl: 'https://em-content.zobj.net/source/apple/354/ribbon_1f380.png',
  },
  {
    emoji: '🤡',
    color: '#ffaa6e',
    colors: ['#ffe27a', '#FF9A92'],
    imageUrl:
      'https://em-content.zobj.net/source/apple/354/clown-face_1f921.png',
  },
  {
    emoji: '🐺',
    color: '#74b2ff',
    colors: ['#7f8a98', '#88bbcc'],
    imageUrl: 'https://em-content.zobj.net/source/apple/354/wolf_1f43a.png',
  },
  {
    emoji: '👹',
    color: '#ff6b6b',
    colors: ['#f8987e', '#ffd247'],
    imageUrl: 'https://em-content.zobj.net/source/apple/354/ogre_1f479.png',
  },
  {
    emoji: '👾',
    color: '#77b6ff',
    colors: ['#c288d7', '#6b66d8'],
    imageUrl:
      'https://em-content.zobj.net/source/apple/354/alien-monster_1f47e.png',
  },
  {
    emoji: '🤢',
    color: '#ff9580',
    colors: ['#cde549', '#a18d02'],
    imageUrl:
      'https://em-content.zobj.net/source/apple/354/nauseated-face_1f922.png',
  },
  {
    emoji: '🐔',
    color: '#cfc0af',
    colors: ['#ff8685', '#ffda35'],
    imageUrl: 'https://em-content.zobj.net/source/apple/354/chicken_1f414.png',
  },
  {
    emoji: '🦄',
    color: '#a1ff82',
    colors: ['#6f98ff', '#ff6ce2'],
    imageUrl: 'https://em-content.zobj.net/source/apple/354/unicorn_1f984.png',
  },
  {
    emoji: '🌚',
    color: '#e4e9f4',
    colors: ['#96a2bd', '#647584'],
    imageUrl:
      'https://em-content.zobj.net/source/apple/354/new-moon-face_1f31a.png',
  },
  {
    emoji: '🍞',
    color: '#fff6e4',
    colors: ['#fcc149', '#ffe0a0'],
    imageUrl: 'https://em-content.zobj.net/source/apple/354/bread_1f35e.png',
  },
  {
    emoji: '🚲',
    color: '#e8f4ff',
    colors: ['#5ba2e2', '#4ebaba'],
    imageUrl: 'https://em-content.zobj.net/source/apple/354/bicycle_1f6b2.png',
  },
  {
    emoji: '🦠',
    color: '#cfffab',
    colors: ['#8bc163', '#abffb9'],
    imageUrl: 'https://em-content.zobj.net/source/apple/354/microbe_1f9a0.png',
  },
  {
    emoji: '🔪',
    color: '#f2f2f2',
    colors: ['#a9a4a4', '#deb9b9'],
    imageUrl:
      'https://em-content.zobj.net/source/apple/354/kitchen-knife_1f52a.png',
  },
  {
    emoji: '⚰️',
    color: '#f4eadf',
    colors: ['#e8ccac', '#dd8d34'],
    imageUrl:
      'https://em-content.zobj.net/source/apple/354/coffin_26b0-fe0f.png',
  },
  {
    emoji: '💣',
    color: '#f3d77a',
    colors: ['', ''],
  },
  {
    emoji: '💤',
    color: '#ebf3ff',
    colors: ['#a2b9dc', '#505bd4'],
  },
  {
    emoji: '🦩',
    color: '#fef1f4',
    colors: ['#8598e3', '#ff8ea8'],
  },
  {
    emoji: '🦖',
    color: '#e7edc7',
    colors: ['#d1e277', '#72c940'],
  },
  {
    emoji: '🗿',
    color: '#c4b691',
    colors: ['', ''],
  },
  {
    emoji: '🦧',
    color: '#ffeae4',
    colors: ['#81ca6c', '#db917b'],
  },
  {
    emoji: '🦍',
    color: '#f6ecef',
    colors: ['#b8d4ab', '#cdafb8'],
  },
  {
    emoji: '⛄️',
    color: '#ebf7f8',
    colors: ['#79d6de', '#8db6ff'],
  },
  {
    emoji: '💦',
    color: '#ddffff',
    colors: ['#8db6ff', '#79d6de'],
  },
  {
    emoji: '💊',
    color: '#ffefef',
    colors: ['#fe6767', '#fdff50'],
  },
  {
    emoji: '🍗',
    color: '#ffeeda',
    colors: ['#e9d47c', '#eaa554'],
  },
  {
    emoji: '🍄',
    color: '#ffefe1',
    colors: ['#ecb482', '#90cd63'],
  },
  {
    emoji: '🦐',
    color: '#ffe2cd',
    colors: ['#7397f9', '#7dddd9'],
  },
  {
    emoji: '🐞',
    color: '#fce3e3',
    colors: ['#9be972', '#ff5a14'],
  },
  {
    emoji: '🐌',
    color: '#fff5e1',
    colors: ['#ffce6d', '#e67c40'],
  },
  {
    emoji: '🍌',
    color: '#fdf6e6',
    colors: ['#ffcc56', '#f8ff35'],
  },
  {
    emoji: '🍩',
    color: '#ffe3df',
    colors: ['#dd98d1', '#14cb22'],
  },
  {
    emoji: '🪐',
    color: '#e3e8d2',
    colors: ['#d0e685', '#5bd0d7'],
  },
  {
    emoji: '🌵',
    color: '#e3ffce',
    colors: ['#fff563', '#83d940'],
  },
  {
    emoji: '☄️',
    color: '#ffefde',
    colors: ['#6670ff', '#ffa13d'],
  },
  {
    emoji: '🫧',
    color: '#f0f5ff',
    colors: ['#6f9fff', '#fd9baf'],
  },
  {
    emoji: '🍓',
    color: '#FFDDDD',
    colors: ['#ff6c6c', '#88ff45'],
  },
  {
    emoji: '🧌',
    color: '#ebffe9',
    colors: ['#7b9d7b', '#eda857'],
  },
  {
    emoji: '🪷',
    color: '#ffeff2',
    colors: ['#bdffb1', '#dd3858'],
  },
  {
    emoji: '🦎',
    color: '#e3ffce',
    colors: ['#4ca36d', '#cec751'],
  },
  {
    emoji: '🏴‍☠️',
    color: '#dfdfdf',
    colors: ['#818181', '#ffacac'],
  },
  {
    emoji: '🌞',
    color: '#fff1d7',
    colors: ['#ffe564', '#acdbff'],
  },
];

export const SETUP_CARDS_MOCK: SetupCard[] = [
  {
    id: 2,
    text: 'Это я почему злой был? \nА потому что у меня ________\n не было!',
    startsFromPunchLine: false,
    case: 'gen',
  },
  {
    id: 3,
    text: '50% всех браков заканчиваются _______.',
    startsFromPunchLine: false,
    case: 'inst',
  },
  {
    id: 1,
    text: '_______ — лучшее лекарство от запора!',
    startsFromPunchLine: true,
    case: 'nom',
  },
  {
    id: 3,
    text: 'Кажется, я разобрался в политике! Мое решениве всех проблем — _______.',
    startsFromPunchLine: false,
    case: 'nom',
  },
];

export const PUNCH_LINE_CARDS: PunchLineCard[] = [
  new PunchLineCard({
    id: 1,
    text: [
      ['говно', ['nom', 'acc']],
      ['говна', ['gen']],
      ['говну', ['dat']],
      ['говном', ['inst']],
      ['говне', ['prep']],
    ],
  }),
  new PunchLineCard({
    id: 2,
    text: [
      ['Гитлер', ['nom']],
      ['Гитлера', ['gen', 'acc']],
      ['Гитлеру', ['dat']],
      ['Гитлером', ['inst']],
      ['Гитлере', ['prep']],
    ],
  }),
  new PunchLineCard({
    id: 3,
    text: [
      ['президент Татарстана', ['nom']],
      ['президента Татарстана', ['gen', 'acc']],
      ['президену Татарстана', ['dat']],
      ['президентом Татарстана', ['inst']],
      ['президенте Татарстана', ['prep']],
    ],
  }),
  new PunchLineCard({
    id: 4,
    text: [
      ['мои яйца на твоем лице', ['nom', 'acc']],
      ['моих яиц на твоем лице', ['gen']],
      ['моим яйцам на твоем лице', ['dat']],
      ['моими яйцами на твоем лице', ['inst']],
      ['моих яйцах на твоем лице', ['prep']],
    ],
  }),
  new PunchLineCard({
    id: 5,
    text: [
      ['евреи', ['nom']],
      ['евреев', ['gen']],
      ['евреям', ['dat']],
      ['евреев', ['acc']],
      ['евреями', ['inst']],
      ['евреях', ['prep']],
    ],
  }),
  new PunchLineCard({
    id: 6,
    text: [
      ['секс с животными', ['nom']],
      ['секса с животными', ['gen']],
      ['сексу с животными', ['dat']],
      ['секс с животными', ['acc']],
      ['сексом с животными', ['inst']],
      ['сексе с животными', ['prep']],
    ],
  }),
];

export const PLAYERS_MOCK: Player[] = [
  {
    uuid: '1',
    name: 'Егор',
    emoji: '🍆',
    score: 6,
    state: 'default',
    isConnected: true,
    isLobbyOwner: false,
    isWinner: false,
  },
  {
    uuid: '2',
    name: 'Антон',
    emoji: '🌿',
    score: 2,
    state: 'leading',
    isConnected: true,
    isLobbyOwner: true,
    isWinner: false,
  },
  {
    uuid: '6',
    name: 'Юра',
    emoji: '🤡',
    score: 13,
    state: 'default',
    isConnected: true,
    isLobbyOwner: false,
    isWinner: false,
  },
  {
    uuid: '3',
    name: 'Вова',
    emoji: '🦀',
    score: 3,
    state: 'default',
    isConnected: true,
    isLobbyOwner: false,
    isWinner: false,
  },
  {
    uuid: '4',
    name: 'Антонида',
    emoji: '🌞',
    score: 5,
    state: 'default',
    isConnected: true,
    isLobbyOwner: false,
    isWinner: false,
  },
  {
    uuid: '5',
    name: 'Александр',
    emoji: '🪖',
    score: 0,
    state: 'default',
    isConnected: true,
    isLobbyOwner: false,
    isWinner: false,
  },
  {
    uuid: '7',
    name: 'Дима',
    emoji: '🤢',
    score: 0,
    state: 'default',
    isConnected: true,
    isLobbyOwner: false,
    isWinner: false,
  },
  {
    uuid: '8',
    name: 'Маргарита',
    emoji: '💦',
    score: 0,
    state: 'default',
    isConnected: true,
    isLobbyOwner: false,
    isWinner: false,
  },
];
