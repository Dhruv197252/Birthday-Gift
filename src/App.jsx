/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Lock } from "lucide-react";

// ===================== CONFIG =====================
const HER_NAME = "Her Name"; // <-- change this
const PASSWORD = "love21"; // <-- change this
const MUSIC_SRC = "/music.mp3"; // <-- add romantic music in public folder

// ==================================================

export default function BirthdayWebsite() {
  const [unlocked, setUnlocked] = useState(false);
  const [page, setPage] = useState(0);

  if (!unlocked) return <PasswordGate onUnlock={() => setUnlocked(true)} />;

  return <MainSite page={page} setPage={setPage} />;
}

function MainSite({ page, setPage }) {
  const pages = [
    <LandingPage onNext={() => setPage(1)} />,
    <BookPage onNext={() => setPage(2)} />,
    <VideoPage onNext={() => setPage(3)} />,
    <ConclusionPage />,
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-rose-900 via-red-800 to-pink-900 text-white flex flex-col">
      <BackgroundMusic />
      <FloatingHearts />
      <RosePetals />
      <Navbar page={page} setPage={setPage} />
      <div className="flex-1 flex items-center justify-center p-4 md:p-6">{pages[page]}</div>
    </div>
  );
}

// ================= PASSWORD =================
function PasswordGate({ onUnlock }) {
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);

  const check = () => {
    if (input === PASSWORD) onUnlock();
    else setError(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black to-red-900 text-white">
      <div className="bg-white/10 p-8 rounded-3xl backdrop-blur-md text-center w-[90%] max-w-md">
        <Lock className="mx-auto mb-4 text-red-400" size={48} />
        <h2 className="text-2xl mb-4">Secret Entry 💖</h2>
        <input
          type="password"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter our secret"
          className="w-full p-3 rounded bg-black/40 mb-4 outline-none"
        />
        {error && <p className="text-red-400 mb-2">Wrong password 😅</p>}
        <button onClick={check} className="px-6 py-2 bg-red-600 rounded-full">
          Unlock
        </button>
      </div>
    </div>
  );
}

// ================= NAVBAR =================
function Navbar({ page, setPage }) {
  const links = ["Home", "Book", "Video", "Conclusion"];
  return (
    <div className="flex justify-center gap-3 md:gap-6 py-3 bg-black/30 backdrop-blur-md">
      {links.map((l, i) => (
        <button
          key={i}
          onClick={() => setPage(i)}
          className={`px-3 md:px-4 py-1 md:py-2 rounded-full transition text-sm md:text-base ${
            page === i ? "bg-red-600" : "bg-white/10 hover:bg-white/20"
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}

// ================= LANDING =================
function LandingPage({ onNext }) {
  const [opened, setOpened] = useState(false);

  const lines = [
    "You know what?",
    "21 years ago, a girl was born in 2005…",
    "Guess her name…",
    "Yes, it is you…",
    "Happy Birthday ❤️",
  ];

  const backgrounds = ["/bg1.jpg", "/bg2.jpg", "/bg3.jpg"];

  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  const currentLine = lines[lineIndex];

  useEffect(() => {
    if (!opened) return;

    if (charIndex < currentLine.length) {
      const t = setTimeout(() => setCharIndex(charIndex + 1), lineIndex === 3 ? 140 : 60);
      return () => clearTimeout(t);
    } else if (lineIndex < lines.length - 1) {
      const t = setTimeout(() => {
        setLineIndex(lineIndex + 1);
        setCharIndex(0);
      }, 900);
      return () => clearTimeout(t);
    }
  }, [charIndex, lineIndex, opened]);

  return (
    <div className="relative w-full h-[75vh] rounded-3xl overflow-hidden shadow-2xl flex items-center justify-center">
      {!opened ? (
        <EnvelopeAnimation onOpen={() => setOpened(true)} />
      ) : (
        <>
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${backgrounds[lineIndex % backgrounds.length]})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          <div className="relative z-10 text-center px-4">
            <p className="text-xl md:text-4xl font-light text-pink-100 tracking-wide min-h-[3rem]">
              {currentLine.slice(0, charIndex)}
              <span className="animate-pulse">|</span>
            </p>

            {lineIndex === lines.length - 1 && charIndex === currentLine.length && (
              <>
                <motion.h1
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 120 }}
                  className="text-4xl md:text-6xl font-bold mt-4 text-red-400"
                >
                  {HER_NAME}
                </motion.h1>

                <button
                  onClick={onNext}
                  className="mt-8 px-8 py-3 bg-red-600 hover:bg-red-700 rounded-full text-lg"
                >
                  Continue Our Story →
                </button>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}

function EnvelopeAnimation({ onOpen }) {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="bg-red-700 w-80 h-52 rounded-xl relative cursor-pointer shadow-2xl flex items-center justify-center"
      onClick={onOpen}
    >
      <motion.div
        initial={{ rotateX: 0 }}
        whileTap={{ rotateX: -140 }}
        transition={{ duration: 0.8 }}
        className="absolute top-0 w-full h-1/2 bg-red-800 rounded-t-xl origin-top"
      />
      <p className="text-white z-10 text-lg">💌 Tap to open your letter</p>
    </motion.div>
  );
}

// ================= BOOK =================

function BookPage({ onNext }) {
  const chapters = 6;
  const [chapter, setChapter] = useState(0);

  const isGallery = chapter === chapters - 1;

  return (
    <div className="w-full max-w-5xl">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl md:text-2xl font-semibold">Chapter {chapter + 1}</h2>
        <div className="flex gap-2">
          <button disabled={chapter === 0} onClick={() => setChapter(chapter - 1)} className="px-3 py-1 bg-white/10 rounded">◀</button>
          <button disabled={chapter === chapters - 1} onClick={() => setChapter(chapter + 1)} className="px-3 py-1 bg-white/10 rounded">▶</button>
        </div>
      </div>

      <div className="relative perspective-1000">
        <AnimatePresence mode="wait">
          <motion.div
            key={chapter}
            initial={{ rotateY: 90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: -90, opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white/10 p-6 rounded-3xl shadow-2xl backdrop-blur-md"
          >
            {!isGallery ? (
              <>
                <div className="flex items-center justify-center border-r border-white/20">
                  <div className="w-56 h-72 md:w-60 md:h-80 bg-white/20 rounded-xl flex items-center justify-center text-pink-200">Her Photo</div>
                </div>
                <div className="text-pink-100 leading-relaxed font-serif">
                  <p className="mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                  <p className="mb-4">Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                  <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
                </div>
              </>
            ) : (
              <PhotoGallery />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="text-center mt-6">
        <button onClick={onNext} className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded-full">Next → Video</button>
      </div>
    </div>
  );
}

function PhotoGallery() {
  const photos = ["/g1.jpg", "/g2.jpg", "/g3.jpg", "/g4.jpg"];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {photos.map((p, i) => (
        <img key={i} src={p} className="rounded-xl object-cover h-40 w-full" />
      ))}
    </div>
  );
}

// ================= VIDEO =================
function VideoPage({ onNext }) {
  return (
    <div className="text-center max-w-3xl">
      <h2 className="text-3xl mb-6">A Message From My Heart 🎥</h2>
      <div className="aspect-video bg-black/50 rounded-2xl mb-6 flex items-center justify-center">
        <p className="text-pink-200">Place your video here</p>
      </div>
      <button onClick={onNext} className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded-full">Final Page →</button>
    </div>
  );
}

// ================= CONCLUSION =================
function ConclusionPage() {
  const [opened, setOpened] = useState(false);

  return (
    <div className="text-center max-w-2xl">
      {!opened ? (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="cursor-pointer"
          onClick={() => setOpened(true)}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="w-48 h-48 bg-red-600 rounded-2xl mx-auto flex items-center justify-center shadow-2xl"
          >
            🎁
          </motion.div>
          <p className="mt-4 text-pink-200">Tap to open your final gift</p>
        </motion.div>
      ) : (
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <h2 className="text-4xl font-bold mb-4">Forever & Always ❤️</h2>
          <p className="text-pink-200 mb-6">This is just a small digital piece of how big my love for you is.</p>
          <p className="italic text-pink-300">Happy Birthday, my love.</p>
        </motion.div>
      )}
    </div>
  );
}

// ================= EFFECTS =================

function FloatingHearts() {
  return Array.from({ length: 12 }).map((_, i) => (
    <motion.div
      key={i}
      className="absolute text-red-400"
      initial={{ x: Math.random() * window.innerWidth, y: window.innerHeight + 50, opacity: 0.7 }}
      animate={{ y: -100, opacity: 0 }}
      transition={{ duration: 10 + Math.random() * 10, repeat: Infinity, delay: Math.random() * 5 }}
    >
      ❤️
    </motion.div>
  ));
}

function RosePetals() {
  return Array.from({ length: 10 }).map((_, i) => (
    <motion.div
      key={i}
      className="absolute text-pink-300"
      initial={{ x: Math.random() * window.innerWidth, y: -50 }}
      animate={{ y: window.innerHeight + 100, rotate: 360 }}
      transition={{ duration: 12 + Math.random() * 10, repeat: Infinity, delay: Math.random() * 6 }}
    >
      🌹
    </motion.div>
  ));
}

function BackgroundMusic() {
  return <audio src={MUSIC_SRC} autoPlay loop />;
}
