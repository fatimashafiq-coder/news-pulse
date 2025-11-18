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
