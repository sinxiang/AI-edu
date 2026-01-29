"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Sparkles,
  FileText,
  Video,
  BookOpen,
  GripVertical,
  Plus,
  Trash2,
  Clock,
  Target,
  Lightbulb,
  FolderOpen,
  Send,
} from "lucide-react";

interface TeachingModule {
  id: string;
  title: string;
  duration: string;
  objectives: string[];
  activities: string[];
  resources: { type: string; name: string }[];
}

const initialModules: TeachingModule[] = [
  {
    id: "1",
    title: "课时1：基础搜索算法",
    duration: "45分钟",
    objectives: [
      "理解搜索算法的基本概念",
      "掌握宽度优先搜索(BFS)的原理",
      "能够实现简单的BFS算法",
    ],
    activities: [
      "迷宫问题引入 (10分钟)",
      "BFS算法讲解与演示 (20分钟)",
      "代码实现练习 (15分钟)",
    ],
    resources: [
      { type: "video", name: "BFS算法可视化动画" },
      { type: "code", name: "Python BFS模板代码" },
      { type: "case", name: "迷宫寻路案例" },
    ],
  },
  {
    id: "2",
    title: "课时2：深度优先与启发式搜索",
    duration: "45分钟",
    objectives: [
      "掌握深度优先搜索(DFS)的原理",
      "理解启发式搜索的概念",
      "能够比较不同搜索算法的优劣",
    ],
    activities: [
      "DFS vs BFS对比分析 (15分钟)",
      "A*算法介绍 (15分钟)",
      "综合练习与讨论 (15分钟)",
    ],
    resources: [
      { type: "slides", name: "搜索算法对比PPT" },
      { type: "code", name: "A*算法示例代码" },
      { type: "exercise", name: "算法选择练习题" },
    ],
  },
];

interface CourseDesignerProps {
  courseName: string;
  chapterName: string;
}

export function CourseDesigner({ courseName, chapterName }: CourseDesignerProps) {
  const [modules, setModules] = useState<TeachingModule[]>(initialModules);
  const [aiPrompt, setAiPrompt] = useState(
    "设计2课时的搜索算法教学，学生有编程基础但算法经验少"
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const [editingModule, setEditingModule] = useState<string | null>(null);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
    }, 2000);
  };

  const getResourceIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="h-3 w-3 text-rose-500" />;
      case "slides":
        return <FileText className="h-3 w-3 text-blue-500" />;
      case "code":
        return <FileText className="h-3 w-3 text-emerald-500" />;
      case "case":
        return <BookOpen className="h-3 w-3 text-violet-500" />;
      case "exercise":
        return <FileText className="h-3 w-3 text-amber-500" />;
      default:
        return <FileText className="h-3 w-3 text-slate-400" />;
    }
  };

  return (
    <div className="flex h-full flex-col bg-slate-50">
      {/* Header */}
      <div className="border-b border-slate-200 bg-white p-4">
        <h1 className="text-xl font-bold text-slate-800">
          《{courseName}》- {chapterName}
        </h1>
        <p className="text-sm text-slate-500">课程设计工作区</p>
      </div>

      {/* AI Design Assistant */}
      <div className="border-b border-slate-200 bg-white p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <span className="font-medium text-slate-800">AI设计助手</span>
        </div>
        <div className="flex gap-3">
          <Textarea
            value={aiPrompt}
            onChange={(e) => setAiPrompt(e.target.value)}
            placeholder="描述您的教学需求..."
            className="flex-1 resize-none bg-slate-50 border-slate-200 text-slate-800 placeholder:text-slate-400"
            rows={2}
          />
          <div className="flex flex-col gap-2">
            <Button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600"
            >
              {isGenerating ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  生成中...
                </span>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  生成教学大纲
                </>
              )}
            </Button>
            <Button variant="outline" size="sm" className="text-slate-600 border-slate-200 bg-transparent hover:bg-slate-50">
              <Send className="mr-2 h-3 w-3" />
              微调建议
            </Button>
          </div>
        </div>
      </div>

      {/* Timeline Visualization */}
      <div className="border-b border-slate-200 bg-white px-4 py-3">
        <div className="flex items-center gap-2 mb-2">
          <Clock className="h-4 w-4 text-slate-500" />
          <span className="text-sm font-medium text-slate-700">课时安排</span>
        </div>
        <div className="flex gap-2">
          {modules.map((module, index) => (
            <div
              key={module.id}
              className="flex-1 rounded-lg bg-slate-50 p-2 border border-slate-200"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-indigo-600">
                  课时{index + 1}
                </span>
                <span className="text-xs text-slate-500">{module.duration}</span>
              </div>
              <div className="mt-1 h-2 overflow-hidden rounded-full bg-slate-200">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                  style={{ width: `${((index + 1) / modules.length) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Teaching Modules */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {modules.map((module) => (
            <div
              key={module.id}
              className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              {/* Module Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <GripVertical className="h-5 w-5 cursor-move text-slate-400" />
                  {editingModule === module.id ? (
                    <Input
                      defaultValue={module.title}
                      className="w-64 bg-slate-50 border-slate-200 text-slate-800"
                      onBlur={() => setEditingModule(null)}
                      autoFocus
                    />
                  ) : (
                    <h3
                      className="text-lg font-semibold text-slate-800 cursor-pointer hover:text-indigo-600 transition-colors"
                      onClick={() => setEditingModule(module.id)}
                    >
                      {module.title}
                    </h3>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
                    {module.duration}
                  </span>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-rose-500 hover:text-rose-600 hover:bg-rose-50">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {/* Teaching Objectives */}
                <div className="rounded-lg bg-indigo-50 border border-indigo-100 p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="h-4 w-4 text-indigo-500" />
                    <span className="text-sm font-medium text-indigo-700">教学目标</span>
                  </div>
                  <ul className="space-y-1">
                    {module.objectives.map((obj, i) => (
                      <li key={i} className="text-xs text-indigo-600/80 flex items-start gap-1">
                        <span className="mt-1 text-indigo-400">•</span>
                        <span>{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Teaching Activities */}
                <div className="rounded-lg bg-emerald-50 border border-emerald-100 p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Lightbulb className="h-4 w-4 text-emerald-500" />
                    <span className="text-sm font-medium text-emerald-700">教学活动</span>
                  </div>
                  <ul className="space-y-1">
                    {module.activities.map((act, i) => (
                      <li key={i} className="text-xs text-emerald-600/80 flex items-start gap-1">
                        <span className="mt-1 text-emerald-400">•</span>
                        <span>{act}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Matched Resources */}
                <div className="rounded-lg bg-violet-50 border border-violet-100 p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <FolderOpen className="h-4 w-4 text-violet-500" />
                    <span className="text-sm font-medium text-violet-700">匹配资源</span>
                  </div>
                  <ul className="space-y-2">
                    {module.resources.map((res, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-2 rounded bg-white px-2 py-1 text-xs text-violet-600/80 border border-violet-100"
                      >
                        {getResourceIcon(res.type)}
                        <span>{res.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}

          {/* Add Module Button */}
          <button
            type="button"
            className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-300 p-4 text-slate-500 hover:border-indigo-400 hover:text-indigo-500 transition-colors"
          >
            <Plus className="h-5 w-5" />
            <span>添加新课时</span>
          </button>
        </div>
      </div>
    </div>
  );
}
