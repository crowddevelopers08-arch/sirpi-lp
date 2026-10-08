'use client';

import { useState } from 'react';
import Image from 'next/image';

// Lato, the site's typeface, is loaded once in app/layout.tsx as --font-lato.
const FONT = 'font-[family-name:var(--font-lato)]';

const RATINGS = ['Terrible', 'Poor', 'Okay', 'Good', 'Excellent'];
const EMOJIS = ['😞', '😟', '😐', '😊', '🤩'];

const LOGO_SRC =
  '/CIRCLE-STICKER-LOGO.png';

// Carewell Clinic and Acadamy — Google Business listing (CID from the map embed
// in components/ContactMapSection.tsx). Replace with the short
// https://g.page/r/<id>/review link from Google Business Profile when available.
const GOOGLE_REVIEW_URL =
  'https://g.page/r/<id>/review';

function wordCount(str: string) {
  return str.trim().split(/\s+/).filter(Boolean).length;
}

export default function ReviewPage() {
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [formDone, setFormDone] = useState(false);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [callback, setCallback] = useState(true);
  const [message, setMessage] = useState('');
  const [msgError, setMsgError] = useState('');

  function handleStar(index: number) {
    setSelected(index + 1);
    setTimeout(() => setSubmitted(true), 600);
  }

  function handleChange() {
    setSubmitted(false);
    setFormDone(false);
    setMsgError('');
  }

  async function handleFeedbackSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (wordCount(message) < 5) {
      setMsgError('Your message is too short. Please add a few more words.');
      return;
    }
    setMsgError('');
    setLoading(true);

    try {
      await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: 'Review Page',
          name,
          phone,
          concern: `${message} | Rating: ${selected}/5 | Callback: ${callback ? 'Yes' : 'No'}`,
          pageUrl: window.location.href,
          rating: selected ? String(selected) : '',
          callback: callback ? 'Yes' : 'No',
        }),
      });
    } catch {
      // still show success to user even if network fails
    }

    setLoading(false);
    // Low ratings (1–3) stop here — they are NOT sent to the Google review
    // funnel. Only 4–5 star raters see the Google button (SCREEN 2B).
    setFormDone(true);
  }

  const isLowRating = selected !== null && selected <= 3;

  return (
    <main
      className={`${FONT} min-h-screen flex items-center justify-center bg-[#FFF8FA] px-4 py-8`}
    >

      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 45%, rgba(237,87,92,0.16) 0%, transparent 70%), radial-gradient(ellipse 45% 40% at 80% 85%, rgba(106,17,61,0.10) 0%, transparent 70%)',
        }}
      />

      <div className="relative w-full max-w-md bg-white border border-[#6A113D]/10 rounded-[28px] px-8 py-10 flex flex-col items-center gap-5 shadow-[0_18px_60px_-30px_rgba(106,17,61,0.35)]">

        {/* Header */}
        <div className="relative h-20 w-64 pt-2">
          <Image
            src={LOGO_SRC}
            alt="Sirpi Aesthetics - Cosmetic Surgery Centre"
            fill
            sizes="256px"
            className="object-contain object-center"
            priority
          />
        </div>

        <div className="w-10 h-px bg-[#ED575C]/50" />

        {/* ── SCREEN 1: Star rating ── */}
        {!submitted && (
          <>
            <div className="w-16 h-16 rounded-2xl bg-[#ED575C]/12 border border-[#ED575C]/25 flex items-center justify-center">
              <span className="text-3xl">{selected ? EMOJIS[selected - 1] : '😌'}</span>
            </div>

            <div className="text-center">
              <h2 className={`${FONT} text-[28px] font-semibold text-[#6A113D] leading-tight`}>How was your experience?</h2>
              <p className="text-[#6A113D]/70 text-[15px] mt-1 leading-relaxed">
                Please rate your visit. Your feedback<br />helps us improve our care.
              </p>
            </div>

            <div className="flex gap-2.5">
              {RATINGS.map((label, i) => {
                const filled = selected !== null && i < selected;
                return (
                  <button
                    key={i}
                    onClick={() => handleStar(i)}
                    className={`wave-btn relative w-12 h-12 rounded-xl flex items-center justify-center text-[22px] transition-all duration-200 active:scale-90 ${
                      filled
                        ? 'bg-[#ED575C] text-white border border-[#ED575C]'
                        : 'bg-[#6A113D]/5 border border-[#6A113D]/10 text-[#6A113D]/25 hover:border-[#ED575C]/60 hover:text-[#ED575C]'
                    }`}
                    aria-label={label}
                  >
                    ★
                  </button>
                );
              })}
            </div>

            <p className="text-[12px] font-semibold text-[#ED575C] tracking-[0.16em] min-h-[18px] uppercase">
              {selected ? RATINGS[selected - 1] : 'Select your rating'}
            </p>
          </>
        )}

        {/* ── SCREEN 2A: Low rating (1–3) → feedback form ── */}
        {submitted && isLowRating && !formDone && (
          <>
            <div className="w-16 h-16 rounded-2xl bg-[#ED575C]/12 border border-[#ED575C]/25 flex items-center justify-center">
              <span className="text-3xl">💬</span>
            </div>

            <div className="text-center">
              <h2 className={`${FONT} text-[28px] font-semibold text-[#6A113D] leading-tight`}>Tell us how we can improve</h2>
              <p className="text-[#6A113D]/70 text-[14px] mt-1 leading-relaxed">
                We&apos;re sorry your experience was not perfect.<br />Please share your concern with us.
              </p>
            </div>

            <form onSubmit={handleFeedbackSubmit} className="w-full flex flex-col gap-4">

              <div className="flex max-sm:flex-col gap-3">
                <div className="flex-1 min-w-0 flex flex-col gap-1">
                  <label className="text-[11px] font-semibold text-[#6A113D]/60 uppercase tracking-[0.12em]">Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Enter your name"
                    required
                    className="w-full min-w-0 border border-[#6A113D]/15 rounded-xl px-3 py-2.5 text-[13px] text-[#6A113D] placeholder-[#6A113D]/35 outline-none focus:border-[#ED575C] transition-colors"
                  />
                </div>
                <div className="flex-1 min-w-0 flex flex-col gap-1">
                  <label className="text-[11px] font-semibold text-[#6A113D]/60 uppercase tracking-[0.12em]">Phone</label>
                  <div className="flex min-w-0 border border-[#6A113D]/15 rounded-xl overflow-hidden focus-within:border-[#ED575C] transition-colors">
                    <span className="bg-[#ED575C]/12 px-3 flex items-center text-[13px] font-semibold text-[#6A113D]/60 border-r border-[#ED575C]/25">+91</span>
                    <input
                      type="tel"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      placeholder="10-digit"
                      maxLength={10}
                      required
                      className="flex-1 min-w-0 px-3 py-2.5 text-[13px] text-[#6A113D] placeholder-[#6A113D]/35 outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-semibold text-[#6A113D]/60 uppercase tracking-[0.12em]">Request a Callback?</label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setCallback(true)}
                    className={`wave-btn relative flex-1 py-2.5 rounded-xl text-[13px] font-semibold transition-all ${
                      callback
                        ? 'bg-[#6A113D] text-white'
                        : 'bg-[#6A113D]/5 border border-[#6A113D]/10 text-[#6A113D]/50 hover:border-[#ED575C]/50'
                    }`}
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    onClick={() => setCallback(false)}
                    className={`wave-btn relative flex-1 py-2.5 rounded-xl text-[13px] font-semibold transition-all ${
                      !callback
                        ? 'bg-[#6A113D] text-white'
                        : 'bg-[#6A113D]/5 border border-[#6A113D]/10 text-[#6A113D]/50 hover:border-[#ED575C]/50'
                    }`}
                  >
                    No
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-semibold text-[#6A113D]/60 uppercase tracking-[0.12em]">Message</label>
                <textarea
                  value={message}
                  onChange={e => { setMessage(e.target.value); if (msgError) setMsgError(''); }}
                  placeholder="Write your message here"
                  rows={4}
                  className={`w-full border rounded-xl px-3 py-2.5 text-[14px] text-[#6A113D] placeholder-[#6A113D]/35 outline-none transition-colors resize-none ${
                    msgError ? 'border-red-400 focus:border-red-400' : 'border-[#6A113D]/15 focus:border-[#ED575C]'
                  }`}
                />
                {msgError && (
                  <p className="text-red-500 text-[12px] mt-0.5">{msgError}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="wave-btn relative w-full bg-[#6A113D] text-white font-semibold py-3.5 rounded-xl text-[13px] tracking-[0.12em] uppercase transition-colors hover:bg-[#A52D5B] active:scale-95 disabled:opacity-60"
              >
                {loading ? 'Submitting...' : 'Submit Feedback'}
              </button>
            </form>

            <button onClick={handleChange} className="text-[#6A113D]/60 text-[14px] tracking-wide hover:text-[#ED575C] transition-colors">
              Change rating
            </button>
          </>
        )}

        {/* ── SCREEN 2B: High rating (4–5) → thank you + Google ── */}
        {submitted && !isLowRating && (
          <>
            <div className="w-16 h-16 rounded-2xl bg-[#ED575C]/12 border border-[#ED575C]/25 flex items-center justify-center">
              <span className="text-3xl">🎉</span>
            </div>

            <div className="text-center">
              <h2 className={`${FONT} text-[32px] font-semibold text-[#6A113D] leading-tight`}>Thank you for your feedback!</h2>
              <p className="text-[#6A113D]/70 text-[15px] mt-1 leading-relaxed">
                We&apos;re glad you had a great experience.<br />Please share it with us.
              </p>
            </div>

            <a
              href={GOOGLE_REVIEW_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="wave-btn relative w-full flex items-center justify-between bg-[#6A113D] text-white rounded-xl px-4 py-3.5 hover:bg-[#A52D5B] transition-colors duration-200 active:scale-95 group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#ED575C] flex items-center justify-center">
                  <span className="text-[16px]">★</span>
                </div>
                <div>
                  <p className="font-semibold text-[16px] tracking-wide text-white">Share Your Experience</p>
                  <p className="text-[13px] opacity-70 text-white">Continue to Google Reviews</p>
                </div>
              </div>
              <span className="text-[18px] font-light">→</span>
            </a>

            <button onClick={handleChange} className="text-[#6A113D]/60 text-[14px] tracking-wide hover:text-[#ED575C] transition-colors">
              Change rating
            </button>
          </>
        )}

        {/* ── SCREEN 3: After low rating form submitted ── */}
        {formDone && (
          <>
            <div className="w-16 h-16 rounded-2xl bg-[#ED575C]/12 border border-[#ED575C]/25 flex items-center justify-center">
              <span className="text-3xl">🙏</span>
            </div>
            <div className="text-center">
              <h2 className={`${FONT} text-[26px] font-semibold text-[#6A113D] leading-tight`}>Thank you for your feedback!</h2>
              <p className="text-[#6A113D]/70 text-[13px] mt-1 leading-relaxed">
                We appreciate your honesty and<br />will work to improve.
              </p>
            </div>
          </>
        )}

      </div>
    </main>
  );
}
