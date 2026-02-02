// components/agent-builder/public-agents.tsx
"use client";

import React, { useState } from "react";
import {
    Bot, Star, Users, Zap, Cloud, Brain, Calendar, BookOpen,
    MessageSquare, Eye, Heart, ExternalLink, Shield, ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";

const agentCategories = [
    { label: "全部", count: 12 },
    { label: "教育", count: 5 },
    { label: "效率", count: 4 },
    { label: "创意", count: 3 },
    { label: "开发", count: 2 },
    { label: "生活", count: 1 },
];

const publicAgents = [
    {
        name: "天气助手",
        description: "提供精准的全球实时天气数据与穿衣建议，支持多种查询方式。",
        category: "效率",
        icon: <Cloud className="h-5 w-5" />,
        rating: 4.8,
        users: 1250,
        calls: "8.2k",
        featured: true,
        verified: true,
        tags: ["实用工具", "免费", "实时数据"]
    },
    {
        name: "学习规划师",
        description: "基于艾宾浩斯记忆曲线，智能安排您的学习计划。支持多学科、多任务管理。",
        category: "教育",
        icon: <BookOpen className="h-5 w-5" />,
        rating: 4.9,
        users: 890,
        calls: "5.6k",
        featured: true,
        verified: true,
        tags: ["学习", "规划", "效率"]
    },
    {
        name: "日程管家",
        description: "自动化管理您的日程安排，支持多端同步与智能提醒功能。",
        category: "效率",
        icon: <Calendar className="h-5 w-5" />,
        rating: 4.7,
        users: 756,
        calls: "12.4k",
        verified: true,
        tags: ["生产力", "管理", "自动化"]
    },
    {
        name: "代码导师",
        description: "深谙多种主流编程语言，提供代码审查、Bug调试与学习路径规划。",
        category: "开发",
        icon: <Brain className="h-5 w-5" />,
        rating: 4.6,
        users: 2100,
        calls: "15.8k",
        featured: true,
        verified: true,
        tags: ["编程", "开发", "教育"]
    },
    {
        name: "AI绘画助手",
        description: "基于扩散模型的高级绘画工具，支持多种艺术风格转换与创意构图。",
        category: "创意",
        icon: <Bot className="h-5 w-5" />,
        rating: 4.5,
        users: 1560,
        calls: "9.3k",
        verified: true,
        tags: ["艺术", "创作", "AI绘画"]
    },
    {
        name: "英语口语练习",
        description: "实时语音识别与评估，模拟真实对话场景，提供发音纠正建议。",
        category: "教育",
        icon: <MessageSquare className="h-5 w-5" />,
        rating: 4.8,
        users: 1420,
        calls: "7.1k",
        featured: true,
        tags: ["语言学习", "口语", "教育"]
    },
];

interface PublicAgentsProps {
    viewMode: "grid" | "list";
    searchQuery: string;
}

export function PublicAgents({ viewMode, searchQuery }: PublicAgentsProps) {
    const [selectedCategory, setSelectedCategory] = useState("全部");
    const [favorites, setFavorites] = useState<Set<string>>(new Set());

    const toggleFavorite = (agentName: string) => {
        setFavorites(prev => {
            const next = new Set(prev);
            if (next.has(agentName)) {
                next.delete(agentName);
            } else {
                next.add(agentName);
            }
            return next;
        });
    };

    // 过滤智能体
    const filteredAgents = publicAgents.filter(agent => {
        const matchesCategory = selectedCategory === "全部" || agent.category === selectedCategory;
        const matchesSearch = searchQuery === "" ||
            agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            agent.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="space-y-6">
            {/* 类别筛选 */}
            <div className="flex items-center gap-2 overflow-x-auto pb-3 no-scrollbar">
                {agentCategories.map((category) => (
                    <button
                        key={category.label}
                        onClick={() => setSelectedCategory(category.label)}
                        className={cn(
                            "flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all flex-shrink-0",
                            selectedCategory === category.label
                                ? "bg-primary text-primary-foreground shadow-sm"
                                : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80"
                        )}
                    >
                        <span>{category.label}</span>
                        <span className="text-xs opacity-75">({category.count})</span>
                    </button>
                ))}
            </div>

            {/* 显示模式 */}
            {viewMode === "grid" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredAgents.map((agent) => (
                        <div key={agent.name} className="group">
                            <div className="bg-card border border-border rounded-xl hover:border-primary/30 hover:shadow-lg transition-all duration-300 h-full flex flex-col overflow-hidden">
                                {/* 卡片头部 */}
                                <div className="p-5 pb-3">
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex items-center gap-3">
                                            <div className={cn(
                                                "p-3 rounded-xl shrink-0",
                                                agent.verified ? "bg-blue-500/10 text-blue-500" : "bg-primary/10 text-primary"
                                            )}>
                                                {agent.icon}
                                            </div>
                                            <div className="min-w-0">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <h3 className="font-semibold text-lg truncate group-hover:text-primary transition-colors">
                                                        {agent.name}
                                                    </h3>
                                                    <button
                                                        onClick={() => toggleFavorite(agent.name)}
                                                        className="p-1 hover:bg-secondary rounded-md transition-colors flex-shrink-0"
                                                    >
                                                        <Heart
                                                            className={cn(
                                                                "h-4 w-4",
                                                                favorites.has(agent.name)
                                                                    ? "fill-red-500 text-red-500"
                                                                    : "text-muted-foreground hover:text-red-500"
                                                            )}
                                                        />
                                                    </button>
                                                </div>

                                                <div className="flex items-center gap-2">
                                                    <span className="text-xs px-2 py-1 bg-secondary text-muted-foreground rounded-md font-medium">
                                                        {agent.category}
                                                    </span>
                                                    {agent.featured && (
                                                        <span className="text-xs px-2 py-1 bg-amber-500/10 text-amber-600 rounded-md font-medium">
                                                            精选
                                                        </span>
                                                    )}
                                                    {agent.verified && (
                                                        <span className="text-xs px-2 py-1 bg-blue-500/10 text-blue-600 rounded-md font-medium">
                                                            认证
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* 描述 */}
                                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2 min-h-[2.8rem]">
                                        {agent.description}
                                    </p>

                                    {/* 标签 */}
                                    {agent.tags && (
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {agent.tags.map((tag, index) => (
                                                <span
                                                    key={index}
                                                    className="text-xs px-2 py-1 bg-secondary/50 text-muted-foreground rounded"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* 卡片底部 */}
                                <div className="mt-auto border-t border-border/50">
                                    {/* 统计信息 */}
                                    <div className="px-5 py-3">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center gap-4">
                                                <div className="flex items-center gap-1.5">
                                                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                                                    <span className="text-sm font-semibold">{agent.rating}</span>
                                                </div>
                                                <div className="flex items-center gap-1.5 text-muted-foreground">
                                                    <Users className="h-4 w-4" />
                                                    <span className="text-sm">{agent.users.toLocaleString()}</span>
                                                </div>
                                                <div className="flex items-center gap-1.5 text-muted-foreground">
                                                    <Zap className="h-4 w-4" />
                                                    <span className="text-sm">{agent.calls}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* 操作按钮 */}
                                    <div className="px-5 py-3 bg-muted/30 border-t border-border/50">
                                        <div className="flex items-center gap-2">
                                            <button className="flex-1 py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2">
                                                立即运行
                                                <ChevronRight className="h-4 w-4" />
                                            </button>
                                            <button
                                                className="p-2.5 hover:bg-secondary rounded-lg transition-colors"
                                                title="预览详情"
                                            >
                                                <Eye className="h-4 w-4 text-muted-foreground" />
                                            </button>
                                            <button
                                                className="p-2.5 hover:bg-secondary rounded-lg transition-colors"
                                                title="分享"
                                            >
                                                <ExternalLink className="h-4 w-4 text-muted-foreground" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="space-y-4">
                    {filteredAgents.map((agent) => (
                        <div key={agent.name} className="group">
                            <div className="bg-card border border-border rounded-xl hover:border-primary/30 hover:shadow-lg transition-all">
                                <div className="p-5">
                                    <div className="flex items-start gap-4">
                                        {/* 左侧图标和基本信息 */}
                                        <div className="flex items-start gap-4 flex-1 min-w-0">
                                            <div className={cn(
                                                "p-3 rounded-xl shrink-0",
                                                agent.verified ? "bg-blue-500/10 text-blue-500" : "bg-primary/10 text-primary"
                                            )}>
                                                {agent.icon}
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-start justify-between mb-2">
                                                    <div className="min-w-0">
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <h3 className="font-semibold text-lg truncate group-hover:text-primary transition-colors">
                                                                {agent.name}
                                                            </h3>
                                                            <div className="flex items-center gap-2">
                                                                {agent.featured && (
                                                                    <span className="text-xs px-2 py-1 bg-amber-500/10 text-amber-600 rounded-md">
                                                                        精选
                                                                    </span>
                                                                )}
                                                                {agent.verified && (
                                                                    <span className="text-xs px-2 py-1 bg-blue-500/10 text-blue-600 rounded-md">
                                                                        认证
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>

                                                        <span className="text-sm px-2.5 py-1 bg-secondary text-muted-foreground rounded-md font-medium inline-block mb-3">
                                                            {agent.category}
                                                        </span>
                                                    </div>

                                                    <button
                                                        onClick={() => toggleFavorite(agent.name)}
                                                        className="p-2 hover:bg-secondary rounded-lg transition-colors flex-shrink-0"
                                                    >
                                                        <Heart
                                                            className={cn(
                                                                "h-4 w-4",
                                                                favorites.has(agent.name)
                                                                    ? "fill-red-500 text-red-500"
                                                                    : "text-muted-foreground hover:text-red-500"
                                                            )}
                                                        />
                                                    </button>
                                                </div>

                                                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                                                    {agent.description}
                                                </p>

                                                {/* 标签（列表视图） */}
                                                {agent.tags && (
                                                    <div className="flex flex-wrap gap-2 mb-4">
                                                        {agent.tags.map((tag, index) => (
                                                            <span
                                                                key={index}
                                                                className="text-xs px-2 py-1 bg-secondary/50 text-muted-foreground rounded"
                                                            >
                                                                {tag}
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}

                                                {/* 统计信息 */}
                                                <div className="flex items-center gap-6">
                                                    <div className="flex items-center gap-1.5">
                                                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                                                        <span className="text-sm font-semibold">{agent.rating}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1.5 text-muted-foreground">
                                                        <Users className="h-4 w-4" />
                                                        <span className="text-sm">{agent.users.toLocaleString()} 用户</span>
                                                    </div>
                                                    <div className="flex items-center gap-1.5 text-muted-foreground">
                                                        <Zap className="h-4 w-4" />
                                                        <span className="text-sm">{agent.calls} 调用</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* 操作按钮 */}
                                        <div className="flex flex-col gap-2 ml-4">
                                            <button className="px-4 py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg text-sm font-medium transition-colors whitespace-nowrap">
                                                运行智能体
                                            </button>
                                            <div className="flex gap-1">
                                                <button
                                                    className="p-2 hover:bg-secondary rounded-lg transition-colors"
                                                    title="预览详情"
                                                >
                                                    <Eye className="h-4 w-4 text-muted-foreground" />
                                                </button>
                                                <button
                                                    className="p-2 hover:bg-secondary rounded-lg transition-colors"
                                                    title="分享"
                                                >
                                                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* 分页或加载更多 */}
            {filteredAgents.length === 0 ? (
                <div className="text-center py-12">
                    <div className="w-16 h-16 mx-auto bg-secondary rounded-full flex items-center justify-center mb-4">
                        <Bot className="h-8 w-8 text-muted-foreground/50" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">未找到相关智能体</h3>
                    <p className="text-muted-foreground">尝试不同的搜索关键词或筛选条件</p>
                </div>
            ) : (
                <div className="flex justify-center pt-6">
                    <button className="px-6 py-3 border border-border hover:bg-secondary rounded-lg text-sm font-medium transition-colors">
                        加载更多智能体
                    </button>
                </div>
            )}
        </div>
    );
}