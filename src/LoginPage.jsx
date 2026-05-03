import React, { useActionState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=DM+Sans:wght@300;400;500&display=swap');

  :root {
    --navy: #0a0f1e;
    --navy-2: #0f1628;
    --card: rgba(255,255,255,0.04);
    --border: rgba(255,255,255,0.08);
    --gold: #c9a84c;
    --gold-light: #e8c97a;
    --text: #e8e8f0;
    --muted: #7a7a9a;
  }

  .jp-root {
    min-height: 100vh;
    background: var(--navy);
    color: var(--text);
    font-family: 'DM Sans', sans-serif;
    position: relative;
    overflow: hidden;
  }

  .jp-mesh {
    position: fixed; inset: 0; z-index: 0; pointer-events: none;
    background:
      radial-gradient(ellipse 80% 60% at 20% 10%, rgba(201,168,76,0.08) 0%, transparent 60%),
      radial-gradient(ellipse 60% 80% at 80% 90%, rgba(99,102,241,0.07) 0%, transparent 60%),
      radial-gradient(ellipse 50% 50% at 50% 50%, rgba(15,22,40,1) 0%, transparent 100%);
  }

  .jp-grid {
    position: fixed; inset: 0; z-index: 0; pointer-events: none;
    background-image:
      linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
    background-size: 48px 48px;
    mask-image: radial-gradient(ellipse at center, black 20%, transparent 80%);
  }

  .jp-header {
    position: relative; z-index: 10;
    border-bottom: 1px solid var(--border);
    background: rgba(10,15,30,0.8);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
  }

  .jp-header-inner {
    max-width: 1280px; margin: 0 auto;
    padding: 1rem 1.5rem;
    display: flex; align-items: center; justify-content: space-between;
  }

  .jp-logo {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.6rem; font-weight: 600;
    background: linear-gradient(135deg, var(--gold), var(--gold-light));
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    letter-spacing: 0.04em;
  }

  .jp-nav { display: flex; gap: 2rem; }
  .jp-nav a {
    font-size: 0.82rem; font-weight: 400; letter-spacing: 0.08em;
    text-transform: uppercase; color: var(--muted);
    text-decoration: none; transition: color 0.3s;
  }
  .jp-nav a:hover { color: var(--gold); }

  .jp-main {
    position: relative; z-index: 5;
    max-width: 1280px; margin: 0 auto;
    padding: 4rem 1.5rem 6rem;
    display: grid; grid-template-columns: 1fr 1fr; gap: 4rem;
    align-items: center;
  }

  @media (max-width: 768px) {
    .jp-main { grid-template-columns: 1fr; padding: 2rem 1rem 4rem; }
    .jp-hero { display: none; }
  }

  .jp-hero { animation: fadeSlideUp 0.8s ease both; }

  .jp-hero-badge {
    display: inline-flex; align-items: center; gap: 0.5rem;
    background: rgba(201,168,76,0.1); border: 1px solid rgba(201,168,76,0.25);
    border-radius: 100px; padding: 0.35rem 1rem;
    font-size: 0.72rem; letter-spacing: 0.1em; text-transform: uppercase;
    color: var(--gold); margin-bottom: 1.5rem;
  }

  .jp-hero-badge span { width: 6px; height: 6px; border-radius: 50%; background: var(--gold); animation: pulse 2s infinite; }

  .jp-hero h1 {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(2.5rem, 5vw, 3.8rem);
    font-weight: 300; line-height: 1.15;
    color: #fff; margin-bottom: 1.2rem;
  }

  .jp-hero h1 em { font-style: italic; color: var(--gold); }

  .jp-hero p { color: var(--muted); font-size: 0.95rem; line-height: 1.75; max-width: 380px; margin-bottom: 2rem; }

  .jp-perks { list-style: none; padding: 0; display: flex; flex-direction: column; gap: 0.85rem; }
  .jp-perks li {
    display: flex; align-items: center; gap: 0.75rem;
    font-size: 0.88rem; color: rgba(232,232,240,0.75);
  }
  .jp-perks li::before {
    content: ''; display: block; width: 18px; height: 18px; flex-shrink: 0;
    background: rgba(201,168,76,0.15); border: 1px solid rgba(201,168,76,0.4);
    border-radius: 50%;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12'%3E%3Cpath d='M2 6l3 3 5-5' stroke='%23c9a84c' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
    background-repeat: no-repeat; background-position: center;
  }

  .jp-card {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: 2.5rem;
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    box-shadow: 0 32px 80px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.04) inset;
    animation: fadeSlideUp 0.8s 0.15s ease both;
    position: relative; overflow: hidden;
  }

  .jp-card::before {
    content: ''; position: absolute;
    top: 0; left: 0; right: 0; height: 1px;
    background: linear-gradient(90deg, transparent, rgba(201,168,76,0.5), transparent);
  }

  .jp-card-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.8rem; font-weight: 400; color: #fff; text-align: center;
  }

  .jp-card-sub { font-size: 0.82rem; color: var(--muted); text-align: center; margin-top: 0.25rem; margin-bottom: 2rem; }

  .jp-label {
    display: block; font-size: 0.75rem; font-weight: 500;
    letter-spacing: 0.08em; text-transform: uppercase;
    color: var(--muted); margin-bottom: 0.5rem;
  }

  .jp-input {
    width: 100%; background: rgba(255,255,255,0.04);
    border: 1px solid var(--border);
    border-radius: 10px; padding: 0.75rem 1rem;
    color: var(--text); font-family: 'DM Sans', sans-serif; font-size: 0.9rem;
    outline: none; transition: border-color 0.3s, box-shadow 0.3s;
    box-sizing: border-box;
  }

  .jp-input::placeholder { color: rgba(122,122,154,0.6); }
  .jp-input:focus {
    border-color: rgba(201,168,76,0.5);
    box-shadow: 0 0 0 3px rgba(201,168,76,0.08);
    background: rgba(201,168,76,0.03);
  }

  .jp-forgot { text-align: right; margin-top: 0.4rem; }
  .jp-forgot a { font-size: 0.78rem; color: var(--gold); text-decoration: none; opacity: 0.8; transition: opacity 0.2s; }
  .jp-forgot a:hover { opacity: 1; }

  .jp-btn {
    width: 100%;
    background: linear-gradient(135deg, var(--gold), var(--gold-light));
    color: #0a0f1e; font-family: 'DM Sans', sans-serif;
    font-size: 0.88rem; font-weight: 600; letter-spacing: 0.06em;
    border: none; border-radius: 10px; padding: 0.85rem;
    cursor: pointer; transition: all 0.3s; text-transform: uppercase;
    position: relative; overflow: hidden;
  }

  .jp-btn::after {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.2), transparent);
    opacity: 0; transition: opacity 0.3s;
  }
  .jp-btn:hover::after { opacity: 1; }
  .jp-btn:hover { transform: translateY(-1px); box-shadow: 0 8px 24px rgba(201,168,76,0.35); }
  .jp-btn:active { transform: translateY(0); }
  .jp-btn:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }

  .jp-msg { text-align: center; font-size: 0.83rem; margin-top: 0.25rem; color: var(--muted); }
  .jp-msg.success { color: #4ade80; }
  .jp-msg.error { color: #f87171; }

  .jp-link-row { text-align: center; font-size: 0.83rem; color: var(--muted); }
  .jp-link-row a { color: var(--gold); font-weight: 500; text-decoration: none; transition: color 0.2s; }
  .jp-link-row a:hover { color: var(--gold-light); }

  .jp-divider { height: 1px; background: var(--border); margin: 0.5rem 0; }

  .jp-footer {
    position: relative; z-index: 5;
    border-top: 1px solid var(--border);
    text-align: center; padding: 1.5rem;
    font-size: 0.78rem; color: var(--muted);
    background: rgba(10,15,30,0.6);
  }

  .jp-space { display: flex; flex-direction: column; gap: 1rem; }
  .jp-field { display: flex; flex-direction: column; }

  @keyframes fadeSlideUp {
    from { opacity: 0; transform: translateY(24px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(1.4); }
  }
`;

async function loginAction(_, formData) {
  const json = Object.fromEntries(formData);
  const res = await fetch('http://127.0.0.1:8000/login/', {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(json)
  });
  const data = await res.json();
  if (res.ok) {
    localStorage.setItem("userId", data.user_id);
    localStorage.setItem("username", data.username);
  }
  return data.message || "Login Failed";
}

export default function LoginPage() {
  const [message, formAction, isPending] = useActionState(loginAction, "", { withPending: true });
  const navigate = useNavigate();
  if (message === "Login successful") navigate("/jobs");

  const isError = message && message !== "Login successful";

  return (
    <div className="jp-root">
      <style>{style}</style>
      <div className="jp-mesh" />
      <div className="jp-grid" />

      <header className="jp-header">
        <div className="jp-header-inner">
          <div className="jp-logo">TalentBridge</div>
          <nav className="jp-nav">
            <a href="#">Jobs</a>
            <a href="#">Companies</a>
            <a href="#">Services</a>
            <NavLink to="/register">Register</NavLink>
          </nav>
        </div>
      </header>

      <main className="jp-main">
        <section className="jp-hero">
          <div className="jp-hero-badge"><span />Now Hiring Across India</div>
          <h1>Find your <em>dream job</em><br />with confidence</h1>
          <p>Connect with top recruiters, showcase your skills, and land the role you deserve — all in one place.</p>
          <ul className="jp-perks">
            <li>Trusted by thousands of recruiters</li>
            <li>Personalized job recommendations</li>
            <li>Easy apply & profile visibility</li>
          </ul>
        </section>

        <section>
          <div className="jp-card">
            <div className="jp-card-title">Welcome back</div>
            <p className="jp-card-sub">Sign in to your account to continue</p>

            <form action={formAction} className="jp-space">
              <div className="jp-field">
                <label className="jp-label">Username</label>
                <input type="text" name="username" placeholder="Enter your username" className="jp-input" />
              </div>

              <div className="jp-field">
                <label className="jp-label">Password</label>
                <input name="password" type="password" placeholder="Enter your password" className="jp-input" />
                <div className="jp-forgot"><a href="#">Forgot Password?</a></div>
              </div>

              <button disabled={isPending} type="submit" className="jp-btn">
                {isPending ? 'Signing in…' : 'Sign In →'}
              </button>

              {message && (
                <p className={`jp-msg ${isError ? 'error' : 'success'}`}>{message}</p>
              )}

              <div className="jp-divider" />
              <p className="jp-link-row">
                New to JobPortal?&nbsp;
                <NavLink to="/register">Create an account</NavLink>
              </p>
            </form>
          </div>
        </section>
      </main>

      <footer className="jp-footer">© 2026 JobPortal.com — All rights reserved</footer>
    </div>
  );
}
