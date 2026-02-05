"use client";

import React, { useState, useMemo } from "react";
import { TopNavbar } from "@/components/top-navbar";
import {
    FileText, Search, Download, Trash2, FolderOpen, Plus,
    Clock, MoreVertical, FileType, Hash, Star,
    X, Save, ChevronRight, LayoutList, Grid2X2,
    Columns, Layers, Tags, ChevronDown,
    Files as FilesIcon,
    FileStack, Share2, Edit3, Filter, CheckCircle2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

// --- 模拟强大的多维数据 ---
const INITIAL_DATA = [
    { id: 1, name: "Transformer论文深度解析", type: "pdf", category: "科研项目", status: "阅读中", starred: true, size: "2.4MB", tags: ["AI", "NLP"], updated: "10分钟前" },
    { id: 2, name: "2026开题报告初稿", type: "docx", category: "科研项目", status: "待处理", starred: false, size: "45KB", tags: ["学业"], updated: "1小时前" },
    { id: 3, name: "算法分析随堂笔记", type: "txt", category: "个人笔记", status: "已完成", starred: true, size: "12KB", tags: ["算法"], updated: "昨天" },
];

export default function LibraryPage() {
    // 1. 核心状态逻辑
    const [files, setFiles] = useState(INITIAL_DATA);
    const [viewScope, setViewScope] = useState<"all" | "starred" | "recent">("all");
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const [displayMode, setDisplayMode] = useState<"list" | "board">("list");
    const [selectedFileId, setSelectedFileId] = useState<number | null>(null);
    const [isInspectorOpen, setIsInspectorOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    // 2. 联动过滤逻辑 (Notion 核心)
    const filteredFiles = useMemo(() => {
        return files.filter(f => {
            const matchesSearch = f.name.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = activeCategory ? f.category === activeCategory : true;
            if (viewScope === "starred") return matchesSearch && f.starred && matchesCategory;
            return matchesSearch && matchesCategory;
        });
    }, [files, viewScope, activeCategory, searchQuery]);

    const activeFile = files.find(f => f.id === selectedFileId);

    // 3. 功能操作：真正“点得开”的新建笔记
    const handleCreateNote = () => {
        const newNote = {
            id: Date.now(),
            name: "新笔记 " + (files.length + 1),
            type: "txt",
            category: activeCategory || "个人笔记",
            status: "待处理",
            starred: false,
            size: "0KB",
            tags: ["未分类"],
            updated: "刚刚"
        };
        setFiles([newNote, ...files]);
        setSelectedFileId(newNote.id);
        setIsInspectorOpen(true);
        setViewScope("all"); // 确保在全部视图能看到新笔记
    };

    return (
        <main className="min-h-screen bg-[#fafafa] dark:bg-slate-950 flex flex-col">
            <TopNavbar currentPath="/assets" />

            <div className="flex-1 pt-14 flex overflow-hidden">
                {/* --- 侧边栏：参考 Obsidian 文件树 --- */}
                <aside className="w-64 border-r border-border bg-white dark:bg-slate-900 flex flex-col shrink-0">
                    <div className="p-4 flex flex-col gap-2">
                        <Button className="w-full justify-start gap-2 h-10 shadow-sm font-bold" onClick={handleCreateNote}>
                            <Edit3 className="h-4 w-4" /> <span>新建笔记</span>
                        </Button>
                        <Button variant="outline" className="w-full justify-start gap-2 h-10 border-dashed text-muted-foreground">
                            <Plus className="h-4 w-4" /> <span>上传资源</span>
                        </Button>
                    </div>

                    <ScrollArea className="flex-1 px-3">
                        <div className="space-y-6 py-2">
                            <section>
                                <h2 className="px-3 text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2">库导航</h2>
                                <div className="space-y-1">
                                    <SidebarItem
                                        icon={FilesIcon} label="所有内容"
                                        active={viewScope === "all" && !activeCategory}
                                        onClick={() => { setViewScope("all"); setActiveCategory(null); }}
                                    />
                                    <SidebarItem
                                        icon={Star} label="收藏夹"
                                        active={viewScope === "starred"}
                                        onClick={() => { setViewScope("starred"); setActiveCategory(null); }}
                                    />
                                    <SidebarItem
                                        icon={Clock} label="最近修改"
                                        active={viewScope === "recent"}
                                        onClick={() => setViewScope("recent")}
                                    />
                                </div>
                            </section>

                            <section>
                                <Collapsible defaultOpen>
                                    <CollapsibleTrigger className="flex items-center justify-between w-full px-3 py-1 text-[10px] font-bold text-muted-foreground uppercase tracking-widest hover:text-foreground group">
                                        文件夹 <ChevronDown className="h-3 w-3 transition-transform group-data-[state=open]:rotate-180" />
                                    </CollapsibleTrigger>
                                    <CollapsibleContent className="mt-2 space-y-1">
                                        {["科研项目", "课程资料", "个人笔记"].map(cat => (
                                            <SidebarItem
                                                key={cat}
                                                icon={Hash}
                                                label={cat}
                                                active={activeCategory === cat}
                                                onClick={() => { setActiveCategory(cat); setViewScope("all"); }}
                                            />
                                        ))}
                                    </CollapsibleContent>
                                </Collapsible>
                            </section>
                        </div>
                    </ScrollArea>
                </aside>

                {/* --- 中央主区域：参考 Notion 多维表格 --- */}
                <section className="flex-1 flex flex-col min-w-0 bg-background/50 relative">
                    <header className="h-14 border-b border-border bg-white/80 backdrop-blur-md px-6 flex items-center justify-between shrink-0 z-10">
                        <div className="flex items-center gap-4">
                            <h2 className="text-sm font-bold flex items-center gap-2">
                                {activeCategory ? <FolderOpen className="h-4 w-4 text-primary" /> : <FileStack className="h-4 w-4 text-primary" />}
                                {activeCategory || (viewScope === "starred" ? "收藏夹" : "我的库")}
                            </h2>
                            <div className="h-4 w-[1px] bg-border mx-2" />
                            <Tabs value={displayMode} onValueChange={(v: any) => setDisplayMode(v)}>
                                <TabsList className="h-8 p-1">
                                    <TabsTrigger value="list" className="h-6 text-xs gap-1.5"><LayoutList className="h-3.5 w-3.5" /> 列表</TabsTrigger>
                                    <TabsTrigger value="board" className="h-6 text-xs gap-1.5"><Columns className="h-3.5 w-3.5" /> 看板</TabsTrigger>
                                </TabsList>
                            </Tabs>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                                <Input
                                    placeholder="搜索标题或内容..."
                                    className="h-8 w-48 pl-8 text-xs bg-muted/40 border-none focus-visible:ring-1"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <Button size="icon" variant="ghost" className="h-8 w-8"><Filter className="h-4 w-4" /></Button>
                        </div>
                    </header>

                    <ScrollArea className="flex-1">
                        <div className="p-8 max-w-6xl mx-auto">
                            {displayMode === "list" ? (
                                <ListView
                                    files={filteredFiles}
                                    selectedId={selectedFileId}
                                    onSelect={(id) => { setSelectedFileId(id); setIsInspectorOpen(true); }}
                                />
                            ) : (
                                <BoardView
                                    files={filteredFiles}
                                    onSelect={(id) => { setSelectedFileId(id); setIsInspectorOpen(true); }}
                                />
                            )}
                        </div>
                    </ScrollArea>
                </section>

                {/* --- 右侧属性详情面板：参考 Notion 侧边页 --- */}
                {isInspectorOpen && activeFile && (
                    <aside className="w-80 border-l border-border bg-white dark:bg-slate-900 animate-in slide-in-from-right duration-300 flex flex-col shadow-2xl z-20">
                        <div className="h-14 border-b border-border px-4 flex items-center justify-between shrink-0">
                            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">页面属性</span>
                            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsInspectorOpen(false)}><X className="h-4 w-4" /></Button>
                        </div>
                        <ScrollArea className="flex-1">
                            <div className="p-6 space-y-8">
                                <div className="space-y-4">
                                    <div className="h-14 w-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center shadow-inner">
                                        <FileText className="h-7 w-7" />
                                    </div>
                                    <Input
                                        className="text-xl font-bold border-none px-0 focus-visible:ring-0"
                                        defaultValue={activeFile.name}
                                        placeholder="笔记标题"
                                    />
                                </div>

                                <div className="space-y-5">
                                    <InspectorRow label="当前状态" icon={CheckCircle2}>
                                        <Badge className={cn(
                                            "text-[10px] font-bold px-2 py-0.5",
                                            activeFile.status === "阅读中" ? "bg-blue-500 text-white" :
                                                activeFile.status === "已完成" ? "bg-green-500 text-white" : "bg-slate-500 text-white"
                                        )}>{activeFile.status}</Badge>
                                    </InspectorRow>
                                    <InspectorRow label="所属文件夹" icon={Hash}>
                                        <span className="text-xs font-semibold">{activeFile.category}</span>
                                    </InspectorRow>
                                    <InspectorRow label="标签" icon={Tags}>
                                        <div className="flex flex-wrap gap-1.5">
                                            {activeFile.tags.map(t => <Badge key={t} variant="outline" className="text-[9px] font-normal">{t}</Badge>)}
                                            <button className="h-5 w-5 rounded-full border border-dashed flex items-center justify-center text-muted-foreground hover:text-primary"><Plus className="h-3 w-3" /></button>
                                        </div>
                                    </InspectorRow>
                                </div>

                                <div className="pt-8 border-t border-border flex flex-col gap-2.5">
                                    <Button className="w-full gap-2 shadow-lg shadow-primary/20" size="sm">
                                        <Save className="h-4 w-4" /> 保存并开启全屏编辑
                                    </Button>
                                    <Button variant="ghost" size="sm" className="w-full text-destructive hover:bg-red-50 mt-2">
                                        <Trash2 className="h-4 w-4 mr-2" /> 删除此页面
                                    </Button>
                                </div>
                            </div>
                        </ScrollArea>
                    </aside>
                )}
            </div>
        </main>
    );
}

// --- 辅助子组件 ---

function SidebarItem({ icon: Icon, label, active, onClick }: any) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-all group",
                active ? "bg-primary text-white font-bold shadow-lg shadow-primary/20" : "text-slate-500 hover:bg-muted"
            )}
        >
            <Icon className={cn("h-4 w-4", active ? "text-white" : "text-slate-400 group-hover:text-primary")} />
            {label}
        </button>
    );
}

function ListView({ files, selectedId, onSelect }: any) {
    return (
        <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
            <table className="w-full text-sm">
                <thead className="bg-muted/30 border-b border-border/50 text-[10px] uppercase font-bold text-muted-foreground tracking-wider">
                    <tr>
                        <th className="px-6 py-4 text-left">名称</th>
                        <th className="px-6 py-4 text-left">状态</th>
                        <th className="px-6 py-4 text-right">大小</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-border/40">
                    {files.map((file: any) => (
                        <tr
                            key={file.id}
                            onClick={() => onSelect(file.id)}
                            className={cn(
                                "group cursor-pointer transition-colors",
                                selectedId === file.id ? "bg-primary/5 shadow-inner" : "hover:bg-slate-50"
                            )}
                        >
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-4">
                                    <FileText className={cn("h-4 w-4", file.type === 'pdf' ? "text-red-500" : "text-indigo-500")} />
                                    <span className="font-bold text-slate-800">{file.name}</span>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <Badge variant="outline" className="text-[9px] font-bold">{file.status}</Badge>
                            </td>
                            <td className="px-6 py-4 text-right text-[10px] text-muted-foreground font-mono">{file.size}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function BoardView({ files, onSelect }: any) {
    const columns = ["待处理", "阅读中", "已完成"];
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {columns.map(status => (
                <div key={status} className="flex flex-col gap-4">
                    <div className="flex items-center justify-between px-2">
                        <span className="text-xs font-black uppercase tracking-widest text-slate-400">{status}</span>
                        <Badge className="bg-muted text-slate-500 h-5 px-1.5 text-[10px]">{files.filter((f: any) => f.status === status).length}</Badge>
                    </div>
                    <div className="space-y-3">
                        {files.filter((f: any) => f.status === status).map((file: any) => (
                            <div
                                key={file.id}
                                onClick={() => onSelect(file.id)}
                                className="group bg-white p-4 rounded-2xl border border-border/60 shadow-sm hover:border-primary/40 hover:shadow-md transition-all cursor-pointer"
                            >
                                <h4 className="text-sm font-bold group-hover:text-primary">{file.name}</h4>
                                <div className="mt-3 flex gap-1">
                                    {file.tags.map((t: any) => <span key={t} className="text-[9px] text-muted-foreground">#{t}</span>)}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

function InspectorRow({ label, icon: Icon, children }: any) {
    return (
        <div className="flex items-start gap-4">
            <div className="flex items-center gap-2 w-24 shrink-0 pt-1">
                <Icon className="h-3.5 w-3.5 text-muted-foreground/60" />
                <span className="text-[10px] font-bold text-muted-foreground uppercase">{label}</span>
            </div>
            <div className="flex-1 min-w-0">{children}</div>
        </div>
    );
}