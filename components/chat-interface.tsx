"use client";

import React, { useState, useEffect } from "react";
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
  MessageSquareText,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

// --- 1. 静态数据定义 ---
const promoCases = [
  {
    title: "✨ 科研助手：降维打击",
    description: "新上线【深度纵览】模式。只需上传PDF，AI即可对比最新学术数据，指出研究盲区。",
    image: "/科学导航.jpg",
    link: "/research",
    tag: "NEW · 科研助手",
    color: "from-blue-500/5 to-cyan-500/5"
  },
  {
    title: "🚀 智能体：24h 雅思陪练",
    description: "接入新语音引擎，模拟真实考场压力，纠正发音刷出高分口语。",
    image: "/智能体.jpg",
    link: "/agent-builder",
    tag: "UPDATE · 智能体",
    color: "from-purple-500/5 to-pink-500/5"
  },
  {
    title: "🔥 智能助教：速成计划",
    description: "利用【考点预测】功能，将300页教材浓缩为核心思维导图，复习效率升3倍。",
    image: "/智能助教.jpg",
    link: "/assistant",
    tag: "HOT · 智能助教",
    color: "from-orange-500/5 to-yellow-500/5"
  }
];

const availableAgents = [
  { id: "ielts", name: "雅思口语考官", desc: "专业口语测评与纠错" },
  { id: "paper", name: "论文润色专家", desc: "学术语言深度优化" },
  { id: "code", name: "代码架构师", desc: "高标准代码审查与重构" },
  { id: "math", name: "高数解题助手", desc: "分步讲解复杂公式" },
];

// --- 2. 辅助组件 ---
function ToolIconButton({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all">
      {icon}
      <span className="text-[11px] font-medium">{label}</span>
    </button>
  );
}

function GlobalModuleConfig({
  activeModules,
  onToggle,
  onOpenAgentConfig,
}: {
  activeModules: Record<string, boolean>,
  onToggle: (id: string) => void,
  onOpenAgentConfig: () => void,
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
            className={cn(
              "flex items-center justify-between p-2.5 rounded-xl transition-all border text-left",
              activeModules[m.id] ? "bg-primary/5 border-primary/20" : "border-transparent"
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

            {m.id === "agent" ? (
              <button
                onClick={(e) => { e.stopPropagation(); onOpenAgentConfig(); }}
                className="text-[11px] font-bold text-primary hover:underline px-2 py-1"
              >
                配置
              </button>
            ) : (
              <button
                onClick={() => onToggle(m.id)}
                className={cn(
                  "text-[11px] font-bold px-2 py-1 rounded-md transition-colors",
                  activeModules[m.id] ? "text-primary bg-primary/10" : "text-muted-foreground bg-muted"
                )}
              >
                {activeModules[m.id] ? "已开启" : "开启"}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// --- 3. LandingSearch 组件 ---
export function LandingSearch({ onStart }: { onStart: () => void }) {
  const [tempInput, setTempInput] = useState("");
  const [showConfig, setShowConfig] = useState(false);
  const [isAgentDialogOpen, setIsAgentDialogOpen] = useState(false);
  const [selectedAgents, setSelectedAgents] = useState<string[]>(["ielts", "paper"]);
  const [activeModules, setActiveModules] = useState<Record<string, boolean>>({
    agent: true, research: true, assistant: true, library: false
  });
  const [activeCase, setActiveCase] = useState(0);

  // 自动轮播逻辑
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveCase((prev) => (prev + 1) % promoCases.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const helperPrompts = [
    { label: "考试查询", text: "帮我查询最近的考试信息和地点", icon: <Calendar className="h-4 w-4" /> },
    { label: "学术答疑", text: "请解释一下Transformer架构中的注意力机制", icon: <Lightbulb className="h-4 w-4" /> },
    { label: "校园安排", text: "学校本周有哪些重要的讲座或学术活动？", icon: <Search className="h-4 w-4" /> },
    { label: "科研咨询", text: "我想了解关于多模态大模型的最新科研动态", icon: <Microscope className="h-4 w-4" /> },
    { label: "论文润色", text: "帮我检查并润色这段学术论文的摘要", icon: <BookOpen className="h-4 w-4" /> },
    { label: "选课咨询", text: "计算机系这学期有哪些推荐的专业选修课？", icon: <GraduationCap className="h-4 w-4" /> },
  ];

  const detailedQuestions = [
    "帮我查询下周三《高等数学》考试的具体教室和座位号",
    "我想知道本学期学生奖学金评定的具体标准和截止日期",
    "某某教授在《人工智能导论》中提到的反向传播算法是怎么推导的？",
    "请帮我整理一份关于2026年CVPR会议关于生成式AI的投稿指南",
  ];

  const toggleAgent = (id: string) => {
    setSelectedAgents(prev => prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]);
  };

  const activeCount = Object.values(activeModules).filter(Boolean).length;

  return (
    <div className="w-full h-full flex flex-col items-center relative overflow-y-auto bg-background/50">
      {/* 全局配置按钮 */}
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
          {showConfig && (
            <GlobalModuleConfig
              activeModules={activeModules}
              onToggle={(id) => setActiveModules(prev => ({ ...prev, [id]: !prev[id] }))}
              onOpenAgentConfig={() => { setShowConfig(false); setIsAgentDialogOpen(true); }}
            />
          )}
        </div>
      </div>

      {/* 智能体配置弹窗 */}
      <Dialog open={isAgentDialogOpen} onOpenChange={setIsAgentDialogOpen}>
        <DialogContent className="sm:max-w-[425px] rounded-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-primary" /> 配置嵌入智能体
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-3 py-4">
            {availableAgents.map((agent) => (
              <div
                key={agent.id}
                onClick={() => toggleAgent(agent.id)}
                className={cn(
                  "flex items-center justify-between p-3 rounded-2xl border transition-all cursor-pointer",
                  selectedAgents.includes(agent.id) ? "border-primary/40 bg-primary/5" : "border-border hover:bg-muted/50"
                )}
              >
                <div className="flex flex-col gap-0.5 text-left">
                  <span className="text-sm font-bold">{agent.name}</span>
                  <span className="text-[10px] text-muted-foreground">{agent.desc}</span>
                </div>
                <Checkbox checked={selectedAgents.includes(agent.id)} onCheckedChange={() => toggleAgent(agent.id)} />
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAgentDialogOpen(false)} className="rounded-xl px-6">取消</Button>
            <Button onClick={() => setIsAgentDialogOpen(false)} className="rounded-xl px-6">确认配置</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 主体内容区 */}
      <div className="flex flex-col items-center text-center justify-start pt-32 pb-16 w-full max-w-6xl px-4 animate-in fade-in duration-1000">
        <div className="space-y-4 mb-8">
          <h1 className="text-4xl md:text-5xl font-light tracking-tight text-foreground">
            教育，在此<span className="font-semibold text-primary">无缝连接</span>
          </h1>
          <p className="text-foreground/50 text-base font-normal max-w-md mx-auto leading-relaxed">
            覆盖师生全场景的一站式智能空间，让学术更纯粹
          </p>
        </div>

        {/* 搜索框：精致尺寸 */}
        <div className="w-full max-w-2xl mb-10">
          <div className="relative group flex flex-col w-full bg-card border border-border/60 rounded-[28px] shadow-sm focus-within:shadow-[0_10px_30px_rgba(var(--primary-rgb),0.06)] focus-within:border-primary/30 transition-all duration-500 p-1 backdrop-blur-md">
            <textarea
              rows={2}
              value={tempInput}
              onChange={(e) => setTempInput(e.target.value)}
              placeholder="告诉 AI 校园 您想做什么..."
              className="w-full bg-transparent border-none text-base focus:outline-none px-6 pt-4 resize-none placeholder:text-muted-foreground/30 leading-relaxed"
            />
            <div className="flex items-center justify-between px-4 pb-2 mt-1">
              <div className="flex items-center gap-0.5">
                <ToolIconButton icon={<Paperclip className="h-4 w-4" />} label="上传" />
                <ToolIconButton icon={<Globe className="h-4 w-4" />} label="联网" />
                <ToolIconButton icon={<Library className="h-4 w-4" />} label="知识库" />
              </div>
              <button onClick={onStart} className="flex items-center justify-center h-10 w-10 bg-primary text-primary-foreground rounded-full hover:shadow-lg transition-all active:scale-95 shrink-0">
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* 提示词区域：简洁格式，不加背景框 */}
        <div className="w-full max-w-3xl space-y-6 mb-12">
          <div className="flex flex-wrap justify-center gap-3">
            {helperPrompts.map((prompt, idx) => (
              <button key={idx} onClick={() => setTempInput(prompt.text)} className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-background/40 text-[12px] text-muted-foreground transition-all hover:bg-primary/5 hover:border-primary/20 hover:text-primary group">
                <span className="opacity-60 group-hover:opacity-100">{prompt.icon}</span>
                <span className="font-semibold">{prompt.label}</span>
              </button>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-3 max-w-4xl mx-auto">
            {detailedQuestions.map((q, idx) => (
              <button key={idx} onClick={() => setTempInput(q)} className="flex items-center gap-2 text-[12px] text-muted-foreground/80 hover:text-primary transition-all text-left group">
                <MessageSquareText className="h-3 w-3 opacity-40 group-hover:opacity-100 shrink-0" />
                <span className="border-b border-transparent group-hover:border-primary/30 transition-all">{q}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 底部图片卡片展示区：文字调小一点 */}
        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-6 animate-in slide-in-from-bottom-4 duration-1000">
          {promoCases.map((card, idx) => (
            <div key={idx} className="group relative flex flex-col overflow-hidden rounded-3xl border border-border/60 bg-card transition-all duration-300 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5">
              <div className="relative h-32 overflow-hidden shrink-0">
                <img src={card.image} alt={card.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-40" />
              </div>
              <div className={cn("p-6 text-left flex flex-col justify-between h-full bg-gradient-to-b", card.color)}>
                <div className="space-y-2">
                  {/* 标题调至 text-base */}
                  <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">{card.title}</h3>
                  {/* 描述调至 text-[11px] */}
                  <p className="text-[11px] text-muted-foreground leading-relaxed line-clamp-2 italic">“{card.description}”</p>
                </div>
                <div className="mt-4 flex items-center gap-2 text-[10px] font-bold text-primary tracking-tighter uppercase group-hover:gap-2.5 transition-all cursor-pointer">
                  探索案例 <ArrowRight className="h-3 w-3" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// --- 4. ChatInterface 组件 ---
export function ChatInterface() {
  const [messages, setMessages] = useState([{ id: "1", type: "ai", content: "您好，个人空间已为您准备就绪。请问有什么可以帮您？" }]);
  const [inputValue, setInputValue] = useState("");
  const [isStarted, setIsStarted] = useState(false);

  const handleSend = () => {
    if (!inputValue.trim()) return;
    if (!isStarted) setIsStarted(true);
    setMessages(prev => [...prev, { id: Date.now().toString(), type: "user", content: inputValue }]);
    setInputValue("");
  };

  if (!isStarted) return <LandingSearch onStart={() => setIsStarted(true)} />;

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
              <div className={cn("max-w-[85%] text-[15px] leading-relaxed px-6 py-4 rounded-[22px]", m.type === "user" ? "bg-primary text-primary-foreground rounded-tr-none" : "text-foreground bg-muted rounded-tl-none border border-border/50")}>
                {m.content}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="p-8 border-t border-border/50">
        <div className="mx-auto max-w-3xl flex items-center gap-3 bg-muted border border-border/40 rounded-[20px] p-2 focus-within:border-primary/50 transition-all">
          <input value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend()} placeholder="输入后续需求..." className="flex-1 bg-transparent border-none text-sm focus:outline-none px-4" />
          <button onClick={handleSend} className="h-10 w-10 flex items-center justify-center rounded-xl bg-primary text-primary-foreground hover:opacity-90 transition-all"><Send className="h-4 w-4" /></button>
        </div>
      </div>
    </div>
  );
}