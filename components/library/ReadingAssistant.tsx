// components/library/ReadingAssistant.tsx
import { MessageSquare, StickyNote, X, Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ReadingAssistantProps {
    selectedText: string;
    onClearSelectedText: () => void;
    noteInput: string;
    setNoteInput: (val: string) => void;
    onAddNote: () => void;
    onQuickQuestion: (q: string) => void;
    onClose: () => void;
}

export function ReadingAssistant({
    selectedText, onClearSelectedText, noteInput, setNoteInput, onAddNote, onQuickQuestion, onClose
}: ReadingAssistantProps) {
    return (
        <div className="flex flex-col h-full bg-card border-l border-border">
            <div className="p-4 border-b border-border flex justify-between items-center bg-background">
                <div className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-blue-600 fill-blue-600" />
                    <span className="font-bold text-foreground">AI 阅读助手</span>
                </div>
                <Button variant="ghost" size="icon" onClick={onClose}><X size={18} /></Button>
            </div>

            <ScrollArea className="flex-1 p-4">
                {selectedText && (
                    <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800 animate-in zoom-in-95 duration-300">
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-xs font-bold text-blue-600 uppercase">当前选中内容</span>
                            <button onClick={onClearSelectedText} className="text-blue-400 hover:text-blue-600"><X size={12} /></button>
                        </div>
                        <p className="text-sm italic text-slate-600 dark:text-slate-300 line-clamp-3">"{selectedText}"</p>
                    </div>
                )}

                <Tabs defaultValue="ai" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-4 bg-muted/50">
                        <TabsTrigger value="ai" className="gap-2 text-foreground"><MessageSquare size={14} /> 提问 AI</TabsTrigger>
                        <TabsTrigger value="note" className="gap-2 text-foreground"><StickyNote size={14} /> 记录笔记</TabsTrigger>
                    </TabsList>

                    <TabsContent value="ai" className="space-y-4">
                        <div className="grid grid-cols-1 gap-2">
                            {["总结本段要点", "分析写作风格", "寻找关联背景", "提出深度问题"].map(q => (
                                <Button key={q} variant="outline" size="sm" className="justify-start text-xs text-muted-foreground h-auto py-2" onClick={() => onQuickQuestion(q)}>
                                    {q}
                                </Button>
                            ))}
                        </div>
                        <div className="h-64 border border-border rounded-xl bg-background p-4 text-sm text-muted-foreground italic flex items-center justify-center">
                            AI 回复将显示在这里。您可以选中文本，或直接提问。
                        </div>
                    </TabsContent>

                    <TabsContent value="note" className="space-y-4">
                        <Textarea
                            placeholder="记录您的感悟、疑问或思考..."
                            className="min-h-[200px] resize-none border border-input focus-visible:ring-2 focus-visible:ring-primary/50 bg-background shadow-inner text-foreground"
                            value={noteInput}
                            onChange={(e) => setNoteInput(e.target.value)}
                        />
                        <Button className="w-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90" onClick={onAddNote}>
                            <Send size={14} /> 保存笔记
                        </Button>
                    </TabsContent>
                </Tabs>
            </ScrollArea>
        </div>
    );
}