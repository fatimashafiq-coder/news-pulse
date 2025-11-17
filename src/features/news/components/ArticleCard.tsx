import { Link } from "react-router-dom";
import { type Article } from "../../../types/article";
import { FiCalendar } from "react-icons/fi";

interface ArticleCardProps {
    article: Article;
}

const ArticleCard = ({ article }: ArticleCardProps) => {
    return (
        <div>
            <div className="rounded-full overflow-hidden  border-4 border-cyan-500">
                <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-[350px] md:mx-0 mx-auto"
                />
            </div>
            <h3 className="text-center text-white font-medium text-base mb-3">
                {article.title}
            </h3>
               <p className="mb-2">
                    <FiCalendar />
                    <strong>Date:</strong> {new Date(article.publishedAt).toLocaleString()}
                  </p>

            <div className="flex justify-center " >
                <Link
                    to={`/article/${article.id}`}
                    state={{ article }}
                >
                    <button
                    > View Details</button>
                </Link>
            </div>
        </div>
    );
};

export default ArticleCard;
