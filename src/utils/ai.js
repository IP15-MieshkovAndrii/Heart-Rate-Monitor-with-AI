import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.VUE_APP_GROQ_API_KEY, dangerouslyAllowBrowser: true});

export default async function fetchGroqApi(prompt) {
  return groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content:prompt,
      },
    ],
    model: "llama-3.3-70b-versatile",
  });
}

