"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Home,
  FlaskConical,
  GraduationCap,
  BookOpen,
  Library,
  Database,
  Bot,
} from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { label: "主页", href: "/", icon: <Home className="h-4 w-4" /> },
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
    label: "数据处理",
    href: "/data",
    icon: <Database className="h-4 w-4" />,
  },
  {
    label: "智能体创建器",
    href: "/agent-builder",
    icon: <Bot className="h-4 w-4" />,
  },
];

interface TopNavbarProps {
  currentPath?: string;
}

export function TopNavbar({ currentPath = "/" }: TopNavbarProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex h-14 items-center justify-between border-b border-border/50 bg-background/80 px-6 backdrop-blur-md">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
          <Bot className="h-5 w-5 text-primary-foreground" />
        </div>
        <span className="text-lg font-semibold text-foreground">EduAI</span>
      </div>

      {/* Navigation Links */}
      <div className="flex items-center gap-1">
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

      {/* Right side - User avatar placeholder */}
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 rounded-full bg-secondary" />
      </div>
    </nav>
  );
}
