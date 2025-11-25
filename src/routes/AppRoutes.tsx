import {  Routes, Route, BrowserRouter } from "react-router-dom";
import ArticleDetailsPage from "../features/news/pages/ArticleDetailsPage";
import NewsAPIPage from "../features/news/pages/NewsAPIPage";

export const AppRoutes = () => (
  <BrowserRouter >
    <Routes>
      <Route path="/news-pulse/" element={<NewsAPIPage />} />
      <Route path="/article/:id" element={<ArticleDetailsPage />} />
    </Routes>
  </BrowserRouter>
);
