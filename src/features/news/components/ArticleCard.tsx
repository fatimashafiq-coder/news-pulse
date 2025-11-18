import { Link } from "react-router-dom";
import { type Article } from "../../../types/article";
import { FiCalendar } from "react-icons/fi";

interface ArticleCardProps {
    article: Article;
}

const ArticleCard = ({ article }: ArticleCardProps) => {
    return (
        <div className="bg-white  overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="relative w-full h-48 overflow-hidden">
                <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
            </div>

            <div className="p-4">
    
                <h3 className="text-black font-bold text-base mb-3 line-clamp-2 hover:text-gray-700">
                    {article.title}
                </h3>

                <p className="text-gray-600 text-xs flex items-center gap-2 mb-4">
                    <FiCalendar className="text-gray-500" />
                    <strong>Date:</strong> {new Date(article.publishedAt).toLocaleString()}
                </p>

                <Link
                className="pr-3"
                    to={`/article/${article.id}`}
                    state={{ article }}
                >
                    <button className=" px-6 py-3 bg-black text-white font-semibold rounded-lg shadow-md hover:bg-gray-800 transition-colors duration-200 text-base tracking-wide">
                        View
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default ArticleCard;
