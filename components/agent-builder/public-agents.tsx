"use client";

import React from "react";
import { Bot, Star, Users, Zap, Cloud, Brain, Calendar, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

interface AgentCardProps {
    name: string;
    description: string;
    category: string;
    icon: React.ReactNode;
    rating: number;
    users: number;
    featured?: boolean;
}

const agentCategories = [
    { label: "全部", count: 12 },
    { label: "教育", count: 5 },
    { label: "效率", count: 4 },
    { label: "娱乐", count: 3 },
];

const publicAgents: AgentCardProps[] = [
    {
        name: "天气助手",
        description: "实时天气查询和预报，支持全球城市",
        category: "效率",
        icon: <Cloud className="h-6 w-6" />,
        rating: 4.8,
        users: 1250,
        featured: true,
    },
    {
        name: "学习规划师",
        description: "智能制定学习计划，跟踪学习进度",
        category: "教育",
        icon: <BookOpen className="h-6 w-6" />,
        rating: 4.9,
        users: 890,
        featured: true,
    },
    {
        name: "日程管家",
        description: "智能日程管理和提醒助手",
        category: "效率",
        icon: <Calendar className="h-6 w-6" />,
        rating: 4.7,
        users: 756,
    },
    {
        name: "代码导师",
        description: "编程学习助手，支持多种语言",
        category: "教育",
        icon: <Brain className="h-6 w-6" />,
        rating: 4.6,
        users: 2100,
    },
    {
        name: "健身教练",
        description: "个性化健身计划和饮食建议",
        category: "健康",
        icon: <Zap className="h-6 w-6" />,
        rating: 4.5,
        users: 543,
    },
    {
        name: "旅行规划师",
        description: "智能旅行路线规划和预算管理",
        category: "生活",
        icon: <Bot className="h-6 w-6" />,
        rating: 4.4,
        users: 432,
    },
];

export function PublicAgents() {
    const [selectedCategory, setSelectedCategory] = React.useState("全部");

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-foreground">公共智能体</h1>
                <p className="text-muted-foreground mt-2">
                    探索社区创建的优秀智能体，快速开始使用或作为创作参考
                </p>
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
                {agentCategories.map((category) => (
                    <button
                        key={category.label}
                        onClick={() => setSelectedCategory(category.label)}
                        className={cn(
                            "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200",
                            selectedCategory === category.label
                                ? "bg-primary text-primary-foreground"
                                : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                        )}
                    >
                        <span>{category.label}</span>
                        <span className="text-xs opacity-80">({category.count})</span>
                    </button>
                ))}
            </div>

            {/* Search Bar */}
            <div className="relative">
                <input
                    type="text"
                    placeholder="搜索智能体..."
                    className="w-full rounded-lg border border-input bg-background px-4 py-2.5 pl-10 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
                <Bot className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            </div>

            {/* Agents Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {publicAgents
                    .filter(
                        (agent) =>
                            selectedCategory === "全部" || agent.category === selectedCategory
                    )
                    .map((agent) => (
                        <div
                            key={agent.name}
                            className={cn(
                                "group relative rounded-xl border border-border bg-card p-5 transition-all duration-200 hover:border-primary/50 hover:shadow-lg",
                                agent.featured && "border-primary/30 bg-primary/5"
                            )}
                        >
                            {agent.featured && (
                                <div className="absolute -top-2 left-4 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                                    精选
                                </div>
                            )}

                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                                        <div className="text-primary">{agent.icon}</div>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-foreground">{agent.name}</h3>
                                        <p className="text-sm text-muted-foreground">{agent.category}</p>
                                    </div>
                                </div>
                                <button className="opacity-0 group-hover:opacity-100 transition-opacity rounded-lg border border-border px-3 py-1.5 text-sm hover:bg-secondary">
                                    使用
                                </button>
                            </div>

                            <p className="mt-3 text-sm text-muted-foreground">
                                {agent.description}
                            </p>

                            <div className="mt-4 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-1">
                                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                                        <span className="text-sm font-medium">{agent.rating}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Users className="h-4 w-4 text-blue-500" />
                                        <span className="text-sm text-muted-foreground">{agent.users.toLocaleString()}</span>
                                    </div>
                                </div>
                                <button className="text-sm text-primary hover:underline">
                                    查看详情
                                </button>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}