"use client";

import { useState, useRef, useEffect } from "react";
import { Bot, Send, Sparkles, BookOpen, Link2, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
}

interface AiAssistantPanelProps {
  selectedText: string;
}

const suggestButtons = [
  { label: "解释此段", icon: <Sparkles className="h-3 w-3" /> },
  { label: "总结要点", icon: <BookOpen className="h-3 w-3" /> },
  { label: "关联文献", icon: <Link2 className="h-3 w-3" /> },
];

export function AiAssistantPanel({ selectedText }: AiAssistantPanelProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "您好！我是您的科研AI助手。我可以帮助您解读文献、总结论文要点、查找关联文献等。请问有什么可以帮助您的？",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (selectedText) {
      const systemMessage: Message = {
        id: Date.now().toString(),
        role: "system",
        content: `已选中文本："${selectedText.slice(0, 100)}${selectedText.length > 100 ? "..." : ""}"`,
      };
      setMessages((prev) => [...prev, systemMessage]);
    }
  }, [selectedText]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          "这是一个很好的问题！根据我对文献的分析，Transformer架构的核心创新在于完全摒弃了循环和卷积结构，仅依赖注意力机制来建模序列中的依赖关系。这种设计允许更高效的并行计算，并能更好地捕获长距离依赖。",
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  const handleSuggestionClick = (suggestion: string) => {
    if (!selectedText) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: `请${suggestion}：\n"${selectedText.slice(0, 200)}${selectedText.length > 200 ? "..." : ""}"`,
    };

    setMessages((prev) => [...prev, userMessage]);

    // Simulate AI response
    setTimeout(() => {
      let responseContent = "";
      switch (suggestion) {
        case "解释此段":
          responseContent =
            "这段文字讨论了序列转导模型中循环神经网络的特点。主要指出：1) RNN按序列位置进行计算；2) 隐藏状态依赖于前一时刻的状态；3) 这种序列性质限制了训练时的并行化能力。这也是后来Transformer架构要解决的核心问题。";
          break;
        case "总结要点":
          responseContent =
            "核心要点：\n• 传统RNN模型按时间步顺序处理序列\n• 每个位置的计算依赖前一位置\n• 序列计算特性阻碍了并行训练\n• 长序列处理面临内存瓶颈";
          break;
        case "关联文献":
          responseContent =
            "相关文献推荐：\n1. \"Long Short-Term Memory\" (Hochreiter, 1997) - LSTM原始论文\n2. \"Learning Phrase Representations\" (Cho, 2014) - GRU架构\n3. \"Sequence to Sequence Learning\" (Sutskever, 2014) - Seq2Seq模型";
          break;
        default:
          responseContent = "好的，我来为您分析这段内容。";
      }

      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: responseContent,
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <div className="flex h-full w-[320px] flex-col border-l border-border bg-card">
      {/* Panel Header */}
      <div className="flex items-center gap-3 border-b border-border p-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20">
          <Bot className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">AI科研助手</h3>
          <p className="text-xs text-muted-foreground">随时为您解答</p>
        </div>
      </div>

      {/* Selected Text Suggestions */}
      {selectedText && (
        <div className="border-b border-border p-3">
          <p className="mb-2 text-xs text-muted-foreground">选中文本操作：</p>
          <div className="flex flex-wrap gap-2">
            {suggestButtons.map((btn) => (
              <Button
                key={btn.label}
                variant="outline"
                size="sm"
                className="h-7 gap-1 bg-transparent text-xs"
                onClick={() => handleSuggestionClick(btn.label)}
              >
                {btn.icon}
                {btn.label}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex",
                message.role === "user" ? "justify-end" : "justify-start"
              )}
            >
              {message.role === "system" ? (
                <div className="flex items-center gap-2 rounded-lg bg-secondary/50 px-3 py-2 text-xs text-muted-foreground">
                  <FileText className="h-3 w-3" />
                  {message.content}
                </div>
              ) : (
                <div
                  className={cn(
                    "max-w-[90%] rounded-2xl px-4 py-2.5 text-sm",
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-foreground"
                  )}
                >
                  <p className="whitespace-pre-wrap leading-relaxed">
                    {message.content}
                  </p>
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-border p-4">
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="输入您的问题..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="flex-1"
          />
          <Button
            size="icon"
            onClick={handleSend}
            disabled={!inputValue.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
