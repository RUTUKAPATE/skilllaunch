"use client";
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useRef } from 'react';

const HeroSection = () => {

    const imageRef = useRef(null);

    useEffect(() => {
        const imageElement = imageRef.current;

        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const scrollThreshold = 100;

            if (scrollPosition > scrollThreshold) {
                imageElement.classList.add("scrolled");
            } else {
                imageElement.classList.remove("scrolled");
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [])
    return (
        <section className='w-full pt-36 md:pt-48 lg:pt-20 xl:pt-29 pb-10'>
            <div className='container mx-auto flex flex-col md:flex-row items-center justify-between px-6 md:px-12 text-center'>
                {/* Left Content */}
                <div className='md:w-1/2 text-center md:text-left space-y-6 mx-auto items-center p-10'>
                    <h1 className='mx-auto max-w-[600] text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-[#FFB433] via-[#E6A42E] to-[#CC9429] pb-2 pr-2'>HEY!
                    </h1>
                    <p className='mx-auto max-w-[600] text-muted-foreground md:text-xl mt-4 text-lg'>
                        An AI-driven platform to make your college and career easier and organized. We provide you with a one-stop destination for all your needs!
                    </p>
                    <p className='mx-auto max-w-[600] text-muted-foreground md:text-xl mt-2 text-lg'>Click on start to get to know us.</p>
                    <div className='mt-6 mx-auto max-w-[600]'>
                        <Link href='/dashboard'>
                            <Button size='lg' className='px-8'>Get Started</Button>
                        </Link>
                    </div>
                </div>

                {/* Right Image */}
                <div className='md:w-1/2 flex justify-center mt-5 md:mt-0 hero-image-wrapper'>
                    <div ref={imageRef} className='hero-image'>
                        <Image
                            src='/hero-image.png'
                            width={539}
                            height={542}
                            alt='Hero Image'
                            className='mx-auto'
                            priority />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
