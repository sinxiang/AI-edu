// components/library/DiscoverPanel.tsx
import { Search, Sparkles, TrendingUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Book } from "@/app/library/page";

interface DiscoverPanelProps {
    books: Book[];
    onRead: () => void;
}

export function DiscoverPanel({ books, onRead }: DiscoverPanelProps) {
    return (
        <div className="p-8 max-w-7xl mx-auto space-y-12">
            {/* 顶部搜索栏 */}
            <div className="relative max-w-2xl mx-auto group">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-full blur opacity-0 group-hover:opacity-100 transition duration-500" />
                <div className="relative flex items-center bg-card rounded-full border border-border shadow-lg overflow-hidden pr-2">
                    <Search className="ml-6 h-5 w-5 text-muted-foreground" />
                    <Input
                        className="border-0 focus-visible:ring-0 text-lg h-14 bg-transparent flex-1"
                        placeholder="搜索书名、作者或关键词..."
                    />
                    <Button size="sm" className="rounded-full px-6 h-10">搜索</Button>
                </div>
            </div>

            {/* 个性化推荐 */}
            <section>
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-amber-500/10 rounded-xl">
                            <Sparkles className="h-6 w-6 text-amber-600" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-foreground">个性化推荐</h2>
                            <p className="text-sm text-muted-foreground">根据您的学习进度及兴趣标签生成</p>
                        </div>
                    </div>
                    <Badge variant="outline" className="px-4 py-1">换一批</Badge>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {books.map(book => (
                        <div key={book.id} className="group relative bg-card border border-border rounded-2xl p-4 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                            <div className={`aspect-[3/4] rounded-xl ${book.coverColor} mb-4 shadow-inner flex items-center justify-center p-6 text-center text-white font-bold text-lg drop-shadow-md`}>
                                {book.title}
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between items-start">
                                    <h3 className="font-bold text-foreground line-clamp-1">{book.title}</h3>
                                    <Badge className="bg-emerald-500/10 text-emerald-600 border-none h-5 text-[10px]">{book.rating}</Badge>
                                </div>
                                <p className="text-sm text-muted-foreground">{book.author}</p>
                                <div className="flex flex-wrap gap-1.5 pt-1">
                                    {book.tags.slice(0, 2).map(tag => (
                                        <span key={tag} className="text-[10px] px-2 py-0.5 rounded-md bg-muted text-muted-foreground font-bold uppercase">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                                <Button className="w-full mt-4 bg-foreground text-background hover:bg-primary hover:text-primary-foreground transition-colors" onClick={onRead}>
                                    立即阅读
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 最近热门 */}
            <section className="bg-muted/30 rounded-[2rem] p-8 border border-border">
                <h3 className="text-xl font-bold flex items-center gap-2 mb-6">
                    <TrendingUp className="text-emerald-500" /> 热门趋势
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {books.slice(0, 2).map((book, i) => (
                        <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:bg-muted/50 transition-colors cursor-pointer" onClick={onRead}>
                            <span className="text-3xl font-black text-muted-foreground/20 italic">0{i + 1}</span>
                            <div className={`w-12 h-16 rounded shadow-sm ${book.coverColor} flex-shrink-0`} />
                            <div className="flex-1 min-w-0">
                                <h4 className="font-bold text-foreground truncate">{book.title}</h4>
                                <p className="text-xs text-muted-foreground line-clamp-1">{book.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}