"use client";
import React from "react";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

export default function Home() {
  const projects = [
    {
      title: "Debounced Search",
      description: "GitHub repository search with debounced input",
      path: "/debounced",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col items-center  p-6">
      <main className="w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-2">Machine-Coding</h1>

        <p className="text-gray-600 mb-12">
          A collection of common frontend implementation patterns.
        </p>

        <div className="space-y-4">
          {projects.map((project, index) => (
            <Link key={index} href={project.path}>
              <div className="p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-all hover:shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-medium">{project.title}</h2>
                    <p className="text-sm text-gray-500 mt-1">
                      {project.description}
                    </p>
                  </div>
                  <ArrowRightIcon size={18} className="text-gray-400" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
