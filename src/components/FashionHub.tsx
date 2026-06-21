import React, { useState } from 'react';
import {
  Search,
  Building2,
  Globe,
  FileText,
  CheckCircle,
  TrendingUp,
  MapPin,
  Users,
  ChevronRight,
  Sparkles,
  Link2,
  ShieldAlert,
  ExternalLink,
  Scissors,
  Award,
  Clock,
  Briefcase,
  HelpCircle,
  Play
} from 'lucide-react';

interface FashionHubProps {
  lang: string;
}

export default function FashionHub({ lang }: FashionHubProps) {
  // Navigation tabs of Fashion Hub
  const [activeSubTab, setActiveSubTab] = useState<'home' | 'directory' | 'pipeline' | 'academy'>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Directory selected company
  const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(null);
  const [claimingCompanyId, setClaimingCompanyId] = useState<string | null>(null);
  const [claimEmail, setClaimEmail] = useState('');
  const [claimVat, setClaimVat] = useState('');
  const [isClaimSubmitted, setIsClaimSubmitted] = useState(false);
  const [claimsList, setClaimsList] = useState<string[]>([]);

  // Selected article
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);

  // Automated pipeline state
  const [isSimulatingCron, setIsSimulatingCron] = useState(false);
  const [cronProgress, setCronProgress] = useState(0);
  const [cronLogs, setCronLogs] = useState<string[]>([
    "[00:00:10 AM] 🤖 Fashion Hub Cron Scheduler initialized for today.",
    "[00:01:45 AM] 📰 Crawled Pitti Uomo & Milan Fashion week feeds. Discovering trends: \"Sustainable Linen blends\" + \"RFID stock chains\".",
    "[00:03:12 AM] ✍️ AI restructurer started today's automatic 10-article crop. Language targets: EN, IT, ZH.",
    "[00:05:40 AM] 🏷️ Schema engine built Organisation and Product microdata JSON-LD blocks for our directory entries.",
    "[00:07:05 AM] 🔗 Canonical link verified for 3 hreflang pairs: en-html, it-html, zh-html. Zero duplicates recorded.",
    "[00:08:22 AM] 🗺️ GSC Link Injector injected deep anchors pointing toapp.deepay.srl."
  ]);

  // Static articles with complete content, translation, FAQs, and JSON-LD schema
  const [articles, setArticles] = useState([
    {
      id: 'fa1',
      titleEn: 'The Prato Apparel Manufacturing Renaissance: Sourcing Sustainable Linens and Digitizing Stock Control',
      titleIt: 'La Rinascita della Manifattura Abbigliamento a Prato: Approvvigionamento di Lino Sostenibile e Digitalizzazione dello Stock',
      titleZh: '普拉托服装制造文艺复兴：采购可持续亚麻并数字化库存周转控制',
      descEn: 'How Tuscan factories are adopting deep POS/ERP telemetry to balance international fast-fashion restocking cycles.',
      descIt: 'Come le fabbriche toscane stanno adottando la telemetria profonda POS/ERP per bilanciare i cicli di rifornimento della moda veloce internazionale.',
      descZh: '托斯卡纳服装厂如何采用深度的 POS/ERP 遥测来平衡国际快时尚的快速补货周期。',
      category: 'Manufacturers',
      views: 3820,
      readTime: '6 min',
      date: '2026-06-21',
      author: 'Matteo Rossi',
      contentEn: `The historic textile manufacturing epicenter of Prato, Tuscany is undergoing an unprecedented digital overhaul. Confronted with skyrocketing global demand for rapid fabric prototyping and eco-friendly linens, regional apparel suppliers are shifting away from manual ledgers. Rather than maintaining fragmented paper trail receipts, advanced operators are deploying low-latency webhooks. By bridging physical sewing lines directly with automated ERP inventories, Prato fast-fashion creators bypass third-party payment middleman fees, redirecting liquidity back into yarn sourcing.`,
      contentIt: `Lo storico epicentro della manifattura tessile di Prato, in Toscana, sta subendo un restyling digitale senza precedenti. Di fronte alla domanda globale alle stelle di prototipazione rapida dei tessuti e lino ecologico, i fornitori regionali di abbigliamento stanno abbandonando i registri manuali. Invece di mantenere ricevute cartacee frammentate, gli operatori avanzati stanno implementando webhook a bassa latenza. Collegando le linee di cucito fisiche direttamente con gli inventari ERP automatizzati, i creatori di moda veloce pratese evitano le commissioni degli intermediari di pagamento di terze parti.`,
      contentZh: `意大利托斯卡纳普拉托的历史纺织制造中心正在经历一场前所未有的数字化升级。面对全球对快速织物打样和环保亚麻的暴涨需求，区域服装供应商正在告别传统的手工账本。先进的运营商并未使用零碎的纸质单据，而是部署了低延迟 Webhook。通过将实体缝纫生产线与 ERP 自动化库存直接对接，普拉托的快时尚制作者可以绕过第三方支付中间商的层层卡扣，将流动性重新投入原材料采购中。`,
      faq: [
        { q: 'How does Prato fast fashion bypass legacy clearing house fees?', a: 'By utilizing direct local SEPA clearing networks integrated natively into Deepay OS.' },
        { q: 'Can Deepay ERP synchronize with standard GTIN tags?', a: 'Yes, full compatibility with RFID and QR-code systems allows zero-error shelf scanning.' }
      ],
      slug: '/fashion/prato-apparel-renaissance',
      schema: {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "The Prato Apparel Manufacturing Renaissance",
        "description": "How Tuscan factories are adopting deep POS/ERP telemetry to balance restocking cycles.",
        "author": {
          "@type": "Person",
          "name": "Matteo Rossi"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Deepay Hub",
          "logo": {
            "@type": "ImageObject",
            "url": "https://deepay.srl/logo.png"
          }
        },
        "mainEntityOfPage": "https://deepay.srl/fashion/prato-apparel-renaissance"
      }
    },
    {
      id: 'fa2',
      titleEn: 'Milan Fashion Week 2026: Multi-channel POS & RFID Integrations Drive Retail Cash Flow Optimization',
      titleIt: 'Milano Fashion Week 2026: Integrazioni POS multi-canale e RFID Guidano l\'Ottimizzazione dei Flussi di Cassa',
      titleZh: '米兰时装周 2026：多渠道收银 POS 与 RFID 芯片集成如何驱动零售现金流优化',
      descEn: 'Exploring the seamless blend of micro-ledgers and point-of-sale hardware on the show floor to capture instant buyers.',
      descIt: 'Esplorare la fusione perfetta di micro-registri e hardware POS sulle passerelle per catturare acquirenti istantanei.',
      descZh: '探讨在秀场展厅将微型分类账与智能收银终端完美接洽，即刻捕捉高净值买手的瞬态支付。',
      category: 'Fashion Trends',
      views: 5120,
      readTime: '4 min',
      date: '2026-06-20',
      author: 'Sofia Bianchi',
      contentEn: `Milan MFW 2026 has set a new record for real-time commerce activation. Rather than asking boutique representatives to send manual pro-forma bank wires for autumn collections, showrooms utilized wireless Tap to Pay and integrated billing APIs on standard Android handheld controllers. The result was instantaneous invoicing complete with automatically generated electronic XML fiscal documents submitted instantly to the government ledger.`,
      contentIt: `Milano MFW 2026 ha stabilito un nuovo record per l'attivazione del commercio in tempo reale. Invece di chiedere ai rappresentanti delle boutique di inviare bonifici pro-forma manuali per le collezioni autunnali, gli showroom hanno utilizzato il sistema Tap to Pay wireless e API di fatturazione integrate su controller portatili Android standard.`,
      contentZh: `米兰 2026 MFW 创下了实时商业转化的全新记录。展厅并没有要求买手代理为秋季系列发送手动形式发票和银行汇款，而是使用了无线 Tap to Pay 以及集成在标准安卓手持设备上的结算 API，实现即时发票出具并自动生成符合意大利税务局 RT 规范的电子 XML 文件。`,
      faq: [
        { q: 'Are showroom sales tax-compliant under RT XML requirements?', a: 'Yes, each ticket immediately signs the transaction with secure local hardware signature modules.' }
      ],
      slug: '/fashion/milan-mfw-pos-rfid',
      schema: {
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        "headline": "Milan Fashion Week 2026: Multi-channel POS & RFID Integrations",
        "description": "Exploring the seamless blend of micro-ledgers and point-of-sale hardware at MFW.",
        "author": {
          "@type": "Person",
          "name": "Sofia Bianchi"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Deepay Hub"
        }
      }
    },
    {
      id: 'fa3',
      titleEn: 'The Ultimate Guide to Italian Wholesale Sourcing: Direct Factory Hubs in Tuscany & Lombardy',
      titleIt: 'La Guida Definitiva all\'Approvvigionamento all\'Ingrosso in Italia: Hub Distribuzione in Toscana e Lombardia',
      titleZh: '意大利服装批发采购终极指南：透视托斯卡纳与伦巴第大区的厂家直供中心',
      descEn: 'Compare VAT triangular delivery paths, local fiscal customs, and direct clearing advantages.',
      descIt: 'Confronta i percorsi di consegna triangolare IVA, le dogane fiscali locali e i vantaggi della compensazione diretta.',
      descZh: '深度对比跨国 VAT 三角贸易流转路径、本地出口报税规则和直连清算优势。',
      category: 'Wholesale',
      views: 4590,
      readTime: '8 min',
      date: '2026-06-19',
      author: 'Luca Moretti',
      contentEn: `Wholesale fashion forms the backbone of the European retail ecosystem. Sourcing directly from Florence and Como requires thorough compliance checks. By ensuring correct VAT treatment and automated breadcrumb trails for shipping, wholesalers can mitigate custom delays and save critical percentages of transaction volume through non-markup payment processors.`,
      contentIt: `La moda all'ingrosso costituisce la spina dorsale dell'ecosistema retail europeo. L'approvvigionamento diretto da Firenze e Como richiede rigorosi controlli di conformità fiscale e tracciamento.`,
      contentZh: `批发门类是整个欧洲零售体系的真正支柱。直接在佛罗伦萨或科莫采购需要严格的合规核查。通过配置完美的跨国 VAT 离线抵扣路径、透明的海关装箱单，批发商不仅能绕过海关延迟，还能通过无套路、无隐性费率的支付网关保护珍贵的毛利空间。`,
      faq: [
        { q: 'What is the standard VAT rate for fashion wholesale export?', a: 'Exports out of the EU or inter-community B2B transactions often fall under zero-rated OSS VAT schemes.' }
      ],
      slug: '/fashion/italian-wholesale-guide',
      schema: {
        "@context": "https://schema.org",
        "@type": "TechArticle",
        "headline": "The Ultimate Guide to Italian Wholesale Sourcing",
        "description": "Compare VAT triangular delivery paths, local fiscal customs, and direct clearing advantages.",
        "author": {
          "@type": "Person",
          "name": "Luca Moretti"
        }
      }
    }
  ]);

  // Enterprise Directory Data
  const [directory, setDirectory] = useState([
    {
      id: 'c1',
      nameEn: 'Tuscany Prato Fast-Fashion Apparel Factory S.R.L.',
      nameZh: '普拉托托斯卡纳极速时尚制衣工厂 S.R.L.',
      nameIt: 'Tuscany Prato Fabbrica Abbigliamento S.R.L.',
      category: 'Manufacturers',
      city: 'Prato',
      address: 'Via dei Fossi 48, 59100 Prato (PO), Italy',
      vat: 'IT01234567890',
      employees: '45 skilled tailors',
      specialtyEn: 'Knitwear, Linen blend trousers, high-volume fast fashion batch drafting.',
      specialtyZh: '高档针织、亚麻混纺裤装、高吞吐快时尚打样与批量制衣。',
      specialtyIt: 'Maglieria, pantaloni in misto lino, campionatura rapida ad alto volume.',
      phone: '+39 0574 5543xx',
      email: 'factory@pratofastfashion.it',
      claimed: false,
      capacity: '20,000 garments/month'
    },
    {
      id: 'c2',
      nameEn: 'Vittorio Veneto Premium Silk & Fabric Mills',
      nameZh: '伦巴第维托里奥威尼托真丝与高档纺织织房',
      nameIt: 'Tessitura Vittorio Veneto S.p.a.',
      category: 'Fabric Center',
      city: 'Como',
      address: 'Viale della Seta 12, 22100 Como (CO), Italy',
      vat: 'IT09876543210',
      employees: '120 loom specialists',
      specialtyEn: 'Jacquard patterns, organic raw silk, water-proof cotton blends.',
      specialtyZh: '大提花面料、天然有机生丝、高密度防水弹力棉锦混纺。',
      specialtyIt: 'Motivi Jacquard, seta grezza organica, cotone impermeabile.',
      phone: '+39 031 3345xx',
      email: 'sales@vittoriosilk.it',
      claimed: false,
      capacity: '50,000 meters/month'
    },
    {
      id: 'c3',
      nameEn: 'Milano Central Luxury Showroom Network',
      nameZh: '米兰中心商圈奢华时装展厅网络',
      nameIt: 'Milano Central Luxury Showroom Network',
      category: 'Fashion Brands',
      city: 'Milano',
      address: 'Via della Spiga 10, 20121 Milano (MI), Italy',
      vat: 'IT04455667788',
      employees: '25 client coordinators',
      specialtyEn: 'Showroom hosting, B2B wholesale orders, international shipping logistics.',
      specialtyZh: '样装展厅承托管、B2B批发出单、国际货代门对门物流接洽。',
      specialtyIt: 'Ospitalità showroom, ordini all\'ingrosso B2B, logistica internazionale.',
      phone: '+39 02 7600xx',
      email: 'contact@milanoshownet.com',
      claimed: true,
      capacity: '80 brands managed'
    }
  ]);

  // Industry Map Data
  const regionMap = [
    { name: 'Prato (PO)', roleEn: 'Fast-Fashion Apparel Cluster', roleZh: '快时尚服装制造基地', roleIt: 'Abbigliamento Fast-Fashion', factories: '1,200+', loadEn: 'Loom & Assembly', loadZh: '梭织与面料打样' },
    { name: 'Como (CO)', roleEn: 'Luxury Silk & Loom Mills', roleZh: '奢华丝绸与顶级提花', roleIt: 'Seta e Jacquard di lusso', factories: '450+', loadEn: 'Organic raw silk weaving', loadZh: '天然蚕丝织造印染' },
    { name: 'Milano (MI)', roleEn: 'Showrooms & Brands Headquarters', roleZh: '奢华展厅与品牌总部中心', roleIt: 'Showroom e Sedi di lusso', factories: '900+', loadEn: 'Worldwide Distribution B2B', loadZh: '全球 B2B 批发分销' },
    { name: 'Florence (FI)', roleEn: 'Premium Leather & Bag Stitching', roleZh: '高级皮具与手工缝制皮包', roleIt: 'Pelletteria e Borse di lusso', factories: '680+', loadEn: 'Artisanal tooling & hides', loadZh: '皮料鞣制与定制五金' }
  ];

  // Hot Job postings
  const jobList = [
    { titleEn: 'B2B Wholesale Account Manager', titleZh: 'B2B 服装外贸批发客户经理', location: 'Prato', pay: '€3,200 - €4,500/mo', type: 'Full-time' },
    { titleEn: 'Jacquard Loom Technical Supervisor', titleZh: '数码大提花织机技术主管', location: 'Como', pay: '€4,000 - €5,500/mo', type: 'Full-time' },
    { titleEn: 'Showroom Visual Merchandiser', titleZh: '买手展厅陈列与主视觉配搭师', location: 'Milano', pay: '€2,800 - €3,500/mo', type: 'Contract' }
  ];

  // Simulated triggers
  const executeCronCycle = () => {
    setIsSimulatingCron(true);
    setCronProgress(10);
    const interval = setInterval(() => {
      setCronProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setIsSimulatingCron(false);
          setCronLogs((prev) => [
            `[${new Date().toLocaleTimeString()}] 🚀 Daily AI Crawling and SEO generation cycle completed. 15 new wiki canonical pairs published!`,
            ...prev
          ]);
          return 100;
        }
        return p + 15;
      });
    }, 400);
  };

  const handleClaimProfile = (companyId: string) => {
    setClaimingCompanyId(companyId);
    setClaimEmail('');
    setClaimVat('');
    setIsClaimSubmitted(false);
  };

  const submitClaim = (e: React.FormEvent) => {
    e.preventDefault();
    if (!claimEmail || !claimVat) return;
    setIsClaimSubmitted(true);
    setClaimsList((prev) => [...prev, claimingCompanyId!]);
    setCronLogs((prev) => [
      `[${new Date().toLocaleTimeString()}] 🛡️ Claim request submitted for Company ID: ${claimingCompanyId}. Verification code routed to ${claimEmail}.`,
      ...prev
    ]);
  };

  // Helper translations helper
  const t = (zh: string, en: string, it: string) => {
    if (lang === 'zh') return zh;
    if (lang === 'it') return it;
    return en;
  };

  // Filter directories based on query & category
  const filteredDirectory = directory.filter((comp) => {
    const matchesCategory = categoryFilter === 'all' || comp.category === categoryFilter;
    const s = searchQuery.toLowerCase();
    const matchesSearch =
      comp.nameEn.toLowerCase().includes(s) ||
      comp.nameZh.toLowerCase().includes(s) ||
      comp.nameIt.toLowerCase().includes(s) ||
      comp.city.toLowerCase().includes(s) ||
      comp.vat.toLowerCase().includes(s);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8 text-left font-sans text-gray-200">
      
      {/* 1. SECTOR HERO HEADER */}
      <div className="relative p-8 rounded-3xl overflow-hidden bg-gradient-to-br from-[#1C122C] via-[#0E071D] to-black border border-purple-500/20 shadow-[0_20px_50px_rgba(147,51,234,0.1)]">
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full filter blur-[80px] pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-teal-500/10 rounded-full filter blur-[80px] pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full text-[10px] font-bold tracking-widest text-purple-400 uppercase font-mono">
              <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
              {t("一级生态板块", "Primary Ecosystem Wing", "Ecosistema di Primo Livello")}
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-none">
              👗 Fashion Hub
            </h1>
            <p className="text-sm text-gray-300 max-w-xl font-mono">
              {t(
                "欧洲服装产业数字底座 / 建立今日时尚资讯、精细化供应商、面料中心及自动 SEO 网络。",
                "European Fashion Business Ecosystem / Consolidating top textile mills, manufacturing directories, and automated SEO networks.",
                "Ecosistema della moda europea / Mappa dei fornitori, tessuti pratesi e reti di automazione SEO."
              )}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => {
                setActiveSubTab('home');
                setSelectedCompanyId(null);
                setSelectedArticleId(null);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeSubTab === 'home' && !selectedCompanyId && !selectedArticleId
                  ? 'bg-purple-600 text-white shadow'
                  : 'bg-white/5 hover:bg-white/10 text-gray-300'
              }`}
            >
              🏠 {t("产业地图", "Ecosystem Home", "Mappa & Home")}
            </button>
            <button
              onClick={() => {
                setActiveSubTab('directory');
                setSelectedArticleId(null);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeSubTab === 'directory'
                  ? 'bg-purple-600 text-white shadow'
                  : 'bg-white/5 hover:bg-white/10 text-gray-300'
              }`}
            >
              🏭 {t("企业名录", "Suppliers Directory", "Elenco Fornitori")}
            </button>
            <button
              onClick={() => {
                setActiveSubTab('pipeline');
                setSelectedCompanyId(null);
                setSelectedArticleId(null);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeSubTab === 'pipeline'
                  ? 'bg-purple-600 text-white shadow'
                  : 'bg-white/5 hover:bg-white/10 text-gray-300'
              }`}
            >
              🧠 {t("AI 自动工厂 & 内链", "AI Cron & SEO Linker", "Cron AI & Link Interni")}
            </button>
          </div>
        </div>
      </div>

      {/* 2. BREADCRUMBS (IMPORTANT FOR TOPICAL AUTHORITY AND CANONICAL SEARCH CLAW) */}
      <div className="px-1 py-1 flex flex-wrap items-center justify-between text-xs font-mono text-gray-400 gap-2 border-b border-white/5 pb-3">
        <div className="flex items-center gap-1.5">
          <span>deepay.srl</span>
          <ChevronRight className="w-3.5 h-3.5 text-gray-600" />
          <span className="text-purple-400 font-bold">fashion</span>
          {selectedArticleId && (
            <>
              <ChevronRight className="w-3.5 h-3.5 text-gray-600" />
              <span className="text-teal-400 max-w-[120px] truncate">{selectedArticleId}</span>
            </>
          )}
          {selectedCompanyId && (
            <>
              <ChevronRight className="w-3.5 h-3.5 text-gray-600" />
              <span className="text-teal-400 max-w-[120px] truncate">{selectedCompanyId}</span>
            </>
          )}
        </div>
        <div className="flex items-center gap-4 text-[10px]">
          <span className="inline-flex items-center gap-1 text-emerald-400 font-bold">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" />
            hreflang="en-it-zh"
          </span>
          <span className="text-gray-500">
            Canonical: <span className="text-gray-300 font-bold">https://deepay.srl/fashion</span>
          </span>
        </div>
      </div>

      {/* ----------------- SUB-TAB: HOME ----------------- */}
      {activeSubTab === 'home' && !selectedArticleId && !selectedCompanyId && (
        <div className="space-y-8">
          
          {/* TOP TRENDS TICKER */}
          <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-500/10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-purple-400" />
              <span className="text-xs font-bold text-white uppercase font-mono tracking-wider">
                {t("今日时尚直连资讯", "TODAY LIVE TIMEFRAME FEEDS", "TESSUTI & TREND IN TEMPO REALE")}
              </span>
            </div>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="px-2 py-0.5 bg-black/40 border border-white/5 rounded-full text-[11px] text-gray-300">
                🇮🇹 MFW Trend: <strong className="text-teal-300">Sustainable Linen blends</strong>
              </span>
              <span className="px-2 py-0.5 bg-black/40 border border-white/5 rounded-full text-[11px] text-gray-300">
                🧶 Fabric Stock control: <strong className="text-purple-300">RFID tracking</strong>
              </span>
            </div>
          </div>

          {/* EUROPE APPAREL CONCENTRATION MAP (Prato, Como, Milano, Firenze) */}
          <div className="p-6 rounded-2xl bg-black/60 border border-white/5 space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              🗺️ {t("欧洲服装产业精密地理版图", "Lombardy & Tuscany Fashion Industry Geographic Spec Map", "Mappa Geografica del Distretto Tessile")}
            </h2>
            <p className="text-xs text-gray-400 leading-relaxed max-w-xl">
              {t(
                "深度透视意大利重要的 B2B 纺织制衣带。通过 Deepay OS 结算系统实现零费率、自动化清算，降低中转摩擦损耗。",
                "A dense representation of highly specialized manufacturing hubs across Prato, Como, and Milano configured with direct localized SEPA gateway loops.",
                "I distretti produttivi di Prato e Como sono ora interconnessi ai canali di regolamento locale di Deepay OS per eliminare le commissioni delle carte."
              )}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {regionMap.map((reg, idx) => (
                <div key={idx} className="p-4 bg-white/5 rounded-xl border border-white/10 hover:border-purple-500/30 transition-all flex justify-between items-start gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-purple-400" />
                      <h3 className="text-sm font-bold text-white">{reg.name}</h3>
                    </div>
                    <p className="text-xs text-purple-300 font-bold font-mono">
                      {t(reg.roleZh, reg.roleEn, reg.roleIt)}
                    </p>
                    <p className="text-[11px] text-gray-400">
                      <strong>Metrics:</strong> {reg.loadEn} ({reg.loadZh})
                    </p>
                  </div>
                  <span className="px-2 py-1 bg-purple-500/10 text-purple-400 font-mono text-[10px] rounded-md font-bold uppercase shrink-0">
                    {reg.factories} factories
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* HOT ARTICLES (TOP TRENDS & INDUSTRY MANUALS) */}
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-white/5 pb-2">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                📰 {t("行业每日头条 & 专业指南", "Editorial & Compliance Guide Index", "Articoli di Tendenza e Fiscale")}
              </h2>
              <button
                onClick={() => setActiveSubTab('pipeline')}
                className="text-xs text-purple-400 font-bold hover:underline font-mono"
              >
                Auto-Generation Pipeline Logger →
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {articles.map((art) => (
                <div
                  key={art.id}
                  onClick={() => setSelectedArticleId(art.id)}
                  className="bg-white/5 border border-white/15 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-purple-500/40 cursor-pointer hover:-translate-y-0.5 transition-all p-5 space-y-4 text-left"
                >
                  <div className="space-y-2">
                    <span className="px-2.5 py-1 bg-purple-500/10 border border-purple-500/20 text-purple-400 font-mono text-[9px] font-bold rounded-full uppercase">
                      {art.category}
                    </span>
                    <h3 className="text-sm font-bold text-white line-clamp-2 leading-snug hover:text-purple-300 transition-colors">
                      {t(art.titleZh, art.titleEn, art.titleIt)}
                    </h3>
                    <p className="text-xs text-gray-400 line-clamp-3 leading-normal">
                      {t(art.descZh, art.descEn, art.descIt)}
                    </p>
                  </div>

                  <div className="flex justify-between items-center text-[10px] text-gray-500 font-mono border-t border-white/5 pt-3">
                    <span>{art.author}</span>
                    <span>{art.readTime} reading</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* DEMANDS, SPONSORS & HOT JOB LEADS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* JOBS LEADS */}
            <div className="p-6 rounded-2xl bg-black/60 border border-white/5 space-y-4">
              <div className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-teal-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                  {t("服装集散区即刻雇佣资讯", "B2B Apparel District Careers Board", "Posizioni di Lavoro Aperte")}
                </h3>
              </div>
              <p className="text-xs text-gray-400">
                {t(
                  "普拉托、米兰与科莫针织与仓储基地最新发布的真实高级雇佣公告。配对高效支付结算操作员。",
                  "Direct live leads posted by wholesale brands looking for backoffice operations and warehouse clearing managers.",
                  "Offerte di lavoro caricate dai grossisti di maglieria per operatori backoffice e gestori di cassa."
                )}
              </p>

              <div className="space-y-3">
                {jobList.map((job, idx) => (
                  <div key={idx} className="p-3 bg-white/5 border border-white/15 rounded-xl flex justify-between items-center gap-4 text-xs">
                    <div>
                      <h4 className="font-bold text-gray-200">{t(job.titleZh, job.titleEn, job.titleEn)}</h4>
                      <span className="text-[10px] font-mono text-gray-500">📍 {job.location} | {job.type}</span>
                    </div>
                    <span className="text-xs font-mono font-bold text-teal-300">{job.pay}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* HOT FABRIC SHOWCASE */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-950/20 to-purple-950/20 border border-purple-500/10 space-y-4">
              <div className="flex items-center gap-2">
                <Scissors className="w-5 h-5 text-purple-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                  🧶 {t("高密度特种面料中心", "Premium Technical Yarn & Fabric Center", "Tessile e Smerigliatura")}
                </h3>
              </div>
              <p className="text-xs text-gray-400">
                {t(
                  "当季推荐、绿色低碳面料源。直接点击即可申请匹配源产地供货合同，并通过 Deepay 电子发票模块自动报税。",
                  "Directly trade premium knitwear, linen blends, and organic mulberry silk from Tuscany and Lombardy weave partners.",
                  "Tessuto jacquard ed ecosostenibile, pronto per esportazione con fatturazione elettronica automatica."
                )}
              </p>

              <div className="p-4 bg-black/40 rounded-xl space-y-2 text-xs">
                <div className="flex justify-between text-gray-300">
                  <span>🍃 Tuscany Organic Hemp Linen Blend</span>
                  <span className="font-bold text-purple-400">€7.80 / meter</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>⚡ Como Dig-Printed Jacquard Silk</span>
                  <span className="font-bold text-purple-400">€24.50 / meter</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>🧶 Prato Recycled Carded Cashmere</span>
                  <span className="font-bold text-purple-400">€18.20 / meter</span>
                </div>
              </div>
            </div>

          </div>

          {/* V4 BRAND IDENTITY COOPERATIVE CLUSTERING */}
          <div className="p-8 rounded-3xl bg-gradient-to-r from-purple-950/30 to-black border border-purple-500/20 flex flex-col sm:flex-row justify-between items-center gap-6">
            <div className="space-y-2 max-w-xl">
              <h3 className="text-lg font-bold text-white">
                🛡️ {t("全面防护：所有采购自带信用审查", "Built-in Entity Trust Mechanisms for Italian Sourcing", "Meccanismi di Fiducia Coerenti")}
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                {t(
                  "Deepay 绝非泛泛的资讯页面，所有文章自动生成 Google 偏好的 FAQ 格式规范结构，让品牌在 AI 搜索引擎和语义搜索里长期积累极高权重。",
                  "Every page automatically generates rigorous organization schema files conforming to the core rules of European tax authorities, allowing wholesale merchants to maintain seamless audit readiness.",
                  "Tutte le schede dei fornitori mostrano le specifiche partita IVA verificate per la conformità di bilancio."
                )}
              </p>
            </div>
            <button
              onClick={() => {
                setActiveSubTab('directory');
              }}
              className="px-5 py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs uppercase tracking-wide rounded-xl transition-all cursor-pointer shadow-lg shadow-purple-900/40"
            >
              {t("立即检索认证企业 →", "Search Verified Directory Now →", "Vedi Fornitori Autenticati →")}
            </button>
          </div>

        </div>
      )}

      {/* ----------------- SUB-TAB: DIRECTORY ----------------- */}
      {activeSubTab === 'directory' && !selectedCompanyId && !selectedArticleId && (
        <div className="space-y-6">
          
          {/* SEARCH AND FILTER BAR */}
          <div className="p-6 rounded-2xl bg-black/60 border border-white/5 space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center">
              <div>
                <h2 className="text-md font-bold text-white uppercase tracking-wider font-mono">
                  {t("意大利服装及面料合规名录", "Apparel & Fabric Directory Search", "Database Fornitori Italiani Verificati")}
                </h2>
                <p className="text-xs text-gray-400 mt-1">
                  {t("数据定期校验，点击企业可查看详细的 B2B 产能、VAT 号以及企业认领入口。", "Authentic dataset. Click on any listing to inspect capacities, check VAT, and access direct claim options.", "Filtra per produttori di lino, setifici, o distributori all'ingrosso di abbigliamento.")}
                </p>
              </div>

              {/* SEARCH BOX */}
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t("搜索名字、城市或注册号...", "Search name, city, VAT...", "Cerca nome, città, p. IVA...")}
                  className="w-full sm:w-64 bg-white/5 border border-white/10 hover:border-purple-500/30 focus:border-purple-500 px-4 py-2 pl-10 text-xs text-white rounded-xl focus:outline-none transition-all"
                />
                <Search className="absolute left-3.5 top-3 w-4 h-4 text-gray-500" />
              </div>
            </div>

            {/* CATEGORY TAGS */}
            <div className="flex flex-wrap gap-2 pt-2 border-t border-white/5">
              {[
                { id: 'all', labelEn: 'All Listings', labelZh: '全部企业名录' },
                { id: 'Manufacturers', labelEn: 'Factories & Mills', labelZh: '工厂与制造商' },
                { id: 'Fabric Center', labelEn: 'Fabric & Silk Mills', labelZh: '面料与原料中心' },
                { id: 'Fashion Brands', labelEn: 'Luxury Showrooms', labelZh: '时装展厅与品牌' }
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setCategoryFilter(cat.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    categoryFilter === cat.id
                      ? 'bg-purple-600 border border-purple-500 text-white'
                      : 'bg-white/5 hover:bg-white/10 text-gray-400'
                  }`}
                >
                  {t(cat.labelZh, cat.labelEn, cat.labelEn)}
                </button>
              ))}
            </div>
          </div>

          {/* LISTINGS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredDirectory.map((comp) => {
              const claimedBySelf = claimsList.includes(comp.id);
              return (
                <div
                  key={comp.id}
                  className="p-6 bg-[#0E071D]/40 border border-purple-500/10 hover:border-purple-500/30 rounded-2xl flex flex-col justify-between text-left space-y-4"
                >
                  <div className="space-y-2">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <span className="px-2 py-0.5 bg-purple-500/10 text-purple-400 text-[9px] font-mono font-bold uppercase rounded-md border border-purple-500/20">
                          {comp.category}
                        </span>
                        <h3 className="text-base font-bold text-white mt-1.5 hover:text-purple-300 transition-colors">
                          {t(comp.nameZh, comp.nameEn, comp.nameIt)}
                        </h3>
                        <span className="text-xs text-gray-400 font-mono block mt-1">📍 {comp.address}</span>
                      </div>

                      {/* CLAIM STATUS FLAG */}
                      <span className={`px-2 py-1 text-[9px] font-mono font-bold uppercase rounded ${
                        comp.claimed || claimedBySelf
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                      }`}>
                        {comp.claimed || claimedBySelf ? '✓ Verified Entity' : '✕ Unclaimed'}
                      </span>
                    </div>

                    <p className="text-xs text-gray-300 leading-relaxed font-sans mt-2">
                      <strong>Specialty:</strong> {t(comp.specialtyZh, comp.specialtyEn, comp.specialtyIt)}
                    </p>

                    <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-gray-400 border-t border-white/5 pt-3">
                      <div>🏢 Staff: <span className="text-white">{comp.employees}</span></div>
                      <div>⚡ Capacity: <span className="text-white">{comp.capacity}</span></div>
                    </div>
                  </div>

                  {/* BOTTOM BUTTONS IN CARD */}
                  <div className="flex items-center justify-between border-t border-white/5 pt-3">
                    <button
                      onClick={() => setSelectedCompanyId(comp.id)}
                      className="px-3.5 py-1.5 bg-white/5 hover:bg-white/10 hover:text-white text-xs font-bold text-gray-300 rounded-lg cursor-pointer"
                    >
                      {t("查看详细 SEO 网页 →", "View Detailed Webpage →", "Vedi Pagina Web →")}
                    </button>

                    {!(comp.claimed || claimedBySelf) && (
                      <button
                        onClick={() => handleClaimProfile(comp.id)}
                        className="px-3.5 py-1.5 bg-purple-500/10 hover:bg-purple-600 hover:text-white text-xs text-purple-400 border border-purple-500/25 rounded-lg cursor-pointer transition-all"
                      >
                        {t("认领企业 🛡️", "Claim Profile 🛡️", "Rivendica Profilo 🛡️")}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* NO RESULTS FOUND STATE */}
          {filteredDirectory.length === 0 && (
            <div className="p-12 text-center rounded-2xl bg-white/5 border border-dashed border-white/15">
              <span className="text-4xl">🔍</span>
              <h3 className="text-sm font-bold text-gray-300 mt-2">No Verified Manufacturers Match Your Search</h3>
              <p className="text-xs text-gray-500 mt-1">Try querying general regions like "Prato" or specialties like "Jacquard".</p>
            </div>
          )}

          {/* CLAIM OVERLAY DIALOGUE (MOCK AUTHENTICATION PROOF OVERLAY) */}
          {claimingCompanyId && (
            <div className="p-6 rounded-2xl bg-[#1c122c]/90 border border-purple-500/30 space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-white/5">
                <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                  <ShieldAlert className="w-4.5 h-4.5 text-purple-400" />
                  <span>{t("企业权属认领与合规审核", "B2B Brand Verification & Protection Claim", "Rivendica e Proteggi il tuo Brand")}</span>
                </h3>
                <button
                  onClick={() => setClaimingCompanyId(null)}
                  className="text-gray-400 hover:text-white text-xs font-mono"
                >
                  ✕
                </button>
              </div>

              {!isClaimSubmitted ? (
                <form onSubmit={submitClaim} className="space-y-4 text-xs">
                  <p className="text-gray-400 leading-normal">
                    {t(
                      "输入公司所属的 partita IVA 以及企业官方联系邮箱。系统将自动比对塞斯托/普拉托税局实核接口，发放拥有权以供修改产能参数。",
                      "Provide your valid Italian partita IVA and corporate administrator email address to authenticate with our regional Sdi registry.",
                      "Inserisci la partita IVA e l'email amministrativa per sincronizzare la scheda con il sistema fiscale Sdi."
                    )}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-gray-400 uppercase tracking-wider text-[10px] font-mono block">Italian Partita IVA:</label>
                      <input
                        type="text"
                        required
                        value={claimVat}
                        onChange={(e) => setClaimVat(e.target.value)}
                        placeholder="e.g., IT01234567890"
                        className="w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-white font-mono"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-gray-400 uppercase tracking-wider text-[10px] font-mono block">Verification Email Address:</label>
                      <input
                        type="email"
                        required
                        value={claimEmail}
                        onChange={(e) => setClaimEmail(e.target.value)}
                        placeholder="e.g., administrator@factory.it"
                        className="w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-white font-mono"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setClaimingCompanyId(null)}
                      className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg font-bold"
                    >
                      {t("取消", "Discard", "Annulla")}
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-bold"
                    >
                      {t("提交权属核对 →", "Initiate Brand Authorization →", "Richiedi Sincronizzazione →")}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl space-y-2 text-center">
                  <span className="text-2xl">✓</span>
                  <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-widest font-mono">
                    Authentication Pending
                  </h4>
                  <p className="text-xs text-gray-300">
                    {t(
                      "安全代码已成功投递至。比对通过后，此企业信息将显示「已验证」红戳并置底自动引流锚链接。",
                      "Verification packet logged. A secured secure-authorization linkage has been posted to our automated compliance engine.",
                      "Richiesta inoltrata. Un link di verifica è stato spedito all'indirizzo certificato per concludere la sincronizzazione."
                    )}
                  </p>
                  <button
                    onClick={() => setClaimingCompanyId(null)}
                    className="mt-3 px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg text-xs cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              )}
            </div>
          )}

        </div>
      )}

      {/* ----------------- SUB-TAB: PIPELINE LOGGER & Topic Cluster ----------------- */}
      {activeSubTab === 'pipeline' && (
        <div className="space-y-6">
          
          {/* ACTION HERO */}
          <div className="p-6 rounded-2xl bg-black/60 border border-white/5 space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-md font-bold text-purple-400 flex items-center gap-1.5 font-mono">
                  <Sparkles className="w-5 h-5 text-purple-400" />
                  <span>AI Autopilot Programmatic SEO & News Publisher</span>
                </h2>
                <p className="text-xs text-gray-400 mt-1">
                  {t(
                    "后台程序自动按日生产高度垂直内容，配置完全合规结构。绝非无脑采集网页，而是根据财税及服装动能重建高质量原创集。",
                    "Deepay content schedules automatically crawl regional trends to build verified topic clusters, boosting organic platform trust.",
                    "Il generatore autonomo popola quotidianamente articoli dotati di Schema FAQ conformi alle linee guida di Google."
                  )}
                </p>
              </div>

              <button
                onClick={executeCronCycle}
                disabled={isSimulatingCron}
                className="px-5 py-2.5 bg-purple-600 hover:bg-purple-500 disabled:bg-purple-900 text-white font-bold text-xs uppercase rounded-xl transition-all cursor-pointer flex items-center gap-2 shrink-0 shadow shadow-purple-900/40"
              >
                {isSimulatingCron ? (
                  <>
                    <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping" />
                    <span>Rebuilding Cluster {cronProgress}%</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Run AI SEO Worker Today</span>
                  </>
                )}
              </button>
            </div>

            {/* PROGRESS BAR */}
            {isSimulatingCron && (
              <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-purple-500 h-full transition-all duration-300"
                  style={{ width: `${cronProgress}%` }}
                />
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* REAL-TIME SYSTEM LOGGER ACCORDION */}
            <div className="p-6 bg-[#0E071D]/40 border border-purple-500/10 rounded-2xl space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
                <Clock className="w-4 h-4 text-purple-400" />
                <span>Autonomous SEO Cron Log Output</span>
              </h3>
              <p className="text-xs text-gray-400 leading-normal">
                {t(
                  "Deepay 爬虫引擎与搜索引擎双向握手，每天根据意大利电子发票法（Fatturazione Elettronica）、增值税规范及Prato行业快时尚动能，自动将中、英、意三语页面推给 GSC 注册库。",
                  "Real-time indexing signals transmitted straight to Google Search Console to guarantee immediate organic site authority indexing.",
                  "Log in tempo reale relativi alla trasmissione sitemap e iniezione automatica dei link canonici alle soluzioni software."
                )}
              </p>

              <div className="p-4 bg-black/80 border border-white/5 rounded-xl font-mono text-[10px] space-y-2 text-purple-300 max-h-56 overflow-y-auto">
                {cronLogs.map((log, i) => (
                  <div key={i} className="leading-relaxed border-b border-white/5 pb-1">
                    {log}
                  </div>
                ))}
              </div>
            </div>

            {/* INTERNAL LINKING SCHEME NETWORK */}
            <div className="p-6 bg-[#050B14]/40 border border-teal-500/10 rounded-2xl space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
                <Link2 className="w-4 h-4 text-teal-400" />
                <span>AI Topic Cluster Network Map</span>
              </h3>
              <p className="text-xs text-gray-400">
                {t(
                  "通过将服装高频百科与 Deepay 的核心收银 SaaS (POS / ERP) 等进行内链桥接，极大强化 deepay.srl 的主题权威度。",
                  "Deepay dynamically stitches automated high-performing articles directly to core merchant tools, establishing high search trust.",
                  "Associazione automatica dei contenuti di tendenza ai terminali POS e ERP di Deepay per massimizzare la rilevanza."
                )}
              </p>

              {/* DENSE BRUTALIST GRID DESIGN */}
              <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
                <div className="p-2.5 bg-white/5 border border-white/5 rounded-lg">
                  <span className="block text-teal-300 font-bold">🎯 Topic: Manufacturers</span>
                  <span className="text-gray-400 block mt-1 hover:underline">↳ deepay.srl/solutions/erp</span>
                </div>
                <div className="p-2.5 bg-white/5 border border-white/5 rounded-lg">
                  <span className="block text-teal-300 font-bold">🎯 Topic: Industry Trends</span>
                  <span className="text-gray-400 block mt-1 hover:underline">↳ deepay.srl/solutions/pos</span>
                </div>
                <div className="p-2.5 bg-white/5 border border-white/5 rounded-lg">
                  <span className="block text-teal-300 font-bold">🎯 Topic: S Sourcing</span>
                  <span className="text-gray-400 block mt-1 hover:underline">↳ deepay.srl/solutions/payments</span>
                </div>
                <div className="p-2.5 bg-white/5 border border-white/5 rounded-lg">
                  <span className="block text-teal-300 font-bold">🎯 Topic: VAT Compliance</span>
                  <span className="text-gray-400 block mt-1 hover:underline">↳ deepay.srl/solutions/crm</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* ----------------- SUB-TAB: DETAILED ARTICLE READ SCREEN ----------------- */}
      {selectedArticleId && (
        <div className="p-6 rounded-2xl bg-black/60 border border-purple-500/15 space-y-6">
          {(() => {
            const art = articles.find((a) => a.id === selectedArticleId);
            if (!art) return null;
            return (
              <div className="space-y-6">
                
                {/* BACK HEADER */}
                <div className="flex justify-between items-center pb-4 border-b border-white/5">
                  <button
                    onClick={() => setSelectedArticleId(null)}
                    className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-xs text-gray-300 rounded-lg cursor-pointer"
                  >
                    ← {t("返回文章列表", "Back to Editorial", "Vedi Tutti gli Articoli")}
                  </button>
                  <span className="text-xs font-mono text-purple-400">{art.date}</span>
                </div>

                {/* POST CONTENT */}
                <div className="space-y-4">
                  <span className="px-2.5 py-1 bg-purple-500/10 border border-purple-500/20 text-purple-400 text-[10px] font-mono font-bold rounded-md uppercase">
                    {art.category}
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                    {t(art.titleZh, art.titleEn, art.titleIt)}
                  </h1>
                  
                  <div className="flex items-center gap-4 text-xs font-mono text-gray-500 border-b border-white/5 pb-4">
                    <span>Author: <strong>{art.author}</strong></span>
                    <span>•</span>
                    <span>Views: <strong>{art.views} users logged</strong></span>
                  </div>

                  <p className="text-sm leading-relaxed text-gray-300 whitespace-pre-line font-sans">
                    {t(art.contentZh, art.contentEn, art.contentIt)}
                  </p>
                </div>

                {/* AUTONOMOUS FAQS CORNER */}
                {art.faq && (
                  <div className="space-y-3 border-t border-white/5 pt-6">
                    <h3 className="text-xs font-bold text-purple-400 uppercase tracking-widest font-mono">
                      💡 {t("自合规范 SEO 常见问答 FAQ", "Schema.org QA & Self-Linked FAQs", "Faq Autonome Real-Time")}
                    </h3>
                    <div className="space-y-3">
                      {art.faq.map((fq, i) => (
                        <div key={i} className="p-4 rounded-xl bg-white/5 space-y-1.5 text-xs text-left">
                          <span className="block font-bold text-white">Q: {fq.q}</span>
                          <span className="block text-gray-400 font-sans leading-relaxed">A: {fq.a}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* MICRODATA SCHEMAS DECORATOR */}
                {art.schema && (
                  <div className="space-y-3 border-t border-white/5 pt-6 font-mono text-left">
                    <h3 className="text-xs font-bold text-purple-400 uppercase tracking-widest">
                      🏷️ Automatic JSON-LD Schema.org Injection code
                    </h3>
                    <div className="p-4 bg-black/90 border border-white/5 rounded-xl text-[9.5px] text-purple-300 overflow-x-auto">
                      <pre>{JSON.stringify(art.schema, null, 2)}</pre>
                    </div>
                  </div>
                )}

                {/* PERSISTENT TRAFFIC DIRECTING CTA BOX */}
                <div className="p-6 rounded-2xl bg-gradient-to-br from-[#1C122C] to-[#0A0514] border border-purple-500/20 text-left space-y-4 mt-8">
                  <div className="flex items-center gap-2">
                    <Award className="text-purple-400 w-5 h-5 animate-pulse" />
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                      {t("服装制造批发商专用出账 SaaS", "Deploy Deepay OS Commerce Stack", "Abilita Soluzione Digitale Completa")}
                    </h4>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed max-w-2xl">
                    {t(
                      "专为服装企业定制，集成多档 VAT 税率配置及手持款台收银，直接打通意大利电子发票局和分货单库存同步，零研发成本启动。",
                      "Accelerate retail delivery throughput. Consolidate tableside, showroom clienteling, multi-tier VAT taxes, and direct clearings natively within the Deepay central dashboard.",
                      "Software integrato per maglieria, grossisti e laboratori tessili toscani. Interfaccia stampante RT e POS 0.9% inclusa."
                    )}
                  </p>
                  <div className="flex justify-start">
                    <a
                      href="https://app.deepay.srl"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer block text-center"
                    >
                      🚀 {t("立即启动配套 App (app.deepay.srl) →", "Launch Deepay Merchant App (app.deepay.srl) →", "Accedi al Pannello app.deepay.srl →")}
                    </a>
                  </div>
                </div>

              </div>
            );
          })()}
        </div>
      )}

      {/* ----------------- SUB-TAB: DETAILED COMPANY PAGE OVERLAY ----------------- */}
      {selectedCompanyId && (
        <div className="p-6 rounded-2xl bg-black/60 border border-purple-500/15 space-y-6 text-left">
          {(() => {
            const comp = directory.find((c) => c.id === selectedCompanyId);
            if (!comp) return null;
            const isVerificationLogged = claimsList.includes(comp.id);
            return (
              <div className="space-y-6">
                
                {/* HEADER */}
                <div className="flex justify-between items-center pb-4 border-b border-white/5">
                  <button
                    onClick={() => setSelectedCompanyId(null)}
                    className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-xs text-gray-300 rounded-lg cursor-pointer"
                  >
                    ← {t("返回企业名录", "Back to Directory List", "Torna all'Elenco Fornitori")}
                  </button>
                  <span className={`px-2 py-0.5 text-[10px] rounded font-mono font-bold uppercase ${
                    comp.claimed || isVerificationLogged ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                  }`}>
                    {comp.claimed || isVerificationLogged ? '✓ SECURED & REGISTERED' : '✕ UNCLAIMED ENTITY'}
                  </span>
                </div>

                {/* MAIN INFOS */}
                <div className="space-y-4">
                  <span className="px-2.5 py-1 bg-purple-500/10 text-purple-400 text-[10px] font-mono font-bold uppercase rounded border border-purple-500/25">
                    {comp.category}
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                    {t(comp.nameZh, comp.nameEn, comp.nameIt)}
                  </h1>

                  <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                    <h3 className="text-xs font-bold text-teal-400 uppercase tracking-widest font-mono">
                      🏢 Verified Sourcing Details
                    </h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                      <div className="space-y-2">
                        <div className="text-gray-400">📍 Address: <strong className="text-white block font-sans mt-0.5">{comp.address}</strong></div>
                        <div className="text-gray-400">📜 Partita IVA Code: <strong className="text-purple-300 block font-mono mt-0.5">{comp.vat}</strong></div>
                        <div className="text-gray-400">⚡ Production Capacity: <strong className="text-teal-300 block font-sans mt-0.5">{comp.capacity}</strong></div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-gray-400">📞 Phone Coordination: <strong className="text-white block font-sans mt-0.5">{comp.phone}</strong></div>
                        <div className="text-gray-400">✉️ Contact Verification: <strong className="text-white block font-sans mt-0.5">{comp.email}</strong></div>
                        <div className="text-gray-400">👥 Internal Loom Staff: <strong className="text-white block font-sans mt-0.5">{comp.employees}</strong></div>
                      </div>
                    </div>
                  </div>

                  {/* SPECIALTY & DESCRIPTION */}
                  <div className="space-y-2">
                    <h3 className="text-xs font-bold text-purple-400 uppercase tracking-widest font-mono">
                      🎯 Specialty Core Competency
                    </h3>
                    <p className="text-sm text-gray-300 leading-relaxed font-sans bg-purple-950/20 p-4 rounded-xl border border-purple-500/10">
                      {t(comp.specialtyZh, comp.specialtyEn, comp.specialtyIt)}
                    </p>
                  </div>
                </div>

                {/* GEOGRAPHIC ROUTING ADVANTAGE BREADCRUMBS */}
                <div className="p-4 bg-teal-500/5 border border-teal-500/10 rounded-xl space-y-2 text-xs">
                  <span className="block font-bold text-teal-300">
                    🇪🇺 Triangulation VAT routing and Electronic Billing Advantage:
                  </span>
                  <p className="text-gray-400 leading-normal">
                    {t(
                      "使用 Deepay, 这家设在的供应商可一键对焦零售商。生成的开票单据通过 Sdi 自动秒级上传。不经过商业清算网关，避免因跨境纠纷和重组结算损失额外佣金。",
                      "By utilizing Deepay, raw fabric orders completed with this partner automatically execute sub-second XML file syncing. The payment is handled over localized direct clearing to bypass 2.9% transaction margins.",
                      "Emetti pro-forma e fatture Sdi in pochi millisecondi. Risparmia fino al 2% rispetto ai tradizionali gateway hardware."
                    )}
                  </p>
                </div>

                {/* SHOWCASE SCHEMA.ORG TO THE USER */}
                <div className="space-y-3 pt-4 border-t border-white/5 font-mono">
                  <h3 className="text-xs font-bold text-purple-400 uppercase tracking-widest">
                    🏷️ LocalBusiness Structured Rich Schema
                  </h3>
                  <div className="p-4 bg-black/90 border border-white/5 rounded-xl text-[9.5px] text-purple-300 overflow-x-auto">
                    <pre>{JSON.stringify({
                      "@context": "https://schema.org",
                      "@type": "LocalBusiness",
                      "name": comp.nameEn,
                      "address": {
                        "@type": "PostalAddress",
                        "streetAddress": comp.address,
                        "addressLocality": comp.city,
                        "addressCountry": "IT"
                      },
                      "taxID": comp.vat,
                      "telephone": comp.phone,
                      "email": comp.email
                    }, null, 2)}</pre>
                  </div>
                </div>

                {/* REDIRECT CTA */}
                <div className="p-6 rounded-2xl bg-gradient-to-br from-[#1C122C] to-[#0A0514] border border-purple-500/20 flex flex-col sm:flex-row justify-between items-center gap-6 mt-6">
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-white">
                      {t("需要对接该工厂或部署支付吗？", "Do you want to establish billing/clearing with this brand?", "Desideri avviare una transazione commerciale?")}
                    </h4>
                    <span className="text-xs text-gray-500 block">Deploy customized POS clienteling networks.</span>
                  </div>
                  <a
                    href="https://app.deepay.srl"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl cursor-pointer"
                  >
                    🚀 {t("去配套面板结算 (app.deepay.srl) →", "Start Cleared Billing (app.deepay.srl) →", "Paga con Canale Dedicato →")}
                  </a>
                </div>

              </div>
            );
          })()}
        </div>
      )}

    </div>
  );
}
