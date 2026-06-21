import React from "react";
import { 
  Wrench, Activity, CheckSquare, RefreshCw, Layers, ShieldCheck, 
  HelpCircle, ChevronRight, CheckCircle2, FileText, AlertTriangle 
} from "lucide-react";
import { MaintenanceStatus } from "../types";

interface MaintenanceConsoleProps {
  maintenance: MaintenanceStatus;
  onRunMaintenance: () => void;
  loading: boolean;
}

export function MaintenanceConsole({
  maintenance,
  onRunMaintenance,
  loading
}: MaintenanceConsoleProps) {
  return (
    <div className="space-y-6">
      {/* Upper informational bar */}
      <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm">
        <h3 className="text-sm font-semibold text-slate-900 font-sans">AI Automation & Maintenance Console</h3>
        <p className="text-xs text-slate-400 mt-1 font-sans">
          Manage deepay.srl's background automated schedules. These agents continually rebuild XML index pathways, fix alternate hreflang canonical issues, and correct metadata duplicates.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Core controls & trigger */}
        <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm space-y-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block font-mono">Engine Direct Trigger</span>
            <h3 className="font-bold text-slate-800 text-xs mt-0.5 font-sans">Initiate Manual Deep-Scan Audit</h3>
          </div>
          
          <p className="text-xs text-slate-500 leading-normal font-sans">
            Force-runs SEO crawlers across all language domains (EN, IT, ZH), verifying XML maps, hreflangs validation trees, and generating summary tables for AI search engine optimizers.
          </p>

          <button
            onClick={onRunMaintenance}
            disabled={loading}
            className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm"
            id="btn-trigger-console-scan"
          >
            <RefreshCw className={`h-4.5 w-4.5 ${loading ? 'animate-spin' : ''}`} />
            Run Comprehensive Health Check
          </button>

          <div className="p-3 bg-slate-50 border border-slate-100 rounded-lg text-[11px] text-slate-500 font-sans space-y-1">
            <div className="flex justify-between">
              <span>Last Sitemap sync:</span>
              <span className="font-semibold text-slate-700">{new Date(maintenance.lastSitemapUpdate).toLocaleTimeString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Last Core SEO audit:</span>
              <span className="font-semibold text-slate-700">{new Date(maintenance.lastSEOAudit).toLocaleTimeString()}</span>
            </div>
          </div>
        </div>

        {/* Audit Report metrics */}
        <div className="md:col-span-2 bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden flex flex-col justify-between">
          <div>
            <div className="p-4 bg-slate-50 border-b border-slate-100">
              <h4 className="font-bold text-slate-800 font-sans text-xs">Recent Global SEO Health Summary Report</h4>
            </div>

            <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3 bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-between text-xs font-sans">
                <div>
                  <span className="text-slate-400 font-mono text-[9px] uppercase tracking-wider block">Broken Links Scanned</span>
                  <span className="font-bold text-slate-800 mt-1 block text-sm">
                    {maintenance.brokenLinksFound} Errors Found
                  </span>
                </div>
                <CheckCircle2 className="h-6 w-6 text-emerald-500" />
              </div>

              <div className="p-3 bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-between text-xs font-sans">
                <div>
                  <span className="text-slate-400 font-mono text-[9px] uppercase tracking-wider block">Duplicate Titles Checks</span>
                  <span className="font-bold text-slate-800 mt-1 block text-sm">
                    {maintenance.duplicateTitlesCount} Duplicates
                  </span>
                </div>
                <CheckCircle2 className="h-6 w-6 text-emerald-500" />
              </div>

              <div className="p-3 bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-between text-xs font-sans">
                <div>
                  <span className="text-slate-400 font-mono text-[9px] uppercase tracking-wider block">Missing Meta Descriptions</span>
                  <span className="font-bold text-slate-800 mt-1 block text-sm">
                    {maintenance.missingMetaCount} Pages Flagged
                  </span>
                </div>
                {maintenance.missingMetaCount > 0 ? (
                  <AlertTriangle className="h-6 w-6 text-amber-500 animate-pulse" />
                ) : (
                  <CheckCircle2 className="h-6 w-6 text-emerald-500" />
                )}
              </div>

              <div className="p-3 bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-between text-xs font-sans">
                <div>
                  <span className="text-slate-400 font-mono text-[9px] uppercase tracking-wider block">Completed AI Tasks</span>
                  <span className="font-bold text-slate-800 mt-1 block text-sm">
                    {maintenance.completedTasksCount} Executions
                  </span>
                </div>
                <Activity className="h-6 w-6 text-sky-500" />
              </div>
            </div>
          </div>

          <div className="p-3 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between px-5 text-[11px] text-slate-400">
            <span>Sitemap.xml size index: <strong className="text-slate-650">14,240 URLs registered</strong></span>
            <span className="flex items-center gap-1.5 font-bold text-emerald-600">
              <ShieldCheck className="h-4 w-4 text-emerald-500" /> Domain safe
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
