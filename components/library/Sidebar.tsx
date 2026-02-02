// components/library/Sidebar.tsx
import { Search, LayoutGrid, BookOpen, Library, StickyNote, User } from "lucide-react";
import { cn } from "@/lib/utils";

export type LibraryTab = "search" | "discover" | "reading" | "bookshelf" | "notes" | "profile";

interface SidebarProps {
    activeTab: LibraryTab;
    onTabChange: (tab: LibraryTab) => void;
}

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
    const sections = [
        { id: "search", label: "智能搜索", icon: Search },
        { type: "label", label: "图书馆" },
        { id: "discover", label: "图书广场", icon: LayoutGrid },
        { id: "reading", label: "阅读", icon: BookOpen },
        { type: "label", label: "个人空间" },
        { id: "bookshelf", label: "我的书架", icon: Library },
        { id: "notes", label: "我的笔记", icon: StickyNote },
        { id: "profile", label: "阅读记录", icon: User },
    ];

    return (
        <aside className="w-64 border-r border-border bg-sidebar flex-shrink-0">
            <div className="p-4 space-y-2">
                {sections.map((item, idx) => {
                    if (item.type === "label") {
                        return (
                            <h3 key={idx} className="mt-6 mb-2 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                {item.label}
                            </h3>
                        );
                    }
                    const Icon = item.icon!;
                    const isActive = activeTab === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => onTabChange(item.id as LibraryTab)}
                            className={cn(
                                "w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-sm",
                                isActive ? "bg-primary/10 text-primary font-medium shadow-sm" : "text-muted-foreground hover:bg-sidebar-accent hover:text-foreground"
                            )}
                        >
                            <Icon className="h-4 w-4" />
                            <span className="text-sm">{item.label}</span>
                        </button>
                    );
                })}
            </div>
        </aside>
    );
}