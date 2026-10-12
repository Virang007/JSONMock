const fs = require('fs');
const path = require('path');
const { VERIFIED_PHOTOS } = require('./verified-photos');

// ─── 1. USERS (10 records) ──────────────────────────────────────────────────
const USERS = [
  {
    id: 1,
    name: 'Alexander Wright',
    username: 'alex.wright',
    email: 'alexander.wright@example.com',
    address: {
      street: '452 Market Street',
      suite: 'Suite 800',
      city: 'San Francisco',
      zipcode: '94105-2901',
      geo: { lat: '37.7891', lng: '-122.4014' }
    },
    phone: '+1-415-555-0142',
    website: 'alexwright.example.org',
    company: {
      name: 'Nexus Cloud Systems',
      catchPhrase: 'Distributed microservices architecture and edge computing',
      bs: 'streamline enterprise cloud deployments'
    }
  },
  {
    id: 2,
    name: 'Sophia Martinez',
    username: 'sophia.m',
    email: 'sophia.martinez@example.org',
    address: {
      street: '784 Broadway Avenue',
      suite: 'Floor 12',
      city: 'New York',
      zipcode: '10003-4512',
      geo: { lat: '40.7291', lng: '-73.9937' }
    },
    phone: '+1-212-555-0189',
    website: 'sophiamartinez.example.com',
    company: {
      name: 'Aura Interactive Labs',
      catchPhrase: 'Human-centered accessible design systems',
      bs: 'transform intuitive digital experiences'
    }
  },
  {
    id: 3,
    name: 'Marcus Chen',
    username: 'marcus.chen',
    email: 'marcus.chen@example.com',
    address: {
      street: '1200 Westlake Avenue N',
      suite: 'Apt 4B',
      city: 'Seattle',
      zipcode: '98109-3522',
      geo: { lat: '47.6295', lng: '-122.3385' }
    },
    phone: '+1-206-555-0173',
    website: 'chen-engineering.example.org',
    company: {
      name: 'Cascade Data Labs',
      catchPhrase: 'Real-time analytical pipelines and streaming telemetry',
      bs: 'architect scalable event-driven systems'
    }
  },
  {
    id: 4,
    name: 'Elena Rostova',
    username: 'elena.rostova',
    email: 'elena.rostova@example.org',
    address: {
      street: '34 King William Street',
      suite: 'Suite 300',
      city: 'London',
      zipcode: 'EC4R 9AT',
      geo: { lat: '51.5098', lng: '-0.0877' }
    },
    phone: '+44-20-7946-0912',
    website: 'elenarostova.example.com',
    company: {
      name: 'Vanguard Cyber Security',
      catchPhrase: 'Zero-trust infrastructure and cryptographic protocols',
      bs: 'harden enterprise attack surfaces'
    }
  },
  {
    id: 5,
    name: 'Arjun Patel',
    username: 'arjun.patel',
    email: 'arjun.patel@example.com',
    address: {
      street: '88 Cyber City Boulevard',
      suite: 'Tower 4B',
      city: 'Bengaluru',
      zipcode: '560100',
      geo: { lat: '12.8452', lng: '77.6602' }
    },
    phone: '+91-80-5555-0194',
    website: 'arjunpatel.example.org',
    company: {
      name: 'Synapse AI Foundry',
      catchPhrase: 'High-throughput LLM inference and model optimization',
      bs: 'operationalize enterprise machine learning'
    }
  },
  {
    id: 6,
    name: 'Clara Dubois',
    username: 'clara.dubois',
    email: 'clara.dubois@example.org',
    address: {
      street: '15 Boulevard Saint-Germain',
      suite: 'Appt 22',
      city: 'Paris',
      zipcode: '75005',
      geo: { lat: '48.8503', lng: '2.3518' }
    },
    phone: '+33-1-42-68-55-10',
    website: 'claradubois.example.com',
    company: {
      name: 'Atelier Digital Works',
      catchPhrase: 'Clean aesthetic responsive web typography and motion',
      bs: 'craft sustainable visual interfaces'
    }
  },
  {
    id: 7,
    name: 'Liam Anderson',
    username: 'liam.anderson',
    email: 'liam.anderson@example.com',
    address: {
      street: '220 Bay Street',
      suite: 'Unit 1405',
      city: 'Toronto',
      zipcode: 'M5J 2W4',
      geo: { lat: '43.6472', lng: '-79.3802' }
    },
    phone: '+1-416-555-0129',
    website: 'liamanderson.example.org',
    company: {
      name: 'Apex Financial Tooling',
      catchPhrase: 'Low-latency ledger accounting and transactional APIs',
      bs: 'secure decentralized financial workflows'
    }
  },
  {
    id: 8,
    name: 'Priya Sharma',
    username: 'priya.sharma',
    email: 'priya.sharma@example.org',
    address: {
      street: '64 Marina Boulevard',
      suite: 'Tower 2 #18-04',
      city: 'Singapore',
      zipcode: '018989',
      geo: { lat: '1.2798', lng: '103.8547' }
    },
    phone: '+65-6555-0182',
    website: 'priyasharma.example.com',
    company: {
      name: 'Equinox Observability',
      catchPhrase: 'Full-stack distributed tracing and uptime analytics',
      bs: 'eliminate production downtime bottlenecks'
    }
  },
  {
    id: 9,
    name: 'David Miller',
    username: 'david.miller',
    email: 'david.miller@example.com',
    address: {
      street: '312 Friedrichstrasse',
      suite: 'Studio 5',
      city: 'Berlin',
      zipcode: '10117',
      geo: { lat: '52.5169', lng: '13.3889' }
    },
    phone: '+49-30-5555-0177',
    website: 'davidmiller.example.org',
    company: {
      name: 'Kinetics DevOps Labs',
      catchPhrase: 'Automated Kubernetes orchestration and GitOps delivery',
      bs: 'accelerate release deployment velocity'
    }
  },
  {
    id: 10,
    name: 'Hannah Kim',
    username: 'hannah.kim',
    email: 'hannah.kim@example.org',
    address: {
      street: '51 Teheran-ro',
      suite: '14th Floor',
      city: 'Seoul',
      zipcode: '06134',
      geo: { lat: '37.5008', lng: '127.0366' }
    },
    phone: '+82-2-555-0163',
    website: 'hannahkim.example.com',
    company: {
      name: 'Zenith Mobile Engineering',
      catchPhrase: 'Cross-platform reactive mobile architectures and SDKs',
      bs: 'deliver high-performance mobile software'
    }
  }
];

// ─── 2. POSTS (100 records: 10 per user) ───────────────────────────────────
const POST_TEMPLATES = [
  {
    title: 'Architecting Resilient Distributed Systems with Node.js and Redis',
    body: 'Building fault-tolerant backend services requires careful consideration of network partitions, graceful degradation, and idempotent background processing.\n\nIn this comprehensive overview, we explore how distributed caching patterns and dead-letter queues prevent cascading system failures during peak traffic spikes.'
  },
  {
    title: 'Modern CSS Layouts: Fluid Typography and Container Queries in 2026',
    body: 'Container queries have fundamentally shifted modern responsive web architecture away from viewport-dependent media queries toward truly modular component-level styling.\n\nLearn how combining CSS clamp formulas with modern container queries yields layout components that gracefully adapt inside any parent column.'
  },
  {
    title: 'Mastering Database Query Optimization: Indexes, Joins, and Execution Plans',
    body: 'Slow database queries are often the silent killer of application responsiveness under production workloads.\n\nBy systematically inspecting EXPLAIN ANALYZE execution trees, database engineers can identify missing composite indexes, resolve accidental sequential scans, and dramatically reduce memory consumption.'
  },
  {
    title: 'Zero-Trust Security Implementation Patterns for Modern REST APIs',
    body: 'Perimeter-based defense models are no longer sufficient for cloud-native microservice applications.\n\nImplementing short-lived cryptographically signed tokens, mutual TLS across internal services, and fine-grained attribute-based access control creates a defense-in-depth posture capable of withstanding sophisticated breaches.'
  },
  {
    title: 'Building Real-Time Data Streaming Pipelines with WebSockets and Server-Sent Events',
    body: 'Deciding between WebSockets, Server-Sent Events (SSE), and HTTP/2 long polling depends on whether your workload is strictly unidirectional or full-duplex.\n\nThis article breaks down connection lifecycle overhead, automated reconnection strategies with exponential backoff, and state synchronization across client sessions.'
  },
  {
    title: 'Designing Robust CI/CD Delivery Pipelines for Mission-Critical Microservices',
    body: 'Automated continuous integration is the backbone of high-velocity engineering organizations.\n\nWe examine blue-green deployment strategies, canary traffic shifting, automated smoke verification, and atomic database migrations that ensure zero-downtime releases.'
  },
  {
    title: 'Effective TypeScript Patterns: Advanced Generics and Conditional Types',
    body: 'TypeScript types can do far more than validate primitive values; they can express complex domain invariants at compile time.\n\nDiscover how mapped types, template literal types, and recursive utility types eliminate runtime bugs while maintaining ergonomic developer ergonomics.'
  },
  {
    title: 'Demystifying Observability: Correlating Distributed Traces, Metrics, and Logs',
    body: 'Having millions of isolated log lines without contextual trace IDs makes root-cause analysis during outages nearly impossible.\n\nOpenTelemetry standards enable engineers to bind incoming HTTP headers to downstream database queries, surfacing high-percentile latency spikes immediately.'
  },
  {
    title: 'Web Performance Optimization: Optimizing Core Web Vitals at Scale',
    body: 'Largest Contentful Paint (LCP) and Cumulative Layout Shift (CLS) directly impact user retention and conversion rates.\n\nWe review practical optimizations including critical CSS extraction, modern responsive AVIF/WebP image formats, font preloading, and aggressive JavaScript payload minimization.'
  },
  {
    title: 'Building Accessible Design Systems: WCAG Compliance and Screen Reader Testing',
    body: 'True digital accessibility is an engineering priority rather than an afterthought.\n\nFrom semantic landmark regions and keyboard focus management to ARIA live announcement states, explore how to build design components that empower all users regardless of ability.'
  }
];

const POST_TOPIC_MODIFIERS = [
  'In-Depth Guide', 'Production Case Study', 'Best Practices', 'Architecture Review',
  'Field Notes', 'Performance Benchmarks', 'Key Takeaways', 'Practical Blueprint',
  'Engineering Handbook', 'Modern Paradigm'
];

function generatePosts() {
  const posts = [];
  let id = 1;
  for (let userId = 1; userId <= 10; userId++) {
    for (let p = 0; p < 10; p++) {
      const base = POST_TEMPLATES[p];
      const mod = POST_TOPIC_MODIFIERS[(userId + p) % POST_TOPIC_MODIFIERS.length];
      const title = `${base.title} (${mod})`;
      const body = `${base.body}\n\nAuthored as part of the technical engineering series by our senior architecture group.`;
      posts.push({ userId, id: id++, title, body });
    }
  }
  return posts;
}

// ─── 3. COMMENTS (500 records: 5 per post) ──────────────────────────────────
const COMMENTERS = [
  { name: 'Marcus Chen', email: 'marcus.chen@example.com' },
  { name: 'Sophia Martinez', email: 'sophia.martinez@example.org' },
  { name: 'Alexander Wright', email: 'alexander.wright@example.com' },
  { name: 'Elena Rostova', email: 'elena.rostova@example.org' },
  { name: 'Arjun Patel', email: 'arjun.patel@example.com' },
  { name: 'Clara Dubois', email: 'clara.dubois@example.org' },
  { name: 'Liam Anderson', email: 'liam.anderson@example.com' },
  { name: 'Priya Sharma', email: 'priya.sharma@example.org' },
  { name: 'David Miller', email: 'david.miller@example.com' },
  { name: 'Hannah Kim', email: 'hannah.kim@example.org' },
  { name: 'Lucas Vance', email: 'lucas.vance@example.org' },
  { name: 'Maya Lin', email: 'maya.lin@example.com' },
  { name: 'Oliver King', email: 'oliver.king@example.org' },
  { name: 'Chloe Bennett', email: 'chloe.bennett@example.com' },
  { name: 'Gabriel Santos', email: 'gabriel.santos@example.org' }
];

const COMMENT_FEEDBACK = [
  'Excellent breakdown! The diagram explaining connection lifecycles really clarified how exponential backoff prevents server thundering herd issues.',
  'We encountered this exact bottleneck in our staging cluster last month. Adding the composite index reduced p99 latency from 1.2s down to 45ms.',
  'Could you elaborate on how this pattern handles multi-region replication lag during atomic database transactions? Curious about eventual consistency edge cases.',
  'Very clean code examples. We replaced our custom debounce logic with this approach and saw immediate improvements in responsiveness.',
  'Thanks for emphasizing accessibility and keyboard navigation. Too many libraries overlook roving tabindex patterns for nested lists.',
  'The section on memory profiling helped us uncover a lingering event listener leak in our WebSocket subscriber service.',
  'Great insights! Are there any specific benchmark comparisons you recommend when testing this under high concurrent connection loads?',
  'Comprehensive and practical. Sharing this with our platform engineering team as required reading for our upcoming architecture sprint.',
  'Strongly agree on short-lived tokens. Pairing this with automated refresh token rotation gave our security auditors complete peace of mind.',
  'Remarkable depth of explanation. The contrast between client-side rendering bottlenecks and static pre-rendering was particularly illuminating.'
];

function generateComments() {
  const comments = [];
  let id = 1;
  for (let postId = 1; postId <= 100; postId++) {
    for (let c = 0; c < 5; c++) {
      const commenter = COMMENTERS[(postId * 5 + c) % COMMENTERS.length];
      const body = COMMENT_FEEDBACK[(postId + c * 2) % COMMENT_FEEDBACK.length];
      comments.push({
        postId,
        id: id++,
        name: commenter.name,
        email: commenter.email,
        body
      });
    }
  }
  return comments;
}

// ─── 4. ALBUMS (100 records: 10 per user) ───────────────────────────────────
const ALBUM_TITLES = [
  'Tokyo Urban Streetscapes and Neon Reflections',
  'Nordic Mountain Landscapes and Glacial Fjords',
  'Modern Glass Architecture and Structural Geometry',
  'Minimalist Workspace Aesthetics and Creative Setups',
  'Alpine Sunrise Trails and Pine Valleys',
  'Coastal Sea Cliffs and Golden Hour Waves',
  'Cyberpunk Night Market Lanterns and Alleyways',
  'Macro Electronic Circuitry and Microprocessor Hardware',
  'Studio Portraits and Candid Urban Expressions',
  'European Cobblestone Quarters and Historic Facades',
  'Tropical White Sand Shores and Turquoise Waters',
  'Autumn Forest Pathways and Golden Sunlight',
  'Abstract Fluid Gradients and 3D Geometry',
  'Global Skyline Panoramas at Twilight',
  'Engineering Collaboration and Studio Ideation',
  'Starry Night Galaxies over Snowcapped Peaks',
  'Architectural Spiral Staircases and Perspective Depth',
  'Open-Plan Creative Technology Studios',
  'Mediterranean Coastal Villages and Cliffside Vistas',
  'Clean Contemporary Interior Lighting and Spaces'
];

function generateAlbums() {
  const albums = [];
  let id = 1;
  for (let userId = 1; userId <= 10; userId++) {
    for (let a = 0; a < 10; a++) {
      const title = ALBUM_TITLES[(userId * 2 + a) % ALBUM_TITLES.length] + ` - Volume ${((userId + a) % 4) + 1}`;
      albums.push({ userId, id: id++, title });
    }
  }
  return albums;
}

// ─── 5. PHOTOS (5,000 records: 50 per album) ────────────────────────────────
function generatePhotos() {
  const photos = [];
  let id = 1;
  const count = VERIFIED_PHOTOS.length; // 50 verified photos

  for (let albumId = 1; albumId <= 100; albumId++) {
    for (let p = 0; p < 50; p++) {
      // Deterministically pick photo so each album has 50 diverse photos
      const photoIdx = (albumId * 7 + p) % count;
      const seedPhoto = VERIFIED_PHOTOS[photoIdx];

      const url = `https://images.unsplash.com/photo-${seedPhoto.id}?auto=format&fit=crop&w=600&h=600&q=80`;
      const thumbnailUrl = `https://images.unsplash.com/photo-${seedPhoto.id}?auto=format&fit=crop&w=150&h=150&q=80`;
      const title = `${seedPhoto.title} (Capture #${p + 1})`;

      photos.push({
        albumId,
        id: id++,
        title,
        url,
        thumbnailUrl
      });
    }
  }
  return photos;
}

// ─── 6. TODOS (200 records: 20 per user) ────────────────────────────────────
const TODO_TASKS = [
  'Configure multi-factor authentication for administrator accounts',
  'Optimize database indexes for the analytics reporting dashboard',
  'Update API documentation for new v2 authentication endpoints',
  'Improve mobile navigation bar accessibility and keyboard focus',
  'Review and merge payment gateway integration pull request',
  'Implement rate-limiting middleware for public authentication routes',
  'Set up Prometheus monitoring alerts for CPU and memory saturation',
  'Refactor legacy user registration service into modular TypeScript handlers',
  'Audit third-party dependencies for known security vulnerabilities',
  'Extract critical CSS above the fold to enhance Largest Contentful Paint',
  'Configure automated daily database snapshot backups and retention policy',
  'Implement exponential backoff retry mechanism for external webhook calls',
  'Conduct WCAG 2.1 AA accessibility audit across all checkout modals',
  'Establish staging deployment verification smoke tests in CI/CD pipeline',
  'Migrate session caching layer to Redis cluster for high availability',
  'Document disaster recovery failover procedures in engineering runbook',
  'Optimize high-resolution asset compression pipeline for AVIF formats',
  'Review pull request adding OpenTelemetry distributed trace correlation',
  'Benchmark PostgreSQL query performance under simulated peak load',
  'Implement zero-downtime database schema migration strategy'
];

function generateTodos() {
  const todos = [];
  let id = 1;
  for (let userId = 1; userId <= 10; userId++) {
    for (let t = 0; t < 20; t++) {
      const taskBase = TODO_TASKS[t];
      // Deterministic balanced true/false (~45% completed)
      const completed = (id * 7 + userId * 3) % 2 === 0;
      todos.push({
        userId,
        id: id++,
        title: taskBase,
        completed
      });
    }
  }
  return todos;
}

// ─── MAIN BUILD ─────────────────────────────────────────────────────────────
function buildDataset() {
  console.log('Generating fresh, realistic JSONPlaceholder mock dataset...');

  const users = USERS;
  const posts = generatePosts();
  const comments = generateComments();
  const albums = generateAlbums();
  const photos = generatePhotos();
  const todos = generateTodos();

  const data = {
    posts,
    comments,
    albums,
    photos,
    todos,
    users
  };

  const targetPath = path.join(__dirname, '../data.json');
  console.log(`Writing dataset to ${targetPath}...`);
  fs.writeFileSync(targetPath, JSON.stringify(data, null, 2), 'utf-8');

  console.log('Generation completed successfully!');
  console.log(`- Users:    ${users.length}`);
  console.log(`- Posts:    ${posts.length}`);
  console.log(`- Comments: ${comments.length}`);
  console.log(`- Albums:   ${albums.length}`);
  console.log(`- Photos:   ${photos.length}`);
  console.log(`- Todos:    ${todos.length}`);
}

buildDataset();
