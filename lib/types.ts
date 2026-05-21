export interface Publication {
  slug: string;
  year: number;
  title: string;
  authors: string[];
  type: string[];
  venue?: string;
  venueLocation?: string;
  venueTags?: string[];
  venueUrl?: string;
  tags?: string[];
  awards?: string[];
  highlight?: boolean;
  doi?: string;
  arxiv?: string;
  pdf?: string;
  html?: string;
  video?: string;
  link?: string;
  recording?: string;
  slides?: string;
  blog?: string;
  osf?: string;
  description?: string;
  summary?: string;
}

export interface Project {
  title: string;
  url?: string;
  code?: string;
  paper?: string;
  demo?: string;
  video?: string;
  recording?: string;
  article?: string;
  image?: string;
  description?: string;
  highlight?: number;
}

export interface Person {
  url?: string;
  me?: boolean;
}

export interface Post {
  slug: string;
  date: string;
  year: string;
  month: string;
  title: string;
  description?: string;
  permalink?: string;
  content: string;
}

export interface Talk {
  title: string;
  location: string;
  date: string;
  city?: string;
  url?: string;
  slides?: string;
  recording?: string;
}

export interface Position {
  title: string;
  years: string;
  company: string;
  location?: string;
  description?: string[];
  short_desc?: string;
  skills?: string[];
  mentors?: string[];
}

export interface Education {
  university: string;
  years: string;
  degree: string;
  location?: string;
  description?: string[];
}

export interface Award {
  name: string;
  years: string | number;
  sponsor?: string;
  description?: string;
}

export interface NewsItem {
  message: string;
  date: string;
}
