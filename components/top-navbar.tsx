"use client";
import { Briefcase } from "lucide-react";
import React, { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Home,
  FlaskConical,
  GraduationCap,
  Library,
  Bot,
  ChevronDown,
  User,
  Settings,
  LogOut,
  BookMarked,
  LayoutDashboard,
  Search, // 引入搜索图标用于AI智搜
} from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

// 顶部主导航项
const navItems: NavItem[] = [
  { label: "主页", href: "/", icon: <Home className="h-4 w-4" /> },
  {
    label: "AI智搜",
    href: "/ai-search",
    icon: <Search className="h-4 w-4" />,
  },
  { label: "办事",
     href: "/services",
      icon: <Briefcase className="h-4 w-4" /> },
  {
    label: "科研助手",
    href: "/research",
    icon: <FlaskConical className="h-4 w-4" />,
  },
  {
    label: "智能助教",
    href: "/assistant",
    icon: <GraduationCap className="h-4 w-4" />,
  },
  {
    label: "智能图书馆",
    href: "/library",
    icon: <Library className="h-4 w-4" />,
  },
  {
    label: "智能体中心",
    href: "/agent-builder",
    icon: <Bot className="h-4 w-4" />,
  },
];

interface TopNavbarProps {
  currentPath?: string;
}

export function TopNavbar({ currentPath = "/" }: TopNavbarProps) {
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  // 模拟用户信息
  const userInfo = {
    name: "张三",
    email: "zhangsan@edu.cn",
    role: "管理员", // 设定为管理员以显示后台入口
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-[110] flex h-14 items-center justify-between border-b border-border/50 bg-background/80 px-6 backdrop-blur-md">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary shadow-sm">
          <Bot className="h-5 w-5 text-primary-foreground" />
        </div>
        <span className="text-lg font-semibold text-foreground tracking-tight">EduAI</span>
      </div>

      {/* Navigation Links - 居中显示 */}
      <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-1">
        {navItems.map((item) => {
          const isActive = currentPath === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-primary/20 text-primary"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>

      {/* 用户信息组件 */}
      <div className="relative">
        <button
          onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
          className={cn(
            "flex items-center gap-2 rounded-lg px-3 py-1.5 transition-all",
            isUserDropdownOpen ? "bg-secondary" : "hover:bg-secondary"
          )}
        >
          {/* 用户头像 */}
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-inner">
            <span className="text-sm font-semibold text-white">
              {userInfo.name.charAt(0)}
            </span>
          </div>

          {/* 用户名 */}
          <div className="text-left hidden md:block">
            <div className="text-sm font-semibold text-foreground leading-none mb-0.5">
              {userInfo.name}
            </div>
            <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-tight">
              {userInfo.role}
            </div>
          </div>

          {/* 下拉箭头 */}
          <ChevronDown className={cn(
            "h-4 w-4 text-muted-foreground transition-transform duration-300",
            isUserDropdownOpen ? "rotate-180" : ""
          )} />
        </button>

        {/* 用户下拉菜单 */}
        {isUserDropdownOpen && (
          <>
            {/* 遮罩层 */}
            <div
              className="fixed inset-0 z-[115]"
              onClick={() => setIsUserDropdownOpen(false)}
            />

            <div className="absolute right-0 top-full z-[120] mt-2 w-64 rounded-2xl border border-border bg-popover/95 shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95 duration-200 overflow-hidden text-left">
              {/* 用户信息头部 */}
              <div className="p-4 bg-muted/30 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg ring-2 ring-background text-white font-bold text-base">
                    {userInfo.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold text-foreground truncate leading-none mb-1">
                      {userInfo.name}
                    </div>
                    <div className="text-xs text-muted-foreground truncate opacity-70">
                      {userInfo.email}
                    </div>
                  </div>
                </div>
              </div>

              {/* 菜单选项列表 */}
              <div className="p-1.5">
                {/* 只有管理员角色显示管理后台入口 */}
                {userInfo.role === "管理员" && (
                  <Link href="/admin" onClick={() => setIsUserDropdownOpen(false)}>
                    <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-primary hover:bg-primary/10 transition-all group">
                      <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <LayoutDashboard className="h-4 w-4 text-primary" />
                      </div>
                      <span className="font-semibold text-left">管理后台</span>
                    </button>
                  </Link>
                )}

                <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground hover:bg-accent transition-all group">
                  <div className="p-2 rounded-lg bg-secondary group-hover:bg-background transition-colors">
                    <User className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                  </div>
                  <span className="font-medium text-left">个人中心</span>
                </button>

                <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground hover:bg-accent transition-all group">
                  <div className="p-2 rounded-lg bg-secondary group-hover:bg-background transition-colors">
                    <Settings className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                  </div>
                  <span className="font-medium text-left">账户设置</span>
                </button>
              </div>

              {/* 退出按钮 */}
              <div className="border-t border-border p-1.5 bg-muted/10">
                <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-destructive hover:bg-destructive/10 transition-all font-medium group">
                  <div className="p-2 rounded-lg bg-destructive/5 group-hover:bg-destructive/10">
                    <LogOut className="h-4 w-4" />
                  </div>
                  <span className="text-left">退出登录</span>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </nav>
  );
}