// app/page.tsx
"use client"; // Required for hooks and event handlers

import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button"; // Adjust path if your components alias is different
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";

// Define the expected shape of the API response
interface ApiResponse {
  response?: string;
  error?: string;
}

export default function OllamaChat() {
  const [prompt, setPrompt] = useState<string>("");
  const [response, setResponse] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setResponse(""); // Clear previous response

    try {
      const res = await fetch("/api/generate", {
        // Our Next.js API route
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data: ApiResponse = await res.json();

      if (!res.ok || data.error) {
        throw new Error(
          data.error || `API request failed with status ${res.status}`,
        );
      }

      if (data.response) {
        setResponse(data.response);
      } else {
        throw new Error("Received empty response from server.");
      }
    } catch (err: unknown) {
      console.error("Error fetching from API route:", err);
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";
      setResponse(""); // Clear any partial response on error
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {" "}
      {/* Need Toaster for toasts to appear */}
      <main className="container mx-auto flex justify-center p-4 md:p-8">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle>Interact with Local LLM</CardTitle>
            <CardDescription>
              Enter a prompt to get a response from your local Ollama model (
              {process.env.NEXT_PUBLIC_OLLAMA_MODEL || "llama3.2"}).
              {/* Note: Use NEXT_PUBLIC_ prefix for env vars exposed to browser, or derive display name differently */}
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="grid w-full gap-1.5">
                <Label htmlFor="prompt-input">Your Prompt</Label>
                <Textarea
                  id="prompt-input"
                  rows={4}
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Type your prompt here..."
                  required
                  disabled={isLoading}
                />
              </div>
              <Button
                type="submit"
                disabled={isLoading || !prompt.trim()}
                className="w-full"
              >
                {isLoading ? "Generating..." : "Generate Response"}
              </Button>
            </CardContent>
          </form>
          {response && (
            <CardFooter className="mt-4">
              <Card className="w-full">
                <CardHeader>
                  <CardTitle>Response</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="whitespace-pre-wrap text-sm">{response}</p>
                </CardContent>
              </Card>
            </CardFooter>
          )}
        </Card>
      </main>
    </>
  );
}
