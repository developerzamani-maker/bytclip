import { StudioNavbar } from "@/components/studio/studio-navbar";
import { StudioSidebar } from "@/components/studio/studio-sidebar";

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen flex-col overflow-hidden bg-bg-base">
      <StudioNavbar />
      <div className="flex flex-1 overflow-hidden">
        <StudioSidebar />
        <main className="flex-1 overflow-y-auto bg-bg-base">
          {children}
        </main>
      </div>
    </div>
  );
}
