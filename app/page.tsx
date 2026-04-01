"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

const Home: React.FC = () => {
  return (
    <div className="bg-white md:mt-5">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-6 md:px-12 py-12 md:py-20 max-w-7xl mx-auto">
        {/* Left Content */}
        <div className="max-w-lg space-y-6 text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-semibold text-orange-600">
            HOT & FRESH PIZZA <br />
            Delivered straight to your door.
          </h1>
          <p className="text-amber-600 text-sm md:text-lg leading-relaxed">
            Craving something cheesy and delicious? Order your favorite pizza now and enjoy fast delivery.
          </p>
          <div className="flex justify-center md:justify-start space-x-4">
            <Link
              href="/menus"
              className="border border-amber-300 px-6 py-3 rounded-md font-medium text-orange-950 hover:border-orange-600 hover:text-orange-600 transition"
            >
              See Our Product
            </Link>
          </div>
        </div>

        {/* Right Illustration */}
        <div className="mt-10 md:mt-0 md:ml-12 flex justify-center">
          <div className="w-75 md:w-125 flex items-center justify-center">
            <Image
              src="/cheesepizza.png"
              alt="pizza"
              width={600}
              height={600}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
