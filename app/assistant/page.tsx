// /app/assistant/page.tsx
"use client";

import { useState } from "react";
import { TopNavbar } from "@/components/top-navbar";
import { BookOpen, BookUser, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

// 二级导航类型
type AssistantMode = "learning" | "teaching";

// 课程接口定义
interface Course {
  id: string;
  name: string;
  className: string;
  studentCount: number;
  pendingHomework: number;
  description?: string;
  progress?: number;
}

// 课程列表组件
function CourseList({
  mode,
  onSelectCourse
}: {
  mode: AssistantMode;
  onSelectCourse: (course: Course) => void;
}) {
  const learningCourses: Course[] = [
    { id: "learn1", name: "机器学习导论", className: "李教授课程", studentCount: 0, pendingHomework: 0, description: "李教授 · 48学时", progress: 75 },
    { id: "learn2", name: "深度学习", className: "王教授课程", studentCount: 0, pendingHomework: 0, description: "王教授 · 64学时", progress: 60 },
    { id: "learn3", name: "自然语言处理", className: "张教授课程", studentCount: 0, pendingHomework: 0, description: "张教授 · 48学时", progress: 40 },
    { id: "learn4", name: "计算机视觉", className: "刘教授课程", studentCount: 0, pendingHomework: 0, description: "刘教授 · 48学时", progress: 90 },
  ];

  const teachingCourses: Course[] = [
    { id: "teach1", name: "人工智能导论", className: "AI2023级", studentCount: 48, pendingHomework: 23, description: "AI2023级" },
    { id: "teach2", name: "数据结构与算法", className: "CS2022级", studentCount: 120, pendingHomework: 45, description: "CS2022级" },
    { id: "teach3", name: "Python编程", className: "CS2024级", studentCount: 80, pendingHomework: 12, description: "CS2024级" },
    { id: "teach4", name: "机器学习实践", className: "AI2022级", studentCount: 60, pendingHomework: 8, description: "AI2022级" },
  ];

  const courses = mode === "learning" ? learningCourses : teachingCourses;
  const title = mode === "learning" ? "我的学习课程" : "我的教学课程";
  const subtitle = mode === "learning" ? "选择课程开始学习" : "选择课程进行教学管理";

  return (
    <div className="h-full overflow-hidden flex flex-col">
      <div className="flex-shrink-0 p-6 pb-4">
        <h1 className="text-2xl font-bold text-foreground">{title}</h1>
        <p className="text-muted-foreground mt-2">{subtitle}</p>
      </div>

      <div className="flex-1 overflow-y-auto px-6 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <button
              key={course.id}
              onClick={() => onSelectCourse(course)}
              className="group text-left p-5 rounded-xl border border-border bg-card hover:bg-accent/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg w-full flex flex-col min-h-[180px] justify-between"
            >
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`w-3 h-3 rounded-full ${mode === "learning" ? "bg-primary" : "bg-emerald-500"}`} />
                      <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors line-clamp-1">
                        {course.name}
                      </h3>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {course.description || course.className}
                    </p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 ml-2" />
                </div>
              </div>

              {mode === "learning" ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">学习进度</span>
                    <span className="font-medium text-primary">{course.progress}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-secondary overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full" style={{ width: `${course.progress}%` }} />
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-4">
                    <span className="text-muted-foreground">学生：<span className="font-medium text-emerald-500">{course.studentCount}人</span></span>
                    <span className="text-muted-foreground">待批作业：<span className="font-medium text-amber-500">{course.pendingHomework}份</span></span>
                  </div>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// 修改后的详情页组件：图片横向填满，高度超出可滚动
function CourseDetailImageView({
  course,
  mode,
  onBack
}: {
  course: Course;
  mode: AssistantMode;
  onBack: () => void;
}) {
  return (
    <div className="h-full flex flex-col">
      {/* 顶部导航栏 */}
      <div className="flex-shrink-0 border-b border-border/50 bg-background/95 backdrop-blur-sm z-20">
        <div className="mx-auto px-6">
          <div className="flex items-center justify-between h-12">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ChevronRight className="h-4 w-4 rotate-180" />
              返回课程列表
            </button>
            <div className="text-center">
              <h2 className="font-semibold text-foreground">
                {course.name} · {mode === "learning" ? "学习详情" : "教学管理"}
              </h2>
            </div>
            <div className="w-20"></div>
          </div>
        </div>
      </div>

      {/* 图片展示区：实现横向填满且纵向滚动 */}
      <div className="flex-1 bg-background overflow-y-auto">
        <div className="w-full">
          <img
            src="/智能助教.jpg"
            alt="智能助教内容"
            className="w-full h-auto block" // w-full 确保横向填满，h-auto 保持比例，block 去除图片底部间隙
          />
        </div>
      </div>
    </div>
  );
}

export default function AssistantPage() {
  const [activeMode, setActiveMode] = useState<AssistantMode>("learning");
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const handleBackToList = () => {
    setSelectedCourse(null);
  };

  return (
    <div className="flex h-screen flex-col bg-background overflow-hidden">
      <TopNavbar currentPath="/assistant" />

      <div className="flex-1 flex flex-col pt-14 min-h-0 overflow-hidden">
        {!selectedCourse ? (
          <>
            <div className="relative z-40 border-b border-border/50 bg-background/95 backdrop-blur-sm">
              <div className="mx-auto px-6">
                <div className="flex items-center h-14 gap-1">
                  <button
                    onClick={() => setActiveMode("learning")}
                    className={cn(
                      "flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200",
                      activeMode === "learning" ? "bg-primary/20 text-primary" : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                    )}
                  >
                    <BookOpen className="h-4 w-4" />
                    <span>我学的课</span>
                  </button>
                  <button
                    onClick={() => setActiveMode("teaching")}
                    className={cn(
                      "flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200",
                      activeMode === "teaching" ? "bg-primary/20 text-primary" : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                    )}
                  >
                    <BookUser className="h-4 w-4" />
                    <span>我教的课</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="flex-1 min-h-0 overflow-hidden">
              <CourseList
                mode={activeMode}
                onSelectCourse={(course) => setSelectedCourse(course)}
              />
            </div>
          </>
        ) : (
          <CourseDetailImageView
            course={selectedCourse}
            mode={activeMode}
            onBack={handleBackToList}
          />
        )}
      </div>
    </div>
  );
}