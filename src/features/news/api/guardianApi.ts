import axios from "axios";
import { type Article } from "../../../types/article";
import { v4 as uuidv4 } from "uuid";
import { ArticleSource } from "../../../types/article";

const API_KEY = import.meta.env.VITE_GUARDIAN_API_KEY;
const BASE_URL = "https://content.guardianapis.com";

interface GuardianArticle {
  webTitle: string;
  webUrl: string;
  fields?: {
    thumbnail?: string;
    trailText?: string;
    byline?: string;
  };
  webPublicationDate: string;
}

interface GuardianResponse {
  response: {
    results: GuardianArticle[];
  };
}

export const fetchGuardianNews = async (query: string = "latest"): Promise<Article[]> => {
  if (!API_KEY) {
    throw new Error("Guardian API key missing");
  }

  const { data } = await axios.get<GuardianResponse>(`${BASE_URL}/search`, {
    params: {
      q: query,
      "api-key": API_KEY,
      "show-fields": "thumbnail,trailText,byline",
    },
  });
  console.log("guardian api", data);
  return data.response.results.map((article) => ({
    id: uuidv4(),
    title: article.webTitle,
    description: article.fields?.trailText || "",
    url: article.webUrl,
    imageUrl: article.fields?.thumbnail,
    source: ArticleSource.GUARDIAN,
    sourceName: "The Guardian",
    publishedAt: article.webPublicationDate,
    author: article.fields?.byline,
  }));
};
