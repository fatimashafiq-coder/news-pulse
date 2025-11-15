import axios from "axios";

const API_KEY = import.meta.env.VITE_NEWSAPI_KEY;
const BASE_URL = "https://newsapi.org/v2";

export interface Article {
  title: string;
  description: string;
  url: string;
  urlToImage?: string;
  source: { name: string };
  publishedAt: string;
}

export const fetchNewsAPI = async (): Promise<Article[]> => {
  if (!API_KEY) {
    throw new Error("API key missing");
  }

  const { data } = await axios.get<{ articles: Article[] }>(
    `${BASE_URL}/everything`,
    {
      params: {
        q: "technology",
        apiKey: API_KEY,
        language: "en",
        pageSize: 10,
      },
    }
  );

  return data.articles;
};
