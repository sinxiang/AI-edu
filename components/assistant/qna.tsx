// components/assistant/qna.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
    MessageCircle,
    Send,
    Brain,
    Sparkles,
    BookOpen,
    Search,
    ThumbsUp,
    ThumbsDown,
    Copy,
    Share2,
    Clock,
    User,
    Bot,
    Zap,
    Lightbulb,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: string;
    liked?: boolean;
    disliked?: boolean;
}

interface Question {
    id: string;
    question: string;
    answer: string;
    topic: string;
    likes: number;
    timestamp: string;
}

export function QnA() {
    const [input, setInput] = useState("");
    const [isThinking, setIsThinking] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const [messages, setMessages] = useState<Message[]>([
        {
            id: "1",
            role: 'assistant',
            content: "您好！我是AI学习助手，可以帮您解答学习中的各种问题。\n\n我可以：\n• 解释复杂的概念和公式\n• 提供学习方法和技巧\n• 解答作业和编程问题\n• 推荐学习资源和路径\n\n请随时问我任何问题！",
            timestamp: "刚刚",
        }
    ]);

    const [popularQuestions, setPopularQuestions] = useState<Question[]>([
        {
            id: "1",
            question: "反向传播算法中的梯度消失问题如何解决？",
            answer: "可以通过使用ReLU激活函数、批归一化、残差连接、梯度裁剪等方法解决...",
            topic: "深度学习",
            likes: 24,
            timestamp: "今天"
        },
        {
            id: "2",
            question: "Transformer模型中的注意力机制具体是如何工作的？",
            answer: "注意力机制通过计算查询、键、值之间的关系权重，实现信息的聚焦...",
            topic: "自然语言处理",
            likes: 18,
            timestamp: "昨天"
        },
        {
            id: "3",
            question: "如何选择合适的机器学习算法？",
            answer: "需要考虑数据特征、问题类型、数据量、可解释性要求等因素...",
            topic: "机器学习",
            likes: 32,
            timestamp: "今天"
        },
        {
            id: "4",
            question: "Python中生成器和迭代器有什么区别？",
            answer: "生成器是一种特殊的迭代器，使用yield关键字，可以延迟计算...",
            topic: "编程基础",
            likes: 15,
            timestamp: "2天前"
        },
    ]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = () => {
        if (!input.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: input,
            timestamp: "刚刚"
        };

        setMessages(prev => [...prev, userMessage]);
        setInput("");
        setIsThinking(true);

        // 模拟AI思考
        setTimeout(() => {
            const responses = [
                `针对您的问题"${input}"，我的分析如下：

1. **核心概念**：这个问题涉及到...
2. **关键要点**：需要重点关注...
3. **常见误区**：学习者常犯的错误是...
4. **学习建议**：建议您...

是否需要我进一步详细解释某个方面？`,

                `这个问题很有深度！让我为您详细解答：

**理论部分**：
• 基础原理：...
• 数学推导：...

**实践应用**：
• 代码示例：...
• 应用场景：...

**进阶学习**：
• 相关论文：...
• 扩展阅读：...`,

                `从您的提问可以看出，您对${input.includes("如何") ? "实践方法" : "理论知识"}很感兴趣。

首先，理解这个问题需要掌握三个关键点：
1. ...
2. ...
3. ...

让我通过一个生动的例子来说明：...`
            ];

            const aiResponse: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: responses[Math.floor(Math.random() * responses.length)],
                timestamp: "刚刚"
            };

            setMessages(prev => [...prev, aiResponse]);
            setIsThinking(false);
        }, 1500);
    };

    const handleLike = (messageId: string) => {
        setMessages(messages.map(msg =>
            msg.id === messageId
                ? { ...msg, liked: !msg.liked, disliked: false }
                : msg
        ));
    };

    const handleDislike = (messageId: string) => {
        setMessages(messages.map(msg =>
            msg.id === messageId
                ? { ...msg, disliked: !msg.disliked, liked: false }
                : msg
        ));
    };

    return (
        <div className="h-full overflow-hidden flex flex-col">
            <div className="flex-1 flex min-h-0">
                {/* 左侧：聊天问答 */}
                <div className="flex-1 flex flex-col min-h-0 border-r">
                    {/* 头部 */}
                    <div className="border-b p-4">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/70">
                                <Brain className="h-5 w-5 text-white" />
                            </div>
                            <div>
                                <h2 className="font-semibold text-lg">AI 智能问答助手</h2>
                                <p className="text-sm text-muted-foreground">随时解答您的学习问题</p>
                            </div>
                        </div>
                    </div>

                    {/* 消息区域 */}
                    <div className="flex-1 overflow-y-auto p-4">
                        <div className="space-y-4">
                            {messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={cn(
                                        "flex gap-3 max-w-[80%]",
                                        message.role === 'user' ? "ml-auto" : ""
                                    )}
                                >
                                    {message.role === 'assistant' && (
                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/70 flex-shrink-0">
                                            <Bot className="h-4 w-4 text-white" />
                                        </div>
                                    )}

                                    <div
                                        className={cn(
                                            "rounded-2xl px-4 py-3",
                                            message.role === 'user'
                                                ? "bg-primary text-primary-foreground"
                                                : "bg-muted"
                                        )}
                                    >
                                        <div className="whitespace-pre-wrap">{message.content}</div>

                                        <div className={cn(
                                            "flex items-center justify-between mt-2 text-xs",
                                            message.role === 'user' ? "text-primary-foreground/70" : "text-muted-foreground"
                                        )}>
                                            <span className="flex items-center gap-1">
                                                <Clock className="h-3 w-3" />
                                                {message.timestamp}
                                            </span>

                                            {message.role === 'assistant' && (
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={() => handleLike(message.id)}
                                                        className={cn(
                                                            "hover:text-primary transition-colors",
                                                            message.liked && "text-primary"
                                                        )}
                                                    >
                                                        <ThumbsUp className="h-3 w-3" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDislike(message.id)}
                                                        className={cn(
                                                            "hover:text-destructive transition-colors",
                                                            message.disliked && "text-destructive"
                                                        )}
                                                    >
                                                        <ThumbsDown className="h-3 w-3" />
                                                    </button>
                                                    <button className="hover:text-muted-foreground transition-colors">
                                                        <Copy className="h-3 w-3" />
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {message.role === 'user' && (
                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted flex-shrink-0">
                                            <User className="h-4 w-4 text-muted-foreground" />
                                        </div>
                                    )}
                                </div>
                            ))}

                            {isThinking && (
                                <div className="flex gap-3 max-w-[80%]">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/70 flex-shrink-0">
                                        <Bot className="h-4 w-4 text-white" />
                                    </div>
                                    <div className="rounded-2xl px-4 py-3 bg-muted">
                                        <div className="flex items-center gap-2">
                                            <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                                            <div className="h-2 w-2 rounded-full bg-primary animate-pulse delay-150" />
                                            <div className="h-2 w-2 rounded-full bg-primary animate-pulse delay-300" />
                                            <span className="text-sm text-muted-foreground">AI正在思考中...</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>
                    </div>

                    {/* 输入区域 */}
                    <div className="border-t p-4">
                        <div className="flex gap-2">
                            <Textarea
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="输入您的问题，例如：什么是梯度下降？如何实现一个简单的神经网络？"
                                className="flex-1 resize-none min-h-[80px]"
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault();
                                        handleSend();
                                    }
                                }}
                            />
                            <div className="flex flex-col gap-2">
                                <Button
                                    onClick={handleSend}
                                    disabled={!input.trim() || isThinking}
                                    className="h-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                                >
                                    <Send className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setInput("解释一下机器学习和深度学习的区别")}
                                    className="text-xs"
                                >
                                    示例问题
                                </Button>
                            </div>
                        </div>

                        {/* 快捷问题 */}
                        <div className="flex flex-wrap gap-2 mt-3">
                            <Button
                                variant="secondary"
                                size="sm"
                                onClick={() => setInput("什么是过拟合？如何避免？")}
                            >
                                过拟合问题
                            </Button>
                            <Button
                                variant="secondary"
                                size="sm"
                                onClick={() => setInput("Python中lambda函数的使用场景？")}
                            >
                                Lambda函数
                            </Button>
                            <Button
                                variant="secondary"
                                size="sm"
                                onClick={() => setInput("解释一下Transformer的自注意力机制")}
                            >
                                Transformer
                            </Button>
                            <Button
                                variant="secondary"
                                size="sm"
                                onClick={() => setInput("推荐学习深度学习的路径")}
                            >
                                学习路径
                            </Button>
                        </div>
                    </div>
                </div>

                {/* 右侧：热门问题和功能 */}
                <div className="w-80 flex flex-col min-h-0 border-l">
                    <div className="border-b p-4">
                        <div className="flex items-center gap-2">
                            <Zap className="h-5 w-5 text-primary" />
                            <h3 className="font-semibold">热门问答</h3>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">其他学习者常问的问题</p>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4">
                        <div className="space-y-4">
                            {popularQuestions.map((question) => (
                                <Card key={question.id} className="hover:shadow-sm transition-shadow cursor-pointer">
                                    <CardContent className="p-4">
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                                                    {question.topic}
                                                </span>
                                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                                    <ThumbsUp className="h-3 w-3" />
                                                    {question.likes}
                                                </div>
                                            </div>

                                            <div className="font-medium text-sm">{question.question}</div>

                                            <div className="text-xs text-muted-foreground line-clamp-2">
                                                {question.answer}
                                            </div>

                                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                                                <span>{question.timestamp}</span>
                                                <div className="flex items-center gap-2">
                                                    <button className="hover:text-primary">
                                                        <Copy className="h-3 w-3" />
                                                    </button>
                                                    <button className="hover:text-primary">
                                                        <Share2 className="h-3 w-3" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>

                    {/* AI 特色功能 */}
                    <div className="border-t p-4 space-y-3">
                        <div className="flex items-center gap-2">
                            <Lightbulb className="h-5 w-5 text-primary" />
                            <h4 className="font-semibold">AI 特色功能</h4>
                        </div>

                        <div className="space-y-2">
                            <Button variant="outline" className="w-full justify-start text-sm">
                                <Search className="mr-2 h-4 w-4" />
                                题目拍照解答
                            </Button>
                            <Button variant="outline" className="w-full justify-start text-sm">
                                <BookOpen className="mr-2 h-4 w-4" />
                                知识点图谱生成
                            </Button>
                            <Button variant="outline" className="w-full justify-start text-sm">
                                <Sparkles className="mr-2 h-4 w-4" />
                                错题智能分析
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}