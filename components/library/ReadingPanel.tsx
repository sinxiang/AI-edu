// components/library/ReadingPanel.tsx
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, BookOpen } from "lucide-react";
import { ReadingAssistant } from "./ReadingAssistant";

interface ReadingPanelProps {
    selectedText: string;
    onSelectText: (t: string) => void;
    onSetAiInput: (t: string) => void;
    noteInput: string;
    setNoteInput: (v: string) => void;
    onAddNote: () => void;
    showReadingAssistant: boolean;
    setShowReadingAssistant: (s: boolean) => void;
}

export function ReadingPanel({
    selectedText, onSelectText, onSetAiInput,
    noteInput, setNoteInput, onAddNote,
    showReadingAssistant, setShowReadingAssistant
}: ReadingPanelProps) {
    return (
        <div className="flex h-full overflow-hidden relative bg-white dark:bg-slate-950">
            {/* 浮动控制开关 */}
            <div className="absolute left-6 top-6 z-30 flex items-center gap-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur border p-2 px-4 rounded-full shadow-lg">
                <Switch
                    id="assistant-toggle"
                    checked={showReadingAssistant}
                    onCheckedChange={setShowReadingAssistant}
                />
                <Label htmlFor="assistant-toggle" className="text-xs font-bold cursor-pointer text-foreground">AI 助手 & 笔记</Label>
            </div>

            <div className="flex-1 overflow-y-auto px-12 pt-24 pb-28 scroll-smooth">
                <article className="max-w-3xl mx-auto prose dark:prose-invert text-lg leading-relaxed text-slate-700 dark:text-slate-300">
                    <header className="mb-12 border-b pb-8">
                        <div className="flex items-center gap-2 text-primary mb-2">
                            <BookOpen className="h-4 w-4" />
                            <span className="text-sm font-bold uppercase tracking-widest">正在阅读</span>
                        </div>
                        <h1 className="text-5xl font-black mb-2 text-slate-900 dark:text-white">《百年孤独》</h1>
                        <p className="text-slate-500 font-medium">加西亚·马尔克斯 · 第一章</p>
                    </header>

                    <div className="space-y-8 font-serif">
                        <p className="text-xl leading-relaxed italic border-l-4 border-primary pl-6 mb-12 cursor-pointer hover:bg-primary/5 transition-colors p-2 rounded"
                            onClick={() => {
                                onSelectText("多年以后，奥雷里亚诺·布恩迪亚上校面对行刑队，准会想起父亲带他去见识冰块的那个遥远的下午。");
                                onSetAiInput("请分析这段文字在文学史上的地位。");
                            }}>
                            “多年以后，奥雷里亚诺·布恩迪亚上校面对行刑队，准会想起父亲带他去见识冰块的那个遥远的下午。”
                        </p>

                        <p>那时的马孔多是一个二十户人家的村落，泥巴和芦苇盖成的屋子沿河岸排开，湍急的河水清澈见底，河床里卵石洁白光滑宛如史前巨蛋。世界新生伊始，许多事物还没有名字，提到的时候尚需用手指指点点。</p>

                        <p>每年三月，一群衣衫褴褛的吉卜赛人会在马孔多河畔扎营，他们总是带来最新的发明。先是磁铁。一个体形庞大的吉卜赛人，蓄着浓密的胡须，双手像麻雀的爪子，自称梅尔基亚德斯，他演示了“世界第八大奇迹”：两个用磁石制成的魔术物品，他称之为“炼金术士的工具”。</p>

                        <p>只要有这两个磁块，梅尔基亚德斯边走边嚷，你们就能开掘出深埋地下的金子。何塞·阿尔卡蒂奥·布恩迪亚——村子的创始人，他那漫无边际的想象力总是超出自然界的力量。他认为磁铁可以用来寻找地下的矿藏。他用两只骡子和几只山羊换来了两个磁石块，甚至不顾妻子乌尔苏拉的劝阻，他确信能靠这个发大财。</p>

                        <p>在那段疯狂的日子里，马孔多的每一寸土地都被他翻了个遍。他日夜不停地挖掘，直到挖出了一副十五世纪的生锈铠甲，里面装着一具挂着铜坠子的骷髅，他才垂头丧气地回到了家。这种对于奇迹的渴望，不仅预示了马孔多的命运，也构成了布恩迪亚家族百年的宿命基调。</p>
                    </div>
                </article>
            </div>

            {/* 底部翻页导航 */}
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-background/80 backdrop-blur border-t border-border flex justify-center items-center gap-8 z-20">
                <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground">
                    <ChevronLeft className="h-4 w-4" /> 上一页
                </Button>
                <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-foreground">04</span>
                    <span className="text-xs text-muted-foreground">/ 328</span>
                </div>
                <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground">
                    下一页 <ChevronRight className="h-4 w-4" />
                </Button>
            </div>

            {showReadingAssistant && (
                <aside className="w-96 border-l bg-card animate-in slide-in-from-right duration-300">
                    <ReadingAssistant
                        selectedText={selectedText}
                        onClearSelectedText={() => onSelectText("")}
                        noteInput={noteInput}
                        setNoteInput={setNoteInput}
                        onAddNote={onAddNote}
                        onQuickQuestion={(q) => onSetAiInput(q)}
                        onClose={() => setShowReadingAssistant(false)}
                    />
                </aside>
            )}
        </div>
    );
}