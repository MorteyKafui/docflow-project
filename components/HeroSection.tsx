"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";

gsap.registerPlugin(useGSAP);

const HeroSection = () => {
  const heroContainer = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: {
          opacity: 0,
          duration: 1,
          stagger: 0.2,
          ease: "circ.inOut",
          yoyo: true,
        },
      });

      tl.from(".hero h1", {
        y: 100,
      })
        .from(".hero p", {
          y: 120,
        })
        .from(".hero .btns", {
          y: 150,
          ease: "circ",
        });
    },
    { scope: heroContainer }
  );

  return (
    <header className="hero" ref={heroContainer}>
      <div className="flex flex-col justify-center lg:items-center h-screen gap-8">
        <h1 className="text-3xl text-secondBg lg:text-6xl font-poppins lg:text-center">
          <span className="text-rose-500">Effortless</span> Document{" "}
          <span className="text-green-400">Management</span> Made{" "}
          <span className="text-rose-500">Simple</span>
        </h1>
        <p className="text-lg text-slate-200 lg:text-center">
          Experience the{" "}
          <span className="text-secondBg font-bold">next level</span> of
          document organization and efficiency. Our platform elevates your
          document management process, making it more{" "}
          <span className="text-green-500 font-bold">
            efficient and effective.
          </span>
        </p>
        <div className="btns flex gap-10">
          <Button
            className="text-lg font-bold bg-secondBg text-firstBg hover:text-muted transition-all duration-500"
            asChild
          >
            <RegisterLink>Get Started</RegisterLink>
          </Button>
          <Button
            className="font-bold text-lg border-2 border-secondBg text-white hover:bg-secondBg hover:text-firstBg duration-500 transition-all"
            asChild
            variant="ghost"
          >
            <Link href="/about">Learn More</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default HeroSection;
