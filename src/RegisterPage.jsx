import React from 'react'
import { useActionState } from "react"
import { NavLink, useNavigate } from 'react-router-dom';

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=DM+Sans:wght@300;400;500&display=swap');

  :root {
    --navy: #0a0f1e;
    --card: rgba(255,255,255,0.04);
    --border: rgba(255,255,255,0.08);
    --gold: #c9a84c;
    --gold-light: #e8c97a;
    --text: #e8e8f0;
    --muted: #7a7a9a;
  }

  .jr-root {
    min-height: 100vh;
    background: var(--navy);
    color: var(--text);
    font-family: 'DM Sans', sans-serif;
    position: relative; overflow: hidden;
  }

  .jr-mesh {
    position: fixed; inset: 0; z-index: 0; pointer-events: none;
    background:
      radial-gradient(ellipse 70% 60% at 80% 10%, rgba(99,102,241,0.09) 0%, transparent 60%),
      radial-gradient(ellipse 60% 70% at 10% 90%, rgba(201,168,76,0.09) 0%, transparent 60%);
  }

  .jr-grid {
    position: fixed; inset: 0; z-index: 0; pointer-events: none;
    background-image:
      linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
    background-size: 48px 48px;
    mask-image: radial-gradient(ellipse at center, black 20%, transparent 80%);
  }

  .jr-header {
    position: relative; z-index: 10;
    border-bottom: 1px solid var(--border);
    background: rgba(10,15,30,0.8);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
  }

  .jr-header-inner {
    max-width: 1280px; margin: 0 auto;
    padding: 1rem 1.5rem;
    display: flex; align-items: center; justify-content: space-between;
  }

  .jr-logo {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.6rem; font-weight: 600;
    background: linear-gradient(135deg, var(--gold), var(--gold-light));
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    letter-spacing: 0.04em;
  }

  .jr-nav { display: flex; gap: 2rem; }
  .jr-nav a {
    font-size: 0.82rem; font-weight: 400; letter-spacing: 0.08em;
    text-transform: uppercase; color: var(--muted);
    text-decoration: none; transition: color 0.3s;
  }
  .jr-nav a:hover { color: var(--gold); }

  .jr-main {
    position: relative; z-index: 5;
    max-width: 1280px; margin: 0 auto;
    padding: 4rem 1.5rem 6rem;
    display: grid; grid-template-columns: 1fr 1fr; gap: 4rem;
    align-items: center;
  }

  @media (max-width: 768px) {
    .jr-main { grid-template-columns: 1fr; padding: 2rem 1rem 4rem; }
    .jr-hero { display: none; }
  }

  .jr-hero { animation: fadeSlideUp 0.8s ease both; }

  .jr-step-badge {
    display: inline-flex; align-items: center; gap: 0.5rem;
    background: rgba(99,102,241,0.1); border: 1px solid rgba(99,102,241,0.25);
    border-radius: 100px; padding: 0.35rem 1rem;
    font-size: 0.72rem; letter-spacing: 0.1em; text-transform: uppercase;
    color: #a5b4fc; margin-bottom: 1.5rem;
  }

  .jr-hero h1 {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(2.5rem, 5vw, 3.8rem);
    font-weight: 300; line-height: 1.15;
    color: #fff; margin-bottom: 1.2rem;
  }

  .jr-hero h1 em { font-style: italic; color: var(--gold); }
  .jr-hero p { color: var(--muted); font-size: 0.95rem; line-height: 1.75; max-width: 380px; margin-bottom: 2rem; }

  .jr-steps { display: flex; flex-direction: column; gap: 1.2rem; }
  .jr-step { display: flex; align-items: flex-start; gap: 1rem; }
  .jr-step-num {
    width: 32px; height: 32px; flex-shrink: 0; border-radius: 50%;
    background: rgba(201,168,76,0.1); border: 1px solid rgba(201,168,76,0.3);
    display: flex; align-items: center; justify-content: center;
    font-family: 'Cormorant Garamond', serif; font-size: 0.9rem; color: var(--gold);
  }
  .jr-step-text strong { display: block; font-size: 0.88rem; color: var(--text); margin-bottom: 0.15rem; }
  .jr-step-text span { font-size: 0.8rem; color: var(--muted); }

  .jr-card {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 20px; padding: 2.5rem;
    backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
    box-shadow: 0 32px 80px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.04) inset;
    animation: fadeSlideUp 0.8s 0.15s ease both;
    position: relative; overflow: hidden;
  }

  .jr-card::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
    background: linear-gradient(90deg, transparent, rgba(99,102,241,0.5), transparent);
  }

  .jr-card-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.8rem; font-weight: 400; color: #fff;
  }

  .jr-card-sub { font-size: 0.82rem; color: var(--muted); margin-top: 0.25rem; margin-bottom: 2rem; }

  .jr-label {
    display: block; font-size: 0.75rem; font-weight: 500;
    letter-spacing: 0.08em; text-transform: uppercase;
    color: var(--muted); margin-bottom: 0.5rem;
  }

  .jr-input {
    width: 100%; background: rgba(255,255,255,0.04);
    border: 1px solid var(--border); border-radius: 10px;
    padding: 0.75rem 1rem; color: var(--text);
    font-family: 'DM Sans', sans-serif; font-size: 0.9rem;
    outline: none; transition: border-color 0.3s, box-shadow 0.3s;
    box-sizing: border-box;
  }

  .jr-input::placeholder { color: rgba(122,122,154,0.6); }
  .jr-input:focus {
    border-color: rgba(99,102,241,0.5);
    box-shadow: 0 0 0 3px rgba(99,102,241,0.08);
    background: rgba(99,102,241,0.03);
  }

  .jr-btn {
    width: 100%;
    background: linear-gradient(135deg, #6366f1, #818cf8);
    color: #fff; font-family: 'DM Sans', sans-serif;
    font-size: 0.88rem; font-weight: 600; letter-spacing: 0.06em;
    border: none; border-radius: 10px; padding: 0.85rem;
    cursor: pointer; transition: all 0.3s; text-transform: uppercase;
    position: relative; overflow: hidden;
  }

  .jr-btn::after {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.15), transparent);
    opacity: 0; transition: opacity 0.3s;
  }
  .jr-btn:hover::after { opacity: 1; }
  .jr-btn:hover { transform: translateY(-1px); box-shadow: 0 8px 24px rgba(99,102,241,0.35); }
  .jr-btn:active { transform: translateY(0); }
  .jr-btn:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }

  .jr-msg { text-align: center; font-size: 0.83rem; color: var(--muted); }
  .jr-msg.success { color: #4ade80; }
  .jr-msg.error { color: #f87171; }

  .jr-terms {
    font-size: 0.75rem; text-align: center; color: var(--muted); line-height: 1.6;
  }
  .jr-terms a { color: var(--gold); text-decoration: none; }

  .jr-link-row { text-align: center; font-size: 0.83rem; color: var(--muted); }
  .jr-link-row a { color: #a5b4fc; font-weight: 500; text-decoration: none; transition: color 0.2s; }
  .jr-link-row a:hover { color: #818cf8; }

  .jr-divider { height: 1px; background: var(--border); }
  .jr-space { display: flex; flex-direction: column; gap: 1rem; }
  .jr-field { display: flex; flex-direction: column; }

  .jr-footer {
    position: relative; z-index: 5;
    border-top: 1px solid var(--border);
    text-align: center; padding: 1.5rem;
    font-size: 0.78rem; color: var(--muted);
  }

  @keyframes fadeSlideUp {
    from { opacity: 0; transform: translateY(24px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

async function registerAction(_, formData) {
  const json = Object.fromEntries(formData);
  const res = await fetch('http://127.0.0.1:8000/register/', {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(json)
  });
  const data = await res.json();
  return data.message || "Registration Failed";
}

export default function RegisterPage() {
  const [message, formAction, isPending] = useActionState(registerAction, "", { withPending: true });
  const navigate = useNavigate();
  if (message === "User Registered Successfully!") navigate("/login");

  const isError = message && message !== "User Registered Successfully!";

  return (
    <div className="jr-root">
      <style>{style}</style>
      <div className="jr-mesh" />
      <div className="jr-grid" />

      <header className="jr-header">
        <div className="jr-header-inner">
          <div className="jr-logo">TalentBridge</div>
          <nav className="jr-nav">
            <a href="#">Jobs</a>
            <a href="#">Companies</a>
            <a href="#">Services</a>
            <NavLink to="/login">Login</NavLink>
          </nav>
        </div>
      </header>

      <main className="jr-main">
        <section className="jr-hero">
          <div className="jr-step-badge">✦ Join 50,000+ professionals</div>
          <h1>Your career journey<br />starts <em>here</em></h1>
          <p>Register once and unlock curated job opportunities from India's leading companies — matched to your profile.</p>
          <div className="jr-steps">
            {[
              ["01", "Create your profile", "Fill in your skills and experience"],
              ["02", "Get matched", "AI-powered job recommendations"],
              ["03", "Apply instantly", "One-click apply to top companies"],
            ].map(([n, t, s]) => (
              <div className="jr-step" key={n}>
                <div className="jr-step-num">{n}</div>
                <div className="jr-step-text"><strong>{t}</strong><span>{s}</span></div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="jr-card">
            <div className="jr-card-title">Create your profile</div>
            <p className="jr-card-sub">Search & apply to jobs from India's top companies</p>

            <form action={formAction} className="jr-space">
              <div className="jr-field">
                <label className="jr-label">Username</label>
                <input name="username" placeholder="Choose a username" className="jr-input" />
              </div>

              <div className="jr-field">
                <label className="jr-label">Email Address</label>
                <input type="email" name="email" placeholder="your@email.com" className="jr-input" />
              </div>

              <div className="jr-field">
                <label className="jr-label">Password</label>
                <input name="password" type="password" placeholder="Minimum 6 characters" className="jr-input" />
              </div>

              <button disabled={isPending} type="submit" className="jr-btn">
                {isPending ? 'Creating account…' : 'Create Account →'}
              </button>

              {message && (
                <p className={`jr-msg ${isError ? 'error' : 'success'}`}>{message}</p>
              )}

              <div className="jr-divider" />

              <p className="jr-terms">
                By registering, you agree to our{' '}
                <a href="#">Terms & Conditions</a> and <a href="#">Privacy Policy</a>
              </p>

              <p className="jr-link-row">
                Already have an account?&nbsp;
                <NavLink to="/login">Sign in here</NavLink>
              </p>
            </form>
          </div>
        </section>
      </main>

      <footer className="jr-footer">© 2026 JobPortal.com — All rights reserved</footer>
    </div>
  );
}
