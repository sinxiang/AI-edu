"use client";

import React, { useState } from "react";
import {
    Plus, Search, CheckCircle2, XCircle, Eye,
    ArrowUpRight, ArrowDownRight, Trash2, Clock,
    Filter, FileText, User, Tag, ShieldCheck
} from "lucide-react";
import { cn } from "@/lib/utils";

export function AgentManager() {
    const [subTab, setSubTab] = useState("online");

    // 1. 在线智能体数据
    const onlineAgents = [
        { id: "A001", name: "学术论文润色", category: "科研助手", status: "online", calls: "12,540", author: "科研处" },
        { id: "A002", name: "雅思口语教练", category: "智能助教", status: "online", calls: "8,420", author: "外语学院" },
        { id: "A004", name: "历史考点分析", category: "智能助教", status: "online", calls: "5,600", author: "历史系" },
        { id: "A005", name: "代码审查专家", category: "通用工具", status: "online", calls: "9,200", author: "系统管理员" },
        { id: "A007", name: "简历优化助手", category: "就业指导", status: "online", calls: "15,800", author: "学工部" },
    ];

    // 2. 待审核智能体数据
    const auditAgents = [
        { id: "REQ-001", name: "心理压力评测", category: "心理健康", applicant: "心理咨询中心", time: "2024-03-31 10:00", desc: "基于专业量表的学生压力自动评估。" },
        { id: "REQ-002", name: "物理实验模拟", category: "智能助教", applicant: "物理学院", time: "2024-03-31 14:20", desc: "辅助学生通过对话理解复杂的物理公式。" },
        { id: "REQ-003", name: "校园活动推荐", category: "生活服务", applicant: "团委", time: "2024-04-01 09:15", desc: "根据学生兴趣推荐近期校园讲座与比赛。" },
    ];

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* 二级导航栏 */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl w-fit">
                    {[
                        { id: "online", label: "运行中", icon: <CheckCircle2 className="h-3.5 w-3.5" /> },
                        { id: "audit", label: "上架审核", icon: <Clock className="h-3.5 w-3.5" />, badge: auditAgents.length.toString() },
                        { id: "publish", label: "快速上架", icon: <Plus className="h-3.5 w-3.5" /> },
                    ].map((t) => (
                        <button
                            key={t.id}
                            onClick={() => setSubTab(t.id)}
                            className={cn(
                                "flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold transition-all",
                                subTab === t.id ? "bg-white text-primary shadow-sm" : "text-slate-500 hover:text-slate-900"
                            )}
                        >
                            {t.icon} {t.label}
                            {t.badge && <span className="ml-1 bg-red-500 text-white text-[9px] px-1 rounded-full">{t.badge}</span>}
                        </button>
                    ))}
                </div>
            </div>

            {/* 内容区：运行中列表 */}
            {subTab === "online" && (
                <div className="bg-white border rounded-2xl overflow-hidden shadow-sm">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 border-b text-slate-500 font-bold text-[11px] uppercase tracking-wider">
                            <tr>
                                <th className="px-6 py-4">智能体名称</th>
                                <th className="px-6 py-4">分类</th>
                                <th className="px-6 py-4">累计调用</th>
                                <th className="px-6 py-4">提供方</th>
                                <th className="px-6 py-4">状态</th>
                                <th className="px-6 py-4 text-right">操作</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {onlineAgents.map((agent) => (
                                <tr key={agent.id} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="px-6 py-4 font-bold text-slate-900">{agent.name}</td>
                                    <td className="px-6 py-4 text-xs font-medium text-slate-600">{agent.category}</td>
                                    <td className="px-6 py-4 font-mono text-xs">{agent.calls}</td>
                                    <td className="px-6 py-4 text-xs">{agent.author}</td>
                                    <td className="px-6 py-4 text-green-600 font-bold text-xs italic">ONLINE</td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-1">
                                            <button className="p-1.5 hover:bg-slate-100 rounded text-slate-400 hover:text-primary"><Eye className="h-4 w-4" /></button>
                                            <button className="p-1.5 hover:bg-red-50 rounded text-red-500"><Trash2 className="h-4 w-4" /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* 内容区：上架审核列表（新增内容） */}
            {subTab === "audit" && (
                <div className="grid grid-cols-1 gap-4">
                    {auditAgents.map((req) => (
                        <div key={req.id} className="bg-white border rounded-2xl p-5 hover:shadow-md transition-shadow">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-bold text-slate-900">{req.name}</h3>
                                        <span className="text-[10px] bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full font-bold">{req.category}</span>
                                    </div>
                                    <div className="flex items-center gap-4 text-xs text-slate-500">
                                        <span className="flex items-center gap-1"><User className="h-3 w-3" /> {req.applicant}</span>
                                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {req.time}</span>
                                    </div>
                                    <p className="text-xs text-slate-600 line-clamp-1 mt-2 bg-slate-50 p-2 rounded-lg italic">
                                        "{req.desc}"
                                    </p>
                                </div>
                                <div className="flex gap-2 shrink-0">
                                    <button className="flex-1 md:flex-none px-4 py-2 border rounded-xl text-xs font-bold hover:bg-slate-50 transition-colors">驳回修改</button>
                                    <button className="flex-1 md:flex-none px-4 py-2 bg-primary text-white rounded-xl text-xs font-bold shadow-sm hover:bg-primary/90 transition-colors">通过审核并发布</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* 内容区：快速上架（新增表单预览） */}
            {subTab === "publish" && (
                <div className="bg-white border rounded-2xl p-8 max-w-2xl mx-auto shadow-sm">
                    <h3 className="text-lg font-bold mb-6 flex items-center gap-2"><Plus className="h-5 w-5 text-primary" /> 管理员直发智能体</h3>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-slate-400 uppercase">智能体名称</label>
                                <input className="w-full p-2 text-sm border rounded-lg bg-slate-50 focus:bg-white outline-none" placeholder="例如：翻译专家" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-slate-400 uppercase">分类</label>
                                <select className="w-full p-2 text-sm border rounded-lg bg-slate-50 outline-none">
                                    <option>通用工具</option>
                                    <option>科研助手</option>
                                    <option>智能助教</option>
                                </select>
                            </div>
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-400 uppercase">系统设定 (Prompt)</label>
                            <textarea className="w-full p-3 text-sm border rounded-lg bg-slate-50 focus:bg-white h-32 outline-none" placeholder="输入智能体的人设和回复逻辑..." />
                        </div>
                        <button className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold text-sm shadow-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-2">
                            <ShieldCheck className="h-4 w-4" /> 确认部署到生产环境
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}