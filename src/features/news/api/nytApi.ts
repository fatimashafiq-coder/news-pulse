import axios from "axios";
import { type Article } from "../../../types/article";

const API_KEY = import.meta.env.VITE_NYT_API_KEY;
const BASE_URL = "https://api.nytimes.com/svc/search/v2";

interface NYTArticle {
  headline: { main: string };
  abstract: string;
  web_url: string;
  multimedia?: Array<{ url: string }>;
  source: string;
  pub_date: string;
  byline?: { original: string };
}

interface NYTResponse {
  response: {
    docs: NYTArticle[];
  };
}

export const fetchNYTNews = async (query: string = "latest"): Promise<Article[]> => {
  if (!API_KEY) {
    throw new Error("NYT API key missing");
  }

  const { data } = await axios.get<NYTResponse>(`${BASE_URL}/articlesearch.json`, {
    params: {
      q: query,
      "api-key": API_KEY,
    },
  });

  return data.response.docs.map((article, index) => ({
    id: `nyt-${index}-${Date.now()}`,
    title: article.headline.main,
    description: article.abstract || "",
    url: article.web_url,
    imageUrl: article.multimedia?.[0]?.url 
      ? `https://www.nytimes.com/${article.multimedia[0].url}` 
      : undefined,
    source: "NYT",
    sourceName: article.source,
    publishedAt: article.pub_date,
    author: article.byline?.original,
  }));
};
