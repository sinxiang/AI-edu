"use client";

import React from "react";
import { UserPlus, Search, Edit3, ShieldAlert, MoreHorizontal, ShieldCheck, Mail, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

export function UserManager() {
    const users = [
        { id: "U101", name: "张教授", email: "zhang@edu.cn", role: "教师", dept: "科研处", status: "active", lastLogin: "10分钟前" },
        { id: "U102", name: "管理员", email: "admin@edu.cn", role: "超级管理员", dept: "信息中心", status: "active", lastLogin: "在线" },
        { id: "U103", name: "李同学", email: "li@edu.cn", role: "学生", dept: "计算机系", status: "active", lastLogin: "2小时前" },
        { id: "U104", name: "王老师", email: "wang@edu.cn", role: "教师", dept: "外语学院", status: "blocked", lastLogin: "3天前" },
        { id: "U105", name: "赵助教", email: "zhao@edu.cn", role: "教师", dept: "数学系", status: "active", lastLogin: "昨天" },
        { id: "U106", name: "陈同学", email: "chen@edu.cn", role: "学生", dept: "物理学院", status: "active", lastLogin: "5小时前" },
        { id: "U107", name: "孙主任", email: "sun@edu.cn", role: "超级管理员", dept: "教务处", status: "active", lastLogin: "在线" },
        { id: "U108", name: "周老师", email: "zhou@edu.cn", role: "教师", dept: "文学院", status: "active", lastLogin: "1天前" },
    ];

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* 顶栏操作 */}
            <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div className="relative w-full sm:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input className="w-full pl-10 pr-4 py-2 text-sm border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none shadow-sm" placeholder="通过姓名、邮箱、部门搜索用户..." />
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 border px-4 py-2 rounded-xl text-sm font-medium hover:bg-slate-50 transition-colors">
                        <Mail className="h-4 w-4" /> 批量通知
                    </button>
                    <button className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-slate-800 shadow-md">
                        <UserPlus className="h-4 w-4" /> 邀请新用户
                    </button>
                </div>
            </div>

            {/* 用户列表表格 */}
            <div className="bg-white border rounded-2xl overflow-hidden shadow-sm">
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 border-b text-slate-500 font-bold text-[11px] uppercase tracking-wider">
                        <tr>
                            <th className="px-6 py-4">基本信息</th>
                            <th className="px-6 py-4">所属部门</th>
                            <th className="px-6 py-4">系统角色</th>
                            <th className="px-6 py-4">账号状态</th>
                            <th className="px-6 py-4">最后在线</th>
                            <th className="px-6 py-4 text-right">操作</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {users.map((user) => (
                            <tr key={user.id} className="hover:bg-slate-50/50 transition-colors group">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="h-9 w-9 rounded-full bg-gradient-to-br from-slate-200 to-slate-100 flex items-center justify-center font-bold text-slate-600 text-xs shadow-inner">
                                            {user.name.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="font-bold text-slate-900">{user.name}</div>
                                            <div className="text-[10px] text-slate-400 font-mono tracking-tight">{user.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-xs font-semibold text-slate-600">{user.dept}</td>
                                <td className="px-6 py-4">
                                    <span className={cn(
                                        "px-2.5 py-1 rounded-full text-[10px] font-black tracking-tight",
                                        user.role === "超级管理员" ? "bg-indigo-600 text-white" :
                                            user.role === "教师" ? "bg-blue-100 text-blue-700" : "bg-slate-100 text-slate-600"
                                    )}>
                                        {user.role}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <div className={cn("h-1.5 w-1.5 rounded-full", user.status === "active" ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" : "bg-red-500")} />
                                        <span className="text-xs font-bold text-slate-700">{user.status === "active" ? "正常" : "封禁"}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-xs text-slate-500">{user.lastLogin}</td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors" title="修改资料"><Edit3 className="h-4 w-4" /></button>
                                        <button className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors" title="重置密码"><Lock className="h-4 w-4" /></button>
                                        <button className="p-1.5 hover:bg-red-50 rounded-lg text-red-500 transition-colors" title="权限降级"><ShieldAlert className="h-4 w-4" /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}