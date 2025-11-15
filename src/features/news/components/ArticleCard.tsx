import {type Article } from "../../../types/article";

interface ArticleCardProps {
  article: Article;
}

const ArticleCard = ({ article }: ArticleCardProps) => {
  // Source badge colors
  const getBadgeColor = (source: string) => {
    switch (source) {
      case "NewsAPI":
        return "bg-blue-100 text-blue-700";
      case "Guardian":
        return "bg-green-100 text-green-700";
      case "NY Times":
        return "bg-purple-100 text-purple-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-lg transition">
      <span className={`text-xs px-2 py-1 rounded font-medium ${getBadgeColor(article.source)}`}>
        {article.source}
      </span>

      {article.imageUrl && (
        <img
          src={article.imageUrl}
          alt={article.title}
          className="w-full h-48 object-cover rounded my-3"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
      )}

      <p className="text-xs text-gray-500 mb-2">
        {article.sourceName} • {new Date(article.publishedAt).toLocaleDateString()}
      </p>

      <h2 className="font-bold text-lg mb-2 line-clamp-2">{article.title}</h2>

      <p className="text-gray-600 text-sm mb-3 line-clamp-3">{article.description}</p>
      {article.author && (
        <p className="text-xs text-gray-500 mb-2">By {article.author}</p>
      )}
      <a  href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:underline text-sm font-medium"
      >
        Read more →
      </a>
    </div>
  );
};

export default ArticleCard;