import fs from "fs";
import path from "path";
import { load } from "js-yaml";
import type { Project } from "./types";

function loadProjects(): Project[] {
  const raw = fs.readFileSync(
    path.join(process.cwd(), "_data", "projects.yml"),
    "utf8"
  );
  return load(raw) as Project[];
}

export function getAllProjects(): Project[] {
  return loadProjects();
}

export function getHighlightedProjects(): Project[] {
  return loadProjects()
    .filter((p) => p.highlight != null)
    .sort((a, b) => (a.highlight ?? 99) - (b.highlight ?? 99));
}
