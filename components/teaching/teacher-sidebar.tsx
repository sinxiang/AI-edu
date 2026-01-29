"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  FolderOpen,
  Rocket,
  ChevronDown,
  ChevronRight,
  Plus,
  Upload,
  Calendar,
  Sparkles,
  GraduationCap,
  BookText,
  Check,
} from "lucide-react";

const resourceItems = [
  { label: "课程模板库", tag: "热门模板" },
  { label: "习题库", tag: null },
  { label: "课件库", tag: "同行共享" },
  { label: "案例库", tag: null },
];

interface TeacherSidebarProps {
  courseName: string;
  selectedCourseSubOption: "class-info" | "course-content" | "resource";
  activeResource: string;
  onSubOptionChange: (option: "class-info" | "course-content") => void;
  onResourceItemClick: (resourceType: string) => void;
}

export function TeacherSidebar({
  courseName,
  selectedCourseSubOption,
  activeResource,
  onSubOptionChange,
  onResourceItemClick
}: TeacherSidebarProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>(["course-management", "resources"]);

  const toggleSection = (section: string) => {
    setExpandedSections((prev) =>
      prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]
    );
  };

  // 处理资源点击
  const handleResourceClick = (label: string) => {
    onResourceItemClick(label);
  };

  return (
    <aside className="flex h-full w-[260px] flex-col bg-white border-r border-slate-200">
      {/* Header */}
      <div className="border-b border-slate-100 p-4">
        <h2 className="text-lg font-semibold text-slate-800">教师工作台</h2>
        <p className="text-xs text-slate-500">智能教学管理系统</p>
      </div>

      <div className="flex-1 overflow-y-auto p-3">
        {/* Course Management Section */}
        <div className="mb-4">
          <button
            type="button"
            onClick={() => toggleSection("course-management")}
            className="flex w-full items-center gap-2 rounded-lg p-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            {expandedSections.includes("course-management") ? (
              <ChevronDown className="h-4 w-4 text-slate-400" />
            ) : (
              <ChevronRight className="h-4 w-4 text-slate-400" />
            )}
            <BookOpen className="h-4 w-4 text-indigo-500" />
            <span className="truncate">课程管理 · {courseName}</span>
          </button>

          {expandedSections.includes("course-management") && (
            <div className="ml-2 mt-2 space-y-1">
              {/* 班级信息选项 */}
              <button
                type="button"
                onClick={() => onSubOptionChange("class-info")}
                className={cn(
                  "flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors",
                  selectedCourseSubOption === "class-info"
                    ? "bg-indigo-100 text-indigo-700"
                    : "text-slate-600 hover:bg-slate-100"
                )}
              >
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4" />
                  <span>班级信息</span>
                </div>
                {selectedCourseSubOption === "class-info" && (
                  <Check className="h-4 w-4 text-indigo-600" />
                )}
              </button>

              {/* 课程内容选项 */}
              <button
                type="button"
                onClick={() => onSubOptionChange("course-content")}
                className={cn(
                  "flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors",
                  selectedCourseSubOption === "course-content"
                    ? "bg-indigo-100 text-indigo-700"
                    : "text-slate-600 hover:bg-slate-100"
                )}
              >
                <div className="flex items-center gap-2">
                  <BookText className="h-4 w-4" />
                  <span>课程设计</span>
                </div>
                {selectedCourseSubOption === "course-content" && (
                  <Check className="h-4 w-4 text-indigo-600" />
                )}
              </button>
            </div>
          )}
        </div>

        {/* Resource Repository Section */}
        <div className="mb-4">
          <button
            type="button"
            onClick={() => toggleSection("resources")}
            className="flex w-full items-center gap-2 rounded-lg p-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            {expandedSections.includes("resources") ? (
              <ChevronDown className="h-4 w-4 text-slate-400" />
            ) : (
              <ChevronRight className="h-4 w-4 text-slate-400" />
            )}
            <FolderOpen className="h-4 w-4 text-emerald-500" />
            <span>资源仓库</span>
          </button>

          {expandedSections.includes("resources") && (
            <div className="ml-2 mt-2 space-y-1">
              {resourceItems.map((item) => (
                <button
                  type="button"
                  key={item.label}
                  onClick={() => handleResourceClick(item.label)}
                  className={cn(
                    "flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors",
                    selectedCourseSubOption === "resource" && activeResource === item.label
                      ? "bg-emerald-100 text-emerald-700"
                      : "text-slate-600 hover:bg-slate-100"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <span>{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.tag && (
                      <span className="flex items-center gap-1 rounded-full bg-indigo-50 px-2 py-0.5 text-xs text-indigo-600">
                        <Sparkles className="h-3 w-3" />
                        {item.tag}
                      </span>
                    )}
                    {selectedCourseSubOption === "resource" && activeResource === item.label && (
                      <Check className="h-4 w-4 text-emerald-600" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Quick Start Section */}
        <div>
          <button
            type="button"
            onClick={() => toggleSection("quickstart")}
            className="flex w-full items-center gap-2 rounded-lg p-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            {expandedSections.includes("quickstart") ? (
              <ChevronDown className="h-4 w-4 text-slate-400" />
            ) : (
              <ChevronRight className="h-4 w-4 text-slate-400" />
            )}
            <Rocket className="h-4 w-4 text-amber-500" />
            <span>快速开始</span>
          </button>

          {expandedSections.includes("quickstart") && (
            <div className="ml-2 mt-2 space-y-2">
              <Button className="w-full bg-indigo-500 hover:bg-indigo-600 text-white">
                <Plus className="mr-2 h-4 w-4" />
                创建新课
              </Button>
              <Button variant="outline" className="w-full border-slate-200 text-slate-600 hover:bg-slate-50 bg-transparent">
                <Upload className="mr-2 h-4 w-4" />
                导入课程
              </Button>
              <Button variant="outline" className="w-full border-slate-200 text-slate-600 hover:bg-slate-50 bg-transparent">
                <Calendar className="mr-2 h-4 w-4" />
                查看教学日历
              </Button>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}