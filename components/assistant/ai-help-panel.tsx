"use client";

import { useState } from "react";
import { Network, Lightbulb, Link2, ListChecks, PenLine, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import type { LearningModule } from "./learning-sidebar";

interface AiHelpPanelProps {
  mode: LearningModule;
}

export function AiHelpPanel({ mode }: AiHelpPanelProps) {
  const [notes, setNotes] = useState("");

  if (mode === "course") {
    return (
      <aside className="flex h-full w-[300px] flex-col border-l border-border bg-sidebar">
        {/* Header */}
        <div className="border-b border-sidebar-border px-4 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
              <Sparkles className="h-4 w-4 text-primary" />
            </div>
            <span className="font-semibold text-sidebar-foreground">AI 学习助手</span>
          </div>
        </div>

        {/* Actions */}
        <div className="border-b border-sidebar-border p-4">
          <Button className="w-full bg-gradient-to-r from-primary to-purple-400 hover:from-primary/90 hover:to-purple-400/90 text-primary-foreground">
            <Network className="mr-2 h-4 w-4" />
            生成思维导图
          </Button>
        </div>

        {/* Keyword Explanations */}
        <div className="flex-1 overflow-y-auto p-4">
          <h3 className="mb-3 text-sm font-semibold text-sidebar-foreground">关键词解释</h3>
          <div className="space-y-3">
            <div className="rounded-lg bg-primary/5 p-3 border border-primary/10">
              <div className="flex items-center gap-2 text-sm font-medium text-primary">
                <Lightbulb className="h-4 w-4" />
                梯度下降
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                一种优化算法，通过计算损失函数的梯度来更新参数，使得损失函数值逐渐减小。
              </p>
            </div>
            <div className="rounded-lg bg-primary/5 p-3 border border-primary/10">
              <div className="flex items-center gap-2 text-sm font-medium text-primary">
                <Lightbulb className="h-4 w-4" />
                学习率
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                控制每次参数更新的步长大小。学习率过大可能导致震荡，过小则收敛缓慢。
              </p>
            </div>
            <div className="rounded-lg bg-primary/5 p-3 border border-primary/10">
              <div className="flex items-center gap-2 text-sm font-medium text-primary">
                <Lightbulb className="h-4 w-4" />
                局部最优
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                在某个邻域内的最优解，但不一定是全局最优解。
              </p>
            </div>
          </div>

          {/* Related Questions */}
          <h3 className="mb-3 mt-6 text-sm font-semibold text-sidebar-foreground">关联问题</h3>
          <div className="rounded-lg border border-primary/20 bg-card p-3">
            <div className="flex items-start gap-2">
              <Link2 className="mt-0.5 h-4 w-4 text-primary" />
              <div>
                <p className="text-sm text-card-foreground">
                  这个问题与上周学的<span className="font-medium text-primary">线性回归</span>相关
                </p>
                <button type="button" className="mt-1 text-sm text-primary hover:underline">
                  查看相关课程 →
                </button>
              </div>
            </div>
          </div>
        </div>
      </aside>
    );
  }

  // Homework/Practice mode
  return (
    <aside className="flex h-full w-[300px] flex-col border-l border-border bg-sidebar">
      {/* Header */}
      <div className="border-b border-sidebar-border px-4 py-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
            <Sparkles className="h-4 w-4 text-primary" />
          </div>
          <span className="font-semibold text-sidebar-foreground">解题助手</span>
        </div>
      </div>

      {/* Actions */}
      <div className="border-b border-sidebar-border p-4">
        <Button variant="outline" className="w-full border-primary/20 text-primary hover:bg-primary/5 bg-transparent">
          <Lightbulb className="mr-2 h-4 w-4" />
          查看解题思路
        </Button>
      </div>

      {/* Step Guide */}
      <div className="border-b border-sidebar-border p-4">
        <h3 className="mb-3 text-sm font-semibold text-sidebar-foreground">分步引导</h3>
        <div className="space-y-2">
          <div className="flex items-start gap-3 rounded-lg bg-emerald-50 p-3 border border-emerald-100">
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-xs text-white">
              1
            </div>
            <div>
              <p className="text-sm font-medium text-emerald-700">识别函数类型</p>
              <p className="text-xs text-emerald-600">✓ 已完成</p>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-lg bg-primary/5 p-3 border border-primary/10">
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-white">
              2
            </div>
            <div>
              <p className="text-sm font-medium text-primary">回忆导数定义</p>
              <p className="text-xs text-primary/80">进行中...</p>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-lg bg-muted p-3 border border-border">
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-muted-foreground/30 text-xs text-muted-foreground">
              3
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">代入公式计算</p>
              <p className="text-xs text-muted-foreground">待完成</p>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-lg bg-muted p-3 border border-border">
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-muted-foreground/30 text-xs text-muted-foreground">
              4
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">简化并验证</p>
              <p className="text-xs text-muted-foreground">待完成</p>
            </div>
          </div>
        </div>
      </div>

      {/* Notes */}
      <div className="flex-1 p-4">
        <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-sidebar-foreground">
          <PenLine className="h-4 w-4" />
          我的笔记
        </h3>
        <Textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="在这里记录你的解题思路..."
          className="h-32 resize-none border-input focus-visible:ring-ring"
        />
        <Button className="mt-3 w-full bg-primary hover:bg-primary/90 text-primary-foreground" size="sm">
          保存笔记
        </Button>
      </div>
    </aside>
  );
}