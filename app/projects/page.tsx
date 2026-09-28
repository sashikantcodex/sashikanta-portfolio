import type { Metadata } from "next";
import { ProjectsView } from "@/components/projects-view";

export const metadata: Metadata = {
  title: "Projects — Sashikanta Sahoo",
  description: "Archive of healthcare platforms and public AI engineering work.",
};

export default function ProjectsPage() {
  return <ProjectsView />;
}
