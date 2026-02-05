"use client";

import { useState, useEffect } from "react";
import { ChatSidebar, CollapsedToggle } from "@/components/chat-sidebar";
import { ChatInterface, LandingSearch } from "@/components/chat-interface";
import { UserDataPanel, CollapsedPanelToggle } from "@/components/user-data-panel";
import { ChatExample } from "@/components/chat-example";
import { TopNavbar } from "@/components/top-navbar";

export default function HomePage() {
  const [leftSidebarCollapsed, setLeftSidebarCollapsed] = useState(false);
  const [rightPanelCollapsed, setRightPanelCollapsed] = useState(false);
  // 控制是否已开始对话
  const [isChatStarted, setIsChatStarted] = useState(false);
  // 当前显示的对话类型：'new' | 'example'
  const [currentChatType, setCurrentChatType] = useState<'new' | 'example'>('new');

  useEffect(() => {
    console.log("[v0] HomePage mounted successfully");
  }, []);

  // 从侧边栏选择历史记录时，显示对话示例
  const handleSelectHistory = (chatId: string) => {
    setIsChatStarted(true);
    setCurrentChatType('example');
  };

  // 开始新对话
  const handleStartNewChat = () => {
    setIsChatStarted(true);
    setCurrentChatType('new');
  };

  // 点击主页按钮回到主页
  const handleHomeClick = () => {
    setIsChatStarted(false);
    setCurrentChatType('new');
  };

  return (
    <main className="relative h-screen w-full bg-background flex flex-col overflow-hidden">
      {/* Top Navigation Bar */}
      <TopNavbar currentPath="/" />

      <div className="flex flex-1 overflow-hidden relative">
        {/* Fixed Sidebar */}
        <ChatSidebar
          isCollapsed={leftSidebarCollapsed}
          onToggle={() => setLeftSidebarCollapsed(!leftSidebarCollapsed)}
          onStartChat={handleStartNewChat}
          onSelectHistory={handleSelectHistory}
          onHomeClick={handleHomeClick}
        />

        {/* 核心联动区：使用 flex-1 让中间区域随右侧面板状态自动缩放 */}
        <div
          className={cn(
            "flex flex-1 transition-all duration-300",
            leftSidebarCollapsed ? "ml-0" : "ml-64"
          )}
        >
          {/* 中间主要内容区：
              1. flex-1 保证它会自动“避让”右侧面板
              2. relative 保证了 LandingSearch 内部的 absolute 元素能正确跟随
          */}
          <div className="flex-1 flex flex-col min-w-0 pt-14 h-full relative">
            {!isChatStarted ? (
              // 初始状态
              <div className="flex-1 overflow-hidden">
                <LandingSearch onStart={handleStartNewChat} />
              </div>
            ) : (
              // 对话状态
              <div className="flex-1 overflow-hidden">
                {currentChatType === 'new' ? (
                  <ChatInterface />
                ) : (
                  <ChatExample />
                )}
              </div>
            )}
          </div>

          {/* 右侧面板区：紧贴中间内容区，不再使用 fixed 定位 */}
          <div className="h-full pt-14 flex items-center bg-background shrink-0">
            {!rightPanelCollapsed ? (
              <UserDataPanel
                isCollapsed={rightPanelCollapsed}
                onToggle={() => setRightPanelCollapsed(true)}
              />
            ) : (
              <CollapsedPanelToggle onToggle={() => setRightPanelCollapsed(false)} />
            )}
          </div>
        </div>
      </div>

      {/* 左侧折叠按钮 - 当左侧边栏折叠时显示 */}
      {leftSidebarCollapsed && (
        <CollapsedToggle onToggle={() => setLeftSidebarCollapsed(false)} />
      )}
    </main>
  );
}

// 添加 cn 工具函数
function cn(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(' ');
}