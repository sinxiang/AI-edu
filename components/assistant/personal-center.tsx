// /components/assistant/personal-center.tsx
"use client";

import { useState } from "react";
import {
    User,
    Calendar,
    BookOpen,
    Award,
    Clock,
    BookX,
    CheckCircle,
    XCircle,
    ChevronRight,
    Target,
    Mail,
    Phone,
    MapPin,
    School,
    Edit
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { SubModule } from "./learning-sidebar";

interface PersonalCenterProps {
    subModule: SubModule;
}

// 用户信息数据
const userInfo = {
    name: "张三",
    studentId: "202312345",
    email: "zhangsan@university.edu.cn",
    phone: "13800138000",
    major: "计算机科学与技术",
    className: "AI2023级1班",
    admissionDate: "2023-09-01",
    campus: "主校区",
    avatar: "/avatars/user.jpg"
};

// 学习统计数据
const studyStats = {
    totalStudyHours: 156,
    averageScore: 88.5,
    attendanceRate: 96.7,
    completedCourses: 8,
    inProgressCourses: 3
};

// 出勤信息
const attendanceRecords = [
    { date: "2024-01-15", course: "机器学习导论", status: "正常", time: "09:00-11:00" },
    { date: "2024-01-14", course: "深度学习", status: "正常", time: "14:00-16:00" },
    { date: "2024-01-13", course: "自然语言处理", status: "请假", time: "10:00-12:00" },
    { date: "2024-01-12", course: "计算机视觉", status: "正常", time: "08:00-10:00" },
    { date: "2024-01-11", course: "数据结构", status: "迟到", time: "13:00-15:00" },
];

// 练习记录数据
const practiceRecords = [
    { id: 1, title: "线性代数综合练习", date: "2024-01-15", score: 92, duration: "45分钟", questions: 25 },
    { id: 2, title: "微积分基础测验", date: "2024-01-14", score: 88, duration: "30分钟", questions: 20 },
    { id: 3, title: "概率论章节测试", date: "2024-01-12", score: 85, duration: "60分钟", questions: 30 },
    { id: 4, title: "Python编程实践", date: "2024-01-10", score: 95, duration: "75分钟", questions: 15 },
];

// 错题本数据
const wrongQuestions = [
    {
        id: 1,
        subject: "数学",
        topic: "高等数学",
        question: "求极限 lim(x→0) (sinx - x)/x³",
        correctAnswer: "-1/6",
        studentAnswer: "0",
        date: "2024-01-15",
        status: "未掌握",
        difficulty: "困难"
    },
    {
        id: 2,
        subject: "物理",
        topic: "力学",
        question: "计算质点在恒力作用下的位移",
        correctAnswer: "s = vt + 1/2at²",
        studentAnswer: "s = vt",
        date: "2024-01-14",
        status: "已掌握",
        difficulty: "中等"
    },
    {
        id: 3,
        subject: "数学",
        topic: "线性代数",
        question: "计算矩阵的秩和特征值",
        correctAnswer: "秩=3, λ=1,2,3",
        studentAnswer: "秩=2, λ=1,2",
        date: "2024-01-13",
        status: "未掌握",
        difficulty: "困难"
    },
    {
        id: 4,
        subject: "计算机",
        topic: "算法",
        question: "分析快速排序的时间复杂度",
        correctAnswer: "平均O(nlogn)",
        studentAnswer: "O(n²)",
        date: "2024-01-12",
        status: "已掌握",
        difficulty: "简单"
    },
];

export function PersonalCenter({ subModule }: PersonalCenterProps) {
    // 将所有 Hook 提到最前面，放在任何条件语句之前
    const [isEditing, setIsEditing] = useState(false);
    const [editedInfo, setEditedInfo] = useState(userInfo);
    const [filterSubject, setFilterSubject] = useState<string>("全部");
    const [filterStatus, setFilterStatus] = useState<string>("全部");

    // 只在错题本页面使用的筛选数据
    const subjects = ["全部", ...Array.from(new Set(wrongQuestions.map(q => q.subject)))];
    const statuses = ["全部", "未掌握", "已掌握"];

    const filteredQuestions = wrongQuestions.filter(q => {
        const matchSubject = filterSubject === "全部" || q.subject === filterSubject;
        const matchStatus = filterStatus === "全部" || q.status === filterStatus;
        return matchSubject && matchStatus;
    });

    const handleSaveInfo = () => {
        // 在实际应用中，这里应该发送到服务器
        console.log("保存信息:", editedInfo);
        setIsEditing(false);
        alert("个人信息已保存");
    };

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case "简单": return "bg-green-100 text-green-700";
            case "中等": return "bg-amber-100 text-amber-700";
            case "困难": return "bg-red-100 text-red-700";
            default: return "bg-gray-100 text-gray-700";
        }
    };

    const getStatusColor = (status: string) => {
        return status === "已掌握" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700";
    };

    // 个人信息页面（合并了出勤信息和练习记录）
    if (subModule === "personal-info") {
        return (
            <div className="h-full overflow-y-auto bg-background p-6">
                <div className="mx-auto max-w-6xl">
                    {/* 页面标题 */}
                    <h1 className="text-2xl font-bold text-foreground mb-2">个人中心</h1>
                    <p className="text-muted-foreground mb-8">管理你的个人信息和学习记录</p>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* 左侧：个人信息卡片 */}
                        <div className="lg:col-span-1 space-y-6">
                            {/* 个人信息卡片 */}
                            <div className="rounded-xl border border-border bg-card p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-lg font-semibold text-foreground">个人信息</h2>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setIsEditing(!isEditing)}
                                        className="text-primary hover:text-primary/80"
                                    >
                                        <Edit className="h-4 w-4 mr-1" />
                                        {isEditing ? "取消" : "编辑"}
                                    </Button>
                                </div>

                                <div className="space-y-4">
                                    {/* 头像和姓名 */}
                                    <div className="flex items-center gap-4">
                                        <div className="relative">
                                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center text-white text-xl font-bold">
                                                {userInfo.name.charAt(0)}
                                            </div>
                                            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-green-500 border-2 border-background"></div>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-foreground">{userInfo.name}</h3>
                                            <p className="text-sm text-muted-foreground">学号: {userInfo.studentId}</p>
                                        </div>
                                    </div>

                                    {/* 详细信息 */}
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3">
                                            <Mail className="h-4 w-4 text-muted-foreground" />
                                            <div className="flex-1">
                                                <label className="text-xs text-muted-foreground">邮箱</label>
                                                {isEditing ? (
                                                    <input
                                                        type="email"
                                                        value={editedInfo.email}
                                                        onChange={(e) => setEditedInfo({ ...editedInfo, email: e.target.value })}
                                                        className="w-full border-b border-input bg-transparent py-1 focus:outline-none"
                                                    />
                                                ) : (
                                                    <p className="font-medium">{userInfo.email}</p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <Phone className="h-4 w-4 text-muted-foreground" />
                                            <div className="flex-1">
                                                <label className="text-xs text-muted-foreground">电话</label>
                                                {isEditing ? (
                                                    <input
                                                        type="tel"
                                                        value={editedInfo.phone}
                                                        onChange={(e) => setEditedInfo({ ...editedInfo, phone: e.target.value })}
                                                        className="w-full border-b border-input bg-transparent py-1 focus:outline-none"
                                                    />
                                                ) : (
                                                    <p className="font-medium">{userInfo.phone}</p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <School className="h-4 w-4 text-muted-foreground" />
                                            <div className="flex-1">
                                                <label className="text-xs text-muted-foreground">专业</label>
                                                {isEditing ? (
                                                    <input
                                                        value={editedInfo.major}
                                                        onChange={(e) => setEditedInfo({ ...editedInfo, major: e.target.value })}
                                                        className="w-full border-b border-input bg-transparent py-1 focus:outline-none"
                                                    />
                                                ) : (
                                                    <p className="font-medium">{userInfo.major}</p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <MapPin className="h-4 w-4 text-muted-foreground" />
                                            <div className="flex-1">
                                                <label className="text-xs text-muted-foreground">校区</label>
                                                {isEditing ? (
                                                    <input
                                                        value={editedInfo.campus}
                                                        onChange={(e) => setEditedInfo({ ...editedInfo, campus: e.target.value })}
                                                        className="w-full border-b border-input bg-transparent py-1 focus:outline-none"
                                                    />
                                                ) : (
                                                    <p className="font-medium">{userInfo.campus}</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {isEditing && (
                                        <Button
                                            onClick={handleSaveInfo}
                                            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                                        >
                                            保存修改
                                        </Button>
                                    )}
                                </div>
                            </div>

                            {/* 学习统计卡片 */}
                            <div className="rounded-xl border border-border bg-card p-6">
                                <h2 className="text-lg font-semibold text-foreground mb-6">学习统计</h2>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="rounded-lg bg-blue-500/10 p-2">
                                                <Clock className="h-4 w-4 text-blue-500" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-muted-foreground">总学习时长</p>
                                                <p className="text-lg font-bold">{studyStats.totalStudyHours} 小时</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="rounded-lg bg-green-500/10 p-2">
                                                <Award className="h-4 w-4 text-green-500" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-muted-foreground">平均成绩</p>
                                                <p className="text-lg font-bold">{studyStats.averageScore} 分</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="rounded-lg bg-purple-500/10 p-2">
                                                <Calendar className="h-4 w-4 text-purple-500" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-muted-foreground">出勤率</p>
                                                <p className="text-lg font-bold">{studyStats.attendanceRate}%</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="rounded-lg bg-amber-500/10 p-2">
                                                <BookOpen className="h-4 w-4 text-amber-500" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-muted-foreground">完成课程</p>
                                                <p className="text-lg font-bold">{studyStats.completedCourses} 门</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 右侧：出勤信息和练习记录 */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* 出勤信息 */}
                            <div className="rounded-xl border border-border bg-card p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-lg font-semibold text-foreground">近期出勤记录</h2>
                                    <Button variant="ghost" size="sm" className="text-primary">
                                        查看全部
                                        <ChevronRight className="h-4 w-4 ml-1" />
                                    </Button>
                                </div>

                                <div className="overflow-hidden rounded-lg border border-border">
                                    <table className="w-full">
                                        <thead className="bg-muted">
                                            <tr>
                                                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">日期</th>
                                                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">课程</th>
                                                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">时间</th>
                                                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">状态</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {attendanceRecords.map((record, index) => (
                                                <tr key={index} className="border-t border-border hover:bg-accent/50">
                                                    <td className="px-4 py-3 text-sm">{record.date}</td>
                                                    <td className="px-4 py-3 text-sm font-medium">{record.course}</td>
                                                    <td className="px-4 py-3 text-sm text-muted-foreground">{record.time}</td>
                                                    <td className="px-4 py-3">
                                                        <span className={cn(
                                                            "px-2 py-1 rounded-full text-xs font-medium",
                                                            record.status === "正常"
                                                                ? "bg-green-100 text-green-700"
                                                                : record.status === "请假"
                                                                    ? "bg-blue-100 text-blue-700"
                                                                    : "bg-amber-100 text-amber-700"
                                                        )}>
                                                            {record.status}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* 练习记录 */}
                            <div className="rounded-xl border border-border bg-card p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-lg font-semibold text-foreground">近期练习记录</h2>
                                    <Button variant="ghost" size="sm" className="text-primary">
                                        查看全部
                                        <ChevronRight className="h-4 w-4 ml-1" />
                                    </Button>
                                </div>

                                <div className="space-y-4">
                                    {practiceRecords.map((record) => (
                                        <div key={record.id} className="rounded-lg border border-border p-4 hover:bg-accent/50 transition-colors">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h3 className="font-medium text-foreground mb-1">{record.title}</h3>
                                                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                                        <span>{record.date}</span>
                                                        <span>时长: {record.duration}</span>
                                                        <span>题目: {record.questions} 道</span>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className={cn(
                                                        "text-lg font-bold",
                                                        record.score >= 90 ? "text-green-600" : record.score >= 80 ? "text-primary" : "text-amber-600"
                                                    )}>
                                                        {record.score} 分
                                                    </div>
                                                    <div className="h-2 w-32 rounded-full bg-muted overflow-hidden mt-1">
                                                        <div
                                                            className={cn(
                                                                "h-full rounded-full",
                                                                record.score >= 90 ? "bg-green-500" : record.score >= 80 ? "bg-primary" : "bg-amber-500"
                                                            )}
                                                            style={{ width: `${record.score}%` }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // 错题本页面
    if (subModule === "wrong-book") {
        return (
            <div className="h-full overflow-y-auto bg-background p-6">
                <div className="mx-auto max-w-6xl">
                    <h1 className="text-2xl font-bold text-foreground mb-2">错题本</h1>
                    <p className="text-muted-foreground mb-6">记录和分析你的错题，提升学习效果</p>

                    {/* 统计卡片 */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                        <div className="rounded-xl border border-border bg-card p-4">
                            <div className="flex items-center gap-3">
                                <div className="rounded-lg bg-primary/10 p-2">
                                    <BookX className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">错题总数</p>
                                    <p className="text-2xl font-bold">{wrongQuestions.length} 题</p>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-xl border border-border bg-card p-4">
                            <div className="flex items-center gap-3">
                                <div className="rounded-lg bg-green-500/10 p-2">
                                    <CheckCircle className="h-5 w-5 text-green-500" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">已掌握</p>
                                    <p className="text-2xl font-bold">
                                        {wrongQuestions.filter(q => q.status === "已掌握").length} 题
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-xl border border-border bg-card p-4">
                            <div className="flex items-center gap-3">
                                <div className="rounded-lg bg-amber-500/10 p-2">
                                    <XCircle className="h-5 w-5 text-amber-500" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">未掌握</p>
                                    <p className="text-2xl font-bold">
                                        {wrongQuestions.filter(q => q.status === "未掌握").length} 题
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-xl border border-border bg-card p-4">
                            <div className="flex items-center gap-3">
                                <div className="rounded-lg bg-purple-500/10 p-2">
                                    <Target className="h-5 w-5 text-purple-500" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">掌握率</p>
                                    <p className="text-2xl font-bold">
                                        {Math.round(wrongQuestions.filter(q => q.status === "已掌握").length / wrongQuestions.length * 100)}%
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 筛选器 */}
                    <div className="mb-6 flex flex-wrap items-center gap-4">
                        <div>
                            <label className="text-sm font-medium text-foreground mr-2">科目:</label>
                            <div className="flex gap-2">
                                {subjects.map(subject => (
                                    <button
                                        key={subject}
                                        onClick={() => setFilterSubject(subject)}
                                        className={cn(
                                            "px-3 py-1 rounded-full text-sm transition-colors",
                                            filterSubject === subject
                                                ? "bg-primary text-primary-foreground"
                                                : "bg-muted text-muted-foreground hover:bg-accent"
                                        )}
                                    >
                                        {subject}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="text-sm font-medium text-foreground mr-2">状态:</label>
                            <div className="flex gap-2">
                                {statuses.map(status => (
                                    <button
                                        key={status}
                                        onClick={() => setFilterStatus(status)}
                                        className={cn(
                                            "px-3 py-1 rounded-full text-sm transition-colors",
                                            filterStatus === status
                                                ? "bg-primary text-primary-foreground"
                                                : "bg-muted text-muted-foreground hover:bg-accent"
                                        )}
                                    >
                                        {status}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* 错题列表 */}
                    <div className="space-y-4">
                        {filteredQuestions.map((item) => (
                            <div key={item.id} className="rounded-xl border border-border bg-card p-5 hover:shadow-md transition-all">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-3">
                                            <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(item.difficulty)}`}>
                                                {item.difficulty}
                                            </span>
                                            <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(item.status)}`}>
                                                {item.status}
                                            </span>
                                            <span className="text-xs text-muted-foreground">{item.subject} · {item.topic}</span>
                                        </div>

                                        <h3 className="font-medium text-foreground mb-3">{item.question}</h3>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="rounded-lg bg-red-50 border border-red-200 p-3">
                                                <p className="text-xs text-red-600 font-medium mb-1">我的答案</p>
                                                <p className="text-red-700">{item.studentAnswer}</p>
                                            </div>

                                            <div className="rounded-lg bg-green-50 border border-green-200 p-3">
                                                <p className="text-xs text-green-600 font-medium mb-1">正确答案</p>
                                                <p className="text-green-700">{item.correctAnswer}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between border-t border-border pt-4">
                                    <span className="text-sm text-muted-foreground">{item.date}</span>
                                    <div className="flex gap-2">
                                        <Button variant="outline" size="sm" className="border-primary/20 text-primary">
                                            重新练习
                                        </Button>
                                        <Button variant="outline" size="sm" className="border-green-200 text-green-600">
                                            {item.status === "已掌握" ? "已掌握" : "标记掌握"}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    // 默认页面
    return (
        <div className="h-full flex flex-col items-center justify-center bg-background p-6">
            <div className="w-full max-w-md text-center">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                    <User className="h-10 w-10 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-2">个人中心</h2>
                <p className="text-muted-foreground mb-6">请从左侧菜单选择具体功能</p>

                <div className="grid grid-cols-2 gap-4">
                    <Button
                        className="h-20 flex-col gap-2 bg-primary/10 hover:bg-primary/20 border-primary/20"
                        variant="outline"
                    >
                        <User className="h-6 w-6 text-primary" />
                        <span className="font-medium">个人信息</span>
                    </Button>
                    <Button
                        className="h-20 flex-col gap-2 bg-amber-500/10 hover:bg-amber-500/20 border-amber-500/20"
                        variant="outline"
                    >
                        <BookX className="h-6 w-6 text-amber-500" />
                        <span className="font-medium">错题本</span>
                    </Button>
                </div>
            </div>
        </div>
    );
}