import { Outlet } from "react-router-dom";

export function AppLayout() {
  return (
    <div className="font-lato flex min-h-screen flex-col bg-[#F6F8F9] antialiased">
      <div className="mx-8 my-4 flex flex-col gap-4">
        <div className="flex flex-1 flex-col rounded-sm border border-[#CCD4DA]">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
