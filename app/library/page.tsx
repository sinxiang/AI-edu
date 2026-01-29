"use client";

import { useState } from "react";
import { TopNavbar } from "@/components/top-navbar";
import { Sidebar, LibraryTab } from "@/components/library/Sidebar";
import { AIChatPanel } from "@/components/library/AIChatPanel";
import { DiscoverPanel } from "@/components/library/DiscoverPanel";
import { ReadingPanel } from "@/components/library/ReadingPanel";
import { ProfilePanel } from "@/components/library/ProfilePanel";
import { BookshelfPanel } from "@/components/library/BookshelfPanel";
import { MyNotesPanel } from "@/components/library/MyNotesPanel";

// --- 核心类型定义 ---
export interface Book {
    id: string;
    title: string;
    author: string;
    coverColor: string;
    category: string;
    type: 'academic' | 'fiction' | 'literature' | 'science';
    progress: number;
    rating: number;
    tags: string[];
    description: string;
}

export interface Note {
    id: string;
    bookId: string;
    bookTitle: string;
    chapter: string;
    content: string;
    timestamp: string;
}

export interface Message {
    id: string;
    role: 'user' | 'ai';
    content: string;
}

export interface SearchHistoryItem {
    id: string;
    query: string;
    timestamp: string;
    resultCount: number;
}

export default function LibraryPage() {
    // 设置初始页面为 "search" (图书馆 AI 助手)
    const [activeTab, setActiveTab] = useState<LibraryTab>("search");

    // --- 智能搜索状态 ---
    const [aiInput, setAiInput] = useState("");
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "1",
            role: 'ai',
            content: "您好！我是图书馆AI助手，可以帮您：\n\n1. 📚 智能推荐相关书籍\n2. 🔍 精准查找各类资源\n3. 📖 辅助深度阅读与理解\n4. 📝 整理读书笔记\n\n请告诉我您的需求。"
        }
    ]);

    const searchHistory: SearchHistoryItem[] = [
        { id: "h1", query: "Transformer 论文解析", timestamp: "今天 10:15", resultCount: 12 },
        { id: "h2", query: "加西亚·马尔克斯作品集", timestamp: "昨天 16:30", resultCount: 5 },
        { id: "h3", query: "机器学习入门路线", timestamp: "3天前", resultCount: 32 }
    ];

    // --- 阅读器状态 ---
    const [selectedText, setSelectedText] = useState("");
    const [noteInput, setNoteInput] = useState("");
    const [showAssistant, setShowAssistant] = useState(true);

    // --- 模拟书籍数据 ---
    const [books] = useState<Book[]>([
        { id: "1", title: "深度学习", author: "Ian Goodfellow", coverColor: "bg-blue-600", category: "人工智能", type: 'academic', progress: 65, rating: 4.8, tags: ["AI", "神经网络"], description: "深度学习领域的权威教材。" },
        { id: "3", title: "百年孤独", author: "加西亚·马尔克斯", coverColor: "bg-amber-600", category: "魔幻现实", type: 'literature', progress: 45, rating: 4.9, tags: ["经典", "家族史"], description: "布恩迪亚家族七代人的传奇。" },
        { id: "4", title: "三体", author: "刘慈欣", coverColor: "bg-zinc-800", category: "科幻小说", type: 'fiction', progress: 80, rating: 4.8, tags: ["科幻", "宇宙"], description: "地球文明与三体文明的兴衰。" }
    ]);

    // --- 模拟笔记数据 ---
    const [notes, setNotes] = useState<Note[]>([
        { id: "n1", bookId: "1", bookTitle: "深度学习", chapter: "第三章", content: "注意梯度消失问题，它是深层网络训练难的核心原因。", timestamp: "今天 10:30" },
        { id: "n2", bookId: "3", bookTitle: "百年孤独", chapter: "第一章", content: "魔幻现实主义的开端，时间循环的隐喻。", timestamp: "昨天 14:20" }
    ]);

    // --- 逻辑处理函数 ---
    const handleSendMessage = (content: string) => {
        if (!content.trim()) return;

        const userMsg: Message = { id: Date.now().toString(), role: 'user', content };
        setMessages(prev => [...prev, userMsg]);
        setAiInput("");

        // 模拟 AI 回复
        setTimeout(() => {
            setMessages(prev => [...prev, {
                id: (Date.now() + 1).toString(),
                role: 'ai',
                content: `根据您的需求“${content}”，我为您找到了一些相关书籍和学习资料。您是想深入了解某个章节，还是需要我为您制定阅读计划？`
            }]);
        }, 800);
    };

    const handleAddNote = () => {
        if (!noteInput.trim()) return;
        const newNote: Note = {
            id: Date.now().toString(),
            bookId: "3",
            bookTitle: "百年孤独",
            chapter: "深度阅读笔记",
            content: noteInput,
            timestamp: new Date().toLocaleString()
        };
        setNotes([newNote, ...notes]);
        setNoteInput("");
    };

    // 统一进入阅读模式的跳转
    const handleReadRedirect = () => setActiveTab("reading");

    // --- 主内容分发渲染 ---
    const renderMainContent = () => {
        switch (activeTab) {
            case "search":
                return (
                    <AIChatPanel
                        messages={messages}
                        onSendMessage={handleSendMessage}
                        aiInput={aiInput}
                        setAiInput={setAiInput}
                        searchHistory={searchHistory}
                    />
                );
            case "discover":
                return (
                    <DiscoverPanel
                        books={books}
                        onRead={handleReadRedirect}
                    />
                );
            case "reading":
                return (
                    <ReadingPanel
                        selectedText={selectedText}
                        onSelectText={setSelectedText}
                        onSetAiInput={setAiInput}
                        noteInput={noteInput}
                        setNoteInput={setNoteInput}
                        onAddNote={handleAddNote}
                        showReadingAssistant={showAssistant}
                        setShowReadingAssistant={setShowAssistant}
                    />
                );
            case "bookshelf":
                return (
                    <BookshelfPanel
                        books={books.filter(b => b.progress > 0)}
                        onRead={handleReadRedirect}
                    />
                );
            case "notes":
                return <MyNotesPanel notes={notes} />;
            case "profile":
                return <ProfilePanel notes={notes} />;
            default:
                return null;
        }
    };

    return (
        <div className="flex h-screen flex-col bg-background overflow-hidden">
            <TopNavbar currentPath="/library" />
            <div className="flex flex-1 pt-14 overflow-hidden">
                <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
                <div className="flex-1 overflow-y-auto bg-slate-50/50 dark:bg-transparent">
                    {renderMainContent()}
                </div>
            </div>
        </div>
    );
}