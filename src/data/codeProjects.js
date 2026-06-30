// src/data/codeProjects.js
// Code / AI / ML projects that live as repos (no UI screenshots) — surfaced as
// text cards so the strongest engineering work is represented, not just the
// screenshot-able products.
export const codeProjects = [
  {
    title: "Shelby — Autonomous AI Agent",
    icon: "bot",
    thumb: "/img/code/shelby.webp",
    desc: "A persistent personal AI agent with tool use, web search, and recurring heartbeats for autonomy. Talks over Telegram/WhatsApp and acts on live production systems.",
    tags: ["Claude Opus API", "Tavily", "ElevenLabs", "FastAPI"],
    href: "https://github.com/kuxhaan7/Shelby-AI",
  },
  {
    title: "Network Outage Reporting (NOR)",
    icon: "activity",
    thumb: "/img/code/nor.webp",
    desc: "Outage-prediction system that runs ML models over historical telemetry to forecast future network events with precise, actionable outcomes.",
    tags: ["TypeScript", "ML Models", "Forecasting"],
    href: "https://github.com/kuxhaan7/NOR",
  },
  {
    title: "Chest X-Ray Multi-Label Detection",
    icon: "scan",
    thumb: "/img/code/chest-xray.webp",
    desc: "Deep-learning pipeline that screens chest X-rays for 14 lung conditions, with dataset augmentation and transfer learning for 90%+ validation accuracy.",
    tags: ["PyTorch", "Scikit-learn", "Transfer Learning"],
    href: "https://github.com/kuxhaan7/Chest-Xray",
  },
  {
    title: "Cats vs Dogs Classification",
    icon: "brain",
    thumb: "/img/code/cats-dogs.webp",
    desc: "Convolutional neural network for image classification with data augmentation and regularization, reaching 90%+ validation accuracy.",
    tags: ["PyTorch", "CNN", "Computer Vision"],
    href: "https://github.com/kuxhaan7/CatsNDogs_Classification",
  },
  {
    title: "n8n Automation Workflows",
    icon: "workflow",
    thumb: "/img/code/n8n.webp",
    desc: "A collection of multi-step automation workflows wiring LLMs and APIs together — scraping, ranking, and LLM-driven drafting across services.",
    tags: ["n8n", "LLM", "Automation"],
    href: "https://github.com/kuxhaan7/N8N",
  },
  {
    title: "Markdown → Google Docs",
    icon: "file",
    thumb: "/img/code/md-gdocs.webp",
    desc: "Converts markdown meeting notes into cleanly formatted Google Docs via the Docs API — programmatic document creation with structured formatting.",
    tags: ["Python", "Google Docs API", "Colab"],
    href: "https://github.com/kuxhaan7/Markdown-to-Gdocs-Converter",
  },
];
