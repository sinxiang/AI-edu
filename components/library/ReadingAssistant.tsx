// components/library/ReadingAssistant.tsx
import { Brain, X, Notebook, BookOpen } from "lucide-react";

interface ReadingAssistantProps {
    selectedText: string;
    onClearSelectedText: () => void;
    noteInput: string;
    setNoteInput: (value: string) => void;
    onAddNote: () => void;
    onQuickQuestion: (question: string) => void;
    onClose: () => void;
}

export function ReadingAssistant({
    selectedText,
    onClearSelectedText,
    noteInput,
    setNoteInput,
    onAddNote,
    onQuickQuestion,
    onClose
}: ReadingAssistantProps) {
    const quickQuestions = [
        {
            text: "这个开头运用了什么样的叙事技巧？",
            question: "多年以后，奥雷里亚诺·布恩迪亚上校面对行刑队，准会想起父亲带他去见识冰块的那个遥远的下午。"
        },
        {
            text: "冰块在热带地区出现有什么象征意义？",
            question: "冰块在小说中有什么象征意义？"
        },
        {
            text: "如何理解魔幻现实主义的文学特征？",
            question: "魔幻现实主义的特点"
        }
    ];

    return (
        <div className="w-96 border-l border-border bg-sidebar overflow-y-auto flex-shrink-0">
            <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center">
                            <Brain className="h-5 w-5 text-white" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-foreground">阅读助手</h3>
                            <p className="text-sm text-muted-foreground">辅助深度阅读</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-1.5 rounded-lg text-muted-foreground hover:bg-sidebar-accent hover:text-foreground transition-colors"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>

                {selectedText && (
                    <div className="mb-6 p-4 rounded-lg bg-muted/50 border border-border">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-foreground">已选中内容</span>
                            <button
                                onClick={onClearSelectedText}
                                className="text-xs text-muted-foreground hover:text-foreground"
                            >
                                清除
                            </button>
                        </div>
                        <p className="text-sm text-foreground italic">"{selectedText.substring(0, 150)}..."</p>
                    </div>
                )}

                <div className="mb-6">
                    <h4 className="text-sm font-medium text-foreground mb-3">快速提问</h4>
                    <div className="space-y-3">
                        {quickQuestions.map((item, index) => (
                            <button
                                key={index}
                                onClick={() => onQuickQuestion(item.question)}
                                className="w-full text-left p-3 rounded-lg bg-card border border-border hover:bg-accent/50 transition-colors text-sm"
                            >
                                {item.text}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                        <h4 className="text-sm font-medium text-foreground">阅读笔记</h4>
                        <Notebook className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="space-y-3">
                        <textarea
                            value={noteInput}
                            onChange={(e) => setNoteInput(e.target.value)}
                            placeholder="记录阅读笔记..."
                            className="w-full p-3 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-sm min-h-[120px] resize-none"
                        />
                        <button
                            onClick={onAddNote}
                            className="w-full py-2.5 bg-primary hover:opacity-90 text-primary-foreground rounded-lg font-medium transition-opacity text-sm"
                        >
                            保存笔记
                        </button>
                    </div>
                </div>

                <div>
                    <h4 className="text-sm font-medium text-foreground mb-3">相关资料</h4>
                    <div className="space-y-3">
                        <div className="p-3 rounded-lg bg-card border border-border">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="p-1 rounded bg-amber-500/10 text-amber-500">
                                    <BookOpen className="h-3 w-3" />
                                </div>
                                <span className="text-sm font-medium">魔幻现实主义文学</span>
                            </div>
                            <p className="text-xs text-muted-foreground mb-2">拉丁美洲文学流派特点</p>
                            <button className="w-full text-xs py-1.5 bg-secondary hover:bg-accent text-secondary-foreground hover:text-foreground rounded transition-colors">
                                查看资料
                            </button>
                        </div>
                        <div className="p-3 rounded-lg bg-card border border-border">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="p-1 rounded bg-purple-500/10 text-purple-500">
                                    <BookOpen className="h-3 w-3" />
                                </div>
                                <span className="text-sm font-medium">马尔克斯作品集</span>
                            </div>
                            <p className="text-xs text-muted-foreground mb-2">《霍乱时期的爱情》等作品</p>
                            <button className="w-full text-xs py-1.5 bg-secondary hover:bg-accent text-secondary-foreground hover:text-foreground rounded transition-colors">
                                查看作品
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}