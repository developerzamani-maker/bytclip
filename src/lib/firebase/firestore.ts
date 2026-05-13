import {
  collection,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  getDocs,
  query,
  where,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./config";
import {
  Project,
  ProjectSchema,
  Job,
  JobSchema,
  Prompt,
  PromptSchema,
} from "@/schemas/collections";

// Helper for ISO dates
const getIsoTimestamp = () => new Date().toISOString();

// ==========================================
// Projects
// ==========================================

export async function createProject(projectData: Omit<Project, "createdAt" | "updatedAt">): Promise<Project> {
  const timestamp = getIsoTimestamp();
  const newProject = {
    ...projectData,
    createdAt: timestamp,
    updatedAt: timestamp,
  };

  const parsed = ProjectSchema.parse(newProject);
  const docRef = doc(db, "projects", parsed.id);
  await setDoc(docRef, parsed);

  return parsed;
}

export async function getProject(id: string): Promise<Project | null> {
  const docRef = doc(db, "projects", id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    return null;
  }

  const data = docSnap.data();
  // Safe parse in case database data is malformed
  const parsed = ProjectSchema.safeParse(data);
  if (!parsed.success) {
    console.error(`Invalid project data for ID ${id}`, parsed.error);
    throw new Error("Invalid project data in database");
  }

  return parsed.data;
}

export async function updateProject(
  id: string,
  updates: Partial<Omit<Project, "id" | "createdAt" | "updatedAt">>
): Promise<void> {
  const docRef = doc(db, "projects", id);
  await updateDoc(docRef, {
    ...updates,
    updatedAt: getIsoTimestamp(),
  });
}

// ==========================================
// Jobs
// ==========================================

export async function createJob(jobData: Omit<Job, "createdAt" | "updatedAt">): Promise<Job> {
  const timestamp = getIsoTimestamp();
  const newJob = {
    ...jobData,
    createdAt: timestamp,
    updatedAt: timestamp,
  };

  const parsed = JobSchema.parse(newJob);
  const docRef = doc(db, "jobs", parsed.id);
  await setDoc(docRef, parsed);

  return parsed;
}

export async function updateJobStatus(
  id: string,
  status: Job["status"],
  additionalUpdates?: Partial<Omit<Job, "id" | "status" | "createdAt" | "updatedAt">>
): Promise<void> {
  const docRef = doc(db, "jobs", id);
  await updateDoc(docRef, {
    status,
    ...additionalUpdates,
    updatedAt: getIsoTimestamp(),
  });
}

export async function getJobsForProject(projectId: string): Promise<Job[]> {
  const q = query(collection(db, "jobs"), where("projectId", "==", projectId));
  const querySnapshot = await getDocs(q);

  const jobs: Job[] = [];
  querySnapshot.forEach((doc) => {
    const parsed = JobSchema.safeParse(doc.data());
    if (parsed.success) {
      jobs.push(parsed.data);
    } else {
      console.error(`Invalid job data for ID ${doc.id}`, parsed.error);
    }
  });

  return jobs;
}

// ==========================================
// Prompts
// ==========================================

export async function getPrompts(): Promise<Prompt[]> {
  const q = query(collection(db, "prompts"));
  const querySnapshot = await getDocs(q);

  const prompts: Prompt[] = [];
  querySnapshot.forEach((doc) => {
    const parsed = PromptSchema.safeParse(doc.data());
    if (parsed.success) {
      prompts.push(parsed.data);
    } else {
      console.error(`Invalid prompt data for ID ${doc.id}`, parsed.error);
    }
  });

  return prompts;
}

export async function createPrompt(promptData: Prompt): Promise<Prompt> {
  const parsed = PromptSchema.parse(promptData);
  const docRef = doc(db, "prompts", parsed.id);
  await setDoc(docRef, parsed);
  return parsed;
}
