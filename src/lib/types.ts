export interface Citation {
  id: number;
  authors: string;
  title: string;
  journal: string;
  year: number;
  link: string;
}

export interface PostMetadata {
  title: string;
  slug: string;
  category: string;
  tags: string[];
  readTime: string;
  date: string;
  coverImage: string;
  summary: string;
  citations?: Citation[];
}

export interface Post extends PostMetadata {
  content: string;
}

export const CATEGORIES = [
  { id: 'all', label: 'All Research' },
  { id: 'early-signs', label: 'Early Signs & Symptoms' },
  { id: 'mental-awareness', label: 'Mental Focus & Stress' },
  { id: 'personalized-medicine', label: 'Personalized DNA Medicine' },
  { id: 'preventive-health', label: 'Longevity & Prevention' },
  { id: 'immune-support', label: 'Immunity & Gut Health' },
  { id: 'fitness-metabolic', label: 'Fitness & Metabolism' },
  { id: 'wellness-somatics', label: 'Somatics & Body Wellness' },
];
