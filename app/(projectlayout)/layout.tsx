import prisma from "@/utils/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";

const getUserData = async ({
  id,
  firstName,
  lastName,
  email,
  profileImage,
}: {
  id: string;
  firstName: string | undefined | null;
  lastName: string | undefined | null;
  email: string;
  profileImage: string | undefined | null;
}) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
    },
  });

  if (!user) {
    const name = `${firstName ?? ""} ${lastName ?? ""}`;

    await prisma.user.create({
      data: {
        id,
        email,
        name,
      },
    });
  }
};

const ProjectLayout = async ({ children }: PropsWithChildren) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/");
  }

  await getUserData({
    id: user.id as string,
    email: user.email as string,
    firstName: user.given_name as string,
    lastName: user.family_name as string,
    profileImage: user.picture,
  });

  return <section>{children}</section>;
};

export default ProjectLayout;
