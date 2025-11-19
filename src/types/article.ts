export enum ArticleSource {
  NEWS_API= "NewsAPI",
  GUARDIAN= "Guardian",
  NEWS_DATA= "NewsData"
} 

export interface Article {
  id: string;
  title: string;
  description: string;
  url: string;
  imageUrl?: string;
  source: ArticleSource;
  sourceName: string;
  publishedAt: string;
  author?: string;
  category?: string;
}
