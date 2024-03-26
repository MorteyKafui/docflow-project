import Image from "next/image";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Link from "next/link";
import prisma from "@/utils/db";

// const projects = [
//   {
//     id: "1",
//     title: "Automated Inventory Management System",
//     course: "Software Engineering",
//     bookTitle: "Software Engineering: A Practitioner's Approach",
//     courseCode: "CS-402",
//     year: 2023,
//     projectMembers: ["John Doe", "Jane Smith", "Alice Johnson"],
//     supervisor: "Dr. Michael Brown",
//     bookCoverImage:
//       "https://images-na.ssl-images-amazon.com/images/I/51PvOq2UtSL._SX387_BO1,204,203,200_.jpg",
//     documentation: "https://example.com/documentation.pdf",
//     url: "https://example.com/project",
//     sourceCode: "https://github.com/example/project",
//   },
//   {
//     id: "2",
//     title: "E-Commerce Website",
//     course: "Web Development",
//     bookTitle: "HTML and CSS: Design and Build Websites",
//     courseCode: "CS-301",
//     year: 2022,
//     projectMembers: ["David Lee", "Sarah Wilson"],
//     supervisor: "Prof. Emily White",
//     bookCoverImage:
//       "https://images-na.ssl-images-amazon.com/images/I/51lqN3JGkJL._SX379_BO1,204,203,200_.jpg",
//     documentation: "https://example.com/documentation2.pdf",
//     url: "https://example.com/project2",
//     sourceCode: "https://github.com/example/project2",
//   },
//   {
//     id: "3",
//     title: "Social Media Analysis",
//     course: "Data Science",
//     bookTitle: "Python for Data Science For Dummies",
//     courseCode: "DS-201",
//     year: 2024,
//     projectMembers: ["Maria Rodriguez", "Carlos Martinez"],
//     supervisor: "Dr. Sophia Chen",
//     bookCoverImage:
//       "https://images-na.ssl-images-amazon.com/images/I/51gIKa8KMEL._SX387_BO1,204,203,200_.jpg",
//     documentation: "https://example.com/documentation3.pdf",
//     url: "https://example.com/project3",
//     sourceCode: "https://github.com/example/project3",
//   },
//   {
//     id: "4",
//     title: "Online Learning Platform",
//     course: "Education Technology",
//     bookTitle:
//       "Learning React: A Hands-On Guide to Building Web Applications Using React and Redux",
//     courseCode: "ET-101",
//     year: 2023,
//     projectMembers: ["Emily Johnson", "Mark Davis", "Lisa Anderson"],
//     supervisor: "Prof. Adam Smith",
//     bookCoverImage:
//       "https://images-na.ssl-images-amazon.com/images/I/51Yr5rdqZQL._SX379_BO1,204,203,200_.jpg",
//     documentation: "https://example.com/documentation4.pdf",
//     url: "https://example.com/project4",
//     sourceCode: "https://github.com/example/project4",
//   },
//   {
//     id: "5",
//     title: "Healthcare Management System",
//     course: "Health Informatics",
//     bookTitle: "Health Informatics: An Interprofessional Approach",
//     courseCode: "HI-401",
//     year: 2022,
//     projectMembers: ["James Brown", "Michelle Clark"],
//     supervisor: "Dr. Jennifer Adams",
//     bookCoverImage:
//       "https://images-na.ssl-images-amazon.com/images/I/51vPMnTzkBL._SX397_BO1,204,203,200_.jpg",
//     documentation: "https://example.com/documentation5.pdf",
//     url: "https://example.com/project5",
//     sourceCode: "https://github.com/example/project5",
//   },
//   {
//     id: "6",
//     title: "Online Marketplace",
//     course: "E-Commerce",
//     bookTitle: "E-Commerce 2021",
//     courseCode: "EC-301",
//     year: 2024,
//     projectMembers: ["Robert Smith", "Emma Johnson"],
//     supervisor: "Prof. Lisa Brown",
//     bookCoverImage:
//       "https://images-na.ssl-images-amazon.com/images/I/41hJj-btluL._SX326_BO1,204,203,200_.jpg",
//     documentation: "https://example.com/documentation6.pdf",
//     url: "https://example.com/project6",
//     sourceCode: "https://github.com/example/project6",
//   },
//   {
//     id: "7",
//     title: "Finance Management App",
//     course: "Finance",
//     bookTitle: "Corporate Finance For Dummies",
//     courseCode: "FN-201",
//     year: 2023,
//     projectMembers: ["Andrew Wilson", "Sophie Brown"],
//     supervisor: "Dr. David Johnson",
//     bookCoverImage:
//       "https://images-na.ssl-images-amazon.com/images/I/51ZGyE+HScL._SX374_BO1,204,203,200_.jpg",
//     documentation: "https://example.com/documentation7.pdf",
//     url: "https://example.com/project7",
//     sourceCode: "https://github.com/example/project7",
//   },
//   {
//     id: "8",
//     title: "Tourism Website",
//     course: "Tourism Management",
//     bookTitle: "Tourism: Principles, Practices, Philosophies",
//     courseCode: "TM-301",
//     year: 2022,
//     projectMembers: ["Olivia White", "Daniel Johnson"],
//     supervisor: "Prof. Michael Green",
//     bookCoverImage:
//       "https://images-na.ssl-images-amazon.com/images/I/51xuvx+5VVL._SX402_BO1,204,203,200_.jpg",
//     documentation: "https://example.com/documentation8.pdf",
//     url: "https://example.com/project8",
//     sourceCode: "https://github.com/example/project8",
//   },
//   {
//     id: "9",
//     title: "Inventory Tracking System",
//     course: "Supply Chain Management",
//     bookTitle: "Supply Chain Management For Dummies",
//     courseCode: "SCM-401",
//     year: 2023,
//     projectMembers: ["Sophia Johnson", "Ethan Wilson"],
//     supervisor: "Prof. William Adams",
//     bookCoverImage:
//       "https://images-na.ssl-images-amazon.com/images/I/51KUYihoRxL._SX389_BO1,204,203,200_.jpg",
//     documentation: "https://example.com/documentation9.pdf",
//     url: "https://example.com/project9",
//     sourceCode: "https://github.com/example/project9",
//   },
//   {
//     id: "10",
//     title: "Event Management System",
//     course: "Event Management",
//     bookTitle: "Event Management For Dummies",
//     courseCode: "EM-301",
//     year: 2024,
//     projectMembers: ["Michael Brown", "Emily Wilson"],
//     supervisor: "Prof. Sarah Adams",
//     bookCoverImage:
//       "https://images-na.ssl-images-amazon.com/images/I/51Vlh3p6NsL._SX378_BO1,204,203,200_.jpg",
//     documentation: "https://example.com/documentation10.pdf",
//     url: "https://example.com/project10",
//     sourceCode: "https://github.com/example/project10",
//   },
// ];

const getProjects = async () => {
  const data = await prisma.project.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

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
            projects.map(({ id, title, year, course, bookCover }) => (
              <Card className="mb-8" key={id}>
                <Link href={`/all-projects/${id}`}>
                  <div className="flex items-center">
                    {bookCover ? (
                      <Image
                        className="rounded object-cover h-full shadow-xl"
                        src={`https://qdoxynjkmbgpgncnmadr.supabase.co/storage/v1/object/public/images/${bookCover}`}
                        width={130}
                        height={130}
                        alt="book cover"
                      />
                    ) : (
                      <Image
                        className="rounded object-cover h-full shadow-xl"
                        src="/book-cover-default.jpg"
                        width={130}
                        height={130}
                        alt="book cover"
                      />
                    )}
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
              {projects.slice(0, 3).map(({ id, title, course, bookCover }) => (
                <div className="flex gap-5 mb-8" key={id}>
                  {bookCover ? (
                    <Image
                      className="rounded object-cover h-full shadow-xl"
                      src={`https://qdoxynjkmbgpgncnmadr.supabase.co/storage/v1/object/public/images/${bookCover}`}
                      width={50}
                      height={50}
                      alt="book cover"
                    />
                  ) : (
                    <Image
                      className="rounded object-cover h-full shadow-xl"
                      src="/book-cover-default.jpg"
                      width={50}
                      height={50}
                      alt="book cover"
                    />
                  )}
                  <div>
                    <h3 className="font-bold">{title}</h3>
                    <p className="text-sm italic text-zinc-400 font-medium mt-2">
                      {course}
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
