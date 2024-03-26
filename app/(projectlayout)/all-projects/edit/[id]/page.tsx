import SubmitButton from "@/components/SubmitButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import prisma from "@/utils/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const getData = async ({
  userId,
  projectId,
}: {
  userId: string;
  projectId: string;
}) => {
  const data = await prisma.project.findUnique({
    where: {
      id: projectId,
      userId,
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

const EditProjectPage = async ({ params }: { params: { id: string } }) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const project = await getData({
    userId: user?.id as string,
    projectId: params.id,
  });

  const postData = async (formData: FormData) => {
    "use server";

    if (!user) {
      throw new Error("Not authorized");
    }

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

    await prisma.project.update({
      where: {
        id: project?.id,
        userId: user.id,
      },
      data: {
        title,
        // bookCover,
        bookTitle,
        course,
        courseCode,
        documentation,
        members,
        projectUrl,
        sourceCode,
        supervisor,
        year,
      },
    });

    revalidatePath(`/dashboard`);

    return redirect(`/dashboard`);
  };

  return (
    <section className="mb-20">
      <div className="max-w-6xl container mx-auto px-10 py-8">
        <h2 className="my-10 text-center text-4xl text-rose-700 font-bold">
          Edit Project
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
              defaultValue={project?.title}
            />
          </div>
          <div className="flex flex-col gap-4">
            <Label className="text-xl" htmlFor="course">
              Course
            </Label>
            <Input
              defaultValue={project?.course}
              name="course"
              id="course"
              type="text"
              placeholder="Course"
            />
          </div>
          <div className="flex flex-col gap-4">
            <Label className="text-xl" htmlFor="bookTitle">
              Book Title
            </Label>
            <Input
              defaultValue={project?.bookTitle}
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
              defaultValue={project?.courseCode}
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
              defaultValue={project?.members}
              name="members"
              id="members"
              placeholder="Project members names separated by comma(,)"
            />
          </div>

          <div className="flex flex-col gap-4">
            <Label className="text-xl" htmlFor="supervisor">
              Name of Supervisor
            </Label>
            <Input
              defaultValue={project?.supervisor}
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
              defaultValue={project?.documentation}
              name="documentation"
              id="documentation"
              placeholder="Type your documentation"
            />
          </div>
          <div className="flex flex-col gap-4">
            <Label className="text-xl" htmlFor="url">
              Project URL(Optional)
            </Label>
            <Input
              defaultValue={project?.projectUrl as string}
              id="url"
              name="url"
              type="url"
              placeholder="Project URL"
            />
          </div>
          <div className="flex flex-col gap-4">
            <Label className="text-xl" htmlFor="sourceCode">
              Source Code URL
            </Label>
            <Input
              defaultValue={project?.sourceCode}
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
            <Input
              defaultValue={project?.year}
              id="year"
              name="year"
              type="text"
              placeholder="Year"
            />
          </div>
          <SubmitButton />
          {/* <Button
            className="w-full col-start-1 col-end-3 font-bold text-xl hover:opacity-90 transition-all duration-500"
            size="lg"
          >
            Save
          </Button> */}
        </form>
      </div>
    </section>
  );
};

export default EditProjectPage;
