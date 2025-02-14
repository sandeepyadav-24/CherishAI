"use client";
import { useState } from "react";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Textarea } from "@/components/Textarea";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";

export default function SongPoemGenerator() {
  const [name, setName] = useState("");
  const [partnerName, setPartnerName] = useState("");
  const [memories, setMemories] = useState("");
  const [feeling, setFeeling] = useState("");
  const [loading, setLoading] = useState(false);
  const [lyrics, setLyrics] = useState("");
  const [song, setSong] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState("poem");
  const [step, setStep] = useState<"lyrics" | "song">("lyrics");

  const generateSong = async (lyrics: string) => {
    console.log("Song Generation Step");
    setLoading(true);
    try {
      // Simulate API call to generate song
      const response = await fetch("http://localhost:8787/generate-song", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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

  // Automatically generate the song when lyrics update and step is "song"
  useEffect(() => {
    if (step === "song" && lyrics) {
      generateSong(lyrics);
    }
  }, [lyrics, step]);

  const generateLyrics = async () => {
    setLoading(true);
    console.log("inside Fn");
    try {
      // Simulate API call to generate lyrics
      const response = await fetch("http://localhost:8787/generate-lyrics", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, partnerName, memories, feeling }),
      });

      const data = await response.json();
      console.log("Done lyrics geneartion ");
      setLyrics(data.lyrics);
      setStep("song"); // Move to the next step
      // Automatically generate song after lyrics
      if (step === "song") {
        await generateSong(lyrics);
      }
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

{
  /**{loading ? (
            <Loader2 className="animate-spin h-12 w-12 text-red-500" />
          ) : (
            <p className="text-lg text-gray-700 text-center">
              {output || `Your generated ${mode} will appear here.`}
            </p>
          )} */
}
