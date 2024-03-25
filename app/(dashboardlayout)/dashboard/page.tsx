import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import prisma from "@/utils/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Edit, File, Trash } from "lucide-react";
import { revalidatePath } from "next/cache";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

const getData = async (userId: string) => {
  const data = await prisma.project.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return data;
};

const DashboardPage = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const data = await getData(user?.id as string);

  const deleteProject = async (formData: FormData) => {
    "use server";

    const projectId = formData.get("projectId") as string;

    await prisma.project.delete({
      where: {
        id: projectId,
      },
    });

    revalidatePath("/dashboard");

    redirect("/dashboard");
  };

  return (
    <section className="grid items-start gap-y-10">
      <div className="flex items-center justify-between px-2">
        <div className="grid gap-2">
          <h2 className="text-3xl font-bold ">
            Welcome To Your Dashboard, {user?.given_name} {user?.family_name}
          </h2>
          <p className="text-lg text-muted-foreground">
            Here you can see your recent projects
          </p>
        </div>
        <Button asChild>
          <Link className="font-medium text-lg" href="/add">
            Create a new Project
          </Link>
        </Button>
      </div>
      {data.length < 1 ? (
        <div className="flex min-h-[500px] flex-col items-center justify-center rounded-md border border-dashed border-gray-500 p-8 text-center animate-in fade-in-50">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <File className="w-10 h-10 text-primary" />
          </div>
          <h3 className="mt-6 text-xl font-semibold">
            You don&apos; have any project yet
          </h3>
          <p className="mb-8 mt-2 text-center text-sm leading-6 text-muted-foreground max-w-sm mx-auto">
            You currently don&apos;t have any project(s). Please create some so
            that you can see them here!
          </p>
          <Button asChild>
            <Link className="font-medium text-lg" href="/add">
              Create a new Project
            </Link>
          </Button>
        </div>
      ) : (
        <div>
          {data.map(({ title, course, id, year }) => (
            <Card className="mb-8" key={id}>
              <div className="flex items-center">
                <Link href={`/all-projects/${id}`}>
                  <Image
                    className="rounded shadow-xl"
                    src="/book-cover-default.jpg"
                    width={130}
                    height={130}
                    alt="book cover"
                  />
                </Link>
                <CardHeader className="text-xl flex flex-col gap-4">
                  <Link href={`/all-projects/${id}`}>
                    <div className="flex flex-col gap-2">
                      <CardTitle className="font-bold mb-2">{title}</CardTitle>
                      <p className="text-sm italic text-zinc-400 font-medium">
                        {course}
                      </p>
                      <p className="text-sm italic text-zinc-400 font-medium">
                        {year}
                      </p>
                    </div>
                  </Link>
                </CardHeader>

                <CardContent className="ml-auto">
                  <div className="flex gap-x-4">
                    <Link href={`/all-projects/edit/${id}`}>
                      <Button size="icon" variant="outline">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </Link>
                    <form action={deleteProject}>
                      <input type="hidden" name="projectId" value={id} />
                      <Button type="submit" size="icon">
                        <Trash className="w-4 h-4" />
                      </Button>
                    </form>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
};

export default DashboardPage;