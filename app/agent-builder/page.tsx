// /app/agent-builder/page.tsx
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
    Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";

// 定义视图类型
type ViewType = "favorites" | "agents" | "knowledge" | "my-team" | "hot-agents";

export default function AgentBuilderPage() {
    const [activeView, setActiveView] = useState<ViewType>("hot-agents");
    const [openSections, setOpenSections] = useState<string[]>(["workbench", "team"]);

    // 切换侧边栏折叠状态
    const toggleSection = (section: string) => {
        setOpenSections(prev =>
            prev.includes(section) ? prev.filter(s => s !== section) : [...prev, section]
        );
    };

    // 渲染主内容区域
    const renderContent = () => {
        // 1. 热门智能体视图：保持原有组件，并增加边距解决拥挤问题
        if (activeView === "hot-agents") {
            return (
                <div className="flex-1 overflow-y-auto p-8">
                    <div className="max-w-[1400px] mx-auto">
                        <PublicAgents />
                    </div>
                </div>
            );
        }

        // 2. 图片视图：横向填满，高度超出则滚动
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
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">

                        {/* 第一部分：个人AI工作台 */}
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
                                    <SidebarItem
                                        icon={<Database className="h-4 w-4" />}
                                        label="知识库"
                                        active={activeView === "knowledge"}
                                        onClick={() => setActiveView("knowledge")}
                                    />
                                </div>
                            )}
                        </div>

                        {/* 第二部分：共建团队 */}
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

                        {/* 第三部分：热门智能体 */}
                        <div className="pt-2">
                            <button
                                onClick={() => setActiveView("hot-agents")}
                                className={cn(
                                    "flex items-center gap-2 w-full px-2 py-2 rounded-md text-sm font-bold transition-all",
                                    activeView === "hot-agents"
                                        ? "bg-primary/10 text-primary"
                                        : "text-foreground/80 hover:bg-secondary"
                                )}
                            >
                                <Sparkles className={cn("h-4 w-4", activeView === "hot-agents" ? "text-primary" : "text-amber-500")} />
                                <span>热门智能体</span>
                            </button>
                        </div>

                    </div>
                </div>

                {/* 右侧主内容区 */}
                <div className="flex-1 flex flex-col min-h-0 bg-muted/5">
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