import React from "react";

export default function AboutSection() {
  // keep it simple & light — no heavy libs
  const years = Math.max(1, new Date().getFullYear() - 2022); // tweak start year if you want

  const skills = [
    "React", "Next.js", "TypeScript/JS", "Node/Nest",
    "Python", "PostgreSQL", "MongoDB", "Docker", "AWS", "CI/CD",
  ];

  return (
    <section id="about" className="about">
      <div className="container about-grid">
        {/* LEFT COLUMN — main bio card */}
        <article className="about-card about-main">
          <header className="about-head">
            <h2 className="eyebrow">About</h2>
            <h3 className="about-title">Kushaan Kaushik</h3>
            <p className="about-sub">Software Engineer</p>

            {/* one-liner education, as requested */}
            <div className="about-edu">M.S. Computer Science (Montclair State University)</div>

            <div className="about-badges">
              <span className="badge">New York, USA</span>
              <span className="badge">{years}+ years experience</span>
              <span className="badge badge-live">
                <span className="dot" /> Open to work
              </span>
            </div>
          </header>

          <p className="about-body">
            I build fast, reliable products across the stack — from elegant
            React/Next.js interfaces to robust Node/Python services and
            production-ready infrastructure. I sweat the details: performance
            budgets, accessible UI, clean data models, and safe deployments.
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
            <a className="btn" href="#resume">Résumé ↗</a>
          </div>
        </article>

        {/* RIGHT COLUMN — two balanced tiles */}
        <aside className="about-tiles">
          {/* Full-Stack & iOS/QA */}
          <article className="about-card tile">
            <h3 className="tile-title">Full-Stack & iOS/QA</h3>
            <ul className="tile-list">
              <li><span className="li-ico" /> React/Next.js apps with clean component systems</li>
              <li><span className="li-ico" /> Typed APIs, auth, role-based access</li>
              <li><span className="li-ico" /> PostgreSQL/Mongo data models & query tuning</li>
              <li><span className="li-ico" /> Swift/SwiftUI prototypes, rapid UX spikes</li>
              <li><span className="li-ico" /> Locust/Taurus load testing & result reporting</li>
            </ul>
            <div className="tile-tags">
              {["React", "Next.js", "TypeScript", "SwiftUI", "Playwright"].map((t) => (
                <span className="chip" key={t}>{t}</span>
              ))}
            </div>
          </article>

          {/* Systems */}
          <article className="about-card tile">
            <h3 className="tile-title">Systems</h3>
            <ul className="tile-list">
              <li><span className="li-ico" /> Python tooling & automation</li>
              <li><span className="li-ico" /> Docker, CI/CD, basic IaC</li>
              <li><span className="li-ico" /> Linux/Debian familiarity</li>
              <li><span className="li-ico" /> Monitoring, alerts, SLO mindset</li>
              <li><span className="li-ico" /> Secure configs & secrets hygiene</li>
            </ul>
            <div className="tile-tags">
              {["Python", "Docker", "GitHub Actions", "Linux", "Grafana"].map((t) => (
                <span className="chip" key={t}>{t}</span>
              ))}
            </div>
          </article>
        </aside>
      </div>
    </section>
  );
}
