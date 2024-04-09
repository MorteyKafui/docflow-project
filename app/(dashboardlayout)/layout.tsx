import DashboardNav from "@/components/DashboardNav";
import prisma from "@/utils/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";

const getUserData = async ({
  email,
  id,
  lastName,
  firstName,
  profileImage,
}: {
  email: string;
  id: string;
  firstName: string | undefined | null;
  lastName: string | undefined | null;
  profileImage: string | undefined | null;
}) => {
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
    },
  });

  if (!user) {
    const name = `${firstName ?? ""} ${lastName ?? ""}`;

    await prisma.user.create({
      data: {
        id: id,
        email: email,
        name: name,
      },
    });
  }
};

const DashboardLayout = async ({ children }: PropsWithChildren) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/all-projects");
  }

  await getUserData({
    email: user.email as string,
    firstName: user.given_name as string,
    lastName: user.family_name as string,
    id: user.id,
    profileImage: user.picture,
  });

  return (
    <div className="flex flex-col py-16 h-full">
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
