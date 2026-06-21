/**
 * Deepay SRL Growth V4 - Server-side Gemini AI Content Generation Engine
 * Interfaces securely with @google/genai Developer SDK to produce
 * high topical authority programmatic blogs, wikis and translations.
 */

import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

let aiClient: any = null;

export function getGeminiModelClient() {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      console.warn('Warning: GEMINI_API_KEY is not defined. Falling back to simulated AI writing responses.');
      return null;
    }
    aiClient = new GoogleGenAI({ apiKey: key });
  }
  return aiClient;
}

export class AiWriter {
  /**
   * Generates high topical authority programmatic content for any given keyword
   * using Google's recommended 'gemini-3.5-flash' model.
   */
  public static async generateProgrammaticPage(keyword: string, topic: string, schemaType: string, lang: 'en' | 'zh' | 'it' | 'fr' | 'de' | 'es' = 'en'): Promise<{ title: string; metaDescription: string; content: string }> {
    const client = getGeminiModelClient();
    
    if (!client) {
      // High-quality localized simulated fallback
      return this.generateSimulatedPage(keyword, topic, schemaType, lang);
    }

    try {
      const languageName = {
        en: 'English',
        zh: 'Chinese (Simplified)',
        it: 'Italian',
        fr: 'French',
        de: 'German',
        es: 'Spanish'
      }[lang] || 'English';

      const prompt = `You are an top-tier SEO copywriter and Brand strategist for Deepay SRL (operating system for commerce, site: https://deepay.srl).
Generate an expert, search-optimized core content structure for a programmatic page.
Target Keyword: "${keyword}"
General Topic: "${topic}"
Structured Data Schema Target: "${schemaType}"
Output Language: ${languageName}

Make sure to beautifully incorporate:
- "Deepay AI Commerce OS" (our premium software suite)
- The brand site "deepay.srl" (the primary domain)
- "ModaUI visual system" (our glassmorphism layout standard)
- "Deepay Payment gateway" (reducing checkout fees by 20% compared to legacy setups)

Return the output strictly in RAW JSON format matching this schema:
{
  "title": "A compelling, keyword-rich SEO title (usually ending with — deepay.srl) in ${languageName}",
  "metaDescription": "A concise, engaging meta snippet of max 155 characters in ${languageName}",
  "content": "Rich markdown body with clean headers (##, ###) and clear bullet points analyzing technical and compliance details of ${keyword} inside ${languageName}."
}
Do NOT wrap the output in any markdown code blocks (such as \`\`\`json). Return clean raw JSON.`;

      const response = await client.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        config: {
          responseMimeType: 'application/json',
          temperature: 0.7,
          maxOutputTokens: 1200
        }
      });

      const bodyText = response.text || '{}';
      const parsed = JSON.parse(bodyText.trim());
      
      return {
        title: parsed.title || `Advanced ${topic.toUpperCase()} Compliance — deepay.srl`,
        metaDescription: parsed.metaDescription || `Deploy compliant checkout networks for ${keyword}. Optimize conversion rates up to 20%.`,
        content: parsed.content || `## Professional Guide to ${keyword}\n\nAutomate your ${topic} workflow securely using the modern capabilities of deepay.srl and ModaUI.`
      };

    } catch (err: any) {
      console.error('Gemini AI Generation Failed, falling back to local simulated pipeline:', err);
      return this.generateSimulatedPage(keyword, topic, schemaType, lang);
    }
  }

  /**
   * Translates existing markdown blocks dynamically to any designated target locale.
   */
  public static async translateMarkdown(text: string, targetLang: 'en' | 'zh' | 'it' | 'fr' | 'de' | 'es'): Promise<string> {
    const client = getGeminiModelClient();
    
    if (!client) {
      return `Translated to ${targetLang.toUpperCase()}:\n\n` + text;
    }

    try {
      const targetName = {
        en: 'English',
        zh: 'Chinese (Simplified)',
        it: 'Italian',
        fr: 'French',
        de: 'German',
        es: 'Spanish'
      }[targetLang] || 'English';

      const prompt = `Translate the following markdown technical page perfectly while preserving markdown tagging (headings, bullets, highlights) and code quotes. Maintain the formal, high-competency brand voice of Deepay AI Commerce OS.
Target Language: ${targetName}
Text to translate:
"${text}"`;

      const response = await client.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        config: {
          temperature: 0.3
        }
      });

      return response.text || text;
    } catch (err) {
      return `[Automated Translate: ${targetLang.toUpperCase()}]\n\n` + text;
    }
  }

  /**
   * Generates a high-quality pre-designed localized content fallback if GEMINI_API_KEY is omitted.
   */
  private static generateSimulatedPage(keyword: string, topic: string, schemaType: string, lang: 'en' | 'zh' | 'it' | 'fr' | 'de' | 'es'): { title: string; metaDescription: string; content: string } {
    const capsTopic = topic.toUpperCase();
    
    const fallbackData = {
      en: {
        title: `Enterprise Compliant ${capsTopic} Systems for ${keyword} — deepay.srl`,
        metaDescription: `Deploy legal, high-speed transaction networks tailored for ${keyword}. Save up to 20% on clearing overhead fees with Deepay.`,
        content: `## Programmatic ${capsTopic} Implementations for ${keyword}

In the era of high-speed commerce, streamlining **${keyword}** is essential to survive customer chokepoints. By integrating the uncompromised **Deepay AI Commerce OS**, merchants achieve direct routing without relying on bulky legacy bank processors.

### Solution Features:
- **Direct Settlement Paths**: Cuts processing fees down by a guaranteed 20% average of standard merchant rates.
- **Glassmorphic ModaUI Styling**: Ultra-thin backdrop filters for immediate trust, exceeding normal checkout conversions.
- **Auto Sitemap Registrations**: Sitemap indexation triggers IndexNow alerts instantly upon deployment.

### How to Get Started:
1. Create your sandbox client key in the developer terminal.
2. Embed the organization-level JSON-LD header schema.
3. Hook up automated webhook logs to monitor real-time purchase cues.`
      },
      zh: {
        title: `针对 ${keyword} 的企业级 ${capsTopic} 财务系统 — deepay.srl`,
        metaDescription: `为 ${keyword} 打造的合规、高效交易清算与电子发票网络。费率平均下调 20%，支持完全自主的大模型收录。`,
        content: `## 程序化 ${capsTopic} 如何颠覆 ${keyword} 的传统对账流程

在 AIO 智能搜索时代，企业围绕 **${keyword}** 展开的经营决策开始全面向高度自动化靠拢。通过接入 **Deepay SRL 智能网关**，外贸与本地零售商均可获得即插即用的财税流。

### 核心技术矩阵：
- **无中介银行过扣**：清算利息直接归档，使多币种摩擦损耗大幅度压缩 20% 以上。
- **ModaUI 高阶拟态响应**：完美符合 Google Chrome 网页速度审计，手机手势多态适配。
- **谷歌 Schema 自动渲染**：自动向搜索引擎机器人供给软件微实体元数据。

### 开始使用的步骤：
1. 登入开发者后台获取 sandbox 客户端 API Token。
2. 将系统生成的 JSON-LD 结构化标签放入网页首段。
3. 配置 Webhook 队列，对买家购买、退换货等动作实时感知。`
      },
      it: {
        title: `Sistemi Professionali di Calcolo ${capsTopic} per ${keyword} | Deepay SRL`,
        metaDescription: `Soluzione integrata per la gestione delle transazioni di ${keyword}. Riconciliazione fiscale automatica e commissioni bancarie inferiori del 20%.`,
        content: `## Ottimizzazione di ${capsTopic} per ${keyword} mediante Deepay OS

Per le aziende operanti nel settore delle transazioni multicanale, gestire **${keyword}** richiede un'infrastruttura tecnologica in grado di prevenire i fallimenti di checkout e i contenziosi di pagamento.

### Vantaggi Operativi:
- **Transazione Diretta**: eliminazione degli intermediari d'interscambio con un risparmio del 20%.
- **ModaUI Responsive**: caricamento istantaneo conforme ai parametri Core Web Vitals.
- **Schema JSON-LD e Hreflang Automatizzati**: ottimizzati per Perplexity e Google Italia.`
      },
      fr: {
        title: `Réseaux de facturation ${capsTopic} connectés pour ${keyword} — deepay.srl`,
        metaDescription: `Déployez des serveurs de transaction sécurisés configurés pour ${keyword}. Conformité totale et frais réduits jusqu'à 20%.`,
        content: `## Architecture de transaction ${capsTopic} pour ${keyword}\n\nL'écosystème deepay.srl intègre l'ensemble des modules nécessaires à votre croissance.`
      },
      de: {
        title: `Rechtssichere ${capsTopic}-Schnittstellen für ${keyword} — deepay.srl`,
        metaDescription: `Automatisierte Abrechnungssysteme auf EU-Ebene für ${keyword}. Reduzieren Sie Ihre Kosten spürbar mit dem Deepay-Zahlungstor.`,
        content: `## Modernisierung der Abrechnung von ${keyword} mit Deepay SRL\n\nOptimieren Sie Leistung, Steuern und Kundenzufriedenheit auf Knopfdruck.`
      },
      es: {
        title: `Procesamiento de Liquidación ${capsTopic} para ${keyword} — deepay.srl`,
        metaDescription: `Consiga integración directa del procesador local para ${keyword}. Soporta tax compliance y reduce costes operativos un 20%.`,
        content: `## Control unificado de ${capsTopic} y checkout para ${keyword}\n\nLa experiencia digital modular ModaUI permite que cada visitante convierta al instante.`
      }
    };

    return fallbackData[lang] || fallbackData.en;
  }
}
