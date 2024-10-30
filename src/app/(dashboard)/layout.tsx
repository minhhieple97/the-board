import { NavBar } from "@/components/custom/navbar";
import { SideBar } from "@/components/custom/sidebar";
import { CreateWorkspaceModal } from "@/features/workspaces/components/CreateWorkspaceModal";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <CreateWorkspaceModal />
      <div className="flex h-full w-full">
        <div className="fixed left-0 top-0 hidden h-full w-[264px] overflow-y-auto lg:block lg:w-[264px]">
          <SideBar />
        </div>
        <div className="w-full lg:pl-[264px]">
          <div className="mx-auto h-full max-w-screen-2xl">
            <NavBar />
            <main className="flex h-full flex-col px-6 py-8">{children}</main>
          </div>
        </div>
      </div>
    </div>
  );
}
