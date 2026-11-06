export interface StaticPage {
  slug: string;
  aliases: string[];
  title: string;
  description: string;
  keywords: string;
  category: 'Legal' | 'Company' | 'Support' | 'Safety';
  badge: string;
  lastUpdated: string;
  schemaType: 'AboutPage' | 'ContactPage' | 'QAPage' | 'WebPage';
  sections: {
    heading: string;
    body: string[];
  }[];
}

export const PAGES_DATA: StaticPage[] = [
  {
    slug: 'about',
    aliases: ['about-us'],
    title: 'About Us | Smash and Chill (smashchill.online)',
    description: 'Discover the philosophy, human craftsmanship, and clinical design ethos behind Smash and Chill: 15 anti-stress mini-games combining physical catharsis with deep mindfulness.',
    keywords: 'about smash and chill, smashchill about, stress relief game studio, anti-stress web games, human curated casual games, cognitive decompression',
    category: 'Company',
    badge: 'OUR MISSION & CRAFTSMANSHIP',
    lastUpdated: 'November 2026',
    schemaType: 'AboutPage',
    sections: [
      {
        heading: 'Why Human-Curated Web Games Outperform Generic AI Clutter',
        body: [
          'Smash and Chill (https://smashchill.online) was engineered to solve a modern digital epidemic: ubiquitous screen fatigue, endless notification anxiety, and cognitive burnout among professionals, students, and casual gamers worldwide.',
          'The modern web has become flooded with generic, automated, cookie-cutter clone games and clickbait portals that prioritize ad impressions over human delight. Smash and Chill was built on an opposite, craftsman principle: every mechanic, haptic pulse, sound synthesis envelope, and ragdoll spring is hand-calibrated by real web game designers.',
          'We believe true stress relief requires authentic sensory feedback—from the crisp acoustic pop of realistic virtual bubble wrap to the harmonious ripple frequencies of Japanese koi ponds. Generic automated games cannot calibrate the delicate balance between physical catharsis (discharging tension) and sensory soothing (parasympathetic calming). That thoughtful human curation is what makes Smash and Chill an authentic sanctuary.',
        ],
      },
      {
        heading: 'The Two-Phase Cognitive Relief Protocol',
        body: [
          'Phase 1: Cathartic Venting (Smash) — When daily frustration builds up, the sympathetic nervous system triggers high-alert tension. Smash and Chill provides a zero-harm digital punching bag (Whack-A-Stress, Stress Ninja, Virtual Rage Room, Hydraulic Press, Plate Smash) to discharge acute kinetic tension safely.',
          'Phase 2: Sensory Restoration (Chill) — Following catharsis, deep calming is essential. The Zen Koi Pond, ASMR Soundboard, Tibetan Tongue Drum, and Kinetic Sand use pentatonic harmonic chimes, water ripples, and soothing hues to stimulate the vagus nerve and return heart-rate variability (HRV) to baseline.',
        ],
      },
      {
        heading: 'Our Core Commitments',
        body: [
          'Zero Friction: 100% free with no forced paywalls, mandatory account sign-ups, or invasive permissions. Instant play on any desktop or mobile browser.',
          'Lightweight Performance: Engineered with optimized HTML5 Canvas and the Web Audio API—sub-second load times even on slow mobile networks.',
          'Responsible Monetization: We partner exclusively with verified high-standard advertising networks (Google AdSense, Publisher ID: pub-7658190454263901) that respect player privacy and maintain strict ad safety standards.',
          'Privacy by Architecture: Your progress, high scores, and audio toggles live on your browser LocalStorage and never leave your machine.',
        ],
      },
      {
        heading: 'Publisher & Editorial Team',
        body: [
          'Publisher: SmashChill Interactive Studio (Independent Web Game Design & Digital Wellness).',
          'Lead Developer & Maintainer: SmashChill Team.',
          'Contact: wegoswami@gmail.com · contact@smashchill.online.',
        ],
      },
    ],
  },
  {
    slug: 'privacy-policy',
    aliases: ['privacy'],
    title: 'Privacy Policy | Smash and Chill (smashchill.online)',
    description: 'Privacy Policy for Smash and Chill (smashchill.online). Explains Google AdSense, DoubleClick DART cookies, log files, GDPR rights, CCPA compliance, and user data protections.',
    keywords: 'privacy policy smash and chill, smashchill privacy, google adsense cookies, dart cookies opt out, gdpr compliance, ccpa privacy rights',
    category: 'Legal',
    badge: 'GDPR & CCPA COMPLIANT',
    lastUpdated: 'November 3, 2026',
    schemaType: 'WebPage',
    sections: [
      {
        heading: 'Introduction & Privacy Commitment',
        body: [
          'At Smash and Chill (accessible from https://smashchill.online), one of our main priorities is the privacy of our visitors. This Privacy Policy outlines what information is collected, how it is recorded by SmashChill, and how it is used.',
          'If you have questions or require further information regarding our privacy practices, contact our Data Protection desk directly at wegoswami@gmail.com or contact@smashchill.online.',
        ],
      },
      {
        heading: '1. Google AdSense & DoubleClick DART Cookies',
        body: [
          'Google is one of the third-party advertising vendors on our site. Google uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to smashchill.online and other sites on the internet.',
          'Visitors may opt out of personalized advertising by visiting Google Ads Settings: https://www.google.com/settings/ads.',
          'Alternatively, you can opt out of third-party vendor cookies for personalized advertising by visiting the Network Advertising Initiative (https://optout.networkadvertising.org/) or the Digital Advertising Alliance (https://www.aboutads.info/choices/).',
        ],
      },
      {
        heading: '2. Log Files & Anonymous Technical Metrics',
        body: [
          'SmashChill follows a standard procedure of utilizing log files. These files log visitors when they visit websites. The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users movement on the website, and gathering demographic information.',
        ],
      },
      {
        heading: '3. Local Storage (Privacy by Architecture)',
        body: [
          'SmashChill stores your gameplay high scores, sound toggles, unlocked weapons, and quest progress exclusively within your devices browser window.localStorage. This data never leaves your machine, is never transmitted to any remote database, and can be cleared at any time via your browser settings.',
        ],
      },
      {
        heading: '4. CCPA Privacy Rights (Do Not Sell My Personal Information)',
        body: [
          'Under the California Consumer Privacy Act (CCPA), California consumers have the right to request disclosure of personal data categories collected, request erasure of personal data, and demand that personal data not be sold. SmashChill does not sell personal user information.',
        ],
      },
      {
        heading: '5. GDPR Data Protection Rights',
        body: [
          'We ensure all users are fully aware of all of their data protection rights under GDPR, including the right to access, the right to rectification, the right to erasure, and the right to restrict processing.',
        ],
      },
      {
        heading: '6. Childrens Online Privacy Protection (COPPA)',
        body: [
          'Another priority is protecting children while using the internet. SmashChill does not knowingly collect any Personal Identifiable Information from children under the age of 13.',
        ],
      },
    ],
  },
  {
    slug: 'terms-of-service',
    aliases: ['terms'],
    title: 'Terms of Service & User Agreement | Smash and Chill',
    description: 'Terms of Service & User Agreement for Smash and Chill (smashchill.online). Covers acceptable casual gameplay, intellectual property, and advertising policies.',
    keywords: 'terms of service smash and chill, smashchill user agreement, acceptable use policy, gaming terms',
    category: 'Legal',
    badge: 'USER AGREEMENT',
    lastUpdated: 'November 2026',
    schemaType: 'WebPage',
    sections: [
      {
        heading: '1. Permitted License & Entertainment Use',
        body: [
          'Welcome to Smash and Chill. By accessing or using our interactive stress-relief arcade web application, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, please do not use our services.',
          'SmashChill grants you a personal, revocable, non-exclusive, non-transferable license to access and play our mini-games for casual stress-relief, relaxation, and entertainment purposes on personal web browsers and mobile devices.',
        ],
      },
      {
        heading: '2. Prohibited Conduct & Ad Integrity',
        body: [
          'You agree NOT to employ automated scripts, bots, spiders, or headless scrapers to artificially manipulate game scores, leaderboard ranks, or advertising impressions.',
          'You agree NOT to engage in invalid click generation or fraudulent interaction with Google AdSense sponsored banners.',
          'You agree NOT to reverse engineer, decompile, or redistribute the source code, game sprites, sound synthesis engines, or visual assets without written consent.',
        ],
      },
      {
        heading: '3. Intellectual Property Rights',
        body: [
          'All trademarks, logos, audio algorithms, game concepts, and design interfaces displayed on smashchill.online are the proprietary property of SmashChill and its licensors. All rights reserved.',
        ],
      },
      {
        heading: '4. Disclaimer of Warranties & Limitation of Liability',
        body: [
          'SmashChill is provided on an AS IS and AS AVAILABLE basis without warranties of any kind. In no event shall SmashChill, its founders, or affiliates be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use or inability to use our website.',
        ],
      },
    ],
  },
  {
    slug: 'contact',
    aliases: ['contact-us'],
    title: 'Contact Us & Publisher Support Desk | Smash and Chill',
    description: 'Contact the creators of Smash and Chill (smashchill.online). Inquiries regarding game suggestions, technical bug reports, advertising partnerships, and Google AdSense.',
    keywords: 'contact smash and chill, smashchill support, game feedback, developer contact, adsense publisher desk',
    category: 'Support',
    badge: 'DIRECT SUPPORT DESK',
    lastUpdated: 'November 2026',
    schemaType: 'ContactPage',
    sections: [
      {
        heading: 'Official Communication Channels',
        body: [
          'For user feedback, new game suggestions, bug reports, and Google AdSense / business inquiries, reach our maintainers directly:',
          'Lead Publisher & Support Email: wegoswami@gmail.com',
          'Alternate Domain Desk: contact@smashchill.online',
          'Expected response time: within 24 to 48 business hours.',
        ],
      },
      {
        heading: 'Game Feedback & Community Submissions',
        body: [
          'Have a new anti-stress, fidget, or ASMR game mechanic idea? We actively develop and publish community-requested casual stress relief tools. Send your sketches, physics ideas, or acoustic preferences to wegoswami@gmail.com.',
        ],
      },
      {
        heading: 'Bug Reports & Device Compatibility',
        body: [
          'If you encounter a visual glitch or audio issue on a specific mobile browser or operating system, let us know your exact browser version and device model so we can release an immediate patch.',
        ],
      },
      {
        heading: 'Google AdSense Verification & Advertising Partnerships',
        body: [
          'SmashChill is committed to transparent Google AdSense standards and safe digital gaming. Publisher ID: pub-7658190454263901.',
        ],
      },
    ],
  },
  {
    slug: 'medical-disclaimer',
    aliases: ['disclaimer'],
    title: 'Health & Medical Disclaimer | Smash and Chill',
    description: 'Health and medical disclaimer for Smash and Chill. Explains that casual web games provide recreational stress reduction and do not replace professional psychological care.',
    keywords: 'medical disclaimer smash and chill, mental health disclaimer, casual stress relief, crisis hotline numbers',
    category: 'Safety',
    badge: 'HEALTH & SAFETY NOTICE',
    lastUpdated: 'November 2026',
    schemaType: 'WebPage',
    sections: [
      {
        heading: 'Recreational Entertainment Disclaimer',
        body: [
          'SmashChill (smashchill.online) is an interactive web game engineered purely for casual recreation, amusement, lighthearted tension-release, and personal entertainment.',
          'The content, audio frequencies, and interactive games provided on this site are NOT intended to diagnose, treat, cure, or prevent any mental illness, acute clinical depression, panic disorders, or psychiatric conditions.',
          'Casual web micro-breaks help lower transient screen fatigue, but they do not constitute medical, psychological, psychiatric, or healthcare advice.',
        ],
      },
      {
        heading: 'Crisis & Emergency Mental Health Support Resources',
        body: [
          'If you or someone you know is in acute psychological distress, experiencing severe anxiety, or in an emergency, please connect with trained compassionate counselors immediately:',
          'United States & Canada: Call or text 988 (Suicide & Crisis Lifeline) available 24/7/365.',
          'United Kingdom: Call 111 (NHS Mental Health Services) or text SHOUT to 85258.',
          'India: Call Sneha India Foundation at +91 44 2464 0050 or KIRAN at 1800-599-0019.',
          'Worldwide / International: Visit befrienders.org or findahelpline.com for local 24/7 crisis hotlines.',
        ],
      },
    ],
  },
  {
    slug: 'dmca-policy',
    aliases: ['dmca'],
    title: 'DMCA Copyright Policy & Takedown Notice | Smash and Chill',
    description: 'Digital Millennium Copyright Act (DMCA) policy for Smash and Chill (smashchill.online). Instructions for submitting copyright infringement notices.',
    keywords: 'dmca policy smash and chill, copyright infringement, takedown notice, intellectual property compliance',
    category: 'Legal',
    badge: 'INTELLECTUAL PROPERTY',
    lastUpdated: 'November 2026',
    schemaType: 'WebPage',
    sections: [
      {
        heading: 'Commitment to Copyright Protection',
        body: [
          'SmashChill respects the intellectual property rights of creators and complies with the provisions of Title 17, United States Code, Section 512 (Digital Millennium Copyright Act).',
          'All game algorithms, audio synthesis envelopes, and graphical elements are original creations or licensed open assets. If you believe your copyrighted work has been infringed, we will respond promptly to valid notices.',
        ],
      },
      {
        heading: 'Filing a Copyright Infringement Notice',
        body: [
          'To file a DMCA notice, send a written communication to our designated copyright agent at wegoswami@gmail.com with the subject line "DMCA Notice" including:',
          '1. Physical or electronic signature of the authorized copyright owner.',
          '2. Identification of the copyrighted work claimed to have been infringed.',
          '3. URL location of the claimed infringing material on smashchill.online.',
          '4. Your full name, physical address, telephone number, and email address.',
          '5. A good faith statement that the disputed use is not authorized by the copyright owner, agent, or law.',
        ],
      },
    ],
  },
  {
    slug: 'faq',
    aliases: ['frequently-asked-questions'],
    title: 'Frequently Asked Questions (FAQ) | Smash and Chill',
    description: 'Frequently Asked Questions about Smash and Chill: 15 free online stress-relief arcade games, how audio synthesis works, privacy, and device support.',
    keywords: 'faq smash and chill, frequently asked questions smashchill, how to play smash chill, free games without download, audio synthesis web games',
    category: 'Support',
    badge: 'PLAYER & USER GUIDE',
    lastUpdated: 'November 2026',
    schemaType: 'QAPage',
    sections: [
      {
        heading: 'What is Smash and Chill?',
        body: [
          'Smash and Chill (smashchill.online) is a free web-based anti-stress arcade offering 15 interactive decompression mini-games. It combines high-energy physical catharsis (smashing plates, slicing items, crushing objects) with soothing mindfulness (koi ponds, Tibetan tongue drum chimes, kinetic sand).',
        ],
      },
      {
        heading: 'Do I need to download or install anything?',
        body: [
          'No! All 15 games run instantly in any modern desktop or mobile web browser with zero installation, zero downloads, and no account registration required.',
        ],
      },
      {
        heading: 'Is Smash and Chill safe and free to play?',
        body: [
          'Yes, 100% free. SmashChill is monetized responsibly via verified Google AdSense ads, ensuring users can play without paywalls while maintaining strict privacy standards.',
        ],
      },
      {
        heading: 'How does sound and audio synthesis work?',
        body: [
          'Smash and Chill uses the native Web Audio API to dynamically synthesize physical shatter tones, pentatonic bell chimes, and haptic clicks in real-time on your device, ensuring crystal-clear audio with zero audio buffering delay.',
        ],
      },
    ],
  },
];
