// components/assistant/study-plan.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Calendar,
    Target,
    TrendingUp,
    CheckCircle2,
    Clock,
    BookOpen,
    Brain,
    Sparkles,
    Plus,
    Trash2,
    ChevronRight,
    AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface StudyTask {
    id: string;
    title: string;
    description: string;
    dueDate: string;
    priority: "high" | "medium" | "low";
    completed: boolean;
    estimatedTime: string;
    course: string;
}

interface LearningGoal {
    id: string;
    title: string;
    description: string;
    progress: number;
    deadline: string;
    tasks: number;
    completedTasks: number;
}

export function StudyPlan() {
    const [aiPrompt, setAiPrompt] = useState("帮我制定一个为期一周的机器学习复习计划");
    const [isGenerating, setIsGenerating] = useState(false);

    // 示例学习任务
    const [tasks, setTasks] = useState<StudyTask[]>([
        {
            id: "1",
            title: "复习神经网络基础",
            description: "理解前向传播和反向传播算法",
            dueDate: "今天",
            priority: "high",
            completed: false,
            estimatedTime: "2小时",
            course: "机器学习导论"
        },
        {
            id: "2",
            title: "完成作业三",
            description: "实现逻辑回归算法",
            dueDate: "明天",
            priority: "high",
            completed: true,
            estimatedTime: "3小时",
            course: "机器学习导论"
        },
        {
            id: "3",
            title: "预习CNN章节",
            description: "了解卷积神经网络的基本结构",
            dueDate: "后天",
            priority: "medium",
            completed: false,
            estimatedTime: "1.5小时",
            course: "深度学习"
        },
        {
            id: "4",
            title: "阅读论文1",
            description: "阅读Attention Is All You Need",
            dueDate: "本周五",
            priority: "medium",
            completed: false,
            estimatedTime: "2小时",
            course: "自然语言处理"
        },
    ]);

    // 学习目标
    const [goals, setGoals] = useState<LearningGoal[]>([
        {
            id: "1",
            title: "掌握机器学习核心算法",
            description: "理解并实现主要机器学习算法",
            progress: 65,
            deadline: "2周后",
            tasks: 8,
            completedTasks: 5
        },
        {
            id: "2",
            title: "完成深度学习项目",
            description: "构建一个图像分类模型",
            progress: 30,
            deadline: "1个月后",
            tasks: 6,
            completedTasks: 2
        },
        {
            id: "3",
            title: "准备期末考试",
            description: "系统复习所有课程内容",
            progress: 45,
            deadline: "3周后",
            tasks: 12,
            completedTasks: 5
        },
    ]);

    const handleGeneratePlan = () => {
        setIsGenerating(true);
        setTimeout(() => {
            setIsGenerating(false);
            // 模拟添加新任务
            const newTask: StudyTask = {
                id: (tasks.length + 1).toString(),
                title: "AI生成的学习任务",
                description: "根据您的学习进度和目标智能生成",
                dueDate: "明天",
                priority: "medium",
                completed: false,
                estimatedTime: "1.5小时",
                course: "智能推荐"
            };
            setTasks([...tasks, newTask]);
        }, 1500);
    };

    const toggleTaskCompletion = (id: string) => {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    };

    return (
        <div className="h-full overflow-y-auto p-6">
            {/* AI 计划生成器 */}
            <Card className="mb-6 border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/70">
                            <Brain className="h-5 w-5 text-white" />
                        </div>
                        <div>
                            <CardTitle className="text-xl">AI 智能学习计划生成器</CardTitle>
                            <CardDescription>根据您的学习情况，智能制定个性化学习计划</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <Sparkles className="h-4 w-4 text-primary" />
                                <span className="text-sm font-medium">告诉AI您的需求：</span>
                            </div>
                            <div className="flex gap-3">
                                <Textarea
                                    value={aiPrompt}
                                    onChange={(e) => setAiPrompt(e.target.value)}
                                    placeholder="例如：帮我制定一个为期一周的机器学习复习计划，每天2小时..."
                                    className="flex-1 resize-none min-h-[80px] bg-background"
                                />
                                <div className="flex flex-col gap-2">
                                    <Button
                                        onClick={handleGeneratePlan}
                                        disabled={isGenerating}
                                        className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                                    >
                                        {isGenerating ? (
                                            <span className="flex items-center gap-2">
                                                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                                生成中...
                                            </span>
                                        ) : (
                                            <>
                                                <Sparkles className="mr-2 h-4 w-4" />
                                                生成计划
                                            </>
                                        )}
                                    </Button>
                                    <Button variant="outline" size="sm">
                                        <BookOpen className="mr-2 h-4 w-4" />
                                        使用模板
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* 快捷指令 */}
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <Target className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm font-medium">快捷指令：</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <Button variant="secondary" size="sm" onClick={() => setAiPrompt("帮我制定期末考试复习计划")}>
                                    期末复习计划
                                </Button>
                                <Button variant="secondary" size="sm" onClick={() => setAiPrompt("制定每日2小时编程学习计划")}>
                                    每日学习计划
                                </Button>
                                <Button variant="secondary" size="sm" onClick={() => setAiPrompt("针对薄弱知识点制定专项训练计划")}>
                                    专项训练计划
                                </Button>
                                <Button variant="secondary" size="sm" onClick={() => setAiPrompt("制定项目驱动的学习计划")}>
                                    项目学习计划
                                </Button>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-2 gap-6">
                {/* 左侧：今日任务 */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-5 w-5 text-primary" />
                                    <CardTitle>今日学习任务</CardTitle>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-muted-foreground">
                                        {tasks.filter(t => t.completed).length}/{tasks.length} 已完成
                                    </span>
                                    <Button variant="outline" size="sm">
                                        <Plus className="h-4 w-4" />
                                        添加
                                    </Button>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {tasks.map((task) => (
                                    <div
                                        key={task.id}
                                        className={cn(
                                            "flex items-start gap-3 p-3 rounded-lg border transition-all hover:shadow-sm",
                                            task.completed ? "bg-muted/50 border-muted" : "bg-background border-border"
                                        )}
                                    >
                                        <button
                                            onClick={() => toggleTaskCompletion(task.id)}
                                            className={cn(
                                                "mt-0.5 flex h-5 w-5 items-center justify-center rounded-full border transition-colors",
                                                task.completed
                                                    ? "bg-primary border-primary text-primary-foreground"
                                                    : "border-border hover:border-primary"
                                            )}
                                        >
                                            {task.completed && <CheckCircle2 className="h-3 w-3" />}
                                        </button>

                                        <div className="flex-1">
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <div className={cn(
                                                        "font-medium",
                                                        task.completed ? "text-muted-foreground line-through" : "text-foreground"
                                                    )}>
                                                        {task.title}
                                                    </div>
                                                    <div className="text-sm text-muted-foreground mt-1">{task.description}</div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className={cn(
                                                        "text-xs px-2 py-0.5 rounded-full",
                                                        task.priority === "high"
                                                            ? "bg-destructive/10 text-destructive"
                                                            : task.priority === "medium"
                                                                ? "bg-warning/10 text-warning"
                                                                : "bg-success/10 text-success"
                                                    )}>
                                                        {task.priority === "high" ? "高优先级" : task.priority === "medium" ? "中优先级" : "低优先级"}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                                                <div className="flex items-center gap-1">
                                                    <Clock className="h-3 w-3" />
                                                    {task.dueDate}
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <BookOpen className="h-3 w-3" />
                                                    {task.course}
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Clock className="h-3 w-3" />
                                                    {task.estimatedTime}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* 学习分析 */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <TrendingUp className="h-5 w-5 text-primary" />
                                <CardTitle>学习进度分析</CardTitle>
                            </div>
                            <CardDescription>AI分析您的学习习惯和效率</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div>
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-sm">学习坚持度</span>
                                        <span className="text-sm font-medium">85%</span>
                                    </div>
                                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                                        <div className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full w-4/5" />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-sm">任务完成率</span>
                                        <span className="text-sm font-medium">72%</span>
                                    </div>
                                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                                        <div className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full w-[72%]" />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-sm">学习效率评分</span>
                                        <span className="text-sm font-medium">8.5/10</span>
                                    </div>
                                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                                        <div className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full w-[85%]" />
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button variant="outline" className="w-full">
                                <Brain className="mr-2 h-4 w-4" />
                                查看详细分析报告
                            </Button>
                        </CardFooter>
                    </Card>
                </div>

                {/* 右侧：学习目标与建议 */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Target className="h-5 w-5 text-primary" />
                                    <CardTitle>学习目标</CardTitle>
                                </div>
                                <Button variant="outline" size="sm">
                                    <Plus className="h-4 w-4" />
                                    新建目标
                                </Button>
                            </div>
                            <CardDescription>设定并追踪您的学习目标</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {goals.map((goal) => (
                                    <div key={goal.id} className="p-3 border rounded-lg hover:border-primary/50 transition-colors">
                                        <div className="flex items-start justify-between mb-2">
                                            <div>
                                                <div className="font-medium">{goal.title}</div>
                                                <div className="text-sm text-muted-foreground mt-1">{goal.description}</div>
                                            </div>
                                            <div className="text-sm text-muted-foreground">
                                                截止：{goal.deadline}
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between text-sm">
                                                <span>进度</span>
                                                <span className="font-medium">{goal.progress}%</span>
                                            </div>
                                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full transition-all duration-500"
                                                    style={{ width: `${goal.progress}%` }}
                                                />
                                            </div>
                                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                                                <span>任务：{goal.completedTasks}/{goal.tasks}</span>
                                                <span className="flex items-center gap-1">
                                                    <CheckCircle2 className="h-3 w-3" />
                                                    {Math.round((goal.completedTasks / goal.tasks) * 100)}%
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* AI 学习建议 */}
                    <Card className="border-2 border-primary/20">
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <Brain className="h-5 w-5 text-primary" />
                                <CardTitle>AI 学习建议</CardTitle>
                            </div>
                            <CardDescription>基于您的学习数据，AI为您提供个性化建议</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                <div className="flex items-start gap-2 p-3 bg-primary/5 rounded-lg border border-primary/10">
                                    <AlertCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                    <div>
                                        <div className="font-medium text-sm">检测到学习时间分布不均</div>
                                        <div className="text-xs text-muted-foreground mt-1">
                                            建议：将深度学习的学习时间从晚间调整到上午，效率可提升30%
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-start gap-2 p-3 bg-primary/5 rounded-lg border border-primary/10">
                                    <AlertCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                    <div>
                                        <div className="font-medium text-sm">机器学习基础知识掌握良好</div>
                                        <div className="text-xs text-muted-foreground mt-1">
                                            建议：可以开始挑战更复杂的算法和项目，如推荐系统或时间序列预测
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-start gap-2 p-3 bg-primary/5 rounded-lg border border-primary/10">
                                    <AlertCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                    <div>
                                        <div className="font-medium text-sm">发现学习效率提升机会</div>
                                        <div className="text-xs text-muted-foreground mt-1">
                                            建议：使用番茄工作法，每学习25分钟休息5分钟，可保持专注度
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button variant="outline" className="w-full">
                                <Sparkles className="mr-2 h-4 w-4" />
                                获取更多AI建议
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
}