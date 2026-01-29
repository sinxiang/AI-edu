"use client";

import React, { useState } from "react";
import { Bot, MessageSquare, Brain, Code, Zap, Star, Settings, Power, Check, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { CreateAgent } from "@/components/agent-builder/create-agent";

interface MyAgentProps {
    id: string;
    name: string;
    description: string;
    icon: React.ReactNode;
    category: string;
    isActive: boolean;
    createdAt: string;
    usageCount: number;
    isEmbedded: boolean;
}

const myAgentsData: MyAgentProps[] = [
    {
        id: "1",
        name: "数学导师助手",
        description: "专注于数学问题解答和概念解释",
        icon: <Brain className="h-6 w-6" />,
        category: "教育",
        isActive: true,
        createdAt: "2024-01-15",
        usageCount: 156,
        isEmbedded: true,
    },
    {
        id: "2",
        name: "代码调试助手",
        description: "帮助识别和修复编程代码问题",
        icon: <Code className="h-6 w-6" />,
        category: "编程",
        isActive: true,
        createdAt: "2024-01-20",
        usageCount: 89,
        isEmbedded: false,
    },
];

export function MyAgents() {
    const [activeTab, setActiveTab] = useState<"manage" | "create">("manage");
    const [embeddedAgentId, setEmbeddedAgentId] = useState<string>("1");

    const handleEmbedAgent = (agentId: string) => {
        setEmbeddedAgentId(agentId);
        const agent = myAgentsData.find(a => a.id === agentId);
        alert(`"${agent?.name}" 已成功嵌入主页面AI对话功能！`);
    };

    return (
        <div className="space-y-6">
            {/* Secondary Navigation */}
            <div className="sticky top-0 z-40 flex h-14 items-center border-b border-border/50 bg-background/80 px-6 backdrop-blur-md -mx-6 -mt-6 mb-6">
                <div className="flex items-center gap-6">
                    <button
                        onClick={() => setActiveTab("manage")}
                        className={`flex items-center gap-2 px-3 py-2 text-sm font-medium transition-all duration-200 rounded-lg ${activeTab === "manage"
                            ? "bg-primary/20 text-primary"
                            : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                            }`}
                    >
                        <Bot className="h-4 w-4" />
                        <span>管理我的智能体</span>
                    </button>
                    <button
                        onClick={() => setActiveTab("create")}
                        className={`flex items-center gap-2 px-3 py-2 text-sm font-medium transition-all duration-200 rounded-lg ${activeTab === "create"
                            ? "bg-primary/20 text-primary"
                            : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                            }`}
                    >
                        <Plus className="h-4 w-4" />
                        <span>创建智能体</span>
                    </button>
                </div>
            </div>

            {/* Content based on active tab */}
            {activeTab === "manage" ? (
                <>
                    {/* Header */}
                    <div>
                        <h1 className="text-2xl font-bold text-foreground">我创建的智能体</h1>
                        <p className="text-muted-foreground mt-2">
                            管理您创建的智能体，可将其嵌入到主页面的AI对话功能中
                        </p>
                    </div>

                    {/* Stats Overview */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="rounded-xl border border-border bg-card p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">智能体总数</p>
                                    <p className="text-2xl font-bold text-foreground mt-1">{myAgentsData.length}</p>
                                </div>
                                <Bot className="h-8 w-8 text-primary" />
                            </div>
                        </div>
                        <div className="rounded-xl border border-border bg-card p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">运行中</p>
                                    <p className="text-2xl font-bold text-green-600 mt-1">
                                        {myAgentsData.filter(a => a.isActive).length}
                                    </p>
                                </div>
                                <Power className="h-8 w-8 text-green-600" />
                            </div>
                        </div>
                        <div className="rounded-xl border border-border bg-card p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">已嵌入</p>
                                    <p className="text-2xl font-bold text-primary mt-1">
                                        {myAgentsData.filter(a => a.isEmbedded).length}
                                    </p>
                                </div>
                                <Check className="h-8 w-8 text-primary" />
                            </div>
                        </div>
                    </div>

                    {/* Agents List */}
                    <div className="space-y-4">
                        {myAgentsData.map((agent) => (
                            <div
                                key={agent.id}
                                className={cn(
                                    "rounded-xl border border-border bg-card p-5 transition-all duration-200 hover:border-primary/50",
                                    agent.isEmbedded && "border-primary/50 bg-primary/5"
                                )}
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex items-start gap-4">
                                        <div className={cn(
                                            "flex h-14 w-14 items-center justify-center rounded-xl",
                                            agent.isEmbedded
                                                ? "bg-primary/20"
                                                : "bg-secondary"
                                        )}>
                                            <div className={cn(
                                                agent.isEmbedded ? "text-primary" : "text-muted-foreground"
                                            )}>
                                                {agent.icon}
                                            </div>
                                        </div>

                                        <div className="space-y-1">
                                            <div className="flex items-center gap-3">
                                                <h3 className="text-lg font-semibold text-foreground">
                                                    {agent.name}
                                                </h3>
                                                <div className="flex items-center gap-2">
                                                    {agent.isActive ? (
                                                        <span className="inline-flex items-center gap-1 rounded-full bg-green-500/20 px-2 py-1 text-xs font-medium text-green-600">
                                                            <div className="h-1.5 w-1.5 rounded-full bg-green-600" />
                                                            运行中
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center gap-1 rounded-full bg-gray-500/20 px-2 py-1 text-xs font-medium text-gray-600">
                                                            <div className="h-1.5 w-1.5 rounded-full bg-gray-600" />
                                                            已停止
                                                        </span>
                                                    )}

                                                    {agent.isEmbedded && (
                                                        <span className="inline-flex items-center gap-1 rounded-full bg-primary/20 px-2 py-1 text-xs font-medium text-primary">
                                                            <Check className="h-3 w-3" />
                                                            已嵌入主页
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            <p className="text-sm text-muted-foreground">{agent.description}</p>

                                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                                <span>分类: {agent.category}</span>
                                                <span>创建于: {agent.createdAt}</span>
                                                <span>使用次数: {agent.usageCount}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col items-end gap-2">
                                        <button
                                            onClick={() => handleEmbedAgent(agent.id)}
                                            disabled={agent.isEmbedded}
                                            className={cn(
                                                "flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                                                agent.isEmbedded
                                                    ? "bg-primary/20 text-primary cursor-not-allowed"
                                                    : "bg-primary text-primary-foreground hover:bg-primary/90"
                                            )}
                                        >
                                            {agent.isEmbedded ? (
                                                <>
                                                    <Check className="h-4 w-4" />
                                                    已嵌入
                                                </>
                                            ) : (
                                                <>
                                                    <Bot className="h-4 w-4" />
                                                    嵌入主页
                                                </>
                                            )}
                                        </button>

                                        <div className="flex items-center gap-2">
                                            <button className="flex items-center gap-1 rounded-lg border border-input bg-background px-3 py-1.5 text-xs font-medium hover:bg-secondary">
                                                <Settings className="h-3 w-3" />
                                                设置
                                            </button>
                                            <button className="flex items-center gap-1 rounded-lg border border-input bg-background px-3 py-1.5 text-xs font-medium hover:bg-secondary">
                                                <Power className="h-3 w-3" />
                                                {agent.isActive ? "停止" : "启动"}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Help Text */}
                    <div className="rounded-lg bg-secondary/30 p-4 text-sm text-muted-foreground">
                        <p className="font-medium text-foreground mb-1">嵌入功能说明：</p>
                        <ul className="space-y-1">
                            <li>• 点击"嵌入主页"按钮，该智能体将替换主页面的默认AI助手</li>
                            <li>• 嵌入后，主页面AI对话将具备该智能体的专业能力</li>
                        </ul>
                    </div>
                </>
            ) : (
                <CreateAgent />
            )}
        </div>
    );
}