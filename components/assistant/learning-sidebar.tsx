// /components/assistant/learning-sidebar.tsx - 侧边栏完整代码
"use client";

import { cn } from "@/lib/utils";
import {
  BookOpen, FileText, ClipboardList,
  Users, Bot, User
} from "lucide-react";

// 模块类型定义
export type LearningModule = "ai-assistant" | "course" | "homework" | "review" | "personal-center";

// 子模块类型定义
export type SubModule =
  | "chat" | "study-plan" | "qna"  // AI 助学小帮手的子模块
  | "video" | "materials" | "knowledge-graph"  // 课程学习的子模块
  | "homework-submit" | "difficult-questions"  // 作业与练习的子模块
  | "smart-paper" | "mock-test" | "weakness-analysis"  // 复习与测评的子模块
  | "personal-info" | "wrong-book";  // 个人中心的子模块

// 教学模式的子模块类型
export type TeachingSubModule =
  | "course-design" | "materials-manage" | "course-schedule"
  | "homework-manage" | "homework-review" | "grading-analysis"
  | "exam-design" | "score-analysis" | "student-report";

interface LearningSidebarProps {
  activeModule: LearningModule;
  activeSubModule: SubModule | TeachingSubModule;
  onModuleChange: (module: LearningModule) => void;
  onSubModuleChange: (subModule: SubModule | TeachingSubModule) => void;
  mode?: "learning" | "teaching"; // 学习或教学模式
}

// 学习模式的模块配置
const learningModules = [
  {
    id: "ai-assistant" as LearningModule,
    label: "AI助学小帮手",
    icon: Bot,
    subItems: [
      { id: "chat" as SubModule, label: "AI对话" },
      { id: "study-plan" as SubModule, label: "学习计划" },
      { id: "qna" as SubModule, label: "智能问答" },
    ],
  },
  {
    id: "course" as LearningModule,
    label: "课程学习",
    icon: BookOpen,
    subItems: [
      { id: "video" as SubModule, label: "视频课程" },
      { id: "materials" as SubModule, label: "课件资料" },
      { id: "knowledge-graph" as SubModule, label: "知识图谱" },
    ],
  },
  {
    id: "homework" as LearningModule,
    label: "作业与练习",
    icon: FileText,
    subItems: [
      { id: "homework-submit" as SubModule, label: "作业提交" },
      { id: "difficult-questions" as SubModule, label: "难题解答" },
    ],
  },
  {
    id: "review" as LearningModule,
    label: "复习与测评",
    icon: ClipboardList,
    subItems: [
      { id: "smart-paper" as SubModule, label: "智能组卷" },
      { id: "mock-test" as SubModule, label: "模拟测试" },
      { id: "weakness-analysis" as SubModule, label: "薄弱点分析" },
    ],
  },
  {
    id: "personal-center" as LearningModule,
    label: "个人中心",
    icon: User,
    subItems: [
      { id: "personal-info" as SubModule, label: "个人信息" },
      { id: "wrong-book" as SubModule, label: "错题本" },
    ],
  },
];

// 教学模式的模块配置
const teachingModules = [
  {
    id: "course" as LearningModule,
    label: "课程管理",
    icon: BookOpen,
    subItems: [
      { id: "course-design" as TeachingSubModule, label: "课程设计" },
      { id: "materials-manage" as TeachingSubModule, label: "资料管理" },
      { id: "course-schedule" as TeachingSubModule, label: "课程安排" },
    ],
  },
  {
    id: "homework" as LearningModule,
    label: "作业管理",
    icon: FileText,
    subItems: [
      { id: "homework-manage" as TeachingSubModule, label: "作业布置" },
      { id: "homework-review" as TeachingSubModule, label: "作业批改" },
      { id: "grading-analysis" as TeachingSubModule, label: "评分分析" },
    ],
  },
  {
    id: "review" as LearningModule,
    label: "考试与评估",
    icon: ClipboardList,
    subItems: [
      { id: "exam-design" as TeachingSubModule, label: "试卷设计" },
      { id: "score-analysis" as TeachingSubModule, label: "成绩分析" },
      { id: "student-report" as TeachingSubModule, label: "学生报告" },
    ],
  },
];

export function LearningSidebar({
  activeModule,
  activeSubModule,
  onModuleChange,
  onSubModuleChange,
  mode = "learning", // 默认学习模式
}: LearningSidebarProps) {
  const modules = mode === "learning" ? learningModules : teachingModules;
  const title = mode === "learning" ? "学习中心" : "教学中心";
  const iconBg = mode === "learning" ? "bg-primary" : "bg-emerald-500";
  const progressColor = mode === "learning" ? "from-primary to-purple-400" : "from-emerald-500 to-teal-400";

  // 获取当前激活模块的子项目
  const currentModule = modules.find(m => m.id === activeModule);
  const currentSubItems = currentModule?.subItems || [];

  // 根据活动模块选择图标
  const getHeaderIcon = () => {
    if (mode === "teaching") {
      return <Users className="h-4 w-4" />;
    }
    if (activeModule === "ai-assistant") {
      return <Bot className="h-4 w-4" />;
    }
    if (activeModule === "personal-center") {
      return <User className="h-4 w-4" />;
    }
    return <BookOpen className="h-4 w-4" />;
  };

  return (
    <aside className="flex h-full w-60 flex-col border-r border-sidebar-border bg-sidebar">
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-sidebar-border px-4 py-4">
        <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${iconBg} text-primary-foreground`}>
          {getHeaderIcon()}
        </div>
        <span className="font-semibold text-sidebar-foreground">{title}</span>
      </div>

      {/* Module List */}
      <div className="flex-1 overflow-y-auto p-3">
        {modules.map((module) => {
          const isActive = activeModule === module.id;
          const Icon = module.icon;

          return (
            <div key={module.id} className="mb-2">
              <button
                type="button"
                onClick={() => onModuleChange(module.id)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left font-medium transition-all",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground"
                )}
              >
                <Icon className="h-5 w-5" />
                <span>{module.label}</span>
              </button>

              {/* Sub Items */}
              {isActive && (
                <div className="ml-4 mt-1 space-y-1 border-l-2 border-sidebar-ring/30 pl-4">
                  {currentSubItems.map((sub) => (
                    <button
                      key={sub.id}
                      type="button"
                      onClick={() => onSubModuleChange(sub.id)}
                      className={cn(
                        "w-full rounded-md px-3 py-2 text-left text-sm transition-all",
                        activeSubModule === sub.id
                          ? "bg-primary text-primary-foreground font-medium"
                          : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground"
                      )}
                    >
                      {sub.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Progress/Status Section */}
      <div className="border-t border-sidebar-border p-4">
        {mode === "learning" ? (
          // 学习模式的进度显示
          <div className="rounded-lg bg-card p-3 shadow-sm border border-border">
            <div className="mb-2 text-xs font-medium text-muted-foreground">
              {activeModule === "ai-assistant" ? "AI助手状态" : "今日学习进度"}
            </div>
            {activeModule === "ai-assistant" ? (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-card-foreground">累计解答</span>
                  <span className="font-semibold text-primary">128个问题</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-card-foreground">准确率</span>
                  <span className="font-semibold text-green-500">94.2%</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-card-foreground">响应时间</span>
                  <span className="font-semibold text-blue-500">0.8s</span>
                </div>
              </div>
            ) : (
              <>
                <div className="mb-1 flex justify-between text-sm">
                  <span className="text-card-foreground">已完成</span>
                  <span className="font-semibold text-primary">65%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div className={`h-full w-[65%] rounded-full bg-gradient-to-r ${progressColor}`} />
                </div>
              </>
            )}
          </div>
        ) : (
          // 教学模式的统计显示
          <div className="rounded-lg bg-card p-3 shadow-sm border border-border">
            <div className="mb-3 text-xs font-medium text-muted-foreground">教学概览</div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-card-foreground">总学生数</span>
                <span className="font-semibold text-emerald-500">48人</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-card-foreground">待批作业</span>
                <span className="font-semibold text-amber-500">23份</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-card-foreground">课程完成率</span>
                <span className="font-semibold text-blue-500">92%</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}