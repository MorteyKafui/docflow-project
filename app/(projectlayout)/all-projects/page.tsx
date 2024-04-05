import AllProjects from "@/components/Projects";
import prisma from "@/utils/db";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";

const getProjects = async () => {
  noStore();

  const data = await prisma.project.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  revalidatePath("/all-projects");

  return data;
};

const ProjectsPage = async () => {
  const projects = await getProjects();
  // const projects: any[] = [];

  return (
    <>
      <AllProjects projects={projects} />
    </>
  );
};

export default ProjectsPage;
