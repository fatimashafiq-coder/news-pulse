import { Link } from "react-router-dom";
import { type Article } from "../../../types/article";

interface ArticleCardProps {
    article: Article;
}

const ArticleCard = ({ article }: ArticleCardProps) => {
    return (
        <div className="rounded-lg p-6 pt-2 border-2 border-cyan-500 hover:border-cyan-400 transition-all">
            <div className="w-10 h-10 rounded-full overflow-hidden border-4 border-cyan-500">
                <img
                    src={article.imageUrl || "https://via.placeholder.com/150"}
                    alt={article.title}
                    className="w-[350px] border-4 md:mx-0 mx-auto"
                    onError={(e) => {
                        e.currentTarget.src = "https://via.placeholder.com/150";
                    }}
                />
            </div>
            <h3 className="text-center text-white font-medium text-base mb-3">
                {article.title}
            </h3>

            <div className="flex justify-center">
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
