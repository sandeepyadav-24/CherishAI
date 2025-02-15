"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Textarea } from "@/components/Textarea";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react"; // Import useSession

export default function SongPoemGenerator() {
  const { data: session } = useSession(); // Get session data
  const [name, setName] = useState("");
  const [partnerName, setPartnerName] = useState("");
  const [memories, setMemories] = useState("");
  const [feeling, setFeeling] = useState("");
  const [loading, setLoading] = useState(false);
  const [lyrics, setLyrics] = useState("");
  const [song, setSong] = useState("");
  const [mode, setMode] = useState("poem");
  const [step, setStep] = useState<"lyrics" | "song">("lyrics");

  console.log("Session Data:", session); // Check what session contains
  console.log("Access Token:", session?.accessToken); // Ensure token exists

  const generateSong = async (lyrics: string) => {
    if (!session) {
      alert("You must be logged in to generate a song.");
      return;
    }

    console.log("Song Generation Step");
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8787/generate-song", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.idToken}`, // Ensure session is available
        },
        body: JSON.stringify({ lyrics }),
      });

      const data = await response.json();
      setSong(data.song);
    } catch (error) {
      console.error("Error generating song:", error);
      alert("Failed to generate song. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (step === "song" && lyrics) {
      generateSong(lyrics);
    }
  }, [lyrics, step]);

  const generateLyrics = async () => {
    if (!session) {
      alert("You must be logged in to generate lyrics.");
      return;
    }
    setLoading(true);
    console.log("inside Fn");
    try {
      const response = await fetch("http://localhost:8787/generate-lyrics", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.idToken || ""}`, // Ensure token is a string
        },
        body: JSON.stringify({ name, partnerName, memories, feeling }),
      });

      const data = await response.json();
      console.log("Done lyrics generation");
      setLyrics(data.lyrics);
      setStep("song");
    } catch (error) {
      console.error("Error generating lyrics:", error);
      alert("Failed to generate lyrics. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGenerate = async () => {
    if (step === "lyrics") {
      await generateLyrics();
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-purple-100 p-6">
      <div className="w-full max-w-5xl flex flex-col md:flex-row bg-white shadow-xl rounded-2xl p-6">
        {/* Left Side - Input Form */}
        <div className="w-full md:w-1/2 p-6">
          <h2 className="text-3xl font-bold text-red-500">
            Create Your Song or Poem
          </h2>

          {/* Navbar */}
          <div className="flex space-x-4 mt-2">
            <Button
              className={`px-4 py-2 ${
                mode === "poem" ? "bg-red-500 text-white" : "bg-gray-200"
              }`}
              onClick={() => setMode("poem")}
            >
              Poem
            </Button>
            <Button
              className={`px-4 py-2 ${
                mode === "song" ? "bg-red-500 text-white" : "bg-gray-200"
              }`}
              onClick={() => setMode("song")}
            >
              Song
            </Button>
          </div>

          <p className="text-gray-600 mt-4">
            Fill out the details to generate a personalized {mode}.
          </p>
          <div className="mt-4 space-y-4">
            <Input
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              placeholder="Partner's Name"
              value={partnerName}
              onChange={(e) => setPartnerName(e.target.value)}
            />
            <Textarea
              placeholder="Describe Your Memories"
              value={memories}
              onChange={(e) => setMemories(e.target.value)}
            />
            <Textarea
              placeholder="Describe Your Feelings"
              value={feeling}
              onChange={(e) => setFeeling(e.target.value)}
            />
            <Button
              className="w-full bg-red-500 hover:bg-red-600"
              onClick={handleGenerate}
            >
              Generate {mode}
            </Button>
          </div>
        </div>

        {/* Right Side - Output & Loader */}
        <div className="w-full md:w-1/2 p-6 flex items-center justify-center bg-purple-200 rounded-2xl">
          {loading ? (
            <Loader2 className="animate-spin h-12 w-12 text-red-500" />
          ) : (
            <div className="text-lg text-gray-700 text-center">
              {lyrics && <p>{lyrics}</p>}
              {song && <p className="mt-4">{song}</p>}
              {!lyrics && !song && `Your generated ${mode} will appear here.`}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
