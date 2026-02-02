// components/library/MyNotesPanel.tsx
import { Note } from "@/app/library/page";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Book as BookIcon, Quote, Calendar, ChevronRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function MyNotesPanel({ notes }: { notes: Note[] }) {
    return (
        <div className="p-6 max-w-6xl mx-auto space-y-6 animate-in fade-in duration-500">
            {/* 紧凑型页眉 */}
            <div className="flex items-end justify-between border-b border-border pb-4">
                <div>
                    <h2 className="text-2xl font-bold text-foreground">我的笔记</h2>
                    <p className="text-sm text-muted-foreground mt-1">
                        共记录了 <span className="text-primary font-bold">{notes.length}</span> 条深度思考
                    </p>
                </div>
            </div>

            {/* 网格布局：自适应 1 或 2 列 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {notes.map((note) => (
                    <Card key={note.id} className="group border border-border/50 hover:border-primary/30 hover:shadow-md transition-all duration-300">
                        <CardContent className="p-4 flex flex-col h-full">
                            {/* 顶部信息栏 */}
                            <div className="flex justify-between items-start mb-3">
                                <div className="flex items-center gap-3 min-w-0">
                                    <div className="p-1.5 rounded-lg bg-primary/10 text-primary shrink-0">
                                        <BookIcon size={16} />
                                    </div>
                                    <div className="min-w-0">
                                        <h3 className="font-bold text-sm text-foreground truncate">
                                            《{note.bookTitle}》
                                        </h3>
                                        <div className="flex items-center gap-2 mt-0.5">
                                            <Badge variant="outline" className="text-[9px] h-4 px-1.5 uppercase font-medium bg-secondary/30">
                                                {note.chapter}
                                            </Badge>
                                            <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                                                <Calendar size={10} />
                                                {note.timestamp}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-primary shrink-0">
                                    <ExternalLink size={14} />
                                </Button>
                            </div>

                            {/* 笔记内容区域：更加紧凑 */}
                            <div className="relative flex-1">
                                <Quote className="absolute -left-1 -top-1 text-primary/10 h-6 w-6" />
                                <p className="text-sm text-foreground/80 leading-relaxed pl-4 italic line-clamp-3">
                                    {note.content}
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}