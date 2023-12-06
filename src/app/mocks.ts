import { Player } from './interfaces/player';
import { ProfileAvatar } from './interfaces/profile-avatar';
import { PunchLineCard } from './interfaces/punch-line-card';
import { SetupCard } from './interfaces/setup-card';

export const PROFILE_AVATARS: ProfileAvatar[] = [
  {
    emoji: '🍆',
    color: '#eee9f0',
  },
  {
    emoji: '🌿',
    color: '#eef6e1',
  },
  {
    emoji: '👺',
    color: '#fbebeb',
  },
  {
    emoji: '✨',
    color: '#FFF8DD',
  },
  {
    emoji: '🎃',
    color: '#fff4e6',
  },
  {
    emoji: '👽',
    color: '#e9ffff',
  },
  {
    emoji: '💩',
    color: '#ffe7d0',
  },
  {
    emoji: '🪖',
    color: '#F2FFDD',
  },
  {
    emoji: '🦀',
    color: '#FFDDDD',
  },
  {
    emoji: '👻',
    color: '#f0f0f0',
  },
  {
    emoji: '🐠',
    color: '#ebfffd',
  },
  {
    emoji: '🎀',
    color: '#fce7ff',
  },
  {
    emoji: '🤡',
    color: '#fffbe9',
  },
  {
    emoji: '🐺',
    color: '#e2e6eb',
  },
  {
    emoji: '👹',
    color: '#FFDDDD',
  },
  {
    emoji: '👾',
    color: '#F6DDFF',
  },
  {
    emoji: '🤢',
    color: '#F2FFDD',
  },
  {
    emoji: '🐔',
    color: '#f0e5d9',
  },
  {
    emoji: '🦄',
    color: '#fce7ff',
  },
  {
    emoji: '🌚',
    color: '#e4e9f4',
  },
  {
    emoji: '🍞',
    color: '#fff6e4',
  },
  {
    emoji: '🚲',
    color: '#e8f4ff',
  },
  {
    emoji: '🦠',
    color: '#e6fce6',
  },
  {
    emoji: '🔪',
    color: '#f2f2f2',
  },
  {
    emoji: '⚰️',
    color: '#f4eadf',
  },
  {
    emoji: '💣',
    color: '#f3f3e7',
  },
  {
    emoji: '💤',
    color: '#ebf3ff',
  },
  {
    emoji: '🦩',
    color: '#fef1f4',
  },
  {
    emoji: '🦖',
    color: '#e7edc7',
  },
  {
    emoji: '🗿',
    color: '#e0e1d6',
  },
  {
    emoji: '🦧',
    color: '#ffeae4',
  },
  {
    emoji: '🦍',
    color: '#f6ecef',
  },
  {
    emoji: '⛄️',
    color: '#ebf7f8',
  },
  {
    emoji: '💦',
    color: '#ddffff',
  },
  {
    emoji: '💊',
    color: '#ffefef',
  },
  {
    emoji: '🃏',
    color: '#faf7f3',
  },
  {
    emoji: '🍗',
    color: '#ffeeda',
  },
  {
    emoji: '🍄',
    color: '#ffefe1',
  },
  {
    emoji: '🦐',
    color: '#ffe2cd',
  },
  {
    emoji: '🐞',
    color: '#fce3e3',
  },
  {
    emoji: '🐌',
    color: '#fff5e1',
  },
  {
    emoji: '🍌',
    color: '#fdf6e6',
  },
  {
    emoji: '🍩',
    color: '#ffe3df',
  },
  {
    emoji: '🏳️‍🌈',
    color: '#e6e6e6',
  },
  {
    emoji: '🪐',
    color: '#e3e8d2',
  },
  {
    emoji: '🌵',
    color: '#e3ffce',
  },
  {
    emoji: '☄️',
    color: '#ffefde',
  },
  {
    emoji: '🫧',
    color: '#f0f5ff',
  },
  {
    emoji: '🐚',
    color: '#e9e1f6',
  },
  {
    emoji: '🍓',
    color: '#FFDDDD',
  },
  {
    emoji: '🧌',
    color: '#ebffe9',
  },
  {
    emoji: '🪷',
    color: '#ffeff2',
  },
  {
    emoji: '🦎',
    color: '#e3ffce',
  },
  {
    emoji: '🏴‍☠️',
    color: '#dfdfdf',
  },
  {
    emoji: '🌞',
    color: '#fff1d7',
  },
];

export const SETUP_CARDS_MOCK: SetupCard[] = [
  {
    uuid: '2',
    text: 'Это я почему злой был? \nА потому что у меня ________\n не было!',
    startsFromPunchLine: false,
    case: 'gen',
  },
  {
    uuid: '3',
    text: '50% всех браков заканчиваются _______.',
    startsFromPunchLine: false,
    case: 'inst',
  },
  {
    uuid: '1',
    text: '_______ — лучшее лекарство от запора!',
    startsFromPunchLine: true,
    case: 'nom',
  },
  {
    uuid: '3',
    text: 'Кажется, я разобрался в политике! Мое решениве всех проблем — _______.',
    startsFromPunchLine: false,
    case: 'nom',
  },
];

export const PUNCH_LINE_CARDS: PunchLineCard[] = [
  new PunchLineCard({
    uuid: '1',
    text: [
      ['говно', ['nom', 'acc']],
      ['говна', ['gen']],
      ['говну', ['dat']],
      ['говном', ['inst']],
      ['говне', ['prep']],
    ],
  }),
  new PunchLineCard({
    uuid: '2',
    text: [
      ['Гитлер', ['nom']],
      ['Гитлера', ['gen', 'acc']],
      ['Гитлеру', ['dat']],
      ['Гитлером', ['inst']],
      ['Гитлере', ['prep']],
    ],
  }),
  new PunchLineCard({
    uuid: '3',
    text: [
      ['президент Татарстана', ['nom']],
      ['президента Татарстана', ['gen', 'acc']],
      ['президену Татарстана', ['dat']],
      ['президентом Татарстана', ['inst']],
      ['президенте Татарстана', ['prep']],
    ],
  }),
  new PunchLineCard({
    uuid: '4',
    text: [
      ['мои яйца на твоем лице', ['nom', 'acc']],
      ['моих яиц на твоем лице', ['gen']],
      ['моим яйцам на твоем лице', ['dat']],
      ['моими яйцами на твоем лице', ['inst']],
      ['моих яйцах на твоем лице', ['prep']],
    ],
  }),
  new PunchLineCard({
    uuid: '5',
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
    uuid: '6',
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
    backgroundColor: '#8c08bc33',
    score: 6,
    state: 'default',
    isConnected: true,
    isLobbyOwner: false,
  },
  {
    uuid: '2',
    name: 'Антон',
    emoji: '🌿',
    backgroundColor: '#86da0033',
    score: 2,
    state: 'leading',
    isConnected: true,
    isLobbyOwner: true,
  },
  {
    uuid: '3',
    name: 'Вова',
    emoji: '🦀',
    backgroundColor: '#ff000033',
    score: 3,
    state: 'default',
    isConnected: true,
    isLobbyOwner: false,
  },
  {
    uuid: '4',
    name: 'Антонида',
    emoji: '🌞',
    backgroundColor: '#f9b02c33',
    score: 5,
    state: 'default',
    isConnected: true,
    isLobbyOwner: false,
  },
  {
    uuid: '5',
    name: 'Александр',
    emoji: '🪖',
    backgroundColor: '#6bb50033',
    score: 0,
    state: 'default',
    isConnected: true,
    isLobbyOwner: false,
  },
  {
    uuid: '6',
    name: 'Юра',
    emoji: '🤡',
    backgroundColor: '#fffbe933',
    score: 0,
    state: 'default',
    isConnected: true,
    isLobbyOwner: false,
  },
  {
    uuid: '7',
    name: 'Дима',
    emoji: '🤢',
    backgroundColor: '#5c960033',
    score: 0,
    state: 'default',
    isConnected: true,
    isLobbyOwner: false,
  },
  {
    uuid: '8',
    name: 'Маргарита',
    emoji: '💦',
    backgroundColor: '#03a9f433',
    score: 0,
    state: 'default',
    isConnected: true,
    isLobbyOwner: false,
  },
];
