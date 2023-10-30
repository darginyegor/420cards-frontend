import { Player } from './interfaces/player.interface';
import { ProfileAvatar } from './interfaces/profile-avatar';
import { PunchLineCard } from './interfaces/punch-line-card.interface';
import { SetupCard } from './interfaces/setup-card.interface';

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
    color: '#adece7',
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
  // {
  //   emoji: '🇬🇪',
  //   color: '#ffefef',
  // },
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
];

export const SETUP_CARDS_MOCK: SetupCard[] = [
  {
    id: 2,
    text: 'Это я почему злой был? А потому что у меня _______ не было!',
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
  {
    id: 1,
    text: {
      nom: 'говно',
      gen: 'говна',
      dat: 'говну',
      acc: 'говно',
      inst: 'говном',
      prep: 'говне',
    },
  },
  {
    id: 2,
    text: {
      nom: 'Гитлер',
      gen: 'Гитлера',
      dat: 'Гитлеру',
      acc: 'Гитлера',
      inst: 'Гитлером',
      prep: 'Гитлере',
    },
  },
  {
    id: 3,
    text: {
      nom: 'президент Татарстана',
      gen: 'президента Татарстана',
      dat: 'президену Татарстана',
      acc: 'президента Татарстана',
      inst: 'президентом Татарстана',
      prep: 'президенте Татарстана',
    },
  },
  {
    id: 4,
    text: {
      nom: 'мои яйца на твоем лице',
      gen: 'моих яиц на твоем лице',
      dat: 'моим яйцам на твоем лице',
      acc: 'мои яйца на твоем лице',
      inst: 'моими яйцами на твоем лице',
      prep: 'моих яйцах на твоем лице',
    },
  },
  {
    id: 5,
    text: {
      nom: 'евреи',
      gen: 'евреев',
      dat: 'евреям',
      acc: 'евреев',
      inst: 'евреями',
      prep: 'евреях',
    },
  },
  {
    id: 6,
    text: {
      nom: 'секс с животными',
      gen: 'секса с животными',
      dat: 'сексу с животными',
      acc: 'секс с животными',
      inst: 'сексом с животными',
      prep: 'сексе с животными',
    },
  },
  {
    id: 7,
    text: {
      nom: 'распад Югославии',
      gen: 'распада Югославии',
      dat: 'распаду Бгославии',
      acc: 'распад Югославии',
      inst: 'распадом Югославии',
      prep: 'распаде Югославии',
    },
  },
  {
    id: 8,
    text: {
      nom: 'настаящая работа с ДМС и соц. пакетом',
      gen: 'настоящей работы с ДМС и соц. пакетом',
      dat: 'настящей работе с ДМС и соц. пакетом',
      acc: 'настоящую работу с ДМС и соц. пакетом',
      inst: 'настоящей работой с ДМС и соц. пакетом',
      prep: 'настоящей работе с ДМС и соц. пакетом',
    },
  },
  {
    id: 9,
    text: {
      nom: 'Илон Маск',
      gen: 'Илона Маска',
      dat: 'Илону Маску',
      acc: 'Илона Маска',
      inst: 'Илоном Маском',
      prep: 'Илоне Маске',
    },
  },
  {
    id: 10,
    text: {
      nom: 'плохая музыка для тупых людей',
      gen: 'плохой музыки для тупых людей',
      dat: 'плохой музыке для тупых людей',
      acc: 'плохую музыку для тупых людей',
      inst: 'плохой музыкой для тупых людей',
      prep: 'плохой музыке для тупых людей',
    },
  },
];

export const PLAYERS_MOCK: Player[] = [
  {
    uuid: '1',
    name: 'Егор',
    emoji: '🍆',
    backgroundColor: '#F6DDFF',
    points: 6,
    state: 'default',
    isConnected: true,
  },
  {
    uuid: '2',
    name: 'Антон',
    emoji: '🌿',
    backgroundColor: '#F2FFDD',
    points: 2,
    state: 'leading',
    isConnected: true,
  },
  {
    uuid: '3',
    name: 'Mickeile',
    emoji: '🦀',
    backgroundColor: '#FFDDDD',
    points: 3,
    state: 'default',
    isConnected: true,
  },
  {
    uuid: '4',
    name: 'Антонида',
    emoji: '✨',
    backgroundColor: '#FFF8DD',
    points: 5,
    state: 'default',
    isConnected: false,
  },
  {
    uuid: '5',
    name: 'Александр',
    emoji: '🪖',
    backgroundColor: '#F2FFDD',
    points: 0,
    state: 'default',
    isConnected: true,
  },
];
