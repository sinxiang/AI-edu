// components/library/ProfilePanel.tsx
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Clock, BookOpen, StickyNote, Trophy, TrendingUp } from "lucide-react";
import { Note } from "@/app/library/page";

export function ProfilePanel({ notes }: { notes: Note[] }) {
    const learningStats = [
        { label: "本月时长", value: "18.5h", icon: Clock, color: "text-blue-500" },
        { label: "已读书籍", value: "12本", icon: BookOpen, color: "text-emerald-500" },
        { label: "累计笔记", value: `${notes.length}篇`, icon: StickyNote, color: "text-purple-500" },
        { label: "学习积分", value: "1,250", icon: Trophy, color: "text-amber-500" },
    ];

    return (
        <div className="p-6 max-w-5xl mx-auto space-y-6 animate-in fade-in duration-500">
            {/* 顶部简明学生信息 */}
            <div className="flex flex-col md:flex-row gap-6">
                <Card className="flex-1 p-6 bg-slate-900 text-white flex items-center gap-6 overflow-hidden relative border-none">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-3xl -mr-16 -mt-16" />
                    <Avatar className="h-20 w-20 border-2 border-white/20 shadow-xl">
                        <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=student" />
                        <AvatarFallback>学</AvatarFallback>
                    </Avatar>
                    <div className="relative z-10">
                        <h2 className="text-2xl font-bold">李华 同学</h2>
                        <p className="text-slate-400 text-sm mt-1">计算机科学与技术 · 2022级</p>
                        <div className="flex gap-4 mt-4 text-xs">
                            <span className="bg-white/10 px-2 py-1 rounded">连续学习 15 天</span>
                            <span className="bg-white/10 px-2 py-1 rounded">全校排名 Top 5%</span>
                        </div>
                    </div>
                </Card>

                {/* 学习趋势图简报 */}
                <Card className="flex-1 p-6 bg-primary/5 border-none flex flex-col justify-between">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-sm font-bold flex items-center gap-2">
                            <TrendingUp className="h-4 w-4 text-primary" /> 最近学习趋势
                        </h3>
                    </div>
                    <div className="flex items-end justify-between h-16 gap-1">
                        {[40, 60, 45, 90, 55, 75, 80].map((val, i) => (
                            <div
                                key={i}
                                className="flex-1 bg-primary/30 hover:bg-primary transition-colors rounded-t-sm"
                                style={{ height: `${val}%` }}
                            />
                        ))}
                    </div>
                </Card>
            </div>

            {/* 数据方块区 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {learningStats.map((item) => (
                    <Card key={item.label} className="p-4 text-center hover:bg-muted/50 transition-colors border-border/50">
                        <item.icon className={`h-5 w-5 mx-auto mb-2 ${item.color}`} />
                        <p className="text-2xl font-black text-foreground">{item.value}</p>
                        <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">{item.label}</p>
                    </Card>
                ))}
            </div>

            {/* 进行中的学习进度 */}
            <Card className="p-6 border-border/50 shadow-sm">
                <h3 className="font-bold mb-6 text-foreground flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-primary" /> 当前阅读进度
                </h3>
                <div className="space-y-6">
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="font-medium text-foreground">《深度学习》 · 核心理论</span>
                            <span className="text-blue-500 font-bold">65%</span>
                        </div>
                        {/* 通过 Tailwind 选择器修改进度条颜色，解决 indicatorColor 报错 */}
                        <Progress value={65} className="h-2 bg-slate-100 dark:bg-slate-800 [&_[data-slot=progress-indicator]]:bg-blue-500" />
                    </div>
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="font-medium text-foreground">《百年孤独》 · 经典必读</span>
                            <span className="text-emerald-500 font-bold">45%</span>
                        </div>
                        <Progress value={45} className="h-2 bg-slate-100 dark:bg-slate-800 [&_[data-slot=progress-indicator]]:bg-emerald-500" />
                    </div>
                </div>
            </Card>
        </div>
    );
}