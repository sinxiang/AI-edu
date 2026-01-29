"use client";

import { Button } from "@/components/ui/button";
import {
  Brain,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Send,
  Sliders,
  Calendar,
  ChevronRight,
  Users,
  Target,
  Lightbulb,
} from "lucide-react";

interface ClassAnalysis {
  overallMastery: number;
  strengths: string[];
  weaknesses: { topic: string; percentage: number }[];
  suggestions: {
    issue: string;
    actions: string[];
  }[];
}

const classAnalysis: ClassAnalysis = {
  overallMastery: 68,
  strengths: ["线性回归", "逻辑回归", "数据预处理"],
  weaknesses: [
    { topic: "正则化原理", percentage: 52 },
    { topic: "矩阵求导", percentage: 48 },
    { topic: "反向传播", percentage: 55 },
  ],
  suggestions: [
    {
      issue: "检测到12名学生在矩阵求导处困惑",
      actions: ["回顾线性代数基础", "增加可视化示例", "提供课后练习"],
    },
    {
      issue: "正则化概念理解偏差较大",
      actions: ["用实际案例解释过拟合", "对比L1/L2正则化效果"],
    },
  ],
};

export function AiTeachingPanel() {
  return (
    <aside className="flex h-full w-[300px] flex-col border-l border-slate-200 bg-white">
      {/* Header */}
      <div className="border-b border-slate-100 bg-slate-50 p-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500">
            <Brain className="h-4 w-4 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-800">AI教学助手</h3>
            <p className="text-xs text-slate-500">智能分析与建议</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Class Report */}
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Users className="h-4 w-4 text-indigo-500" />
            <h4 className="font-medium text-slate-800">班级学情报告</h4>
          </div>

          {/* Overall Mastery */}
          <div className="mb-4">
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="text-slate-500">整体掌握度</span>
              <span className="font-semibold text-slate-800">{classAnalysis.overallMastery}%</span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all"
                style={{ width: `${classAnalysis.overallMastery}%` }}
              />
            </div>
          </div>

          {/* Strengths */}
          <div className="mb-3">
            <div className="flex items-center gap-1 text-sm text-emerald-600 mb-2">
              <TrendingUp className="h-3 w-3" />
              <span className="font-medium">优势知识点</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {classAnalysis.strengths.map((s) => (
                <span
                  key={s}
                  className="rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-xs text-emerald-600"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Weaknesses */}
          <div>
            <div className="flex items-center gap-1 text-sm text-rose-600 mb-2">
              <TrendingDown className="h-3 w-3" />
              <span className="font-medium">薄弱环节</span>
            </div>
            <div className="space-y-2">
              {classAnalysis.weaknesses.map((w) => (
                <div key={w.topic}>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-slate-500">{w.topic}</span>
                    <span className="text-rose-500">{w.percentage}%</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-rose-400"
                      style={{ width: `${w.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Teaching Suggestions */}
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="h-4 w-4 text-amber-500" />
            <h4 className="font-medium text-slate-800">教学建议</h4>
          </div>

          <div className="space-y-3">
            {classAnalysis.suggestions.map((suggestion, index) => (
              <div key={index} className="rounded-lg bg-amber-50 border border-amber-100 p-3">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-amber-700">{suggestion.issue}</span>
                </div>
                <div className="ml-6 space-y-1">
                  {suggestion.actions.map((action, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-1 text-xs text-amber-600/80"
                    >
                      <ChevronRight className="h-3 w-3" />
                      <span>{action}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Learning Goals */}
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Target className="h-4 w-4 text-violet-500" />
            <h4 className="font-medium text-slate-800">本章学习目标</h4>
          </div>
          <div className="space-y-3">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-slate-500">理论知识</span>
                <span className="text-xs text-violet-500">3/5 已覆盖</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                <div className="h-full w-3/5 rounded-full bg-violet-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-slate-500">实践技能</span>
                <span className="text-xs text-violet-500">2/4 已覆盖</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                <div className="h-full w-1/2 rounded-full bg-violet-400" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="border-t border-slate-200 p-4 space-y-2">
        <Button className="w-full bg-indigo-500 hover:bg-indigo-600 text-white">
          <Send className="mr-2 h-4 w-4" />
          推送补充材料
        </Button>
        <Button variant="outline" className="w-full text-slate-600 border-slate-200 bg-transparent hover:bg-slate-50">
          <Sliders className="mr-2 h-4 w-4" />
          调整作业难度
        </Button>
        <Button variant="outline" className="w-full text-slate-600 border-slate-200 bg-transparent hover:bg-slate-50">
          <Calendar className="mr-2 h-4 w-4" />
          预约辅导时间
        </Button>
      </div>
    </aside>
  );
}
