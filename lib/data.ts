import fs from "fs";
import path from "path";
import { load } from "js-yaml";
import type { Person, Talk, Position, Education, Award, NewsItem } from "./types";

function loadYaml<T>(filename: string): T {
  const raw = fs.readFileSync(
    path.join(process.cwd(), "_data", filename),
    "utf8"
  );
  return load(raw) as T;
}

export const getPeople = () => loadYaml<Record<string, Person>>("people.yml");
export const getTalks = () => loadYaml<Talk[]>("talks.yml");
export const getEducation = () => loadYaml<Education[]>("education.yml");
export const getPositions = () => loadYaml<Position[]>("positions.yml");
export const getAwards = () => loadYaml<Award[]>("awards.yml");
export const getNews = () => loadYaml<NewsItem[]>("news.yml");
export const getService = () => loadYaml<Record<string, unknown>[]>("service.yml");
export const getTeaching = () => loadYaml<Record<string, unknown>[]>("teaching.yml");
export const getMentoring = () => loadYaml<Record<string, unknown>[]>("mentoring.yml");
export const getPatents = () => loadYaml<Record<string, unknown>[]>("patents.yml");
