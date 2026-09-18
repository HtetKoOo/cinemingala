"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Button } from "./ui/button";
import { Movie } from "@/types/movie";
import Link from "next/link";

export default function MovieSlider({ topRatedMovies }: { topRatedMovies: Movie[] }) {
    const hasEnoughSlides = topRatedMovies.length > 1; // loop needs at least 2

    return (
        <div className="relative w-full h-[40vh] md:h-[55vh] lg:h-[70vh] overflow-hidden rounded-b-2xl">
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={20}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000 }}
                loop={hasEnoughSlides}
                style={{ width: "100%", height: "100%" }}
            >
                {topRatedMovies.map((movie, index) => (
                    <SwiperSlide key={index}>
                        {/* Background image */}
                        <div className="relative w-full h-[40vh] md:h-[55vh] lg:h-[70vh]">
                            <Image
                                src={
                                    movie.poster_path
                                        ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
                                        : "/images/image-placeholder.png"
                                }
                                alt={movie.title || "Movie Poster"}
                                fill
                                priority={index === 0} // preload first image for better UX
                                sizes="100vw"
                                className="object-cover rounded-b-2xl"
                            />
                            <div className="absolute inset-0 bg-black/30" />
                            <div className="absolute bottom-5 md:bottom-10 lg:bottom-20 left-5 lg:left-10 p-4 text-white w-2/3 md:w-1/2">
                                <h3 className="text-xl md:text-2xl lg:text-3xl font-bold">{movie.title}</h3>
                                <p className="hidden lg:block w-full">{movie.overview}</p>
                                <Link href={`/movie/${movie.id}`}>
                                    <Button className="mt-2 cursor-pointer">
                                        Movie Details
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            <h4 className="absolute bottom-5 right-10 z-20 text-xl md:text-2xl font-bold text-white">
                Top Rated Movies
            </h4>
        </div>
    );
}
