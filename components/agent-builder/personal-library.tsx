"use client";

import React, { useState } from "react";
import {
    FileText,
    Upload,
    FolderPlus,
    MoreVertical,
    Search,
    File,
    Folder,
    Trash2,
    Download
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function PersonalLibrary() {
    // 模拟数据
    const [files, setFiles] = useState([
        { id: "1", name: "2026年深度学习综述.pdf", size: "2.4 MB", type: "pdf", date: "2026-02-01" },
        { id: "2", name: "学术论文润色技巧.docx", size: "85 KB", type: "doc", date: "2026-01-28" },
        { id: "3", name: "实验原始数据表", size: "--", type: "folder", date: "2026-02-03" },
    ]);

    return (
        <div className="h-full flex flex-col p-8 space-y-6 animate-in fade-in duration-500">
            {/* 头部操作栏 */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">个人知识库</h1>
                    <p className="text-sm text-muted-foreground">存储与整理您的个人学习资料，可用于训练专属智能体</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="gap-2">
                        <FolderPlus className="h-4 w-4" /> 新建文件夹
                    </Button>
                    <Button className="gap-2">
                        <Upload className="h-4 w-4" /> 上传资料
                    </Button>
                </div>
            </div>

            {/* 搜索与统计 */}
            <div className="flex items-center gap-4 bg-muted/30 p-4 rounded-2xl border border-border/50">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                        placeholder="搜索我的文件..."
                        className="w-full bg-background border border-border rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                </div>
                <div className="flex gap-4 px-2">
                    <div className="text-xs text-muted-foreground text-center">
                        <p className="font-bold text-foreground">12</p>
                        <p>总文件</p>
                    </div>
                    <div className="text-xs text-muted-foreground text-center">
                        <p className="font-bold text-foreground">1.2 GB</p>
                        <p>已使用空间</p>
                    </div>
                </div>
            </div>

            {/* 文件列表区域 */}
            <div className="flex-1 bg-card border border-border rounded-2xl overflow-hidden flex flex-col shadow-sm">
                <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-muted/50 border-b border-border text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                    <div className="col-span-6">名称</div>
                    <div className="col-span-2">大小</div>
                    <div className="col-span-2">修改日期</div>
                    <div className="col-span-2 text-right">操作</div>
                </div>

                <div className="flex-1 overflow-y-auto">
                    {files.map((file) => (
                        <div
                            key={file.id}
                            className="grid grid-cols-12 gap-4 px-6 py-4 items-center border-b border-border/50 hover:bg-muted/30 transition-colors group cursor-pointer"
                        >
                            <div className="col-span-6 flex items-center gap-3">
                                {file.type === 'folder' ? (
                                    <div className="h-9 w-9 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
                                        <Folder className="h-5 w-5 fill-current" />
                                    </div>
                                ) : (
                                    <div className="h-9 w-9 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                                        <FileText className="h-5 w-5" />
                                    </div>
                                )}
                                <div>
                                    <p className="text-sm font-semibold">{file.name}</p>
                                    {file.type !== 'folder' && <Badge variant="secondary" className="text-[9px] h-4 mt-1">PDF</Badge>}
                                </div>
                            </div>
                            <div className="col-span-2 text-xs text-muted-foreground">{file.size}</div>
                            <div className="col-span-2 text-xs text-muted-foreground font-mono">{file.date}</div>
                            <div className="col-span-2 flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Button variant="ghost" size="icon" className="h-8 w-8"><Download className="h-4 w-4" /></Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive"><Trash2 className="h-4 w-4" /></Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8"><MoreVertical className="h-4 w-4" /></Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}