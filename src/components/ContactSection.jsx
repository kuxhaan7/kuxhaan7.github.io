import React from "react";

export default function ContactSection() {
  return (
    <footer id="contact" className="footer">
      <div className="container">
        <p style={{ margin:0 }}>
          Reach out:{" "}
          <a className="link" href="mailto:kaushikk1@montclair.edu">kaushikk1@montclair.edu</a>{" • "}
          <a className="link" href="https://github.com/kuxhaan7" target="_blank" rel="noreferrer">GitHub</a>{" • "}
          <a className="link" href="https://linkedin.com/in/kushaan-kaushik-ba3b391b2" target="_blank" rel="noreferrer">LinkedIn</a>
        </p>
      </div>
    </footer>
  );
}
