"use client";

import React, { useState, ReactElement } from "react";
import { useRouter } from "next/navigation";
import {
  Send,
  Database,
  Upload,
  Bot,
  Paperclip,
  Wand2,
  Library,
  Globe,
  FlaskConical,
  GraduationCap,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

// --- 居中高级感搜索组件 ---
export function LandingSearch({ onStart }: { onStart: () => void }) {
  const router = useRouter();
  const [tempInput, setTempInput] = useState("");

  // 处理提示词点击：直接填入对话框
  const handlePromptClick = (text: string) => {
    setTempInput(text);
  };

  return (
    // 增加顶部间距 (pt-32)，彻底消除压抑感
    <div className="flex flex-col items-center text-center pt-32 pb-20 animate-in fade-in slide-in-from-bottom-8 duration-1000">

      {/* 品牌文案：加深颜色，强化紫色品牌感 */}
      <div className="space-y-6 mb-16">
        <h1 className="text-4xl md:text-5xl font-light tracking-tight text-foreground">
          教育，在此<span className="font-semibold text-primary">无缝连接</span>
        </h1>
        <p className="text-foreground/70 text-base font-normal max-w-xl mx-auto">
          覆盖师生全场景的一站式智能空间，让学术与教学更纯粹
        </p>
      </div>

      <div className="w-full max-w-2xl text-left">
        {/* 输入框容器：紫色品牌色边缘与深度阴影 */}
        <div className="relative group flex flex-col w-full bg-card border border-border/80 rounded-[28px] shadow-[0_4px_30px_rgb(0,0,0,0.05)] focus-within:shadow-[0_20px_60px_rgba(139,92,246,0.15)] focus-within:border-primary/50 transition-all duration-500 p-2 backdrop-blur-md">
          <textarea
            rows={3}
            value={tempInput}
            onChange={(e) => setTempInput(e.target.value)}
            placeholder="告诉 EduAI 您想做什么..."
            className="w-full bg-transparent border-none text-base focus:outline-none px-6 pt-5 resize-none placeholder:text-muted-foreground/50 font-normal leading-relaxed text-foreground"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                onStart();
              }
            }}
          />

          <div className="flex items-center justify-between px-4 pb-3 mt-2">
            <div className="flex items-center gap-1">
              {/* 标出功能的图标，使用紫色 hover 效果 */}
              <ToolIconButton icon={<Paperclip className="h-4 w-4" />} label="上传" />
              <ToolIconButton icon={<Globe className="h-4 w-4" />} label="联网" />
              <ToolIconButton icon={<Library className="h-4 w-4" />} label="知识库" />
              <div className="h-3 w-[1px] bg-border mx-2" />
              <ToolIconButton icon={<Wand2 className="h-4 w-4" />} label="工具" />
            </div>

            <button
              onClick={onStart}
              className="flex items-center justify-center h-10 w-10 bg-primary text-primary-foreground rounded-full hover:scale-105 transition-all duration-300 shadow-lg shadow-primary/20 active:scale-95"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* 提示词：填充模式 (不跳转) */}
        <div className="mt-12 grid grid-cols-2 gap-3">
          {[
            "帮我对比一下这两篇论文的核心贡献",
            "生成一份关于深度学习的四周教学大纲",
            "查找最近一年关于Transformer的顶会论文",
            "将这段学术定义改写得通俗易懂"
          ].map((q) => (
            <button
              key={q}
              onClick={() => handlePromptClick(q)}
              className="flex items-center justify-between px-5 py-4 rounded-2xl bg-secondary/40 border border-border/40 hover:border-primary/40 hover:bg-background transition-all duration-300 group"
            >
              <span className="text-[14px] text-foreground font-medium opacity-80 group-hover:opacity-100 transition-opacity truncate pr-4">
                {q}
              </span>
              <Sparkles className="h-3.5 w-3.5 text-primary opacity-0 group-hover:opacity-100 transition-all" />
            </button>
          ))}
        </div>

        {/* 底部场景入口：保持跳转至相应页面 */}
        <div className="mt-12 flex justify-center gap-10">
          <SuggestModule icon={<FlaskConical />} label="科研助手" onClick={() => router.push("/research")} />
          <SuggestModule icon={<GraduationCap />} label="智能助教" onClick={() => router.push("/assistant")} />
          <SuggestModule icon={<Library />} label="智能图书馆" onClick={() => router.push("/library")} />
        </div>
      </div>
    </div>
  );
}

// 带标签的工具按钮
function ToolIconButton({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all duration-300">
      {icon}
      <span className="text-xs font-medium">{label}</span>
    </button>
  );
}

// 模块直达按钮 - 修复了 TS 重载报错
function SuggestModule({ icon, label, onClick }: { icon: React.ReactNode; label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2.5 px-4 py-2 rounded-full hover:bg-primary/5 transition-all duration-300 group"
    >
      <div className="text-muted-foreground group-hover:text-primary transition-colors">
        {/* 修复：通过断言 ReactElement 并注入属性 */}
        {React.isValidElement(icon)
          ? React.cloneElement(icon as ReactElement<{ className?: string }>, { className: "h-4 w-4" })
          : icon}
      </div>
      <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
        {label}
      </span>
    </button>
  );
}

// --- 标准对话界面 ---
export function ChatInterface() {
  const [messages, setMessages] = useState([
    { id: "1", type: "ai", content: "您好，我是您的教育 AI 助手。您可以直接提问，或点击下方工具开始工作。" }
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleSend = () => {
    if (!inputValue.trim()) return;
    setMessages([...messages, { id: Date.now().toString(), type: "user", content: inputValue }]);
    setInputValue("");
  };

  return (
    <div className="flex h-full flex-col bg-background">
      <div className="flex items-center gap-3 border-b border-border/50 px-8 py-5">
        <div className="h-2 w-2 rounded-full bg-primary" />
        <h1 className="text-sm font-semibold text-foreground/80 tracking-tight">EduAI 协作中心</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-8">
        <div className="mx-auto max-w-3xl space-y-8">
          {messages.map((m) => (
            <div key={m.id} className={cn("flex", m.type === "user" ? "justify-end" : "justify-start")}>
              <div className={cn(
                "max-w-[85%] text-[15px] leading-relaxed",
                m.type === "user"
                  ? "bg-primary text-primary-foreground px-6 py-4 rounded-[22px] rounded-tr-none shadow-md"
                  : "text-foreground bg-muted px-6 py-4 rounded-[22px] rounded-tl-none border border-border/50"
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
            placeholder="输入后续需求..."
            className="flex-1 bg-transparent border-none text-sm focus:outline-none px-4"
          />
          <button onClick={handleSend} className="h-10 w-10 flex items-center justify-center rounded-xl bg-primary text-primary-foreground hover:opacity-90 transition-all">
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}