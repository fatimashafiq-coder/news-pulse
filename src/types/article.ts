export const ArticleSource = {
  NEWS_API: "NewsAPI",
  GUARDIAN: "Guardian",
  NEWS_DATA: "NewsData"
} as const;

export type ArticleSourceType = typeof ArticleSource[keyof typeof ArticleSource];

export interface Article {
  id: string;
  title: string;
  description: string;
  url: string;
  imageUrl?: string;
  source: string;
  sourceName: string;
  publishedAt: string;
  author?: string;
  category?: string;
}
