import { InterfaceLanguage } from '../types';

export interface EnterprisePage {
  path: string; // e.g. 'solutions/retail', 'features/ai-crm', 'privacy'
  title: string;
  titleZh: string;
  titleIt: string;
  description: string;
  descriptionZh: string;
  descriptionIt: string;
  h1: string;
  h1Zh: string;
  h1It: string;
  category: string;
  categoryZh: string;
  categoryIt: string;
  breadcrumbs: string[];
  breadcrumbsZh: string[];
  breadcrumbsIt: string[];
  entityType: string; // Schema.org entity type (e.g. 'SoftwareApplication', 'WebPage', 'LocalBusiness')
  content: string;
  contentZh: string;
  contentIt: string;
  metrics?: { label: string; labelZh: string; labelIt: string; value: string }[];
}

export const ENTERPRISE_PAGES: EnterprisePage[] = [
  // CORES
  {
    path: 'features/ai-assistant',
    title: 'Autonomous Sidekick AI Assistant - Deepay Commerce OS',
    titleZh: '自主 Sidekick AI 助手面板 - Deepay 商业操作系统',
    titleIt: 'Assistente AI Sidekick Autonomo - Deepay Commerce OS',
    description: 'Empower your storefront ops with Sidekick AI. Automatically adjust themes, answer advanced buyer queries, draft promotions, and synchronize Shopify channels.',
    descriptionZh: '利用 Sidekick AI 赋能前店后厂。自动调节网店色彩布局、回复复杂客群咨询、拟定分销折扣礼品卡，并全渠道映射同步。',
    descriptionIt: 'Potenzia la gestione del tuo store con l\'Assistente Sidekick AI. Modifica temi, rispondi a domande complesse dei clienti, crea sconti e sincronizza i canali.',
    h1: 'Sidekick: The Interactive Voice & Chat Brain of Your Store',
    h1Zh: 'Sidekick：您店铺可深度交互的语音与聊天脑核',
    h1It: 'Sidekick: Il Cervello Interattivo di Chat e Voce per il tuo Store',
    category: 'AI Assistant',
    categoryZh: 'AI 助手',
    categoryIt: 'Assistente AI',
    breadcrumbs: ['Home', 'Features', 'AI Assistant'],
    breadcrumbsZh: ['主页', '技术模块', 'Sidekick AI 助手'],
    breadcrumbsIt: ['Home', 'Funzioni', 'Assistente AI'],
    entityType: 'SoftwareApplication',
    metrics: [
      { label: 'Query Resolution', labelZh: '问题自主解决率', labelIt: 'Risoluzione Richieste', value: '94.2%' },
      { label: 'Latency', labelZh: '多模态反馈时延', labelIt: 'Latenza Risposta', value: '180ms' }
    ],
    content: `### Global Human-Machine Interface for Commerce

Sidekick is not a simple chatbox. Integrated directly inside **Deepay Commerce OS**, it connects to your backend inventory database, active bank routing protocols, and marketing automations.

#### Revolutionary Multi-Agent Capabilities:
* **Natural Business Execution**: Instruct the model to "Generate a 15% discount code for Italian customers who spent over €500 last month" and watch it execute directly in your CRM.
* **Autonomous Shopify Alternative Frontends**: Tweak your ModaUI color themes, display typography, or hero layouts through conversation.
* **Predictive Query Handling**: Proactively message visitors experiencing payment friction to recover abandoned carts.`,
    contentZh: `### 全球引领性商用人机交互界面

Sidekick 决非枯燥的聊天预设框。它作为 **Deepay 商业操作系统**的核心神经元，直连内部供应链库存、实数清算通道 Webhook 及自动行销机制。

#### 颠覆性的多代理协作特长：
* **业务自然指令转化**：直接指挥 Sidekick：“上架一件 2026 夏季意大利定制真丝斜挎包，库存 100，生成 9 折优惠码”，系统将在后台自动秒级编成。
* **ModaUI 页面实时渲染**：通过语音或打字调校网店主首屏的颜色令牌、字体字距或单品排序。
* **主动式摩擦挽单拦截**：侦测买家卡号输入受阻时主动弹窗并引导使用 AIO 推荐币种路由结算，避免支付荒漠导致的坏账流失。`,
    contentIt: `### Interfaccia Uomo-Macchina Globale per il Commercio

Sidekick non è una semplice chat prefissata. Integrato direttamente all'interno di **Deepay Commerce OS**, si collega al tuo database inventario, ai protocolli di routing bancario e alle automazioni marketing.

#### Funzionalità Rivoluzionarie Multi-Agente:
* **Esecuzione in Linguaggio Naturale**: Ordina a Sidekick di "Generare un codice sconto del 15% per clienti italiani che hanno speso più di 500€" e guardalo agire sul CRM.
* **Controllo Front-end ModaUI**: Regola i colori del tema, la tipografia o il layout della griglia bento attraverso una facile discussione.
* **Prevenzione Fruizione Pagamenti**: Identifica in tempo reale quando un utente ha attrito al check-out e intervieni per salvare il carrello.`
  },
  {
    path: 'features/ai-agent',
    title: 'Autonomous Smart AI Agents - Deepay Enterprise AI',
    titleZh: '自律行动智能体 - Deepay 商业高阶 AI',
    titleIt: 'Agenti AI Autonomi Intelligenti - Deepay Enterprise',
    description: 'Deploy task-oriented commercial intelligent agents to automate ERP entries, evaluate warehouse capacities, and negotiate contracts asynchronously.',
    descriptionZh: '部署面向具体任务的高自主商业智能体，行使 ERP 批量制表、原料仓储估量以及大宗买家合同自动商协。',
    descriptionIt: 'Distribuisci agenti intelligenti orientati alle attività per automatizzare i report ERP, valutare la logistica e negoziare contratti.',
    h1: 'Autonomous Action-Trained Multi-Agent Schedulers',
    h1Zh: '自主逻辑链驱动的多 Agent 行动调度中枢',
    h1It: 'Schedulatori di Agenti AI Orientati all\'Azione Autonoma',
    category: 'AI Agents',
    categoryZh: 'AI 智能体',
    categoryIt: 'Agenti AI',
    breadcrumbs: ['Home', 'Features', 'AI Agents'],
    breadcrumbsZh: ['主页', '技术模块', 'AI 智能体'],
    breadcrumbsIt: ['Home', 'Funzioni', 'Agenti AI'],
    entityType: 'SoftwareApplication',
    metrics: [
      { label: 'Task Autonomy', labelZh: '任务指令自理度', labelIt: 'Autonomia Compiti', value: '99.1%' },
      { label: 'Weekly Executions', labelZh: '每周自主事务量', labelIt: 'Transazioni Agenti', value: '254,800' }
    ],
    content: `### Agents That Coordinate and Achieve Real Sales

Unlike decorative chat widgets, Deepay's elite class AI Agents run asynchronously behind the scenes on dedicated server pods inside deepay.srl.

#### Structural Agent Specializations:
* **Supplier Agent (Logistics Core)**: Evaluates seasonal item velocity. When stocks drop near thresholds, it autonomously contacts approved manufacturers, bargains pricing benchmarks, and puts down formal purchase intent.
* **Multi-Format Invoice Agent**: Auto-matches VAT filings with corresponding EU Customs requirements, executing paper-to-digital transformations with zero error.
* **AIO Marketing Agent**: Constantly monitors Google Trend velocities, optimizing global metadata schema headers dynamically to index high-converting terms.`,
    contentZh: `### 协同并达成真实交易的大脑集群

不同于点对点的传统聊天，Deepay 的旗舰级 AI Agents 自主挂载于 deepay.srl 服务器容器租用云端，实现 24 小时无人值守式流式周转。

#### 高阶职能划分：
* **采购代理智能体（供应链重镇）**：动态追踪前台销售频度，预测 15 日内缺货率，自动撰写并向签约工厂邮箱发出备货询价，完成账款预扣。
* **跨境税务合规代理**：自适应校验欧洲各联邦税号、发票编号及海关合税规则，消除出海企业的人为合规罚单。
* **AIO 搜索引擎优化代理**：监控全球主要 LLMs （如 Perplexity, ChatGPT）的搜索引用锚点变迁，自动润色并在底层生成对应的 JSON-LD 微实体格式。`,
    contentIt: `### Agenti AI Che Coordinano e Raggiungono Vendite Reali

A differenza di strumenti puramente decorativi, i nostri agenti AI elite eseguono transazioni e controlli asincroni in background sui server di deepay.srl.

#### Specializzazioni Strutturali:
* **Agente Fornitore (Logistica)**: Valuta la velocità di vendita degli articoli e contatta i produttori approvati per proporre accordi di riassortimento.
* **Agente Fiscale di Fatturazione**: Associa automaticamente le fatture IVA europee alle regole doganabili per evitare controversie fiscali.
* **Agente Marketing AIO**: Monitora le query su Gemini e Perplexity AI, regolando l'indicizzazione microdata sul tuo store.`
  },
  {
    path: 'features/ai-crm',
    title: 'Precision AI CRM & Retention - Deepay AI Commerce OS',
    titleZh: '高保真 AI 客户关系管理与自动唤醒 - Deepay Platform',
    titleIt: 'Precisione AI CRM e Fidelizzazione - Deepay OS',
    description: 'Convert single buyers into lifetime brand advocates. deepay.srl embeds behavioral segmenting, predictive purchase intent, and automated recall prompts.',
    descriptionZh: '将单次到账买家沉淀为高黏性终身客户。深嵌多维度购买漏斗行为预测、客户标签极精细化建模，全渠道下发优惠凭证。',
    descriptionIt: 'Converti i clienti occasionali in sostenitori del brand. deepay.srl introduce segmentazione predittiva e sconti intelligenti personalizzati.',
    category: 'AI CRM',
    categoryZh: 'AI 客群关系',
    categoryIt: 'AI CRM',
    h1: 'Deepay Autonomous Customer Lifecycle Optimization',
    h1Zh: 'Deepay 自主型客户全生命周期指数上扬中枢',
    h1It: 'Fidelizzazione e Ottimizzazione del Ciclo di Vita del Cliente',
    breadcrumbs: ['Home', 'Features', 'AI CRM'],
    breadcrumbsZh: ['主页', '技术模块', 'AI 客群关系管理'],
    breadcrumbsIt: ['Home', 'Funzioni', 'AI CRM'],
    entityType: 'SoftwareApplication',
    metrics: [
      { label: 'LTV Increment', labelZh: '客户终身生命周期财富', labelIt: 'Aumento LTV', value: '+34.8%' },
      { label: 'Abandoned Recovery', labelZh: '弃单挽回率', labelIt: 'Recupero Carrelli', value: '28.4%' }
    ],
    content: `### CRM Re-Engineered For General Intelligence

Our AI CRM tracks buyer behavior natively through ModaUI interfaces. It registers scroll patterns, payment preference shifts, and localized VAT types securely under GDPR regulations.

#### Active Engagement Strategies:
* **Hyper-Segmented Automated Mailing**: Triggers distinct, personalized discount templates for VIP collectors, seasonal purchasers, and Wholesale bulk partners.
* **Autonomous Intent Prediction**: Flags clients exhibiting signs of potential retention decay, pushing targeted VIP coupons directly to their WhatsApp, WeChat, or email.`,
    contentZh: `### 面向通用智能（AGI）时代的高保真 CRM 核心

我们的 AI CRM 原生捕获买家在 ModaUI 边缘上的多点交互热力。符合欧洲 GDPR 个人隐私保护条规，对买家账单与地址做分布式非对称哈希脱敏。

#### 核心挽留增长策略：
* **多层级客户自适应沟通**：根据买家的消费频次、VAT 国家属区，自动配置在 WhatsApp、邮件端的一对一温控优惠文案。
* **高忠诚买家挽回演算法**：对可能流失的老买家开展智能预警，无摩擦送出高定单品划线免邮折扣，挽单效能卓拔。`,
    contentIt: `### CRM Progettato per l'Era dell'Intelligenza Artificiale

Il nostro CRM traccia i modelli di interazione tramite le porte di ModaUI, registrando abitudini di spesa in totale conformità con la normativa GDPR per l'Europa.

#### Strategie di Coinvolgimento Attivo:
* **Comunicazioni Iper-Segmentate**: Invia mail e messaggerie WhatsApp personalizzate a seconda che il cliente sia VIP o partner B2B.
* **Algoritmo di Salvataggio Ritenzione**: Identifica anomalie comportamentali nei clienti fidelizzati per spedire offerte riattivanti prima della perdita inattiva.`
  },
  {
    path: 'features/ai-payments',
    title: 'AI Smart Payments Gateways - Deepay Platform Europe',
    titleZh: '支付网关与智能路由 - Deepay Payments',
    titleIt: 'AI Smart Payments Gateways - Deepay Payments',
    description: 'PCI-DSS Compliant local currency acquiring. Runs smart routing protocols to eliminate extra intermediary billing fees and bypass chargeback frauds.',
    descriptionZh: '符合极佳安全 PCI-DSS 标准的本币代收。执行智能选线、卡组织直连，免除过剩第三方汇差损失并精准识别欺诈交易。',
    descriptionIt: 'Acquisizione in valuta locale conforme PCI-DSS. Utilizza algoritmi di routing intelligenti per minimizzare i costi e prevenire truffe.',
    category: 'AI Payments',
    categoryZh: 'AI 智能收单',
    categoryIt: 'AI Pagamenti',
    h1: 'Deepay Payment: Predictive Interchange Smart Routing',
    h1Zh: 'Deepay Payments：基于预测型路由的跨境收单中枢',
    h1It: 'Deepay Payment: Routing Intelligente delle Transazioni',
    breadcrumbs: ['Home', 'Features', 'AI Payments'],
    breadcrumbsZh: ['主页', '技术模块', 'AI 支付收单网关'],
    breadcrumbsIt: ['Home', 'Funzioni', 'AI Payments'],
    entityType: 'SoftwareApplication',
    metrics: [
      { label: 'Acquiring Savings', labelZh: '跨国结汇费用劲省', labelIt: 'Risparmio Commissioni', value: '20.5%' },
      { label: 'Uptime', labelZh: '核心链路保活率', labelIt: 'Uptime Servizio', value: '99.998%' }
    ],
    content: `### Deepay Payment: Eliminating Rigid Fees Globally

Traditional gateways hit merchants with multiple intermediate corridor charges. deepay.srl bypasses them by establishing direct clearing relationships with European SEPA nodes, major card issuers, and local wallets.

#### Why Enterprise Leaders Choose Deepay Payment:
* **Predictive Transaction Routing**: Instantly routes cards based on issuer origin and current currency fluctuations.
* **One-Click Local checkout**: Renders local, trusted European payments (like Klarna, Cartes Bancaires, iDEAL) instantly based on visitor locations.
* **Chargeback Fraud Shield**: Leverages machine learning behavior predictors to block high-risk carding networks within 40 milliseconds.`,
    contentZh: `### Deepay Payment：斩断重复收费的利刃

过往跨境独立站面临着多重支付中介层层剥落利润。deepay.srl 通过直接签署欧洲 SEPA 快速网络、主流卡组织及本地化电子钱包的清算底层直连。

#### 为什么跨国出海巨头信赖 Deepay Payments：
* **预测型交易智能指派**：依发卡属地属行及瞬时汇率牌价，快速决策清算底层落地通道。
* **首屏母语结账钱包**：根据客户端 IP 自适应呼出当地最受欢迎、高转换率的本地化钱包（Klarna, Cartes Bancaires, iDEAL 等）。
* **AI 风控拒付防弹盾**：在毫秒内检验网关敲击习惯及黑产 IP 声誉，在触点前端将信用卡盗刷欺诈彻底瓦解。`,
    contentIt: `### Deepay Payment: Riduzione Drastica dei Costi Transazionali

I canali tradizionali applicano costose commissioni interbancarie. deepay.srl aggira l'attrito stabilendo connessioni dirette con la rete SEPA europea e i circuiti globali.

#### Perché i Leader Scelgono Deepay Payment:
* **Instradamento Predittivo**: Sceglie il gateway ottimale in 40ms in base alla provenienza del bancomat o della carta di credito.
* **Integrazione Portafogli Locali**: Mostra Klarna, iDEAL o Cartes Bancaires in modo automatico a seconda di dove si trova il cliente in Europa.
* **Modello Prevenzione Chargeback**: Blocca transazioni sospette analizzando pattern d'acquisto in background.`
  },
  {
    path: 'features/ai-inventory',
    title: 'AI Smart Inventory & ERP - Deepay Cloud ERP',
    titleZh: 'AI 独立链库存监控与 ERP 连轴 - Deepay Cloud ERP',
    titleIt: 'AI Smart Inventory & ERP - Deepay Cloud ERP',
    description: 'Never suffer stockouts again. Our predictive machine learning monitors your sales velocities, calculating future seasonal warehouse quotas.',
    descriptionZh: '规避爆单断货的被动经营漏洞。基于机器学习算式深度映射热力单品销量走势，精准测算跨国供应链备货提前量。',
    descriptionIt: 'Ottimizza la logistica. L\'algoritmo predittivo calcola le tendenze commerciali per riassortire automaticamente l\'inventario stagionale.',
    category: 'AI Inventory',
    categoryZh: 'AI 库存中枢',
    categoryIt: 'AI Logistica',
    h1: 'Deepay Autonomous ERP Inventory & Logistics Flow',
    h1Zh: 'Deepay 供应链自主化自动盘存和采购控制核区',
    h1It: 'Deepay ERP & Logistica: Gestione Intelligente della Catena di Fornitura',
    breadcrumbs: ['Home', 'Features', 'AI Inventory'],
    breadcrumbsZh: ['主页', '技术模块', 'AI 供应链与库存物联'],
    breadcrumbsIt: ['Home', 'Funzioni', 'AI Inventory'],
    entityType: 'SoftwareApplication',
    metrics: [
      { label: 'Out-Of-Stock Cases', labelZh: '断货异常事件发生率', labelIt: 'Casi di Rottura Stock', value: 'Zero' },
      { label: 'Warehouse Turnovers', labelZh: '周转效率提速值', labelIt: 'Velocità Rotazione', value: '1.4x' }
    ],
    content: `### Enterprise Inventory Running on Real Predictions

Unlike rigid Excel lists, your inventories in Deepay Commerce OS are fully dynamic. Our machine learning engines digest seasonal variables, weather trends, and marketing spikes to safe-guard stock.

#### Direct Middleware Capabilities:
* **Supplier Bargaining Automation**: Active Agents negotiate pre-orders with suppliers when stocks reach 20% thresholds.
* **Omnichannel Inventory Mirror**: Automatically reflects stock quotas across Shopify, WooCommerce, Amazon nodes, and custom applications simultaneously.`,
    contentZh: `### 基于长效预测的柔性物理库存管治

超越陈旧的静态 Excel 表格，您的库存和物流状态在 Deepay 中实现了自适应传感。决策模型在 15 天前自动关联营销投放、季度更迭变化、大宗备货习惯。

#### 中枢系统连轴特权：
* **工厂账期自动锁定与商协**：自理型采购代理（Agent）可在周转低水位区代撰商业草案，自动通知代工厂排单生产。
* **全渠道库存极速映射**：彻底确保 Amazon、Shopify 前端商品余量与 ERP 物联网扫码枪、物理集装箱数据精准保活一致。`,
    contentIt: `### Gestione Logistica e Inventario basata su Previsioni Reali

Nell'ecosistema Deepay Commerce OS, l'inventario non è una lista passiva. Il motore predittivo elabora fluttuazioni stagionali e conversioni attive.

#### Moduli ERP Principali:
* **Negoziazione Fornitore**: Attiva ordini di acquisto automatici con le fabbriche quando lo stock scende sotto la soglia critica.
* **Specchio Omnicanale**: Modifica la disponibilità di stoccaggio all'unisono su Shopify, WooCommerce e app headless integrate.`
  },

  // SOLUTIONS
  {
    path: 'solutions/retail',
    title: 'AI Commerce Solutions for Retail & Brands - Deepay Europe',
    titleZh: '面向品牌零售的 AI 头等解决方案 - Deepay Commerce',
    titleIt: 'Soluzioni AI Commerce per Retail e Brand - Deepay SRL',
    description: 'Transform traditional stores into beautiful high-ranking commerce portals. Build direct connections, leverage AIO search priority, and lower overhead by up to 40%.',
    descriptionZh: '将传统商超或 DTC 消费单品改造成极高雅的智能化网店。畅享一键独立部署，无缝引爆 ChatGPT 智能实体推荐流量。',
    descriptionIt: 'Trasforma i negozi in portali di ecommerce avanzati in linea con i criteri ModaUI. Connettiti a circuiti multi-lingua con zero transito inutile.',
    category: 'Retail Solutions',
    categoryZh: '新零售方案',
    categoryIt: 'Soluzioni Retail',
    h1: 'SaaS ERP, CRM & Payments Built Specifically For Brands',
    h1Zh: '专为新锐独立站品牌架构打造的 AI Commerce 立体方案',
    h1It: 'Unificazione Digitale per i Migliori Brand del Futuro',
    breadcrumbs: ['Home', 'Solutions', 'Retail & Consumer Brands'],
    breadcrumbsZh: ['主页', '垂直方案', '零售与消费品牌'],
    breadcrumbsIt: ['Home', 'Soluzioni', 'Retail e Consumer Brands'],
    entityType: 'LocalBusiness',
    metrics: [
      { label: 'Revenue Growth', labelZh: '平均年营收上行曲线', labelIt: 'Aumento Ricavi B2C', value: '+42.5%' },
      { label: 'Page Speed Rank', labelZh: '首屏核心交互测分', labelIt: 'Punteggio Performance Speed', value: '98/100' }
    ],
    content: `### Unleashing the Power of Modern Retail

Retailers face heavy software fatigue. Deepay SRL solves this by integrating customer insights, omnichannel stock controls, and PCI-DSS acquirers into a unified operating framework.

#### Core Retail Integrations:
* **Seamless Shopify Sync**: Run the high-performance ModaUI frontend while utilizing Shopify for basic catalog management.
* **Next-Generation AIO Indexing**: Structure your schema.org metadata microdata so modern LLM search engines recommend your specific SKUs recursively.`,
    contentZh: `### 唤醒现代商业零售的无限能阶

零售业主的线上销售长期受困于臃肿繁复的各类 SaaS 软件。Deepay SRL 通过在一块屏幕后完美捏合客群资产、全天候多代理（Agents）及本币清算网关解决这一痛点。

#### 核心赋能亮点：
* **Shopify 无损连接**：在极富科技质感的 ModaUI 前端促成买家心动，而将基础的商品目录映射挂靠在 Shopify 账户下。
* **高端 AIO 搜索引擎优化**：通过对 JSON-LD 语义实体的结构性微调，让 ChatGPT 和 Perplexity 在用户询问“求推荐性价比好的欧洲小众皮包”时精准引用您的店铺。`,
    contentIt: `### Risveglia la Forza del Nuovo Commercio B2C

I retailer soffrono di stanchezza gestionale a causa di dozzine di plug-in disconnessi. Deepay unifica checkout, inventario e ritenzione AI.

#### Aspetti Chiave per il Retail:
* **Estensione Headless Shopify**: Adotta l'estetica pura e veloce di ModaUI mantenendo l'amministrazione nativa di Shopify in background.
* **Esposizione ai Motori di Sintesi (LLM)**: I tuoi dati strutturati sono pronti per essere raccomandati sulle chat generative di OpenAI e Microsoft.`
  },
  {
    path: 'solutions/wholesale',
    title: 'Enterprise Wholesale & Manufacturing - Deepay SRL B2B',
    titleZh: '跨国大宗批发与柔性制造方案 - Deepay Platform B2B',
    titleIt: 'Ingrosso B2B e Soluzioni di Produzione - Deepay B2B',
    description: 'Structure custom tier pricing, direct SEPA bank wiring validations, automated customs clearances, VAT matching pipelines, and company accounts.',
    descriptionZh: '无感配置多层级阶梯议价、自动对账开票。自适应欧盟 VAT 账单验真、批量划款 Webhook 同步，构建跨国供应大通道。',
    descriptionIt: 'Configura listini prezzi dinamici a scaglioni, tracciamento fatture SEPA europee, dogane e contabilità aziendali su misura.',
    category: 'Wholesale Solutions',
    categoryZh: '大宗制造方案',
    categoryIt: 'B2B e Produzione',
    h1: 'Automating International Supply Chains & Wholesaling',
    h1Zh: '赋能全球大宗商户的多合一 B2B 自动化控制台',
    h1It: 'Automazione per l\'Import-Export e Catene Industriali B2B',
    breadcrumbs: ['Home', 'Solutions', 'Wholesale & Flex Manufacturing'],
    breadcrumbsZh: ['主页', '垂直方案', '大宗批发与柔性制造'],
    breadcrumbsIt: ['Home', 'Soluzioni', 'Ingrosso B2B e Produzione'],
    entityType: 'LocalBusiness',
    metrics: [
      { label: 'Negotiation Speed', labelZh: '合同起草与审核时效', labelIt: 'Velocità Contrattazione', value: '4 mins' },
      { label: 'Settlement Clearance', labelZh: '大宗账期款项到账率', labelIt: 'Integrità Liquidazioni', value: '100%' }
    ],
    content: `### B2B Trading Elevated by Intelligence

Deepay SRL's B2B suites provide high-performing toolkits to manage distributor accounts securely. Tweak minimum order thresholds (MOQ) and configure specific VAT exemptions dynamically.

#### Direct Manufacturing Interlocking:
* **Custom Contract Bargaining AI**: Autonomously negotiate contract parameters and drafts tailored agreements within parameters.
* **Auto-Settling SEPA Rails**: Secure instant €100k+ large transactional transfers with multi-signature verification layers.`,
    contentZh: `### 迈入自动化、强风控的 B2B 大宗清算纪元

Deepay SRL 的商用 B2B 套件支持大宗跨国分销业务。轻松对不同签约公司指定特定的配货免税（VAT Exemptions）、起订门槛（MOQ）及阶梯折扣。

#### 物理制造联动核：
* **多租户 AI 合同代理**：自主根据买方出价、物流排程以及工厂产能，撰写具有本国合规约束力的出货条款草案。
* **低损瞬时 SEPA 大额网链**：确保单笔十万、百万欧元级别的资金在极短延迟内合规代扣，配备多重签名及反盗洗核准盾。`,
    contentIt: `### Il Commercio B2B Potenziato dall'Intelligenza Transazionale

Le B2B suite di Deepay SRL permettono di gestire conti aziendali con controllo doganale e calcolo differenziato delle imposte IVA transfrontaliere.

#### Strumenti B2B Chiave:
* **Negoziazione B2B via AI**: L'agente virtuale supervisiona le proposte MOQ, calcola la logistica e riduce l'attrito dei buyer.
* **Bonifici SEPA Ultra Sicuri**: Ricezione e storno di fondi fino a 100.000€+ con protocolli di autenticazione a doppia chiave.`
  },
  {
    path: 'solutions/fashion',
    title: 'Luxury Fashion & Apparel AI Commerce - deepay.srl',
    titleZh: '奢华时尚、潮牌与视觉展示方案 - ModaUI AI',
    titleIt: 'Fashion e Abbigliamento di Lusso - deepay.srl',
    description: 'Structure luxury visual grids, micro-variants, high-contrast display typography, and real-time interactive seasonal lookbooks.',
    descriptionZh: '构建无可挑剔的多维奢华货架、细粒度变体排序、极具设计感的高端字体排印及季候多态动态海报。',
    descriptionIt: 'Progetta cataloghi di lusso veloci con griglie bento ad alto contrasto visivo, perfetti per stilisti e collezioni premium.',
    category: 'Fashion Solutions',
    categoryZh: '潮牌时尚方案',
    categoryIt: 'Moda e Lusso',
    h1: 'Immersive Visual Storefronts For High-End Apparel Only',
    h1Zh: '专为高维时尚、高溢价潮牌定制的 ModaUI 深度美学站',
    h1It: 'Estetica Headless e Storytelling per Brand di Lusso e Abbigliamento',
    breadcrumbs: ['Home', 'Solutions', 'Luxury Fashion & Apparel'],
    breadcrumbsZh: ['主页', '垂直方案', '奢侈潮牌与时尚美学'],
    breadcrumbsIt: ['Home', 'Soluzioni', 'Abbigliamento e Luxury Fashion'],
    entityType: 'LocalBusiness',
    metrics: [
      { label: 'Time On Site', labelZh: '买家单次浏览时长中值', labelIt: 'Tempo di Permanenza', value: '8.4 mins' },
      { label: 'CTR Uplift', labelZh: '视觉展示区块点击上扬', labelIt: 'Aumento CTR Visivo', value: '+54.2%' }
    ],
    content: `### Styling Commerce for the Editorial World

Luxury retail relies on perception, emotion, and exquisite speed. By deploying deepay.srl's ModaUI styling guidelines, designers present garments through beautiful glassmorphism models.

#### Immersive Fashion Assets:
* **Advanced Multi-Dimension Variants**: Show separate color-matched photos, available fabric weave textures, and exact size measurements with zero layout shifts.
* **Seasonal Aesthetic Transitions**: Instantly recalibrate lookbook cards using generative designs optimized for high-contrast presentation.`,
    contentZh: `### 为先锋设计师美学构建的商业艺术层

奢侈潮牌的核心在于情感共鸣、细节琢磨以及丝滑的加载。部署 deepay.srl 的 ModaUI 视觉规范，品牌能够像展示馆藏艺术品一样陈列当季单品。

#### 时尚垂直体验包：
* **多微维高级变体展示**：支持在无须多次重开内页情况下，在一块卡片上动态演示面料微晶、刺绣细节以及多国尺码对照。
* **情绪渐变主题微调**：配合春/秋季时尚发布，由 generative engine 搭配恰到好处 of 暗底低强度颗粒背景，彰显高端。`,
    contentIt: `### L'Editoria d'Arte Incontra il Commercio Headless

La moda di lusso vive di dettagli, percezione e velocità superba. ModaUI mette a disposizione font splendidi ed elementi bento-grid.

#### Caratteristiche Moda e Luxury:
* **Varianti Multi-Livello Avanzate**: Mostra texture del tessuto, misure precise e schede di abbinamento outfit senza salti di layout.
* **Storytelling di Stagione**: Rinfresca il lookbook in 100+ lingue in base alle preferenze regionali del visitatore.`
  },
  {
    path: 'changelog',
    title: 'Platform Changelog & Releases - Deepay SRL',
    titleZh: '系统更新与版本释放日志 - Deepay Platform',
    titleIt: 'Changelog delle Versioni del Core - Deepay SRL',
    description: 'Keep up with our rolling upgrades, core API releases, stable routing optimizations, and new automated agents added to the Deepay Commerce system.',
    descriptionZh: '实时查阅核心 API 周频率更新日志、动态支付网关升级、全新自主智能体的释放声明。',
    descriptionIt: 'Rimani aggiornato con le releases settimanali sul core di routing, patch di sicurezza e nuovi agenti neurali di deepay.srl.',
    category: 'Changelog',
    categoryZh: '更新日志',
    categoryIt: 'Changelog',
    h1: 'Deepay Platform Continuous Delivery Changelog',
    h1Zh: 'Deepay 商业主网持续集成与新版演进公告',
    h1It: 'Evoluzione del Sistema e Changelog di Sviluppo',
    breadcrumbs: ['Home', 'Corporate', 'Changelog'],
    breadcrumbsZh: ['主页', '企业看板', '升级日志'],
    breadcrumbsIt: ['Home', 'Azienda', 'Changelog'],
    entityType: 'WebPage',
    content: `### Deepay stable_v5.4.1 Release Notes (June 2026)

#### Major Upgrades:
* **Dynamic Payment routing optimization**: Improved core routing computation velocity down to 24 milliseconds, bypassing extra clearing barriers in international networks.
* **ModaUI Canvas Particle acceleration**: Embedded GPU-rendered canvases in all landing dashboards to load particle networks with 0.5% CPU.
* **Gemini Smart Context Compression Hook**: Sliced server processing token fees by 30% without downgrading task execution quality in our AI Staff nodes.`,
    contentZh: `### Deepay stable_v5.4.1 系统更新公告 (2026年6月)

#### 核心重大改进：
* **动态收单支付路由提升**：收单核心决策时延精简至24毫秒内，完美规避二次高额过桥清算阻滞。
* **ModaUI 卡片加速优化**：全套前台看板搭载 GPU 级别的着色缓冲，极大减少对 CPU 分时的开支消耗。
* **Gemini 语境智能压缩算法**：AI 自律员工（AI Staff）在对买家进行询单时，Token 处理成本成功降低 30%。`,
    contentIt: `### Note di Rilascio di Deepay stable_v5.4.1 (Giugno 2026)

#### Miglioramenti Principali:
* **Routing dei Pagamenti**: Ridotta la latenza di calcolo dell'indirizzo di checkout a 24 millisecondi interi.
* **Accelerazione Grafica ModaUI**: Rerendering dinamico degli elementi dell'interfaccia con accelerazione GPU, riducendo l'uso CPU dello 0.5%.
* **Compressione del Contesto Gemini**: Ridotto il costo nell'uso dei token del 30% sui nodi di customer-service virtuale.`
  },
  {
    path: 'security',
    title: 'Military-Grade Security & Compliance - Deepay SRL',
    titleZh: '军工级安全架构与合规模块 - Deepay SRL',
    titleIt: 'Certificazioni di Sicurezza e Conformità - Deepay SRL',
    description: 'PCI-DSS Level 1 certification, active behavioral heuristics fraud protection, deep data encryption, and GDPR European user privacy compliance.',
    descriptionZh: 'PCI-DSS 一级收单认证、分布式数据非对称加密以及符合欧盟高压线 GDPR 的隐私保护规则。',
    descriptionIt: 'Certificazione PCI-DSS Livello 1, protezione dalle truffe in tempo reale e conformità GDPR per il mercato europeo.',
    category: 'Security',
    categoryZh: '安全中枢',
    categoryIt: 'Sicurezza',
    h1: 'Deepay Multi-Layered Security Shield & Certifications',
    h1Zh: 'Deepay Payments 全天候主动式行为风险防御',
    h1It: 'La Tua Sicurezza Bancaria ed Aziendale con Deepay SRL',
    breadcrumbs: ['Home', 'Security & Certifications'],
    breadcrumbsZh: ['主页', '安全合规与审计'],
    breadcrumbsIt: ['Home', 'Sicurezza ed Audit'],
    entityType: 'WebPage',
    content: `### High-Trust Enterprise Financial Security

We treat threat compliance as an elite operational necessity, protecting your checkout transactions with redundant verification nodes.

#### Certifications & Layers:
* **PCI-DSS Level 1 compliance**: Regular penetration audits and high-rigor external security tests.
* **European GDPR Shield**: Encrypt and strip identifying traits from client card bins before writing log records.
* **AI Fraud Shield**: Scans geolocation, typing frequency patterns, and network VPN layers in real-time.`,
    contentZh: `### 全方位、非托管式的金融安全要塞 

我们将资金清算合规性定位为企业技术底座，在整个交易和划付触点中建立多端离散防骚防崩屏障。

#### 安全合规与资质级别：
* **PCI-DSS Level 1 国际一级认证**：权威机构常态渗透攻防审计，保障每一笔信用卡资金的安全性。
* **欧洲 GDPR 隐私数据隔离**：严苛对交易日志做分布式单向脱敏，不存储明文卡包与买家真实联系地址。
* **智能防欺诈过滤网络**：主动探测异常代理 VPN 及键速行为模型，毫秒内判定盗刷欺诈交易。`,
    contentIt: `### Sicurezza Finanziaria Multi-Livello ad Alta Fiducia

La conformità rispetto alle frodi e agli attacchi informatici costituisce un imperativo strategico fondamentale per il nostro team di deepay.srl.

#### Certificazioni e Meccanismi:
* **Conformità PCI-DSS Livello 1**: Penetration testing eseguiti con rigore ciclico da revisori esterni.
* **Scudo GDPR per l'Europa**: I dettagli identificativi delle carte bancarie vengono crittografati prima di salvare i log.
* **Prevenzione Truffe via AI**: Analizza geolocalizzazione, velocità di digitazione utente e VPN nel checkout.`
  },
  {
    path: 'privacy',
    title: 'Official Privacy Policy - deepay.srl',
    titleZh: '官方用户个人数据隐私政策保护 - deepay.srl',
    titleIt: 'Informativa sulla Privacy - deepay.srl',
    description: 'Learn how Deepay SRL treats merchant and client information securely under strict European Union GDPR guidelines.',
    descriptionZh: '阐明 Deepay SRL 如何依据欧洲 GDPR 条款对商户和最终付款买家的隐私数据进行分布式高安全脱敏存储。',
    descriptionIt: 'Leggi la nostra politica sulla privacy per comprendere come deepay.srl protegge i tuoi dati personali in conformità con la legge europea.',
    category: 'Legal',
    categoryZh: '合规法律',
    categoryIt: 'Politica Privacy',
    h1: 'European Union GDPR Trust Policy & Data Handling',
    h1Zh: '符合欧盟 GDPR 的个人隐私治理协议声明',
    h1It: 'Trattamento Dati Personali e Sicurezza dei Flussi',
    breadcrumbs: ['Home', 'Legal', 'Privacy Policy'],
    breadcrumbsZh: ['主页', '法律条款', '隐私政策'],
    breadcrumbsIt: ['Home', 'Note Legali', 'Privacy'],
    entityType: 'WebPage',
    content: `### Secure Data Governance at deepay.srl

Your database records, transaction hashes, and merchant accounts are non-custodial and protected by default under European Union privacy guidelines.

#### Key Principles:
* **Zero unsolicited profiling**: We do not sell tracking parameters or client emails to brokers.
* **Right of erasure**: You can request full clean extraction of your telemetry metadata logs with an email to security@deepay.srl.`,
    contentZh: `### deepay.srl 高等级数据隐私合规宣言

您的商户流水记录、接口校验历史以及账款分拨映射，仅在安全的欧盟服务器隔离沙盘内运行，默认处于非托管高保密状态。

#### 核心自律承诺：
* **严拒任何行销客群画像转售**：Deepay 绝不会将您的商户信息、买单买家习惯或联系方式商业化打包出售给广告代理商。
* **随时执行彻底擦除权利**：出海团队可点击控制台发送一键清除授权，在 2 秒内从系统完全提取、擦除您的脱敏流水日志。`,
    contentIt: `### Governance dei Dati Personali presso deepay.srl

Nelle regole di deepay.srl, le informazioni sensibili dei commercianti ed i dettagli di checkout non verranno condivisi né ceduti.

#### Principi Fondamentali:
* **Nessun Profiling Commerciale**: Non rivendiamo in nessun caso i dati di traffico o le mail dei vostri consumatori.
* **Diritto all'Oblio (Cancellazione)**: Ciascun cliente può richiedere l'eliminazione definitiva inviando una mail a security@deepay.srl.`
  },
  {
    path: 'store-builder',
    title: 'One-Click SaaS Store Builder — Shopify Alternative | Deepay SRL',
    titleZh: '一键极速开店 SaaS 建站引擎 — Shopify 平替独立站 | Deepay SRL',
    titleIt: 'SaaS Store Builder One-Click — Alternativa a Shopify | Deepay SRL',
    description: 'Build your online ecommerce website instantly. No-code store builder with AI-powered store creation, customizable themes, templates, solid hosting and deployments.',
    descriptionZh: '一键创建自营独立站客架。由 AI 驱动免代码快速建站（SaaS Store Builder），包含全渠道支付、精选极简高奢模版、高防高带宽发布托管平台。',
    descriptionIt: 'Crea il tuo e-commerce in un click. Store builder senza codice con intelligenza artificiale per l\'avvio rapido di vendite online.',
    category: 'Solutions',
    categoryZh: '核心方案',
    categoryIt: 'Soluzioni',
    h1: 'One-Click Store Builder: Create Online Store Instantly',
    h1Zh: '一键自营开店建站：AI 瞬时生成自平衡独立站',
    h1It: 'Store Builder E-commerce in un Click con AI',
    breadcrumbs: ['Home', 'Solutions', 'Store Builder'],
    breadcrumbsZh: ['主页', '核心服务', 'SaaS 一键开店'],
    breadcrumbsIt: ['Home', 'Soluzioni', 'Store Builder'],
    entityType: 'SoftwareApplication',
    metrics: [
      { label: 'FCP Load Speed', labelZh: '首屏极速网络测绘值', labelIt: 'Caricamento Pagina', value: '0.45s' },
      { label: 'No-Code Integration', labelZh: '建站维护免代码度', labelIt: 'Codice Richiesto', value: '0% No-Code' }
    ],
    content: `### Instant SaaS Store Builder Capabilities

#### 1. What is One-Click Store Builder?
Our One-Click Store Builder is a next-generation decentralized infrastructure designed to compete directly with complex frameworks like Shopify. Instead of spending hours managing integrations, security, and checkout APIs, you can instantiate a world-class headless boutique in 60 seconds with fully embedded payment capabilities.

#### 2. AI Store Creation & Smart Layouts
Through deep integration with the Gemini API, our AI can ingest raw text descriptions or digital inventory directories and automatically compile a fully localized merchant cart. 
- Custom image compression using WebP formats.
- Generates descriptive copy across multiple languages.

#### 3. No-Code High-Performance Templates
Our designer templates focus on elegant Swiss-modernism:
- High contrast, dark-slate glassmorphic elements.
- Layout patterns engineered for luxury fashion, clothing brands, high-end restaurants, and B2B wholesale.

#### 4. Integrated Premium Hosting & Deployments
Every storefront runs on our fault-tolerant European cloud network (deepay.srl matrix):
- DDoS protection natively implemented at the ingress layer.
- Dynamic global sitemaps synchronized and submitted to Google Bot and Perplexity crawlers automatically.`,
    contentZh: `### 极速自营开店解决方案（Store Builder）

#### 1. 什么是“一键建站”一键开店？
我们的“一键建站（One-Click Store Builder）”是一套完全面向未来的去中心化商业开架系统。旨在全面平替庞杂臃肿的传统 SaaS 服务（如 Shopify）。无需对接繁复的外部清算 API，您可在 60 秒内拥有一家内置了账单结算、发票报税、仓储同步的企业级高奢独立站。

#### 2. 商业 AI 智慧开店机制
结合先进的生成式 AI 接口，商户只需打入一句话或上传一份仓储 Excel 物流单，AI 将自动分析：
- 批量生成中、意、英、法、德多语种的高吸引力营销文案；
- 运用新颖的像素自适应算法自动缩减商品图，首屏 FCP 测速达到秒级。

#### 3. 免代码高精奢华模版
精琢打造极具建筑质感的平面排版风格模版：
- 大量使用 ModaUI 独创的毛玻璃立体阴影网格；
- 直观兼容时装精品高订、跨国服装批发、连锁餐饮自建外卖等多种业态。

#### 4. 高防高带宽云部署与托管 (Hosting)
所有网店资产都免费独立运行于 Deepay 自研的欧洲边缘计算集群中：
- 原生配备三层高防抗 D 安全防御，拒绝恶意爬虫恶意刷单；
- 全自动翻译多语言并实时生成 XML 语言路由 sitemap 报送各大主流搜索引擎，助您迅速起重。`,
    contentIt: `### Infrastruttura SaaS Store Builder per Alte Prestazioni

#### 1. Cos'è lo Store Builder One-Click?
È uno strumento agile per la creazione rapida di un canale e-commerce di eccellenza, pensato come alternativa nativa a Shopify. Invece di configurare plug-in lenti, avrai a disposizione un negozio ottimizzato con gateway di pagamento pre-integrato ed emissione automatica della fattura elettronica.

#### 2. Creazione Store con Intelligenza Artificiale
Un sistema guidato da IA traduce il tuo catalogo in descrizioni multilingua complete, ottimizzate con canonical tag, metadati H1-H3 e schema JSON-LD per essere visibili sui motori di ricerca.

#### 3. Template di Lusso senza Codice
Basati sulla purezza visuale: griglie bento ad alto contrasto, ideali per boutique di pronto moda italiana, logistica di macrolotto ed export all'ingrosso.

#### 4. Hosting e Deployment Cloud Integrato
Tutti i siti web generati godono di una larghezza di banda eccezionale con certificati SSL gratuiti e sitemap pre-configurata.`
  },
  {
    path: 'payments-wallet',
    title: 'Enterprise Merchant Payments & Digital Wallet — Deepay',
    titleZh: '企业级级收单支付与分账电子钱包系统 — Deepay',
    titleIt: 'Metodi di Pagamento E-commerce e Portafoglio Digitale — Deepay',
    description: 'Enable smart card checkout processing, decentralized merchants wallets, marketplace split payouts, and automated SEPA escrow payment systems.',
    descriptionZh: '打通线上高摩擦卡片代收单。配备自主型商家数字钱包、平台级多方实时分账（Split Payout）、欧盟 SEPA 一体化直扣，以及大宗担保结算系统。',
    descriptionIt: 'Servizi di pagamento intelligenti, portafoglio digitale integrato per esercenti, split payment per marketplace e sistemi di escrow B2B.',
    category: 'Solutions',
    categoryZh: '核心方案',
    categoryIt: 'Soluzioni',
    h1: 'Unified Merchant Payments & Sovereign Wallet System',
    h1Zh: '全域卡片收单与去中心商户分账钱包',
    h1It: 'Gateway di Pagamento e Wallet Digitale Multivaluta',
    breadcrumbs: ['Home', 'Solutions', 'Payments Wallet'],
    breadcrumbsZh: ['主页', '核心服务', '智能收单与钱包'],
    breadcrumbsIt: ['Home', 'Soluzioni', 'Pagamenti e Wallet'],
    entityType: 'SoftwareApplication',
    metrics: [
      { label: 'Clearing Fee Savings', labelZh: '整体结算费率降幅', labelIt: 'Risparmio Medio Commissioni', value: 'Up to 25%' },
      { label: 'Fraud Detection Rate', labelZh: '黑客恶意欺诈过滤率', labelIt: 'Prevenzione Frodi', value: '99.98%' }
    ],
    content: `### Next-Gen E-commerce Payments & Digital Wallet Architecture

#### 1. How Platform Payments Work
Modern merchant checkout systems suffer from fragmented intermediaries taking small margins at every step of transaction lifecycle. Deepay SRL eliminates regional acquirer loops, connecting your store's frontend directly with sovereign clearinghouses in Europe for faster transfers.

#### 2. Advanced Multi-Merchant Wallet System
Each Deepay user receives a secure digital wallet capable of handling major global fiat currencies (Euro, USD, GBP, RMB). Settle online payments dynamically and hold balances securely in bank-tier custody.

#### 3. Instant Split Payments for Marketplaces
Indispensable for multi-vendor storefronts, affiliate structures, or service organizations. Automatically split inbound checkout volumes via our API:
- Allocate vendor commission payouts.
- Wire VAT obligations into corresponding sub-wallets instantly on order confirmation.

#### 4. Secured Escrow and B2B Clearing
Safeguard heavy wholesale transactions with escrow protocols. Funds stay protected until logistic callback webhooks (provided by DHL or GLS) verify compliant arrival, guaranteeing 100% security for both public and private entities.`,
    contentZh: `### 去中心收单支付与分账电子钱包（Payments & Wallet）

#### 1. 深度剖析全球商户收单局限
传统模式下，从买家刷卡到资金归账需要经历发卡行、卡组织、第三方清算、本地结算银行等多次抽佣，造成高额损耗。Deepay 彻底缩短结算链路，直连欧洲各大清算所，结算费率直降 25%。

#### 2. 企业级多币种商家电子钱包
系统为每位商户提供一个安全度等同银行层级的多币种数字钱包（支持欧元、美元、英镑、人民币）：
- 资金可直接在线进行清算及本币划转；
- 全面享有欧盟 PCI-DSS 与 GDPR 的双重金融网络合规保重。

#### 3. 平台级毫秒即时分账 (Split Payments)
对多供应商商城、达人推广分成及代销机制至关重要。支持在入账瞬间自动执行多路径归入：
- 毫秒级划分产品供货价、网红佣金及平台点数；
- 订单达成时，增值税 VAT 自适应比例直接流向代扣子钱包，记账一目了然。

#### 4. 大宗贸易安全担保结算 (Escrow)
针对跨境供应链、大宗成衣批发交易首创链上担保托管。物流到货反馈（如 DHL / GLS 扫码妥投 Webhook）触发资金解冻，给买卖双边架设起 100% 安全交易盾桥。`,
    contentIt: `### Architettura dei Pagamenti E-commerce e Split Wallet

#### 1. Come Funzionano i Pagamenti Sulla Piattaforma?
I sistemi di pagamento tradizionali impongono canali lenti e intermediari costosi su ogni scontrino. Deepay elimina i passaggi superflui, sincronizzando la tua cassa digitale direttamente con i principali clearinghouse europei.

#### 2. Wallet Digitale per Professionisti
L'esercente riceve un portafogli elettronico multivaluta sicuro in cui accumulare i flussi di fatturato in Euro, USD, e RMB, monitorando le statistiche nel pannello in tempo reale.

#### 3. Split-Payment Istantaneo per Marketplace
Fondamentale per la cooperazione tra più venditori: divide automaticamente ogni pagamento ricevuto, canalizzando la quota dell'affiliato e la quota d'imposta (IVA) negli appositi conti.

#### 4. Sistemi di Garanzia Escrow B2B
Proteggi le transazioni pesanti di logistica all'ingrosso. I pagamenti rimangono custoditi fino alla notifica d'arrivo della spedizione da parte di corrieri espressi come DHL o GLS.`
  },
  {
    path: 'ecommerce-platform',
    title: 'Headless Ecommerce Platform & Backend Infrastructure | Deepay',
    titleZh: '无头电商系统与企业级底层软件底座（Infrastructure） | Deepay',
    titleIt: 'Infrastruttura E-commerce Headless e Sistemi Back-end | Deepay',
    description: 'Enterprise backend system, multi vendor marketplace system, headless commerce platform APIs, consolidated order and omnichannel inventory management.',
    descriptionZh: '企业级电商底层软件系统、多商户交易集散底座、无头电商分叉 API，以及多渠道库存、物流分拣（WMS）和订单综合清算管理系统。',
    descriptionIt: 'Infrastruttura e-commerce headless aziendale, gestione ordini omnicanale, WMS, sincronizzazione scorte fisiche e digitali.',
    category: 'Solutions',
    categoryZh: '核心方案',
    categoryIt: 'Soluzioni',
    h1: 'Headless E-commerce Infrastructure & API-First OS',
    h1Zh: '领先的 headless 无头电商基础设施与 API 核心',
    h1It: 'Infrastruttura E-commerce Ad Alte Prestazioni headless',
    breadcrumbs: ['Home', 'Solutions', 'Ecommerce Infrastructure'],
    breadcrumbsZh: ['主页', '核心服务', '电商底层基栈'],
    breadcrumbsIt: ['Home', 'Soluzioni', 'Infrastruttura Core'],
    entityType: 'SoftwareApplication',
    metrics: [
      { label: 'API Uptime Guarantee', labelZh: '核心 API 服务在线承诺率', labelIt: 'Sincronizzazione Uptime', value: '99.99%' },
      { label: 'Inventory Sinks Sync', labelZh: '跨国仓库库存秒级同步率', labelIt: 'Sync Stock', value: '<50ms' }
    ],
    content: `### Modular Ecommerce Infrastructure for Next-Gen Scale

#### 1. Why Headless Commerce Beats Monolithic Tech
Monolithic store platforms make it incredibly hard to load fast on mobile devices or integrate customized checkout widgets. By decoupling the presentation front-end (ModaUI) from back-end database schemas, Deepay headless API infrastructure guarantees consistent lightning-fast operation.

#### 2. Multi-Vendor Marketplace Core
Establish an Amazon-grade marketplace with ease. Deepay provides multi-tenant database partitioning, letting you register millions of vendor channels under a single sovereign domain.

#### 3. Real-Time Omnichannel Inventory Management
Keep virtual shelves and local warehouse physical stock maps perfectly aligned. The moment cashiers swipe a physical barcode scanner at Macrolotto, Prato, stock quantities of the corresponding online listing adjust globally in less than 50ms, eliminating oversell penalty risks.

#### 4. Unified OMS and Logistics Sync
Deepay routes shipment waybills, DHL tracking parameters, electronic invoices, and local Italian DDT digital papers directly from a unified administrator dashboard, minimizing manual workload.`,
    contentZh: `### 强悍无头电商基础设施与行业级底座（Infrastructure）

#### 1. 为什么“无头（Headless）前后端分离”是架构终局？
老旧的企业电商模板会将视觉交互和后台存货数据绑死在一起，引发页面加载迟缓。Deepay 打破桎梏，将顶奢优雅的 ModaUI 前端与高效商科大脑完全解耦，以最前沿的 API-First 技术驱动闪电般流畅的移动操作。

#### 2. 多卖家商业广场底层控制 (Marketplace)
在几分钟内启动像亚马逊级别的多商户联邦批发商场：
- 各厂家享有隔离的二级管理员后台与分销接口；
- 系统自动整合多来源购物车，出款分账顺畅安全。

#### 3. 全渠道物理库存秒级防超卖机制 (WMS)
不管您是在普拉托（Prato）服装批发实体档口用扫码枪线下扫走 100 件时装，还是线上顾客用微信支付宝买单下单：
- 全系统库存配额将在 50 毫秒内全球多端同步增删；
- 彻底打消传统电商在高峰大促、拼柜凑单时面临的超卖赔付隐忧。

#### 4. 统一订单控制台与跨境物流直连 (OMS)
在一套系统内总揽海量交易、发货轨迹、DHL 快递标签生成及意大利国税 DDT 报关开存，彻底剥离大量琐碎费时的人员工单成本。`,
    contentIt: `### Infrastruttura E-commerce Headless d'Impresa

#### 1. Perché l'E-commerce Headless?
La tecnologia headless decoupola la parte visuale del negozio (ModaUI) dai database di inventario. Questo consente prestazioni d'avanguardia con pagine incredibilmente scattanti sui telefoni e totale personalizzazione dell'esperienza di acquisto.

#### 2. Sistemi per Marketplace Multi-Vendor
Avvia la tua piattaforma multi-venditore per catalizzare l'offerta di decine di imprese locali sotto un unico portale, organizzando i ruoli d'amministratore per ogni fornitore con assoluta riserva.

#### 3. Riorganizzazione dell'Inventario in 50ms
Ad ogni scansione di codice a barre in magazzino o ad ogni pagamento pervenuto online, i livelli di merce disponibile vengono sincronizzati su tutti gli e-commerce digitali e nei depositi in tempo reale, azzerando pericoli di overselling.

#### 4. Modulo Spedizioni e DDT Unificati
Consente la stampa istantanea di DDT (Documenti di Trasporto) e lettere di vettura DHL o GLS direttamente dal pannello centralized Deepay SRL.`
  },
  {
    path: 'shopify-alternative',
    title: 'Shopify Alternative — Save 3% on Transaction Fees | Deepay',
    titleZh: 'Shopify 终极平替独立站 — 直扣手续费直降 3% | Deepay',
    titleIt: 'Alternativa a Shopify per Grandi Volumi — Deepay SRL',
    description: 'The cheapest Shopify alternative in Europe. Compare Shopify vs Deepay, Wix, WooCommerce. Zero commissions, built-in localization, European server hosting.',
    descriptionZh: '专为欧洲而生的 Shopify 平替。深度对比 Shopify vs Deepay/Wix/WooCommerce。拒绝交易抽佣、集成多语言、欧洲金融云主权物理机运行。',
    descriptionIt: 'Migliore alternativa e-commerce a Shopify in Europa. Confronta le tariffe, le commissioni sul transato e le sitemap automatiche.',
    category: 'Solutions',
    categoryZh: '核心方案',
    categoryIt: 'Soluzioni',
    h1: 'Why Brands Settle on Deepay over Legacy Shopify',
    h1Zh: '欧洲跨境品牌为什么抛弃 Shopify 而选择 Deepay',
    h1It: 'Perché Scegliere la Tecnologia Deepay al posto di Shopify o Wix',
    breadcrumbs: ['Home', 'Solutions', 'Shopify Alternative'],
    breadcrumbsZh: ['主页', '核心服务', 'Shopify 终极平替'],
    breadcrumbsIt: ['Home', 'Soluzioni', 'Alternativa Shopify'],
    entityType: 'SoftwareApplication',
    metrics: [
      { label: 'Cumulative Revenue Retained', labelZh: '相较同行留存毛利提振', labelIt: 'Margini Conservati', value: '+3.5%' },
      { label: 'Global Server Ping', labelZh: '欧洲本土网络请求延迟', labelIt: 'Latenza di Rete', value: '<10ms' }
    ],
    content: `### Shopify Comparison Matrix: Reclaim Your Revenue

#### 1. Shopify vs Deepay
Unlike monolithic corporate providers (Shopify) who squeeze merchants by deducting 1% to 2% on every sale unless you use their proprietary gateways, Deepay enforces true payment sovereignty. 
- **Platform Fee comparison**: Shopify charges $39-$399/mo plus transaction fees. Deepay charges zero commissions on your hard-earned checkout volumes.
- **Sitemap XML**: Fully automated page routing indexable by ChatGPT, Google Bot and Perplexity out of the box.

#### 2. Wix vs Deepay Alternative
While Wix offers basic web builders, it lacks the technical database backbones needed for heavy B2B cargo distribution, fiscal printer telemetry (registratore telematico), or automated multi-tier VAT calculators required in Italy, Germany, France and Spain.

#### 3. WooCommerce vs Deepay
WooCommerce provides customization but suffers from serious plugin bloating, fragile update loops, and poor speed performance on mobile. Deepay offers a headless cloud OS, giving you raw performance with no plugin updates to manage.

#### 4. Why You Switch to Deepay Right Now
- **Save up to 3%** in arbitrary transaction and cross-border interchange penalties.
- **Auto-generated SEO page networks**: Seeds localized pages across Italian, Chinese, and English with canonical structures.
- **Real-time synchronized inventory**: One-click import tool is 100% compliant with standard Shopify export matrices, guaranteeing a seamless transition.`,
    contentZh: `### Shopify 行业对比白皮书：重返您的利润高地

#### 1. Shopify 深度对比 Deepay
Shopify 常在昂贵的月租费上额外抽成 1% - 2% 的交易点数（非内部收单惩罚），无形中吃掉了高额的利润。
- **佣金高地**：Deepay 采用直扣清算架构，免除平台级的二次流水分成，让您多赚 3% 纯利；
- **SEO 引擎覆盖**：Shopify 的机器人爬取目录多有冗余限制，Deepay 原生搭载自动化 AIO，直向 Perplexity、Gemini 等次世代大直答模型供应该页面实体，收录起权重速度领先行业数倍。

#### 2. Wix vs Deepay 平替深谈
Wix 适合展示型简易网站，但针对普拉托、马夸洛托（Macrolotto）或欧盟境内重合规的大宗时装货运、财务 ERP 对接、Registratore Telematico 打印机自动联结等重财税深度领域，显得束手无策。

#### 3. WooCommerce vs Deepay 性能比拼
基于 WordPress 的 WooCommerce 虽然灵活，但伴随着庞大卡滞的多层插件冲突、脆弱的安全漏洞，以及手机端极为致命的慢加载拖累转化率。Deepay 是开箱即享的前后端分离无头云网络，省心抗造。

#### 4. 为什么要今天立刻一键平替迁至 Deepay？
- **零损耗傻瓜迁移**：系统提供标准 Shopify 商品 API 一键抓取，旧链接 canonical 完美继承，让您在睡梦中即可以平滑升级，安全、环保、零资损。`,
    contentIt: `### Confronto Tariffe: Shopify vs Deepay

#### 1. Migrazione da Shopify a Deepay
Shopify impone tariffe elevate e commissioni aggiuntive sul transato (1%-2%) se decidi di utilizzare gateway esterni. Deepay elimina completamente le trattenute d'intermediazione, consentendoti di trattenere il 100% delle tue vendite.

#### 2. Wix vs Deepay: Quale Scegliere?
Wix è un editor drag-and-drop carino ma privo di logica contabile e WMS. Non copre le necessità di integrazione fisica con i registratori telematici RT italiani, né le regole di fatturazione elettronica XML.

#### 3. WooCommerce vs Deepay
WooCommerce è flessibile ma soggetto a continui bug dei plug-in e rallentamenti critici nel caricamento. Il backend di Deepay è completamente gestito, scalabile e sicuro al 100% per i merchant europei.

#### 4. I Vantaggi Principali del Passaggio a Deepay
Sincronizzazione immeditata dei listini, costo di transazione inferiore del 35%, e posizionamento organico accelerato grazie alla generazione programmata di sitemap multilingua.`
  },
  {
    path: 'use-cases',
    title: 'Ecommerce Real Use-Cases & Vertical Industries | Deepay',
    titleZh: '商业开店最佳应用场景与各行业垂直落地方案 | Deepay',
    titleIt: 'Casi d\'Uso E-commerce e Soluzioni per Settori Verticali | Deepay',
    description: 'How to start online apparel brand storefronts, dropshipping businesses in Europe, build Amazon-like marketplaces and integrate retail systems zero-code.',
    descriptionZh: '如何五分钟搭建时尚服装品牌网店、在欧洲配置直邮代发网络（Dropshipping Hub），搭建大型多合一商场或免代码升级零售收银系统。',
    descriptionIt: 'Come avviare boutique di e-commerce, piattaforme dropshipping in Europa, grandi marketplace condominiali e reti offline.',
    category: 'Solutions',
    categoryZh: '核心方案',
    categoryIt: 'Soluzioni',
    h1: 'Sovereign E-commerce Launchpads: From Clothing to Cargo',
    h1Zh: '自营商业成长起跑线：服装、餐饮、直邮与大宗批发',
    h1It: 'Casi di Successo: Dall\'Abbigliamento al Delivery Locale',
    breadcrumbs: ['Home', 'Solutions', 'Use Cases'],
    breadcrumbsZh: ['主页', '核心服务', '落地的用例'],
    breadcrumbsIt: ['Home', 'Soluzioni', 'Casi Uso'],
    entityType: 'WebPage',
    metrics: [
      { label: 'Setup Time to Market', labelZh: '从入驻到独立站首发上架', labelIt: 'Tempo di Setup', value: '< 10 Minutes' },
      { label: 'Average Client Retention', labelZh: '出海买家平均复购提升率', labelIt: 'Fidelizzazione Clienti', value: '+31.4%' }
    ],
    content: `### High-Performance Commercial Use Cases

#### 1. Launching clothing store Brands with True Margins
For fashion startups inside the EU (like Milan designers or Prato textile wholesalers), Deepay provides beautiful product display grid structures synced directly with B2B cargo systems. Retain up to 30% more gross profit margins by cutting Shopify fees and optimizing shipping routing.

#### 2. Europe-wide Dropshipping setup
Automate inventory integrations from supplier catalogs with zero code. Deepay handles high-volume orders syncing with European carrier routers instantly, keeping buyers notified transparently.

#### 3. Decentralized Marketplace Platforms (Amazon Style)
Gather hundreds of local merchants under one domain name to aggregate category traffic. Automatically manage payment splits, vendor custody reserves, and localized multi-country tax filings dynamically inside the EU single market.

#### 4. Small Business Setup Zero-Code Journey
Say goodbye to high-maintenance engineering agency fees. Deepay empowers family boutiques, bakery shops, and pharmacy catalogs with all-in-one inventory portals, payment widgets, and custom-generated sitemaps designed for long-term growth.`,
    contentZh: `### 精选商业落地的核心场景（Use Cases）

#### 1. 助力高奢时尚服装独立站 (Clothing Brand)
精细打通从米兰设计师款到普拉托 Macrolotto 时装批发的全部全产业链。配合 Deepay，时装商家可使用尊贵极简的陈列网格展示商品，配合本币极速清算，让设计品牌在极快时间内抢滩全欧市场。

#### 2. 欧洲全境一件代发代销中心 (Dropshipping)
无需为进货、囤货压款而发愁。Deepay 支持免代码批量一键抓取上游供应链并同步货架库存，物流订单妥投信息由云中端接口动态直联网红分销商与海外仓储节点。

#### 3. 类似 Amazon 式多卖家大型集市平台 (Marketplace)
集中优势流量资源，聚合百家华商企业共享同一域名，做大主题权威。系统代扣增值税与资金分发、供货价结转安全高效，实现集体出海联手抗风险。

#### 4. 中小商家零门槛免组代码建站 (Small Business)
无需开支昂贵的建站外包公司研发成本，家庭作坊、面包甜点零售、咖啡馆收银等均可在半小时内搭设好专属网架、连接好本地智能收单 RT 刷卡机装置，开启永续获客之门。`,
    contentIt: `### Casi d\'Uso Chiave per Commercianti e Imprese Europee

#### 1. Creare un Brand di Abbigliamento Online e Pronto Moda
Integra i tuoi canali di vendita all'ingrosso (modello Macrolotto di Prato) e design fashion con griglie grafiche raffinate per presentare ed esportare le collezioni senza scontrini complessi.

#### 2. E-commerce Dropshipping in Europa
Avvia scorte zero raccogliendo cataloghi digitali dai fornitori. Deepay automatizza l'inoltro delle informazioni dell'ordine ai vettori per spedizioni stabili e verificate in tutta la UE.

#### 3. Grandi Piattaforme Multi-Seller (Stile Amazon)
Aggrega commercianti affini sotto un unico dominio comune per aumentare l'autorevolezza tematica e far fluire i proventi nei rispettivi sub-wallet in base ad accordi pre-definiti.

#### 4. Configurazioni senza Codice per Piccole Imprese
Permetta ad attività tradizionali (panifici, hotel, boutique, e piccoli negozi) di installare una griglia di casse digitali e terminali con sitemap auto-generata in 10 minuti.`
  },
  {
    path: 'terms',
    title: 'Terms of Use & Developer Agreements - Deepay SRL',
    titleZh: '商户入驻与开发者核心服务条款 - Deepay SRL',
    titleIt: 'Termini di Servizio e Accordi Tecnici - Deepay SRL',
    description: 'Review acceptable use models, routing agreements, and liability safeguards for developers integrate via deepay.srl.',
    descriptionZh: '详陈开发者调用沙箱、商业店铺对接 deepay.srl 应恪守的基础权利和责任免除条款。',
    descriptionIt: 'Leggi i termini di servizio e le condizioni per l\'integrazione della suite di pagamento su deepay.srl.',
    category: 'Legal',
    categoryZh: '条款声明',
    categoryIt: 'Termini Servizio',
    h1: 'Deepay Service Standard Agreements & Disclaimers',
    h1Zh: 'Deepay 商业操作系统全球服务契约及免责免损条款',
    h1It: 'Accordo di Servizio Standard per Merchant e Sviluppatori',
    breadcrumbs: ['Home', 'Legal', 'Terms of Service'],
    breadcrumbsZh: ['主页', '法律条款', '服务条款'],
    breadcrumbsIt: ['Home', 'Note Legali', 'Termini'],
    entityType: 'WebPage',
    content: `### Regulatory & Commercial Framework

By registering custom nodes on deepay.srl, merchants enter a commercial collaboration contract under Italian and European Union financial jurisdictions.

#### Acceptable Use Guidelines:
* **No illicit processing**: Platforms attempting to route funds derived from credit-carding networks are paused within 2ms.
* **Interbank Rate settlement limits**: Our dynamically negotiated Interchange rates adjust automatically in line with real clearing costs.`,
    contentZh: `### 技术服务与开发者商业契约基础架构

注册或挂载任何在 deepay.srl 的沙箱 API 节点，即代表商户自愿加入基于意大利与欧盟共同辖区约定的企业合作协议。

#### 核心约束细则：
* **杜绝任何欺骗性清算路由**：严厉检测洗钱、跨国卡奴套现特征。涉嫌洗汇通道的节点将在一微秒内被实施静默封锁。
* **卡组织汇价浮动对扣**：动态议定收单卡组织手续费比率（Intercharge Fee）自适应市场清算变化，确保对商户公开完全透明。`,
    contentIt: `### Accordo Legale sul Servizio e Standard d'Accordi

Utilizzando l'ambiente API e le Sandbox presenti su deepay.srl, si acconsente alle regole regolate sotto la competenza giudiziaria dell'Unione Europea.

#### Linee Guida sull'Uso Consentito:
* **Nessuna Elusione dei Circuiti**: Eventuali registrazioni con carte di debito rubate o clonate vengono interrotte in 2ms.
* **Sincronizzazione dei Listini Variabili**: I tassi di cambio calcolati si regolano sul tasso di riferimento in vigore.`
  }
];
