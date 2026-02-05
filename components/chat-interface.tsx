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
  ChevronDown,
  Search,
  BookOpen,
  Calendar,
  Microscope,
  Lightbulb,
  MessageSquareText
} from "lucide-react";
import { cn } from "@/lib/utils";

// --- 全局功能配置下拉菜单 (保持不变) ---
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

// --- 主页面 LandingSearch ---
export function LandingSearch({ onStart }: { onStart: () => void }) {
  const [tempInput, setTempInput] = useState("");
  const [showConfig, setShowConfig] = useState(false);
  const [activeModules, setActiveModules] = useState<Record<string, boolean>>({
    agent: true, research: true, assistant: true, library: false
  });

  // 第一层：带彩色图标的类别标签
  const helperPrompts = [
    { label: "考试查询", text: "帮我查询最近的考试信息和地点", icon: <Calendar className="h-3 w-3" /> },
    { label: "学术答疑", text: "请解释一下Transformer架构中的注意力机制", icon: <Lightbulb className="h-3 w-3" /> },
    { label: "校园安排", text: "学校本周有哪些重要的讲座或学术活动？", icon: <Search className="h-3 w-3" /> },
    { label: "科研咨询", text: "我想了解关于多模态大模型的最新科研动态", icon: <Microscope className="h-3 w-3" /> },
    { label: "论文润色", text: "帮我检查并润色这段学术论文的摘要", icon: <BookOpen className="h-3 w-3" /> },
    { label: "选课咨询", text: "计算机系这学期有哪些推荐的专业选修课？", icon: <GraduationCap className="h-3 w-3" /> },
  ];

  // 第二层：更具体、更长、灰底的真实问题
  const detailedQuestions = [
    "帮我查询下周三《高等数学》考试的具体教室和座位号",
    "我想知道本学期学生奖学金评定的具体标准和截止日期",
    "某某教授在《人工智能导论》中提到的反向传播算法是怎么推导的？",
    "请帮我整理一份关于2026年CVPR会议关于生成式AI的投稿指南",
    "学校宿舍区域最近的报修服务电话是多少？",
    "我想办理下周三的调课申请，请告诉我具体操作流程",
    "解释一下为什么在训练大型语言模型时需要进行RLHF优化",
    "查询最近一次学术论坛中关于‘碳中和’技术讨论的会议纪要"
  ];

  const activeCount = Object.values(activeModules).filter(Boolean).length;

  return (
    <div className="w-full h-full flex flex-col items-center relative overflow-hidden">
      {/* 全局功能配置按钮 */}
      <div className="absolute top-6 right-6 z-[90]">
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

      <div className="flex flex-col items-center text-center justify-center flex-1 w-full max-w-5xl px-4 animate-in fade-in duration-1000">
        <div className="space-y-4 mb-8">
          <h1 className="text-4xl md:text-5xl font-light tracking-tight text-foreground">
            教育，在此<span className="font-semibold text-primary">无缝连接</span>
          </h1>
          <p className="text-foreground/60 text-base font-normal max-w-lg mx-auto leading-relaxed">
            覆盖师生全场景的一站式智能空间，让学术与教学更纯粹
          </p>
        </div>

        {/* 搜索框 */}
        <div className="w-full max-w-2xl mb-8">
          <div className="relative group flex flex-col w-full bg-card border border-border/80 rounded-[28px] shadow-sm focus-within:shadow-[0_15px_40px_rgba(var(--primary-rgb),0.08)] focus-within:border-primary/40 transition-all duration-500 p-1.5 backdrop-blur-md">
            <textarea
              rows={3}
              value={tempInput}
              onChange={(e) => setTempInput(e.target.value)}
              placeholder="告诉 EduAI 您想做什么..."
              className="w-full bg-transparent border-none text-base focus:outline-none px-6 pt-5 resize-none placeholder:text-muted-foreground/30 leading-relaxed"
            />
            <div className="flex items-center justify-between px-4 pb-2 mt-1">
              <div className="flex items-center gap-0.5">
                <ToolIconButton icon={<Paperclip className="h-4 w-4" />} label="上传" />
                <ToolIconButton icon={<Globe className="h-4 w-4" />} label="联网" />
                <ToolIconButton icon={<Library className="h-4 w-4" />} label="知识库" />
              </div>
              <button
                onClick={onStart}
                className="flex items-center justify-center h-10 w-10 bg-primary text-primary-foreground rounded-full hover:shadow-lg transition-all active:scale-95 shrink-0"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* 提示词区域容器 */}
        <div className="w-full max-w-3xl space-y-6">
          {/* 第一层：类别标签 */}
          <div className="flex flex-wrap justify-center gap-2">
            {helperPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => setTempInput(prompt.text)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-background/50 text-[11px] text-muted-foreground transition-all hover:bg-primary/5 hover:border-primary/30 hover:text-primary group"
              >
                <span className="opacity-70 group-hover:opacity-100">{prompt.icon}</span>
                <span className="font-medium">{prompt.label}</span>
              </button>
            ))}
          </div>

          {/* 第二层：具体问题建议 (灰底、小小的、更长) */}
          <div className="flex flex-wrap justify-center gap-x-2 gap-y-2 max-w-4xl mx-auto">
            {detailedQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => setTempInput(q)}
                className="flex items-center gap-2 px-3 py-1 rounded-lg bg-muted/40 text-[10.5px] text-muted-foreground/80 hover:bg-muted hover:text-foreground transition-all border border-transparent hover:border-border/50 text-left whitespace-nowrap overflow-hidden"
              >
                <MessageSquareText className="h-2.5 w-2.5 opacity-50 shrink-0" />
                <span className="truncate">{q}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// --- 对话界面组件 (保持不变) ---
export function ChatInterface() {
  const [messages, setMessages] = useState([
    { id: "1", type: "ai", content: "您好，个人空间已为您准备就绪。请问有什么可以帮您？" }
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
          <h1 className="text-sm font-semibold text-foreground/80 tracking-tight">协作中心</h1>
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
          <button onClick={handleSend} className="h-10 w-10 flex items-center justify-center rounded-xl bg-primary text-primary-foreground hover:opacity-90 transition-all">
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
      <span className="text-[10px] font-medium">{label}</span>
    </button>
  );
}