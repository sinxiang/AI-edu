"use client";

import { useState, useRef } from "react";
import { Play, Pause, Volume2, Maximize, ChevronRight, CheckCircle2, Circle, HelpCircle, MessageSquare, Send, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { SubModule } from "./learning-sidebar";

interface CourseLearningProps {
  subModule: SubModule;
}

const chapters = [
  { id: 1, title: "第一章：机器学习概述", duration: "45:00", completed: true },
  { id: 2, title: "第二章：线性回归", duration: "52:00", completed: true },
  { id: 3, title: "第三章：梯度下降算法", duration: "48:00", completed: false, current: true },
  { id: 4, title: "第四章：逻辑回归", duration: "55:00", completed: false },
  { id: 5, title: "第五章：神经网络基础", duration: "60:00", completed: false },
];

const knowledgePoints = [
  { id: 1, title: "梯度下降", description: "一种优化算法，用于最小化损失函数" },
  { id: 2, title: "学习率", description: "控制每次参数更新的步长" },
  { id: 3, title: "收敛条件", description: "判断算法何时停止迭代" },
];

const aiMessages = [
  { id: 1, role: "ai", content: "您好！我是AI学习助手，有什么关于课程视频的问题都可以问我。" },
  { id: 2, role: "user", content: "梯度下降的原理是什么？" },
  { id: 3, role: "ai", content: "梯度下降是一种优化算法，用于找到函数的局部最小值。它通过计算函数的梯度（导数）来确定下降方向，然后沿负梯度方向更新参数。" },
];

export function CourseLearning({ subModule }: CourseLearningProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [message, setMessage] = useState("");
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = () => {
    if (message.trim()) {
      // 这里可以发送消息给AI
      console.log("发送消息:", message);
      setMessage("");
    }
  };

  if (subModule === "knowledge-graph") {
    return (
      <div className="h-full overflow-y-auto bg-card p-6">
        <h2 className="mb-4 text-xl font-semibold text-card-foreground">知识图谱</h2>
        <div className="rounded-xl border-2 border-dashed border-primary/20 bg-primary/5 h-[calc(100vh-200px)] flex items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <p className="text-muted-foreground">知识图谱可视化区域</p>
            <p className="text-sm text-muted-foreground/70 mt-1">展示课程知识点之间的关联关系</p>
          </div>
        </div>
      </div>
    );
  }

  if (subModule === "materials") {
    return (
      <div className="h-full overflow-y-auto bg-card p-6">
        <h2 className="mb-4 text-xl font-semibold text-card-foreground">课件资料</h2>
        <div className="grid gap-4">
          {["机器学习导论.pdf", "线性回归详解.pptx", "梯度下降算法.pdf", "练习题集.docx"].map((file, i) => (
            <div key={i} className="flex items-center gap-4 rounded-lg border border-border bg-card p-4 hover:bg-accent hover:border-primary/20 transition-colors cursor-pointer">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="font-medium text-card-foreground">{file}</p>
                <p className="text-sm text-muted-foreground">上传于 2024年1月{10 + i}日</p>
              </div>
              <Button variant="outline" size="sm" className="text-primary border-primary/20 hover:bg-primary/5 bg-transparent">
                <Download className="h-4 w-4 mr-2" />
                下载
              </Button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 视频课程页面 - 保持原来的视频播放器，只在右边添加AI助手
  return (
    <div className="h-full flex overflow-hidden bg-card">
      {/* 主内容区 - 保持原有布局 */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* 视频播放器 - 保持原有高度 */}
        <div className="relative aspect-video bg-slate-900">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <div className="mb-4 text-lg">第三章：梯度下降算法</div>
              <Button
                onClick={() => setIsPlaying(!isPlaying)}
                className="h-16 w-16 rounded-full bg-primary hover:bg-primary/90"
              >
                {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8 ml-1" />}
              </Button>
            </div>
          </div>

          {/* 视频控制条 */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            <div className="mb-2 h-1 rounded-full bg-white/30">
              <div className="h-full w-[35%] rounded-full bg-primary" />
            </div>
            <div className="flex items-center justify-between text-white text-sm">
              <div className="flex items-center gap-4">
                <button type="button" onClick={() => setIsPlaying(!isPlaying)}>
                  {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                </button>
                <span>16:45 / 48:00</span>
                <Volume2 className="h-5 w-5" />
              </div>
              <Maximize className="h-5 w-5 cursor-pointer" />
            </div>
          </div>
        </div>

        {/* 课程内容和知识点 - 保持原有布局 */}
        <div className="flex-1 flex overflow-hidden">
          {/* 章节列表 */}
          <div className="w-1/2 overflow-y-auto border-r border-border p-4">
            <h3 className="mb-3 font-semibold text-card-foreground">课程章节</h3>
            <div className="space-y-2">
              {chapters.map((chapter) => (
                <div
                  key={chapter.id}
                  className={cn(
                    "flex items-center gap-3 rounded-lg p-3 cursor-pointer transition-colors",
                    chapter.current
                      ? "bg-primary/10 border border-primary/20"
                      : "hover:bg-accent"
                  )}
                >
                  {chapter.completed ? (
                    <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                  ) : (
                    <Circle className={cn("h-5 w-5 flex-shrink-0", chapter.current ? "text-primary" : "text-muted-foreground/50")} />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className={cn("font-medium truncate", chapter.current ? "text-primary" : "text-card-foreground")}>
                      {chapter.title}
                    </p>
                    <p className="text-sm text-muted-foreground">{chapter.duration}</p>
                  </div>
                  {chapter.current && <ChevronRight className="h-5 w-5 text-primary" />}
                </div>
              ))}
            </div>
          </div>

          {/* 知识点 */}
          <div className="w-1/2 overflow-y-auto p-4">
            <h3 className="mb-3 font-semibold text-card-foreground">本章知识点</h3>
            <div className="space-y-3">
              {knowledgePoints.map((point) => (
                <div key={point.id} className="rounded-lg border border-primary/20 bg-primary/5 p-4">
                  <h4 className="font-medium text-primary">{point.title}</h4>
                  <p className="mt-1 text-sm text-muted-foreground">{point.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 右侧AI学习助手 - 新增 */}
      <div className="w-80 border-l border-border flex flex-col bg-card">
        {/* AI助手标题 */}
        <div className="border-b border-border p-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500">
              <HelpCircle className="h-4 w-4 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-card-foreground">AI学习助手</h3>
              <p className="text-xs text-muted-foreground">解答视频疑惑，即时问答</p>
            </div>
          </div>
        </div>

        {/* 对话区域 */}
        <div className="flex-1 overflow-y-auto p-4" ref={chatContainerRef}>
          <div className="space-y-4">
            {aiMessages.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  "rounded-lg p-3 max-w-[85%]",
                  msg.role === "ai"
                    ? "bg-primary/5 border border-primary/20 text-left"
                    : "bg-primary text-white ml-auto"
                )}
              >
                <div className="flex items-start gap-2">
                  {msg.role === "ai" && (
                    <div className="h-6 w-6 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 flex items-center justify-center text-white text-xs flex-shrink-0">
                      AI
                    </div>
                  )}
                  <div className={cn(msg.role === "ai" ? "flex-1" : "text-right")}>
                    <p className="text-sm">{msg.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 输入区域 */}
        <div className="border-t border-border p-4">
          <div className="relative">
            <Input
              placeholder="输入关于视频的问题..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="pr-10"
            />
            <Button
              size="icon"
              onClick={handleSendMessage}
              className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            输入问题，AI助手将为您解答视频中的疑惑
          </p>
        </div>
      </div>
    </div>
  );
}