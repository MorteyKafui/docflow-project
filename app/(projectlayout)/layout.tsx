import { PropsWithChildren } from "react";

const ProjectLayout = async ({ children }: PropsWithChildren) => {
  return <section>{children}</section>;
};

export default ProjectLayout;
