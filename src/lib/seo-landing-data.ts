export interface SeoLandingPage {
  slug: string;
  roleName: string;
  title: string;
  description: string;
  location: string;
  skills: string[];
  techStack: string[];
  features: { title: string; desc: string }[];
  faqs: { question: string; answer: string }[];
}

export const seoLandingPages: SeoLandingPage[] = [
  {
    slug: "nextjs-developers-gurgaon",
    roleName: "Next.js Developer",
    title: "Hire Elite Next.js Developers in Gurgaon | Maysan Labs",
    description: "Hire top-tier Next.js developers in Gurgaon, India. Maysan Labs engineers high-performance, SEO-friendly, and ultra-fast Next.js web applications for startups and enterprises.",
    location: "Gurgaon, Haryana, India",
    skills: [
      "Server-Side Rendering (SSR) & Static Site Generation (SSG)",
      "App Router & Next.js Server Actions optimization",
      "API Routes, Middleware, and edge function architectures",
      "Core Web Vitals optimization (LCP < 2.5s, CLS < 0.1)",
      "TypeScript, Tailwind CSS, and clean UI engineering"
    ],
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vercel", "Node.js", "PostgreSQL"],
    features: [
      {
        title: "Enterprise Grade Performance",
        desc: "Our Next.js developers optimize bundles, eliminate layout shifts (CLS), and structure APIs to achieve near-instantaneous load times."
      },
      {
        title: "SEO & GEO Optimized Architectures",
        desc: "We build layouts with semantic HTML, JSON-LD schema integration, and metadata configurations tailored for modern AI search engines."
      },
      {
        title: "Expertise in Complex Integrations",
        desc: "Flawless connections with payment grids (Stripe, Razorpay), custom ERPs, headless CMSs, and third-party SaaS APIs."
      }
    ],
    faqs: [
      {
        question: "Why hire Next.js developers from Maysan Labs?",
        answer: "Maysan Labs is a specialized software studio in Gurgaon. Our engineers are trained to write clean, type-safe Next.js code following the absolute best performance and security standards, ensuring your project builds successfully and scales easily."
      },
      {
        question: "Do you offer full-time dedicated developer hiring?",
        answer: "Yes, we offer flexible hiring models including dedicated full-time developers, managed product squads, and time-and-materials project consulting."
      },
      {
        question: "How do you ensure Next.js application security?",
        answer: "We adhere strictly to OWASP security guidelines, implement Content Security Policies (CSP), encrypt user data, and sanitize inputs to prevent common injection and cross-site scripting vulnerabilities."
      }
    ]
  },
  {
    slug: "react-native-developers-gurgaon",
    roleName: "React Native Developer",
    title: "Hire Top React Native Developers in Gurgaon | Maysan Labs",
    description: "Hire expert React Native developers in Gurgaon. We build high-performance, native iOS and Android mobile apps from a single codebase. Contact Maysan Labs for custom mobile solutions.",
    location: "Gurgaon, Haryana, India",
    skills: [
      "Cross-platform iOS and Android mobile engineering",
      "Native bridges and custom native module integration",
      "State management (Redux Toolkit, Zustand, Recoil)",
      "Performance optimization (Startup time, memory leaks, smooth rendering)",
      "App Store & Google Play console release management"
    ],
    techStack: ["React Native", "Expo", "TypeScript", "Redux", "Zustand", "iOS/Swift", "Android/Kotlin"],
    features: [
      {
        title: "Native-Like Fluid UI/UX",
        desc: "We design highly responsive mobile layouts featuring smooth animations (60 FPS) and gesture interactions using Reanimated."
      },
      {
        title: "Single Codebase Efficiency",
        desc: "Reduce time-to-market and maintenance costs by up to 50% with clean, shared React Native codebase targeting both platforms."
      },
      {
        title: "Robust Offline Capabilities",
        desc: "We build apps with local data caching, offline sync capabilities, and lightweight databases like SQLite and WatermelonDB."
      }
    ],
    faqs: [
      {
        question: "Do your React Native apps look native on both iOS and Android?",
        answer: "Yes, our designers and developers adapt components to match HIG (Human Interface Guidelines) for iOS and Material Design guidelines for Android to ensure platform-native aesthetics."
      },
      {
        question: "Can you help publish the app to the App Store and Google Play?",
        answer: "Absolutely. We manage the entire deployment lifecycle, including setting up Apple and Google Developer accounts, app store assets, and navigating the store review processes."
      }
    ]
  },
  {
    slug: "mern-stack-developers-gurgaon",
    roleName: "MERN Stack Developer",
    title: "Hire Expert MERN Stack Developers in Gurgaon | Maysan Labs",
    description: "Hire elite MERN stack developers in Gurgaon, India. Maysan Labs specializes in building scalable, secure, and robust full-stack web applications using MongoDB, Express, React, and Node.js.",
    location: "Gurgaon, Haryana, India",
    skills: [
      "Full-stack MERN (MongoDB, Express, React, Node.js) development",
      "RESTful API & GraphQL endpoint architecture and design",
      "Database schema optimization, indexing, and aggregation pipelines",
      "Authentication and authorization flows (JWT, OAuth, session management)",
      "Dockerization, cloud deployment, and CI/CD setup"
    ],
    techStack: ["React", "Node.js", "Express", "MongoDB", "Mongoose", "TypeScript", "Docker", "AWS"],
    features: [
      {
        title: "Scalable API Architecture",
        desc: "We design high-throughput Node.js microservices and Express APIs built to handle thousands of concurrent requests."
      },
      {
        title: "Optimized Database Designs",
        desc: "We structure MongoDB schemas with proper indexing, caching layers (Redis), and denormalization strategies to achieve sub-50ms query responses."
      },
      {
        title: "Rigorous Testing & QA",
        desc: "Every MERN application is covered by unit and integration tests (Jest, Vitest) to prevent regression bugs and ensure quality."
      }
    ],
    faqs: [
      {
        question: "What is the onboarding timeline for a MERN stack developer?",
        answer: "We can typically assign dedicated developers or start discovery for your MERN project within 3 to 7 business days."
      },
      {
        question: "Do you build custom SaaS panels using MERN?",
        answer: "Yes, custom SaaS development with payment integrations, user dashboards, and role-based permissions is our core specialty."
      }
    ]
  }
];
