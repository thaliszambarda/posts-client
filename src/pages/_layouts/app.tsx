import { Outlet } from "react-router-dom";

export function AppLayout() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#DDD] px-2 font-sans antialiased">
      <Outlet />
    </div>
  );
}
