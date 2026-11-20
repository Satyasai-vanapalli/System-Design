export type Track = 'Foundations' | 'LLD' | 'HLD' | 'Advanced'

export interface Lesson {
  slug: string
  title: string
  minutes: number
  description: string
}

export interface Module {
  id: string
  number: string
  title: string
  track: Track
  level: string
  time: string
  description: string
  lessons: Lesson[]
  ideas: string[]
  practice: string
}

export const CURRICULUM: Module[] = [
  {
    id: 'foundations', number: '01', title: 'Think in systems', track: 'Foundations', level: 'Start here', time: '2.5 hours',
    description: 'Build the habits behind every good design: clarify the problem, name the constraints, then make the tradeoffs visible.',
    ideas: ['Start with users and use cases, not infrastructure.', 'Separate functional requirements from quality goals.', 'Make assumptions explicit so they can be challenged.'],
    practice: 'Design a photo sharing app for a small community. Write down its three most important user actions and the quality goal that could shape each one.',
    lessons: [
      { slug: 'systems-thinking', title: 'What system design actually is', minutes: 18, description: 'Learn to model a service as cooperating parts, each with a clear responsibility and a measurable boundary.' },
      { slug: 'requirements', title: 'Functional & non-functional requirements', minutes: 22, description: 'Turn a fuzzy prompt into user stories, scale assumptions, availability goals, and explicit constraints.' },
      { slug: 'estimation', title: 'Back-of-the-envelope estimation', minutes: 25, description: 'Estimate requests, storage, and bandwidth with simple arithmetic before choosing an architecture.' },
      { slug: 'api-design', title: 'APIs, protocols & contracts', minutes: 24, description: 'Choose request and event shapes that make service boundaries understandable and evolvable.' },
    ],
  },
  {
    id: 'building-blocks', number: '02', title: 'The building blocks', track: 'Foundations', level: 'Core concepts', time: '5 hours',
    description: 'Understand what the parts of a real architecture do, where they help, and what new problems they introduce.',
    ideas: ['Every component solves a problem and creates a new tradeoff.', 'Data shape and access patterns should guide storage choices.', 'Caches and queues need clear correctness and failure rules.'],
    practice: 'Sketch a URL shortener using only the building blocks you have learned. Trace one create request and one redirect request.',
    lessons: [
      { slug: 'networking', title: 'The web, DNS & request lifecycle', minutes: 24, description: 'Follow a request from a browser through DNS, TLS, proxies, and the application that answers it.' },
      { slug: 'load-balancing', title: 'Load balancing & reverse proxies', minutes: 23, description: 'Distribute traffic across healthy instances, and compare routing, health checks, and balancing strategies.' },
      { slug: 'databases', title: 'Relational & NoSQL databases', minutes: 28, description: 'Match relational, document, key-value, graph, and wide-column storage to the shape of your data.' },
      { slug: 'indexes', title: 'Indexes, queries & data modeling', minutes: 24, description: 'Design indexes from real query patterns and understand the write and storage costs they add.' },
      { slug: 'replication-sharding', title: 'Replication, partitioning & sharding', minutes: 30, description: 'Scale reads and data volume while reasoning about replicas, partition keys, and rebalancing.' },
      { slug: 'caching', title: 'Caching & cache invalidation', minutes: 26, description: 'Place caches at the right layer and choose a freshness strategy that matches product expectations.' },
      { slug: 'queues-streams', title: 'Queues, events & stream processing', minutes: 26, description: 'Move work out of request paths with queues, pub/sub, and ordered event streams.' },
      { slug: 'cdn-storage-search', title: 'CDNs, object storage & search', minutes: 24, description: 'Serve files close to users, store large blobs, and build indexes for discovery.' },
      { slug: 'realtime', title: 'Real-time delivery: WebSockets & SSE', minutes: 22, description: 'Choose between polling, server-sent events, and WebSockets for live product experiences.' },
    ],
  },
  {
    id: 'lld-fundamentals', number: '03', title: 'Low-level design', track: 'LLD', level: 'Object design', time: '4 hours',
    description: 'Move from requirements to clean, testable object models that are easy to change without overengineering.',
    ideas: ['Give each object one clear reason to change.', 'Depend on behaviors through small interfaces.', 'Model invariants explicitly and keep mutable state in safe boundaries.'],
    practice: 'Model a parking garage with multiple vehicle sizes. Show the objects responsible for finding a spot, parking, and producing a receipt.',
    lessons: [
      { slug: 'oop-modeling', title: 'Object-oriented modeling', minutes: 25, description: 'Find the important domain objects, behaviors, and invariants hiding in a problem statement.' },
      { slug: 'solid', title: 'SOLID principles in practice', minutes: 30, description: 'Use the SOLID principles as design pressure tests, not a checklist for creating more classes.' },
      { slug: 'uml-composition', title: 'UML, composition & relationships', minutes: 24, description: 'Sketch class relationships and favor object composition when behavior should vary independently.' },
      { slug: 'interfaces-extensibility', title: 'Interfaces, extensibility & test seams', minutes: 27, description: 'Create the smallest useful abstractions and keep core logic easy to test in isolation.' },
      { slug: 'concurrency-idempotency', title: 'Concurrency, locking & idempotency', minutes: 30, description: 'Protect shared state and make repeated commands safe under retries and concurrent calls.' },
    ],
  },
  {
    id: 'patterns', number: '04', title: 'Design patterns', track: 'LLD', level: 'Reusable design', time: '3.5 hours',
    description: 'Recognize recurring object-design problems and choose a pattern only when it makes the change easier.',
    ideas: ['A pattern names a collaboration, not a ready-made implementation.', 'Prefer the smallest pattern that removes real coupling.', 'Know the problem a pattern solves before memorizing its class diagram.'],
    practice: 'Pick a recent code change. Identify what varied, where that variation lives, and whether a pattern would reduce the number of places you must edit.',
    lessons: [
      { slug: 'pattern-fundamentals', title: 'How to read and choose patterns', minutes: 18, description: 'Learn the pattern vocabulary: intent, participants, collaboration, and the cost of introducing an abstraction.' },
      { slug: 'creational-patterns', title: 'Creational patterns', minutes: 22, description: 'Compare Factory Method, Abstract Factory, Builder, Singleton, and Prototype through their creation tradeoffs.' },
      { slug: 'structural-patterns', title: 'Structural patterns', minutes: 22, description: 'Use Adapter, Decorator, Facade, Proxy, and Composite to reshape or compose object relationships.' },
      { slug: 'behavioral-patterns', title: 'Behavioral patterns', minutes: 24, description: 'Choose between Strategy, Observer, Command, State, and other ways to organize changing behavior.' },
    ],
  },
  {
    id: 'lld-case-studies', number: '05', title: 'LLD case studies', track: 'LLD', level: 'Build confidence', time: '5 hours',
    description: 'Practice the interview rhythm: clarify, sketch responsibilities, model interactions, then extend the design.',
    ideas: ['Write down the main use cases before naming classes.', 'Keep policy decisions out of low-level data objects.', 'Walk the design through one happy path and one failure.'],
    practice: 'Choose one case study and implement a thin vertical slice: one user action, its domain rule, and a test of the most important invariant.',
    lessons: [
      { slug: 'parking-lot-design', title: 'Parking lot', minutes: 35, description: 'Model spot allocation, vehicle fit, tickets, payments, and the policy that chooses an available spot.' },
      { slug: 'elevator-design', title: 'Elevator control system', minutes: 38, description: 'Separate requests, scheduling policy, elevator state, and the control loop in a multi-car system.' },
      { slug: 'vending-machine-design', title: 'Vending machine', minutes: 30, description: 'Use explicit states and domain rules to handle selection, payment, inventory, and refunds.' },
      { slug: 'splitwise-design', title: 'Expense sharing', minutes: 38, description: 'Represent groups, balances, split strategies, and settlement while keeping money arithmetic precise.' },
      { slug: 'notification-design', title: 'Notification service', minutes: 36, description: 'Route notifications across channels with templates, preferences, retries, and delivery status.' },
      { slug: 'library-design', title: 'Library management system', minutes: 30, description: 'Model titles, physical copies, reservations, lending policies, and overdue workflows.' },
    ],
  },
  {
    id: 'hld-fundamentals', number: '06', title: 'High-level design', track: 'HLD', level: 'Distributed systems', time: '5.5 hours',
    description: 'Design services that stay understandable as load, teams, data volume, and failure modes grow.',
    ideas: ['Distributed calls can fail, time out, or arrive more than once.', 'Consistency is a product decision with user-visible consequences.', 'Make failure handling part of the happy-path architecture.'],
    practice: 'Take a familiar application and draw its request path, data stores, asynchronous work, and the first component you would scale.',
    lessons: [
      { slug: 'monolith-microservices', title: 'Monoliths, services & boundaries', minutes: 28, description: 'Choose service boundaries from business capabilities and understand when a modular monolith is the right start.' },
      { slug: 'data-consistency', title: 'Consistency, transactions & sagas', minutes: 32, description: 'Reason about read-after-write, transactions, eventual consistency, and workflows that span services.' },
      { slug: 'cap-consensus', title: 'CAP, quorum reads & consensus', minutes: 32, description: 'Build an intuitive model for network partitions, quorum decisions, leader election, and replicated logs.' },
      { slug: 'reliability-resilience', title: 'Timeouts, retries & resilience', minutes: 28, description: 'Use deadlines, bounded retries, circuit breakers, bulkheads, and graceful degradation deliberately.' },
      { slug: 'rate-limiting', title: 'Rate limiting & overload control', minutes: 24, description: 'Protect services with token buckets, leaky buckets, quotas, backpressure, and fair admission.' },
      { slug: 'security-design', title: 'Security & privacy by design', minutes: 26, description: 'Design identity, authorization, secrets, encryption, and data minimization into the system.' },
      { slug: 'architecture-review', title: 'Architecture tradeoffs & review', minutes: 23, description: 'Compare options with explicit quality goals, operational costs, and a clear record of assumptions.' },
    ],
  },
  {
    id: 'hld-case-studies', number: '07', title: 'HLD case studies', track: 'HLD', level: 'End-to-end design', time: '7 hours',
    description: 'Apply the building blocks to recognizable products, from the core API to storage and operations.',
    ideas: ['Start every design with the most important read and write paths.', 'Estimate the load before picking a scaling strategy.', 'Show how the design changes when a dependency slows or fails.'],
    practice: 'Revisit one design after doubling its users, then after a region outage. Explain which assumptions force a change.',
    lessons: [
      { slug: 'url-shortener', title: 'URL shortener', minutes: 40, description: 'Design key generation, redirects, analytics, and storage for a highly read-heavy service.' },
      { slug: 'news-feed', title: 'News feed & timeline', minutes: 45, description: 'Compare fan-out on write and read, then handle ranking, freshness, and celebrity accounts.' },
      { slug: 'chat-system', title: 'Chat & messaging', minutes: 45, description: 'Route live messages, preserve ordering, manage delivery status, and store conversation history.' },
      { slug: 'video-streaming', title: 'Video streaming', minutes: 45, description: 'Build an upload, processing, packaging, and global delivery pipeline for video.' },
      { slug: 'ride-hailing', title: 'Ride hailing & location search', minutes: 45, description: 'Find nearby drivers, match supply to demand, and stream changing trip locations.' },
      { slug: 'cloud-drive', title: 'Cloud file storage', minutes: 45, description: 'Handle large uploads, chunking, synchronization, sharing, and durable metadata.' },
      { slug: 'metrics-platform', title: 'Metrics & logging platform', minutes: 40, description: 'Ingest high-volume events, aggregate time series, and answer time-windowed queries.' },
    ],
  },
  {
    id: 'advanced', number: '08', title: 'Production & advanced topics', track: 'Advanced', level: 'Beyond the whiteboard', time: '4 hours',
    description: 'Think past launch: operate the system, control cost, and evolve it safely as the product changes.',
    ideas: ['Operational visibility is part of the design, not a follow-up task.', 'Scale has a financial cost; optimize for the workload that matters.', 'Prefer reversible changes and a migration path over a risky rewrite.'],
    practice: 'Write a launch checklist for your case study: the three signals to watch, one rollback trigger, and one costly workload to measure.',
    lessons: [
      { slug: 'observability', title: 'Observability: logs, metrics & traces', minutes: 28, description: 'Connect application signals to user impact and trace a slow request across service boundaries.' },
      { slug: 'deployment-evolution', title: 'Deployment, migrations & rollbacks', minutes: 26, description: 'Ship schema and service changes safely with staged rollouts, compatibility, and rollback plans.' },
      { slug: 'multi-region', title: 'Multi-region architecture', minutes: 30, description: 'Balance latency, availability, data residency, and replication when a single region is not enough.' },
      { slug: 'capacity-cost', title: 'Capacity planning & cloud cost', minutes: 25, description: 'Estimate the cost drivers of a workload and find the changes that improve cost per useful outcome.' },
      { slug: 'architecture-evolution', title: 'Evolving architecture over time', minutes: 24, description: 'Recognize when a design constraint is real and plan incremental changes that keep shipping possible.' },
    ],
  },
]

export interface Pattern {
  slug: string
  name: string
  family: 'Creational' | 'Structural' | 'Behavioral'
  intent: string
  usefulWhen: string
  example: string
}

export const PATTERNS: Pattern[] = [
  { slug: 'pattern-factory-method', name: 'Factory Method', family: 'Creational', intent: 'Let a subtype decide which concrete product to create while keeping client code focused on the product contract.', usefulWhen: 'Creation varies by context, plugin, or environment.', example: 'A notification sender creates email, SMS, or push delivery objects.' },
  { slug: 'pattern-abstract-factory', name: 'Abstract Factory', family: 'Creational', intent: 'Create a compatible family of related objects through one shared factory contract.', usefulWhen: 'A product needs swappable sets of matching components.', example: 'A UI kit creates buttons and menus for the same visual theme.' },
  { slug: 'pattern-builder', name: 'Builder', family: 'Creational', intent: 'Construct a complex object in clear steps and keep optional configuration readable.', usefulWhen: 'An object has many optional fields or validation rules.', example: 'A query builder composes filters, sorting, and pagination.' },
  { slug: 'pattern-singleton', name: 'Singleton', family: 'Creational', intent: 'Ensure one shared instance and provide a well-known access point.', usefulWhen: 'A single process-wide resource truly needs one owner; avoid using it as a global state shortcut.', example: 'A carefully scoped in-process registry or configuration snapshot.' },
  { slug: 'pattern-prototype', name: 'Prototype', family: 'Creational', intent: 'Create a new object by copying a configured prototype.', usefulWhen: 'Creating a configured object is more expensive than copying it.', example: 'Cloning a preconfigured game object or document template.' },
  { slug: 'pattern-adapter', name: 'Adapter', family: 'Structural', intent: 'Translate one interface into another expected by its client.', usefulWhen: 'You need to integrate a useful dependency with an incompatible API.', example: 'Wrap a third-party payment SDK behind your internal payment interface.' },
  { slug: 'pattern-decorator', name: 'Decorator', family: 'Structural', intent: 'Add behavior by wrapping an object while preserving its interface.', usefulWhen: 'Optional responsibilities should compose without a subclass for every combination.', example: 'Add compression and encryption around a storage client.' },
  { slug: 'pattern-facade', name: 'Facade', family: 'Structural', intent: 'Offer a small, convenient entry point to a complex subsystem.', usefulWhen: 'Callers should not coordinate a long sequence of low-level services.', example: 'A checkout service coordinates inventory, pricing, and payment.' },
  { slug: 'pattern-proxy', name: 'Proxy', family: 'Structural', intent: 'Stand in for another object to control access, timing, or location.', usefulWhen: 'Access needs lazy loading, authorization, caching, or a remote boundary.', example: 'A client stub forwards calls to a remote service.' },
  { slug: 'pattern-composite', name: 'Composite', family: 'Structural', intent: 'Treat a tree of individual objects and groups through the same interface.', usefulWhen: 'Clients should apply one operation to a part or a whole hierarchy.', example: 'A file explorer sums sizes for files and nested folders.' },
  { slug: 'pattern-strategy', name: 'Strategy', family: 'Behavioral', intent: 'Encapsulate interchangeable algorithms behind one behavior contract.', usefulWhen: 'The algorithm varies independently from the code that uses it.', example: 'Choose a pricing, routing, or sorting policy at runtime.' },
  { slug: 'pattern-observer', name: 'Observer', family: 'Behavioral', intent: 'Notify interested subscribers when a subject publishes a change.', usefulWhen: 'Many independent consumers react to an event without direct coupling.', example: 'An order event updates email, analytics, and fulfillment subscribers.' },
  { slug: 'pattern-command', name: 'Command', family: 'Behavioral', intent: 'Represent an action as an object that can be queued, logged, retried, or undone.', usefulWhen: 'The caller and the action executor should be decoupled.', example: 'A job queue stores commands for background workers.' },
  { slug: 'pattern-state', name: 'State', family: 'Behavioral', intent: 'Let an object change its behavior when its internal state changes.', usefulWhen: 'State-specific rules and transitions are overwhelming conditional logic.', example: 'An order moves through draft, paid, shipped, and cancelled states.' },
  { slug: 'pattern-template-method', name: 'Template Method', family: 'Behavioral', intent: 'Define the stable outline of an algorithm and let steps vary in subclasses.', usefulWhen: 'Several workflows share the same sequence but customize a few steps.', example: 'Import pipelines share validation and reporting but parse different formats.' },
  { slug: 'pattern-chain-of-responsibility', name: 'Chain of Responsibility', family: 'Behavioral', intent: 'Pass a request through handlers until one handles it or the chain ends.', usefulWhen: 'A set of checks should be composed and reordered independently.', example: 'An HTTP middleware chain handles authentication, logging, and routing.' },
]

export const ALL_LESSONS = CURRICULUM.flatMap((module) => module.lessons)

export function findLesson(slug: string) {
  for (const module of CURRICULUM) {
    const lesson = module.lessons.find((item) => item.slug === slug)
    if (lesson) return { lesson, module }
  }
  const pattern = PATTERNS.find((item) => item.slug === slug)
  if (pattern) {
    const module = CURRICULUM.find((item) => item.id === 'patterns')!
    return {
      module,
      lesson: { slug: pattern.slug, title: pattern.name, minutes: 14, description: pattern.intent },
      pattern,
    }
  }
  return undefined
}
