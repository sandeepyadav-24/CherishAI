import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

function Feature() {
  return (
    <div className="w-full py-20 lg:py-40 bg-[#F1E8FD] ">
      <div className="container mx-auto">
        <div className="grid border border-[#A68ABE] rounded-lg container p-8 grid-cols-1 gap-8 items-center lg:grid-cols-2 dark:border-slate-800">
          <div className="flex gap-10 flex-col">
            <div className="flex gap-4 flex-col">
              <div>
                <Badge variant="outline">Feature</Badge>
              </div>
              <div className="flex gap-2 flex-col">
                <h2 className="text-3xl lg:text-5xl tracking-tighter max-w-xl text-left font-regular">
                  Something new!
                </h2>
                <p className="text-lg leading-relaxed tracking-tight text-slate-500 max-w-xl text-left dark:text-slate-400">
                  Create AI-powered gifts that make your Valentine feel truly
                  special!
                </p>
              </div>
            </div>
            <div className="grid lg:pl-6 grid-cols-1 sm:grid-cols-3 items-start lg:grid-cols-1 gap-6">
              <div className="flex flex-row gap-6 items-start">
                <Check className="w-4 h-4 mt-2 text-slate-900 dark:text-slate-50" />
                <div className="flex flex-col gap-1">
                  <p>Personalized Valentine's Cards</p>
                  <p className="text-slate-500 text-sm dark:text-slate-400">
                    Generate custom love cards with AI-designed themes and
                    messages.
                  </p>
                </div>
              </div>
              <div className="flex flex-row gap-6 items-start">
                <Check className="w-4 h-4 mt-2 text-slate-900 dark:text-slate-50" />
                <div className="flex flex-col gap-1">
                  <p>Memory Scrapbook</p>
                  <p className="text-slate-500 text-sm dark:text-slate-400">
                    Compile your best moments into a digital AI-enhanced
                    scrapbook.
                  </p>
                </div>
              </div>
              <div className="flex flex-row gap-6 items-start">
                <Check className="w-4 h-4 mt-2 text-slate-900 dark:text-slate-50" />
                <div className="flex flex-col gap-1">
                  <p>AI-Generated Love Poems & Songs</p>
                  <p className="text-slate-500 text-sm dark:text-slate-400">
                    Turn your love story into a beautiful poem or song lyrics
                    with AI.
                  </p>
                </div>
              </div>
              <div className="flex flex-row gap-6 items-start">
                <Check className="w-4 h-4 mt-2 text-slate-900 dark:text-slate-50" />
                <div className="flex flex-col gap-1">
                  <p>Romantic Video Messages</p>
                  <p className="text-slate-500 text-sm dark:text-slate-400">
                    Generate a heartfelt video message using AI-powered avatars.
                  </p>
                </div>
              </div>
              <div className="flex flex-row gap-6 items-start">
                <Check className="w-4 h-4 mt-2 text-slate-900 dark:text-slate-50" />
                <div className="flex flex-col gap-1">
                  <p>Couple Photo Generator</p>
                  <p className="text-slate-500 text-sm dark:text-slate-400">
                    Upload photos and let AI create a stunning couple picture.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[#B296DA] rounded-md aspect-square dark:bg-slate-800">
            <Image
              src={
                "https://badoo.com/_next/image?url=%2Fbadoo-homepage%2Fassets%2Fsection-trust-bg.png&w=3840&q=75"
              }
              alt={"feature_image"}
              className="w-full h-auto object-cover rounded-xl my-14 md:my-28"
              height={250}
              width={250}
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export { Feature };
