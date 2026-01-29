// app/library/page.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { TopNavbar } from "@/components/top-navbar";
import { Sidebar } from "@/components/library/Sidebar";
import { AIChatPanel } from "@/components/library/AIChatPanel";
import { DiscoverPanel } from "@/components/library/DiscoverPanel";
import { ReadingPanel } from "@/components/library/ReadingPanel";
import { ProfilePanel } from "@/components/library/ProfilePanel";
import { Menu, BookText, Globe, Sparkles, TrendingUp, BookOpen, User } from "lucide-react";

export default function LibraryPage() {
    const [activeTab, setActiveTab] = useState<"search" | "discover" | "reading" | "profile">("search");
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);
    const [selectedText, setSelectedText] = useState("");
    const [aiMessages, setAiMessages] = useState<Message[]>([
        { id: "1", role: 'ai', content: "您好！我是图书馆AI助手，可以帮您：\n\n1. 📚 智能推荐相关书籍（学术、小说、文学等）\n2. 🔍 精准查找各类资源\n3. 📖 辅助深度阅读与理解\n4. 📝 整理读书笔记\n\n请告诉我您的需求。" }
    ]);
    const [noteInput, setNoteInput] = useState("");
    const [aiInput, setAiInput] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string | "all">("all");
    const [showReadingAssistant, setShowReadingAssistant] = useState(true);

    // 使用 refs 来滚动到最新的消息
    const aiMessagesEndRef = useRef<HTMLDivElement>(null);

    // 滚动到最新的 AI 消息
    useEffect(() => {
        if (aiMessagesEndRef.current && activeTab === "search") {
            aiMessagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [aiMessages, activeTab]);

    // 定义类型
    interface Message {
        id: string;
        role: 'user' | 'ai';
        content: string;
    }

    interface Book {
        id: string;
        title: string;
        author: string;
        category: string;
        type: 'academic' | 'fiction' | 'literature' | 'science' | 'biography' | 'self-help';
        rating: number;
        readCount: number;
        coverColor: string;
        progress?: number;
        tags: string[];
    }

    interface ReadingNote {
        id: string;
        content: string;
        timestamp: string;
        bookId: string;
    }

    interface SearchHistoryItem {
        id: string;
        query: string;
        timestamp: string;
        resultCount: number;
    }

    interface Category {
        id: string;
        name: string;
        icon: React.ReactNode;
    }

    // 示例数据
    const books: Book[] = [
        { id: "1", title: "深度学习", author: "Ian Goodfellow", category: "人工智能", type: 'academic', rating: 4.8, readCount: 1250, coverColor: "bg-gradient-to-br from-blue-500 to-purple-600", progress: 65, tags: ["AI", "机器学习", "技术"] },
        { id: "2", title: "统计学习方法", author: "李航", category: "机器学习", type: 'academic', rating: 4.7, readCount: 980, coverColor: "bg-gradient-to-br from-emerald-500 to-teal-600", progress: 40, tags: ["统计", "算法", "技术"] },
        { id: "3", title: "百年孤独", author: "加西亚·马尔克斯", category: "魔幻现实主义", type: 'fiction', rating: 4.9, readCount: 5800, coverColor: "bg-gradient-to-br from-amber-500 to-orange-600", tags: ["经典", "魔幻", "家族史"] },
        { id: "4", title: "三体", author: "刘慈欣", category: "科幻小说", type: 'fiction', rating: 4.8, readCount: 4200, coverColor: "bg-gradient-to-br from-red-500 to-pink-600", progress: 80, tags: ["科幻", "宇宙", "物理"] },
        { id: "5", title: "活着", author: "余华", category: "当代文学", type: 'fiction', rating: 4.7, readCount: 3500, coverColor: "bg-gradient-to-br from-gray-600 to-slate-700", tags: ["生活", "人性", "中国文学"] },
        { id: "6", title: "红楼梦", author: "曹雪芹", category: "古典文学", type: 'literature', rating: 4.9, readCount: 2800, coverColor: "bg-gradient-to-br from-rose-500 to-pink-600", tags: ["经典", "爱情", "社会"] },
        { id: "7", title: "追风筝的人", author: "卡勒德·胡赛尼", category: "外国文学", type: 'literature', rating: 4.6, readCount: 3100, coverColor: "bg-gradient-to-br from-sky-500 to-cyan-600", tags: ["人性", "救赎", "友情"] },
        { id: "8", title: "时间简史", author: "史蒂芬·霍金", category: "科普读物", type: 'science', rating: 4.5, readCount: 2500, coverColor: "bg-gradient-to-br from-violet-500 to-indigo-600", progress: 30, tags: ["物理", "宇宙", "科学"] },
        { id: "9", title: "人类简史", author: "尤瓦尔·赫拉利", category: "历史科普", type: 'science', rating: 4.7, readCount: 3800, coverColor: "bg-gradient-to-br from-amber-400 to-yellow-500", tags: ["历史", "人类", "文明"] },
        { id: "10", title: "史蒂夫·乔布斯传", author: "沃尔特·艾萨克森", category: "人物传记", type: 'biography', rating: 4.6, readCount: 2200, coverColor: "bg-gradient-to-br from-gray-700 to-black", progress: 90, tags: ["科技", "创新", "传记"] },
        { id: "11", title: "成为", author: "米歇尔·奥巴马", category: "自传", type: 'biography', rating: 4.8, readCount: 2900, coverColor: "bg-gradient-to-br from-purple-500 to-blue-500", tags: ["政治", "女性", "成长"] },
        { id: "12", title: "原子习惯", author: "詹姆斯·克利尔", category: "个人成长", type: 'self-help', rating: 4.7, readCount: 4100, coverColor: "bg-gradient-to-br from-green-500 to-emerald-600", tags: ["习惯", "成长", "心理学"] },
    ];

    const notes: ReadingNote[] = [
        { id: "1", content: "注意力机制的核心公式：Attention(Q,K,V) = softmax(QK^T/√d_k)V", timestamp: "今天 10:30", bookId: "1" },
        { id: "2", content: "布恩迪亚家族七代人的兴衰，魔幻与现实交织", timestamp: "昨天 14:20", bookId: "3" },
        { id: "3", content: "黑暗森林法则：宇宙社会学的重要理论", timestamp: "前天 09:45", bookId: "4" },
    ];

    const searchHistory: SearchHistoryItem[] = [
        { id: "1", query: "Transformer注意力机制", timestamp: "今天 10:15", resultCount: 24 },
        { id: "2", query: "科幻小说推荐", timestamp: "昨天 16:30", resultCount: 18 },
        { id: "3", query: "自我成长书籍", timestamp: "3天前", resultCount: 32 },
        { id: "4", query: "古典文学必读", timestamp: "5天前", resultCount: 21 },
    ];

    const categories: Category[] = [
        { id: "all", name: "全部", icon: <Menu className="h-4 w-4" /> },
        { id: "academic", name: "学术", icon: <BookOpen className="h-4 w-4" /> },
        { id: "fiction", name: "小说", icon: <BookText className="h-4 w-4" /> },
        { id: "literature", name: "文学", icon: <Globe className="h-4 w-4" /> },
        { id: "science", name: "科普", icon: <Sparkles className="h-4 w-4" /> },
        { id: "biography", name: "传记", icon: <User className="h-4 w-4" /> },
        { id: "self-help", name: "成长", icon: <TrendingUp className="h-4 w-4" /> },
    ];

    const sendAIMessage = (content: string) => {
        if (!content.trim()) return;

        const userMessage: Message = {
            id: (aiMessages.length + 1).toString(),
            role: 'user',
            content: content
        };

        setAiMessages(prev => [...prev, userMessage]);
        setAiInput("");

        setTimeout(() => {
            const responses = [
                "根据您的查询，我为您找到以下相关资源：\n\n1. 《百年孤独》魔幻现实主义代表作\n2. 《三体》硬核科幻小说\n3. 《原子习惯》个人成长经典\n\n是否需要我为您详细介绍这些书籍？",
                "这个问题涉及文学分析，我建议：\n\n📚 参考书籍：《文学理论入门》\n🎥 相关课程：现代文学赏析\n💡 核心要点：关注作者的叙事手法和主题表达\n\n需要进一步解释吗？",
                "检测到您对多种类型书籍感兴趣，为您推荐：\n\n🔗 学术：《深度学习》\n📖 小说：《追风筝的人》\n🎯 传记：《史蒂夫·乔布斯传》"
            ];

            const aiResponse: Message = {
                id: (aiMessages.length + 2).toString(),
                role: 'ai',
                content: responses[Math.floor(Math.random() * responses.length)]
            };
            setAiMessages(prev => [...prev, aiResponse]);
        }, 800);
    };

    const addNote = () => {
        if (!noteInput.trim()) return;
        setNoteInput("");
    };

    const handleSelectText = (text: string) => {
        setSelectedText(text);
    };

    const handleSetAiInput = (text: string) => {
        setAiInput(text);
    };

    const renderMainContent = () => {
        switch (activeTab) {
            case "search":
                return (
                    <AIChatPanel
                        messages={aiMessages}
                        onSendMessage={sendAIMessage}
                        aiInput={aiInput}
                        setAiInput={setAiInput}
                        searchHistory={searchHistory}
                    />
                );

            case "discover":
                return (
                    <DiscoverPanel
                        books={books}
                        categories={categories}
                        selectedCategory={selectedCategory}
                        onCategoryChange={setSelectedCategory}
                        onBookClick={setSelectedBook}
                    />
                );

            case "reading":
                return (
                    <ReadingPanel
                        selectedText={selectedText}
                        onSelectText={handleSelectText}
                        onSetAiInput={handleSetAiInput}
                        noteInput={noteInput}
                        setNoteInput={setNoteInput}
                        onAddNote={addNote}
                        showReadingAssistant={showReadingAssistant}
                        setShowReadingAssistant={setShowReadingAssistant}
                    />
                );

            case "profile":
                return (
                    <ProfilePanel notes={notes} />
                );
        }
    };

    return (
        <div className="flex h-screen flex-col bg-background overflow-hidden">
            <TopNavbar currentPath="/library" />

            <div className="flex flex-1 pt-14 overflow-hidden">
                <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

                <div className="flex-1 overflow-y-auto">
                    {renderMainContent()}
                </div>
            </div>
        </div>
    );
}