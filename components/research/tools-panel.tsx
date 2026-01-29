"use client";

import React from "react"
import { cn } from "@/lib/utils";
import {
  Search,
  FolderOpen,
  StickyNote,
  FileText,
  CheckCircle, // 改为查重图标
  MessageCircle,
} from "lucide-react";

export type ToolType = "search" | "manage" | "notes" | "interpret" | "plagiarism" | "chat";

interface ToolItem {
  id: ToolType;
  label: string;
  icon: React.ReactNode;
}

const tools: ToolItem[] = [
  { id: "chat", label: "AI科研助手", icon: <MessageCircle className="h-5 w-5" /> },
  { id: "search", label: "文献检索", icon: <Search className="h-5 w-5" /> },
  { id: "manage", label: "文献管理", icon: <FolderOpen className="h-5 w-5" /> },
  { id: "notes", label: "笔记与想法", icon: <StickyNote className="h-5 w-5" /> },
  { id: "interpret", label: "文献解读", icon: <FileText className="h-5 w-5" /> },
  { id: "plagiarism", label: "论文查重", icon: <CheckCircle className="h-5 w-5" /> }, // 修改这里
];

interface ToolsPanelProps {
  activeTool: ToolType;
  onToolChange: (tool: ToolType) => void;
}

export function ToolsPanel({ activeTool, onToolChange }: ToolsPanelProps) {
  return (
    <div className="flex h-full w-[280px] flex-col border-r border-border bg-card">
      {/* Panel Header */}
      <div className="border-b border-border p-4">
        <h2 className="text-lg font-semibold text-foreground">科研工具</h2>
        <p className="text-sm text-muted-foreground">选择您需要的工具</p>
      </div>

      {/* Tool Navigation */}
      <nav className="flex-1 p-3">
        <ul className="space-y-1">
          {tools.map((tool) => {
            const isActive = activeTool === tool.id;

            return (
              <li key={tool.id}>
                <button
                  type="button"
                  onClick={() => onToolChange(tool.id)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left transition-colors duration-200",
                    isActive
                      ? "bg-primary/10 text-primary border border-primary/20"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  )}
                >
                  <div className={cn(
                    "flex items-center justify-center w-8 h-8 rounded-lg",
                    isActive
                      ? "bg-primary text-white"
                      : "bg-secondary text-muted-foreground"
                  )}>
                    {tool.icon}
                  </div>
                  <span className="font-medium">{tool.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Panel Footer */}
      <div className="border-t border-border p-4">
        <div className="rounded-lg bg-secondary/50 p-3">
          <p className="text-xs text-muted-foreground">
            提示：使用论文查重功能确保学术诚信，避免学术不端行为
          </p>
        </div>
      </div>
    </div>
  );
}