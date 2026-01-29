"use client";

import { useState } from "react";
import { TopNavbar } from "@/components/top-navbar";
import { AgentBuilderSidebar } from "@/components/agent-builder-sidebar";
import { MyAgents } from "@/components/agent-builder/my-agents";
import { PublicAgents } from "@/components/agent-builder/public-agents";
import { CommunityAgents } from "../../components/agent-builder/community-agents";

type ViewType = "my-agents" | "public-agents" | "community-agents";

export default function AgentBuilderPage() {
    const [activeView, setActiveView] = useState<ViewType>("my-agents");

    const renderContent = () => {
        switch (activeView) {
            case "my-agents":
                return <MyAgents />;
            case "public-agents":
                return <PublicAgents />;
            case "community-agents":
                return <CommunityAgents />;
            default:
                return <MyAgents />;
        }
    };

    return (
        <main className="relative flex min-h-screen w-full flex-col bg-background">
            {/* Top Navigation Bar */}
            <TopNavbar currentPath="/agent-builder" />

            {/* Main Content */}
            <div className="flex flex-1 pt-14 overflow-hidden">
                {/* Left Sidebar */}
                <AgentBuilderSidebar activeView={activeView} onViewChange={setActiveView} />

                {/* Main Content Area */}
                <div className="flex-1 flex flex-col min-h-0">
                    {/* Content Area */}
                    <div className="flex-1 overflow-y-auto p-6">
                        {renderContent()}
                    </div>
                </div>
            </div>
        </main>
    );
}