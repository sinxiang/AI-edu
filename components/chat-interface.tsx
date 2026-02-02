"use client";

import React, { useState } from "react";
import {
  Send,
  Paperclip,
  Library,
  Globe,
  Bot,
  FlaskConical,
  GraduationCap,
  Sparkles,
  LibraryBig,
  Zap,
  ChevronDown
} from "lucide-react";
import { cn } from "@/lib/utils";

// --- 仅保留全局下拉菜单组件 ---
function GlobalModuleConfig({
  activeModules,
  onToggle
}: {
  activeModules: Record<string, boolean>,
  onToggle: (id: string) => void
}) {
  const modules = [
    { id: "agent", name: "智能体中心", icon: <Bot className="h-4 w-4" />, desc: "管理个人 AI 角色" },
    { id: "research", name: "科研助手", icon: <FlaskConical className="h-4 w-4" />, desc: "文献深度解析" },
    { id: "assistant", name: "智能助教", icon: <GraduationCap className="h-4 w-4" />, desc: "同步辅导工具" },
    { id: "library", name: "智能图书馆", icon: <LibraryBig className="h-4 w-4" />, desc: "全球资源调取" },
  ];

  return (
    <div className="absolute top-full right-0 mt-3 w-72 bg-background/95 backdrop-blur-2xl border border-border shadow-2xl rounded-2xl p-4 z-[100] animate-in fade-in slide-in-from-top-2 duration-300">
      <div className="flex items-center gap-2 px-1 mb-4">
        <div className="p-1.5 rounded-lg bg-primary/10 text-primary">
          <Zap className="h-4 w-4 fill-current" />
        </div>
        <div className="flex flex-col text-left">
          <span className="text-sm font-bold text-foreground">全局功能配置</span>
          <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Workspace settings</span>
        </div>
      </div>
      <div className="space-y-1.5">
        {modules.map((m) => (
          <div
            key={m.id}
            onClick={() => onToggle(m.id)}
            className={cn(
              "flex items-center justify-between p-2.5 rounded-xl transition-all cursor-pointer group border text-left",
              activeModules[m.id] ? "bg-primary/5 border-primary/20" : "hover:bg-muted/50 border-transparent"
            )}
          >
            <div className="flex items-center gap-3">
              <div className={cn(
                "p-2 rounded-lg transition-colors",
                activeModules[m.id] ? "bg-primary text-primary-foreground shadow-sm" : "bg-muted text-muted-foreground/50"
              )}>
                {m.icon}
              </div>
              <div className="flex flex-col">
                <span className="text-[13px] font-semibold text-foreground">{m.name}</span>
                <span className="text-[10px] text-muted-foreground leading-tight">{m.desc}</span>
              </div>
            </div>
            <div className={cn(
              "w-8 h-4.5 rounded-full relative transition-colors duration-300",
              activeModules[m.id] ? "bg-primary" : "bg-muted-foreground/20"
            )}>
              <div className={cn(
                "absolute top-0.5 w-3.5 h-3.5 bg-white rounded-full transition-transform duration-300 shadow-sm",
                activeModules[m.id] ? "left-4" : "left-0.5"
              )} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function LandingSearch({ onStart }: { onStart: () => void }) {
  const [tempInput, setTempInput] = useState("");
  const [showConfig, setShowConfig] = useState(false);
  const [activeModules, setActiveModules] = useState<Record<string, boolean>>({
    agent: true, research: true, assistant: true, library: false
  });

  const activeCount = Object.values(activeModules).filter(Boolean).length;

  return (
    <div className="w-full flex flex-col items-center">
      {/* 唯一全局入口：右上角避开导航栏 */}
      <div className="fixed top-20 right-6 z-[90]">
        <div className="relative">
          <button
            onClick={() => setShowConfig(!showConfig)}
            className={cn(
              "flex items-center gap-2.5 px-4 py-2.5 rounded-full border transition-all duration-300 backdrop-blur-md shadow-lg",
              showConfig ? "bg-primary border-primary text-primary-foreground" : "bg-background/80 border-border text-muted-foreground hover:border-primary/50"
            )}
          >
            <Zap className={cn("h-4 w-4", showConfig ? "fill-current" : "text-primary")} />
            <span className="text-xs font-bold tracking-tight uppercase">全局功能配置</span>
            {activeCount > 0 && !showConfig && (
              <span className="ml-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary/20 text-[10px] text-primary font-bold">{activeCount}</span>
            )}
            <ChevronDown className={cn("h-3 w-3 transition-transform duration-300", showConfig && "rotate-180")} />
          </button>
          {showConfig && <GlobalModuleConfig activeModules={activeModules} onToggle={(id) => setActiveModules(prev => ({ ...prev, [id]: !prev[id] }))} />}
        </div>
      </div>

      <div className="flex flex-col items-center text-center pt-32 pb-20 animate-in fade-in slide-in-from-bottom-8 duration-1000 w-full max-w-4xl px-4">
        <div className="space-y-6 mb-16">
          <h1 className="text-4xl md:text-5xl font-light tracking-tight text-foreground">
            教育，在此<span className="font-semibold text-primary">无缝连接</span>
          </h1>
          <p className="text-foreground/70 text-base font-normal max-w-xl mx-auto">
            覆盖师生全场景的一站式智能空间，让学术与教学更纯粹
          </p>
        </div>

        <div className="w-full max-w-2xl text-left">
          <div className="relative group flex flex-col w-full bg-card border border-border/80 rounded-[28px] shadow-sm focus-within:shadow-[0_20px_60px_rgba(139,92,246,0.15)] focus-within:border-primary/50 transition-all duration-500 p-2 backdrop-blur-md">
            <textarea
              rows={3}
              value={tempInput}
              onChange={(e) => setTempInput(e.target.value)}
              placeholder="告诉 EduAI 您想做什么..."
              className="w-full bg-transparent border-none text-base focus:outline-none px-6 pt-5 resize-none placeholder:text-muted-foreground/50 leading-relaxed text-foreground"
            />
            <div className="flex items-center justify-between px-4 pb-3 mt-2">
              <div className="flex items-center gap-1">
                <ToolIconButton icon={<Paperclip className="h-4 w-4" />} label="上传" />
                <ToolIconButton icon={<Globe className="h-4 w-4" />} label="联网" />
                <ToolIconButton icon={<Library className="h-4 w-4" />} label="知识库" />
              </div>
              <button onClick={onStart} className="flex items-center justify-center h-10 w-10 bg-primary text-primary-foreground rounded-full hover:scale-105 transition-all shadow-lg active:scale-95">
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ChatInterface() {
  const [messages, setMessages] = useState([
    { id: "1", type: "ai", content: "您好，协作对话已开启。当前已同步您的全局功能配置。" }
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleSend = () => {
    if (!inputValue.trim()) return;
    setMessages(prev => [...prev, { id: Date.now().toString(), type: "user", content: inputValue }]);
    setInputValue("");
  };

  return (
    <div className="flex h-full flex-col bg-background">
      <div className="flex items-center justify-between border-b border-border/50 px-8 py-5">
        <div className="flex items-center gap-3">
          <div className="h-2 w-2 rounded-full bg-primary" />
          <h1 className="text-sm font-semibold text-foreground/80 tracking-tight">EduAI 协作中心</h1>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
          <Sparkles className="h-3 w-3 text-primary" /> Active Workspace
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-8">
        <div className="mx-auto max-w-3xl space-y-8">
          {messages.map((m) => (
            <div key={m.id} className={cn("flex", m.type === "user" ? "justify-end" : "justify-start")}>
              <div className={cn(
                "max-w-[85%] text-[15px] leading-relaxed px-6 py-4 rounded-[22px]",
                m.type === "user" ? "bg-primary text-primary-foreground rounded-tr-none" : "text-foreground bg-muted rounded-tl-none border border-border/50"
              )}>
                {m.content}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="p-8 border-t border-border/50">
        <div className="mx-auto max-w-3xl flex items-center gap-3 bg-muted border border-border/40 rounded-[20px] p-2 focus-within:border-primary/50 transition-all">
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="输入后续需求..."
            className="flex-1 bg-transparent border-none text-sm focus:outline-none px-4"
          />
          <button onClick={handleSend} className="h-10 w-10 flex items-center justify-center rounded-xl bg-primary text-primary-foreground hover:opacity-90">
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function ToolIconButton({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all">
      {icon}
      <span className="text-xs font-medium">{label}</span>
    </button>
  );
}