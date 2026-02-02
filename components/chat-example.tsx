"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
    Send, Paperclip, Bot, User, FlaskConical, GraduationCap, BookOpen,
    ExternalLink, ChevronRight, Sparkles, Brain, FileText, Lightbulb
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
    id: string;
    type: 'user' | 'ai';
    content: string;
    timestamp: string;
    toolRecommendation?: {
        id: string;
        name: string;
        icon: React.ReactNode;
        description: string;
        color: string;
        path: string;
    };
}

export function ChatExample() {
    const router = useRouter();
    const [inputValue, setInputValue] = useState("");
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "1",
            type: 'user',
            content: '你好，我想了解Transformer模型的注意力机制，你能详细解释一下吗？',
            timestamp: '昨天 14:30'
        },
        {
            id: "2",
            type: 'ai',
            content: '当然可以。注意力机制是Transformer模型的核心创新，它允许模型在处理序列数据时，根据输入的不同部分分配不同的重要性权重。\n\n主要特点：\n1. **自注意力**：计算序列内部元素之间的关系\n2. **多头注意力**：并行多个注意力头，捕捉不同子空间信息\n3. **缩放点积注意力**：使用点积计算相似度，并进行缩放防止梯度消失\n\n您想了解哪个具体方面？',
            timestamp: '昨天 14:31'
        },
        {
            id: "3",
            type: 'user',
            content: '我想知道多头注意力具体是如何工作的，以及为什么它比单一注意力更好？',
            timestamp: '昨天 14:32'
        },
        {
            id: "4",
            type: 'ai',
            content: '很好的问题！多头注意力将输入投影到不同的子空间，每个"头"学习不同的表示模式。\n\n**工作原理**：\n1. 将Query、Key、Value矩阵线性投影h次（h个头）\n2. 每个头独立计算缩放点积注意力\n3. 将所有头的输出拼接\n4. 最后进行一次线性投影\n\n**优势**：\n• 允许模型同时关注不同位置的表示子空间\n• 增强模型的表示能力\n• 类似于CNN中的多滤波器概念\n\n不过要深入理解，我建议您查看相关的学术论文。',
            timestamp: '昨天 14:33',
            toolRecommendation: {
                id: 'research-1',
                name: '科研助手',
                icon: <FlaskConical className="h-5 w-5" />,
                description: '文献深度解析与论文查找',
                color: 'from-purple-500 to-pink-500',
                path: '/research?query=transformer+attention'
            }
        },
        {
            id: "5",
            type: 'user',
            content: '那在实际教学中，如何向本科生讲解这个概念呢？有没有合适的教学材料推荐？',
            timestamp: '昨天 14:35'
        },
        {
            id: "6",
            type: 'ai',
            content: '对于本科生教学，我建议：\n\n**教学策略**：\n1. 先从直观类比开始（如阅读时关注重点句子）\n2. 可视化注意力权重分布\n3. 使用简化示例代码\n4. 对比传统RNN/CNN的局限性\n\n**教学材料**：\n• The Illustrated Transformer（经典可视化教程）\n• Attention Is All You Need论文简化版\n• 动手实现一个迷你Transformer\n\n我可以为您生成一份详细的教学大纲和示例代码。',
            timestamp: '昨天 14:36',
            toolRecommendation: {
                id: 'assistant-1',
                name: '智能助教',
                icon: <GraduationCap className="h-5 w-5" />,
                description: '教学材料生成与课程设计',
                color: 'from-blue-500 to-cyan-500',
                path: '/assistant?task=teaching_materials&topic=transformer'
            }
        }
    ]);
    const [isTyping, setIsTyping] = useState(false);
    const [currentChatTitle] = useState("注意力机制讨论");

    const handleSend = () => {
        if (!inputValue.trim()) return;

        const newMessage: Message = {
            id: Date.now().toString(),
            type: 'user',
            content: inputValue,
            timestamp: '刚刚'
        };

        setMessages([...messages, newMessage]);
        setInputValue("");
        setIsTyping(true);

        // 模拟AI回复
        setTimeout(() => {
            const toolRecommendations = [
                {
                    id: 'library-1',
                    name: '智能图书馆',
                    icon: <BookOpen className="h-5 w-5" />,
                    description: '查找相关教材和学术资源',
                    color: 'from-emerald-500 to-teal-500',
                    path: '/library?search=transformer+teaching'
                },
                {
                    id: 'research-2',
                    name: '科研助手',
                    icon: <FlaskConical className="h-5 w-5" />,
                    description: '最新研究成果和论文分析',
                    color: 'from-purple-500 to-pink-500',
                    path: '/research?query=attention+mechanism+teaching'
                }
            ];

            const randomTool = toolRecommendations[Math.floor(Math.random() * toolRecommendations.length)];

            const aiReply: Message = {
                id: (Date.now() + 1).toString(),
                type: 'ai',
                content: `我理解您想了解"${inputValue}"。这是一个很专业的教学问题，涉及到具体的课程设计和教学方法论。为了更好地帮助您，我建议使用专门的工具来获取更系统化的支持。`,
                timestamp: '刚刚',
                toolRecommendation: randomTool
            };

            setMessages(prev => [...prev, aiReply]);
            setIsTyping(false);
        }, 1500);
    };

    const handleToolJump = (path: string) => {
        console.log('跳转到:', path);
        // 在实际应用中，这里可以添加跳转前的确认或数据保存逻辑
        router.push(path);
    };

    const quickPrompts = [
        "多头注意力的数学公式是什么？",
        "Transformer在NLP中的具体应用有哪些？",
        "生成一份关于注意力机制的教学PPT大纲",
        "对比RNN、CNN和Transformer的优缺点"
    ];

    return (
        <div className="flex h-full flex-col bg-background">
            {/* 对话头部 */}
            <div className="border-b border-border/50">
                <div className="flex items-center justify-between px-8 py-4">
                    <div className="flex items-center gap-3">
                        <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                        <div>
                            <h1 className="text-lg font-semibold text-foreground">{currentChatTitle}</h1>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <span>持续对话中</span>
                                <span>•</span>
                                <span>{messages.length} 条消息</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="flex -space-x-2">
                            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-purple-400 border-2 border-background" />
                            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 border-2 border-background" />
                        </div>
                    </div>
                </div>
            </div>

            {/* 对话主体 */}
            <div className="flex-1 overflow-y-auto p-4 md:p-8">
                <div className="mx-auto max-w-3xl space-y-8">
                    {messages.map((message) => (
                        <div key={message.id} className={cn(
                            "group relative",
                            message.type === 'user' ? "ml-auto" : "mr-auto"
                        )}>
                            {/* 用户消息 */}
                            {message.type === 'user' && (
                                <div className="flex max-w-[85%] ml-auto">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1 ml-auto justify-end">
                                            <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                                            <User className="h-4 w-4 text-primary" />
                                        </div>
                                        <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-5 py-4 rounded-[22px] rounded-tr-none shadow-lg">
                                            <p className="text-[15px] leading-relaxed whitespace-pre-wrap">{message.content}</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* AI消息 */}
                            {message.type === 'ai' && (
                                <div className="flex max-w-[85%]">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <Bot className="h-4 w-4 text-emerald-500" />
                                            <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                                        </div>
                                        <div className="bg-muted/80 border border-border/50 px-5 py-4 rounded-[22px] rounded-tl-none backdrop-blur-sm">
                                            <div className="text-[15px] leading-relaxed whitespace-pre-wrap text-foreground">
                                                {message.content}
                                            </div>

                                            {/* 工具推荐 */}
                                            {message.toolRecommendation && (
                                                <div className="mt-6 p-4 bg-gradient-to-br from-background to-card rounded-xl border border-primary/20 shadow-sm">
                                                    <div className="flex items-start gap-3 mb-4">
                                                        <div className={cn(
                                                            "p-2 rounded-lg bg-gradient-to-br",
                                                            message.toolRecommendation.color
                                                        )}>
                                                            {message.toolRecommendation.icon}
                                                        </div>
                                                        <div className="flex-1">
                                                            <div className="flex items-center gap-2">
                                                                <Sparkles className="h-4 w-4 text-primary" />
                                                                <h3 className="font-semibold text-foreground">推荐使用：{message.toolRecommendation.name}</h3>
                                                            </div>
                                                            <p className="text-sm text-muted-foreground mt-1">
                                                                {message.toolRecommendation.description}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() => handleToolJump(message.toolRecommendation!.path)}
                                                            className={cn(
                                                                "flex-1 py-2.5 rounded-lg font-medium transition-all hover:opacity-90 active:scale-[0.98]",
                                                                "bg-gradient-to-r text-white flex items-center justify-center gap-2",
                                                                message.toolRecommendation.color
                                                            )}
                                                        >
                                                            立即跳转
                                                            <ExternalLink className="h-4 w-4" />
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                // 复制当前对话上下文
                                                                const context = messages
                                                                    .slice(-3)
                                                                    .map(m => `${m.type === 'user' ? '用户' : 'AI'}: ${m.content}`)
                                                                    .join('\n\n');
                                                                navigator.clipboard.writeText(context);
                                                            }}
                                                            className="px-4 py-2.5 bg-muted hover:bg-accent text-foreground rounded-lg font-medium transition-colors"
                                                        >
                                                            复制上下文
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}

                    {/* 打字指示器 */}
                    {isTyping && (
                        <div className="flex max-w-[85%]">
                            <div className="bg-muted/80 border border-border/50 px-5 py-4 rounded-[22px] rounded-tl-none">
                                <div className="flex items-center gap-2">
                                    <div className="flex gap-1">
                                        <div className="h-2 w-2 bg-primary/60 rounded-full animate-bounce" />
                                        <div className="h-2 w-2 bg-primary/60 rounded-full animate-bounce delay-100" />
                                        <div className="h-2 w-2 bg-primary/60 rounded-full animate-bounce delay-200" />
                                    </div>
                                    <span className="text-sm text-muted-foreground">思考中...</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* 快捷提问 */}
            <div className="px-4 md:px-8 pt-4">
                <div className="mx-auto max-w-3xl">
                    <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
                        {quickPrompts.map((prompt, index) => (
                            <button
                                key={index}
                                onClick={() => {
                                    setInputValue(prompt);
                                    // 自动聚焦到输入框
                                    document.querySelector('input')?.focus();
                                }}
                                className="flex-shrink-0 px-4 py-2 bg-secondary/50 hover:bg-secondary border border-border/50 rounded-full text-sm text-foreground/80 hover:text-foreground transition-colors"
                            >
                                {prompt}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* 输入区域 */}
            <div className="p-4 md:p-8 border-t border-border/50">
                <div className="mx-auto max-w-3xl">
                    <div className="flex items-center gap-3 bg-card border border-border/60 rounded-2xl p-1.5 shadow-sm">
                        <button className="p-2.5 text-muted-foreground hover:text-foreground transition-colors rounded-xl hover:bg-accent">
                            <Paperclip className="h-5 w-5" />
                        </button>

                        <input
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="继续对话...（输入 / 获取帮助）"
                            className="flex-1 bg-transparent border-none text-[15px] focus:outline-none px-2 placeholder:text-muted-foreground/60"
                        />

                        <button
                            onClick={handleSend}
                            disabled={!inputValue.trim() || isTyping}
                            className={cn(
                                "p-2.5 rounded-xl transition-all",
                                inputValue.trim() && !isTyping
                                    ? "bg-gradient-to-r from-primary to-purple-500 text-primary-foreground hover:opacity-90"
                                    : "bg-muted text-muted-foreground cursor-not-allowed"
                            )}
                        >
                            <Send className="h-5 w-5" />
                        </button>
                    </div>

                    {/* 底部提示 */}
                    <div className="mt-3 flex items-center justify-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                            <Lightbulb className="h-3 w-3" />
                            <span>对话将推荐相关工具</span>
                        </div>
                        <div className="h-1 w-1 rounded-full bg-border" />
                        <div className="flex items-center gap-1.5">
                            <Brain className="h-3 w-3" />
                            <span>基于上下文理解</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}