import fs from 'fs';
import path from 'path';
import { BLOG_ARTICLES } from '../src/data/blogArticles';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PUBLIC_DIR = path.resolve(__dirname, '../public');
const BLOG_DIR = path.resolve(PUBLIC_DIR, 'blog');

// Ensure target directories exist
[BLOG_DIR, path.resolve(PUBLIC_DIR, 'privacy'), path.resolve(PUBLIC_DIR, 'terms'), path.resolve(PUBLIC_DIR, 'about'), path.resolve(PUBLIC_DIR, 'contact')].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

const COMMON_HEAD_TAGS = `
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="theme-color" content="#e11d48" />
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
  <meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
  <meta name="bingbot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
  <meta name="google-site-verification" content="google0cc72dfb11e39ef0" />
  <meta name="google-adsense-account" content="ca-pub-7658190454263901" />
  <link rel="icon" type="image/svg+xml" href="/icon.svg" />
  <link rel="apple-touch-icon" href="/icon.svg" />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Outfit:wght@600;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@600;700&display=swap">
`;

const COMMON_CSS = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    background-color: #020617;
    color: #e2e8f0;
    font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    line-height: 1.7;
    font-size: 16px;
    -webkit-font-smoothing: antialiased;
  }
  h1, h2, h3, h4, .font-heading {
    font-family: 'Outfit', sans-serif;
    color: #ffffff;
    line-height: 1.25;
  }
  .font-mono {
    font-family: 'JetBrains Mono', monospace;
  }
  a { color: inherit; text-decoration: none; }
  .container {
    max-width: 860px;
    margin: 0 auto;
    padding: 24px 20px 80px 20px;
  }
  .nav-bar {
    border-bottom: 1px solid #1e293b;
    background: rgba(2, 6, 23, 0.94);
    backdrop-filter: blur(12px);
    position: sticky;
    top: 0;
    z-index: 50;
  }
  .nav-container {
    max-width: 1040px;
    margin: 0 auto;
    padding: 14px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .nav-logo {
    font-size: 1.15rem;
    font-weight: 900;
    background: linear-gradient(to right, #fbbf24, #f43f5e, #ec4899);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .nav-tag {
    font-size: 9px;
    padding: 2px 6px;
    background: rgba(225, 29, 72, 0.2);
    border: 1px solid rgba(244, 63, 94, 0.4);
    color: #fb7185;
    border-radius: 9999px;
    font-weight: 800;
    text-transform: uppercase;
    -webkit-text-fill-color: #fb7185;
  }
  .nav-play-btn {
    background: linear-gradient(135deg, #e11d48, #d97706);
    color: #ffffff;
    padding: 8px 16px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: 800;
    box-shadow: 0 4px 14px rgba(225, 29, 72, 0.35);
    transition: transform 0.15s ease;
  }
  .nav-play-btn:hover {
    transform: scale(1.04);
  }
  .breadcrumbs {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 12px;
    color: #94a3b8;
    margin-bottom: 24px;
    flex-wrap: wrap;
  }
  .breadcrumbs a:hover { color: #f43f5e; }
  .badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 12px;
    border-radius: 9999px;
    font-size: 11px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    background: rgba(244, 63, 94, 0.15);
    border: 1px solid rgba(244, 63, 94, 0.35);
    color: #fda4af;
    margin-bottom: 16px;
  }
  .card-box {
    background: #0f172a;
    border: 1px solid #1e293b;
    border-radius: 20px;
    padding: 24px;
    margin-bottom: 24px;
  }
  footer {
    border-top: 1px solid #1e293b;
    margin-top: 60px;
    padding: 30px 20px;
    text-align: center;
    font-size: 12px;
    color: #64748b;
  }
  .footer-links {
    display: flex;
    justify-content: center;
    gap: 16px;
    margin-top: 10px;
    flex-wrap: wrap;
  }
  .footer-links a:hover { color: #f43f5e; }
`;

// =========================================================================
// 1. GENERATE INDIVIDUAL BLOG POSTS
// =========================================================================
for (const article of BLOG_ARTICLES) {
  const canonicalUrl = `https://smashchill.online/blog/${article.slug}`;
  const keywords = [
    ...article.tags,
    'smash and chill',
    'smashchill',
    'smash chill',
    'free online arcade games',
    'stress relief mini games',
    'clinical micro breaks',
    'anti stress games online',
  ].join(', ');

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
    headline: article.title,
    description: article.summary,
    image: 'https://smashchill.online/icon.svg',
    author: {
      '@type': 'Person',
      name: article.author.name,
      jobTitle: article.author.role,
    },
    publisher: {
      '@type': 'Organization',
      name: 'SmashChill Interactive Studio',
      logo: {
        '@type': 'ImageObject',
        url: 'https://smashchill.online/icon.svg',
      },
    },
    datePublished: '2026-11-01T08:00:00+00:00',
    dateModified: '2026-11-06T08:00:00+00:00',
    keywords: article.tags.join(', '),
    articleSection: article.category,
    wordCount: article.content.reduce((acc, c) => acc + c.body.join(' ').split(' ').length, 0),
    isPartOf: {
      '@type': 'Blog',
      name: 'SmashChill Wellness & Neurobiology Library',
      url: 'https://smashchill.online/blog',
    },
  };

  const breadcrumbsLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://smashchill.online/',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Wellness Blog',
        item: 'https://smashchill.online/blog',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: article.title,
        item: canonicalUrl,
      },
    ],
  };

  const relatedArticles = BLOG_ARTICLES.filter((a) => a.id !== article.id).slice(0, 3);

  const html = `<!doctype html>
<html lang="en">
<head>
  ${COMMON_HEAD_TAGS}
  <title>${escapeHtml(article.title)} | Smash and Chill Research</title>
  <meta name="description" content="${escapeHtml(article.summary)}" />
  <meta name="keywords" content="${escapeHtml(keywords)}" />
  <link rel="canonical" href="${canonicalUrl}" />

  <!-- OpenGraph Social Cards -->
  <meta property="og:type" content="article" />
  <meta property="og:site_name" content="Smash and Chill" />
  <meta property="og:url" content="${canonicalUrl}" />
  <meta property="og:title" content="${escapeHtml(article.title)}" />
  <meta property="og:description" content="${escapeHtml(article.summary)}" />
  <meta property="og:image" content="https://smashchill.online/icon.svg" />
  <meta property="article:published_time" content="2026-11-01T08:00:00+00:00" />
  <meta property="article:modified_time" content="2026-11-06T08:00:00+00:00" />
  <meta property="article:section" content="${escapeHtml(article.category)}" />

  <!-- Twitter Cards -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@SmashChillGame" />
  <meta name="twitter:url" content="${canonicalUrl}" />
  <meta name="twitter:title" content="${escapeHtml(article.title)}" />
  <meta name="twitter:description" content="${escapeHtml(article.summary)}" />
  <meta name="twitter:image" content="https://smashchill.online/icon.svg" />

  <!-- Structured Data JSON-LD -->
  <script type="application/ld+json">
  ${JSON.stringify(jsonLd, null, 2)}
  </script>
  <script type="application/ld+json">
  ${JSON.stringify(breadcrumbsLd, null, 2)}
  </script>

  <style>
    ${COMMON_CSS}
    .article-title {
      font-size: 2.1rem;
      font-weight: 900;
      letter-spacing: -0.02em;
      margin-bottom: 16px;
    }
    @media (min-width: 640px) {
      .article-title { font-size: 2.6rem; }
    }
    .article-subtitle {
      font-size: 1.12rem;
      color: #cbd5e1;
      margin-bottom: 24px;
      font-weight: 500;
    }
    .author-card {
      display: flex;
      align-items: center;
      gap: 14px;
      padding: 16px;
      background: #0f172a;
      border: 1px solid #1e293b;
      border-radius: 16px;
      margin-bottom: 32px;
    }
    .author-avatar {
      width: 44px;
      height: 44px;
      border-radius: 12px;
      background: #1e293b;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 22px;
      flex-shrink: 0;
    }
    .author-meta { font-size: 12px; color: #94a3b8; }
    .author-name { font-size: 14px; font-weight: 800; color: #ffffff; }

    .takeaways-box {
      background: linear-gradient(135deg, rgba(15, 23, 42, 0.9), rgba(30, 41, 59, 0.5));
      border: 1px solid rgba(244, 63, 94, 0.3);
      border-radius: 20px;
      padding: 24px;
      margin-bottom: 36px;
    }
    .takeaways-title {
      font-size: 14px;
      font-weight: 900;
      color: #fbbf24;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 14px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .takeaways-list {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .takeaways-list li {
      position: relative;
      padding-left: 24px;
      font-size: 14px;
      color: #e2e8f0;
    }
    .takeaways-list li::before {
      content: '✔';
      position: absolute;
      left: 0;
      color: #34d399;
      font-weight: bold;
    }

    .game-cta {
      background: linear-gradient(135deg, #1e1b4b, #0f172a);
      border: 2px solid #6366f1;
      border-radius: 20px;
      padding: 22px;
      display: flex;
      flex-direction: column;
      gap: 14px;
      align-items: flex-start;
      margin-bottom: 40px;
    }
    @media (min-width: 640px) {
      .game-cta {
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
      }
    }
    .game-cta-info {
      display: flex;
      align-items: center;
      gap: 14px;
    }
    .game-cta-icon {
      font-size: 36px;
      background: rgba(99, 102, 241, 0.2);
      width: 58px;
      height: 58px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 16px;
      flex-shrink: 0;
    }
    .game-cta-btn {
      background: linear-gradient(135deg, #4f46e5, #7c3aed);
      color: #ffffff;
      padding: 12px 24px;
      border-radius: 14px;
      font-size: 14px;
      font-weight: 900;
      box-shadow: 0 4px 20px rgba(79, 70, 229, 0.4);
      display: inline-flex;
      align-items: center;
      gap: 8px;
      white-space: nowrap;
      transition: transform 0.15s ease;
    }
    .game-cta-btn:hover { transform: scale(1.05); }

    .article-body h2 {
      font-size: 1.45rem;
      font-weight: 800;
      margin: 36px 0 16px 0;
      color: #f8fafc;
      border-left: 4px solid #f43f5e;
      padding-left: 12px;
    }
    .article-body p {
      font-size: 1.02rem;
      color: #cbd5e1;
      margin-bottom: 20px;
      line-height: 1.85;
    }

    .citations-box {
      margin-top: 48px;
      padding: 24px;
      background: #0f172a;
      border-radius: 18px;
      border: 1px solid #1e293b;
    }
    .citations-title {
      font-size: 13px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #94a3b8;
      margin-bottom: 12px;
    }
    .citations-list {
      list-style: decimal;
      padding-left: 20px;
      font-size: 12px;
      color: #94a3b8;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .disclaimer-box {
      margin-top: 24px;
      padding: 16px;
      background: rgba(30, 41, 59, 0.4);
      border-radius: 12px;
      font-size: 11px;
      color: #64748b;
      line-height: 1.6;
    }

    .related-section {
      margin-top: 56px;
      border-top: 1px solid #1e293b;
      padding-top: 40px;
    }
    .related-heading {
      font-size: 1.3rem;
      font-weight: 800;
      margin-bottom: 20px;
    }
    .related-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 16px;
    }
    @media (min-width: 640px) {
      .related-grid { grid-template-columns: repeat(3, 1fr); }
    }
    .related-card {
      background: #0f172a;
      border: 1px solid #1e293b;
      border-radius: 16px;
      padding: 18px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      transition: all 0.2s ease;
    }
    .related-card:hover {
      border-color: #f43f5e;
      transform: translateY(-2px);
    }
    .related-card h3 {
      font-size: 14px;
      font-weight: 800;
      line-height: 1.4;
      margin-bottom: 8px;
    }
    .related-card p {
      font-size: 12px;
      color: #94a3b8;
      line-height: 1.5;
    }
  </style>
</head>
<body>

  <header class="nav-bar">
    <div class="nav-container">
      <a href="https://smashchill.online/" class="nav-logo" aria-label="Smash and Chill Homepage">
        <span>⚡ SMASH &amp; CHILL</span>
        <span class="nav-tag">PRO</span>
      </a>
      <a href="https://smashchill.online/#${article.recommendedGame.mode}" class="nav-play-btn">
        <span>Play ${escapeHtml(article.recommendedGame.label)} ▶</span>
      </a>
    </div>
  </header>

  <main class="container">
    <nav class="breadcrumbs" aria-label="Breadcrumb">
      <a href="https://smashchill.online/">Home</a>
      <span>/</span>
      <a href="https://smashchill.online/blog">Wellness Blog</a>
      <span>/</span>
      <span style="color: #cbd5e1;">${escapeHtml(article.category)}</span>
    </nav>

    <article>
      <header>
        <span class="badge">${escapeHtml(article.category)} · ${escapeHtml(article.readTime)}</span>
        <h1 class="article-title">${escapeHtml(article.title)}</h1>
        <p class="article-subtitle">${escapeHtml(article.subtitle)}</p>

        <div class="author-card">
          <div class="author-avatar">${article.author.avatar}</div>
          <div>
            <div class="author-name">${escapeHtml(article.author.name)}</div>
            <div class="author-meta">${escapeHtml(article.author.role)} · Published ${escapeHtml(article.publishDate)} · Peer-Reviewed</div>
          </div>
        </div>
      </header>

      <aside class="takeaways-box" aria-label="Clinical Summary and Key Takeaways">
        <div class="takeaways-title">
          <span>🧠</span>
          <span>Executive Clinical Takeaways</span>
        </div>
        <ul class="takeaways-list">
          ${article.keyTakeaways.map((point) => `<li>${escapeHtml(point)}</li>`).join('\n          ')}
        </ul>
      </aside>

      <section class="game-cta">
        <div class="game-cta-info">
          <div class="game-cta-icon">${article.recommendedGame.icon}</div>
          <div>
            <h3 style="font-size: 16px; font-weight: 800; color: #ffffff;">Prescribed Micro-Break: ${escapeHtml(article.recommendedGame.label)}</h3>
            <p style="font-size: 13px; color: #cbd5e1; margin-top: 2px;">${escapeHtml(article.recommendedGame.actionPrompt)}</p>
          </div>
        </div>
        <a href="https://smashchill.online/#${article.recommendedGame.mode}" class="game-cta-btn">
          <span>Play Now Free</span>
          <span>⚡</span>
        </a>
      </section>

      <div class="article-body">
        ${article.content
          .map(
            (sec) => `
        <section>
          <h2>${escapeHtml(sec.sectionHeading)}</h2>
          ${sec.body.map((p) => `<p>${escapeHtml(p)}</p>`).join('\n          ')}
        </section>`
          )
          .join('\n')}
      </div>

      <footer class="citations-box">
        <h3 class="citations-title">Scientific References &amp; Clinical Citations</h3>
        <ol class="citations-list">
          ${article.scientificCitations.map((cite) => `<li>${escapeHtml(cite)}</li>`).join('\n          ')}
        </ol>
      </footer>

      <div class="disclaimer-box">
        <strong>Editorial &amp; Medical Disclaimer:</strong> Smash and Chill articles provide peer-reviewed psychological and ergonomic education regarding stress management and micro-breaks. Interactive casual games are intended for general relaxation and cognitive decompression. They do not constitute a substitute for clinical psychiatric care or professional medical diagnosis.
      </div>
    </article>

    <section class="related-section" aria-label="Related Clinical Research">
      <h2 class="related-heading">Related Clinical Guides &amp; Protocols</h2>
      <div class="related-grid">
        ${relatedArticles
          .map(
            (rel) => `
        <a href="https://smashchill.online/blog/${rel.slug}" class="related-card">
          <div>
            <span style="font-size: 10px; font-weight: 800; text-transform: uppercase; color: #fb7185; margin-bottom: 6px; display: inline-block;">${escapeHtml(rel.category)}</span>
            <h3>${escapeHtml(rel.title)}</h3>
            <p>${escapeHtml(rel.summary.slice(0, 110))}...</p>
          </div>
          <div style="font-size: 11px; font-weight: 800; color: #38bdf8; margin-top: 12px; display: flex; align-items: center; gap: 4px;">
            <span>Read Guide</span>
            <span>→</span>
          </div>
        </a>`
          )
          .join('\n')}
      </div>
    </section>
  </main>

  <footer>
    <p>© 2026 Smash and Chill Interactive Studio · smashchill.online · All rights reserved.</p>
    <div class="footer-links">
      <a href="https://smashchill.online/">All 15 Free Arcade Games</a>
      <a href="https://smashchill.online/blog">Wellness Blog</a>
      <a href="https://smashchill.online/privacy">Privacy Policy</a>
      <a href="https://smashchill.online/terms">Terms of Service</a>
      <a href="https://smashchill.online/about">About Us</a>
      <a href="https://smashchill.online/contact">Contact Support</a>
    </div>
  </footer>

</body>
</html>
`;

  // Write file
  fs.writeFileSync(path.join(BLOG_DIR, `${article.slug}.html`), html, 'utf-8');
  const slugDir = path.join(BLOG_DIR, article.slug);
  if (!fs.existsSync(slugDir)) {
    fs.mkdirSync(slugDir, { recursive: true });
  }
  fs.writeFileSync(path.join(slugDir, 'index.html'), html, 'utf-8');
  console.log(`Generated: /blog/${article.slug}`);
}

// =========================================================================
// 2. GENERATE BLOG CATALOG / ARCHIVE HUB (/blog)
// =========================================================================
const blogHubJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Smash and Chill Wellness & Neurobiology Blog',
  description: 'Evidence-based clinical guides on stress reduction, dopamine regulation, ergonomic micro-breaks, ASMR acoustic psychology, and neurodivergent focus routines.',
  url: 'https://smashchill.online/blog',
  publisher: {
    '@type': 'Organization',
    name: 'SmashChill Interactive Studio',
    url: 'https://smashchill.online/',
    logo: 'https://smashchill.online/icon.svg',
  },
  hasPart: BLOG_ARTICLES.map(art => ({
    '@type': 'BlogPosting',
    headline: art.title,
    description: art.summary,
    url: `https://smashchill.online/blog/${art.slug}`,
  })),
};

const blogHubHtml = `<!doctype html>
<html lang="en">
<head>
  ${COMMON_HEAD_TAGS}
  <title>Smash and Chill Blog: Clinical Stress Relief &amp; Neurobiology Guides</title>
  <meta name="description" content="Explore evidence-based guides on stress relief, ergonomic gaming, digital decompression, ASMR acoustic psychology, and 5-minute cognitive micro-breaks at Smash and Chill." />
  <meta name="keywords" content="smash and chill, smash and chill blog, stress relief research, clinical micro breaks, asmr psychology, ergonomics for gamers, digital burnout prevention" />
  <link rel="canonical" href="https://smashchill.online/blog" />

  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Smash and Chill" />
  <meta property="og:url" content="https://smashchill.online/blog" />
  <meta property="og:title" content="Smash and Chill Blog: Clinical Stress Relief &amp; Neurobiology Guides" />
  <meta property="og:description" content="Explore evidence-based guides on stress relief, ergonomic gaming, digital decompression, and 5-minute cognitive micro-breaks." />
  <meta property="og:image" content="https://smashchill.online/icon.svg" />

  <script type="application/ld+json">
  ${JSON.stringify(blogHubJsonLd, null, 2)}
  </script>

  <style>
    ${COMMON_CSS}
    .hero-box {
      text-align: center;
      padding: 36px 16px 28px 16px;
      margin-bottom: 32px;
    }
    .hero-title {
      font-size: 2.2rem;
      font-weight: 900;
      letter-spacing: -0.02em;
      margin-bottom: 12px;
      background: linear-gradient(to right, #ffffff, #e2e8f0, #94a3b8);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    @media (min-width: 640px) {
      .hero-title { font-size: 2.8rem; }
    }
    .hero-sub {
      font-size: 1.05rem;
      color: #94a3b8;
      max-width: 650px;
      margin: 0 auto;
    }
    .articles-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 20px;
    }
    .article-card {
      background: #0f172a;
      border: 1px solid #1e293b;
      border-radius: 20px;
      padding: 24px;
      transition: all 0.2s ease;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .article-card:hover {
      border-color: #f43f5e;
      transform: translateY(-2px);
      box-shadow: 0 10px 25px -5px rgba(244, 63, 94, 0.15);
    }
    .article-card-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 12px;
      flex-wrap: wrap;
      gap: 8px;
    }
    .article-category {
      font-size: 11px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #fb7185;
      background: rgba(244, 63, 94, 0.12);
      padding: 3px 10px;
      border-radius: 9999px;
    }
    .article-read-time {
      font-size: 11px;
      color: #94a3b8;
      font-weight: 600;
    }
    .article-card-title {
      font-size: 1.3rem;
      font-weight: 800;
      line-height: 1.35;
      margin-bottom: 10px;
      color: #f8fafc;
    }
    .article-card-summary {
      font-size: 13.5px;
      color: #94a3b8;
      line-height: 1.6;
      margin-bottom: 16px;
    }
    .article-card-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-top: 1px solid #1e293b;
      padding-top: 16px;
      margin-top: 8px;
      flex-wrap: wrap;
      gap: 12px;
    }
    .author-info {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 12px;
      color: #cbd5e1;
    }
    .read-more-btn {
      color: #38bdf8;
      font-size: 13px;
      font-weight: 800;
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }
    .read-more-btn:hover {
      color: #7dd3fc;
    }
  </style>
</head>
<body>

  <header class="nav-bar">
    <div class="nav-container">
      <a href="https://smashchill.online/" class="nav-logo" aria-label="Smash and Chill Homepage">
        <span>⚡ SMASH &amp; CHILL</span>
        <span class="nav-tag">RESEARCH</span>
      </a>
      <a href="https://smashchill.online/" class="nav-play-btn">
        <span>Play 15 Free Games ▶</span>
      </a>
    </div>
  </header>

  <main class="container">
    <nav class="breadcrumbs" aria-label="Breadcrumb">
      <a href="https://smashchill.online/">Home</a>
      <span>/</span>
      <span style="color: #cbd5e1;">Wellness Blog</span>
    </nav>

    <div class="hero-box">
      <span class="badge">EVIDENCE-BASED SANCTUARY</span>
      <h1 class="hero-title">Wellness &amp; Neurobiology Library</h1>
      <p class="hero-sub">
        Explore clinical research on 5-minute micro-breaks, ASMR acoustics, ergonomic gaming posture, and dopamine restoration protocols from the creators of Smash and Chill.
      </p>
    </div>

    <div class="articles-grid">
      ${BLOG_ARTICLES.map(art => `
        <article class="article-card">
          <div>
            <div class="article-card-header">
              <span class="article-category">${escapeHtml(art.category)}</span>
              <span class="article-read-time">⏱ ${escapeHtml(art.readTime)}</span>
            </div>
            <a href="https://smashchill.online/blog/${art.slug}">
              <h2 class="article-card-title">${escapeHtml(art.title)}</h2>
            </a>
            <p class="article-card-summary">${escapeHtml(art.summary)}</p>
          </div>
          <div class="article-card-footer">
            <div class="author-info">
              <span>${art.author.avatar}</span>
              <span><strong>${escapeHtml(art.author.name)}</strong> · ${escapeHtml(art.author.role)}</span>
            </div>
            <a href="https://smashchill.online/blog/${art.slug}" class="read-more-btn">
              <span>Read Full Protocol</span>
              <span>→</span>
            </a>
          </div>
        </article>
      `).join('\n')}
    </div>
  </main>

  <footer>
    <p>© 2026 Smash and Chill Interactive Studio · smashchill.online · All rights reserved.</p>
    <div class="footer-links">
      <a href="https://smashchill.online/">All 15 Free Arcade Games</a>
      <a href="https://smashchill.online/blog">Wellness Blog</a>
      <a href="https://smashchill.online/privacy">Privacy Policy</a>
      <a href="https://smashchill.online/terms">Terms of Service</a>
      <a href="https://smashchill.online/about">About Us</a>
      <a href="https://smashchill.online/contact">Contact Support</a>
    </div>
  </footer>

</body>
</html>
`;

fs.writeFileSync(path.join(BLOG_DIR, 'index.html'), blogHubHtml, 'utf-8');
fs.writeFileSync(path.join(PUBLIC_DIR, 'blog.html'), blogHubHtml, 'utf-8');
console.log('Generated: /blog (Blog Hub)');

// =========================================================================
// 3. GENERATE PRIVACY POLICY PAGE (/privacy)
// =========================================================================
const privacyHtml = `<!doctype html>
<html lang="en">
<head>
  ${COMMON_HEAD_TAGS}
  <title>Privacy Policy | Smash and Chill (smashchill.online)</title>
  <meta name="description" content="Privacy Policy for Smash and Chill (smashchill.online). Explains Google AdSense, DART cookies, log files, GDPR rights, CCPA compliance, and user data protections." />
  <link rel="canonical" href="https://smashchill.online/privacy" />

  <style>
    ${COMMON_CSS}
    h1 { font-size: 2.2rem; font-weight: 900; margin-bottom: 8px; }
    h2 { font-size: 1.35rem; font-weight: 800; margin: 28px 0 12px 0; color: #f8fafc; border-left: 3px solid #e11d48; padding-left: 10px; }
    p { margin-bottom: 14px; color: #cbd5e1; font-size: 14.5px; }
    ul { padding-left: 20px; margin-bottom: 16px; color: #cbd5e1; font-size: 14px; }
    li { margin-bottom: 8px; }
    .callout { background: rgba(15, 23, 42, 0.9); border: 1px solid #1e293b; padding: 18px; border-radius: 14px; margin-bottom: 20px; font-size: 13.5px; }
  </style>
</head>
<body>

  <header class="nav-bar">
    <div class="nav-container">
      <a href="https://smashchill.online/" class="nav-logo" aria-label="Smash and Chill Homepage">
        <span>⚡ SMASH &amp; CHILL</span>
        <span class="nav-tag">LEGAL</span>
      </a>
      <a href="https://smashchill.online/" class="nav-play-btn">
        <span>Play Games ▶</span>
      </a>
    </div>
  </header>

  <main class="container">
    <nav class="breadcrumbs" aria-label="Breadcrumb">
      <a href="https://smashchill.online/">Home</a>
      <span>/</span>
      <span style="color: #cbd5e1;">Privacy Policy</span>
    </nav>

    <article>
      <span class="badge">GDPR &amp; CCPA COMPLIANT</span>
      <h1>Privacy Policy for Smash and Chill</h1>
      <p style="color: #94a3b8; font-size: 12px; margin-bottom: 24px;">
        Effective Date: November 3, 2026 · Last Reviewed: November 2026 · Official URL: <a href="https://smashchill.online" style="color: #fb7185; text-decoration: underline;">https://smashchill.online</a>
      </p>

      <div class="callout">
        <strong>At Smash and Chill</strong> (accessible from <a href="https://smashchill.online" style="color: #fbbf24; text-decoration: underline;">https://smashchill.online</a>), one of our main priorities is the privacy of our visitors. This Privacy Policy outlines what information is collected, how it is recorded by SmashChill, and how it is used. If you have questions or require further information, contact us directly at <span class="font-mono" style="color: #fbbf24;">wegoswami@gmail.com</span> or <span class="font-mono" style="color: #fbbf24;">contact@smashchill.online</span>.
      </div>

      <h2>1. Google AdSense &amp; DoubleClick DART Cookies</h2>
      <p>
        Google is one of the third-party advertising vendors on our site. Google uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to smashchill.online and other sites on the internet.
      </p>
      <p>
        Visitors may opt out of personalized advertising by visiting Google Ads Settings:
        <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" style="color: #38bdf8; text-decoration: underline;">https://www.google.com/settings/ads</a>.
      </p>
      <p>
        Alternatively, you can opt out of third-party vendor cookies for personalized advertising by visiting the Network Advertising Initiative:
        <a href="https://optout.networkadvertising.org/" target="_blank" rel="noopener noreferrer" style="color: #38bdf8; text-decoration: underline;">optout.networkadvertising.org</a> or the Digital Advertising Alliance:
        <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" style="color: #38bdf8; text-decoration: underline;">aboutads.info/choices</a>.
      </p>

      <h2>2. Log Files &amp; Technical Metrics</h2>
      <p>
        SmashChill follows a standard procedure of utilizing log files. These files log visitors when they visit websites. The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information.
      </p>

      <h2>3. Local Storage (Privacy by Architecture)</h2>
      <p>
        SmashChill stores your gameplay high scores, sound toggles, unlocked weapons, and quest progress exclusively within your device's browser <span class="font-mono" style="color: #34d399;">window.localStorage</span>. This data never leaves your machine, is never transmitted to any remote database, and can be cleared at any time via your browser settings.
      </p>

      <h2>4. CCPA Privacy Rights (Do Not Sell My Personal Information)</h2>
      <p>Under the California Consumer Privacy Act (CCPA), California consumers have the right to:</p>
      <ul>
        <li>Request that a business disclose the categories and specific pieces of personal data collected about consumers.</li>
        <li>Request that a business delete any personal data about the consumer that a business collected.</li>
        <li>Request that a business that sells a consumer's personal data, not sell the consumer's personal data (SmashChill does not sell personal user data).</li>
      </ul>

      <h2>5. GDPR Data Protection Rights</h2>
      <p>We want to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:</p>
      <ul>
        <li>The right to access – You have the right to request copies of your personal data.</li>
        <li>The right to rectification – You have the right to request that we correct any information you believe is inaccurate.</li>
        <li>The right to erasure – You have the right to request that we erase your personal data, under certain conditions.</li>
        <li>The right to restrict processing – You have the right to request that we restrict the processing of your personal data.</li>
      </ul>

      <h2>6. Children's Online Privacy Protection (COPPA)</h2>
      <p>
        Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity. SmashChill does not knowingly collect any Personal Identifiable Information from children under the age of 13.
      </p>

      <h2>7. Contact Information</h2>
      <p>
        For any privacy questions, data requests, or compliance inquiries, please reach out to our Data Protection team at:
        <br />
        Email: <a href="mailto:wegoswami@gmail.com" class="font-mono" style="color: #fbbf24;">wegoswami@gmail.com</a>
        <br />
        Alternate Email: <a href="mailto:contact@smashchill.online" class="font-mono" style="color: #fbbf24;">contact@smashchill.online</a>
      </p>
    </article>
  </main>

  <footer>
    <p>© 2026 Smash and Chill Interactive Studio · smashchill.online · All rights reserved.</p>
    <div class="footer-links">
      <a href="https://smashchill.online/">All 15 Free Arcade Games</a>
      <a href="https://smashchill.online/blog">Wellness Blog</a>
      <a href="https://smashchill.online/privacy">Privacy Policy</a>
      <a href="https://smashchill.online/terms">Terms of Service</a>
      <a href="https://smashchill.online/about">About Us</a>
      <a href="https://smashchill.online/contact">Contact Support</a>
    </div>
  </footer>

</body>
</html>
`;

fs.writeFileSync(path.join(PUBLIC_DIR, 'privacy', 'index.html'), privacyHtml, 'utf-8');
fs.writeFileSync(path.join(PUBLIC_DIR, 'privacy.html'), privacyHtml, 'utf-8');
console.log('Generated: /privacy (Privacy Policy)');

// =========================================================================
// 4. GENERATE TERMS OF SERVICE PAGE (/terms)
// =========================================================================
const termsHtml = `<!doctype html>
<html lang="en">
<head>
  ${COMMON_HEAD_TAGS}
  <title>Terms of Service | Smash and Chill (smashchill.online)</title>
  <meta name="description" content="Terms of Service & User Agreement for Smash and Chill (smashchill.online). Covers acceptable casual gameplay, intellectual property, and advertising policies." />
  <link rel="canonical" href="https://smashchill.online/terms" />

  <style>
    ${COMMON_CSS}
    h1 { font-size: 2.2rem; font-weight: 900; margin-bottom: 8px; }
    h2 { font-size: 1.35rem; font-weight: 800; margin: 28px 0 12px 0; color: #f8fafc; border-left: 3px solid #e11d48; padding-left: 10px; }
    p { margin-bottom: 14px; color: #cbd5e1; font-size: 14.5px; }
    ul { padding-left: 20px; margin-bottom: 16px; color: #cbd5e1; font-size: 14px; }
    li { margin-bottom: 8px; }
  </style>
</head>
<body>

  <header class="nav-bar">
    <div class="nav-container">
      <a href="https://smashchill.online/" class="nav-logo" aria-label="Smash and Chill Homepage">
        <span>⚡ SMASH &amp; CHILL</span>
        <span class="nav-tag">LEGAL</span>
      </a>
      <a href="https://smashchill.online/" class="nav-play-btn">
        <span>Play Games ▶</span>
      </a>
    </div>
  </header>

  <main class="container">
    <nav class="breadcrumbs" aria-label="Breadcrumb">
      <a href="https://smashchill.online/">Home</a>
      <span>/</span>
      <span style="color: #cbd5e1;">Terms of Service</span>
    </nav>

    <article>
      <span class="badge">TERMS OF USE</span>
      <h1>Terms of Service &amp; User Agreement</h1>
      <p style="color: #94a3b8; font-size: 12px; margin-bottom: 24px;">
        Last Updated: November 2026 · Website: <a href="https://smashchill.online" style="color: #fb7185; text-decoration: underline;">smashchill.online</a>
      </p>

      <p>
        Welcome to <strong>Smash and Chill</strong>. By accessing or using our interactive stress-relief arcade web application, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, please do not use our services.
      </p>

      <h2>1. Permitted License &amp; Entertainment Use</h2>
      <p>
        SmashChill grants you a personal, revocable, non-exclusive, non-transferable license to access and play our mini-games for casual stress-relief, relaxation, and entertainment purposes on personal web browsers and mobile devices.
      </p>

      <h2>2. Prohibited Conduct &amp; Ad Integrity</h2>
      <p>You agree NOT to:</p>
      <ul>
        <li>Employ automated scripts, bots, spiders, or headless scrapers to artificially manipulate game scores, leaderboard ranks, or advertising impressions.</li>
        <li>Engage in invalid click generation or fraudulent interaction with Google AdSense sponsored banners.</li>
        <li>Reverse engineer, decompile, or redistribute the source code, game sprites, sound synthesis engines, or visual assets without written consent.</li>
      </ul>

      <h2>3. Intellectual Property Rights</h2>
      <p>
        All trademarks, logos, audio algorithms, game concepts, and design interfaces displayed on smashchill.online are the proprietary property of SmashChill and its licensors. All rights reserved.
      </p>

      <h2>4. Disclaimer of Warranties</h2>
      <p>
        SmashChill is provided on an "AS IS" and "AS AVAILABLE" basis without warranties of any kind, whether express or implied. We do not warrant that gameplay will be uninterrupted, error-free, or compatible with all legacy web browsers.
      </p>

      <h2>5. Limitation of Liability</h2>
      <p>
        In no event shall SmashChill, its founders, or affiliates be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use or inability to use our website.
      </p>

      <h2>6. Governing Law &amp; Contact</h2>
      <p>
        For inquiries regarding these terms, contact us at: <a href="mailto:wegoswami@gmail.com" class="font-mono" style="color: #fbbf24;">wegoswami@gmail.com</a>.
      </p>
    </article>
  </main>

  <footer>
    <p>© 2026 Smash and Chill Interactive Studio · smashchill.online · All rights reserved.</p>
    <div class="footer-links">
      <a href="https://smashchill.online/">All 15 Free Arcade Games</a>
      <a href="https://smashchill.online/blog">Wellness Blog</a>
      <a href="https://smashchill.online/privacy">Privacy Policy</a>
      <a href="https://smashchill.online/terms">Terms of Service</a>
      <a href="https://smashchill.online/about">About Us</a>
      <a href="https://smashchill.online/contact">Contact Support</a>
    </div>
  </footer>

</body>
</html>
`;

fs.writeFileSync(path.join(PUBLIC_DIR, 'terms', 'index.html'), termsHtml, 'utf-8');
fs.writeFileSync(path.join(PUBLIC_DIR, 'terms.html'), termsHtml, 'utf-8');
console.log('Generated: /terms (Terms of Service)');

// =========================================================================
// 5. GENERATE ABOUT US PAGE (/about)
// =========================================================================
const aboutHtml = `<!doctype html>
<html lang="en">
<head>
  ${COMMON_HEAD_TAGS}
  <title>About Us | Smash and Chill (smashchill.online)</title>
  <meta name="description" content="Discover the story and craftsmanship behind Smash and Chill (smashchill.online): 15 human-curated stress-relief mini-games combining physical catharsis with deep mindfulness." />
  <link rel="canonical" href="https://smashchill.online/about" />

  <style>
    ${COMMON_CSS}
    h1 { font-size: 2.2rem; font-weight: 900; margin-bottom: 8px; }
    h2 { font-size: 1.35rem; font-weight: 800; margin: 28px 0 12px 0; color: #f8fafc; border-left: 3px solid #e11d48; padding-left: 10px; }
    p { margin-bottom: 14px; color: #cbd5e1; font-size: 14.5px; }
    ul { padding-left: 20px; margin-bottom: 16px; color: #cbd5e1; font-size: 14px; }
    li { margin-bottom: 8px; }
    .grid-2 { display: grid; grid-template-columns: 1fr; gap: 16px; margin: 20px 0; }
    @media (min-width: 640px) { .grid-2 { grid-template-columns: 1fr 1fr; } }
    .feature-card { background: #0f172a; border: 1px solid #1e293b; padding: 20px; border-radius: 16px; }
  </style>
</head>
<body>

  <header class="nav-bar">
    <div class="nav-container">
      <a href="https://smashchill.online/" class="nav-logo" aria-label="Smash and Chill Homepage">
        <span>⚡ SMASH &amp; CHILL</span>
        <span class="nav-tag">STORY</span>
      </a>
      <a href="https://smashchill.online/" class="nav-play-btn">
        <span>Play Free Now ▶</span>
      </a>
    </div>
  </header>

  <main class="container">
    <nav class="breadcrumbs" aria-label="Breadcrumb">
      <a href="https://smashchill.online/">Home</a>
      <span>/</span>
      <span style="color: #cbd5e1;">About Us</span>
    </nav>

    <article>
      <span class="badge">OUR MISSION &amp; DESIGN ETHOS</span>
      <h1>About Smash and Chill</h1>
      <p style="color: #94a3b8; font-size: 13px; margin-bottom: 24px;">
        The Digital Decompression Sanctuary · smashchill.online
      </p>

      <p>
        <strong>Smash and Chill</strong> (https://smashchill.online) was engineered to solve a modern digital epidemic: ubiquitous screen fatigue, endless notification anxiety, and cognitive burnout among professionals, students, and casual gamers worldwide.
      </p>

      <div class="card-box" style="background: linear-gradient(135deg, rgba(225, 29, 72, 0.1), rgba(15, 23, 42, 0.8)); border-color: rgba(244, 63, 94, 0.3);">
        <h3 style="font-size: 16px; font-weight: 800; color: #fb7185; margin-bottom: 8px;">✨ Why Human-Curated Web Games Outperform Generic AI Clutter</h3>
        <p style="font-size: 13.5px; color: #e2e8f0; line-height: 1.7; margin-bottom: 0;">
          The modern web has become flooded with generic, automated, cookie-cutter clone games and clickbait portals that prioritize ad impressions over human delight. Smash and Chill was built on an opposite, craftsman principle: <em>every mechanic, haptic pulse, sound synthesis envelope, and ragdoll spring is hand-calibrated by real web game designers</em>. We believe true stress relief requires authentic sensory feedback—from the crisp acoustic pop of realistic virtual bubble wrap to the harmonious ripple frequencies of Japanese koi ponds.
        </p>
      </div>

      <h2>The Two-Phase Cognitive Relief Protocol</h2>
      <div class="grid-2">
        <div class="feature-card">
          <div style="font-size: 30px; margin-bottom: 10px;">🔨</div>
          <h3 style="font-size: 16px; font-weight: 800; color: #f43f5e; margin-bottom: 8px;">Phase 1: Cathartic Venting (Smash)</h3>
          <p style="font-size: 13px; color: #94a3b8; line-height: 1.6;">
            When daily frustration builds up, the sympathetic nervous system triggers high-alert tension. Smash and Chill provides a zero-harm digital punching bag (Whack-A-Stress, Stress Ninja, Virtual Rage Room, Hydraulic Press, Plate Smash) to discharge acute kinetic tension safely.
          </p>
        </div>
        <div class="feature-card">
          <div style="font-size: 30px; margin-bottom: 10px;">🌸</div>
          <h3 style="font-size: 16px; font-weight: 800; color: #38bdf8; margin-bottom: 8px;">Phase 2: Sensory Restoration (Chill)</h3>
          <p style="font-size: 13px; color: #94a3b8; line-height: 1.6;">
            Following catharsis, deep calming is essential. The Zen Koi Pond, ASMR Soundboard, Tibetan Tongue Drum, and Kinetic Sand use pentatonic harmonic chimes, water ripples, and soothing hues to stimulate the vagus nerve and return heart-rate variability (HRV) to baseline.
          </p>
        </div>
      </div>

      <h2>Our Core Commitments</h2>
      <ul>
        <li><strong>Zero Friction:</strong> 100% free with no forced paywalls, mandatory account sign-ups, or invasive permissions. Instant play on any desktop or mobile browser.</li>
        <li><strong>Lightweight Performance:</strong> Engineered with optimized HTML5 Canvas and the Web Audio API—sub-second load times even on slow mobile networks.</li>
        <li><strong>Responsible Monetization:</strong> We partner exclusively with verified high-standard advertising networks (Google AdSense, Publisher ID: <span class="font-mono" style="color: #34d399;">pub-7658190454263901</span>) that respect player privacy and maintain strict ad safety standards.</li>
        <li><strong>Privacy by Architecture:</strong> Your progress, high scores, and audio toggles live on your browser LocalStorage and never leave your machine.</li>
      </ul>

      <h2>Publisher &amp; Editorial Details</h2>
      <div class="card-box">
        <p style="font-size: 13.5px; margin-bottom: 8px;">
          <strong>Publisher:</strong> SmashChill Interactive Studio (Independent Web Game Design &amp; Digital Wellness)
        </p>
        <p style="font-size: 13.5px; margin-bottom: 8px;">
          <strong>Lead Maintainer &amp; Developer:</strong> SmashChill Team
        </p>
        <p style="font-size: 13.5px; margin-bottom: 0;">
          <strong>Contact:</strong> <a href="mailto:wegoswami@gmail.com" class="font-mono" style="color: #fbbf24;">wegoswami@gmail.com</a> · <a href="mailto:contact@smashchill.online" class="font-mono" style="color: #fbbf24;">contact@smashchill.online</a>
        </p>
      </div>
    </article>
  </main>

  <footer>
    <p>© 2026 Smash and Chill Interactive Studio · smashchill.online · All rights reserved.</p>
    <div class="footer-links">
      <a href="https://smashchill.online/">All 15 Free Arcade Games</a>
      <a href="https://smashchill.online/blog">Wellness Blog</a>
      <a href="https://smashchill.online/privacy">Privacy Policy</a>
      <a href="https://smashchill.online/terms">Terms of Service</a>
      <a href="https://smashchill.online/about">About Us</a>
      <a href="https://smashchill.online/contact">Contact Support</a>
    </div>
  </footer>

</body>
</html>
`;

fs.writeFileSync(path.join(PUBLIC_DIR, 'about', 'index.html'), aboutHtml, 'utf-8');
fs.writeFileSync(path.join(PUBLIC_DIR, 'about.html'), aboutHtml, 'utf-8');
console.log('Generated: /about (About Us)');

// =========================================================================
// 6. GENERATE CONTACT US PAGE (/contact)
// =========================================================================
const contactHtml = `<!doctype html>
<html lang="en">
<head>
  ${COMMON_HEAD_TAGS}
  <title>Contact Us | Smash and Chill (smashchill.online)</title>
  <meta name="description" content="Contact the creators of Smash and Chill (smashchill.online). Inquiries regarding game suggestions, technical bug reports, advertising partnerships, and Google AdSense." />
  <link rel="canonical" href="https://smashchill.online/contact" />

  <style>
    ${COMMON_CSS}
    h1 { font-size: 2.2rem; font-weight: 900; margin-bottom: 8px; }
    h2 { font-size: 1.35rem; font-weight: 800; margin: 28px 0 12px 0; color: #f8fafc; border-left: 3px solid #e11d48; padding-left: 10px; }
    p { margin-bottom: 14px; color: #cbd5e1; font-size: 14.5px; }
    .contact-card { background: #0f172a; border: 1px solid #1e293b; border-radius: 18px; padding: 24px; margin-bottom: 20px; }
    .contact-email-btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: linear-gradient(135deg, #e11d48, #d97706);
      color: #ffffff;
      padding: 12px 24px;
      border-radius: 12px;
      font-weight: 800;
      font-size: 14px;
      margin-top: 10px;
    }
    .contact-email-btn:hover { opacity: 0.95; }
  </style>
</head>
<body>

  <header class="nav-bar">
    <div class="nav-container">
      <a href="https://smashchill.online/" class="nav-logo" aria-label="Smash and Chill Homepage">
        <span>⚡ SMASH &amp; CHILL</span>
        <span class="nav-tag">SUPPORT</span>
      </a>
      <a href="https://smashchill.online/" class="nav-play-btn">
        <span>Play Games ▶</span>
      </a>
    </div>
  </header>

  <main class="container">
    <nav class="breadcrumbs" aria-label="Breadcrumb">
      <a href="https://smashchill.online/">Home</a>
      <span>/</span>
      <span style="color: #cbd5e1;">Contact Us</span>
    </nav>

    <article>
      <span class="badge">DIRECT SUPPORT &amp; INQUIRIES</span>
      <h1>Contact &amp; Publisher Support Desk</h1>
      <p style="color: #94a3b8; font-size: 13px; margin-bottom: 24px;">
        Reach out to the Smash and Chill team for user feedback, game ideas, bug reports, and advertising inquiries.
      </p>

      <div class="contact-card">
        <h3 style="font-size: 16px; font-weight: 800; color: #ffffff; margin-bottom: 6px;">📧 Official Contact Email</h3>
        <p style="font-size: 13.5px; color: #cbd5e1; margin-bottom: 12px;">
          For fastest response (within 24–48 hours), email our lead developer and publisher desk directly:
        </p>
        <a href="mailto:wegoswami@gmail.com?subject=SmashChill%20Inquiry" class="contact-email-btn">
          <span>Send Email to wegoswami@gmail.com</span>
          <span>✉</span>
        </a>
        <p style="margin-top: 14px; font-size: 12px; color: #94a3b8;">
          Alternate desk: <a href="mailto:contact@smashchill.online" class="font-mono" style="color: #fbbf24;">contact@smashchill.online</a>
        </p>
      </div>

      <h2>Inquiries We Handle</h2>
      <div style="display: grid; grid-template-columns: 1fr; gap: 14px; margin-top: 14px;">
        <div class="contact-card" style="margin-bottom: 0;">
          <h4 style="font-size: 14px; font-weight: 800; color: #fbbf24; margin-bottom: 4px;">🎮 Game Feedback &amp; Ideas</h4>
          <p style="font-size: 13px; color: #94a3b8; margin-bottom: 0;">
            Have a new anti-stress or ASMR game suggestion? We regularly build and publish community-requested stress relief mechanics.
          </p>
        </div>
        <div class="contact-card" style="margin-bottom: 0;">
          <h4 style="font-size: 14px; font-weight: 800; color: #f43f5e; margin-bottom: 4px;">🐛 Bug Reports &amp; Device Compatibility</h4>
          <p style="font-size: 13px; color: #94a3b8; margin-bottom: 0;">
            Found an issue on a specific mobile browser or device? Let us know with your browser name and device model so we can patch it immediately.
          </p>
        </div>
        <div class="contact-card" style="margin-bottom: 0;">
          <h4 style="font-size: 14px; font-weight: 800; color: #34d399; margin-bottom: 4px;">💼 Google AdSense &amp; Partnership Inquiries</h4>
          <p style="font-size: 13px; color: #94a3b8; margin-bottom: 0;">
            Google AdSense verification desk, publisher inquiries, and verified privacy disclosures. Publisher ID: <span class="font-mono text-emerald-400">pub-7658190454263901</span>.
          </p>
        </div>
      </div>
    </article>
  </main>

  <footer>
    <p>© 2026 Smash and Chill Interactive Studio · smashchill.online · All rights reserved.</p>
    <div class="footer-links">
      <a href="https://smashchill.online/">All 15 Free Arcade Games</a>
      <a href="https://smashchill.online/blog">Wellness Blog</a>
      <a href="https://smashchill.online/privacy">Privacy Policy</a>
      <a href="https://smashchill.online/terms">Terms of Service</a>
      <a href="https://smashchill.online/about">About Us</a>
      <a href="https://smashchill.online/contact">Contact Support</a>
    </div>
  </footer>

</body>
</html>
`;

fs.writeFileSync(path.join(PUBLIC_DIR, 'contact', 'index.html'), contactHtml, 'utf-8');
fs.writeFileSync(path.join(PUBLIC_DIR, 'contact.html'), contactHtml, 'utf-8');
console.log('Generated: /contact (Contact Support)');

console.log('ALL STATIC PAGES & HUBS GENERATED SUCCESSFULLY!');
