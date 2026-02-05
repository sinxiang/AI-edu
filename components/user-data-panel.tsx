"use client";

import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Bell,
  Calendar,
  LayoutGrid,
  Clock,
  MapPin,
  ClipboardList,
  FileText,
  ExternalLink,
  CircleCheck,
  Circle,
  User,
  Layout
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

// 详实的通知数据
const detailedNotifications = [
  {
    id: "n1",
    type: "school",
    title: "关于2026年春季学期学生注册及学费缴纳的特别提醒",
    sender: "教务管理中心",
    date: "10:00",
    summary: "请全体同学于本周五前登录教务系统确认个人注册状态。如涉及助学贷款或分期缴纳，请务必在系统内提交相关证明材料...",
    important: true
  },
  {
    id: "n2",
    type: "course",
    title: "《深度学习》课程：实验课地点临时变动通知",
    sender: "李华 助教",
    date: "09:15",
    summary: "由于实验楼 A 座进行电力检修，原定于今日下午的实验课将临时调整至实训中心 302 教室，请准时参加。",
    important: false
  }
];

// 简洁的课程数据
const todayCourses = [
  { id: "1", time: "10:00-11:30", name: "机器学习", location: "教301", active: false },
  { id: "2", time: "14:00-15:30", name: "深度学习理论", location: "实404", active: true },
  { id: "3", time: "16:00-17:30", name: "自然语言处理", location: "研201", active: false },
];

// 待办事项数据
const todoTasks = [
  { id: "t1", title: "完成神经网络课后习题", deadline: "今天 23:59", done: false },
  { id: "t2", title: "预习 Transformer 架构", deadline: "周四", done: true },
];

interface UserDataPanelProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export function UserDataPanel({ isCollapsed, onToggle }: UserDataPanelProps) {
  const [activeTab, setActiveTab] = useState<'info' | 'todo' | 'services'>('todo');

  return (
    <aside className={cn(
      "flex h-full flex-col border-l border-border bg-sidebar transition-all duration-300 relative shadow-sm",
      isCollapsed ? "w-0 overflow-hidden" : "w-80"
    )}>
      {/* 顶部标题栏 */}
      <div className="flex h-14 items-center justify-between border-b border-border px-4">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded bg-primary/10">
            <Layout className="h-3.5 w-3.5 text-primary" />
          </div>
          <span className="text-sm font-bold">个人空间</span>
        </div>
        <button onClick={onToggle} className="rounded-md p-1.5 hover:bg-sidebar-accent transition-colors">
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </button>
      </div>

      {/* 导航标签栏 */}
      <div className="flex border-b border-border bg-sidebar/50">
        {[
          { id: 'info', label: '信息', icon: Bell },
          { id: 'todo', label: '待办', icon: ClipboardList },
          { id: 'services', label: '服务', icon: LayoutGrid },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={cn(
              "flex flex-1 flex-col items-center justify-center py-2.5 text-[11px] font-medium transition-all border-b-2",
              activeTab === tab.id
                ? "text-primary border-primary bg-primary/5"
                : "text-muted-foreground border-transparent hover:text-sidebar-foreground"
            )}
          >
            <tab.icon className={cn("mb-1 h-3.5 w-3.5", activeTab === tab.id ? "text-primary" : "")} />
            {tab.label}
          </button>
        ))}
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4">
          {activeTab === 'info' && (
            <div className="space-y-4">
              <h3 className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">最新动态</h3>
              {detailedNotifications.map((n) => (
                <div key={n.id} className={cn(
                  "group rounded-xl border p-3.5 transition-all hover:border-primary/30 bg-card border-border shadow-sm"
                )}>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant={n.type === 'school' ? 'outline' : 'secondary'} className="text-[9px] h-4">
                      {n.type === 'school' ? '全校' : '课程'}
                    </Badge>
                    <span className="text-[10px] text-muted-foreground font-mono">{n.date}</span>
                  </div>
                  <h4 className="text-xs font-bold leading-relaxed mb-1.5">{n.title}</h4>
                  <p className="text-[11px] text-muted-foreground leading-snug line-clamp-2 mb-3">{n.summary}</p>
                  <div className="flex items-center gap-2 pt-2.5 border-t border-border/60 text-[10px] text-muted-foreground italic">
                    <User className="h-2.5 w-2.5" /> 来自：{n.sender}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'todo' && (
            <div className="space-y-6">
              {/* 今日课程板块 */}
              <div>
                <h3 className="mb-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">今日课程</h3>
                <div className="space-y-3">
                  {todayCourses.map((course) => (
                    <div key={course.id} className={cn(
                      "rounded-xl p-3 border transition-all bg-card border-border shadow-sm",
                      course.active ? "border-primary bg-primary/5 ring-1 ring-primary/10" : ""
                    )}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="flex items-center gap-1.5 text-[10px] text-muted-foreground"><Clock className="h-3 w-3" /> {course.time}</span>
                        {course.active && <Badge className="text-[8px] h-3.5 bg-primary animate-pulse border-none">正在上</Badge>}
                      </div>
                      <h4 className="text-sm font-bold text-card-foreground">{course.name}</h4>
                      <div className="mt-2 text-[10px] text-muted-foreground flex items-center gap-1"><MapPin className="h-3 w-3" /> {course.location}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 待办事项板块 - 重新添加此处 */}
              <div>
                <h3 className="mb-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">待办事项</h3>
                <div className="space-y-2">
                  {todoTasks.map(task => (
                    <div key={task.id} className="flex items-start gap-3 p-2.5 rounded-lg border border-transparent hover:border-border hover:bg-muted/30 transition-all group">
                      {task.done ? (
                        <CircleCheck className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                      ) : (
                        <Circle className="h-4 w-4 text-muted-foreground/50 mt-0.5 shrink-0" />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className={cn(
                          "text-xs truncate transition-colors",
                          task.done ? "line-through text-muted-foreground" : "font-medium text-foreground"
                        )}>
                          {task.title}
                        </p>
                        <p className="text-[10px] text-muted-foreground">截止日期: {task.deadline}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'services' && (
            <div className="grid grid-cols-2 gap-2">
              {[
                { icon: FileText, label: '请假申请' },
                { icon: Calendar, label: '调课申请' },
                { icon: MapPin, label: '教室借用' },
                { icon: ExternalLink, label: '成绩查询' },
              ].map((s, i) => (
                <button key={i} className="flex flex-col items-center justify-center rounded-xl border border-border bg-card p-4 hover:bg-accent hover:border-primary/20 transition-all group shadow-sm">
                  <div className="mb-2 rounded-full bg-muted p-2 group-hover:bg-primary/10 transition-colors">
                    <s.icon className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-[11px] font-medium text-sidebar-foreground">{s.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </ScrollArea>
    </aside>
  );
}

export function CollapsedPanelToggle({ onToggle }: { onToggle: () => void }) {
  return (
    <div className="flex h-full items-center">
      <button
        onClick={onToggle}
        className={cn(
          "flex h-24 w-6 flex-col items-center justify-center rounded-l-xl border border-r-0 border-border bg-sidebar shadow-md transition-all",
          "hover:w-8 hover:bg-sidebar-accent group text-muted-foreground hover:text-primary"
        )}
        title="展开个人空间"
      >
        <ChevronLeft className="h-4 w-4 mb-2 transition-transform group-hover:scale-110" />
        <div className="[writing-mode:vertical-rl] flex items-center">
          <span className="text-[9px] font-bold tracking-[0.1em] opacity-70 uppercase">
            个人空间
          </span>
        </div>
      </button>
    </div>
  );
}