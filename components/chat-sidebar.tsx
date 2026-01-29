"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatHistory {
  id: string;
  title: string;
  time: string;
  preview: string;
}

const chatHistories: ChatHistory[] = [
  {
    id: "1",
    title: "注意力机制讨论",
    time: "昨天 14:30",
    preview: "帮我解释一下Transformer的注意力机制...",
  },
  {
    id: "2",
    title: "课程疑问",
    time: "今天 10:15",
    preview: "关于深度学习课程的作业问题...",
  },
  {
    id: "3",
    title: "论文思路",
    time: "前天 09:45",
    preview: "想讨论一下我的毕业论文方向...",
  },
  {
    id: "4",
    title: "Python编程问题",
    time: "3天前",
    preview: "如何优化这段代码的性能...",
  },
  {
    id: "5",
    title: "数学推导",
    time: "4天前",
    preview: "反向传播算法的数学证明...",
  },
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
        "flex flex-col border-r border-border bg-sidebar transition-all duration-300 ease-in-out",
        isCollapsed ? "w-0 overflow-hidden" : "w-72"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border p-4">
        <h2 className="text-lg font-semibold text-sidebar-foreground">
          历史对话
        </h2>
        <button
          onClick={onToggle}
          className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground"
          aria-label="折叠侧边栏"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto p-2">
        {chatHistories.map((chat) => (
          <button
            key={chat.id}
            onClick={() => setSelectedChat(chat.id)}
            className={cn(
              "mb-1 flex w-full flex-col items-start rounded-lg p-3 text-left transition-all duration-200",
              selectedChat === chat.id
                ? "bg-sidebar-accent text-sidebar-foreground"
                : "text-muted-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
            )}
          >
            <div className="flex w-full items-center gap-2">
              <MessageSquare className="h-4 w-4 shrink-0" />
              <span className="truncate font-medium">{chat.title}</span>
            </div>
            <span className="mt-1 text-xs text-muted-foreground">
              {chat.time}
            </span>
            <p className="mt-1 truncate text-sm text-muted-foreground">
              {chat.preview}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}

export function CollapsedToggle({ onToggle }: { onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className="absolute left-0 top-4 z-10 rounded-r-lg bg-sidebar p-2 text-muted-foreground shadow-lg transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground"
      aria-label="展开侧边栏"
    >
      <ChevronRight className="h-5 w-5" />
    </button>
  );
}
