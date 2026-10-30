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
  /** Site path of the interactive paper page, if content/papers/ has one */
  paperPage?: string;
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
  /** Internal page for this project, e.g. a paper page under /papers/ */
  page?: string;
}

export interface Person {
  url?: string;
  me?: boolean;
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
  /** Label for `mentors`, defaults to "Advisor" */
  mentor_label?: string;
}

export interface Teaching {
  title: string;
  role: string;
  location?: string;
  year: string;
  description?: string[];
}

export interface Skill {
  category: string;
  items: string[];
}

export interface Education {
  university: string;
  years: string;
  degree: string;
  location?: string;
  description?: string[];
}
