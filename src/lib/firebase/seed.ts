import { createPrompt } from "./firestore";

const defaultPrompts = [
  {
    id: "prompt-discipline",
    title: "Complete Thought: Discipline",
    content: "Analyze the transcript and identify segments that discuss discipline, consistency, and hard work. Ensure the segment represents a 'complete thought' with a clear setup and conclusion.",
    tags: ["discipline", "motivation"],
  },
  {
    id: "prompt-technical",
    title: "Complete Thought: Technical Insight",
    content: "Identify segments where the speaker explains a technical concept, framework, or programming paradigm. The segment should stand alone as an educational clip.",
    tags: ["technical", "educational", "coding"],
  },
];

export async function seedPrompts() {
  console.log("Seeding prompts...");
  for (const prompt of defaultPrompts) {
    try {
      await createPrompt(prompt);
      console.log(`✅ Seeded prompt: ${prompt.title}`);
    } catch (error) {
      console.error(`❌ Failed to seed prompt: ${prompt.title}`, error);
    }
  }
  console.log("Seeding complete.");
}

// If executed directly
if (require.main === module) {
  seedPrompts()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}
