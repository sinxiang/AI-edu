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
  User,
  Layout,
  Timer,
  CheckCircle2,
  XCircle,
  ArrowUpRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

// --- 1. 数据配置 (你可以根据需要增加更多项目来测试滚动) ---
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
    summary: "由于实验楼 A 座进行电力检修，原定于今日下午的实验课将临时调整至实训中心 302 教室。",
    important: false
  }
];

const todayCourses = [
  { id: "1", time: "10:00-11:30", name: "机器学习", location: "教301", active: false },
  { id: "2", time: "14:00-15:30", name: "深度学习理论", location: "实404", active: true },
];

const processTasks = [
  { id: "p1", title: "创新创业奖学金申请", status: "processing", statusText: "审批中", time: "2026-02-05", node: "院系审核阶段", color: "text-amber-500 bg-amber-500/10" },
  { id: "p2", title: "校外实践请假申请", status: "approved", statusText: "已通过", time: "2026-02-04", node: "流程已结束", color: "text-emerald-500 bg-emerald-500/10" },
  { id: "p3", title: "实验室设备借用预约", status: "rejected", statusText: "已驳回", time: "2026-02-02", node: "原因：库存不足", color: "text-rose-500 bg-rose-500/10" },
  { id: "p4", title: "勤工俭学岗位申请", status: "processing", statusText: "审批中", time: "2026-02-01", node: "学工部初审", color: "text-amber-500 bg-amber-500/10" },
  { id: "p5", title: "学生社团活动备案", status: "approved", statusText: "已通过", time: "2026-01-28", node: "团委已备案", color: "text-emerald-500 bg-emerald-500/10" },
];

interface UserDataPanelProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

// --- 2. 主组件定义 ---
export function UserDataPanel({ isCollapsed, onToggle }: UserDataPanelProps) {
  const [activeTab, setActiveTab] = useState<'info' | 'todo' | 'services'>('todo');

  return (
    <aside className={cn(
      "flex h-screen flex-col border-l border-border bg-sidebar transition-all duration-300 relative shadow-sm overflow-hidden",
      isCollapsed ? "w-0" : "w-80"
    )}>

      {/* 顶部标题栏 - 保持高度和留白 */}
      <div className="flex h-20 shrink-0 items-center justify-between border-b border-border px-5 py-4 bg-sidebar">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
            <Layout className="h-4 w-4 text-primary" />
          </div>
          <span className="text-base font-bold tracking-tight">个人空间</span>
        </div>
        <button onClick={onToggle} className="rounded-md p-2 hover:bg-sidebar-accent transition-colors">
          <ChevronRight className="h-5 w-5 text-muted-foreground" />
        </button>
      </div>

      {/* 导航标签栏 - 固定高度 */}
      <div className="flex shrink-0 border-b border-border bg-sidebar/50">
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

      {/* 核心滚动区域 - 自动占据剩余空间 */}
      <div className="flex-1 min-h-0 relative">
        <ScrollArea className="h-full w-full">
          <div className="p-4 pb-20">
            {activeTab === 'info' && (
              <div className="space-y-4">
                <h3 className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider px-1">最新动态</h3>
                {detailedNotifications.map((n) => (
                  <div key={n.id} className="group rounded-xl border p-4 bg-card border-border shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant={n.type === 'school' ? 'outline' : 'secondary'} className="text-[9px] h-4">
                        {n.type === 'school' ? '全校' : '课程'}
                      </Badge>
                      <span className="text-[10px] text-muted-foreground font-mono">{n.date}</span>
                    </div>
                    <h4 className="text-xs font-bold leading-relaxed mb-1.5">{n.title}</h4>
                    <p className="text-[11px] text-muted-foreground leading-snug line-clamp-2">{n.summary}</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'todo' && (
              <div className="space-y-6">
                {/* 今日课程 */}
                <div>
                  <h3 className="mb-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider px-1">今日课程</h3>
                  <div className="space-y-3">
                    {todayCourses.map((course) => (
                      <div key={course.id} className={cn(
                        "rounded-xl p-3 border bg-card border-border shadow-sm",
                        course.active && "border-primary bg-primary/5 ring-1 ring-primary/10"
                      )}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="flex items-center gap-1.5 text-[10px] text-muted-foreground"><Clock className="h-3 w-3" /> {course.time}</span>
                          {course.active && <Badge className="text-[8px] h-3.5 bg-primary animate-pulse">正在上</Badge>}
                        </div>
                        <h4 className="text-sm font-bold text-card-foreground">{course.name}</h4>
                        <div className="mt-2 text-[10px] text-muted-foreground flex items-center gap-1"><MapPin className="h-3 w-3" /> {course.location}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 办事进度 */}
                <div>
                  <h3 className="mb-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider px-1">办事进度</h3>
                  <div className="space-y-3">
                    {processTasks.map(task => (
                      <div key={task.id} className="p-3.5 rounded-xl border border-border bg-card shadow-sm hover:border-primary/20 transition-all group">
                        <div className="flex items-start justify-between mb-2.5">
                          <div className="flex-1 min-w-0 pr-2">
                            <h4 className="text-xs font-bold truncate group-hover:text-primary transition-colors">{task.title}</h4>
                            <span className="text-[10px] text-muted-foreground font-mono">{task.time}</span>
                          </div>
                          <Badge className={cn("text-[9px] h-4.5 px-2 border-none shrink-0", task.color)}>
                            {task.statusText}
                          </Badge>
                        </div>

                        <div className="flex items-center gap-3 p-2 bg-muted/30 rounded-lg">
                          {task.status === 'processing' && <Timer className="h-3.5 w-3.5 text-amber-500 animate-spin-slow" />}
                          {task.status === 'approved' && <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />}
                          {task.status === 'rejected' && <XCircle className="h-3.5 w-3.5 text-rose-500" />}
                          <span className="text-[10px] font-medium text-foreground/80">{task.node}</span>
                          <ArrowUpRight className="ml-auto h-3 w-3 text-muted-foreground/50 opacity-0 group-hover:opacity-100 transition-all" />
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
                  <button key={i} className="flex flex-col items-center justify-center rounded-xl border border-border bg-card p-4 hover:bg-accent transition-all group shadow-sm">
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
      </div>
    </aside>
  );
}

// --- 3. 折叠状态下的切换按钮 ---
export function CollapsedPanelToggle({ onToggle }: { onToggle: () => void }) {
  return (
    <div className="flex h-full items-center">
      <button
        onClick={onToggle}
        className={cn(
          "flex h-24 w-6 flex-col items-center justify-center rounded-l-xl border border-r-0 border-border bg-sidebar shadow-md transition-all hover:w-8 group text-muted-foreground hover:text-primary"
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