"use client";

import React, { useState } from "react";
import { Bot, Zap, Palette, Brain, MessageSquare, Code } from "lucide-react";

export function CreateAgent() {
    const [agentName, setAgentName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [instructions, setInstructions] = useState("");
    const [isPublic, setIsPublic] = useState(true);

    const categories = [
        { value: "education", label: "教育" },
        { value: "productivity", label: "效率" },
        { value: "entertainment", label: "娱乐" },
        { value: "health", label: "健康" },
        { value: "business", label: "商务" },
        { value: "other", label: "其他" },
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Implement agent creation logic
        console.log({
            name: agentName,
            description,
            category,
            instructions,
            isPublic,
        });
    };

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-foreground">创建智能体</h1>
                <p className="text-muted-foreground mt-2">
                    自定义您的AI助手，设定它的性格、能力和专业知识
                </p>
            </div>

            {/* Creation Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Agent Name */}
                <div className="space-y-3">
                    <label className="flex items-center gap-2 text-sm font-medium text-foreground">
                        <Bot className="h-4 w-4" />
                        智能体名称
                    </label>
                    <input
                        type="text"
                        value={agentName}
                        onChange={(e) => setAgentName(e.target.value)}
                        placeholder="为您的智能体起个名字..."
                        className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        required
                    />
                </div>

                {/* Description */}
                <div className="space-y-3">
                    <label className="flex items-center gap-2 text-sm font-medium text-foreground">
                        <MessageSquare className="h-4 w-4" />
                        描述
                    </label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="描述智能体的主要功能和特点..."
                        rows={3}
                        className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
                        required
                    />
                </div>

                {/* Category and Visibility */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Category */}
                    <div className="space-y-3">
                        <label className="flex items-center gap-2 text-sm font-medium text-foreground">
                            <Brain className="h-4 w-4" />
                            分类
                        </label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            required
                        >
                            <option value="">选择分类</option>
                            {categories.map((cat) => (
                                <option key={cat.value} value={cat.value}>
                                    {cat.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Visibility */}
                    <div className="space-y-3">
                        <label className="flex items-center gap-2 text-sm font-medium text-foreground">
                            <Palette className="h-4 w-4" />
                            可见性
                        </label>
                        <div className="flex gap-4">
                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    checked={isPublic}
                                    onChange={() => setIsPublic(true)}
                                    className="h-4 w-4 text-primary"
                                />
                                <span className="text-sm">公开</span>
                            </label>
                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    checked={!isPublic}
                                    onChange={() => setIsPublic(false)}
                                    className="h-4 w-4 text-primary"
                                />
                                <span className="text-sm">私有</span>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Instructions */}
                <div className="space-y-3">
                    <label className="flex items-center gap-2 text-sm font-medium text-foreground">
                        <Code className="h-4 w-4" />
                        系统指令
                    </label>
                    <textarea
                        value={instructions}
                        onChange={(e) => setInstructions(e.target.value)}
                        placeholder="设定智能体的行为准则、性格特征和专业知识领域... 例如：你是一个专业的数学导师，擅长用简单易懂的方式解释复杂概念..."
                        rows={6}
                        className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none font-mono"
                        required
                    />
                    <p className="text-xs text-muted-foreground">
                        这些指令将决定智能体的行为和回应方式
                    </p>
                </div>

                {/* Capabilities */}
                <div className="space-y-3">
                    <label className="flex items-center gap-2 text-sm font-medium text-foreground">
                        <Zap className="h-4 w-4" />
                        能力配置
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {["文件上传", "网络搜索", "代码执行", "长文本记忆", "数学计算", "数据分析", "图像生成", "语音合成"].map(
                            (capability) => (
                                <label
                                    key={capability}
                                    className="flex items-center gap-2 rounded-lg border border-input bg-card p-3 hover:bg-secondary/50 cursor-pointer transition-colors"
                                >
                                    <input
                                        type="checkbox"
                                        className="h-4 w-4 rounded border-input text-primary focus:ring-primary"
                                        defaultChecked
                                    />
                                    <span className="text-sm">{capability}</span>
                                </label>
                            )
                        )}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-3 pt-6 border-t border-border">
                    <button
                        type="button"
                        className="px-6 py-2.5 rounded-lg border border-input bg-background text-sm font-medium hover:bg-secondary transition-colors"
                    >
                        取消
                    </button>
                    <button
                        type="submit"
                        className="px-6 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors flex items-center gap-2"
                    >
                        <Bot className="h-4 w-4" />
                        创建智能体
                    </button>
                </div>
            </form>

            {/* Creation Tips */}
            <div className="rounded-lg bg-secondary/50 p-4 mt-8">
                <h3 className="font-medium text-foreground mb-2">创建提示</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• 为智能体设定明确的角色和目标</li>
                    <li>• 详细描述专业知识领域</li>
                    <li>• 设定回应风格（正式、友好、幽默等）</li>
                    <li>• 明确限制条件和安全边界</li>
                    <li>• 公开智能体可以让社区其他成员使用</li>
                </ul>
            </div>
        </div>
    );
}