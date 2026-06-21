import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  Zap,
  Cpu,
  Database,
  Shield,
  Layers,
  HelpCircle,
  Menu,
  X,
  ArrowRight,
  TrendingUp,
  Globe,
  DollarSign,
  Activity,
  Send,
  Copy,
  CheckCircle,
  BookOpen,
  Mail,
  Users,
  AlertTriangle,
  Play,
  FileText,
  Key,
  Terminal,
  MessageSquare,
  ChevronRight,
  Sparkle
} from 'lucide-react';
import { BlogPost, DocItem, ChatMessage, SystemMetrics, InterfaceLanguage } from './types';
import { PRESET_POSTS, CATEGORIES } from './data/blog-data';
import { DOCS_SECTIONS } from './data/docs-data';
import ThreeDBackground from './components/ThreeDBackground';
import EnterprisePageRenderer from './components/EnterprisePageRenderer';

export default function App() {
  const [lang, setLang] = useState<InterfaceLanguage>('en');
  const [activeTab, setActiveTab] = useState<'home' | 'features' | 'solutions' | 'pricing' | 'blog' | 'docs' | 'contact'>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeRoute, setActiveRoute] = useState<string>('');

  // Helper to extract active route and active tab from cleanly structured pathnames
  const getRouteAndTabFromPathname = () => {
    const path = window.location.pathname;
    const cleanPath = path.replace(/^\//, '').replace(/\/$/, '').toLowerCase();
    
    // Core structural tabs
    const coreTabs = ['features', 'solutions', 'pricing', 'blog', 'docs', 'contact'];
    
    if (cleanPath === '') {
      return { tab: 'home' as const, route: '' };
    } else if (coreTabs.includes(cleanPath)) {
      return { tab: cleanPath as any, route: '' };
    } else {
      return { tab: 'home' as const, route: cleanPath };
    }
  };

  const navigateTo = (path: string) => {
    const targetPath = path.startsWith('/') ? path : '/' + path;
    const currentParams = window.location.search;
    window.history.pushState(null, '', targetPath + currentParams);
    
    const { tab, route } = getRouteAndTabFromPathname();
    setActiveTab(tab);
    setActiveRoute(route);
    setMobileMenuOpen(false);
    setSelectedPost(null);
  };

  const navigateToRoute = (route: string) => {
    navigateTo(route);
  };

  // Sync state on clean back/forward button popstate events
  useEffect(() => {
    const handlePopState = () => {
      const { tab, route } = getRouteAndTabFromPathname();
      setActiveTab(tab);
      setActiveRoute(route);
      setMobileMenuOpen(false);
    };
    window.addEventListener('popstate', handlePopState);
    
    // Auto-detect lang query parameter if available
    const params = new URLSearchParams(window.location.search);
    const urlLang = params.get('lang');
    if (urlLang === 'zh' || urlLang === 'it' || urlLang === 'en') {
      setLang(urlLang as InterfaceLanguage);
    }
    
    handlePopState();
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);
  
  // Real-time Telemetry State
  const [metrics, setMetrics] = useState<SystemMetrics>({
    activeSessions: 14208,
    globalTps: 84.7,
    todayGmv: 1240893.42,
    conversionRate: 3.48,
    recentOrders: [
      { id: 'dp_tx_839174', region: 'Germany (DE)', amount: 149.00, channel: 'Shopify Integration', timestamp: 'Just now' },
      { id: 'dp_tx_839173', region: 'United Kingdom (UK)', amount: 890.00, channel: 'Enterprise API', timestamp: '1 min ago' },
      { id: 'dp_tx_839172', region: 'Italy (IT)', amount: 45.50, channel: 'ModaUI Storefront', timestamp: '3 mins ago' },
      { id: 'dp_tx_839171', region: 'United States (US)', amount: 1250.00, channel: 'B2B Wholesale Node', timestamp: '4 mins ago' },
      { id: 'dp_tx_839170', region: 'Japan (JP)', amount: 320.00, channel: 'WooCommerce Connector', timestamp: '6 mins ago' },
    ]
  });

  // Fetch metrics dynamically from Express API
  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await fetch('/api/telemetry');
        if (response.ok) {
          const data = await response.json();
          setMetrics(data);
        }
      } catch (err) {
        // Fallback gracefully on local environment loading offsets
      }
    };
    
    // Polling interval strictly defined at 4 seconds
    const interval = setInterval(fetchMetrics, 4000);
    return () => clearInterval(interval);
  }, []);

  // Live Counter Animation logic
  const [animatedGmv, setAnimatedGmv] = useState(metrics.todayGmv);
  useEffect(() => {
    const startValue = animatedGmv;
    const endValue = metrics.todayGmv;
    if (Math.abs(endValue - startValue) < 1) return;

    let startTime: number | null = null;
    const duration = 1500; // Translate smoothly over 1.5 seconds

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setAnimatedGmv(startValue + progress * (endValue - startValue));
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, [metrics.todayGmv]);

  // AI Brain Workflow Animation State
  const [activeWorkflowStep, setActiveWorkflowStep] = useState<number>(0);
  const workflowSteps = [
    {
      label: 'Customer Trigger',
      labelZh: '买家付款触点',
      desc: 'Buyer adds products or initiates checkouts on Shopify/WooCommerce, firing a dynamic session request.',
      descZh: '买家加购或在前端点击结算付款，触发高安全动态会话，发送加密请求至底层中枢。'
    },
    {
      label: 'AI Brain Analysis',
      labelZh: 'AI 交互脑核建模',
      desc: 'Deepay intelligent router assesses card bin origin, exchange rates, and transaction fees across global nodes.',
      descZh: 'Deepay 核心脑核识别银行发卡属国、多币种当前瞬时牌价，选择极佳清算底线。'
    },
    {
      label: 'Prediction & Reasoning',
      labelZh: '深度规则推理解耦',
      desc: 'Autonomous filters run concurrent behavioral profiling in under 40 milliseconds to screen possible chargeback frauds.',
      descZh: '自主风控节点在 40 毫秒内计算黑产声誉，预测虚假申报，降低交易拒付风险。'
    },
    {
      label: 'Unified Payments',
      labelZh: '动态路由本币分发',
      desc: 'Deepay Payments handles localized payment acquisition, slicing checkout costs down by up to 20% compared to legacy fees.',
      descZh: '智能支付网关瞬时促成交易资金直连清算，免却多重传统第三方银行中介扣点。'
    },
    {
      label: 'Auto CRM / ERP Sync',
      labelZh: '供应链及 ERP 自理',
      desc: 'Deepay AI Staff checks physical stocks, generates auto-refills, and publishes customized client notifications.',
      descZh: 'AI 员工自动同步仓储库存、触发供应链订金划扣，全自动撰写营销欢迎邮件并发送。'
    },
    {
      label: 'Analytics Feed Back',
      labelZh: '经营看板及 AIO 指标',
      desc: 'Telemetry flows directly to Deepay Commerce, optimizing the site schema dynamically for Google and Perplexity AI crawlers.',
      descZh: '经营决策流高速回笼，全自动改写前端 AIO 关键词元素，提升大模型引用排名。'
    }
  ];

  // Auto Workflow Ticker
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveWorkflowStep((prev) => (prev + 1) % workflowSteps.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // Interactive Live AI Chat state
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { sender: 'assistant', text: 'Hello! I am Sidekick AI, your official commerce coordinator for Deepay SRL. How can I help you integrate Payments, deploy ModaUI, or set up automated AI Store agents today?', timestamp: 'Right now' },
  ]);
  const [userInput, setUserInput] = useState('');
  const [aiChatLoading, setAiChatLoading] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || aiChatLoading) return;

    const query = userInput;
    setUserInput('');
    setChatMessages(prev => [...prev, { sender: 'user', text: query, timestamp: 'Just now' }]);
    setAiChatLoading(true);

    try {
      const chatHistory = chatMessages.map(m => ({
        role: m.sender === 'user' ? 'user' : 'assistant',
        content: m.text
      }));
      chatHistory.push({ role: 'user', content: query });

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: chatHistory, language: lang })
      });

      if (response.ok) {
        const data = await response.json();
        setChatMessages(prev => [...prev, { sender: 'assistant', text: data.text, timestamp: 'Just now' }]);
      } else {
        throw new Error('Server issues.');
      }
    } catch (err) {
      setChatMessages(prev => [...prev, {
        sender: 'assistant',
        text: lang === 'zh' 
          ? '抱歉，由于网络层阻断，我目前处于待机调整中。我们的官方域名为 deepay.srl，您可以点击“开发文档”查看 API keys 获取详情！'
          : 'I encountered a transient network connection error. Please note our main service core is at deepay.srl. Check the Developers guide to hook up keys manually!',
        timestamp: 'Just now'
      }]);
    } finally {
      setAiChatLoading(false);
    }
  };

  // Pre-loaded Blog & Interactive Generative SEO Post Creator
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(PRESET_POSTS);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  // Dynamic Blog Generator Inputs
  const [generatorTopic, setGeneratorTopic] = useState('');
  const [generatorKeyword, setGeneratorKeyword] = useState('');
  const [blogGenLoading, setBlogGenLoading] = useState(false);
  const [blogGenSuccess, setBlogGenSuccess] = useState(false);

  const handleGenerateBlogPost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!generatorTopic.trim() || blogGenLoading) return;

    setBlogGenLoading(true);
    setBlogGenSuccess(false);

    try {
      const response = await fetch('/api/generate-blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: generatorTopic,
          keyword: generatorKeyword,
          language: lang
        })
      });

      if (response.ok) {
        const newPost: BlogPost = await response.json();
        setBlogPosts(prev => [newPost, ...prev]);
        setSelectedPost(newPost); // Open the newly generated post directly!
        setGeneratorTopic('');
        setGeneratorKeyword('');
        setBlogGenSuccess(true);
        
        // Hide success alert after 5 seconds
        setTimeout(() => setBlogGenSuccess(false), 5000);
      } else {
        alert(lang === 'zh' ? '内容生成服务器繁忙，请稍后重试。' : 'Generative writer is currently busy. Please retry shortly.');
      }
    } catch (err) {
      alert('Network issue while contacting automated post generator.');
    } finally {
      setBlogGenLoading(false);
    }
  };

  // Documentation Sidebar active selection
  const [activeDocSlug, setActiveDocSlug] = useState('overview');
  const selectedDocItem = DOCS_SECTIONS.flatMap(s => s.items).find(item => item.slug === activeDocSlug);

  // Documentation Interactive REST API Mockup tool
  const [mockApiAmount, setMockApiAmount] = useState('149.00');
  const [mockApiCurrency, setMockApiCurrency] = useState('EUR');
  const [mockApiSuccessUrl, setMockApiSuccessUrl] = useState('https://example.com/success');
  const [mockApiResponse, setMockApiResponse] = useState<any>(null);
  const [mockApiLoading, setMockApiLoading] = useState(false);

  const runMockApiCall = () => {
    setMockApiLoading(true);
    setMockApiResponse(null);
    setTimeout(() => {
      const generatedSessionId = `cs_live_srl_${Math.random().toString(36).substr(2, 14)}`;
      setMockApiResponse({
        object: 'checkout_session',
        id: generatedSessionId,
        amount: parseFloat(mockApiAmount),
        currency: mockApiCurrency,
        live_mode: true,
        merchant_origin: 'Deepay SRL International Node',
        checkout_url: `https://deepay.srl/pay/${generatedSessionId}`,
        routing_protocol: 'ModaUI_SmartRouter_v4',
        chargeback_score: '99.2/100 (Safe)',
        status: 'ready'
      });
      setMockApiLoading(false);
    }, 900);
  };

  // General Notification form
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.email) return;
    setContactSubmitted(true);
    setTimeout(() => {
      setContactSubmitted(false);
      setContactForm({ name: '', email: '', message: '' });
    }, 4000);
  };

  // Helper code copy mechanism
  const [copiedCodeText, setCopiedCodeText] = useState(false);
  const copyCode = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCodeText(true);
    setTimeout(() => setCopiedCodeText(false), 2000);
  };

  const currentPosts = selectedCategory === 'all' 
    ? blogPosts 
    : blogPosts.filter(p => p.category.toLowerCase().includes(selectedCategory.split('-')[0]) || p.categoryZh.includes(selectedCategory));

  return (
    <div className="min-h-screen text-gray-100 font-sans relative flex flex-col selection:bg-teal-500/20 selection:text-teal-300">
      
      {/* 3D Immersive Orbital Sphere Background Canvas */}
      <ThreeDBackground />

      {/* Atmospheric Visual Gradients Driven by the "Immersive UI" Theme guidelines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-[1]">
        <div className="absolute top-[-10%] left-[-15%] w-[60%] h-[50%] bg-teal-600/10 rounded-full blur-[140px] mix-blend-screen"></div>
        <div className="absolute top-[35%] right-[-10%] w-[50%] h-[55%] bg-purple-700/10 rounded-full blur-[160px] mix-blend-screen"></div>
        <div className="absolute bottom-[-10%] left-[10%] w-[55%] h-[50%] bg-blue-600/12 rounded-full blur-[150px] mix-blend-screen"></div>
        {/* Subtle geometric dot grids */}
        <div className="absolute inset-0 opacity-[0.035]" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '36px 36px' }}></div>
      </div>

      {/* GLOBAL ENTERPRISE NAVBAR */}
      <nav className="sticky top-0 z-50 border-b border-white/5 bg-black/40 backdrop-blur-xl relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          
          {/* Logo / Domain */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigateTo('')}>
            <div className="w-9 h-9 bg-gradient-to-tr from-teal-500 via-emerald-400 to-purple-600 rounded-xl flex items-center justify-center font-bold tracking-tight shadow-[0_0_20px_rgba(13,148,136,0.35)] relative overflow-hidden group">
              <span className="relative z-10 text-white font-mono text-lg">D</span>
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-bold tracking-tight text-white font-mono">Deepay</span>
                <span className="text-[10px] bg-teal-500/10 border border-teal-500/20 text-teal-400 font-mono px-1.5 py-0.2 rounded">OS</span>
              </div>
              <p className="text-[9px] text-gray-400 tracking-wider font-mono">deepay.srl</p>
            </div>
          </div>

          {/* Desktop Nav Actions */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <button 
              onClick={() => navigateTo('')}
              className={`transition-colors py-2 relative capitalize ${activeTab === 'home' && !activeRoute ? 'text-teal-400' : 'text-gray-300 hover:text-white'}`}
            >
              {lang === 'en' ? 'Home' : '首页'}
              {activeTab === 'home' && !activeRoute && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-teal-400 rounded-full" />}
            </button>
            <button 
              onClick={() => navigateTo('features')}
              className={`transition-colors py-2 relative capitalize ${activeTab === 'features' ? 'text-teal-400' : 'text-gray-300 hover:text-white'}`}
            >
              {lang === 'en' ? 'Features' : '技术特色'}
              {activeTab === 'features' && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-teal-400 rounded-full" />}
            </button>
            <button 
              onClick={() => navigateTo('solutions')}
              className={`transition-colors py-2 relative capitalize ${activeTab === 'solutions' ? 'text-teal-400' : 'text-gray-300 hover:text-white'}`}
            >
              {lang === 'en' ? 'Solutions' : '行业方案'}
              {activeTab === 'solutions' && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-teal-400 rounded-full" />}
            </button>
            <button 
              onClick={() => navigateTo('pricing')}
              className={`transition-colors py-2 relative capitalize ${activeTab === 'pricing' ? 'text-teal-400' : 'text-gray-300 hover:text-white'}`}
            >
              {lang === 'en' ? 'Pricing' : '定价政策'}
              {activeTab === 'pricing' && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-teal-400 rounded-full" />}
            </button>
            <button 
              onClick={() => navigateTo('blog')}
              className={`transition-colors py-2 relative capitalize ${activeTab === 'blog' && !activeRoute ? 'text-teal-400' : 'text-gray-300 hover:text-white'}`}
            >
              {lang === 'en' ? 'AIO Blog' : '内容营销'}
              {activeTab === 'blog' && !activeRoute && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-teal-400 rounded-full" />}
            </button>
            <button 
              onClick={() => navigateTo('docs')}
              className={`transition-colors py-2 relative capitalize ${activeTab === 'docs' && !activeRoute ? 'text-teal-400' : 'text-gray-300 hover:text-white'}`}
            >
              {lang === 'en' ? 'Docs' : '文档中心'}
              {activeTab === 'docs' && !activeRoute && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-teal-400 rounded-full" />}
            </button>
            <button 
              onClick={() => { navigateToRoute('tools'); }}
              className={`transition-colors py-2 relative capitalize ${activeRoute === 'tools' || activeRoute.startsWith('tools/') ? 'text-teal-400 font-bold' : 'text-teal-400/80 hover:text-white'}`}
            >
              {lang === 'en' ? '🔧 Free Tools' : '🔧 免费工具'}
              {(activeRoute === 'tools' || activeRoute.startsWith('tools/')) && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-teal-400 rounded-full" />}
            </button>
            <button 
              onClick={() => { navigateToRoute('seo-growth'); }}
              className={`transition-colors py-2 relative capitalize ${activeRoute === 'seo-growth' ? 'text-teal-300 font-bold animate-pulse' : 'text-teal-400/80 hover:text-white'}`}
            >
              {lang === 'en' ? '🔥 Brand Monitor' : '🔥 品牌监控'}
              {activeRoute === 'seo-growth' && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-teal-400 rounded-full" />}
            </button>
            <button 
              onClick={() => { navigateToRoute('app-market'); }}
              className={`transition-colors py-2 relative capitalize ${activeRoute === 'app-market' ? 'text-teal-400 animate-pulse font-bold' : 'text-teal-400/90 hover:text-teal-300'}`}
            >
              {lang === 'en' ? '🛒 App Market' : '🛒 应用市场'}
              {activeRoute === 'app-market' && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-teal-400 rounded-full" />}
            </button>
            <button 
              onClick={() => { navigateToRoute('developer-center'); }}
              className={`transition-colors py-2 relative capitalize ${activeRoute === 'developer-center' ? 'text-purple-400 animate-pulse font-bold' : 'text-purple-400/90 hover:text-purple-300'}`}
            >
              {lang === 'en' ? '💻 Developers' : '💻 开发者中心'}
              {activeRoute === 'developer-center' && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-purple-405 rounded-full" />}
            </button>
            <button 
              onClick={() => navigateTo('contact')}
              className={`transition-colors py-2 relative capitalize ${activeTab === 'contact' && !activeRoute ? 'text-teal-400' : 'text-gray-300 hover:text-white'}`}
            >
              {lang === 'en' ? 'Contact' : '联系客户'}
              {activeTab === 'contact' && !activeRoute && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-teal-400 rounded-full" />}
            </button>
          </div>

          {/* Controls: Language, Sandbox Trigger */}
          <div className="hidden md:flex items-center gap-4">
            {/* Elegant Language switcher */}
            <button 
              onClick={() => setLang(l => l === 'en' ? 'it' : l === 'it' ? 'zh' : 'en')}
              className="px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-semibold tracking-wide flex items-center gap-1.5 transition-all text-teal-300 font-mono"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{lang === 'en' ? '🇬🇧 English (IT/ZH)' : lang === 'it' ? '🇮🇹 Italiano (EN/ZH)' : '🇨🇳 简体中文 (EN/IT)'}</span>
            </button>

            <button 
              onClick={() => navigateTo('docs')}
              className="px-4 py-2 bg-gradient-to-r from-teal-500 to-purple-600 text-white text-xs font-bold rounded-full hover:shadow-[0_0_20px_rgba(13,148,136,0.3)] transition-all flex items-center gap-1.5"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>{lang === 'en' ? 'Sandbox API' : lang === 'it' ? 'Sandbox API' : '免费开发者沙箱'}</span>
            </button>
          </div>

          {/* Mobile hamburger */}
          <div className="md:hidden flex items-center gap-3">
            <button 
              onClick={() => setLang(l => l === 'en' ? 'it' : l === 'it' ? 'zh' : 'en')}
              className="px-2.5 py-1.5 rounded-lg border border-white/10 bg-white/5 text-xs text-teal-300 font-mono"
            >
              {lang === 'en' ? 'EN' : lang === 'it' ? 'IT' : '中文'}
            </button>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-1 rounded-lg text-white hover:bg-white/5">
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-white" />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/5 bg-gray-950/95 absolute left-0 w-full p-6 space-y-4 backdrop-blur-2xl z-50">
            <div className="grid grid-cols-2 gap-3 pb-4 border-b border-white/5">
              <button 
                onClick={() => { setActiveTab('home'); setMobileMenuOpen(false); setSelectedPost(null); }}
                className={`py-2 px-3 text-center rounded-lg text-sm font-medium ${activeTab === 'home' ? 'bg-teal-500/10 text-teal-300' : 'bg-white/5 text-gray-400'}`}
              >
                {lang === 'en' ? 'Home' : '首页'}
              </button>
              <button 
                onClick={() => { setActiveTab('features'); setMobileMenuOpen(false); }}
                className={`py-2 px-3 text-center rounded-lg text-sm font-medium ${activeTab === 'features' ? 'bg-teal-500/10 text-teal-300' : 'bg-white/5 text-gray-400'}`}
              >
                {lang === 'en' ? 'Features' : '技术特色'}
              </button>
              <button 
                onClick={() => navigateTo('solutions')}
                className={`py-2 px-3 text-center rounded-lg text-sm font-medium ${activeTab === 'solutions' ? 'bg-teal-500/10 text-teal-300' : 'bg-white/5 text-gray-400'}`}
              >
                {lang === 'en' ? 'Solutions' : '行业方案'}
              </button>
              <button 
                onClick={() => navigateTo('pricing')}
                className={`py-2 px-3 text-center rounded-lg text-sm font-medium ${activeTab === 'pricing' ? 'bg-teal-500/10 text-teal-300' : 'bg-white/5 text-gray-400'}`}
              >
                {lang === 'en' ? 'Pricing' : '定价'}
              </button>
              <button 
                onClick={() => navigateTo('blog')}
                className={`py-2 px-3 text-center rounded-lg text-sm font-medium ${activeTab === 'blog' && !activeRoute ? 'bg-teal-500/10 text-teal-300 font-bold' : 'bg-white/5 text-gray-400'}`}
              >
                {lang === 'en' ? 'Blog & AIO' : '内容营销'}
              </button>
              <button 
                onClick={() => navigateTo('docs')}
                className={`py-2 px-3 text-center rounded-lg text-sm font-medium ${activeTab === 'docs' && !activeRoute ? 'bg-teal-500/10 text-teal-300 font-bold' : 'bg-white/5 text-gray-400'}`}
              >
                {lang === 'en' ? 'Docs' : '文档中心'}
              </button>
              <button 
                onClick={() => { navigateToRoute('app-market'); setMobileMenuOpen(false); }}
                className={`py-2 px-3 text-center rounded-lg text-sm font-medium ${activeRoute === 'app-market' ? 'bg-teal-500/20 text-teal-300 font-bold border border-teal-500/30' : 'bg-white/5 text-teal-400'}`}
              >
                {lang === 'en' ? '🛒 App Market' : '🛒 应用市场'}
              </button>
              <button 
                onClick={() => { navigateToRoute('developer-center'); setMobileMenuOpen(false); }}
                className={`py-2 px-3 text-center rounded-lg text-sm font-medium ${activeRoute === 'developer-center' ? 'bg-purple-500/20 text-purple-300 font-bold border border-purple-500/30' : 'bg-white/5 text-purple-405'}`}
              >
                {lang === 'en' ? '💻 Developers' : '💻 开发者中心'}
              </button>
              <button 
                onClick={() => { navigateToRoute('tools'); setMobileMenuOpen(false); }}
                className={`py-2 px-3 text-center rounded-lg text-sm font-medium ${activeRoute === 'tools' ? 'bg-teal-500/20 text-teal-300 font-bold border border-teal-500/30' : 'bg-white/5 text-teal-400'}`}
              >
                {lang === 'en' ? '🔧 Free Tools' : '🔧 免费工具'}
              </button>
              <button 
                onClick={() => { navigateToRoute('seo-growth'); setMobileMenuOpen(false); }}
                className={`py-2 px-3 text-center rounded-lg text-sm font-medium ${activeRoute === 'seo-growth' ? 'bg-teal-500/20 text-teal-300 font-bold border border-teal-500/30' : 'bg-white/5 text-teal-300'}`}
              >
                {lang === 'en' ? '🔥 Brand Monitor' : '🔥 品牌监控与优化'}
              </button>
            </div>
            
            <button 
              onClick={() => navigateTo('contact')}
              className="w-full py-3 bg-gradient-to-r from-teal-500 to-purple-600 rounded-xl text-center font-bold text-sm"
            >
              {lang === 'en' ? 'Get Started Free' : '开启免费对接'}
            </button>
          </div>
        )}
      </nav>

      <div className="relative z-10 flex-1">
        
        {/* ==================== ACTIVE ENTERPRISE ROUTE OVERLAY ==================== */}
        {activeRoute && (
          <EnterprisePageRenderer 
            path={activeRoute} 
            lang={lang} 
            onNavigate={(tab) => { navigateTo(tab); }}
            onNavigatePath={(p) => { navigateTo(p); }}
          />
        )}

        {/* ==================== TAB 1: HOME ==================== */}
        {!activeRoute && activeTab === 'home' && (
          <div>
            {/* HERO SECTION */}
            <header className="relative pt-12 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
              <div className="max-w-5xl mx-auto text-center relative z-20">
                
                {/* Visual badge */}
                <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold tracking-wide text-teal-400 mb-8 animate-fade-in backdrop-blur-md">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
                  </span>
                  <span>{lang === 'en' ? 'Sovereign Alternative to Stripe & Shopify' : 'Stripe + Shopify 二合一独立主权平替基础设施'}</span>
                </div>

                {/* Main Heading styled with space grotesk */}
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-sans font-black tracking-tight mb-8 leading-[1.05] bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/60">
                  {lang === 'en' ? (
                    <>Stripe + Shopify Alternative<br/><span className="text-teal-400 font-extrabold">Dual-Sovereign Commerce Engine</span></>
                  ) : (
                    <>Stripe + Shopify 终极拼合体<br/><span className="text-teal-400 font-extrabold">极速开店建站 + 零佣收清算网关</span></>
                  )}
                </h1>

                {/* Description and sub-branding natural occurrences */}
                <p className="max-w-3xl mx-auto text-base sm:text-lg text-gray-400 leading-relaxed font-sans mb-12">
                  {lang === 'en' ? (
                    <>Establish true digital sovereignty and global checkout competence. Deepay SRL combines the checkout API richness of <span className="text-white font-medium">Stripe</span> with the turnkey commerce ease of <span className="text-white font-medium">Shopify</span>—enforcing direct clearing networks, 0% platform transaction markups, and auto-generated multi-country SEO page networks natively inside Europe.</>
                  ) : (
                    <>告别 Shopify 昂贵的月租和结算分成，也告别 Stripe 抽点剥削。Deepay SRL 革命性地将 <span className="text-white font-medium">Stripe 收单能力</span> 与 <span className="text-white font-medium">Shopify 极速建站套件</span> 融于一身——采用去中介直签本币金融清算、0% 交易佣金分成，并自带每日 AI 主动式 SEO 提权网段布局，帮您彻底收回毛利主权。</>
                  )}
                </p>

                {/* Dynamic CTA cluster with microinteractions */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
                  <button 
                    onClick={() => navigateToRoute('seo-growth')}
                    className="w-full sm:w-auto px-8 py-4 bg-teal-400 text-black rounded-full font-extrabold text-lg hover:bg-teal-300 hover:scale-[1.03] transition-all cursor-pointer shadow-[0_4px_30px_rgba(20,184,166,0.25)]"
                  >
                    {lang === 'en' ? 'Start Building Store' : '🚀 立即一键秒级开店'}
                  </button>
                  <button 
                    onClick={() => setActiveTab('docs')}
                    className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full font-bold text-lg cursor-pointer transition-all flex items-center justify-center gap-2"
                  >
                    <span>{lang === 'en' ? 'Explore Solutions' : '查看技术架构'}</span>
                    <ArrowRight className="w-5 h-5 text-teal-400" />
                  </button>
                </div>

                {/* Core Architecture Columns (Build Store, Accept Payments, Manage Orders) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16 text-left">
                  {/* Card 1: Build Store */}
                  <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-teal-500/30 transition-all group">
                    <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 mb-4 group-hover:scale-110 transition-transform">
                      <Layers className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">
                      {lang === 'en' ? '1. Build Store' : '1. 一键 SaaS 建站 (Build Store)'}
                    </h3>
                    <p className="text-xs text-gray-400 leading-normal mb-4">
                      {lang === 'en' ? (
                        <>Launch stunning headless boutiques with no-code custom templates. Features instant fast hosting, mobile-responsive grid, and built-in organic page clustering.</>
                      ) : (
                        <>依托内置 ModaUI 拖拽排版框架与海量高奢独立站自平衡模版，零代码一键快速部署。原生配备 FCP 高清页面加载与自适应语言首部。 </>
                      )}
                    </p>
                    <button 
                      onClick={() => navigateToRoute('store-builder')} 
                      className="text-xs font-mono text-teal-400 hover:text-white flex items-center gap-1 cursor-pointer"
                    >
                      <span>{lang === 'en' ? 'Explore Store Builder' : '进入建站控制台'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Card 2: Accept Payments */}
                  <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/30 transition-all group">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-300 mb-4 group-hover:scale-110 transition-transform">
                      <DollarSign className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">
                      {lang === 'en' ? '2. Accept Payments' : '2. 智能支付网关 (Accept Payments)'}
                    </h3>
                    <p className="text-xs text-gray-400 leading-normal mb-4">
                      {lang === 'en' ? (
                        <>Integrated multi-currency PSP payment routing, SEPA auto-debit loops, platform split-pay ledger entries and escrow checkout modules directly.</>
                      ) : (
                        <>免除额外手续佣金扣占。集成多币种卡收、SEPA 自动核销对账、本地钱包结算及平台级的即时多卖家分账钱包（Split Wallet）。</>
                      )}
                    </p>
                    <button 
                      onClick={() => navigateToRoute('payments-wallet')} 
                      className="text-xs font-mono text-purple-400 hover:text-white flex items-center gap-1 cursor-pointer"
                    >
                      <span>{lang === 'en' ? 'Review Payments Engine' : '阅览收单协议'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Card 3: Manage Orders */}
                  <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/30 transition-all group">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-4 group-hover:scale-110 transition-transform">
                      <Activity className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">
                      {lang === 'en' ? '3. Manage Orders' : '3. 履约与供应链 (Manage Orders)'}
                    </h3>
                    <p className="text-xs text-gray-400 leading-normal mb-4">
                      {lang === 'en' ? (
                        <>Connect order management pipelines directly to warehouse log systems, with real-time DHL/GLS logistics callback webhooks and inventory syncing.</>
                      ) : (
                        <>全自动化 WMS 调度、多式联运运费算价和订单履约监控。支持批量货架商品一键镜像上传同步、不超卖库存精准寻路。 </>
                      )}
                    </p>
                    <button 
                      onClick={() => navigateToRoute('ecommerce-platform')} 
                      className="text-xs font-mono text-blue-400 hover:text-white flex items-center gap-1 cursor-pointer"
                    >
                      <span>{lang === 'en' ? 'Inspect Infrastructure' : '查看底层系统'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Floating telemetry metrics as mandated by "Immersive UI" */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto rounded-2xl border border-white/10 bg-black/40 p-6 backdrop-blur-xl relative overflow-hidden shadow-2xl">
                  {/* Glowing background highlights inside layout */}
                  <div className="absolute top-0 right-1/4 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />
                  
                  {/* Metric 1 */}
                  <div className="text-left border-r border-white/5 pr-4 md:pr-0">
                    <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-gray-500 font-semibold mb-1">
                      <Users className="w-3.5 h-3.5 text-teal-400" />
                      <span>{lang === 'en' ? 'Active Nodes' : '活跃分销终端'}</span>
                    </div>
                    <div className="text-2xl font-bold font-mono text-white tracking-tight">
                      {metrics.activeSessions.toLocaleString()}
                    </div>
                    <span className="text-[9px] text-green-400 font-mono">● {lang === 'en' ? 'GLOBAL REALTIME' : '全球实时连线'}</span>
                  </div>

                  {/* Metric 2 */}
                  <div className="text-left md:border-r border-white/5 md:px-4 pl-2 pr-0">
                    <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-gray-500 font-semibold mb-1">
                      <Activity className="w-3.5 h-3.5 text-purple-400" />
                      <span>{lang === 'en' ? 'Global TPS' : '实数网络吞吐'}</span>
                    </div>
                    <div className="text-2xl font-bold font-mono text-teal-400 tracking-tight">
                      {metrics.globalTps} <span className="text-xs text-gray-500">tx/s</span>
                    </div>
                    <span className="text-[9px] text-teal-400 font-mono">1.2ms latency</span>
                  </div>

                  {/* Metric 3 */}
                  <div className="text-left border-r border-white/5 pr-4 md:px-4 pl-0">
                    <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-gray-500 font-semibold mb-1">
                      <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{lang === 'en' ? 'Daily Checkout' : '今日到账处理'}</span>
                    </div>
                    <div className="text-2xl font-bold font-mono text-white tracking-tight">
                      ${Math.floor(animatedGmv).toLocaleString()}
                    </div>
                    <span className="text-[9px] text-emerald-400 font-mono">+{((metrics.todayGmv / 10000) % 10).toFixed(2)}% vs {lang === 'en' ? 'yesterday' : '昨日对比'}</span>
                  </div>

                  {/* Metric 4 */}
                  <div className="text-left pl-2">
                    <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-gray-500 font-semibold mb-1">
                      <TrendingUp className="w-3.5 h-3.5 text-blue-400" />
                      <span>{lang === 'en' ? 'Conversion lift' : '加权转化上扬'}</span>
                    </div>
                    <div className="text-2xl font-bold font-mono text-purple-300 tracking-tight">
                      +{metrics.conversionRate}%
                    </div>
                    <span className="text-[9px] text-purple-400 font-mono">Using ModaUI Forms</span>
                  </div>
                </div>

              </div>

              {/* Decorative structural frame */}
              <div className="mt-16 max-w-5xl mx-auto rounded-t-3xl border-t border-x border-white/10 bg-gradient-to-b from-white/5 to-transparent h-[200px] overflow-hidden relative group">
                <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-gray-950 to-transparent pointer-events-none z-10" />
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(to right, #445 1px, transparent 1px), linear-gradient(to bottom, #445 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
                
                {/* Simulated Floating Data Nodes */}
                <div className="absolute top-6 left-8 p-3 rounded-lg border border-teal-500/20 bg-gray-900/60 backdrop-blur-md text-left flex gap-3 shadow-lg max-w-xs animate-bounce" style={{ animationDuration: '6s' }}>
                  <div className="w-2.5 h-2.5 rounded-full bg-teal-400 mt-1 animate-pulse" />
                  <div>
                    <p className="text-[10px] uppercase text-gray-400 font-mono">SYSTEM AUTO ORDER</p>
                    <p className="text-xs font-bold font-mono text-white">{metrics.recentOrders[0]?.id || 'dp_tx_920193'}</p>
                    <p className="text-[9px] text-teal-400 font-mono">{metrics.recentOrders[0]?.region || 'Central Europe'}</p>
                  </div>
                </div>

                <div className="absolute top-12 right-12 p-3 rounded-lg border border-purple-500/20 bg-gray-900/60 backdrop-blur-md text-left flex gap-3 shadow-lg max-w-xs animate-bounce" style={{ animationDuration: '8s' }}>
                  <div className="w-2.5 h-2.5 rounded-full bg-purple-400 mt-1 animate-pulse" />
                  <div>
                    <p className="text-[10px] uppercase text-gray-400 font-mono">AGENT AUTHORIZATION</p>
                    <p className="text-xs font-bold font-mono text-purple-300">Agentico Authorized</p>
                    <p className="text-[9px] text-gray-400 font-mono">No API credential friction</p>
                  </div>
                </div>

                {/* Cyber Globe Axis center */}
                <div className="absolute bottom-[-150px] left-1/2 -translate-x-1/2 w-[480px] h-[300px] bg-gradient-to-t from-teal-500/20 via-purple-600/10 to-transparent rounded-full blur-2xl -z-10" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] border border-white/5 rounded-full rotate-[12deg]" />
              </div>
            </header>

            {/* LIVE TELEMETRY DEEP MONITOR */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-20">
              <div className="border border-white/10 rounded-2xl bg-gray-950/40 backdrop-blur-xl p-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1/3 h-px bg-gradient-to-r from-transparent via-teal-400 to-transparent" />
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/5 mb-6">
                  <div>
                    <div className="inline-flex items-center gap-1.5 text-xs text-teal-400 font-mono bg-teal-500/10 px-2 py-0.5 rounded border border-teal-500/10 mb-2">
                      <Zap className="w-3.5 h-3.5" />
                      <span>{lang === 'en' ? 'LIVE DEEPAY TRANSACTION PIPELINE' : 'DEEPAY 实数结算通道实时回溯'}</span>
                    </div>
                    <h3 className="text-xl font-bold font-sans">
                      {lang === 'en' ? 'Autonomous Financial Logs' : '全球自动化交易会话日志'}
                    </h3>
                  </div>
                  <div className="text-left md:text-right font-mono text-[11px] text-gray-400">
                    <span>{lang === 'en' ? 'Broadcasting from node cluster. Feed updates automatically every 5s.' : '正通过主网数据中继广播。数据源自 deepay.srl 的沙箱节点。'}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {metrics.recentOrders.map((ord, idx) => (
                    <div 
                      key={ord.id}
                      className="p-4 rounded-xl border border-white/5 bg-white/5 hover:border-teal-500/20 hover:bg-white/10 transition-all duration-300 flex items-center justify-between"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-teal-400" />
                          <span className="text-xs text-gray-400 font-mono">{ord.channel}</span>
                        </div>
                        <h4 className="font-mono text-sm font-bold text-white mt-1">{ord.id}</h4>
                        <p className="text-xs text-gray-500 font-semibold">{ord.region}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-bold font-mono text-emerald-400">${ord.amount.toFixed(2)}</span>
                        <p className="text-[10px] text-gray-500 font-mono">{ord.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* THE AI WORKFLOW SECTION (BRAIN VISUALIZER) */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
              <div className="max-w-3xl mx-auto mb-16">
                <span className="text-xs uppercase tracking-[0.2em] font-bold text-purple-400 font-mono">{lang === 'en' ? 'AI PROCESS & REASONING' : 'AI 操作决策机制'}</span>
                <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mt-3">
                  {lang === 'en' ? 'How Deepay Neural Commerce Works' : '透析 Deepay AI 自主运转网链'}
                </h2>
                <p className="text-gray-400 mt-4 text-base">
                  {lang === 'en' 
                    ? 'Watch standard trade requests flow through the Deepay autonomous logic engine, optimizing and fulfilling every action without user friction.'
                    : '观测一个经典的业务请求如何自适应通过多个智能体管道，实现动态极简化、低扣点、快下妥。'}
                </p>
              </div>

              {/* Steps grid */}
              <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mb-12">
                {workflowSteps.map((step, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveWorkflowStep(idx)}
                    className={`p-4 rounded-2xl border transition-all text-left relative overflow-hidden backdrop-blur-xl group ${
                      activeWorkflowStep === idx 
                        ? 'bg-gradient-to-b from-teal-500/10 to-purple-600/10 border-teal-500/40 shadow-[0_0_20px_rgba(13,148,136,0.15)]' 
                        : 'bg-white/5 border-white/5 hover:border-white/15'
                    }`}
                  >
                    <div className="absolute top-0 right-0 p-2 text-xs font-mono font-bold text-gray-500">
                      0{idx + 1}
                    </div>
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-3 font-mono font-bold text-xs ${
                      activeWorkflowStep === idx ? 'bg-teal-500 text-white shadow-[0_0_10px_rgba(13,148,136,0.4)]' : 'bg-white/5 text-gray-400'
                    }`}>
                      {idx === 0 && <Users className="w-4 h-4" />}
                      {idx === 1 && <Cpu className="w-4 h-4" />}
                      {idx === 2 && <Shield className="w-4 h-4" />}
                      {idx === 3 && <DollarSign className="w-4 h-4" />}
                      {idx === 4 && <Layers className="w-4 h-4 text-purple-300" />}
                      {idx === 5 && <Activity className="w-4 h-4 text-teal-400" />}
                    </div>
                    <h4 className="text-xs font-bold tracking-tight text-white mb-1">
                      {lang === 'en' ? step.label : step.labelZh}
                    </h4>
                    <p className="text-[9px] text-gray-500 line-clamp-2">
                       {lang === 'en' ? step.desc : step.descZh}
                    </p>
                    {activeWorkflowStep === idx && (
                      <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-teal-500 to-purple-600" />
                    )}
                  </button>
                ))}
              </div>

              {/* Expanded Selected Step Details */}
              <div className="max-w-4xl mx-auto rounded-3xl border border-white/10 bg-white/5 p-8 text-left relative overflow-hidden shadow-2xl backdrop-blur-xl">
                <div className="absolute -right-20 -top-20 w-48 h-48 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="flex flex-col md:flex-row gap-6 items-start justify-between">
                  <div>
                    <span className="text-xs font-mono text-teal-400 uppercase tracking-widest">{lang === 'en' ? `PIPELINE CORE STEP 0${activeWorkflowStep + 1}` : `中枢控制步骤 0${activeWorkflowStep + 1}`}</span>
                    <h3 className="text-2xl font-bold mt-1 text-white">
                      {lang === 'en' ? workflowSteps[activeWorkflowStep].label : workflowSteps[activeWorkflowStep].labelZh}
                    </h3>
                    <p className="text-gray-400 mt-3 text-base leading-relaxed max-w-2xl">
                      {lang === 'en' ? workflowSteps[activeWorkflowStep].desc : workflowSteps[activeWorkflowStep].descZh}
                    </p>
                    
                    <div className="flex gap-4 mt-6">
                      <button 
                        onClick={() => setActiveTab('docs')}
                        className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-white rounded-lg transition-all"
                      >
                        {lang === 'en' ? 'View SDK Endpoint' : '呼出 API 端点'}
                      </button>
                      <button 
                        onClick={() => { setActiveWorkflowStep((activeWorkflowStep + 1) % workflowSteps.length); }}
                        className="px-4 py-2 bg-teal-500/10 border border-teal-500/20 text-xs text-teal-400 rounded-lg hover:bg-teal-500/20 transition-all flex items-center gap-1"
                      >
                        <span>{lang === 'en' ? 'Next flow step' : '下一流向步骤'}</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="w-full md:w-auto shrink-0 font-mono text-xs text-gray-400 bg-gray-950 p-4 rounded-xl border border-white/10">
                    <p className="text-teal-400">// API JSON Payload telemetry</p>
                    <p className="text-white mt-1">"DeepayRoutingProtocol": "v4.1"</p>
                    <p>"OriginNode": "deepay.srl"</p>
                    <p>"ModaUITheme": "ImmersiveConsole"</p>
                    <p>"SecurityShield": "Active (128bit)"</p>
                    <p>"TpsThrottlingRate": "Unrestricted"</p>
                  </div>
                </div>
              </div>
            </section>

          </div>
        )}

        {/* ==================== TAB 2: FEATURES ==================== */}
        {activeTab === 'features' && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs uppercase tracking-[0.2em] font-bold text-teal-400 font-mono">{lang === 'en' ? 'Core Platform Blocks' : '企业核心服务矩阵'}</span>
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mt-3">
                {lang === 'en' ? 'Deepay Enterprise Solutions' : '自主模块：多端数字资产解耦'}
              </h2>
              <p className="text-gray-400 mt-4 text-base">
                {lang === 'en' 
                  ? 'We don\'t believe in fragmented third-party bridges. Deepay unites critical customer services, billing systems, and inventory assets under one AI Commerce OS.'
                  : '打破各自为战的数据孤岛。通过一套主网协议（deepay.srl），企业自主搭建并监控多条业务供应链。'}
              </p>
            </div>

            {/* Comprehensive features GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              {/* Feature 1 */}
              <div className="rounded-2xl border border-white/10 bg-gray-900/20 p-6 relative overflow-hidden backdrop-blur-xl hover:border-teal-500/30 hover:shadow-[0_0_20px_rgba(13,148,136,0.1)] transition-all duration-300">
                <div className="absolute top-0 right-0 w-16 h-16 bg-teal-500/5 rounded-full blur-xl" />
                <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center mb-4 text-teal-400 shadow-[0_0_15px_rgba(13,148,136,0.15)]">
                  <Cpu className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {lang === 'en' ? 'Autonomous AI Staff' : '多智能体自律员工组'}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed mb-4">
                  {lang === 'en' 
                    ? 'Deploy trained workflow teams specializing in Marketing writing, direct buyer negotiations, and real-time inventory adjustments.'
                    : '根据业务场景，自由挑选并发布在文案写作、店铺导购、财务内审等各细分场景的自理性 Agent 编队。'}
                </p>
                <div className="flex items-center justify-between mt-4">
                  <div className="text-[10px] font-semibold text-teal-300 font-mono">
                    <span>ModaUI Autonomous Staff Core</span>
                  </div>
                  <button onClick={() => navigateToRoute('features/ai-assistant')} className="text-xs text-teal-400 hover:text-white flex items-center gap-1 font-mono cursor-pointer">
                    <span>{lang === 'en' ? 'Review Schema' : '测试节点 / Microdata'}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="rounded-2xl border border-white/10 bg-gray-900/20 p-6 relative overflow-hidden backdrop-blur-xl hover:border-purple-500/30 hover:shadow-[0_0_20px_rgba(109,40,217,0.1)] transition-all duration-300">
                <div className="absolute top-0 right-0 w-16 h-16 bg-purple-500/5 rounded-full blur-xl" />
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-4 text-purple-400 shadow-[0_0_15px_rgba(109,40,217,0.15)]">
                  <Zap className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {lang === 'en' ? 'Dynamic Deepay Payment' : '智能跨境清算支付（Payment）'}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed mb-4">
                  {lang === 'en' 
                    ? 'Bypass rigid high-interchange standard payment structures. Run localized routing algorithms with direct multi-currency settlement.'
                    : '智能分发欧元、美元等多币种到账路由。采用高级本地化结汇机制，手续费用相比同行劲省 20%。'}
                </p>
                <div className="flex items-center justify-between mt-4">
                  <div className="text-[10px] font-semibold text-purple-300 font-mono">
                    <span>PCI-DSS Approved</span>
                  </div>
                  <button onClick={() => navigateToRoute('features/ai-payments')} className="text-xs text-purple-400 hover:text-white flex items-center gap-1 font-mono cursor-pointer">
                    <span>{lang === 'en' ? 'Review Schema' : '测试节点 / Microdata'}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="rounded-2xl border border-white/10 bg-gray-900/20 p-6 relative overflow-hidden backdrop-blur-xl hover:border-indigo-500/30 hover:shadow-[0_0_20px_rgba(99,102,241,0.1)] transition-all duration-300">
                <div className="absolute top-0 right-0 w-16 h-16 bg-indigo-500/5 rounded-full blur-xl" />
                <div className="w-10 h-10 rounded-xl bg-indigo-505/10 border border-indigo-500/20 flex items-center justify-center mb-4 text-indigo-400">
                  <Layers className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {lang === 'en' ? 'Auto-Replenish Inventory' : '预测型仓储与智能补货'}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed mb-4">
                  {lang === 'en' 
                    ? 'Our system monitors sales velocities and automatically triggers suppliers billing or warehouse notices before seasonal out-of-stock.'
                    : '后台算法自动建立动态销售频率模型，在断货期到来前 15 天，智能向原厂发起定额补货，规避经营中断风险。'}
                </p>
                <div className="flex items-center justify-between mt-4">
                  <div className="text-[10px] font-semibold text-indigo-300 font-mono">
                    <span>Unified ERP Middleware</span>
                  </div>
                  <button onClick={() => navigateToRoute('features/ai-inventory')} className="text-xs text-indigo-400 hover:text-white flex items-center gap-1 font-mono cursor-pointer">
                    <span>{lang === 'en' ? 'Review Schema' : '测试节点 / Microdata'}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Feature 4 */}
              <div className="rounded-2xl border border-white/10 bg-gray-900/20 p-6 relative overflow-hidden backdrop-blur-xl hover:border-emerald-500/30 hover:shadow-[0_0_20px_rgba(16,185,129,0.1)] transition-all duration-300">
                <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500/5 rounded-full blur-xl" />
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-4 text-emerald-400">
                  <Database className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {lang === 'en' ? 'Smart CRM & Retention' : 'AI 客群画像与营销挽回'}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed mb-4">
                  {lang === 'en' 
                    ? 'Auto-clustering and micro-targeting allow the AI code engine to draft conversion-focused email automation streams for abandoned carts.'
                    : '根据订单高忠诚、复购频次，将客群打上高精细化标签，让 AI 撰写、下发最适宜的挽单优惠码。'}
                </p>
                <div className="text-xs font-semibold text-emerald-300 font-mono flex items-center gap-1">
                  <span>99.8% Successful Delivery</span>
                </div>
              </div>

              {/* Feature 5 */}
              <div className="rounded-2xl border border-white/10 bg-gray-900/20 p-6 relative overflow-hidden backdrop-blur-xl hover:border-pink-500/30 hover:shadow-[0_0_20px_rgba(236,72,153,0.1)] transition-all duration-300">
                <div className="absolute top-0 right-0 w-16 h-16 bg-pink-500/5 rounded-full blur-xl" />
                <div className="w-10 h-10 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center mb-4 text-pink-400">
                  <Shield className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {lang === 'en' ? 'Military-Grade Fraud Shield' : 'AI 风控拦截（Fraud Shield）'}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed mb-4">
                  {lang === 'en' 
                    ? 'Using neural heuristic scores, the billing system screens typed keystroke rhythms, origin VPN nodes, and geo-incongruity.'
                    : '多重风控校验层在 40 毫秒内计算黑产特征，保护账户避免受恶意发卡行拒付与二次返点损失。'}
                </p>
                <div className="text-xs font-semibold text-pink-300 font-mono flex items-center gap-1">
                  <span>Active Behavioral Heuristics</span>
                </div>
              </div>

              {/* Feature 6 */}
              <div className="rounded-2xl border border-white/10 bg-gray-900/20 p-6 relative overflow-hidden backdrop-blur-xl hover:border-blue-500/30 hover:shadow-[0_0_20px_rgba(59,130,246,0.1)] transition-all duration-300">
                <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/5 rounded-full blur-xl" />
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-4 text-blue-400">
                  <Activity className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {lang === 'en' ? 'AIO & SEO Auto-Publisher' : '自动内容营销系统（AIO/SEO）'}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed mb-4">
                  {lang === 'en' 
                    ? 'Generate beautiful index-ready blog articles dynamically structured for Google Search and ChatGPT/Gemini citation indexes.'
                    : '预留 AI 自动撰稿平台，可在网站头部动态生成 Schema 微格式。为 ChatGPT 与 Perplexity 优化，抢占搜索引用位。'}
                </p>
                <div className="text-xs font-semibold text-blue-300 font-mono flex items-center gap-1">
                  <span>Structured Schema JSON-LD Included</span>
                </div>
              </div>

            </div>
          </section>
        )}

        {/* ==================== TAB 3: SOLUTIONS ==================== */}
        {activeTab === 'solutions' && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs uppercase tracking-[0.2em] font-bold text-purple-400 font-mono">{lang === 'en' ? 'Tailored Deployments' : '多行业数字化赋能'}</span>
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mt-3">
                {lang === 'en' ? 'Commerce Redefined, Every Industry' : '垂直赋能，解锁高维增长方案'}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              
              <div className="p-8 rounded-3xl border border-white/10 bg-white/5 relative overflow-hidden group">
                <span className="text-[10px] text-teal-400 font-mono uppercase tracking-widest">01 / RETAIL & ECOMMERCE</span>
                <h3 className="text-2xl font-bold mt-2 mb-4 text-white">
                  {lang === 'en' ? 'Enterprise B2C Global Stores' : '跨境零售 & Headless 品牌站'}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  {lang === 'en' 
                    ? 'Replace clunky theme pages with beautiful ModaUI visual components. Integrate Shopify AI or run fully standalone stores direct-selling to international clients with automated payment translation.'
                    : '结合 Shopify 或 WooCommerce 接口。利用 ModaUI 设计规范，将店铺前端装扮成极富科技品味的流动电子画册，显著降低买家跳出率。'}
                </p>
                <ul className="space-y-2 text-xs text-gray-400 mb-6">
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-teal-400 shrink-0" /> {lang === 'en' ? 'Bento-grid active trending placements' : '趋势热力单品多态排版'}</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-teal-400 shrink-0" /> {lang === 'en' ? 'Bypassing extra Shopify standard fees' : '绕过昂贵的多渠道手续费扣除'}</li>
                </ul>
                <button 
                  onClick={() => navigateToRoute('solutions/retail')}
                  className="w-full py-3 bg-teal-500 hover:bg-teal-400 text-black font-bold text-xs rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>{lang === 'en' ? 'Review Schema' : '测试节点 / Microdata'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="p-8 rounded-3xl border border-white/10 bg-white/5 relative overflow-hidden group">
                <span className="text-[10px] text-purple-400 font-mono uppercase tracking-widest">02 / MANUFACTURING & WHOLESALE</span>
                <h3 className="text-2xl font-bold mt-2 mb-4 text-white">
                  {lang === 'en' ? 'Supply Chains & B2B Portals' : '柔性供应链 & 制造大宗分销'}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  {lang === 'en' 
                    ? 'Automate complex layered pricing tiers, specific VAT invoices, and customs parameters. Link manufacturers with distributors via our secure developer API.'
                    : '一键发布阶梯大宗定价表格，智能算税、预缴海关关税。多链智能体（Deepay AI Agents）自动匹配上、下游分销付款会话。'}
                </p>
                <ul className="space-y-2 text-xs text-gray-400 mb-6">
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-purple-400 shrink-0" /> {lang === 'en' ? 'Support automated tax rules' : '自动关联发票与各联邦报税单合规'}</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-purple-400 shrink-0" /> {lang === 'en' ? 'Express webhook logistics alarms' : '多仓库联动与分流备货预警'}</li>
                </ul>
                <button 
                  onClick={() => navigateToRoute('solutions/wholesale')}
                  className="w-full py-3 bg-purple-500 hover:bg-purple-400 text-white font-bold text-xs rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>{lang === 'en' ? 'Review Schema' : '测试节点 / Microdata'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="p-8 rounded-3xl border border-white/10 bg-white/5 relative overflow-hidden group">
                <span className="text-[10px] text-emerald-400 font-mono uppercase tracking-widest">03 / DIGITAL PRODUCTS & SAAS</span>
                <h3 className="text-2xl font-bold mt-2 mb-4 text-white">
                  {lang === 'en' ? 'SaaS Subscriptions & Tokens' : '数字软件订阅 & 卡券令牌分发'}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  {lang === 'en' 
                    ? 'Deploy continuous recurring checkout cycles. Manage tokens, automated access licensing, user-specific accounts, and refund entries.'
                    : '自主开发周期性的分缴扣款机制（Subscription）。系统侦测支付状态，在到账瞬间向买家授权激活软件许可证。'}
                </p>
                <div className="inline-flex items-center gap-1 text-[11px] text-teal-400 font-mono bg-teal-500/10 px-2 py-0.5 rounded mt-4">
                  <Zap className="w-3.5 h-3.5" />
                  <span>{lang === 'en' ? 'SaaS standard API ready' : '全球标准的软件服务连接协议'}</span>
                </div>
              </div>

              <div className="p-8 rounded-3xl border border-white/10 bg-white/5 relative overflow-hidden group">
                <span className="text-[10px] text-blue-400 font-mono uppercase tracking-widest">04 / GLOBAL SME TO ENTERPRISE</span>
                <h3 className="text-2xl font-bold mt-2 mb-4 text-white">
                  {lang === 'en' ? 'The AI commerce operating platform' : '中小零售极智跃升底层'}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  {lang === 'en' 
                    ? 'We design flexible tiers so bootstrapped SMEs can scale with zero initial hosting charges and pay-as-you-grow payment fees.'
                    : '贴合自主创业出海群体的阶梯政策，支持通过免费沙箱建立连接。享受零起步费用和弹性的手续费优惠。'}
                </p>
                <div className="inline-flex items-center gap-1 text-[11px] text-purple-400 font-mono bg-purple-500/10 px-2 py-0.5 rounded mt-4">
                  <Globe className="w-3.5 h-3.5" />
                  <span>{lang === 'en' ? 'Multilingual automatic optimization' : '出海首屏 100+ 母语自动适配'}</span>
                </div>
              </div>

            </div>
          </section>
        )}

        {/* ==================== TAB 4: PRICING ==================== */}
        {activeTab === 'pricing' && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs uppercase tracking-[0.2em] font-bold text-teal-400 font-mono">{lang === 'en' ? 'Transparent Tiers' : '透明收费，无额外杂费'}</span>
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mt-3">
                {lang === 'en' ? 'Scale Smarter, Pay Less' : '合理的阶梯，助力长歌远引'}
              </h2>
            </div>

            {/* Pricing cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              
              {/* Tier 1 */}
              <div className="p-8 rounded-3xl border border-white/10 bg-white/5 relative flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-gray-300">Starter Core</h3>
                  <p className="text-xs text-gray-500 mt-1">{lang === 'en' ? 'For emerging independent brands' : '初创独立站与试水出海'}</p>
                  
                  <div className="my-6">
                    <span className="text-4xl font-extrabold text-white font-mono">$0</span>
                    <span className="text-xs text-gray-400 ml-1">/{lang === 'en' ? 'month forever' : '永久免费'}</span>
                  </div>

                  <ul className="space-y-3 text-xs text-gray-400 border-t border-white/5 pt-6">
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-teal-400 shrink-0" /> {lang === 'en' ? 'ModaUI Components Integration' : '基础 ModaUI 设计规范授权'}</li>
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-teal-400 shrink-0" /> {lang === 'en' ? '2.4% + €0.20 Standard Checkout' : '2.4% + €0.20 标准欧元收单代'}</li>
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-teal-400 shrink-0" /> {lang === 'en' ? '3 active AI Employees' : '3 名自律型主控 AI 员工组'}</li>
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-teal-400 shrink-0" /> {lang === 'en' ? 'Full access to deepay.srl doc' : '全面查阅官方开发者指南手册'}</li>
                  </ul>
                </div>
                <button 
                  onClick={() => setActiveTab('contact')}
                  className="w-full mt-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-center text-xs font-bold transition-all"
                >
                  {lang === 'en' ? 'Deploy Sandbox' : '立即部署沙箱箱体'}
                </button>
              </div>

              {/* Tier 2: Selected */}
              <div className="p-8 rounded-3xl border-2 border-teal-500/50 bg-gray-900/30 relative flex flex-col justify-between shadow-[0_0_30px_rgba(13,148,136,0.15)] overflow-hidden">
                <div className="absolute top-4 right-4 bg-teal-500 text-black text-[9px] font-mono font-bold px-2 py-0.5 rounded uppercase">
                  {lang === 'en' ? 'RECOMMENDED' : '主流推荐'}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <span>Business Operating</span>
                    <Sparkles className="w-4 h-4 text-teal-400" />
                  </h3>
                  <p className="text-xs text-teal-400/80 mt-1">{lang === 'en' ? 'The ideal AI commerce setup' : '中型多端出海的核心配置'}</p>
                  
                  <div className="my-6">
                    <span className="text-4xl font-extrabold text-white font-mono">$199</span>
                    <span className="text-xs text-gray-400 ml-1">/{lang === 'en' ? 'month' : '月度租赁'}</span>
                  </div>

                  <ul className="space-y-3 text-xs text-gray-300 border-t border-white/5 pt-6">
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-teal-400 shrink-0" /> <span className="text-white font-bold">{lang === 'en' ? 'Priority 1.6% Interchange Fee' : '特惠 1.6% 智能动态支付费率'}</span></li>
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-teal-400 shrink-0" /> {lang === 'en' ? 'Unlimited Automated AI Staff' : '无上限自主智能体 Agents 部署'}</li>
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-teal-400 shrink-0" /> {lang === 'en' ? 'Smart Predictive Inventory Refills' : '仓储断货智能预测与补货警报'}</li>
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-teal-400 shrink-0" /> {lang === 'en' ? 'AIO & SEO Auto-articles publisher' : '自动内容营销 AIO 网页同步推送'}</li>
                  </ul>
                </div>
                <button 
                  onClick={() => setActiveTab('contact')}
                  className="w-full mt-8 py-3 bg-gradient-to-r from-teal-500 to-emerald-400 text-black rounded-xl text-center text-xs font-bold hover:shadow-[0_0_20px_rgba(13,148,136,0.35)] transition-all"
                >
                  {lang === 'en' ? 'Get Started Business' : '开通商业运营权限'}
                </button>
              </div>

              {/* Tier 3 */}
              <div className="p-8 rounded-3xl border border-white/10 bg-white/5 relative flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-gray-300">Custom Enterprise</h3>
                  <p className="text-xs text-gray-500 mt-1">{lang === 'en' ? 'For massive global trade operations' : '跨国大宗、仓储一体化平台'}</p>
                  
                  <div className="my-6">
                    <span className="text-4xl font-extrabold text-white font-mono">Talk</span>
                    <span className="text-xs text-gray-400 ml-1"> {lang === 'en' ? 'for details' : '议定'}</span>
                  </div>

                  <ul className="space-y-3 text-xs text-gray-400 border-t border-white/5 pt-6">
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-purple-400 shrink-0" /> {lang === 'en' ? 'As low as 0.8% Interchange Rates' : '最低可支持协议 0.8% 跨境清算'}</li>
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-purple-400 shrink-0" /> {lang === 'en' ? 'Private Dedicated Gemini model server' : '独享高吞吐量大模型推理物理容器'}</li>
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-purple-400 shrink-0" /> {lang === 'en' ? 'Direct engineer integration support' : 'Deepay 架构师上门提供源码微改'}</li>
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-purple-400 shrink-0" /> {lang === 'en' ? 'Dedicated SLA guarantee document' : '签署法律高维 SLA 服务可用协议'}</li>
                  </ul>
                </div>
                <button 
                  onClick={() => setActiveTab('contact')}
                  className="w-full mt-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-center text-xs font-bold transition-all"
                >
                  {lang === 'en' ? 'Confer Engineering' : '预约架构师商洽'}
                </button>
              </div>

            </div>
          </section>
        )}

        {/* ==================== TAB 5: BLOG (AIO CONTENT MARKETING) ==================== */}
        {activeTab === 'blog' && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            
            {/* SEO generated posts header */}
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs uppercase tracking-[0.2em] font-bold text-teal-400 font-mono">{lang === 'en' ? 'Content Marketing Hub (AIO Optimized)' : '基于 AI 搜索优化的 AIO 博客平台'}</span>
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mt-3">
                {lang === 'en' ? 'Knowledge is Authority' : '以深邃洞察，树立行业品牌信号'}
              </h2>
              <p className="text-gray-400 mt-4 text-sm leading-relaxed">
                {lang === 'en' 
                  ? 'Our built-in AI Blog engine dynamically updates web metadata index headers. Use our dynamic writing toolkit below to auto-publish your own optimized case studies directly into store databases!'
                  : '我们在核心底层内植入了自适应 Schema 框架（Organization / Software / Product），确保每篇文章都极其利于大模型或 Google 搜录。您可以直接在下方利用我们自主的内容生成器测试在本地生成一篇文章。'}
              </p>
            </div>

            {/* LIVE CONTENT MARKETING GENERATOR TOOL */}
            <div className="max-w-4xl mx-auto mb-16 rounded-3xl border border-teal-500/20 bg-gray-900/40 p-6 md:p-8 backdrop-blur-xl relative overflow-hidden">
              <div className="absolute top-0 right-1/4 w-32 h-32 bg-teal-500/10 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex items-center gap-2 mb-4">
                <Sparkle className="w-5 h-5 text-teal-400 animate-pulse" />
                <h3 className="text-lg font-bold">
                  {lang === 'en' ? 'AI Auto-AIO Content Engine (Live)' : 'AI 搜索优化（AIO）文章生成实验室'}
                </h3>
              </div>
              
              <p className="text-xs text-gray-400 leading-relaxed max-w-2xl mb-6">
                {lang === 'en' 
                  ? 'Type an e-commerce topic (e.g., Shopify AI, WooCommerce, Smart payments, AI Agents). Our server-side Gemini agent will generate a complete, high-ranking, markdown-styled SEO article with localized keywords and link structures!'
                  : '只需输入任意跨境电商或技术关键词（如：独立站支付, Shopify AI, ERP 补货, 客户关系网优化），服务器端的 Gemini 模型将瞬时撰写并智能插入相关的核心概念和对 deepay.srl / ModaUI 的正面描述！'}
              </p>

              <form onSubmit={handleGenerateBlogPost} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-xs font-mono text-gray-400 mb-1.5">{lang === 'en' ? 'TOPIC / HEADLINE IDEA' : '拟写核心主题或博文标题'}</label>
                  <input 
                    type="text"
                    required
                    placeholder={lang === 'en' ? 'e.g., Decoupled Omnichannel CRM for Global SMEs' : '例如：高并发状态下 Shopify B2B 网关的搭建实战'}
                    value={generatorTopic}
                    onChange={(e) => setGeneratorTopic(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-white/10 bg-black/60 text-white placeholder-gray-500 text-sm focus:border-teal-400 focus:ring-0 focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-gray-400 mb-1.5">{lang === 'en' ? 'TARGET SEO KEYWORD' : '定向优化的核心 SEO 词条'}</label>
                  <input 
                    type="text"
                    placeholder="e.g., deepay.srl, ModaUI"
                    value={generatorKeyword}
                    onChange={(e) => setGeneratorKeyword(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-white/10 bg-black/60 text-white placeholder-gray-500 text-sm focus:border-teal-400 focus:outline-none transition-all"
                  />
                </div>
                <div className="md:col-span-3">
                  <button 
                    type="submit"
                    disabled={blogGenLoading}
                    className="w-full py-4 bg-gradient-to-r from-teal-500 via-emerald-400 to-purple-600 text-black font-extrabold text-sm rounded-xl cursor-pointer hover:shadow-[0_0_20px_rgba(13,148,136,0.25)] hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
                  >
                    {blogGenLoading ? (
                      <>
                        <span className="w-4 h-4 rounded-full border-2 border-black border-t-transparent animate-spin" />
                        <span>{lang === 'en' ? 'Gemini AI is structuring semantic content schemas...' : '中枢 Gemini 正基于 AIO 微数据在服务器端构思成文...'}</span>
                      </>
                    ) : (
                      <>
                        <Cpu className="w-4 h-4" />
                        <span>{lang === 'en' ? 'Generate & Load SEO Blog Article' : '生成自适应 AIO 博文并装载至页面'}</span>
                      </>
                    )}
                  </button>
                </div>
              </form>

              {blogGenSuccess && (
                <div className="p-3 rounded-lg border border-teal-500/30 bg-teal-500/10 text-teal-300 text-xs mt-4 animate-pulse">
                  {lang === 'en' ? '✓ High-ranking SEO Article generated successfully! Loaded into the list below.' : '✓ 文章生成成功！自动排载于下方首位，已在服务端匹配 Schema parameters 校验。'}
                </div>
              )}
            </div>

            {/* Categories selector */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-10 pb-6 border-b border-white/5">
              {CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => { setSelectedCategory(cat.id); setSelectedPost(null); }}
                  className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all ${
                    selectedCategory === cat.id 
                      ? 'bg-gradient-to-r from-teal-500 to-purple-600 text-white font-black' 
                      : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {lang === 'en' ? cat.label : cat.labelZh}
                </button>
              ))}
            </div>

            {/* BLOG VIEW ROUTING PANELS */}
            {!selectedPost ? (
              /* Grid index list */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {currentPosts.map((post) => (
                  <article 
                    key={post.id}
                    onClick={() => setSelectedPost(post)}
                    className="rounded-2xl border border-white/15 bg-white/5 overflow-hidden flex flex-col justify-between group cursor-pointer hover:border-teal-500/20 transform hover:-translate-y-1 transition-all duration-300 shadow-xl"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500 pointer-events-none"
                      />
                      <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-gray-950 to-transparent">
                        <span className="text-[10px] font-mono font-bold text-teal-400 uppercase tracking-widest bg-black/60 border border-teal-500/20 px-2 py-0.5 rounded">
                          {lang === 'en' ? post.category : post.categoryZh}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-mono text-gray-400">{post.publishedAt} • {post.readTime}</span>
                        <h3 className="text-lg font-bold text-white mt-1 group-hover:text-teal-300 transition-colors tracking-tight line-clamp-2">
                          {lang === 'en' ? post.title : post.titleZh}
                        </h3>
                        <p className="text-xs text-gray-400 mt-2 line-clamp-3 leading-relaxed">
                          {lang === 'en' ? post.description : post.descriptionZh}
                        </p>
                      </div>

                      <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-semibold text-gray-500">
                        <span>{post.author}</span>
                        <span className="text-teal-400 group-hover:translate-x-1.5 transition-transform flex items-center gap-1 font-mono">
                          {lang === 'en' ? 'READ ARTICLE' : '阅读全文'} <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              /* Expanded Article View with pagination, Canonical representations, Author card, RSS indexer */
              <div className="max-w-3xl mx-auto rounded-3xl border border-white/10 bg-black/40 p-6 md:p-12 backdrop-blur-xl relative">
                
                {/* Visual back buttons */}
                <button 
                  onClick={() => setSelectedPost(null)}
                  className="mb-8 px-4 py-2 bg-white/5 border border-white/10 hover:bg-white/10 text-xs text-white rounded-lg cursor-pointer transition-all flex items-center gap-1.5"
                >
                  <ArrowRight className="w-4 h-4 rotate-180 text-teal-400" />
                  <span>{lang === 'en' ? 'Back to all insights' : '返回博客控制中心'}</span>
                </button>

                {/* Meta details with schema tags */}
                <div className="flex items-center gap-3 text-xs text-gray-400 mb-4 font-mono">
                  <span className="text-teal-400 font-bold uppercase">{lang === 'en' ? selectedPost.category : selectedPost.categoryZh}</span>
                  <span>•</span>
                  <span>{selectedPost.publishedAt}</span>
                  <span>•</span>
                  <span>{selectedPost.readTime}</span>
                </div>

                <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight mb-6">
                  {lang === 'en' ? selectedPost.title : selectedPost.titleZh}
                </h1>

                {/* Meta keywords index indicators */}
                <div className="flex flex-wrap items-center gap-1.5 mb-8 border-b border-white/5 pb-6">
                  <span className="text-xs font-mono text-gray-500 uppercase">{lang === 'en' ? 'AIO Target Entities:' : 'AIO模型核心索引:'}</span>
                  {selectedPost.keywords.map((kw, idx) => (
                    <span key={idx} className="text-[10px] font-mono bg-white/5 border border-white/10 px-2 py-0.5 rounded text-gray-300 font-semibold">
                      {kw}
                    </span>
                  ))}
                </div>

                {/* Banner image */}
                <div className="w-full h-72 rounded-2xl overflow-hidden mb-8 border border-white/10">
                  <img src={selectedPost.image} alt={selectedPost.title} className="w-full h-full object-cover pointer-events-none" />
                </div>

                {/* Article structured bodies */}
                <div className="prose prose-invert max-w-none text-gray-300 text-sm leading-relaxed space-y-6">
                  {/* Clean custom rendering matching language headers */}
                  {(lang === 'en' ? selectedPost.content : selectedPost.contentZh).split('\n\n').map((paragraph, idx) => {
                    if (paragraph.startsWith('## ')) {
                      return <h2 key={idx} className="text-2xl font-bold text-white mt-8 mb-4 border-l-4 border-teal-500 pl-3">{paragraph.replace('## ', '')}</h2>;
                    }
                    if (paragraph.startsWith('### ')) {
                      return <h3 key={idx} className="text-lg font-bold text-teal-400 mt-6 mb-3">{paragraph.replace('### ', '')}</h3>;
                    }
                    if (paragraph.startsWith('* ')) {
                      return (
                        <ul key={idx} className="list-disc pl-5 space-y-2 text-gray-400">
                          {paragraph.split('\n').map((li, lidx) => (
                            <li key={lidx}>{li.replace('* ', '')}</li>
                          ))}
                        </ul>
                      );
                    }
                    return <p key={idx} className="text-gray-300">{paragraph}</p>;
                  })}
                </div>

                {/* Canonical statement for high-trust search engines */}
                <div className="mt-12 pt-6 border-t border-white/5 rounded-2xl bg-white/5 p-4 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 font-mono gap-4">
                  <div className="text-left font-semibold">
                    <p className="text-[10px] text-teal-400 uppercase tracking-widest">{lang === 'en' ? 'SECURE CANONICAL TARGET' : '谷歌原生安全外链锚点'}</p>
                    <p className="text-white mt-1 select-all">https://deepay.srl/blog/{selectedPost.slug}</p>
                  </div>
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(`https://deepay.srl/blog/${selectedPost.slug}`);
                      setCopiedLink(true);
                      setTimeout(() => setCopiedLink(false), 2000);
                    }}
                    className="px-4 py-2 bg-teal-500/10 border border-teal-500/30 text-teal-400 hover:bg-teal-500/20 rounded-lg transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copiedLink ? (lang === 'en' ? 'Copied' : '已复制') : (lang === 'en' ? 'Copy Index Link' : '复制收录锚点')}</span>
                  </button>
                </div>

                {/* Author card bio metadata */}
                <div className="mt-12 p-6 rounded-2xl border border-white/5 bg-gray-900/60 backdrop-blur-md flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-teal-500 to-purple-600 flex items-center justify-center font-bold text-lg text-white font-mono shadow">
                    {selectedPost.author[0]}
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-white">{selectedPost.author}</h5>
                    <p className="text-[11.5px] text-gray-400 mt-0.5">{lang === 'en' ? 'Deepay SRL International Strategic Writer' : 'Deepay SRL 全球多语种出海品牌编成节点'}</p>
                  </div>
                </div>

              </div>
            )}

          </section>
        )}

        {/* ==================== TAB 6: DOCS (DEVELOPER CENTER) ==================== */}
        {activeTab === 'docs' && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-20">
            <div className="flex flex-col lg:flex-row gap-8">
              
              {/* SIDEBAR NAVIGATION TOPICS */}
              <aside className="w-full lg:w-64 shrink-0 bg-gray-950/40 border border-white/10 rounded-2xl p-6 backdrop-blur-xl h-fit space-y-6">
                
                <div className="flex items-center gap-2 pb-4 border-b border-white/5">
                  <Terminal className="w-4 h-4 text-teal-400" />
                  <span className="text-sm font-bold uppercase tracking-wider font-mono">Developer Hub</span>
                </div>

                {DOCS_SECTIONS.map(sec => (
                  <div key={sec.id} className="space-y-2">
                    <h4 className="text-[11px] font-mono text-gray-500 font-extrabold tracking-widest uppercase">
                      {lang === 'en' ? sec.title : sec.titleZh}
                    </h4>
                    <div className="space-y-1">
                      {sec.items.map(item => (
                        <button
                          key={item.id}
                          onClick={() => { setActiveDocSlug(item.slug); }}
                          className={`w-full text-left px-3 py-1.5 rounded-lg text-xs transition-all flex items-center justify-between group ${
                            activeDocSlug === item.slug 
                              ? 'bg-teal-500/10 border-l-2 border-teal-500 text-teal-300 font-bold' 
                              : 'text-gray-400 hover:text-white hover:bg-white/5'
                          }`}
                        >
                          <span>{lang === 'en' ? item.title : item.titleZh}</span>
                          <ChevronRight className="w-3 h-3 text-gray-600 group-hover:text-teal-400" />
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </aside>

              {/* CENTRAL DETAILED GUIDELINES WRAPER */}
              <main className="flex-1 bg-gray-950/40 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-xl space-y-8 relative overflow-hidden shadow-2xl">
                
                {/* Visual grid highlight */}
                <div className="absolute top-0 right-1/4 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />
                
                {selectedDocItem ? (
                  <div className="space-y-6">
                    
                    {/* Direct content interpretation */}
                    <div className="prose prose-invert text-gray-300 text-sm leading-relaxed space-y-4">
                      {(lang === 'en' ? selectedDocItem.content : selectedDocItem.contentZh).split('\n\n').map((paragraph, idx) => {
                        if (paragraph.startsWith('### ')) {
                          return <h3 key={idx} className="text-xl font-bold text-white mt-6 mb-3">{paragraph.replace('### ', '')}</h3>;
                        }
                        if (paragraph.startsWith('#### ')) {
                          return <h4 key={idx} className="text-base font-bold text-teal-400 mt-4 mb-2">{paragraph.replace('#### ', '')}</h4>;
                        }
                        if (paragraph.startsWith('* ')) {
                          return (
                            <ul key={idx} className="list-disc pl-5 mt-2 mb-4 space-y-1 text-gray-400">
                              {paragraph.split('\n').map((li, lidx) => (
                                <li key={lidx}>{li.replace('* ', '')}</li>
                              ))}
                            </ul>
                          );
                        }
                        if (paragraph.startsWith('```')) {
                          // Clean formatted code block render
                          const lines = paragraph.replace(/```[a-z]*/, '').replace(/```$/, '').trim();
                          return (
                            <div key={idx} className="relative rounded-xl overflow-hidden bg-black text-xs border border-white/10 my-4 text-left font-mono">
                              <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/10">
                                <span className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">CLIENT DEEPLAY CONTROLS</span>
                                <button
                                  onClick={() => copyCode(lines)}
                                  className="text-[10px] text-teal-400 hover:text-teal-300 flex items-center gap-1"
                                >
                                  <Copy className="w-3.5 h-3.5" />
                                  <span>{copiedCodeText ? (lang === 'en' ? 'Copied' : '已复制') : (lang === 'en' ? 'Copy Code' : '复制代码')}</span>
                                </button>
                              </div>
                              <pre className="p-4 overflow-x-auto text-gray-300 select-all font-mono leading-relaxed">{lines}</pre>
                            </div>
                          );
                        }
                        return <p key={idx} className="text-gray-300 leading-relaxed font-sans">{paragraph}</p>;
                      })}
                    </div>

                    {/* DYNAMIC SANDBOX REST PLAYGROUND */}
                    <div className="mt-12 pt-8 border-t border-white/10 space-y-6">
                      <div className="flex items-center gap-2">
                        <Terminal className="w-5 h-5 text-teal-400 animate-pulse" />
                        <h4 className="text-base font-bold font-sans">
                          {lang === 'en' ? 'Interactive Sandbox Checkout API Simulator' : '交互式 B2C 支付会话网关联调演示柜'}
                        </h4>
                      </div>

                      <p className="text-xs text-gray-400 leading-relaxed max-w-2xl">
                        {lang === 'en' 
                          ? 'Test out standard commerce billing requests. Tweak variables in the mock inputs and execute the API call to verify JSON schemas and checkout redirects!'
                          : '在这里您可以手动微调价格、结算币种，点击“运行调试”后中枢网链会立即回传标准的 Checkout Session 协议体，并生成部署在 deepay.srl 的模拟路径。'}
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-1">{lang === 'en' ? 'Amount (Price)' : '结算金额 (面值)'}</label>
                          <input 
                            type="number"
                            value={mockApiAmount}
                            onChange={(e) => setMockApiAmount(e.target.value)}
                            className="w-full px-3 py-2 rounded-xl border border-white/10 bg-black/60 font-mono text-xs text-teal-300 focus:outline-none focus:border-teal-400"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-1">{lang === 'en' ? 'Currency Node' : '签约收单币种'}</label>
                          <select 
                            value={mockApiCurrency}
                            onChange={(e) => setMockApiCurrency(e.target.value)}
                            className="w-full px-3 py-2 rounded-xl border border-white/10 bg-black/60 font-mono text-xs text-gray-300 focus:outline-none focus:border-teal-500"
                          >
                            <option value="EUR">EUR (€) - Euro Node</option>
                            <option value="USD">USD ($) - Americas Core</option>
                            <option value="GBP">GBP (£) - Sterling route</option>
                            <option value="JPY">JPY (¥) - Asia Pacific</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-1">{lang === 'en' ? 'Integration Client' : '应用客户端标识'}</label>
                          <input 
                            type="text"
                            disabled
                            value="ModaUI_CustomStore"
                            className="w-full px-3 py-2 rounded-xl border border-white/5 bg-gray-950/40 font-mono text-xs text-gray-500 italic cursor-not-allowed"
                          />
                        </div>

                        <div className="md:col-span-3">
                          <button
                            onClick={runMockApiCall}
                            disabled={mockApiLoading}
                            className="w-full py-3 bg-gradient-to-r from-teal-500 to-purple-600 text-black font-extrabold text-xs tracking-wider uppercase rounded-xl hover:shadow-[0_0_15px_rgba(13,148,136,0.3)] cursor-pointer transition-all flex items-center justify-center gap-1.5"
                          >
                            {mockApiLoading ? (
                              <>
                                <span className="w-3.5 h-3.5 rounded-full border-2 border-black border-t-transparent animate-spin" />
                                <span>{lang === 'en' ? 'Compiling gateway metadata protocol...' : '系统正通过智能清算网络进行验签...'}</span>
                              </>
                            ) : (
                              <>
                                <Play className="w-3.5 h-3.5 fill-current" />
                                <span>{lang === 'en' ? 'RUN SANDBOX API CALL' : '运行并测试付款 API 对接'}</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>

                      {mockApiResponse && (
                        <div className="rounded-xl border border-teal-500/20 bg-black/90 p-4 text-xs font-mono relative overflow-hidden animate-fade-in text-left">
                          <span className="absolute top-2 right-2 bg-teal-500/10 border border-teal-500/20 px-2 py-0.5 rounded text-[10px] text-teal-400 font-bold uppercase">
                            HTTP 201 Created
                          </span>
                          
                          <p className="text-teal-400 font-bold mb-2">// Response payload headers</p>
                          <pre className="text-gray-300 font-mono overflow-x-auto p-2 bg-black/40 rounded-lg select-all leading-relaxed">
                            {JSON.stringify(mockApiResponse, null, 2)}
                          </pre>
                          
                          <div className="mt-4 pt-4 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between text-xs gap-3">
                            <span className="text-gray-400">{lang === 'en' ? 'Direct checkout link point secure:' : '已在 deepay.srl 形成原生账单收银台会话安全：'}</span>
                            <a 
                              href={mockApiResponse.checkout_url} 
                              target="_blank" 
                              rel="noreferrer"
                              className="px-3 py-1.5 bg-teal-400 text-black font-bold uppercase rounded hover:bg-teal-300 transition-all flex items-center gap-1"
                            >
                              <span>{lang === 'en' ? 'Open pay frame' : '进入模拟付款页'}</span>
                            </a>
                          </div>
                        </div>
                      )}

                    </div>

                  </div>
                ) : (
                  <p className="text-gray-400 text-center py-12">{lang === 'en' ? 'Choose a tutorial path from the sidebar to begin.' : '请轻按左侧工具索引开启极智对接。'}</p>
                )}

              </main>

            </div>
          </section>
        )}

        {/* ==================== TAB 7: CONTACT & TEAM DIRECTORY ==================== */}
        {activeTab === 'contact' && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs uppercase tracking-[0.2em] font-bold text-teal-400 font-mono">{lang === 'en' ? 'Coordinate with Deepay' : '联系我们 (DEEPAY SRL)'}</span>
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mt-3">
                {lang === 'en' ? 'Talk to Human Experts, or ChatGPT Assistant' : '人机协同：联系专家，亦可在线聊天'}
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
              
              {/* CONTACT FORM AND OFFICE MATRIX */}
              <div className="space-y-6">
                
                {/* Visual office details */}
                <div className="p-6 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl space-y-4">
                  <h3 className="text-lg font-bold text-white">{lang === 'en' ? 'Deepay SRL Registered Hub' : 'DEEPAY SRL 全球控股总部'}</h3>
                  
                  <div className="space-y-2.5 text-xs text-gray-400">
                    <p className="flex items-center gap-2"><Globe className="w-4 h-4 text-teal-400" /> <span>Via Prato Verde 11, Firenze, Italy</span></p>
                    <p className="flex items-center gap-2"><Mail className="w-4 h-4 text-purple-400" /> <span className="underline select-all">aosta22prato@gmail.com</span></p>
                    <p className="flex items-center gap-2"><MessageSquare className="w-4 h-4 text-emerald-400" /> <span className="select-all">Telegram: @DeepayHQ • WhatsApp: +39 334 91283</span></p>
                  </div>

                  <div className="relative h-44 rounded-xl overflow-hidden border border-white/10">
                    <div className="absolute inset-0 bg-black/60 z-10 hidden" />
                    {/* Simulated elegant dark mode style coordinates map */}
                    <div className="absolute inset-0 bg-gray-950 flex flex-col items-center justify-center p-4 text-center font-mono">
                      <div className="w-2.5 h-2.5 bg-teal-400 rounded-full animate-ping mb-2" />
                      <p className="text-xs text-white font-bold">{lang === 'en' ? 'DEEPAY CENTRAL MEDITERRANEAN NODE' : 'DEEPAY 地中海中继节点'}</p>
                      <p className="text-[10px] text-gray-400 mt-1">Latitude: 43.7695° N, Longitude: 11.2558° E</p>
                      <p className="text-[9px] text-teal-400 mt-2 font-semibold select-all">HTTPS://DEEPAY.SRL [Official Domain Verified]</p>
                    </div>
                  </div>
                </div>

                {/* Form submits */}
                <div className="p-6 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl">
                  {contactSubmitted ? (
                    <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-300 text-xs text-center animate-pulse">
                      ✓ {lang === 'en' ? 'Thank you! Your system registration inquiry is filed securely.' : '✓ 信息登记成功！资深多渠道支付架构师将在 4 小时内和您发送邮件，请留意信箱。'}
                    </div>
                  ) : (
                    <form onSubmit={handleContactSubmit} className="space-y-4">
                      <h4 className="text-sm font-bold text-white uppercase tracking-wider">{lang === 'en' ? 'Send a message' : '在线呈递项目需求'}</h4>
                      <input 
                        type="email"
                        required
                        placeholder={lang === 'en' ? 'Enter your contact email' : '您的联系信箱 (必填)'}
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-white/10 bg-black/60 focus:outline-none focus:border-teal-400"
                      />
                      <textarea
                        rows={3}
                        placeholder={lang === 'en' ? 'Describe your system scaling goals...' : '例如：我们是一家 Shopify 出海服饰卖家，想了解 ModaUI 首屏开发与 Deepay 智能支付网关代收收单的集成...'}
                        value={contactForm.message}
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-white/10 bg-black/60 focus:outline-none focus:border-teal-400"
                      />
                      <button 
                        type="submit"
                        className="w-full py-2.5 bg-white text-black text-xs font-bold rounded-xl hover:bg-gray-200 transition-all cursor-pointer"
                      >
                        {lang === 'en' ? 'SEND INQUIRY TO SYSTEM' : '呈交数据'}
                      </button>
                    </form>
                  )}
                </div>

              </div>

              {/* LIVE CHAT TO SIDEKICK AI BACKED BY REAL GEMINI */}
              <div className="rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl flex flex-col justify-between h-[510px] relative overflow-hidden shadow-2xl">
                
                {/* Top header banner */}
                <div className="p-4 bg-white/5 border-b border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-teal-500 to-purple-600 flex items-center justify-center font-bold tracking-tight text-white font-mono text-sm">
                      S
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">Sidekick AI</h4>
                      <div className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                        <span className="text-[9px] text-gray-400 uppercase tracking-widest font-mono">
                          {lang === 'en' ? 'Autonomous AI Staff' : '官方智能协调代理'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded border border-teal-500/10">
                    Gemini Connected
                  </span>
                </div>

                {/* Messages scroller box */}
                <div className="flex-1 p-4 overflow-y-auto space-y-4 font-sans text-xs flex flex-col">
                  {chatMessages.map((msg, idx) => (
                    <div 
                      key={idx}
                      className={`max-w-[85%] p-3 rounded-2xl leading-relaxed ${
                        msg.sender === 'user' 
                          ? 'bg-gradient-to-tr from-teal-500 via-emerald-400 to-teal-600 text-black font-semibold self-end rounded-tr-none' 
                          : 'bg-white/5 border border-white/10 text-gray-200 self-start rounded-tl-none font-sans'
                      }`}
                    >
                      {/* Line wrapping markdown-ish text simply */}
                      {msg.text.split('\n').map((line, lidx) => (
                        <p key={lidx} className="mb-1 last:mb-0">{line}</p>
                      ))}
                    </div>
                  ))}

                  {aiChatLoading && (
                    <div className="bg-white/5 border border-white/10 p-3 rounded-2xl rounded-tl-none self-start flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-bounce" style={{ animationDelay: '200ms' }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-bounce" style={{ animationDelay: '400ms' }} />
                    </div>
                  )}

                  <div ref={chatBottomRef} />
                </div>

                {/* Bottom send controls */}
                <form onSubmit={handleSendMessage} className="p-4 bg-white/5 border-t border-white/10 flex gap-2">
                  <input 
                    type="text"
                    required
                    maxLength={140}
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder={lang === 'en' ? 'Type to chat with official Sidekick AI...' : '向 Sidekick AI 助手提问支付、ModaUI 或文档集成...'}
                    className="flex-1 px-3 py-2 text-xs rounded-xl border border-white/10 bg-black/60 focus:outline-none focus:border-teal-400 text-white"
                  />
                  <button 
                    type="submit"
                    disabled={aiChatLoading}
                    className="p-2.5 bg-teal-400 text-black hover:bg-teal-300 rounded-xl transition-all cursor-pointer flex items-center justify-center shrink-0"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>

              </div>

            </div>
          </section>
        )}

      </div>

      {/* COMPREHENSIVE MODAUI BRAND FOOTER */}
      <footer className="relative z-20 border-t border-white/5 bg-black/80 backdrop-blur-xl py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8 border-b border-white/5 pb-10 mb-8">
          
          {/* Logo Brand column */}
          <div className="col-span-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-teal-500 to-purple-600 flex items-center justify-center font-bold font-mono text-white text-base">D</div>
              <span className="text-lg font-bold tracking-tight text-white font-mono">Deepay Commerce</span>
            </div>
            <p className="text-xs text-gray-500 max-w-sm mt-3 leading-relaxed">
              {lang === 'en' 
                ? 'Deepay is the unified AI Operating System for Modern Commerce. Empowering automated store agents, smart dynamic payment routing, and exquisite glassmorphism UI templates.'
                : 'Deepay 意为未来智能。通过将高阶智能体计算融合于跨境清算付款，并遵守奢丽的 ModaUI 设计令牌规范，全面引爆商户数字资产连结。'}
            </p>
            <p className="text-xs text-teal-400 font-semibold font-mono mt-4">
              {lang === 'en' ? 'Central domain verified:' : '官方实名权威主页：'} <a href="https://deepay.srl" target="_blank" rel="noreferrer" className="underline font-bold">https://deepay.srl</a>
            </p>
          </div>

          {/* Products */}
          <div className="space-y-3 text-xs text-gray-400">
            <h5 className="font-mono text-white tracking-widest font-extrabold uppercase">{lang === 'en' ? 'PRODUCTS' : '产品主线'}</h5>
            <ul className="space-y-1.5">
              <li><button onClick={() => { navigateTo(''); setActiveTab('features'); }} className="hover:text-teal-400">Deepay Payment Hub</button></li>
              <li><button onClick={() => { navigateTo(''); setActiveTab('features'); }} className="hover:text-teal-300">Autonomous AI Agents</button></li>
              <li><button onClick={() => { navigateTo('app-market'); }} className="hover:text-teal-300">Deepay App Market ({lang === 'en' ? 'Beta' : '公测'})</button></li>
              <li><button onClick={() => { navigateTo('developer-center'); }} className="hover:text-teal-300">Agentico Purchasing API</button></li>
            </ul>
          </div>

          {/* Solutions */}
          <div className="space-y-3 text-xs text-gray-400">
            <h5 className="font-mono text-white tracking-widest font-extrabold uppercase">{lang === 'en' ? 'SOLUTIONS' : '行业纵深'}</h5>
            <ul className="space-y-1.5">
              <li><button onClick={() => { navigateTo('solutions/retail'); }} className="hover:text-teal-400">Retail & Shopify AI</button></li>
              <li><button onClick={() => { navigateTo('solutions/fashion'); }} className="hover:text-teal-400">Fashion & luxury Retail</button></li>
              <li><button onClick={() => { navigateTo('security'); }} className="hover:text-teal-400">GDPR Security Residency</button></li>
              <li><button onClick={() => { navigateTo('case-studies'); }} className="hover:text-teal-400">Verified ROI Case Studies</button></li>
            </ul>
          </div>

          {/* AI Directories (Growth V4) */}
          <div className="space-y-3 text-xs text-gray-400">
            <h5 className="font-mono text-white tracking-widest font-extrabold uppercase">{lang === 'en' ? 'AI KNOWLEDGE' : 'AI 认知集群'}</h5>
            <ul className="space-y-1.5">
              <li><button onClick={() => { navigateTo('wiki'); }} className="hover:text-teal-400 font-bold">📖 AI Business Wiki</button></li>
              <li><button onClick={() => { navigateTo('glossary'); }} className="hover:text-teal-400 font-bold">📚 AI Glossary Index</button></li>
              <li><button onClick={() => { navigateTo('prompts'); }} className="hover:text-teal-400 font-bold">⚡ AI Prompt Library</button></li>
              <li><button onClick={() => { navigateTo('resources'); }} className="hover:text-teal-400 font-bold">📂 Free Downloads</button></li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-3 text-xs text-gray-400">
            <h5 className="font-mono text-white tracking-widest font-extrabold uppercase">{lang === 'en' ? 'RESOURCES' : '关于本站'}</h5>
            <ul className="space-y-1.5">
              <li><button onClick={() => { navigateTo(''); setActiveTab('blog'); setSelectedPost(null); }} className="hover:text-teal-400">AIO Blog Channel</button></li>
              <li><button onClick={() => { navigateTo(''); setActiveTab('docs'); }} className="hover:text-teal-400">Documentation Hub</button></li>
              <li><button onClick={() => { navigateTo(''); setActiveTab('contact'); }} className="hover:text-teal-400">Contact Human Experts</button></li>
              <li><a href="https://deepay.srl" target="_blank" rel="noreferrer" className="hover:text-teal-400 flex items-center gap-1"><span>deepay.srl</span></a></li>
            </ul>
          </div>

        </div>

        {/* Legal brand signatures */}
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between text-[11px] text-gray-500 gap-4 font-mono">
          <div className="text-left">
            <p className="uppercase tracking-widest font-semibold">Deepay SRL © 2026 — All rights Reserved.</p>
            <p className="text-[10px] text-gray-600 mt-1">Via Prato Verde 11, Firenze, Italy. Registered VAT Number Verified.</p>
          </div>
          <div className="flex gap-4">
            <a href="https://deepay.srl" className="hover:text-gray-400 underline">Privacy Policy</a>
            <span>•</span>
            <a href="https://deepay.srl" className="hover:text-gray-400 underline">Terms of Platform Services</a>
            <span>•</span>
            <span className="text-teal-400 font-bold uppercase">Crafted by ModaUI AI</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
