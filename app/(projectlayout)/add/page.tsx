import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const AddProject = () => {
  return (
    <section className="mb-20">
      <div className="max-w-6xl container mx-auto px-10 py-8">
        <h2 className="my-10 text-center text-4xl text-rose-700 font-bold">
          Create a Project
        </h2>
        <form className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="flex flex-col gap-4">
            <Label className="text-xl" htmlFor="title">
              Project Title
            </Label>
            <Input id="title" type="text" placeholder="Project Title" />
          </div>
          <div className="flex flex-col gap-4">
            <Label className="text-xl" htmlFor="course">
              Course
            </Label>
            <Input id="course" type="text" placeholder="Course" />
          </div>
          <div className="flex flex-col gap-4">
            <Label className="text-xl" htmlFor="bookTitle">
              Book Title
            </Label>
            <Input id="bookTitle" type="text" placeholder="Book Title" />
          </div>
          <div className="flex flex-col gap-4">
            <Label className="text-xl" htmlFor="year">
              Year
            </Label>
            <Input id="year" type="date" placeholder="Year" />
          </div>
          <div className="flex flex-col gap-4">
            <Label className="text-xl" htmlFor="members">
              Names of Project Members
            </Label>
            <Input id="members" type="text" placeholder="Project Members" />
          </div>
          <div className="flex flex-col gap-4">
            <Label className="text-xl" htmlFor="supervisor">
              Name of Supervisor
            </Label>
            <Input
              id="supervisor"
              type="text"
              placeholder="Name of Supervisor"
            />
          </div>
          <div className="flex flex-col gap-4">
            <Label className="text-xl" htmlFor="bookCover">
              Book Cover
            </Label>
            <Input id="bookCover" type="file" placeholder="Book Cover" />
          </div>
          <div className="flex flex-col gap-4">
            <Label className="text-xl" htmlFor="file">
              Documentation
            </Label>
            <Input id="file" type="file" placeholder="Add File" />
          </div>
          <div className="flex flex-col gap-4">
            <Label className="text-xl" htmlFor="url">
              Project URL(Optional)
            </Label>
            <Input id="url" type="url" placeholder="Project URL" />
          </div>
          <div className="flex flex-col gap-4">
            <Label className="text-xl" htmlFor="code">
              Source Code
            </Label>
            <Input id="code" type="url" placeholder="Source Code" />
          </div>
          <Button
            className="w-full col-start-1 col-end-3 font-bold text-xl hover:opacity-90 transition-all duration-500"
            size="lg"
          >
            Submit
          </Button>
        </form>
      </div>
    </section>
  );
};

export default AddProject;
