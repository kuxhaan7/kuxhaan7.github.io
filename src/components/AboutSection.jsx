import React from "react";

export default function AboutSection() {
  const skills = [
    "Python", "TypeScript", "Go", "React", "Next.js", "Node.js",
    "PostgreSQL", "MongoDB", "Cloud & Infra", "AWS", "Docker", "Kubernetes",
    "LLM Agents", "MCP", "LangChain", "RAG", "PyTorch",
  ];

  return (
    <section id="about" className="about">
      <div className="container about-grid">
        {/* LEFT COLUMN — main bio card */}
        <article className="about-card about-main">
          <header className="about-head">
            <h2 className="eyebrow">About</h2>
            <h3 className="about-title">Kushaan Kaushik</h3>
            <p className="about-sub">Forward Deployed Engineer · Full-Stack &amp; Applied AI</p>

            <div className="about-edu">M.S. Computer Science, Montclair State University (2024–2026)</div>

            <div className="about-badges">
              <span className="badge">New York City, USA</span>
              <span className="badge">4+ years experience</span>
              <span className="badge badge-live">
                <span className="dot" /> Open to work
              </span>
            </div>
          </header>

          <p className="about-body">
            Forward Deployed Engineer with 4+ years building production systems
            across logistics, IoT, and AI. As a Forward Deployed Engineer at
            <strong> Marhaba Group (M1 Shipping)</strong>, I integrated the Copart
            API and tuned Supabase/Vercel deployments that cut median API latency
            ~45% across high-traffic endpoints. I work across the stack and close
            to the customer, shipping LLM agents (MCP, LangChain, RAG), typed
            REST APIs, and cloud infrastructure that holds up in production.
          </p>

          <div className="about-tags">
            {skills.map((s) => (
              <span className="chip" key={s}>{s}</span>
            ))}
          </div>

          <div className="about-actions">
            <a className="btn btn-solid" href="#contact">Get in touch</a>
            <a className="btn" href="https://github.com/kuxhaan7" target="_blank" rel="noreferrer">
              GitHub ↗
            </a>
            <a className="btn" href="https://www.linkedin.com/in/kushaankaushik/" target="_blank" rel="noreferrer">
              LinkedIn ↗
            </a>
            <a className="btn" href="./resume/KKRESUME2026.pdf" target="_blank" rel="noreferrer">Résumé ↗</a>
          </div>
        </article>

        {/* RIGHT COLUMN — two balanced tiles */}
        <aside className="about-tiles">
          {/* Full-Stack Engineering */}
          <article className="about-card tile">
            <h3 className="tile-title">Full-Stack Engineering</h3>
            <ul className="tile-list">
              <li><span className="li-ico" /> React/Next.js apps with clean component systems</li>
              <li><span className="li-ico" /> 45+ typed REST APIs, auth &amp; role-based access</li>
              <li><span className="li-ico" /> PostgreSQL/MongoDB modeling &amp; query optimization</li>
              <li><span className="li-ico" /> Microservices &amp; event-driven architecture</li>
              <li><span className="li-ico" /> Cloud &amp; infra: AWS, Docker, Kubernetes, Vercel, CI/CD</li>
            </ul>
            <div className="tile-tags">
              {["Next.js", "Node/Express", "Cloud & Infra", "AWS", "Kubernetes"].map((t) => (
                <span className="chip" key={t}>{t}</span>
              ))}
            </div>
          </article>

          {/* AI & Machine Learning */}
          <article className="about-card tile">
            <h3 className="tile-title">AI &amp; Machine Learning</h3>
            <ul className="tile-list">
              <li><span className="li-ico" /> Autonomous LLM agents with tool use (Claude API)</li>
              <li><span className="li-ico" /> MCP servers &amp; LangChain pipelines</li>
              <li><span className="li-ico" /> Retrieval-augmented generation &amp; prompt engineering</li>
              <li><span className="li-ico" /> n8n automation across multi-step workflows</li>
              <li><span className="li-ico" /> Deep learning with PyTorch &amp; TensorFlow</li>
            </ul>
            <div className="tile-tags">
              {["Claude API", "MCP", "LangChain", "RAG", "n8n"].map((t) => (
                <span className="chip" key={t}>{t}</span>
              ))}
            </div>
          </article>
        </aside>
      </div>
    </section>
  );
}
