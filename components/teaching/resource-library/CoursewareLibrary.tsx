// /components/teaching/resource-library/CoursewareLibrary.tsx
"use client";

import { Search,  File, Image, Video, Download, Star, Eye, FolderOpen, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";


interface Courseware {
    id: string;
    title: string;
    type: "PPT" | "PDF" | "视频" | "文档" | "图片";
    subject: string;
    fileSize: string;
    downloads: number;
    rating: number;
    views: number;
    tags: string[];
    author: string;
    updatedAt: string;
    isShared?: boolean;
    previewUrl?: string;
}

export function CoursewareLibrary() {
    const coursewares: Courseware[] = [
        {
            id: "1",
            title: "神经网络基础PPT课件",
            type: "PPT",
            subject: "深度学习",
            fileSize: "45.2 MB",
            downloads: 1245,
            rating: 4.8,
            views: 2890,
            tags: ["神经网络", "PPT模板", "教学课件"],
            author: "张教授",
            updatedAt: "2023-11-20",
            isShared: true
        },
        {
            id: "2",
            title: "Python数据可视化教程",
            type: "视频",
            subject: "Python编程",
            fileSize: "156.7 MB",
            downloads: 890,
            rating: 4.9,
            views: 2345,
            tags: ["Matplotlib", "数据可视化", "视频教程"],
            author: "李老师",
            updatedAt: "2023-10-15",
            isShared: true
        },
        {
            id: "3",
            title: "机器学习算法图解PDF",
            type: "PDF",
            subject: "机器学习",
            fileSize: "12.3 MB",
            downloads: 1678,
            rating: 4.7,
            views: 3456,
            tags: ["算法图解", "PDF文档", "学习资料"],
            author: "王教授",
            updatedAt: "2023-12-01",
            isShared: true
        },
        {
            id: "4",
            title: "TensorFlow实战案例",
            type: "文档",
            subject: "深度学习框架",
            fileSize: "8.9 MB",
            downloads: 756,
            rating: 4.6,
            views: 1890,
            tags: ["TensorFlow", "实战案例", "代码示例"],
            author: "赵博士",
            updatedAt: "2023-11-28"
        },
    ];

    const typeIcons = {
        "PPT": File,
        "PDF": File,
        "视频": Video,
        "文档": File,
        "图片": Image
    };

    const typeColors = {
        "PPT": "bg-purple-100 text-purple-600",
        "PDF": "bg-red-100 text-red-600",
        "视频": "bg-blue-100 text-blue-600",
        "文档": "bg-green-100 text-green-600",
        "图片": "bg-amber-100 text-amber-600"
    };

    return (
        <div className="h-full overflow-y-auto p-6">
            {/* 头部 */}
            <div className="mb-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800 mb-2">课件库</h1>
                        <p className="text-slate-600">优质教学课件资源库，支持多种格式</p>
                    </div>
                    <Button>
                        <FolderOpen className="h-4 w-4 mr-2" />
                        我的课件
                    </Button>
                </div>
            </div>

            {/* 快速筛选 */}
            <div className="flex items-center gap-4 mb-6 overflow-x-auto pb-2">
                <Button variant="outline" className="whitespace-nowrap">
                    全部课件
                </Button>
                <Button variant="ghost" className="whitespace-nowrap">
                    <File className="h-4 w-4 mr-2" />
                    PPT模板
                </Button>
                <Button variant="ghost" className="whitespace-nowrap">
                    <Video className="h-4 w-4 mr-2" />
                    教学视频
                </Button>
                <Button variant="ghost" className="whitespace-nowrap">
                    <Image className="h-4 w-4 mr-2" />
                    图片素材
                </Button>
                <Button variant="ghost" className="whitespace-nowrap">
                    <File className="h-4 w-4 mr-2" />
                    PDF文档
                </Button>
            </div>

            {/* 搜索和筛选 */}
            <div className="bg-white border border-slate-200 rounded-xl p-4 mb-6">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <Input
                                placeholder="搜索课件资源..."
                                className="pl-10"
                            />
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <select className="border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white">
                            <option value="">全部学科</option>
                            <option value="人工智能">人工智能</option>
                            <option value="计算机科学">计算机科学</option>
                            <option value="数学">数学</option>
                            <option value="英语">英语</option>
                        </select>
                        <select className="border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white">
                            <option value="">全部格式</option>
                            <option value="PPT">PPT</option>
                            <option value="PDF">PDF</option>
                            <option value="视频">视频</option>
                            <option value="文档">文档</option>
                            <option value="图片">图片</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* 课件网格 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {coursewares.map(courseware => {
                    const TypeIcon = typeIcons[courseware.type];
                    return (
                        <div key={courseware.id} className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300">
                            {/* 预览区 */}
                            <div className="h-48 bg-gradient-to-br from-slate-100 to-slate-200 relative">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="text-center">
                                        <TypeIcon className="h-16 w-16 text-slate-400 mx-auto mb-2" />
                                        <div className={`px-3 py-1 rounded-full text-sm font-medium ${typeColors[courseware.type]} inline-block`}>
                                            {courseware.type}
                                        </div>
                                    </div>
                                </div>
                                {courseware.isShared && (
                                    <div className="absolute top-4 left-4">
                                        <Badge className="bg-indigo-500 text-white">共享资源</Badge>
                                    </div>
                                )}
                            </div>

                            {/* 内容区 */}
                            <div className="p-5">
                                <div className="mb-3">
                                    <h3 className="font-semibold text-slate-800 mb-1 line-clamp-2">{courseware.title}</h3>
                                    <p className="text-sm text-slate-600">{courseware.subject}</p>
                                </div>

                                {/* 标签 */}
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {courseware.tags.map(tag => (
                                        <span key={tag} className="px-2 py-0.5 bg-slate-100 text-slate-700 text-xs rounded-md">
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {/* 元数据 */}
                                <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center gap-1">
                                            <Download className="h-4 w-4" />
                                            <span>{courseware.downloads}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Star className="h-4 w-4 text-amber-500" />
                                            <span>{courseware.rating}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Eye className="h-4 w-4" />
                                            <span>{courseware.views}</span>
                                        </div>
                                    </div>
                                    <span className="text-xs text-slate-400">{courseware.fileSize}</span>
                                </div>

                                {/* 作者和时间 */}
                                <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                                    <div className="flex items-center gap-2">
                                        <div className="h-6 w-6 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 flex items-center justify-center text-white text-xs">
                                            {courseware.author.charAt(0)}
                                        </div>
                                        <span className="text-sm text-slate-700">{courseware.author}</span>
                                    </div>
                                    <span className="text-xs text-slate-500">{courseware.updatedAt}</span>
                                </div>

                                {/* 操作按钮 */}
                                <div className="flex gap-2 mt-4">
                                    <Button variant="outline" size="sm" className="flex-1">
                                        预览
                                    </Button>
                                    <Button size="sm" className="flex-1">
                                        下载
                                    </Button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* 底部上传按钮 */}
            <div className="mt-6 flex justify-center">
                <Button variant="outline" className="border-dashed">
                    <Plus className="h-4 w-4 mr-2" />
                    上传我的课件
                </Button>
            </div>
        </div>
    );
}