export interface Author {
  name: string;
  role: string;
  avatar: string;
  bio: string;
}

export interface TocEntry {
  id: string;
  level: 2 | 3;
  label: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  subtitle: string;
  author: Author;
  publishedAt: string;
  readingTime: number;
  coverImage: string;
  coverAlt: string;
  tags: string[];
  toc: TocEntry[];
  content: string;
}

export type PostMeta = Omit<BlogPost, 'content'>;
