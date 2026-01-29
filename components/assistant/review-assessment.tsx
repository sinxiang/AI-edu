"use client";

import { useState } from "react";
import { FileQuestion, Play, BarChart3, CheckCircle2, XCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { SubModule } from "./learning-sidebar";

interface ReviewAssessmentProps {
  subModule: SubModule;
}

const weakPoints = [
  { id: 1, topic: "矩阵运算", accuracy: 45, total: 20, wrong: 11 },
  { id: 2, topic: "极限计算", accuracy: 62, total: 15, wrong: 6 },
  { id: 3, topic: "积分应用", accuracy: 70, total: 25, wrong: 8 },
  { id: 4, topic: "微分方程", accuracy: 55, total: 18, wrong: 8 },
];

const mockTests = [
  { id: 1, title: "期中模拟测试 A", duration: "90分钟", questions: 50, difficulty: "中等" },
  { id: 2, title: "期中模拟测试 B", duration: "90分钟", questions: 50, difficulty: "较难" },
  { id: 3, title: "专项突破 - 微积分", duration: "60分钟", questions: 30, difficulty: "中等" },
];

export function ReviewAssessment({ subModule }: ReviewAssessmentProps) {
  const [selectedTopics, setSelectedTopics] = useState<string[]>(["微积分", "线性代数"]);
  const [questionCount, setQuestionCount] = useState(20);

  if (subModule === "mock-test") {
    return (
      <div className="flex h-full flex-col bg-card p-6">
        <h2 className="mb-4 text-xl font-semibold text-card-foreground">模拟测试</h2>
        <div className="space-y-4">
          {mockTests.map((test) => (
            <div key={test.id} className="rounded-xl border border-border bg-card p-5 hover:border-primary/20 hover:shadow-md transition-all">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-medium text-card-foreground">{test.title}</h3>
                  <div className="mt-2 flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {test.duration}
                    </span>
                    <span>{test.questions} 题</span>
                    <span className={cn(
                      "rounded px-2 py-0.5",
                      test.difficulty === "较难" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"
                    )}>{test.difficulty}</span>
                  </div>
                </div>
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Play className="mr-2 h-4 w-4" />
                  开始测试
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Test Results */}
        <div className="mt-8">
          <h3 className="mb-4 font-semibold text-card-foreground">最近测试成绩</h3>
          <div className="rounded-xl border border-border overflow-hidden">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">测试名称</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">日期</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">得分</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">用时</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-border">
                  <td className="px-4 py-3 text-card-foreground">期中模拟测试 A</td>
                  <td className="px-4 py-3 text-muted-foreground">2024-01-15</td>
                  <td className="px-4 py-3 font-semibold text-emerald-600">88分</td>
                  <td className="px-4 py-3 text-muted-foreground">75分钟</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="px-4 py-3 text-card-foreground">专项突破 - 微积分</td>
                  <td className="px-4 py-3 text-muted-foreground">2024-01-12</td>
                  <td className="px-4 py-3 font-semibold text-primary">82分</td>
                  <td className="px-4 py-3 text-muted-foreground">52分钟</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  if (subModule === "weakness-analysis") {
    return (
      <div className="flex h-full flex-col bg-card p-6">
        <h2 className="mb-4 text-xl font-semibold text-card-foreground">薄弱点分析</h2>
        
        {/* Summary Cards */}
        <div className="mb-6 grid grid-cols-3 gap-4">
          <div className="rounded-xl bg-gradient-to-br from-primary to-purple-600 p-4 text-white">
            <div className="text-sm opacity-80">总体正确率</div>
            <div className="mt-1 text-3xl font-bold">72%</div>
          </div>
          <div className="rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 p-4 text-white">
            <div className="text-sm opacity-80">已掌握知识点</div>
            <div className="mt-1 text-3xl font-bold">45</div>
          </div>
          <div className="rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 p-4 text-white">
            <div className="text-sm opacity-80">待加强知识点</div>
            <div className="mt-1 text-3xl font-bold">12</div>
          </div>
        </div>

        {/* Weak Points List */}
        <h3 className="mb-3 font-semibold text-card-foreground">需要加强的知识点</h3>
        <div className="space-y-3">
          {weakPoints.map((point) => (
            <div key={point.id} className="rounded-lg border border-border bg-card p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-card-foreground">{point.topic}</h4>
                <span className={cn(
                  "font-semibold",
                  point.accuracy >= 70 ? "text-emerald-600" : point.accuracy >= 60 ? "text-amber-600" : "text-red-600"
                )}>{point.accuracy}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-muted">
                <div
                  className={cn(
                    "h-full rounded-full transition-all",
                    point.accuracy >= 70 ? "bg-emerald-500" : point.accuracy >= 60 ? "bg-amber-500" : "bg-red-500"
                  )}
                  style={{ width: `${point.accuracy}%` }}
                />
              </div>
              <div className="mt-2 flex items-center gap-4 text-sm text-muted-foreground">
                <span>共 {point.total} 题</span>
                <span className="flex items-center gap-1 text-red-500">
                  <XCircle className="h-3.5 w-3.5" />
                  错 {point.wrong} 题
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Smart Paper Generation (default)
  const topics = ["微积分", "线性代数", "概率论", "离散数学", "数值分析"];

  return (
    <div className="flex h-full flex-col bg-card p-6">
      <h2 className="mb-6 text-xl font-semibold text-card-foreground">智能组卷</h2>
      
      {/* Topic Selection */}
      <div className="mb-6">
        <h3 className="mb-3 font-medium text-card-foreground">选择知识点</h3>
        <div className="flex flex-wrap gap-2">
          {topics.map((topic) => (
            <button
              key={topic}
              type="button"
              onClick={() => {
                setSelectedTopics((prev) =>
                  prev.includes(topic)
                    ? prev.filter((t) => t !== topic)
                    : [...prev, topic]
                );
              }}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                selectedTopics.includes(topic)
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-accent hover:text-card-foreground"
              )}
            >
              {topic}
            </button>
          ))}
        </div>
      </div>

      {/* Question Count */}
      <div className="mb-6">
        <h3 className="mb-3 font-medium text-card-foreground">题目数量</h3>
        <div className="flex items-center gap-4">
          {[10, 20, 30, 50].map((count) => (
            <button
              key={count}
              type="button"
              onClick={() => setQuestionCount(count)}
              className={cn(
                "rounded-lg px-6 py-3 font-medium transition-colors",
                questionCount === count
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-accent hover:text-card-foreground"
              )}
            >
              {count} 题
            </button>
          ))}
        </div>
      </div>

      {/* Difficulty */}
      <div className="mb-8">
        <h3 className="mb-3 font-medium text-card-foreground">难度设置</h3>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>简单</span>
              <span>中等</span>
              <span>困难</span>
            </div>
            <input
              type="range"
              min="1"
              max="3"
              defaultValue="2"
              className="w-full accent-primary"
            />
          </div>
        </div>
      </div>

      {/* Generate Button */}
      <Button className="w-full bg-gradient-to-r from-primary to-purple-400 hover:from-primary/90 hover:to-purple-400/90 text-primary-foreground py-6 text-lg">
        <FileQuestion className="mr-2 h-5 w-5" />
        生成试卷
      </Button>

      {/* Preview */}
      <div className="mt-6 rounded-xl border border-dashed border-primary/20 bg-primary/5 p-6 text-center">
        <BarChart3 className="mx-auto h-12 w-12 text-primary/30" />
        <p className="mt-2 text-muted-foreground">点击生成试卷后，将在此处预览</p>
      </div>
    </div>
  );
}