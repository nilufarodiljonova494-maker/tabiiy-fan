
import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Beaker, 
  Microscope, 
  Atom, 
  Globe, 
  Orbit, 
  Search, 
  BookOpen, 
  BrainCircuit,
  MessageSquare,
  Menu,
  X,
  ChevronRight,
  Send,
  Loader2,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Play,
  Trees,
  CloudRain,
  Sun,
  HeartPulse,
  Music,
  Tent,
  Smartphone,
  ClipboardCheck,
  Gamepad2,
  Sparkles,
  Trophy,
  Printer,
  Download,
  Users
} from 'lucide-react';
import { Subject, ScienceTopic, ChatMessage } from './types';
import { askScienceTutor } from './services/geminiService';

// Reusable Components
const FloatingNatureElements = () => {
  // Elements configuration for Biology (green leaf), Physics (yellow star), Geography (blue drop), Chemistry/Botany (pink petal)
  const items = [
    { id: 1, type: 'leaf', left: '5%', size: 42, delay: 0, duration: 16, drift: 50, rotate: 60, color: 'text-emerald-500/25' },
    { id: 2, type: 'petal', left: '15%', size: 16, delay: 3, duration: 20, drift: -40, rotate: -30, color: 'text-pink-400/15' },
    { id: 3, type: 'sparkle', left: '28%', size: 14, delay: 6, duration: 15, drift: 60, rotate: 140, color: 'text-amber-400/20' },
    { id: 4, type: 'drop', left: '42%', size: 18, delay: 1, duration: 18, drift: -50, rotate: 90, color: 'text-blue-400/20' },
    { id: 5, type: 'leaf', left: '55%', size: 46, delay: 8, duration: 22, drift: 40, rotate: 20, color: 'text-emerald-500/25' },
    { id: 6, type: 'petal', left: '68%', size: 18, delay: 4, duration: 19, drift: -45, rotate: -70, color: 'text-pink-400/15' },
    { id: 7, type: 'sparkle', left: '78%', size: 16, delay: 2, duration: 16, drift: 30, rotate: 105, color: 'text-amber-400/20' },
    { id: 8, type: 'drop', left: '92%', size: 20, delay: 7, duration: 21, drift: -60, rotate: 160, color: 'text-sky-400/20' },
    { id: 9, type: 'leaf', left: '12%', size: 36, delay: 11, duration: 17, drift: 50, rotate: 40, color: 'text-emerald-500/25' },
    { id: 10, type: 'petal', left: '35%', size: 20, delay: 5, duration: 19, drift: -30, rotate: -50, color: 'text-pink-400/15' },
    { id: 11, type: 'sparkle', left: '62%', size: 18, delay: 9, duration: 16, drift: 40, rotate: 120, color: 'text-amber-400/20' },
    { id: 12, type: 'drop', left: '88%', size: 22, delay: 12, duration: 23, drift: -50, rotate: 85, color: 'text-blue-400/20' },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-40">
      {items.map((item) => (
        <motion.div
          key={item.id}
          initial={{ y: -60, x: 0, opacity: 0, rotate: 0 }}
          animate={{
            y: '105vh',
            x: item.drift,
            opacity: [0, 0.4, 0.6, 0.6, 0.4, 0],
            rotate: item.rotate * 5,
          }}
          transition={{
            duration: item.duration,
            repeat: Infinity,
            delay: item.delay,
            ease: 'linear',
          }}
          style={{
            position: 'absolute',
            left: item.left,
            width: item.size,
            height: item.size,
          }}
        >
          {item.type === 'leaf' && (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={`w-full h-full drop-shadow-[0_2px_4px_rgba(16,185,129,0.1)] ${item.color}`}>
              <path d="M2 22C2 22 6 20 10 16C14 12 22 2 22 2C22 2 12 2 8 6C4 10 2 22 2 22Z" fill="currentColor" />
              <path d="M2 22C6 18 12 12 22 2" stroke="rgba(16,185,129,0.3)" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          )}
          {item.type === 'petal' && (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={`w-full h-full drop-shadow-[0_2px_4px_rgba(244,63,94,0.1)] ${item.color}`}>
              <path d="M12 22C12 22 4 16 4 10.5C4 6.5 7 3.5 10.5 3.5C14 3.5 17 6.0 17 10.5C17 15.5 12 22 12 22Z" fill="currentColor" />
            </svg>
          )}
          {item.type === 'sparkle' && (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={`w-full h-full drop-shadow-[0_2px_4px_rgba(245,158,11,0.15)] ${item.color}`}>
              <path d="M12 2L14.8 9.2L22 12L14.8 14.8L12 22L9.2 14.8L2 12L9.2 9.2L12 2Z" fill="currentColor" />
            </svg>
          )}
          {item.type === 'drop' && (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={`w-full h-full drop-shadow-[0_2px_4px_rgba(14,165,233,0.15)] ${item.color}`}>
              <path d="M12 2.5C12 2.5 19 9.5 19 14.5C19 18.5 15.5 21.5 12 21.5C8.5 21.5 5 18.5 5 14.5C5 9.5 12 2.5 12 2.5Z" fill="currentColor" />
            </svg>
          )}
        </motion.div>
      ))}
    </div>
  );
};

const BackgroundGlows = () => {
  const starsArray = [
    { top: '3%', left: '8%', size: 'w-2 h-2 md:w-3 md:h-3', delay: '0s', duration: '2.5s', color: 'bg-amber-300 shadow-[0_0_12px_rgba(251,191,36,0.9)]' },
    { top: '6%', left: '88%', size: 'w-3.5 h-3.5 md:w-4.5 md:h-4.5', delay: '1.2s', duration: '3.5s', color: 'bg-yellow-250 shadow-[0_0_15px_rgba(253,224,71,0.95)]' },
    { top: '10%', left: '22%', size: 'w-2 h-2', delay: '0.5s', duration: '2s', color: 'bg-white shadow-[0_0_10px_rgba(255,255,255,0.9)]' },
    { top: '14%', left: '68%', size: 'w-2.5 h-2.5', delay: '2s', duration: '4s', color: 'bg-amber-250 shadow-[0_0_12px_rgba(251,191,36,0.8)]' },
    { top: '19%', left: '38%', size: 'w-2 h-2 md:w-3 md:h-3', delay: '0.8s', duration: '3s', color: 'bg-yellow-200 shadow-[0_0_12px_rgba(254,240,138,0.9)]' },
    { top: '24%', left: '12%', size: 'w-2.5 h-2.5', delay: '1.5s', duration: '2.8s', color: 'bg-white shadow-[0_0_10px_rgba(255,255,255,0.9)]' },
    { top: '29%', left: '92%', size: 'w-2 h-2 md:w-4 md:h-4', delay: '0.3s', duration: '3.2s', color: 'bg-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.9)]' },
    { top: '34%', left: '52%', size: 'w-2.5 h-2.5', delay: '2.4s', duration: '4.5s', color: 'bg-yellow-250 shadow-[0_0_12px_rgba(253,224,71,0.8)]' },
    { top: '39%', left: '6%', size: 'w-2 h-2', delay: '1.1s', duration: '2.2s', color: 'bg-white shadow-[0_0_10px_rgba(255,255,255,0.9)]' },
    { top: '44%', left: '78%', size: 'w-2.5 h-2.5 md:w-3 md:h-3', delay: '0.6s', duration: '3.7s', color: 'bg-amber-250 shadow-[0_0_12px_rgba(251,191,36,0.8)]' },
    { top: '49%', left: '20%', size: 'w-3 h-3 md:w-4 md:h-4', delay: '1.9s', duration: '2.9s', color: 'bg-yellow-200 shadow-[0_0_15px_rgba(254,240,138,0.95)]' },
    { top: '54%', left: '63%', size: 'w-2 h-2', delay: '0.2s', duration: '4.2s', color: 'bg-white shadow-[0_0_10px_rgba(255,255,255,0.9)]' },
    { top: '59%', left: '10%', size: 'w-3 h-3 md:w-4 md:h-4', delay: '2.5s', duration: '3.4s', color: 'bg-amber-300 shadow-[0_0_15px_rgba(251,191,36,0.9)]' },
    { top: '64%', left: '86%', size: 'w-2 h-2', delay: '1.4s', duration: '2.6s', color: 'bg-yellow-250 shadow-[0_0_12px_rgba(253,224,71,0.8)]' },
    { top: '69%', left: '28%', size: 'w-2.5 h-2.5', delay: '0.7s', duration: '4.8s', color: 'bg-white shadow-[0_0_10px_rgba(255,255,255,0.9)]' },
    { top: '74%', left: '72%', size: 'w-3.5 h-3.5 md:w-4.5 md:h-4.5', delay: '2.1s', duration: '3.1s', color: 'bg-amber-300 shadow-[0_0_18px_rgba(251,191,36,0.95)]' },
    { top: '79%', left: '16%', size: 'w-2 h-2 md:w-3 md:h-3', delay: '1.3s', duration: '3s', color: 'bg-yellow-100 shadow-[0_0_12px_rgba(254,240,138,0.9)]' },
    { top: '84%', left: '80%', size: 'w-2.5 h-2.5', delay: '0.9s', duration: '2.7s', color: 'bg-white shadow-[0_0_10px_rgba(255,255,255,0.9)]' },
    { top: '88%', left: '46%', size: 'w-2 h-2', delay: '2.3s', duration: '3.6s', color: 'bg-white shadow-[0_0_10px_rgba(255,255,255,0.9)]' },
    { top: '91%', left: '93%', size: 'w-2.5 h-2.5', delay: '1.7s', duration: '2.9s', color: 'bg-amber-250 shadow-[0_0_12px_rgba(251,191,36,0.8)]' },
    { top: '94%', left: '60%', size: 'w-2 h-2', delay: '0.4s', duration: '4.1s', color: 'bg-yellow-350 shadow-[0_0_12px_rgba(253,224,71,0.8)]' },
    { top: '97%', left: '4%', size: 'w-3 h-3 md:w-4 md:h-4', delay: '1.8s', duration: '3.3s', color: 'bg-amber-300 shadow-[0_0_15px_rgba(251,191,36,0.9)]' },
    { top: '8%', left: '30%', size: 'w-2 h-2', delay: '0.5s', duration: '2.7s', color: 'bg-white shadow-[0_0_10px_rgba(255,255,255,0.9)]' },
    { top: '15%', left: '94%', size: 'w-2.5 h-2.5', delay: '2.2s', duration: '3.9s', color: 'bg-yellow-250 shadow-[0_0_12px_rgba(253,224,71,0.8)]' },
    { top: '27%', left: '44%', size: 'w-2 h-2 md:w-3 md:h-3', delay: '1.1s', duration: '4.3s', color: 'bg-amber-350 shadow-[0_0_12px_rgba(245,158,11,0.8)]' },
    { top: '42%', left: '96%', size: 'w-2 h-2', delay: '0s', duration: '2.5s', color: 'bg-white shadow-[0_0_10px_rgba(255,255,255,0.9)]' },
    { top: '61%', left: '50%', size: 'w-3 h-3 md:w-4 md:h-4', delay: '1.6s', duration: '3.1s', color: 'bg-amber-300 shadow-[0_0_15px_rgba(251,191,36,0.9)]' },
    { top: '76%', left: '2%', size: 'w-2 h-2', delay: '2.4s', duration: '3.7s', color: 'bg-yellow-200 shadow-[0_0_12px_rgba(254,240,138,0.8)]' },
    { top: '86%', left: '52%', size: 'w-2.5 h-2.5', delay: '0.8s', duration: '2.6s', color: 'bg-white shadow-[0_0_10px_rgba(255,255,255,0.9)]' }
  ];

  return (
    <div className="absolute inset-x-0 top-0 h-full w-full pointer-events-none overflow-hidden -z-20">
      {/* Decorative gradient color glows */}
      <div className="absolute top-[5%] left-[2%] w-[500px] h-[500px] rounded-full bg-emerald-300/35 blur-[130px] animate-pulse" style={{ animationDuration: '9s' }} />
      <div className="absolute top-[22%] right-[4%] w-[600px] h-[600px] rounded-full bg-blue-300/30 blur-[140px] animate-pulse" style={{ animationDuration: '11s' }} />
      <div className="absolute top-[45%] left-[6%] w-[550px] h-[550px] rounded-full bg-amber-300/30 blur-[120px] animate-pulse" style={{ animationDuration: '7s' }} />
      <div className="absolute top-[68%] right-[3%] w-[580px] h-[580px] rounded-full bg-pink-300/30 blur-[130px] animate-pulse" style={{ animationDuration: '13s' }} />
      <div className="absolute top-[85%] left-[12%] w-[500px] h-[500px] rounded-full bg-purple-300/30 blur-[110px] animate-pulse" style={{ animationDuration: '8s' }} />

      {/* Sparkling Twinkling Star Field */}
      {starsArray.map((star, index) => (
        <div
          key={index}
          className={`absolute rounded-full animate-pulse z-10 ${star.color} ${star.size.split(' ')[0] || 'w-1.5'} ${star.size.split(' ')[1] || 'h-1.5'}`}
          style={{
            top: star.top,
            left: star.left,
            animationDelay: star.delay,
            animationDuration: star.duration,
          }}
        />
      ))}
    </div>
  );
};

const VisitorCounter = () => {
  const [count, setCount] = useState(0);
  const [online, setOnline] = useState(0);

  useEffect(() => {
    const savedCount = localStorage.getItem('site_visits') || '0';
    const newCount = parseInt(savedCount) + 1;
    localStorage.setItem('site_visits', newCount.toString());
    setCount(newCount);
    setOnline(Math.floor(Math.random() * 15) + 5);
  }, []);

  return (
    <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700/50">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-8 h-8 bg-emerald-500/20 text-emerald-500 rounded-lg flex items-center justify-center">
          <Users size={16} />
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wider font-bold text-slate-500">Tashriflar soni</p>
          <p className="text-lg font-mono font-bold text-white leading-none">
            {(1240 + count).toLocaleString()}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
        <span className="text-[10px] text-slate-400">Hozir saytda: {online} kishi</span>
      </div>
    </div>
  );
};

const GameModal = ({ url, onClose }: { url: string | null, onClose: () => void }) => {
  if (!url) return null;
  
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="relative w-full max-w-5xl aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all"
        >
          <X size={24} />
        </button>
        <iframe 
          src={url} 
          className="w-full h-full border-none"
          title="Interaktiv o'yin"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

const Navbar = ({ activeTab, setActiveTab, onBackToHome }: { activeTab: string, setActiveTab: (t: string) => void, onBackToHome: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-emerald-50/90 via-sky-50/90 to-purple-50/90 backdrop-blur-md border-b border-emerald-100/80 shadow-md shadow-emerald-500/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <button onClick={onBackToHome} className="flex-shrink-0 flex items-center gap-2 outline-none">
              <div className="bg-emerald-600 p-2 rounded-lg text-white">
                <BrainCircuit size={24} />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent flex items-center gap-1.5">
                Tabiiy Fanlar <span className="text-base" style={{ display: 'inline-block', transform: 'rotate(-15deg)' }}>🍃</span>
              </span>
            </button>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => setActiveTab('home')} className={`${activeTab === 'home' ? 'text-emerald-600 font-semibold' : 'text-slate-600'} hover:text-emerald-500 transition-colors`}>Asosiy</button>
            <button onClick={() => setActiveTab('darslik')} className={`${activeTab === 'darslik' ? 'text-emerald-600 font-semibold' : 'text-slate-600'} hover:text-emerald-500 transition-colors`}>Darslik</button>
            <button onClick={() => setActiveTab('topics')} className={`${activeTab === 'topics' ? 'text-emerald-600 font-semibold' : 'text-slate-600'} hover:text-emerald-500 transition-colors`}>Mavzular</button>
            <button onClick={() => setActiveTab('tutor')} className={`${activeTab === 'tutor' ? 'text-emerald-600 font-semibold' : 'text-slate-600'} hover:text-emerald-500 transition-colors`}>AI Ustoz</button>
          </div>
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-600">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 py-4 px-4 space-y-2">
          <button onClick={() => {setActiveTab('home'); setIsOpen(false)}} className="block w-full text-left py-2 px-4 hover:bg-slate-50 rounded-lg">Asosiy</button>
          <button onClick={() => {setActiveTab('darslik'); setIsOpen(false)}} className="block w-full text-left py-2 px-4 hover:bg-slate-50 rounded-lg">Darslik</button>
          <button onClick={() => {setActiveTab('topics'); setIsOpen(false)}} className="block w-full text-left py-2 px-4 hover:bg-slate-50 rounded-lg">Mavzular</button>
          <button onClick={() => {setActiveTab('tutor'); setIsOpen(false)}} className="block w-full text-left py-2 px-4 hover:bg-slate-50 rounded-lg">AI Ustoz</button>
        </div>
      )}
    </nav>
  );
};

const ScienceFactHub = () => {
  const [selectedCat, setSelectedCat] = useState<'all' | 'bio' | 'geo' | 'phys'>('all');
  const [aiFact, setAiFact] = useState<string | null>(null);
  const [loadingAi, setLoadingAi] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);

  const loadingTexts = [
    "Kallani ishlatyapman... 🧠",
    "Koinot energiyasini yig'yapman... ⚡",
    "Mikro-dunyoni tadqiq qilyapman... 🔬",
    "Eng qiziqarli sirni qidiryapman... 🌟"
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (loadingAi) {
      interval = setInterval(() => {
        setLoadingStep((prev) => (prev + 1) % loadingTexts.length);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [loadingAi]);

  const generateAiFact = async () => {
    setLoadingAi(true);
    setAiFact(null);
    try {
      const prompt = "Tabiiy fanlarga oid o'ta hayratlanarli, bolalarbop qisqa qiziqarli fakt (masalan, koinot, hayvonlar, o'simliklar yoki fizika haqida) va unga mos emoji yozib ber. Javob 2-3 ta qatordan oshmasin. Sodda, tushunarli o'zbek tilida bo'lsin.";
      const res = await askScienceTutor(prompt, []);
      setAiFact(res);
    } catch (e) {
      setAiFact("Mikroskop ostidagi dunyo juda ajoyib! Keyingi gal yana harakat qilib ko'ramiz. 🔬✨");
    } finally {
      setLoadingAi(false);
    }
  };

  const facts = [
    {
      id: 1,
      cat: 'bio',
      title: "Chaqmoqdek Tezkorlik 🐆",
      text: "Dunyodagi eng tezkor quruqlik hayvoni - geparddir! U atigi 3 soniyada soatiga 100 km tezlikka chiqa oladi. Bu deyarli sport avtomobillari bilan barobar!",
      bgColor: "from-emerald-500/10 to-teal-500/10 border-emerald-500/30",
      accentColor: "bg-emerald-500 text-white",
      icon: <Trees size={24} />
    },
    {
      id: 2,
      cat: 'geo',
      title: "Ulkan va Nurafshon Quyosh ☀️",
      text: "Quyosh Quyosh tizimidagi jami moddalarning 99.8% qismini tashkil qiladi! Agar uni bo'sh quti desak, ichiga bemalol 1.3 million dona Yer sayyorasi sig'adi.",
      bgColor: "from-amber-500/10 to-orange-500/10 border-amber-500/30",
      accentColor: "bg-amber-500 text-white",
      icon: <Sun size={24} />
    },
    {
      id: 3,
      cat: 'phys',
      title: "Uchuvchi Suv 🧊",
      text: "Suv muzlaganda hajmi kengayadi (boshqa deyarli barcha suyuqliklar qisqaradi). Aynan shu tufayli muz suvdan yengilroq bo'lib, daryolarda suv ustiga qalqiydi va baliqlarni qishda sovuqdan asraydi!",
      bgColor: "from-blue-500/10 to-sky-500/10 border-blue-500/30",
      accentColor: "bg-blue-500 text-white",
      icon: <CloudRain size={24} />
    },
    {
      id: 4,
      cat: 'bio',
      title: "Yashil Chempion 🎋",
      text: "Bambuk dunyodagi eng tez o'sadigan o't o'simligidir. U bir kunda o'rtacha 91 santimetrgacha o'sa oladi, ya'ni siz ko'z o'ngingizda uning bo'yi cho'zilayotganini ko'rishingiz mumkin!",
      bgColor: "from-green-500/10 to-emerald-500/10 border-green-500/30",
      accentColor: "bg-green-500 text-white",
      icon: <Trees size={24} />
    },
    {
      id: 5,
      cat: 'geo',
      title: "Sehrli Kamalak 🌈",
      text: "Aslida kamalak mukammal aylanadir! Biz uni faqat ufq chizig'i tufayli yarim doira shaklida ko'ramiz. Samolyotda uchganda esa uning to'liq aylanasini ko'rish mumkin.",
      bgColor: "from-violet-500/10 to-pink-500/10 border-violet-500/30",
      accentColor: "bg-violet-500 text-white",
      icon: <Sparkles size={24} />
    },
    {
      id: 6,
      cat: 'phys',
      title: "Oltin Energiya ⚡",
      text: "Bir marta chaqqan yashindagi energiya 100 wattlik elektr lampochkani to'xtovsiz 3 oy davomida yoritishga yetadi! Tabiat kuch-g'ayratga to'la.",
      bgColor: "from-indigo-500/10 to-purple-500/10 border-indigo-500/30",
      accentColor: "bg-indigo-500 text-white",
      icon: <Atom size={24} />
    }
  ];

  const filteredFacts = selectedCat === 'all' 
    ? facts 
    : facts.filter(f => f.cat === selectedCat);

  return (
    <div className="max-w-7xl mx-auto py-16 px-4 relative z-10">
      <div className="text-center mb-12">
        <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-800 rounded-full text-xs font-black uppercase tracking-widest mb-4">
          🧪 Tabiat sirlari burchagi
        </span>
        <h2 className="text-3xl md:text-5xl font-black text-slate-800 tracking-tight leading-none mb-4">
          BILIMLAR XAZINASI
        </h2>
        <p className="text-slate-600 text-lg max-w-2xl mx-auto">
          Tabiiy fanlarga doir eng qiziqarli kashfiyotlar va sehrli faktlar bilan tanishing!
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center items-center gap-3 mb-10">
        <button
          onClick={() => setSelectedCat('all')}
          className={`px-5 py-2.5 rounded-full font-bold text-sm transition-all flex items-center gap-2 border-2 ${selectedCat === 'all' ? 'bg-slate-800 text-white border-slate-800 shadow-md' : 'bg-slate-100/80 text-slate-700 border-slate-200 hover:bg-slate-200'}`}
        >
          🌌 Hammasi
        </button>
        <button
          onClick={() => setSelectedCat('bio')}
          className={`px-5 py-2.5 rounded-full font-bold text-sm transition-all flex items-center gap-2 border-2 ${selectedCat === 'bio' ? 'bg-emerald-600 text-white border-emerald-600 shadow-md' : 'bg-emerald-50/80 text-emerald-800 border-emerald-150 hover:bg-emerald-100'}`}
        >
          🌿 Biologiya (Hayot)
        </button>
        <button
          onClick={() => setSelectedCat('geo')}
          className={`px-5 py-2.5 rounded-full font-bold text-sm transition-all flex items-center gap-2 border-2 ${selectedCat === 'geo' ? 'bg-amber-500 text-white border-amber-500 shadow-md' : 'bg-amber-50/80 text-amber-850 border-amber-200 hover:bg-amber-100'}`}
        >
          🌍 Geografiya & Koinot
        </button>
        <button
          onClick={() => setSelectedCat('phys')}
          className={`px-5 py-2.5 rounded-full font-bold text-sm transition-all flex items-center gap-2 border-2 ${selectedCat === 'phys' ? 'bg-blue-600 text-white border-blue-600 shadow-md' : 'bg-blue-50/80 text-blue-800 border-blue-200 hover:bg-blue-100'}`}
        >
          ⚛️ Fizika & Kimyo
        </button>
      </div>

      {/* Facts Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {filteredFacts.map((fact, idx) => (
          <motion.div
            key={fact.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className={`bg-gradient-to-br ${fact.bgColor} border border-slate-200/50 rounded-[2rem] p-8 shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all relative overflow-hidden flex flex-col justify-between group`}
          >
            {/* Top Row */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className={`p-3 rounded-2xl ${fact.accentColor} shadow-md group-hover:scale-110 transition-transform`}>
                  {fact.icon}
                </div>
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest bg-white/60 px-3 py-1 rounded-full border border-slate-100">
                  Fakt #{fact.id}
                </span>
              </div>
              <h3 className="text-xl font-black mb-3 text-slate-800 leading-tight">
                {fact.title}
              </h3>
              <p className="text-sm font-medium text-slate-600 leading-relaxed">
                {fact.text}
              </p>
            </div>

            {/* Bottom styling */}
            <div className="mt-6 flex items-center gap-1.5 text-xs font-black text-slate-400 uppercase tracking-widest group-hover:text-emerald-600 transition-colors">
              Batafsil ma'lumot <span>→</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Interactive AI Magic Fact Oracle */}
      <div className="bg-gradient-to-r from-indigo-900 via-slate-900 to-emerald-950 rounded-[2.5rem] p-8 md:p-12 text-white shadow-2xl relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto text-center flex flex-col items-center">
          <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-yellow-300 mb-6 border border-white/10">
            <Sparkles size={32} />
          </div>
          <h3 className="text-2xl md:text-3xl font-black mb-3">AI SEHRGARIDAN YANGI SIR! 🧙‍♂️✨</h3>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-8 max-w-lg">
            AI Ustozimiz o'z mikroskopi va orbital teleskopi orqali sizga mutlaqo tasodifiy, hayratlanarli tabiiy fan faktini yaratib beradi!
          </p>

          <button
            onClick={generateAiFact}
            disabled={loadingAi}
            className="px-10 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl text-white font-black text-base md:text-lg hover:from-emerald-600 hover:to-teal-600 shadow-xl shadow-emerald-950/40 hover:shadow-2xl hover:scale-[1.03] active:scale-[0.98] transition-all flex items-center gap-3 disabled:opacity-50"
          >
            {loadingAi ? (
              <>
                <Loader2 className="animate-spin" size={24} />
                <span>{loadingTexts[loadingStep]}</span>
              </>
            ) : (
              <>
                <Sparkles size={24} />
                <span>Sirni ochish (AI Fakt yaratish)</span>
              </>
            )}
          </button>

          {/* AI generated display */}
          {aiFact && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="mt-8 bg-white/10 backdrop-blur-md border border-white/15 p-6 rounded-3xl max-w-xl text-left shadow-inner relative"
            >
              <div className="absolute top-2 right-4 text-xs font-bold text-emerald-400">Yangi Fakt</div>
              <p className="text-base text-teal-100 font-bold leading-relaxed pr-8">
                {aiFact}
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};




const TopicCard: React.FC<{ topic: ScienceTopic, onClick: () => void }> = ({ topic, onClick }) => {
  const Icon = ({
    [Subject.BIOLOGY]: Microscope,
    [Subject.PHYSICS]: Atom,
    [Subject.CHEMISTRY]: Beaker,
    [Subject.GEOGRAPHY]: Globe,
    [Subject.ASTRONOMY]: Orbit,
  })[topic.subject];

  // Map subjects to gorgeous, lively pastel backgrounds and rich border accent colors
  const subjectStyles = {
    [Subject.BIOLOGY]: "bg-gradient-to-br from-[#effdf4] to-[#dafbe4] border-emerald-300 text-emerald-950 hover:shadow-emerald-250/30",
    [Subject.GEOGRAPHY]: "bg-gradient-to-br from-[#f0f9ff] to-[#daf0ff] border-sky-300 text-sky-950 hover:shadow-sky-250/30",
    [Subject.PHYSICS]: "bg-gradient-to-br from-[#faf5ff] to-[#f3e8ff] border-purple-300 text-purple-950 hover:shadow-purple-250/30",
    [Subject.CHEMISTRY]: "bg-gradient-to-br from-[#fffbeb] to-[#fef3c7] border-amber-300 text-amber-950 hover:shadow-amber-250/30",
    [Subject.ASTRONOMY]: "bg-gradient-to-br from-[#fdf4ff] to-[#fae8ff] border-pink-300 text-pink-950 hover:shadow-pink-250/30"
  };

  const currentStyle = subjectStyles[topic.subject] || "bg-gradient-to-br from-[#fff1f2] to-[#ffe4e6] border-rose-300 text-rose-950 hover:shadow-rose-250/30";

  return (
    <div 
      onClick={onClick} 
      className={`p-7 rounded-[2rem] border-2 shadow-sm ${currentStyle} hover:shadow-xl hover:scale-[1.03] transition-all duration-305 group cursor-pointer`}
    >
      <div className={`${topic.color} w-12 h-12 rounded-2xl flex items-center justify-center text-white mb-5 shadow-md group-hover:scale-110 group-hover:rotate-6 transition-transform`}>
        <Icon size={24} />
      </div>
      <h3 className="text-xl font-black mb-2 tracking-tight transition-colors">{topic.title}</h3>
      <p className="opacity-80 text-sm leading-relaxed mb-6 font-medium">{topic.description}</p>
      <div className="flex items-center font-bold text-sm">
        Batafsil o'rganish <ChevronRight size={16} className="ml-1.5 group-hover:translate-x-1.5 transition-transform" />
      </div>
    </div>
  );
};

const TextbookPage = ({ onSelectChapter }: { onSelectChapter: (id: string) => void }) => {
  const textbooks = [
    {
      id: 'main',
      title: "Tabiiy fanlar - 3-sinf",
      desc: "3-sinf o'quvchilari uchun tabiat sirlarini vizual va qiziqarli usullar bilan tushuntirib beruvchi asosiy darslik.",
      link: "https://drive.google.com/file/d/1jdtTrLqnvG1X4a881QwBt7SmzKH9heta/view?usp=sharing",
      img: "https://lh3.googleusercontent.com/d/1jdtTrLqnvG1X4a881QwBt7SmzKH9heta",
      badge: "3-sinf",
      badgeColor: "bg-emerald-100 text-emerald-700"
    },
    {
      id: '4-1',
      title: "Tabiiy fanlar - 4-sinf (1-qism)",
      desc: "4-sinf o'quvchilari uchun tabiiy fanlar darsligining birinchi qismi.",
      link: "https://drive.google.com/file/d/1NhI-BAn3G5E7AszleIZY8M0MZK83WcmH/view?usp=sharing",
      img: "https://lh3.googleusercontent.com/d/1NhI-BAn3G5E7AszleIZY8M0MZK83WcmH",
      badge: "4-sinf",
      badgeColor: "bg-blue-100 text-blue-700"
    }
  ];

  const chapters = [
    { id: '8', title: "1-Bob: Hayvonlar", desc: "Hayvonlar tasnifi, yashash tarzi va tabiatdagi o'rni.", icon: <Trees className="text-emerald-600" /> },
    { id: '2', title: "2-Bob: O'simliklar", desc: "O'simliklar dunyosi, ularning o'sishi va ahamiyati.", icon: <Trees className="text-green-600" /> },
    { id: '6', title: "3-Bob: Yer sayyorasi", desc: "Biz yashayotgan sayyora, uning tuzilishi va sirlari.", icon: <Globe className="text-blue-600" /> },
    { id: '7', title: "4-Bob: Iqlim va ob-havo", desc: "Atmosfera hodisalari, fasllar va iqlim o'zgarishi.", icon: <CloudRain className="text-sky-600" /> },
    { id: '9', title: "4-sinf 1-Bob: Men tadqiqotchiman", desc: "Tadqiqot usullari va ilmiy izlanishlar.", icon: <Microscope className="text-indigo-600" /> },
    { id: '10', title: "4-sinf 2-Bob: O'simliklar", desc: "O'simliklar dunyosi va ularning hayoti.", icon: <Trees className="text-green-700" /> },
    { id: '11', title: "4-sinf 3-Bob: Hayvonlar", desc: "Hayvonlar dunyosi, ularning tasnifi va yashash tarzi.", icon: <HeartPulse className="text-red-600" /> },
    { id: '12', title: "4-sinf 4-Bob: Odamning tuzilishi", desc: "Odam tanasining tuzilishi, organlar va ularning vazifalari.", icon: <HeartPulse className="text-pink-600" /> },
    { id: '13', title: "4-sinf 5-Bob: Yer va koinot", desc: "Yerning koinotdagi o'rni, quyosh tizimi va yulduzlar.", icon: <Orbit className="text-purple-600" /> },
  ];

  return (
    <div className="max-w-7xl mx-auto py-16 px-4">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-black text-slate-800 mb-4 uppercase tracking-tight">DARSLIKLAR TO'PLAMI</h2>
        <p className="text-slate-500 max-w-2xl mx-auto">
          Ushbu bo'limda siz tabiiy fanlar bo'yicha eng so'nggi darsliklarni topishingiz va yuklab olishingiz mumkin. 
          Har bir darslik interaktiv materiallar bilan boyitilgan.
        </p>
      </div>

      <div className="space-y-12 mb-20">
        {textbooks.map((book, bIdx) => (
          <div 
            key={book.id} 
            className={`rounded-[2.5rem] p-8 md:p-12 border-2 ${
              bIdx === 0 
                ? 'bg-gradient-to-br from-[#ebfcf3]/90 via-[#f0fcf5]/80 to-[#dafbe6] border-emerald-200 shadow-lg hover:shadow-xl hover:shadow-emerald-200/50 text-emerald-950' 
                : 'bg-gradient-to-br from-[#ebf4fc]/90 via-[#f3f8fe]/80 to-[#daebfb] border-blue-200 shadow-lg hover:shadow-xl hover:shadow-blue-200/50 text-blue-950'
            } flex flex-col lg:flex-row items-center gap-12 transition-all duration-350 hover:scale-[1.01]`}
          >
            <div className="w-full max-w-sm aspect-[3/4] bg-slate-100 rounded-2xl shadow-2xl overflow-hidden border-8 border-white transform hover:scale-105 transition-transform duration-500">
              <a 
                href={book.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block w-full h-full"
              >
                <img 
                  src={book.img} 
                  alt={book.title} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </a>
            </div>
            <div className="flex-1">
              <div className="mb-4">
                <span className={`inline-block py-1 px-3 ${book.badgeColor} rounded-full text-xs font-bold uppercase tracking-wider`}>
                  {book.badge}
                </span>
              </div>
              <h3 className="text-3xl font-bold text-slate-800 mb-4">{book.title}</h3>
              <p className="text-slate-600 mb-8 leading-relaxed text-lg">{book.desc}</p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-slate-600">
                  <CheckCircle2 size={20} className="text-emerald-500" />
                  <span>To'liq rangli va yuqori sifatli PDF</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600">
                  <CheckCircle2 size={20} className="text-emerald-500" />
                  <span>Interaktiv topshiriqlar bilan integratsiya</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <a 
                  href={book.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-emerald-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200"
                >
                  <BookOpen size={24} /> Darslikni ochish (PDF)
                </a>
                {book.id === '4-1' && (
                  <a 
                    href="https://youtu.be/_62bCHzdMrs" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-red-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-red-700 transition-all shadow-lg shadow-red-200"
                  >
                    <Play size={24} /> Video dars
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-slate-300/60 pt-16">
        <h3 className="text-3xl font-black text-slate-800 mb-8 tracking-tight">Interaktiv Boblar</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {chapters.map((chapter, index) => {
            const gradients = [
              "bg-gradient-to-br from-[#effdf4] to-[#dafbe4] border-emerald-300/75 text-emerald-950 hover:shadow-emerald-250/30",
              "bg-gradient-to-br from-[#fffbeb] to-[#fef3c7] border-amber-300/75 text-amber-950 hover:shadow-amber-250/30",
              "bg-gradient-to-br from-[#f0f9ff] to-[#daf0ff] border-blue-300/75 text-blue-950 hover:shadow-blue-200/30",
              "bg-gradient-to-br from-[#fdf4ff] to-[#fae8ff] border-pink-300/75 text-pink-950 hover:shadow-pink-200/30",
              "bg-gradient-to-br from-[#faf5ff] to-[#f3e8ff] border-purple-300/75 text-purple-950 hover:shadow-purple-200/30",
              "bg-gradient-to-br from-[#f0fdfe] to-[#ccfbf1] border-teal-300/75 text-teal-950 hover:shadow-teal-200/30",
              "bg-gradient-to-br from-[#fbf7ff] to-[#e0e7ff] border-indigo-300/75 text-indigo-950 hover:shadow-indigo-200/30"
            ];
            const currentGrad = gradients[index % gradients.length];
            return (
              <div 
                key={chapter.id} 
                onClick={() => onSelectChapter(chapter.id)}
                className={`p-8 rounded-[2rem] border-2 shadow-sm ${currentGrad} hover:shadow-xl hover:scale-[1.03] transition-all duration-300 cursor-pointer group`}
              >
                <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform">
                  {chapter.icon}
                </div>
                <h4 className="text-xl font-black mb-3 tracking-tight">{chapter.title}</h4>
                <p className="opacity-80 text-sm font-medium mb-6 leading-relaxed">{chapter.desc}</p>
                <div className="font-extrabold flex items-center gap-2 text-sm">
                  O'rganish <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const PlantsChapterDetail = ({ onBack, onPlayGame }: { onBack: () => void, onPlayGame: (url: string) => void }) => {
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const quizQuestions = [
    {
      q: "O'simliklarning oziqlanish jarayoni nima deb ataladi?",
      a: ["Nafas olish", "Fotosintez", "O'sish", "Bug'lanish"],
      correct: 1
    },
    {
      q: "O'simlikni tuproqda ushlab turuvchi organ qaysi?",
      a: ["Barg", "Poya", "Ildiz", "Gul"],
      correct: 2
    },
    {
      q: "Qaysi organ quyosh nurini yutadi va ozuqa tayyorlaydi?",
      a: ["Ildiz", "Barg", "Meva", "Urug'"],
      correct: 1
    },
    {
      q: "O'simlikning ko'payish organi nima?",
      a: ["Ildiz", "Poya", "Gul", "Barg"],
      correct: 2
    },
    {
      q: "Suv va minerallarni ildizdan bargga yetkazuvchi qism?",
      a: ["Meva", "Poya", "Tikan", "Ildizpoya"],
      correct: 1
    }
  ];

  const handleAnswer = (index: number) => {
    if (index === quizQuestions[currentQuestion].correct) {
      setScore(score + 1);
    }
    if (currentQuestion + 1 < quizQuestions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-8">
        <button onClick={onBack} className="flex items-center gap-2 text-slate-600 hover:text-emerald-600 transition-colors font-medium">
          <ArrowLeft size={20} /> Orqaga qaytish
        </button>
      </div>

      <div className="mb-12">
        <div className="flex items-center gap-4 mb-4">
          <span className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-bold">2-BOB</span>
          <h1 className="text-4xl font-extrabold text-slate-900">O'simliklar</h1>
        </div>
        <p className="text-xl text-slate-600 leading-relaxed mb-8">
          Ushbu bobda biz o'simliklar dunyosining ajoyibotlarini o'rganamiz. 
          Ularning qanday o'sishi, oziqlanishi va tabiat uchun ahamiyatini bilib olasiz.
        </p>

        {/* Video & Resources Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Video Player */}
          <div className="bg-slate-900 rounded-3xl overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-900/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500/20 text-green-500 rounded-xl flex items-center justify-center">
                  <Play size={20} fill="currentColor" />
                </div>
                <div>
                  <h3 className="text-white font-bold">Video Dars: O'simliklar Hayoti</h3>
                  <p className="text-slate-400 text-xs">Mavzuni vizual o'rganing</p>
                </div>
              </div>
            </div>
            <div className="aspect-video w-full">
              <iframe 
                className="w-full h-full"
                src="https://www.youtube.com/embed/er9ILHsu5ZY" 
                title="O'simliklar haqida dars" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen
              ></iframe>
            </div>
          </div>

          {/* Google Drive Resource */}
          <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-200 flex flex-col">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 text-green-600 rounded-xl flex items-center justify-center">
                  <BookOpen size={20} />
                </div>
                <div>
                  <h3 className="text-slate-900 font-bold">Darslik materiallari</h3>
                  <p className="text-slate-500 text-xs">3-sinf 2-bob darsligi</p>
                </div>
              </div>
            </div>
            <div className="flex-1 p-6 flex flex-col items-center justify-center text-center">
              <div className="w-full aspect-video rounded-2xl bg-slate-100 mb-6 overflow-hidden relative group">
                <img 
                  src="https://lh3.googleusercontent.com/d/1N2ucvHXuYr0y8J63NfziO13zy9NOesoa" 
                  alt="Darslik materiali"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                   <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                      <ArrowLeft className="rotate-180 text-green-600" size={32} />
                   </div>
                </div>
              </div>
              <h4 className="text-lg font-bold text-slate-800 mb-2">2-Bob: O'simliklar (Darslik)</h4>
              <p className="text-slate-500 text-sm mb-6">Ushbu havola orqali bobga tegishli darslik sahifalarini ko'rishingiz mumkin.</p>
              <a 
                href="https://drive.google.com/file/d/1N2ucvHXuYr0y8J63NfziO13zy9NOesoa/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700 transition-all shadow-lg shadow-green-100 flex items-center justify-center gap-2"
              >
                Darslikni ochish <ChevronRight size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Additional Video Section: Forests */}
        <div className="bg-emerald-900 rounded-[2.5rem] p-8 text-white shadow-2xl mb-12 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-3xl flex items-center justify-center flex-shrink-0 border border-white/20">
            <Play size={40} className="text-white" fill="currentColor" />
          </div>
          <div className="flex-1 text-center md:text-left relative z-10">
            <h3 className="text-2xl font-bold mb-2">Qo'shimcha dars: O'rmonlar mavzusi</h3>
            <p className="text-emerald-100/80 text-lg">
              O'rmonlarning tabiatdagi o'rni, ularning turlari va ahamiyati haqida qiziqarli videoni tomosha qiling.
            </p>
          </div>
          <a 
            href="https://drive.google.com/file/d/1EBGzSSi971aWE-8wPwbxOSvFQm2dO8DB/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-emerald-900 px-8 py-4 rounded-2xl font-bold hover:bg-emerald-50 transition-all shadow-xl flex items-center gap-3 whitespace-nowrap relative z-10"
          >
            Videoni ko'rish <ChevronRight size={20} />
          </a>
        </div>

        {/* Game Section */}
        <div className="bg-blue-600 rounded-[2.5rem] p-8 text-white shadow-2xl mb-12 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-3xl flex items-center justify-center flex-shrink-0 border border-white/20">
            <Gamepad2 size={40} className="text-white" />
          </div>
          <div className="flex-1 text-center md:text-left relative z-10">
            <h3 className="text-2xl font-bold mb-2">Interaktiv O'yin: O'simliklar dunyosi</h3>
            <p className="text-blue-100/80 text-lg">
              O'simliklar haqidagi bilimlaringizni qiziqarli o'yin orqali sinab ko'ring va yangi ma'lumotlar oling.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 relative z-10">
            <button 
              onClick={() => onPlayGame("https://drive.google.com/file/d/1PPcGPRK3kb5Txaay8x-GME7FYjEmysKY/preview")}
              className="bg-white text-blue-700 px-8 py-4 rounded-2xl font-bold hover:bg-blue-50 transition-all shadow-xl flex items-center gap-3 whitespace-nowrap border border-blue-400/30"
            >
              O'ynash <Play size={20} />
            </button>
            <a 
              href="https://drive.google.com/uc?export=download&id=1PPcGPRK3kb5Txaay8x-GME7FYjEmysKY"
              download="osimliklar-dunyosi.html"
              className="bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold hover:bg-blue-800 transition-all shadow-xl flex items-center gap-3 whitespace-nowrap border border-blue-400/30"
            >
              Yuklab olish <Download size={20} />
            </a>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Bob haqida qisqacha</h2>
            <p className="text-slate-600 leading-relaxed">
              O'simliklar dunyosi juda xilma-xil va hayratlanarli. Ushbu bobda o'simliklarning tuzilishi, 
              ularning qanday oziqlanishi (fotosintez) va tabiat muvozanatidagi o'rni haqida o'rganamiz.
            </p>
          </div>

          {/* Ideal Quiz Section */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-full -mr-16 -mt-16 z-0"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center">
                  <Gamepad2 size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-800">Ideal Test</h2>
                  <p className="text-slate-500 text-sm">Bilimingizni sinab ko'ring</p>
                </div>
              </div>

              {!quizStarted ? (
                <div className="py-10 text-center">
                  <h3 className="text-xl font-bold text-slate-800 mb-4">Tayyormisiz?</h3>
                  <p className="text-slate-500 mb-8 max-w-md mx-auto">
                    Ushbu test 5 ta savoldan iborat bo'lib, o'simliklar haqidagi bilimlaringizni tekshiradi.
                  </p>
                  <button 
                    onClick={() => setQuizStarted(true)}
                    className="bg-green-600 text-white px-10 py-4 rounded-2xl font-bold hover:bg-green-700 transition-all shadow-lg shadow-green-100"
                  >
                    Testni boshlash
                  </button>
                </div>
              ) : showResult ? (
                <div className="py-10 text-center">
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 size={40} />
                  </div>
                  <h3 className="text-3xl font-bold text-slate-800 mb-2">Sizning natijangiz: {score}/5</h3>
                  <p className="text-slate-500 mb-8">
                    {score === 5 ? "Ajoyib! Siz o'simliklar bo'yicha mutaxassissiz!" : 
                     score >= 3 ? "Yaxshi natija! Bilimlaringizni yanada oshirishingiz mumkin." : 
                     "Mavzuni qaytadan o'rganib chiqish foydali bo'ladi."}
                  </p>
                  <button 
                    onClick={() => { setQuizStarted(false); setShowResult(false); setCurrentQuestion(0); setScore(0); }}
                    className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-800 transition-all"
                  >
                    Qayta topshirish
                  </button>
                </div>
              ) : (
                <div className="space-y-8">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-green-600 uppercase tracking-widest">Savol {currentQuestion + 1}</span>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className={`h-1.5 w-8 rounded-full ${i <= currentQuestion ? 'bg-green-500' : 'bg-slate-100'}`}></div>
                      ))}
                    </div>
                  </div>
                  
                  <h4 className="text-xl font-bold text-slate-800 leading-tight">
                    {quizQuestions[currentQuestion].q}
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {quizQuestions[currentQuestion].a.map((ans, idx) => (
                      <button 
                        key={idx}
                        onClick={() => handleAnswer(idx)}
                        className="w-full text-left px-6 py-4 rounded-2xl border-2 border-slate-100 hover:border-green-500 hover:bg-green-50 transition-all group"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-8 h-8 rounded-lg bg-slate-50 text-slate-400 group-hover:bg-green-500 group-hover:text-white flex items-center justify-center font-bold transition-colors">
                            {String.fromCharCode(65 + idx)}
                          </div>
                          <span className="text-slate-700 font-medium group-hover:text-green-900">{ans}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-green-50 p-8 rounded-3xl border border-green-100 sticky top-24">
            <h3 className="text-xl font-bold text-green-900 mb-4 flex items-center gap-2">
              <BrainCircuit size={20} /> O'rganish bo'yicha maslahat
            </h3>
            <p className="text-green-800/80 text-sm leading-relaxed mb-6">
              O'simliklarni o'rganayotganda ularning qismlari va har bir qismning vazifasiga e'tibor bering. 
              Fotosintez jarayoni tabiat uchun qanchalik muhimligini tushunishga harakat qiling.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-white rounded-2xl border border-green-100">
                <div className="w-10 h-10 bg-green-100 text-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Play size={18} />
                </div>
                <div className="text-xs">
                  <p className="font-bold text-slate-800">Video darsni ko'ring</p>
                  <p className="text-slate-500">Vizual tushunishni osonlashtiradi</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white rounded-2xl border border-green-100">
                <div className="w-10 h-10 bg-green-100 text-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <BookOpen size={18} />
                </div>
                <div className="text-xs">
                  <p className="font-bold text-slate-800">Darslikni o'qing</p>
                  <p className="text-slate-500">Nazariy bilimlarni mustahkamlaydi</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const EarthChapterDetail = ({ onBack, onPlayGame }: { onBack: () => void, onPlayGame: (url: string) => void }) => {
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const quizQuestions = [
    {
      q: "Yerning eng ichki qismi nima deb ataladi?",
      a: ["Mantiya", "Yadro", "Yer qobig'i", "Litosfera"],
      correct: 1
    },
    {
      q: "Yer o'z o'qi atrofida bir marta aylanishi uchun qancha vaqt ketadi?",
      a: ["1 yil", "1 oy", "24 soat", "12 soat"],
      correct: 2
    },
    {
      q: "Dunyo okeanining necha foizini suv tashkil etadi?",
      a: ["50%", "71%", "90%", "30%"],
      correct: 1
    },
    {
      q: "Yerning Quyosh atrofida aylanishi nimaga sabab bo'ladi?",
      a: ["Kun va tun almashinishi", "Fasllar almashinishi", "Oy tutilishi", "Toshqinlar"],
      correct: 1
    },
    {
      q: "Yer qobig'ining eng yuqori qattiq qatlami nima?",
      a: ["Mantiya", "Yadro", "Litosfera", "Atmosfera"],
      correct: 2
    }
  ];

  const handleAnswer = (index: number) => {
    if (index === quizQuestions[currentQuestion].correct) {
      setScore(score + 1);
    }
    if (currentQuestion + 1 < quizQuestions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-8">
        <button onClick={onBack} className="flex items-center gap-2 text-slate-600 hover:text-emerald-600 transition-colors font-medium">
          <ArrowLeft size={20} /> Orqaga qaytish
        </button>
      </div>

      <div className="mb-12">
        <div className="flex items-center gap-4 mb-4">
          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold">3-BOB</span>
          <h1 className="text-4xl font-extrabold text-slate-900">Yer sayyorasi</h1>
        </div>
        <p className="text-xl text-slate-600 leading-relaxed mb-8">
          Biz yashayotgan sayyora — Yer haqida hamma narsani o'rganamiz. 
          Uning tuzilishi, harakati va koinotdagi o'rni haqida qiziqarli ma'lumotlar.
        </p>

        {/* Video & Resources Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Video Player */}
          <div className="bg-slate-900 rounded-3xl overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-900/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500/20 text-blue-500 rounded-xl flex items-center justify-center">
                  <Play size={20} fill="currentColor" />
                </div>
                <div>
                  <h3 className="text-white font-bold">Video Dars: Yer Sayyorasi</h3>
                  <p className="text-slate-400 text-xs">Mavzuni vizual o'rganing</p>
                </div>
              </div>
            </div>
            <div className="aspect-video w-full">
              <iframe 
                className="w-full h-full"
                src="https://www.youtube.com/embed/gmIWXuNWemg" 
                title="Yer sayyorasi haqida dars" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen
              ></iframe>
            </div>
          </div>

          {/* Google Drive Resource */}
          <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-200 flex flex-col">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
                  <BookOpen size={20} />
                </div>
                <div>
                  <h3 className="text-slate-900 font-bold">Darslik materiallari</h3>
                  <p className="text-slate-500 text-xs">3-sinf 3-bob darsligi</p>
                </div>
              </div>
            </div>
            <div className="flex-1 p-6 flex flex-col items-center justify-center text-center">
              <div className="w-full aspect-video rounded-2xl bg-slate-100 mb-6 overflow-hidden relative group">
                <img 
                  src="https://lh3.googleusercontent.com/d/1w1PdnfASMh6rg3Dy8FdZDzzzOJZcxCeL" 
                  alt="Darslik materiali"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                   <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                      <ArrowLeft className="rotate-180 text-blue-600" size={32} />
                   </div>
                </div>
              </div>
              <h4 className="text-lg font-bold text-slate-800 mb-2">3-Bob: Yer sayyorasi (Darslik)</h4>
              <p className="text-slate-500 text-sm mb-6">Ushbu havola orqali bobga tegishli darslik sahifalarini ko'rishingiz mumkin.</p>
              <a 
                href="https://drive.google.com/file/d/1w1PdnfASMh6rg3Dy8FdZDzzzOJZcxCeL/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 flex items-center justify-center gap-2"
              >
                Darslikni ochish <ChevronRight size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Additional Video Section: Solar System */}
        <div className="bg-indigo-900 rounded-[2.5rem] p-8 text-white shadow-2xl mb-8 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-3xl flex items-center justify-center flex-shrink-0 border border-white/20">
            <Play size={40} className="text-white" fill="currentColor" />
          </div>
          <div className="flex-1 text-center md:text-left relative z-10">
            <h3 className="text-2xl font-bold mb-2">Qo'shimcha dars: Quyosh tizimi</h3>
            <p className="text-indigo-100/80 text-lg">
              Quyosh tizimidagi sayyoralar, ularning o'ziga xos xususiyatlari va koinot sirlari haqida qiziqarli videoni tomosha qiling.
            </p>
          </div>
          <a 
            href="https://drive.google.com/file/d/19yIsrztg144EeVTZSKxssdoLtLjtM0DC/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-indigo-900 px-8 py-4 rounded-2xl font-bold hover:bg-indigo-50 transition-all shadow-xl flex items-center gap-3 whitespace-nowrap relative z-10"
          >
            Videoni ko'rish <ChevronRight size={20} />
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Bob haqida qisqacha</h2>
            <p className="text-slate-600 leading-relaxed">
              Yer — bizning umumiy uyimiz. Ushbu bobda sayyoramizning qanday tuzilgani, uning koinotdagi harakati va 
              tabiiy xususiyatlari haqida qiziqarli ma'lumotlar jamlangan.
            </p>
          </div>

          {/* Ideal Quiz Section */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -mr-16 -mt-16 z-0"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center">
                  <Gamepad2 size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-800">Ideal Test</h2>
                  <p className="text-slate-500 text-sm">Bilimingizni sinab ko'ring</p>
                </div>
              </div>

              {!quizStarted ? (
                <div className="py-10 text-center">
                  <h3 className="text-xl font-bold text-slate-800 mb-4">Tayyormisiz?</h3>
                  <p className="text-slate-500 mb-8 max-w-md mx-auto">
                    Ushbu test 5 ta savoldan iborat bo'lib, Yer sayyorasi haqidagi bilimlaringizni tekshiradi.
                  </p>
                  <button 
                    onClick={() => setQuizStarted(true)}
                    className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
                  >
                    Testni boshlash
                  </button>
                </div>
              ) : showResult ? (
                <div className="py-10 text-center">
                  <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 size={40} />
                  </div>
                  <h3 className="text-3xl font-bold text-slate-800 mb-2">Sizning natijangiz: {score}/5</h3>
                  <p className="text-slate-500 mb-8">
                    {score === 5 ? "Ajoyib! Siz Yer sayyorasi bo'yicha mutaxassissiz!" : 
                     score >= 3 ? "Yaxshi natija! Bilimlaringizni yanada oshirishingiz mumkin." : 
                     "Mavzuni qaytadan o'rganib chiqish foydali bo'ladi."}
                  </p>
                  <button 
                    onClick={() => { setQuizStarted(false); setShowResult(false); setCurrentQuestion(0); setScore(0); }}
                    className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-800 transition-all"
                  >
                    Qayta topshirish
                  </button>
                </div>
              ) : (
                <div className="space-y-8">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-blue-600 uppercase tracking-widest">Savol {currentQuestion + 1}</span>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className={`h-1.5 w-8 rounded-full ${i <= currentQuestion ? 'bg-blue-500' : 'bg-slate-100'}`}></div>
                      ))}
                    </div>
                  </div>
                  
                  <h4 className="text-xl font-bold text-slate-800 leading-tight">
                    {quizQuestions[currentQuestion].q}
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {quizQuestions[currentQuestion].a.map((ans, idx) => (
                      <button 
                        key={idx}
                        onClick={() => handleAnswer(idx)}
                        className="w-full text-left px-6 py-4 rounded-2xl border-2 border-slate-100 hover:border-blue-500 hover:bg-blue-50 transition-all group"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-8 h-8 rounded-lg bg-slate-50 text-slate-400 group-hover:bg-blue-500 group-hover:text-white flex items-center justify-center font-bold transition-colors">
                            {String.fromCharCode(65 + idx)}
                          </div>
                          <span className="text-slate-700 font-medium group-hover:text-blue-900">{ans}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Interactive Games Section */}
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl group-hover:bg-white/20 transition-colors duration-700"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/10 rounded-full -ml-32 -mb-32 blur-3xl"></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/30 shadow-inner">
                  <Gamepad2 size={32} className="text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-black tracking-tight">Interaktiv o'yinlar</h2>
                  <p className="text-blue-100/80 font-medium">Mavzuni o'yin orqali mustahkamlang</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 hover:bg-white/15 transition-all group/card">
                  <div className="w-full aspect-video rounded-2xl bg-white/5 mb-6 overflow-hidden relative">
                    <img 
                      src="https://lh3.googleusercontent.com/d/1bIb_lciPi-GKuHxDj_CvG1_didFYciTd" 
                      alt="Yer sayyorasi o'yini"
                      className="w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                      <span className="bg-blue-500 text-white px-3 py-1 rounded-lg text-xs font-bold">INTERAKTIV</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3">Yer sayyorasi sirlari</h3>
                  <p className="text-blue-100/70 text-sm mb-6 leading-relaxed">
                    Yerning tuzilishi va xususiyatlarini qiziqarli topshiriqlar orqali o'rganing.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <button 
                      onClick={() => onPlayGame("https://drive.google.com/uc?export=view&id=1bIb_lciPi-GKuHxDj_CvG1_didFYciTd")}
                      className="bg-white text-blue-700 px-8 py-4 rounded-2xl font-bold hover:bg-blue-50 transition-all shadow-xl flex items-center gap-3 whitespace-nowrap border border-blue-400/30"
                    >
                      O'ynash <Play size={20} />
                    </button>
                    <a 
                      href="https://drive.google.com/uc?export=download&id=1bIb_lciPi-GKuHxDj_CvG1_didFYciTd"
                      download="yer-sayyorasi-sirlari.html"
                      className="bg-blue-500 text-white px-8 py-4 rounded-2xl font-bold hover:bg-blue-600 transition-all shadow-xl flex items-center gap-3 whitespace-nowrap"
                    >
                      Yuklab olish <Download size={20} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-blue-50 p-8 rounded-3xl border border-blue-100 sticky top-24">
            <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
              <BrainCircuit size={20} /> O'rganish bo'yicha maslahat
            </h3>
            <p className="text-blue-800/80 text-sm leading-relaxed mb-6">
              Yer sayyorasini o'rganayotganda uning qatlamlari va harakatlariga e'tibor bering. 
              Globus va xaritalardan foydalanish tushunchalarni vizuallashtirishga yordam beradi.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-white rounded-2xl border border-blue-100">
                <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Play size={18} />
                </div>
                <div className="text-xs">
                  <p className="font-bold text-slate-800">Video darsni ko'ring</p>
                  <p className="text-slate-500">Vizual tushunishni osonlashtiradi</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white rounded-2xl border border-blue-100">
                <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <BookOpen size={18} />
                </div>
                <div className="text-xs">
                  <p className="font-bold text-slate-800">Darslikni o'qing</p>
                  <p className="text-slate-500">Nazariy bilimlarni mustahkamlaydi</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PlantsGrade4ChapterDetail = ({ onBack, onPlayGame }: { onBack: () => void, onPlayGame: (url: string) => void }) => {
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const quizQuestions = [
    {
      q: "O'simliklar o'sishi uchun nimalar kerak?",
      a: ["Faqat suv", "Suv, yorug'lik, havo va ozuqa", "Faqat tuproq", "Faqat quyosh nuri"],
      correct: 1
    },
    {
      q: "Fotosintez jarayoni nima?",
      a: ["O'simlikning uxlashi", "O'simlikning quyosh nuri yordamida ozuqa tayyorlashi", "Barglarning to'kilishi", "Ildizning o'sishi"],
      correct: 1
    },
    {
      q: "O'simlikning qaysi qismi suv va mineral moddalarni so'radi?",
      a: ["Barg", "Gullari", "Ildiz", "Poyasi"],
      correct: 2
    },
    {
      q: "Barglarning yashil rangda bo'lishiga nima sabab bo'ladi?",
      a: ["Suv", "Xlorofill", "Tuproq", "Havo"],
      correct: 1
    },
    {
      q: "O'simliklar nafas olganda havoga nima chiqaradi?",
      a: ["Karbonat angidrid", "Azot", "Kislorod", "Vodorod"],
      correct: 2
    }
  ];

  const handleAnswer = (index: number) => {
    if (index === quizQuestions[currentQuestion].correct) {
      setScore(score + 1);
    }
    if (currentQuestion + 1 < quizQuestions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-8">
        <button onClick={onBack} className="flex items-center gap-2 text-slate-600 hover:text-green-600 transition-colors font-medium">
          <ArrowLeft size={20} /> Orqaga qaytish
        </button>
      </div>

      <div className="mb-12">
        <div className="flex items-center gap-4 mb-4">
          <span className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">4-sinf • 2-bob</span>
          <h1 className="text-4xl font-extrabold text-slate-900">O'simliklar dunyosi</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <div className="bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center text-green-500">
                  <Play size={16} fill="currentColor" />
                </div>
                <div>
                  <h3 className="text-white text-sm font-bold">1-video: O'simliklar hayoti</h3>
                </div>
              </div>
            </div>
            <div className="aspect-video w-full">
              <iframe 
                className="w-full h-full"
                src="https://drive.google.com/file/d/1us5tmWv2-RbL6IJFHbHZ-mULuWzNI962/preview" 
                title="O'simliklar dars videosi 1"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen
              ></iframe>
            </div>
          </div>

          <div className="bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center text-green-500">
                  <Play size={16} fill="currentColor" />
                </div>
                <div>
                  <h3 className="text-white text-sm font-bold">2-video: O'simliklar dunyosi</h3>
                </div>
              </div>
            </div>
            <div className="aspect-video w-full">
              <iframe 
                className="w-full h-full"
                src="https://drive.google.com/file/d/1gkskRbuSU0BvkmltPVmEDi0XWL4DvqVr/preview" 
                title="O'simliklar dars videosi 2"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen
              ></iframe>
            </div>
          </div>

          <div className="bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center text-green-500">
                  <Play size={16} fill="currentColor" />
                </div>
                <div>
                  <h3 className="text-white text-sm font-bold">3-video: O'simliklar tuzilishi</h3>
                </div>
              </div>
            </div>
            <div className="aspect-video w-full">
              <iframe 
                className="w-full h-full"
                src="https://drive.google.com/file/d/1R5wpdcCo_BZ92RXlm4nrrkdk9gAgPUId/preview" 
                title="O'simliklar dars videosi 3"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm mb-12">
          <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <Sparkles className="text-green-500" /> O'simliklar haqida qiziqarli faktlar
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "O'simliklar quyosh nuridan energiya oladi",
              "Dunyodagi eng katta o'simlik - Sekvoya",
              "O'simliklar bizga kislorod beradi",
              "Ildizlar tuproqni ushlab turadi",
              "Gullar hasharotlarni jalb qiladi",
              "Ba'zi o'simliklar yuzlab yil yashaydi"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 p-4 bg-green-50/50 rounded-2xl border border-green-100/50">
                <div className="w-8 h-8 bg-green-100 text-green-600 rounded-xl flex items-center justify-center flex-shrink-0 font-bold text-sm">
                  {i + 1}
                </div>
                <p className="text-slate-700 font-medium">{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Game Section 1 */}
        <div className="bg-green-600 rounded-[2.5rem] p-8 text-white shadow-2xl mb-8 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full -ml-32 -mb-32 blur-3xl"></div>
          <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-3xl flex items-center justify-center flex-shrink-0 border border-white/20">
            <Gamepad2 size={40} className="text-white" />
          </div>
          <div className="flex-1 text-center md:text-left relative z-10">
            <div className="flex items-center gap-2 mb-2 justify-center md:justify-start">
              <span className="bg-white/20 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider border border-white/20">YANGI O'YIN</span>
              <h3 className="text-2xl font-bold">Interaktiv O'yin: O'simliklar sirlari</h3>
            </div>
            <p className="text-green-50/90 text-lg">
              O'simliklar dunyosini o'yin orqali yanada qiziqarliroq o'rganing!
            </p>
          </div>
          <div className="flex flex-wrap gap-4 relative z-10">
            <button 
              onClick={() => onPlayGame("https://drive.google.com/file/d/1I2yETWL-NXsKiN5diigq_tP3GOXvUcIT/preview")}
              className="bg-white text-green-700 px-8 py-4 rounded-2xl font-bold hover:bg-green-50 transition-all shadow-xl flex items-center gap-3 whitespace-nowrap border border-green-400/30"
            >
              O'ynash <Play size={20} />
            </button>
            <a 
              href="https://drive.google.com/uc?export=download&id=1I2yETWL-NXsKiN5diigq_tP3GOXvUcIT"
              download="osimliklar-sirlari.html"
              className="bg-green-700 text-white px-8 py-4 rounded-2xl font-bold hover:bg-green-800 transition-all shadow-xl flex items-center gap-3 whitespace-nowrap border border-green-400/30"
            >
              Yuklab olish <Download size={20} />
            </a>
          </div>
        </div>

        {/* Interactive Game Section 2: Fotosintez */}
        <div className="bg-emerald-600 rounded-[2.5rem] p-8 text-white shadow-2xl mb-12 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-3xl flex items-center justify-center flex-shrink-0 border border-white/20">
            <Gamepad2 size={40} className="text-white" />
          </div>
          <div className="flex-1 text-center md:text-left relative z-10">
            <div className="flex items-center gap-2 mb-2 justify-center md:justify-start">
              <span className="bg-white/20 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider border border-white/20">YANGI O'YIN</span>
              <h3 className="text-2xl font-bold">Interaktiv O'yin: Fotosintez</h3>
            </div>
            <p className="text-emerald-50/90 text-lg">
              Fotosintez jarayonini qiziqarli o'yin orqali o'rganing va bilimingizni sinab ko'ring!
            </p>
          </div>
          <div className="flex flex-wrap gap-4 relative z-10">
            <button 
              onClick={() => onPlayGame("https://drive.google.com/file/d/14YKQxBAKE7-UBvcGBy1VU7Cj2T3_ht2f/preview")}
              className="bg-white text-emerald-700 px-8 py-4 rounded-2xl font-bold hover:bg-emerald-50 transition-all shadow-xl flex items-center gap-3 whitespace-nowrap border border-emerald-400/30"
            >
              O'ynash <Play size={20} />
            </button>
            <a 
              href="https://drive.google.com/uc?export=download&id=14YKQxBAKE7-UBvcGBy1VU7Cj2T3_ht2f"
              download="fotosintez-oyini.html"
              className="bg-emerald-700 text-white px-8 py-4 rounded-2xl font-bold hover:bg-emerald-800 transition-all shadow-xl flex items-center gap-3 whitespace-nowrap border border-emerald-400/30"
            >
              Yuklab olish <Download size={20} />
            </a>
          </div>
        </div>

        {/* Image Gallery Section */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm mb-12">
          <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <Sparkles className="text-green-500" /> Foydalanish uchun rasmlar
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              "1XjxqPLcZ30vkfEPfQVEYI5j8HEUNJGSv",
              "1oyGBGc7dhGVi6teKc8kV6vPYGg7D8qIM",
              "1o0QMQxep7o8GgB2mifWDd4jr-l7Owog-",
              "1ma_3OgSmNlMYGvK_UBt53dkTLaUdpNYm",
              "11f14iMNxTc76U7qJnrTXhSICsip_UOTZ",
              "11PWOX8nnaidBKSzppVQJl0GiM5RUMkBX"
            ].map((id, i) => (
              <div key={i} className="group relative aspect-square rounded-2xl overflow-hidden border-2 border-slate-100 hover:border-green-500 transition-all shadow-sm">
                <img 
                  src={`https://lh3.googleusercontent.com/d/${id}`} 
                  alt={`O'simlik rasmi ${i + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <a 
                    href={`https://drive.google.com/file/d/${id}/view?usp=sharing`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white/20 backdrop-blur-md text-white p-2 rounded-full hover:bg-white/40 transition-colors"
                    title="Kattaroq ko'rish"
                  >
                    <ChevronRight size={20} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Research (Tadqiqot) Section */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm mb-12">
          <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <Beaker className="text-green-500" /> Tadqiqot
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              "13NpkYwuqjZ3V4F3D48EhjBS0SsxsInje",
              "15G0RPZV9kwCdMvotfThlJ5JZ6dCfYveS",
              "1j6iN18aPrJ2Gy98V9vYAamcvuCZkG8dl",
              "1fPRYyp36Xty5S6PUQHLX8ttjVOMs0bTX"
            ].map((id, i) => (
              <div key={i} className="group relative aspect-video rounded-2xl overflow-hidden border-2 border-slate-100 hover:border-green-500 transition-all shadow-md">
                <img 
                  src={`https://lh3.googleusercontent.com/d/${id}`} 
                  alt={`Tadqiqot rasmi ${i + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <a 
                    href={`https://drive.google.com/file/d/${id}/view?usp=sharing`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-white text-slate-900 py-2 rounded-xl font-bold text-center text-sm hover:bg-green-50 transition-colors"
                  >
                    Kattalashtirish
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Bob haqida qisqacha</h2>
            <p className="text-slate-600 leading-relaxed mb-8">
              O'simliklar Yer yuzidagi hayotning asosi hisoblanadi. Ushbu bobda siz o'simliklarning tuzilishi, 
              ularning qanday oziqlanishi va o'sishi, shuningdek, tabiatdagi ahamiyati haqida bilib olasiz.
            </p>
            
            <div className="bg-green-50 rounded-2xl p-6 border border-green-100 flex flex-col sm:flex-row items-center gap-6">
              <div className="w-20 h-28 bg-white rounded-lg shadow-md overflow-hidden flex-shrink-0 border-2 border-white">
                <img 
                  src="https://lh3.googleusercontent.com/d/1ODVI7m64rJapWVfiBZyuOKCCAKV7eUNK" 
                  alt="4-sinf 2-bob darslik" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h4 className="font-bold text-slate-800 mb-2">2-bob: O'simliklar (Darslik)</h4>
                <p className="text-sm text-slate-500 mb-4">Mavzu bo'yicha darslikning PDF variantini o'qing va yuklab oling.</p>
                <a 
                  href="https://drive.google.com/file/d/1ODVI7m64rJapWVfiBZyuOKCCAKV7eUNK/view?usp=sharing" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-2 rounded-xl font-bold text-sm hover:bg-green-700 transition-all shadow-md shadow-green-100"
                >
                  <BookOpen size={18} /> Darslikni ochish
                </a>
              </div>
            </div>
          </div>

          {/* Quiz Section */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-full -mr-16 -mt-16 z-0"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center">
                  <BrainCircuit size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-800">Bilimingizni sinang</h2>
                  <p className="text-slate-500 text-sm">O'simliklar haqida nimalarni bilasiz?</p>
                </div>
              </div>

              {!quizStarted ? (
                <div className="py-10 text-center">
                  <h3 className="text-xl font-bold text-slate-800 mb-4">Tayyormisiz?</h3>
                  <p className="text-slate-500 mb-8 max-w-md mx-auto">
                    5 ta savol orqali o'simliklar dunyosi haqidagi bilimlaringizni tekshiring.
                  </p>
                  <button 
                    onClick={() => setQuizStarted(true)}
                    className="bg-green-600 text-white px-10 py-4 rounded-2xl font-bold hover:bg-green-700 transition-all shadow-lg shadow-green-100"
                  >
                    Testni boshlash
                  </button>
                </div>
              ) : showResult ? (
                <div className="py-10 text-center">
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 size={40} />
                  </div>
                  <h3 className="text-3xl font-bold text-slate-800 mb-2">Sizning natijangiz: {score}/5</h3>
                  <p className="text-slate-500 mb-8">
                    {score === 5 ? "Ajoyib! Siz o'simliklar bo'yicha mutaxassissiz!" : 
                     score >= 3 ? "Yaxshi! O'simliklar haqida ko'p narsa bilasiz." : 
                     "Mavzuni yana bir bor ko'rib chiqing."}
                  </p>
                  <button 
                    onClick={() => { setQuizStarted(false); setShowResult(false); setCurrentQuestion(0); setScore(0); }}
                    className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-800 transition-all"
                  >
                    Qayta topshirish
                  </button>
                </div>
              ) : (
                <div className="space-y-8">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-green-600 uppercase tracking-widest">Savol {currentQuestion + 1}</span>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className={`h-1.5 w-8 rounded-full ${i <= currentQuestion ? 'bg-green-500' : 'bg-slate-100'}`}></div>
                      ))}
                    </div>
                  </div>
                  
                  <h4 className="text-xl font-bold text-slate-800 leading-tight">
                    {quizQuestions[currentQuestion].q}
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {quizQuestions[currentQuestion].a.map((ans, idx) => (
                      <button 
                        key={idx}
                        onClick={() => handleAnswer(idx)}
                        className="w-full text-left px-6 py-4 rounded-2xl border-2 border-slate-100 hover:border-green-500 hover:bg-green-50 transition-all group"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-8 h-8 rounded-lg bg-slate-50 text-slate-400 group-hover:bg-green-500 group-hover:text-white flex items-center justify-center font-bold transition-colors">
                            {String.fromCharCode(65 + idx)}
                          </div>
                          <span className="text-slate-700 font-medium group-hover:text-green-900">{ans}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-green-50 p-8 rounded-3xl border border-green-100 sticky top-24">
            <h3 className="text-xl font-bold text-green-900 mb-4 flex items-center gap-2">
              <BrainCircuit size={20} /> O'simlikshunos maslahati
            </h3>
            <p className="text-green-800/80 text-sm leading-relaxed mb-6">
              O'simliklar bilan muloqot qiling! Ularga suv quyish va parvarish qilish orqali siz tabiatga yaqinroq bo'lasiz. 
              Har bir o'simlik o'ziga xos ehtiyojlarga ega.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-white rounded-2xl border border-green-100">
                <div className="w-10 h-10 bg-green-100 text-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Play size={18} />
                </div>
                <div className="text-xs">
                  <p className="font-bold text-slate-800">Video darsni ko'ring</p>
                  <p className="text-slate-500">O'simliklar hayotini o'rganing</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AnimalsGrade4ChapterDetail = ({ onBack, onPlayGame }: { onBack: () => void, onPlayGame: (url: string) => void }) => {
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const quizQuestions = [
    {
      q: "Hayvonlar o'z ozuqasini qanday topadi?",
      a: ["Fotosintez orqali", "Boshqa o'simlik va hayvonlarni iste'mol qilish orqali", "Faqat suv ichish orqali", "Tuproqdan oladi"],
      correct: 1
    },
    {
      q: "Umurtqali hayvonlarga qaysilar kiradi?",
      a: ["Hasharotlar", "Baliqlar, qushlar, sutemizuvchilar", "Chuvalchanglar", "Sakkizoyoqlar"],
      correct: 1
    },
    {
      q: "Yirtqich hayvonlar nima bilan oziqlanadi?",
      a: ["Faqat o't bilan", "Boshqa hayvonlar bilan", "Meva va sabzavotlar bilan", "Donlar bilan"],
      correct: 1
    },
    {
      q: "Hayvonlar nafas olganda nima chiqaradi?",
      a: ["Kislorod", "Karbonat angidrid", "Azot", "Vodorod"],
      correct: 1
    },
    {
      q: "Qaysi hayvonlar ham suvda, ham quruqlikda yashay oladi?",
      a: ["Baliqlar", "Suvda ham quruqlikda yashovchilar (amfibiyalar)", "Sutemizuvchilar", "Qushlar"],
      correct: 1
    }
  ];

  const handleAnswer = (index: number) => {
    if (index === quizQuestions[currentQuestion].correct) {
      setScore(score + 1);
    }
    if (currentQuestion + 1 < quizQuestions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-8">
        <button onClick={onBack} className="flex items-center gap-2 text-slate-600 hover:text-red-600 transition-colors font-medium">
          <ArrowLeft size={20} /> Orqaga qaytish
        </button>
      </div>

      <div className="mb-12">
        <div className="flex items-center gap-4 mb-4">
          <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">4-sinf • 3-bob</span>
          <h1 className="text-4xl font-extrabold text-slate-900">Hayvonlar dunyosi</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center text-red-500">
                  <Play size={16} fill="currentColor" />
                </div>
                <div>
                  <h3 className="text-white text-sm font-bold">1-video: Hayvonlar hayoti</h3>
                </div>
              </div>
            </div>
            <div className="aspect-video w-full">
              <iframe 
                className="w-full h-full"
                src="https://drive.google.com/file/d/1B-64VB6yF7XvYu-L7bP9IF8RD2BsW_in/preview" 
                title="Hayvonlar dars videosi 1"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen
              ></iframe>
            </div>
          </div>

          <div className="bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center text-red-500">
                  <Play size={16} fill="currentColor" />
                </div>
                <div>
                  <h3 className="text-white text-sm font-bold">2-video: Hayvonlar tasnifi</h3>
                </div>
              </div>
            </div>
            <div className="aspect-video w-full">
              <iframe 
                className="w-full h-full"
                src="https://drive.google.com/file/d/1TUGXSznM_3HNx98URQB1Nr1aSStF_5HA/preview" 
                title="Hayvonlar dars videosi 2"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm mb-12">
          <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <Sparkles className="text-red-500" /> Hayvonlar haqida qiziqarli faktlar
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "Hayvonlar o'z ozuqasini tayyorlay olmaydi",
              "Dunyodagi eng katta hayvon - Ko'k kit",
              "Gepard dunyodagi eng tezkor quruqlik hayvoni",
              "Ba'zi hayvonlar qishki uyquga ketadi",
              "Hayvonlar bir-biri bilan turli tovushlar orqali muloqot qiladi",
              "Har bir hayvonning tabiatda o'z o'rni bor"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 p-4 bg-red-50/50 rounded-2xl border border-red-100/50">
                <div className="w-8 h-8 bg-red-100 text-red-600 rounded-xl flex items-center justify-center flex-shrink-0 font-bold text-sm">
                  {i + 1}
                </div>
                <p className="text-slate-700 font-medium">{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Image Gallery Section */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm mb-12">
          <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <Sparkles className="text-red-500" /> Foydalanish uchun rasmlar
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              "1VEAaTXPyiNQJ_7zEyQUL2Tn64zewiry8",
              "1l3IJOpZG4xFsYBjbsjFWOanjg81o4nq5",
              "1HZYeCKtQNSpbxIjXRqrOarkH6aqZ-o9g",
              "1j3qwgHYbVC45GFIku9r01Qc5JjZUvcVi",
              "1RA9txkStohX616DddKATvHXGFLtnyZuU",
              "19rNVD1flPCPE1dEVDq_5TMIHApB8ZgZf"
            ].map((id, i) => (
              <div key={i} className="group relative aspect-square rounded-2xl overflow-hidden border-2 border-slate-100 hover:border-red-500 transition-all shadow-sm">
                <img 
                  src={`https://lh3.googleusercontent.com/d/${id}`} 
                  alt={`Hayvon rasmi ${i + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <a 
                    href={`https://drive.google.com/file/d/${id}/view?usp=sharing`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white/20 backdrop-blur-md text-white p-2 rounded-full hover:bg-white/40 transition-colors"
                    title="Kattaroq ko'rish"
                  >
                    <ChevronRight size={20} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Bob haqida qisqacha</h2>
            <p className="text-slate-600 leading-relaxed mb-8">
              Hayvonlar dunyosi juda rang-barang va qiziqarli. Ushbu bobda siz hayvonlarning turlari, 
              ularning yashash tarzi, oziqlanishi va tabiatdagi ahamiyati haqida batafsil ma'lumot olasiz.
            </p>

            <div className="bg-red-50 rounded-2xl p-6 border border-red-100 flex flex-col sm:flex-row items-center gap-6">
              <div className="w-20 h-28 bg-white rounded-lg shadow-md overflow-hidden flex-shrink-0 border-2 border-white">
                <img 
                  src="https://lh3.googleusercontent.com/d/1S5CqQZBtZ_hV80Wqq7luS3pMGLeNqLZQ" 
                  alt="4-sinf 3-bob darslik" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h4 className="font-bold text-slate-800 mb-2">3-bob: Hayvonlar (Darslik)</h4>
                <p className="text-sm text-slate-500 mb-4">Mavzu bo'yicha darslikning PDF variantini o'qing va yuklab oling.</p>
                <a 
                  href="https://drive.google.com/file/d/1S5CqQZBtZ_hV80Wqq7luS3pMGLeNqLZQ/view?usp=sharing" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-2 rounded-xl font-bold text-sm hover:bg-red-700 transition-all shadow-md shadow-red-100"
                >
                  <BookOpen size={18} /> Darslikni ochish
                </a>
              </div>
            </div>
          </div>

          {/* Quiz Section */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-full -mr-16 -mt-16 z-0"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center">
                  <BrainCircuit size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-800">Bilimingizni sinang</h2>
                  <p className="text-slate-500 text-sm">Hayvonlar haqida nimalarni bilasiz?</p>
                </div>
              </div>

              {!quizStarted ? (
                <div className="py-10 text-center">
                  <h3 className="text-xl font-bold text-slate-800 mb-4">Tayyormisiz?</h3>
                  <p className="text-slate-500 mb-8 max-w-md mx-auto">
                    5 ta savol orqali hayvonlar dunyosi haqidagi bilimlaringizni tekshiring.
                  </p>
                  <button 
                    onClick={() => setQuizStarted(true)}
                    className="bg-red-600 text-white px-10 py-4 rounded-2xl font-bold hover:bg-red-700 transition-all shadow-lg shadow-red-100"
                  >
                    Testni boshlash
                  </button>
                </div>
              ) : showResult ? (
                <div className="py-10 text-center">
                  <div className="w-20 h-20 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 size={40} />
                  </div>
                  <h3 className="text-3xl font-bold text-slate-800 mb-2">Sizning natijangiz: {score}/5</h3>
                  <p className="text-slate-500 mb-8">
                    {score === 5 ? "Ajoyib! Siz hayvonlar bo'yicha mutaxassissiz!" : 
                     score >= 3 ? "Yaxshi! Hayvonlar haqida ko'p narsa bilasiz." : 
                     "Mavzuni yana bir bor ko'rib chiqing."}
                  </p>
                  <button 
                    onClick={() => { setQuizStarted(false); setShowResult(false); setCurrentQuestion(0); setScore(0); }}
                    className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-800 transition-all"
                  >
                    Qayta topshirish
                  </button>
                </div>
              ) : (
                <div className="space-y-8">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-red-600 uppercase tracking-widest">Savol {currentQuestion + 1}</span>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className={`h-1.5 w-8 rounded-full ${i <= currentQuestion ? 'bg-red-500' : 'bg-slate-100'}`}></div>
                      ))}
                    </div>
                  </div>
                  
                  <h4 className="text-xl font-bold text-slate-800 leading-tight">
                    {quizQuestions[currentQuestion].q}
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {quizQuestions[currentQuestion].a.map((ans, idx) => (
                      <button 
                        key={idx}
                        onClick={() => handleAnswer(idx)}
                        className="w-full text-left px-6 py-4 rounded-2xl border-2 border-slate-100 hover:border-red-500 hover:bg-red-50 transition-all group"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-8 h-8 rounded-lg bg-slate-50 text-slate-400 group-hover:bg-red-500 group-hover:text-white flex items-center justify-center font-bold transition-colors">
                            {String.fromCharCode(65 + idx)}
                          </div>
                          <span className="text-slate-700 font-medium group-hover:text-red-900">{ans}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-red-50 p-8 rounded-3xl border border-red-100 sticky top-24">
            <h3 className="text-xl font-bold text-red-900 mb-4 flex items-center gap-2">
              <BrainCircuit size={20} /> Zoolog maslahati
            </h3>
            <p className="text-red-800/80 text-sm leading-relaxed mb-6">
              Hayvonlarni asrang! Ular tabiatning ajralmas qismi. Har bir hayvon o'ziga xos xususiyatlarga ega va ularni o'rganish juda qiziqarli.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const HumanStructureGrade4ChapterDetail = ({ onBack, onPlayGame }: { onBack: () => void, onPlayGame: (url: string) => void }) => {
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const quizQuestions = [
    {
      q: "Odam tanasining asosiy tayanchi nima?",
      a: ["Mushaklar", "Skelet (suyaklar)", "Teri", "Yurak"],
      correct: 1
    },
    {
      q: "Qaysi organ qonni butun tana bo'ylab haydaydi?",
      a: ["O'pka", "Miya", "Yurak", "Oshqozon"],
      correct: 2
    },
    {
      q: "Nafas olganda havo qayerga boradi?",
      a: ["Oshqozonga", "Yurakka", "O'pkaga", "Buyraklarga"],
      correct: 2
    },
    {
      q: "Ovqat hazm qilish qayerdan boshlanadi?",
      a: ["Oshqozondan", "Og'iz bo'shlig'idan", "Ichakdan", "Qizilo'ngachdan"],
      correct: 1
    },
    {
      q: "Tanamizni boshqaradigan 'markaz' qaysi?",
      a: ["Yurak", "Miya", "Jigar", "O'pka"],
      correct: 1
    }
  ];

  const handleAnswer = (index: number) => {
    if (index === quizQuestions[currentQuestion].correct) {
      setScore(score + 1);
    }
    if (currentQuestion + 1 < quizQuestions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-8">
        <button onClick={onBack} className="flex items-center gap-2 text-slate-600 hover:text-pink-600 transition-colors font-medium">
          <ArrowLeft size={20} /> Orqaga qaytish
        </button>
      </div>

      <div className="mb-12">
        <div className="flex items-center gap-4 mb-4">
          <span className="bg-pink-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">4-sinf • 4-bob</span>
          <h1 className="text-4xl font-extrabold text-slate-900">Odamning tuzilishi</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <div className="bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-pink-500/20 rounded-lg flex items-center justify-center text-pink-500">
                  <Play size={16} fill="currentColor" />
                </div>
                <div>
                  <h3 className="text-white text-sm font-bold">1-video: Odamning tuzilishi</h3>
                </div>
              </div>
            </div>
            <div className="aspect-video w-full">
              <iframe 
                className="w-full h-full"
                src="https://drive.google.com/file/d/1jILYzDIInhlRDd5tHECJozHh4eWdIkp4/preview" 
                title="Odamning tuzilishi dars videosi 1"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen
              ></iframe>
            </div>
          </div>

          <div className="bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-pink-500/20 rounded-lg flex items-center justify-center text-pink-500">
                  <Play size={16} fill="currentColor" />
                </div>
                <div>
                  <h3 className="text-white text-sm font-bold">2-video: Tana a'zolari</h3>
                </div>
              </div>
            </div>
            <div className="aspect-video w-full">
              <iframe 
                className="w-full h-full"
                src="https://drive.google.com/file/d/10-pBZhmxJAy2DpusTRxc9PsqZwjoA_oX/preview" 
                title="Odamning tuzilishi dars videosi 2"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen
              ></iframe>
            </div>
          </div>

          <div className="bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-pink-500/20 rounded-lg flex items-center justify-center text-pink-500">
                  <Play size={16} fill="currentColor" />
                </div>
                <div>
                  <h3 className="text-white text-sm font-bold">3-video: Odamning tuzilishi</h3>
                </div>
              </div>
            </div>
            <div className="aspect-video w-full">
              <iframe 
                className="w-full h-full"
                src="https://drive.google.com/file/d/1Rvs0egAjR1Wp3WZ9aa1rR43suiP4982m/preview" 
                title="Odamning tuzilishi dars videosi 3"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm mb-12">
          <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Sparkles className="text-pink-500" /> Qiziqarli faktlar
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-slate-600">
                <div className="w-1.5 h-1.5 rounded-full bg-pink-500 mt-2 flex-shrink-0"></div>
                <span>Odam skeleti 206 ta suyakdan iborat.</span>
              </li>
              <li className="flex items-start gap-3 text-slate-600">
                <div className="w-1.5 h-1.5 rounded-full bg-pink-500 mt-2 flex-shrink-0"></div>
                <span>Yurak bir kunda taxminan 100 000 marta uradi.</span>
              </li>
            </ul>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-slate-600">
                <div className="w-1.5 h-1.5 rounded-full bg-pink-500 mt-2 flex-shrink-0"></div>
                <span>Miya tanamizdagi barcha jarayonlarni boshqaradi.</span>
              </li>
              <li className="flex items-start gap-3 text-slate-600">
                <div className="w-1.5 h-1.5 rounded-full bg-pink-500 mt-2 flex-shrink-0"></div>
                <span>O'pka bizga nafas olish uchun kerak.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Interactive Game Section */}
        <div className="bg-pink-600 rounded-[2.5rem] p-8 text-white shadow-2xl mb-12 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full -ml-32 -mb-32 blur-3xl"></div>
          <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-3xl flex items-center justify-center flex-shrink-0 border border-white/20">
            <Gamepad2 size={40} className="text-white" />
          </div>
          <div className="flex-1 text-center md:text-left relative z-10">
            <div className="flex items-center gap-2 mb-2 justify-center md:justify-start">
              <span className="bg-white/20 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider border border-white/20">YANGI O'YIN</span>
              <h3 className="text-2xl font-bold">Interaktiv O'yin: Odamning tuzilishi</h3>
            </div>
            <p className="text-pink-50/90 text-lg">
              Odam tanasi va uning a'zolari haqidagi bilimlaringizni o'yin orqali mustahkamlang!
            </p>
          </div>
          <div className="flex flex-wrap gap-4 relative z-10">
            <button 
              onClick={() => onPlayGame("https://drive.google.com/file/d/1B7UWPF_x0B2quKreUZSQaGXjDqkXr4n0/preview")}
              className="bg-white text-pink-700 px-8 py-4 rounded-2xl font-bold hover:bg-pink-50 transition-all shadow-xl flex items-center gap-3 whitespace-nowrap border border-pink-400/30"
            >
              O'ynash <Play size={20} />
            </button>
            <a 
              href="https://drive.google.com/uc?export=download&id=1B7UWPF_x0B2quKreUZSQaGXjDqkXr4n0"
              download="odamning-tuzilishi.html"
              className="bg-pink-700 text-white px-8 py-4 rounded-2xl font-bold hover:bg-pink-800 transition-all shadow-xl flex items-center gap-3 whitespace-nowrap border border-pink-400/30"
            >
              Yuklab olish <Download size={20} />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-800 mb-6">Bob haqida qisqacha</h2>
              <p className="text-slate-600 leading-relaxed mb-8">
                Odam tanasi juda murakkab va mukammal tuzilgan. Ushbu bobda biz tanamiz qanday ishlashini, 
                ichki organlarimizning vazifalarini va sog'lom bo'lish uchun nimalar qilish kerakligini o'rganamiz.
              </p>

              <div className="bg-pink-50 rounded-2xl p-6 border border-pink-100 flex flex-col sm:flex-row items-center gap-6">
                <div className="w-20 h-28 bg-white rounded-lg shadow-md overflow-hidden flex-shrink-0 border-2 border-white">
                  <img 
                    src="https://lh3.googleusercontent.com/d/1dh1TH2p1nPbDV4v9i0h6hI966GuYBvkF" 
                    alt="4-sinf 4-bob darslik" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <h4 className="font-bold text-slate-800 mb-2">4-bob: Odamning tuzilishi (Darslik)</h4>
                  <p className="text-sm text-slate-500 mb-4">Mavzu bo'yicha darslikning PDF variantini o'qing va yuklab oling.</p>
                  <a 
                    href="https://drive.google.com/file/d/1dh1TH2p1nPbDV4v9i0h6hI966GuYBvkF/view?usp=sharing" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-pink-600 text-white px-6 py-2 rounded-xl font-bold text-sm hover:bg-pink-700 transition-all shadow-md shadow-pink-100"
                  >
                    <BookOpen size={18} /> Darslikni ochish
                  </a>
                </div>
              </div>
            </div>

            {/* Quiz Section */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-pink-50 rounded-full -mr-16 -mt-16 z-0"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 bg-pink-100 text-pink-600 rounded-2xl flex items-center justify-center">
                    <BrainCircuit size={24} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-800">Bilimingizni sinang</h2>
                    <p className="text-slate-500 text-sm">Odam tanasi haqida nimalarni bilasiz?</p>
                  </div>
                </div>

                {!quizStarted ? (
                  <div className="py-10 text-center">
                    <h3 className="text-xl font-bold text-slate-800 mb-4">Tayyormisiz?</h3>
                    <p className="text-slate-500 mb-8 max-w-md mx-auto">
                      5 ta savol orqali odamning tuzilishi haqidagi bilimlaringizni tekshiring.
                    </p>
                    <button 
                      onClick={() => setQuizStarted(true)}
                      className="bg-pink-600 text-white px-10 py-4 rounded-2xl font-bold hover:bg-pink-700 transition-all shadow-lg shadow-pink-100"
                    >
                      Testni boshlash
                    </button>
                  </div>
                ) : showResult ? (
                  <div className="py-10 text-center">
                    <div className="w-20 h-20 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 size={40} />
                    </div>
                    <h3 className="text-3xl font-bold text-slate-800 mb-2">Sizning natijangiz: {score}/5</h3>
                    <p className="text-slate-500 mb-8">
                      {score === 5 ? "Ajoyib! Siz odam anatomiyasi bo'yicha mutaxassissiz!" : 
                       score >= 3 ? "Yaxshi! Odam tanasi haqida ko'p narsa bilasiz." : 
                       "Mavzuni yana bir bor ko'rib chiqing."}
                    </p>
                    <button 
                      onClick={() => { setQuizStarted(false); setShowResult(false); setCurrentQuestion(0); setScore(0); }}
                      className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-800 transition-all"
                    >
                      Qayta topshirish
                    </button>
                  </div>
                ) : (
                  <div className="space-y-8">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-bold text-pink-600 uppercase tracking-widest">Savol {currentQuestion + 1}</span>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className={`h-1.5 w-8 rounded-full ${i <= currentQuestion ? 'bg-pink-500' : 'bg-slate-100'}`}></div>
                        ))}
                      </div>
                    </div>
                    
                    <h4 className="text-xl font-bold text-slate-800 leading-tight">
                      {quizQuestions[currentQuestion].q}
                    </h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {quizQuestions[currentQuestion].a.map((ans, idx) => (
                        <button 
                          key={idx}
                          onClick={() => handleAnswer(idx)}
                          className="w-full text-left px-6 py-4 rounded-2xl border-2 border-slate-100 hover:border-pink-500 hover:bg-pink-50 transition-all group"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-8 h-8 rounded-lg bg-slate-50 text-slate-400 group-hover:bg-pink-500 group-hover:text-white flex items-center justify-center font-bold transition-colors">
                              {String.fromCharCode(65 + idx)}
                            </div>
                            <span className="text-slate-700 font-medium group-hover:text-pink-900">{ans}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-pink-50 p-8 rounded-3xl border border-pink-100 sticky top-24">
              <h3 className="text-xl font-bold text-pink-900 mb-4 flex items-center gap-2">
                <HeartPulse size={20} /> Shifokor maslahati
              </h3>
              <p className="text-pink-800/80 text-sm leading-relaxed mb-6">
                Sog'lom bo'lish uchun to'g'ri ovqatlaning, ko'p harakat qiling va vaqtida dam oling. 
                Tanamiz bizning eng katta boyligimizdir!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const EarthSpaceGrade4ChapterDetail = ({ onBack, onPlayGame }: { onBack: () => void, onPlayGame: (url: string) => void }) => {
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const quizQuestions = [
    {
      q: "Quyosh tizimida nechta sayyora bor?",
      a: ["7 ta", "8 ta", "9 ta", "10 ta"],
      correct: 1
    },
    {
      q: "Yerga eng yaqin yulduz qaysi?",
      a: ["Sirius", "Qutb yulduzi", "Quyosh", "Vega"],
      correct: 2
    },
    {
      q: "Yer o'z o'qi atrofida bir marta aylanishi uchun qancha vaqt ketadi?",
      a: ["1 yil", "1 oy", "24 soat", "12 soat"],
      correct: 2
    },
    {
      q: "Oy nima?",
      a: ["Sayyora", "Yulduz", "Yerning tabiiy yo'ldoshi", "Kometaning bir qismi"],
      correct: 2
    },
    {
      q: "Quyosh tizimidagi eng katta sayyora qaysi?",
      a: ["Mars", "Venera", "Yupiter", "Saturn"],
      correct: 2
    }
  ];

  const handleAnswer = (index: number) => {
    if (index === quizQuestions[currentQuestion].correct) {
      setScore(score + 1);
    }
    if (currentQuestion + 1 < quizQuestions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-8">
        <button onClick={onBack} className="flex items-center gap-2 text-slate-600 hover:text-purple-600 transition-colors font-medium">
          <ArrowLeft size={20} /> Orqaga qaytish
        </button>
      </div>

      <div className="mb-12">
        <div className="flex items-center gap-4 mb-4">
          <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">4-sinf • 5-bob</span>
          <h1 className="text-4xl font-extrabold text-slate-900">Yer va koinot</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/50">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center text-purple-500">
                    <Play size={16} fill="currentColor" />
                  </div>
                  <div>
                    <h3 className="text-white text-sm font-bold">Koinot va Yer haqida qiziqarli ma'lumotlar</h3>
                  </div>
                </div>
              </div>
              <div className="aspect-video w-full">
                <iframe 
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/dbwPYHTWgrY" 
                  title="Koinot va Yer haqida qiziqarli ma'lumotlar"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  allowFullScreen
                ></iframe>
              </div>
            </div>

            <div className="bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/50">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center text-purple-500">
                    <Play size={16} fill="currentColor" />
                  </div>
                  <div>
                    <h3 className="text-white text-sm font-bold">Quyosh tizimi va sayyoralar</h3>
                  </div>
                </div>
              </div>
              <div className="aspect-video w-full">
                <iframe 
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/vhkNqymUkMY" 
                  title="Quyosh tizimi va sayyoralar"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
            <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Sparkles className="text-purple-500" /> Qiziqarli faktlar
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-slate-600">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2 flex-shrink-0"></div>
                <span>Quyosh tizimidagi barcha sayyoralar Quyosh atrofida aylanadi.</span>
              </li>
              <li className="flex items-start gap-3 text-slate-600">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2 flex-shrink-0"></div>
                <span>Yer Quyoshdan uzoqligi bo'yinta uchinchi sayyora hisoblanadi.</span>
              </li>
              <li className="flex items-start gap-3 text-slate-600">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2 flex-shrink-0"></div>
                <span>Oy Yerning yagona tabiiy yo'ldoshidir.</span>
              </li>
              <li className="flex items-start gap-3 text-slate-600">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2 flex-shrink-0"></div>
                <span>Yulduzlar juda uzoqda bo'lgani uchun kichik ko'rinadi.</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-800 mb-6">Bob haqida qisqacha</h2>
              <p className="text-slate-600 leading-relaxed mb-8">
                Koinot cheksiz va sirlarga boy. Ushbu bobda biz Yerning koinotdagi o'rnini, 
                Quyosh tizimidagi sayyoralarni va tungi osmondagi yulduzlarni o'rganamiz.
              </p>
            </div>

            {/* Interactive Games Section */}
            <div className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl group-hover:bg-white/20 transition-colors duration-700"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-400/10 rounded-full -ml-32 -mb-32 blur-3xl"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/30 shadow-inner">
                    <Gamepad2 size={32} className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-black tracking-tight">Interaktiv o'yinlar</h2>
                    <p className="text-purple-100/80 font-medium">Mavzuni o'yin orqali mustahkamlang</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 hover:bg-white/15 transition-all group/card">
                    <div className="w-full aspect-video rounded-2xl bg-white/5 mb-6 overflow-hidden relative">
                      <img 
                        src="https://picsum.photos/seed/space-game/800/450" 
                        alt="Koinot sirlari o'yini"
                        className="w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity flex items-end p-6">
                        <span className="text-sm font-bold">Koinot sirlari</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-black mb-3 tracking-tight">Koinot sirlari</h3>
                    <p className="text-purple-100/70 text-sm leading-relaxed mb-6">
                      Quyosh tizimi va sayyoralar haqidagi bilimlaringizni sinab ko'ring.
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <button 
                        onClick={() => onPlayGame("https://drive.google.com/file/d/1A1uVFnasDeuTUB-2g9_97XpTbjupgOK2/preview")}
                        className="bg-white text-purple-700 px-8 py-4 rounded-2xl font-black hover:bg-purple-50 transition-all shadow-xl shadow-purple-900/20 flex items-center gap-3"
                      >
                        <Play size={20} />
                        O'YNASH
                      </button>
                      <a 
                        href="https://drive.google.com/uc?export=download&id=1A1uVFnasDeuTUB-2g9_97XpTbjupgOK2" 
                        download="yer-va-koinot-oyini.html"
                        className="inline-flex items-center gap-3 bg-purple-500 text-white px-8 py-4 rounded-2xl font-black hover:bg-purple-600 transition-all shadow-xl shadow-purple-900/20 group/btn"
                      >
                        <Download size={20} className="group-hover/btn:translate-y-1 transition-transform" />
                        YUKLAB OLISH
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quiz Section */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-50 rounded-full -mr-16 -mt-16 z-0"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center">
                    <BrainCircuit size={24} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-800">Bilimingizni sinang</h2>
                    <p className="text-slate-500 text-sm">Koinot haqida nimalarni bilasiz?</p>
                  </div>
                </div>

                {!quizStarted ? (
                  <div className="py-10 text-center">
                    <h3 className="text-xl font-bold text-slate-800 mb-4">Tayyormisiz?</h3>
                    <p className="text-slate-500 mb-8 max-w-md mx-auto">
                      5 ta savol orqali koinot haqidagi bilimlaringizni tekshiring.
                    </p>
                    <button 
                      onClick={() => setQuizStarted(true)}
                      className="bg-purple-600 text-white px-10 py-4 rounded-2xl font-bold hover:bg-purple-700 transition-all shadow-lg shadow-purple-100"
                    >
                      Testni boshlash
                    </button>
                  </div>
                ) : showResult ? (
                  <div className="py-10 text-center">
                    <div className="w-20 h-20 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 size={40} />
                    </div>
                    <h3 className="text-3xl font-bold text-slate-800 mb-2">Sizning natijangiz: {score}/5</h3>
                    <p className="text-slate-500 mb-8">
                      {score === 5 ? "Ajoyib! Siz koinot bilimdonisiz!" : 
                       score >= 3 ? "Yaxshi! Koinot haqida ko'p narsa bilasiz." : 
                       "Mavzuni yana bir bor ko'rib chiqing."}
                    </p>
                    <button 
                      onClick={() => { setQuizStarted(false); setShowResult(false); setCurrentQuestion(0); setScore(0); }}
                      className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-800 transition-all"
                    >
                      Qayta topshirish
                    </button>
                  </div>
                ) : (
                  <div className="space-y-8">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-bold text-purple-600 uppercase tracking-widest">Savol {currentQuestion + 1}</span>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className={`h-1.5 w-8 rounded-full ${i <= currentQuestion ? 'bg-purple-500' : 'bg-slate-100'}`}></div>
                        ))}
                      </div>
                    </div>
                    
                    <h4 className="text-xl font-bold text-slate-800 leading-tight">
                      {quizQuestions[currentQuestion].q}
                    </h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {quizQuestions[currentQuestion].a.map((ans, idx) => (
                        <button 
                          key={idx}
                          onClick={() => handleAnswer(idx)}
                          className="w-full text-left px-6 py-4 rounded-2xl border-2 border-slate-100 hover:border-purple-500 hover:bg-purple-50 transition-all group"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-8 h-8 rounded-lg bg-slate-50 text-slate-400 group-hover:bg-purple-500 group-hover:text-white flex items-center justify-center font-bold transition-colors">
                              {String.fromCharCode(65 + idx)}
                            </div>
                            <span className="font-medium text-slate-700 group-hover:text-purple-700 transition-colors">{ans}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-3xl p-8 text-white shadow-xl">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <AlertCircle size={20} /> Muhim eslatma
              </h3>
              <p className="text-purple-100 text-sm leading-relaxed mb-6">
                Koinotni o'rganishda teleskoplar va kosmik kemalar katta yordam beradi. 
                Insoniyat doimo koinotni tadqiq qilishga intilib keladi.
              </p>
              <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
                <p className="text-xs font-medium text-purple-200 uppercase tracking-wider mb-2">Atama</p>
                <p className="text-sm font-bold italic">"Galaktika - bu milliardlab yulduzlar, gaz va changdan iborat ulkan tizimdir."</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ResearcherChapterDetail = ({ onBack, onPlayGame }: { onBack: () => void, onPlayGame: (url: string) => void }) => {
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const quizQuestions = [
    {
      q: "Tadqiqotchi birinchi navbatda nima qilishi kerak?",
      a: ["Xulosa chiqarish", "Kuzatish", "Tajriba o'tkazish", "Savol berish"],
      correct: 1
    },
    {
      q: "Ilmiy tadqiqotda faraz nima?",
      a: ["Aniq javob", "Taxminiy javob", "Tajriba natijasi", "Kitobdagi ma'lumot"],
      correct: 1
    },
    {
      q: "Kuzatish natijalarini qayerga qayd etish kerak?",
      a: ["Xotiraga", "Tadqiqotchi kundaligiga", "Hech qayerga", "Faqat rasmga olish kerak"],
      correct: 1
    },
    {
      q: "Tajriba o'tkazishdan maqsad nima?",
      a: ["Vaqt o'tkazish", "Farazni tekshirish", "Rasmga tushish", "O'yin o'ynash"],
      correct: 1
    },
    {
      q: "Tadqiqot yakunida nima qilinadi?",
      a: ["Yangi savol beriladi", "Xulosa chiqariladi", "Kuzatish boshlanadi", "Hammasi to'xtatiladi"],
      correct: 1
    }
  ];

  const handleAnswer = (index: number) => {
    if (index === quizQuestions[currentQuestion].correct) {
      setScore(score + 1);
    }
    if (currentQuestion + 1 < quizQuestions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-8">
        <button onClick={onBack} className="flex items-center gap-2 text-slate-600 hover:text-emerald-600 transition-colors font-medium">
          <ArrowLeft size={20} /> Orqaga qaytish
        </button>
      </div>

      <div className="mb-12">
        <div className="flex items-center gap-4 mb-4">
          <span className="bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-bold">1-BOB</span>
          <h1 className="text-4xl font-extrabold text-slate-900">Men tadqiqotchiman</h1>
        </div>
        <p className="text-xl text-slate-600 leading-relaxed mb-8">
          Atrof-olamni qanday o'rganishni, ilmiy tadqiqotlar o'tkazishni va haqiqiy tadqiqotchi bo'lishni o'rganamiz.
        </p>

        {/* Video Player Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-slate-900 rounded-3xl overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-900/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-500/20 text-indigo-500 rounded-xl flex items-center justify-center">
                  <Play size={20} fill="currentColor" />
                </div>
                <div>
                  <h3 className="text-white font-bold">1-dars: Tadqiqotchi bo'laman</h3>
                  <p className="text-slate-400 text-xs">Mavzuni vizual o'rganing</p>
                </div>
              </div>
            </div>
            <div className="aspect-video w-full">
              <iframe 
                className="w-full h-full"
                src="https://drive.google.com/file/d/1YlWqwXuTJV7HPvl8dFsBvR3EkhSy3odA/preview" 
                title="Men tadqiqotchiman dars 1" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen
              ></iframe>
            </div>
          </div>

          <div className="bg-slate-900 rounded-3xl overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-900/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-500/20 text-indigo-500 rounded-xl flex items-center justify-center">
                  <Play size={20} fill="currentColor" />
                </div>
                <div>
                  <h3 className="text-white font-bold">2-dars: Tadqiqot usullari</h3>
                  <p className="text-slate-400 text-xs">Qo'shimcha ma'lumotlar</p>
                </div>
              </div>
            </div>
            <div className="aspect-video w-full">
              <iframe 
                className="w-full h-full"
                src="https://drive.google.com/file/d/1Fd0ggJ_-xfCYydDbqKPSzoxx0SpQ8ItA/preview" 
                title="Men tadqiqotchiman dars 2" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm mb-12">
          <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <Sparkles className="text-indigo-500" /> Tadqiqotchi qoidalari
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "Diqqat bilan kuzating",
              "Har doim 'Nega?' deb savol bering",
              "Taxminlaringizni tekshirib ko'ring",
              "Natijalarni yozib boring",
              "Xulosa chiqarishni o'rganing",
              "Yangi bilimlarni ulashing"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100/50">
                <div className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0 font-bold text-sm">
                  {i + 1}
                </div>
                <p className="text-slate-700 font-medium">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Bob haqida qisqacha</h2>
            <p className="text-slate-600 leading-relaxed mb-8">
              Ushbu bobda siz tabiatni o'rganishning asosiy usullari bilan tanishasiz. 
              Kuzatish, tajriba, o'lchash va ma'lumotlarni tahlil qilish orqali dunyo sirlarini ochishni o'rganasiz.
            </p>

            <div className="bg-indigo-50 rounded-2xl p-6 border border-indigo-100 flex flex-col sm:flex-row items-center gap-6">
              <div className="w-20 h-28 bg-white rounded-lg shadow-md overflow-hidden flex-shrink-0 border-2 border-white">
                <img 
                  src="https://lh3.googleusercontent.com/d/1cEOc581CzJgyE7BvhoXR2Nr5dEvAvN9q" 
                  alt="4-sinf 1-bob darslik" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h4 className="font-bold text-slate-800 mb-2">1-bob: Men tadqiqotchiman (Darslik)</h4>
                <p className="text-sm text-slate-500 mb-4">Mavzu bo'yicha darslikning PDF variantini o'qing va yuklab oling.</p>
                <a 
                  href="https://drive.google.com/file/d/1cEOc581CzJgyE7BvhoXR2Nr5dEvAvN9q/view?usp=sharing" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-2 rounded-xl font-bold text-sm hover:bg-indigo-700 transition-all shadow-md shadow-indigo-100"
                >
                  <BookOpen size={18} /> Darslikni ochish
                </a>
              </div>
            </div>
          </div>

          {/* Quiz Section */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full -mr-16 -mt-16 z-0"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center">
                  <BrainCircuit size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-800">Bilimingizni sinang</h2>
                  <p className="text-slate-500 text-sm">Tadqiqotchi bo'lishga tayyormisiz?</p>
                </div>
              </div>

              {!quizStarted ? (
                <div className="py-10 text-center">
                  <h3 className="text-xl font-bold text-slate-800 mb-4">Tayyormisiz?</h3>
                  <p className="text-slate-500 mb-8 max-w-md mx-auto">
                    5 ta savol orqali tadqiqot usullari haqidagi bilimlaringizni tekshiring.
                  </p>
                  <button 
                    onClick={() => setQuizStarted(true)}
                    className="bg-indigo-600 text-white px-10 py-4 rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
                  >
                    Testni boshlash
                  </button>
                </div>
              ) : showResult ? (
                <div className="py-10 text-center">
                  <div className="w-20 h-20 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 size={40} />
                  </div>
                  <h3 className="text-3xl font-bold text-slate-800 mb-2">Sizning natijangiz: {score}/5</h3>
                  <p className="text-slate-500 mb-8">
                    {score === 5 ? "Ajoyib! Siz haqiqiy tadqiqotchisiz!" : 
                     score >= 3 ? "Yaxshi! Tadqiqot asoslarini bilasiz." : 
                     "Mavzuni yana bir bor ko'rib chiqing."}
                  </p>
                  <button 
                    onClick={() => { setQuizStarted(false); setShowResult(false); setCurrentQuestion(0); setScore(0); }}
                    className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-800 transition-all"
                  >
                    Qayta topshirish
                  </button>
                </div>
              ) : (
                <div className="space-y-8">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-indigo-600 uppercase tracking-widest">Savol {currentQuestion + 1}</span>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className={`h-1.5 w-8 rounded-full ${i <= currentQuestion ? 'bg-indigo-500' : 'bg-slate-100'}`}></div>
                      ))}
                    </div>
                  </div>
                  
                  <h4 className="text-xl font-bold text-slate-800 leading-tight">
                    {quizQuestions[currentQuestion].q}
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {quizQuestions[currentQuestion].a.map((ans, idx) => (
                      <button 
                        key={idx}
                        onClick={() => handleAnswer(idx)}
                        className="w-full text-left px-6 py-4 rounded-2xl border-2 border-slate-100 hover:border-indigo-500 hover:bg-indigo-50 transition-all group"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-8 h-8 rounded-lg bg-slate-50 text-slate-400 group-hover:bg-indigo-500 group-hover:text-white flex items-center justify-center font-bold transition-colors">
                            {String.fromCharCode(65 + idx)}
                          </div>
                          <span className="text-slate-700 font-medium group-hover:text-indigo-900">{ans}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-indigo-50 p-8 rounded-3xl border border-indigo-100 sticky top-24">
            <h3 className="text-xl font-bold text-indigo-900 mb-4 flex items-center gap-2">
              <BrainCircuit size={20} /> Tadqiqotchi maslahati
            </h3>
            <p className="text-indigo-800/80 text-sm leading-relaxed mb-6">
              Hech qachon savol berishdan to'xtamang. Atrofingizdagi har bir narsa o'z siriga ega. 
              Ularni o'rganish uchun faqatgina diqqat va qiziqish kerak!
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-white rounded-2xl border border-indigo-100">
                <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Play size={18} />
                </div>
                <div className="text-xs">
                  <p className="font-bold text-slate-800">Video darsni ko'ring</p>
                  <p className="text-slate-500">Tadqiqot usullarini o'rganing</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-emerald-50 p-8 rounded-3xl border border-emerald-100 mt-8">
            <h3 className="text-xl font-bold text-emerald-900 mb-4 flex items-center gap-2">
              <Gamepad2 size={20} /> Interaktiv o'yin
            </h3>
            <p className="text-emerald-800/80 text-sm leading-relaxed mb-6">
              Tadqiqotchi bo'lish qanchalik qiziqarli ekanligini ushbu o'yin orqali sinab ko'ring!
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => onPlayGame("https://drive.google.com/file/d/1Noy2OVlwFl1yLhjOcEMG3edd41VVr9h1/preview")}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-emerald-600 text-white px-6 py-4 rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-lg border border-emerald-500"
              >
                <Play size={20} /> O'ynash
              </button>
              <a 
                href="https://drive.google.com/uc?export=download&id=1Noy2OVlwFl1yLhjOcEMG3edd41VVr9h1"
                download="tadqiqotchi-oyini.html"
                className="flex-1 inline-flex items-center justify-center gap-2 bg-white text-emerald-600 px-6 py-4 rounded-2xl font-bold hover:bg-emerald-50 transition-all shadow-lg border border-emerald-200"
              >
                <Download size={20} /> Yuklab olish
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ClimateChapterDetail = ({ onBack, onPlayGame }: { onBack: () => void, onPlayGame: (url: string) => void }) => {
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const quizQuestions = [
    {
      q: "Ob-havoni o'rganadigan fan nima deb ataladi?",
      a: ["Biologiya", "Meteorologiya", "Geografiya", "Astronomiya"],
      correct: 1
    },
    {
      q: "Havo harorati nima bilan o'lchanadi?",
      a: ["Barometr", "Gigrometr", "Termometr", "Anemometr"],
      correct: 2
    },
    {
      q: "Yog'in turlariga nimalar kiradi?",
      a: ["Shamol va quyosh", "Yomg'ir, qor, do'l", "Tuman va bulut", "Issiq va sovuq"],
      correct: 1
    },
    {
      q: "Fasllar almashinishiga asosiy sabab nima?",
      a: ["Yerning o'z o'qi atrofida aylanishi", "Yerning Quyosh atrofida og'ma holda aylanishi", "Oyning harakati", "Bulutlarning ko'payishi"],
      correct: 1
    },
    {
      q: "Shamol nima?",
      a: ["Havoning gorizontal harakati", "Yomg'ir yog'ishi", "Quyosh nuri", "Bulutlarning to'planishi"],
      correct: 0
    }
  ];

  const handleAnswer = (index: number) => {
    if (index === quizQuestions[currentQuestion].correct) {
      setScore(score + 1);
    }
    if (currentQuestion + 1 < quizQuestions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-8">
        <button onClick={onBack} className="flex items-center gap-2 text-slate-600 hover:text-emerald-600 transition-colors font-medium">
          <ArrowLeft size={20} /> Orqaga qaytish
        </button>
      </div>

      <div className="mb-12">
        <div className="flex items-center gap-4 mb-4">
          <span className="bg-sky-600 text-white px-3 py-1 rounded-full text-xs font-bold">4-BOB</span>
          <h1 className="text-4xl font-extrabold text-slate-900">Iqlim va ob-havo</h1>
        </div>
        <p className="text-xl text-slate-600 leading-relaxed mb-8">
          Atmosfera hodisalari, fasllar va iqlim o'zgarishi haqida o'rganamiz. 
          Ob-havoning qanday shakllanishi va uning inson hayotidagi o'rni.
        </p>

        {/* Video Player Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-slate-900 rounded-3xl overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-900/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-sky-500/20 text-sky-500 rounded-xl flex items-center justify-center">
                  <Play size={20} fill="currentColor" />
                </div>
                <div>
                  <h3 className="text-white font-bold">1-dars: Iqlim va ob-havo</h3>
                  <p className="text-slate-400 text-xs">Mavzuni vizual o'rganing</p>
                </div>
              </div>
            </div>
            <div className="aspect-video w-full">
              <iframe 
                className="w-full h-full"
                src="https://www.youtube.com/embed/_4VcnnzvFWs" 
                title="Iqlim va ob-havo haqida dars 1" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen
              ></iframe>
            </div>
          </div>

          <div className="bg-slate-900 rounded-3xl overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-900/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-sky-500/20 text-sky-500 rounded-xl flex items-center justify-center">
                  <Play size={20} fill="currentColor" />
                </div>
                <div>
                  <h3 className="text-white font-bold">2-dars: Qo'shimcha ma'lumot</h3>
                  <p className="text-slate-400 text-xs">Mavzuni chuqurroq o'rganing</p>
                </div>
              </div>
            </div>
            <div className="aspect-video w-full">
              <iframe 
                className="w-full h-full"
                src="https://www.youtube.com/embed/EORjjodkUfg" 
                title="Iqlim va ob-havo haqida dars 2" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>

        {/* Interactive Game Section */}
        <div className="bg-sky-600 rounded-[2.5rem] p-8 text-white shadow-2xl mb-12 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full -ml-32 -mb-32 blur-3xl"></div>
          <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-3xl flex items-center justify-center flex-shrink-0 border border-white/20">
            <Gamepad2 size={40} className="text-white" />
          </div>
          <div className="flex-1 text-center md:text-left relative z-10">
            <div className="flex items-center gap-2 mb-2 justify-center md:justify-start">
              <span className="bg-white/20 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider border border-white/20">YANGI O'YIN</span>
              <h3 className="text-2xl font-bold">Interaktiv O'yin: Iqlim va Ob-havo</h3>
            </div>
            <p className="text-sky-50/90 text-lg">
              Ob-havo hodisalari va iqlim sirlarini o'yin orqali yanada qiziqarliroq o'rganing!
            </p>
          </div>
          <div className="flex flex-wrap gap-4 relative z-10">
            <button 
              onClick={() => onPlayGame("https://drive.google.com/file/d/1Wl_Sxu_ynPI4cy5EIQM140LhuId31gd4/preview")}
              className="bg-white text-sky-700 px-8 py-4 rounded-2xl font-bold hover:bg-sky-50 transition-all shadow-xl flex items-center gap-3 whitespace-nowrap border border-sky-400/30"
            >
              O'ynash <Play size={20} />
            </button>
            <a 
              href="https://drive.google.com/uc?export=download&id=1Wl_Sxu_ynPI4cy5EIQM140LhuId31gd4"
              download="iqlim-va-ob-havo.html"
              className="bg-sky-700 text-white px-8 py-4 rounded-2xl font-bold hover:bg-sky-800 transition-all shadow-xl flex items-center gap-3 whitespace-nowrap border border-sky-400/30"
            >
              Yuklab olish <Download size={20} />
            </a>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Bob haqida qisqacha</h2>
            <p className="text-slate-600 leading-relaxed mb-8">
              Ob-havo — bu atmosferaning ma'lum bir vaqtdagi holati. Iqlim esa ma'lum bir hudud uchun xos bo'lgan ko'p yillik ob-havo tartibidir. 
              Ushbu bobda biz shamol, yog'inlar, harorat va fasllar haqida batafsil to'xtalamiz.
            </p>
            
            <div className="bg-sky-50 rounded-2xl p-6 border border-sky-100 flex flex-col sm:flex-row items-center gap-6">
              <div className="w-20 h-28 bg-white rounded-lg shadow-md overflow-hidden flex-shrink-0 border-2 border-white">
                <img 
                  src="https://lh3.googleusercontent.com/d/1Md-yhdbnlo-5HKeC3OEr4IfVvcQZ0aYE" 
                  alt="4-bob darslik" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h4 className="font-bold text-slate-800 mb-2">4-bob: Iqlim va ob-havo (Darslik)</h4>
                <p className="text-sm text-slate-500 mb-4">Mavzu bo'yicha darslikning PDF variantini o'qing va yuklab oling.</p>
                <a 
                  href="https://drive.google.com/file/d/1Md-yhdbnlo-5HKeC3OEr4IfVvcQZ0aYE/view?usp=sharing" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-sky-600 text-white px-6 py-2 rounded-xl font-bold text-sm hover:bg-sky-700 transition-all shadow-md shadow-sky-100"
                >
                  <BookOpen size={18} /> Darslikni ochish
                </a>
              </div>
            </div>
          </div>

          {/* Ideal Quiz Section */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-sky-50 rounded-full -mr-16 -mt-16 z-0"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center">
                  <Gamepad2 size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-800">Ideal Test</h2>
                  <p className="text-slate-500 text-sm">Bilimingizni sinab ko'ring</p>
                </div>
              </div>

              {!quizStarted ? (
                <div className="py-10 text-center">
                  <h3 className="text-xl font-bold text-slate-800 mb-4">Tayyormisiz?</h3>
                  <p className="text-slate-500 mb-8 max-w-md mx-auto">
                    Ushbu test 5 ta savoldan iborat bo'lib, iqlim va ob-havo haqidagi bilimlaringizni tekshiradi.
                  </p>
                  <button 
                    onClick={() => setQuizStarted(true)}
                    className="bg-sky-600 text-white px-10 py-4 rounded-2xl font-bold hover:bg-sky-700 transition-all shadow-lg shadow-sky-100"
                  >
                    Testni boshlash
                  </button>
                </div>
              ) : showResult ? (
                <div className="py-10 text-center">
                  <div className="w-20 h-20 bg-sky-100 text-sky-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 size={40} />
                  </div>
                  <h3 className="text-3xl font-bold text-slate-800 mb-2">Sizning natijangiz: {score}/5</h3>
                  <p className="text-slate-500 mb-8">
                    {score === 5 ? "Ajoyib! Siz ob-havo bo'yicha mutaxassissiz!" : 
                     score >= 3 ? "Yaxshi natija! Bilimlaringizni yanada oshirishingiz mumkin." : 
                     "Mavzuni qaytadan o'rganib chiqish foydali bo'ladi."}
                  </p>
                  <button 
                    onClick={() => { setQuizStarted(false); setShowResult(false); setCurrentQuestion(0); setScore(0); }}
                    className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-800 transition-all"
                  >
                    Qayta topshirish
                  </button>
                </div>
              ) : (
                <div className="space-y-8">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-sky-600 uppercase tracking-widest">Savol {currentQuestion + 1}</span>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className={`h-1.5 w-8 rounded-full ${i <= currentQuestion ? 'bg-sky-500' : 'bg-slate-100'}`}></div>
                      ))}
                    </div>
                  </div>
                  
                  <h4 className="text-xl font-bold text-slate-800 leading-tight">
                    {quizQuestions[currentQuestion].q}
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {quizQuestions[currentQuestion].a.map((ans, idx) => (
                      <button 
                        key={idx}
                        onClick={() => handleAnswer(idx)}
                        className="w-full text-left px-6 py-4 rounded-2xl border-2 border-slate-100 hover:border-sky-500 hover:bg-sky-50 transition-all group"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-8 h-8 rounded-lg bg-slate-50 text-slate-400 group-hover:bg-sky-500 group-hover:text-white flex items-center justify-center font-bold transition-colors">
                            {String.fromCharCode(65 + idx)}
                          </div>
                          <span className="text-slate-700 font-medium group-hover:text-sky-900">{ans}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-sky-50 p-8 rounded-3xl border border-sky-100 sticky top-24">
            <h3 className="text-xl font-bold text-sky-900 mb-4 flex items-center gap-2">
              <BrainCircuit size={20} /> O'rganish bo'yicha maslahat
            </h3>
            <p className="text-sky-800/80 text-sm leading-relaxed mb-6">
              Ob-havo hodisalarini o'rganayotganda kundalik kuzatishlar olib boring. 
              Termometr va boshqa asboblar qanday ishlashini tushunishga harakat qiling.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-white rounded-2xl border border-sky-100">
                <div className="w-10 h-10 bg-sky-100 text-sky-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Play size={18} />
                </div>
                <div className="text-xs">
                  <p className="font-bold text-slate-800">Video darsni ko'ring</p>
                  <p className="text-slate-500">Atmosfera hodisalarini ko'ring</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white rounded-2xl border border-sky-100">
                <div className="w-10 h-10 bg-sky-100 text-sky-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <BookOpen size={18} />
                </div>
                <div className="text-xs">
                  <p className="font-bold text-slate-800">Darslikni o'qing</p>
                  <p className="text-slate-500">Nazariy bilimlarni oling</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AnimalsChapterDetail = ({ onBack, onPlayGame }: { onBack: () => void, onPlayGame: (url: string) => void }) => {
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<number | null>(null);

  const topics = [
    { id: 1, title: "Hayvonlar olami bilan tanishuv", desc: "Hayvonlarning xilma-xilligi va ularning tabiatdagi o'rni haqida umumiy tushuncha." },
    { id: 2, title: "Uy hayvonlari", desc: "Inson tomonidan xonakilashtirilgan va foyda keltiradigan hayvonlar (sigir, qo'y, ot)." },
    { id: 3, title: "Yovvoyi hayvonlar", desc: "Tabiatda mustaqil yashaydigan, o'zi uchun ozuqa va boshpana topadigan hayvonlar." },
    { id: 4, title: "Sutemizuvchilar", desc: "Bolalarini sut bilan boqadigan, issiq qonli hayvonlar guruhi." },
    { id: 5, title: "Qushlar", desc: "Tanasi pat bilan qoplangan, tuxum qo'yadigan va aksariyati ucha oladigan hayvonlar." },
    { id: 6, title: "Baliqlar", desc: "Suvda yashaydigan, jabra orqali nafas oladigan va suzgichlari yordamida harakatlanadigan hayvonlar." },
    { id: 7, title: "Sudralib yuruvchilar", desc: "Tanasi tangachalar bilan qoplangan, sovuq qonli hayvonlar (ilonlar, toshbaqalar)." },
    { id: 8, title: "Suvda ham quruqlikda yashovchilar", desc: "Hayotining bir qismini suvda, bir qismini quruqlikda o'tkazadigan hayvonlar (baqalar)." },
    { id: 9, title: "Hasharotlar", desc: "Eng ko'p tarqalgan hayvonlar guruhi, tanasi uch qismdan iborat va oltita oyog'i bor." },
    { id: 10, title: "Hayvonlarni asraylik", desc: "Tabiat muvozanatini saqlash uchun hayvonlarni himoya qilish va ularga g'amxo'rlik qilish." }
  ];

  const quizQuestions = [
    {
      q: "Qaysi hayvon sutemizuvchi hisoblanadi?",
      a: ["Fil", "Baliq", "Ilon", "Kapalak"],
      correct: 0
    },
    {
      q: "Qaysi hayvon suvda ham, quruqlikda ham yashay oladi?",
      a: ["Arslon", "Baqa", "Burgut", "Akula"],
      correct: 1
    },
    {
      q: "Qushlarning tanasi nima bilan qoplangan?",
      a: ["Jun", "Tangacha", "Pat", "Teri"],
      correct: 2
    },
    {
      q: "Eng katta sutemizuvchi hayvon qaysi?",
      a: ["Fil", "Jirafa", "Ko'k kit", "Begemot"],
      correct: 2
    },
    {
      q: "Hasharotlarning necha juft oyog'i bor?",
      a: ["2 juft", "3 juft", "4 juft", "5 juft"],
      correct: 1
    }
  ];

  const handleAnswer = (index: number) => {
    if (index === quizQuestions[currentQuestion].correct) {
      setScore(score + 1);
    }
    if (currentQuestion + 1 < quizQuestions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-8">
        <button onClick={onBack} className="flex items-center gap-2 text-slate-600 hover:text-emerald-600 transition-colors font-medium">
          <ArrowLeft size={20} /> Orqaga qaytish
        </button>
      </div>

      <div className="mb-12">
        <div className="flex items-center gap-4 mb-4">
          <span className="bg-emerald-600 text-white px-3 py-1 rounded-full text-xs font-bold">1-BOB</span>
          <h1 className="text-4xl font-extrabold text-slate-900">Hayvonlar</h1>
        </div>
        <p className="text-xl text-slate-600 leading-relaxed mb-8">
          Ushbu bobda biz hayvonlar olamining barcha sirlarini o'rganamiz. 
          Quyida darslikdagi dastlabki 10 ta mavzu keltirilgan.
        </p>

        {/* Video & Resources Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Video Player */}
          <div className="bg-slate-900 rounded-3xl overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-900/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-500/20 text-emerald-500 rounded-xl flex items-center justify-center">
                  <Play size={20} fill="currentColor" />
                </div>
                <div>
                  <h3 className="text-white font-bold">Video Dars: Hayvonlar Olami</h3>
                  <p className="text-slate-400 text-xs">Mavzuni vizual o'rganing</p>
                </div>
              </div>
            </div>
            <div className="aspect-video w-full">
              <iframe 
                className="w-full h-full"
                src="https://www.youtube.com/embed/_62bCHzdMrs" 
                title="Tabiiy Fanlar Dars" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen
              ></iframe>
            </div>
          </div>

          {/* Google Drive Resource */}
          <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-200 flex flex-col">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
                  <BookOpen size={20} />
                </div>
                <div>
                  <h3 className="text-slate-900 font-bold">Qo'shimcha darslar</h3>
                  <p className="text-slate-500 text-xs">3-sinf 1-bob materiallari</p>
                </div>
              </div>
            </div>
            <div className="flex-1 p-6 flex flex-col items-center justify-center text-center">
              <div className="w-full aspect-video rounded-2xl bg-slate-100 mb-6 overflow-hidden relative group">
                <img 
                  src="https://lh3.googleusercontent.com/d/1NMc7OQ0esMNstHQ9mDzQQy_P91LIHs3q" 
                  alt="Darslik materiali"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                   <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                      <ArrowLeft className="rotate-180 text-blue-600" size={32} />
                   </div>
                </div>
              </div>
              <h4 className="text-lg font-bold text-slate-800 mb-2">1-Bob: Hayvonlar (Darslar)</h4>
              <p className="text-slate-500 text-sm mb-6">Ushbu havola orqali bobga tegishli barcha dars materiallarini ko'rishingiz mumkin.</p>
              <a 
                href="https://drive.google.com/file/d/1NMc7OQ0esMNstHQ9mDzQQy_P91LIHs3q/view?usp=drive_link"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 flex items-center justify-center gap-2"
              >
                Materialni ochish <ChevronRight size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Teacher Resources Section */}
        <div className="bg-emerald-50 rounded-[2.5rem] p-8 border border-emerald-100 shadow-sm mb-12 flex flex-col md:flex-row items-center gap-8">
          <div className="w-20 h-20 bg-emerald-600 text-white rounded-3xl flex items-center justify-center shadow-lg shadow-emerald-200 flex-shrink-0">
            <Printer size={40} />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-2xl font-bold text-emerald-900 mb-2">O'qituvchilar uchun: Tarqatma materiallar</h3>
            <p className="text-emerald-800/70 text-lg">
              Darsda o'quvchilarga tarqatish va chiqarib foydalanish uchun mo'ljallangan maxsus materiallar to'plami.
            </p>
          </div>
          <a 
            href="https://drive.google.com/file/d/1Hw_7pKxeRugMnDlQ28Aowt6AY2u2tvrl/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-emerald-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200 flex items-center gap-3 whitespace-nowrap"
          >
            Materialni yuklash <ChevronRight size={20} />
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Bob haqida qisqacha</h2>
            <p className="text-slate-600 leading-relaxed">
              Hayvonlar olami juda xilma-xil. Ushbu bobda hayvonlarning turlari, ularning yashash muhiti va 
              tabiatdagi ahamiyati haqida o'rganamiz.
            </p>
          </div>

          {/* Ideal Quiz Section */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full -mr-16 -mt-16 z-0"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center">
                  <Gamepad2 size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-800">Ideal Test</h2>
                  <p className="text-slate-500 text-sm">Bilimingizni mustahkamlang</p>
                </div>
              </div>

              {!quizStarted ? (
                <div className="py-10 text-center">
                  <h3 className="text-xl font-bold text-slate-800 mb-4">Tayyormisiz?</h3>
                  <p className="text-slate-500 mb-8 max-w-md mx-auto">
                    Ushbu test 5 ta savoldan iborat bo'lib, hayvonlar olami haqidagi bilimlaringizni sinovdan o'tkazadi.
                  </p>
                  <button 
                    onClick={() => setQuizStarted(true)}
                    className="bg-emerald-600 text-white px-10 py-4 rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100"
                  >
                    Testni boshlash
                  </button>
                </div>
              ) : showResult ? (
                <div className="py-10 text-center">
                  <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 size={40} />
                  </div>
                  <h3 className="text-3xl font-bold text-slate-800 mb-2">Sizning natijangiz: {score}/5</h3>
                  <p className="text-slate-500 mb-8">
                    {score === 5 ? "Ajoyib! Siz haqiqiy hayvonlar bilimdonisiz!" : 
                     score >= 3 ? "Yaxshi natija! Bilimlaringizni yanada boyitishingiz mumkin." : 
                     "Yana bir bor darsni ko'rib chiqishni maslahat beramiz."}
                  </p>
                  <button 
                    onClick={() => { setQuizStarted(false); setShowResult(false); setCurrentQuestion(0); setScore(0); }}
                    className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-800 transition-all"
                  >
                    Qayta topshirish
                  </button>
                </div>
              ) : (
                <div className="space-y-8">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-emerald-600 uppercase tracking-widest">Savol {currentQuestion + 1}</span>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className={`h-1.5 w-8 rounded-full ${i <= currentQuestion ? 'bg-emerald-500' : 'bg-slate-100'}`}></div>
                      ))}
                    </div>
                  </div>
                  
                  <h4 className="text-xl font-bold text-slate-800 leading-tight">
                    {quizQuestions[currentQuestion].q}
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {quizQuestions[currentQuestion].a.map((ans, idx) => (
                      <button 
                        key={idx}
                        onClick={() => handleAnswer(idx)}
                        className="w-full text-left px-6 py-4 rounded-2xl border-2 border-slate-100 hover:border-emerald-500 hover:bg-emerald-50 transition-all group"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-8 h-8 rounded-lg bg-slate-50 text-slate-400 group-hover:bg-emerald-500 group-hover:text-white flex items-center justify-center font-bold transition-colors">
                            {String.fromCharCode(65 + idx)}
                          </div>
                          <span className="text-slate-700 font-medium group-hover:text-emerald-900">{ans}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-emerald-50 p-8 rounded-3xl border border-emerald-100 sticky top-24">
            <h3 className="text-xl font-bold text-emerald-900 mb-4 flex items-center gap-2">
              <BrainCircuit size={20} /> O'rganish bo'yicha maslahat
            </h3>
            <p className="text-emerald-800/80 text-sm leading-relaxed mb-6">
              Hayvonlarni o'rganayotganda ularning tashqi ko'rinishi, nima bilan oziqlanishi va qayerda yashashiga e'tibor bering. 
              Bu ularni guruhlarga ajratishda yordam beradi.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-white rounded-2xl border border-emerald-100">
                <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Play size={18} />
                </div>
                <div className="text-xs">
                  <p className="font-bold text-slate-800">Video darsni ko'ring</p>
                  <p className="text-slate-500">Vizual xotirani kuchaytiradi</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white rounded-2xl border border-emerald-100">
                <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <BookOpen size={18} />
                </div>
                <div className="text-xs">
                  <p className="font-bold text-slate-800">Materiallarni o'qing</p>
                  <p className="text-slate-500">Nazariy bilimlarni mustahkamlaydi</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Game Section */}
      <div className="mt-12 bg-gradient-to-r from-purple-600 to-indigo-700 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl group-hover:bg-white/20 transition-colors"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full -ml-32 -mb-32 blur-3xl"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full text-sm font-bold mb-6 backdrop-blur-md">
              <Sparkles size={16} /> YANGI O'YIN
            </div>
            <h2 className="text-4xl font-black mb-4 leading-tight">Hayvonlar olami: <br/>Qiziqarli Sarguzasht</h2>
            <p className="text-purple-100 text-lg mb-8 max-w-xl">
              Darsda o'rganganlaringizni o'yin orqali mustahkamlang! Ushbu interaktiv o'yin sizni hayvonlar dunyosiga sayohatga chorlaydi.
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => onPlayGame("https://drive.google.com/file/d/1qgwqWXQjtT7bEaXjGGlL7n3vazBoymo9/preview")}
                className="bg-white text-purple-700 px-10 py-4 rounded-2xl font-bold text-lg hover:bg-purple-50 transition-all shadow-xl flex items-center gap-3 border border-purple-200"
              >
                O'ynash <Play size={24} />
              </button>
              <a 
                href="https://drive.google.com/uc?export=download&id=1qgwqWXQjtT7bEaXjGGlL7n3vazBoymo9"
                download="hayvonlar-olami-oyini.html"
                className="bg-purple-800 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:bg-purple-900 transition-all shadow-xl flex items-center gap-3 border border-purple-400/30"
              >
                Yuklab olish <Download size={24} />
              </a>
              <div className="flex items-center gap-3 text-purple-200 text-sm">
                <div className="flex -space-x-2">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-purple-600 bg-purple-400 flex items-center justify-center text-[10px] font-bold">
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <span>+500 o'quvchi o'ynadi</span>
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-72 aspect-square bg-white/10 backdrop-blur-md rounded-[2rem] border border-white/20 p-4 flex items-center justify-center relative">
            <div className="absolute -top-4 -right-4 w-12 h-12 bg-yellow-400 text-slate-900 rounded-2xl flex items-center justify-center font-black rotate-12 shadow-lg">
              100%
            </div>
            <div className="text-center">
              <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-inner">
                <Trophy size={48} className="text-yellow-500" />
              </div>
              <p className="font-bold text-xl">Bilimdonlar</p>
              <p className="text-purple-200 text-sm">Reytingda qatnashing</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CellStructureDetail = ({ onBack }: { onBack: () => void }) => {
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const quizQuestions = [
    {
      q: "Hujayraning 'boshqaruv markazi' nima deb ataladi?",
      a: ["Sitoplazma", "Yadro", "Mitoz", "Membrana"],
      correct: 1
    },
    {
      q: "O'simlik hujayrasini hayvon hujayrasidan ajratib turuvchi asosiy belgi?",
      a: ["Yadro mavjudligi", "Hujayra devori va xloroplastlar", "Membrana", "Suv miqdori"],
      correct: 1
    },
    {
      q: "Energiya ishlab chiqaruvchi organoid nima?",
      a: ["Ribosoma", "Vakuola", "Mitoxondriya", "Lizosoma"],
      correct: 2
    }
  ];

  const handleAnswer = (index: number) => {
    if (index === quizQuestions[currentQuestion].correct) {
      setScore(score + 1);
    }
    if (currentQuestion + 1 < quizQuestions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-8">
        <button onClick={onBack} className="flex items-center gap-2 text-slate-600 hover:text-emerald-600 transition-colors font-medium">
          <ArrowLeft size={20} /> Orqaga qaytish
        </button>
        <button onClick={onBack} className="p-2 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors">
          <X size={20} className="text-slate-600" />
        </button>
      </div>

      <div className="mb-12">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Hujayra Tuzilishi</h1>
        <p className="text-xl text-slate-600 leading-relaxed">
          Hujayra — barcha tirik organizmlarning asosiy funksional va tarkibiy birligidir. 
          Xuddi g'ishtlardan bino qurilgani kabi, barcha o'simliklar va hayvonlar hujayralardan tashkil topgan.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-12">
          {/* Information Section */}
          <section className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <div className="w-8 h-8 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center"><BookOpen size={18} /></div>
              Asosiy qismlar
            </h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center font-bold">1</div>
                <div>
                  <h4 className="font-bold text-slate-800 text-lg">Hujayra membranasi</h4>
                  <p className="text-slate-600">Hujayrani tashqi muhitdan ajratib turadi va moddalar almashinuvini nazorat qiladi.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center font-bold">2</div>
                <div>
                  <h4 className="font-bold text-slate-800 text-lg">Sitoplazma</h4>
                  <p className="text-slate-600">Hujayra ichidagi yarim suyuq modda bo'lib, unda barcha organoidlar joylashgan.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-red-50 text-red-600 rounded-full flex items-center justify-center font-bold">3</div>
                <div>
                  <h4 className="font-bold text-slate-800 text-lg">Yadro</h4>
                  <p className="text-slate-600">Hujayraning genetik ma'lumotlarini (DNK) saqlaydi va barcha jarayonlarni boshqaradi.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Videos & Visuals Section */}
          <section className="bg-slate-900 rounded-3xl overflow-hidden shadow-xl text-white">
            <div className="p-8">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Play className="fill-current" size={24} /> Video dars
              </h2>
              <p className="text-slate-400 mb-6 text-sm">Hujayra ichidagi hayotni 3D formatda ko'ring.</p>
              <div className="aspect-video bg-slate-800 rounded-2xl flex flex-col items-center justify-center border border-slate-700 group cursor-pointer hover:bg-slate-700 transition-colors">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Play size={32} />
                </div>
                <span className="text-sm font-medium">Videoni tomosha qilish</span>
              </div>
            </div>
          </section>

          {/* Experiment Section */}
          <section className="bg-emerald-50 p-8 rounded-3xl border border-emerald-100">
            <h2 className="text-2xl font-bold text-emerald-900 mb-6 flex items-center gap-2">
              <Beaker size={24} /> Uy sharoitida tajriba
            </h2>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-emerald-50">
              <h4 className="font-bold text-slate-800 mb-3">Piyoz po'stlog'i hujayrasini ko'rish</h4>
              <ul className="space-y-3 text-slate-600">
                <li className="flex gap-2">
                  <span className="text-emerald-500 font-bold">•</span>
                  Piyozning ichki qismidan yupqa shaffof pardani ajratib oling.
                </li>
                <li className="flex gap-2">
                  <span className="text-emerald-500 font-bold">•</span>
                  Uni shisha ustiga qo'ying va bir tomchi yod (yoki suv) tomizing.
                </li>
                <li className="flex gap-2">
                  <span className="text-emerald-500 font-bold">•</span>
                  Mikroskop ostida kuzating. Siz to'rtburchak shakldagi, bir-biriga zich joylashgan hujayralarni ko'rasiz!
                </li>
              </ul>
            </div>
          </section>
        </div>

        {/* Quiz Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            {!quizStarted ? (
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <AlertCircle size={32} />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-4">Bilimingizni sinab ko'ring!</h3>
                <p className="text-slate-500 mb-8 text-sm">3 ta qisqa savol orqali mavzuni qanchalik tushunganingizni tekshiring.</p>
                <button 
                  onClick={() => setQuizStarted(true)}
                  className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-slate-800 transition-all"
                >
                  Testni boshlash
                </button>
              </div>
            ) : showResult ? (
              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">Natija: {score}/{quizQuestions.length}</h3>
                <p className="text-slate-500 mb-8">
                  {score === quizQuestions.length ? "Ajoyib! Siz hamma narsani bilasiz." : "Yaxshi natija! Yana bir bor o'qib ko'ring."}
                </p>
                <button 
                  onClick={() => {
                    setQuizStarted(false);
                    setShowResult(false);
                    setCurrentQuestion(0);
                    setScore(0);
                  }}
                  className="w-full bg-emerald-600 text-white py-3 rounded-xl font-bold hover:bg-emerald-700 transition-all"
                >
                  Qayta urinish
                </button>
              </div>
            ) : (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">Savol {currentQuestion + 1}</span>
                  <span className="text-xs text-slate-400">{currentQuestion + 1}/{quizQuestions.length}</span>
                </div>
                <h4 className="text-lg font-bold text-slate-800 mb-6">{quizQuestions[currentQuestion].q}</h4>
                <div className="space-y-3">
                  {quizQuestions[currentQuestion].a.map((ans, idx) => (
                    <button 
                      key={idx}
                      onClick={() => handleAnswer(idx)}
                      className="w-full text-left px-5 py-3 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50 transition-all text-sm text-slate-700 font-medium"
                    >
                      {ans}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Hero = ({ onStart }: { onStart: () => void }) => (
  <div className="relative overflow-hidden py-20 px-4">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-10">
       <div className="absolute top-10 left-10 w-64 h-64 bg-emerald-400 rounded-full blur-[100px]"></div>
       <div className="absolute bottom-10 right-10 w-64 h-64 bg-blue-400 rounded-full blur-[100px]"></div>
    </div>
    <div className="max-w-4xl mx-auto text-center">
      <span className="inline-block py-1 px-4 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold mb-6">
        Zamonaviy Ta'lim Platformasi
      </span>
      <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tight leading-none select-none">
        <motion.span 
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-block bg-gradient-to-r from-orange-500 via-rose-500 to-red-600 bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(239,68,68,0.15)] filter brightness-110"
        >
          Tabiiy Fanlar Olami
        </motion.span>
        <br />
        <motion.span 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="relative inline-block mt-4 bg-gradient-to-r from-emerald-400 via-cyan-400 via-sky-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent drop-shadow-[0_4px_15px_rgba(52,211,153,0.25)] font-extrabold text-3xl md:text-6xl py-2 animate-pulse-slow"
        >
          Sehrli Koinot va Hayot Mo'jizalari 🌟🧬
        </motion.span>
      </h1>
      
      <div className="flex justify-center mb-10">
        <img 
          src="https://lh3.googleusercontent.com/d/1FFiRYf1C845ilKgkHlesexTtSdJbKiAv" 
          alt="Tabiiy Fanlar Logotipi" 
          className="w-48 h-48 object-contain drop-shadow-2xl animate-pulse-slow"
          referrerPolicy="no-referrer"
        />
      </div>

      <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-2xl mx-auto">
        Koinot sirlarini, molekulalar tuzilishini va Yer sharini interaktiv usulda o'rganing. 
        AI yordamchimiz bilan savollaringizga soniyalar ichida javob oling.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <button 
          onClick={onStart}
          className="bg-emerald-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-emerald-700 shadow-lg shadow-emerald-200 transition-all flex items-center gap-2 group"
        >
          O'rganishni boshlash <BookOpen size={20} className="group-hover:animate-bounce" />
        </button>
      </div>
    </div>
  </div>
);

const ScienceTutor = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const history = messages.map(msg => ({
      role: msg.role,
      parts: [{ text: msg.text }]
    }));

    const responseText = await askScienceTutor(input, history);
    setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    setIsLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 h-[calc(100vh-120px)] flex flex-col">
      <div className="bg-white rounded-3xl shadow-xl border border-slate-200 flex flex-col h-full overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 bg-emerald-50 flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center text-white">
            <BrainCircuit size={20} />
          </div>
          <div>
            <h2 className="font-bold text-slate-800">AI Tabiiy Fanlar Ustozi</h2>
            <p className="text-xs text-emerald-600 font-medium">Online • Har doim yordamga tayyor</p>
          </div>
        </div>

        {/* Chat window */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/30">
          {messages.length === 0 && (
            <div className="text-center py-20">
              <div className="bg-white w-16 h-16 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center mx-auto mb-4 text-emerald-500">
                <MessageSquare size={32} />
              </div>
              <h3 className="text-lg font-bold text-slate-800">Savolingizni bering!</h3>
              <p className="text-slate-500 max-w-xs mx-auto">Masalan: "Nega osmon moviy?", "Fotosintez nima?", "Nyuton qonunlari haqida gapirib ber."</p>
            </div>
          )}
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] rounded-2xl px-5 py-3 ${
                msg.role === 'user' 
                  ? 'bg-emerald-600 text-white rounded-tr-none' 
                  : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none shadow-sm'
              }`}>
                <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white text-slate-400 border border-slate-200 rounded-2xl rounded-tl-none px-5 py-3 shadow-sm flex items-center gap-2">
                <Loader2 size={16} className="animate-spin" />
                <span>O'ylamoqdaman...</span>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-4 bg-white border-t border-slate-100">
          <div className="flex items-center gap-3 bg-slate-100 rounded-2xl p-2 focus-within:ring-2 ring-emerald-500 transition-all">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Fanlar haqida savol so'rang..."
              className="flex-1 bg-transparent border-none focus:outline-none px-3 text-slate-700"
            />
            <button 
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="bg-emerald-600 text-white p-3 rounded-xl hover:bg-emerald-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const TopicList = ({ onSelectTopic, selectedGrade, setSelectedGrade }: { 
  onSelectTopic: (id: string) => void, 
  selectedGrade: number, 
  setSelectedGrade: (grade: number) => void 
}) => {
  const topics: ScienceTopic[] = [
    { id: '8', title: 'Hayvonlar', description: 'Darslikning 1-bobi: Hayvonlar tasnifi va ularning yashash tarzi.', subject: Subject.BIOLOGY, icon: 'microscope', color: 'bg-red-500', grade: 3 },
    { id: '2', title: 'O\'simliklar', description: 'Darslikning 2-bobi: O\'simliklar dunyosi va ularning hayoti.', subject: Subject.BIOLOGY, icon: 'microscope', color: 'bg-green-500', grade: 3 },
    { id: '6', title: 'Yer sayyorasi', description: 'Darslikning 3-bobi: Yerning tuzilishi va uning xususiyatlari.', subject: Subject.GEOGRAPHY, icon: 'globe', color: 'bg-teal-500', grade: 3 },
    { id: '7', title: 'Iqlim va ob-havo', description: 'Darslikning 4-bobi: Atmosfera hodisalari va iqlim o\'zgarishi.', subject: Subject.GEOGRAPHY, icon: 'cloud-rain', color: 'bg-sky-500', grade: 3 },
    { id: '9', title: 'Men tadqiqotchiman', description: '4-sinf 1-bobi: Tadqiqot usullari va ilmiy izlanishlar haqida.', subject: Subject.BIOLOGY, icon: 'microscope', color: 'bg-indigo-500', grade: 4 },
    { id: '10', title: 'O\'simliklar', description: '4-sinf 2-bobi: O\'simliklar dunyosi, ularning tuzilishi va hayoti.', subject: Subject.BIOLOGY, icon: 'microscope', color: 'bg-green-600', grade: 4 },
    { id: '11', title: 'Hayvonlar', description: '4-sinf 3-bobi: Hayvonlar dunyosi, ularning tasnifi va hayoti.', subject: Subject.BIOLOGY, icon: 'microscope', color: 'bg-red-500', grade: 4 },
    { id: '12', title: 'Odamning tuzilishi', description: '4-sinf 4-bobi: Odam tanasining tuzilishi, organlar va ularning vazifalari.', subject: Subject.BIOLOGY, icon: 'heart-pulse', color: 'bg-pink-500', grade: 4 },
    { id: '13', title: 'Yer va koinot', description: '4-sinf 5-bobi: Yerning koinotdagi o\'rni, quyosh tizimi va yulduzlar.', subject: Subject.GEOGRAPHY, icon: 'globe', color: 'bg-purple-500', grade: 4 },
  ];

  const filteredTopics = topics.filter(t => t.grade === selectedGrade);

  return (
    <div className="max-w-7xl mx-auto py-16 px-4">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2 border border-[#ebe5e9]">Eng Ko'p O'rganiladigan Mavzular</h2>
          <div className="flex gap-4 mt-4">
            <button 
              onClick={() => setSelectedGrade(3)}
              className={`px-6 py-2 rounded-full font-bold transition-all ${selectedGrade === 3 ? 'bg-emerald-600 text-white shadow-lg' : 'bg-white text-slate-600 border border-slate-200 hover:border-emerald-300'}`}
            >
              3-sinf
            </button>
            <button 
              onClick={() => setSelectedGrade(4)}
              className={`px-6 py-2 rounded-full font-bold transition-all ${selectedGrade === 4 ? 'bg-emerald-600 text-white shadow-lg' : 'bg-white text-slate-600 border border-slate-200 hover:border-emerald-300'}`}
            >
              4-sinf
            </button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Mavzu qidirish..." 
              className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-full focus:outline-none focus:ring-2 ring-emerald-500 transition-all text-sm"
            />
          </div>
        </div>
      </div>

      {/* Featured Textbook Section */}
      <div className="mb-16 bg-emerald-50 rounded-3xl p-8 flex flex-col md:flex-row items-center gap-8 border border-emerald-100 shadow-sm">
        <a 
          href={selectedGrade === 3 
            ? "https://drive.google.com/file/d/1jdtTrLqnvG1X4a881QwBt7SmzKH9heta/view?usp=sharing"
            : "https://drive.google.com/file/d/1NhI-BAn3G5E7AszleIZY8M0MZK83WcmH/view?usp=sharing"
          }
          target="_blank" 
          rel="noopener noreferrer"
          className="w-full md:w-64 aspect-[3/4] bg-white rounded-2xl shadow-2xl overflow-hidden border-4 border-white flex-shrink-0 transform rotate-2 hover:rotate-0 transition-transform duration-500 cursor-pointer block"
        >
          <img 
            src={selectedGrade === 3
              ? "https://lh3.googleusercontent.com/d/1jdtTrLqnvG1X4a881QwBt7SmzKH9heta"
              : "https://lh3.googleusercontent.com/d/1NhI-BAn3G5E7AszleIZY8M0MZK83WcmH"
            }
            alt={`Tabiiy Fanlar - ${selectedGrade}-sinf`} 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </a>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-block py-1 px-3 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold uppercase tracking-wider">
              Asosiy Darslik
            </span>
            <span className="inline-block py-1 px-3 bg-blue-100 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider">
              {selectedGrade}-sinf
            </span>
          </div>
          <h3 className="text-3xl font-black text-slate-800 mb-4">Tabiiy Fanlar: {selectedGrade}-sinf Darsligi</h3>
          <p className="text-slate-600 mb-6 leading-relaxed text-lg">
            {selectedGrade}-sinf o'quvchilari uchun tabiat sirlarini vizual va qiziqarli usullar bilan tushuntirib beruvchi asosiy darslik. 
            Tabiat hodisalarini o'rganishni shu yerdan boshlang.
          </p>
          <div className="flex flex-wrap gap-4">
            <a 
              href={selectedGrade === 3 
                ? "https://drive.google.com/file/d/1jdtTrLqnvG1X4a881QwBt7SmzKH9heta/view?usp=sharing"
                : "https://drive.google.com/file/d/1NhI-BAn3G5E7AszleIZY8M0MZK83WcmH/view?usp=sharing"
              }
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-emerald-700 transition-all flex items-center gap-2 shadow-lg shadow-emerald-200"
            >
              <BookOpen size={20} /> Darslikni ko'rish
            </a>
            <button 
              onClick={() => onSelectTopic(selectedGrade === 3 ? '8' : '9')}
              className="bg-white text-emerald-700 border border-emerald-200 px-6 py-3 rounded-xl font-bold hover:bg-emerald-50 transition-all flex items-center gap-2"
            >
              <ChevronRight size={20} /> 1-Bobdan boshlash
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredTopics.length > 0 ? (
          filteredTopics.map(topic => (
            <TopicCard key={topic.id} topic={topic} onClick={() => onSelectTopic(topic.id)} />
          ))
        ) : (
          <div className="col-span-full py-20 text-center bg-white rounded-3xl border border-dashed border-slate-300">
            <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Tez kunda!</h3>
            <p className="text-slate-500">Ushbu sinf uchun mavzular tez orada qo'shiladi.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
  const [selectedGameUrl, setSelectedGameUrl] = useState<string | null>(null);
  const [selectedGrade, setSelectedGrade] = useState<number>(3);

  const renderContent = () => {
    if (selectedTopicId === '1') {
      return <CellStructureDetail onBack={() => setSelectedTopicId(null)} />;
    }
    if (selectedTopicId === '8') {
      return <AnimalsChapterDetail onBack={() => setSelectedTopicId(null)} onPlayGame={setSelectedGameUrl} />;
    }
    if (selectedTopicId === '2') {
      return <PlantsChapterDetail onBack={() => setSelectedTopicId(null)} onPlayGame={setSelectedGameUrl} />;
    }
    if (selectedTopicId === '6') {
      return <EarthChapterDetail onBack={() => setSelectedTopicId(null)} onPlayGame={setSelectedGameUrl} />;
    }
    if (selectedTopicId === '7') {
      return <ClimateChapterDetail onBack={() => setSelectedTopicId(null)} onPlayGame={setSelectedGameUrl} />;
    }
    if (selectedTopicId === '9') {
      return <ResearcherChapterDetail onBack={() => setSelectedTopicId(null)} onPlayGame={setSelectedGameUrl} />;
    }
    if (selectedTopicId === '10') {
      return <PlantsGrade4ChapterDetail onBack={() => setSelectedTopicId(null)} onPlayGame={setSelectedGameUrl} />;
    }
    if (selectedTopicId === '11') {
      return <AnimalsGrade4ChapterDetail onBack={() => setSelectedTopicId(null)} onPlayGame={setSelectedGameUrl} />;
    }
    if (selectedTopicId === '12') {
      return <HumanStructureGrade4ChapterDetail onBack={() => setSelectedTopicId(null)} onPlayGame={setSelectedGameUrl} />;
    }
    if (selectedTopicId === '13') {
      return <EarthSpaceGrade4ChapterDetail onBack={() => setSelectedTopicId(null)} onPlayGame={setSelectedGameUrl} />;
    }

    switch (activeTab) {
      case 'home':
        return (
          <>
            <Hero onStart={() => setActiveTab('topics')} />
            <ScienceFactHub />
          </>
        );
      case 'topics':
        return (
          <TopicList 
            selectedGrade={selectedGrade}
            setSelectedGrade={setSelectedGrade}
            onSelectTopic={(id) => (id === '1' || id === '8' || id === '2' || id === '6' || id === '7' || id === '9' || id === '10' || id === '11' || id === '12' || id === '13') ? setSelectedTopicId(id) : null} 
          />
        );
      case 'darslik':
        return <TextbookPage onSelectChapter={(id) => setSelectedTopicId(id)} />;
      case 'tutor':
        return <ScienceTutor />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#eaf6f0] via-[#f7fbf3] via-[#fcfdfe] to-[#eff8f4] text-slate-800 relative overflow-x-hidden">
      <FloatingNatureElements />
      <BackgroundGlows />
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={(t) => { setActiveTab(t); setSelectedTopicId(null); }} 
        onBackToHome={() => { setActiveTab('home'); setSelectedTopicId(null); }}
      />
      
      <main>
        {renderContent()}
      </main>

      <GameModal url={selectedGameUrl} onClose={() => setSelectedGameUrl(null)} />

      <footer className="bg-slate-900 text-slate-400 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 text-white mb-6">
                <BrainCircuit size={28} className="text-emerald-500" />
                <span className="text-xl font-bold">Tabiiy Fanlar</span>
              </div>
              <p className="text-sm leading-relaxed">
                Kelajak avlod uchun sifatli va oson tushunarli tabiiy fanlar ta'limini rivojlantiramiz.
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-wider">Fanlar</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Biologiya</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Fizika</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Kimyo</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Geografiya</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-wider">Resurslar</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Darsliklar</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Video darslar</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Mashqlar</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Lug'at</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-wider">Statistika</h4>
              <VisitorCounter />
            </div>
          </div>
          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
            <p>© 2026 Tabiiy Fanlar Olami. Muallif: Nilufar Rustamova. Barcha huquqlar himoyalangan.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Maxfiylik siyosati</a>
              <a href="#" className="hover:text-white transition-colors">Foydalanish shartlari</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
