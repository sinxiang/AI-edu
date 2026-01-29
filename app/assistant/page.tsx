// /app/assistant/page.tsx - 主界面完整代码
"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { TopNavbar } from "@/components/top-navbar";
import {
  LearningSidebar,
  type LearningModule,
  type SubModule,
  type TeachingSubModule
} from "@/components/assistant/learning-sidebar";
import { CourseLearning } from "@/components/assistant/course-learning";
import { HomeworkPractice } from "@/components/assistant/homework-practice";
import { ReviewAssessment } from "@/components/assistant/review-assessment";
import { AiAssistantLearning } from "@/components/assistant/ai-assistant-learning";
import { PersonalCenter } from "@/components/assistant/personal-center";
import { AiHelpPanel } from "@/components/assistant/ai-help-panel";
import { CourseDesigner } from "@/components/teaching/course-designer";
import { ClassInfoPanel } from "@/components/teaching/class-info-panel";
import { AiTeachingPanel } from "@/components/teaching/ai-teaching-panel";
import { TeacherSidebar } from "@/components/teaching/teacher-sidebar";
import { BookOpen, BookUser, ChevronRight } from "lucide-react";
// /app/assistant/page.tsx - 在import部分添加
import { CourseTemplateLibrary } from "@/components/teaching/resource-library/CourseTemplateLibrary";
import { ExerciseLibrary } from "@/components/teaching/resource-library/ExerciseLibrary";
import { CoursewareLibrary } from "@/components/teaching/resource-library/CoursewareLibrary";
import { CaseLibrary } from "@/components/teaching/resource-library/CaseLibrary";
import { cn } from "@/lib/utils";

// 二级导航类型
type AssistantMode = "learning" | "teaching";

// 课程类型定义 - 与 TeacherSidebar 中的 Course 接口保持一致
interface Course {
  id: string;
  name: string;
  className: string;
  studentCount: number;
  pendingHomework: number;
  description?: string;
  progress?: number;
}

// 课程数据
const teachingCoursesData: Record<string, { name: string; chapterName: string }> = {
  "teach1": { name: "人工智能导论", chapterName: "搜索算法章节" },
  "teach2": { name: "数据结构与算法", chapterName: "树与图章节" },
  "teach3": { name: "Python编程", chapterName: "函数与模块章节" },
  "teach4": { name: "机器学习实践", chapterName: "模型训练章节" },
};

const learningCoursesData: Record<string, { name: string }> = {
  "learn1": { name: "机器学习导论" },
  "learn2": { name: "深度学习" },
  "learn3": { name: "自然语言处理" },
  "learn4": { name: "计算机视觉" },
};

// 二级导航栏组件
function AssistantNavbar({
  activeMode,
  onModeChange
}: {
  activeMode: AssistantMode;
  onModeChange: (mode: AssistantMode) => void;
}) {
  return (
    <div className="relative z-40 border-b border-border/50 bg-background/95 backdrop-blur-sm">
      <div className="mx-auto px-6">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center gap-1">
            <button
              onClick={() => onModeChange("learning")}
              className={cn(
                "flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200",
                activeMode === "learning"
                  ? "bg-primary/20 text-primary"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              <BookOpen className="h-4 w-4" />
              <span>我学的课</span>
            </button>
            <button
              onClick={() => onModeChange("teaching")}
              className={cn(
                "flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200",
                activeMode === "teaching"
                  ? "bg-primary/20 text-primary"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              <BookUser className="h-4 w-4" />
              <span>我教的课</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// 课程列表组件
function CourseList({
  mode,
  onSelectCourse
}: {
  mode: AssistantMode;
  onSelectCourse: (courseId: string) => void;
}) {
  const learningCourses: Course[] = [
    {
      id: "learn1",
      name: "机器学习导论",
      className: "李教授课程",
      studentCount: 0,
      pendingHomework: 0,
      description: "李教授 · 48学时",
      progress: 75
    },
    {
      id: "learn2",
      name: "深度学习",
      className: "王教授课程",
      studentCount: 0,
      pendingHomework: 0,
      description: "王教授 · 64学时",
      progress: 60
    },
    {
      id: "learn3",
      name: "自然语言处理",
      className: "张教授课程",
      studentCount: 0,
      pendingHomework: 0,
      description: "张教授 · 48学时",
      progress: 40
    },
    {
      id: "learn4",
      name: "计算机视觉",
      className: "刘教授课程",
      studentCount: 0,
      pendingHomework: 0,
      description: "刘教授 · 48学时",
      progress: 90
    },
  ];

  const teachingCourses: Course[] = [
    {
      id: "teach1",
      name: "人工智能导论",
      className: "AI2023级",
      studentCount: 48,
      pendingHomework: 23,
      description: "AI2023级"
    },
    {
      id: "teach2",
      name: "数据结构与算法",
      className: "CS2022级",
      studentCount: 120,
      pendingHomework: 45,
      description: "CS2022级"
    },
    {
      id: "teach3",
      name: "Python编程",
      className: "CS2024级",
      studentCount: 80,
      pendingHomework: 12,
      description: "CS2024级"
    },
    {
      id: "teach4",
      name: "机器学习实践",
      className: "AI2022级",
      studentCount: 60,
      pendingHomework: 8,
      description: "AI2022级"
    },
  ];

  const courses = mode === "learning" ? learningCourses : teachingCourses;
  const title = mode === "learning" ? "我的学习课程" : "我的教学课程";
  const subtitle = mode === "learning"
    ? "选择课程开始学习"
    : "选择课程进行教学管理";

  // 添加课程处理函数
  const handleAddCourse = () => {
    // 这里可以添加添加课程的逻辑
    console.log("添加课程");
  };

  return (
    <div className="h-full overflow-hidden flex flex-col">
      <div className="flex-shrink-0 p-6 pb-4">
        <h1 className="text-2xl font-bold text-foreground">{title}</h1>
        <p className="text-muted-foreground mt-2">{subtitle}</p>
      </div>

      <div className="flex-1 overflow-y-auto px-6 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 现有课程方块 */}
          {courses.map((course) => (
            <button
              key={course.id}
              onClick={() => onSelectCourse(course.id)}
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
                    <div
                      className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full transition-all duration-500"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <span className="text-muted-foreground">学生：</span>
                      <span className="font-medium text-emerald-500">{course.studentCount}人</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-muted-foreground">待批作业：</span>
                      <span className="font-medium text-amber-500">{course.pendingHomework}份</span>
                    </div>
                  </div>
                </div>
              )}
            </button>
          ))}

          {/* 添加课程方块 */}
          <button
            onClick={handleAddCourse}
            className="group text-left p-5 rounded-xl border border-dashed border-border/50 bg-transparent hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 hover:shadow-lg w-full flex flex-col min-h-[180px] items-center justify-center gap-3"
          >
            <div className="flex items-center justify-center h-12 w-12 rounded-full border-2 border-dashed border-primary/50 group-hover:border-primary group-hover:bg-primary/10 transition-all duration-300">
              <span className="text-2xl text-primary/50 group-hover:text-primary transition-colors duration-300">
                +
              </span>
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                添加课程
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                {mode === "learning" ? "添加新的学习课程" : "创建新的教学课程"}
              </p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

// 学习模式详情页面
function LearningDetailView({
  courseId,
  onBack
}: {
  courseId: string;
  onBack: () => void;
}) {
  const searchParams = useSearchParams();
  const moduleParam = searchParams.get("module") as LearningModule | null;

  // 默认显示AI助学小帮手
  const [activeModule, setActiveModule] = useState<LearningModule>(moduleParam || "ai-assistant");
  const [activeSubModule, setActiveSubModule] = useState<SubModule>("chat");

  const currentCourse = learningCoursesData[courseId] || { name: "未知课程" };

  useEffect(() => {
    if (moduleParam && ["ai-assistant", "course", "homework", "review", "personal-center"].includes(moduleParam)) {
      setActiveModule(moduleParam as LearningModule);
    }
  }, [moduleParam]);

  const handleModuleChange = (module: LearningModule) => {
    setActiveModule(module);
    // 设置各模块的默认子模块
    if (module === "ai-assistant") setActiveSubModule("chat");
    else if (module === "course") setActiveSubModule("video");
    else if (module === "homework") setActiveSubModule("homework-submit"); // 作业提交为默认
    else if (module === "review") setActiveSubModule("smart-paper");
    else if (module === "personal-center") setActiveSubModule("personal-info"); // 个人信息为默认
  };

  const handleSubModuleChange = (subModule: SubModule | TeachingSubModule) => {
    if ([
      // AI 助学小帮手
      "chat", "study-plan", "qna",
      // 课程学习
      "video", "materials", "knowledge-graph",
      // 作业与练习
      "homework-submit", "difficult-questions",
      // 复习与测评
      "smart-paper", "mock-test", "weakness-analysis",
      // 个人中心
      "personal-info", "wrong-book"
    ].includes(subModule as string)) {
      setActiveSubModule(subModule as SubModule);
    }
  };

  const renderMainContent = () => {
    switch (activeModule) {
      case "ai-assistant":
        return <AiAssistantLearning subModule={activeSubModule} />;
      case "course":
        return <CourseLearning subModule={activeSubModule} />;
      case "homework":
        return <HomeworkPractice subModule={activeSubModule} />;
      case "review":
        return <ReviewAssessment subModule={activeSubModule} />;
      case "personal-center":
        return <PersonalCenter subModule={activeSubModule} />;
      default:
        return <AiAssistantLearning subModule={activeSubModule} />;
    }
  };

  // 只在作业与练习的难题解答页面显示解题助手
  const showAiHelpPanel = activeModule === "homework" && activeSubModule === "difficult-questions";

  return (
    <div className="h-full flex flex-col">
      {/* 返回导航栏 */}
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
                {currentCourse.name} · 学习课程
              </h2>
              <p className="text-xs text-muted-foreground mt-1">
                课程ID: {courseId} | 学生模式
              </p>
            </div>
            <div className="w-20"></div>
          </div>
        </div>
      </div>

      {/* 主内容区域 */}
      <div className="flex-1 flex min-h-0 overflow-hidden">
        {/* 学习模式侧边栏 */}
        <LearningSidebar
          activeModule={activeModule}
          activeSubModule={activeSubModule}
          onModuleChange={handleModuleChange}
          onSubModuleChange={handleSubModuleChange}
          mode="learning"
        />

        {/* 主工作区 */}
        <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
          <div className="flex-1 overflow-y-auto">
            {renderMainContent()}
          </div>
        </div>

        {/* 只在难题解答页面显示解题助手 */}
        {showAiHelpPanel && <AiHelpPanel mode={activeModule} />}
      </div>
    </div>
  );
}

// 修改TeachingDetailView组件
function TeachingDetailView({
  courseId,
  onBack
}: {
  courseId: string;
  onBack: () => void;
}) {
  const [selectedCourseSubOption, setSelectedCourseSubOption] = useState<"class-info" | "course-content" | "resource">("class-info");
  const [activeResource, setActiveResource] = useState<string>("");

  const getCurrentCourse = useCallback((): Course => {
    const teachingCourses: Record<string, Course> = {
      "teach1": {
        id: "teach1",
        name: "人工智能导论",
        className: "AI2023级",
        studentCount: 48,
        pendingHomework: 23,
        description: "AI2023级"
      },
      "teach2": {
        id: "teach2",
        name: "数据结构与算法",
        className: "CS2022级",
        studentCount: 120,
        pendingHomework: 45,
        description: "CS2022级"
      },
      "teach3": {
        id: "teach3",
        name: "Python编程",
        className: "CS2024级",
        studentCount: 80,
        pendingHomework: 12,
        description: "CS2024级"
      },
      "teach4": {
        id: "teach4",
        name: "机器学习实践",
        className: "AI2022级",
        studentCount: 60,
        pendingHomework: 8,
        description: "AI2022级"
      },
    };

    return teachingCourses[courseId] || teachingCourses.teach1;
  }, [courseId]);

  const currentCourse = getCurrentCourse();

  // 处理资源点击
  const handleResourceClick = (resourceType: string) => {
    setSelectedCourseSubOption("resource");
    setActiveResource(resourceType);
  };

  // 处理子选项切换
  const handleSubOptionChange = (option: "class-info" | "course-content") => {
    setSelectedCourseSubOption(option);
  };

  const renderMainContent = () => {
    if (selectedCourseSubOption === "course-content") {
      const chapterName = teachingCoursesData[courseId]?.chapterName || "课程章节";
      return (
        <div className="h-full overflow-hidden">
          <CourseDesigner
            courseName={currentCourse.name}
            chapterName={chapterName}
          />
        </div>
      );
    } else if (selectedCourseSubOption === "resource") {
      // 根据activeResource渲染对应的资源库组件
      switch (activeResource) {
        case "课程模板库":
          return <CourseTemplateLibrary />;
        case "习题库":
          return <ExerciseLibrary />;
        case "课件库":
          return <CoursewareLibrary />;
        case "案例库":
          return <CaseLibrary />;
        default:
          return (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <h2 className="text-2xl font-semibold text-slate-800 mb-4">
                  资源仓库
                </h2>
                <p className="text-slate-600">请从侧边栏选择资源类型</p>
              </div>
            </div>
          );
      }
    }

    // 班级信息页面的内容
    return <ClassInfoPanel course={currentCourse} />;
  };

  // 只有在班级信息和课程内容页面显示AiTeachingPanel
  const showAiTeachingPanel = selectedCourseSubOption !== "resource";

  return (
    <div className="h-full flex flex-col">
      {/* 返回导航栏 */}
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
                {currentCourse.name} · 教学管理
              </h2>
              <p className="text-xs text-muted-foreground mt-1">
                {currentCourse.className} · {currentCourse.studentCount}名学生
              </p>
            </div>
            <div className="w-20"></div>
          </div>
        </div>
      </div>

      {/* 主内容区域 */}
      <div className="flex-1 flex min-h-0 overflow-hidden">
        {/* 教师侧边栏 */}
        <TeacherSidebar
          courseName={currentCourse.name}
          selectedCourseSubOption={selectedCourseSubOption}
          activeResource={activeResource}
          onSubOptionChange={handleSubOptionChange}
          onResourceItemClick={handleResourceClick}
        />

        {/* 主工作区 */}
        <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
          <div className="flex-1 overflow-y-auto">
            {renderMainContent()}
          </div>
        </div>

        {/* 教学AI助手 - 只在班级信息和课程内容页面显示 */}
        {showAiTeachingPanel && <AiTeachingPanel />}
      </div>
    </div>
  );
}

export default function AssistantPage() {
  const [activeMode, setActiveMode] = useState<AssistantMode>("learning");
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);

  const handleSelectCourse = (courseId: string) => {
    setSelectedCourseId(courseId);
  };

  const handleBackToList = () => {
    setSelectedCourseId(null);
  };

  return (
    <div className="flex h-screen flex-col bg-background overflow-hidden">
      <TopNavbar currentPath="/assistant" />

      <div className="flex-1 flex flex-col pt-14 min-h-0 overflow-hidden">
        {!selectedCourseId ? (
          <>
            <AssistantNavbar
              activeMode={activeMode}
              onModeChange={setActiveMode}
            />
            <div className="flex-1 min-h-0 overflow-hidden">
              <CourseList
                mode={activeMode}
                onSelectCourse={handleSelectCourse}
              />
            </div>
          </>
        ) : activeMode === "learning" ? (
          <LearningDetailView
            courseId={selectedCourseId}
            onBack={handleBackToList}
          />
        ) : (
          <TeachingDetailView
            courseId={selectedCourseId}
            onBack={handleBackToList}
          />
        )}
      </div>
    </div>
  );
}