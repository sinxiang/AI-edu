"use client";

import React from "react";
import { TopNavbar } from "@/components/top-navbar";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function AISearchPage() {
    return (
        <main className="min-h-screen bg-background flex flex-col overflow-hidden">
            {/* 顶部导航栏 */}
            <TopNavbar currentPath="/ai-search" />

            {/* 页面内容区：pt-14 避开导航栏高度 */}
            <div className="flex-1 pt-14 h-full">
                {/* 只允许垂直滚动，横向强制填满 */}
                <ScrollArea className="h-[calc(100vh-56px)] w-full">
                    <div className="w-full">
                        {/* img 标签设置：
               - w-full: 强制横向填满容器宽度
               - h-auto: 高度随比例自适应，防止图片拉伸变形
            */}
                        <img
                            src="/智搜.jpg"
                            alt="AI智搜"
                            className="w-full h-auto block"
                        />
                    </div>
                </ScrollArea>
            </div>
        </main>
    );
}