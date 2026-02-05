"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { LayoutDashboard, ShieldCheck, Users, BarChart3, Settings } from "lucide-react";

const tabs = [
    { id: "overview", label: "概览看板", icon: <LayoutDashboard className="h-4 w-4" /> },
    { id: "agents", label: "智能体管理", icon: <ShieldCheck className="h-4 w-4" /> },
    { id: "users", label: "用户权限", icon: <Users className="h-4 w-4" /> },
    { id: "analytics", label: "深度分析", icon: <BarChart3 className="h-4 w-4" /> },
    { id: "settings", label: "全局配置", icon: <Settings className="h-4 w-4" /> },
];

export function AdminSidebar({ activeTab, onTabChange }: { activeTab: string, onTabChange: (id: string) => void }) {
    return (
        <aside className="w-64 border-r bg-white flex flex-col h-[calc(100vh-56px)] sticky top-14">
            <nav className="p-4 flex-1 space-y-1">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => onTabChange(tab.id)}
                        className={cn(
                            "flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all",
                            activeTab === tab.id
                                ? "bg-primary text-white shadow-lg shadow-primary/20"
                                : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                        )}
                    >
                        {tab.icon}
                        {tab.label}
                    </button>
                ))}
            </nav>
            <div className="p-4 border-t text-xs text-slate-400 font-medium">
                EDU AI ADMIN v1.2.4
            </div>
        </aside>
    );
}