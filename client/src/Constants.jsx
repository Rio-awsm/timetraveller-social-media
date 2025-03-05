 export const prebuiltTimePeriods = [
    { id: 'ancient', label: 'Ancient World (3000 BCE - 500 CE)', value: 'Ancient World (3000 BCE - 500 CE)' },
    { id: 'medieval', label: 'Medieval Era (500 - 1500)', value: 'Medieval Era (500 - 1500)' },
    { id: 'renaissance', label: 'Renaissance (1400 - 1600)', value: 'Renaissance (1400 - 1600)' },
    { id: 'industrial', label: 'Industrial Revolution (1760 - 1840)', value: 'Industrial Revolution (1760 - 1840)' },
    { id: 'victorian', label: 'Victorian Era (1837 - 1901)', value: 'Victorian Era (1837 - 1901)' },
    { id: 'ww2', label: 'World War II (1939 - 1945)', value: 'World War II (1939 - 1945)' },
    { id: 'coldwar', label: 'Cold War (1947 - 1991)', value: 'Cold War (1947 - 1991)' },
    { id: 'space', label: 'Space Age (1957 - Present)', value: 'Space Age (1957 - Present)' },
    { id: 'digital', label: 'Digital Revolution (1990 - 2010)', value: 'Digital Revolution (1990 - 2010)' },
    { id: 'near-future', label: 'Near Future (2025 - 2050)', value: 'Near Future (2025 - 2050)' },
    { id: 'ai-age', label: 'AI & Automation Age (2050 - 2080)', value: 'AI & Automation Age (2050 - 2080)' },
    { id: 'interstellar', label: 'Interstellar Expansion (2080 - 2150)', value: 'Interstellar Expansion (2080 - 2150)' },
    { id: 'posthuman', label: 'Post-Human Era (2150 - 2300)', value: 'Post-Human Era (2150 - 2300)' },
    { id: 'galactic', label: 'Galactic Civilizations (2300 - 3000)', value: 'Galactic Civilizations (2300 - 3000)' }
];

export const personalities = [
    { id: 'politician', label: '🏛 Politician', default: true },
    { id: 'conspiracy', label: '🏴‍☠️ Conspiracy Theorist', default: true },
    { id: 'comedian', label: '🤡 Comedian', default: true },
    { id: 'average', label: '👨‍👩‍👧‍👦 Average Citizen', default: true },
    { id: 'scholar', label: '🎓 Scholar', default: false },
    { id: 'celebrity', label: '⭐ Celebrity', default: false },
    { id: 'journalist', label: '📰 Journalist', default: false },
    { id: 'religious', label: '✝️ Religious Leader', default: false }
  ];

export const platforms = ['Twitter', 'Reddit', 'Facebook', 'Instagram', 'TikTok'];

export const tones = ['humorous', 'satirical', 'serious', 'dramatic', 'educational'];

export const platformStyles = {
  Twitter: {
    feed: {
      background: 'bg-[#FFFFFF]',
      border: 'border-gray-200',
      headerBackground: 'bg-[#1DA1F2]',
      headerText: 'text-white',
      tabActive: 'bg-[#1DA1F2] text-white',
      tabInactive: 'bg-white text-[#1DA1F2] hover:bg-blue-50'
    },
    post: {
      background: 'bg-white',
      border: 'border-b border-gray-200',
      usernameColor: 'text-black font-bold',
      handleColor: 'text-[#657786]',
      contentColor: 'text-black',
      iconColor: 'text-[#657786] hover:text-[#1DA1F2]',
      likeIconColor: 'text-[#657786] hover:text-[#E0245E]'
    }
  },
  Facebook: {
    feed: {
      background: 'bg-[#F0F2F5]',
      border: 'border-gray-300',
      headerBackground: 'bg-[#3B5998]',
      headerText: 'text-white',
      tabActive: 'bg-[#3B5998] text-white',
      tabInactive: 'bg-white text-[#3B5998] hover:bg-gray-100'
    },
    post: {
      background: 'bg-white',
      border: 'border-b border-gray-200',
      usernameColor: 'text-[#1A1A1A] font-semibold',
      handleColor: 'text-[#65676B]',
      contentColor: 'text-[#1C1E21]',
      iconColor: 'text-[#65676B] hover:bg-gray-100 rounded-full p-1',
      likeIconColor: 'text-[#65676B] hover:text-[#1877F2]'
    }
  },
  Reddit: {
    feed: {
      background: 'bg-[#DAE0E6]',
      border: 'border-gray-300',
      headerBackground: 'bg-[#FF4500]',
      headerText: 'text-white',
      tabActive: 'bg-[#FF4500] text-white',
      tabInactive: 'bg-white text-[#FF4500] hover:bg-red-50'
    },
    post: {
      background: 'bg-white',
      border: 'border-b border-gray-200',
      usernameColor: 'text-[#1A1A1A] font-bold',
      handleColor: 'text-[#878A8C]',
      contentColor: 'text-[#222222]',
      iconColor: 'text-[#878A8C] hover:text-[#FF4500]',
      likeIconColor: 'text-[#878A8C] hover:text-[#FF4500]'
    }
  },
  Instagram: {
    feed: {
      background: 'bg-[#FAFAFA]',
      border: 'border-gray-300',
      headerBackground: 'bg-gradient-to-r from-[#405DE6] via-[#5851DB] to-[#BE2B7B]',
      headerText: 'text-white',
      tabActive: 'bg-gradient-to-r from-[#405DE6] to-[#BE2B7B] text-white',
      tabInactive: 'bg-white text-gray-700 hover:bg-gray-50'
    },
    post: {
      background: 'bg-white',
      border: 'border-b border-gray-200',
      usernameColor: 'text-black font-semibold',
      handleColor: 'text-[#8E8E8E]',
      contentColor: 'text-black',
      iconColor: 'text-black hover:opacity-70',
      likeIconColor: 'text-black hover:text-red-500'
    }
  },
  TikTok: {
    feed: {
      background: 'bg-black',
      border: 'border-gray-800',
      headerBackground: 'bg-black',
      headerText: 'text-white',
      tabActive: 'bg-[#FF0050] text-white',
      tabInactive: 'bg-black text-gray-400 hover:bg-gray-900'
    },
    post: {
      background: 'bg-black text-white',
      border: 'border-b border-gray-800',
      usernameColor: 'text-white font-bold',
      handleColor: 'text-gray-400',
      contentColor: 'text-white',
      iconColor: 'text-white hover:text-gray-300',
      likeIconColor: 'text-white hover:text-[#FF0050]'
    }
  }
};

export const platformPostStyles = {
  Twitter: {
    background: 'bg-white',
    border: 'border-b border-gray-200',
    usernameColor: 'text-black font-bold',
    handleColor: 'text-[#657786]',
    contentColor: 'text-black',
    iconColor: 'text-[#657786] hover:text-[#1DA1F2]',
    likeIconColor: 'text-[#657786] hover:text-[#E0245E]',
    commentInputBg: 'bg-white',
    commentInputBorder: 'border-gray-300'
  },
  Facebook: {
    background: 'bg-white',
    border: 'border-b border-gray-200',
    usernameColor: 'text-[#1A1A1A] font-semibold',
    handleColor: 'text-[#65676B]',
    contentColor: 'text-[#1C1E21]',
    iconColor: 'text-[#65676B] hover:bg-gray-100 rounded-full p-1',
    likeIconColor: 'text-[#65676B] hover:text-[#1877F2]',
    commentInputBg: 'bg-gray-100',
    commentInputBorder: 'border-transparent'
  },
  Reddit: {
    background: 'bg-white',
    border: 'border-b border-gray-200',
    usernameColor: 'text-[#1A1A1A] font-bold',
    handleColor: 'text-[#878A8C]',
    contentColor: 'text-[#222222]',
    iconColor: 'text-[#878A8C] hover:text-[#FF4500]',
    likeIconColor: 'text-[#878A8C] hover:text-[#FF4500]',
    commentInputBg: 'bg-gray-50',
    commentInputBorder: 'border-gray-200'
  },
  Instagram: {
    background: 'bg-white',
    border: 'border-b border-gray-200',
    usernameColor: 'text-black font-semibold',
    handleColor: 'text-[#8E8E8E]',
    contentColor: 'text-black',
    iconColor: 'text-black hover:opacity-70',
    likeIconColor: 'text-black hover:text-red-500',
    commentInputBg: 'bg-gray-100',
    commentInputBorder: 'border-transparent'
  },
  TikTok: {
    background: 'bg-black text-white',
    border: 'border-b border-gray-800',
    usernameColor: 'text-white font-bold',
    handleColor: 'text-gray-400',
    contentColor: 'text-white',
    iconColor: 'text-white hover:text-gray-300',
    likeIconColor: 'text-white hover:text-[#FF0050]',
    commentInputBg: 'bg-gray-900',
    commentInputBorder: 'border-gray-800'
  }
};