"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, MapPin, Clock, Calendar, BookOpen, TrendingUp, Users } from "lucide-react";
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
  { id: "3", name: "自然语言处理", percentage: 85, color: "from-emerald-500 to-emerald-400" },
];

const recommendedResources = [
  { id: "1", title: "Attention论文精读", type: "论文", relevance: 95 },
  { id: "2", title: "Transformer可视化教程", type: "教程", relevance: 88 },
  { id: "3", title: "多头注意力代码实现", type: "代码", relevance: 92 },
];

interface UserDataPanelProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export function UserDataPanel({ isCollapsed, onToggle }: UserDataPanelProps) {
  const [activeTab, setActiveTab] = useState<'courses' | 'progress' | 'resources'>('courses');

  const today = new Date();
  const dateString = `${today.getMonth() + 1}月${today.getDate()}日 星期${["日", "一", "二", "三", "四", "五", "六"][today.getDay()]
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
          <h2 className="font-semibold text-sidebar-foreground">学习助手面板</h2>
          <span className="text-sm text-muted-foreground">{dateString}</span>
        </div>
      </div>

      {/* 标签切换 */}
      <div className="flex border-b border-border px-4">
        <button
          onClick={() => setActiveTab('courses')}
          className={cn(
            "flex-1 py-3 text-sm font-medium transition-colors border-b-2",
            activeTab === 'courses'
              ? "text-primary border-primary"
              : "text-muted-foreground border-transparent hover:text-sidebar-foreground"
          )}
        >
          <div className="flex items-center justify-center gap-1.5">
            <Calendar className="h-4 w-4" />
            课程
          </div>
        </button>
        <button
          onClick={() => setActiveTab('progress')}
          className={cn(
            "flex-1 py-3 text-sm font-medium transition-colors border-b-2",
            activeTab === 'progress'
              ? "text-primary border-primary"
              : "text-muted-foreground border-transparent hover:text-sidebar-foreground"
          )}
        >
          <div className="flex items-center justify-center gap-1.5">
            <TrendingUp className="h-4 w-4" />
            进度
          </div>
        </button>
        <button
          onClick={() => setActiveTab('resources')}
          className={cn(
            "flex-1 py-3 text-sm font-medium transition-colors border-b-2",
            activeTab === 'resources'
              ? "text-primary border-primary"
              : "text-muted-foreground border-transparent hover:text-sidebar-foreground"
          )}
        >
          <div className="flex items-center justify-center gap-1.5">
            <BookOpen className="h-4 w-4" />
            资源
          </div>
        </button>
      </div>

      {/* 内容区域 */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'courses' && (
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
        )}

        {activeTab === 'progress' && (
          <div className="space-y-6">
            <h2 className="font-semibold text-sidebar-foreground">
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

            <div className="pt-4 border-t border-border">
              <h3 className="mb-3 font-medium text-sidebar-foreground">学习建议</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="h-2 w-2 rounded-full bg-emerald-500" />
                  <span>自然语言处理进度良好，继续保持</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="h-2 w-2 rounded-full bg-blue-500" />
                  <span>深度学习需要加强实践练习</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'resources' && (
          <div className="space-y-4">
            <h2 className="font-semibold text-sidebar-foreground">
              推荐学习资源
            </h2>
            <div className="space-y-3">
              {recommendedResources.map((resource) => (
                <div
                  key={resource.id}
                  className="rounded-lg bg-card p-3 hover:bg-card/80 transition-colors cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-card-foreground">
                      {resource.title}
                    </span>
                    <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full">
                      {resource.type}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-muted-foreground">相关度</div>
                    <div className="flex items-center gap-1">
                      <div className="h-1.5 w-20 bg-secondary rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-primary to-purple-400"
                          style={{ width: `${resource.relevance}%` }}
                        />
                      </div>
                      <span className="text-xs font-medium">{resource.relevance}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full py-2.5 mt-4 bg-primary/5 hover:bg-primary/10 text-primary rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
              <BookOpen className="h-4 w-4" />
              查看全部资源
            </button>
          </div>
        )}
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