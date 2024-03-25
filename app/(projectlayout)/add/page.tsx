import SubmitButton from "@/components/SubmitButton";
import TagInputField from "@/components/TagInputField";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import prisma from "@/utils/db";
import supabase from "@/utils/supabse";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export const uploadFile = async (file: File): Promise<string> => {
  // const imagePath = `https://qdoxynjkmbgpgncnmadr.supabase.co/storage/v1/object/public/DocFlowImages/${file}`;

  // Upload file to Supabase Storage
  // const { data, error } = await supabase.storage
  //   .from("DocFlowImages") // Replace 'your_bucket_name' with your actual bucket name
  //   .upload(`images/${file.name}`, file);
  const { data, error } = await supabase.storage
    .from("DocFlowImages") // Replace 'your_bucket_name' with your actual bucket name
    .upload(
      `https://qdoxynjkmbgpgncnmadr.supabase.co/storage/v1/object/public/DocFlowImages/${file.name}`,
      file
    );

  // if (error) {
  //   throw new Error(error.message);
  // }

  // Return the URL of the uploaded file
  return data?.path || "";
};

const AddProject = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    throw new Error("Not authorized!");
  }

  const postData = async (formData: FormData) => {
    "use server";

    const bookCoverFile = formData.get("bookCover") as File;
    const bookCover = await uploadFile(bookCoverFile);
    console.log(`cover: ${bookCover}`);
    console.log(`file: ${bookCoverFile}`);

    const title = formData.get("title") as string;
    const course = formData.get("course") as string;
    const bookTitle = formData.get("bookTitle") as string;
    const courseCode = formData.get("courseCode") as string;
    const members = formData.get("members") as string;
    const supervisor = formData.get("supervisor") as string;
    const documentation = formData.get("documentation") as string;
    const projectUrl = formData.get("url") as string;
    const sourceCode = formData.get("sourceCode") as string;
    const year = formData.get("year") as string;

    await prisma.project.create({
      data: {
        userId: user?.id as string,
        title,
        course,
        bookTitle,
        courseCode,
        members,
        supervisor,
        bookCover,
        documentation,
        projectUrl,
        sourceCode,
        year,
      },
    });

    return redirect("/all-projects");
  };

  return (
    <section className="mb-20">
      <div className="max-w-6xl container mx-auto px-10 py-8">
        <h2 className="my-10 text-center text-4xl text-rose-700 font-bold">
          Create a Project
        </h2>
        <form
          action={postData}
          className="grid grid-cols-1 lg:grid-cols-2 gap-10"
        >
          <div className="flex flex-col gap-4">
            <Label className="text-xl" htmlFor="title">
              Project Title
            </Label>
            <Input
              name="title"
              id="title"
              type="text"
              placeholder="Project Title"
            />
          </div>
          <div className="flex flex-col gap-4">
            <Label className="text-xl" htmlFor="course">
              Course
            </Label>
            <Input name="course" id="course" type="text" placeholder="Course" />
          </div>
          <div className="flex flex-col gap-4">
            <Label className="text-xl" htmlFor="bookTitle">
              Book Title
            </Label>
            <Input
              name="bookTitle"
              id="bookTitle"
              type="text"
              placeholder="Book Title"
            />
          </div>
          <div className="flex flex-col gap-4">
            <Label className="text-xl" htmlFor="courseCode">
              Course Code
            </Label>
            <Input
              name="courseCode"
              id="courseCode"
              type="text"
              placeholder="Course Code"
            />
          </div>
          <div className="flex flex-col gap-4">
            <Label className="text-xl" htmlFor="members">
              Names of Project Members
            </Label>
            <Textarea
              name="members"
              id="members"
              placeholder="Project members names separated by comma(,)"
            />
          </div>
          {/* <div className="flex flex-col gap-4">
            <Label className="text-xl" htmlFor="members">
              Names of Project Members
            </Label>
            <TagInputField />
          </div> */}
          <div className="flex flex-col gap-4">
            <Label className="text-xl" htmlFor="supervisor">
              Name of Supervisor
            </Label>
            <Input
              id="supervisor"
              name="supervisor"
              type="text"
              placeholder="Name of Supervisor"
            />
          </div>
          <div className="flex flex-col gap-4">
            <Label className="text-xl" htmlFor="bookCover">
              Book Cover
            </Label>
            <Input
              id="bookCover"
              name="bookCover"
              type="file"
              placeholder="Book Cover"
            />
          </div>
          <div className="flex flex-col gap-4">
            <Label className="text-xl" htmlFor="file">
              Documentation
            </Label>
            <Textarea
              name="documentation"
              id="documentation"
              placeholder="Type your documentation"
            />
          </div>
          <div className="flex flex-col gap-4">
            <Label className="text-xl" htmlFor="url">
              Project URL(Optional)
            </Label>
            <Input id="url" name="url" type="url" placeholder="Project URL" />
          </div>
          <div className="flex flex-col gap-4">
            <Label className="text-xl" htmlFor="sourceCode">
              Source Code URL
            </Label>
            <Input
              id="code"
              name="sourceCode"
              type="url"
              placeholder="Source Code URL"
            />
          </div>
          <div className="flex flex-col gap-4">
            <Label className="text-xl" htmlFor="year">
              Year
            </Label>
            <Input id="year" name="year" type="text" placeholder="Year" />
          </div>
          <SubmitButton />
          {/* <Button
            className="w-full col-start-1 col-end-3 font-bold text-xl hover:opacity-90 transition-all duration-500"
            size="lg"
          >
            Submit
          </Button> */}
        </form>
      </div>
    </section>
  );
};

export default AddProject;
