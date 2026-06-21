import React, { useState } from "react";
import { 
  Users, UserPlus, Phone, Mail, Building2, Tag, Compass,
  ArrowUpRight, AlertCircle, Sparkles, Filter, CheckCircle2, MessageSquare,
  Globe, Landmark, Plus, Trash2, ShieldCheck, Link2
} from "lucide-react";
import { Lead, SEOPage, MerchantListing } from "../types";

interface CrmLeadsProps {
  leads: Lead[];
  merchants: MerchantListing[];
  pages: SEOPage[];
  onAddLead: (leadData: Partial<Lead>) => Promise<void>;
  onAddMerchant: (merchantData: Partial<MerchantListing>) => Promise<void>;
  loading: boolean;
}

export function CrmLeads({
  leads,
  merchants = [],
  pages,
  onAddLead,
  onAddMerchant,
  loading: parentLoading
}: CrmLeadsProps) {
  const [activeTab, setActiveTab] = useState<'leads' | 'directory'>('leads');

  // Lead Simulator State
  const [companyName, setCompanyName] = useState("");
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [interest, setInterest] = useState<any>("free_trial");
  const [sourcePage, setSourcePage] = useState("");
  const [referrer, setReferrer] = useState<any>("SEO");
  const [city, setCity] = useState("Milan");
  const [country, setCountry] = useState("Italy");
  const [leadLoading, setLeadLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  // Directory Enrollment State
  const [merchName, setMerchName] = useState("");
  const [merchChiName, setMerchChiName] = useState("");
  const [merchCat, setMerchCat] = useState<any>("Restaurant");
  const [merchCity, setMerchCity] = useState("Milan");
  const [merchCountry, setMerchCountry] = useState("Italy");
  const [merchPhone, setMerchPhone] = useState("");
  const [merchUrl, setMerchUrl] = useState("");
  const [merchAttribution, setMerchAttribution] = useState("");
  const [merchSuccessMsg, setMerchSuccessMsg] = useState("");
  const [merchLoading, setMerchLoading] = useState(false);

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName.trim() || !contactName.trim() || !email.trim()) return;
    setLeadLoading(true);
    setSuccessMsg("");
    try {
      await onAddLead({
        companyName: companyName.trim(),
        contactName: contactName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        interest,
        sourcePage: sourcePage || "home",
        referrerMedium: referrer,
        city,
        country,
        industry: "Retail"
      });
      setCompanyName("");
      setContactName("");
      setEmail("");
      setPhone("");
      setSuccessMsg("Test Lead custom submitted successfully! Captured real-time in Central CRM with proper SEO attribution tags.");
      setTimeout(() => setSuccessMsg(""), 3500);
    } catch (err) {
      console.error(err);
    } finally {
      setLeadLoading(false);
    }
  };

  const handleMerchantSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!merchName.trim() || !merchChiName.trim() || !merchUrl.trim()) return;
    setMerchLoading(true);
    setMerchSuccessMsg("");
    try {
      await onAddMerchant({
        name: merchName.trim(),
        chineseName: merchChiName.trim(),
        category: merchCat,
        city: merchCity,
        country: merchCountry,
        phone: merchPhone.trim(),
        backlinkUrl: merchUrl.trim(),
        seoAttribution: merchAttribution || "home"
      });
      setMerchName("");
      setMerchChiName("");
      setMerchUrl("");
      setMerchPhone("");
      setMerchSuccessMsg("B2B Merchant Standard registered inside our backlink profile! Reciprocal linker compiled.");
      setTimeout(() => setMerchSuccessMsg(""), 3500);
    } catch (err) {
      console.error(err);
    } finally {
      setMerchLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* CRM Header Toggles */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-5 rounded-xl border border-slate-100 shadow-sm gap-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900 font-sans">Organic Conversions & Regional Directory</h3>
          <p className="text-xs text-slate-500 mt-1 font-sans">
            Reviewing direct consumer enquiries and reciprocal B2B merchant backlinking directories which build long-term site authorities.
          </p>
        </div>
        <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-semibold shrink-0">
          <button
            onClick={() => setActiveTab('leads')}
            className={`px-4 py-1.5 rounded-lg transition-all ${activeTab === 'leads' ? 'bg-white text-slate-950 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
          >
            Leads CRM Queue ({leads.length})
          </button>
          <button
            onClick={() => setActiveTab('directory')}
            className={`px-4 py-1.5 rounded-lg transition-all ${activeTab === 'directory' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
          >
            B2B SME Directory ({merchants.length})
          </button>
        </div>
      </div>

      {activeTab === 'leads' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Core CRM Inquiries Table List */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden flex flex-col justify-between">
            <div>
              <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between text-xs">
                <span className="font-bold text-slate-800 font-sans">Attributed Contact Queue</span>
                <span className="px-2.5 py-0.5 bg-slate-200 rounded-full font-mono text-[10px] font-bold text-slate-650">
                  {leads.length} Leads Total
                </span>
              </div>

              <div className="divide-y divide-slate-100">
                {leads.length === 0 ? (
                  <div className="text-center py-20 text-slate-400 text-xs">
                    No inquiries standard captured. Put some mock inputs into the simulator form on the right.
                  </div>
                ) : (
                  leads.map((lead) => (
                    <div key={lead.id} className="p-4 hover:bg-slate-50/50 transition-all text-xs flex flex-col sm:flex-row justify-between sm:items-center gap-4 text-left">
                      <div className="space-y-1.5 flex-1 animate-fadeIn">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 text-sm">{lead.companyName}</span>
                          <span className="px-2 py-0.5 bg-sky-50 text-indigo-700 border border-sky-100 text-[9px] font-mono font-bold rounded-lg uppercase">
                            {lead.referrerMedium} Link
                          </span>
                          {lead.city && (
                            <span className="text-[10px] text-slate-400 font-mono">
                              • {lead.city}, {lead.country}
                            </span>
                          )}
                        </div>
                        <div className="text-slate-600 font-sans space-y-0.5 pl-1.5 border-l-2 border-slate-150">
                          <p className="font-medium text-slate-800">Cont: {lead.contactName}</p>
                          <p className="text-[11px] text-slate-601 flex items-center gap-1">
                            <Mail className="h-3.5 w-3.5 text-slate-400" /> {lead.email} 
                            {lead.phone && (
                              <>
                                • <Phone className="h-3.5 w-3.5 text-slate-400" /> {lead.phone}
                              </>
                            )}
                          </p>
                        </div>
                        <div className="text-[10px] text-indigo-650 font-mono font-semibold pt-1">
                          Attr URL route: <span className="underline hover:text-sky-600">deepay.srl/{lead.sourcePage}</span>
                        </div>
                      </div>

                      <div className="sm:text-right flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2">
                        <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-lg border capitalize ${
                          lead.status === 'new' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                          lead.status === 'qualified' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                          lead.status === 'contacted' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                          'bg-slate-100 text-slate-600'
                        }`}>
                          {lead.status}
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono tracking-wide uppercase font-bold block bg-slate-10 p-1 px-2 bg-slate-50 border border-slate-100 rounded-md">
                          {lead.interest.replace('_', ' ')}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="p-3 bg-slate-50/50 border-t border-slate-100 text-center text-slate-400 text-[10px] font-mono">
              Captured leads sync automatically with standard API integrations and sales tools.
            </div>
          </div>

          {/* Simulator sidebar form */}
          <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm flex flex-col justify-between">
            <form onSubmit={handleLeadSubmit} className="space-y-4 text-xs">
              <div className="pb-2 border-b border-slate-50 text-left">
                <span className="text-slate-400 font-mono font-bold uppercase text-[9px] tracking-widest block">Simulator Form</span>
                <h3 className="font-bold text-slate-800 text-xs mt-0.5">Submit Lead from Landing Web preview</h3>
              </div>

              {successMsg && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 font-medium rounded-lg text-[11px] leading-snug flex items-start gap-1.5 animate-bounce">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
                  <span>{successMsg}</span>
                </div>
              )}

              <div className="space-y-1 text-left">
                <label className="font-semibold text-slate-500 font-sans uppercase text-[10px]">Merchant/Company Name *</label>
                <input
                  type="text"
                  required
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g., 'Milanese Ristorante Duomo'"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline focus:ring-1 focus:ring-sky-500 text-slate-800 font-sans"
                />
              </div>

              <div className="space-y-1 text-left">
                <label className="font-semibold text-slate-500 font-sans uppercase text-[10px]">Manager/Inquirer Contact *</label>
                <input
                  type="text"
                  required
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder="e.g., 'Antonio G.'"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline focus:ring-1 focus:ring-sky-500 text-slate-800 font-sans"
                />
              </div>

              <div className="grid grid-cols-2 gap-2 text-left">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-500 font-sans uppercase text-[10px]">Email *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="antonio@mail.it"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline focus:ring-1 focus:ring-sky-500 text-slate-805 text-slate-800"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-slate-500 font-sans uppercase text-[10px]">Phone Number</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+39 02 ..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline focus:ring-1 focus:ring-sky-500 text-slate-805 text-slate-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-left">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-500 font-sans uppercase text-[10px]">City</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g., Milan"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline focus:ring-1 focus:ring-sky-500 text-slate-805 text-slate-800"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-slate-500 font-sans uppercase text-[10px]">Country</label>
                  <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder="e.g., Italy"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline focus:ring-1 focus:ring-sky-500 text-slate-805 text-slate-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-left">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-500 font-sans uppercase text-[10px]">Attribution refer *</label>
                  <select
                    value={referrer}
                    onChange={(e) => setReferrer(e.target.value)}
                    className="w-full px-2 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-705 text-slate-700"
                  >
                    <option value="SEO">Organic SEO Search</option>
                    <option value="Direct">Direct hit typing URL</option>
                    <option value="Ads">Google Ads Banner</option>
                    <option value="Social">Social marketing</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-slate-500 font-sans uppercase text-[10px]">Inquiry tag *</label>
                  <select
                    value={interest}
                    onChange={(e) => setInterest(e.target.value)}
                    className="w-full px-2 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-705 text-slate-700"
                  >
                    <option value="free_trial">Free Trial setup</option>
                    <option value="book_demo">Live Video Demo</option>
                    <option value="contact_sales">Enterprise Quote</option>
                    <option value="whatsapp">Direct WhatsApp link</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1 text-left">
                <label className="font-semibold text-slate-500 font-sans uppercase text-[10px]">Source Page URL Route</label>
                <select
                  value={sourcePage}
                  onChange={(e) => setSourcePage(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-755 text-slate-750 font-mono text-[10px] uppercase font-bold"
                >
                  <option value="home">Home Root (/{""})</option>
                  {pages.map(p => (
                    <option key={p.id} value={p.slug}>/{p.slug}</option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                disabled={leadLoading || parentLoading || !companyName.trim() || !contactName.trim()}
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white text-xs font-bold font-sans rounded-lg flex items-center justify-center gap-1 shadow-sm transition-all text-center uppercase tracking-wider cursor-pointer font-semibold"
                id="btn-simulate-lead"
              >
                <UserPlus className="h-4 w-4" />
                Simulate Inbound Contact
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Active SME listings */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden flex flex-col justify-between">
            <div>
              <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between text-xs text-left">
                <div>
                  <h4 className="font-bold text-slate-800 font-sans">Registered B2B Partner Backlink Directory</h4>
                  <p className="text-[10px] text-slate-400 font-sans mt-0.5">Approved local businesses yielding dual-language links directly boost deepay.srl topical index authority.</p>
                </div>
                <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-full font-mono text-[9px] font-bold">
                  {merchants.length} Active Lists
                </span>
              </div>

              <div className="divide-y divide-slate-100">
                {merchants.length === 0 ? (
                  <div className="text-center py-20 text-slate-400 text-xs">
                    No directories registered yet in the B2B cluster. Use the form on the right to enroll.
                  </div>
                ) : (
                  merchants.map((m) => (
                    <div key={m.id} className="p-4 hover:bg-slate-50/50 transition-all text-xs flex flex-col sm:flex-row justify-between sm:items-center gap-4 text-left">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="font-bold text-slate-900 text-sm">{m.name}</span>
                          <span className="text-slate-400">|</span>
                          <span className="text-xs text-slate-600 font-sans font-medium">{m.chineseName}</span>
                          <span className="px-1.5 py-0.2 bg-amber-50 text-amber-700 border border-amber-100 text-[9px] font-mono font-bold rounded">
                            {m.category}
                          </span>
                        </div>
                        <p className="text-slate-500 font-sans text-[11px]">
                          Location: <strong className="text-slate-700">{m.city}, {m.country}</strong> {m.phone ? `• Phone: ${m.phone}` : ""}
                        </p>
                        <div className="flex items-center gap-4 pt-1.5 text-[10px] font-mono text-slate-405 text-slate-450">
                          <span className="flex items-center gap-0.5 text-sky-600">
                            <Link2 className="h-3.5 w-3.5" /> Linkout: <a href={m.backlinkUrl} target="_blank" rel="noopener noreferrer" className="underline font-semibold">{m.backlinkUrl}</a>
                          </span>
                          <span>•</span>
                          <span className="text-emerald-600">Cross Page: deepay.srl/{m.seoAttribution}</span>
                        </div>
                      </div>
                      <div className="shrink-0 flex items-center justify-end">
                        <span className="text-[10px] bg-emerald-50 text-emerald-800 font-bold border border-emerald-100 px-2 py-1 rounded-lg flex items-center gap-1">
                          <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                          Passed Audit
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="p-3.5 bg-emerald-950/5 text-emerald-800 text-[10px] font-mono text-left flex items-start gap-1">
              <Sparkles className="h-4 w-4 shrink-0 text-emerald-600" />
              <span>
                <strong>CTO Back-link Optimization Rules:</strong> Registering local European Chinese merchants allows deepay.srl to form an authoritative cluster, answering "Best local Chinese wholesalers in Prato", and capturing premium regional query leads directly into our CRM.
              </span>
            </div>
          </div>

          {/* Directory form */}
          <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm flex flex-col justify-between">
            <form onSubmit={handleMerchantSubmit} className="space-y-4 text-xs">
              <div className="pb-2 border-b border-slate-50 text-left">
                <span className="text-indigo-600 font-mono font-bold uppercase text-[9px] tracking-widest block">Enrollment Hub</span>
                <h3 className="font-bold text-slate-800 text-xs mt-0.5">Register Co-branded SME Profile</h3>
              </div>

              {merchSuccessMsg && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 font-medium rounded-lg text-[11px] leading-snug flex items-start gap-1.5 animate-bounce">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
                  <span>{merchSuccessMsg}</span>
                </div>
              )}

              <div className="space-y-1 text-left">
                <label className="font-semibold text-slate-500 font-sans uppercase text-[10px]">Merchant English Name *</label>
                <input
                  type="text"
                  required
                  value={merchName}
                  onChange={(e) => setMerchName(e.target.value)}
                  placeholder="e.g., 'Moda Prato SRL'"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline focus:ring-1 focus:ring-sky-500 text-slate-850 text-slate-800"
                />
              </div>

              <div className="space-y-1 text-left">
                <label className="font-semibold text-slate-500 font-sans uppercase text-[10px]">Merchant Chinese Name *</label>
                <input
                  type="text"
                  required
                  value={merchChiName}
                  onChange={(e) => setMerchChiName(e.target.value)}
                  placeholder="e.g., '普拉托顺达服装批发'"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline focus:ring-1 focus:ring-sky-500 text-slate-805 text-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-2 text-left">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-500 font-sans uppercase text-[10px]">Category *</label>
                  <select
                    value={merchCat}
                    onChange={(e) => setMerchCat(e.target.value)}
                    className="w-full px-2 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-705 text-slate-705 text-slate-700"
                  >
                    <option value="Wholesale">Wholesale Hub</option>
                    <option value="Restaurant">Restaurant</option>
                    <option value="Retail">Retail Store</option>
                    <option value="Fashion">Fashion Design</option>
                    <option value="Hotel">Hotel</option>
                    <option value="Logistics">Logistics/Cargo</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-slate-500 font-sans uppercase text-[10px]">Phone contact</label>
                  <input
                    type="text"
                    value={merchPhone}
                    onChange={(e) => setMerchPhone(e.target.value)}
                    placeholder="+39 333 ..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline text-slate-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-left">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-500 font-sans uppercase text-[10px]">City</label>
                  <input
                    type="text"
                    value={merchCity}
                    onChange={(e) => setMerchCity(e.target.value)}
                    placeholder="e.g., Prato"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline text-slate-800"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-slate-500 font-sans uppercase text-[10px]">Country</label>
                  <input
                    type="text"
                    value={merchCountry}
                    onChange={(e) => setMerchCountry(e.target.value)}
                    placeholder="e.g., Italy"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline text-slate-800"
                  />
                </div>
              </div>

              <div className="space-y-1 text-left">
                <label className="font-semibold text-slate-500 font-sans uppercase text-[10px]">External Web Url (Backlink Destination) *</label>
                <input
                  type="url"
                  required
                  value={merchUrl}
                  onChange={(e) => setMerchUrl(e.target.value)}
                  placeholder="https://moda-prato.example.com"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline text-slate-800 text-[11px] font-mono"
                />
              </div>

              <div className="space-y-1 text-left">
                <label className="font-semibold text-slate-500 font-sans uppercase text-[10px]">Cross-Attributing page</label>
                <select
                  value={merchAttribution}
                  onChange={(e) => setMerchAttribution(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-755 text-slate-750 font-mono text-[10px] uppercase font-bold"
                >
                  <option value="home">Home Root (/{""})</option>
                  {pages.map(p => (
                    <option key={p.id} value={p.slug}>/{p.slug}</option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                disabled={merchLoading || parentLoading || !merchName.trim() || !merchChiName.trim() || !merchUrl.trim()}
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white text-xs font-semibold font-sans rounded-lg flex items-center justify-center gap-1 shadow-sm transition-all text-center uppercase tracking-wider cursor-pointer"
                id="btn-register-merchant"
              >
                <Plus className="h-4 w-4" />
                Register SME Backlink
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
