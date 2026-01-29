// /components/assistant/homework-practice.tsx
"use client";

import { useState, useRef } from "react";
import {
  Upload,
  ImageIcon,
  Type,
  FileCheck,
  HelpCircle,
  Clock,
  CheckCircle2,
  XCircle,
  ChevronRight,
  Download,
  MessageSquare,
  FileText,
  Calendar,
  BookOpen,
  Trash2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import type { SubModule } from "./learning-sidebar";

interface HomeworkPracticeProps {
  subModule: SubModule;
}

interface Homework {
  id: number;
  title: string;
  description: string;
  deadline: string;
  status: "未提交" | "已提交" | "已批改" | "已过期";
  questions: number;
  totalScore?: number;
  studentScore?: number;
  teacherFeedback?: string;
}

interface DifficultQuestion {
  id: number;
  question: string;
  subject: string;
  status: "已解答" | "解答中" | "待解答";
  date: string;
  answer?: string;
  difficulty: "简单" | "中等" | "困难";
}

export function HomeworkPractice({ subModule }: HomeworkPracticeProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [description, setDescription] = useState("");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string>("数学");
  const [selectedDifficulty, setSelectedDifficulty] = useState<"简单" | "中等" | "困难">("中等");

  const subjects = ["数学", "物理", "化学", "计算机", "英语", "其他"];

  // 作业提交数据
  const homeworks: Homework[] = [
    {
      id: 1,
      title: "第3章课后习题",
      description: "完成课本第3章所有课后习题，重点掌握导数计算",
      deadline: "2024-01-20",
      status: "已提交",
      questions: 8,
      studentScore: 85,
      teacherFeedback: "完成得很好，但在第5题的计算过程中有步骤错误，请复习相关知识点。"
    },
    {
      id: 2,
      title: "期中作业报告",
      description: "机器学习中的梯度下降算法研究报告",
      deadline: "2024-01-25",
      status: "已批改",
      questions: 1,
      studentScore: 92,
      teacherFeedback: "报告内容详实，分析深入，图表清晰，优秀！"
    },
    {
      id: 3,
      title: "编程实践作业",
      description: "实现一个简单的线性回归模型",
      deadline: "2024-01-30",
      status: "未提交",
      questions: 3
    },
    {
      id: 4,
      title: "第2章知识点总结",
      description: "总结第二章所有重要知识点和公式",
      deadline: "2024-01-18",
      status: "已过期",
      questions: 1
    }
  ];

  // 难题解答数据
  const difficultQuestions: DifficultQuestion[] = [
    {
      id: 1,
      question: "如何理解梯度下降算法中的学习率？为什么学习率过大或过小都会影响收敛？",
      subject: "机器学习",
      status: "已解答",
      date: "2024-01-15",
      difficulty: "中等",
      answer: "学习率决定了每次参数更新的步长。学习率过大可能导致在最优解附近震荡，甚至发散；学习率过小则收敛速度缓慢，可能陷入局部最优。一般建议使用学习率衰减策略。"
    },
    {
      id: 2,
      question: "反向传播算法的详细推导过程，特别是链式法则的应用",
      subject: "深度学习",
      status: "解答中",
      date: "2024-01-14",
      difficulty: "困难"
    },
    {
      id: 3,
      question: "卷积神经网络中卷积层和池化层各自的作用是什么？",
      subject: "计算机视觉",
      status: "已解答",
      date: "2024-01-12",
      difficulty: "简单",
      answer: "卷积层用于提取图像特征，通过卷积核在图像上滑动计算特征图；池化层用于降采样，减少参数数量，防止过拟合，同时保持特征不变性。"
    },
    {
      id: 4,
      question: "如何理解PCA主成分分析中的特征值和特征向量？",
      subject: "数学",
      status: "待解答",
      date: "2024-01-10",
      difficulty: "中等"
    }
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitQuestion = () => {
    if (!description.trim() && !uploadedImage) {
      alert("请描述你的问题或上传图片");
      return;
    }

    const newQuestion: DifficultQuestion = {
      id: difficultQuestions.length + 1,
      question: description || "上传图片问题",
      subject: selectedSubject,
      status: "待解答",
      date: new Date().toISOString().split('T')[0],
      difficulty: selectedDifficulty
    };

    // 在实际应用中，这里应该发送到服务器
    alert(`问题已提交！\n科目：${selectedSubject}\n难度：${selectedDifficulty}`);

    // 重置表单
    setDescription("");
    setUploadedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const getStatusColor = (status: Homework["status"]) => {
    switch (status) {
      case "已提交": return "bg-blue-100 text-blue-700 border-blue-200";
      case "已批改": return "bg-green-100 text-green-700 border-green-200";
      case "未提交": return "bg-amber-100 text-amber-700 border-amber-200";
      case "已过期": return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getStatusIcon = (status: Homework["status"]) => {
    switch (status) {
      case "已提交": return <Clock className="h-4 w-4" />;
      case "已批改": return <CheckCircle2 className="h-4 w-4" />;
      case "未提交": return <XCircle className="h-4 w-4" />;
      case "已过期": return <XCircle className="h-4 w-4" />;
    }
  };

  const getDifficultyColor = (difficulty: DifficultQuestion["difficulty"]) => {
    switch (difficulty) {
      case "简单": return "bg-green-100 text-green-700";
      case "中等": return "bg-amber-100 text-amber-700";
      case "困难": return "bg-red-100 text-red-700";
    }
  };

  const getStatusColorForQuestion = (status: DifficultQuestion["status"]) => {
    switch (status) {
      case "已解答": return "bg-green-100 text-green-700";
      case "解答中": return "bg-blue-100 text-blue-700";
      case "待解答": return "bg-amber-100 text-amber-700";
    }
  };

  // 作业提交页面 - 完全不变
  if (subModule === "homework-submit") {
    return (
      <div className="flex h-full flex-col bg-background">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-foreground mb-2">作业提交</h2>
          <p className="text-muted-foreground mb-6">查看并提交老师布置的作业</p>

          {/* 作业列表 */}
          <div className="space-y-4">
            {homeworks.map((homework) => (
              <div key={homework.id} className="rounded-xl border border-border bg-card p-5 hover:shadow-md transition-all">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`flex items-center gap-2 px-3 py-1 rounded-full border ${getStatusColor(homework.status)}`}>
                        {getStatusIcon(homework.status)}
                        <span className="text-sm font-medium">{homework.status}</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>截止：{homework.deadline}</span>
                      </div>
                    </div>

                    <h3 className="text-lg font-semibold text-foreground mb-2">{homework.title}</h3>
                    <p className="text-muted-foreground mb-3">{homework.description}</p>

                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-muted-foreground">共 {homework.questions} 题</span>
                      {homework.studentScore && (
                        <span className="font-semibold text-primary">得分：{homework.studentScore}/100</span>
                      )}
                    </div>

                    {homework.teacherFeedback && (
                      <div className="mt-4 p-3 rounded-lg bg-blue-50 border border-blue-200">
                        <p className="text-sm font-medium text-blue-700 mb-1">老师评语</p>
                        <p className="text-sm text-blue-600">{homework.teacherFeedback}</p>
                      </div>
                    )}
                  </div>

                  <div className="ml-4 flex flex-col gap-2">
                    {homework.status === "未提交" && (
                      <Button className="bg-primary hover:bg-primary/90 text-white">
                        <FileText className="mr-2 h-4 w-4" />
                        开始作答
                      </Button>
                    )}
                    {homework.status === "已提交" && (
                      <Button variant="outline" className="border-primary/20 text-primary hover:bg-primary/5">
                        <Clock className="mr-2 h-4 w-4" />
                        等待批改
                      </Button>
                    )}
                    {homework.status === "已批改" && (
                      <Button variant="outline" className="border-green-200 text-green-700 hover:bg-green-50">
                        <CheckCircle2 className="mr-2 h-4 w-4" />
                        查看详情
                      </Button>
                    )}
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                      <Download className="h-4 w-4" />
                      下载附件
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 统计数据 */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-xl border border-border bg-card p-4">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-primary/10 p-2">
                  <FileCheck className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">已提交作业</p>
                  <p className="text-2xl font-bold">2份</p>
                </div>
              </div>
            </div>
            <div className="rounded-xl border border-border bg-card p-4">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-green-500/10 p-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">平均分数</p>
                  <p className="text-2xl font-bold">88.5</p>
                </div>
              </div>
            </div>
            <div className="rounded-xl border border-border bg-card p-4">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-blue-500/10 p-2">
                  <Clock className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">待完成作业</p>
                  <p className="text-2xl font-bold">1份</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 难题解答页面 - 删除内置AI对话部分
  if (subModule === "difficult-questions") {
    return (
      <div className="h-full overflow-y-auto bg-background">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-foreground mb-2">难题解答</h2>
          <p className="text-muted-foreground mb-6">上传不会的题目，使用右侧解题助手进行分析</p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 左侧：上传区域 */}
            <div className="lg:col-span-1 space-y-6">
              {/* 上传卡片 */}
              <div className="rounded-xl border border-border bg-card p-6">
                <h2 className="text-lg font-semibold text-foreground mb-4">上传难题</h2>

                {/* 图片上传 */}
                <div
                  className="rounded-lg border-2 border-dashed border-border p-6 text-center hover:border-primary/50 transition-colors cursor-pointer mb-4"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
                  <h3 className="font-medium text-foreground mb-2">上传题目图片</h3>
                  <p className="text-sm text-muted-foreground mb-3">支持jpg、png格式</p>
                  <Button variant="outline" size="sm">
                    <ImageIcon className="mr-2 h-4 w-4" />
                    选择图片
                  </Button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    accept="image/*"
                    className="hidden"
                  />
                </div>

                {/* 文字描述 */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-foreground mb-2">文字描述</label>
                  <Textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="详细描述你的难题..."
                    className="min-h-[100px] resize-none"
                  />
                </div>

                {/* 选项设置 */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">科目</label>
                    <select
                      value={selectedSubject}
                      onChange={(e) => setSelectedSubject(e.target.value)}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                      {subjects.map(subject => (
                        <option key={subject} value={subject}>{subject}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">难度</label>
                    <select
                      value={selectedDifficulty}
                      onChange={(e) => setSelectedDifficulty(e.target.value as any)}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                      <option value="简单">简单</option>
                      <option value="中等">中等</option>
                      <option value="困难">困难</option>
                    </select>
                  </div>
                </div>

                {/* 提交按钮 */}
                <Button
                  onClick={handleSubmitQuestion}
                  className="w-full mt-6 bg-primary hover:bg-primary/90 text-white"
                >
                  <HelpCircle className="mr-2 h-4 w-4" />
                  提交问题
                </Button>

                {/* 上传的图片预览 */}
                {uploadedImage && (
                  <div className="mt-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-foreground">已上传图片</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setUploadedImage(null)}
                        className="h-8 w-8 p-0 text-muted-foreground"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="relative rounded-lg overflow-hidden border border-border">
                      <img
                        src={uploadedImage}
                        alt="上传的题目"
                        className="w-full h-auto"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* 使用提示 */}
              <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
                <div className="flex items-start gap-3">
                  <MessageSquare className="h-5 w-5 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-foreground mb-1">使用提示</h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• 上传题目图片或文字描述</li>
                      <li>• 使用右侧解题助手进行分析</li>
                      <li>• 查看历史问题解答记录</li>
                      <li>• 问题提交后会有老师或AI解答</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* 右侧：历史问题列表 */}
            <div className="lg:col-span-2">
              <div className="rounded-xl border border-border bg-card p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-foreground">历史问题记录</h2>
                  <div className="text-sm text-muted-foreground">
                    共 {difficultQuestions.length} 个问题
                  </div>
                </div>

                <div className="space-y-4">
                  {difficultQuestions.map((item) => (
                    <div key={item.id} className="rounded-lg border border-border p-5 hover:bg-accent/50 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-3">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(item.difficulty)}`}>
                              {item.difficulty}
                            </span>
                            <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColorForQuestion(item.status)}`}>
                              {item.status}
                            </span>
                            <span className="text-xs text-muted-foreground">{item.subject}</span>
                          </div>

                          <h3 className="font-medium text-foreground mb-2">{item.question}</h3>

                          {item.answer && (
                            <div className="mt-3 p-3 rounded-lg bg-green-50 border border-green-200">
                              <p className="text-xs font-medium text-green-600 mb-1">解答:</p>
                              <p className="text-sm text-green-700">{item.answer}</p>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between border-t border-border pt-4 mt-4">
                        <span className="text-sm text-muted-foreground">{item.date}</span>
                        <div className="flex gap-2">
                          {item.status === "待解答" && (
                            <Button variant="outline" size="sm" className="text-primary border-primary/20">
                              使用助手解答
                            </Button>
                          )}
                          {item.status === "解答中" && (
                            <Button variant="outline" size="sm" className="text-blue-600 border-blue-200">
                              查看进度
                            </Button>
                          )}
                          {item.status === "已解答" && (
                            <Button variant="outline" size="sm" className="text-green-600 border-green-200">
                              查看解答详情
                            </Button>
                          )}
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

  // 默认页面 - 完全不变
  return (
    <div className="h-full flex flex-col items-center justify-center bg-background p-6">
      <div className="w-full max-w-md text-center">
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
          <FileCheck className="h-10 w-10 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">作业与练习</h2>
        <p className="text-muted-foreground mb-6">请从左侧菜单选择具体功能</p>

        <div className="grid grid-cols-2 gap-4">
          <Button
            className="h-20 flex-col gap-2 bg-blue-500/10 hover:bg-blue-500/20 border-blue-500/20"
            variant="outline"
          >
            <FileCheck className="h-6 w-6 text-blue-500" />
            <span className="font-medium">作业提交</span>
          </Button>
          <Button
            className="h-20 flex-col gap-2 bg-purple-500/10 hover:bg-purple-500/20 border-purple-500/20"
            variant="outline"
          >
            <HelpCircle className="h-6 w-6 text-purple-500" />
            <span className="font-medium">难题解答</span>
          </Button>
        </div>
      </div>
    </div>
  );
}