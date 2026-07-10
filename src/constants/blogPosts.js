export const BLOG_CATEGORIES = [
  { id: 'all', label: 'All Topics' },
  { id: 'zoho', label: 'Zoho' },
  { id: 'ai', label: 'AI' },
  { id: 'mobile', label: 'Mobile' },
  { id: 'web', label: 'Web & SEO' },
  { id: 'company', label: 'Company News' },
]

export const BLOG_POSTS = [
  {
    slug: 'zoho-erp-game-changer-smes',
    title: 'Why Zoho ERP Is a Game-Changer for SMEs',
    category: 'zoho',
    categoryLabel: 'Zoho',
    theme: 'zoho',
    publishedAt: 'March 12, 2026',
    readTime: '7 min read',
    excerpt: 'How integrated CRM and ERP workflows reduce manual work and improve decision-making for growing businesses.',
    featured: true,
    intro: 'Small and mid-size businesses often outgrow spreadsheets long before they can afford enterprise software. Zoho ERP bridges that gap with modular tools that scale as you grow.',
    sections: [
      {
        heading: 'Unified data beats disconnected tools',
        body: 'When sales, inventory, finance, and support live in separate systems, teams duplicate work and leaders lose visibility. Zoho connects these workflows so every department works from the same source of truth.',
      },
      {
        heading: 'Automation that saves hours every week',
        body: 'From lead assignment and invoice generation to purchase approvals, Zoho automations replace repetitive manual steps. Most SMEs we work with recover 10–20 hours per week within the first month of rollout.',
      },
      {
        heading: 'Where to start',
        body: 'Begin with your biggest pain point — often CRM + billing or inventory — then expand modules as adoption grows. PrimeAxis helps map your processes before configuration so Zoho fits how you already operate.',
      },
    ],
    takeaways: [
      'Zoho ERP + CRM gives SMEs enterprise-grade visibility without enterprise complexity.',
      'Workflow automation reduces errors and frees teams for higher-value work.',
      'Phased implementation lowers risk and speeds time-to-value.',
    ],
  },
  {
    slug: 'flutter-vs-react-native-2026',
    title: 'Flutter vs React Native in 2026',
    category: 'mobile',
    categoryLabel: 'Mobile',
    theme: 'mobile',
    publishedAt: 'March 5, 2026',
    readTime: '8 min read',
    excerpt: 'A practical comparison of cross-platform frameworks for performance, cost, and long-term maintainability.',
    intro: 'Choosing a mobile stack affects speed to market, developer hiring, and how your app feels on iOS and Android. Here is how Flutter and React Native compare for business apps in 2026.',
    sections: [
      {
        heading: 'Performance and UI consistency',
        body: 'Flutter renders with its own engine, delivering pixel-consistent UI across devices. React Native leverages native components, which can feel more platform-native but may need extra tuning for visual parity.',
      },
      {
        heading: 'Team skills and ecosystem',
        body: 'If your team already builds in React, React Native is a natural extension. Flutter rewards teams willing to adopt Dart and benefits from a rich widget library for custom branded interfaces.',
      },
      {
        heading: 'Our recommendation',
        body: 'For design-heavy consumer apps and fintech dashboards, we often recommend Flutter. For apps tightly integrated with existing React web platforms, React Native remains an excellent choice.',
      },
    ],
    takeaways: [
      'Both frameworks are production-ready for serious business apps.',
      'Match the framework to your team skills and UI requirements.',
      'Plan for API security, offline support, and push notifications from day one.',
    ],
  },
  {
    slug: 'ai-automation-customer-support',
    title: 'AI Automation for Customer Support',
    category: 'ai',
    categoryLabel: 'AI',
    theme: 'ai',
    publishedAt: 'February 22, 2026',
    readTime: '6 min read',
    excerpt: 'Deploy chatbots and intelligent routing to scale support without sacrificing response quality.',
    intro: 'AI support tools are no longer experimental. Used correctly, they handle routine inquiries instantly while routing complex cases to humans with full context.',
    sections: [
      {
        heading: 'Start with high-volume, low-complexity queries',
        body: 'Order status, appointment scheduling, and FAQ-style questions are ideal first automation targets. Automating these reduces wait times and support load immediately.',
      },
      {
        heading: 'Keep humans in the loop',
        body: 'The best implementations escalate gracefully when confidence is low or when a customer asks for a person. PrimeAxis integrates AI chat with WhatsApp and CRM so conversations stay tracked.',
      },
      {
        heading: 'Measure what matters',
        body: 'Track resolution rate, average response time, and customer satisfaction — not just chat volume. Iterate on intents and training data monthly.',
      },
    ],
    takeaways: [
      'AI chat works best alongside CRM and live agent handoff.',
      'Automate repetitive queries first; expand gradually.',
      'Real-time chat (including WhatsApp) keeps customers engaged.',
    ],
  },
  {
    slug: 'high-converting-business-website',
    title: 'Building a High-Converting Business Website',
    category: 'web',
    categoryLabel: 'Web & SEO',
    theme: 'web',
    publishedAt: 'February 14, 2026',
    readTime: '7 min read',
    excerpt: 'Design, speed, and SEO fundamentals that turn visitors into qualified leads.',
    intro: 'A beautiful website that loads slowly or ranks poorly is a missed opportunity. Conversion-focused design pairs strong messaging with technical SEO and performance.',
    sections: [
      {
        heading: 'Clarity above creativity',
        body: 'Visitors should understand what you do, who you serve, and how to contact you within five seconds. Strong headlines, social proof, and clear CTAs outperform decorative layouts.',
      },
      {
        heading: 'Speed is a conversion factor',
        body: 'Core Web Vitals affect both Google rankings and bounce rates. Modern stacks like React and Next.js, optimized images, and lean scripts keep load times under two seconds.',
      },
      {
        heading: 'SEO that compounds',
        body: 'Structured data, service pages, case studies, and blog content build topical authority. Internal linking between portfolio, case studies, and articles strengthens discoverability.',
      },
    ],
    takeaways: [
      'Lead with value proposition and trust signals above the fold.',
      'Performance and mobile experience directly impact conversions.',
      'Publish case studies and guides for long-term SEO growth.',
    ],
  },
  {
    slug: 'zoho-crm-sales-pipeline-setup',
    title: 'Zoho CRM: Sales Pipeline Setup Guide',
    category: 'zoho',
    categoryLabel: 'Zoho',
    theme: 'zoho',
    publishedAt: 'January 30, 2026',
    readTime: '9 min read',
    excerpt: 'Step-by-step guidance for configuring pipelines, stages, and automations that match your sales process.',
    intro: 'A CRM is only as good as the pipeline it reflects. This guide covers how we configure Zoho CRM for teams that need visibility from first touch to closed deal.',
    sections: [
      {
        heading: 'Map stages to real decisions',
        body: 'Each pipeline stage should represent a clear milestone — discovery call completed, proposal sent, negotiation — not vague labels like "in progress."',
      },
      {
        heading: 'Automate follow-ups',
        body: 'Use workflow rules for task creation, email reminders, and manager alerts when deals stall. Consistent follow-up is the biggest lever for conversion.',
      },
    ],
    takeaways: [
      'Customize pipelines per product line or team when needed.',
      'Dashboards should show pipeline value, velocity, and win rate.',
    ],
  },
  {
    slug: 'primeaxis-expands-lahore-office',
    title: 'PrimeAxis Expands Lahore Development Hub',
    category: 'company',
    categoryLabel: 'Company News',
    theme: 'company',
    publishedAt: 'January 18, 2026',
    readTime: '3 min read',
    excerpt: 'Our Lahore team grows to support more Zoho, web, and AI projects across Pakistan and international clients.',
    intro: 'PrimeAxis Technologies has expanded its Lahore office at Thokar Niaz Baig to support growing demand for Zoho implementations, custom software, and AI automation.',
    sections: [
      {
        heading: 'Local expertise, global delivery',
        body: 'The expanded hub strengthens our ability to serve clients across retail, healthcare, construction, and fintech with dedicated project teams and faster response times.',
      },
    ],
    takeaways: [
      'Visit us in Lahore or reach out via live chat for a free consultation.',
    ],
  },
]

export function getBlogPostBySlug(slug) {
  return BLOG_POSTS.find((post) => post.slug === slug)
}

export function getBlogPostUrl(slug) {
  return `/blog/${slug}`
}

export function getFeaturedPost() {
  return BLOG_POSTS.find((post) => post.featured) ?? BLOG_POSTS[0]
}
