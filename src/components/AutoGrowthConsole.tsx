import React, { useState } from "react";
import { 
  Rocket, CheckCircle2, AlertCircle, Play, ChevronRight, Zap, 
  Sparkles, Layers, Award, Target, HelpCircle, ArrowUpRight, Check,
  Workflow, Globe
} from "lucide-react";
import { GrowthMilestone, SEOPage } from "../types";

interface AutoGrowthConsoleProps {
  milestones: GrowthMilestone[];
  pages: SEOPage[];
  onTriggerOptimize: (type: string) => Promise<any>;
  onTriggerBulkSeed: () => Promise<any>;
  loading: boolean;
}

export function AutoGrowthConsole({
  milestones,
  pages,
  onTriggerOptimize,
  onTriggerBulkSeed,
  loading
}: AutoGrowthConsoleProps) {
  const [selectedOpp, setSelectedOpp] = useState<string | null>(null);
  const [optimizingId, setOptimizingId] = useState<string | null>(null);
  const [successInfo, setSuccessInfo] = useState<{ message: string; page?: SEOPage } | null>(null);
  const [bulkSeeding, setBulkSeeding] = useState(false);
  const [bulkResult, setBulkResult] = useState<any | null>(null);

  // Growth checklist opportunities
  const opportunities = [
    {
      id: "wallet",
      title: "Digital Wallet Integration for Europe",
      description: "No optimized landing exists for 'Deepay Digital Wallet Payment Rates Europe' in Italiano/Chinese.",
      impact: "High",
      volume: 8500,
      difficulty: "Medium",
      phase: 2,
      slug: "payment/digital-wallet-solutions"
    },
    {
      id: "one_click",
      title: "One Click Store Cloud POS Terminals",
      description: "Target high-intent Chinese businesses shifting stores online with '一键出海开店物联收银' index nodes.",
      impact: "High",
      volume: 6200,
      difficulty: "Low",
      phase: 2,
      slug: "one-click-store-terminals"
    },
    {
      id: "chinese_hub",
      title: "European Chinese Business Hub Network",
      description: "Auto-linker map lacks general resources page 'B2B European Chinese Business Network ERP'.",
      impact: "Medium",
      volume: 4100,
      difficulty: "Low",
      phase: 3,
      slug: "european-chinese-business-hub"
    },
    {
      id: "city_prato",
      title: "Prato Fashion Wholesale Local Target",
      description: "Missing dedicated city-page for Italian fashion capital: /italy/prato/fashion-wholesale-erp.",
      impact: "High",
      volume: 5300,
      difficulty: "Low",
      phase: 3,
      slug: "italy/prato/fashion-wholesale-erp"
    },
    {
      id: "fashion_news",
      title: "European Fashion VAT Regulations ERP Guideline",
      description: "No informative content hub for VAT tax reporting updates in Italian and Chinese style sheets.",
      impact: "Medium",
      volume: 3200,
      difficulty: "Medium",
      phase: 3,
      slug: "news/european-fashion-vat-guidelines"
    }
  ];

  const handleBuild = async (oppId: string) => {
    setOptimizingId(oppId);
    setSuccessInfo(null);
    try {
      const data = await onTriggerOptimize(oppId);
      if (data && data.success) {
        setSuccessInfo({
          message: data.message || "Successfully deployed SEO optimized multilingual cluster landings!",
          page: data.page
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setOptimizingId(null);
    }
  };

  const handleBulkSeeding = async () => {
    setBulkSeeding(true);
    setBulkResult(null);
    try {
      const data = await onTriggerBulkSeed();
      if (data && data.success) {
        setBulkResult(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setBulkSeeding(false);
    }
  };

  // Helper stats
  const totalCompleted = milestones.filter(m => m.status === 'completed').length;
  const progressPercent = Math.round((totalCompleted / milestones.length) * 105); // ensure visual fill

  return (
    <div className="space-y-6">
      {/* 24H Autonomous Growth Activation Panel */}
      <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 p-6 rounded-2xl border border-indigo-900/50 text-white relative overflow-hidden shadow-xl text-left">
        <div className="absolute top-0 right-0 p-4 opacity-5">
          <Rocket className="h-64 w-64" />
        </div>
        
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="p-2 bg-indigo-500 text-white rounded-xl shadow-md animate-pulse">
              <Zap className="h-5 w-5 text-amber-300" />
            </span>
            <div>
              <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest bg-indigo-900/40 px-2.5 py-0.5 rounded border border-indigo-800/40">
                Deepay Autopilot Protocol Active
              </span>
              <h2 className="text-lg font-extrabold mt-1 font-sans">24h Autonomous Directory Seeding & Keyword Factory</h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {pages.length >= 300 ? (
              <span className="text-[11px] font-mono bg-emerald-950/80 text-emerald-400 border border-emerald-900/40 font-bold px-2.5 py-1 rounded-lg">
                ● Domain authority: EXCELLENT ({pages.length} Pages Live)
              </span>
            ) : (
              <span className="text-[11px] font-mono bg-amber-950/80 text-amber-400 border border-amber-900/40 font-bold px-2.5 py-1 rounded-lg">
                ● Domain authority: SEEDING PENDING ({pages.length}/300 Pages)
              </span>
            )}
          </div>
        </div>

        <p className="text-xs text-slate-300 mt-3 max-w-4xl font-sans leading-relaxed">
          Deepay’s proprietary B2B authority autopilot compiles, translates, and deploys high-quality point-of-sale configurations for <strong>deepay.srl</strong>. Running the Autopilot will immediately hook and format a grid of <strong>324 search-optimized nodes</strong> covering 6 countries (Italy, France, Germany, Spain, Netherlands, Belgium), 36 core trade cities, and 9 target industrial sectors—all complete with custom OpenGraph, breadcrumbs, translation sheets (CN/EN/IT), and real local fiscal rules.
        </p>

        <div className="mt-5 pt-5 border-t border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="grid grid-cols-3 gap-6 font-mono text-[11px] text-slate-400">
            <div>
              <span className="text-slate-500 block uppercase text-[9px] tracking-wider font-bold">COUNTRIES COV.</span>
              <strong className="text-white text-sm">6 E.U. Nations</strong>
            </div>
            <div>
              <span className="text-slate-500 block uppercase text-[9px] tracking-wider font-bold">REGIONAL CITIES</span>
              <strong className="text-white text-sm">36 Commercial Hubs</strong>
            </div>
            <div>
              <span className="text-slate-500 block uppercase text-[9px] tracking-wider font-bold">TARGET CHANNELS</span>
              <strong className="text-white text-sm">9 B2B Sectors</strong>
            </div>
          </div>

          <div>
            <button
              onClick={handleBulkSeeding}
              disabled={bulkSeeding || loading || pages.length >= 300}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold shadow-lg transition-all transform hover:scale-[1.01] active:scale-[0.99] cursor-pointer ${
                pages.length >= 300
                  ? "bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed"
                  : "bg-gradient-to-r from-sky-500 via-indigo-500 to-indigo-600 hover:from-sky-650 hover:to-indigo-650 text-white"
              }`}
            >
              {bulkSeeding ? (
                <>
                  <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full font-bold"></span>
                  Deploying Multi-Regional Matrix... (Writing 324 Pages)
                </>
              ) : pages.length >= 300 ? (
                <>
                  <Check className="h-4 w-4 text-emerald-400" />
                  Ecosystem Synchronized (300+ Pages Active)
                </>
              ) : (
                <>
                  <Rocket className="h-4 w-4 text-amber-300 animate-bounce" />
                  Activate 24H Autonomous Seeder: Publish 320+ Landing Pages
                </>
              )}
            </button>
          </div>
        </div>

        {bulkResult && (
          <div className="mt-4 p-4 bg-emerald-950/40 border border-emerald-990/40 border-emerald-900/60 rounded-xl font-mono text-[11.5px] text-emerald-300 space-y-1.5 animate-bounce">
            <div className="flex items-center gap-1.5 font-bold">
              <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
              <span>Autopilot Seeding Completed Successfully!</span>
            </div>
            <p className="text-slate-300 text-xs mt-1">
              {bulkResult.message}
            </p>
            <div className="flex flex-wrap gap-4 pt-1 text-[10.5px] text-slate-400">
              <span>Pages Published: <strong className="text-white">{bulkResult.pagesSeeded}</strong></span>
              <span>•</span>
              <span>Keywords Tracked: <strong className="text-white">{bulkResult.keywordsSeeded}</strong></span>
              <span>•</span>
              <span>Total URLs Catalogued: <strong className="text-white">{bulkResult.pagesCount}</strong></span>
            </div>
          </div>
        )}

        {/* Milestone tracker */}
        <div className="mt-6 pt-5 border-t border-slate-800">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-400 font-semibold font-sans">Platform Milestone Progress ({progressPercent > 100 ? 100 : progressPercent}%)</span>
            <span className="font-mono text-sky-400 font-bold">{pages.length >= 300 ? "4 / 4" : "1 / 4"} Phases Complete</span>
          </div>
          <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden mt-2 border border-slate-800">
            <div 
              className="bg-gradient-to-r from-emerald-500 via-sky-500 to-indigo-500 h-full rounded-full transition-all duration-500" 
              style={{ width: `${pages.length >= 300 ? 100 : progressPercent}%` }}
            ></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mt-4">
            {milestones.map((ms) => {
              const completed = pages.length >= 300 || ms.status === 'completed';
              return (
                <div 
                  key={ms.id} 
                  className={`p-3 rounded-lg text-left text-xs transition-all border ${
                    completed 
                      ? 'bg-emerald-950/20 border-emerald-900/40 text-slate-100' 
                      : ms.status === 'in_progress'
                      ? 'bg-indigo-950/20 border-indigo-900/40 text-slate-100 ring-1 ring-indigo-500/30'
                      : 'bg-slate-900/40 border-slate-800/60 text-slate-400'
                  }`}
                >
                  <div className="flex items-center justify-between font-bold">
                    <span className="text-[10px] uppercase font-mono tracking-wider opacity-90">{ms.phaseTitle}</span>
                    {completed ? (
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                    ) : ms.status === 'in_progress' ? (
                      <span className="flex h-1.5 w-1.5 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-indigo-400"></span>
                      </span>
                    ) : (
                      <span className="text-[9px] px-1 py-0.2 bg-slate-800 rounded">Pending</span>
                    )}
                  </div>
                  <h4 className="font-semibold text-slate-200 mt-1.5 line-clamp-1">{ms.title}</h4>
                  <p className="text-[10px] text-slate-400 mt-1 line-clamp-2">{ms.description}</p>
                  <span className="text-[9px] text-slate-500 font-mono mt-2 block font-medium">Target: {ms.targetDate}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Growth audit opportunities check */}
        <div className="lg:col-span-2 bg-white p-5 rounded-xl border border-slate-100 shadow-sm space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-slate-900 font-sans flex items-center gap-1.5">
              <Target className="h-4 w-4 text-rose-500" />
              Dynamic Content Gaps & Growth Opportunities
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              High-volume keywords missing active multi-language landing clusters. Click to auto-generate and expand.
            </p>
          </div>

          <div className="space-y-3.5">
            {opportunities.map((opp) => {
              const isGenerated = pages.some(p => p.slug === opp.slug);
              const isPendingThis = optimizingId === opp.id;

              return (
                <div 
                  key={opp.id} 
                  className={`p-4 rounded-lg border text-left flex flex-col md:flex-row justify-between md:items-center gap-4 transition-all ${
                    isGenerated 
                      ? 'bg-slate-50/50 border-slate-100/80 opacity-80' 
                      : 'bg-white border-slate-100 hover:border-slate-200 hover:shadow-xs'
                  }`}
                >
                  <div className="space-y-1 max-w-lg">
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-bold text-slate-950 font-sans">{opp.title}</h4>
                      <span className={`text-[9px] font-extrabold px-1.5 py-0.2 rounded uppercase ${
                        opp.impact === 'High' ? 'bg-red-50 text-red-700' : 'bg-amber-50 text-amber-700'
                      }`}>
                        {opp.impact} Impact
                      </span>
                      {isGenerated && (
                        <span className="text-[9px] bg-emerald-50 text-emerald-700 font-bold px-1.5 py-0.2 rounded flex items-center gap-0.5">
                          <Check className="h-2.5 w-2.5" /> Deployed
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-505 text-slate-500 mt-0.5">{opp.description}</p>
                    <div className="flex items-center gap-3 text-[10px] font-mono text-slate-400 pt-1.5">
                      <span>Volume: <strong className="text-slate-700">{opp.volume.toLocaleString()}/mo</strong></span>
                      <span>•</span>
                      <span>Difficulty: <strong className="text-slate-700">{opp.difficulty}</strong></span>
                      <span>•</span>
                      <span>Phase: <strong className="text-slate-700">{opp.phase}</strong></span>
                      <span>•</span>
                      <span className="text-sky-600 underline">Slug: /{opp.slug}</span>
                    </div>
                  </div>

                  <div>
                    {isGenerated ? (
                      <span className="text-xs text-slate-400 font-medium px-3 py-1 bg-slate-150/40 rounded border border-slate-100">
                        Active Route
                      </span>
                    ) : (
                      <button
                        onClick={() => handleBuild(opp.id)}
                        disabled={!!optimizingId}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-sky-500 hover:bg-sky-600 active:bg-sky-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors disabled:opacity-50 cursor-pointer"
                      >
                        {isPendingThis ? (
                          <>
                            <span className="animate-spin h-3.5 w-3.5 border-2 border-white border-t-transparent rounded-full"></span>
                            Building...
                          </>
                        ) : (
                          <>
                            <Play className="h-3 w-3" />
                            Auto-Generate
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dynamic visual representation of compiler results */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-white flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-850 border-slate-800">
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-sky-400">Compiler Diagnostic</h3>
              <Workflow className="h-4 w-4 text-emerald-400" />
            </div>

            {optimizingId ? (
              <div className="py-12 text-center space-y-4">
                <div className="relative inline-flex">
                  <div className="w-8 h-8 rounded-full border-2 border-dashed border-sky-400 animate-spin"></div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-indigo-500 animate-pulse"></div>
                </div>
                <p className="text-xs font-mono text-slate-300">
                  CTO active compiler compiling page metadata, alternative translations, breadcrumbs, JSON-LD Schema structures, and updating XML Site indices...
                </p>
              </div>
            ) : successInfo ? (
              <div className="space-y-4 font-mono text-xs">
                <div className="p-2 bg-emerald-950/40 border border-emerald-900/60 rounded text-emerald-300 flex items-start gap-1.5">
                  <Check className="h-4 w-4 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold">Deployment Standard OK</p>
                    <p className="text-[10px] text-slate-300 mt-0.5">{successInfo.message}</p>
                  </div>
                </div>

                {successInfo.page && (
                  <div className="space-y-2.5 pt-1 text-[11px]">
                    <div>
                      <span className="text-slate-500 h-block">TARGET URL:</span>
                      <p className="text-sky-300 font-bold block">https://deepay.srl/{successInfo.page.slug}</p>
                    </div>
                    <div>
                      <span className="text-slate-500 block">SEO TITLE:</span>
                      <p className="text-slate-100 font-semibold">{successInfo.page.metadata.title}</p>
                    </div>
                    <div>
                      <span className="text-slate-500 block">LANGUAGES SYNCED (Hreflang):</span>
                      <div className="text-[10px] space-y-1 bg-slate-950 p-2 rounded text-slate-300 border border-slate-850">
                        <span className="block"><strong className="text-sky-400">en:</strong> /it/ {successInfo.page.metadata.hreflang.en}</span>
                        <span className="block"><strong className="text-sky-400">it:</strong> /it/ {successInfo.page.metadata.hreflang.it}</span>
                        <span className="block"><strong className="text-sky-400">zh:</strong> /zh/ {successInfo.page.metadata.hreflang.zh}</span>
                      </div>
                    </div>
                    <div>
                      <span className="text-slate-500 block">JSON-LD GRAPH INJECTION:</span>
                      <pre className="text-[9.5px] bg-slate-950 p-2 rounded border border-slate-850 overflow-x-auto max-h-[140px] text-amber-200">
                        {successInfo.page.metadata.jsonLdSchema}
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="py-12 text-center text-slate-400 font-mono text-xs space-y-4">
                <AlertCircle className="h-8 w-8 text-slate-600 mx-auto" />
                <p>
                  Diagnostic screen awaiting compilation actions. Select any un-deployed opportunities on the left to start a real-time auto-build sequence.
                </p>
              </div>
            )}
          </div>

          <div className="pt-3 border-t border-slate-800 text-[10px] font-mono text-slate-500 flex justify-between items-center">
            <span>Canonical Normalization</span>
            <span className="text-emerald-400 flex items-center gap-1">
              <Globe className="h-3 w-3" /> Fully Synced
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
