"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import SearchForm from "./SearchForm";
import SearchResults from "./SearchResults";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface ProjectsProp {
  projects: {
    id: string;
    title: string;
    course: string;
    bookTitle: string;
    courseCode: string;
    members: string;
    supervisor: string;
    bookCover: string;
    documentation: string;
    projectUrl: string | null;
    sourceCode: string;
    year: string;
    userId: string | null;
    createdAt: Date;
    updatedAt: Date;
  }[];
}

const categories = [
  "all",
  "ai",
  "web development",
  "big data",
  "computer network",
  "management system",
  "software development",
];

const searchByYears = ["2020", "2021", "2022", "2023", "2024"];

const AllProjects = ({ projects }: ProjectsProp) => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search");

  // if (searchQuery) {
  //   projects = projects.filter(project =>
  //     project.title.toLowerCase().includes(searchQuery.toLowerCase())
  //   );
  // }

  // const searchResults =
  //   searchQuery &&
  //   projects.filter(project =>
  //     project.course.toLowerCase().includes(searchQuery.toLowerCase())
  //   );
  // let searchResults = projects;

  // if (searchQuery) {
  //   searchResults = projects.filter(project =>
  //     Object.values(project).some(
  //       value =>
  //         typeof value === "string" &&
  //         value.toLowerCase().includes(searchQuery.toLowerCase())
  //     )
  //   );
  // }

  const searchResults =
    searchQuery &&
    projects.filter(project =>
      Object.values(project).some(
        value =>
          typeof value === "string" &&
          value.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );

  if (searchResults) {
    return <SearchResults results={searchResults} />;
  }

  // return (
  //   <div className="text-white max-w-full mx-auto">
  //     <div className="flex">
  //       <aside className="border-r-2 border-secondBg py-10 px-8">
  //         <nav>
  //           <div>
  //             <h3 className="font-bold text-xl">Search by Categories:</h3>
  //             <form className="flex flex-col gap-4 mt-8">
  //               <Input
  //                 type="hidden"
  //                 name="Web Development"
  //                 id="Web Development"
  //                 value="Web Development"
  //               />
  //               <Button type="submit">Web dev</Button>
  //               {/* {categories.map(cat => (
  //                 <>
  //                   <Input
  //                     type="hidden"
  //                     name={cat.toLowerCase()}
  //                     id={cat}
  //                     key={cat}
  //                   />
  //                   <Button type="submit">{cat.toUpperCase()}</Button>
  //                 </>
  //               ))} */}
  //             </form>
  //           </div>
  //           <div className="mt-8">
  //             <h3 className="font-bold text-xl">Search by Years:</h3>
  //             <form className="mt-8 flex flex-col gap-4">
  //               {searchByYears.map(yr => (
  //                 <>
  //                   <Input type="hidden" name={yr} id={yr} key={yr} />
  //                   <Button>{yr}</Button>
  //                 </>
  //               ))}
  //             </form>
  //           </div>
  //         </nav>
  //       </aside>
  //       <div className="flex-1">
  //         {/* <div className="border-b-2 border-secondBg px-4">
  //           {!searchQuery ? (
  //             <div className="flex items-center justify-between p-4">
  //               <h2 className="text-5xl text-secondBg font-semibold">
  //                 Projects
  //               </h2>

  //               <div>
  //                 <SearchForm />
  //               </div>
  //             </div>
  //           ) : (
  //             <h2 className="text-5xl font-semibold">
  //               Search results for &mdash;{searchQuery}
  //             </h2>
  //           )}
  //         </div> */}
  //         <div className="border-b-2 border-secondBg px-4">
  //           <div className="flex items-center justify-between p-4">
  //             <h2 className="text-5xl text-secondBg font-semibold">Projects</h2>

  //             <div>
  //               <SearchForm />
  //             </div>
  //           </div>

  //           <h2 className="text-5xl font-semibold">
  //             {/* Search results for &mdash;{searchQuery} */}
  //           </h2>
  //         </div>
  //         <>
  //           <div className="p-4 grid grid-cols-3 gap-4">
  //             {projects.length < 1 ? (
  //               <>
  //                 <p className="text-3xl font-medium text-center mt-20">
  //                   No projects found
  //                 </p>
  //               </>
  //             ) : (
  //               projects.map(({ id, title, year, course }) => (
  //                 <Card
  //                   className="mb-8 bg-firstBg text-secondBg border-secondBg"
  //                   key={id}
  //                 >
  //                   <Link href={`/all-projects/${id}`}>
  //                     <div className="flex flex-col justify-between">
  //                       <CardHeader className="text-xl flex flex-col gap-4">
  //                         <div className="flex flex-col gap-2">
  //                           <CardTitle className="font-bold mb-2">
  //                             {title}
  //                           </CardTitle>
  //                           <p className="text-sm italic text-white font-medium">
  //                             <span>Course: </span> {course}
  //                           </p>
  //                           <p className="text-sm italic text-white font-medium">
  //                             <span>Year: </span> {year}
  //                           </p>
  //                         </div>
  //                       </CardHeader>
  //                       <CardContent>
  //                         <Button
  //                           className="bg-secondBg text-firstBg hover:bg-white hover:text-firstBg transition-all duration-500 w-1/2"
  //                           asChild
  //                         >
  //                           <Link
  //                             className="font-semibold"
  //                             href={`/all-projects/${id}`}
  //                           >
  //                             View Details
  //                           </Link>
  //                         </Button>
  //                       </CardContent>
  //                     </div>
  //                   </Link>
  //                 </Card>
  //               ))
  //             )}
  //           </div>
  //         </>
  //       </div>
  //     </div>
  //   </div>
  // );

  return (
    <div className="max-w-screen-xl container mx-auto px-10 py-8">
      <div className="flex justify-between items-center mt-8 mb-20">
        {!searchQuery ? (
          <h2 className="text-5xl text-secondBg font-semibold">Projects</h2>
        ) : (
          <h2 className="text-5xl font-semibold">
            Search results for &mdash;{searchQuery}
          </h2>
        )}
      </div>
      <div className="flex justify-between items-center mb-16">
        <SearchForm />
      </div>
      <div>
        <div className="grid grid-cols-1  lg:grid-cols-3 gap-8">
          {projects.length < 1 ? (
            <>
              <p className="text-3xl font-medium">No projects found</p>
            </>
          ) : (
            projects.map(({ id, title, year, course }) => (
              <Card
                className="mb-8 bg-firstBg text-secondBg border-secondBg"
                key={id}
              >
                <Link href={`/all-projects/${id}`}>
                  <div className="flex justify-between items-center">
                    <CardHeader className="text-xl flex flex-col gap-4">
                      <div className="flex flex-col gap-2">
                        <CardTitle className="font-bold mb-2">
                          {title}
                        </CardTitle>
                        <p className="text-sm italic text-white font-medium">
                          {course}
                        </p>
                        <p className="text-sm italic text-white font-medium">
                          {year}
                        </p>
                      </div>
                    </CardHeader>
                    <CardContent className="ml-auto">
                      <Button
                        className="bg-secondBg text-firstBg hover:bg-white hover:text-firstBg transition-all duration-500"
                        asChild
                      >
                        <Link
                          className="font-semibold"
                          href={`/all-projects/${id}`}
                        >
                          View Details
                        </Link>
                      </Button>
                    </CardContent>
                  </div>
                </Link>
              </Card>
            ))
          )}
        </div>

        {/* <div className="col-start-4 hidden lg:block">
          <Card className="flex flex-col shadow-2xl bg-firstBg border-secondBg text-secondBg">
            <CardHeader>
              <CardTitle className="font-bold text-center text-xl">
                Recent Projects
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col p-4">
              {projects.slice(0, 3).map(({ id, title, course, year }) => (
                <Link
                  className="hover:text-white transition-all duration-500"
                  href={`/all-projects/${id}`}
                  key={id}
                >
                  <div className="flex gap-5 mb-8">
                    <div>
                      <h3 className="font-bold">{title}</h3>
                      <p className="text-sm italic font-medium mt-2">
                        {course} &mdash; <span>{year}</span>
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </CardContent>
          </Card>
        </div> */}
      </div>
    </div>
  );
};

export default AllProjects;
