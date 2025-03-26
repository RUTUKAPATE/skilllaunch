"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import HeroSection from "./components/hero";
import { features } from "@/data/features";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRef } from "react";

export default function Home() {
  const featureRef = useRef(null);
  return (
    <div>
      <div className="grid-background"></div>

      <HeroSection featureRef={featureRef}/>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-background" ref={featureRef}>
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter text-center mb-12">
            HOW CAN WE HELP YOU TODAY?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {features.map((feature, index) => (
              <Card key={index} className="overflow-hidden shadow-lg p-0 gap-0 hover:border-primary transition-colors duration-300">  
                <CardHeader className="bg-[#FFB433] text-white text-center py-6 px-4">
                  <CardTitle className="font-bold text-4xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="bg-[#B4EBE6] p-6 flex flex-col flex-grow justify-between items-center">
                  {/* Description + Button Section */}
                    <p className="text-lg">{feature.description}</p>
                    <Link href={feature.link}>
                      <Button className="bg-primary text-white px-6 py-2 rounded-lg mt-4 w-[137px] h-[44px]">
                      TRY ME
                      </Button>
                    </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
