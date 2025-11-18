import { useLocation, useNavigate } from "react-router-dom";
import { FiCalendar } from "react-icons/fi";

const ArticleDetailsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { article } = location.state || {};

  if (!article) {
    return (
      <div className="text-center mt-20">
        <p>Article data not found!</p>
        <button
          className=" px-6 py-3 bg-black text-white font-semibold shadow-md hover:bg-gray-800 transition-colors duration-200 text-base tracking-wide"
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
      <p className=" mb-4">{article.description}</p>
      <p className="mb-2">
        <strong>Author:</strong> {article.author || "Unknown"}
      </p>
      <div>
        <p className="mb-2">
          <FiCalendar />
          <strong>Date:</strong> {new Date(article.publishedAt).toLocaleString()}
        </p>
      </div>

      <button
        className=" px-6 py-3 bg-black text-white font-semibold shadow-md hover:bg-gray-800 transition-colors duration-200 text-base tracking-wide"
        onClick={() => navigate(-1)}
      >
        Go Back
      </button>
    </div>
  );
};

export default ArticleDetailsPage;
