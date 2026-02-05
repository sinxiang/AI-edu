"use client";

import React from "react";
import { Building2, Globe, Save, Palette, BellRing } from "lucide-react";

export function SettingsManager() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-500">
            {/* 单位信息配置 */}
            <div className="p-6 bg-white border rounded-2xl shadow-sm space-y-4">
                <h3 className="font-bold flex items-center gap-2 text-slate-900">
                    <Building2 className="h-4 w-4 text-primary" />
                    单位信息配置
                </h3>
                <div className="space-y-4">
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">单位名称</label>
                        <input
                            className="w-full p-2.5 text-sm border rounded-lg bg-slate-50 outline-none focus:bg-white focus:ring-2 focus:ring-primary/10 transition-all"
                            defaultValue="EduAI 教育科技集团"
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">门户主标题</label>
                        <input
                            className="w-full p-2.5 text-sm border rounded-lg bg-slate-50 outline-none focus:bg-white focus:ring-2 focus:ring-primary/10 transition-all"
                            defaultValue="EduAI - 智能教育平台"
                        />
                    </div>
                </div>
            </div>

            {/* 门户显示配置 */}
            <div className="p-6 bg-white border rounded-2xl shadow-sm space-y-4">
                <h3 className="font-bold flex items-center gap-2 text-slate-900">
                    <Globe className="h-4 w-4 text-green-500" />
                    门户外观设置
                </h3>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">主题色</label>
                        <div className="flex items-center gap-2 p-1.5 border rounded-lg bg-slate-50">
                            <div className="h-6 w-6 rounded bg-primary border border-white/20 shadow-sm" />
                            <span className="text-xs font-mono text-slate-500">#3B82F6</span>
                        </div>
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">默认语言</label>
                        <select className="w-full p-2.5 text-sm border rounded-lg bg-slate-50 outline-none">
                            <option>简体中文</option>
                            <option>English</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* 消息通知设置 - 新增项以填补空间 */}
            <div className="p-6 bg-white border rounded-2xl shadow-sm space-y-4">
                <h3 className="font-bold flex items-center gap-2 text-slate-900">
                    <BellRing className="h-4 w-4 text-orange-500" />
                    系统通知偏好
                </h3>
                <div className="space-y-3">
                    <div className="flex items-center justify-between p-2 hover:bg-slate-50 rounded-lg transition-colors">
                        <span className="text-sm text-slate-600">邮件提醒新用户注册</span>
                        <div className="h-5 w-9 bg-primary rounded-full relative"><div className="absolute right-1 top-1 h-3 w-3 bg-white rounded-full" /></div>
                    </div>
                    <div className="flex items-center justify-between p-2 hover:bg-slate-50 rounded-lg transition-colors">
                        <span className="text-sm text-slate-600">智能体异常自动报警</span>
                        <div className="h-5 w-9 bg-slate-200 rounded-full relative"><div className="absolute left-1 top-1 h-3 w-3 bg-white rounded-full" /></div>
                    </div>
                </div>
            </div>

            {/* 个性化页脚设置 - 新增项 */}
            <div className="p-6 bg-white border rounded-2xl shadow-sm space-y-4">
                <h3 className="font-bold flex items-center gap-2 text-slate-900">
                    <Palette className="h-4 w-4 text-purple-500" />
                    品牌个性化
                </h3>
                <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">页脚版权信息</label>
                    <input
                        className="w-full p-2.5 text-sm border rounded-lg bg-slate-50 outline-none focus:bg-white focus:ring-2 focus:ring-primary/10 transition-all"
                        defaultValue="© 2024 EduAI Group. All rights reserved."
                    />
                </div>
            </div>

            {/* 保存按钮区域 */}
            <div className="md:col-span-2 flex justify-end pt-4">
                <button className="flex items-center gap-2 bg-slate-900 text-white px-8 py-3 rounded-xl text-sm font-bold shadow-lg hover:bg-slate-800 active:scale-95 transition-all">
                    <Save className="h-4 w-4" />
                    同步并保存所有配置
                </button>
            </div>
        </div>
    );
}