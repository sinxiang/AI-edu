"use client";

import { useState } from "react";
import { Search, Filter, ExternalLink, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface SearchResult {
  id: string;
  title: string;
  authors: string;
  abstract: string;
  year: number;
  citations: number;
  source: string;
}

const mockResults: SearchResult[] = [
  {
    id: "1",
    title: "Attention is All You Need",
    authors: "Vaswani, A., Shazeer, N., Parmar, N., et al.",
    abstract:
      "The dominant sequence transduction models are based on complex recurrent or convolutional neural networks that include an encoder and a decoder. The best performing models also connect the encoder and decoder through an attention mechanism...",
    year: 2017,
    citations: 85000,
    source: "arXiv",
  },
  {
    id: "2",
    title: "BERT: Pre-training of Deep Bidirectional Transformers",
    authors: "Devlin, J., Chang, M., Lee, K., et al.",
    abstract:
      "We introduce a new language representation model called BERT, which stands for Bidirectional Encoder Representations from Transformers. Unlike recent language representation models, BERT is designed to pre-train deep bidirectional representations...",
    year: 2019,
    citations: 62000,
    source: "arXiv",
  },
  {
    id: "3",
    title: "Deep Residual Learning for Image Recognition",
    authors: "He, K., Zhang, X., Ren, S., Sun, J.",
    abstract:
      "Deeper neural networks are more difficult to train. We present a residual learning framework to ease the training of networks that are substantially deeper than those used previously...",
    year: 2016,
    citations: 120000,
    source: "IEEE",
  },
];

const fields = ["CS", "医学", "工程", "物理", "生物"];
const databases = ["IEEE", "Springer", "arXiv", "PubMed"];

export function LiteratureSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFields, setSelectedFields] = useState<string[]>(["CS"]);
  const [selectedDatabases, setSelectedDatabases] = useState<string[]>([
    "arXiv",
  ]);
  const [yearRange, setYearRange] = useState([2010, 2024]);
  const [showFilters, setShowFilters] = useState(false);

  const toggleField = (field: string) => {
    setSelectedFields((prev) =>
      prev.includes(field) ? prev.filter((f) => f !== field) : [...prev, field]
    );
  };

  const toggleDatabase = (db: string) => {
    setSelectedDatabases((prev) =>
      prev.includes(db) ? prev.filter((d) => d !== db) : [...prev, db]
    );
  };

  return (
    <div className="flex h-full flex-col">
      {/* Search Header */}
      <div className="border-b border-border p-6">
        <h1 className="mb-4 text-2xl font-bold text-foreground">文献检索</h1>

        {/* Search Box */}
        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="搜索文献、论文、专利..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-12 pl-12 pr-4 text-base"
          />
        </div>

        {/* Filter Toggle */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowFilters(!showFilters)}
          className="mb-4 gap-2 bg-transparent"
        >
          <Filter className="h-4 w-4" />
          高级筛选
        </Button>

        {/* Filters */}
        {showFilters && (
          <div className="space-y-4 rounded-lg bg-secondary/30 p-4">
            {/* Field Selection */}
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">
                学科领域
              </label>
              <div className="flex flex-wrap gap-2">
                {fields.map((field) => (
                  <button
                    key={field}
                    type="button"
                    onClick={() => toggleField(field)}
                    className={cn(
                      "rounded-full px-4 py-1.5 text-sm font-medium transition-all",
                      selectedFields.includes(field)
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                    )}
                  >
                    {field}
                  </button>
                ))}
              </div>
            </div>

            {/* Year Range */}
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">
                年份范围: {yearRange[0]} - {yearRange[1]}
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="1990"
                  max="2024"
                  value={yearRange[0]}
                  onChange={(e) =>
                    setYearRange([Number(e.target.value), yearRange[1]])
                  }
                  className="h-2 flex-1 cursor-pointer appearance-none rounded-lg bg-secondary"
                />
                <input
                  type="range"
                  min="1990"
                  max="2024"
                  value={yearRange[1]}
                  onChange={(e) =>
                    setYearRange([yearRange[0], Number(e.target.value)])
                  }
                  className="h-2 flex-1 cursor-pointer appearance-none rounded-lg bg-secondary"
                />
              </div>
            </div>

            {/* Database Selection */}
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">
                数据库
              </label>
              <div className="flex flex-wrap gap-3">
                {databases.map((db) => (
                  <label key={db} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedDatabases.includes(db)}
                      onChange={() => toggleDatabase(db)}
                      className="h-4 w-4 rounded border-border bg-secondary text-primary"
                    />
                    <span className="text-sm text-foreground">{db}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Search Results */}
      <div className="flex-1 overflow-y-auto p-6">
        <p className="mb-4 text-sm text-muted-foreground">
          找到 {mockResults.length} 条结果
        </p>

        <div className="space-y-4">
          {mockResults.map((result) => (
            <div
              key={result.id}
              className="rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/50 hover:bg-card/80"
            >
              <div className="mb-2 flex items-start justify-between">
                <h3 className="flex-1 text-lg font-semibold text-foreground hover:text-primary">
                  {result.title}
                </h3>
                <span className="ml-2 rounded-full bg-secondary px-2 py-0.5 text-xs text-muted-foreground">
                  {result.source}
                </span>
              </div>

              <p className="mb-2 text-sm text-muted-foreground">
                {result.authors}
              </p>

              <p className="mb-3 line-clamp-2 text-sm text-foreground/80">
                {result.abstract}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>{result.year}</span>
                  <span className="flex items-center gap-1">
                    <Quote className="h-3 w-3" />
                    {result.citations.toLocaleString()} 引用
                  </span>
                </div>

                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" className="gap-1 text-xs">
                    <ExternalLink className="h-3 w-3" />
                    查看
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1 bg-transparent text-xs"
                  >
                    收藏
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
