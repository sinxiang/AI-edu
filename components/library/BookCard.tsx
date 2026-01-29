// components/library/BookCard.tsx
import { BookOpen, Star } from "lucide-react";
import { cn } from "@/lib/utils";

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

interface RecommendationTag {
    text: string;
    type: 'course' | 'preference' | 'history' | 'trending';
}

interface BookCardProps {
    book: Book;
    recommendationTags?: RecommendationTag[];
    onClick?: () => void;
    className?: string;
}

const bookTypes = {
    academic: { label: "学术", color: "bg-blue-500/10 text-blue-500" },
    fiction: { label: "小说", color: "bg-purple-500/10 text-purple-500" },
    literature: { label: "文学", color: "bg-emerald-500/10 text-emerald-500" },
    science: { label: "科普", color: "bg-amber-500/10 text-amber-500" },
    biography: { label: "传记", color: "bg-gray-500/10 text-gray-600" },
    'self-help': { label: "成长", color: "bg-green-500/10 text-green-500" },
};

export function BookCard({ book, recommendationTags = [], onClick, className }: BookCardProps) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "w-full text-left rounded-xl border border-border bg-card hover:bg-accent/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg overflow-hidden h-full group",
                className
            )}
        >
            <div className="p-6">
                <div className="flex gap-6 mb-4">
                    <div className={`${book.coverColor} w-24 h-32 rounded-lg flex items-center justify-center text-white font-bold text-2xl flex-shrink-0`}>
                        {book.title.charAt(0)}
                    </div>

                    <div className="flex-1">
                        <h3 className="font-semibold text-xl text-foreground group-hover:text-primary transition-colors mb-2 line-clamp-2">
                            {book.title}
                        </h3>
                        <p className="text-muted-foreground mb-3">{book.author}</p>

                        <div className="flex flex-wrap gap-2 mb-3">
                            {recommendationTags.map((tag, idx) => (
                                <span
                                    key={idx}
                                    className={cn(
                                        "px-2 py-1 rounded-full text-xs font-medium",
                                        tag.type === 'course'
                                            ? "bg-blue-500/10 text-blue-500 border border-blue-500/20"
                                            : tag.type === 'preference'
                                                ? "bg-purple-500/10 text-purple-500 border border-purple-500/20"
                                                : tag.type === 'history'
                                                    ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                                                    : "bg-amber-500/10 text-amber-500 border border-amber-500/20"
                                    )}
                                >
                                    {tag.text}
                                </span>
                            ))}

                            <span className={cn("px-3 py-1 rounded-md text-sm", bookTypes[book.type].color)}>
                                {bookTypes[book.type].label}
                            </span>
                            <div className="flex flex-wrap gap-1">
                                {book.tags.slice(0, 2).map((tag, idx) => (
                                    <span key={idx} className="px-2 py-0.5 rounded bg-secondary text-secondary-foreground text-xs">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center gap-4 text-sm mb-3">
                            <div className="flex items-center gap-1 text-amber-500">
                                <Star className="h-4 w-4 fill-current" />
                                <span>{book.rating}</span>
                            </div>
                            <div className="flex items-center gap-1 text-muted-foreground">
                                <BookOpen className="h-4 w-4" />
                                <span>{book.readCount.toLocaleString()}人阅读</span>
                            </div>
                        </div>
                    </div>
                </div>

                {book.progress && (
                    <div className="mt-4">
                        <div className="flex items-center justify-between text-sm mb-1">
                            <span className="text-muted-foreground">阅读进度</span>
                            <span className="font-medium">{book.progress}%</span>
                        </div>
                        <div className="h-2 rounded-full bg-secondary overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full transition-all duration-500"
                                style={{ width: `${book.progress}%` }}
                            />
                        </div>
                    </div>
                )}
            </div>
        </button>
    );
}