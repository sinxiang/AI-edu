// components/library/MyNotesPanel.tsx
import { Note } from "@/app/library/page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Book as BookIcon, Quote, Calendar, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function MyNotesPanel({ notes }: { notes: Note[] }) {
    return (
        <div className="p-8 max-w-5xl mx-auto space-y-8 animate-in slide-in-from-bottom-4 duration-500">
            <div className="border-b border-border pb-6">
                <h2 className="text-4xl font-black text-foreground">我的笔记</h2>
                <p className="text-muted-foreground mt-2 font-medium">
                    沉淀知识，共记录了 {notes.length} 条深度思考
                </p>
            </div>

            <div className="space-y-6">
                {notes.map((note) => (
                    <Card key={note.id} className="relative overflow-hidden border-none shadow-lg group">
                        <div className="flex h-full">
                            {/* 左侧装饰条 */}
                            <div className="w-1.5 bg-primary group-hover:w-3 transition-all duration-300" />

                            <div className="p-6 flex-1 bg-card">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="flex items-center gap-4">
                                        <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                                            <BookIcon size={20} />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="font-bold text-lg text-foreground">《{note.bookTitle}》</span>
                                                <Badge variant="secondary" className="text-[10px] uppercase font-bold tracking-wider">
                                                    {note.chapter}
                                                </Badge>
                                            </div>
                                            <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                                                <Calendar size={12} />
                                                {note.timestamp}
                                            </div>
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="sm" className="gap-1 text-primary hover:text-primary hover:bg-primary/5">
                                        查看原文 <ChevronRight size={14} />
                                    </Button>
                                </div>

                                <div className="relative pl-6">
                                    <Quote className="absolute left-0 top-0 text-muted-foreground/20 h-10 w-10 -z-0" />
                                    <p className="relative z-10 text-foreground/80 text-lg leading-relaxed font-medium italic">
                                        “{note.content}”
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}