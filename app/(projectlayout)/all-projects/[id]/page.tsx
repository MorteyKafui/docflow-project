import { Button } from "@/components/ui/button";
import prisma from "@/utils/db";
import { Check, Edit, List, Trash } from "lucide-react";
import { revalidatePath } from "next/cache";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

const getSingleProject = async (projectId: string) => {
  const data = await prisma.project.findUnique({
    where: {
      id: projectId,
    },
    select: {
      id: true,
      title: true,
      bookCover: true,
      bookTitle: true,
      course: true,
      courseCode: true,
      documentation: true,
      members: true,
      projectUrl: true,
      sourceCode: true,
      supervisor: true,
      year: true,
    },
  });

  return data;
};

const ProjectPage = async ({ params }: { params: { id: string } }) => {
  const project = await getSingleProject(params.id);

  const deleteProject = async (formData: FormData) => {
    "use server";

    const projectId = formData.get("projectId") as string;

    await prisma.project.delete({
      where: {
        id: projectId,
      },
    });

    redirect("/all-projects");

    return revalidatePath("/all-projects");
  };

  return (
    <section className="my-20">
      <div className="max-w-7xl container mx-auto px-10 py-8">
        <header className="flex gap-8">
          <Image
            src="/book-cover-default.jpg"
            alt="book cover"
            width={150}
            height={150}
            className="rounded shadow-xl"
          />
          <div>
            <h2 className="text-2xl font-semibold">{project?.title}</h2>
            <div className="text-sm font-medium italic text-zinc-500 mt-5 mb-16">
              <p>{project?.course}</p>
              <p>{project?.year}</p>
            </div>
            <div className="flex gap-10 items-center">
              <Button className="shadow-2xl " variant="ghost" size="lg" asChild>
                <Link
                  className="border-2 text-rose-500 border-rose-400 flex gap-2 hover:opacity-85 transition-all duration-500 "
                  href={`/all-projects/edit/${project?.id}`}
                >
                  <Edit /> <span>Edit</span>
                </Link>
              </Button>
              <form action={deleteProject}>
                <input type="hidden" name="projectId" value={project?.id} />
                <Button
                  type="submit"
                  className="flex gap-2 shadow-2xl hover:bg-white hover:text-rose-500 hover:opacity-85 transition-all duration-500 hover:border-2 hover:border-rose-500"
                  size="lg"
                >
                  <Trash /> <span>Delete</span>
                </Button>
              </form>
            </div>
          </div>
        </header>
        <article className="my-20 grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="col-span-2">
            <h2 className="text-3xl my-8 text-rose-500 font-bold">
              Documentation
            </h2>
            <p className="w-4/5">{project?.documentation}</p>
            {/* <ul className="my-8">
              <h3 className="mb-4 font-semibold">Course Objectives</h3>
              <li className="flex gap-2 items-center">
                <Check />
                <span>
                  Understand the importance of inventory management in business
                  operations.
                </span>
              </li>
              <li className="flex gap-2 items-center">
                <Check />
                <span>
                  Learn the key principles and best practices of inventory
                  management.
                </span>
              </li>
              <li className="flex gap-2 items-center">
                <Check />
                <span>
                  Explore different types of inventory management systems and
                  their features.
                </span>
              </li>
              <li className="flex gap-2 items-center">
                <Check />
                <span>
                  Discover automation tools and technologies for inventory
                  management.
                </span>
              </li>
              <li className="flex gap-2 items-center">
                <Check />
                <span>
                  Implement automation strategies to improve inventory accuracy
                  and efficiency.
                </span>
              </li>
              <li className="flex gap-2 items-center">
                <Check />
                <span>
                  Analyze inventory data to make informed business decisions.
                </span>
              </li>
              <li className="flex gap-2 items-center">
                <Check />
                <span>
                  Develop skills to optimize inventory levels and reduce
                  carrying costs.
                </span>
              </li>
            </ul> */}
          </div>
          <div>
            <h2 className="text-3xl my-8 text-rose-500 font-bold">
              More Details:
            </h2>
            <div>
              <div className="flex flex-col gap-4">
                <p>
                  <span className="text-rose-500 font-medium">Book Title:</span>
                  <span className="italic dark:text-gray-300">
                    {project?.bookTitle}
                  </span>
                </p>
                <p>
                  <span className="text-rose-500 font-medium">
                    Course Code:
                  </span>
                  <span className="italic dark:text-gray-300">
                    {project?.courseCode}
                  </span>
                </p>
                <p>
                  <span className="text-rose-500 font-medium">Supervisor:</span>
                  <span className="italic dark:text-gray-300">
                    {project?.supervisor}
                  </span>
                </p>
                <p>
                  <span className="text-rose-500 font-medium">
                    Project Url:
                  </span>{" "}
                  <Link href={`${project?.projectUrl}`} target="_blank">
                    <span className="italic dark:text-gray-300">
                      {project?.projectUrl ?? "No url"}
                    </span>
                  </Link>
                </p>
                <p>
                  <span className="text-rose-500 font-medium">
                    Source Code:
                  </span>{" "}
                  <Link target="_blank" href={`${project?.sourceCode}`}>
                    <span className="italic dark:text-gray-300">
                      {project?.sourceCode}
                    </span>
                  </Link>
                </p>
                <p className="text-rose-500 font-medium">Project Members: </p>
                <ul>
                  {/* {project?.projectMembers.map(el => (
                    <li className="italic dark:text-gray-300" key={el}>
                      {el}
                    </li>
                  ))} */}
                  {project?.members.split(",").map(el => (
                    <li key={el}>{el}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
};

export default ProjectPage;
