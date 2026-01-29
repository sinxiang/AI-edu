// components/library/DiscoverPanel.tsx
import { BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { BookCard } from "./BookCard";

interface Book {
    id: string;
    title: string;
    author: string;
    category: string;
    type: 'academic' | 'fiction' | 'literature' | 'science' | 'biography' | 'self-help';
    rating: number;
    readCount: number;
    coverColor: string;
    progress?: number;
    tags: string[];
}

interface Category {
    id: string;
    name: string;
    icon: React.ReactNode;
}

interface RecommendationTag {
    text: string;
    type: 'course' | 'preference' | 'history' | 'trending';
}

interface DiscoverPanelProps {
    books: Book[];
    categories: Category[];
    selectedCategory: string;
    onCategoryChange: (categoryId: string) => void;
    onBookClick?: (book: Book) => void;
}

const getRecommendationTags = (bookId: string): RecommendationTag[] => {
    const recommendationMap: Record<string, RecommendationTag[]> = {
        "1": [
            { text: "根据AI课程推荐", type: 'course' },
            { text: "与机器学习课程相关", type: 'course' },
        ],
        "2": [
            { text: "根据数学课程推荐", type: 'course' },
            { text: "基于您的学术偏好", type: 'preference' },
        ],
        "3": [
            { text: "根据文学阅读历史推荐", type: 'history' },
            { text: "经典名著必读", type: 'trending' },
        ],
        "4": [
            { text: "根据科幻偏好推荐", type: 'preference' },
            { text: "热门科幻作品", type: 'trending' },
        ],
        "5": [
            { text: "根据中国文学偏好", type: 'preference' },
            { text: "与您阅读历史相似", type: 'history' },
        ],
        "6": [
            { text: "根据古典文学课程", type: 'course' },
            { text: "经典名著必读", type: 'trending' },
        ],
        "7": [
            { text: "根据外国文学偏好", type: 'preference' },
            { text: "畅销文学作品", type: 'trending' },
        ],
        "8": [
            { text: "根据科普课程推荐", type: 'course' },
            { text: "科学爱好者推荐", type: 'preference' },
        ],
        "9": [
            { text: "根据历史课程", type: 'course' },
            { text: "热门科普读物", type: 'trending' },
        ],
        "10": [
            { text: "根据创新课程", type: 'course' },
            { text: "与科技偏好相关", type: 'preference' },
        ],
        "11": [
            { text: "根据个人发展偏好", type: 'preference' },
            { text: "畅销传记作品", type: 'trending' },
        ],
        "12": [
            { text: "根据心理学课程", type: 'course' },
            { text: "个人成长类畅销书", type: 'trending' },
        ],
    };

    return recommendationMap[bookId] || [];
};

export function DiscoverPanel({
    books,
    categories,
    selectedCategory,
    onCategoryChange,
    onBookClick
}: DiscoverPanelProps) {
    const filteredBooks = selectedCategory === "all"
        ? books
        : books.filter(book => book.type === selectedCategory);

    return (
        <div className="p-6 h-full overflow-y-auto">
            <div className="max-w-6xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-foreground mb-2">发现引擎</h1>
                    <p className="text-muted-foreground">发现各类精彩书籍，丰富您的阅读世界</p>
                </div>

                <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-medium text-foreground">书籍分类</h3>
                        <span className="text-sm text-muted-foreground">{filteredBooks.length} 本书</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => onCategoryChange(cat.id)}
                                className={cn(
                                    "flex items-center gap-2 px-4 py-2 rounded-lg transition-all",
                                    selectedCategory === cat.id
                                        ? "bg-primary text-primary-foreground"
                                        : "bg-secondary hover:bg-accent text-secondary-foreground hover:text-foreground"
                                )}
                            >
                                {cat.icon}
                                <span className="text-sm">{cat.name}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-8">
                    {filteredBooks.map((book) => (
                        <div key={book.id} className="group">
                            <BookCard
                                book={book}
                                recommendationTags={getRecommendationTags(book.id)}
                                onClick={() => onBookClick?.(book)}
                            />
                        </div>
                    ))}
                </div>

                {filteredBooks.length === 0 && (
                    <div className="text-center py-12">
                        <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-foreground mb-2">暂无书籍</h3>
                        <p className="text-muted-foreground">请选择其他分类或搜索相关书籍</p>
                    </div>
                )}
            </div>
        </div>
    );
}