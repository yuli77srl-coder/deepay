import React, { useState } from "react";
import { 
  TrendingUp, Globe, BrainCircuit, Search, Users, Activity, 
  ArrowUpRight, Play, RefreshCw, CheckCircle2, ShieldCheck, Cpu 
} from "lucide-react";
import { SystemLog, Lead, MaintenanceStatus } from "../types";

interface DashboardOverviewProps {
  logs: SystemLog[];
  leads: Lead[];
  maintenance: MaintenanceStatus;
  totalPagesCount: number;
  totalKeywordsCount: number;
  totalClustersCount: number;
  onRefresh: () => void;
  onRunMaintenance: () => void;
  loading: boolean;
}

export function DashboardOverview({
  logs,
  leads,
  maintenance,
  totalPagesCount,
  totalKeywordsCount,
  totalClustersCount,
  onRefresh,
  onRunMaintenance,
  loading
}: DashboardOverviewProps) {
  const [activeTab, setActiveTab] = useState<'traffic' | 'ai-search'>('traffic');

  // Traffic and AI Search source stats
  const trafficData = [2400, 3100, 4200, 5800, 7900, 11400]; // last 6 months
  const aiSearchData = [210, 480, 950, 1800, 3100, 5240]; // last 6 months
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

  // Helper to draw clean SVG charts
  const getSvgCoordinates = (data: number[]) => {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min;
    const height = 120;
    const width = 500;
    const padding = 10;

    return data.map((val, index) => {
      const x = (index / (data.length - 1)) * (width - padding * 2) + padding;
      const y = height - ((val - min) / range) * (height - padding * 2) - padding;
      return `${x},${y}`;
    }).join(" ");
  };

  return (
    <div className="space-y-6">
      {/* Engine Status Top Hub */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-5 rounded-xl border border-slate-100 shadow-sm gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <h2 className="text-lg font-semibold text-slate-900 font-sans">Deepay AI SEO Engine Platform</h2>
          </div>
          <p className="text-xs text-slate-500 mt-1 font-sans">
            Fully automated 365-day indexing, multilingual topic cluster compilation, and ChatGPT/Gemini/Perplexity retrieval optimization for <span className="font-semibold text-sky-600">deepay.srl</span>.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={onRefresh}
            disabled={loading}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-lg text-xs font-medium border border-slate-200 transition-all disabled:opacity-50"
            id="btn-refresh-state"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          <button
            onClick={onRunMaintenance}
            disabled={loading}
            className="flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-700 hover:to-indigo-700 text-white rounded-lg text-xs font-semibold shadow-sm hover:shadow transition-all disabled:opacity-50"
            id="btn-run-audit"
          >
            <Play className="h-3.5 w-3.5" />
            Trigger SEO Audit
          </button>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Domain Authority */}
        <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-3 text-slate-100 group-hover:text-sky-50 transition-colors">
            <ShieldCheck className="h-16 w-16 -mr-4 -mt-2 stroke-1" />
          </div>
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-medium uppercase tracking-wider">Domain Authority</span>
            <span className="text-emerald-600 text-xs font-bold bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-0.5">
              +8.5% <TrendingUp className="h-3 w-3" />
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-slate-950 font-sans">42</span>
            <span className="text-xs text-slate-400">/ 100</span>
          </div>
          <div className="mt-3">
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-sky-500 to-indigo-500 h-full rounded-full" style={{ width: "42%" }}></div>
            </div>
            <span className="text-[10px] text-slate-500 mt-1 block">Topical density predicted to earn DA 50+ inside Q3</span>
          </div>
        </div>

        {/* Card 2: Topical Coverage */}
        <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-3 text-slate-100 group-hover:text-indigo-50 transition-colors">
            <BrainCircuit className="h-16 w-16 -mr-4 -mt-2 stroke-1" />
          </div>
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-medium uppercase tracking-wider">Topical clusters</span>
            <span className="text-indigo-600 text-[10px] font-semibold bg-indigo-55 bg-indigo-50 px-2 py-0.5 rounded-full">
              Full Network
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-slate-950 font-sans">{totalClustersCount}</span>
            <span className="text-xs text-slate-400">Active</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-3">
            <span className="font-semibold text-indigo-600">{totalKeywordsCount} high-ranking</span> expanded keywords mapped to landing structures.
          </p>
        </div>

        {/* Card 3: Indexed URLs */}
        <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-3 text-slate-100 group-hover:text-sky-50 transition-colors">
            <Globe className="h-16 w-16 -mr-4 -mt-2 stroke-1" />
          </div>
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-medium uppercase tracking-wider">Google Index Status</span>
            <span className="text-emerald-600 text-xs font-bold bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-0.5">
              100% Valid
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-slate-950">14.2K</span>
            <span className="text-xs text-slate-400">URLs</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-3 flex items-center gap-1">
            <CheckCircle2 className="h-3 w-3 text-emerald-500" />
            Hreflangs, breadcrumbs and sitemaps synced.
          </p>
        </div>

        {/* Card 4: AI Search Visibility */}
        <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-3 text-slate-100 group-hover:text-rose-50 transition-colors">
            <Cpu className="h-16 w-16 -mr-4 -mt-2 stroke-1" />
          </div>
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-medium uppercase tracking-wider">AI Search Referrals</span>
            <span className="text-rose-600 text-xs font-bold bg-rose-50 px-2 py-0.5 rounded-full flex items-center gap-0.5">
              +142% MoM
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-slate-950 font-sans">34.2%</span>
            <span className="text-xs text-slate-400">of Traffic</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-3">
            Referrals from ChatGPT, Gemini, & Perplexity via schema structured matching.
          </p>
        </div>
      </div>

      {/* Analytics Visualization + Attribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Core SVG Charts Card */}
        <div className="lg:col-span-2 bg-white p-5 rounded-xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center pb-3 border-b border-slate-50">
              <div>
                <h3 className="text-sm font-semibold text-slate-900 font-sans">Omnichannel SEO Traction Analytics</h3>
                <p className="text-xs text-slate-400 mt-0.5">Continuous organic authority metrics tracker for deepay.srl</p>
              </div>
              <div className="flex bg-slate-100 p-0.5 rounded-lg text-xs font-medium">
                <button
                  onClick={() => setActiveTab('traffic')}
                  className={`px-3 py-1 rounded-md transition-all ${activeTab === 'traffic' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'}`}
                >
                  Organic Visits
                </button>
                <button
                  onClick={() => setActiveTab('ai-search')}
                  className={`px-3 py-1 rounded-md transition-all ${activeTab === 'ai-search' ? 'bg-white text-rose-600 shadow-xs' : 'text-slate-500 hover:text-slate-900'}`}
                >
                  AI Search Citations
                </button>
              </div>
            </div>

            {/* Line Chart Render */}
            <div className="mt-6 h-36 relative">
              <svg className="w-full h-full" viewBox="0 0 500 120" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="roseGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#f43f5e" stopOpacity="0" />
                  </linearGradient>
                </defs>

                {/* Gridlines */}
                <line x1="10" y1="30" x2="490" y2="30" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4" />
                <line x1="10" y1="60" x2="490" y2="60" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4" />
                <line x1="10" y1="90" x2="490" y2="90" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4" />

                {activeTab === 'traffic' ? (
                  <>
                    {/* Traffic Area Fill */}
                    <path
                      d={`M10,110 L${getSvgCoordinates(trafficData)} L490,110 Z`}
                      fill="url(#skyGrad)"
                    />
                    {/* Traffic Line Chart */}
                    <polyline
                      fill="none"
                      stroke="#0284c7"
                      strokeWidth="2.5"
                      points={getSvgCoordinates(trafficData)}
                    />
                  </>
                ) : (
                  <>
                    {/* AI Search Area Fill */}
                    <path
                      d={`M10,110 L${getSvgCoordinates(aiSearchData)} L490,110 Z`}
                      fill="url(#roseGrad)"
                    />
                    {/* AI Search Line Chart */}
                    <polyline
                      fill="none"
                      stroke="#e11d48"
                      strokeWidth="2.5"
                      points={getSvgCoordinates(aiSearchData)}
                    />
                  </>
                )}

                {/* Dynamic Plot Circles & Annotations */}
                {activeTab === 'traffic' ? (
                  trafficData.map((val, idx) => {
                    const coords = getSvgCoordinates(trafficData).split(" ")[idx].split(",");
                    return (
                      <g key={idx}>
                        <circle cx={coords[0]} cy={coords[1]} r="4" fill="#ffffff" stroke="#0284c7" strokeWidth="2" />
                        {idx === trafficData.length - 1 && (
                          <text x={parseFloat(coords[0]) - 35} y={parseFloat(coords[1]) - 10} className="text-[10px] font-bold fill-sky-800 bg-white">
                            {val} sessions
                          </text>
                        )}
                      </g>
                    );
                  })
                ) : (
                  aiSearchData.map((val, idx) => {
                    const coords = getSvgCoordinates(aiSearchData).split(" ")[idx].split(",");
                    return (
                      <g key={idx}>
                        <circle cx={coords[0]} cy={coords[1]} r="4" fill="#ffffff" stroke="#e11d48" strokeWidth="2" />
                        {idx === aiSearchData.length - 1 && (
                          <text x={parseFloat(coords[0]) - 35} y={parseFloat(coords[1]) - 10} className="text-[10px] font-bold fill-rose-800 bg-white">
                            {val} mentions
                          </text>
                        )}
                      </g>
                    );
                  })
                )}
              </svg>
            </div>

            {/* X-Axis labels */}
            <div className="flex justify-between px-3 mt-1 text-[10px] text-slate-400 font-mono">
              {months.map((m, i) => <span key={i}>{m}</span>)}
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-4 mt-4 border-t border-slate-50 text-slate-600 bg-slate-50/50 p-3 rounded-lg">
            <div>
              <span className="text-[10px] text-slate-400 block font-sans uppercase">Total Pages</span>
              <span className="text-sm font-semibold text-slate-800">{totalPagesCount} Live</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block font-sans uppercase">Language Clusters</span>
              <span className="text-sm font-semibold text-slate-800">EN, IT, ZH</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block font-sans uppercase">SEO Issues</span>
              <span className="text-sm font-semibold text-emerald-600">0 critical</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block font-sans uppercase">Weekly crawl</span>
              <span className="text-sm font-semibold text-slate-800 flex items-center gap-1">
                Active <Activity className="h-3 w-3 text-emerald-500" />
              </span>
            </div>
          </div>
        </div>

        {/* CRM Leads Attribution mini panel */}
        <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-50">
              <div>
                <h3 className="text-sm font-semibold text-slate-900 font-sans">Organic Conversion CRM</h3>
                <p className="text-xs text-slate-400 mt-0.5">Leads matching SEO attribution tags</p>
              </div>
              <Users className="h-4 w-4 text-sky-500" />
            </div>

            <div className="mt-4 space-y-3.5 max-h-[190px] overflow-y-auto pr-1">
              {leads.length === 0 ? (
                <div className="text-center py-6 text-xs text-slate-400">No leads registered. Complete contacts on generator pages to see CRM logs.</div>
              ) : (
                leads.slice(0, 3).map((lead) => (
                  <div key={lead.id} className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-xs flex justify-between items-start">
                    <div>
                      <div className="font-semibold text-slate-850 flex items-center gap-1.5">
                        {lead.companyName}
                        <span className="text-[9px] px-1.5 py-0.1 bg-sky-50 text-sky-700 rounded border border-sky-100 font-mono">
                          {lead.referrerMedium}
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-500 mt-1">
                        {lead.contactName} • {lead.city ? `${lead.city}, ` : ""}{lead.country || "Global"}
                      </div>
                      <div className="text-[9px] text-rose-500 font-medium underline mt-1.5 truncate max-w-[150px]">
                        Ref: /{lead.sourcePage}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded capitalize ${
                        lead.status === 'new' ? 'bg-amber-50 text-amber-600 border border-amber-100' :
                        lead.status === 'qualified' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' :
                        'bg-slate-100 text-slate-600'
                      }`}>
                        {lead.status}
                      </span>
                      <span className="text-[9px] text-slate-405 block mt-2 text-slate-450 font-mono font-semibold">
                        {lead.interest.replace('_', ' ')}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-50 flex items-center justify-between text-xs text-slate-500">
            <span>Total CRM database:</span>
            <span className="font-bold text-slate-800">{leads.length} Leads</span>
          </div>
        </div>
      </div>

      {/* Live System Log Streamer */}
      <div className="bg-slate-900 text-slate-100 p-5 rounded-xl shadow-lg border border-slate-800">
        <div className="flex justify-between items-center pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
            <h3 className="text-xs font-bold uppercase tracking-widest font-mono text-emerald-400">Deepay SEO Engine Task Log</h3>
          </div>
          <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
            <Cpu className="h-3 w-3 text-sky-400" /> Auto-Engine Online
          </span>
        </div>

        <div className="mt-4 font-mono text-xs space-y-3.5 max-h-[220px] overflow-y-auto pr-2 custom-scrollbar">
          {logs.map((log) => (
            <div key={log.id} className="border-l-2 pl-3 py-0.5" style={{
              borderColor: log.level === 'success' ? '#10b981' : log.level === 'warning' ? '#f59e0b' : log.level === 'error' ? '#ef4444' : '#0ea5e9'
            }}>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span className={`text-[10px] font-bold ${
                  log.type === 'crawler' ? 'text-sky-300' :
                  log.type === 'generator' ? 'text-purple-300' :
                  log.type === 'sitemap' ? 'text-amber-300' :
                  'text-emerald-300'
                }`}>
                  [{log.type.toUpperCase()}]
                </span>
                <span>{new Date(log.timestamp).toLocaleTimeString()}</span>
              </div>
              <p className="text-slate-200 mt-1">{log.message}</p>
              {log.details && (
                <p className="text-[10px] text-slate-400 mt-0.5 line-clamp-1 hover:line-clamp-none transition-all">{log.details}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
