// /components/teaching/resource-library/ExerciseLibrary.tsx
"use client";

import { Search, Filter, FileText, Clock, Award, Hash, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface Exercise {
    id: string;
    title: string;
    type: "选择题" | "填空题" | "编程题" | "简答题" | "计算题";
    subject: string;
    difficulty: "简单" | "中等" | "困难";
    points: number;
    avgScore: number;
    usageCount: number;
    tags: string[];
    source?: string;
    estimatedTime: number; // 分钟
    hasSolution: boolean;
}

export function ExerciseLibrary() {
    const exercises: Exercise[] = [
        {
            id: "1",
            title: "反向传播算法的梯度计算",
            type: "计算题",
            subject: "机器学习",
            difficulty: "困难",
            points: 10,
            avgScore: 6.5,
            usageCount: 245,
            tags: ["反向传播", "梯度计算", "神经网络"],
            source: "李教授",
            estimatedTime: 30,
            hasSolution: true
        },
        {
            id: "2",
            title: "CNN卷积层输出尺寸计算",
            type: "填空题",
            subject: "深度学习",
            difficulty: "中等",
            points: 5,
            avgScore: 3.8,
            usageCount: 189,
            tags: ["CNN", "卷积神经网络", "尺寸计算"],
            source: "课程习题库",
            estimatedTime: 15,
            hasSolution: true
        },
        {
            id: "3",
            title: "Python实现快速排序算法",
            type: "编程题",
            subject: "算法",
            difficulty: "中等",
            points: 8,
            avgScore: 7.2,
            usageCount: 312,
            tags: ["排序算法", "Python", "递归"],
            source: "经典题库",
            estimatedTime: 25,
            hasSolution: true
        },
        {
            id: "4",
            title: "过拟合与欠拟合的判断与解决",
            type: "简答题",
            subject: "机器学习",
            difficulty: "中等",
            points: 6,
            avgScore: 4.5,
            usageCount: 156,
            tags: ["过拟合", "欠拟合", "模型评估"],
            source: "张教授",
            estimatedTime: 20,
            hasSolution: true
        },
        {
            id: "5",
            title: "线性回归损失函数推导",
            type: "计算题",
            subject: "机器学习",
            difficulty: "困难",
            points: 12,
            avgScore: 5.8,
            usageCount: 178,
            tags: ["线性回归", "损失函数", "推导"],
            source: "教材习题",
            estimatedTime: 35,
            hasSolution: true
        },
    ];

    const difficultyColors = {
        "简单": "bg-emerald-100 text-emerald-600",
        "中等": "bg-amber-100 text-amber-600",
        "困难": "bg-rose-100 text-rose-600"
    };

    return (
        <div className="h-full overflow-y-auto p-6">
            {/* 头部 */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-slate-800 mb-2">习题库</h1>
                <p className="text-slate-600">海量优质习题资源，支持按学科、难度筛选</p>
            </div>

            {/* 搜索和筛选 */}
            <div className="bg-white border border-slate-200 rounded-xl p-4 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="md:col-span-2">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <Input placeholder="搜索习题..." className="pl-10" />
                        </div>
                    </div>

                    <select className="border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white">
                        <option value="">全部类型</option>
                        <option value="选择题">选择题</option>
                        <option value="填空题">填空题</option>
                        <option value="编程题">编程题</option>
                        <option value="简答题">简答题</option>
                        <option value="计算题">计算题</option>
                    </select>

                    <select className="border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white">
                        <option value="">全部难度</option>
                        <option value="简单">简单</option>
                        <option value="中等">中等</option>
                        <option value="困难">困难</option>
                    </select>
                </div>
            </div>

            {/* 习题列表 */}
            <div className="space-y-4">
                {exercises.map(exercise => (
                    <div key={exercise.id} className="bg-white border border-slate-200 rounded-xl p-5 hover:border-indigo-300 transition-colors">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                            {/* 左侧：题目信息 */}
                            <div className="flex-1">
                                <div className="flex items-start gap-3 mb-3">
                                    <FileText className="h-5 w-5 text-indigo-500 mt-1 flex-shrink-0" />
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-slate-800 mb-1">{exercise.title}</h3>
                                        <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
                                            <span className="bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-md">
                                                {exercise.type}
                                            </span>
                                            <span>{exercise.subject}</span>
                                            <span className={`px-2 py-0.5 rounded-md ${difficultyColors[exercise.difficulty]}`}>
                                                {exercise.difficulty}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* 标签 */}
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {exercise.tags.map(tag => (
                                        <Badge key={tag} variant="secondary">
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>

                                {/* 元数据 */}
                                <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
                                    <div className="flex items-center gap-1">
                                        <Award className="h-4 w-4" />
                                        <span>分值：{exercise.points}分</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Hash className="h-4 w-4" />
                                        <span>平均分：{exercise.avgScore}分</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <span>使用次数：{exercise.usageCount}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Clock className="h-4 w-4" />
                                        <span>预计用时：{exercise.estimatedTime}分钟</span>
                                    </div>
                                    {exercise.source && (
                                        <div className="text-slate-600">
                                            来源：{exercise.source}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* 右侧：操作按钮 */}
                            <div className="flex flex-col sm:flex-row md:flex-col gap-2">
                                <Button size="sm" variant="outline">
                                    查看详情
                                </Button>
                                <Button size="sm">
                                    加入我的题库
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* 底部操作 */}
            <div className="mt-6 flex justify-center">
                <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    批量导入习题
                </Button>
            </div>
        </div>
    );
}