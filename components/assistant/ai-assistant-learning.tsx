// /components/assistant/ai-assistant-learning.tsx
"use client";

import { useState } from "react";
import { Bot, Send, Image as ImageIcon, Paperclip, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { SubModule } from "@/components/assistant/learning-sidebar";

// 导入你创建的组件
import { QnA } from "./qna";
import { StudyPlan } from "./study-plan";

interface Message {
    id: string;
    content: string;
    sender: "user" | "ai";
    timestamp: Date;
}

interface AiAssistantLearningProps {
    subModule: SubModule;
}

const INITIAL_MESSAGES: Message[] = [
    {
        id: "1",
        content: "你好！我是你的AI助学小帮手，专门为你的《机器学习导论》课程提供学习支持。\n\n我可以帮助你解答问题、制定学习计划、分析知识掌握情况。今天有什么可以帮助你的？",
        sender: "ai",
        timestamp: new Date(Date.now() - 3600000)
    },
    {
        id: "2",
        content: "可以帮我解释一下梯度下降算法吗？",
        sender: "user",
        timestamp: new Date(Date.now() - 1800000)
    }
];

const SUGGESTED_QUESTIONS = [
    "帮我制定本周的学习计划",
    "解释一下反向传播算法",
    "监督学习和无监督学习的主要区别是什么？",
    "如何选择合适的损失函数？"
];

function ChatInterface() {
    const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSendMessage = () => {
        if (!input.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            content: input,
            sender: "user",
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInput("");
        setIsLoading(true);

        // 模拟AI回复
        setTimeout(() => {
            const aiMessage: Message = {
                id: (Date.now() + 1).toString(),
                content: `我已经收到你的问题："${input}"。这是一个很好的问题！\n\n让我为你详细解答...\n（实际应用中会调用AI接口生成详细的答案）`,
                sender: "ai",
                timestamp: new Date()
            };
            setMessages(prev => [...prev, aiMessage]);
            setIsLoading(false);
        }, 1500);
    };

    const handleQuickQuestion = (question: string) => {
        setInput(question);
    };

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className="flex h-full flex-col">
            {/* 聊天头 */}
            <div className="border-b border-border p-4">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-purple-500">
                        <Bot className="h-5 w-5 text-white" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-foreground">AI助学小帮手</h3>
                        <p className="text-xs text-muted-foreground">在线 · 响应时间0.8s</p>
                    </div>
                </div>
            </div>

            {/* 消息区域 */}
            <div className="flex-1 overflow-y-auto p-4">
                <div className="mx-auto max-w-3xl space-y-4">
                    {messages.map((message) => (
                        <div
                            key={message.id}
                            className={cn(
                                "flex gap-3",
                                message.sender === "user" ? "flex-row-reverse" : "flex-row"
                            )}
                        >
                            <div className={cn(
                                "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                                message.sender === "user"
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-gradient-to-br from-primary/20 to-purple-500/20 text-primary"
                            )}>
                                {message.sender === "user" ? "你" : <Bot className="h-4 w-4" />}
                            </div>

                            <div className={cn(
                                "max-w-[70%] rounded-2xl p-4",
                                message.sender === "user"
                                    ? "bg-primary text-primary-foreground rounded-tr-none"
                                    : "bg-card border border-border rounded-tl-none"
                            )}>
                                <div className="whitespace-pre-wrap text-sm leading-relaxed">
                                    {message.content}
                                </div>
                                <div className={cn(
                                    "mt-2 text-xs",
                                    message.sender === "user" ? "text-primary-foreground/70" : "text-muted-foreground"
                                )}>
                                    {formatTime(message.timestamp)}
                                </div>
                            </div>
                        </div>
                    ))}

                    {isLoading && (
                        <div className="flex gap-3">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-purple-500/20 text-primary">
                                <Bot className="h-4 w-4" />
                            </div>
                            <div className="rounded-2xl rounded-tl-none bg-card border border-border p-4">
                                <div className="flex items-center gap-2">
                                    <div className="h-2 w-2 animate-pulse rounded-full bg-primary"></div>
                                    <div className="h-2 w-2 animate-pulse rounded-full bg-primary" style={{ animationDelay: "0.2s" }}></div>
                                    <div className="h-2 w-2 animate-pulse rounded-full bg-primary" style={{ animationDelay: "0.4s" }}></div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* 快捷问题区域 */}
            <div className="border-t border-border p-3">
                <div className="mx-auto max-w-3xl">
                    <p className="mb-2 text-xs font-medium text-muted-foreground">快捷提问：</p>
                    <div className="flex flex-wrap gap-2">
                        {SUGGESTED_QUESTIONS.map((question, index) => (
                            <button
                                key={index}
                                onClick={() => handleQuickQuestion(question)}
                                className="rounded-full border border-border bg-card px-3 py-1.5 text-xs hover:bg-secondary transition-colors"
                            >
                                {question}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* 输入区域 */}
            <div className="border-t border-border p-4">
                <div className="mx-auto max-w-3xl">
                    <div className="flex items-end gap-2">
                        <div className="flex-1">
                            <textarea
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" && !e.shiftKey) {
                                        e.preventDefault();
                                        handleSendMessage();
                                    }
                                }}
                                placeholder="输入你的问题..."
                                className="min-h-[60px] w-full resize-none rounded-lg border border-border bg-card p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                                rows={1}
                            />
                        </div>

                        <div className="flex items-center gap-1">
                            <button className="rounded-lg p-2 hover:bg-secondary transition-colors">
                                <ImageIcon className="h-5 w-5 text-muted-foreground" />
                            </button>

                            <button
                                onClick={handleSendMessage}
                                disabled={!input.trim()}
                                className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-primary to-purple-500 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
                            >
                                <Send className="h-5 w-5" />
                            </button>
                        </div>
                    </div>

                    <div className="mt-2 text-xs text-muted-foreground">
                        按 Enter 发送，Shift + Enter 换行
                    </div>
                </div>
            </div>
        </div>
    );
}

// 删除原有的StudyPlanInterface和QnAInterface函数，直接导入你创建的文件

export function AiAssistantLearning({ subModule }: AiAssistantLearningProps) {
    return (
        <div className="h-full overflow-hidden bg-background">
            {subModule === "chat" && <ChatInterface />}
            {subModule === "study-plan" && <StudyPlan />}
            {subModule === "qna" && <QnA />}
        </div>
    );
}