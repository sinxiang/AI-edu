"use client";

import { useState } from "react";
import { TopNavbar } from "@/components/top-navbar";
import { PublicAgents } from "@/components/agent-builder/public-agents";
import {
    ChevronDown,
    ChevronRight,
    Heart,
    Bot,
    Database,
    Users,
    Sparkles,
    Flame,
    TrendingUp,
    Plus,
    Zap,
    Clock,
    Grid,
    List,
    Filter,
    Search,
    BarChart3,
    Shield,
    Crown,
    Rocket,
    Target,
    HardDrive,
    Trash2,
    Download,
    FolderPlus,
    Upload,
    FileText,
    MoreVertical,
    Flame as Star
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// 定义视图类型，增加 personal-library
type ViewType = "favorites" | "agents" | "knowledge" | "personal-library" | "my-team" | "hot-agents";

export default function AgentBuilderPage() {
    const [activeView, setActiveView] = useState<ViewType>("hot-agents");
    const [openSections, setOpenSections] = useState<string[]>(["workbench", "team"]);
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [sortBy, setSortBy] = useState<string>("hot");
    const [searchQuery, setSearchQuery] = useState("");

    // 切换侧边栏折叠状态
    const toggleSection = (section: string) => {
        setOpenSections(prev =>
            prev.includes(section) ? prev.filter(s => s !== section) : [...prev, section]
        );
    };

    // 排序选项
    const sortOptions = [
        { id: "hot", label: "最热", icon: <Flame className="h-4 w-4" /> },
        { id: "new", label: "最新", icon: <Clock className="h-4 w-4" /> },
        { id: "popular", label: "最受欢迎", icon: <TrendingUp className="h-4 w-4" /> },
        { id: "rating", label: "最高评分", icon: <Star className="h-4 w-4" /> },
    ];

    // 热门话题标签
    const hotTopics = [
        { name: "AI绘画", count: 245 },
        { name: "代码编程", count: 189 },
        { name: "学习助手", count: 167 },
        { name: "效率工具", count: 142 },
        { name: "数据分析", count: 98 },
    ];

    // 个人知识库内部页面组件
    const PersonalLibraryContent = () => {
        const [files] = useState([
            { id: "1", name: "2026年深度学习综述.pdf", size: "2.4 MB", date: "2026-02-01", type: "PDF" },
            { id: "2", name: "毕业论文初稿_v1.docx", size: "85 KB", date: "2026-01-28", type: "DOCX" },
            { id: "3", name: "实验数据集A.csv", size: "12.1 MB", date: "2026-02-03", type: "CSV" },
        ]);

        return (
            <div className="h-full flex flex-col bg-background p-8 overflow-hidden animate-in fade-in duration-500">
                <div className="flex items-end justify-between mb-8">
                    <div className="space-y-1">
                        <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                            <HardDrive className="h-6 w-6 text-primary" /> 个人知识库
                        </h1>
                        <p className="text-sm text-muted-foreground">存储您的私有资料，用于定制化训练或背景增强。</p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="rounded-full px-4"><FolderPlus className="h-4 w-4 mr-2" /> 新建文件夹</Button>
                        <Button size="sm" className="rounded-full px-4 shadow-md bg-primary hover:bg-primary/90 text-white"><Upload className="h-4 w-4 mr-2" /> 上传资料</Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-card border rounded-2xl p-4 flex items-center gap-4">
                        <div className="h-10 w-10 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center font-bold text-lg">12</div>
                        <div><p className="text-xs text-muted-foreground uppercase font-bold">已上传文档</p></div>
                    </div>
                    <div className="bg-card border rounded-2xl p-4 flex items-center gap-4">
                        <div className="h-10 w-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold text-lg">1.2G</div>
                        <div><p className="text-xs text-muted-foreground uppercase font-bold">已用空间</p></div>
                    </div>
                    <div className="relative group md:col-span-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary" />
                        <input
                            placeholder="搜索我的文件..."
                            className="w-full h-full min-h-[50px] bg-card border rounded-2xl pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                        />
                    </div>
                </div>

                <div className="flex-1 bg-card border rounded-2xl overflow-hidden flex flex-col shadow-sm">
                    <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-muted/30 border-b text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                        <div className="col-span-6">文件名称</div>
                        <div className="col-span-2">大小</div>
                        <div className="col-span-2">上传日期</div>
                        <div className="col-span-2 text-right">操作</div>
                    </div>
                    <div className="flex-1 overflow-y-auto divide-y divide-border/50">
                        {files.map((file) => (
                            <div key={file.id} className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-muted/20 transition-all group">
                                <div className="col-span-6 flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-lg bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                        <FileText className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-foreground leading-none mb-1.5">{file.name}</p>
                                        <Badge variant="secondary" className="text-[9px] h-3.5 px-1.5 font-mono">{file.type}</Badge>
                                    </div>
                                </div>
                                <div className="col-span-2 text-xs text-muted-foreground font-mono">{file.size}</div>
                                <div className="col-span-2 text-xs text-muted-foreground font-mono">{file.date}</div>
                                <div className="col-span-2 flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-all">
                                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-primary"><Download className="h-4 w-4" /></Button>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-destructive"><Trash2 className="h-4 w-4" /></Button>
                                    <Button variant="ghost" size="icon" className="h-8 w-8"><MoreVertical className="h-4 w-4" /></Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    // 渲染主内容区域
    const renderContent = () => {
        if (activeView === "hot-agents") {
            return (
                <div className="flex-1 overflow-y-auto bg-gradient-to-b from-background via-background to-muted/10 pb-10">
                    <div className="max-w-[1600px] mx-auto p-8 space-y-10">
                        {/* 顶部展示 Banner */}
                        <section className="relative h-48 rounded-2xl bg-gradient-to-r from-primary via-purple-500 to-pink-500 overflow-hidden text-white p-10 flex items-center justify-between shadow-lg">
                            <div className="relative z-10 max-w-2xl">
                                <div className="flex items-center gap-3 mb-4">
                                    <Crown className="h-8 w-8 text-yellow-300" />
                                    <h2 className="text-3xl font-bold tracking-tight">AI 智能体广场</h2>
                                </div>
                                <p className="text-lg text-white/90 mb-6">探索、使用并分享全球开发者创作的顶尖 AI 工具</p>
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl">
                                        <Shield className="h-4 w-4" />
                                        <span className="text-sm">安全可靠</span>
                                    </div>
                                    <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl">
                                        <Zap className="h-4 w-4" />
                                        <span className="text-sm">高效实用</span>
                                    </div>
                                    <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl">
                                        <Target className="h-4 w-4" />
                                        <span className="text-sm">持续更新</span>
                                    </div>
                                </div>
                            </div>
                            <div className="relative z-10 hidden lg:block">
                                <Rocket className="h-40 w-40 text-white/20 rotate-12" />
                            </div>
                        </section>

                        {/* 数据统计 */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <div className="bg-card border border-border rounded-2xl p-6">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                                        <Bot className="h-5 w-5" />
                                    </div>
                                    <span className="text-sm text-muted-foreground">智能体总数</span>
                                </div>
                                <div className="text-2xl font-bold">12,847</div>
                                <div className="text-xs text-green-600 mt-1">+12% 本月新增</div>
                            </div>
                            <div className="bg-card border border-border rounded-2xl p-6">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
                                        <Users className="h-5 w-5" />
                                    </div>
                                    <span className="text-sm text-muted-foreground">活跃开发者</span>
                                </div>
                                <div className="text-2xl font-bold">8,542</div>
                                <div className="text-xs text-green-600 mt-1">+8% 本月新增</div>
                            </div>
                            <div className="bg-card border border-border rounded-2xl p-6">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="p-2 rounded-lg bg-orange-500/10 text-orange-500">
                                        <Zap className="h-5 w-5" />
                                    </div>
                                    <span className="text-sm text-muted-foreground">总调用量</span>
                                </div>
                                <div className="text-2xl font-bold">1.2M</div>
                                <div className="text-xs text-green-600 mt-1">+25% 本周增长</div>
                            </div>
                            <div className="bg-card border border-border rounded-2xl p-6">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="p-2 rounded-lg bg-purple-500/10 text-purple-500">
                                        <BarChart3 className="h-5 w-5" />
                                    </div>
                                    <span className="text-sm text-muted-foreground">优质智能体</span>
                                </div>
                                <div className="text-2xl font-bold">384</div>
                                <div className="text-xs text-green-600 mt-1">官方认证</div>
                            </div>
                        </div>

                        <div className="flex gap-8">
                            <div className="flex-1 min-w-0 space-y-8">
                                <div className="bg-card border border-border rounded-2xl p-6 space-y-6">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                        <div className="relative w-full md:w-96">
                                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                            <input
                                                type="text"
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                placeholder="搜索 AI 智能体..."
                                                className="w-full rounded-xl border border-border bg-background px-4 py-3 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                                            />
                                        </div>

                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center gap-2">
                                                <Filter className="h-4 w-4 text-muted-foreground" />
                                                <div className="flex items-center gap-1">
                                                    {sortOptions.map((option) => (
                                                        <button
                                                            key={option.id}
                                                            onClick={() => setSortBy(option.id)}
                                                            className={cn(
                                                                "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-all",
                                                                sortBy === option.id
                                                                    ? "bg-primary/10 text-primary font-medium"
                                                                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                                                            )}
                                                        >
                                                            {option.icon}
                                                            <span>{option.label}</span>
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => setViewMode("grid")}
                                                    className={cn(
                                                        "p-2 rounded-lg transition-colors",
                                                        viewMode === "grid" ? "bg-primary/10 text-primary" : "hover:bg-secondary"
                                                    )}
                                                >
                                                    <Grid className="h-4 w-4" />
                                                </button>
                                                <button
                                                    onClick={() => setViewMode("list")}
                                                    className={cn(
                                                        "p-2 rounded-lg transition-colors",
                                                        viewMode === "list" ? "bg-primary/10 text-primary" : "hover:bg-secondary"
                                                    )}
                                                >
                                                    <List className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex items-center gap-2 mb-3">
                                            <Flame className="h-4 w-4 text-orange-500" />
                                            <span className="text-sm font-medium">热门话题</span>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {hotTopics.map((topic) => (
                                                <button
                                                    key={topic.name}
                                                    className="flex items-center gap-2 px-4 py-2 bg-secondary hover:bg-secondary/80 text-foreground rounded-xl text-sm transition-colors group"
                                                >
                                                    <span>{topic.name}</span>
                                                    <span className="text-xs bg-primary/10 text-primary px-1.5 py-0.5 rounded-full">
                                                        {topic.count}
                                                    </span>
                                                </button>
                                            ))}
                                            <button className="px-4 py-2 text-primary hover:text-primary/80 text-sm font-medium">
                                                更多话题 →
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="text-xl font-bold">推荐智能体</h3>
                                        <div className="flex items-center gap-4">
                                            <button className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl text-sm font-medium">
                                                <Plus className="h-4 w-4" />
                                                提交智能体
                                            </button>
                                        </div>
                                    </div>
                                    <PublicAgents viewMode={viewMode} searchQuery={searchQuery} />
                                </div>
                            </div>

                            <aside className="w-80 shrink-0 space-y-6 hidden xl:block">
                                <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex items-center gap-2">
                                            <Flame className="h-5 w-5 text-orange-500" />
                                            <h3 className="font-bold text-lg">热度排行榜</h3>
                                        </div>
                                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                                    </div>
                                    <div className="space-y-5">
                                        {[
                                            { rank: 1, name: "代码导师", score: "9,850", color: "bg-amber-500" },
                                            { rank: 2, name: "英语口语练习助手", score: "8,920", color: "bg-slate-400" },
                                            { rank: 3, name: "学习规划师", score: "7,540", color: "bg-orange-400" },
                                            { rank: 4, name: "日程管家", score: "6,210", color: "bg-secondary" },
                                            { rank: 5, name: "健身教练", score: "5,800", color: "bg-secondary" }
                                        ].map((item) => (
                                            <div key={item.rank} className="flex items-center gap-4 group cursor-pointer">
                                                <div className={cn(
                                                    "w-6 h-6 shrink-0 flex items-center justify-center rounded-full text-[10px] font-bold text-white",
                                                    item.rank > 3 ? "bg-muted text-muted-foreground" : item.color
                                                )}>
                                                    {item.rank}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium truncate group-hover:text-primary transition-colors">{item.name}</p>
                                                    <p className="text-[10px] text-muted-foreground uppercase">Popularity {item.score}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="rounded-2xl border border-dashed border-primary/40 bg-primary/5 p-6">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="p-2 rounded-lg bg-primary/10 text-primary">
                                            <Rocket className="h-5 w-5" />
                                        </div>
                                        <h3 className="font-bold">快速开始</h3>
                                    </div>
                                    <p className="text-sm text-muted-foreground mb-4">创建你的第一个AI智能体，仅需3分钟</p>
                                    <button className="w-full py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-medium transition-colors text-white">
                                        立即创建
                                    </button>
                                </div>
                            </aside>
                        </div>
                    </div>
                </div>
            );
        }

        // 个人知识库逻辑
        if (activeView === "personal-library") {
            return <PersonalLibraryContent />;
        }

        // 其他视图
        const imageMap: Record<string, string> = {
            "favorites": "收藏夹.jpg",
            "agents": "智能体.jpg",
            "knowledge": "知识库.jpg",
            "my-team": "我的团队.jpg"
        };

        return (
            <div className="flex-1 overflow-y-auto bg-background">
                <div className="w-full">
                    <img
                        src={`/${imageMap[activeView]}`}
                        alt={activeView}
                        className="w-full h-auto block"
                    />
                </div>
            </div>
        );
    };

    return (
        <div className="flex h-screen flex-col bg-background overflow-hidden">
            <TopNavbar currentPath="/agent-builder" />

            <div className="flex-1 flex pt-14 min-h-0 overflow-hidden">
                {/* 左侧侧边栏 */}
                <div className="w-64 border-r border-border bg-card flex flex-col flex-shrink-0">
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 text-left">

                        {/* 第一部分：智能体广场 */}
                        <div className="pb-2 border-b border-border/50">
                            <button
                                onClick={() => setActiveView("hot-agents")}
                                className={cn(
                                    "flex items-center gap-2 w-full px-2 py-2.5 rounded-md text-sm font-bold transition-all",
                                    activeView === "hot-agents"
                                        ? "bg-primary/10 text-primary"
                                        : "text-foreground/80 hover:bg-secondary"
                                )}
                            >
                                <Sparkles className={cn("h-4 w-4", activeView === "hot-agents" ? "text-primary" : "text-amber-500")} />
                                <span>智能体广场</span>
                            </button>
                        </div>

                        {/* 第二部分：个人AI工作台 */}
                        <div className="space-y-1">
                            <button
                                onClick={() => toggleSection("workbench")}
                                className="flex items-center justify-between w-full px-2 py-1.5 text-sm font-bold text-foreground/80 hover:bg-secondary/50 rounded-md transition-colors"
                            >
                                <span>个人AI工作台</span>
                                {openSections.includes("workbench") ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                            </button>

                            {openSections.includes("workbench") && (
                                <div className="ml-2 space-y-1 border-l border-border/50 pl-2">
                                    <SidebarItem
                                        icon={<Heart className="h-4 w-4" />}
                                        label="收藏夹"
                                        active={activeView === "favorites"}
                                        onClick={() => setActiveView("favorites")}
                                    />
                                    <SidebarItem
                                        icon={<Bot className="h-4 w-4" />}
                                        label="智能体"
                                        active={activeView === "agents"}
                                        onClick={() => setActiveView("agents")}
                                    />
                                    {/* 公共知识库 - 更名 */}
                                    <SidebarItem
                                        icon={<Database className="h-4 w-4" />}
                                        label="公共知识库"
                                        active={activeView === "knowledge"}
                                        onClick={() => setActiveView("knowledge")}
                                    />
                                    {/* 个人知识库 - 新增 */}
                                    <SidebarItem
                                        icon={<HardDrive className="h-4 w-4" />}
                                        label="个人知识库"
                                        active={activeView === "personal-library"}
                                        onClick={() => setActiveView("personal-library")}
                                    />
                                </div>
                            )}
                        </div>

                        {/* 第三部分：共建团队 */}
                        <div className="space-y-1">
                            <button
                                onClick={() => toggleSection("team")}
                                className="flex items-center justify-between w-full px-2 py-1.5 text-sm font-bold text-foreground/80 hover:bg-secondary/50 rounded-md transition-colors"
                            >
                                <span>共建团队</span>
                                {openSections.includes("team") ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                            </button>

                            {openSections.includes("team") && (
                                <div className="ml-2 space-y-1 border-l border-border/50 pl-2">
                                    <SidebarItem
                                        icon={<Users className="h-4 w-4" />}
                                        label="我的团队"
                                        active={activeView === "my-team"}
                                        onClick={() => setActiveView("my-team")}
                                    />
                                </div>
                            )}
                        </div>

                    </div>
                </div>

                {/* 右侧主内容区 */}
                <div className="flex-1 flex flex-col min-0 bg-muted/5">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
}

// 侧边栏按钮子项
function SidebarItem({
    icon,
    label,
    active,
    onClick
}: {
    icon: React.ReactNode;
    label: string;
    active: boolean;
    onClick: () => void;
}) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "flex items-center gap-3 w-full px-3 py-2 rounded-md text-sm transition-all duration-200",
                active
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            )}
        >
            <span className={cn(active ? "text-primary" : "text-muted-foreground/70")}>{icon}</span>
            <span>{label}</span>
        </button>
    );
}