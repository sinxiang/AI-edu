// components/library/BookshelfPanel.tsx
import { Book } from "@/app/library/page";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, MoreVertical, BookOpen } from "lucide-react";

interface BookshelfPanelProps {
    books: Book[];
}

export function BookshelfPanel({ books }: BookshelfPanelProps) {
    return (
        <div className="p-8 max-w-7xl mx-auto animate-in fade-in duration-500">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-3xl font-black tracking-tight">我的书架</h2>
                    <p className="text-muted-foreground mt-1">您正在阅读的书籍和收藏的资源</p>
                </div>
                <div className="flex gap-2">
                    <Badge variant="outline" className="px-4 py-1">全选</Badge>
                    <Badge variant="outline" className="px-4 py-1">批量管理</Badge>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {books.map((book) => (
                    <Card key={book.id} className="group overflow-hidden border-none shadow-xl hover:shadow-2xl transition-all duration-300">
                        <div className="flex h-48">
                            {/* 书籍封面预览 */}
                            <div className={`w-32 ${book.coverColor} flex-shrink-0 flex items-center justify-center p-4 text-center`}>
                                <span className="text-white font-bold text-sm leading-tight drop-shadow-md">
                                    {book.title}
                                </span>
                            </div>

                            {/* 详情与进度 */}
                            <div className="flex-1 p-5 flex flex-col justify-between bg-white dark:bg-slate-900">
                                <div className="space-y-1">
                                    <div className="flex justify-between items-start">
                                        <h3 className="font-bold text-lg line-clamp-1">{book.title}</h3>
                                        <button className="text-slate-400 hover:text-slate-600"><MoreVertical size={16} /></button>
                                    </div>
                                    <p className="text-xs text-muted-foreground">{book.author}</p>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex justify-between items-end text-xs">
                                        <span className="text-slate-400 flex items-center gap-1">
                                            <Clock size={12} /> 2天前阅读
                                        </span>
                                        <span className="font-bold text-primary">{book.progress}%</span>
                                    </div>
                                    <Progress value={book.progress} className="h-1.5" />
                                    <Button size="sm" className="w-full gap-2 mt-1">
                                        <BookOpen size={14} /> 继续阅读
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}