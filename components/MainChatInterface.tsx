"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Send, Search, FileUp, Calendar, BarChart3, History } from "lucide-react";
import { cn } from "@/lib/utils";

export default function MainChatInterface() {
    const router = useRouter();
    const [messages, setMessages] = useState([
        {
            id: 1,
            role: 'user',
            content: '帮我解释一下Transformer的注意力机制'
        },
        {
            id: 2,
            role: 'assistant',
            content: '注意力机制是Transformer的核心组件，它通过计算Query、Key、Value之间的关系来动态分配权重...',
            toolRecommendation: null
        },
        {
            id: 3,
            role: 'assistant',
            content: '这个问题涉及较深的数学推导和文献参考，我推荐您使用【科研助手】进行深度分析。',
            toolRecommendation: {
                id: 'research-interpret',
                name: '科研助手',
                icon: '🔬',
                description: '文献深度解析与论文写作',
                color: 'from-primary to-purple-400',
                path: '/research?tool=interpret'
            }
        }
    ]);
    const [inputValue, setInputValue] = useState('');

    const handleToolJump = (toolPath: string) => {
        console.log('🎯 跳转按钮被点击！');
        console.log('📝 目标路径:', toolPath);

        // 添加验证
        if (!toolPath || !toolPath.startsWith('/')) {
            console.error('❌ 路径格式错误:', toolPath);
            return;
        }

        // 跳转到对应工具页面
        try {
            router.push(toolPath);
            console.log('✅ 跳转成功');
        } catch (error) {
            console.error('❌ 跳转失败:', error);
            // 备用方案：直接修改 URL
            window.location.href = toolPath;
        }
    };

    const sendMessage = () => {
        if (!inputValue.trim()) return;

        const newMessage = {
            id: messages.length + 1,
            role: 'user' as const,
            content: inputValue
        };

        setMessages([...messages, newMessage]);
        setInputValue('');

        // 模拟AI回复
        setTimeout(() => {
            // 随机生成工具推荐
            const tools = [
                {
                    id: 'research-search',
                    name: '科研助手',
                    icon: '🔍',
                    description: '文献检索与发现',
                    color: 'from-primary to-purple-400',
                    path: '/research?tool=search'
                },
                {
                    id: 'assistant-homework',
                    name: '智能助教',
                    icon: '🎓',
                    description: '作业辅导与练习',
                    color: 'from-emerald-500 to-teal-500',
                    path: '/assistant?module=homework'
                },
                {
                    id: 'library-search',
                    name: '智能图书馆',
                    icon: '📚',
                    description: '学术资源查找',
                    color: 'from-blue-500 to-cyan-500',
                    path: '/library'
                }
            ];

            const randomTool = tools[Math.floor(Math.random() * tools.length)];

            const aiReply = {
                id: messages.length + 2,
                role: 'assistant' as const,
                content: '我已经收到您的问题，这可能需要使用专业工具进行深入分析。',
                toolRecommendation: randomTool
            };
            setMessages(prev => [...prev, aiReply]);
        }, 1000);
    };

    return (
        <div className="flex-1 flex flex-col border-x border-border">
            {/* AI助手标识 */}
            <div className="p-4 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-primary to-purple-400 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">AI</span>
                    </div>
                    <div>
                        <h1 className="font-bold text-xl text-card-foreground">EduAI 智能助手</h1>
                        <div className="text-sm text-muted-foreground">在线 · 可访问您的学习数据</div>
                    </div>
                </div>
                <div className="text-sm text-muted-foreground">响应时间：&lt;1s</div>
            </div>

            {/* 对话区域 */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={cn(
                            "max-w-2xl rounded-2xl p-4",
                            msg.role === 'user'
                                ? "bg-gradient-to-r from-primary to-purple-400 text-primary-foreground"
                                : "bg-card text-card-foreground border border-border"
                        )}>
                            <div className="whitespace-pre-wrap">{msg.content}</div>

                            {msg.toolRecommendation && (
                                <div className="mt-4 p-4 bg-card/50 rounded-xl border border-border">
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="text-2xl">{msg.toolRecommendation.icon}</span>
                                        <div className="flex-1">
                                            <div className="font-bold text-card-foreground">【{msg.toolRecommendation.name}】</div>
                                            <div className="text-sm text-muted-foreground">{msg.toolRecommendation.description}</div>
                                        </div>
                                    </div>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            e.preventDefault();
                                            console.log('🖱️ 按钮被点击');
                                            handleToolJump(msg.toolRecommendation!.path);
                                        }}
                                        className={cn(
                                            "w-full py-2 rounded-lg font-medium hover:opacity-90 transition-opacity active:scale-95",
                                            `bg-gradient-to-r ${msg.toolRecommendation.color} text-white`
                                        )}
                                    >
                                        立即跳转
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* 输入区域 */}
            <div className="p-4 border-t border-border">
                <div className="flex gap-2 mb-3 overflow-x-auto">
                    {[
                        { icon: Calendar, label: '课程表' },
                        { icon: BarChart3, label: '学习进度' },
                        { icon: History, label: '历史记忆' },
                        { icon: FileUp, label: '文件上传' },
                    ].map((item, index) => (
                        <button
                            key={index}
                            className="flex items-center gap-2 px-3 py-1.5 bg-muted hover:bg-accent text-muted-foreground hover:text-card-foreground rounded-lg text-sm whitespace-nowrap transition-colors"
                        >
                            <item.icon className="w-4 h-4" />
                            {item.label}
                        </button>
                    ))}
                </div>

                <div className="flex gap-3">
                    <div className="flex-1 relative">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                            placeholder="向EduAI提问或输入指令..."
                            className="w-full p-4 bg-background border border-input rounded-xl pl-12 focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
                    </div>
                    <button
                        onClick={sendMessage}
                        className="px-6 bg-gradient-to-r from-primary to-purple-400 hover:opacity-90 text-primary-foreground rounded-xl font-medium flex items-center gap-2"
                    >
                        <Send size={20} /> 发送
                    </button>
                </div>
            </div>

            {/* 测试按钮 */}
            <div className="fixed bottom-20 right-4 z-50 space-y-2">
                <button
                    onClick={() => {
                        console.log('测试按钮1点击');
                        router.push('/research');
                    }}
                    className="px-3 py-1 bg-red-500 text-white text-sm rounded shadow-lg"
                >
                    测试跳转科研
                </button>
                <button
                    onClick={() => {
                        console.log('测试按钮2点击');
                        router.push('/library');
                    }}
                    className="px-3 py-1 bg-blue-500 text-white text-sm rounded shadow-lg"
                >
                    测试跳转图书馆
                </button>
            </div>
        </div>
    );
}