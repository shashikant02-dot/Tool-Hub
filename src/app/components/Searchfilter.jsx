"use client";

import { useMemo, useState } from "react";
import { Search, ArrowUpRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { tools, categories } from "@/data/tools";

export default function SearchFilter() {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredTools = useMemo(() => {
    return tools.filter((tool) => {
      const matchesCategory =
        activeCategory === "All" || tool.category === activeCategory;

      const matchesSearch =
        tool.title.toLowerCase().includes(search.toLowerCase()) ||
        tool.desc.toLowerCase().includes(search.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [search, activeCategory]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && filteredTools.length > 0) {
      router.push(`/tools/${filteredTools[0].slug}`);
    }
  };

  return (
    <section className="mx-auto max-w-6xl px-4">

      {/* Main Glass Container */}
      <div className="
        relative
        overflow-hidden
        rounded-3xl
        border
        border-white/10
        bg-white/[0.04]
        p-5
        shadow-2xl
        shadow-purple-900/20
        backdrop-blur-xl
        sm:p-6
      ">

        {/* Background Glow */}
        <div className="
          pointer-events-none
          absolute
          -right-20
          -top-20
          h-64
          w-64
          rounded-full
          bg-purple-600/20
          blur-[100px]
        " />

        <div className="
          pointer-events-none
          absolute
          -bottom-20
          -left-20
          h-64
          w-64
          rounded-full
          bg-blue-600/10
          blur-[100px]
        " />


        <div className="relative z-10">

          {/* ================= SEARCH ================= */}

          <div className="relative">

            <Search
              className="
                absolute
                left-5
                top-1/2
                h-5
                w-5
                -translate-y-1/2
                text-gray-500
              "
            />

            <input
              type="text"
              placeholder="Search from 100+ free online tools..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKeyDown}
              className="
                h-14
                w-full
                rounded-2xl
                border
                border-white/10
                bg-black/40
                pl-14
                pr-5
                text-sm
                text-white
                outline-none
                transition
                placeholder:text-gray-600
                focus:border-purple-500/60
                focus:bg-black/60
                focus:ring-2
                focus:ring-purple-500/10
                sm:text-base
              "
            />


            {/* Search Suggestions */}

            {search && (
              <div className="
                absolute
                left-0
                right-0
                z-50
                mt-3
                max-h-80
                overflow-y-auto
                overflow-hidden
                rounded-2xl
                border
                border-white/10
                bg-[#0c0c0f]/95
                shadow-2xl
                shadow-purple-900/30
                backdrop-blur-xl
              ">

                {filteredTools.length > 0 ? (

                  filteredTools.map((tool) => {

                    const Icon = tool.icon;

                    return (
                      <button
                        key={tool.id}
                        onClick={() =>
                          router.push(`/tools/${tool.slug}`)
                        }
                        className="
                          group
                          flex
                          w-full
                          items-center
                          gap-4
                          border-b
                          border-white/5
                          px-5
                          py-4
                          text-left
                          transition
                          last:border-0
                          hover:bg-white/[0.06]
                        "
                      >

                        {/* Icon */}

                        <div className="
                          flex
                          h-11
                          w-11
                          shrink-0
                          items-center
                          justify-center
                          rounded-xl
                          border
                          border-purple-500/20
                          bg-purple-500/10
                        ">

                          <Icon className="h-5 w-5 text-purple-400" />

                        </div>


                        {/* Content */}

                        <div className="min-w-0 flex-1">

                          <h4 className="
                            font-semibold
                            text-gray-200
                            transition
                            group-hover:text-white
                          ">
                            {tool.title}
                          </h4>

                          <p className="
                            mt-1
                            line-clamp-1
                            text-xs
                            text-gray-500
                          ">
                            {tool.desc}
                          </p>

                        </div>


                        {/* Category */}

                        <span className="
                          hidden
                          rounded-full
                          border
                          border-purple-500/20
                          bg-purple-500/10
                          px-3
                          py-1
                          text-xs
                          text-purple-300
                          sm:block
                        ">
                          {tool.category}
                        </span>


                        <ArrowUpRight className="
                          h-4
                          w-4
                          text-gray-600
                          transition
                          group-hover:-translate-y-0.5
                          group-hover:translate-x-0.5
                          group-hover:text-purple-400
                        " />

                      </button>
                    );

                  })

                ) : (

                  <div className="
                    py-10
                    text-center
                    text-gray-500
                  ">
                    No Tool Found 😔
                  </div>

                )}

              </div>
            )}

          </div>


          {/* ================= CATEGORIES ================= */}

          <div className="
            mt-6
            flex
            gap-2
            overflow-x-auto
            pb-2
            scrollbar-hide
          ">

            {categories.map((item) => {

              const active = activeCategory === item.name;

              return (
                <button
                  key={item.name}
                  onClick={() => setActiveCategory(item.name)}
                  className={`
                    flex
                    items-center
                    gap-2
                    whitespace-nowrap
                    rounded-full
                    border
                    px-4
                    py-2
                    text-sm
                    transition-all
                    duration-300

                    ${
                      active
                        ? "border-purple-500/50 bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-purple-500/20"
                        : "border-white/10 bg-white/[0.04] text-gray-400 hover:border-purple-500/40 hover:bg-white/[0.08] hover:text-white"
                    }
                  `}
                >

                  <span>
                    {item.name}
                  </span>

                  <span
                    className={`
                      rounded-full
                      px-2
                      py-0.5
                      text-xs

                      ${
                        active
                          ? "bg-white/20 text-white"
                          : "bg-white/[0.08] text-gray-500"
                      }
                    `}
                  >
                    {item.count}
                  </span>

                </button>
              );

            })}

          </div>


          {/* ================= FOOTER ================= */}

          <div className="
            mt-5
            text-sm
            text-gray-500
          ">

            Showing{" "}

            <span className="font-semibold text-purple-400">
              {filteredTools.length}
            </span>{" "}

            tools

            {activeCategory !== "All" && (
              <>
                {" "}in{" "}

                <span className="font-semibold text-gray-300">
                  {activeCategory}
                </span>
              </>
            )}

          </div>

        </div>

      </div>

    </section>
  );
}