import { Link } from "react-router-dom";
import { type Article } from "../../../types/article";
import { useState } from "react";
import dummyImage from "../../../assets/dummyImage.jpg"

interface ArticleCardProps {
    article: Article;
}

const ArticleCard = ({ article }: ArticleCardProps) => {
    const [imgError, setImgError] = useState(false);

    const handleImageError = () => {
        setImgError(true);
    };

    return (
        <div className="bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col h-[350px]">
            <div className="h-48 overflow-hidden">
                <img
                    src={imgError ? dummyImage : article.imageUrl}
                    alt={article.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    onError={handleImageError}
                />
            </div>

            <div className="flex-1 p-4 flex flex-col">
                <Link to={article.url} target="_blank" className="hover:no-underline">
                    <h3 className="text-gray-900 font-bold text-lg mb-2 line-clamp-2 leading-tight hover:text-blue-600 transition-colors">
                        {article.title}
                    </h3>
                </Link>
                {article.author && (
                    <p className="text-gray-600 text-sm mb-3">
                        By {article.author}
                    </p>
                )}

                <div className="mt-auto flex justify-start">
                    <Link
                        to={`/article/${article.id}`}
                        state={{ article }}
                        className="bg-black text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors text-center w-auto cursor-pointer"
                    >
                        View
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ArticleCard;
