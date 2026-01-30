/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Lock, Sparkles, ChevronRight, Music, Volume2, VolumeX } from "lucide-react";

// ===================== CONFIG =====================
const HER_NAME = "SHREYA"; // <-- change this
const PASSWORD = "25022005"; // <-- change this
// Note: Changed to a web URL for preview. Replace with "/music.mp3" for your local file.
const MUSIC_SRC = "music.webm"; 

// ==================================================
// 📸 PUT HER PHOTOS HERE
// These images will appear in the background ONLY when "Happy Birthday" pops out.
// ==================================================
const LANDING_BG_IMAGES = [
  // "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop",
  "/PIC.jpg",

  // "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop",
  // "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1000&auto=format&fit=crop"
];

export default function BirthdayWebsite() {
  const [unlocked, setUnlocked] = useState(false);
  const [page, setPage] = useState(0);

  if (!unlocked) return <PasswordGate onUnlock={() => setUnlocked(true)} />;

  return <MainSite page={page} setPage={setPage} />;
}

function MainSite({ page, setPage }) {
  const pages = [
    <LandingPage onNext={() => setPage(1)} key="landing" />,
    <BookPage onNext={() => setPage(2)} key="book" />,
    <VideoPage onNext={() => setPage(3)} key="video" />,
    <ConclusionPage key="conclusion" />,
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-rose-900 via-red-950 to-black text-rose-50 flex flex-col font-sans selection:bg-rose-500/30">
      <BackgroundMusic />
      
      {/* Ambient Light Effects */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-rose-600/20 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-pink-600/20 rounded-full blur-[100px] animate-pulse delay-1000"></div>
      </div>

      {/* Floating Elements */}
      <FloatingHearts />
      <RosePetals />
      <FloatingPaws />
      
      <Navbar page={page} setPage={setPage} />
      
      <div className="flex-1 flex items-center justify-center p-4 md:p-6 w-full relative z-10">
        <AnimatePresence mode="wait">
           <motion.div 
             key={page}
             initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
             animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
             exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
             transition={{ duration: 0.8, ease: "easeInOut" }}
             className="w-full flex justify-center"
           >
             {pages[page]}
           </motion.div>
        </AnimatePresence>
      </div>
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
    <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-rose-900 to-black text-white p-4">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-white/5 p-8 md:p-12 rounded-[2rem] backdrop-blur-xl text-center w-full max-w-md border border-white/10 shadow-[0_0_40px_rgba(225,29,72,0.2)]"
      >
        <div className="bg-gradient-to-br from-rose-500 to-red-600 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg shadow-rose-500/30">
           {/* Replaced Icon with Emoji for stability */}
           <span className="text-4xl">🐱</span>
        </div>
        <h2 className="text-3xl mb-3 font-serif italic tracking-wide">Secret Entry</h2>
        <p className="text-rose-200/80 mb-8 text-sm font-light">The key to my heart (and the cats) is the password...</p>
        
        <input
          type="password"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter password"
          className="w-full p-4 rounded-xl bg-black/20 mb-4 outline-none border border-white/5 focus:border-rose-400/50 transition-colors text-center tracking-[0.5em] text-lg placeholder:tracking-normal placeholder:text-white/20"
        />
        {error && <p className="text-rose-400 mb-4 text-sm animate-pulse font-medium">Try again, love 🐾</p>}
        <button 
          onClick={check} 
          className="w-full py-4 bg-gradient-to-r from-rose-600 to-pink-600 rounded-xl font-bold shadow-lg shadow-rose-900/40 hover:scale-[1.02] hover:shadow-rose-500/20 transition-all duration-300 flex items-center justify-center gap-2"
        >
          Unlock <span className="text-xl">🐾</span>
        </button>
      </motion.div>
    </div>
  );
}

// ================= NAVBAR =================
function Navbar({ page, setPage }) {
  const links = [
    { name: "Home", icon: Heart },
    { name: "Story", icon: null, emoji: "🐾" }, // Using Emoji for cat items
    { name: "Video", icon: Sparkles },
    { name: "Gift", icon: null, emoji: "🐱" }
  ];
  return (
    <div className="flex justify-center z-50 mt-6 mb-2">
      <div className="flex gap-1 p-1.5 bg-white/5 backdrop-blur-2xl rounded-full border border-white/10 shadow-xl">
        {links.map((l, i) => (
          <button
            key={i}
            onClick={() => setPage(i)}
            className={`px-5 py-2 rounded-full transition-all duration-500 text-sm tracking-wide flex items-center gap-2 ${
              page === i 
                ? "bg-rose-500/80 text-white shadow-lg shadow-rose-500/30" 
                : "text-rose-200/60 hover:text-rose-100 hover:bg-white/5"
            }`}
          >
            {page === i && (
                l.icon ? <l.icon size={14} className="animate-pulse" /> : <span className="animate-bounce">{l.emoji}</span>
            )}
            {l.name}
          </button>
        ))}
      </div>
    </div>
  );
}

// ================= LANDING (UPDATED) =================
function LandingPage({ onNext }) {
  const [stage, setStage] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [bgIndex, setBgIndex] = useState(0);
  const fullText = "Yes, it is you...";

  // Background rotater for final stage
  useEffect(() => {
    if (stage === 4) {
      const interval = setInterval(() => {
        setBgIndex(prev => (prev + 1) % LANDING_BG_IMAGES.length);
      }, 5000); // Slower background rotation
      return () => clearInterval(interval);
    }
  }, [stage]);

  // Sequence Controller
  useEffect(() => {
    let timer;
    if (stage === 0) timer = setTimeout(() => setStage(1), 4000); // "You know what?"
    else if (stage === 1) timer = setTimeout(() => setStage(2), 5000); // "21 years ago..."
    else if (stage === 2) timer = setTimeout(() => setStage(3), 6000); // "Guess her name..."
    else if (stage === 3) {
      // Typewriter logic for "Yes, it is you..."
      if (typedText.length < fullText.length) {
        timer = setTimeout(() => {
          setTypedText(fullText.slice(0, typedText.length + 1));
        }, 600); // Much slower typing speed (400ms per letter)
      } else {
        // Finished typing, wait a bit then reveal
        timer = setTimeout(() => setStage(4), 2500);
      }
    }
    return () => clearTimeout(timer);
  }, [stage, typedText]);

  // Framer Motion variants for text fading - Smoother
  const fadeText = {
    initial: { opacity: 0, y: 30, filter: "blur(10px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    exit: { opacity: 0, y: -30, filter: "blur(10px)" },
    transition: { duration: 1.5, ease: "easeInOut" }
  };

  // --- RENDERING STAGES ---

  // Stages 0-2: Intro Text
  if (stage < 3) {
    return (
      <div className="relative w-full h-[70vh] flex items-center justify-center text-center px-4 max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          {stage === 0 && (
            <motion.h2 key="step0" {...fadeText} className="text-3xl md:text-5xl font-serif text-rose-100 italic tracking-wider leading-relaxed">
              You know what?
            </motion.h2>
          )}
          {stage === 1 && (
            <motion.h2 key="step1" {...fadeText} className="text-3xl md:text-5xl font-serif text-rose-100 italic leading-relaxed">
              <span className="text-rose-400">21 years ago</span>, <br/> a beautiful soul graced this world...
            </motion.h2>
          )}
          {stage === 2 && (
            <motion.h2 key="step2" {...fadeText} className="text-3xl md:text-5xl font-serif text-rose-100 italic tracking-wider">
              Can you guess who?
            </motion.h2>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // Stage 3: Typewriter Effect
  if (stage === 3) {
    return (
      <div className="relative w-full h-[70vh] flex items-center justify-center">
        <motion.h2 className="text-4xl md:text-6xl font-light font-serif tracking-widest drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
          {typedText}
          <span className="animate-pulse text-rose-400">|</span>
        </motion.h2>
      </div>
    );
  }

  // Stage 4: Final Surprise Reveal
  return (
    <div className="relative w-full h-[75vh] rounded-[2rem] overflow-hidden shadow-2xl flex items-center justify-center border border-white/10 group">
      {/* Background Slideshow */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={bgIndex}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 0.6, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 3, ease: "easeInOut" }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${LANDING_BG_IMAGES[bgIndex]})` }}
        />
      </AnimatePresence>
      
      {/* Cinematic Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-rose-950 via-rose-950/40 to-rose-950/80" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0, y: 50 }} 
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <div className="mb-6 inline-flex items-center justify-center p-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
            <Sparkles className="text-yellow-200 w-6 h-6 animate-pulse" />
          </div>
          
          <h1 className="text-5xl md:text-8xl font-bold mb-4 font-serif text-transparent bg-clip-text bg-gradient-to-b from-rose-100 via-rose-200 to-rose-400 drop-shadow-2xl">
            Happy Birthday<br/> 
            <span className="text-white italic font-light tracking-normal block mt-2 text-4xl md:text-6xl">{HER_NAME}</span>
          </h1>
          
          <p className="text-lg md:text-xl text-rose-200/80 mb-10 font-light italic tracking-wide max-w-lg mx-auto leading-relaxed">
            "You are the poem I never knew how to write and this life is the paper."
          </p>
          
          <motion.button
            onClick={onNext}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 bg-gradient-to-r from-rose-600 to-pink-600 rounded-full text-lg font-medium tracking-widest uppercase shadow-[0_0_30px_rgba(225,29,72,0.4)] flex items-center gap-3 mx-auto border border-white/20 hover:bg-rose-500 transition-all"
          >
            Open Our Story <ChevronRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}

// ================= BOOK =================

function BookPage({ onNext }) {
  const chapters = 6;
  const [chapter, setChapter] = useState(0);
  const [direction, setDirection] = useState(0);

  const isGallery = chapter === chapters - 1;

  const navigate = (newChapter) => {
      setDirection(newChapter > chapter ? 1 : -1);
      setChapter(newChapter);
  };

  return (
    <div className="w-full max-w-5xl px-4">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-serif text-rose-100 italic">Chapter {chapter + 1}</h2>
        <div className="h-0.5 w-16 bg-rose-500 mx-auto mt-2 rounded-full opacity-60"></div>
      </div>

      <div className="relative perspective-1000 min-h-[500px] mb-8">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={chapter}
            custom={direction}
            initial={{ rotateY: direction === 1 ? 20 : -20, opacity: 0, scale: 0.95 }}
            animate={{ rotateY: 0, opacity: 1, scale: 1 }}
            exit={{ rotateY: direction === 1 ? -20 : 20, opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col md:flex-row bg-[#fff1f2] rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden border-4 border-[#fce7f3]"
          >
            {!isGallery ? (
              <>
                {/* Left Page (Image) */}
                <div className="w-full md:w-1/2 p-6 md:p-10 flex items-center justify-center bg-[#fff1f2] border-b md:border-b-0 md:border-r border-rose-200/50 relative">
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/paper.png')] opacity-60 mix-blend-multiply" />
                  <div className="relative w-full aspect-[3/4] bg-white p-3 shadow-xl rotate-[-2deg] transition-transform hover:rotate-0 duration-500">
                    <div className="w-full h-full bg-rose-100/50 flex flex-col items-center justify-center text-rose-400 border border-rose-100 relative overflow-hidden">
                       <Heart className="w-12 h-12 mb-3 opacity-40" />
                       <span className="font-handwriting text-sm uppercase tracking-widest opacity-60">Memory #{chapter + 1}</span>
                       
                       {/* Cat Sticker on Photo */}
                       <div className="absolute bottom-2 right-2 opacity-80 text-2xl">
                         🐾
                       </div>
                    </div>
                    {/* Tape visual */}
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-rose-200/40 backdrop-blur-sm -rotate-1"></div>
                  </div>
                </div>

                {/* Right Page (Text) */}
                <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-[#fff1f2] relative">
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/paper.png')] opacity-60 mix-blend-multiply" />
                  <div className="relative z-10 text-slate-700 leading-loose font-serif text-lg md:text-xl">
                    <span className="text-4xl text-rose-400 font-serif leading-[0] float-left mr-2 mt-2">"</span>
                    <p className="mb-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    <p className="mb-6">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    <p className="text-right italic text-rose-500 font-medium text-base mt-4 border-t border-rose-200 pt-4 inline-block ml-auto w-full">
                      With all my love 
                    </p>
                  </div>
                  <div className="absolute bottom-4 right-6 text-slate-400 text-xs font-serif italic flex items-center gap-1">
                     🐱 Page {chapter + 1}
                  </div>
                </div>
              </>
            ) : (
              <PhotoGallery />
            )}
          </motion.div>
        </AnimatePresence>
        
        {/* Navigation Buttons (Floating) */}
        <div className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-12 z-20">
            <button 
                disabled={chapter === 0} 
                onClick={() => navigate(chapter - 1)} 
                className="p-4 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 disabled:opacity-0 transition-all text-white shadow-lg"
            >
                <ChevronRight className="rotate-180 w-6 h-6" />
            </button>
        </div>
        <div className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-12 z-20">
            <button 
                disabled={chapter === chapters - 1} 
                onClick={() => navigate(chapter + 1)} 
                className="p-4 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 disabled:opacity-0 transition-all text-white shadow-lg"
            >
                <ChevronRight className="w-6 h-6" />
            </button>
        </div>
      </div>

      <div className="text-center">
        <button onClick={onNext} className="px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/20 rounded-full transition-all text-sm tracking-widest uppercase">
            Proceed to Video
        </button>
      </div>
    </div>
  );
}

function PhotoGallery() {
  const photos = [
    "https://images.unsplash.com/photo-1516575334481-f85287c2c81d?q=80&w=400&fit=crop", 
    "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=400&fit=crop", 
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&fit=crop", 
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=400&fit=crop"
  ];

  return (
    <div className="w-full h-full p-8 overflow-y-auto bg-[#fff1f2] relative">
       <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/paper.png')] opacity-60 mix-blend-multiply" />
       <div className="relative z-10">
            <h3 className="text-2xl mb-8 text-center font-serif text-rose-800 italic flex items-center justify-center gap-3">
               <span className="text-3xl">🐾</span> Our Beautiful Memories <span className="text-3xl">🐾</span>
            </h3>
            <div className="grid grid-cols-2 gap-4">
            {photos.map((p, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="aspect-square p-2 bg-white shadow-md rotate-1 hover:rotate-0 transition-all duration-300"
                >
                    <img src={p} className="w-full h-full object-cover filter sepia-[0.2]" />
                </motion.div>
            ))}
            </div>
        </div>
    </div>
  );
}

// ================= VIDEO =================
function VideoPage({ onNext }) {
  return (
    <div className="text-center max-w-4xl w-full px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        <h2 className="text-4xl md:text-5xl mb-10 font-serif text-rose-100 italic">A Message From My Heart</h2>
        
        <div className="relative aspect-video bg-black/40 rounded-3xl mb-12 flex items-center justify-center border border-white/10 shadow-[0_0_60px_rgba(225,29,72,0.15)] overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-rose-900/20 to-black/60 z-0" />
            
            <motion.div 
                whileHover={{ scale: 1.1 }}
                className="relative z-10 w-24 h-24 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 shadow-lg cursor-pointer"
            >
                <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[24px] border-l-white border-b-[12px] border-b-transparent ml-2"></div>
            </motion.div>
            
            <div className="absolute bottom-6 left-0 right-0 text-center">
                <p className="text-rose-200/80 font-light tracking-wide text-sm">Tap to play our story</p>
            </div>
        </div>
        
        <button 
            onClick={onNext} 
            className="px-10 py-4 bg-gradient-to-r from-rose-600 to-pink-600 rounded-full font-bold shadow-lg shadow-rose-900/30 hover:scale-[1.02] transition-transform flex items-center gap-2 mx-auto"
        >
            Final Surprise <Sparkles className="w-5 h-5" />
        </button>
      </motion.div>
    </div>
  );
}

// ================= CONCLUSION =================
function ConclusionPage() {
  const [opened, setOpened] = useState(false);

  return (
    <div className="text-center max-w-2xl px-6">
      {!opened ? (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="cursor-pointer group"
          onClick={() => setOpened(true)}
        >
          <div className="relative">
             <div className="absolute inset-0 bg-rose-500 blur-[60px] opacity-40 rounded-full animate-pulse"></div>
             <motion.div
                whileHover={{ scale: 1.05, rotate: 3 }}
                className="relative w-56 h-56 bg-gradient-to-br from-rose-500 to-red-600 rounded-[2.5rem] mx-auto flex items-center justify-center shadow-2xl border border-white/20 z-10"
             >
                <span className="text-7xl drop-shadow-md">🎁</span>
             </motion.div>
          </div>
          <p className="mt-8 text-2xl text-rose-100 font-serif italic group-hover:text-white transition-colors">Tap to open your final gift</p>
        </motion.div>
      ) : (
        <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.8, ease: "backOut" }}
            className="bg-white/5 p-10 md:p-14 rounded-[3rem] backdrop-blur-xl border border-white/10 shadow-2xl"
        >
          <div className="mb-8 relative inline-block">
            <Heart className="w-16 h-16 text-rose-500 fill-rose-500 mx-auto animate-bounce-slow" />
            <span className="absolute -bottom-2 -right-4 text-3xl drop-shadow-md rotate-12">🐱</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 font-serif text-transparent bg-clip-text bg-gradient-to-r from-rose-100 via-white to-rose-100">
            Forever & Always
          </h2>
          <p className="text-rose-100/90 mb-10 text-lg leading-relaxed font-light">
            This digital space is just a tiny reflection of the universe you mean to me. 
            May your year be as beautiful as your smile (and as cute as a kitten).
          </p>
          <p className="text-3xl text-rose-400 font-handwriting">Happy Birthday, my love.</p>
        </motion.div>
      )}
    </div>
  );
}

// ================= EFFECTS =================

function FloatingHearts() {
  return Array.from({ length: 8 }).map((_, i) => (
    <motion.div
      key={i}
      className="absolute text-rose-500/20 blur-[1px]"
      initial={{ 
        x: Math.random() * 100 + "vw", 
        y: "110vh", 
        scale: Math.random() * 0.5 + 0.3 
      }}
      animate={{ 
        y: "-10vh", 
        rotate: 360,
        x: `calc(${Math.random() * 100}vw + ${Math.random() * 20 - 10}vw)`
      }}
      transition={{ 
        duration: 25 + Math.random() * 15, // Slower duration
        repeat: Infinity, 
        delay: Math.random() * 10, 
        ease: "linear" 
      }}
    >
      ❤️
    </motion.div>
  ));
}

function FloatingPaws() {
  return Array.from({ length: 6 }).map((_, i) => (
    <motion.div
      key={i}
      className="absolute text-rose-300/10 blur-[0.5px]"
      initial={{ 
        x: Math.random() * 100 + "vw", 
        y: "110vh", 
        rotation: 0
      }}
      animate={{ 
        y: "-10vh", 
        rotate: [0, 10, -10, 0],
        x: `calc(${Math.random() * 100}vw + ${Math.random() * 30 - 15}vw)`
      }}
      transition={{ 
        duration: 30 + Math.random() * 10, 
        repeat: Infinity, 
        delay: Math.random() * 5, 
        ease: "linear" 
      }}
    >
      <span className="text-2xl">🐾</span>
    </motion.div>
  ));
}

function RosePetals() {
  return Array.from({ length: 6 }).map((_, i) => (
    <motion.div
      key={i}
      className="absolute text-pink-300/10"
      initial={{ 
        x: Math.random() * 100 + "vw", 
        y: -20 
      }}
      animate={{ 
        y: "110vh", 
        rotate: 720, 
        x: `calc(${Math.random() * 100}vw + ${Math.random() * 50 - 25}vw)` 
      }}
      transition={{ 
        duration: 20 + Math.random() * 10, // Slower duration
        repeat: Infinity, 
        delay: Math.random() * 10, 
        ease: "linear" 
      }}
    >
      🌹
    </motion.div>
  ));
}

function BackgroundMusic() {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <>
            <audio ref={audioRef} src={MUSIC_SRC} loop />
            <button 
                onClick={togglePlay}
                className="fixed bottom-6 right-6 z-50 p-3 bg-white/5 backdrop-blur-md rounded-full border border-white/10 text-rose-200/50 hover:text-rose-100 hover:bg-white/10 transition-all"
            >
                {isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
            </button>
        </>
    );
}