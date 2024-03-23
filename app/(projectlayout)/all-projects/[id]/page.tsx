import { Button } from "@/components/ui/button";
import { Check, Edit, List, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const project = {
  id: "1",
  title: "Automated Inventory Management System",
  course: "Software Engineering",
  bookTitle: "Software Engineering: A Practitioner's Approach",
  courseCode: "CS-402",
  year: 2023,
  projectMembers: ["John Doe", "Jane Smith", "Alice Johnson"],
  supervisor: "Dr. Michael Brown",
  bookCoverImage:
    "https://images-na.ssl-images-amazon.com/images/I/51PvOq2UtSL._SX387_BO1,204,203,200_.jpg",
  documentation:
    "Automated Inventory Management System is a comprehensive course designed to teach participants how to effectively manage inventory using automation tools and techniques. The course covers fundamental inventory management principles and practices, as well as advanced automation strategies to streamline inventory processes and reduce costs.",
  url: "https://example.com/project",
  sourceCode: "https://github.com/example/project",
};

const ProjectPage = (params: { id: string }) => {
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
            <h2 className="text-2xl font-semibold">{project.title}</h2>
            <div className="text-sm font-medium italic text-zinc-500 mt-5 mb-16">
              <p>{project.course}</p>
              <p>{project.year}</p>
            </div>
            <div className="flex gap-10 items-center">
              <Button className="shadow-2xl " variant="ghost" size="lg" asChild>
                <Link
                  className="border-2 text-rose-500 border-rose-400 flex gap-2 hover:opacity-85 transition-all duration-500 "
                  href={`/edit/${project.id}`}
                >
                  <Edit /> <span>Edit</span>
                </Link>
              </Button>
              <Button
                className="flex gap-2 shadow-2xl hover:bg-white hover:text-rose-500 hover:opacity-85 transition-all duration-500 hover:border-2 hover:border-rose-500"
                size="lg"
              >
                <Trash /> <span>Delete</span>
              </Button>
            </div>
          </div>
        </header>
        <article className="my-20 grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="col-span-2">
            <h2 className="text-3xl my-8 text-rose-500 font-bold">
              Documentation
            </h2>
            <p className="w-4/5">{project.documentation}</p>
            <ul className="my-8">
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
            </ul>
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
                    {project.bookTitle}
                  </span>
                </p>
                <p>
                  <span className="text-rose-500 font-medium">
                    Course Code:
                  </span>{" "}
                  <span className="italic dark:text-gray-300">
                    {project.courseCode}
                  </span>
                </p>
                <p>
                  <span className="text-rose-500 font-medium">Supervisor:</span>{" "}
                  <span className="italic dark:text-gray-300">
                    {project.supervisor}
                  </span>
                </p>
                <p>
                  <span className="text-rose-500 font-medium">
                    Project Url:
                  </span>{" "}
                  <span className="italic dark:text-gray-300">
                    {project.url ?? "No url"}
                  </span>{" "}
                </p>
                <p>
                  <span className="text-rose-500 font-medium">
                    Source Code:
                  </span>{" "}
                  <span className="italic dark:text-gray-300">
                    {project.sourceCode}
                  </span>{" "}
                </p>
                <p className="text-rose-500 font-medium">Project Members: </p>
                <ul>
                  {project.projectMembers.map(el => (
                    <li className="italic dark:text-gray-300" key={el}>
                      {el}
                    </li>
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
