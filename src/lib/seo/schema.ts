const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://maysanlabs.com";

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE_URL}/#business`,
  name: "Maysan Labs",
  image: `${SITE_URL}/logo.png`,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Sector 44",
    addressLocality: "Gurgaon",
    addressRegion: "Haryana",
    postalCode: "122001",
    addressCountry: "IN"
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "28.4647",
    longitude: "77.0300"
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00"
    }
  ],
  priceRange: "$$$",
  telephone: "+919660641530",
  email: "business@maysanlabs.com",
  url: SITE_URL,
  areaServed: {
    "@type": "Place",
    name: "Worldwide"
  },
  serviceType: ["SaaS Development", "Custom Software Development", "Web Development"],
  sameAs: [
    "https://www.facebook.com/maysanlabs",
    "https://www.instagram.com/maysanlabs",
    "https://in.linkedin.com/company/maysanlabs",
    "https://x.com/maysanlabs"
  ]
};

export const productSchema = [
  {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Maysan Shop",
    description: "Full-stack ecommerce solution with inventory, orders, payments, and customer management. Built for scale.",
    brand: {
      "@type": "Brand",
      name: "Maysan Labs"
    },
    provider: {
      "@type": "Organization",
      name: "Maysan Labs",
      url: SITE_URL
    },
    url: `${SITE_URL}/products`,
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: "400000",
      availability: "https://schema.org/InStock"
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Edu-Maysan",
    description: "Next-generation intelligence platform for educational institutions. Unifying finance, logistics, and academics.",
    brand: {
      "@type": "Brand",
      name: "Maysan Labs"
    },
    provider: {
      "@type": "Organization",
      name: "Maysan Labs",
      url: SITE_URL
    },
    url: `${SITE_URL}/products/edu-maysan`,
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: "640000",
      availability: "https://schema.org/InStock"
    }
  }
];

export const reviewSchema = {
  "@context": "https://schema.org",
  "@type": "AggregateRating",
  itemReviewed: {
    "@type": "Organization",
    name: "Maysan Labs"
  },
  ratingValue: "4.9",
  reviewCount: "50",
  bestRating: "5",
  worstRating: "1"
};

export function generateIndividualReviewSchemas() {
  const reviews = [
    {
      name: "Vikram Singh",
      role: "Founder, Maysan Shop",
      message: "Maysan Labs built our entire custom ERP and inventory system from scratch. The regional warehousing, automated order workflows, and UPI payment integrations work flawlessly. Our order fulfillment efficiency jumped dramatically.",
      rating: "5"
    },
    {
      name: "Rahul Sharma",
      role: "CEO, TechRetail India",
      message: "Maysan Labs delivered an ultra-scalable cloud database that handled our Diwali festive sale traffic without a single hiccup. Their engineering quality is truly world-class.",
      rating: "5"
    },
    {
      name: "Priya Mehta",
      role: "Founder, StyleHub",
      message: "They engineered a robust system that scaled from 10,000 to 5 Lakh active users seamlessly. True partners in our growth journey.",
      rating: "5"
    },
    {
      name: "Suraj Devadiga",
      role: "Founder, Flash Fashion",
      message: "Maysan Labs engineered a world-class, ultra-fast e-commerce platform for our clothing brand.",
      rating: "5"
    }
  ];

  return {
    "@context": "https://schema.org",
    "@graph": reviews.map((review) => ({
      "@type": "Review",
      "itemReviewed": {
        "@type": "Organization",
        "name": "Maysan Labs",
        "url": SITE_URL
      },
      "author": {
        "@type": "Person",
        "name": review.name,
        "description": review.role
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": review.rating,
        "bestRating": "5",
        "worstRating": "1"
      },
      "reviewBody": review.message
    }))
  };
}

export const softwareAppSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Maysan Shop",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web Browser",
  provider: {
    "@type": "Organization",
    name: "Maysan Labs",
    url: SITE_URL
  },
  offers: {
    "@type": "Offer",
    price: "400000",
    priceCurrency: "INR"
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    reviewCount: "25"
  }
};

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Maysan Labs",
  "alternateName": [
    "Maysan", 
    "MaysanLabs", 
    "Mayson Labs", 
    "MaysonLabs", 
    "Maysen Labs", 
    "MaysenLabs", 
    "Masan Labs", 
    "MasanLabs", 
    "Maysan Technologies", 
    "Maysan Software"
  ],
  "url": SITE_URL,
  "logo": `${SITE_URL}/logo.png`,
  "description": "Maysan Labs is a leading enterprise SaaS development company in Gurgaon, India. Expert developers building custom software, web applications, and cloud solutions using MERN stack, React, and Node.js. Trusted by enterprises worldwide for scalable digital transformation.",
  "foundingDate": "2020",
  "numberOfEmployees": {
    "@type": "QuantitativeValue",
    "minValue": 10,
    "maxValue": 50
  },
  "areaServed": "Worldwide",
  "serviceType": ["SaaS Development", "Custom Software Development", "Cloud Infrastructure", "Web Application Development", "Enterprise Software", "Mobile App Development"],
  "priceRange": "$$$",
  "telephone": process.env.NEXT_PUBLIC_CONTACT_PHONE || "+919660641530",
  "contactPoint": {
    "@type": "ContactPoint",
    "email": process.env.NEXT_PUBLIC_CONTACT_EMAIL || "business@maysanlabs.com",
    "contactType": "sales",
    "availableLanguage": ["English", "Arabic", "Hindi"]
  },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Sector 44",
    "addressLocality": process.env.NEXT_PUBLIC_ADDRESS_LOCALITY || "Gurgaon",
    "addressRegion": process.env.NEXT_PUBLIC_ADDRESS_REGION || "Haryana",
    "postalCode": process.env.NEXT_PUBLIC_ADDRESS_POSTAL_CODE || "122001",
    "addressCountry": process.env.NEXT_PUBLIC_ADDRESS_COUNTRY || "IN"
  },
  "sameAs": [
    "https://www.facebook.com/maysanlabs",
    "https://www.instagram.com/maysanlabs",
    "https://in.linkedin.com/company/maysanlabs",
    "https://x.com/maysanlabs"
  ],
  "potentialAction": {
    "@type": "SearchAction",
    "target": `${SITE_URL}/?s={search_term_string}`,
    "query-input": "required name=search_term_string"
  }
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Maysan Labs",
  url: SITE_URL,
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_URL}/?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

export const breadcrumbSchema = (items: { name: string; url: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});

export const navigationSchema = [
  { name: "Home", url: SITE_URL },
  { name: "Services", url: `${SITE_URL}/services` },
  { name: "Architecture", url: `${SITE_URL}/architecture` },
  { name: "Insights", url: `${SITE_URL}/insights` },
  { name: "Blog", url: `${SITE_URL}/blog` },
  { name: "Case Studies", url: `${SITE_URL}/case-studies` },
  { name: "Careers", url: `${SITE_URL}/careers` },
  { name: "About", url: `${SITE_URL}/about` },
];

export function getNavigationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Main Navigation",
    itemListElement: navigationSchema.map((item, index) => ({
      "@type": "SiteNavigationElement",
      position: index + 1,
      name: item.name,
      url: item.url,
    })),
  };
}

export const serviceFAQs = [
  {
    question: "What services does Maysan Labs offer?",
    answer: "Maysan Labs offers enterprise SaaS development, custom software development, web application development, cloud infrastructure services, API development, mobile app development, and digital transformation consulting."
  },
  {
    question: "How long does it take to develop a custom software solution?",
    answer: "Development timelines vary based on complexity. A simple web application typically takes 2-3 months, while enterprise-grade solutions with advanced features can take 6-12 months. Maysan Labs provides detailed project timelines after the discovery phase."
  },
  {
    question: "What technologies does Maysan Labs specialize in?",
    answer: "Maysan Labs specializes in MERN stack (MongoDB, Express, React, Node.js), React, Next.js, TypeScript, Python, Django, PostgreSQL, MongoDB, AWS, Docker, and Kubernetes for scalable cloud solutions."
  },
  {
    question: "Does Maysan Labs provide post-launch support?",
    answer: "Yes, Maysan Labs offers comprehensive post-launch support including bug fixes, security updates, performance optimization, and feature enhancements. We offer flexible maintenance packages tailored to client needs."
  },
  {
    question: "Can Maysan Labs work with existing codebases?",
    answer: "Absolutely. Maysan Labs has experience migrating legacy systems, refactoring codebases, and integrating new features into existing applications while maintaining backward compatibility."
  }
];

export const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Enterprise SaaS Development",
  "description": "Maysan Labs offers enterprise SaaS development, custom software development, web application development, cloud infrastructure services, API development, and mobile app development for global enterprises.",
  "provider": { "@type": "Organization", "name": "Maysan Labs" },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Development Services",
    "itemListElement": [
      { "@type": "Offer", "name": "Starter Plan", "price": "250000", "priceCurrency": "INR" },
      { "@type": "Offer", "name": "Growth Plan", "price": "500000", "priceCurrency": "INR" },
      { "@type": "Offer", "name": "Enterprise Plan", "price": "1200000", "priceCurrency": "INR" }
    ]
  }
};

export const softwareDevFAQs = [
  {
    question: "Why choose Maysan Labs for software development?",
    answer: "Maysan Labs is a leading software development company in Gurgaon, India with expertise in enterprise solutions. We deliver scalable, secure, and high-performance applications using modern technologies like React, Node.js, and cloud-native architectures."
  },
  {
    question: "What is the software development process at Maysan Labs?",
    answer: "Maysan Labs follows a structured process: Discovery & Planning → Design & Architecture → Development → Testing & QA → Deployment → Ongoing Support. Each phase has clear deliverables and regular communication."
  },
  {
    question: "How does Maysan Labs ensure code quality?",
    answer: "Maysan Labs follows industry best practices including code reviews, automated testing, security audits, and compliance with OWASP guidelines. All code is reviewed by senior developers."
  },
  {
    question: "What industries does Maysan Labs serve?",
    answer: "Maysan Labs serves EdTech, FinTech, Healthcare, E-commerce, Manufacturing, Retail, and Enterprise sectors with custom software solutions tailored to industry-specific requirements."
  },
  {
    question: "How much does custom software development cost?",
    answer: "Costs vary based on project scope, complexity, and timeline. Maysan Labs offers competitive pricing with flexible engagement models - from fixed-price projects to time-and-materials. Contact us for a detailed quote."
  }
];

export const cloudFAQs = [
  {
    question: "What cloud services does Maysan Labs offer?",
    answer: "Maysan Labs offers cloud infrastructure setup, AWS/Azure/GCP migration, containerization with Docker/Kubernetes, serverless architecture, cloud cost optimization, and 24/7 cloud monitoring."
  },
  {
    question: "Can Maysan Labs help migrate to cloud?",
    answer: "Yes, Maysan Labs provides end-to-end cloud migration services including assessment, planning, migration, and optimization. We specialize in AWS, Azure, and GCP with proven migration methodologies."
  },
  {
    question: "Does Maysan Labs provide DevOps services?",
    answer: "Yes, Maysan Labs offers DevOps consulting and implementation including CI/CD pipelines, infrastructure as code (Terraform), container orchestration, and automated deployment workflows."
  }
];

export function generateFAQPageSchema(faqs: { question: string; answer: string }[], _pageUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

export const howToContactSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Get Started with Maysan Labs",
  "description": "A step-by-step guide to start your project with Maysan Labs, the leading software development company in Gurgaon, India.",
  "step": [
    {
      "@type": "HowToStep",
      "name": "Describe Your Project",
      "text": "Tell us about your project requirements, goals, and timeline. Maysan Labs team will understand your vision and technical needs.",
      "url": `${SITE_URL}/init`
    },
    {
      "@type": "HowToStep",
      "name": "Get a Consultation",
      "text": "Schedule a free consultation with our experts. We'll discuss your requirements and provide expert guidance on the best approach.",
      "url": `${SITE_URL}/init`
    },
    {
      "@type": "HowToStep",
      "name": "Receive a Proposal",
      "text": "Get a detailed project proposal with timeline, technology recommendations, and competitive pricing from Maysan Labs.",
      "url": `${SITE_URL}/init`
    },
    {
      "@type": "HowToStep",
      "name": "Start Development",
      "text": "Once approved, Maysan Labs begins the development process with regular updates, agile methodology, and quality assurance.",
      "url": `${SITE_URL}/init`
    }
  ],
  "totalTime": "P2W"
};

export const howToHireSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Hire Developers from Maysan Labs",
  "description": "Learn how to hire expert developers from Maysan Labs, a top software development company in India.",
  "step": [
    {
      "@type": "HowToStep",
      "name": "Browse Open Positions",
      "text": "Explore career opportunities at Maysan Labs and find roles that match your skills.",
      "url": `${SITE_URL}/careers`
    },
    {
      "@type": "HowToStep",
      "name": "Submit Your Application",
      "text": "Apply online with your resume and portfolio. Maysan Labs looks for skilled developers in React, Node.js, and cloud technologies.",
      "url": `${SITE_URL}/careers`
    },
    {
      "@type": "HowToStep",
      "name": "Technical Interview",
      "text": "Complete a technical interview where you'll demonstrate your coding skills and problem-solving abilities.",
      "url": `${SITE_URL}/careers`
    },
    {
      "@type": "HowToStep",
      "name": "Join Maysan Labs",
      "text": "If selected, you'll join a dynamic team working on cutting-edge enterprise projects.",
      "url": `${SITE_URL}/careers`
    }
  ],
  "totalTime": "P1M"
};

export function generateHowToSchema(title: string, steps: { name: string; text: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": title,
    "step": steps.map((step, index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "name": step.name,
      "text": step.text
    }))
  };
}

export const speakableSchema = {
  "@context": "https://schema.org",
  "@type": "SpeakableSpecification",
  "cssSelector": [
    ".geo-tldr",
    ".blog-summary"
  ]
};

export const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Maysan Labs Team",
  "description": "Enterprise SaaS development team specializing in React, Node.js, cloud infrastructure, and custom software solutions.",
  "knowsAbout": [
    "SaaS Development",
    "Cloud Infrastructure",
    "React Development",
    "Node.js Development",
    "Enterprise Software",
    "Web Application Development",
    "API Development",
    "DevOps",
    "AWS",
    "Docker",
    "Kubernetes",
    "TypeScript",
    "PostgreSQL"
  ],
  "sameAs": [
    "https://github.com/maysanlabs",
    "https://www.facebook.com/maysanlabs",
    "https://in.linkedin.com/company/maysanlabs",
    "https://x.com/maysanlabs"
  ]
};

export const geoSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/#webpage`,
      "about": {
        "@id": `${SITE_URL}/#organization`
      },
      "mentions": [
        { "@type": "Service", "name": "SaaS Development" },
        { "@type": "Service", "name": "Custom Software Development" },
        { "@type": "Service", "name": "Cloud Infrastructure" },
        { "@type": "Service", "name": "Web Application Development" }
      ]
    },
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      "description": "Enterprise SaaS development company in Gurgaon, India",
      "knowsAbout": [
        "SaaS Development",
        "Cloud Computing",
        "Enterprise Software",
        "React.js",
        "Node.js",
        "AWS Cloud Services"
      ]
    }
  ]
};
