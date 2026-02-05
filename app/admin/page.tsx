"use client";

import React, { useState } from "react";
import { TopNavbar } from "@/components/top-navbar";
import { Overview } from "@/components/admin/overview";
import { AgentManager } from "@/components/admin/AgentManager";
import { SettingsManager } from "@/components/admin/SettingsManager";
import { UserManager } from "@/components/admin/UserManager"; // 确保引入了新编写的组件
import {
    LayoutDashboard, ShieldCheck, Settings,
    BarChart3, Users, ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState("overview");

    const menuItems = [
        { id: "overview", label: "概览看板", icon: <LayoutDashboard className="h-4 w-4" /> },
        { id: "agents", label: "智能体管理", icon: <ShieldCheck className="h-4 w-4" /> },
        { id: "users", label: "用户管理", icon: <Users className="h-4 w-4" /> },
        { id: "settings", label: "全局配置", icon: <Settings className="h-4 w-4" /> },
    ];

    return (
        <main className="min-h-screen bg-[#FDFDFD]">
            <TopNavbar currentPath="/admin" />

            <div className="flex pt-14 h-[calc(100vh-56px)]">
                {/* 侧边栏 */}
                <aside className="w-64 border-r bg-white flex flex-col shrink-0 overflow-y-auto">
                    <div className="p-6">
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">管理控制台</div>
                        <nav className="space-y-1">
                            {menuItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveTab(item.id)}
                                    className={cn(
                                        "flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-all group",
                                        activeTab === item.id
                                            ? "bg-primary text-white shadow-lg shadow-primary/20"
                                            : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                                    )}
                                >
                                    <div className="flex items-center gap-3">
                                        {item.icon}
                                        {item.label}
                                    </div>
                                    {activeTab === item.id && <ChevronRight className="h-3 w-3" />}
                                </button>
                            ))}
                        </nav>
                    </div>
                    {/* 底部管理员名片 */}
                    <div className="mt-auto p-6 border-t bg-slate-50/50">
                        <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-[10px] text-white font-bold shadow-sm">AD</div>
                            <div>
                                <div className="text-xs font-bold text-slate-900 leading-none">系统管理员</div>
                                <div className="text-[9px] text-slate-500 mt-1 uppercase font-bold tracking-tighter">Root 权限</div>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* 主内容区 */}
                <section className="flex-1 overflow-y-auto p-8">
                    <div className="max-w-6xl mx-auto pb-12">
                        {/* 页面动态页眉 */}
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                                    {menuItems.find(i => i.id === activeTab)?.label}
                                </h1>
                                <p className="text-sm text-slate-500 mt-1 italic">
                                    EduAI 控制中心 &gt; {menuItems.find(i => i.id === activeTab)?.label}
                                </p>
                            </div>
                            <div className="hidden sm:block">
                                <div className="px-4 py-2 bg-white border rounded-full text-xs font-bold shadow-sm flex items-center gap-2">
                                    <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                                    服务器状态: 极佳
                                </div>
                            </div>
                        </div>

                        {/* 内容条件渲染 */}
                        {activeTab === "overview" && <Overview />}
                        {activeTab === "agents" && <AgentManager />}
                        {activeTab === "users" && <UserManager />} {/* 此处已正确链接 */}
                        {activeTab === "settings" && <SettingsManager />}
                    </div>
                </section>
            </div>
        </main>
    );
}