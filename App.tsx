
import React, { useState } from 'react';
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
  Gamepad2
} from 'lucide-react';
import { Subject, ScienceTopic, ChatMessage } from './types';
import { askScienceTutor } from './services/geminiService';

// Reusable Components
const Navbar = ({ activeTab, setActiveTab, onBackToHome }: { activeTab: string, setActiveTab: (t: string) => void, onBackToHome: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <button onClick={onBackToHome} className="flex-shrink-0 flex items-center gap-2 outline-none">
              <div className="bg-emerald-600 p-2 rounded-lg text-white">
                <BrainCircuit size={24} />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Tabiiy Fanlar
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

const UsefulPlatforms = () => {
  const platforms = [
    {
      name: "Kahoot va Quizizz",
      desc: "Bilimlarni mustahkamlash va baholash uchun.",
      color: "border-yellow-400 bg-yellow-50 text-yellow-700",
      icon: <Gamepad2 size={32} />
    },
    {
      name: "Google Forms",
      desc: "Diagnostik baholash uchun.",
      color: "border-red-400 bg-red-50 text-red-700",
      icon: <ClipboardCheck size={32} />
    },
    {
      name: "LearningApps",
      desc: "Interaktiv mashqlar yaratish uchun.",
      color: "border-orange-400 bg-orange-50 text-orange-700",
      icon: <Smartphone size={32} />
    }
  ];

  return (
    <div className="max-w-7xl mx-auto py-20 px-4">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-black text-slate-800 tracking-tight mb-4">
          TABIIY FAN DARSLARIDA FOYDALI PLATFORMALAR
        </h2>
        <div className="w-24 h-1 bg-indigo-500 mx-auto rounded-full"></div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-10">
        <div className="grid grid-cols-1 gap-6 w-full md:w-1/3">
          {platforms.slice(0, 2).map((p, i) => (
            <div key={i} className={`${p.color} border-2 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex items-start gap-4`}>
              <div className="p-3 bg-white rounded-xl shadow-sm">{p.icon}</div>
              <div>
                <h4 className="font-bold text-lg mb-1">{p.name}</h4>
                <p className="text-sm opacity-80">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="w-48 h-48 md:w-64 md:h-64 bg-slate-100 rounded-full flex items-center justify-center border-8 border-white shadow-inner relative">
          <Smartphone size={80} className="text-slate-400 animate-pulse" />
          <div className="absolute -top-4 -right-4 bg-indigo-600 text-white p-4 rounded-full shadow-lg">
             <Search size={24} />
          </div>
        </div>

        <div className="w-full md:w-1/3">
          <div className={`${platforms[2].color} border-2 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex items-start gap-4`}>
            <div className="p-3 bg-white rounded-xl shadow-sm">{platforms[2].icon}</div>
            <div>
              <h4 className="font-bold text-lg mb-1">{platforms[2].name}</h4>
              <p className="text-sm opacity-80">{platforms[2].desc}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ScienceMindMap = () => {
  const sections = [
    {
      title: "ATROF-MUHITNI O'RGANISH",
      desc: "Yashash joylari, bog'lar, o'rmonlar bilan tanishish.",
      color: "border-emerald-500 bg-emerald-50 text-emerald-700",
      icon: <Trees size={32} />,
      position: "md:col-start-1 md:row-start-1"
    },
    {
      title: "O'SIMLIKLAR VA HAYVONOT DUNYOSI",
      desc: "O'simliklar turlari, o'sishi, hayvonlar hayot tarzi.",
      color: "border-yellow-500 bg-yellow-50 text-yellow-700",
      icon: <Tent size={32} />,
      position: "md:col-start-3 md:row-start-1"
    },
    {
      title: "SUV VA HAVO",
      desc: "Suv xossalari, ahamiyati, havo, ob-havo hodisalari.",
      color: "border-blue-500 bg-blue-50 text-blue-700",
      icon: <CloudRain size={32} />,
      position: "md:col-start-1 md:row-start-3"
    },
    {
      title: "YORUG'LIK VA OVOZ",
      desc: "Yorug'lik va ovoz hodisalari.",
      color: "border-orange-500 bg-orange-50 text-orange-700",
      icon: <Music size={32} />,
      position: "md:col-start-2 md:row-start-3"
    },
    {
      title: "INSON VA SALOMATLIK",
      desc: "Inson tanasi, gigiena, sog'lom turmush tarzi.",
      color: "border-purple-500 bg-purple-50 text-purple-700",
      icon: <HeartPulse size={32} />,
      position: "md:col-start-3 md:row-start-3"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto py-16 px-4">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-black text-slate-800 tracking-tight uppercase mb-2">
          Boshlang'ich ta'limda
        </h2>
        <h3 className="text-5xl font-black text-emerald-600 mb-4 tracking-wider">
          TABIIY FANLAR
        </h3>
        <div className="w-24 h-1 bg-emerald-500 mx-auto rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-3 gap-8 items-center relative">
        {/* Central Globe */}
        <div className="hidden md:flex md:col-start-2 md:row-start-2 items-center justify-center relative">
          <div className="absolute w-48 h-48 border-2 border-slate-100 rounded-full animate-ping opacity-20"></div>
          <div className="bg-white p-2 rounded-full shadow-2xl border border-slate-100 relative z-10 overflow-hidden w-48 h-48 flex items-center justify-center">
            <img 
              src="https://lh3.googleusercontent.com/d/1IMg0ZQ-HCJbgmY5lcrFLVyzN4Lkb2A3B" 
              alt="Tabiiy Fanlar" 
              className="w-full h-full object-cover rounded-full"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* Sections */}
        {sections.map((section, idx) => (
          <div key={idx} className={`${section.position} ${section.color} border-4 rounded-3xl p-6 shadow-lg transition-transform hover:scale-105 cursor-pointer flex flex-col items-center text-center gap-4`}>
            <div className="mb-2">{section.icon}</div>
            <h4 className="font-black text-sm tracking-widest">{section.title}</h4>
            <p className="text-xs font-medium opacity-80">{section.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-16 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-center gap-6">
        <div className="flex items-center gap-4 text-slate-700 font-bold">
           <Microscope size={28} className="text-emerald-600" />
           <Beaker size={28} className="text-blue-600" />
        </div>
        <p className="text-slate-600 font-bold text-center md:text-left text-lg">
          DARSLAR KUZATISHLAR, TAJRIBALAR, EKSKURSIYALAR, INTERAKTIV O'YINLAR ORQALI OLIB BORILADI.
        </p>
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

  return (
    <div onClick={onClick} className="bg-white p-6 rounded-2xl border border-slate-200 hover:shadow-xl hover:border-emerald-200 transition-all group cursor-pointer">
      <div className={`${topic.color} w-12 h-12 rounded-xl flex items-center justify-center text-white mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
        <Icon size={24} />
      </div>
      <h3 className="text-lg font-bold text-slate-800 mb-2">{topic.title}</h3>
      <p className="text-slate-500 text-sm leading-relaxed mb-4">{topic.description}</p>
      <div className="flex items-center text-emerald-600 font-medium text-sm">
        Batafsil <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  );
};

const TextbookPage = ({ onSelectChapter }: { onSelectChapter: (id: string) => void }) => {
  const textbooks = [
    {
      id: '4-1',
      title: "Tabiiy fanlar - 4-sinf (1-qism)",
      desc: "4-sinf o'quvchilari uchun tabiiy fanlar darsligining birinchi qismi.",
      link: "https://drive.google.com/file/d/1NhI-BAn3G5E7AszleIZY8M0MZK83WcmH/view?usp=sharing",
      img: "https://lh3.googleusercontent.com/d/1NhI-BAn3G5E7AszleIZY8M0MZK83WcmH",
      badge: "Yangi",
      badgeColor: "bg-blue-100 text-blue-700"
    },
    {
      id: '4-2',
      title: "Tabiiy fanlar - 4-sinf (2-qism)",
      desc: "4-sinf o'quvchilari uchun tabiiy fanlar darsligining ikkinchi qismi.",
      link: "https://drive.google.com/file/d/106rPW9Nr0qOzjuQLWy2MLpNtNBLaG0dE/view?usp=sharing",
      img: "https://lh3.googleusercontent.com/d/106rPW9Nr0qOzjuQLWy2MLpNtNBLaG0dE",
      badge: "Yangi",
      badgeColor: "bg-blue-100 text-blue-700"
    },
    {
      id: 'main',
      title: "Tabiiy fanlar darsligi",
      desc: "Tabiat sirlarini vizual va qiziqarli usullar bilan tushuntirib beruvchi asosiy darslik.",
      link: "https://drive.google.com/file/d/1jdtTrLqnvG1X4a881QwBt7SmzKH9heta/view?usp=sharing",
      img: "https://lh3.googleusercontent.com/d/1jdtTrLqnvG1X4a881QwBt7SmzKH9heta",
      badge: "Asosiy",
      badgeColor: "bg-emerald-100 text-emerald-700"
    }
  ];

  const chapters = [
    { id: '8', title: "1-Bob: Hayvonlar", desc: "Hayvonlar tasnifi, yashash tarzi va tabiatdagi o'rni.", icon: <Trees className="text-emerald-600" /> },
    { id: '2', title: "2-Bob: O'simliklar", desc: "O'simliklar dunyosi, ularning o'sishi va ahamiyati.", icon: <Trees className="text-green-600" /> },
    { id: '6', title: "3-Bob: Yer sayyorasi", desc: "Biz yashayotgan sayyora, uning tuzilishi va sirlari.", icon: <Globe className="text-blue-600" /> },
    { id: '7', title: "4-Bob: Iqlim va ob-havo", desc: "Atmosfera hodisalari, fasllar va iqlim o'zgarishi.", icon: <CloudRain className="text-sky-600" /> },
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
        {textbooks.map((book) => (
          <div key={book.id} className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-xl flex flex-col lg:flex-row items-center gap-12 hover:border-emerald-200 transition-colors">
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

              <a 
                href={book.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-emerald-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200"
              >
                <BookOpen size={24} /> Darslikni ochish (PDF)
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-slate-200 pt-16">
        <h3 className="text-2xl font-bold text-slate-800 mb-8">Interaktiv Boblar</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {chapters.map((chapter) => (
            <div 
              key={chapter.id} 
              onClick={() => onSelectChapter(chapter.id)}
              className="bg-white p-8 rounded-3xl border border-slate-200 hover:border-emerald-500 hover:shadow-xl transition-all cursor-pointer group"
            >
              <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {chapter.icon}
              </div>
              <h4 className="text-xl font-bold text-slate-800 mb-3">{chapter.title}</h4>
              <p className="text-slate-500 text-sm mb-6">{chapter.desc}</p>
              <div className="text-emerald-600 font-bold flex items-center gap-2">
                O'rganish <ChevronRight size={18} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const AnimalsChapterDetail = ({ onBack }: { onBack: () => void }) => {
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
      q: "Qaysi hayvonlar guruhiga sut emizish xos?",
      a: ["Qushlar", "Sutemizuvchilar", "Baliqlar", "Hasharotlar"],
      correct: 1
    },
    {
      q: "Suvda ham quruqlikda yashovchi hayvonni toping.",
      a: ["Ilon", "Baqa", "Toshbaqa", "Timsoh"],
      correct: 1
    },
    {
      q: "Qaysi hayvon qishki uyquga ketadi?",
      a: ["Bo'ri", "Ayiq", "Tulki", "Quyon"],
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

        {/* Video Player Section */}
        <div className="bg-slate-900 rounded-3xl overflow-hidden shadow-2xl mb-12">
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
              src="https://www.youtube.com/embed/HvtM9_89X_A" 
              title="Animals for Kids" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 gap-4">
            {topics.map((topic) => (
              <div 
                key={topic.id}
                className={`p-6 rounded-2xl border transition-all cursor-pointer ${
                  selectedTopic === topic.id 
                    ? 'border-emerald-500 bg-emerald-50 shadow-md' 
                    : 'border-slate-200 bg-white hover:border-emerald-300 hover:shadow-sm'
                }`}
                onClick={() => setSelectedTopic(selectedTopic === topic.id ? null : topic.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                      selectedTopic === topic.id ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {topic.id}
                    </div>
                    <h3 className="text-lg font-bold text-slate-800">{topic.title}</h3>
                  </div>
                  <ChevronRight className={`text-slate-400 transition-transform ${selectedTopic === topic.id ? 'rotate-90' : ''}`} />
                </div>
                {selectedTopic === topic.id && (
                  <div className="mt-4 pt-4 border-t border-emerald-200 animate-in fade-in slide-in-from-top-2">
                    <p className="text-slate-600 leading-relaxed">{topic.desc}</p>
                    <div className="mt-4 flex gap-3">
                      <button className="text-xs font-bold text-emerald-600 bg-emerald-100 px-3 py-1 rounded-lg hover:bg-emerald-200 transition-colors">
                        Mavzuni o'qish
                      </button>
                      <button className="text-xs font-bold text-blue-600 bg-blue-100 px-3 py-1 rounded-lg hover:bg-blue-200 transition-colors">
                        Video dars
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            <div className="bg-emerald-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl">
              <div className="relative z-10">
                <h2 className="text-2xl font-bold mb-4">Qiziqarli Fakt</h2>
                <p className="text-emerald-100 text-lg italic">
                  "Ko'k kit — dunyodagi eng katta hayvon. Uning tili bitta filning vazniga teng kelishi mumkin!"
                </p>
              </div>
              <div className="absolute -right-10 -bottom-10 opacity-10">
                <Globe size={200} />
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
              {!quizStarted ? (
                <div className="text-center">
                  <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Gamepad2 size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-4">Bob bo'yicha test</h3>
                  <button 
                    onClick={() => setQuizStarted(true)}
                    className="w-full bg-emerald-600 text-white py-3 rounded-xl font-bold hover:bg-emerald-700 transition-all"
                  >
                    Boshlash
                  </button>
                </div>
              ) : showResult ? (
                <div className="text-center">
                  <h3 className="text-xl font-bold text-slate-800 mb-2">Natija: {score}/3</h3>
                  <button 
                    onClick={() => { setQuizStarted(false); setShowResult(false); setCurrentQuestion(0); setScore(0); }}
                    className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-slate-800 transition-all"
                  >
                    Qayta topshirish
                  </button>
                </div>
              ) : (
                <div>
                  <h4 className="text-lg font-bold text-slate-800 mb-6">{quizQuestions[currentQuestion].q}</h4>
                  <div className="space-y-3">
                    {quizQuestions[currentQuestion].a.map((ans, idx) => (
                      <button 
                        key={idx}
                        onClick={() => handleAnswer(idx)}
                        className="w-full text-left px-5 py-3 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50 transition-all text-sm"
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
      <h1 className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tight">
        <span className="text-red-600">Tabiiy Fanlar</span> <br />
        <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
          Endi Juda Oson
        </span>
      </h1>
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
        <button className="bg-white text-slate-700 border border-slate-200 px-8 py-4 rounded-full font-bold text-lg hover:bg-slate-50 transition-all">
          Mavzular bilan tanishish
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

const TopicList = ({ onSelectTopic }: { onSelectTopic: (id: string) => void }) => {
  const topics: ScienceTopic[] = [
    { id: '1', title: 'Hujayra Tuzilishi', description: 'Hayotning asosiy qurilish bloki bo\'lgan hujayralar olamiga kiring.', subject: Subject.BIOLOGY, icon: 'microscope', color: 'bg-emerald-500' },
    { id: '2', title: 'O\'simliklar', description: 'Darslikning 2-bobi: O\'simliklar dunyosi va ularning hayoti.', subject: Subject.BIOLOGY, icon: 'microscope', color: 'bg-green-500' },
    { id: '3', title: 'Kimyoviy Reaksiyalar', description: 'Moddalarning bir-biri bilan o\'zaro ta\'siri va yangi birikmalar hosil bo\'lishi.', subject: Subject.CHEMISTRY, icon: 'beaker', color: 'bg-purple-500' },
    { id: '4', title: 'Ekosistemalar', description: 'Tabiatdagi barcha tirik va jonsiz mavjudotlarning bog\'liqligi.', subject: Subject.BIOLOGY, icon: 'microscope', color: 'bg-green-500' },
    { id: '5', title: 'Quyosh Tizimi', description: 'Bizning yulduzimiz va uning atrofidagi sayyoralar bo\'ylab sayohat.', subject: Subject.ASTRONOMY, icon: 'orbit', color: 'bg-orange-500' },
    { id: '6', title: 'Yer sayyorasi', description: 'Darslikning 3-bobi: Yerning tuzilishi va uning xususiyatlari.', subject: Subject.GEOGRAPHY, icon: 'globe', color: 'bg-teal-500' },
    { id: '7', title: 'Iqlim va ob-havo', description: 'Darslikning 4-bobi: Atmosfera hodisalari va iqlim o\'zgarishi.', subject: Subject.GEOGRAPHY, icon: 'cloud-rain', color: 'bg-sky-500' },
    { id: '8', title: 'Hayvonlar', description: 'Darslikning 1-bobi: Hayvonlar tasnifi va ularning yashash tarzi.', subject: Subject.BIOLOGY, icon: 'microscope', color: 'bg-red-500' },
  ];

  return (
    <div className="max-w-7xl mx-auto py-16 px-4">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Eng Ko'p O'rganiladigan Mavzular</h2>
          <p className="text-slate-500">O'quvchilar tomonidan eng yuqori baholangan darslar</p>
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
      <div className="mb-16 bg-blue-50 rounded-3xl p-8 flex flex-col md:flex-row items-center gap-8 border border-blue-100 shadow-sm">
        <a 
          href="https://drive.google.com/file/d/1NhI-BAn3G5E7AszleIZY8M0MZK83WcmH/view?usp=sharing" 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-full md:w-64 aspect-[3/4] bg-white rounded-2xl shadow-2xl overflow-hidden border-4 border-white flex-shrink-0 transform rotate-2 hover:rotate-0 transition-transform duration-500 cursor-pointer block"
        >
          <img 
            src="https://lh3.googleusercontent.com/d/1NhI-BAn3G5E7AszleIZY8M0MZK83WcmH" 
            alt="Tabiiy Fanlar - 4-sinf" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </a>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-block py-1 px-3 bg-blue-100 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider">
              Yangi Darslik
            </span>
            <span className="inline-block py-1 px-3 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold uppercase tracking-wider">
              4-sinf (1-qism)
            </span>
          </div>
          <h3 className="text-3xl font-black text-slate-800 mb-4">Tabiiy Fanlar: 4-sinf Darsligi</h3>
          <p className="text-slate-600 mb-6 leading-relaxed text-lg">
            4-sinf o'quvchilari uchun maxsus tayyorlangan tabiiy fanlar darsligining yangi nashri. 
            Tabiat hodisalarini chuqurroq o'rganish va tushunish uchun eng yaxshi manba.
          </p>
          <div className="flex flex-wrap gap-4">
            <a 
              href="https://drive.google.com/file/d/1NhI-BAn3G5E7AszleIZY8M0MZK83WcmH/view?usp=sharing" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all flex items-center gap-2 shadow-lg shadow-blue-200"
            >
              <BookOpen size={20} /> Darslikni ko'rish
            </a>
            <button 
              onClick={() => onSelectTopic('8')}
              className="bg-white text-blue-700 border border-blue-200 px-6 py-3 rounded-xl font-bold hover:bg-blue-50 transition-all flex items-center gap-2"
            >
              <Play size={20} /> 1-Bob: Hayvonlar
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {topics.map(topic => (
          <TopicCard key={topic.id} topic={topic} onClick={() => onSelectTopic(topic.id)} />
        ))}
      </div>
    </div>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);

  const renderContent = () => {
    if (selectedTopicId === '1') {
      return <CellStructureDetail onBack={() => setSelectedTopicId(null)} />;
    }
    if (selectedTopicId === '8') {
      return <AnimalsChapterDetail onBack={() => setSelectedTopicId(null)} />;
    }

    switch (activeTab) {
      case 'home':
        return (
          <>
            <Hero onStart={() => setActiveTab('topics')} />
            <ScienceMindMap />
            <div className="bg-white py-20 border-y border-slate-100">
              <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                <div>
                  <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <BrainCircuit size={32} />
                  </div>
                  <h3 className="text-xl font-bold mb-4">Interaktiv AI</h3>
                  <p className="text-slate-500">Murakkab savollarga aqlli va tushunarli javoblar bera oladigan sun'iy intellekt ustozi.</p>
                </div>
                <div>
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <BookOpen size={32} />
                  </div>
                  <h3 className="text-xl font-bold mb-4">Boy Kutubxona</h3>
                  <p className="text-slate-500">Biologiyadan Astronomiyagacha bo'lgan barcha tabiiy fanlar bo'yicha saralangan mavzular.</p>
                </div>
                <div>
                  <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Orbit size={32} />
                  </div>
                  <h3 className="text-xl font-bold mb-4">Vizualizatsiya</h3>
                  <p className="text-slate-500">Abstrakt tushunchalarni tushunishga yordam beruvchi chiroyli va interaktiv grafikalar.</p>
                </div>
              </div>
            </div>
            <UsefulPlatforms />
            <TopicList onSelectTopic={(id) => {
              if (id === '1' || id === '8') setSelectedTopicId(id);
              else setActiveTab('topics');
            }} />
          </>
        );
      case 'topics':
        return <TopicList onSelectTopic={(id) => (id === '1' || id === '8') ? setSelectedTopicId(id) : null} />;
      case 'darslik':
        return <TextbookPage onSelectChapter={(id) => setSelectedTopicId(id)} />;
      case 'tutor':
        return <ScienceTutor />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={(t) => { setActiveTab(t); setSelectedTopicId(null); }} 
        onBackToHome={() => { setActiveTab('home'); setSelectedTopicId(null); }}
      />
      
      <main>
        {renderContent()}
      </main>

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
              <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-wider">Platforma</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Biz haqimizda</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Hamkorlik</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Aloqa</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
            <p>© 2024 Tabiiy Fanlar Olami. Barcha huquqlar himoyalangan.</p>
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
