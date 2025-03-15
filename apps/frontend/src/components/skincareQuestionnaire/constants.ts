// export const q = [
//     'How would you describe your skin immediately after cleansing and drying, but before putting on products?',
//     'How would you describe the way your skin feels at the end of a long day?',
//     'How many blemishes do you get each month?',
//     'How often do you experience the following: redness, irritation, itchiness, peeling or flaking, feeling of warmth on cheeks?',
//     'What do you wish for your skin care routine to fix for you?',
//     'How often do you wear sunscreen?',
//   ];

export type SkincareQuestion = {
  question: string;
  questionId: string;
  options: {
    label: string;
    value: string;
  }[];
};

export const questionnaire: SkincareQuestion[] = [
  {
    question:
      'How would you describe your skin immediately after cleansing and drying, but before putting on products?',
    questionId: '1',
    options: [
      {
        label: 'Tight and/or dry (ready to slather on moisturizer)',
        value: 'dry',
      },
      { label: 'Shiny and/or tight', value: 'oily' },
      { label: 'Slightly warm, redness', value: 'combo' },
      { label: 'None of the above, or feels normal', value: 'normal' },
    ],
  },
  {
    question:
      'How would you describe the way your skin feels at the end of a long day?',
    questionId: '2',
    options: [
      { label: 'Dry or flaky, moisturizer standing by', value: 'dry' },
      { label: 'Greasy all over', value: 'oily' },
      { label: 'Dry or normal on cheeks, greasy in t-zone', value: 'combo' },
      { label: 'Neither greasy nor dry', value: 'normal' },
    ],
  },
  {
    question: 'How many blemishes do you get each month?',
    questionId: '3',
    options: [
      { label: '10 or more', value: 'acne' },
      { label: 'Around 4-6', value: 'acne' },
      { label: 'Just a few', value: 'few' },
      { label: 'Very few or none at all', value: 'none' },
    ],
  },
  {
    question:
      'How often do you experience the following: redness, irritation, itchiness, peeling or flaking, feeling of warmth on cheeks?',
    questionId: '4',
    options: [
      { label: 'I experience multiple of those daily', value: 'sensitive' },
      { label: 'I experience at least one of those daily', value: 'sensitive' },
      { label: 'I experience some of those occasionally', value: 'rarely' },
      { label: 'I rarely or never experience those', value: 'rarely' },
    ],
  },
  {
    question: 'What do you wish for your skin care routine to fix for you?',
    questionId: '5',
    options: [
      { label: 'Acne and/or blemishes', value: 'acne' },
      { label: 'Texture/uneven skin tone, dark spots', value: 'texture' },
      { label: 'Anti-aging, or proactive anti-aging', value: 'age' },
      {
        label: `Radiance (glowy, healthy looking, or 'glass' skin)`,
        value: 'hydration',
      },
    ],
  },
  {
    question: 'How often do you wear sunscreen?',
    questionId: '6',
    options: [
      { label: 'Daily, with multiple reapplications', value: 'daily' },
      { label: 'Daily, but I forget to reapply', value: 'daily' },
      { label: `Only when I need to or when I'm in the sun`, value: 'sun' },
      { label: 'Rarely, if ever', value: 'sun' },
    ],
  },
];
