import { Routes, Route } from "react-router-dom";
import GuardianPage from "../features/news/pages/GuardianPage";
import NewsAPIPage from "../features/news/pages/NewsAPIPage";
import NYTPage from "../features/news/pages/NYTPage";

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<NewsAPIPage/>} />
    <Route path="/guardian" element={<GuardianPage/>} />
    <Route path="/nyt" element={<NYTPage/>} />
  </Routes>
);
