/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, ChevronRight } from "lucide-react";


const HER_NAME = "SHREYA"; 
const PASSWORD = "25022005"; 

const LANDING_BG_IMAGES = [
  "/pic12.jpg",
  "/pic6.jpg",
  "/pic10.jpg",
  "/pic9.jpg",
  "/pic8.jpg",
  "/PIC.jpg",
  "/pic7.jpg",
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
    <ConclusionPage key="conclusion" />,
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-rose-900 via-red-950 to-black text-rose-50 flex flex-col font-sans selection:bg-rose-500/30">
      
      {/* Ambient Light Effects */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-rose-600/20 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-pink-600/20 rounded-full blur-[100px] animate-pulse delay-1000"></div>
      </div>

      {/* Floating Elements (Now using Static Arrays to fix Linter Errors) */}
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
           <span className="text-4xl">🐱</span>
        </div>
        <h2 className="text-3xl mb-3 font-serif italic tracking-wide">Secret Entry</h2>
        <p className="text-rose-200/80 mb-8 text-sm font-light">Hint: What else can be the password when your birth date exists!!!</p>
        
        <input
          type="password"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter password"
          className="w-full p-4 rounded-xl bg-black/20 mb-4 outline-none border border-white/5 focus:border-rose-400/50 transition-colors text-center tracking-[0.5em] text-lg placeholder:tracking-normal placeholder:text-white/20"
        />
        {error && <p className="text-rose-400 mb-4 text-sm animate-pulse font-medium">Koi na, Ek aur baar try karlo, PLEASE!!! </p>}
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
    { name: "Story", icon: null, emoji: "🐾" }, 
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

// ================= LANDING =================
function LandingPage({ onNext }) {
  const [stage, setStage] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [bgIndex, setBgIndex] = useState(0);
  const fullText = "INDEED!!! it has to be YOUUUUUUUU";

  useEffect(() => {
    if (stage === 4) {
      const interval = setInterval(() => {
        setBgIndex(prev => (prev + 1) % LANDING_BG_IMAGES.length);
      }, 6000); 
      return () => clearInterval(interval);
    }
  }, [stage]);

  useEffect(() => {
    let timer;
    if (stage === 0) timer = setTimeout(() => setStage(1), 3000);
    else if (stage === 1) timer = setTimeout(() => setStage(2), 9000);
    else if (stage === 2) timer = setTimeout(() => setStage(3), 6000);
    else if (stage === 3) {
      if (typedText.length < fullText.length) {
        timer = setTimeout(() => {
          setTypedText(fullText.slice(0, typedText.length + 1));
        }, 200); 
      } else {
        timer = setTimeout(() => setStage(4), 1500);
      }
    }
    return () => clearTimeout(timer);
  }, [stage, typedText]);

  const fadeText = {
    initial: { opacity: 0, y: 30, filter: "blur(10px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    exit: { opacity: 0, y: -30, filter: "blur(10px)" },
    transition: { duration: 1.5, ease: "easeInOut" }
  };

  if (stage < 3) {
    return (
      <div className="relative w-full h-[70vh] flex items-center justify-center text-center px-4 max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          {stage === 0 && (
            <motion.h2 key="step0" {...fadeText} className="text-3xl md:text-5xl font-serif text-rose-100 italic tracking-wider leading-relaxed">
              You know what??
            </motion.h2>
          )}
          {stage === 1 && (
            <motion.h2 key="step1" {...fadeText} className="text-3xl md:text-5xl font-serif text-rose-100 italic leading-relaxed">
              <span className="text-rose-400"><p><b>21</b> YEARS AGO ,</p></span><br/> <p> The World Was Quietly Blessed By </p><br /><p> The Arrival Of A Beautiful Soul.</p>
            </motion.h2>
          )}
          {stage === 2 && (
            <motion.h2 key="step2" {...fadeText} className="text-3xl md:text-5xl font-serif text-rose-100 italic tracking-wider">
              SOCHO SOCHO 🐱
            </motion.h2>
          )}
        </AnimatePresence>
      </div>
    );
  }

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

  return (
    <div className="relative w-full h-[75vh] rounded-[2rem] overflow-hidden shadow-2xl flex items-center justify-center border border-white/10 group">
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
      
      <div className="absolute inset-0 bg-gradient-to-t from-rose-950 via-rose-950/40 to-rose-950/80" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>

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
          CLICK HERE, PLEASE!!!!😺 <ChevronRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}

// ================= BOOK PAGE =================
function BookPage({ onNext }) {
  const storyContent = [
    {
      id: 1,
      image: "/pic11.jpg", 
      text1: "A small gift for you!!! I hope tujhe accha lage..21 years!!Bohot zyada lag raha hoga na ab?? accha Shreya tu bhi aisa sochti hogi na ki 10 years pehle, you were excited to turn 11 from 10 aur ab tujhe 21 bada number lag raha hai!!! maybe shyd zindagi mein bohot kuch dekh lete hai jisse ye moments hum celebrate nahi karna chahte ya celebrate karna chahte par with a mind full of various other thoughts...",
      text2: "But the fact is..from 2005 onwards, 25th February is a special date!! special bolu ya gracious ya honored ya beautiful ya koi aur adjective sab kam hi hai na...Since the year 2005, 25th of February has carried your name in time. SHREYA, a name which itself means auspicious, beautiful, excellent, prosperous...so along with saying Happy Birthday SHREYA, I will also say, HAPPY SHREYA-DAY!!!",
      highlight: "🌹🌹🌹🌹🌹"
    },
    {
      id: 2,
      image: "/pic2.jpg", 
      text1: "Shreya, I barely know about your life..kya chal raha hai kya nahi mujhe nahi pata..par itna zarur pata ki bohot si baatein hongi jo tu shyd kisi se kehti nahi...Wo baatein jo shyd tujhe andar hi andar hurt hongi...and then fir bhi tu apni zimmedariyaan nibhati hai, aur aage badhti rehti hai jaise sab theek ho.. bina kisi ko dikhaye... Yahi toh baatein hai which makes you special!!! Shreya teri Niyat hamesha se saaf rahi hai na...and that thing makes you Beautiful...You are not rare, You are Unique!!!! If the intention behind every step in your life is positive then the end result will be positive!!! You are God's favorite child....You are gentle, but not weak and that balance is rare....You will lead to a life where you will be the reason why people will feel blessed to have you in their lives!!!",
      text2: " Being the Elder Daughter, only YOU know how much it takes be YOU.. and being a girl it is difficult to handle all the stereotypes of this society..",
      highlight: "🌹🌹🌹🌹🌹"
    },
    {
      id: 3,
      image: "/pic3.jpg", 
      text1: "Apne sapne pura karna Shreya!!! not just because tujhe karna hai but apni mummy ke liye papa ke liye...Mummy logo ki zindagi bohot KATHOR rahi hai...aur mujhe pata hai tu har wo chiz karna chahti hai, har wo chiz dena chahti hai to your mummy jinki wo haqdaar hai!!! and also for your papa...aksar hum sab lambe lambe speeches mein unka zikar karna bhul jaate hai...Yes Shreya, you will buy your own Car, your own House, and everything which you want to and wo sab khud se, apne dam par....and I truly with all pure intentions wish that these things do come true for you!!!! May you gift your parents a House at the '25th' floor of a Sky Scraper Building...",
      text2: "You will be the bliss your parents always prayed for, the quiet reward for every sacrifice they made, every dream they set aside. In your happiness, they will find peace. Not only through your achievements, but through the grace with which you live and the goodness you carry, you will remain their greatest blessing!!!",
      highlight: "🌹🌹🌹🌹🌹"
    }
  ];

  const collageImages = ["/pic3.jpg", "/pic6.jpg", "/pic15.jpg", "/pic4.jpg", "/pic12.jpg", "/pic14.jpg"];
  const chapters = 4;
  const [chapter, setChapter] = useState(0);
  const [direction, setDirection] = useState(0);

  const navigate = (newChapter) => {
    setDirection(newChapter > chapter ? 1 : -1);
    setChapter(newChapter);
  };

  const isCollage = chapter === 3;
  const currentStory = storyContent[chapter];

  return (
    <div className="w-full max-w-5xl px-4">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-serif text-rose-100 italic">
          {isCollage ? "A Gallery of You" : `Chapter ${chapter + 1}`}
        </h2>
        <div className="h-0.5 w-16 bg-rose-500 mx-auto mt-2 rounded-full opacity-60"></div>
      </div>

      <div className="relative perspective-1000 min-h-[600px] mb-8">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={chapter}
            custom={direction}
            initial={{ rotateY: direction === 1 ? 20 : -20, opacity: 0, scale: 0.95 }}
            animate={{ rotateY: 0, opacity: 1, scale: 1 }}
            exit={{ rotateY: direction === 1 ? -20 : 20, opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`rounded-3xl shadow-2xl overflow-hidden border-4 border-white/50 ${
                isCollage ? "" : "bg-[#fff1f2] border-[#fce7f3]"
            }`}
          >
            {isCollage ? (
               <div className="relative w-full h-full min-h-[600px] overflow-hidden flex flex-col items-center justify-center p-8">
                 <div className="absolute inset-0 bg-gradient-to-br from-pink-200 via-rose-100 to-orange-100" />
                 <div className="absolute top-[-20%] left-[-20%] w-96 h-96 bg-purple-300/30 rounded-full blur-[80px] animate-pulse"></div>
                 <div className="absolute bottom-[-20%] right-[-20%] w-96 h-96 bg-yellow-200/40 rounded-full blur-[80px] animate-pulse delay-1000"></div>

                 <div className="relative z-10 w-full max-w-4xl">
                     <motion.div 
                       initial={{ y: -20, opacity: 0 }}
                       animate={{ y: 0, opacity: 1 }}
                       className="text-center mb-8"
                     >
                       <div className="inline-block bg-white/40 backdrop-blur-sm px-6 py-2 rounded-full border border-white/50 shadow-sm mb-4">
                           <span className="text-rose-500 font-bold tracking-widest text-xs uppercase">The Birthday Girl</span>
                       </div>
                       <h2 className="text-4xl md:text-6xl font-serif text-rose-600 drop-shadow-sm">
                         Happiest Wala Happy Birthday Shreya!! <span className="text-4xl">✨💚</span>
                       </h2>
                     </motion.div>

                     <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                        {collageImages.map((img, index) => (
                          <motion.div 
                            key={index}
                            initial={{ opacity: 0, scale: 0.8, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ delay: index * 0.1, type: "spring" }}
                            whileHover={{ y: -5, scale: 1.02 }}
                            className="group relative aspect-[4/5] bg-white p-2 rounded-xl shadow-lg rotate-0 hover:rotate-1 transition-all duration-300"
                          >
                             <div className="w-full h-full overflow-hidden rounded-lg relative">
                               <img src={img} className="w-full h-full object-cover" alt="Memory" />
                               <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                             </div>
                          </motion.div>
                        ))}
                     </div>

                     <motion.div 
                       initial={{ opacity: 0, y: 20 }}
                       animate={{ opacity: 1, y: 0 }}
                       transition={{ delay: 0.8 }}
                       className="mt-10 text-center"
                     >
                        <div className="bg-white/60 backdrop-blur-md border border-white/60 p-6 rounded-2xl shadow-sm inline-block max-w-lg mx-auto">
                             <p className="text-rose-800 font-handwriting text-xl md:text-2xl leading-relaxed">
                               "Tumhe Toh Har Khushi Ka Haq Hai...<br/>
                               Ek Baar Haq Jata Ke Toh Dekho,<br/>
                               Fir Tum Khushi Ko Nahi,<br/>
                               <span className="text-rose-600 font-bold">Khushi Khud Tumhe Chunegi!! ❤️"</span>
                             </p>
                        </div>
                     </motion.div>
                 </div>
               </div>
            ) : (
              <div className="flex flex-col md:flex-row min-h-[600px]">
                <div className="w-full md:w-1/2 p-6 md:p-10 flex items-center justify-center bg-[#fff1f2] border-b md:border-b-0 md:border-r border-rose-200/50 relative">
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/paper.png')] opacity-60 mix-blend-multiply" />
                  <div className="relative w-full aspect-[3/4] bg-white p-3 shadow-xl rotate-[-2deg] transition-transform hover:rotate-0 duration-500">
                    <div className="w-full h-full bg-rose-100/50 flex flex-col items-center justify-center text-rose-400 border border-rose-100 relative overflow-hidden">
                      <img 
                        src={currentStory.image} 
                        alt="Memory" 
                        className="w-full h-full object-cover opacity-90 hover:scale-110 transition-transform duration-700" 
                      />
                      <div className="absolute bottom-2 right-2 opacity-80 text-2xl bg-white/50 rounded-full p-1">🐾</div>
                    </div>
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-rose-200/40 backdrop-blur-sm -rotate-1"></div>
                  </div>
                </div>

                <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-[#fff1f2] relative">
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/paper.png')] opacity-60 mix-blend-multiply" />
                  <div className="relative z-10 text-slate-700 leading-loose font-serif text-lg md:text-xl">
                    <span className="text-4xl text-rose-400 font-serif leading-[0] float-left mr-2 mt-2">"</span>
                    <p className="mb-6">{currentStory.text1}</p>
                    <p className="mb-6">{currentStory.text2}</p>
                    <p className="text-right italic text-rose-500 font-medium text-base mt-4 border-t border-rose-200 pt-4 inline-block ml-auto w-full">
                      {currentStory.highlight}
                    </p>
                  </div>
                  <div className="absolute bottom-4 right-6 text-slate-400 text-xs font-serif italic flex items-center gap-1">
                      🐱 Page {chapter + 1} of {chapters}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
        
        <div className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-12 z-20">
            <button 
                disabled={chapter === 0} 
                onClick={() => navigate(chapter - 1)} 
                className="p-4 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 disabled:opacity-0 transition-all text-white shadow-lg group"
            >
                <ChevronRight className="rotate-180 w-6 h-6 group-hover:scale-125 transition-transform" />
            </button>
        </div>
        <div className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-12 z-20">
            <button 
                disabled={chapter === chapters - 1} 
                onClick={() => navigate(chapter + 1)} 
                className="p-4 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 disabled:opacity-0 transition-all text-white shadow-lg group"
            >
                <ChevronRight className="w-6 h-6 group-hover:scale-125 transition-transform" />
            </button>
        </div>
      </div>

      <div className="text-center">
        <button onClick={onNext} className="px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/20 rounded-full transition-all text-sm tracking-widest uppercase">
            Bas ek Last Click, PLEASE!!!
        </button>
      </div>
    </div>
  );
}

// ================= CONCLUSION =================
function ConclusionPage() {
  const [step, setStep] = useState("box"); 

  return (
    <div className="text-center max-w-2xl px-6 w-full relative z-20">
      <AnimatePresence mode="wait">
        
        {/* STEP 1: THE GIFT BOX */}
        {step === "box" && (
          <motion.div
            key="box"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.2, opacity: 0, filter: "blur(10px)" }}
            transition={{ type: "spring", stiffness: 100 }}
            className="cursor-pointer group relative"
            onClick={() => setStep("cake")}
          >
            <div className="absolute inset-0 bg-rose-500 blur-[80px] opacity-30 rounded-full animate-pulse"></div>
            
            <motion.div
              whileHover={{ scale: 1.05, rotate: 3 }}
              whileTap={{ scale: 0.95 }}
              className="relative w-56 h-56 bg-gradient-to-br from-rose-600 to-red-700 rounded-[2rem] mx-auto flex items-center justify-center shadow-[0_20px_50px_rgba(225,29,72,0.5)] border border-white/20 z-10"
            >
               <span className="text-8xl drop-shadow-2xl">🎁</span>
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-8 text-2xl text-rose-100 font-serif italic tracking-wide group-hover:text-white transition-colors"
            >
              CLICK CLICK....<br/>
              <span className="text-sm opacity-60 font-sans not-italic uppercase tracking-widest">(Tap to open)</span>
            </motion.p>
          </motion.div>
        )}

        {/* STEP 2: THE REALISTIC CAKE */}
        {step === "cake" && (
          <motion.div
            key="cake"
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative pb-10"
          >
            <h2 className="text-3xl font-serif text-rose-100 italic mb-8">
              Make a wish & blow the candle...<br/>
              <span className="text-lg font-sans opacity-70 not-italic">Tap the flame! 🕯️</span>
            </h2>

            {/* CAKE CONTAINER */}
            <div className="relative w-64 h-64 mx-auto mt-20 flex flex-col items-center justify-end">
              
              {/* Plate */}
              <div className="absolute bottom-0 w-80 h-24 bg-white/10 rounded-[50%] blur-sm -z-10 shadow-2xl"></div>
              <div className="absolute bottom-2 w-72 h-16 bg-gradient-to-b from-gray-100 to-gray-300 rounded-[50%] z-0 border-b-4 border-gray-400"></div>

              {/* Bottom Tier */}
              <div className="absolute bottom-8 w-64 h-24 bg-gradient-to-r from-rose-300 via-rose-200 to-rose-300 rounded-xl shadow-2xl border-b-8 border-rose-400/50 z-10 relative">
                 {/* Icing Drips */}
                 <div className="absolute top-0 w-full h-8 bg-white rounded-b-xl shadow-sm z-20 flex justify-around overflow-hidden">
                     {[...Array(7)].map((_,i) => (
                        <div key={i} className="w-8 h-10 bg-white rounded-b-full -mt-4 shadow-sm"></div>
                     ))}
                 </div>
              </div>

              {/* Top Tier */}
              <div className="absolute bottom-[8rem] w-44 h-20 bg-gradient-to-r from-rose-300 via-rose-200 to-rose-300 rounded-xl shadow-xl border-b-4 border-rose-400/50 z-20 relative">
                 {/* Icing Drips */}
                 <div className="absolute top-0 w-full h-8 bg-white rounded-b-xl shadow-sm z-30 flex justify-around overflow-hidden">
                    {[...Array(5)].map((_,i) => (
                        <div key={i} className="w-8 h-8 bg-white rounded-b-full -mt-4 shadow-sm"></div>
                     ))}
                 </div>
                 
                 {/* Cherries */}
                 <div className="absolute -top-3 left-2 w-6 h-6 bg-red-600 rounded-full shadow-inner z-40"></div>
                 <div className="absolute -top-3 right-2 w-6 h-6 bg-red-600 rounded-full shadow-inner z-40"></div>
                 <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-6 h-6 bg-red-600 rounded-full shadow-inner z-40"></div>
              </div>

              {/* Candle */}
              <div className="absolute bottom-[13rem] left-1/2 -translate-x-1/2 w-4 h-20 bg-gradient-to-b from-yellow-100 to-yellow-200 border border-yellow-300/50 rounded-md z-30 shadow-lg">
                  <div className="absolute w-full h-2 bg-red-400 top-4 opacity-50 rotate-12"></div>
                  <div className="absolute w-full h-2 bg-red-400 top-10 opacity-50 -rotate-12"></div>
              </div>

              {/* FLAME (INTERACTIVE) */}
              <motion.div
                 className="absolute bottom-[18rem] left-1/2 -translate-x-1/2 cursor-pointer z-50 origin-bottom"
                 onClick={() => setStep("card")}
                 animate={{ 
                   scale: [1, 1.1, 1], 
                   rotate: [-3, 3, -3],
                   filter: ["brightness(1)", "brightness(1.3)", "brightness(1)"]
                 }}
                 transition={{ repeat: Infinity, duration: 0.2 }}
                 whileHover={{ scale: 1.3 }}
              >
                 {/* Outer Glow */}
                 <div className="w-10 h-14 bg-orange-400/50 rounded-full blur-xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
                 {/* Inner Flame */}
                 <div className="w-4 h-8 bg-gradient-to-t from-red-500 via-orange-400 to-yellow-200 rounded-[50%_50%_50%_50%_/_60%_60%_40%_40%] shadow-[0_0_20px_rgba(255,165,0,0.8)] border-2 border-yellow-200"></div>
              </motion.div>

            </div>
          </motion.div>
        )}

        {}
        {step === "card" && (
           <motion.div 
             key="card"
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 1, delay: 0.5 }}
             className="bg-white/10 p-10 md:p-14 rounded-[3rem] backdrop-blur-2xl border border-white/20 shadow-[0_0_60px_rgba(225,29,72,0.3)] relative overflow-hidden"
           >
             {}
             <motion.div 
                initial={{ opacity: 1, y: 100, scale: 0.5 }}
                animate={{ opacity: 0, y: -100, scale: 2 }}
                transition={{ duration: 2 }}
                className="absolute inset-0 bg-gray-400/20 blur-3xl pointer-events-none"
             />

             <Confetti />

             <div className="mb-8 relative inline-block">
               <Heart className="w-16 h-16 text-rose-500 fill-rose-500 mx-auto animate-bounce" />
               <span className="absolute -bottom-2 -right-4 text-3xl rotate-12">🥳</span>
             </div>
             
             <h2 className="text-4xl md:text-6xl font-bold mb-6 font-serif text-transparent bg-clip-text bg-gradient-to-r from-rose-100 via-white to-rose-100 drop-shadow-md">
               Wish Granted. ✨
             </h2>
             
             <p className="text-rose-100/90 mb-8 text-lg leading-relaxed font-light italic">
             "May the wish you just made find its way to the universe and return to you wrapped in magic.
This little corner of the internet, these words on the screen, are only a gentle reminder that, Shreya,
you are cherished, admired, and deeply celebrated… today, tomorrow, and in every moment that follows. ✨"
             </p>

             <p className="text-3xl text-rose-400 font-handwriting">
               Happy Birthday, {HER_NAME} ❤️
             </p>
           </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}



function Confetti() {
  const particles = [
    { x: "10%", y: "20%", color: "bg-red-500", delay: 0.1 },
    { x: "85%", y: "15%", color: "bg-blue-400", delay: 0.2 },
    { x: "40%", y: "80%", color: "bg-yellow-400", delay: 0.3 },
    { x: "90%", y: "60%", color: "bg-purple-500", delay: 0.1 },
    { x: "20%", y: "75%", color: "bg-green-400", delay: 0.4 },
    { x: "55%", y: "10%", color: "bg-red-400", delay: 0.2 },
    { x: "70%", y: "90%", color: "bg-pink-400", delay: 0.5 },
    { x: "15%", y: "45%", color: "bg-blue-500", delay: 0.3 },
    { x: "30%", y: "30%", color: "bg-yellow-200", delay: 0.1 },
    { x: "80%", y: "40%", color: "bg-purple-300", delay: 0.4 }
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className={`absolute w-2 h-2 rounded-full ${p.color}`}
          initial={{ x: "50%", y: "50%", opacity: 1, scale: 0 }}
          animate={{ x: p.x, y: p.y, opacity: 0, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut", delay: p.delay }}
        />
      ))}
    </div>
  );
}

function FloatingHearts() {
 
  const hearts = [
    { x: "10vw", delay: 0, duration: 25 },
    { x: "80vw", delay: 5, duration: 30 },
    { x: "30vw", delay: 2, duration: 22 },
    { x: "60vw", delay: 8, duration: 28 },
    { x: "90vw", delay: 12, duration: 26 },
    { x: "20vw", delay: 15, duration: 24 },
    { x: "50vw", delay: 20, duration: 29 },
  ];

  return (
    <>
      {hearts.map((h, i) => (
        <motion.div
          key={i}
          className="absolute text-rose-500/20 blur-[1px]"
          initial={{ x: h.x, y: "110vh", scale: 0.5 }}
          animate={{ y: "-10vh", rotate: 360 }}
          transition={{ 
            duration: h.duration, 
            repeat: Infinity, 
            delay: h.delay, 
            ease: "linear" 
          }}
        >
          ❤️
        </motion.div>
      ))}
    </>
  );
}

function FloatingPaws() {
  const paws = [
    { x: "5vw", delay: 1 },
    { x: "85vw", delay: 7 },
    { x: "45vw", delay: 12 },
    { x: "75vw", delay: 18 },
    { x: "15vw", delay: 22 },
  ];

  return (
    <>
      {paws.map((p, i) => (
        <motion.div
          key={i}
          className="absolute text-rose-300/10 blur-[0.5px]"
          initial={{ x: p.x, y: "110vh" }}
          animate={{ 
            y: "-10vh", 
            rotate: [0, 10, -10, 0],
            x: [p.x, `calc(${p.x} + 10vw)`, `calc(${p.x} - 10vw)`]
          }}
          transition={{ 
            duration: 35, 
            repeat: Infinity, 
            delay: p.delay, 
            ease: "linear" 
          }}
        >
          <span className="text-2xl">🐾</span>
        </motion.div>
      ))}
    </>
  );
}

function RosePetals() {
  const petals = [
    { x: "2vw", delay: 0 },
    { x: "25vw", delay: 4 },
    { x: "55vw", delay: 9 },
    { x: "70vw", delay: 14 },
    { x: "95vw", delay: 19 },
    { x: "35vw", delay: 24 },
  ];

  return (
    <>
      {petals.map((p, i) => (
        <motion.div
          key={i}
          className="absolute text-pink-300/10"
          initial={{ x: p.x, y: -20 }}
          animate={{ 
            y: "110vh", 
            rotate: 720, 
            x: [p.x, `calc(${p.x} + 20vw)`, `calc(${p.x} - 20vw)`]
          }}
          transition={{ 
            duration: 25, 
            repeat: Infinity, 
            delay: p.delay, 
            ease: "linear" 
          }}
        >
          🌹
        </motion.div>
      ))}
    </>
  );
}