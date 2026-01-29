"use client";

import React from "react"
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Send,
  Search,
  Calendar,
  TrendingUp,
  Database,
  Upload,
  Bot,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  type: "user" | "ai";
  content: string;
  toolCard?: {
    title: string;
    description: string;
    buttonText: string;
    path?: string; // 添加跳转路径字段
  };
}

const initialMessages: Message[] = [
  {
    id: "1",
    type: "user",
    content: "帮我解释一下Transformer的注意力机制",
  },
  {
    id: "2",
    type: "ai",
    content: `注意力机制是Transformer架构的核心组成部分，它允许模型在处理序列时关注不同位置的信息。

**自注意力机制（Self-Attention）的工作原理：**

1. **Query、Key、Value矩阵**：输入序列首先被转换为三个矩阵 Q、K、V
2. **注意力分数计算**：通过 Q 和 K 的点积计算注意力权重
3. **Softmax归一化**：将分数转换为概率分布
4. **加权求和**：用注意力权重对 V 进行加权求和

公式表示为：Attention(Q,K,V) = softmax(QK^T/√d_k)V

这种机制使模型能够捕获长距离依赖关系，是现代NLP模型成功的关键因素。`,
  },
  {
    id: "3",
    type: "ai",
    content: "检测到您的问题涉及深度学习论文内容，推荐使用专业工具获取更深入的解析：",
    toolCard: {
      title: "【科研助手】文献解读",
      description: "这涉及文献深度解析，推荐使用科研助手的文献解读功能，可以帮助您快速理解Transformer原论文的核心内容",
      buttonText: "立即跳转",
      path: "/research?tool=interpret" // 添加跳转路径
    },
  },
];

const quickActions = [
  { icon: Calendar, label: "今日课程表" },
  { icon: TrendingUp, label: "学习进度" },
  { icon: Database, label: "历史记忆库" },
  { icon: Upload, label: "文件上传" },
];

export function ChatInterface() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputValue("");

    // 模拟AI响应，随机推荐工具
    setTimeout(() => {
      const tools = [
        {
          title: "【科研助手】文献检索",
          description: "推荐使用科研助手的文献检索功能，获取相关学术资料",
          buttonText: "立即跳转",
          path: "/research?tool=search"
        },
        {
          title: "【智能助教】课程学习",
          description: "这个问题适合在智能助教中进行系统性学习",
          buttonText: "立即跳转",
          path: "/assistant?module=course"
        },
        {
          title: "【科研助手】文献解读",
          description: "这个问题涉及深度解析，推荐使用文献解读功能",
          buttonText: "立即跳转",
          path: "/research?tool=interpret"
        },
        {
          title: "【智能图书馆】资源查找",
          description: "推荐在图书馆中查找相关资料",
          buttonText: "立即跳转",
          path: "/library"
        }
      ];

      const randomTool = tools[Math.floor(Math.random() * tools.length)];

      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: "收到您的问题，让我为您分析一下...",
        toolCard: randomTool
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  const handleToolJump = (path?: string) => {
    if (!path) return;

    console.log("🔄 跳转到:", path);
    try {
      router.push(path);
    } catch (error) {
      console.error("跳转失败:", error);
      // 备用方案：直接修改 window.location
      window.location.href = path;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex h-full flex-col bg-background">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-border px-6 py-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/70">
          <Bot className="h-5 w-5 text-primary-foreground" />
        </div>
        <div>
          <h1 className="font-semibold text-foreground">EduAI智能助手</h1>
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span className="text-sm text-muted-foreground">在线</span>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="mx-auto max-w-3xl space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex",
                message.type === "user" ? "justify-end" : "justify-start"
              )}
            >
              <div
                className={cn(
                  "max-w-[80%] rounded-2xl px-4 py-3",
                  message.type === "user"
                    ? "bg-[var(--user-bubble)] text-[var(--user-bubble-foreground)]"
                    : "bg-[var(--ai-bubble)] text-[var(--ai-bubble-foreground)]"
                )}
              >
                <p className="whitespace-pre-wrap text-sm leading-relaxed">
                  {message.content}
                </p>

                {/* Tool Card */}
                {message.toolCard && (
                  <div className="mt-4 overflow-hidden rounded-xl border border-border bg-gradient-to-br from-card to-card/80">
                    <div className="p-4">
                      <h3 className="font-semibold text-foreground">
                        {message.toolCard.title}
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {message.toolCard.description}
                      </p>
                      <button
                        onClick={() => handleToolJump(message.toolCard?.path)}
                        className="mt-4 flex items-center gap-2 rounded-lg bg-gradient-to-r from-primary to-primary/80 px-4 py-2 text-sm font-medium text-primary-foreground transition-all hover:opacity-90 active:scale-95"
                      >
                        {message.toolCard.buttonText}
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-border p-4">
        <div className="mx-auto max-w-3xl">
          {/* Quick Actions */}
          <div className="mb-3 flex flex-wrap gap-2">
            {quickActions.map((action) => (
              <button
                key={action.label}
                className="flex items-center gap-2 rounded-lg bg-secondary px-3 py-2 text-sm text-secondary-foreground transition-colors hover:bg-secondary/80"
              >
                <action.icon className="h-4 w-4" />
                {action.label}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="flex items-center gap-3 rounded-xl bg-card p-2">
            <div className="flex flex-1 items-center gap-3 rounded-lg bg-input px-4 py-3">
              <Search className="h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="向EduAI提问或输入指令..."
                className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
            </div>
            <button
              onClick={handleSend}
              className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-primary to-primary/80 text-primary-foreground transition-all hover:opacity-90"
              aria-label="发送"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}