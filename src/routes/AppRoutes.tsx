import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ArticleDetailsPage from "../features/news/pages/ArticleDetailsPage";
import NewsAPIPage from "../features/news/pages/NewsAPIPage";

export const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<NewsAPIPage />} />
      <Route path="/article/:id" element={<ArticleDetailsPage />} />
    </Routes>
  </Router>
);
