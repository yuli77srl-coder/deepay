import React, { useState } from "react";
import { 
  Key, Layers, BarChart3, TrendingUp, Search, Plus, 
  Sparkles, Trash2, Globe, ArrowRight, Loader2, HelpCircle 
} from "lucide-react";
import { SEOKeyword } from "../types";

interface KeywordCenterProps {
  keywords: SEOKeyword[];
  onExpandSeed: (seed: string) => Promise<void>;
  onDeleteKeyword: (id: string) => void;
  loading: boolean;
}

export function KeywordCenter({
  keywords,
  onExpandSeed,
  onDeleteKeyword,
  loading: parentLoading
}: KeywordCenterProps) {
  const [seedInput, setSeedInput] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!seedInput.trim()) return;
    setLoading(true);
    try {
      await onExpandSeed(seedInput.trim());
      setSeedInput("");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getDifficultyColor = (diff: number) => {
    if (diff < 30) return "bg-emerald-50 text-emerald-700 border-emerald-100";
    if (diff < 60) return "bg-amber-50 text-amber-700 border-amber-100";
    return "bg-rose-50 text-rose-700 border-rose-100";
  };

  const filteredKeywords = keywords.filter(kw => {
    const matchesCategory = filterCategory === "all" || kw.category === filterCategory;
    const matchesSearch = kw.keyword.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          kw.targetSlug.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Upper header */}
      <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm">
        <h3 className="text-sm font-semibold text-slate-900 font-sans">AI Keyword Research & Core Database</h3>
        <p className="text-xs text-slate-400 mt-1 font-sans">
          Deepay SRL expands generic core terms into localized, industry-specific target nodes that map directly into high-authority cluster pages.
        </p>

        {/* AI expander block */}
        <form onSubmit={handleSubmit} className="mt-5 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Key className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={seedInput}
              disabled={loading || parentLoading}
              onChange={(e) => setSeedInput(e.target.value)}
              placeholder="Enter seed term e.g., 'Retail ERP', 'Supermarket cloud POS', 'Beauty POS'..."
              className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs placeholder:text-slate-400 focus:outline-hidden focus:ring-1 focus:ring-sky-500 transition-all text-slate-800 font-sans"
              id="input-seed-kw"
            />
          </div>
          <button
            type="submit"
            disabled={loading || parentLoading || !seedInput.trim()}
            className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 disabled:cursor-not-allowed text-white rounded-lg flex items-center justify-center gap-2 text-xs font-semibold shadow-xs whitespace-nowrap transition-all"
            id="btn-seed-expand"
          >
            {loading ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                AI Expanding...
              </>
            ) : (
              <>
                <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                Expand Core Keyword
              </>
            )}
          </button>
        </form>

        {loading && (
          <div className="mt-3.5 p-3 bg-indigo-50/50 rounded-lg border border-indigo-100 text-xs text-indigo-700 font-sans flex items-center gap-2 animate-pulse">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600"></span>
            </span>
            <span>Generating keyword variations (Core, Region-targeted, Industry niches, and User questions) using real-time Gemini LLM search-intent graphs...</span>
          </div>
        )}
      </div>

      {/* Main Database Table */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        {/* Table Filters */}
        <div className="p-4 bg-slate-50 border-b border-slate-50 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          <div className="relative max-w-xs w-full">
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search database..."
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-xs placeholder:text-slate-400 focus:outline-hidden focus:ring-1 focus:ring-sky-500 transition-all text-slate-800"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-600 focus:outline-hidden focus:ring-1 focus:ring-sky-500"
            >
              <option value="all">All Intent Categories</option>
              <option value="core">Core Category</option>
              <option value="secondary">Secondary variations</option>
              <option value="long-tail">Long-tail queries</option>
              <option value="question">Question metrics</option>
              <option value="regional">Regional localizer</option>
              <option value="industry">Industry solutions</option>
            </select>
          </div>
        </div>

        {/* Database List */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-55/40 text-slate-500 uppercase tracking-wider border-b border-slate-100 font-mono text-[10px]">
                <th className="py-3.5 px-5 select-none">Keyword Target</th>
                <th className="py-3.5 px-4 select-none">Intent Category</th>
                <th className="py-3.5 px-4 select-none">Search Volume</th>
                <th className="py-3.5 px-4 select-none">SEO Difficulty</th>
                <th className="py-3.5 px-4 select-none">Language</th>
                <th className="py-3.5 px-4 select-none">Target Route (Slug)</th>
                <th className="py-3.5 px-4 select-none text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100/60 font-sans text-slate-700">
              {filteredKeywords.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-slate-400">
                    No keywords matching active filter queries of search criteria. Expand a seed term using the block above to enrich the Database!
                  </td>
                </tr>
              ) : (
                filteredKeywords.map((kw) => (
                  <tr key={kw.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-3.5 px-5 font-semibold text-slate-900 group flex items-center gap-2">
                      <Key className="h-3 w-3 text-slate-300 group-hover:text-amber-500 transition-colors" />
                      {kw.keyword}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-medium border bg-slate-50 text-slate-600 border-slate-100 capitalize">
                        {kw.category}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-600">
                      {kw.searchVolume.toLocaleString()} / mo
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${getDifficultyColor(kw.difficulty)}`}>
                          {kw.difficulty} / 100
                        </span>
                        <div className="w-12 bg-slate-100 h-1 rounded-full overflow-hidden hidden sm:block">
                          <div className={`h-full rounded-full ${
                            kw.difficulty < 30 ? 'bg-emerald-500' : kw.difficulty < 60 ? 'bg-amber-500' : 'bg-rose-500'
                          }`} style={{ width: `${kw.difficulty}%` }}></div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-mono font-medium text-slate-500">
                      <span className="uppercase text-[10px] px-1.5 py-0.5 bg-slate-100 rounded text-slate-600 font-bold border border-slate-150">
                        {kw.language}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[10px] text-sky-650 font-bold">
                      /{kw.targetSlug}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => onDeleteKeyword(kw.id)}
                        className="text-slate-400 hover:text-rose-600 p-1 rounded-md hover:bg-rose-50 transition-colors"
                        title="Delete keyword"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Database Footer Status */}
        <div className="p-3.5 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
          <span>Total registered and crawled keywords: <strong className="text-slate-700">{keywords.length} entries</strong></span>
          <span className="flex items-center gap-1">
            <Globe className="h-3.5 w-3.5 stroke-1" strokeWidth="1.5" /> Global domain target deepay.srl
          </span>
        </div>
      </div>
    </div>
  );
}
