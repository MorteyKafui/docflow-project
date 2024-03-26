import prisma from "@/utils/db";
import { revalidatePath, unstable_noStore } from "next/cache";
import Link from "next/link";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { unstable_noStore as noStore } from "next/cache";

const getProjects = async () => {
  noStore();

  const data = await prisma.project.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  revalidatePath("/all-projects");

  return data;
};

const AllProjects = async () => {
  const projects = await getProjects();

  return (
    <div className="max-w-screen-xl container mx-auto px-10 py-8">
      <div className="flex justify-between items-center mt-8 mb-20">
        <h2 className="text-5xl font-semibold">Projects</h2>
        <form className="flex w-full max-w-sm items-center space-x-2">
          <Input type="text" placeholder="search projects" />
          <Button type="submit">Search</Button>
        </form>
      </div>
      <div className="grid grid-cols-4">
        <div className="col-span-2">
          {projects.length < 1 ? (
            <>
              <p>No projects found</p>
            </>
          ) : (
            projects.map(({ id, title, year, course }) => (
              <Card className="mb-8" key={id}>
                <Link href={`/all-projects/${id}`}>
                  <div className="flex justify-between items-center">
                    <CardHeader className="text-xl flex flex-col gap-4">
                      <div className="flex flex-col gap-2">
                        <CardTitle className="font-bold mb-2">
                          {title}
                        </CardTitle>
                        <p className="text-sm italic text-zinc-400 font-medium">
                          {course}
                        </p>
                        <p className="text-sm italic text-zinc-400 font-medium">
                          {year}
                        </p>
                      </div>
                    </CardHeader>
                    <CardContent className="ml-auto">
                      <Button asChild>
                        <Link href={`/all-projects/${id}`}>View Details</Link>
                      </Button>
                    </CardContent>
                  </div>
                </Link>
              </Card>
            ))
          )}
        </div>
        <div className="col-start-4">
          <Card className="flex flex-col shadow-lg">
            <CardHeader>
              <CardTitle className="font-bold text-center text-xl text-rose-700">
                Recent Projects
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col p-4">
              {projects.slice(0, 3).map(({ id, title, course, year }) => (
                <div className="flex gap-5 mb-8" key={id}>
                  <div>
                    <h3 className="font-bold">{title}</h3>
                    <p className="text-sm italic text-zinc-400 font-medium mt-2">
                      {course} &mdash; <span>{year}</span>
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AllProjects;
