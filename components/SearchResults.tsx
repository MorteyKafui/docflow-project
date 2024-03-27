import Link from "next/link";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useSearchParams } from "next/navigation";

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

const SearchResults = ({ results }: ProjectsProp) => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search");

  return (
    <div className="max-w-screen-xl container mx-auto px-10 py-8 flex flex-col gap-4">
      <div>
        <h2 className="text-5xl font-semibold my-10">
          Search results for: {searchQuery?.toLowerCase()}
        </h2>
      </div>
      <div className="max-w-5xl mx-auto px-10 py-8">
        {results.length < 1 ? (
          <div className="flex flex-col gap-10">
            <p className="text-3xl font-medium">No projects found</p>
            <Button>
              <Link href="/all-projects">Go Back</Link>
            </Button>
          </div>
        ) : (
          results.map(({ id, title, year, course }) => (
            <Card className="mb-8" key={id}>
              <Link href={`/all-projects/${id}`}>
                <div className="flex justify-between items-center">
                  <CardHeader className="text-xl flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                      <CardTitle className="font-bold mb-2">{title}</CardTitle>
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
    </div>
  );
};

export default SearchResults;
