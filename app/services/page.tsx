"use client";

import React, { useState } from "react";
import { TopNavbar } from "@/components/top-navbar";
import {
    Home,
    MessageSquare,
    LayoutGrid,
    Monitor,
    ChevronRight,
    Star,
    Zap,
    Layers,
    ArrowUpRight,
    UserCheck,
    CreditCard,
    GraduationCap,
    Globe,
    ShieldCheck,
    FileText
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

type ServiceTab = 'home' | 'consult' | 'hall' | 'system';

export default function ServicesPage() {
    const [activeTab, setActiveTab] = useState<ServiceTab>('home');

    const menuItems = [
        { id: 'home', label: '首页', icon: Home },
        { id: 'consult', label: '咨询中心', icon: MessageSquare },
        { id: 'hall', label: '服务大厅', icon: LayoutGrid },
        { id: 'system', label: '业务系统', icon: Monitor },
    ];

    return (
        <main className="min-h-screen bg-background flex flex-col overflow-hidden text-foreground">
            <TopNavbar currentPath="/services" />

            <div className="flex flex-1 pt-14 overflow-hidden">
                {/* 侧边栏 */}
                <aside className="w-60 border-r border-border bg-card flex flex-col">
                    <div className="p-6">
                        <h2 className="text-sm font-bold tracking-tight text-foreground/80 uppercase">办事大厅</h2>
                    </div>
                    <nav className="flex-1 px-3 space-y-1">
                        {menuItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id as ServiceTab)}
                                className={cn(
                                    "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all",
                                    activeTab === item.id
                                        ? "bg-primary/10 text-primary font-semibold"
                                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                )}
                            >
                                <item.icon className="h-4 w-4" />
                                {item.label}
                            </button>
                        ))}
                    </nav>
                </aside>

                {/* 内容区 */}
                <div className="flex-1 overflow-hidden relative bg-slate-50/40">
                    <ScrollArea className="h-full">
                        {activeTab === 'home' && <HomeSection onNavigate={setActiveTab} />}
                        {activeTab === 'consult' && <ImageSection src="/咨询中心.jpg" />}
                        {activeTab === 'hall' && <ImageSection src="/服务大厅.jpg" />}
                        {activeTab === 'system' && <ImageSection src="/业务系统.jpg" />}
                    </ScrollArea>
                </div>
            </div>
        </main>
    );
}

// 首页组件
function HomeSection({ onNavigate }: { onNavigate: (tab: ServiceTab) => void }) {
    return (
        <div className="flex flex-col pb-20">
            {/* 宣传装饰部分 */}
            <div className="relative h-[240px] w-full bg-white border-b border-border flex items-center px-12 overflow-hidden">
                <div className="relative z-10 space-y-4 max-w-2xl">
                    <div className="inline-flex items-center gap-2 px-2 py-1 rounded bg-primary/10 text-primary text-[10px] font-bold tracking-widest uppercase">
                        One-Stop Service
                    </div>
                    <h1 className="text-3xl font-bold text-foreground tracking-tight">
                        高效校园办事，<span className="text-primary/80">一切尽在掌握</span>
                    </h1>
                    <p className="text-muted-foreground text-sm leading-relaxed max-w-lg">
                        整合教务、财务、科研等核心业务流程，通过智能化的在线申请与审批，
                        为您减少繁琐的手续，让校园生活回归学术本质。
                    </p>
                </div>

                <div className="absolute right-0 top-0 h-full w-1/3 opacity-[0.03] pointer-events-none">
                    <Layers className="h-full w-full stroke-[1px]" />
                </div>
            </div>

            <div className="px-10 mt-12 space-y-16 max-w-6xl mx-auto w-full">

                {/* 1. 推荐服务 - 保持现状 */}
                <section>
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold text-foreground/80 flex items-center gap-2">
                            <Star className="h-4 w-4 text-primary fill-primary/20" /> 推荐服务
                        </h3>
                        <button onClick={() => onNavigate('hall')} className="text-xs font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 group">
                            查看更多大厅项目 <ChevronRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                        </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            { title: "研究生请假", icon: UserCheck, desc: "覆盖各类因公/私请假流程" },
                            { title: "奖学金申报", icon: FileText, desc: "在线提交申报材料与进度跟踪" },
                            { title: "校园卡补办", icon: CreditCard, desc: "支持在线缴费与线下自助领卡" },
                            { title: "教室借用", icon: Home, desc: "实时查询空闲资源并在线锁定" },
                        ].map((s, i) => (
                            <div key={i} className="group bg-card border border-border/80 rounded-xl p-5 hover:border-primary/40 hover:shadow-sm transition-all cursor-pointer">
                                <div className="h-10 w-10 rounded-lg bg-slate-50 flex items-center justify-center mb-4 group-hover:bg-primary/5 transition-colors">
                                    <s.icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                                </div>
                                <h4 className="font-semibold text-sm">{s.title}</h4>
                                <p className="text-[11px] text-muted-foreground mt-2 leading-snug">{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 2. 业务系统直通车 - 调整：大小大一点 (Card Padding + Icon Size + Grid Cols) */}
                <section>
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold text-foreground/80 flex items-center gap-2">
                            <Zap className="h-4 w-4 text-primary fill-primary/20" /> 业务系统
                        </h3>
                        <button onClick={() => onNavigate('system')} className="text-xs font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 group">
                            所有业务系统 <ChevronRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                        </button>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {[
                            { name: '教务管理', icon: GraduationCap },
                            { name: '财务系统', icon: CreditCard },
                            { name: '资产管理', icon: Layers },
                            { name: '科研门户', icon: Globe },
                            { name: '人事系统', icon: ShieldCheck },
                            { name: '网络中心', icon: Monitor },
                        ].map((sys) => (
                            <div key={sys.name} className="flex items-center gap-4 bg-white border border-border/60 rounded-2xl px-6 py-5 hover:border-primary/50 hover:shadow-sm transition-all cursor-pointer group">
                                <sys.icon className="h-6 w-6 text-muted-foreground/60 group-hover:text-primary transition-colors shrink-0" />
                                <span className="font-semibold text-sm text-foreground/80">{sys.name}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 3. 专题服务 - 调整：组件小一点，颜色统一成新生报到 (Primary) */}
                <section>
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold text-foreground/80 flex items-center gap-2">
                            <Layers className="h-4 w-4 text-primary fill-primary/20" /> 专题服务
                        </h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            { title: '新生报到', desc: '从录取到入住的一站式导航' },
                            { title: '毕业离校', desc: '毕业生手续办理与档案指引' },
                        ].map((topic) => (
                            <div key={topic.title} className={cn(
                                "relative h-28 rounded-2xl border p-6 flex flex-col justify-center cursor-pointer group transition-all",
                                "bg-primary/5 border-primary/20 text-primary" // 统一使用 Primary 颜色
                            )}>
                                <h4 className="text-lg font-bold">{topic.title}专题</h4>
                                <p className="text-[11px] opacity-70 mt-1">{topic.desc}</p>
                                <ArrowUpRight className="absolute right-6 top-6 h-4 w-4 opacity-30 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}

// 统一的图片显示组件
function ImageSection({ src }: { src: string }) {
    return (
        <div className="w-full h-full flex flex-col items-center bg-white">
            <img src={src} alt="" className="w-full h-auto block" />
        </div>
    );
}