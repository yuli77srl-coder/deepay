import React, { useState } from "react";
import { 
  Network, CheckCircle2, AlertCircle, HelpCircle, ArrowRight,
  Sparkles, Layers, BookOpen, Coffee, Shirt, Utensils, Hotel, Store, ShoppingBag,
  CreditCard, Wallet, Landmark, Globe, Check, Workflow, ChevronRight
} from "lucide-react";
import { TopicCluster, SEOKeyword } from "../types";

interface TopicClustersProps {
  clusters: TopicCluster[];
  keywords: SEOKeyword[];
}

export function TopicClusters({ clusters, keywords }: TopicClustersProps) {
  const [selectedClusterId, setSelectedClusterId] = useState<string>(clusters[0]?.id || "");
  const [activeTab, setActiveTab] = useState<'clusters' | 'ecosystems'>('ecosystems');

  const activeCluster = clusters.find(c => c.id === selectedClusterId);
  const activeKeyword = activeCluster ? keywords.find(k => k.id === activeCluster.coreKeywordId) : null;

  // The 4 Core Ecosystems requested inside Master Prompt
  const ecosystems = [
    {
      id: "pay",
      title: "Payment Solutions Ecosystem",
      chinese: "1. 聚合智能支付生态",
      description: "Direct offline POS terminals synchronized with multi-currency (EUR, CNY, USD) clearings. Complies with strict EU PSD2 guidelines.",
      icon: <CreditCard className="h-5 w-5 text-sky-500" />,
      tag: "payment/smart-pos",
      seoValue: "Domain Authority Booster (Topical: Merchant payments)"
    },
    {
      id: "wallet",
      title: "Digital Wallet Integration",
      chinese: "2. 智能数字钱包与移动支付",
      description: "Localized micro-payments, QR loyalty wallets, and instant merchant vouchers built with high-velocity API models.",
      icon: <Wallet className="h-5 w-5 text-indigo-500" />,
      tag: "payment/digital-wallet",
      seoValue: "High Search Volume (Organic CTR targeting mobile SME)"
    },
    {
      id: "store",
      title: "One Click Store Engine",
      chinese: "3. 一键出海开店多端系统",
      description: "Instant e-commerce setup, physical barcoding printer synchronization, and multi-cuisine restaurant order-placements.",
      icon: <Landmark className="h-5 w-5 text-pink-500" />,
      tag: "solutions/one-click-store",
      seoValue: "Enterprise Conversion Funnel (Zero localized entry friction)"
    },
    {
      id: "chinese_business",
      title: "European Chinese Business Hub",
      chinese: "4. 欧洲华商数字合规生态圈",
      description: "Solving VAT reports compliance, Scontrino Telematico RT links, and dual-language invoices for high-authority regional backlinks.",
      icon: <Globe className="h-5 w-5 text-emerald-500" />,
      tag: "solutions/euroline-chinese-hub",
      seoValue: "High-Volume Long Tail Backlink Magnets"
    }
  ];

  // Generate color palette based on industry category
  const getIndustryStyle = (ind: string) => {
    switch (ind) {
      case "Restaurant":
        return { bg: "bg-orange-50", border: 'border-orange-100', text: "text-orange-700", icon: <Utensils className="h-4 w-4" /> };
      case "Fashion":
        return { bg: "bg-purple-50", border: 'border-purple-100', text: "text-purple-700", icon: <Shirt className="h-4 w-4" /> };
      case "Retail":
        return { bg: "bg-blue-50", border: 'border-blue-100', text: "text-blue-700", icon: <Store className="h-4 w-4" /> };
      case "Hotel":
        return { bg: "bg-teal-50", border: 'border-teal-100', text: "text-teal-700", icon: <Hotel className="h-4 w-4" /> };
      case "Coffee":
        return { bg: "bg-amber-50", border: 'border-amber-100', text: "text-amber-800", icon: <Coffee className="h-4 w-4" /> };
      default:
        return { bg: "bg-slate-50", border: 'border-slate-100', text: "text-slate-700", icon: <ShoppingBag className="h-4 w-4" /> };
    }
  };

  return (
    <div className="space-y-6">
      {/* Dynamic Tab Selector */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-5 rounded-xl border border-slate-100 shadow-sm gap-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900 font-sans">Semantics Hub & Industrial Networks</h3>
          <p className="text-xs text-slate-500 mt-1 font-sans">
            Structuring the Deepay digital architecture to maximize authority inside Google, ChatGPT, and Gemini Search engines.
          </p>
        </div>
        <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-semibold shrink-0">
          <button
            onClick={() => setActiveTab('ecosystems')}
            className={`px-4 py-1.5 rounded-lg transition-all ${activeTab === 'ecosystems' ? 'bg-white text-slate-950 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
          >
            Four Core Ecosystems
          </button>
          <button
            onClick={() => setActiveTab('clusters')}
            className={`px-4 py-1.5 rounded-lg transition-all ${activeTab === 'clusters' ? 'bg-white text-indigo-650 text-indigo-700 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
          >
            Industrial Clusters
          </button>
        </div>
      </div>

      {activeTab === 'ecosystems' ? (
        <div className="space-y-6">
          {/* Ecosystem Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ecosystems.map((eco) => (
              <div 
                key={eco.id}
                className="bg-white border border-slate-100 hover:border-slate-200 p-5 rounded-xl shadow-xs hover:shadow-md transition-all flex items-start gap-4"
              >
                <div className="p-3 bg-slate-50 rounded-lg shrink-0">
                  {eco.icon}
                </div>
                <div className="space-y-1 text-left">
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-sm font-bold text-slate-950 font-sans">{eco.title}</h4>
                    <span className="text-[10px] text-indigo-600 font-mono bg-indigo-50 px-1.5 py-0.2 rounded font-semibold">
                      Live Spec
                    </span>
                  </div>
                  <span className="text-xs font-bold text-slate-500 block font-sans">{eco.chinese}</span>
                  <p className="text-xs text-slate-600 font-sans pt-1">
                    {eco.description}
                  </p>
                  <div className="flex items-center justify-between text-[10px] pt-3 mt-1 text-slate-400 font-mono">
                    <span className="text-sky-600">Route prefix: /{eco.tag}</span>
                    <span className="text-emerald-600 font-semibold">{eco.seoValue}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-slate-50 p-5 rounded-xl border border-slate-200/60 text-slate-700 text-xs text-left max-w-4xl mx-auto space-y-3 font-sans">
            <h4 className="font-bold text-slate-900 flex items-center gap-1">
              <Sparkles className="h-4 w-4 text-amber-500" />
              CTO Architecture Directive Checklist:
            </h4>
            <p>
              Rather than maintaining flat keyword stuffing, every core ecosystem behaves as a standalone topical branch. Each branch handles guides, comparative tables, and real-time schema markup outputs natively. This strategy feeds ChatGPT and Perplexity Search aggregators with clean tabular data arrays, ensuring deep citation ranks.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Side: Clusters directory */}
          <div className="space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block px-1">Selected Active Clusters</span>
            {clusters.map((c) => {
              const industryStyle = getIndustryStyle(c.industry);
              const generatedPagesCount = c.subPages.filter(sp => sp.generated).length;
              const totalPagesInCluster = c.subPages.length;
              const ratio = generatedPagesCount / totalPagesInCluster;

              return (
                <button
                  key={c.id}
                  onClick={() => setSelectedClusterId(c.id)}
                  className={`w-full p-4 rounded-xl border text-left transition-all flex flex-col justify-between ${
                    selectedClusterId === c.id 
                      ? 'bg-white border-sky-500 shadow-md ring-1 ring-sky-500/30' 
                      : 'bg-white hover:bg-slate-50 border-slate-100 shadow-sm'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className={`px-2 py-0.5 rounded text-[9px] font-bold border uppercase tracking-wider flex items-center gap-1 ${industryStyle.bg} ${industryStyle.text} ${industryStyle.border}`}>
                        {industryStyle.icon}
                        {c.industry}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400 font-bold">
                        {generatedPagesCount}/{totalPagesInCluster} Generated
                      </span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-900 mt-2 hover:text-sky-600 transition-colors">
                      {c.name}
                    </h4>
                    <p className="text-[11px] text-slate-400 line-clamp-1 mt-1 font-sans">
                      {c.description}
                    </p>
                  </div>

                  <div className="mt-4">
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${ratio === 1 ? 'bg-emerald-500' : 'bg-gradient-to-r from-sky-500 to-indigo-500'}`} 
                        style={{ width: `${ratio * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Side: Visual mapping & nodes */}
          <div className="lg:col-span-2 space-y-6">
            {activeCluster ? (
              <>
                {/* Cluster Map Visual Diagram Component */}
                <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm flex flex-col justify-between min-h-[360px]">
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-slate-50">
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 font-mono">Structural Topic Cluster Diagram</h4>
                        <h3 className="text-md font-bold text-slate-900 mt-1">{activeCluster.name}</h3>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">
                        Domain target: <span className="font-semibold text-slate-800">deepay.srl</span>
                      </span>
                    </div>

                    {/* SVG Map Layout */}
                    <div className="mt-6 border border-slate-100 rounded-lg p-4 bg-slate-50/50 flex flex-col items-center justify-center relative overflow-hidden h-52">
                      {/* Visual Orbiting Paths in SVG */}
                      <svg className="absolute inset-0 w-full h-full pointer-events-none">
                        <circle cx="50%" cy="50%" r="70" fill="none" stroke="#e2e8f0" strokeWidth="1.5" strokeDasharray="5" />
                        <circle cx="50%" cy="50%" r="35" fill="none" stroke="#0ea5e9" strokeWidth="1" strokeOpacity={0.2} />
                      </svg>

                      {/* Core node */}
                      <div className="absolute z-10 bg-gradient-to-br from-slate-900 via-slate-850 to-slate-800 text-white p-3.5 rounded-xl text-center shadow-md max-w-[170px] border border-slate-700">
                        <div className="text-[10px] font-bold text-sky-400 font-mono tracking-widest uppercase font-semibold">CLUSTER CORE</div>
                        <div className="text-xs font-bold truncate mt-0.5 font-sans">
                          {activeKeyword ? activeKeyword.keyword : activeCluster.name}
                        </div>
                      </div>

                      {/* Dynamic Floating Subpages orbiting Core based on math angles */}
                      {activeCluster.subPages.map((sp, idx) => {
                        const totalSub = activeCluster.subPages.length;
                        const angle = (idx / totalSub) * 2 * Math.PI - Math.PI / 2;
                        const radius = 75; // px orbit
                        const x = Math.cos(angle) * radius;
                        const y = Math.sin(angle) * radius;

                        return (
                          <div
                            key={idx}
                            className={`absolute z-20 px-2.5 py-1.5 rounded-lg border text-[9px] font-bold shadow-xs transition-transform flex items-center gap-1 max-w-[140px] ${
                              sp.generated 
                                ? 'bg-emerald-50 text-emerald-800 border-emerald-200' 
                                : 'bg-white text-slate-500 border-slate-200 opacity-60'
                            }`}
                            style={{
                              transform: `translate(${x}px, ${y}px)`
                            }}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full ${sp.generated ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`}></span>
                            <span className="truncate">{sp.title}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="text-center text-[10px] text-slate-400 mt-2 font-mono flex items-center justify-center gap-1.5 bg-slate-50 p-2 rounded-lg">
                    <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                    Solid boundaries denote compiled 100% indexed pages. Orbital spacing generates Topic Authority signals.
                  </div>
                </div>

                {/* Checklist details */}
                <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden text-xs text-left">
                  <div className="p-4 bg-slate-50 border-b border-slate-100">
                    <h4 className="font-semibold text-slate-800 font-sans">Semantic Pages Directory checklist</h4>
                  </div>
                  <div className="divide-y divide-slate-100">
                    {activeCluster.subPages.map((sp, idx) => (
                      <div key={idx} className="p-3.5 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
                        <div>
                          <span className="font-mono text-[9px] uppercase tracking-wider text-slate-400 font-bold block">
                            {sp.type} Page Schema
                          </span>
                          <span className="font-bold text-slate-800 font-sans">
                            {sp.title}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono block mt-0.5">
                            deepay.srl/{sp.slug}
                          </span>
                        </div>
                        <div>
                          {sp.generated ? (
                            <span className="px-2.5 py-1 bg-emerald-50 border border-emerald-100 text-emerald-700 rounded-lg text-[10px] font-bold flex items-center gap-1">
                              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                              Live & Indexed
                            </span>
                          ) : (
                            <span className="px-2.5 py-1 bg-amber-50 border border-amber-100 text-amber-600 rounded-lg text-[10px] font-bold flex items-center gap-1" title="Go to Content Hub to generate this subpage structure">
                              <AlertCircle className="h-3.5 w-3.5 text-amber-500 animate-pulse" />
                              Awaiting Draft
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-20 text-slate-400 bg-white border border-slate-100 rounded-xl shadow-sm">
                No cluster detail selected. Click a cluster entry to map network nodes.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
