"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { tools, categories } from "@/data/tools"; // path apne project ke hisab se change kar lena

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

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && filteredTools.length > 0) {
      router.push(`/tools/${filteredTools[0].slug}`);
    }
  };

  return (
    <section className="max-w-6xl mx-auto px-4 mt-12">
      <div className="relative rounded-3xl border border-white/20 bg-white/70 backdrop-blur-xl shadow-lg p-6">

        {/* Glow */}
        <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-indigo-200 blur-3xl opacity-40" />
        <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-purple-200 blur-3xl opacity-40" />

        <div className="relative z-10">

          {/* Search */}
          <div className="relative">

            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />

            <input
              type="text"
              placeholder="Search any tool..."
              value={search}
              onChange={handleSearch}
              onKeyDown={handleKeyDown}
              className="w-full h-12 rounded-2xl border border-slate-200 bg-white pl-12 pr-4 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />

            {/* Search Suggestions */}
            {search && (
              <div className="absolute left-0 right-0 mt-2 bg-white border rounded-2xl shadow-2xl overflow-hidden z-50 max-h-80 overflow-y-auto">

                {filteredTools.length > 0 ? (
                  filteredTools.map((tool) => {
                    const Icon = tool.icon;

                    return (
                      <button
                        key={tool.id}
                        onClick={() => router.push(`/tools/${tool.slug}`)}
                        className="w-full flex items-center gap-4 px-5 py-4 hover:bg-indigo-50 transition text-left border-b last:border-0"
                      >
                        <div className="h-10 w-10 rounded-xl bg-indigo-100 flex items-center justify-center">
                          <Icon className="h-5 w-5 text-indigo-600" />
                        </div>

                        <div className="flex-1">
                          <h4 className="font-semibold text-slate-800">
                            {tool.title}
                          </h4>

                          <p className="text-xs text-slate-500 line-clamp-1">
                            {tool.desc}
                          </p>
                        </div>

                        <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">
                          {tool.category}
                        </span>
                      </button>
                    );
                  })
                ) : (
                  <div className="py-8 text-center text-slate-500">
                    No Tool Found 😔
                  </div>
                )}

              </div>
            )}
          </div>

          {/* Categories */}
          <div className="mt-6 flex gap-2 overflow-x-auto scrollbar-hide pb-2">
            {categories.map((item) => {
              const active = activeCategory === item.name;

              return (
                <button
                  key={item.name}
                  onClick={() => setActiveCategory(item.name)}
                  className={`flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-sm transition ${
                    active
                      ? "bg-indigo-600 text-white"
                      : "bg-white border border-slate-200 hover:border-indigo-400 hover:text-indigo-600"
                  }`}
                >
                  <span>{item.name}</span>

                  <span
                    className={`rounded-full px-2 py-0.5 text-xs ${
                      active
                        ? "bg-white/20"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {item.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Footer */}
          <div className="mt-4 text-sm text-slate-500">
            Showing{" "}
            <span className="font-semibold text-indigo-600">
              {filteredTools.length}
            </span>{" "}
            tools
            {activeCategory !== "All" && (
              <>
                {" "}
                in{" "}
                <span className="font-semibold">{activeCategory}</span>
              </>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}