// components/library/ReadingPanel.tsx
import { ChevronRight } from "lucide-react";
import { ReadingAssistant } from "./ReadingAssistant";

interface ReadingPanelProps {
    selectedText: string;
    onSelectText: (text: string) => void;
    onSetAiInput: (text: string) => void;
    noteInput: string;
    setNoteInput: (value: string) => void;
    onAddNote: () => void;
    showReadingAssistant: boolean;
    setShowReadingAssistant: (show: boolean) => void;
}

export function ReadingPanel({
    selectedText,
    onSelectText,
    onSetAiInput,
    noteInput,
    setNoteInput,
    onAddNote,
    showReadingAssistant,
    setShowReadingAssistant
}: ReadingPanelProps) {
    const selectTextForAI = (text: string) => {
        onSelectText(text);
        onSetAiInput(`关于这段内容："${text.substring(0, 100)}..." 请帮我解释一下`);
    };

    const handleQuickQuestion = (question: string) => {
        onSetAiInput(question);
    };

    return (
        <div className="flex-1 flex overflow-hidden">
            <div className="flex-1 overflow-y-auto p-6">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-foreground mb-2">深度阅读模式</h1>
                        <p className="text-muted-foreground">选中文本可在右侧边栏提问或做笔记</p>
                    </div>

                    <div className="prose prose-lg max-w-none">
                        <div className="bg-card border border-border rounded-xl p-8">
                            <h2 className="text-2xl font-bold mb-6">《百年孤独》第一章：家族起源的魔幻叙事</h2>

                            <div className="mb-6">
                                <h3 className="text-xl font-semibold mb-3">第一节：马孔多的建立</h3>

                                <p className="mb-4">
                                    多年以后，奥雷里亚诺·布恩迪亚上校面对行刑队，准会想起父亲带他去见识冰块的那个遥远的下午。
                                </p>

                                <div
                                    className="p-4 bg-muted/50 rounded-lg border border-border my-4 cursor-pointer hover:bg-muted transition-colors"
                                    onClick={() => selectTextForAI("多年以后，奥雷里亚诺·布恩迪亚上校面对行刑队，准会想起父亲带他去见识冰块的那个遥远的下午。")}
                                >
                                    <p className="text-lg text-center italic text-foreground">
                                        "多年以后，奥雷里亚诺·布恩迪亚上校面对行刑队，准会想起父亲带他去见识冰块的那个遥远的下午。"
                                    </p>
                                    <p className="text-sm text-muted-foreground text-center mt-2">
                                        点击选中这个经典开头向AI提问
                                    </p>
                                </div>

                                <p className="mb-4">
                                    那时的马孔多是一个二十户人家的村落，泥巴和芦苇盖成的屋子沿河岸排开，湍急的河水清澈见底，河床里卵石洁白光滑宛如史前巨蛋。
                                </p>

                                <p className="mb-4">
                                    世界新生伊始，许多事物还没有名字，提到的时候尚需用手指指点点。每年三月，衣衫褴褛的吉卜赛人都要来村里搭起帐篷，布恩迪亚家族的第一代人何塞·阿尔卡蒂奥·布恩迪亚便因此认识了冰块。
                                </p>

                                <p className="mb-4">
                                    当吉卜赛人梅尔基亚德斯把冰块当作"世界上最大的钻石"展示给马孔多人时，何塞·阿尔卡蒂奥·布恩迪亚完全被这神奇的事物迷住了。他抚摸着冰块，说道：
                                </p>

                                <div className="p-4 bg-muted/50 rounded-lg border border-border my-4 italic">
                                    "这是我们这个时代最伟大的发明。"然后他在桌面上放上一枚硬币，把冰块摆在上面，让所有人亲眼看着冰块如何在高温中融化成水。
                                </div>

                                <p className="mb-4">
                                    这个场景不仅象征了科学与愚昧的冲突，也预示了布恩迪亚家族对于新奇事物的永恒好奇——这种好奇将贯穿七代人的命运，成为他们荣耀与悲剧的源头。
                                </p>
                            </div>

                            <div className="mt-8 pt-6 border-t border-border">
                                <h4 className="font-semibold mb-3">文学要素分析：</h4>
                                <div className="flex flex-wrap gap-2">
                                    <button className="px-3 py-1.5 rounded-lg bg-secondary hover:bg-accent text-secondary-foreground hover:text-foreground transition-colors text-sm">
                                        魔幻现实主义
                                    </button>
                                    <button className="px-3 py-1.5 rounded-lg bg-secondary hover:bg-accent text-secondary-foreground hover:text-foreground transition-colors text-sm">
                                        循环叙事
                                    </button>
                                    <button className="px-3 py-1.5 rounded-lg bg-secondary hover:bg-accent text-secondary-foreground hover:text-foreground transition-colors text-sm">
                                        象征手法
                                    </button>
                                    <button className="px-3 py-1.5 rounded-lg bg-secondary hover:bg-accent text-secondary-foreground hover:text-foreground transition-colors text-sm">
                                        家族史诗
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {showReadingAssistant ? (
                <ReadingAssistant
                    selectedText={selectedText}
                    onClearSelectedText={() => onSelectText("")}
                    noteInput={noteInput}
                    setNoteInput={setNoteInput}
                    onAddNote={onAddNote}
                    onQuickQuestion={handleQuickQuestion}
                    onClose={() => setShowReadingAssistant(false)}
                />
            ) : (
                <div className="relative">
                    <button
                        onClick={() => setShowReadingAssistant(true)}
                        className="absolute right-0 top-4 z-10 rounded-l-lg bg-sidebar p-2 text-muted-foreground shadow-lg transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground"
                    >
                        <ChevronRight className="h-5 w-5" />
                    </button>
                </div>
            )}
        </div>
    );
}