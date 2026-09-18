const mockNewsArticles = [
  {
    id: "news-1",
    title: "OpenAI Unveils Next-Gen Multimodal Reasoning Engine with Instant Audio & Vision",
    subtitle: "A massive leap forward in real-time edge processing and conversational intelligence.",
    category: "AI & Tech",
    readTime: "3 min listen",
    publishedAt: "10 mins ago",
    author: "Nuzio AI Tech Desk",
    summary: [
      "OpenAI announced frontier reasoning models with zero-latency speech-to-speech interaction.",
      "Achieves sub-200ms response times and natively synthesizes emotional voice tones.",
      "Lightweight versions can run on mobile NPUs for offline assistant workflows."
    ],
    fullText: `OpenAI has today revealed its latest breakdown model series engineered specifically for ultra-low latency real-time voice and vision interaction. During a live demo in San Francisco, CEO Sam Altman showcased seamless voice conversation with instantaneous context switching, zero conversational lag, and dynamic tone adaptation. The breakthrough lies in unified neural quantization that combines vision comprehension, acoustic token generation, and deep reasoning into a single pass model. Instead of converting speech to text, passing to a language model, and running text-to-speech, the new architecture operates directly on raw acoustic waveforms.`,
    audioTranscript: "Welcome to your Nuzio AI Daily Tech Briefing. OpenAI has today revealed its latest frontier model series engineered specifically for ultra-low latency real-time voice and vision interaction. The unified model operates directly on acoustic waveforms, paving the way for instantaneous personalized AI experiences on mobile devices.",
    coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    likesCount: 1420,
    bookmarksCount: 630,
    sentiment: "Positive",
    keyTakeaways: [
      "Sub-200ms voice response latency achieved",
      "Direct neural processing on raw acoustic waveforms",
      "Native mobile NPU deployment support coming Q4"
    ]
  },
  {
    id: "news-2",
    title: "Global Central Banks Signal Coordinated Shift Toward Digital Currency Infrastructure",
    subtitle: "Cross-border payment speeds expected to increase by 10x while slashing settlement fees.",
    category: "Global Economy",
    readTime: "4 min listen",
    publishedAt: "25 mins ago",
    author: "Nuzio AI Finance Desk",
    summary: [
      "Coalition of 14 central banks finalized standards for Central Bank Digital Currencies.",
      "The framework guarantees privacy safeguards alongside automated instant clearing.",
      "Fintech infrastructure stocks rallied following the official joint declaration."
    ],
    fullText: `In a landmark joint declaration today, central monetary authorities across Asia, Europe, and the Americas announced a unified technical standard for cross-border digital currency interoperability. Named Project Meridian, the system relies on encrypted distributed ledgers to verify transactions within seconds without intermediary correspondent banking chains. The initiative addresses long-standing friction in global trade, where traditional wire transfers often take days and incur high fees.`,
    audioTranscript: "Here is your Nuzio AI Financial Pulse. A coalition of fourteen central banks has officially unveiled Project Meridian—a unified framework for cross-border digital currency interoperability. By removing traditional correspondent banking bottlenecks, the network slashes transaction fees while enabling instant twenty-four-seven settlement.",
    coverImage: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80",
    likesCount: 980,
    bookmarksCount: 410,
    sentiment: "Neutral",
    keyTakeaways: [
      "Instant 24/7 cross-border settlement engine",
      "Reduces international transfer fees by up to 80%",
      "Privacy-by-design cryptographic architecture"
    ]
  },
  {
    id: "news-3",
    title: "Quantum Breakthrough: Room-Temperature Superconductor Synthetic Material Verified",
    subtitle: "Independent labs replicate energy-loss-free electrical transmission in novel carbon matrix.",
    category: "Science",
    readTime: "5 min listen",
    publishedAt: "1 hour ago",
    author: "Nuzio AI Science Desk",
    summary: [
      "Scientists confirmed ambient-temperature superconductivity in a synthetic crystalline lattice.",
      "Power grids could operate with zero transmission loss, saving billions of megawatt-hours.",
      "Applications span ultra-fast quantum processors and compact fusion reactors."
    ],
    fullText: `An international consortium of condensed matter physicists has independently validated room-temperature superconductivity in a newly synthesized carbon-boron nitrogen hydride matrix at atmospheric pressure. The findings, published in Nature Physics today, resolve a multi-decade quest in material science. During electrical resistance tests across temperature gradients from -10°C to +45°C, the synthesized alloy exhibited zero electrical resistance.`,
    audioTranscript: "Nuzio AI Science Update. Researchers have officially validated room-temperature superconductivity in a novel crystalline material at standard atmospheric pressure. Independent replication confirmed zero electrical resistance up to forty-five degrees Celsius. This breakthrough promises zero-loss energy grids and ultra-efficient quantum computing.",
    coverImage: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80",
    likesCount: 2310,
    bookmarksCount: 1150,
    sentiment: "Extremely Positive",
    keyTakeaways: [
      "Zero electrical resistance at up to +45°C ambient temperatures",
      "Atmospheric pressure operation verified by 3 independent labs",
      "Potential to eliminate global power grid transmission losses"
    ]
  },
  {
    id: "news-4",
    title: "Autonomous EV Fleets Surpass 100 Million Commercial Miles with Zero Incidents",
    subtitle: "AI vision models demonstrate 10x safety improvement compared to human drivers.",
    category: "Mobility & Transport",
    readTime: "3 min listen",
    publishedAt: "2 hours ago",
    author: "Nuzio AI Mobility Desk",
    summary: [
      "Commercial fully-autonomous vehicle fleets reached the 100M driverless mile milestone.",
      "Safety metrics reveal a 92% reduction in emergency interventions compared to humans.",
      "Cities are expanding dedicated driverless transit corridors in Tokyo & SF."
    ],
    fullText: `Urban transport metrics reached a historic benchmark this week as commercial fully-autonomous electric vehicle fleets completed over 100 million miles of driverless operation in complex metro environments including Tokyo, San Francisco, and Singapore. Safety reports confirmed that the AI driving system operates with a safety margin nine times superior to human driver averages per million miles driven.`,
    audioTranscript: "Nuzio AI Mobility Report. Commercial autonomous ride-hailing fleets have surpassed one hundred million miles of real-world operation across major metropolitan cities. Safety statistics reveal a ninety-two percent drop in sudden braking incidents and a safety record nearly ten times better than human driver averages.",
    coverImage: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800&q=80",
    likesCount: 840,
    bookmarksCount: 320,
    sentiment: "Positive",
    keyTakeaways: [
      "100M+ commercial autonomous miles completed",
      "92% reduction in abrupt safety interventions",
      "Mesh vehicle-to-vehicle communication active"
    ]
  },
  {
    id: "news-5",
    title: "Next-Gen Solar Perovskite Tandem Cells Hit Record 34% Efficiency Milestone",
    subtitle: "Next-generation solar technology approaches theoretical limits while lowering costs.",
    category: "Energy & Climate",
    readTime: "3 min listen",
    publishedAt: "3 hours ago",
    author: "Nuzio AI Climate Desk",
    summary: [
      "Tandem silicon-perovskite solar cells achieved a certified 34.2% power conversion efficiency.",
      "Low-temperature manufacturing cuts production energy consumption by 35%.",
      "Residential rooftop installation expected to double daily solar energy yields."
    ],
    fullText: `Renewable energy engineers have shattered previous photovoltaic conversion limits by achieving a certified 34.2% efficiency in commercial-scale tandem solar cells. Combining traditional silicon substrates with printable halide perovskite layers, the dual-junction design captures both blue and infrared light spectra.`,
    audioTranscript: "Nuzio AI Energy Special. Scientists have achieved a record-breaking thirty-four point two percent energy conversion efficiency with silicon-perovskite tandem solar panels. The low-cost manufacturing technique enables flexible, high-yield solar panels that generate twice the energy of conventional rooftop systems.",
    coverImage: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=800&q=80",
    likesCount: 1620,
    bookmarksCount: 790,
    sentiment: "Positive",
    keyTakeaways: [
      "34.2% certified solar conversion efficiency",
      "Captures both blue and infrared light spectra",
      "Lowers manufacturing energy footprint by 35%"
    ]
  },
  {
    id: "news-6",
    title: "Neurotech Wearables Demonstrate Real-Time Neural Intent Decoding for AR",
    subtitle: "Non-invasive wristband translates micro-muscle gestures into instant spatial control.",
    category: "AI & Tech",
    readTime: "4 min listen",
    publishedAt: "4 hours ago",
    author: "Nuzio AI Tech Desk",
    summary: [
      "Engineers unveiled a lightweight EMG wristband capable of sub-millisecond intent detection.",
      "Users can type 120 words per minute in spatial computing without touching physical keyboards.",
      "Clinical trials show high efficacy for patients recovering from motor impairments."
    ],
    fullText: `Human-computer interaction reached a breakthrough today with the presentation of NeuralWrist—a lightweight consumer wearable that decodes electromyographic signals directly from nerve impulses in the forearm. By pairing deep neural filters with high-density sensors, the device detects motor intent before physical movement completes.`,
    audioTranscript: "Nuzio AI Tech Spotlight. Engineers have unveiled a breakthrough neural wristband capable of translating micro-muscle gestures into instant spatial computing commands. Users can seamlessly type up to one hundred twenty words per minute in virtual space without touching physical keyboards.",
    coverImage: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=800&q=80",
    likesCount: 1890,
    bookmarksCount: 920,
    sentiment: "Extremely Positive",
    keyTakeaways: [
      "Sub-millisecond neural intent decoding",
      "120 WPM hands-free spatial typing capability",
      "Non-invasive surface electromyography architecture"
    ]
  },
  {
    id: "news-7",
    title: "AI-Discovered Enzyme Rapidly Decomposes Ocean Microplastics in 48 Hours",
    subtitle: "Bio-engineered protein breaks down complex PET polymers into harmless organic compounds.",
    category: "Energy & Climate",
    readTime: "3 min listen",
    publishedAt: "5 hours ago",
    author: "Nuzio AI Climate Desk",
    summary: [
      "Biochemists used generative protein design to synthesize 'Plasticase-9' enzyme.",
      "Tests show 98% degradation of marine microplastics within two days at room temperature.",
      "Scalable bioreactor trials scheduled to launch at major coastal waste treatment hubs."
    ],
    fullText: `Marine ecologists and bioengineers have unveiled Plasticase-9, an artificial enzyme designed via generative AI sequence modeling. The protein targets resilient polyolefins and PET microplastics commonly polluting oceanic ecosystems, dissolving them into biodegradable monomers.`,
    audioTranscript: "Nuzio AI Environment Bulletin. Researchers using AI protein design have created Plasticase-9—an enzyme capable of breaking down ocean microplastics within forty-eight hours into non-toxic organic compounds.",
    coverImage: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80",
    likesCount: 2450,
    bookmarksCount: 1340,
    sentiment: "Extremely Positive",
    keyTakeaways: [
      "98% marine PET breakdown in 48 hours",
      "Generative AI-designed protein matrix",
      "Produces non-toxic biodegradable monomers"
    ]
  }
];

module.exports = { mockNewsArticles };
