interface IOPostType {
  id: number;
  title: string;
  max?: number;
  price?: number;
  only?: string[];
}

type IOPostTypeIndex = {
  [key: string]: number;
};

export const parentPostTypes = [
  {
    title: 'Brand Features',
    postTypes: [0, 1, 2, 3],
  },
  {
    title: 'Original Features',
    postTypes: [4, 5, 6, 7, 8, 9],
  },
  {
    title: 'Production Options',
    postTypes: [10, 11, 12, 13],
  },
  {
    title: 'Add Ons',
    postTypes: [14, 15, 16, 17, 18],
  },
];

export const postTypes: IOPostType[] = [
  {
    id: 0,
    title: 'Post',
    max: 2,
    price: 1499,
  },
  {
    id: 1,
    title: 'Story',
    max: 3,
    price: 1199,
  },
  {
    id: 2,
    title: 'Post + Story',
    max: 3,
    price: 2499,
  },
  {
    id: 3,
    title: 'Giveaway',
    max: 1,
    price: 2499,
  },
  {
    id: 4,
    title: 'News 1st',
    max: 1,
    price: 2499,
  },
  {
    id: 5,
    title: 'News 2nd',
    max: 1,
    price: 1499,
  },
  {
    id: 6,
    title: 'Listicle feature',
    max: 1,
    price: 4999,
  },
  {
    id: 7,
    title: 'Factual Saturday',
    max: 1,
    price: 499,
  },
  {
    id: 8,
    title: 'Hiring Feature',
    max: 1,
    price: 499,
  },
  {
    id: 9,
    title: 'TIA Slot',
    max: 8,
    price: 499,
    only: ['friday', 'saturday', 'sunday'],
  },
  {
    id: 10,
    title: 'Iphone Shoot',
    price: 1499,
  },
  {
    id: 11,
    title: 'Drone Shoot',
    max: 1,
    price: 5999,
  },
  {
    id: 12,
    title: 'Professional Reel',
    max: 1,
    price: 4999,
  },
  {
    id: 13,
    title: 'Professional Reel with Voiceover',
    max: 1,
    price: 7999,
  },

  {
    id: 14,
    title: 'Collaboration',
    max: 1,
    price: 499,
  },
  {
    id: 15,
    title: 'Pins',
    max: 1,
    price: 499,
  },
  {
    id: 16,
    title: 'Link In Bio',
    max: 1,
    price: 499,
  },
  {
    id: 17,
    title: 'Ads Amplification',
    max: 1,
    price: 0,
  },
  {
    id: 18,
    title: 'Live Session',
    max: 1,
    price: 300,
  },
];

export const postTypeIndex: IOPostTypeIndex = {
  Post: 0,
  Story: 1,
  'Post + Story': 2,
  Giveaway: 3,
  'News 1st': 4,
  'News 2nd': 5,
  'Listicle feature': 6,
  'Factual Saturday': 7,
  'Hiring Feature': 8,
  'TIA Slot': 9,
  'Iphone Shoot': 10,
  'Drone Shoot': 11,
  'Professional Reel': 12,
  'Professional Reel with Voiceover': 13,
  Collaboration: 14,
  Pins: 15,
  'Link In Bio': 16,
  'Ads Amplification': 17,
  'Live Session': 18,
};
