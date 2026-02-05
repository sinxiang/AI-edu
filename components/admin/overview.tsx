"use client";

import React from "react";
import {
    LineChart as LineIcon, BarChart3, PieChart as PieIcon,
    Users, ShieldCheck, MessageSquare, BookOpen, TrendingUp
} from "lucide-react";
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer, BarChart, Bar, Cell
} from "recharts";
import { cn } from "@/lib/utils";

// 模拟日活跃数据
const dailyData = [
    { day: "03-25", pv: 2400, uv: 400 },
    { day: "03-26", pv: 1398, uv: 300 },
    { day: "03-27", pv: 9800, uv: 2000 },
    { day: "03-28", pv: 3908, uv: 1200 },
    { day: "03-29", pv: 4800, uv: 1100 },
    { day: "03-30", pv: 3800, uv: 900 },
    { day: "03-31", pv: 4300, uv: 1000 },
];

export function Overview() {
    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* 核心指标卡片 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                    { label: "门户访问量", value: "45,281", icon: <LineIcon className="h-4 w-4" />, color: "text-blue-600 bg-blue-50" },
                    { label: "智能体调用", value: "12,840", icon: <ShieldCheck className="h-4 w-4" />, color: "text-green-600 bg-green-50" },
                    { label: "活跃用户数", value: "3,512", icon: <Users className="h-4 w-4" />, color: "text-purple-600 bg-purple-50" },
                    { label: "存储空间", value: "85%", icon: <BookOpen className="h-4 w-4" />, color: "text-orange-600 bg-orange-50" },
                ].map((s) => (
                    <div key={s.label} className="p-4 bg-white border rounded-xl shadow-sm">
                        <div className="flex justify-between items-start">
                            <div className={cn("p-2 rounded-lg", s.color)}>{s.icon}</div>
                            <span className="text-[10px] text-green-600 font-bold flex items-center bg-green-50 px-1.5 py-0.5 rounded tracking-tighter">
                                <TrendingUp className="h-3 w-3 mr-0.5" /> +12.5%
                            </span>
                        </div>
                        <div className="mt-3">
                            <p className="text-xs text-slate-500 font-medium">{s.label}</p>
                            <h3 className="text-xl font-bold text-slate-900">{s.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            {/* 图表展示区 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* 访问趋势图 */}
                <div className="bg-white p-6 rounded-2xl border shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-sm font-bold flex items-center gap-2"><LineIcon className="h-4 w-4 text-primary" /> 门户访问趋势 (日单位)</h3>
                        <select className="text-xs border-none bg-slate-50 rounded px-2 py-1 outline-none font-medium">
                            <option>最近7天</option>
                            <option>最近30天</option>
                        </select>
                    </div>
                    <div className="h-[240px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={dailyData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                                <Line type="monotone" dataKey="pv" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* 资源分布柱状图 */}
                <div className="bg-white p-6 rounded-2xl border shadow-sm">
                    <h3 className="text-sm font-bold flex items-center gap-2 mb-6"><BarChart3 className="h-4 w-4 text-purple-500" /> 智能体分类调用分布</h3>
                    <div className="h-[240px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={[
                                { name: '科研', val: 4000 }, { name: '教学', val: 3000 },
                                { name: '行政', val: 2000 }, { name: '通用', val: 2780 }
                            ]}>
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11 }} />
                                <Bar dataKey="val" radius={[6, 6, 0, 0]}>
                                    <Cell fill="#6366f1" />
                                    <Cell fill="#a855f7" />
                                    <Cell fill="#ec4899" />
                                    <Cell fill="#f43f5e" />
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}