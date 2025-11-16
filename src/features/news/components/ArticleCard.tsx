import { type Article } from "../../../types/article";

interface ArticleCardProps {
    article: Article;
}

const ArticleCard = ({ article }: ArticleCardProps) => {
    return (
        <div className="bg-[#0a1929] rounded-lg p-6 border-2 border-cyan-500 hover:border-cyan-400 transition-all">
            <div className=" w-10 h-10 rounded-full overflow-hidden border-4 border-cyan-500">
                <img
                    src={article.imageUrl || "https://via.placeholder.com/150"}
                    alt={article.title}
                    className="w-full h-full object-cover block"
                    onError={(e) => {
                        e.currentTarget.src = "https://via.placeholder.com/150";
                    }}
                />
            </div>
            <h3 className="text-center text-white font-medium text-base mb-3">
                {article.title}
            </h3>

            <div className="flex justify-center">
                <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-2 rounded font-medium transition-colors"
                >
                    View
                </a>
            </div>
        </div>
    );
};

export default ArticleCard;
