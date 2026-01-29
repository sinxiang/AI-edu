"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, MessageSquare, Plus, Settings, User, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatHistory {
  id: string;
  title: string;
  time: string;
}

const chatHistories: ChatHistory[] = [
  { id: "1", title: "注意力机制讨论", time: "昨天 14:30" },
  { id: "2", title: "深度学习作业", time: "今天 10:15" },
];

interface ChatSidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export function ChatSidebar({ isCollapsed, onToggle }: ChatSidebarProps) {
  const [selectedChat, setSelectedChat] = useState<string>("1");

  return (
    <div
      className={cn(
        "flex flex-col border-r border-border bg-muted/30 backdrop-blur-xl transition-all duration-300 ease-in-out",
        isCollapsed ? "w-0 overflow-hidden" : "w-72"
      )}
    >
      {/* 顶部：新建对话 */}
      <div className="p-4">
        <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-background border border-border py-2.5 text-sm font-medium shadow-sm hover:bg-secondary transition-all active:scale-[0.98]">
          <Plus className="h-4 w-4" /> 新建对话
        </button>
      </div>

      <div className="px-4 py-2 flex items-center justify-between">
        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">最近记录</span>
        <button onClick={onToggle} className="p-1 hover:bg-secondary rounded-md transition-colors">
          <ChevronLeft className="h-4 w-4 text-muted-foreground" />
        </button>
      </div>

      {/* 历史列表 */}
      <div className="flex-1 overflow-y-auto px-2 space-y-0.5">
        {chatHistories.map((chat) => (
          <button
            key={chat.id}
            onClick={() => setSelectedChat(chat.id)}
            className={cn(
              "group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-all",
              selectedChat === chat.id
                ? "bg-background text-foreground shadow-sm ring-1 ring-border"
                : "text-muted-foreground hover:bg-background/50 hover:text-foreground"
            )}
          >
            <MessageSquare className={cn("h-4 w-4 shrink-0", selectedChat === chat.id ? "text-primary" : "opacity-40")} />
            <span className="truncate font-medium flex-1">{chat.title}</span>
          </button>
        ))}
      </div>

      {/* 底部固定：设置与用户 */}
      <div className="mt-auto p-2 border-t border-border bg-background/50">
        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground transition-all">
          <Settings className="h-4 w-4" />
          <span>系统设置</span>
        </button>
        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground transition-all">
          <User className="h-4 w-4" />
          <span>个人空间</span>
        </button>

        <div className="mt-2 pt-2 border-t border-border flex items-center gap-3 px-3 py-2">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 shadow-inner" />
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-semibold truncate text-foreground">学术探索者</p>
            <p className="text-[10px] text-muted-foreground">Premium 账户</p>
          </div>
          <button className="text-muted-foreground hover:text-destructive transition-colors">
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export function CollapsedToggle({ onToggle }: { onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className="absolute left-0 top-4 z-10 rounded-r-xl border border-l-0 border-border bg-background p-2 text-muted-foreground shadow-lg hover:text-primary transition-all"
    >
      <ChevronRight className="h-5 w-5" />
    </button>
  );
}