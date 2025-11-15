import { useQuery } from "@tanstack/react-query";
import { fetchNewsAPI, type Article  } from "../api/newsApi";


export const useNewsAPI = () => {
  return useQuery<Article[], Error>({
    queryKey: ["news"],
    queryFn: fetchNewsAPI,
  });
};