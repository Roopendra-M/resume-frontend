export default function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-grid">
        
        {/* About Section */}
        <div>
          <h3 className="footer-heading">About</h3>
          <p className="footer-text">
            ResumeAI helps candidates analyze resumes, match jobs, and apply quickly.
          </p>
        </div>

        {/* Contact Section */}
        <div>
          <h3 className="footer-heading">Contact</h3>
          <ul className="footer-links">
            <li>
              <a href="mailto:mardalaroopendra@gmail.com">📧 Email</a>
            </li>
            <li>
              <a href="https://github.com/Roopendra-M" target="_blank" rel="noreferrer">💻 GitHub</a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/roopendra-mardala-198938321" target="_blank" rel="noreferrer">🔗 LinkedIn</a>
            </li>
            <li>
              <a href="https://www.instagram.com/thephoenix__r/" target="_blank" rel="noreferrer">📸 Instagram</a>
            </li>
            <li>📞 +91-8519804772</li>
          </ul>
        </div>

        {/* Newsletter Section */}
        <div>
          <h3 className="footer-heading">Newsletter</h3>
          <form className="newsletter-form">
            <input
              type="email"
              placeholder="your@email.com"
              className="newsletter-input"
              required
            />
            <button type="submit" className="newsletter-btn">Join</button>
          </form>
          <p className="footer-note">We never spam.</p>
        </div>
      </div>

      <div className="footer-bottom">
        © 2025 ResumeAI. All rights reserved.
      </div>
    </footer>
  )
}
