import { AuthGuardian, Sidebar } from "@/components/core";
import NotificationCenter from "@/components/core/NotificationCenter";

function Layout({ children }) {
  return (
    <AuthGuardian>
      <div className="h-[100vh] w-full flex items-start">
        <Sidebar />
        <div className="h-full w-full  overflow-scroll scrollbar-hide">
          <div className="h-[8%] sticky top-0 bg-white z-40">
            <NotificationCenter />
          </div>
          <div className="h-[92%] bg-[#f4f4f4] overflow-scroll scrollbar-hide max-[400px]:h-auto">
            {children}
          </div>
        </div>
      </div>
    </AuthGuardian>
  );
}

export default Layout;
