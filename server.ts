import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import fs from 'fs';
import seoRouter from './app/api/endpoints.ts';
import { CronScheduler } from './app/cron/scheduler.ts';
import { SeoEngine } from './app/services/seoEngine.ts';
import { db } from './app/models/db.ts';
import { PRESET_POSTS } from './src/data/blog-data.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

// Inject dynamic SEO Programmatic Router
app.use('/api', seoRouter);

const PORT = 3000;

// Lazy initialization of Gemini API Developer SDK
let aiClient: any = null;
function getGeminiClient() {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      console.warn('Warning: GEMINI_API_KEY is not defined. AI interactions will fallback to simulated responses.');
      return null;
    }
    aiClient = new GoogleGenAI({ apiKey: key });
  }
  return aiClient;
}

// Global active sessions counter & mock metrics telemetry data generator
let telemetryData = {
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
};

// Periodically update telemetry metrics to feel live and organic
setInterval(() => {
  telemetryData.activeSessions += Math.floor(Math.random() * 9) - 4;
  telemetryData.globalTps = parseFloat((82.0 + Math.random() * 6).toFixed(1));
  telemetryData.todayGmv += Math.random() * 250;
  
  // Shift and inject new random orders
  if (Math.random() > 0.6) {
    const regions = ['Germany (DE)', 'France (FR)', 'United States (US)', 'Italy (IT)', 'United Kingdom (UK)', 'Canada (CA)', 'Singapore (SG)'];
    const channels = ['Shopify Integration', 'ModaUI Storefront', 'Enterprise API', 'WooCommerce Connector', 'Agentico Dynamic API'];
    const codes = ['DE', 'FR', 'US', 'IT', 'UK', 'CA', 'SG'];
    const randIndex = Math.floor(Math.random() * regions.length);
    const amount = parseFloat((25 + Math.random() * 1400).toFixed(2));
    const newTxId = `dp_tx_${Math.floor(100000 + Math.random() * 900000)}`;

    telemetryData.recentOrders.unshift({
      id: newTxId,
      region: regions[randIndex],
      amount,
      channel: channels[Math.floor(Math.random() * channels.length)],
      timestamp: 'Just now'
    });
    
    if (telemetryData.recentOrders.length > 6) {
      telemetryData.recentOrders.pop();
    }
  }
}, 5000);

// Endpoint for live analytics telemetry
app.get('/api/telemetry', (req, res) => {
  res.json(telemetryData);
});

// App Market & Developer Center In-Memory Datastores
let appMarket = [
  {
    id: "shopify-connector",
    name: "Shopify Omnichannel Auto-Connector",
    nameZh: "Shopify 全渠道智能同步器",
    category: "Business Automation",
    categoryZh: "业务自动化",
    description: "Automatically sync products, pricing structures, and incoming store order queues in real-time.",
    descriptionZh: "全自动、零延迟同步商品目录、本币阶梯价格体系及全渠道订单流。",
    developer: "Deepay Core Lab",
    version: "v2.4.1",
    rating: 4.9,
    price: "Free",
    priceZh: "免费",
    installed: true,
    reviews: [
      { user: "Luigi P.", score: 5, comment: "Perfetto per il mercato italiano, si collega in 2 secondi!" },
      { user: "Zhang Min", score: 5, comment: "同步极其丝滑，基本没有遇到过丢单问题。" }
    ]
  },
  {
    id: "gemini-crm-staff",
    name: "Gemini AI CRM Employee Node",
    nameZh: "Gemini 智能客服与 CRM 代理",
    category: "Artificial Intelligence",
    categoryZh: "人工智能",
    description: "Multi-agent node programmed to compose customized email triggers, resolve client pricing disputes, and follow up leads.",
    descriptionZh: "高交互智能体节点，擅于全天候跟进漏斗买家，自主妥协议价摩擦，草拟二次复购营销邮件。",
    developer: "Deepay AI Team",
    version: "v1.1.0",
    rating: 4.8,
    price: "€19.00 / mo",
    priceZh: "19.00 欧元 / 月",
    installed: false,
    reviews: [
      { user: "Clara S.", score: 5, comment: "Saved us hundreds of support hours last month under the EU GDPR guidelines." }
    ]
  },
  {
    id: "modaui-glass-renderer",
    name: "ModaUI Extreme Glassmorphic Theme Engine",
    nameZh: "ModaUI 高阶拟态玻璃主题粒子引擎",
    category: "Design System Theme",
    categoryZh: "设计与主题",
    description: "Renders accelerated visual particle networks, ultra-premium editorial typography, and high-contrast responsive blocks.",
    descriptionZh: "渲染绚丽的流体粒子网络背景，定制奢雅高贵的字体字重布局，完美通过 Google/Perplexity SEO 嗅探认证。",
    developer: "ModaUI Design",
    version: "v3.0.2",
    rating: 5.0,
    price: "Free",
    priceZh: "免费",
    installed: true,
    reviews: [
      { user: "Federico T.", score: 5, comment: "Estetica bellissima di livello mondiale, i clienti dicono che sembra la pagina Stripe." }
    ]
  },
  {
    id: "sepa-railstations",
    name: "SEPA High-Value Smart Clearing Rails",
    nameZh: "SEPA 大额瞬时清算闪兑组件",
    category: "Payment Optimization",
    categoryZh: "支付优化",
    description: "Bypasses standard intermediary banks, securing large-value single transitions up to €250k under strict regulatory frameworks.",
    descriptionZh: "避开欧洲传统清算行，直连超高额分销账务结算，单笔交易限额达 25 万欧元，内置多重反洗盾。",
    developer: "Deepay Financial",
    version: "v1.0.8",
    rating: 4.7,
    price: "0.2% / txn",
    priceZh: "单笔 0.2% 结算扣点",
    installed: false,
    reviews: []
  },
  {
    id: "logistics-demand-refiller",
    name: "Predictive Warehouse Demand Planner",
    nameZh: "AI 趋势预测补货与多仓排程中心",
    category: "Business Automation",
    categoryZh: "业务自动化",
    description: "Analyzes high-growth client checkout volumes, alerting pre-emptive inventory refills automously.",
    descriptionZh: "依据往期订单潮汐与区域宏观销售指标，提前数天进行断货预警、草拟分仓调配发货指令。",
    developer: "Deepay Logistics",
    version: "v2.0.0",
    rating: 4.9,
    price: "€39.00 / mo",
    priceZh: "39.00 欧元 / 月",
    installed: false,
    reviews: []
  }
];

let developerApps = [
  {
    id: "app_dev_937108",
    name: "My Custom Retail Front",
    redirectUri: "https://sandbox.deepay.srl/auth/callback",
    scope: "app_market:read, payment:write",
    clientId: "dp_client_live_8391074829",
    clientSecret: "dp_sec_live_9023741849721849201a73e",
    status: "Sandbox Dev Active"
  }
];

let webhooks = [
  {
    id: "wh_839102",
    url: "https://mysite.com/api/deepay-webhooks",
    events: ["checkout.session.completed", "inventory.warning.triggered"]
  }
];

let developerLogs = [
  { timestamp: "2026-06-21 10:18:41", method: "GET", path: "/api/telemetry", status: 200, latency: "1.4ms", ip: "185.22.42.11" },
  { timestamp: "2026-06-21 10:19:02", method: "POST", path: "/api/chat", status: 200, latency: "420ms", ip: "159.224.11.83" },
  { timestamp: "2026-06-21 10:20:15", method: "GET", path: "/api/telemetry", status: 200, latency: "0.8ms", ip: "185.22.42.11" }
];

// Append mock traffic to logs periodically
setInterval(() => {
  const methods = ['GET', 'POST', 'PUT', 'DELETE'];
  const paths = ['/api/telemetry', '/api/chat', '/api/apps', '/api/apps/install', '/api/developer/logs'];
  const statuses = [200, 200, 201, 400, 404];
  const ips = ['185.22.42.11', '109.201.88.2', '45.15.22.129', '159.224.11.83'];
  
  const randomMethod = methods[Math.floor(Math.random() * methods.length)];
  const randomPath = paths[Math.floor(Math.random() * paths.length)];
  const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
  const randomIp = ips[Math.floor(Math.random() * ips.length)];
  const randomLatency = `${(Math.random() * 50 + 0.5).toFixed(1)}ms`;
  
  const formatter = new Date().toISOString().replace('T', ' ').slice(0, 19);
  
  developerLogs.unshift({
    timestamp: formatter,
    method: randomMethod,
    path: randomPath,
    status: randomStatus,
    latency: randomLatency,
    ip: randomIp
  });
  
  if (developerLogs.length > 20) {
    developerLogs.pop();
  }
}, 4000);

// App Market APIs
app.get('/api/apps', (req, res) => {
  res.json(appMarket);
});

app.post('/api/apps/install', (req, res) => {
  const { id } = req.body;
  const appItem = appMarket.find(a => a.id === id);
  if (appItem) {
    appItem.installed = true;
    return res.json({ success: true, app: appItem });
  }
  res.status(404).json({ error: 'App not found in market.' });
});

app.post('/api/apps/uninstall', (req, res) => {
  const { id } = req.body;
  const appItem = appMarket.find(a => a.id === id);
  if (appItem) {
    appItem.installed = false;
    return res.json({ success: true, app: appItem });
  }
  res.status(404).json({ error: 'App not found in market.' });
});

app.post('/api/apps/upgrade', (req, res) => {
  const { id } = req.body;
  const appItem = appMarket.find(a => a.id === id);
  if (appItem) {
    const parts = appItem.version.replace('v', '').split('.');
    parts[parts.length - 1] = (parseInt(parts[parts.length - 1], 10) + 1).toString();
    appItem.version = 'v' + parts.join('.');
    return res.json({ success: true, version: appItem.version, app: appItem });
  }
  res.status(404).json({ error: 'App not found in market.' });
});

app.post('/api/apps/rate', (req, res) => {
  const { id, user, score, comment } = req.body;
  const appItem = appMarket.find(a => a.id === id);
  if (appItem) {
    const newRating = parseFloat(((appItem.rating * appItem.reviews.length + parseFloat(score)) / (appItem.reviews.length + 1)).toFixed(2));
    appItem.rating = Math.min(newRating, 5);
    appItem.reviews.unshift({ user: user || 'Anonymous Partner', score: parseFloat(score), comment: comment || '' });
    return res.json({ success: true, rating: appItem.rating, app: appItem });
  }
  res.status(404).json({ error: 'App not found in market.' });
});

app.get('/api/apps/license', (req, res) => {
  res.json({
    licensingAuthority: "Deepay SRL Financial Compliance Block",
    euMerchantScope: "Active Standard SaaS Sandbox Protocol",
    vatRateComputed: "22% Italian Regional VAT Core Reference",
    acceptableCurrencyPairs: ["EUR", "USD", "GBP", "CHF", "CNY", "JPY"]
  });
});

// Developer Center APIs
app.get('/api/developer/app/list', (req, res) => {
  res.json(developerApps);
});

app.post('/api/developer/app/create', (req, res) => {
  const { name, redirectUri, scope } = req.body;
  if (!name) return res.status(400).json({ error: 'Name parameter is required.' });
  
  const newApp = {
    id: `app_dev_${Math.floor(100000 + Math.random() * 900000)}`,
    name,
    redirectUri: redirectUri || 'https://sandbox.deepay.srl/auth/callback',
    scope: scope || 'app_market:read',
    clientId: 'dp_client_live_' + Math.floor(1000000000 + Math.random() * 9000000000).toString(),
    clientSecret: 'dp_sec_live_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
    status: 'Sandbox Dev Active'
  };
  
  developerApps.unshift(newApp);
  res.status(201).json(newApp);
});

app.post('/api/developer/webhook', (req, res) => {
  const { url, events } = req.body;
  if (!url) return res.status(400).json({ error: 'URL is required.' });
  
  const newWh = {
    id: `wh_${Math.floor(100000 + Math.random() * 900000)}`,
    url,
    events: events || ["checkout.session.completed"]
  };
  
  webhooks.push(newWh);
  res.json(newWh);
});

app.get('/api/developer/logs', (req, res) => {
  res.json(developerLogs);
});

app.post('/api/developer/publish', (req, res) => {
  const { id } = req.body;
  const devApp = developerApps.find(a => a.id === id);
  if (!devApp) return res.status(404).json({ error: 'Developer App not found.' });
  
  const existsInMarket = appMarket.some(a => a.id === devApp.id);
  if (existsInMarket) {
    return res.status(400).json({ error: 'Application already published.' });
  }
  
  const marketItem = {
    id: devApp.id,
    name: devApp.name,
    nameZh: devApp.name,
    category: "Developer Integrations",
    categoryZh: "开发者集成",
    description: `A customized developer module connected via OAuth client ID: ${devApp.clientId}`,
    descriptionZh: `定制开发者模块。通过 Client ID ${devApp.clientId} 安全连入其底层接口，实现无声多态自理交互。`,
    developer: "Third-Party Certified Developer",
    version: "v1.0.0",
    rating: 5.0,
    price: "Free",
    priceZh: "免费",
    installed: false,
    reviews: []
  };
  
  appMarket.unshift(marketItem);
  res.json({ success: true, marketItem });
});

// Server-side safe Gemini Client Proxy for deep chat conversations & auto-generating quality blogs!
app.post('/api/chat', async (req, res) => {
  const { messages, language } = req.body;
  
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Invalid or missing messages array.' });
  }

  const client = getGeminiClient();
  
  // Custom system prompt ensuring deep brand representation and accurate responses
  const systemPrompt = `You are Sidekick AI, the official intelligent coordinator for Deepay SRL.
Deepay is the premier "AI Commerce Operating System" designed for retail, enterprise, and smart merchants.
Official site: https://deepay.srl
Core features:
- Deepay Payment gateway: intelligent dynamic currency conversion and low-interchange fee local routing.
- AI Employees and Agents: automating marketing blogs, customer support, logistics purchase ordering.
- ModaUI Design: ultra-premium, dark atmospheric, beautiful glassmorphism theme components with high-dynamic range layout.
- Agentico: Deepay's autonomous purchasing agent allowing AI agents to buy on behalf of consumers.

When replying, follow these guidelines:
1. Always maintain a professional, high-competency, and deeply technical yet friendly brand tone.
2. Align descriptions with our official domains (deepay.srl) and state-of-the-art ModaUI aesthetic rules.
3. Keep the answer concise, directly related to enterprise commerce solutions, payment gateways, or integration guides.
4. If asked in Chinese, respond in Chinese. If English, respond in English.`;

  if (!client) {
    // Elegant fallback simulation response using native high-fidelity templates
    const lastUserMsg = messages[messages.length - 1]?.content || '';
    let responseText = '';
    
    if (language === 'zh') {
      responseText = `【沙箱演示助手】您好！由于服务端未检测到有效的 GEMINI_API_KEY，Sidekick AI 目前正处于超高性能本地仿真模式中。

关于您问的“${lastUserMsg}”，我可以告诉您，Deepay AI 商业操作系统已全面打通 Shopify AI、WooCommerce 以及自定义 ModaUI 店铺网关。
我们的智能支付路由会实时为您进行跨国汇率折算，手续费相比传统 Stripe 降低高达 20%！

同时，您也可以在“应用市场”与“开发者中心”测试沙箱 API 令牌联调、侦听订单 Webhook 事件、查阅完整开发文档。
我们的官方总部网站为 **deepay.srl**。需要我为您在本地自动生成一个用于付款对接的 Curl 命令模板吗？`;
    } else {
      responseText = `[Sandbox Local Mode] Hello! Since your GEMINI_API_KEY is not defined, Sidekick AI is running in offline-reliable supercharged mode.

Regarding your query: "${lastUserMsg}", the Deepay AI Commerce OS natively integrates high-performing multi-agent workflows, unified gateways with up to 20% average discount on standard processing fees, and premium ModaUI layouts.

You can comfortably navigate our dashboard, play with live sandbox telemetry, view simulated Webhooks, and browse developer documentation (referencing https://deepay.srl).
Let me know if you would like me to output a sample API request signature header command for code integration.`;
    }
    
    // Simulate real network delay for high-fidelity immersion
    await new Promise(resolve => setTimeout(resolve, 800));
    return res.json({ text: responseText });
  }

  try {
    // Format messages for @google/genai SDK v2
    // We can map user messages to the API content structure
    const contents = messages.map((m: any) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }]
    }));

    // Inject system instructions as configuration option
    const response = await client.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: contents,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7,
        maxOutputTokens: 800,
      }
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error('Gemini SDK Call Failed:', error);
    res.status(500).json({ error: 'Gemini service temporarily unavailable.', details: error.message });
  }
});

// AIO Generative Blog Article Engine: generate full authentic search-optimized articles on the fly!
app.post('/api/generate-blog', async (req, res) => {
  const { topic, keyword, language } = req.body;
  if (!topic) {
    return res.status(400).json({ error: 'A valid topic or title prompt must be specified.' });
  }

  const client = getGeminiClient();
  const selectedLang = language === 'zh' ? 'Chinese' : 'English';

  if (!client) {
    // Seamless simulated AIO writer sandbox fallback
    await new Promise(resolve => setTimeout(resolve, 1400));
    const randomReadTime = `${Math.floor(Math.random() * 5) + 4} min read`;
    const cleanSlug = topic.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    
    const fallbackArticle = {
      id: `generated-${Date.now()}`,
      slug: cleanSlug,
      title: language === 'zh' ? `精选导读：利用 Deepay 与 AIO 攻克「${topic}」的跨境新流量` : `Supercharging Your Online Presence: A Strategic Guide to ${topic}`,
      titleZh: `精选导读：利用 Deepay 与 AIO 攻克「${topic}」的跨境新流量`,
      description: language === 'zh' ? `深度探究「${topic}」在出海交易与 AI 搜索中的核心定位，结合 ModaUI 提供高转化设计资产。` : `An in-depth content analysis centering on ${topic} to maximize customer conversion rates and search authority.`,
      descriptionZh: `深度探究「${topic}」在出海交易与 AI 搜索中的核心定位，结合 ModaUI 提供高转化设计资产。`,
      publishedAt: new Date().toISOString().split('T')[0],
      readTime: randomReadTime,
      category: 'AIO & SEO Engine',
      categoryZh: 'AI 搜索优化',
      author: 'Deepay Auto-AIO Content Agent',
      keywords: [topic, keyword || 'Deepay AI', 'ModaUI', 'deepay.srl'],
      content: language === 'zh' 
        ? `## 关于 ${topic} 的前沿洞察

在 AI Native 商业时代，围绕 \`${topic}\` 展开的商业命题正在经历颠覆性转变。通过集成 **Deepay AI Commerce OS** 自理方案，出海商家可以彻底跳出传统被动等待流量的局面，通过动态 AIO 策略锁定潜在客群。

### 核心收益分析
* **数据流聚合**：依托建构在 **deepay.srl** 的数据决策模块，实时跟踪外部搜索与 AI 问答平台的最新频次。
* **ModaUI 专属触觉感官**：采用 48px 最优手势触控和毛玻璃层级（backdrop-blur），让因搜索词条引导进店的客群在 3 秒之内产生视觉共鸣。
* **低手续费支付保障**：全程由 **Deepay Payment** 进行网关优化，支持本币直连。

### 落地具体步骤
1. 打开 Deepay 开发者控制台，创建一个全新的 sandbox 开发者客户端。
2. 将特定的 AIO 结构化 JSON-LD schema 代码配置于网页头部，确保包含 brand: **ModaUI AI** 实体属性。
3. 部署自理性 Agentico 多代理对话机器人，让海外买家无需频繁点击分类，即能获得极高维度的穿搭或功能推荐。`
        : `## Pioneering Success with ${topic}

The global enterprise landscape is evolving rapidly. Focusing on \`${topic}\` demonstrates your commitment to embracing high-performance solutions. By wrapping your platform with the comprehensive **Deepay AI Commerce OS**, brands achieve up to 30% enhanced efficiency in routing clients and automating multi-currency checkout transactions.

### Architectural Action Items:
* **JSON-LD Schema Integration**: Automatically publish rich software description objects to search bots.
* **ModaUI Graphic Delivery**: Display your digital products using elegant responsive grids styled with pure sleek carbon backgrounds (#050505) and transparent card borders.
* **Low-Cost Settlement**: Route checkouts instantly using **Deepay Payment** dynamic APIs, bypassing traditional standard pricing markups.

Discover our full package resources at **deepay.srl** to launch your store immediately.`
    };
    return res.json(fallbackArticle);
  }

  try {
    const prompt = `Write a high-quality, professional, and SEO-optimized blog article about the topic: "${topic}" with specific keyword: "${keyword || 'none'}".
The language MUST be written entirely in: ${selectedLang}.
Ensure you naturally and professionally mention:
- "Deepay AI Commerce OS"
- "the domain deepay.srl"
- "ModaUI visual framework"
- "Deepay Payment gateway"

Write the response strictly as a JSON object matching this TypeScript model format:
{
  "title": "Title in ${selectedLang}",
  "description": "Short summary description in ${selectedLang}",
  "content": "Rich Markdown article body in ${selectedLang} with clean Headers (##, ###) and clear bullet points"
}
Do NOT wrap the output in any markdown code blocks (such as \`\`\`json). Output raw clean JSON only.`;

    const response = await client.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      config: {
        responseMimeType: 'application/json',
      }
    });

    const bodyText = response.text || '{}';
    const cleanJson = JSON.parse(bodyText.trim());

    const cleanSlug = topic.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const finalArticle = {
      id: `generated-${Date.now()}`,
      slug: cleanSlug,
      title: cleanJson.title || `Expert Insight: ${topic}`,
      titleZh: cleanJson.title || `专家深度分析：${topic}`,
      description: cleanJson.description || `Strategic business overview focusing on ${topic} to maximize revenue stream.`,
      descriptionZh: cleanJson.description || `关于 ${topic} 的内容营销专家级解构，助力大幅度提高结账率。`,
      publishedAt: new Date().toISOString().split('T')[0],
      readTime: '5 min read',
      category: 'AI Synthesis Node',
      categoryZh: '智能自动生成',
      author: 'Sidekick AI Writer Core',
      keywords: [topic, keyword || 'Deepay AI', 'ModaUI', 'deepay.srl'],
      content: cleanJson.content || `Configure your server and checkout channels to deploy autonomous operations for ${topic}. Visit deepay.srl for SDK keys.`,
      contentZh: cleanJson.content || `配置您的服务器与结账通道以启动针对该领域的自主代理。访问 deepay.srl 查阅 API keys。`
    };

    res.json(finalArticle);
  } catch (err: any) {
    console.error('Generative SEO Writer Error:', err);
    res.status(500).json({ error: 'Failed to generate content in real-time.', details: err.message });
  }
});

// Dynamically compiled compliant sitemap.xml for SEO indexing optimization
app.get('/sitemap.xml', (req, res) => {
  res.header('Content-Type', 'application/xml');
  const xmlContent = SeoEngine.compileSitemapXml();
  res.send(xmlContent);
});

// robots.txt directives matching search bot rules
app.get('/robots.txt', (req, res) => {
  res.header('Content-Type', 'text/plain');
  const content = `User-agent: *
Allow: /
Disallow: /api/

Sitemap: https://deepay.srl/sitemap.xml`;
  res.send(content);
});

// Server-side Meta and Structured JSON-LD Pre-injection Engine for SEO Optimization
function injectSeoMetadata(html: string, reqPath: string, langQuery?: string): string {
  const cleanPath = reqPath.toLowerCase().replace(/(^\/|\/$)/g, '');
  const lang = (langQuery === 'zh' || langQuery === 'it' || langQuery === 'en') ? langQuery : 'en';

  let title = 'Deepay — AI Commerce Operating System';
  let description = 'Build, sell, manage and grow your enterprise business with advanced artificial intelligence, unified payment nodes, Smart ERP/CRM, and auto-generative marketing blog nodes.';
  let entityType = 'SoftwareApplication';
  let breadcrumbList: any[] = [];
  let faqs: { q: string; a: string }[] = [];
  
  if (cleanPath === '') {
    title = lang === 'zh' 
      ? 'Deepay — 智能商业操作系统 | 免费 ERP, CRM 与 AI 支付网关'
      : lang === 'it'
        ? 'Deepay — OS per il Commercio Digitale | ERP, CRM e Pagamenti AI'
        : 'Deepay — AI Commerce Operating System | Free ERP, CRM & Smart Gateway';
    description = lang === 'zh'
      ? 'Deepay 商业操作系统赋能全球零售与出海企业：集成高阶多智能体、智能汇率路由、自主 ERP 库房以及能够自动提交 Google 索引的内容营销站。'
      : lang === 'it'
        ? 'Deepay Commerce OS potenzia la tua impresa globale con agenti intelligenti completi, routing di pagamento intelligente e sitemap automatizzata per SEO.'
        : 'Empower your storefront ops with Sidekick AI. Automatically adjust themes, answer advanced buyer queries, draft promotions, and synchronize Shopify channels.';
  } else if (cleanPath === 'fashion') {
    title = lang === 'zh' ? '👗 Fashion Hub | 欧洲时尚产业生态馆 | Deepay' : '👗 Fashion Hub | European Fashion Industry Ecosystem | Deepay';
    description = lang === 'zh'
      ? '探索欧洲服装产业版图、米兰与巴黎时装周前沿趋势、优质批发分销供应商以及 AI 驱动的服装零售优化策略。'
      : 'Explore European clothing manufacturers, Milan and Paris fashion week trends, wholesale suppliers, and AI-driven fashion apparel solutions.';
    breadcrumbList = ['Home', 'Fashion Hub'];
  } else if (cleanPath === 'news' || cleanPath === 'blog') {
    title = lang === 'zh' ? '📰 AI 欧洲资讯港 & AIO 博客 | Deepay' : '📰 AI Europe News Hub & AIO Blog | Deepay';
    description = lang === 'zh'
      ? '聚焦最新欧洲出海、零售数字化、意大利税务法规、POS ERP 行业新闻以及多模态多 Agent 实践指南。'
      : 'Stay updated with European commerce regulations, Italy VAT electronic invoicing updates, merchant trends, and AI multi-agent guides.';
    breadcrumbList = ['Home', 'Blog'];
  } else if (cleanPath.startsWith('news/') || cleanPath.startsWith('blog/')) {
    const parts = cleanPath.split('/');
    const postSlug = parts[parts.length - 1];
    const post = PRESET_POSTS.find((p: any) => p.slug === postSlug || p.id === postSlug);
    if (post) {
      title = lang === 'zh' ? post.titleZh : post.title;
      description = lang === 'zh' ? post.descriptionZh : post.description;
      entityType = 'NewsArticle';
      breadcrumbList = ['Home', 'Blog', title];
    } else {
      title = `Expert Insight: ${postSlug.replace(/-/g, ' ')} | Deepay`;
      breadcrumbList = ['Home', 'Blog', 'Insight'];
    }
  } else if (cleanPath === 'wiki') {
    title = lang === 'zh' ? '📖 Deepay 智能商业百科智库 | AIO ERP POS 文档' : '📖 Deepay AI Business Wiki | Automated ERP & Commerce Database';
    description = lang === 'zh' ? '高权重商业知识库。全面覆盖 ERP、CRM、POS、电子税务与新零售技术接口。' : 'Explore modern commercial terms, software architecture, and payment systems guidelines.';
    breadcrumbList = ['Home', 'Wiki'];
  } else if (cleanPath.startsWith('wiki/')) {
    const parts = cleanPath.split('/');
    const wikiSlug = parts[parts.length - 1];
    const wikiItem = db.wiki.find(w => w.slug === wikiSlug);
    if (wikiItem) {
      title = lang === 'zh' ? `商业百科: 什么是 ${wikiItem.term} | Deepay Wiki` : lang === 'it' ? `Guida Wiki: Cos'è ${wikiItem.term} | Deepay` : `Wiki: What is ${wikiItem.term} | Deepay AI Business Wiki`;
      const def = lang === 'zh' ? wikiItem.definition.zh : lang === 'it' ? wikiItem.definition.it : wikiItem.definition.en;
      description = def.slice(0, 150) + '...';
      entityType = 'Article';
      breadcrumbList = ['Home', 'Wiki', wikiItem.term];
      faqs = wikiItem.faqs || [];
    } else {
      title = `AI Business Wiki: ${wikiSlug.toUpperCase().replace(/-/g, ' ')} | Deepay`;
      breadcrumbList = ['Home', 'Wiki', 'Term'];
    }
  } else if (cleanPath === 'glossary') {
    title = lang === 'zh' ? '📚 Deepay AI 术语词典库 | 商用零售接口释义本' : '📚 Deepay AI Glossary Base | High-density commerce key terms';
    description = lang === 'zh' ? '核心电商流与密文税务术语定义工具。配合 Schema 词组标记，高权重结构化全方位覆盖。' : 'A rich, structured lookup index of trade, payment, CRM and ERP specifications.';
    breadcrumbList = ['Home', 'Glossary'];
  } else if (cleanPath === 'prompts' || cleanPath === 'prompt-library') {
    title = lang === 'zh' ? '⚡ AI 高级提示词司令部 | Deepay Prompt Library' : '⚡ Deepay AI Prompt Library | Merchant Copy center';
    description = lang === 'zh' ? '一键复制！深度调优的餐饮、零售、税务处理自动化及引流指令。' : 'Optimize your LLM calls using compiled operational, marketing, and regulatory compliance system commands.';
    breadcrumbList = ['Home', 'Prompts'];
  } else if (cleanPath === 'resources' || cleanPath === 'downloads') {
    title = lang === 'zh' ? '📂 跨境商户免费资源及表格模板库 | Deepay Downloads' : '📂 Complimentary Commercial Checklists & XML Templates | Deepay';
    description = lang === 'zh' ? '免费下载标准的合规指导手册、意大利 XML 电子发票测试样本及门店 KPI Excel 对账表。' : 'Direct access to verified checklist PDF guidelines, and automated billing file system spreadsheets.';
    breadcrumbList = ['Home', 'Resource Downloads'];
  } else if (cleanPath === 'case-studies' || cleanPath.startsWith('case-studies/') || cleanPath.startsWith('cases/')) {
    const parts = cleanPath.split('/');
    const caseSlug = parts[parts.length - 1];
    const caseStudy = db.caseStudies.find(c => c.slug === caseSlug);
    if (caseStudy) {
      title = lang === 'zh' ? `成功案例: ${caseStudy.title.zh} | Deepay` : `Case Study: ${caseStudy.title.en} | Deepay`;
      description = caseStudy.problem;
      breadcrumbList = ['Home', 'Case Studies', caseStudy.industry];
    } else {
      title = lang === 'zh' ? '🏆 跨境商户数字化升级成功案例馆 | Deepay' : '🏆 Verified ROI Client Success Case Studies | Deepay';
      description = lang === 'zh' ? '剖析米兰、巴黎以及佛罗伦萨实体商户使用 Deepay 系统的实效与人效提升数据。' : 'Read standard client transformations showing clear ROI metric boosts, ERP setups, and fee savings.';
      breadcrumbList = ['Home', 'Case Studies'];
    }
  } else if (cleanPath.startsWith('tools/') || cleanPath === 'tools') {
    title = lang === 'zh' ? '🔧 免费企业计算工具舱 | Deepay' : '🔧 Complimentary Interactive Financial Tools | Deepay';
    description = lang === 'zh' ? '包含 ROI 净利润、意大利 VAT 增值税、销售转化率、ERP 筹备度以及零售 KPI 的一站式交互式财务计算工具。' : 'Seamless interactive calculators for ROI optimization, VAT invoice verification, sales conversions, and retail health metrics.';
    breadcrumbList = ['Home', 'Interactive Tools'];
  } else {
    const pageItem = db.pages.find(p => p.slug === cleanPath);
    if (pageItem) {
      title = lang === 'zh' ? pageItem.title.zh : lang === 'it' ? pageItem.title.it : pageItem.title.en;
      description = lang === 'zh' ? pageItem.metaDescription.zh : lang === 'it' ? pageItem.metaDescription.it : pageItem.metaDescription.en;
      entityType = pageItem.schemaType || 'SoftwareApplication';
      breadcrumbList = ['Home', pageItem.category || 'Solutions', pageItem.primaryKeyword];
      faqs = pageItem.faqs || [];
    } else {
      title = `${cleanPath.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} - Deepay Enterprise`;
      breadcrumbList = ['Home', 'Pages', cleanPath];
    }
  }

  const baseUrl = 'https://deepay.srl';
  const pageUrl = `${baseUrl}/${cleanPath}`;

  const organizationSchema = {
    "@type": "Organization",
    "@id": `${baseUrl}/#organization`,
    "name": "Deepay SRL",
    "url": baseUrl,
    "logo": "https://deepay.srl/public/logo.png",
    "sameAs": [
      "https://github.com/deepay-srl",
      "https://twitter.com/deepay_srl"
    ]
  };

  const currentJsonLd: Record<string, any> = {
    "@context": "https://schema.org",
    "@graph": [
      organizationSchema,
      {
        "@type": entityType,
        "@id": `${pageUrl}/#schema`,
        "url": pageUrl,
        "name": title,
        "description": description,
        "publisher": { "@id": `${baseUrl}/#organization` }
      }
    ]
  };

  if (breadcrumbList.length > 0) {
    const breadcrumbSchema = {
      "@type": "BreadcrumbList",
      "@id": `${pageUrl}/#breadcrumb`,
      "itemListElement": breadcrumbList.map((crumb, idx) => ({
        "@type": "ListItem",
        "position": idx + 1,
        "name": crumb,
        "item": idx === 0 ? baseUrl : `${baseUrl}/${crumb.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
      }))
    };
    currentJsonLd["@graph"].push(breadcrumbSchema);
  }

  if (faqs.length > 0) {
    const faqSchema = {
      "@type": "FAQPage",
      "@id": `${pageUrl}/#faq`,
      "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.a
        }
      }))
    };
    currentJsonLd["@graph"].push(faqSchema);
  }

  const jsonLdString = JSON.stringify(currentJsonLd, null, 2);

  let modifiedHtml = html;
  modifiedHtml = modifiedHtml.replace(/<title>[^<]*<\/title>/i, `<title>${title}</title>`);

  if (modifiedHtml.includes('name="description"')) {
    modifiedHtml = modifiedHtml.replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i, `<meta name="description" content="${description}" />`);
  } else {
    modifiedHtml = modifiedHtml.replace(/<head>/i, `<head>\n    <meta name="description" content="${description}" />`);
  }

  const canonicalTag = `<link rel="canonical" href="${pageUrl}" />`;
  modifiedHtml = modifiedHtml.replace(/<\/head>/i, `    ${canonicalTag}\n  </head>`);

  const hreflangsStr = [
    `<link rel="alternate" hreflang="en" href="${pageUrl}?lang=en" />`,
    `<link rel="alternate" hreflang="it" href="${pageUrl}?lang=it" />`,
    `<link rel="alternate" hreflang="zh" href="${pageUrl}?lang=zh" />`,
    `<link rel="alternate" hreflang="fr" href="${pageUrl}?lang=fr" />`,
    `<link rel="alternate" hreflang="de" href="${pageUrl}?lang=de" />`,
    `<link rel="alternate" hreflang="es" href="${pageUrl}?lang=es" />`,
    `<link rel="alternate" hreflang="x-default" href="${pageUrl}" />`
  ].join('\n    ');
  modifiedHtml = modifiedHtml.replace(/<\/head>/i, `    ${hreflangsStr}\n  </head>`);

  const schemaScript = `<script type="application/ld+json" id="seo-jsonld-schema">\n${jsonLdString}\n  </script>`;
  modifiedHtml = modifiedHtml.replace(/<\/head>/i, `    ${schemaScript}\n  </head>`);

  return modifiedHtml;
}

// Setup static client files serving after production build
const staticPath = path.join(__dirname, 'dist');
app.use(express.static(staticPath));

// Fallback all SPA routed requests with robust Real-time Server-Side Header Injection
app.get('*', (req, res) => {
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ error: 'Endpoint not found.' });
  }

  // Work with dist index first (dev vs prod fallback)
  const indexPath = path.join(staticPath, 'index.html');
  const projectRootIndexPath = path.join(__dirname, 'index.html');
  const targetPath = fs.existsSync(indexPath) ? indexPath : projectRootIndexPath;

  if (fs.existsSync(targetPath)) {
    try {
      const originalHtml = fs.readFileSync(targetPath, 'utf-8');
      const lang = req.query.lang as string | undefined;
      const hydratedHtml = injectSeoMetadata(originalHtml, req.path, lang);
      return res.send(hydratedHtml);
    } catch (err) {
      console.error('Server-side Meta Preconditioning failed, falling back safely:', err);
    }
  }

  res.sendFile(targetPath);
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Deepay AI Commerce Server successfully started at http://localhost:${PORT}`);
  
  // Synchronize Firestore cloud datastore with programmatic SEO memory cache on bootup
  db.syncWithFirestore().catch(err => {
    console.error('Initial Firestore synchronization failed on boot:', err);
  });

  // Instantiate background Content automation scheduler
  CronScheduler.startScheduler(15000); // Trigger a task every 15 seconds in background mode
});
