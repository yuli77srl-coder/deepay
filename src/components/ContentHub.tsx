import React, { useState } from "react";
import { 
  Sparkles, FileText, CheckCircle2, Globe, ArrowRight, Trash2, 
  Settings, Eye, SearchCode, Database, Code, Shield, Cpu, RefreshCcw, 
  HelpCircle, ChevronRight, FileCode, CheckSquare, PlusSquare, AlertTriangle, AlertCircle
} from "lucide-react";
import { SEOPage, SEOKeyword } from "../types";

interface ContentHubProps {
  pages: SEOPage[];
  keywords: SEOKeyword[];
  onGeneratePage: (keywordId: string) => Promise<void>;
  onDeletePage: (id: string) => void;
  loading: boolean;
}

export function ContentHub({
  pages,
  keywords,
  onGeneratePage,
  onDeletePage,
  loading
}: ContentHubProps) {
  const [selectedPageId, setSelectedPageId] = useState<string>(pages[0]?.id || "");
  const [activeLang, setActiveLang] = useState<'en' | 'it' | 'zh'>('en');
  const [keywordToGenerate, setKeywordToGenerate] = useState<string>("");
  const [generationStep, setGenerationStep] = useState<string>("");

  // Scalable Filter and Pagination states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Filter pages lists
  const filteredPages = pages.filter(p => {
    const matchesSearch = searchQuery === "" || 
      p.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.city && p.city.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (p.country && p.country.toLowerCase().includes(searchQuery.toLowerCase())) ||
      p.languages.en.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.languages.zh && p.languages.zh.title && p.languages.zh.title.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesIndustry = selectedIndustry === "" || p.industry === selectedIndustry;
    const matchesCountry = selectedCountry === "" || p.country === selectedCountry;

    return matchesSearch && matchesIndustry && matchesCountry;
  });

  const totalFilteredCount = filteredPages.length;
  const totalPages = Math.ceil(totalFilteredCount / itemsPerPage) || 1;
  
  // Safe page index clamps
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const indexOfLastItem = safeCurrentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPages.slice(indexOfFirstItem, indexOfLastItem);

  const activePage = pages.find(p => p.id === selectedPageId) || filteredPages[0] || pages[0];

  // Exclude keywords that already have a page under the same slug
  const availableKeywords = keywords.filter(k => {
    return !pages.some(p => p.keywordId === k.id);
  });

  const handleCreateDraft = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!keywordToGenerate) return;
    setGenerationStep("Analyzing target query intent...");
    try {
      setTimeout(() => setGenerationStep("Fusing POS terminal and local Italian billing compliances..."), 1200);
      setTimeout(() => setGenerationStep("Compiling SEO meta, hreflang alternates, and Graph schemas..."), 2600);
      setTimeout(() => setGenerationStep("Indexing XML sitemaps internally..."), 4200);
      
      await onGeneratePage(keywordToGenerate);
      setKeywordToGenerate("");
    } catch (err) {
      console.error(err);
    } finally {
      setGenerationStep("");
    }
  };

  const getLanguageTag = (lang: string) => {
    switch (lang) {
      case 'en': return "🇬🇧 English";
      case 'it': return "🇮🇹 Italiano";
      case 'zh': return "🇨🇳 中文 (Chinese)";
      default: return lang;
    }
  };

  return (
    <div className="space-y-6">
      {/* Draft generator header */}
      <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm">
        <h3 className="text-sm font-semibold text-slate-900 font-sans">Automatic Content Hub & Local Landing Page Generator</h3>
        <p className="text-xs text-slate-400 mt-1 font-sans">
          Deepay SRL utilizes advanced multimodal AI generation, compiling high-authority comparative copy natively written and localized in multiple languages.
        </p>

        {/* New Page Generator trigger */}
        <form onSubmit={handleCreateDraft} className="mt-5 flex flex-col sm:flex-row gap-3">
          <select
            value={keywordToGenerate}
            disabled={loading || !!generationStep}
            onChange={(e) => setKeywordToGenerate(e.target.value)}
            className="flex-1 px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-hidden focus:ring-1 focus:ring-sky-500 font-sans"
            id="select-target-kw"
          >
            <option value="">-- Choose Awaiting Keyword from Core Database --</option>
            {availableKeywords.length === 0 ? (
              <option disabled>No pending keywords. Seed more in Keyword Center first.</option>
            ) : (
              availableKeywords.map((k) => (
                <option key={k.id} value={k.id}>
                  [{k.language.toUpperCase()}] {k.keyword} - Slug: /{k.targetSlug} (Vol: {k.searchVolume})
                </option>
              ))
            )}
          </select>
          <button
            type="submit"
            disabled={loading || !!generationStep || !keywordToGenerate}
            className="px-5 py-2.5 bg-sky-600 hover:bg-sky-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white rounded-lg flex items-center justify-center gap-2 text-xs font-semibold shadow-xs whitespace-nowrap transition-all"
            id="btn-generate-content"
          >
            {generationStep ? (
              <>
                <RefreshCcw className="h-3.5 w-3.5 animate-spin" />
                AI Compiling...
              </>
            ) : (
              <>
                <Sparkles className="h-3.5 w-3.5 text-amber-300" />
                Create Deepay Page
              </>
            )}
          </button>
        </form>

        {generationStep && (
          <div className="mt-3.5 p-3.5 bg-sky-50/50 rounded-lg border border-sky-100 text-xs text-sky-700 font-mono flex items-center gap-2 animate-pulse">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-600"></span>
            </span>
            <span>
              <strong>Deepay AI pipeline executing:</strong> {generationStep}
            </span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side: Pages Directory */}
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-xl border border-slate-150/50 shadow-xs space-y-3">
            <span className="text-[10px] pb-1 border-b border-slate-50 font-bold uppercase tracking-wider text-slate-500 block text-left">Directory Navigator</span>
            
            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search slug, city, title..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-[11px] text-slate-850 placeholder-slate-400 font-sans focus:outline-hidden focus:ring-1 focus:ring-sky-500 text-left"
              />
              <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400">
                <SearchCode className="h-3.5 w-3.5" />
              </span>
            </div>

            {/* Industry Filter */}
            <div className="grid grid-cols-2 gap-2 text-left">
              <select
                value={selectedIndustry}
                onChange={(e) => {
                  setSelectedIndustry(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-2 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-[10px] text-slate-600 font-sans focus:outline-hidden"
              >
                <option value="">All Sectors</option>
                <option value="Restaurant">Restaurant</option>
                <option value="Retail">Retail</option>
                <option value="Fashion">Fashion</option>
                <option value="Wholesale">Wholesale</option>
                <option value="Beauty">Beauty</option>
                <option value="Hotel">Hotel</option>
                <option value="Logistics">Logistics</option>
              </select>

              {/* Country Filter */}
              <select
                value={selectedCountry}
                onChange={(e) => {
                  setSelectedCountry(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-2 py-1.5 bg-slate-50 border border-slate-205 rounded-lg text-[10px] text-slate-600 font-sans focus:outline-hidden"
              >
                <option value="">All Countries</option>
                <option value="Italy">Italy</option>
                <option value="France">France</option>
                <option value="Germany">Germany</option>
                <option value="Spain">Spain</option>
                <option value="Netherlands">Netherlands</option>
                <option value="Belgium">Belgium</option>
              </select>
            </div>

            {/* Active pages summary */}
            <div className="flex justify-between items-center text-[10px] text-slate-450 font-mono py-1 border-t border-slate-100">
              <span>Matching: <strong>{totalFilteredCount}</strong> / {pages.length}</span>
              {searchQuery || selectedIndustry || selectedCountry ? (
                <button 
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedIndustry("");
                    setSelectedCountry("");
                    setCurrentPage(1);
                  }}
                  className="text-sky-600 underline font-bold cursor-pointer"
                >
                  Clear Filters
                </button>
              ) : null}
            </div>
          </div>

          <div className="space-y-3">
            {totalFilteredCount === 0 ? (
              <div className="bg-white p-6 border border-slate-100 rounded-xl text-center text-xs text-slate-400 font-sans shadow-xs">
                No matching directory nodes meet selected criteria.
              </div>
            ) : (
              currentItems.map((p) => {
                const active = selectedPageId === p.id;
                return (
                  <div
                    key={p.id}
                    className={`p-3.5 bg-white border rounded-xl flex items-center justify-between text-xs transition-all pointer-events-auto text-left ${
                      active ? 'border-sky-500 shadow-md ring-1 ring-sky-500/20 bg-sky-50/10' : 'border-slate-100 hover:bg-slate-50/50 shadow-xs'
                    }`}
                  >
                    <button
                      onClick={() => {
                        setSelectedPageId(p.id);
                        setActiveLang('en');
                      }}
                      className="flex-1 text-left min-w-0 cursor-pointer"
                    >
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="px-1.5 py-0.1 bg-indigo-50 border border-indigo-100 text-indigo-700 rounded text-[8.5px] uppercase font-bold font-mono">
                          {p.industry}
                        </span>
                        {p.country && (
                          <span className="px-1 py-0.1 bg-emerald-50 border border-emerald-100 text-emerald-800 rounded text-[8.5px] font-bold font-sans">
                            {p.country}
                          </span>
                        )}
                        <span className="text-[10px] text-slate-400 font-mono font-medium">
                          EN, IT, ZH
                        </span>
                      </div>
                      <h4 className="font-bold text-slate-900 mt-2 hover:text-sky-600 transition-colors line-clamp-1 min-w-0" title={p.languages.en.title}>
                        {p.languages.en.title}
                      </h4>
                      <span className="text-[10px] text-sky-650 font-mono block mt-1 truncate">
                        /{p.slug}
                      </span>
                    </button>
                    <button
                      onClick={() => {
                        onDeletePage(p.id);
                        if (selectedPageId === p.id) {
                          setSelectedPageId(pages.find(curr => curr.id !== p.id)?.id || "");
                        }
                      }}
                      className="text-slate-300 hover:text-rose-500 p-1.5 hover:bg-rose-50/50 rounded-lg transition-colors ml-2 shrink-0 cursor-pointer"
                      title="Delete Page Draft"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                );
              })
            )}

            {/* Pagination controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between p-3.5 bg-white border border-slate-100 rounded-xl text-xs font-mono shadow-xs mt-1">
                <button
                  disabled={safeCurrentPage === 1}
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  className="px-2.5 py-1 bg-slate-50 border border-slate-200 text-slate-600 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed font-bold hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  &larr; Prev
                </button>
                <span className="text-[11px] text-slate-400">
                  Page <strong className="text-slate-700">{safeCurrentPage}</strong> of {totalPages}
                </span>
                <button
                  disabled={safeCurrentPage === totalPages}
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  className="px-2.5 py-1 bg-slate-50 border border-slate-205 text-slate-600 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed font-bold hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Next &rarr;
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Tabbed Multi-language page previews + SEO Metadata panel */}
        <div className="lg:col-span-2 space-y-6">
          {activePage ? (
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
              {/* Copy preview */}
              <div className="xl:col-span-2 bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden flex flex-col justify-between">
                {/* Header languaging toggles */}
                <div className="p-4 bg-slate-50 border-b border-slate-150/40 flex items-center justify-between">
                  <span className="text-xs font-bold font-mono text-slate-400 capitalize">Page Preview Copy</span>
                  <div className="flex bg-slate-200/80 p-0.5 rounded-lg text-[10px] font-bold">
                    {(['en', 'it', 'zh'] as const).map((lang) => (
                      <button
                        key={lang}
                        onClick={() => setActiveLang(lang)}
                        className={`px-2.5 py-1 rounded-md transition-all ${activeLang === lang ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'}`}
                      >
                        {lang.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Actual rendering paper */}
                <div className="p-6 space-y-5 h-[440px] overflow-y-auto">
                  {/* Title & header */}
                  <div className="pb-4 border-b border-slate-100">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-sky-600 block mb-1">
                      {getLanguageTag(activeLang)}
                    </span>
                    <h1 className="text-lg font-bold text-slate-950 font-sans tracking-tight">
                      {activePage.languages[activeLang]?.title || activePage.metadata.h1}
                    </h1>
                    <p className="text-xs text-slate-500 mt-1 italic">
                      {activePage.languages[activeLang]?.subtitle}
                    </p>
                  </div>

                  {/* Intro paragraph */}
                  <p className="text-xs text-slate-600 leading-relaxed font-sans mt-3">
                    {activePage.languages[activeLang]?.introduction}
                  </p>

                  {/* Displaying sections */}
                  {activePage.languages[activeLang]?.sections?.map((sec, idx) => (
                    <div key={idx} className="space-y-2 mt-5">
                      <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide border-l-2 border-indigo-500 pl-2">
                        {sec.heading}
                      </h3>
                      {sec.paragraphs.map((pText, pIdx) => (
                        <p key={pIdx} className="text-xs text-slate-600 leading-relaxed font-sans pl-2.5">
                          {pText}
                        </p>
                      ))}
                      {sec.bullets && sec.bullets.length > 0 && (
                        <ul className="list-disc pl-7 text-[11px] text-slate-650 space-y-1 py-1.5">
                          {sec.bullets.map((bItem, bIdx) => <li key={bIdx}>{bItem}</li>)}
                        </ul>
                      )}
                    </div>
                  ))}

                  {/* Table Comparison if available */}
                  {activePage.languages[activeLang]?.tableComparison && (
                    <div className="mt-6 border border-slate-100 rounded-lg overflow-hidden text-[11px]">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-slate-50 border-b border-slate-100 font-mono text-[9px] font-bold text-slate-500 uppercase tracking-wider">
                            {activePage.languages[activeLang].tableComparison.headers.map((h, i) => (
                              <th key={i} className="py-2 px-3">{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-slate-600 font-sans">
                          {activePage.languages[activeLang].tableComparison.rows.map((r, rIdx) => (
                            <tr key={rIdx} className="hover:bg-slate-50/50">
                              {r.map((cell, cIdx) => (
                                <td key={cIdx} className="py-2.5 px-3 font-medium">{cell}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* Display FAQ inside Preview */}
                  <div className="pt-6 border-t border-slate-100 space-y-3.5">
                    <h3 className="text-xs font-bold text-slate-900 flex items-center gap-1.5 uppercase font-mono tracking-wider text-slate-450">
                      Question and Answers FAQ Page Blocks
                    </h3>
                    {activePage.languages[activeLang]?.faq?.map((fItem, fIdx) => (
                      <div key={fIdx} className="p-3 bg-slate-50 border border-slate-100 rounded-lg space-y-1">
                        <h4 className="font-bold text-slate-900 text-xs">Q: {fItem.question}</h4>
                        <p className="text-slate-600 text-xs pl-4">A: {fItem.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer conversion component preview block */}
                <div className="p-3 bg-gradient-to-r from-sky-50 to-indigo-50 border-t border-slate-100 text-center text-slate-600 flex items-center justify-between px-5 font-sans">
                  <span className="text-[11px] font-bold text-slate-800">Mockup Public Call-To-Action form embedded</span>
                  <div className="flex gap-2">
                    <span className="text-[10px] px-2 py-0.5 bg-sky-200 border border-sky-300 text-sky-800 font-bold rounded-md">Demo Booking widget</span>
                    <span className="text-[10px] px-2 py-0.5 bg-emerald-200 border border-emerald-300 text-emerald-800 font-bold rounded-md">WhatsApp click</span>
                  </div>
                </div>
              </div>

              {/* Side bar SEO Tags / JSON-LD / Hreflang details */}
              <div className="space-y-4">
                {/* Meta details panel */}
                <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm space-y-3.5 text-xs text-slate-700">
                  <div className="pb-2 border-b border-slate-50 font-bold text-slate-800 flex items-center gap-1.5">
                    <Settings className="h-4 w-4 text-sky-500" /> SEO Technical Tags
                  </div>
                  <div>
                    <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-slate-400 block mb-0.5">Title Tag (<strong className="text-slate-800">Head</strong>)</span>
                    <p className="font-semibold text-slate-900 font-sans border-l-2 border-indigo-400 pl-2 leading-tight">{activePage.metadata.title}</p>
                  </div>
                  <div>
                    <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-slate-400 block mb-0.5">Meta Description Tag</span>
                    <p className="text-slate-600 leading-normal pl-2 border-l-2 border-sky-400 font-sans">{activePage.metadata.description}</p>
                  </div>
                  <div>
                    <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-slate-400 block mb-0.5">Relative Canonical Slug</span>
                    <p className="font-mono text-[10px] text-sky-700 font-semibold truncate bg-slate-50 px-2 py-1 rounded">/{activePage.slug}</p>
                  </div>
                  <div>
                    <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-slate-400 block mb-0.5">Media ALT parameter text</span>
                    <p className="text-slate-600 text-[11px] font-medium leading-tight">{activePage.metadata.imageAlt || "Missing ALT tag instructions"}</p>
                  </div>
                </div>

                {/* AI Search Engine Optimizer report Card */}
                <div className="bg-slate-900 border border-slate-800 text-slate-100 p-4 rounded-xl shadow-sm space-y-3">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                    <span className="text-[10px] font-sans font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                      <Cpu className="h-3.5 w-3.5 text-emerald-400" /> AI Retrieval Index
                    </span>
                    <span className="px-2 py-0.5 bg-emerald-500 text-slate-950 font-mono font-bold rounded text-[9px]">10 / 10 OPTIMAL</span>
                  </div>
                  <div className="space-y-2.5 text-[11px] leading-relaxed">
                    <p className="text-slate-350 font-sans text-slate-300">
                      ChatGPT, Gemini & Perplexity prioritize structured answers. This page carries optimization parameters:
                    </p>
                    <div className="space-y-1.5 font-sans font-medium text-slate-400">
                      <div className="flex items-center gap-1.5 text-emerald-400 text-xs">
                        <CheckSquare className="h-3.5 w-3.5 shrink-0" />
                        <span>FAQ schema blocks matching</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-emerald-400 text-xs">
                        <CheckSquare className="h-3.5 w-3.5 shrink-0" />
                        <span>Comparison tables registered</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-emerald-400 text-xs">
                        <CheckSquare className="h-3.5 w-3.5 shrink-0" />
                        <span>Strict hreflang language nodes</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Language hreflangs alternate maps */}
                <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm space-y-3.5 text-[11px]">
                  <div className="pb-2 border-b border-slate-50 font-bold text-slate-800 flex items-center gap-1.5 text-xs">
                    <Globe className="h-4 w-4 text-emerald-500" /> Hreflangs Alternates
                  </div>
                  <div className="space-y-2 font-mono text-[10px] text-slate-500 truncate">
                    <div>
                      <span className="font-sans font-bold text-slate-400 uppercase text-[9px] block">English default: en</span>
                      <span className="text-slate-700 bg-slate-50 px-1.5 py-0.5 rounded truncate block mt-0.5">href="{activePage.metadata.hreflang.en}"</span>
                    </div>
                    <div>
                      <span className="font-sans font-bold text-slate-400 uppercase text-[9px] block">Italian: it</span>
                      <span className="text-slate-700 bg-slate-50 px-1.5 py-0.5 rounded truncate block mt-0.5">href="{activePage.metadata.hreflang.it}"</span>
                    </div>
                    <div>
                      <span className="font-sans font-bold text-slate-400 uppercase text-[9px] block">Chinese local: zh</span>
                      <span className="text-slate-700 bg-slate-50 px-1.5 py-0.5 rounded truncate block mt-0.5">href="{activePage.metadata.hreflang.zh}"</span>
                    </div>
                  </div>
                </div>

                {/* Schema Markup viewer */}
                <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm space-y-2">
                  <div className="pb-2 border-b border-slate-50 font-bold text-slate-800 flex items-center gap-1.5 text-xs">
                    <FileCode className="h-4 w-4 text-purple-500" /> JSON-LD Schema
                  </div>
                  <div className="max-h-[160px] overflow-y-auto bg-slate-950 text-emerald-400 p-2.5 rounded-lg font-mono text-[10px] leading-tight select-all">
                    {activePage.metadata.jsonLdSchema}
                  </div>
                  <span className="text-[10px] text-slate-400 font-sans block pt-1 leading-tight">
                    This Graph schema merges <strong>Organization</strong>, <strong>BreadcrumbList</strong>, and <strong>FAQPage</strong> schemas into one request to limit script blocks.
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-20 text-slate-400 bg-white border border-slate-100 rounded-xl shadow-sm text-xs font-sans">
              Select or generate a landing page draft from the directory to review structures.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
