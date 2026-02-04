import { Outlet } from "react-router-dom";
import Sidebar from "../common/Sidebar";
import MobileBottomNav from "../common/MobileBottomNav";

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Desktop Sidebar */}
        <Sidebar />

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-8 pb-24 md:pb-8">
          <Outlet />
        </main>
      </div>

      {/* ✅ Mobile Bottom Nav (ALWAYS rendered) */}
      <MobileBottomNav />
    </div>
  );
}
