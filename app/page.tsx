"use client";

import { useState, useEffect } from "react";
import { ChatSidebar, CollapsedToggle } from "@/components/chat-sidebar";
import { ChatInterface } from "@/components/chat-interface";
import { UserDataPanel, CollapsedPanelToggle } from "@/components/user-data-panel";
import { TopNavbar } from "@/components/top-navbar";

export default function HomePage() {
  const [leftSidebarCollapsed, setLeftSidebarCollapsed] = useState(false);
  const [rightPanelCollapsed, setRightPanelCollapsed] = useState(false);

  useEffect(() => {
    console.log("[v0] HomePage mounted successfully");
  }, []);

  return (
    <main className="relative flex min-h-screen w-full flex-col bg-background">
      {/* Top Navigation Bar - 固定在顶部 */}
      <TopNavbar currentPath="/" />

      {/* Main Content Area - 允许滚动 */}
      <div className="flex flex-1 pt-14 overflow-hidden">
        {/* 左侧边栏和折叠按钮容器 */}
        <div className="flex">
          {/* Collapsed Toggle for Left Sidebar - 始终显示在左侧 */}
          {leftSidebarCollapsed && (
            <div className="relative">
              <CollapsedToggle onToggle={() => setLeftSidebarCollapsed(false)} />
            </div>
          )}

          {/* Left Sidebar - Chat History */}
          {!leftSidebarCollapsed && (
            <ChatSidebar
              isCollapsed={leftSidebarCollapsed}
              onToggle={() => setLeftSidebarCollapsed(true)}
            />
          )}
        </div>

        {/* Main Chat Interface - 添加滚动 */}
        <div className="flex-1 flex flex-col min-h-0">
          <div className="flex-1 overflow-y-auto">
            <ChatInterface />
          </div>
        </div>

        {/* 右侧面板和折叠按钮容器 */}
        <div className="flex">
          {/* Right Panel - User Data */}
          {!rightPanelCollapsed && (
            <UserDataPanel
              isCollapsed={rightPanelCollapsed}
              onToggle={() => setRightPanelCollapsed(true)}
            />
          )}

          {/* Collapsed Toggle for Right Panel - 始终显示在右侧 */}
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