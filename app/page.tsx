"use client";

import { useState, useEffect } from "react";
import { ChatSidebar, CollapsedToggle } from "@/components/chat-sidebar";
import { ChatInterface, LandingSearch } from "@/components/chat-interface";
import { UserDataPanel, CollapsedPanelToggle } from "@/components/user-data-panel";
import { TopNavbar } from "@/components/top-navbar";

export default function HomePage() {
  const [leftSidebarCollapsed, setLeftSidebarCollapsed] = useState(false);
  const [rightPanelCollapsed, setRightPanelCollapsed] = useState(false);
  // 控制是否已开始对话
  const [isChatStarted, setIsChatStarted] = useState(false);

  useEffect(() => {
    console.log("[v0] HomePage mounted successfully");
  }, []);

  return (
    <main className="relative flex min-h-screen w-full flex-col bg-background">
      {/* Top Navigation Bar */}
      <TopNavbar currentPath="/" />

      {/* Main Content Area */}
      <div className="flex flex-1 pt-14 overflow-hidden">
        {/* 左侧边栏和折叠按钮容器 */}
        <div className="flex">
          {leftSidebarCollapsed && (
            <div className="relative">
              <CollapsedToggle onToggle={() => setLeftSidebarCollapsed(false)} />
            </div>
          )}

          {!leftSidebarCollapsed && (
            <ChatSidebar
              isCollapsed={leftSidebarCollapsed}
              onToggle={() => setLeftSidebarCollapsed(true)}
            />
          )}
        </div>

        {/* Main Interface Area */}
        <div className="flex-1 flex flex-col min-h-0 items-center justify-center">
          {!isChatStarted ? (
            // 初始状态：居中简洁对话框
            <div className="w-full max-w-4xl px-4">
              <LandingSearch onStart={() => setIsChatStarted(true)} />
            </div>
          ) : (
            // 对话状态
            <div className="flex-1 w-full overflow-y-auto">
              <ChatInterface />
            </div>
          )}
        </div>

        {/* 右侧面板和折叠按钮容器 */}
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
    </main>
  );
}