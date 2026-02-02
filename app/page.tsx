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
    <main className="relative min-h-screen w-full bg-background">
      {/* Top Navigation Bar */}
      <TopNavbar currentPath="/" />

      {/* Fixed Sidebar */}
      <ChatSidebar
        isCollapsed={leftSidebarCollapsed}
        onToggle={() => setLeftSidebarCollapsed(!leftSidebarCollapsed)}
        onStartChat={handleStartNewChat}
        onSelectHistory={handleSelectHistory}
        onHomeClick={handleHomeClick}
      />

      {/* Main Content Area - 根据侧边栏状态设置左边距 */}
      <div
        className={cn(
          "min-h-screen pt-14 transition-all duration-300",
          leftSidebarCollapsed ? "ml-0" : "ml-64"
        )}
      >
        {!isChatStarted ? (
          // 初始状态：居中简洁对话框
          <div className="w-full h-[calc(100vh-56px)] flex items-center justify-center">
            <div className="w-full max-w-4xl px-4">
              <LandingSearch onStart={handleStartNewChat} />
            </div>
          </div>
        ) : (
          // 对话状态
          <div className="flex h-[calc(100vh-56px)]">
            {/* 对话主界面 */}
            <div className="flex-1 overflow-hidden">
              {currentChatType === 'new' ? (
                <ChatInterface />
              ) : (
                <ChatExample />
              )}
            </div>

            {/* 右侧面板 */}
            <div className="flex">
              {!rightPanelCollapsed && (
                <UserDataPanel
                  isCollapsed={rightPanelCollapsed}
                  onToggle={() => setRightPanelCollapsed(true)}
                />
              )}

              {rightPanelCollapsed && (
                <div className="relative">
                  <CollapsedPanelToggle onToggle={() => setRightPanelCollapsed(false)} />
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* 折叠按钮 - 当侧边栏折叠时显示 */}
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