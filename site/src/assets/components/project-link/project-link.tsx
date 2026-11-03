import type { ReactNode } from "react";
import { PROJECTS, type ProjectId } from "../../../landing-page/my-work/projects";

// A mention of one of Ty's projects. On the home page the #work/<id> hash
// switches to the Work section and highlights the card (see Viewpoints);
// from any other page it navigates there.
export default function ProjectLink({
  id,
  children,
}: {
  id: ProjectId;
  children?: ReactNode;
}) {
  const p = PROJECTS[id];
  return (
    <a className="project-link" href={p.href} data-project={id}>
      {children ?? p.name}
    </a>
  );
}
