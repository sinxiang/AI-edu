"use client";

import { useState } from "react";
import {
  ChevronLeft, ChevronRight, MessageSquare, Plus,
  History, Home
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatHistory {
  id: string;
  title: string;
  time: string;
}

const chatHistories: ChatHistory[] = [
  { id: "1", title: "注意力机制讨论", time: "昨天 14:30" },
  { id: "2", title: "深度学习作业", time: "今天 10:15" },
  { id: "3", title: "论文写作指导", time: "前天 09:45" }
];

interface ChatSidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
  onStartChat: () => void;
  onSelectHistory?: (chatId: string) => void;
  onHomeClick?: () => void;
}

export function ChatSidebar({ isCollapsed, onToggle, onStartChat, onSelectHistory, onHomeClick }: ChatSidebarProps) {
  const [selectedChat, setSelectedChat] = useState<string>("");

  return (
    <div
      className={cn(
        "flex flex-col fixed left-0 top-14 bottom-0 z-20",
        "border-r border-border bg-muted/30 backdrop-blur-xl transition-all duration-300 ease-in-out",
        isCollapsed ? "w-0 overflow-hidden" : "w-64"
      )}
    >
      {/* 顶部固定区域：导航与动作 */}
      <div className="flex-shrink-0 pt-4 px-4 relative">
        {/* 1. 回到主页 */}
        <button
          onClick={() => {
            setSelectedChat("");
            if (onHomeClick) onHomeClick();
          }}
          className={cn(
            "flex w-full items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium transition-all mb-3",
            selectedChat === ""
              ? "text-foreground bg-muted/80 shadow-sm"
              : "text-muted-foreground hover:text-foreground hover:bg-muted"
          )}
        >
          <Home className="h-4 w-4" />
          <span>回到主页</span>
        </button>

        {/* 2. 新建对话按钮 */}
        <button
          onClick={onStartChat}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-purple-500 text-primary-foreground py-3 text-sm font-semibold shadow-lg hover:shadow-primary/20 hover:opacity-90 transition-all active:scale-[0.98] mb-4"
        >
          <Plus className="h-4 w-4" />
          <span>新建对话</span>
        </button>

        {/* 历史对话标题 */}
        <div className="flex items-center justify-between pb-2 border-b border-border/50 mb-2">
          <div className="flex items-center gap-2 text-muted-foreground">
            <History className="h-4 w-4" />
            <span className="text-xs font-medium">历史对话</span>
          </div>
          <button
            onClick={onToggle}
            className="p-1 hover:bg-secondary rounded-md transition-colors"
            title="收起侧边栏"
          >
            <ChevronLeft className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* 历史列表区域：自动占满剩余空间并可滚动 */}
      <div className="flex-1 overflow-y-auto px-4 py-2 custom-scrollbar">
        {chatHistories.map((chat) => (
          <div
            key={chat.id}
            onClick={() => {
              setSelectedChat(chat.id);
              if (onSelectHistory) onSelectHistory(chat.id);
            }}
            className={cn(
              "group relative flex items-center gap-3 rounded-lg px-3 py-3 text-left text-sm transition-all cursor-pointer mb-1",
              selectedChat === chat.id
                ? "bg-gradient-to-r from-primary/10 to-purple-500/10 text-foreground shadow-sm ring-1 ring-primary/20"
                : "text-muted-foreground hover:text-foreground hover:bg-background/50"
            )}
          >
            <MessageSquare className={cn("h-4 w-4 shrink-0", selectedChat === chat.id ? "text-primary" : "opacity-40")} />
            <div className="flex-1 min-w-0 font-medium truncate">{chat.title}</div>
            <span className="text-[10px] text-muted-foreground opacity-60 group-hover:opacity-100 whitespace-nowrap">
              {chat.time}
            </span>
          </div>
        ))}
      </div>

      {/* 底部已清空，没有任何装饰性元素 */}
    </div>
  );
}

export function CollapsedToggle({ onToggle }: { onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className="fixed left-0 top-1/4 z-30 rounded-r-xl border border-l-0 border-border bg-background p-2 text-muted-foreground shadow-lg hover:text-primary transition-all"
    >
      <ChevronRight className="h-5 w-5" />
    </button>
  );
}