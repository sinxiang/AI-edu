"use client";

import { useState } from "react";
import {
  ZoomIn,
  ZoomOut,
  ChevronLeft,
  ChevronRight,
  Download,
  Bookmark,
  Highlighter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PdfReaderProps {
  onTextSelect: (text: string) => void;
}

const mockPdfContent = [
  {
    type: "title",
    content: "Attention Is All You Need",
  },
  {
    type: "authors",
    content:
      "Ashish Vaswani, Noam Shazeer, Niki Parmar, Jakob Uszkoreit, Llion Jones, Aidan N. Gomez, Lukasz Kaiser, Illia Polosukhin",
  },
  {
    type: "abstract",
    content:
      "The dominant sequence transduction models are based on complex recurrent or convolutional neural networks that include an encoder and a decoder. The best performing models also connect the encoder and decoder through an attention mechanism. We propose a new simple network architecture, the Transformer, based solely on attention mechanisms, dispensing with recurrence and convolutions entirely.",
  },
  {
    type: "heading",
    content: "1 Introduction",
  },
  {
    type: "paragraph",
    content:
      "Recurrent neural networks, long short-term memory and gated recurrent neural networks in particular, have been firmly established as state of the art approaches in sequence modeling and transduction problems such as language modeling and machine translation. Numerous efforts have since continued to push the boundaries of recurrent language models and encoder-decoder architectures.",
  },
  {
    type: "paragraph",
    content:
      "Recurrent models typically factor computation along the symbol positions of the input and output sequences. Aligning the positions to steps in computation time, they generate a sequence of hidden states ht, as a function of the previous hidden state ht−1 and the input for position t. This inherently sequential nature precludes parallelization within training examples, which becomes critical at longer sequence lengths, as memory constraints limit batching across examples.",
  },
  {
    type: "heading",
    content: "2 Background",
  },
  {
    type: "paragraph",
    content:
      "The goal of reducing sequential computation also forms the foundation of the Extended Neural GPU, ByteNet and ConvS2S, all of which use convolutional neural networks as basic building block, computing hidden representations in parallel for all input and output positions. In these models, the number of operations required to relate signals from two arbitrary input or output positions grows in the distance between positions, linearly for ConvS2S and logarithmically for ByteNet.",
  },
];

export function PdfReader({ onTextSelect }: PdfReaderProps) {
  const [zoom, setZoom] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedText, setSelectedText] = useState("");
  const totalPages = 15;

  const handleTextSelection = () => {
    const selection = window.getSelection();
    if (selection && selection.toString().trim()) {
      const text = selection.toString().trim();
      setSelectedText(text);
      onTextSelect(text);
    }
  };

  return (
    <div className="flex h-full flex-col">
      {/* PDF Toolbar */}
      <div className="flex items-center justify-between border-b border-border bg-card px-4 py-2">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm text-foreground">
            {currentPage} / {totalPages}
          </span>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setZoom(Math.max(50, zoom - 10))}
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          <span className="min-w-[60px] text-center text-sm text-foreground">
            {zoom}%
          </span>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setZoom(Math.min(200, zoom + 10))}
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Highlighter className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Bookmark className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* PDF Content Area */}
      <div className="flex-1 overflow-y-auto bg-secondary/20 p-8">
        <div
          className="mx-auto max-w-3xl rounded-lg bg-white p-12 text-slate-900 shadow-xl"
          style={{ transform: `scale(${zoom / 100})`, transformOrigin: "top center" }}
          onMouseUp={handleTextSelection}
        >
          {mockPdfContent.map((block, index) => {
            switch (block.type) {
              case "title":
                return (
                  <h1
                    key={index}
                    className="mb-4 text-center text-2xl font-bold"
                  >
                    {block.content}
                  </h1>
                );
              case "authors":
                return (
                  <p
                    key={index}
                    className="mb-6 text-center text-sm text-slate-600"
                  >
                    {block.content}
                  </p>
                );
              case "abstract":
                return (
                  <div key={index} className="mb-6">
                    <h2 className="mb-2 text-lg font-semibold">Abstract</h2>
                    <p
                      className={cn(
                        "text-sm leading-relaxed text-slate-700",
                        selectedText && block.content.includes(selectedText)
                          ? "bg-yellow-200"
                          : ""
                      )}
                    >
                      {block.content}
                    </p>
                  </div>
                );
              case "heading":
                return (
                  <h2 key={index} className="mb-3 mt-6 text-lg font-semibold">
                    {block.content}
                  </h2>
                );
              case "paragraph":
                return (
                  <p
                    key={index}
                    className={cn(
                      "mb-4 text-sm leading-relaxed text-slate-700",
                      selectedText && block.content.includes(selectedText)
                        ? "bg-yellow-200"
                        : ""
                    )}
                  >
                    {block.content}
                  </p>
                );
              default:
                return null;
            }
          })}
        </div>
      </div>
    </div>
  );
}
