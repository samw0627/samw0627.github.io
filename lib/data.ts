import fs from "fs";
import path from "path";
import { load } from "js-yaml";
import type { Person, Position, Education, Award, NewsItem } from "./types";

// Missing or fully commented-out data files are treated as empty lists
function loadYaml<T>(filename: string): T {
  const file = path.join(process.cwd(), "_data", filename);
  if (!fs.existsSync(file)) return [] as T;
  return (load(fs.readFileSync(file, "utf8")) ?? []) as T;
}

export const getPeople = () => loadYaml<Record<string, Person>>("people.yml");
export const getEducation = () => loadYaml<Education[]>("education.yml");
export const getPositions = () => loadYaml<Position[]>("positions.yml");
export const getAwards = () => loadYaml<Award[]>("awards.yml");
export const getNews = () => loadYaml<NewsItem[]>("news.yml");
export const getService = () => loadYaml<Record<string, unknown>[]>("service.yml");
export const getTeaching = () => loadYaml<Record<string, unknown>[]>("teaching.yml");
export const getMentoring = () => loadYaml<Record<string, unknown>[]>("mentoring.yml");
export const getPatents = () => loadYaml<Record<string, unknown>[]>("patents.yml");
