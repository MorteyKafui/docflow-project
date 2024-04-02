import DashboardNav from "@/components/DashboardNav";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";

const DashboardLayout = async ({ children }: PropsWithChildren) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/");
  }
  return (
    <div className="flex flex-col py-16">
      <div className="max-w-screen-xl mx-auto container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex">
          <DashboardNav />
        </aside>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
