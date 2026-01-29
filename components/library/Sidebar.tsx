// components/library/Sidebar.tsx
import { Search, Sparkles, BookOpen, User, Library } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
    activeTab: "search" | "discover" | "reading" | "profile";
    onTabChange: (tab: "search" | "discover" | "reading" | "profile") => void;
}

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
    return (
        <div className="w-64 border-r border-border bg-sidebar overflow-y-auto flex-shrink-0">
            <div className="p-4">
                <div className="mb-8">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                            <Library className="h-5 w-5 text-white" />
                        </div>
                        <div>
                            <h2 className="font-bold text-foreground">智能图书馆</h2>
                            <p className="text-xs text-muted-foreground">一站式阅读平台</p>
                        </div>
                    </div>
                </div>

                <div className="space-y-1">
                    <button
                        onClick={() => onTabChange("search")}
                        className={cn(
                            "w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-all",
                            activeTab === "search"
                                ? "bg-primary/20 text-primary font-medium"
                                : "text-muted-foreground hover:bg-sidebar-accent hover:text-foreground"
                        )}
                    >
                        <Search className="h-4 w-4" />
                        <span className="text-sm">智能搜索</span>
                    </button>

                    <div className="mt-6 mb-2">
                        <h3 className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">图书馆</h3>
                    </div>

                    <button
                        onClick={() => onTabChange("discover")}
                        className={cn(
                            "w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-all",
                            activeTab === "discover"
                                ? "bg-primary/20 text-primary font-medium"
                                : "text-muted-foreground hover:bg-sidebar-accent hover:text-foreground"
                        )}
                    >
                        <Sparkles className="h-4 w-4" />
                        <span className="text-sm">发现引擎</span>
                    </button>

                    <button
                        onClick={() => onTabChange("reading")}
                        className={cn(
                            "w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-all",
                            activeTab === "reading"
                                ? "bg-primary/20 text-primary font-medium"
                                : "text-muted-foreground hover:bg-sidebar-accent hover:text-foreground"
                        )}
                    >
                        <BookOpen className="h-4 w-4" />
                        <span className="text-sm">深度阅读</span>
                    </button>

                    <div className="mt-6 mb-2">
                        <h3 className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">个人空间</h3>
                    </div>

                    <button
                        onClick={() => onTabChange("profile")}
                        className={cn(
                            "w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-all",
                            activeTab === "profile"
                                ? "bg-primary/20 text-primary font-medium"
                                : "text-muted-foreground hover:bg-sidebar-accent hover:text-foreground"
                        )}
                    >
                        <User className="h-4 w-4" />
                        <span className="text-sm">个人信息</span>
                    </button>
                </div>
            </div>
        </div>
    );
}