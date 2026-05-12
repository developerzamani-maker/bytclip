import { LayoutDashboard, Library, Calendar, Settings } from "lucide-react";
import Link from "next/link";

const navItems = [
  { icon: LayoutDashboard, label: "Projects", href: "/dashboard" },
  { icon: Library, label: "Prompt Library", href: "/library" },
  { icon: Calendar, label: "Scheduler", href: "/scheduler" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

export function StudioSidebar() {
  return (
    <aside className="flex h-full w-[280px] flex-col border-r border-border-default bg-surface/80 backdrop-blur-md">
      <div className="flex flex-col gap-2 p-4">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-surface hover:text-primary"
          >
            <item.icon className="h-5 w-5" />
            {item.label}
          </Link>
        ))}
      </div>
      
      <div className="flex-1 overflow-y-auto p-4">
        <h3 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted">
          Recent Projects
        </h3>
        <div className="flex flex-col gap-1">
          <span className="px-3 py-2 text-sm text-muted">No projects yet</span>
        </div>
      </div>

      <div className="border-t border-border p-4">
        <div className="flex items-center gap-2 rounded-md bg-surface/50 px-3 py-2 text-sm text-primary">
          <div className="h-2 w-2 rounded-full bg-success" />
          <span className="font-mono text-xs">Engine: Online</span>
        </div>
      </div>
    </aside>
  );
}
