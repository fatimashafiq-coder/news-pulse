import { useLocation, useNavigate } from "react-router-dom";
import { FiCalendar } from "react-icons/fi";

const ArticleDetailsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { article } = location.state || {};

  if (!article) {
    return (
      <div className="text-white text-center mt-20">
        <p>Article data not found!</p>
        <button
          onClick={() => navigate("/")}>
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div>
      <img
        src={article.imageUrl}
        alt={article.title}
        className="w-[300px] border-4 md:mx-0 mx-auto"
      />
      <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
      <p className="text-gray-300 mb-4">{article.description}</p>
      <p className="mb-2">
        <strong>Author:</strong> {article.author || "Unknown"}
      </p>
      <p className="mb-2">
        <FiCalendar />
        <strong>Date:</strong> {new Date(article.publishedAt).toLocaleString()}
      </p>
      <button
        onClick={() => navigate(-1)}
      >
        Go Back
      </button>
    </div>
  );
};

export default ArticleDetailsPage;
