"use client";

import React, { useState } from "react";
import { TopNavbar } from "@/components/top-navbar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, Send, Globe, Zap, Sparkles, BookOpen, Calculator, Newspaper } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AISearchPage() {
    const [searchValue, setSearchValue] = useState("");

    // 搜索建议快捷标签
    const suggestions = [
        { icon: <Globe className="w-3.5 h-3.5" />, label: "全网资讯" },
        { icon: <BookOpen className="h-3.5 w-3.5" />, label: "学术论文" },
        { icon: <Calculator className="h-3.5 w-3.5" />, label: "数据分析" },
        { icon: <Newspaper className="h-3.5 w-3.5" />, label: "今日新闻" },
    ];

    return (
        <main className="min-h-screen bg-[#fafafa] dark:bg-background flex flex-col overflow-hidden">
            {/* 顶部导航栏 */}
            <TopNavbar currentPath="/ai-search" />

            {/* 页面内容区 */}
            <div className="flex-1 pt-14 h-full">
                <ScrollArea className="h-[calc(100vh-56px)] w-full">
                    <div className="max-w-4xl mx-auto px-6 pt-32 pb-20 flex flex-col items-center">

                        {/* 1. 标题区域 */}
                        <div className="flex flex-col items-center mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 mb-4">
                                <Search className="h-6 w-6 text-primary" />
                            </div>
                            <h1 className="text-4xl font-bold tracking-tight text-foreground">
                                AI <span className="text-primary">智搜</span>
                            </h1>
                            <p className="text-muted-foreground mt-3 text-lg">
                                深度检索，精准解答，重塑你的搜索体验。
                            </p>
                        </div>

                        {/* 2. 核心搜索框组件 */}
                        <div className="w-full max-w-2xl relative group animate-in fade-in slide-in-from-bottom-6 duration-1000">
                            <div className="relative flex flex-col w-full bg-card border border-border/80 rounded-[24px] shadow-sm hover:shadow-xl hover:border-primary/20 focus-within:border-primary/40 focus-within:shadow-2xl focus-within:shadow-primary/5 transition-all duration-500 p-2 backdrop-blur-xl">

                                <textarea
                                    rows={3}
                                    value={searchValue}
                                    onChange={(e) => setSearchValue(e.target.value)}
                                    placeholder="输入问题，AI 帮您在全网深度搜索..."
                                    className="w-full bg-transparent border-none text-base focus:outline-none px-6 pt-4 resize-none placeholder:text-muted-foreground/40 leading-relaxed"
                                />

                                <div className="flex items-center justify-between px-4 pb-2 mt-2">
                                    <div className="flex items-center gap-1">
                                        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all text-xs font-medium border border-transparent hover:border-primary/10">
                                            <Zap className="h-3.5 w-3.5" />
                                            <span>全能模式</span>
                                        </button>
                                        <div className="w-px h-4 bg-border mx-1" />
                                        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all text-xs font-medium border border-transparent hover:border-primary/10">
                                            <Sparkles className="h-3.5 w-3.5" />
                                            <span>深度解析</span>
                                        </button>
                                    </div>

                                    <button
                                        className={cn(
                                            "flex items-center justify-center h-10 w-10 rounded-full transition-all active:scale-95",
                                            searchValue.trim() ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" : "bg-muted text-muted-foreground/30 cursor-not-allowed"
                                        )}
                                    >
                                        <Send className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* 3. 快速建议卡片 */}
                        <div className="mt-8 flex flex-wrap justify-center gap-3 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                            {suggestions.map((item, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setSearchValue(item.label)}
                                    className="flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card/50 text-sm text-muted-foreground transition-all hover:bg-primary/5 hover:border-primary/30 hover:text-primary hover:shadow-md group"
                                >
                                    <span className="opacity-60 group-hover:opacity-100 transition-opacity">
                                        {item.icon}
                                    </span>
                                    <span className="font-medium">{item.label}</span>
                                </button>
                            ))}
                        </div>

                        {/* 4. 底部装饰性文字 */}
                        <div className="mt-20 text-[10px] text-muted-foreground/40 uppercase tracking-[0.2em] font-bold">
                            Powered by EduAI Engine
                        </div>
                    </div>
                </ScrollArea>
            </div>
        </main>
    );
}