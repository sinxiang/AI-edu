"use client";

import React from "react";
import { Users, Heart, MessageSquare, Zap, Brain, BookOpen, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface CommunityAgentProps {
    name: string;
    creator: string;
    description: string;
    category: string;
    likes: number;
    comments: number;
    isTrending: boolean;
}

const communityAgents: CommunityAgentProps[] = [
    {
        name: "英语口语练习助手",
        creator: "英语老师李华",
        description: "帮助练习英语口语，纠正发音和语法",
        category: "语言学习",
        likes: 245,
        comments: 89,
        isTrending: true,
    },
    {
        name: "个人财务管理助手",
        creator: "财经达人小王",
        description: "智能记账和财务规划建议",
        category: "生活工具",
        likes: 189,
        comments: 45,
        isTrending: false,
    },
    {
        name: "健身计划生成器",
        creator: "健身教练Mike",
        description: "根据身体状况制定个性化健身计划",
        category: "健康生活",
        likes: 312,
        comments: 102,
        isTrending: true,
    },
];

export function CommunityAgents() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-foreground">社区智能体</h1>
                <p className="text-muted-foreground mt-2">
                    探索其他用户创建的智能体，学习和交流经验
                </p>
            </div>

            {/* Community Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="rounded-xl border border-border bg-card p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-muted-foreground">社区智能体</p>
                            <p className="text-2xl font-bold text-foreground mt-1">156</p>
                        </div>
                        <Users className="h-8 w-8 text-blue-500" />
                    </div>
                </div>
                <div className="rounded-xl border border-border bg-card p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-muted-foreground">今日新增</p>
                            <p className="text-2xl font-bold text-green-600 mt-1">8</p>
                        </div>
                        <Zap className="h-8 w-8 text-green-600" />
                    </div>
                </div>
                <div className="rounded-xl border border-border bg-card p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-muted-foreground">总点赞数</p>
                            <p className="text-2xl font-bold text-pink-600 mt-1">2,345</p>
                        </div>
                        <Heart className="h-8 w-8 text-pink-600" />
                    </div>
                </div>
                <div className="rounded-xl border border-border bg-card p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-muted-foreground">热门分类</p>
                            <p className="text-2xl font-bold text-orange-600 mt-1">教育</p>
                        </div>
                        <TrendingUp className="h-8 w-8 text-orange-600" />
                    </div>
                </div>
            </div>

            {/* Community Agents List */}
            <div className="space-y-4">
                {communityAgents.map((agent, index) => (
                    <div
                        key={index}
                        className="rounded-xl border border-border bg-card p-5 transition-all duration-200 hover:border-primary/50"
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <h3 className="text-lg font-semibold text-foreground">{agent.name}</h3>
                                    {agent.isTrending && (
                                        <span className="inline-flex items-center gap-1 rounded-full bg-orange-500/20 px-2 py-1 text-xs font-medium text-orange-600">
                                            <TrendingUp className="h-3 w-3" />
                                            热门
                                        </span>
                                    )}
                                </div>

                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-xs text-muted-foreground">创作者: {agent.creator}</span>
                                    <span className="text-xs px-2 py-1 rounded-full bg-secondary text-muted-foreground">
                                        {agent.category}
                                    </span>
                                </div>

                                <p className="text-sm text-muted-foreground mb-3">{agent.description}</p>

                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-1">
                                        <Heart className="h-4 w-4 text-pink-500" />
                                        <span className="text-sm text-muted-foreground">{agent.likes}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <MessageSquare className="h-4 w-4 text-blue-500" />
                                        <span className="text-sm text-muted-foreground">{agent.comments}</span>
                                    </div>
                                    <button className="ml-auto text-sm text-primary hover:underline">
                                        查看详情
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}