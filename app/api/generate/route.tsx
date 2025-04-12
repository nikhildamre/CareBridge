// app/api/generate/route.js
import { NextResponse } from "next/server";

// Make sure Ollama server is running!
const OLLAMA_URL = process.env.OLLAMA_URL || "http://localhost:11434";
const MODEL_NAME = "llama3.2"; // Or dynamically get from request if needed

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 },
      );
    }

    console.log(
      `Sending prompt to Ollama: "${prompt}" using model ${MODEL_NAME}`,
    );

    // Call Ollama /api/generate endpoint
    const response = await fetch(`${OLLAMA_URL}/api/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: MODEL_NAME,
        prompt: prompt,
        stream: false, // Get the full response at once. Set to true for streaming.
        // options: { // Optional parameters
        //   temperature: 0.7,
        //   top_p: 0.9,
        // }
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Ollama API Error:", errorText);
      throw new Error(
        `Ollama API request failed with status ${response.status}: ${errorText}`,
      );
    }

    const data = await response.json();
    console.log("Received response from Ollama:", data.response);

    // Return only the response text
    return NextResponse.json({ response: data.response });
  } catch (error) {
    console.error("Error in API route:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to generate response",
      },
      { status: 500 },
    );
  }
}

// Optional: Handle GET requests or other methods if needed
// export async function GET(request) {
//   return NextResponse.json({ message: 'Send a POST request with a prompt' });
// }
