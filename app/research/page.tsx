// /app/research/page.tsx
"use client";

import { useState } from "react";
import { TopNavbar } from "@/components/top-navbar";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export default function ResearchPage() {
  // 下拉选项状态
  const [selectedTool, setSelectedTool] = useState("闻道科学导航");

  const tools = ["闻道科学导航", "玻尔AI", "deepseek"];

  return (
    <div className="flex h-screen flex-col bg-background overflow-hidden">
      {/* 1. 顶部主导航栏 (保持不变) */}
      <TopNavbar currentPath="/research" />

      <div className="flex-1 flex flex-col pt-14 min-h-0 overflow-hidden">

        {/* 2. 导航栏下方的下拉选项区域 */}
        <div className="flex-shrink-0 border-b border-border/50 bg-background/95 backdrop-blur-sm z-30">
          <div className="mx-auto px-6 py-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2 w-[200px] justify-between">
                  {selectedTool}
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-[200px]">
                {tools.map((tool) => (
                  <DropdownMenuItem
                    key={tool}
                    onClick={() => setSelectedTool(tool)}
                    className="cursor-pointer"
                  >
                    {tool}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* 3. 剩余界面的图片展示区 */}
        {/* 设置 overflow-y-auto 允许竖向滚动 */}
        <div className="flex-1 bg-background overflow-y-auto">
          <div className="w-full">
            <img
              src="/科学导航.jpg"
              alt="科学导航内容"
              // w-full 实现横向填满，h-auto 确保图片按比例拉伸不会变形
              className="w-full h-auto block"
            />
          </div>
        </div>

      </div>
    </div>
  );
}