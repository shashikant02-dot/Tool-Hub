import React from "react";
import ToolsGrid from "../components/Converter";
import SearchFilter from "../components/Searchfilter";

export default function AIToolpage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#030303]">

      {/* ================= BACKGROUND ================= */}

      {/* Main Radial Background */}
      <div className="
        pointer-events-none
        absolute
        inset-0
        -z-20
        bg-[radial-gradient(ellipse_at_50%_15%,#24103d_0%,#090713_35%,#030303_75%)]
      " />


      {/* Purple Glow */}
      <div className="
        pointer-events-none
        absolute
        left-1/2
        top-0
        -z-10
        h-[550px]
        w-[900px]
        -translate-x-1/2
        rounded-full
        bg-purple-700/20
        blur-[150px]
      " />


      {/* Blue Glow */}
      <div className="
        pointer-events-none
        absolute
        right-[-200px]
        top-[40%]
        -z-10
        h-[500px]
        w-[500px]
        rounded-full
        bg-blue-700/10
        blur-[150px]
      " />


      {/* Pink Glow */}
      <div className="
        pointer-events-none
        absolute
        left-[-200px]
        top-[60%]
        -z-10
        h-[450px]
        w-[450px]
        rounded-full
        bg-pink-700/10
        blur-[150px]
      " />


      {/* ================= HERO ================= */}

      <section className="
        relative
        z-10
        mx-auto
        max-w-7xl
        px-4
        pt-32
        pb-16
        text-center
        sm:px-6
      ">

        {/* Badge */}

        <div className="
          mb-8
          inline-flex
          items-center
          rounded-full
          border
          border-white/10
          bg-white/[0.04]
          p-1
          shadow-sm
          backdrop-blur-md
        ">

          <span className="
            rounded-full
            px-4
            py-2
            text-sm
            font-semibold
            text-gray-200
          ">
            ✨ AI Powered Tools
          </span>

          <span className="
            border-l
            border-white/10
            px-4
            py-2
            text-sm
            text-gray-400
          ">
            Smart & Fast
          </span>

        </div>


        {/* Heading */}

        <h1 className="
          text-5xl
          font-extrabold
          leading-[1.05]
          tracking-tight
          text-white
          sm:text-6xl
          md:text-7xl
          lg:text-[82px]
        ">

          Smart

          <br />

          <span className="
            bg-gradient-to-r
            from-orange-400
            via-pink-500
            to-purple-500
            bg-clip-text
            text-transparent
          ">
            AI Tools.
          </span>

        </h1>


        {/* Description */}

        <p className="
          mx-auto
          mt-7
          max-w-3xl
          text-base
          leading-8
          text-gray-400
          sm:text-lg
          md:text-xl
        ">

          Smart tools powered by artificial intelligence.

          <br />

          Convert, extract, analyze and create content in seconds.

        </p>


        {/* ================= STATS ================= */}

        <div className="
          mx-auto
          mt-12
          grid
          max-w-2xl
          grid-cols-3
          gap-4
        ">

          {/* Stat 1 */}

          <div className="
            rounded-2xl
            border
            border-white/10
            bg-white/[0.04]
            px-4
            py-5
            backdrop-blur-xl
            transition
            hover:-translate-y-1
            hover:bg-white/[0.08]
          ">

            <h3 className="
              text-2xl
              font-bold
              text-white
              sm:text-3xl
            ">
              10+
            </h3>

            <p className="
              mt-1
              text-sm
              text-gray-500
            ">
              AI Tools
            </p>

          </div>


          {/* Stat 2 */}

          <div className="
            rounded-2xl
            border
            border-white/10
            bg-white/[0.04]
            px-4
            py-5
            backdrop-blur-xl
            transition
            hover:-translate-y-1
            hover:bg-white/[0.08]
          ">

            <h3 className="
              text-2xl
              font-bold
              text-white
              sm:text-3xl
            ">
              100K+
            </h3>

            <p className="
              mt-1
              text-sm
              text-gray-500
            ">
              Files Processed
            </p>

          </div>


          {/* Stat 3 */}

          <div className="
            rounded-2xl
            border
            border-white/10
            bg-white/[0.04]
            px-4
            py-5
            backdrop-blur-xl
            transition
            hover:-translate-y-1
            hover:bg-white/[0.08]
          ">

            <h3 className="
              text-2xl
              font-bold
              text-white
              sm:text-3xl
            ">
              99.9%
            </h3>

            <p className="
              mt-1
              text-sm
              text-gray-500
            ">
              Accuracy
            </p>

          </div>

        </div>

      </section>


      {/* ================= SEARCH FILTER ================= */}

      {/* SearchFilter ko change nahi kiya gaya */}

      <div className="
        relative
        z-10
      ">

        <SearchFilter />

      </div>


      {/* ================= TOOLS GRID ================= */}

      <div className="
        relative
        z-10
      ">

        <ToolsGrid />

      </div>

    </main>
  );
}