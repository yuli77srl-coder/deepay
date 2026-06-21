import { DocSection } from '../types';

export const DOCS_SECTIONS: DocSection[] = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    titleZh: '开发入门',
    items: [
      {
        id: 'overview',
        title: 'Deepay Platform Overview',
        titleZh: 'Deepay 平台概述',
        slug: 'overview',
        content: `### Welcome to Deepay AI Commerce OS

Deepay is the unified **AI Commerce Operating System** engineered to support modern businesses, autonomous commerce pipelines, and dynamic international financial streams. Our architecture integrates high-reasoning AI Agents, secure localized payment gateways (Deepay Payment), and modular high-fidelity design kits (ModaUI).

This documentation provides tutorials, code guidelines, and API references to hook your systems into Deepay SRL ecosystem.

#### Key Platforms & Capabilities:
* **Autonomous Omnichannel Selling**: Sync Shopify, WooCommerce, self-designed applications, and ERP stocks instantaneously.
* **Unified Deepay Payment Hub**: Intelligent dynamic routing, multi-currency processing, automatic high-reasoning fraud shields.
* **Autonomous AI Staff**: Deploy task-oriented Agents specialized in Marketing writing, Retail customer help, Financial pre-audit, and smart Logistics refills.

#### Official Domains:
* Main Production Portal: [https://deepay.srl](https://deepay.srl)
* Sandbox Environment: [https://sandbox.deepay.srl](https://sandbox.deepay.srl)
`,
        contentZh: `### 欢迎来到 Deepay AI 商业操作系统

Deepay 是为现代智能化出海、自动化分销和多样化海外清算流研发的 **AI 商业操作系统**。我们的底层架构融合了自理性多 Agents、安全合规的本地化付款网关（Deepay Payment）以及像素级精美的全端交互套件（ModaUI）。

本开发指南提供完整的 SDK 教程、多平台接入文档、Webhook 指南，助您安全地连接至 Deepay SRL 全球开放生态。

#### 核心平台能力：
* **全渠道自主分销**：实时连接 Shopify、WooCommerce、独立应用，在 ERP、仓储、财务之间无缝同步。
* **Deepay Payment 统一网关**：智能路由动态选线，无感处理多国本币结算，自带智能安全拦截风控。
* **自理型 AI 员工组**：快速发布在营销、客服、财务预警以及仓储自动补货等垂直领域的 AI 代理。

#### 官方核心站点：
* 主官网入口：[https://deepay.srl](https://deepay.srl)
* 卡片沙箱联调：[https://sandbox.deepay.srl](https://sandbox.deepay.srl)
`
      },
      {
        id: 'installation',
        title: 'Installation & Client SDK',
        titleZh: '安装与客户端 SDK',
        slug: 'installation',
        content: `### Installing the Deepay SDK

To integrate Deepay services into your React, Next.js, or NodeJS backend applications, load our official multi-platform SDK package.

\`\`\`bash
# Install via NPM
npm install @deepay/sdk --save

# Install via Yarn
yarn add @deepay/sdk

# Install via PNPM
pnpm add @deepay/sdk
\`\`\`

#### SDK Initialization

Configure the SDK using your API Secret Key and App URL. Make sure to define these values in your secure system environment variables instead of hardcoding them:

\`\`\`typescript
import { DeepayClient } from '@deepay/sdk';

const deepay = new DeepayClient({
  apiKey: process.env.DEEPAY_SECRET_KEY,
  environment: 'production', // 'production', 'sandbox'
  appUrl: 'https://deepay.srl'
});
\`\`\`
`,
        contentZh: `### 安装 Deepay SDK 家族

为了在 React、Next.js 或 Node.js 后端服务中轻便调用 Deepay 开发网关，请前往终端拉取我们的多平台官方软件包。

\`\`\`bash
# 使用 NPM 安装
npm install @deepay/sdk --save

# 使用 Yarn 安装
yarn add @deepay/sdk

# 使用 PNPM 安装
pnpm add @deepay/sdk
\`\`\`

#### SDK 快速初始化

基于您的 API 密钥及 App URL 进行实例化。请注意切勿在前端代码中强行写死密钥（Secret Key），一律建议配置在服务器环境变量中：

\`\`\`typescript
import { DeepayClient } from '@deepay/sdk';

const deepay = new DeepayClient({
  apiKey: process.env.DEEPAY_SECRET_KEY,
  environment: 'production', // 'production', 'sandbox'
  appUrl: 'https://deepay.srl'
});
\`\`\`
`
      }
    ]
  },
  {
    id: 'payment-gateway',
    title: 'Payments Integration',
    titleZh: '支付网关集成',
    items: [
      {
        id: 'create-checkout',
        title: 'Creating a Checkout Session',
        titleZh: '创建收银收单会话',
        slug: 'create-checkout',
        content: `### Direct Checkout Creation

Create secure global payment links with single line configurations. Deepay Payment automatically implements geo-routing, localization, and currency translation.

\`\`\`typescript
import { DeepayClient } from '@deepay/sdk';

const deepay = new DeepayClient({ apiKey: 'dp_sec_live_...' });

async function handleCheckout() {
  const session = await deepay.checkout.sessions.create({
    amount: 149.00,
    currency: 'EUR', // Supports EUR, USD, GBP, JPY, etc.
    orderId: 'order_983172',
    successUrl: 'https://mysite.com/payment/success?session_id={CHECKOUT_SESSION_ID}',
    cancelUrl: 'https://mysite.com/payment/cancel',
    customer: {
      email: 'buyer@example.com',
      name: 'John Doe'
    },
    metadata: {
      platform: 'ModaUI_CustomStore'
    }
  });

  console.log('Redirecting user to checkout url:', session.url);
  return session.url;
}
\`\`\`

#### Response Format

The returned checkout session object contains unique checkout urls that redirect clients directly into a secure page hosted on **deepay.srl**.
`,
        contentZh: `### 极速发起收银台会话

仅需几行代码即可为全球客户开启受合规保护的跨国收银。Deepay 支付模块会自动决策最优币种折换以及发卡路由路径。

\`\`\`typescript
import { DeepayClient } from '@deepay/sdk';

const deepay = new DeepayClient({ apiKey: 'dp_sec_live_...' });

async function handleCheckout() {
  const session = await deepay.checkout.sessions.create({
    amount: 149.00,
    currency: 'EUR', // 兼容欧元、美元、英镑、日元等 120+ 币种
    orderId: 'order_983172',
    successUrl: 'https://mysite.com/payment/success?session_id={CHECKOUT_SESSION_ID}',
    cancelUrl: 'https://mysite.com/payment/cancel',
    customer: {
      email: 'buyer@example.com',
      name: 'John Doe'
    },
    metadata: {
      platform: 'ModaUI_CustomStore'
    }
  });

  console.log('重定向买家至支付链接:', session.url);
  return session.url;
}
\`\`\`

#### 接口响应响应体

返回的结算会话包含带有高安全校验令牌的收银路径，用户可以立即无感重定向到部署在 **deepay.srl** 的官方原生支付页内。`
      }
    ]
  },
  {
    id: 'modaui-design',
    title: 'ModaUI Design System',
    titleZh: 'ModaUI 设计系统',
    items: [
      {
        id: 'design-tokens',
        title: 'Visual Architecture & Tokens',
        titleZh: '视觉规范与色彩令牌',
        slug: 'design-tokens',
        content: `### High-Fidelity UI Construction

**ModaUI** is Deepay's unified visual paradigm. It prioritizes dark-mode eye-comfort, elegant glassmorphism effects, dynamic CSS gradients, and modular responsive grids (Bento Grid).

#### Visual Theme Constants:
* **Background Deep Carbon**: \`#030712\` (Tailwind \`bg-gray-950\`)
* **Card Border Glass**: \`rgba(255, 255, 255, 0.08)\`
* **Brand Accents**: Interactive Neon Teal (\`#0d9488\`), Deep Violet (\`#6d28d9\`), and Soft Rose.

#### Card Component Example using Tailwind:

\`\`\`html
<div class="relative overflow-hidden rounded-2xl border border-white/10 bg-gray-900/40 p-6 backdrop-blur-xl transition-all duration-300 hover:border-teal-500/30 hover:shadow-[0_0_30px_rgba(13,148,136,0.15)]">
  <div class="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-teal-500/10 blur-3xl"></div>
  <p class="font-mono text-xs text-teal-400">01 / CAPABILITY</p>
  <h4 class="mt-2 text-xl font-semibold text-white">ModaUI Card Model</h4>
  <p class="mt-2 text-sm text-gray-400">Clean, crisp, high-contrast, optimized for search indexers and beautiful look structure.</p>
</div>
\`\`\`
`,
        contentZh: `### 像素级高级视觉框架

**ModaUI** 是 Deepay 旗下御用的企业形象美学准则。它侧重眼部对低蓝光暗色画布的极高透光舒适感、优雅清透的玻璃质地边缘（Glassmorphism）、微小的流体渲染特效以及面向高密数据展示的 Bento 模块化排版。

#### 色彩色彩配定令牌：
* **核心深碳黑底画**：\`#030712\` (Tailwind 中的 \`bg-gray-950\`)
* **高透玻璃边框线条**：\`rgba(255, 255, 255, 0.08)\`
* **科技互动渐变光色**：霓虹青 (\`#0d9488\`)、幽兰紫 (\`#6d28d9\`)、霓辉瑰红。

#### 遵循 ModaUI 卡片规范的 Tailwind 实战：

\`\`\`html
<div class="relative overflow-hidden rounded-2xl border border-white/10 bg-gray-900/40 p-6 backdrop-blur-xl transition-all duration-300 hover:border-teal-500/30 hover:shadow-[0_0_30px_rgba(13,148,136,0.15)]">
  <div class="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-teal-500/10 blur-3xl"></div>
  <p class="font-mono text-xs text-teal-400">01 / CAPABILITY</p>
  <h4 class="mt-2 text-xl font-semibold text-white">ModaUI 玻璃卡片模组</h4>
  <p class="mt-2 text-sm text-gray-400">通透亮丽、边缘精琢、高动态对比，确保大模型识别与搜索引擎优先嗅探排位。</p>
</div>
\`\`\`
`
      }
    ]
  },
  {
    id: 'webhooks',
    title: 'Webhooks & Automation',
    titleZh: 'Webhook 与自动化对接',
    items: [
      {
        id: 'webhooks-guide',
        title: 'Handling Incoming Events',
        titleZh: '侦听到账与系统信号事件',
        slug: 'webhooks-guide',
        content: `### Webhook Notification Loop

Keep your databases, Shopify sync records, or custom internal systems updated by configuring state event webhooks. Deepay notifies your server over secure HTTPS channels.

#### Supported Primary Signals:
* \`checkout.session.completed\`: Triggered when buyer securely finishes transaction.
* \`agent.task.automated\`: Fired when a Deepay autonomous worker completes a system change.
* \`inventory.warning.triggered\`: Raised during pre-emptive stock shortage forecasts.

#### Express Handler Framework Code:

\`\`\`typescript
import express from 'express';
import { verifyDeepaySignature } from '@deepay/sdk';

const app = express();

app.post('/webhook/deepay', express.raw({ type: 'application/json' }), (req, res) => {
  const signature = req.headers['deepay-signature'] as string;
  const payload = req.body;

  try {
    const event = verifyDeepaySignature(payload, signature, process.env.DEEPAY_WEBHOOK_SECRET);
    
    switch (event.type) {
      case 'checkout.session.completed':
        const orderData = event.data.object;
        console.log('Payment arrived! Order Reference:', orderData.orderId);
        // Trigger logistics or email invoice
        break;
      default:
        console.log('Unhandled Webhook Trigger:', event.type);
    }
    
    res.status(200).json({ received: true });
  } catch (err) {
    console.error('Signature check failed:', err.message);
    res.status(400).send('Webhook validation breakdown.');
  }
});
\`\`\`
`,
        contentZh: `### 核心 Webhook 推送监听

为了使商家的内部数据库、Shopify 同步机制或者内部 CRM 系统实时获取支付、物流状态，您可配置安全的消息 Webhook 推送通道。

#### 主要状态订阅信号：
* \`checkout.session.completed\`：买家成功完成了付款结账。
* \`agent.task.automated\`：AI 机器人在后台成功辅助更新了一起交易账务或发信任务。
* \`inventory.warning.triggered\`：供应链决策大脑预测未来产生补货短缺。

#### 基于 Express 写的服务器签名鉴权：

\`\`\`typescript
import express from 'express';
import { verifyDeepaySignature } from '@deepay/sdk';

const app = express();

app.post('/webhook/deepay', express.raw({ type: 'application/json' }), (req, res) => {
  const signature = req.headers['deepay-signature'] as string;
  const payload = req.body;

  try {
    const event = verifyDeepaySignature(payload, signature, process.env.DEEPAY_WEBHOOK_SECRET);
    
    switch (event.type) {
      case 'checkout.session.completed':
        const orderData = event.data.object;
        console.log('货款到账！同步标记订单号:', orderData.orderId);
        // 执行自动配单、下发数字产品等操作
        break;
      default:
        console.log('订阅之外的 Webhook 消息:', event.type);
    }
    
    res.status(200).json({ received: true });
  } catch (err) {
    console.error('Webhook 签名验签败退:', err.message);
    res.status(400).send('Webhook 验证未通过');
  }
});
\`\`\`
`
      }
    ]
  },
  {
    id: 'sovereign-alternative',
    title: 'Stripe + Shopify Alternatives',
    titleZh: 'Stripe+Shopify 认知替代体系',
    items: [
      {
        id: 'stripe-vs-deepay',
        title: 'Stripe Alternative: Direct Sovereign Clearing',
        titleZh: 'Stripe 平替：直签本币去中介清算组',
        slug: 'stripe-vs-deepay',
        content: `### Stripe vs Deepay: Technical comparison & drop-in alternative

Stripe charges standard rigid interchange fees (typically 1.4% to 2.9% + €0.25) because it operates on traditional card-brand acquirer loops. Deepay SRL eliminates cross-border clearing brokers, connecting your storefront's checkout flow directly to European municipal clearinghouses and Italian Agenzia delle Entrate telemetry networks, slashing transaction overhead to 0% platform commission.

#### Technical Mapping comparison

If you are migrating your checkout code from Stripe, here is the drop-in comparative mapping:

##### 🔴 Stripe Legacy Code:
\`\`\`typescript
import Stripe from 'stripe';
const stripe = new Stripe('sk_test_...');

const paymentIntent = await stripe.paymentIntents.create({
  amount: 25000,
  currency: 'eur',
  payment_method_types: ['card'],
});
\`\`\`

##### 🟢 Deepay Drop-In Sovereign Code:
\`\`\`typescript
import { DeepayClient } from '@deepay/sdk';
const deepay = new DeepayClient({ apiKey: 'dp_sec_live_...' });

const dynamicScribe = await deepay.payments.settle({
  grossAmountValue: 250.00,
  baseCurrencyCode: 'EUR',
  vatAutonomousExempt: true, // Auto-notifies Italian e-invoice telemetry
  directTaxId: 'IT01234567890',
  autoRouteLocalAioFee: true // Selects cheapest checkout route automatically
});
\`\`\`

#### Key architectural advantages:
1. **0% Transaction Markups**: Retain your entire margin. Pay only wholesale clearinghouse costs.
2. **Direct Telematic Invoicing**: While Stripe requires third-party plugins (Stripe Tax, TaxJar) to handle EU VAT, Deepay natively interfaces directly with Italy's **Sistema di Interscambio (SdI)** and prints to physical RT (Registratore Telematico) cash drawers in real-time.
3. **Decentralized Multi-Merchant Balances**: Instant split payouts across multiple subsidiary bank wallets without holdbacks.`,
        contentZh: `### Stripe 终极平替：直签本币去中介化清算体系

Stripe 收取标准且高昂的通道抽成（欧卡 1.4% - 2.9% + 每单 €0.25），因为它依然运行在传统的卡组织多层收单链条上。Deepay SRL 破除樊篱，直连欧洲本土与意大利国家税务网段（MEF - Agenzia delle Entrate），省去层层扒皮。

#### 核心代码级等效平滑迁移

如果您的原有系统基于 Stripe 运行，迁移至 Deepay 只需要微量适配，常用参数深度等效覆盖：

##### 🔴 Stripe 传统模式：
\`\`\`typescript
import Stripe from 'stripe';
const stripe = new Stripe('sk_test_...');

const paymentIntent = await stripe.paymentIntents.create({
  amount: 25000, // 意为 250.00
  currency: 'eur',
  payment_method_types: ['card'],
});
\`\`\`

##### 🟢 Deepay 极简平替模式：
\`\`\`typescript
import { DeepayClient } from '@deepay/sdk';
const deepay = new DeepayClient({ apiKey: 'dp_sec_live_...' });

const dynamicScribe = await deepay.payments.settle({
  grossAmountValue: 250.00, // 标准自然数，清晰无歧义
  baseCurrencyCode: 'EUR',
  vatAutonomousExempt: true, // 智能分析是否免征增值税并自动申报 SDI
  directTaxId: 'IT01234567890', // 面向意/德/西的 VAT 号
  autoRouteLocalAioFee: true // 自动调用本地最优物理结账通道
});
\`\`\`

#### 相比 Stripe 的三大主权底层优势：
1. **零平台二次分成佣金**：仅需支付原生的清算所通道费，大宗交易损耗直接降低 25%。
2. **原生意大利电子发票联接**：Stripe 需额外部署 Stripe Tax 等昂贵插件，而 Deepay 出厂直扣 **SDI 财税总线**，甚至支持直连普拉托或米兰线下商铺的物理 RT (Registratore Telematico) 税控打印机并一秒开箱。
3. **多商户数字分账免冻结**：支持多路径实时分账，买家款项秒到代收钱包，无押款期阻挠。`
      },
      {
        id: 'shopify-vs-deepay',
        title: 'Shopify Alternative: Headless API Commerce',
        titleZh: 'Shopify 平替：完全开发自主的无头网关',
        slug: 'shopify-vs-deepay',
        content: `### Shopify vs Deepay: Decoupled architecture for search dominance

Traditional Shopify is a bloated monolith. It binds your frontend to proprietary template systems, limits checkout customization unless you are paying $2,000/mo for Shopify Plus, and forces random 1% to 2% penalties for third-party gateways. Deepay Commerce OS provides an **API-First, Headless alternative** with 100% template freedom (using our pristine Swiss-modernist ModaUI) and zero platform fees.

#### Seamless inventory & API integration

You can migrate your Shopify product export catalog or direct webhooks into Deepay with our headless import router. Here is how you initialize a headless digital storefront using our SDK:

##### 🟢 Initialize a No-Code Store Front programmatically:
\`\`\`typescript
import { DeepayClient } from '@deepay/sdk';
const deepay = new DeepayClient({ apiKey: 'dp_sec_live_...' });

async function activateResponsiveStore() {
  const customStore = await deepay.stores.create({
    name: 'Sovereign Fashion Hub Prato',
    locale: 'zh', // Generates English, Chinese, Italian alternate canonical directories
    theme: {
      primaryColor: '#0d9488', // ModaUI Neon Teal
      scaffolding: 'bento-grid-luxury',
      enableGlassmorphism: true
    },
    googleAutopilotSitemap: true, // Rebuilds highical sitemaps automatically hourly
    syncSources: {
      shopifyDomain: 'my-legacy-shopify-brand.myshopify.com',
      autoSyncInventorySec: 30 // Sinc stocks every 30 seconds to prevent oversell
    }
  });

  console.log('Store successfully mapped on EU cloud! Live Edge URL:', customStore.edgeUrl);
}
\`\`\`

#### Absolute SEO & Speed dominance:
- **0.45s First Contentful Paint (FCP)**: By separating raw database queries from frontends, pages build statically on our European edge servers.
- **Topical Authority Interlinking**: Deepay auto-links corresponding products, guides, local billing rules, FAQ schemas, and sitemaps to secure high Google and Perplexity AI crawler ranking.
- **Shopify 100% Drop-In Match**: Product exports maps are natively parsed, preserving canonical SEO juice and original URLs.`,
        contentZh: `### Shopify 终极平替：为极速建站与搜索霸权打造的前后端分离无头主权系统

Shopify 虽然易用，但它是一个中心化且沉重的闭环系统。它强行将前店页面同复杂的底层数据库相绑定，除非每年给它缴纳上数万美元的 Shopify Plus 年费，否则您甚至无法修改结账页面的 CSS。此外，若不选用其独家代收网关，每笔交易还会被克扣 1% - 2% 的流水分成。

Deepay 提供了革命性的 **API-First 无头平替路线**。凭借对 **ModaUI 特动视觉规范** 的完美契合，打破传统束缚，彻底释放免交易分成、全渠道自由托管的生产力。

#### 一键兼容 Shopify 目录抓取与同步

仅需用您的 Shopify 旧店铺域名和 API Credentials，即可完成一键免损无缝克隆，实现跨系统的库存联动：

##### 🟢 用代码瞬时初始化并挂载独立自营网架：
\`\`\`typescript
import { DeepayClient } from '@deepay/sdk';
const deepay = new DeepayClient({ apiKey: 'dp_sec_live_...' });

async function activateResponsiveStore() {
  const customStore = await deepay.stores.create({
    name: 'Sovereign Fashion Hub Prato',
    locale: 'zh', // 全自动编译并发布中、英、意、法多语言 canonical Sitemap 路由
    theme: {
      primaryColor: '#0d9488', // ModaUI 霓虹青色令牌
      scaffolding: 'bento-grid-luxury', // 高端高奢 Bento 格局
      enableGlassmorphism: true // 采用网格玻璃半透设计
    },
    googleAutopilotSitemap: true, // 开启 24 小时 AI 自动搜索引擎自动提级补录
    syncSources: {
      shopifyDomain: 'my-legacy-shopify-brand.myshopify.com',
      autoSyncInventorySec: 30 // 每 30 秒轮询 Shopify 原生库存防超卖
    }
  });

  console.log('自营网店极速部署至欧洲边缘站群！域名入口：', customStore.edgeUrl);
}
\`\`\`

#### 让 Shopify 望尘莫及的 SEO 和速度优势：
- **0.45s 闪电首屏加载（FCP）**：前后端解耦使页面全部预先在欧洲主服务器静态网络化，打开速度快 5 倍。
- **主题集群（Topic Clusters）自动咬合**：内置自动内链引擎，自动将商品详情、使用场景、多语地区词（如 Milan, Prato 仓配）、Schema 等聚集成群，增加 Perplexity/ChatGPT 模型以及 Google 优先收录索引权重倍数。
- **免除二次迁移之苦**：原有的 canonical canonical 标签与目录链接规则精准契合，彻底打消权重流失顾虑。`
      }
    ]
  }
];
