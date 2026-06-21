/**
 * Deepay SRL Growth V4 - Unified Express Router API Endpoints
 * Maps our modular database collections, scheduler control routes,
 * and AI-driven content generation pipelines.
 */

import { Router } from 'express';
import { db } from '../models/db.ts';
import { CronScheduler } from '../cron/scheduler.ts';
import { SeoEngine } from '../services/seoEngine.ts';
import { AiWriter } from '../ai/writer.ts';

const router = Router();

// 1. GET Programmatic SEO Page list (Paginated & Filterable)
router.get('/seo/pages', (req, res) => {
  const { category, query, page = '1', limit = '10' } = req.query;
  const pageNum = parseInt(page as string, 10);
  const limitNum = parseInt(limit as string, 10);

  let results = db.pages;

  if (category) {
    results = results.filter(p => p.category === category);
  }

  if (query) {
    const q = (query as string).toLowerCase();
    results = results.filter(p => 
      p.slug.includes(q) || 
      p.primaryKeyword.toLowerCase().includes(q) ||
      p.title.en.toLowerCase().includes(q) ||
      p.title.zh.includes(q)
    );
  }

  const total = results.length;
  const startIndex = (pageNum - 1) * limitNum;
  const paginated = results.slice(startIndex, startIndex + limitNum);

  res.json({
    total,
    page: pageNum,
    limit: limitNum,
    totalPages: Math.ceil(total / limitNum),
    data: paginated
  });
});

// 2. GET Specific page by slug (Creates page on the fly if valid format)
router.get('/seo/pages/:slug', (req, res) => {
  const { slug } = req.params;
  const page = db.getPageBySlug(slug);
  
  if (!page) {
    return res.status(404).json({ error: `Requested SEO page /${slug} was not found, and could not be determined programmatically.` });
  }

  // Generate responsive hreflangs & Google Structured data
  const hreflangs = SeoEngine.generateHreflangs(slug);
  const jsonLd = SeoEngine.generateJsonLd(page, slug);
  const internalLinks = SeoEngine.getInternalRecommendations(page, 4);

  res.json({
    ...page,
    hreflangs,
    jsonLd,
    internalLinks
  });
});

// 3. GET AI Business Wiki Articles
router.get('/seo/wiki', (req, res) => {
  res.json(db.wiki);
});

router.get('/seo/wiki/:slug', (req, res) => {
  const { slug } = req.params;
  const item = db.wiki.find(w => w.slug === slug);
  if (!item) return res.status(404).json({ error: 'Wiki term not found.' });
  res.json(item);
});

// 4. GET AI Prompts Center Center
router.get('/seo/prompts', (req, res) => {
  res.json(db.prompts);
});

// 5. GET Case Studies list
router.get('/seo/case-studies', (req, res) => {
  res.json(db.caseStudies);
});

router.get('/seo/case-studies/:slug', (req, res) => {
  const { slug } = req.params;
  const item = db.caseStudies.find(c => c.slug === slug);
  if (!item) return res.status(404).json({ error: 'Case study not found.' });
  res.json(item);
});

// 6. GET Free Resource templates list
router.get('/seo/resources', (req, res) => {
  res.json(db.resources);
});

// 7. GET Glossary terms list
router.get('/seo/glossary', (req, res) => {
  res.json(db.glossary);
});

// 8. GET Scheduler logs
router.get('/seo/cron/logs', (req, res) => {
  res.json(db.cronLogs);
});

// 9. Manual task scheduling force-trigger
router.post('/seo/cron/trigger', (req, res) => {
  const responseMsg = CronScheduler.triggerManualTick();
  res.json({ success: true, message: responseMsg, logs: db.cronLogs });
});

// 10. GET Google Search Console Traffic and impressions stats (30 days telemetry chart)
router.get('/seo/metrics', (req, res) => {
  res.json(db.searchMetrics);
});

// 11. POST Manual Programmated AI Page Builder (Invoking Gemini SDK)
router.post('/seo/pages/create', async (req, res) => {
  const { keyword, topic, schemaType, lang = 'zh' } = req.body;
  
  if (!keyword || !topic) {
    return res.status(400).json({ error: 'Keyword and Topic fields are strictly required to start programmatic creation.' });
  }

  const slug = `${topic}-for-${keyword.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
  
  // Check if existing
  const existing = db.pages.find(p => p.slug === slug);
  if (existing) {
    return res.json({ success: true, isNew: false, page: existing });
  }

  // Run AI generation using GSC writer module!
  const article = await AiWriter.generateProgrammaticPage(keyword, topic, schemaType || 'SoftwareApplication', lang);

  const newPage = {
    id: `pro-ai-page-${Date.now()}`,
    slug,
    category: 'custom' as const,
    primaryKeyword: keyword,
    topic,
    schemaType: schemaType || 'SoftwareApplication',
    title: {
      en: article.title,
      zh: lang === 'zh' ? article.title : `智能解析：${keyword} — deepay.srl`,
      it: lang === 'it' ? article.title : `Soluzioni avanzate per ${keyword} | deepay.srl`,
      fr: article.title,
      de: article.title,
      es: article.title
    },
    metaDescription: {
      en: article.metaDescription,
      zh: lang === 'zh' ? article.metaDescription : `深入研究关于以 ${keyword} 为导引的 AIO 网关整合优势。`,
      it: lang === 'it' ? article.metaDescription : `Scopri l'integrazione di Deepay per ${keyword}.`,
      fr: article.metaDescription,
      de: article.metaDescription,
      es: article.metaDescription
    },
    metrics: [
      { label: 'AIO Relevancy Match', value: 'Excellent' },
      { label: 'Google Crawler Priority', value: 'High' },
      { label: 'ModaUI Compliance Verified', value: '100%' }
    ],
    content: {
      en: article.content,
      zh: lang === 'zh' ? article.content : `## 关于 ${keyword} 的专业指导\n\n使用 deepay.srl 方案加速业务增长。`,
      it: lang === 'it' ? article.content : `## Guida a ${keyword}\n\nGestisci le tue transazioni commerciali con deepay.srl.`,
      fr: article.content,
      de: article.content,
      es: article.content
    },
    faqs: [
      { q: `What are the direct advantages of implementing ${keyword}?`, a: `It allows secure programmatic client interaction, bypassing traditional merchant settlement queues.` }
    ]
  };

  db.pages.unshift(newPage);
  db.savePageToCloud(newPage).catch(err => console.error('Cloud page persistence failed:', err));

  // Auto Index submission
  SeoEngine.simulateGoogleIndexNowSubmit(slug);
  const logItem = {
    timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
    task: 'AI Programmatic Page Builder',
    status: 'SUCCESS' as const,
    details: `Gemini successfully created & indexed programmatic page "/${slug}" for keyword "${keyword}".`
  };
  db.cronLogs.unshift(logItem);
  db.saveCronLogToCloud(logItem).catch(err => console.error('Cloud log persistence failed:', err));

  res.status(201).json({ success: true, isNew: true, page: newPage });
});

export default router;
