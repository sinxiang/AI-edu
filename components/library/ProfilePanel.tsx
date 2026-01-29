// components/library/ProfilePanel.tsx
import { Star, BookOpen, Bookmark } from "lucide-react";

interface ReadingNote {
    id: string;
    content: string;
    timestamp: string;
    bookId: string;
}

interface ProfilePanelProps {
    notes: ReadingNote[];
}

export function ProfilePanel({ notes }: ProfilePanelProps) {
    return (
        <div className="p-6 h-full overflow-y-auto">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-foreground mb-2">个人信息</h1>
                    <p className="text-muted-foreground">管理您的个人资料和阅读记录</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="col-span-1 md:col-span-2">
                        <div className="bg-card border border-border rounded-xl p-6">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center text-white text-2xl font-bold">
                                    用
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-foreground">图书馆用户</h3>
                                    <p className="text-muted-foreground">高级会员</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-muted-foreground mb-1">阅读时长</p>
                                        <p className="font-medium text-foreground">128 小时</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground mb-1">已读书籍</p>
                                        <p className="font-medium text-foreground">24 本</p>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground mb-1">阅读偏好</p>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="px-2 py-1 rounded bg-blue-500/10 text-blue-500 text-xs">学术</span>
                                        <span className="px-2 py-1 rounded bg-purple-500/10 text-purple-500 text-xs">小说</span>
                                        <span className="px-2 py-1 rounded bg-emerald-500/10 text-emerald-500 text-xs">文学</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-card border border-border rounded-xl p-6">
                            <h4 className="font-medium text-foreground mb-4">阅读统计</h4>
                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="text-muted-foreground">本月阅读</span>
                                        <span className="font-medium">12.5 小时</span>
                                    </div>
                                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                                        <div className="h-full bg-primary rounded-full" style={{ width: '65%' }} />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="text-muted-foreground">笔记数量</span>
                                        <span className="font-medium">47 篇</span>
                                    </div>
                                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: '80%' }} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-card border border-border rounded-xl p-6">
                            <h4 className="font-medium text-foreground mb-4">成就</h4>
                            <div className="grid grid-cols-3 gap-2">
                                <div className="flex flex-col items-center">
                                    <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center mb-2">
                                        <Star className="h-5 w-5 text-amber-500" />
                                    </div>
                                    <span className="text-xs text-muted-foreground">阅读达人</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center mb-2">
                                        <BookOpen className="h-5 w-5 text-blue-500" />
                                    </div>
                                    <span className="text-xs text-muted-foreground">持续学习</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center mb-2">
                                        <Bookmark className="h-5 w-5 text-emerald-500" />
                                    </div>
                                    <span className="text-xs text-muted-foreground">笔记大师</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-card border border-border rounded-xl p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold text-foreground">最近笔记</h3>
                        <button className="text-sm text-primary hover:text-primary/80 transition-colors">
                            查看全部
                        </button>
                    </div>
                    <div className="space-y-4">
                        {notes.map((note) => (
                            <div key={note.id} className="p-4 rounded-lg bg-secondary/30 border border-border">
                                <p className="text-foreground mb-2">{note.content}</p>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">{note.timestamp}</span>
                                    <button className="text-primary hover:text-primary/80 transition-colors">
                                        查看详情
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}