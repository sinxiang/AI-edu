// components/library/AIChatPanel.tsx
import { useState, useRef, useEffect } from "react";
import { Brain, MessageSquare } from "lucide-react";
import { SearchPanel } from "./SearchPanel";

interface Message {
    id: string;
    role: 'user' | 'ai';
    content: string;
}

interface SearchHistoryItem {
    id: string;
    query: string;
    timestamp: string;
    resultCount: number;
}

interface AIChatPanelProps {
    messages: Message[];
    onSendMessage: (content: string) => void;
    aiInput: string;
    setAiInput: (value: string) => void;
    searchHistory: SearchHistoryItem[];
}

export function AIChatPanel({ messages, onSendMessage, aiInput, setAiInput, searchHistory }: AIChatPanelProps) {
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    const sendMessage = () => {
        if (!aiInput.trim()) return;
        onSendMessage(aiInput);
        setAiInput("");
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    const handleSearchClick = (query: string) => {
        setAiInput(query);
    };

    return (
        <div className="p-6 h-full overflow-y-auto">
            <div className="max-w-[1800px] mx-auto h-full flex flex-col">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-foreground mb-2">智能搜索助手</h1>
                    <p className="text-muted-foreground">用自然语言描述您的需求，AI将为您精确查找资源</p>
                </div>

                <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6">
                    <div className="lg:col-span-3">
                        <div className="rounded-2xl border border-border bg-card overflow-hidden h-full flex flex-col shadow-lg">
                            <div className="p-6 border-b border-border bg-gradient-to-r from-primary/5 to-purple-500/5">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center shadow-md">
                                        <Brain className="h-6 w-6 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-xl text-foreground">图书馆AI助手</h3>
                                        <p className="text-muted-foreground">智能推荐各类书籍资源，支持多轮对话</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                                        <span className="text-sm text-emerald-500">在线</span>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 flex-1 overflow-y-auto bg-gradient-to-b from-background to-muted/20">
                                <div className="space-y-6 max-w-5xl mx-auto">
                                    {messages.map((msg) => (
                                        <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                            <div className={`max-w-[90%] rounded-2xl p-5 shadow-sm ${msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground border border-border'}`}>
                                                <div className="whitespace-pre-wrap leading-relaxed text-[15px]">
                                                    {msg.content}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <div ref={messagesEndRef} />
                                </div>
                            </div>

                            <div className="p-6 border-t border-border bg-gradient-to-r from-background to-muted/10">
                                <div className="max-w-5xl mx-auto">
                                    <div className="flex gap-3">
                                        <div className="flex-1 relative">
                                            <textarea
                                                value={aiInput}
                                                onChange={(e) => setAiInput(e.target.value)}
                                                onKeyDown={handleKeyDown}
                                                placeholder="向AI助手提问，如：帮我找科幻小说推荐...（按Enter发送，Shift+Enter换行）"
                                                className="w-full p-4 bg-background border border-input rounded-xl pr-16 focus:outline-none focus:ring-2 focus:ring-ring text-[15px] min-h-[100px] resize-none"
                                                rows={3}
                                            />
                                            <button
                                                onClick={sendMessage}
                                                className="absolute right-3 bottom-3 p-2.5 bg-primary hover:opacity-90 text-primary-foreground rounded-lg transition-opacity shadow-md"
                                            >
                                                <MessageSquare className="h-5 w-5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <SearchPanel
                            searchHistory={searchHistory}
                            onSearchClick={handleSearchClick}
                            onSetAiInput={setAiInput}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}