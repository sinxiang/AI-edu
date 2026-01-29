"use client";

import { FolderOpen, StickyNote, FileText, Plus, Tag, Upload, CheckCircle, AlertCircle, Copy, BarChart, RefreshCw, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function LiteratureManage() {
  const folders = [
    { name: "机器学习", count: 45 },
    { name: "深度学习", count: 32 },
    { name: "自然语言处理", count: 28 },
    { name: "计算机视觉", count: 19 },
  ];

  return (
    <div className="flex h-full flex-col p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">文献管理</h1>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          新建文件夹
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {folders.map((folder) => (
          <div
            key={folder.name}
            className="cursor-pointer rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/50 hover:bg-card/80"
          >
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20">
              <FolderOpen className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground">{folder.name}</h3>
            <p className="text-sm text-muted-foreground">{folder.count} 篇文献</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function NotesPanel() {
  const notes = [
    {
      id: "1",
      title: "Transformer架构笔记",
      preview: "注意力机制的核心思想是...",
      date: "2024-01-15",
      tags: ["深度学习", "NLP"],
    },
    {
      id: "2",
      title: "BERT预训练方法",
      preview: "BERT使用MLM和NSP两种预训练任务...",
      date: "2024-01-14",
      tags: ["预训练", "NLP"],
    },
    {
      id: "3",
      title: "研究灵感：多模态学习",
      preview: "结合视觉和文本的方法可以...",
      date: "2024-01-13",
      tags: ["多模态", "想法"],
    },
  ];

  return (
    <div className="flex h-full flex-col p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">笔记与想法</h1>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          新建笔记
        </Button>
      </div>

      <div className="space-y-4">
        {notes.map((note) => (
          <div
            key={note.id}
            className="cursor-pointer rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/50 hover:bg-card/80"
          >
            <div className="mb-2 flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                <StickyNote className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">{note.title}</h3>
                <p className="text-sm text-muted-foreground">{note.preview}</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                {note.tags.map((tag) => (
                  <span
                    key={tag}
                    className="flex items-center gap-1 rounded-full bg-secondary px-2 py-0.5 text-xs text-muted-foreground"
                  >
                    <Tag className="h-2.5 w-2.5" />
                    {tag}
                  </span>
                ))}
              </div>
              <span className="text-xs text-muted-foreground">{note.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function PlagiarismCheck() {
  const [isUploading, setIsUploading] = useState(false);
  const [similarityScore, setSimilarityScore] = useState<number | null>(null);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"upload" | "result" | "history">("upload");

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      // 模拟文件上传和处理
      setTimeout(() => {
        setUploadedFile(file.name);
        // 模拟生成相似度分数
        const simulatedScore = Math.floor(Math.random() * 40);
        setSimilarityScore(simulatedScore);
        setIsUploading(false);
        setActiveTab("result");
      }, 2000);
    }
  };

  const handleNewCheck = () => {
    setUploadedFile(null);
    setSimilarityScore(null);
    setActiveTab("upload");
  };

  const getScoreColor = (score: number) => {
    if (score < 10) return "text-green-600";
    if (score < 20) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreStatus = (score: number) => {
    if (score < 10) return { text: "优秀", color: "bg-green-500", message: "相似度很低，符合学术要求" };
    if (score < 20) return { text: "良好", color: "bg-yellow-500", message: "建议进一步优化" };
    if (score < 30) return { text: "偏高", color: "bg-orange-500", message: "需要大幅修改" };
    return { text: "严重", color: "bg-red-500", message: "存在抄袭风险" };
  };

  const similarityIssues = [
    { text: "引言部分的背景介绍相似度过高", similarity: 45, source: "文献[3]", section: "引言", line: "12-15" },
    { text: "方法章节的描述与其他论文高度相似", similarity: 32, source: "会议论文2023", section: "方法", line: "45-48" },
    { text: "结论部分的表述雷同", similarity: 28, source: "网络资源", section: "结论", line: "78-82" },
    { text: "数据表格的描述方式相似", similarity: 22, source: "期刊论文", section: "实验", line: "56-59" },
  ];

  const checkHistory = [
    { name: "论文草稿_v1.docx", date: "2024-01-15", score: 25 },
    { name: "文献综述_final.pdf", date: "2024-01-10", score: 12 },
    { name: "实验方法部分.docx", date: "2024-01-05", score: 18 },
  ];

  return (
    <div className="flex h-full flex-col p-6 bg-gradient-to-br from-gray-50 via-white to-purple-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900/10">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-pink-500">
            <CheckCircle className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">论文查重</h1>
            <p className="text-sm text-muted-foreground">智能检测论文相似度，确保学术诚信</p>
          </div>
        </div>

        {/* 标签页 */}
        <div className="flex gap-2 border-b border-border mb-6">
          <button
            onClick={() => setActiveTab("upload")}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === "upload" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}
          >
            上传论文
          </button>
          {similarityScore !== null && (
            <button
              onClick={() => setActiveTab("result")}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === "result" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}
            >
              查重结果
            </button>
          )}
          <button
            onClick={() => setActiveTab("history")}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === "history" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}
          >
            历史记录
          </button>
        </div>
      </div>

      {/* 上传区域 */}
      {activeTab === "upload" && (
        <div className="flex-1">
          <div className="rounded-xl border border-dashed border-border bg-card/50 p-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
              <Upload className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="mb-2 font-semibold text-foreground">上传论文进行查重</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              支持 .doc, .docx, .pdf, .txt 格式，最大文件大小 10MB
            </p>
            <label className="cursor-pointer">
              <input
                type="file"
                className="hidden"
                accept=".doc,.docx,.pdf,.txt"
                onChange={handleFileUpload}
                disabled={isUploading}
              />
              <Button className="gap-2" disabled={isUploading}>
                {isUploading ? (
                  <>
                    <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    处理中...
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4" />
                    选择文件
                  </>
                )}
              </Button>
            </label>
            <div className="mt-4 grid grid-cols-3 gap-4">
              <div className="rounded-lg bg-secondary/50 p-3">
                <div className="text-xs text-muted-foreground mb-1">学术期刊</div>
                <div className="text-sm font-semibold text-foreground">＜15%</div>
              </div>
              <div className="rounded-lg bg-secondary/50 p-3">
                <div className="text-xs text-muted-foreground mb-1">会议论文</div>
                <div className="text-sm font-semibold text-foreground">＜20%</div>
              </div>
              <div className="rounded-lg bg-secondary/50 p-3">
                <div className="text-xs text-muted-foreground mb-1">毕业论文</div>
                <div className="text-sm font-semibold text-foreground">＜10%</div>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-border bg-card p-6">
            <h3 className="mb-3 font-semibold text-foreground flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-purple-500" />
              查重说明
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-purple-500 flex-shrink-0 mt-0.5" />
                系统将对比超过1亿篇学术文献和网页内容
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-purple-500 flex-shrink-0 mt-0.5" />
                检测结果仅供参考，请以官方查重报告为准
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-purple-500 flex-shrink-0 mt-0.5" />
                正确处理引用和参考文献可有效降低相似度
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* 查重结果 */}
      {activeTab === "result" && similarityScore !== null && (
        <div className="flex-1 space-y-6">
          {/* 总体结果 */}
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">查重结果</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="gap-2" onClick={handleNewCheck}>
                  <RefreshCw className="h-4 w-4" />
                  重新检测
                </Button>
                <Button size="sm" className="gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                  <Download className="h-4 w-4" />
                  下载报告
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="relative h-32 w-32">
                  <svg className="h-full w-full" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="8"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke={getScoreStatus(similarityScore).color}
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={`${similarityScore * 2.83} 283`}
                      transform="rotate(-90 50 50)"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className={`text-3xl font-bold ${getScoreColor(similarityScore)}`}>
                      {similarityScore}%
                    </span>
                    <span className="text-xs text-muted-foreground">总体相似度</span>
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <div className="mb-3">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`px-2 py-1 rounded text-xs font-medium text-white ${getScoreStatus(similarityScore).color}`}>
                      {getScoreStatus(similarityScore).text}
                    </span>
                    <span className="text-sm text-foreground">
                      {getScoreStatus(similarityScore).message}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    检测时间：{new Date().toLocaleString()} • 文件：{uploadedFile}
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="rounded-lg bg-secondary/50 p-3">
                    <div className="text-xs text-muted-foreground mb-1">学术标准</div>
                    <div className="text-sm font-semibold text-green-600">
                      {similarityScore < 15 ? "合格" : "不合格"}
                    </div>
                  </div>
                  <div className="rounded-lg bg-secondary/50 p-3">
                    <div className="text-xs text-muted-foreground mb-1">相似段落</div>
                    <div className="text-sm font-semibold text-foreground">{similarityIssues.length} 处</div>
                  </div>
                  <div className="rounded-lg bg-secondary/50 p-3">
                    <div className="text-xs text-muted-foreground mb-1">建议修改</div>
                    <div className="text-sm font-semibold text-foreground">
                      {similarityScore > 15 ? "急需" : "轻度"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 相似度详情 */}
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="mb-4 text-lg font-semibold text-foreground flex items-center gap-2">
              <BarChart className="h-5 w-5 text-purple-500" />
              相似度详情
            </h3>
            <div className="space-y-4">
              {similarityIssues.map((issue, index) => (
                <div
                  key={index}
                  className="rounded-lg border border-border p-4 hover:border-purple-300 dark:hover:border-purple-500 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Copy className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium text-foreground">{issue.text}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${issue.similarity > 40 ? "bg-red-500" : issue.similarity > 25 ? "bg-yellow-500" : "bg-purple-500"}`}
                          style={{ width: `${Math.min(issue.similarity, 100)}%` }}
                        />
                      </div>
                      <span className={`text-sm font-medium ${issue.similarity > 40 ? "text-red-600" : issue.similarity > 25 ? "text-yellow-600" : "text-purple-600"}`}>
                        {issue.similarity}%
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <FileText className="h-3 w-3" />
                      章节：{issue.section}
                    </div>
                    <div className="flex items-center gap-1">
                      <Tag className="h-3 w-3" />
                      行号：{issue.line}
                    </div>
                    <div className="flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      来源：{issue.source}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 优化建议 */}
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="mb-4 text-lg font-semibold text-foreground flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-purple-500" />
              优化建议
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h4 className="font-medium text-foreground">引用规范</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-purple-500 flex-shrink-0 mt-0.5" />
                    确保所有引用都有完整的来源信息
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-purple-500 flex-shrink-0 mt-0.5" />
                    使用统一的引用格式（APA, MLA, Chicago等）
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-purple-500 flex-shrink-0 mt-0.5" />
                    直接引用必须使用引号并注明页码
                  </li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="font-medium text-foreground">改写技巧</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-purple-500 flex-shrink-0 mt-0.5" />
                    使用同义词替换关键词和短语
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-purple-500 flex-shrink-0 mt-0.5" />
                    改变句子结构（主动↔被动）
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-purple-500 flex-shrink-0 mt-0.5" />
                    增加自己的分析和见解，减少直接引用
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 历史记录 */}
      {activeTab === "history" && (
        <div className="flex-1">
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="mb-4 text-lg font-semibold text-foreground">历史查重记录</h3>
            <div className="space-y-3">
              {checkHistory.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 rounded-lg border border-border p-3 hover:bg-card/80 transition-colors"
                >
                  <FileText className="h-5 w-5 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.date}</p>
                  </div>
                  <div className={`text-sm font-semibold ${getScoreColor(item.score)}`}>
                    {item.score}%
                  </div>
                  <Button size="sm" variant="outline" className="hover:border-purple-500 hover:text-purple-600">
                    查看
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}