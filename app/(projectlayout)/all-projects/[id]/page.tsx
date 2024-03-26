import prisma from "@/utils/db";
import Image from "next/image";
import Link from "next/link";

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

  return (
    <section className="my-20">
      <div className="max-w-7xl container mx-auto px-10 py-8">
        <header className="flex gap-8">
          {project?.bookCover ? (
            <Image
              className="rounded object-cover h-full shadow-xl"
              src={`https://qdoxynjkmbgpgncnmadr.supabase.co/storage/v1/object/public/images/${project.bookCover}`}
              width={200}
              height={200}
              alt="book cover"
            />
          ) : (
            <Image
              className="rounded object-cover h-full shadow-xl"
              src="/book-cover-default.jpg"
              width={200}
              height={200}
              alt="book cover"
            />
          )}
          <div>
            <h2 className="text-2xl font-semibold">{project?.title}</h2>
            <div className="text-sm font-medium italic text-zinc-500 mt-5 mb-16">
              <p>{project?.course}</p>
              <p>{project?.year}</p>
            </div>
          </div>
        </header>
        <article className="my-20 grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="col-span-2">
            <h2 className="text-3xl my-8 text-rose-500 font-bold">
              Documentation
            </h2>
            <p className="w-4/5">{project?.documentation}</p>
          </div>
          <div>
            <h2 className="text-3xl my-8 text-rose-500 font-bold">
              More Details:
            </h2>
            <div>
              <div className="flex flex-col gap-4">
                <p>
                  <span className="text-rose-500 font-medium">Book Title:</span>{" "}
                  <span className="italic dark:text-gray-300">
                    {project?.bookTitle}
                  </span>
                </p>
                <p>
                  <span className="text-rose-500 font-medium">
                    Course Code:
                  </span>{" "}
                  <span className="italic dark:text-gray-300">
                    {project?.courseCode}
                  </span>
                </p>
                <p>
                  <span className="text-rose-500 font-medium">Supervisor:</span>{" "}
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
