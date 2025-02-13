"use client";
import { useState } from "react";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Textarea } from "@/components/Textarea";
import { Loader2 } from "lucide-react";

export default function SongPoemGenerator() {
  const [name, setName] = useState("");
  const [partnerName, setPartnerName] = useState("");
  const [memories, setMemories] = useState("");
  const [feeling, setFeeling] = useState("");
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState("poem");

  const generateContent = async () => {
    setLoading(true);
    setOutput("");
    // Simulate API call
    setTimeout(() => {
      setOutput(`A beautiful ${mode} for ${partnerName} from ${name}`);
      setLoading(false);
    }, 3000);
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
              onClick={generateContent}
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
            <p className="text-lg text-gray-700 text-center">
              {output || `Your generated ${mode} will appear here.`}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
