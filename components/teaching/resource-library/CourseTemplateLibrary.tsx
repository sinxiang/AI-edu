// /components/teaching/resource-library/CourseTemplateLibrary.tsx
"use client";

import { Search, Filter, Download, Star, ThumbsUp, Eye, Copy, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

interface Template {
    id: string;
    title: string;
    description: string;
    subject: string;
    gradeLevel: string;
    downloads: number;
    rating: number;
    likes: number;
    views: number;
    tags: string[];
    author: string;
    authorAvatar: string;
    createdAt: string;
    isHot?: boolean;
}

export function CourseTemplateLibrary() {
    const templates: Template[] = [
        {
            id: "1",
            title: "人工智能入门课程模板",
            description: "完整的人工智能入门课程结构，包含理论讲解和实践练习",
            subject: "人工智能",
            gradeLevel: "大学本科",
            downloads: 1245,
            rating: 4.8,
            likes: 89,
            views: 2560,
            tags: ["AI入门", "Python", "机器学习"],
            author: "张教授",
            authorAvatar: "张",
            createdAt: "2023-10-15",
            isHot: true
        },
        {
            id: "2",
            title: "数据结构与算法课程模板",
            description: "数据结构与算法的完整教学计划，包含大量练习题",
            subject: "计算机科学",
            gradeLevel: "大学本科",
            downloads: 1890,
            rating: 4.9,
            likes: 120,
            views: 3450,
            tags: ["数据结构", "算法", "C++"],
            author: "李教授",
            authorAvatar: "李",
            createdAt: "2023-09-20",
            isHot: true
        },
        {
            id: "3",
            title: "Python编程基础模板",
            description: "零基础学习Python的完整课程体系",
            subject: "编程",
            gradeLevel: "大一",
            downloads: 2345,
            rating: 4.7,
            likes: 156,
            views: 4321,
            tags: ["Python", "入门", "编程基础"],
            author: "王老师",
            authorAvatar: "王",
            createdAt: "2023-11-05"
        },
        {
            id: "4",
            title: "机器学习实战模板",
            description: "基于真实项目的机器学习实践课程",
            subject: "人工智能",
            gradeLevel: "研究生",
            downloads: 890,
            rating: 4.6,
            likes: 67,
            views: 1789,
            tags: ["机器学习", "实战", "TensorFlow"],
            author: "赵教授",
            authorAvatar: "赵",
            createdAt: "2023-12-01"
        },
    ];

    const subjects = ["全部", "人工智能", "计算机科学", "编程", "数学", "英语"];
    const gradeLevels = ["全部", "大一", "大二", "大三", "大四", "研究生"];

    return (
        <div className="h-full overflow-y-auto p-6">
            {/* 头部 */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-slate-800 mb-2">课程模板库</h1>
                <p className="text-slate-600">精选优质课程模板，助您快速构建课程体系</p>
            </div>

            {/* 搜索和筛选 */}
            <div className="bg-white border border-slate-200 rounded-xl p-4 mb-6">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <Input
                                placeholder="搜索课程模板..."
                                className="pl-10"
                            />
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <div className="flex items-center gap-2">
                            <Filter className="h-4 w-4 text-slate-400" />
                            <select className="border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white">
                                {subjects.map(subject => (
                                    <option key={subject} value={subject}>{subject}</option>
                                ))}
                            </select>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-slate-600">年级：</span>
                            <select className="border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white">
                                {gradeLevels.map(level => (
                                    <option key={level} value={level}>{level}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* 热门标签 */}
            <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                    <ThumbsUp className="h-5 w-5 text-rose-500" />
                    <span className="font-medium text-slate-800">热门标签</span>
                </div>
                <div className="flex flex-wrap gap-2">
                    {["人工智能", "机器学习", "深度学习", "Python", "数据分析", "算法", "编程入门", "实战项目"].map(tag => (
                        <Badge key={tag} variant="secondary" className="cursor-pointer hover:bg-slate-100">
                            {tag}
                        </Badge>
                    ))}
                </div>
            </div>

            {/* 模板列表 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {templates.map(template => (
                    <div key={template.id} className="bg-white border border-slate-200 rounded-xl p-5 hover:border-indigo-300 hover:shadow-lg transition-all duration-300">
                        {template.isHot && (
                            <div className="absolute top-4 right-4">
                                <Badge className="bg-rose-500 text-white">热门</Badge>
                            </div>
                        )}

                        <div className="mb-4">
                            <div className="flex items-start justify-between mb-2">
                                <h3 className="font-semibold text-lg text-slate-800">{template.title}</h3>
                            </div>
                            <p className="text-slate-600 text-sm mb-3">{template.description}</p>

                            <div className="flex flex-wrap gap-2 mb-4">
                                {template.tags.map(tag => (
                                    <span key={tag} className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded-md">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
                            <div className="flex items-center gap-1">
                                <span>{template.subject}</span>
                                <span className="mx-1">•</span>
                                <span>{template.gradeLevel}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                                <span className="font-medium">{template.rating}</span>
                            </div>
                        </div>

                        {/* 作者信息 */}
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-sm font-medium">
                                    {template.authorAvatar}
                                </div>
                                <div>
                                    <div className="font-medium text-slate-800">{template.author}</div>
                                    <div className="text-xs text-slate-500">{template.createdAt}</div>
                                </div>
                            </div>
                        </div>

                        {/* 统计数据 - 修复布局 */}
                        <div className="border-t border-slate-100 pt-4">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div className="flex items-center gap-4 text-sm flex-wrap">
                                    <div className="flex items-center gap-1 text-slate-600">
                                        <Download className="h-4 w-4" />
                                        <span>{template.downloads}</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-slate-600">
                                        <ThumbsUp className="h-4 w-4" />
                                        <span>{template.likes}</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-slate-600">
                                        <Eye className="h-4 w-4" />
                                        <span>{template.views}</span>
                                    </div>
                                </div>
                                <div className="flex gap-2 flex-shrink-0">
                                    <Button variant="outline" size="sm" className="whitespace-nowrap">
                                        <Eye className="h-4 w-4 mr-1" />
                                        预览
                                    </Button>
                                    <Button size="sm" className="whitespace-nowrap">
                                        <Copy className="h-4 w-4 mr-1" />
                                        使用模板
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* 底部操作 */}
            <div className="mt-6 flex justify-center">
                <Button variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    上传我的模板
                </Button>
            </div>
        </div>
    );
}