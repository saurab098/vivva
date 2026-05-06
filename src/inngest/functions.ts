// src/inngest/functions.ts
// import { inngest } from "./client";

// export const processTask = inngest.createFunction(
//   { id: "process-task", triggers: { event: "app/task.created" } },

//   async ({ event, step }) => {

//     await step.sleep("pause", "30s");

//     return { message: `Task ${event.data.value} complete`};
//   },
// );
// functions.ts with step.ai.infer
import { inngest } from "./client";
import { createAgent, openai } from "@inngest/agent-kit";

export const processTask = inngest.createFunction(
  { id: "process-task", triggers: { event: "app/task.created" } },

  async ({ event, step }) => {
    const codeWriterAgent = createAgent({
      name: "Code-agent",
      system:
        "You are an expert TypeScript programmer.  Given a set of asks, you think step-by-step to plan clean, " +
        "idiomatic TypeScript code, with comments and tests as necessary." +
        "Do not respond with anything else other than the following XML tags:" +
        "- If you would like to write code, add all code within the following tags (replace $filename and $contents appropriately):" +
        "  <file name='$filename.ts'>$contents</file>",
      model: openai({ model: "gpt-4o-mini" }),
    });
    const { output } = await codeWriterAgent.run(
      "Write a typescript function that removes unnecessary whitespace",
    );
    console.log(output);
  },
);
