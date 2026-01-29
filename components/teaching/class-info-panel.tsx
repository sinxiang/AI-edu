"use client";

import { cn } from "@/lib/utils";
import {
    Users,
    FileText,
    TrendingUp,
    TrendingDown,
    Target,
    AlertCircle,
    Clock,
    ChevronRight,
} from "lucide-react";

interface StudentProgress {
    id: string;
    name: string;
    progress: number;
    mastery: number;
    completed: number;
    total: number;
    lastActive: string;
}

interface WrongQuestion {
    id: string;
    question: string;
    wrongRate: number;
    difficulty: string;
    topic: string;
    studentCount: number;
}

interface WeaknessTopic {
    topic: string;
    mastery: number;
    students: number;
    trend: "improving" | "declining" | "stable";
}

interface Course {
    id: string;
    name: string;
    className: string;
    studentCount: number;
    pendingHomework: number;
}

interface ClassInfoPanelProps {
    course: Course;
}

export function ClassInfoPanel({ course }: ClassInfoPanelProps) {
    // 示例数据
    const studentProgress: StudentProgress[] = [
        { id: "1", name: "张三", progress: 85, mastery: 78, completed: 17, total: 20, lastActive: "今天 10:30" },
        { id: "2", name: "李四", progress: 92, mastery: 85, completed: 18, total: 20, lastActive: "今天 09:15" },
        { id: "3", name: "王五", progress: 65, mastery: 62, completed: 13, total: 20, lastActive: "昨天 16:20" },
        { id: "4", name: "赵六", progress: 78, mastery: 71, completed: 15, total: 20, lastActive: "今天 08:45" },
        { id: "5", name: "钱七", progress: 95, mastery: 89, completed: 19, total: 20, lastActive: "今天 11:20" },
        { id: "6", name: "孙八", progress: 70, mastery: 65, completed: 14, total: 20, lastActive: "昨天 20:10" },
    ];

    const wrongQuestions: WrongQuestion[] = [
        {
            id: "1",
            question: "反向传播算法中，梯度消失问题的主要原因是什么？",
            wrongRate: 45,
            difficulty: "中等",
            topic: "反向传播",
            studentCount: 22
        },
        {
            id: "2",
            question: "L1正则化和L2正则化的主要区别是什么？",
            wrongRate: 38,
            difficulty: "中等",
            topic: "正则化",
            studentCount: 18
        },
        {
            id: "3",
            question: "CNN中池化层的主要作用是什么？",
            wrongRate: 25,
            difficulty: "简单",
            topic: "卷积神经网络",
            studentCount: 12
        },
    ];

    const weaknessTopics: WeaknessTopic[] = [
        { topic: "矩阵求导", mastery: 48, students: 12, trend: "declining" },
        { topic: "正则化原理", mastery: 52, students: 15, trend: "stable" },
        { topic: "反向传播", mastery: 55, students: 10, trend: "improving" },
        { topic: "梯度消失", mastery: 60, students: 8, trend: "stable" },
    ];

    const averageProgress = Math.round(studentProgress.reduce((sum, s) => sum + s.progress, 0) / studentProgress.length);
    const averageMastery = Math.round(studentProgress.reduce((sum, s) => sum + s.mastery, 0) / studentProgress.length);

    return (
        <div className="h-full overflow-y-auto p-6">
            {/* 统计卡片 */}
            <div className="grid grid-cols-4 gap-4 mb-6">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                        <Users className="h-5 w-5 text-blue-600" />
                        <span className="text-sm text-blue-800">班级人数</span>
                    </div>
                    <div className="text-2xl font-bold text-blue-900">{course.studentCount}人</div>
                </div>
                <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="h-5 w-5 text-emerald-600" />
                        <span className="text-sm text-emerald-800">平均进度</span>
                    </div>
                    <div className="text-2xl font-bold text-emerald-900">{averageProgress}%</div>
                </div>
                <div className="bg-gradient-to-br from-violet-50 to-violet-100 border border-violet-200 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                        <Target className="h-5 w-5 text-violet-600" />
                        <span className="text-sm text-violet-800">平均掌握度</span>
                    </div>
                    <div className="text-2xl font-bold text-violet-900">{averageMastery}%</div>
                </div>
                <div className="bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                        <FileText className="h-5 w-5 text-amber-600" />
                        <span className="text-sm text-amber-800">待批作业</span>
                    </div>
                    <div className="text-2xl font-bold text-amber-900">{course.pendingHomework}份</div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {/* 班级学习情况 - 现在占满整个宽度 */}
                <div className="space-y-6">
                    {/* 整体学习进度 */}
                    <div className="bg-white border border-slate-200 rounded-xl p-5">
                        <h3 className="text-lg font-semibold text-slate-800 mb-4">整体学习进度</h3>
                        <div className="space-y-4">
                            {studentProgress.map((student) => (
                                <div key={student.id} className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white font-medium">
                                            {student.name.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="font-medium text-slate-800">{student.name}</div>
                                            <div className="text-xs text-slate-500">上次活跃：{student.lastActive}</div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-medium text-slate-800">{student.progress}%</div>
                                        <div className="text-xs text-slate-500">
                                            掌握度：<span className={cn(
                                                "font-medium",
                                                student.mastery >= 80 ? "text-emerald-600" :
                                                    student.mastery >= 60 ? "text-blue-600" :
                                                        "text-amber-600"
                                            )}>
                                                {student.mastery}%
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 错题分析 */}
                    <div className="bg-white border border-slate-200 rounded-xl p-5">
                        <h3 className="text-lg font-semibold text-slate-800 mb-4">错题分析</h3>
                        <div className="space-y-4">
                            {wrongQuestions.map((question) => (
                                <div key={question.id} className="border border-slate-100 rounded-lg p-4 hover:border-slate-200 transition-colors">
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="text-sm font-medium text-slate-800 flex-1 mr-2">{question.question}</div>
                                        <div className="flex items-center gap-2 flex-shrink-0">
                                            <span className={`px-2 py-0.5 text-xs rounded-full ${question.difficulty === "简单" ? "bg-emerald-100 text-emerald-600" :
                                                question.difficulty === "中等" ? "bg-amber-100 text-amber-600" :
                                                    "bg-rose-100 text-rose-600"
                                                }`}>
                                                {question.difficulty}
                                            </span>
                                            <span className="text-sm font-medium text-rose-600">{question.wrongRate}%</span>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center text-xs text-slate-500">
                                        <span>知识点：{question.topic}</span>
                                        <span>{question.studentCount}名学生答错</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 薄弱知识点 */}
                    <div className="bg-white border border-slate-200 rounded-xl p-5">
                        <h3 className="text-lg font-semibold text-slate-800 mb-4">薄弱知识点</h3>
                        <div className="space-y-4">
                            {weaknessTopics.map((topic) => (
                                <div key={topic.topic} className="flex items-center justify-between">
                                    <div className="flex items-center gap-3 flex-1">
                                        <div className="w-32">
                                            <div className="text-sm font-medium text-slate-800">{topic.topic}</div>
                                            <div className="text-xs text-slate-500">{topic.students}名学生薄弱</div>
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2">
                                                <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                                                    <div
                                                        className={`h-full rounded-full ${topic.mastery < 40 ? "bg-rose-500" :
                                                            topic.mastery < 60 ? "bg-amber-500" :
                                                                "bg-blue-500"
                                                            }`}
                                                        style={{ width: `${topic.mastery}%` }}
                                                    />
                                                </div>
                                                <div className="text-sm font-medium text-slate-800 w-10 text-right">
                                                    {topic.mastery}%
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`ml-4 ${topic.trend === "improving" ? "text-emerald-500" : "text-rose-500"}`}>
                                        {topic.trend === "improving" ? "↑" : "↓"}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}