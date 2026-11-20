export interface ProjectMilestone {
  title: string
  guide: string
  doneWhen: string
}

export interface GuidedProject {
  slug: string
  number: string
  title: string
  level: 'Starter' | 'Intermediate' | 'Advanced'
  focus: string
  duration: string
  summary: string
  outcome: string
  skills: string[]
  prerequisites: { title: string; slug: string }[]
  architecture: { name: string; responsibility: string }[]
  api: string[]
  dataModel: string
  milestones: ProjectMilestone[]
  acceptance: string[]
  extensions: string[]
}

export const PROJECTS: GuidedProject[] = [
  {
    slug: 'url-shortener', number: '01', title: 'Build a URL shortener', level: 'Starter', focus: 'API design · data modeling · caching', duration: '2–3 sessions',
    summary: 'Turn a long URL into a short link, redirect visitors quickly, and keep basic click counts. Start as one service, then improve it for read-heavy traffic.',
    outcome: 'A working service with create, redirect, expiry, and analytics flows, plus a short design note explaining how it scales.',
    skills: ['REST APIs', 'Relational data', 'Key generation', 'Cache-aside', 'Read-heavy scaling'],
    prerequisites: [{ title: 'Requirements & quality goals', slug: 'requirements' }, { title: 'APIs and contracts', slug: 'api-design' }, { title: 'Data modeling', slug: 'indexes' }, { title: 'Caching', slug: 'caching' }],
    architecture: [
      { name: 'HTTP API', responsibility: 'Validates requests, authenticates owners if you add accounts, and returns short codes.' },
      { name: 'Link service', responsibility: 'Applies expiry and alias rules, generates codes, and coordinates storage.' },
      { name: 'Link database', responsibility: 'Stores code, destination URL, owner, created time, and optional expiry.' },
      { name: 'Redirect cache', responsibility: 'Keeps popular code-to-URL lookups close to the redirect path.' },
      { name: 'Click event worker', responsibility: 'Counts visits asynchronously so analytics do not slow down redirects.' },
    ],
    api: ['POST /links — create a short link from a destination URL.', 'GET /{code} — resolve a code and return an HTTP redirect.', 'GET /links/{code}/stats — show clicks and link metadata.', 'DELETE /links/{code} — disable a link owned by the caller.'],
    dataModel: 'Link(code, destination_url, owner_id, created_at, expires_at, disabled_at). ClickEvent(code, visited_at, referrer, coarse_region). Make code unique. Store individual events only if the analytics requirements justify the extra volume; otherwise update a counter asynchronously.',
    milestones: [
      { title: '1. Define the contract', guide: 'Write down valid URLs, custom alias rules, expiry behavior, redirect status, and what unknown or disabled codes return. Estimate creates and redirects per day.', doneWhen: 'You can describe the create and redirect flows, and have request/response examples for both.' },
      { title: '2. Model the data and code generator', guide: 'Create the Link record and a unique index on code. Begin with a random URL-safe token; retry if a collision occurs. Keep the generator behind a small interface.', doneWhen: 'Two links never overwrite each other, even if a generated code collides.' },
      { title: '3. Build create and redirect paths', guide: 'Implement POST /links and GET /{code}. Validate input, persist before returning, and use a permanent redirect only when destinations cannot change.', doneWhen: 'A created link redirects correctly, and an unknown code returns a clear not-found response.' },
      { title: '4. Add expiry, ownership, and analytics', guide: 'Check expiry on lookup, protect owner operations, and publish a click event after resolving a redirect. Count clicks in a worker or a simple background task.', doneWhen: 'Expired links stop resolving; analytics failures do not break redirects.' },
      { title: '5. Measure and scale the hot path', guide: 'Add a cache-aside lookup for popular codes. Set a TTL no longer than link expiry, and invalidate or update the cache when a link is disabled.', doneWhen: 'A load test shows database reads fall for repeated popular redirects, with a plan for stale cache entries.' },
    ],
    acceptance: ['Codes are unique and URL-safe.', 'Redirect latency does not wait for analytics aggregation.', 'Expiry and disabled links are enforced on every path.', 'The design note names the cache invalidation rule and expected read/write load.'],
    extensions: ['Compare random codes with base-62 IDs and discuss what each reveals.', 'Add abuse protection and per-user creation quotas.', 'Partition click events by time and build daily analytics.', 'Add regional redirect caches and explain how invalidation propagates.'],
  },
  {
    slug: 'parking-lot', number: '02', title: 'Design a parking garage', level: 'Intermediate', focus: 'LLD · object modeling · concurrency', duration: '3–4 sessions',
    summary: 'Model a multi-floor garage with different spot sizes, entrance terminals, tickets, and payments. Keep allocation rules replaceable and protect spots from being issued twice.',
    outcome: 'A small domain application with testable parking policies, ticket/payment flows, and a diagram of the main object collaborations.',
    skills: ['UML & composition', 'SOLID', 'Strategy pattern', 'State transitions', 'Concurrency'],
    prerequisites: [{ title: 'Object-oriented modeling', slug: 'oop-modeling' }, { title: 'SOLID principles', slug: 'solid' }, { title: 'Composition & relationships', slug: 'uml-composition' }, { title: 'Concurrency & idempotency', slug: 'concurrency-idempotency' }],
    architecture: [
      { name: 'Garage', responsibility: 'Owns floors and the inventory of parking spots.' },
      { name: 'Spot allocator', responsibility: 'Finds a compatible free spot using a policy such as nearest entrance or smallest fit.' },
      { name: 'Parking session', responsibility: 'Tracks the vehicle, assigned spot, ticket, and arrival/exit times.' },
      { name: 'Payment policy', responsibility: 'Calculates fees from duration and vehicle type without changing ticket logic.' },
      { name: 'Terminal', responsibility: 'Starts an arrival or departure use case and displays the result to the attendant or driver.' },
    ],
    api: ['arrive(vehicle) — assign a spot and issue a ticket.', 'findTicket(ticketId) — retrieve the active parking session.', 'quote(ticketId, exitTime) — calculate a fee without collecting payment.', 'depart(ticketId, paymentId) — settle once and release the spot.'],
    dataModel: 'Vehicle(id, type, plate). ParkingSpot(id, floor, size, state). Ticket(id, vehicle_id, spot_id, entry_time, exit_time, status). Payment(id, ticket_id, amount, status, provider_reference). Keep state changes explicit: FREE → OCCUPIED → FREE; ticket states may be OPEN → PAID → CLOSED.',
    milestones: [
      { title: '1. Clarify rules and draw the model', guide: 'Choose supported vehicle types, spot sizes, floors, fee rules, and what happens when the lot is full. Sketch Garage, Floor, Spot, Vehicle, Ticket, and Payment relationships.', doneWhen: 'Your use cases and domain invariants fit on one page; no class is responsible for every rule.' },
      { title: '2. Implement spot matching', guide: 'Define a SpotAllocationStrategy interface and implement smallest-fit and nearest-entrance policies. Keep occupancy changes inside the spot or garage boundary.', doneWhen: 'Unit tests cover compatible spots, full capacity, and each allocation policy.' },
      { title: '3. Build arrival and ticketing', guide: 'Make arrival a clear sequence: validate vehicle, reserve a spot, create a ticket, then return the ticket. Decide how a failure rolls back a reservation.', doneWhen: 'A failed ticket creation cannot leave a spot permanently occupied.' },
      { title: '4. Add quote, payment, and exit', guide: 'Inject a fee strategy; keep payment as a separate operation. Release the spot only after a successful or explicitly accepted payment outcome.', doneWhen: 'Repeated exit requests are idempotent and cannot charge twice.' },
      { title: '5. Handle simultaneous arrivals', guide: 'Run two arrivals against the last available spot. Add a transaction, lock, or atomic compare-and-set around reservation, then explain the tradeoff.', doneWhen: 'A concurrency test proves the same spot is never assigned to two active sessions.' },
    ],
    acceptance: ['Spot assignment is compatible with vehicle size.', 'Allocation and fee policies can change without rewriting ticket flow.', 'A spot cannot be double-booked under concurrent arrivals.', 'Ticket and payment state transitions reject invalid operations.'],
    extensions: ['Add EV charging spots and a charging reservation.', 'Add monthly passes and lost-ticket rules.', 'Support multiple garage locations using a facade over garage-specific services.', 'Draw a sequence diagram for two cars arriving at the same time.'],
  },
  {
    slug: 'notification-service', number: '03', title: 'Create a notification service', level: 'Intermediate', focus: 'LLD + HLD · queues · retries', duration: '4–5 sessions',
    summary: 'Accept a notification request, choose a channel, and deliver it reliably in the background. Handle user preferences, provider failures, retries, and duplicate requests.',
    outcome: 'A channel-based notification worker with observable delivery states, idempotent requests, and a failure queue.',
    skills: ['Strategy & Factory', 'Async messaging', 'Idempotency', 'Retry policies', 'Dead-letter queues'],
    prerequisites: [{ title: 'Behavioral design patterns', slug: 'behavioral-patterns' }, { title: 'Queues & event streams', slug: 'queues-streams' }, { title: 'Resilience & retries', slug: 'reliability-resilience' }, { title: 'Security & privacy', slug: 'security-design' }],
    architecture: [
      { name: 'Request API', responsibility: 'Authenticates callers, validates a template and recipient, and returns a notification ID.' },
      { name: 'Preference & template service', responsibility: 'Checks consent/channel settings and renders a versioned message.' },
      { name: 'Notification queue', responsibility: 'Buffers accepted work and separates customer requests from provider speed.' },
      { name: 'Channel workers', responsibility: 'Send through email, SMS, or push adapters with bounded concurrency.' },
      { name: 'Delivery store & DLQ', responsibility: 'Tracks each attempt and isolates messages that exceed retry limits.' },
    ],
    api: ['POST /notifications — accept a request with an idempotency key.', 'GET /notifications/{id} — return current state and last failure reason.', 'PUT /users/{id}/preferences — update consent and enabled channels.', 'POST /notifications/{id}/retry — request an authorized retry for a terminal failure.'],
    dataModel: 'Notification(id, idempotency_key, recipient_id, template_id, channel, status, created_at). DeliveryAttempt(id, notification_id, provider, attempt, status, error_code, tried_at). UserPreference(user_id, channel, enabled, verified_at). Store provider error codes without retaining unnecessary message content.',
    milestones: [
      { title: '1. Define delivery states', guide: 'Write a state machine such as ACCEPTED → QUEUED → SENDING → SENT, with RETRY_WAIT and FAILED branches. Decide which errors are permanent.', doneWhen: 'Every state has allowed transitions and a visible meaning for the caller.' },
      { title: '2. Build the request and idempotency boundary', guide: 'Accept a request, verify consent, render or reference a template, and persist before enqueueing. Use a unique idempotency key to deduplicate client retries.', doneWhen: 'Repeating the same request returns the same notification ID and does not enqueue duplicate delivery.' },
      { title: '3. Add channel adapters and workers', guide: 'Define a shared channel sender contract and implement a fake email sender first. Add SMS or push later without branching throughout the domain code.', doneWhen: 'A worker consumes a queued message and writes a delivery attempt with a deterministic fake provider.' },
      { title: '4. Retry safely and isolate failures', guide: 'Retry transient timeouts with exponential backoff and jitter. Never retry invalid addresses indefinitely. After a limit, move the message to a dead-letter queue for inspection.', doneWhen: 'Transient failures recover; permanent failures stop; a poison message does not block later work.' },
      { title: '5. Add observability and privacy checks', guide: 'Measure queue age, success rate, retries, and provider latency. Redact message bodies and recipient identifiers from application logs.', doneWhen: 'A dashboard or report shows delivery health without exposing private message content.' },
    ],
    acceptance: ['Caller retries do not create duplicate notifications.', 'User preferences and consent are checked before delivery.', 'Provider errors are classified as transient or permanent.', 'Failed messages can be inspected and replayed safely.'],
    extensions: ['Add per-provider rate limits and circuit breakers.', 'Add scheduled delivery and quiet hours.', 'Use an outbox table to make database writes and enqueueing reliable.', 'Add template localization and version pinning.'],
  },
  {
    slug: 'realtime-chat', number: '04', title: 'Build real-time group chat', level: 'Advanced', focus: 'HLD · WebSockets · consistency', duration: '5–7 sessions',
    summary: 'Create conversations, persist messages, and deliver them to connected members in real time. Then add reconnect, ordering, offline delivery, and presence.',
    outcome: 'A working chat slice with durable messages, live delivery, and a documented approach to ordering and reconnects.',
    skills: ['WebSockets', 'Message persistence', 'Pub/sub', 'Ordering', 'Presence & reconnects'],
    prerequisites: [{ title: 'Real-time protocols', slug: 'realtime' }, { title: 'Data consistency', slug: 'data-consistency' }, { title: 'Queues & streams', slug: 'queues-streams' }, { title: 'Resilience', slug: 'reliability-resilience' }],
    architecture: [
      { name: 'Connection gateway', responsibility: 'Authenticates a socket, tracks its connection, and routes frames to the right service.' },
      { name: 'Conversation service', responsibility: 'Checks membership and assigns a conversation-scoped sequence to each message.' },
      { name: 'Message store', responsibility: 'Persists messages before acknowledging them and supports cursor-based history.' },
      { name: 'Fan-out channel', responsibility: 'Publishes accepted messages to gateways with connected recipients.' },
      { name: 'Presence store', responsibility: 'Tracks short-lived connection leases; presence is approximate and may lag.' },
    ],
    api: ['POST /conversations — create a group and its membership.', 'GET /conversations/{id}/messages?before={cursor} — load older messages.', 'WebSocket SEND_MESSAGE — send client message ID, conversation ID, and body.', 'WebSocket MESSAGE_ACK / MESSAGE_RECEIVED — acknowledge persistence and recipient delivery separately.'],
    dataModel: 'Conversation(id, created_at). Membership(conversation_id, user_id, role, joined_at). Message(id, conversation_id, sequence, sender_id, client_message_id, body, created_at). Unique client_message_id per sender/conversation prevents retry duplicates. Use (conversation_id, sequence) for ordered pagination.',
    milestones: [
      { title: '1. Establish the message contract', guide: 'Define connect/auth, send, persisted acknowledgment, recipient delivery, and error frames. Separate “stored” from “seen by every recipient.”', doneWhen: 'A client can reconnect and distinguish a stored message from a delivery receipt.' },
      { title: '2. Persist before acknowledging', guide: 'Authorize conversation membership, deduplicate client message IDs, assign an order, and persist the message before returning ACK.', doneWhen: 'If the gateway stops after persistence, retrying the same client ID returns the original stored message.' },
      { title: '3. Deliver to connected members', guide: 'Maintain a connection-to-user map at each gateway. For multiple gateways, publish through a broker so the gateway with each recipient can forward the message.', doneWhen: 'A member connected to another gateway receives the new message exactly once from the client’s point of view.' },
      { title: '4. Add history and reconnect cursors', guide: 'Load messages with a stable sequence cursor. On reconnect, the client asks for messages after its last confirmed sequence, then resumes live delivery.', doneWhen: 'A dropped connection can catch up without gaps or duplicate bubbles.' },
      { title: '5. Add presence and failure behavior', guide: 'Represent presence as expiring leases rather than a permanent boolean. Define what happens if a broker is slow, a gateway restarts, or a user has many devices.', doneWhen: 'Stale connections expire and a dependency outage does not lose persisted messages.' },
    ],
    acceptance: ['A message is durable before the sender receives a persisted acknowledgment.', 'Retries with the same client message ID do not duplicate history.', 'History uses stable cursor pagination.', 'Presence can become stale without corrupting message delivery.'],
    extensions: ['Add read receipts and per-user last-read cursors.', 'Add attachments through object storage with expiring upload URLs.', 'Partition conversations by ID and explain hot group tradeoffs.', 'Add end-to-end encryption and discuss search and moderation tradeoffs.'],
  },
  {
    slug: 'video-platform', number: '05', title: 'Design a video-on-demand platform', level: 'Advanced', focus: 'HLD · object storage · media pipeline', duration: '6–8 sessions',
    summary: 'Take a video from upload to playback. Separate large-file transfer, asynchronous transcoding, metadata, and global delivery so each part can scale independently.',
    outcome: 'An upload-to-playback design with a small working vertical slice, operational signals, and capacity assumptions.',
    skills: ['Object storage', 'Multipart uploads', 'Queues & workers', 'CDN delivery', 'Capacity planning'],
    prerequisites: [{ title: 'Object storage & CDNs', slug: 'cdn-storage-search' }, { title: 'Queues & streams', slug: 'queues-streams' }, { title: 'API contracts', slug: 'api-design' }, { title: 'Capacity & cost', slug: 'capacity-cost' }],
    architecture: [
      { name: 'Upload API', responsibility: 'Creates an upload session and grants short-lived, scoped upload URLs.' },
      { name: 'Original object store', responsibility: 'Holds uploaded source files durably, separate from application metadata.' },
      { name: 'Transcode queue & workers', responsibility: 'Converts source media into multiple bitrates and segments for adaptive playback.' },
      { name: 'Catalog service', responsibility: 'Tracks ownership, processing state, renditions, privacy, and playback metadata.' },
      { name: 'Origin & CDN', responsibility: 'Serves manifests and segments near viewers while protecting the origin from repeated reads.' },
    ],
    api: ['POST /videos/uploads — create an upload session and return multipart instructions.', 'POST /videos/{id}/complete — verify uploaded parts and enqueue processing.', 'GET /videos/{id} — return processing state and available renditions.', 'GET /videos/{id}/playback — return an authorized manifest URL.'],
    dataModel: 'Video(id, owner_id, title, visibility, status, created_at). UploadPart(video_id, part_number, checksum, object_key). Rendition(video_id, format, bitrate, width, height, manifest_key, status). ProcessingJob(id, video_id, stage, attempts, started_at, completed_at). Store bytes in object storage; keep relational metadata small.',
    milestones: [
      { title: '1. Estimate uploads and playback', guide: 'Assume daily uploads, average source size, average view duration, and rendition count. Estimate storage growth, transcode work, and CDN egress.', doneWhen: 'Your assumptions and rough storage/bandwidth calculations fit on one page.' },
      { title: '2. Build resumable upload', guide: 'Create a video record and upload session. Send large files in checksummed parts directly to object storage instead of proxying bytes through the API.', doneWhen: 'An interrupted upload resumes from completed parts and rejects a part with the wrong checksum.' },
      { title: '3. Queue processing after completion', guide: 'Verify all parts, assemble or finalize the source object, then enqueue a job. Make each processing stage idempotent so retries do not duplicate renditions.', doneWhen: 'The catalog moves through UPLOADING → QUEUED → PROCESSING → READY or FAILED with retry visibility.' },
      { title: '4. Generate renditions and manifest', guide: 'Start with a fake transcoder or one local media command. Produce at least two bitrate variants and an HLS manifest; store results separately from the original.', doneWhen: 'A player can switch between renditions and the manifest is not published before all required segments exist.' },
      { title: '5. Serve playback and observe it', guide: 'Return a time-limited playback URL, put the CDN in front of the object origin, and collect startup time, buffering, transcode duration, and failure metrics.', doneWhen: 'Private content is not publicly addressable, and you can identify a slow transcode or cache miss.' },
    ],
    acceptance: ['Large uploads do not flow through the application server.', 'Processing is asynchronous and safely retryable.', 'Playback starts only after a valid manifest is ready.', 'Private videos require authorization and use expiring playback access.'],
    extensions: ['Add thumbnail generation and moderation checks.', 'Compare pre-warming popular content with cache-on-first-read.', 'Add regional origins and a disaster recovery plan.', 'Model the cost per uploaded hour and viewed hour.'],
  },
]

export const PROJECT_MILESTONE_TOTAL = PROJECTS.reduce((count, project) => count + project.milestones.length, 0)

export function findProject(slug: string) {
  return PROJECTS.find((project) => project.slug === slug)
}
