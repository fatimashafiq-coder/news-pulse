import { useLocation, useNavigate } from "react-router-dom";
import { FiCalendar } from "react-icons/fi";

const ArticleDetailsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { article } = location.state || {};

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center bg-white p-8 rounded-lg shadow-md border border-gray-200">
          <p className="text-lg text-gray-700 mb-4">Article data not found!</p>
          <button
            className="px-6 py-3 bg-black text-white font-semibold rounded-lg shadow hover:bg-gray-800 transition-colors"
            onClick={() => navigate("/")}
          >
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  const handleOpenWebsite = () => {
    window.open(article.url, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md border border-gray-200">
        
        <div className="w-full overflow-hidden">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-auto max-h-96 object-contain"
          />
        </div>

        <div className="p-4 md:p-6">

          <h1 
            className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4 cursor-pointer hover:text-blue-600 transition-colors"
            onClick={handleOpenWebsite}
          >
            {article.title}
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-4 md:mb-6 leading-relaxed">
            {article.description}
          </p>

          <div className="bg-gray-50 p-3 md:p-4 rounded-lg mb-4 md:mb-6">
            <p className="text-sm md:text-base text-gray-700 mb-2">
              <strong>Author:</strong> {article.author || "Unknown"}
            </p>
            <p className="text-sm md:text-base text-gray-600 flex items-center gap-2">
              <FiCalendar className="text-gray-500" />
              <strong>Date:</strong> {new Date(article.publishedAt).toLocaleString()}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              className="flex-1 bg-gray-600 text-white py-2 md:py-3 rounded-lg font-semibold shadow hover:bg-gray-700 transition-colors text-sm md:text-base"
              onClick={() => navigate(-1)}
            >
              Go Back
            </button>
            
            <button
              className="flex-1 bg-blue-600 text-white py-2 md:py-3 rounded-lg font-semibold shadow hover:bg-blue-700 transition-colors text-sm md:text-base"
              onClick={handleOpenWebsite}
            >
              Read Full Article
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetailsPage;