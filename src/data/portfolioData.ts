import { Project, SkillCategory } from '../types/portfolio';

export const PROJECTS: Project[] = [
  {
    id: 'unigo',
    title: 'UNIGO',
    subtitle: 'Education Platform · Cloudflare Workers',
    tagline: 'Connecting students with universities, agencies, visa services, and admissions in one interface.',
    category: 'Education Platform',
    year: '2026',
    techStack: ['React', 'TypeScript', 'Cloudflare Workers', 'Hono', 'Prisma', 'PostgreSQL', 'TailwindCSS'],
    description: 'A complete education platform that connects students with universities, agencies, visa services and admissions through one modern interface.',
    challenge: 'Managing high-density international student application flows, visa document tracking, and partner university verification across multiple timezones with real-time sync.',
    solution: 'Built an edge-rendered API architecture using Cloudflare Workers and Hono with Prisma PostgreSQL, delivering sub-20ms multi-region application tracking.',
    metrics: [
      { label: 'Latency', value: '18ms avg' },
      { label: 'Uptime SLA', value: '99.98%' },
      { label: 'Active Pipeline', value: 'Global' }
    ],
    codeSnippet: {
      language: 'typescript',
      filename: 'admissionWorker.ts',
      code: `import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';

const app = new Hono();

app.get('/api/applications/sync', async (c) => {
  const prisma = new PrismaClient({ datasourceUrl: c.env.DATABASE_URL });
  const records = await prisma.application.findMany({
    take: 50,
    orderBy: { updatedAt: 'desc' }
  });
  return c.json({ status: 'live', timestamp: Date.now(), data: records });
});

export default app;`
    },
    demoPreviewType: 'interactive-ui',
    featured: true,
    link: 'https://unigo.uz',
    demoUrl: 'https://unigo.uz',
    role: 'Lead Full-Stack Engineer',
    status: 'Production Live',
    screenshots: [
      '/projects/unigo/1.jpg',
      '/projects/unigo/2.jpg',
      '/projects/unigo/3.jpg'
    ]
  },
  {
    id: 'photogram',
    title: 'Photogram',
    subtitle: 'Social Media · AWS S3 · Supabase',
    tagline: 'Pinterest-inspired visual discovery network with high-performance media delivery & stories.',
    category: 'Social Platform',
    year: '2025',
    techStack: ['React', 'TypeScript', 'Supabase', 'AWS S3', 'React Query', 'TailwindCSS'],
    description: 'A Pinterest-inspired social platform with Pins, Stories, Messaging, Comments, Search, User Profiles and high-performance media delivery.',
    challenge: 'Handling infinite waterfall image streams, real-time comment threads, and high-resolution story uploads without UI jank or memory leaks.',
    solution: 'Designed an AWS S3 WebP image optimization pipeline with Supabase Realtime subscriptions and virtualized React Query list caching.',
    metrics: [
      { label: 'CDN Speed', value: '< 35ms' },
      { label: 'Scroll FPS', value: '120 Hz' },
      { label: 'Realtime Sync', value: 'Sub-10ms' }
    ],
    codeSnippet: {
      language: 'typescript',
      filename: 'useRealtimeFeed.ts',
      code: `import { useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';

export function useRealtimeFeedSubscriber() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const channel = supabase
      .channel('pins_feed')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'pins' }, payload => {
        queryClient.setQueryData(['pins'], (old: any) => [payload.new, ...old]);
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [queryClient]);
}`
    },
    demoPreviewType: 'interactive-ui',
    featured: true,
    link: 'https://photogram-git-cloudflare-workers-autoconfig-sardor-ermuhammedov.vercel.app/',
    demoUrl: 'https://photogram-git-cloudflare-workers-autoconfig-sardor-ermuhammedov.vercel.app/',
    role: 'Full-Stack Architect',
    status: 'Production Live',
    screenshots: [
      '/projects/photogram/1.jpg',
      '/projects/photogram/2.jpg',
      '/projects/photogram/3.jpg'
    ]
  },
  {
    id: 'etomoda',
    title: 'EtoModa',
    subtitle: 'Fashion E-Commerce · Next.js',
    tagline: 'Luxury fashion storefront inspired by Apple featuring tactile shopping & spring animations.',
    category: 'Fashion E-Commerce',
    year: '2025',
    techStack: ['Next.js', 'TailwindCSS', 'Supabase', 'AWS', 'Motion'],
    description: 'A luxury fashion storefront inspired by Apple and premium brands featuring immersive shopping experience and elegant animations.',
    challenge: 'Delivering heavy editorial image assets and fluid spring transitions while maintaining 0.4s LCP and instant optimistic cart actions.',
    solution: 'Built an edge pre-rendered Next.js storefront using Motion physics, AWS CloudFront CDN distribution, and optimistic cart updates.',
    metrics: [
      { label: 'LCP Score', value: '0.4s' },
      { label: 'Checkout Conv.', value: '+34%' },
      { label: 'Frame Budget', value: '60 FPS' }
    ],
    codeSnippet: {
      language: 'typescript',
      filename: 'productTransition.tsx',
      code: `import { motion } from 'motion/react';

export function ProductCard({ item }) {
  return (
    <motion.div
      layoutId={\`product-\${item.id}\`}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="relative rounded-2xl overflow-hidden bg-stone-900 border border-white/10"
    >
      <img src={item.image} alt={item.title} className="w-full h-80 object-cover" />
    </motion.div>
  );
}`
    },
    demoPreviewType: 'commerce-flow',
    featured: true,
    link: 'https://etomoda-six.vercel.app/',
    demoUrl: 'https://etomoda-six.vercel.app/',
    role: 'Frontend & Motion Lead',
    status: 'Production Live',
    screenshots: [
      '/projects/etomoda/1.jpg',
      '/projects/etomoda/2.jpg',
      '/projects/etomoda/3.jpg'
    ]
  },
  {
    id: 'evolve-3d',
    title: 'Evolve 3D Shop',
    subtitle: 'Interactive Commerce · WebGL',
    tagline: 'Cinematic 3D shopping experience with real-time WebGL product rendering & scroll motion.',
    category: 'Interactive Commerce',
    year: '2025',
    techStack: ['Three.js', 'React Three Fiber', 'GSAP', 'React', 'WebGL'],
    description: 'A next-generation online shopping experience using cinematic scrolling, real-time 3D rendering and premium product presentation.',
    challenge: 'Rendering multi-mesh 3D products with metallic shaders and dynamic camera paths in real-time without causing GPU thermal throttling on mobile.',
    solution: 'Engineered a lightweight React Three Fiber viewport with compressed GLTF models, custom GLSL lighting shaders, and GSAP scroll timelines.',
    metrics: [
      { label: 'Render Time', value: '16.6ms / frame' },
      { label: 'Smoothness', value: '120 FPS' },
      { label: 'GPU Overhead', value: 'Sub 5%' }
    ],
    codeSnippet: {
      language: 'glsl',
      filename: 'glossShader.glsl',
      code: `uniform float u_time;
uniform vec3 u_lightPos;
varying vec3 v_normal;
varying vec3 v_viewPosition;

void main() {
  vec3 normal = normalize(v_normal);
  vec3 lightDir = normalize(u_lightPos - v_viewPosition);
  float diff = max(dot(normal, lightDir), 0.2);
  vec3 reflection = reflect(-lightDir, normal);
  float spec = pow(max(dot(reflection, normalize(-v_viewPosition)), 0.0), 32.0);
  gl_FragColor = vec4(vec3(diff * 0.8 + spec * 0.5), 1.0);
}`
    },
    demoPreviewType: 'shader-preview',
    featured: true,
    link: 'https://evolve-3d-online-shop-l387qajth-sardor-ermuhammedov.vercel.app/',
    demoUrl: 'https://evolve-3d-online-shop-l387qajth-sardor-ermuhammedov.vercel.app/',
    role: 'Creative Technologist',
    status: 'Production Live',
    screenshots: [
      '/projects/evolve-3d/1.jpg',
      '/projects/evolve-3d/2.jpg',
      '/projects/evolve-3d/3.jpg'
    ]
  },
  {
    id: 'onlineshoptg',
    title: 'OnlineShopTG',
    subtitle: 'Telegram Commerce · Node.js',
    tagline: 'Seamless Telegram WebApp storefront integrating messaging catalog browsing with direct ordering.',
    category: 'Telegram Commerce',
    year: '2024',
    techStack: ['React', 'Node.js', 'TailwindCSS', 'Telegram API'],
    description: 'An online commerce platform integrated with Telegram for modern product browsing and ordering workflows.',
    challenge: 'Delivering an instant mobile shopping experience inside Telegram embedded browser context with smooth ordering callbacks.',
    solution: 'Built a lightweight SPA integrated directly with Telegram Mini App SDK, offering instant product search, cart persistence, and automated Bot ordering.',
    metrics: [
      { label: 'Order Time', value: '< 15 sec' },
      { label: 'API Latency', value: '22ms' },
      { label: 'Mobile UX', value: 'Native Feel' }
    ],
    codeSnippet: {
      language: 'typescript',
      filename: 'telegramBotHandler.ts',
      code: `import TelegramBot from 'node-telegram-bot-api';

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });

bot.on('message', (msg) => {
  if (msg.text === '/start') {
    bot.sendMessage(msg.chat.id, 'Welcome to OnlineShopTG!', {
      reply_markup: {
        inline_keyboard: [[
          { text: '🛒 Launch Catalog', web_app: { url: 'https://onlineshoptg.vercel.app/' } }
        ]]
      }
    });
  }
});`
    },
    demoPreviewType: 'interactive-ui',
    featured: true,
    link: 'https://onlineshoptg.vercel.app/',
    demoUrl: 'https://onlineshoptg.vercel.app/',
    role: 'Full-Stack Developer',
    status: 'Production Live',
    screenshots: [
      '/projects/onlineshoptg/1.jpg',
      '/projects/onlineshoptg/2.jpg',
      '/projects/onlineshoptg/3.jpg'
    ]
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    name: 'Frontend & Interface Mechanics',
    skills: [
      { name: 'React 19 & Next.js', level: '98%', experience: '6+ Yrs', description: 'Concurrent mode, Server Actions, Custom Hooks, Performance Profiling', iconName: 'Code2' },
      { name: 'TypeScript', level: '95%', experience: '5+ Yrs', description: 'Strict typing, Generics, AST manipulation, Utility types', iconName: 'FileCode2' },
      { name: 'Tailwind CSS & Styling', level: '99%', experience: '5+ Yrs', description: 'Utility-first architecture, Custom Design Tokens, Fluid Spacing', iconName: 'Palette' },
      { name: 'Framer Motion & Motion API', level: '94%', experience: '4+ Yrs', description: 'Spring physics, Layout animations, Gesture mechanics', iconName: 'Zap' },
    ]
  },
  {
    name: 'Graphics, Shaders & Motion',
    skills: [
      { name: 'Three.js & WebGL', level: '88%', experience: '3+ Yrs', description: 'GLSL Shaders, Custom Mesh Shading, Scene Graphs, Post-processing', iconName: 'Box' },
      { name: 'GSAP & Canvas API', level: '92%', experience: '4+ Yrs', description: 'Complex timeline triggers, SVG morphing, Smooth scrolling', iconName: 'Sparkles' },
      { name: 'Web Audio API', level: '85%', experience: '2+ Yrs', description: 'Real-time synthesis, Micro audio feedback, Soundscapes', iconName: 'Volume2' },
    ]
  },
  {
    name: 'Backend, Systems & Data',
    skills: [
      { name: 'Node.js & Express / Go', level: '90%', experience: '5+ Yrs', description: 'REST APIs, WebSockets, SSE, Serverless edge handlers', iconName: 'Server' },
      { name: 'PostgreSQL & Drizzle / Prisma', level: '89%', experience: '4+ Yrs', description: 'Schema design, Index optimization, Migrations, Realtime triggers', iconName: 'Database' },
      { name: 'Redis & Caching', level: '87%', experience: '3+ Yrs', description: 'Pub/Sub, Rate limiting, Distributed state, Memory queues', iconName: 'Cpu' },
      { name: 'Gemini AI & SDKs', level: '92%', experience: '2+ Yrs', description: 'Multimodal streaming, Function calling, Structured output', iconName: 'Bot' },
    ]
  }
];

export const PHILOSOPHY_POINTS = [
  {
    title: 'The 200ms Feel Standard',
    description: 'Users process physical touch response in ~100ms and visual feedback in ~200ms. If an interaction takes longer to feel acknowledged, software feels broken or heavy. I engineer optimistic updates for every action.'
  },
  {
    title: 'Weight Without Bloat',
    description: 'High-end software feels "heavy" in quality—satisfying inertia, crisp micro-interactions, dark mathematical typography—without dragging down mobile frame rates or bandwidth.'
  },
  {
    title: 'Direct Manipulation',
    description: 'Interfaces should feel like physical instruments. Every slider, button, and drag gesture responds instantly with micro-feedback and clean physics.'
  }
];
