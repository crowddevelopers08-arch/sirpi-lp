"use client";

import { ChevronLeft, ChevronRight, Pause, Play, Volume2, VolumeX } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

type PatientVideo = {
  src: string;
  poster: string;
  name: string;
  concern: string;
};

const CLOUDINARY_VIDEO = "https://res.cloudinary.com/wrqmzegd/video/upload";

const testimonialVideo = (version: string, path: string, name: string, concern: string): PatientVideo => ({
  src: `${CLOUDINARY_VIDEO}/${version}/${path}.mp4`,
  poster: `${CLOUDINARY_VIDEO}/so_1,w_720,q_auto/${version}/${path}.jpg`,
  name,
  concern,
});

const patientVideos: PatientVideo[] = [
  testimonialVideo("v1795174176", "video_-_11", "P. Ramesh", "Knee Pain"),
  testimonialVideo("v1795174163", "video_-_13", "R. Vaishnavi", "Disc Bulge"),
  testimonialVideo("v1795174139", "video_-_12", "Kesavan", "Joint Pain"),
];

// Each video gets up to this much playback before the next one comes forward.
// It counts playback time, so pausing the video also pauses the rotation.
const ROTATE_AFTER_SECONDS = 35;

// Where each card sits relative to the active one: in front, or tucked behind on either
// side and tilted outwards. Rotation animates with the slide when a card moves.
const positions = {
  center: "z-20 translate-x-0 rotate-0 scale-100 opacity-100",
  right: "z-10 translate-x-[34%] rotate-[8deg] scale-[.82] opacity-60 hover:opacity-80",
  left: "z-10 -translate-x-[34%] -rotate-[8deg] scale-[.82] opacity-60 hover:opacity-80",
  hidden: "z-0 scale-75 opacity-0 pointer-events-none",
};

function slotFor(index: number, active: number, count: number): keyof typeof positions {
  const offset = (index - active + count) % count;
  if (offset === 0) return "center";
  if (offset === 1) return "right";
  if (offset === count - 1) return "left";
  return "hidden";
}

const formatTime = (seconds: number) => {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const s = Math.floor(seconds);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
};

/**
 * Stacked patient-video carousel for the hero: the active video plays in front with
 * sound, the neighbours peek out behind it, and the next video comes forward after
 * 35s of playback (or when the video ends).
 */
export default function PatientVideoCarousel() {
  const count = patientVideos.length;
  const [active, setActive] = useState(0);
  // Sound is on by default. Each video first tries to play unmuted; only if the
  // browser refuses (it does for visitors who haven't tapped the page yet) does it
  // fall back to muted playback with a "Tap for sound" badge.
  const [muted, setMuted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  // True while the video is muted only because the browser hasn't allowed sound yet
  // (not because the visitor chose mute). Read inside event listeners.
  const forcedMute = useRef(false);
  // Drives the "Tap for sound" badge once we know the browser won't allow sound yet.
  const [soundBlocked, setSoundBlocked] = useState(false);
  // A tap that turns the sound on shouldn't also pause the video, so ignore
  // play/pause toggles for a moment afterwards.
  const ignoreToggleUntil = useRef(0);

  const goTo = useCallback(
    (index: number) => {
      setActive(((index % count) + count) % count);
      setTime(0);
      setDuration(0);
    },
    [count],
  );

  // Switch the sound on. If the browser still refuses (it pauses or rejects unmuted
  // playback), fall back to muted playback and show the badge.
  const enableSound = useCallback(() => {
    const video = videoRef.current;
    forcedMute.current = false;
    setSoundBlocked(false);
    setMuted(false);
    if (!video) return;
    video.muted = false;
    video.play().catch(() => {
      forcedMute.current = true;
      setSoundBlocked(true);
      setMuted(true);
      video.muted = true;
      video.play().catch(() => {});
    });
  }, []);

  // Start each new video with the current sound setting. Once the visitor has tapped
  // the page, browsers allow later videos to play with sound.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = muted;
    // Pick up anything that happened before React attached its event handlers.
    setPlaying(!video.paused);
    if (video.readyState >= 1 && Number.isFinite(video.duration)) setDuration(video.duration);
    video.play().catch(() => {
      if (video.muted) return setPlaying(false);
      forcedMute.current = true;
      setSoundBlocked(true);
      setMuted(true);
      video.muted = true;
      video.play().catch(() => setPlaying(false));
    });
    // Only on a new video; mute toggles are handled by the buttons.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  // Otherwise turn the sound on at the visitor's first tap, click or key press anywhere.
  // Listen for pointerup, not pointerdown: on phones the browser only counts a tap as
  // permission when the finger lifts.
  useEffect(() => {
    const onInteract = (e: Event) => {
      if (!forcedMute.current) return;
      if (e.target instanceof Element && e.target.closest("[data-mute-toggle]")) return;
      ignoreToggleUntil.current = Date.now() + 1000;
      enableSound();
    };
    window.addEventListener("pointerup", onInteract);
    window.addEventListener("keydown", onInteract);
    return () => {
      window.removeEventListener("pointerup", onInteract);
      window.removeEventListener("keydown", onInteract);
    };
  }, [enableSound]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video || Date.now() < ignoreToggleUntil.current) return;
    if (video.paused) video.play().catch(() => {});
    else video.pause();
  };

  const toggleMute = () => {
    if (muted) return enableSound();
    const video = videoRef.current;
    forcedMute.current = false;
    setSoundBlocked(false);
    if (video) video.muted = true;
    setMuted(true);
  };

  const seek = (seconds: number) => {
    const video = videoRef.current;
    if (video) video.currentTime = seconds;
  };

  const arrow =
    "absolute top-1/2 z-30 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-[#E8C5D3] bg-white text-[#6A113D] shadow-sm transition hover:border-[#ED575C] hover:bg-[#ED575C] hover:text-white";
  const controlButton =
    "grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/15 text-white backdrop-blur transition hover:bg-[#ED575C]";

  return (
    <section className="py-8 font-[family-name:var(--font-lato)]" aria-labelledby="rhinoplasty-videos-title">
      <div className="mx-auto max-w-[720px] px-4 text-center sm:px-8">
        <span className="inline-block rounded-full bg-[#F9E8EF] px-4 py-1.5 text-[12px] font-bold tracking-[0.18em] text-[#6A113D] uppercase sm:text-[13px]">
          Patient Stories
        </span>
        <h2 id="rhinoplasty-videos-title" className="mt-2 text-[28px] leading-[1.2] font-extrabold text-[#6A113D] sm:text-[38px]">
          Videos you should watch <span className="block text-[#ED575C] sm:inline">to know about rhinoplasty</span>
        </h2>
      </div>

      <div className="relative mx-auto py-4 lg:w-[460px]" role="region" aria-roledescription="carousel" aria-label="Patient videos">
      <div className="relative mx-auto aspect-[9/16] w-[230px] sm:w-[300px]">
        {patientVideos.map((video, i) => {
            const slot = slotFor(i, active, count);
          const label = `${video.name} – ${video.concern}`;
          return (
            <div
              key={video.src}
              aria-hidden={slot !== "center"}
              className={`absolute inset-0 overflow-hidden rounded-[22px] bg-[#1f0a14] shadow-[0_14px_34px_rgba(106,17,61,.28)] ring-1 ring-black/5 transition-all duration-700 ease-out ${positions[slot]}`}
            >
              {slot === "center" ? (
                <>
                  <video
                    ref={videoRef}
                    src={video.src}
                    poster={video.poster}
                    title={`Patient video: ${label}`}
                    playsInline
                    preload="metadata"
                    onPlay={() => setPlaying(true)}
                    onPause={() => setPlaying(false)}
                    onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
                    onTimeUpdate={(e) => {
                      // Autoplay can start before React attaches onPlay/onLoadedMetadata,
                      // so read the real state from the element on every tick too.
                      const el = e.currentTarget;
                      const t = el.currentTime;
                      setTime(t);
                      setPlaying(!el.paused);
                      if (Number.isFinite(el.duration)) setDuration(el.duration);
                      if (count > 1 && t >= ROTATE_AFTER_SECONDS) goTo(active + 1);
                    }}
                    onEnded={() => goTo(active + 1)}
                    onClick={togglePlay}
                    className="absolute inset-0 h-full w-full cursor-pointer bg-black object-cover"
                  />

                  {soundBlocked && (
                    <button
                      type="button"
                      onClick={toggleMute}
                      data-mute-toggle
                      className="absolute top-3 left-1/2 inline-flex -translate-x-1/2 animate-pulse items-center gap-1.5 rounded-full bg-[#ED575C] px-3.5 py-2 text-xs font-semibold whitespace-nowrap text-white shadow-lg"
                    >
                      <VolumeX className="h-4 w-4" /> Tap for sound
                    </button>
                  )}

                  {!playing && (
                    <button
                      type="button"
                      onClick={togglePlay}
                      aria-label="Play video"
                      className="absolute top-1/2 left-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[#ED575C] text-white shadow-[0_0_0_10px_rgba(237,87,92,.25)] transition hover:scale-110"
                    >
                      <Play className="ml-1 h-6 w-6 fill-white" />
                    </button>
                  )}

                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/45 to-transparent px-3 pt-12 pb-3">
                    <p className="text-[15px] leading-tight font-semibold text-white">{video.name}</p>
                    <p className="mt-0.5 text-[11px] font-medium tracking-[1px] text-[#FFB3B5] uppercase">{video.concern}</p>

                    <input
                      type="range"
                      min={0}
                      max={duration || 0}
                      step={0.1}
                      value={Math.min(time, duration || 0)}
                      onChange={(e) => seek(Number(e.target.value))}
                      aria-label="Seek video"
                      className="mt-2.5 h-1 w-full cursor-pointer accent-[#ED575C]"
                    />

                    <div className="mt-2 flex items-center gap-2">
                      <button type="button" onClick={togglePlay} aria-label={playing ? "Pause video" : "Play video"} className={controlButton}>
                        {playing ? <Pause className="h-4 w-4 fill-white" /> : <Play className="ml-0.5 h-4 w-4 fill-white" />}
                      </button>
                      <span className="text-xs font-medium text-white/85 tabular-nums">
                        {formatTime(time)} / {formatTime(duration)}
                      </span>
                      <button
                        type="button"
                        onClick={toggleMute}
                        data-mute-toggle
                        aria-label={muted ? "Unmute video" : "Mute video"}
                        className={`${controlButton} ml-auto`}
                      >
                        {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <button
                  type="button"
                  tabIndex={slot === "hidden" ? -1 : 0}
                  onClick={() => goTo(i)}
                  aria-label={`Show patient video: ${label}`}
                  className="absolute inset-0 h-full w-full"
                >
                  <img src={video.poster} alt="" loading="lazy" draggable={false} className="h-full w-full object-cover" />
                </button>
              )}
            </div>
          );
        })}
      </div>

      {count > 1 && (
        <>
          <button type="button" onClick={() => goTo(active - 1)} aria-label="Previous video" className={`${arrow} left-0`}>
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button type="button" onClick={() => goTo(active + 1)} aria-label="Next video" className={`${arrow} right-0`}>
            <ChevronRight className="h-5 w-5" />
          </button>
        </>
      )}
      </div>

      <div className="mt-2 flex justify-center px-4">
        <a
          href="#enquire"
          className="inline-flex h-12 w-full max-w-[320px] items-center justify-center rounded-full bg-[#ED575C] px-8 text-[16px] font-bold text-white transition hover:brightness-95 sm:w-auto"
        >
          Book Your Consultation
        </a>
      </div>
    </section>
  );
}
