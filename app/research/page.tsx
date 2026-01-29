"use client";

import { useState, Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { TopNavbar } from "@/components/top-navbar";
import { ToolsPanel } from "@/components/research/tools-panel";
import { LiteratureSearch } from "@/components/research/literature-search";
import { PdfReader } from "@/components/research/pdf-reader";
import { AiAssistantPanel } from "@/components/research/ai-assistant-panel";
import {
  LiteratureManage,
  NotesPanel,
  PlagiarismCheck, // 新增查重组件
} from "@/components/research/placeholder-panels"; // 需要创建这个组件
import { Brain, Send, CheckCircle } from "lucide-react"; // 添加CheckCircle图标

// 扩展 ToolType 类型 - 将 write 改为 plagiarism
type ExtendedToolType = "search" | "manage" | "notes" | "interpret" | "plagiarism" | "chat";

// 定义消息类型
type MessageRole = "assistant" | "user";

interface Message {
  id: number;
  role: MessageRole;
  content: string;
}

// AI对话组件
function ResearchChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: 'assistant',
      content: `您好！我是您的AI科研助手。\n\n我可以帮助您进行文献检索、论文解析、研究方法讨论和学术查重指导。\n\n请告诉我您的研究问题，我将为您提供专业建议。`
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const quickPrompts = [
    "如何查找Transformer相关的最新研究？",
    "请帮我解析《Attention Is All You Need》这篇论文",
    "如何检测和避免论文抄袭？",
    "论文查重的标准是什么？",
    "推荐计算机视觉领域的经典文献",
    "如何进行有效的消融实验设计？",
  ];

  const handleSend = () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: messages.length + 1,
      role: 'user',
      content: inputValue
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    setTimeout(() => {
      const aiResponse: Message = {
        id: messages.length + 2,
        role: 'assistant',
        content: getAIResponse(inputValue)
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1200);
  };

  const handleQuickPrompt = (prompt: string) => {
    setInputValue(prompt);
    setTimeout(() => handleSend(), 100);
  };

  const getAIResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();

    if (lowerInput.includes('查重') || lowerInput.includes('抄袭') || lowerInput.includes('相似')) {
      return `**论文查重指导**

**查重标准：**
- 学术期刊：通常要求相似度＜15%-20%
- 会议论文：通常要求相似度＜20%-25%
- 毕业论文：通常要求相似度＜10%-20%

**常见查重工具：**
• Turnitin - 国际标准学术不端检测
• iThenticate - 学术出版社首选
• 知网查重 - 国内高校常用
• Grammarly Plagiarism Checker - 语法检查附带

**如何降低相似度：**
1. **正确引用** - 确保所有引用都正确标注
2. **改写句子** - 使用同义词替换，改变句式结构
3. **增加原创内容** - 补充自己的分析和见解
4. **使用引号** - 直接引用必须使用引号并注明出处
5. **重写段落** - 用自己的话重新表达核心思想

**避免学术不端的建议：**
- 提前进行自查
- 保留参考文献记录
- 理解而非复制
- 使用引用管理工具

需要具体的查重分析帮助吗？`;
    } else if (lowerInput.includes('文献') || lowerInput.includes('论文') || lowerInput.includes('检索')) {
      return `**文献检索建议**

**关键词优化：**
- 核心术语：Transformer, Attention Mechanism
- 应用领域：Computer Vision, Natural Language Processing

**推荐数据库：**
• arXiv - 最新预印本
• IEEE Xplore - 工程领域权威
• Google Scholar - 综合性检索

**筛选标准：**
- 时间范围：近3年核心工作
- 期刊会议：顶会/顶刊优先

**经典文献：**
1. "Attention Is All You Need"
2. "BERT: Pre-training of Deep Bidirectional Transformers"
3. "Language Models are Few-Shot Learners"

需要我推荐特定领域的文献吗？`;
    } else {
      return `**分析您的问题：**"${input}"

**研究框架建议：**

**短期（1-3个月）：**
• 文献综述与调研
• 确定技术路线
• 设计初步实验

**中期（3-6个月）：**
- 方法实现与验证
- 数据收集分析
- 论文初稿撰写

**长期（6-12个月）：**
• 方法优化提升
• 完善实验分析
• 投稿发表准备

请提供更多细节，我可以给出更具体的建议。`;
    }
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-gray-50 via-white to-blue-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-blue-900/10">
      {/* Header - 居中简洁 */}
      <div className="p-6 border-b border-border/50">
        <div className="flex items-center justify-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground">AI科研助手</h1>
            <p className="text-sm text-muted-foreground mt-1">
              智能科研咨询与指导
            </p>
          </div>
        </div>
      </div>

      {/* Chat Area - 居中对话框 */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-2xl mx-auto">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[90%] rounded-2xl ${message.role === 'user'
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md'
                    : 'bg-white dark:bg-gray-800 border border-border shadow-sm'
                    }`}
                >
                  <div className="p-5">
                    <div className="whitespace-pre-wrap leading-relaxed">
                      {message.content}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[90%] rounded-2xl bg-white dark:bg-gray-800 border border-border p-5">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-150"></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-300"></div>
                    <span className="ml-2 text-sm">AI正在思考...</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Input Area - 快速提问在下方 */}
      <div className="p-6 border-t border-border/50 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
        <div className="max-w-2xl mx-auto">
          {/* 输入框 */}
          <div className="flex gap-3 mb-4">
            <div className="flex-1 relative">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
                placeholder="输入科研问题，按Enter发送..."
                className="w-full p-4 bg-white dark:bg-gray-800 border border-input rounded-xl pr-14 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                disabled={isLoading}
              />
              <button
                onClick={handleSend}
                disabled={!inputValue.trim() || isLoading}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2.5 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-all"
                aria-label="发送"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* 快速提问 - 简洁按钮 */}
          <div className="mb-3">
            <p className="text-sm text-muted-foreground mb-2 text-center">快速提问：</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {quickPrompts.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickPrompt(prompt)}
                  className="px-3 py-2 text-sm bg-white dark:bg-gray-800 border border-border hover:border-blue-300 dark:hover:border-blue-500 text-foreground rounded-lg transition-colors hover:shadow-sm"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          <p className="text-xs text-muted-foreground text-center">
            支持学术问题咨询、文献检索、查重指导、研究方法等
          </p>
        </div>
      </div>
    </div>
  );
}

function ResearchContent() {
  const searchParams = useSearchParams();
  const toolParam = searchParams.get("tool") as ExtendedToolType | null;

  const [activeTool, setActiveTool] = useState<ExtendedToolType>(toolParam || "chat");
  const [selectedText, setSelectedText] = useState("");

  useEffect(() => {
    const validTools: ExtendedToolType[] = ["search", "manage", "notes", "interpret", "plagiarism", "chat"];
    if (toolParam && validTools.includes(toolParam)) {
      setActiveTool(toolParam);
    }
  }, [toolParam]);

  const handleTextSelect = (text: string) => {
    setSelectedText(text);
  };

  const renderMainContent = () => {
    switch (activeTool) {
      case "search":
        return <LiteratureSearch />;
      case "manage":
        return <LiteratureManage />;
      case "notes":
        return <NotesPanel />;
      case "interpret":
        return <PdfReader onTextSelect={handleTextSelect} />;
      case "plagiarism":
        return <PlagiarismCheck />;
      case "chat":
        return <ResearchChatInterface />;
      default:
        return <ResearchChatInterface />;
    }
  };

  return (
    <div className="flex flex-1 pt-14 min-h-0">
      <ToolsPanel
        activeTool={activeTool}
        onToolChange={(tool) => setActiveTool(tool as ExtendedToolType)}
      />

      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex-1 overflow-y-auto">
          {renderMainContent()}
        </div>
      </div>

      {/* 检查：当切换到interpret时，这里应该显示右侧面板 */}
      {activeTool === "interpret" && (
        <div className="flex-shrink-0">
          <AiAssistantPanel selectedText={selectedText} />
        </div>
      )}
    </div>
  );
}

export default function ResearchPage() {
  return (
    <main className="flex h-screen w-full flex-col bg-background">
      <TopNavbar currentPath="/research" />

      <Suspense
        fallback={
          <div className="flex flex-1 items-center justify-center pt-14">
            <div className="text-muted-foreground">加载中...</div>
          </div>
        }
      >
        <ResearchContent />
      </Suspense>
    </main>
  );
}