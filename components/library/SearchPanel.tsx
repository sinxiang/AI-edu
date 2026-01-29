// components/library/SearchPanel.tsx
import { Sparkles, TrendingUp, Star, History } from "lucide-react";

interface SearchHistoryItem {
    id: string;
    query: string;
    timestamp: string;
    resultCount: number;
}

interface SearchPanelProps {
    searchHistory: SearchHistoryItem[];
    onSearchClick: (query: string) => void;
    onSetAiInput: (text: string) => void;
}

export function SearchPanel({ searchHistory, onSearchClick, onSetAiInput }: SearchPanelProps) {
    return (
        <div className="space-y-6">
            <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">快速开始</h3>
                <div className="space-y-4">
                    <button
                        onClick={() => onSetAiInput("帮我推荐几本关于人工智能的入门书籍")}
                        className="w-full text-left p-4 rounded-xl border border-border bg-card hover:bg-accent/50 transition-all duration-300 hover:shadow-md group"
                    >
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
                                <Sparkles className="h-4 w-4" />
                            </div>
                            <span className="font-medium">个性化推荐</span>
                        </div>
                        <p className="text-sm text-muted-foreground">根据您的阅读历史推荐</p>
                    </button>
                    <button
                        onClick={() => onSetAiInput("最近有什么热门的小说推荐吗？")}
                        className="w-full text-left p-4 rounded-xl border border-border bg-card hover:bg-accent/50 transition-all duration-300 hover:shadow-md group"
                    >
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500">
                                <TrendingUp className="h-4 w-4" />
                            </div>
                            <span className="font-medium">热门趋势</span>
                        </div>
                        <p className="text-sm text-muted-foreground">近期热门书籍榜单</p>
                    </button>
                    <button
                        onClick={() => onSetAiInput("推荐一些文学经典必读书籍")}
                        className="w-full text-left p-4 rounded-xl border border-border bg-card hover:bg-accent/50 transition-all duration-300 hover:shadow-md group"
                    >
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-500">
                                <Star className="h-4 w-4" />
                            </div>
                            <span className="font-medium">经典必读</span>
                        </div>
                        <p className="text-sm text-muted-foreground">各领域经典作品</p>
                    </button>
                </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-foreground">最近搜索</h3>
                    <button className="text-sm text-primary hover:text-primary/80 transition-colors">
                        查看全部
                    </button>
                </div>
                <div className="space-y-3">
                    {searchHistory.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => onSearchClick(item.query)}
                            className="w-full text-left p-2 rounded-lg hover:bg-accent/50 transition-colors text-sm"
                        >
                            <div className="flex items-center justify-between mb-1">
                                <span className="font-medium text-foreground truncate">
                                    {item.query}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                    {item.resultCount}结果
                                </span>
                            </div>
                            <div className="text-xs text-muted-foreground">{item.timestamp}</div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}