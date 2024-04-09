import SubmitButton from "@/components/SubmitButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import prisma from "@/utils/db";
import supabase from "@/utils/supabse";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import { redirect } from "next/navigation";

const AddProject = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const postData = async (formData: FormData) => {
    "use server";

    const title = formData.get("title") as string;
    const course = formData.get("course") as string;
    const bookTitle = formData.get("bookTitle") as string;
    const courseCode = formData.get("courseCode") as string;
    const image = formData.get("image") as File;
    const pdfFile = formData.get("pdfFile") as File;
    const members = formData.get("members") as string;
    const supervisor = formData.get("supervisor") as string;
    const documentation = formData.get("documentation") as string;
    const projectUrl = formData.get("url") as string;
    const sourceCode = formData.get("sourceCode") as string;
    const year = formData.get("year") as string;

    const { data: imageData, error } = await supabase.storage
      .from("images")
      .upload(`${image.name}-${new Date()}`, image, {
        cacheControl: "2592000",
        contentType: "image/png",
        upsert: false,
      });

    const { data: pdfData, error: pdfError } = await supabase.storage
      .from("pdfs")
      .upload(`${pdfFile.name}-${new Date()}`, pdfFile, {
        cacheControl: "2592000",
        contentType: "application/pdf",
        upsert: false,
      });

    try {
      await prisma.project.create({
        data: {
          userId: user?.id as string,
          title,
          course,
          bookTitle,
          courseCode,
          members,
          supervisor,
          bookCover: imageData?.path as string,
          pdfPath: pdfData?.path as string,
          documentation,
          projectUrl,
          sourceCode,
          year,
        },
      });
    } catch (error) {
      console.log(error);
    }

    return redirect("/dashboard");
  };

  return (
    <section className="pt-10 pb-20">
      <div className="max-w-6xl container mx-auto px-10 py-8 text-white">
        <h2 className="my-10 text-center text-3xl text-secondBg font-bold">
          Create a Project
        </h2>
        <form
          action={postData}
          className="lg:grid lg:grid-cols-2 gap-10 flex flex-col"
        >
          <div className="flex flex-col gap-4">
            <Label className="lg:text-xl" htmlFor="title">
              Project Title
            </Label>
            <Input
              className="text-firstBg font-semibold"
              name="title"
              id="title"
              type="text"
              placeholder="Project Title"
              required
            />
          </div>
          <div className="flex flex-col gap-4">
            <Label className="lg:text-xl" htmlFor="course">
              Course
            </Label>
            <Input
              className="text-firstBg font-semibold"
              name="course"
              id="course"
              type="text"
              placeholder="Course"
              required
            />
          </div>
          <div className="flex flex-col gap-4">
            <Label className="lg:text-xl" htmlFor="bookTitle">
              Book Title
            </Label>
            <Input
              className="text-firstBg font-semibold"
              name="bookTitle"
              id="bookTitle"
              type="text"
              placeholder="Book Title"
              required
            />
          </div>
          <div className="flex flex-col gap-4">
            <Label className="lg:text-xl" htmlFor="courseCode">
              Course Code
            </Label>
            <Input
              className="text-firstBg font-semibold"
              name="courseCode"
              id="courseCode"
              type="text"
              placeholder="Course Code"
              required
            />
          </div>
          <div className="flex flex-col gap-4">
            <Label className="lg:text-xl flex items-center" htmlFor="members">
              Names of Project Members
              <span className="text-sm ml-10 text-secondBg">
                (separate names by commas)
              </span>
            </Label>
            <Textarea
              name="members"
              id="members"
              placeholder="Write names of members separated by comma(,)"
              required
              className="text-firstBg font-semibold"
            />
          </div>
          <div className="flex flex-col gap-4">
            <Label className="lg:text-xl" htmlFor="supervisor">
              Name of Supervisor
            </Label>
            <Input
              className="text-firstBg font-semibold"
              id="supervisor"
              name="supervisor"
              type="text"
              placeholder="Name of Supervisor"
              required
            />
          </div>
          <div className="flex flex-col gap-4">
            <Label className="lg:text-xl flex items-center" htmlFor="image">
              Book Cover
            </Label>
            <Input
              className="text-firstBg font-semibold"
              id="image"
              name="image"
              type="file"
              placeholder="Book Cover"
              required
            />
          </div>
          <div className="flex flex-col gap-4">
            <Label className="lg:text-xl flex items-center" htmlFor="file">
              Documentation
              <span className="text-sm ml-10 text-secondBg">
                (type documentation here)
              </span>
            </Label>
            <Textarea
              className="text-firstBg font-semibold"
              name="documentation"
              id="documentation"
              placeholder="Type your documentation"
              required
            />
          </div>
          <div className="flex flex-col gap-4">
            <Label className="lg:text-xl flex items-center" htmlFor="pdf">
              Upload Documentation (pdf)
            </Label>
            <Input
              id="pdf"
              type="file"
              // accept=".pdf"
              name="pdfFile"
              placeholder="PDF File"
              className="text-firstBg font-semibold"
            />
          </div>
          <div className="flex flex-col gap-4">
            <Label className="lg:text-xl" htmlFor="url">
              Project URL(Optional)
            </Label>
            <Input
              id="url"
              name="url"
              type="url"
              placeholder="Project URL"
              className="text-firstBg font-semibold"
            />
          </div>
          <div className="flex flex-col gap-4">
            <Label className="lg:text-xl" htmlFor="sourceCode">
              Source Code URL
            </Label>
            <Input
              className="text-firstBg font-semibold"
              id="code"
              name="sourceCode"
              type="url"
              placeholder="Source Code URL"
              required
            />
          </div>
          <div className="flex flex-col gap-4">
            <Label className="lg:text-xl" htmlFor="year">
              Year
            </Label>
            <Input
              className="text-firstBg font-semibold"
              id="year"
              name="year"
              type="text"
              placeholder="Year"
              required
            />
          </div>
          <SubmitButton />
        </form>
      </div>
    </section>
  );
};

export default AddProject;
