"use client";

import React, { useState } from "react";
import { ArrowRightIcon } from "lucide-react";
import Modal from "@/component/Modal";

export default function ModalExamplePage() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isNestedModalOpen, setNestedModalOpen] = useState(false);

  const modals = [
    {
      title: "Open Modal",
      description: "Opens the main modal window",
      action: () => setModalOpen(true),
    },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col items-center p-6">
      <main className="w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-2">Modal Component</h1>
        <p className="text-gray-600 mb-12">
          A modal component with nested modal support.
        </p>

        <div className="space-y-4 flex flex-col">
          {modals.map((modal, index) => (
            <button
              key={index}
              onClick={modal.action}
              className="p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-all hover:shadow-sm text-left"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-medium">{modal.title}</h2>
                  <p className="text-sm text-gray-500 mt-1">
                    {modal.description}
                  </p>
                </div>
                <ArrowRightIcon size={18} className="text-gray-400" />
              </div>
            </button>
          ))}
        </div>
      </main>

      {/* Main Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <h2 className="text-xl font-semibold mb-4">Main Modal</h2>
        <p className="text-gray-600 mb-6">
          This is the main modal. You can open a nested modal from here.
        </p>
        <button
          onClick={() => setNestedModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Open Nested Modal
        </button>

        {/* Nested Modal */}
        <Modal
          isOpen={isNestedModalOpen}
          onClose={() => setNestedModalOpen(false)}
        >
          <h2 className="text-xl font-semibold mb-4">Nested Modal</h2>
          <p className="text-gray-600 mb-6">
            This is a nested modal inside the main modal.
          </p>
          <button
            onClick={() => setNestedModalOpen(false)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Close Nested Modal
          </button>
        </Modal>
      </Modal>
    </div>
  );
}
