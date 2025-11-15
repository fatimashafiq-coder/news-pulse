import axios from "axios";
import { type Article } from "../../../types/article";

const API_KEY = import.meta.env.VITE_NEWSAPI_KEY;
const BASE_URL = "https://newsapi.org/v2";

interface NewsAPIResponse {
  articles: {
    title: string;
    description: string;
    url: string;
    urlToImage?: string;
    source: { name: string };
    publishedAt: string;
    author?: string;
  }[];
}

export const fetchNewsAPI = async (query: string = "latest"): Promise<Article[]> => {
  if (!API_KEY) {
    throw new Error("NewsAPI key missing");
  }

  const { data } = await axios.get<NewsAPIResponse>(`${BASE_URL}/everything`, {
    params: {
      q: query,
      apiKey: API_KEY,
      language: "en",
      pageSize: 20,
    },
  });
  return data.articles.map((article, index) => ({
    id: `newsapi-${index}-${Date.now()}`,
    title: article.title,
    description: article.description || "",
    url: article.url,
    imageUrl: article.urlToImage,
    source: "NewsAPI",
    sourceName: article.source.name,
    publishedAt: article.publishedAt,
    author: article.author,
  }));
};
