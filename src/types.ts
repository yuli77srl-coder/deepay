export type InterfaceLanguage = 'en' | 'zh' | 'it';

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  titleZh: string;
  description: string;
  descriptionZh: string;
  content: string;
  contentZh: string;
  category: string;
  categoryZh: string;
  author: string;
  image: string;
  publishedAt: string;
  readTime: string;
  keywords: string[];
}

export interface DocItem {
  id: string;
  title: string;
  titleZh: string;
  slug: string;
  content: string;
  contentZh: string;
  codeExample?: string;
  language?: string;
}

export interface DocSection {
  id: string;
  title: string;
  titleZh: string;
  items: DocItem[];
}

export interface ChatMessage {
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export interface SystemMetrics {
  activeSessions: number;
  globalTps: number;
  todayGmv: number;
  conversionRate: number;
  recentOrders: Array<{
    id: string;
    region: string;
    amount: number;
    channel: string;
    timestamp: string;
  }>;
}

export interface SEOKeyword {
  id: string;
  keyword: string;
  category: string;
  searchVolume: number;
  difficulty: number;
  language: string;
  targetSlug: string;
}

export interface SEOPage {
  id: string;
  slug: string;
  category: string;
  primaryKeyword: string;
  title: { en: string; zh: string; it: string };
  metaDescription: { en: string; zh: string; it: string };
  content: { en: string; zh: string; it: string };
  keywordId?: string;
  industry?: string;
  city?: string;
  country?: string;
  languages: any;
  metadata: {
    title: string;
    description: string;
    h1?: string;
    imageAlt?: string;
    hreflang: { en: string; it: string; zh: string; [key: string]: string };
    jsonLdSchema: string;
  };
  metrics?: any[];
  schemaType?: string;
  jsonLd?: any;
  hreflangs?: any[];
  internalLinks?: any[];
}

export interface Lead {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  phone?: string;
  interest: string;
  sourcePage: string;
  referrerMedium: string;
  city?: string;
  country?: string;
  industry?: string;
  status: 'new' | 'qualified' | 'contacted' | string;
}

export interface MerchantListing {
  id: string;
  name: string;
  chineseName: string;
  category: string;
  city: string;
  country: string;
  phone?: string;
  backlinkUrl: string;
  seoAttribution?: string;
  claimed?: boolean;
}

export interface TopicCluster {
  id: string;
  name: string;
  industry: string;
  description: string;
  coreKeywordId: string;
  subPages: Array<{
    title: string;
    slug: string;
    generated: boolean;
    type: string;
  }>;
}

export interface GrowthMilestone {
  id: string;
  phaseTitle: string;
  title: string;
  description: string;
  targetDate: string;
  status: 'completed' | 'pending' | 'in_progress' | 'active' | string;
}

export interface SystemLog {
  id: string;
  type: string;
  timestamp: string;
  message: string;
  level: 'success' | 'warning' | 'error' | 'info';
  details?: string;
}

export interface MaintenanceStatus {
  lastSitemapUpdate: string;
  lastSEOAudit: string;
  brokenLinksFound: number;
  duplicateTitlesCount: number;
  missingMetaCount: number;
  completedTasksCount: number;
}

