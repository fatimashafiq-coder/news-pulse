import axios from "axios";
import { type Article } from "../../../types/article";

const API_KEY = "pub_43018a20d2c24c31b78a65bf580d7ef2";
const BASE_URL = "https://newsdata.io/api/1";

interface NewsDataResponse {
  results: {
    title: string;
    description: string;
    link: string;
    image_url?: string;
    source_id: string;
    pubDate: string;
    creator?: string[];
  }[];
}

export const fetchNewsDataAPI = async (
  query: string = "world"
): Promise<Article[]> => {
  if (!API_KEY) {
    throw new Error("NewsData API key missing");
  }

  try {
    const { data } = await axios.get<NewsDataResponse>(
      `${BASE_URL}/news`,
      {
        params: {
          q: query,
          apikey: API_KEY,
          country: "us",
          language: "en",
        },
      }
    );

    if (!data.results) {
      return [];
    }

    return data.results.map((article, index) => ({
      id: `newsdata-${index}-${Date.now()}`,
      title: article.title,
      description: article.description || "",
      url: article.link,
      imageUrl: article.image_url,
      source: "NewsData",
      sourceName: article.source_id,
      publishedAt: article.pubDate,
      author: article.creator?.[0] || undefined,
    }));
  } catch (error) {
    console.error("NewsData API Error:", error);
    throw error;
  }
};
