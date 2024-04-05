"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface ProjectsProp {
  results: {
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

const SearchResults = ({ results: projects }: ProjectsProp) => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search");

  if (searchQuery) {
    projects = projects.filter(
      project =>
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.year.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  // const searchResults =
  //   searchQuery &&
  //   projects.filter(project =>
  //     project.title.toLowerCase().includes(searchQuery.toLowerCase())
  //   );

  return (
    <div className="max-w-screen-xl container mx-auto px-10 py-8 flex flex-col gap-4 h-screen">
      <div className="flex justify-between items-center">
        <h2 className="text-xl lg:text-4xl font-semibold my-10 text-secondBg">
          Search results for: {searchQuery?.toLowerCase()}
        </h2>
        <Button
          className="bg-secondBg text-firstBg font-bold hover:text-white"
          size="lg"
        >
          <Link href="/all-projects">Go Back</Link>
        </Button>
      </div>
      <div className="max-w-5xl mx-auto px-10 py-8 grid grid-cols-2 gap-8">
        {projects.length < 1 ? (
          <div className="flex flex-col items-center justify-center h-full gap-10">
            <p className="text-xl lg:text-3xl font-medium text-red-600">
              No projects found
            </p>
            <Button className="bg-secondBg text-firstBg text-lg font-bold hover:text-white">
              <Link href="/all-projects">Go Back</Link>
            </Button>
          </div>
        ) : (
          projects?.map(({ id, title, year, course }) => (
            <Card className="mb-8 bg-firstBg text-secondBg" key={id}>
              <Link href={`/all-projects/${id}`}>
                <div className="flex justify-between items-center">
                  <CardHeader className="text-xl flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                      <CardTitle className="font-bold mb-2">{title}</CardTitle>
                      <p className="text-sm italic text-muted font-medium">
                        {course}
                      </p>
                      <p className="text-sm italic text-muted font-medium">
                        {year}
                      </p>
                    </div>
                  </CardHeader>
                  <CardContent className="ml-auto">
                    <Button
                      className="bg-secondBg text-firstBg hover:bg-white hover:text-firstBg transition-all duration-500"
                      asChild
                    >
                      <Link href={`/all-projects/${id}`}>View Details</Link>
                    </Button>
                  </CardContent>
                </div>
              </Link>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default SearchResults;
