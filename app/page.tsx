import Image from 'next/image';
import React from 'react';

const Home: React.FC = () => {
  return (
    <div className="bg-white mt-11">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-8 py-16 max-w-7xl mx-auto">
        {/* Left Content */}
        <div className="max-w-lg space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            HOT & FRESH PIZZA <br />
            Delivered straight to your door.
          </h1>
          <p className="text-gray-600">
            Craving something cheesy and delicious? Order your favorite pizza now and enjoy fast delivery.
          </p>
          <div className="flex space-x-4">
            <button className="bg-orange-600 text-white px-6 py-3 rounded-md font-medium hover:bg-orange-700">
              Order Now
            </button>
            <button className="border border-gray-300 px-6 py-3 rounded-md font-medium text-gray-700 hover:border-orange-600 hover:text-orange-600">
              See Our Product
            </button>
          </div>
        </div>

        {/* Right Illustration Placeholder */}
        <div className="mt-10 md:mt-0 md:ml-12 flex justify-center">
          <div className="w-100 h-10 flex items-center justify-center">
            {/* Replace with actual illustration or image */}
            <Image src="/pizza.png" alt="pizza" width={600} height={600}/>
          </div>
        </div>
      </section>

      {/* Trusted Logos Section */}
      <section className="px-8 py-12 bg-gray-50 text-center">
        <p className="text-gray-600 font-medium mb-6">
          Loved by pizza lovers and trusted by foodies everywhere
        </p>
        <div className="flex flex-wrap justify-center gap-8 text-gray-400">
          <span className="font-semibold">Logo</span>
          <span className="font-semibold">Logo</span>
          <span className="font-semibold">Logo</span>
          <span className="font-semibold">Logo</span>
          <span className="font-semibold">Logo</span>
          <span className="font-semibold">Logo</span>
          <span className="font-semibold">Logo</span>
        </div>
      </section>
    </div>
  );
};

export default Home;
