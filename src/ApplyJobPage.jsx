import React from 'react'
import { useActionState } from 'react';
import { NavLink, useParams } from 'react-router-dom';

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

  .ja-root {
    min-height: 100vh;
    background: var(--navy);
    color: var(--text);
    font-family: 'DM Sans', sans-serif;
    display: flex; flex-direction: column;
    position: relative; overflow: hidden;
  }

  .ja-mesh {
    position: fixed; inset: 0; z-index: 0; pointer-events: none;
    background:
      radial-gradient(ellipse 70% 70% at 30% 20%, rgba(201,168,76,0.07) 0%, transparent 60%),
      radial-gradient(ellipse 60% 60% at 70% 80%, rgba(99,102,241,0.07) 0%, transparent 60%);
  }

  .ja-ring {
    position: fixed; z-index: 0; pointer-events: none;
    width: 600px; height: 600px;
    border-radius: 50%;
    border: 1px solid rgba(201,168,76,0.06);
    left: 50%; top: 50%;
    transform: translate(-50%, -50%);
  }

  .ja-ring-2 {
    position: fixed; z-index: 0; pointer-events: none;
    width: 900px; height: 900px;
    border-radius: 50%;
    border: 1px solid rgba(201,168,76,0.04);
    left: 50%; top: 50%;
    transform: translate(-50%, -50%);
  }

  .ja-header {
    position: relative; z-index: 10;
    border-bottom: 1px solid var(--border);
    background: rgba(10,15,30,0.8);
    backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
  }

  .ja-header-inner {
    max-width: 1280px; margin: 0 auto;
    padding: 0.9rem 1.5rem;
    display: flex; align-items: center; justify-content: space-between;
  }

  .ja-logo {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.5rem; font-weight: 600;
    background: linear-gradient(135deg, var(--gold), var(--gold-light));
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    letter-spacing: 0.04em;
  }

  .ja-nav { display: flex; gap: 2rem; }
  .ja-nav a {
    font-size: 0.8rem; letter-spacing: 0.08em; text-transform: uppercase;
    color: var(--muted); text-decoration: none; transition: color 0.3s;
  }
  .ja-nav a:hover { color: var(--gold); }

  .ja-user { display: flex; align-items: center; gap: 0.75rem; }
  .ja-user-name { font-size: 0.85rem; color: var(--muted); }
  .ja-avatar {
    width: 34px; height: 34px; border-radius: 50%;
    background: linear-gradient(135deg, var(--gold), var(--gold-light));
    display: flex; align-items: center; justify-content: center;
    font-size: 0.8rem; font-weight: 700; color: var(--navy);
    box-shadow: 0 0 0 2px rgba(201,168,76,0.2);
  }

  .ja-main {
    position: relative; z-index: 5; flex: 1;
    display: flex; flex-direction: column;
    padding: 2rem 1.5rem;
  }

  .ja-breadcrumb {
    max-width: 1280px; margin: 0 auto; width: 100%; margin-bottom: 1.5rem;
    animation: fadeSlideUp 0.5s ease both;
  }

  .ja-back {
    display: inline-flex; align-items: center; gap: 0.5rem;
    font-size: 0.82rem; color: var(--muted);
    text-decoration: none; letter-spacing: 0.04em;
    transition: color 0.2s, gap 0.2s;
    padding: 0.4rem 0.8rem;
    border: 1px solid transparent;
    border-radius: 8px;
  }
  .ja-back:hover { color: var(--gold); gap: 0.75rem; border-color: var(--border); }

  .ja-center {
    flex: 1; display: flex; align-items: center; justify-content: center;
  }

  .ja-card {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 24px;
    width: 100%; max-width: 460px;
    padding: 2.5rem;
    backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px);
    box-shadow: 0 40px 100px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04) inset;
    animation: fadeSlideUp 0.7s 0.1s ease both;
    position: relative; overflow: hidden;
  }

  .ja-card::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
    background: linear-gradient(90deg, transparent, var(--gold), transparent);
    opacity: 0.5;
  }

  .ja-icon-ring {
    width: 64px; height: 64px; border-radius: 50%;
    background: rgba(201,168,76,0.08);
    border: 1px solid rgba(201,168,76,0.2);
    display: flex; align-items: center; justify-content: center;
    font-size: 1.6rem; margin: 0 auto 1.5rem;
  }

  .ja-card-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.9rem; font-weight: 300;
    color: #fff; text-align: center; margin-bottom: 0.5rem;
  }

  .ja-card-sub { font-size: 0.83rem; color: var(--muted); text-align: center; margin-bottom: 2rem; line-height: 1.6; }

  .ja-divider { height: 1px; background: var(--border); margin: 0 -2.5rem 2rem; }

  .ja-profile-box {
    background: rgba(255,255,255,0.03); border: 1px solid var(--border);
    border-radius: 12px; padding: 1rem 1.25rem;
    display: flex; align-items: center; gap: 1rem; margin-bottom: 1.75rem;
  }

  .ja-profile-avatar {
    width: 42px; height: 42px; border-radius: 50%;
    background: linear-gradient(135deg, #6366f1, #818cf8);
    display: flex; align-items: center; justify-content: center;
    font-weight: 600; color: #fff; font-size: 1rem; flex-shrink: 0;
  }

  .ja-profile-info strong { display: block; font-size: 0.9rem; color: var(--text); }
  .ja-profile-info span { font-size: 0.78rem; color: var(--muted); }

  .ja-check-icon {
    margin-left: auto; width: 20px; height: 20px; border-radius: 50%;
    background: rgba(74,222,128,0.1); border: 1px solid rgba(74,222,128,0.3);
    display: flex; align-items: center; justify-content: center;
    font-size: 0.65rem; color: #4ade80;
  }

  .ja-note {
    font-size: 0.8rem; color: var(--muted); text-align: center;
    margin-bottom: 1.5rem; line-height: 1.6;
    background: rgba(201,168,76,0.04); border: 1px solid rgba(201,168,76,0.1);
    border-radius: 8px; padding: 0.75rem 1rem;
  }

  .ja-btn {
    width: 100%;
    background: linear-gradient(135deg, var(--gold), var(--gold-light));
    color: #0a0f1e; font-family: 'DM Sans', sans-serif;
    font-size: 0.9rem; font-weight: 700; letter-spacing: 0.06em;
    border: none; border-radius: 12px; padding: 1rem;
    cursor: pointer; transition: all 0.3s; text-transform: uppercase;
    position: relative; overflow: hidden;
  }

  .ja-btn::after {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.25), transparent);
    opacity: 0; transition: opacity 0.3s;
  }
  .ja-btn:hover::after { opacity: 1; }
  .ja-btn:hover { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(201,168,76,0.4); }
  .ja-btn:active { transform: translateY(0); }
  .ja-btn:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }

  .ja-applying {
    display: flex; align-items: center; justify-content: center; gap: 0.6rem;
  }

  .ja-spinner {
    width: 16px; height: 16px; border-radius: 50%;
    border: 2px solid rgba(10,15,30,0.3);
    border-top-color: var(--navy);
    animation: spin 0.6s linear infinite;
  }

  .ja-msg {
    text-align: center; font-size: 0.85rem; margin-top: 1rem;
    padding: 0.75rem; border-radius: 8px;
  }

  .ja-msg.success {
    color: #4ade80;
    background: rgba(74,222,128,0.08); border: 1px solid rgba(74,222,128,0.2);
  }

  .ja-msg.error {
    color: #f87171;
    background: rgba(248,113,113,0.08); border: 1px solid rgba(248,113,113,0.2);
  }

  .ja-footer {
    position: relative; z-index: 5;
    border-top: 1px solid var(--border);
    text-align: center; padding: 1.5rem;
    font-size: 0.78rem; color: var(--muted);
    background: rgba(10,15,30,0.6);
  }

  @media (max-width: 768px) {
    .ja-nav { display: none; }
    .ja-card { padding: 2rem 1.5rem; }
  }

  @keyframes fadeSlideUp {
    from { opacity: 0; transform: translateY(24px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

export default function ApplyJobPage() {
  const [result, formAction, isPending] = useActionState(applyJobAction, null, { withPending: true });
  const { jobId } = useParams();
  const userId = localStorage.getItem("userId");
  const username = localStorage.getItem("username");
  const initial = username ? username[0].toUpperCase() : 'U';

  async function applyJobAction(_, formData) {
    const res = await fetch('http://127.0.0.1:8000/apply/', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ job: jobId, applicant: userId })
    });
    const data = await res.json();
    if (res.ok) return { message: data.message, success: true };
    return { message: data.message, success: false };
  }

  return (
    <div className="ja-root">
      <style>{style}</style>
      <div className="ja-mesh" />
      <div className="ja-ring" />
      <div className="ja-ring-2" />

      <header className="ja-header">
        <div className="ja-header-inner">
          <div className="ja-logo">TalentBridge</div>
          <nav className="ja-nav">
            <a href="#">Jobs</a>
            <a href="#">Companies</a>
            <a href="#">My Applications</a>
          </nav>
          <div className="ja-user">
            <span className="ja-user-name">Hello, {username}</span>
            <div className="ja-avatar">{initial}</div>
          </div>
        </div>
      </header>

      <main className="ja-main">
        <div className="ja-breadcrumb">
          <NavLink to="/jobs" className="ja-back">← Back to Jobs</NavLink>
        </div>

        <div className="ja-center">
          <div className="ja-card">
            <div className="ja-icon-ring">🚀</div>

            <h2 className="ja-card-title">Submit Application</h2>
            <p className="ja-card-sub">
              Your profile will be shared directly with the recruiter for review.
            </p>

            <div className="ja-divider" />

            <div className="ja-profile-box">
              <div className="ja-profile-avatar">{initial}</div>
              <div className="ja-profile-info">
                <strong>{username}</strong>
                <span>Profile ready to share</span>
              </div>
              <div className="ja-check-icon">✓</div>
            </div>

            <p className="ja-note">
              ✦ One-click apply — your saved profile is sent instantly to the hiring team.
            </p>

            <form action={formAction}>
              <button type="submit" className="ja-btn" disabled={isPending}>
                {isPending ? (
                  <span className="ja-applying">
                    <span className="ja-spinner" /> Submitting…
                  </span>
                ) : (
                  'Apply Now →'
                )}
              </button>

              {result && (
                <p className={`ja-msg ${result.success ? 'success' : 'error'}`}>
                  {result.success ? '✓ ' : '✕ '}{result.message}
                </p>
              )}
            </form>
          </div>
        </div>
      </main>

      <footer className="ja-footer">© 2026 JobPortal.com — All rights reserved</footer>
    </div>
  );
}
