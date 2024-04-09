import prisma from "@/utils/db";
import { unstable_noStore as noStore } from "next/cache";
import Image from "next/image";
import Link from "next/link";

const getSingleProject = async (projectId: string) => {
  noStore();

  const data = await prisma.project.findUnique({
    where: {
      id: projectId,
    },
    select: {
      id: true,
      title: true,
      bookCover: true,
      pdfPath: true,
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
    <section className="py-20">
      <div className="max-w-7xl container mx-auto px-10 py-8">
        <header className="flex flex-col lg:flex-row gap-8">
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
            <h2 className="text-2xl font-semibold text-secondBg">
              {project?.title}
            </h2>
            <div className="text-sm font-medium italic text-white mt-5 mb-16">
              <p>{project?.course}</p>
              <p>{project?.year}</p>
            </div>
          </div>
        </header>
        <article className="lg:my-20 grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="col-span-2 text-white order-1 lg:order-none">
            <h2 className="text-2xl my-8 font-bold">Documentation</h2>
            <p className="w-4/5">{project?.documentation}</p>
            {project?.pdfPath ? (
              <div className="my-8">
                <a
                  className="bg-secondBg text-firstBg px-4 py-2 rounded text-lg font-bold hover:opacity-90 transition-all duration-500"
                  href={`${project?.pdfPath}`}
                  download={project?.pdfPath}
                >
                  Download PDF
                </a>
              </div>
            ) : (
              <p className="text-rose-500 font-semibold">
                No PDF documentation uploaded for this project
              </p>
            )}
          </div>
          <div className="text-white">
            <h2 className="text-2xl my-8 font-bold">More Details:</h2>
            <div>
              <div className="flex flex-col gap-4">
                <p>
                  <span className="text-secondBg font-medium">Book Title:</span>{" "}
                  <span className="italic dark:text-gray-300">
                    {project?.bookTitle}
                  </span>
                </p>
                <p>
                  <span className="text-secondBg font-medium">
                    Course Code:
                  </span>{" "}
                  <span className="italic dark:text-gray-300">
                    {project?.courseCode}
                  </span>
                </p>
                <p>
                  <span className="text-secondBg font-medium">Supervisor:</span>{" "}
                  <span className="italic dark:text-gray-300">
                    {project?.supervisor}
                  </span>
                </p>
                <p>
                  <span className="text-secondBg font-medium">
                    Project Url:
                  </span>{" "}
                  <Link href={`${project?.projectUrl}`} target="_blank">
                    <span className="italic dark:text-gray-300 hover:text-secondBg duration-500 transition-all">
                      {project?.projectUrl ?? "No url"}
                    </span>
                  </Link>
                </p>
                <p>
                  <span className="text-secondBg font-medium">
                    Source Code:
                  </span>{" "}
                  <Link target="_blank" href={`${project?.sourceCode}`}>
                    <span className="italic dark:text-gray-300 hover:text-secondBg duration-500 transition-all">
                      {project?.sourceCode}
                    </span>
                  </Link>
                </p>
                <p className="text-secondBg font-medium">Project Members: </p>
                <ul>
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
