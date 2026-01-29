"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, MapPin, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface Course {
  id: string;
  time: string;
  name: string;
  location: string;
}

interface Progress {
  id: string;
  name: string;
  percentage: number;
  color: string;
}

const todayCourses: Course[] = [
  { id: "1", time: "10:00-11:30", name: "机器学习", location: "教301" },
  { id: "2", time: "14:00-15:30", name: "深度学习", location: "实404" },
  { id: "3", time: "16:00-17:30", name: "自然语言处理", location: "研201" },
];

const learningProgress: Progress[] = [
  { id: "1", name: "机器学习", percentage: 75, color: "from-primary to-primary/70" },
  { id: "2", name: "深度学习", percentage: 60, color: "from-cyan-500 to-cyan-400" },
  { id: "3", name: "论文写作", percentage: 40, color: "from-emerald-500 to-emerald-400" },
];

interface UserDataPanelProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export function UserDataPanel({ isCollapsed, onToggle }: UserDataPanelProps) {
  const today = new Date();
  const dateString = `${today.getMonth() + 1}月${today.getDate()}日 星期${
    ["日", "一", "二", "三", "四", "五", "六"][today.getDay()]
  }`;

  return (
    <div
      className={cn(
        "flex flex-col border-l border-border bg-sidebar transition-all duration-300 ease-in-out",
        isCollapsed ? "w-0 overflow-hidden" : "w-80"
      )}
    >
      {/* Header with Toggle */}
      <div className="flex items-center justify-between border-b border-border p-4">
        <button
          onClick={onToggle}
          className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground"
          aria-label="折叠面板"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
        <div className="text-right">
          <h2 className="font-semibold text-sidebar-foreground">今日课程表</h2>
          <span className="text-sm text-muted-foreground">{dateString}</span>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* Course Cards */}
        <div className="space-y-3">
          {todayCourses.map((course) => (
            <div
              key={course.id}
              className="rounded-xl bg-card p-4 transition-all duration-200 hover:bg-card/80 hover:shadow-md"
            >
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>{course.time}</span>
              </div>
              <h3 className="mt-2 font-semibold text-card-foreground">
                {course.name}
              </h3>
              <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{course.location}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Learning Progress */}
        <div className="mt-6">
          <h2 className="mb-4 font-semibold text-sidebar-foreground">
            学习进度概览
          </h2>
          <div className="space-y-4">
            {learningProgress.map((item) => (
              <div key={item.id}>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm text-sidebar-foreground">
                    {item.name}
                  </span>
                  <span className="text-sm font-medium text-muted-foreground">
                    {item.percentage}%
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-secondary">
                  <div
                    className={cn(
                      "h-full rounded-full bg-gradient-to-r transition-all duration-500",
                      item.color
                    )}
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function CollapsedPanelToggle({ onToggle }: { onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className="absolute right-0 top-4 z-10 rounded-l-lg bg-sidebar p-2 text-muted-foreground shadow-lg transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground"
      aria-label="展开面板"
    >
      <ChevronLeft className="h-5 w-5" />
    </button>
  );
}
