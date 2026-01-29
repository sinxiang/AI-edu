"use client";

import React from "react";
import { Bot, Users, Globe, Home, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface AgentBuilderSidebarProps {
    activeView: "my-agents" | "public-agents" | "community-agents";
    onViewChange: (view: "my-agents" | "public-agents" | "community-agents") => void;
}

export function AgentBuilderSidebar({ activeView, onViewChange }: AgentBuilderSidebarProps) {
    const menuItems = [
        {
            label: "我的智能体",
            icon: <Bot className="h-4 w-4" />,
            view: "my-agents" as const,
            description: "管理您创建的智能体"
        },
        {
            label: "公共智能体",
            icon: <Globe className="h-4 w-4" />,
            view: "public-agents" as const,
            description: "官方精选的智能体"
        },
        {
            label: "社区智能体",
            icon: <Users className="h-4 w-4" />,
            view: "community-agents" as const,
            description: "社区精选的智能体"
        },
    ];

    return (
        <aside className="w-64 border-r border-border/50 bg-card overflow-y-auto">
            {/* Sidebar Header */}
            <div className="p-6 border-b border-border/50">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <Bot className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold text-foreground">智能体中心</h2>
                        <p className="text-sm text-muted-foreground">探索和管理智能体</p>
                    </div>
                </div>
            </div>

            {/* Menu Items */}
            <nav className="p-4 space-y-1">
                {menuItems.map((item) => (
                    <button
                        key={item.view}
                        onClick={() => onViewChange(item.view)}
                        className={cn(
                            "flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-all duration-200",
                            activeView === item.view
                                ? "bg-primary/10 text-primary"
                                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                        )}
                    >
                        {item.icon}
                        <div className="flex flex-col items-start">
                            <span>{item.label}</span>
                            <span className="text-xs text-muted-foreground">{item.description}</span>
                        </div>
                    </button>
                ))}
            </nav>

            {/* Create New Agent Button */}
            <div className="p-4 border-t border-border/50">
                <button className="w-full flex items-center justify-center gap-2 rounded-lg bg-primary text-primary-foreground px-4 py-3 text-sm font-medium hover:bg-primary/90 transition-colors">
                    <Plus className="h-4 w-4" />
                    <span>创建新智能体</span>
                </button>
            </div>

            {/* Stats Section - Only show for my-agents view */}
            {activeView === "my-agents" && (
                <div className="p-4 mt-4 border-t border-border/50">
                    <div className="rounded-lg bg-secondary/50 p-3">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">已创建</span>
                            <span className="font-semibold text-foreground">4</span>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                            <span className="text-sm text-muted-foreground">运行中</span>
                            <span className="font-semibold text-primary">3</span>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                            <span className="text-sm text-muted-foreground">已嵌入</span>
                            <span className="font-semibold text-green-600">1</span>
                        </div>
                    </div>
                </div>
            )}
        </aside>
    );
}