import React, { useState, useEffect } from 'react';
import { 
  GlassWater, 
  Utensils, 
  Calendar, 
  MapPin, 
  Clock, 
  Phone, 
  Mail, 
  ChevronRight, 
  Menu as MenuIcon, 
  X, 
  Sparkles, 
  Zap, 
  Compass, 
  Users, 
  CheckCircle2, 
  Star,
  ExternalLink,
  Instagram,
  Facebook,
  AlertCircle,
  Flame,
  Maximize2,
  Info
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('all');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Lightbox State for FEAT_04 Gallery
  const [selectedImage, setSelectedImage] = useState(null);

  // Today date format YYYY-MM-DD for FEAT_02 date validation
  const todayDateStr = new Date().toISOString().split('T')[0];

  const [reservationForm, setReservationForm] = useState({
    name: '',
    email: '',
    phone: '',
    guests: '2',
    date: todayDateStr,
    time: '19:00',
    seatingPreference: 'standard',
    highChair: 'no',
    notes: ''
  });
  
  const [reservationSummary, setReservationSummary] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Monitor scroll position for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleReservationChange = (e) => {
    const { name, value } = e.target;
    setReservationForm(prev => ({ ...prev, [name]: value }));
    if (errorMessage) setErrorMessage('');
  };

  // FEAT_02 Form Validation & Submission
  const handleReservationSubmit = (e) => {
    e.preventDefault();
    
    // Validate empty required fields
    if (!reservationForm.name.trim() || !reservationForm.email.trim() || !reservationForm.phone.trim() || !reservationForm.date) {
      setErrorMessage('請填寫所有必填欄位 (姓名、電話、Email、日期)');
      return;
    }

    // Validate past date
    if (reservationForm.date < todayDateStr) {
      setErrorMessage('預約日期不可選擇過去的時間！');
      return;
    }

    // Save summary and show modal
    setReservationSummary({ ...reservationForm });
    setErrorMessage('');
  };

  const closeReservationModal = () => {
    setReservationSummary(null);
    setReservationForm({
      name: '',
      email: '',
      phone: '',
      guests: '2',
      date: todayDateStr,
      time: '19:00',
      seatingPreference: 'standard',
      highChair: 'no',
      notes: ''
    });
  };

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // FEAT_01 Category & Menu items data
  const menuCategories = [
    { id: 'all', name: '全部菜單 / ALL' },
    { id: 'pasta', name: '主餐：廢土義大利麵 / PASTA' },
    { id: 'mains', name: '主餐與小食 / MAINS & TAPAS' },
    { id: 'dessert', name: '甜點 / DESSERTS' },
    { id: 'drinks', name: '賽博特調與飲品 / COCKTAILS' },
  ];

  const menuItems = [
    {
      id: 1,
      category: 'pasta',
      name: '黑洞墨魚海鮮義大利麵',
      enName: 'Black Hole Ink Seafood Linguine',
      price: '$28',
      desc: '濃郁墨魚汁搭配舊金山灣當日新鮮干貝與炙燒透抽，佐以微辣廢土香料油。',
      image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=600',
      isPopular: true,
      spicyLevel: 1,
      isVegetarian: false,
      tags: ['招牌推介', '海鮮']
    },
    {
      id: 2,
      category: 'pasta',
      name: '霓虹核能野菇寬扁麵',
      enName: 'Neon Nuclear Truffle Mushroom Fettuccine',
      price: '$24',
      desc: '手工寬扁麵吸附滿滿黑松露醬汁與綜合野菇，頂層淋上特調金黃羅勒油脂。',
      image: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281352?auto=format&fit=crop&q=80&w=600',
      isPopular: true,
      spicyLevel: 0,
      isVegetarian: true,
      tags: ['蛋奶素', '主廚推薦']
    },
    {
      id: 3,
      category: 'pasta',
      name: '賽博煙燻培根蛋黃水管麵',
      enName: 'Cyberpunk Smoked Carbonara Rigatoni',
      price: '$25',
      desc: '傳統風乾豬面頰肉、熟成帕馬森起司與有機蛋黃，煙燻木屑沉香氣息濃烈。',
      image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&q=80&w=600',
      isPopular: false,
      spicyLevel: 0,
      isVegetarian: false,
      tags: ['經典口感']
    },
    {
      id: 4,
      category: 'mains',
      name: '末日隕石戰斧豬排',
      enName: 'Doomsday Meteor Tomahawk Pork Chop',
      price: '$38',
      desc: '舒肥低溫烹調後直火炙烤，外酥內嫩，搭配廢土酸辣醬與烤時蔬。',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=600',
      isPopular: true,
      spicyLevel: 2,
      isVegetarian: false,
      tags: ['大份量', '肉食主義']
    },
    {
      id: 5,
      category: 'mains',
      name: '舊金山迷幻辣醬薯塊與玉米筍',
      enName: 'SF Psychedelic Wedges & Roasted Corn',
      price: '$16',
      desc: '烤香玉米筍佐金黃香料起司粉，搭上秘製廢土辣醬金黃帶皮薯塊。',
      image: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&q=80&w=600',
      isPopular: false,
      spicyLevel: 1,
      isVegetarian: true,
      tags: ['下酒推薦']
    },
    {
      id: 6,
      category: 'mains',
      name: '復古鋼鐵熟成 Prime 牛小排',
      enName: 'Retro Steel Aged Ribeye Steak',
      price: '$42',
      desc: '美選 Prime 級牛小排熟成 28 天，佐紅酒黑蒜濃縮汁與烤蒜球。',
      image: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&q=80&w=600',
      isPopular: true,
      spicyLevel: 0,
      isVegetarian: false,
      tags: ['限量供應']
    },
    {
      id: 7,
      category: 'dessert',
      name: '賽博霓虹焦糖熔岩提拉米蘇',
      enName: 'Cyber Neon Lava Tiramisu',
      price: '$14',
      desc: '浸泡濃縮咖啡與威士忌的手指餅乾，搭配流心馬斯卡彭與煙燻跳跳糖。',
      image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&q=80&w=600',
      isPopular: true,
      spicyLevel: 0,
      isVegetarian: true,
      tags: ['招牌甜點', '含微量酒']
    },
    {
      id: 8,
      category: 'dessert',
      name: '廢土結晶抹茶巴斯克',
      enName: 'Wasteland Matcha Basque Cheesecake',
      price: '$13',
      desc: '靜岡抹茶搭配焦香乳酪，頂層裝飾青色透明糖晶與海鹽可可碎塊。',
      image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&q=80&w=600',
      isPopular: false,
      spicyLevel: 0,
      isVegetarian: true,
      tags: ['人氣推薦']
    },
    {
      id: 9,
      category: 'drinks',
      name: '來生血脈 Signature Cocktail',
      enName: 'Afterlife Bloodline Cocktail',
      price: '$19',
      desc: '龍舌蘭、血橙利口酒、煙燻辣椒泥，上桌前點燃百里香，迷幻微醺。',
      image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=600',
      isPopular: true,
      spicyLevel: 1,
      isVegetarian: true,
      tags: ['特調首選', '含酒精']
    },
    {
      id: 10,
      category: 'drinks',
      name: '夜城霓虹藍 Gin Tonic',
      enName: 'Night City Blue Cocktail',
      price: '$18',
      desc: '琴酒、蝶豆花萃取液、通寧水，隨攪拌產生夜城般夢幻紫藍色彩變化。',
      image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&q=80&w=600',
      isPopular: true,
      spicyLevel: 0,
      isVegetarian: true,
      tags: ['視覺系', '含酒精']
    },
    {
      id: 11,
      category: 'drinks',
      name: '廢土綠洲無酒精特調',
      enName: 'Wasteland Oasis Mocktail',
      price: '$14',
      desc: '新鮮小黃瓜、薄荷葉、青蘋果汁與氣泡水，清新解膩。',
      image: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?auto=format&fit=crop&q=80&w=600',
      isPopular: false,
      spicyLevel: 0,
      isVegetarian: true,
      tags: ['無酒精']
    }
  ];

  const filteredMenu = activeTab === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeTab);

  // FEAT_04 Gallery Images (At least 6 items with proper alt texts & tags)
  const galleryItems = [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1200",
      alt: "來生餐酒館內霓虹與復古金屬吧檯區視覺",
      title: "鋼鐵與霓虹吧檯",
      category: "空間環境",
      desc: "復古 CRT 螢幕與工業鋼材交織的獨特酒吧氛圍"
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=1200",
      alt: "精緻招牌黑洞墨魚海鮮義大利麵擺盤近照",
      title: "廢土風墨魚海鮮義大利麵",
      category: "特色餐點",
      desc: "舊金山灣直送鮮甜海鮮與手工墨魚麵條"
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&q=80&w=1200",
      alt: "調酒師調製煙燻賽博特調夜城藍之現場特寫",
      title: "夜城霓虹特調現場",
      category: "賽博飲品",
      desc: "調酒師精心設計的口感與夢幻煙霧調酒"
    },
    {
      id: 4,
      url: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&q=80&w=1200",
      alt: "來生餐酒館寬敞的復古未來風格聚餐桌椅區",
      title: "復古未來沙發用餐區",
      category: "空間環境",
      desc: "溫暖隨性的氛圍，適合旅人與好友暢聊與深夜聚餐"
    },
    {
      id: 5,
      url: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=1200",
      alt: "外酥內嫩直火炙烤之末日隕石戰斧豬排實拍照",
      title: "末日隕石戰斧豬排",
      category: "特色餐點",
      desc: "低溫舒肥後直火焦香炙烤，搭配特製廢土酸辣醬"
    },
    {
      id: 6,
      url: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&q=80&w=1200",
      alt: "舊金山來生餐酒館夜間店面門口與霓虹燈招牌外觀",
      title: "舊金山門市深夜外觀",
      category: "店面外觀",
      desc: "位於 Mission District 的靈魂避難所與聚會地標"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500 selection:text-black">
      {/* Visual Glitch/Cyber Mesh overlay effect */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]" />

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled ? 'bg-slate-950/90 backdrop-blur-md border-b border-cyan-900/40 py-3 shadow-lg shadow-cyan-950/20' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          
          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => scrollToSection('hero')}>
            <div className="w-10 h-10 rounded border border-cyan-500/50 bg-slate-900/80 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
              <Zap className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-200 to-amber-400">
                AFTERLIFE
              </span>
              <span className="text-xs block text-slate-400 font-mono tracking-widest -mt-1">
                來生餐酒館 // SF
              </span>
            </div>
          </div>

          {/* Desktop Menu Nav */}
          <div className="hidden md:flex items-center space-x-8 font-mono text-sm tracking-wide">
            <button onClick={() => scrollToSection('about')} className="text-slate-300 hover:text-cyan-400 transition-colors">
              // 01. 關於來生
            </button>
            <button onClick={() => scrollToSection('menu')} className="text-slate-300 hover:text-cyan-400 transition-colors">
              // 02. 特色菜單
            </button>
            <button onClick={() => scrollToSection('gallery')} className="text-slate-300 hover:text-cyan-400 transition-colors">
              // 03. 空間寫真
            </button>
            <button onClick={() => scrollToSection('reservation')} className="text-slate-300 hover:text-cyan-400 transition-colors">
              // 04. 線上訂位
            </button>
            <button onClick={() => scrollToSection('info')} className="text-slate-300 hover:text-cyan-400 transition-colors">
              // 05. 營業資訊
            </button>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <button 
              onClick={() => scrollToSection('reservation')}
              className="px-5 py-2.5 rounded bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500 text-white font-medium text-sm transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)] border border-cyan-400/30 active:scale-95"
            >
              即刻預約座位
            </button>
          </div>

          {/* Mobile menu toggle button */}
          <div className="md:hidden">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-cyan-400 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-7 h-7" /> : <MenuIcon className="w-7 h-7" />}
            </button>
          </div>
        </div>

        {/* Mobile menu panel */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-slate-900/95 border-b border-cyan-900/50 backdrop-blur-xl px-4 pt-4 pb-6 space-y-3 font-mono">
            <button 
              onClick={() => scrollToSection('about')}
              className="block w-full text-left py-2 text-slate-200 hover:text-cyan-400 border-b border-slate-800"
            >
              // 01. 關於來生 (ABOUT)
            </button>
            <button 
              onClick={() => scrollToSection('menu')}
              className="block w-full text-left py-2 text-slate-200 hover:text-cyan-400 border-b border-slate-800"
            >
              // 02. 特色菜單 (MENU)
            </button>
            <button 
              onClick={() => scrollToSection('gallery')}
              className="block w-full text-left py-2 text-slate-200 hover:text-cyan-400 border-b border-slate-800"
            >
              // 03. 空間寫真 (GALLERY)
            </button>
            <button 
              onClick={() => scrollToSection('reservation')}
              className="block w-full text-left py-2 text-slate-200 hover:text-cyan-400 border-b border-slate-800"
            >
              // 04. 線上訂位 (RESERVATION)
            </button>
            <button 
              onClick={() => scrollToSection('info')}
              className="block w-full text-left py-2 text-slate-200 hover:text-cyan-400 border-b border-slate-800"
            >
              // 05. 營業資訊 (LOCATION & INFO)
            </button>
            <div className="pt-2">
              <button 
                onClick={() => scrollToSection('reservation')}
                className="w-full py-3 rounded bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-center"
              >
                即刻預約座位
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-slate-950">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&q=80&w=1920" 
            alt="來生餐酒館內部賽博與復古廢土氣氛" 
            className="w-full h-full object-cover opacity-20 filter contrast-125 saturate-150 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-transparent to-slate-950" />
        </div>

        <div className="absolute top-1/3 left-10 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-10 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-950/40 text-cyan-400 mb-6 font-mono text-xs sm:text-sm tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>SAN FRANCISCO // RETRO-FUTURISTIC BISTRO</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            在廢土與未來的交界處<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-amber-400">
              喝一杯微醺，吃盤熱騰騰的麵
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-slate-300 text-base sm:text-lg mb-8 font-light leading-relaxed">
            位於美國舊金山的「來生餐酒館」，將復古廢土風與未來賽博感交織。
            無論你是遠道而來的旅人，還是尋找隨性放鬆空間的聚會客，這裡隨時準備好義大利麵與精緻特調。
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => scrollToSection('reservation')}
              className="w-full sm:w-auto px-8 py-4 rounded bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-slate-950 font-bold text-lg shadow-[0_0_25px_rgba(6,182,212,0.4)] transition-all flex items-center justify-center gap-2 group"
            >
              <span>預約靈魂席位</span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => scrollToSection('menu')}
              className="w-full sm:w-auto px-8 py-4 rounded border border-slate-700 bg-slate-900/60 hover:bg-slate-800 text-slate-200 font-medium text-lg transition-colors flex items-center justify-center gap-2"
            >
              <Utensils className="w-5 h-5 text-amber-400" />
              <span>探索精選菜單</span>
            </button>
          </div>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 text-left border-t border-slate-800/80 pt-8 font-mono text-xs text-slate-400">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>地區：美國舊金山 (SF, CA)</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>氛圍：隨性 / 廢土未來感</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-teal-400" />
              <span>料理：手工義大利麵 / 主食甜點</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-purple-400" />
              <span>調酒：廢土賽博特調系列</span>
            </div>
          </div>
        </div>
      </section>

      {/* Intro & Brand Story Section */}
      <section id="about" className="py-24 bg-slate-900/50 border-y border-slate-800/60 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="font-mono text-cyan-400 text-sm tracking-widest uppercase">
                // META // BRAND_STORY
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                歡迎來到舊金山最隨性的<br />
                <span className="text-amber-400">「復古廢土未來」</span>棲身之所
              </h2>
              
              <div className="space-y-4 text-slate-300 leading-relaxed font-light">
                <p>
                  「來生餐酒館 (Afterlife Bistro)」誕生於對舊金山多元文化與未來想像的跨界碰撞。
                  我們打造了一個彷彿從廢土紀元延伸至未來科技的空間——裸露的金屬管線、霓虹映照的舊式 CRT 螢幕、隨意擺放的質感皮椅與工業廢墟美學。
                </p>
                <p>
                  我們相信，再忙碌混亂的世界也需要一盤誠意滿滿的手工義大利麵，與一杯能安撫心靈的特調烈酒。
                  這裡沒有過度的拘束與繁文褥節，只有隨性自在的音樂、熱情的料理與來自世界各地的旅人。
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 font-mono">
                <div className="p-4 rounded border border-slate-800 bg-slate-950/60">
                  <Compass className="w-6 h-6 text-cyan-400 mb-2" />
                  <div className="text-white font-bold text-sm mb-1">目標客群</div>
                  <div className="text-slate-400 text-xs">舊金山在地人、自由旅人與尋找新奇聚會的探索者</div>
                </div>
                <div className="p-4 rounded border border-slate-800 bg-slate-950/60">
                  <Utensils className="w-6 h-6 text-amber-400 mb-2" />
                  <div className="text-white font-bold text-sm mb-1">精緻料理</div>
                  <div className="text-slate-400 text-xs">頂級鮮製義大利麵、特色主食與手作甜點</div>
                </div>
                <div className="p-4 rounded border border-slate-800 bg-slate-950/60">
                  <GlassWater className="w-6 h-6 text-teal-400 mb-2" />
                  <div className="text-white font-bold text-sm mb-1">隨性氛圍</div>
                  <div className="text-slate-400 text-xs">放鬆無負擔的餐酒體驗，越夜越熱鬧</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-xl overflow-hidden border border-cyan-500/30 p-2 bg-slate-950 shadow-[0_0_30px_rgba(6,182,212,0.15)]">
                <div className="relative h-96 rounded-lg overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&q=80&w=800" 
                    alt="來生餐酒館廢土霓虹風格酒吧環境" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 p-4 bg-slate-900/90 backdrop-blur-md rounded border border-slate-800">
                    <div className="text-xs font-mono text-cyan-400 mb-1">// SPATIAL_VIBE</div>
                    <div className="text-sm font-semibold text-white">「廢土的粗曠，未來的霓虹」</div>
                    <div className="text-xs text-slate-400 mt-1">舊金山 Mission District 最適合微醺與享受 Pasta 的獨特空間。</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FEAT_01: Modular Menu Section */}
      <section id="menu" className="py-24 bg-slate-950 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="font-mono text-amber-400 text-sm tracking-widest uppercase mb-2">
              // FEAT_01 // MODULAR_MENU
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
              模組化精選菜單 (Menu)
            </h2>
            <p className="text-slate-400 mt-3 font-light text-base sm:text-lg">
              挑選舊金山在地優質食材，資訊層級清晰，支援人氣標籤、素食及辣度提示。
            </p>

            {/* Category Filter Tabs (FEAT_01 requirement) */}
            <div className="flex flex-wrap justify-center gap-2 mt-8 font-mono">
              {menuCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={`px-4 py-2 rounded text-xs sm:text-sm font-medium transition-all ${
                    activeTab === cat.id
                      ? 'bg-cyan-500 text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.4)] font-bold'
                      : 'bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Menu Items Grid (Responsive & Mobile Friendly) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMenu.map((item) => (
              <div 
                key={item.id} 
                className="group rounded-xl bg-slate-900/70 border border-slate-800/90 hover:border-cyan-500/50 overflow-hidden transition-all duration-300 flex flex-col justify-between hover:shadow-[0_0_25px_rgba(6,182,212,0.15)] hover:-translate-y-1"
              >
                {/* Menu Card Image */}
                <div className="relative h-48 overflow-hidden bg-slate-950">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                  
                  {/* Indicators / Badges */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    {item.isPopular && (
                      <span className="px-2 py-0.5 rounded bg-amber-500 text-slate-950 font-bold font-mono text-[11px] shadow-md flex items-center gap-1">
                        <Star className="w-3 h-3 fill-slate-950" /> 人氣首選
                      </span>
                    )}
                    {item.isVegetarian && (
                      <span className="px-2 py-0.5 rounded bg-emerald-500 text-slate-950 font-bold font-mono text-[11px] shadow-md">
                        🌱 可素食
                      </span>
                    )}
                  </div>

                  {/* Spicy indicator */}
                  {item.spicyLevel > 0 && (
                    <div className="absolute top-3 right-3 px-2 py-0.5 rounded bg-slate-900/90 border border-red-500/40 text-red-400 font-mono text-[11px] flex items-center gap-0.5">
                      {Array.from({ length: item.spicyLevel }).map((_, i) => (
                        <Flame key={i} className="w-3 h-3 text-red-500 fill-red-500" />
                      ))}
                    </div>
                  )}

                  <span className="absolute bottom-3 right-3 font-mono font-extrabold text-amber-400 text-xl bg-slate-950/90 px-3 py-1 rounded border border-amber-400/30">
                    {item.price}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {item.name}
                    </h3>
                    <div className="text-xs font-mono text-slate-400 mb-2">
                      {item.enName}
                    </div>
                    <p className="text-slate-300 text-sm leading-relaxed mb-4 font-light">
                      {item.desc}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-800/80">
                    {item.tags.map((tag, idx) => (
                      <span 
                        key={idx}
                        className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center font-mono text-xs text-slate-500">
            * 所有料理與甜點均標示單價，提供無障礙與行動版最優化讀取體驗。
          </div>
        </div>
      </section>

      {/* FEAT_04: Spatial Gallery Section with Lightbox */}
      <section id="gallery" className="py-24 bg-slate-900/40 border-t border-slate-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <div className="font-mono text-cyan-400 text-sm tracking-widest uppercase mb-1">
                // FEAT_04 // VISUAL_GALLERY
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                視覺圖庫展演 (Gallery)
              </h2>
            </div>
            <p className="text-slate-400 text-sm font-light max-w-md mt-4 md:mt-0">
              涵蓋餐點、飲品、室內空間與外觀環境（支援點擊 Modal 放大檢視圖庫）。
            </p>
          </div>

          {/* Gallery Grid - 6 Items (FEAT_04 Requirement) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryItems.map((item) => (
              <div 
                key={item.id} 
                onClick={() => setSelectedImage(item)}
                className="group relative rounded-xl overflow-hidden border border-slate-800 bg-slate-950 aspect-[4/3] cursor-pointer shadow-lg hover:border-cyan-500/60 transition-all duration-300"
              >
                {/* Image with proper alt tag */}
                <img 
                  src={item.url} 
                  alt={item.alt} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-85 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-90 group-hover:opacity-75 transition-opacity" />
                
                {/* Hover zoom icon */}
                <div className="absolute top-3 right-3 p-2 rounded-full bg-slate-950/80 border border-slate-700 text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-4 h-4" />
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-5 font-mono">
                  <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 mb-2 inline-block">
                    {item.category}
                  </span>
                  <h4 className="text-white font-bold text-base mb-1">{item.title}</h4>
                  <p className="text-slate-300 text-xs font-sans font-light leading-snug">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Lightbox / Modal for FEAT_04 Photo Zoom */}
        {selectedImage && (
          <div 
            className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div 
              className="relative max-w-4xl w-full bg-slate-900 border border-cyan-500/40 rounded-xl overflow-hidden shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-950/80 text-slate-300 hover:text-white border border-slate-700 hover:border-cyan-400"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="relative max-h-[70vh] overflow-hidden bg-black flex items-center justify-center">
                <img 
                  src={selectedImage.url} 
                  alt={selectedImage.alt}
                  className="w-full max-h-[70vh] object-contain"
                />
              </div>

              <div className="p-6 bg-slate-900 font-mono">
                <div className="text-xs text-cyan-400 mb-1">// {selectedImage.category}</div>
                <h3 className="text-xl font-bold text-white mb-2">{selectedImage.title}</h3>
                <p className="text-slate-300 text-sm font-sans">{selectedImage.desc}</p>
                <div className="mt-3 text-[11px] text-slate-500 border-t border-slate-800 pt-3">
                  圖片替代文字 (&lt;alt&gt;): "{selectedImage.alt}"
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* FEAT_02: Interactive Reservation Form */}
      <section id="reservation" className="py-24 bg-slate-950 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="rounded-2xl border border-cyan-500/30 bg-slate-900/90 p-6 sm:p-10 shadow-[0_0_40px_rgba(6,182,212,0.1)] backdrop-blur-xl relative">
            
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center space-x-2 text-cyan-400 font-mono text-xs mb-2">
                <Calendar className="w-4 h-4" />
                <span>// FEAT_02 // RESERVATION_FORM</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                互動線上訂位表單 (Reservation)
              </h2>
              <p className="text-slate-400 text-sm mt-2">
                請填寫必填預約資訊，系統即時提供驗證與成功狀態確認。
              </p>
            </div>

            {/* Disclaimer Banner (Required by FEAT_02) */}
            <div className="mb-8 p-3.5 rounded-lg border border-amber-500/40 bg-amber-950/30 text-amber-300 text-xs font-mono flex items-center gap-2">
              <AlertCircle className="w-5 h-5 flex-shrink-0 text-amber-400" />
              <span>⚠️ 免責聲明：此為課堂展示表單與範例 UI，不得誤導為真實門市訂位系統。</span>
            </div>

            {/* Validation Error Banner */}
            {errorMessage && (
              <div className="mb-6 p-4 rounded-lg bg-red-950/60 border border-red-500/50 text-red-200 text-sm font-mono flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleReservationSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Name [Required] */}
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-2">
                    訂位人姓名 / Full Name <span className="text-cyan-400">*必填</span>
                  </label>
                  <input 
                    type="text" 
                    name="name"
                    required
                    value={reservationForm.name}
                    onChange={handleReservationChange}
                    placeholder="例：陳大文 (Alex Chen)"
                    className="w-full px-4 py-3 rounded bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 transition-colors font-sans"
                  />
                </div>

                {/* Phone [Required] */}
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-2">
                    聯絡電話 / Phone <span className="text-cyan-400">*必填</span>
                  </label>
                  <input 
                    type="tel" 
                    name="phone"
                    required
                    value={reservationForm.phone}
                    onChange={handleReservationChange}
                    placeholder="+1 (415) 888-2077"
                    className="w-full px-4 py-3 rounded bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 transition-colors font-sans"
                  />
                </div>

                {/* Email [Required] */}
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-2">
                    電子郵件 / Email <span className="text-cyan-400">*必填</span>
                  </label>
                  <input 
                    type="email" 
                    name="email"
                    required
                    value={reservationForm.email}
                    onChange={handleReservationChange}
                    placeholder="alex@example.com"
                    className="w-full px-4 py-3 rounded bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 transition-colors font-sans"
                  />
                </div>

                {/* Guests [Required] */}
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-2">
                    用餐人數 / Guests <span className="text-cyan-400">*必填</span>
                  </label>
                  <select 
                    name="guests"
                    value={reservationForm.guests}
                    onChange={handleReservationChange}
                    className="w-full px-4 py-3 rounded bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400 transition-colors font-sans"
                  >
                    <option value="1">1 位 (Single Stalker)</option>
                    <option value="2">2 位 (Dual Team)</option>
                    <option value="3-4">3 - 4 位 (Small Squad)</option>
                    <option value="5-8">5 - 8 位 (Party Crew)</option>
                    <option value="8+">8 位以上 (Large Group)</option>
                  </select>
                </div>

                {/* Date [Required & Anti-Past Date Validation] */}
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-2">
                    用餐日期 / Date <span className="text-cyan-400">*必填 (不可為過去時間)</span>
                  </label>
                  <input 
                    type="date" 
                    name="date"
                    required
                    min={todayDateStr}
                    value={reservationForm.date}
                    onChange={handleReservationChange}
                    className="w-full px-4 py-3 rounded bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400 transition-colors font-sans"
                  />
                </div>

                {/* Time [Required] */}
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-2">
                    預計時段 / Time <span className="text-cyan-400">*必填</span>
                  </label>
                  <select 
                    name="time"
                    value={reservationForm.time}
                    onChange={handleReservationChange}
                    className="w-full px-4 py-3 rounded bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400 transition-colors font-sans"
                  >
                    <option value="17:30">17:30 (Dinner Opening)</option>
                    <option value="19:00">19:00 (Prime Dinner)</option>
                    <option value="20:30">20:30 (Late Dinner)</option>
                    <option value="22:00">22:00 (Cyber Bar Night)</option>
                    <option value="23:30">23:30 (Afterlife Midnight)</option>
                  </select>
                </div>

                {/* Seating Preference [Optional - FEAT_02] */}
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-2">
                    座位偏好 / Seating Preference (選填)
                  </label>
                  <select 
                    name="seatingPreference"
                    value={reservationForm.seatingPreference}
                    onChange={handleReservationChange}
                    className="w-full px-4 py-3 rounded bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400 transition-colors font-sans"
                  >
                    <option value="standard">無特別偏好 (由店家安排)</option>
                    <option value="bar">復古霓虹吧檯區 (適合 1-2 人)</option>
                    <option value="quiet">靠牆舒適沙發區</option>
                    <option value="window">臨街景用餐區</option>
                  </select>
                </div>

                {/* High Chair [Optional - FEAT_02] */}
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-2">
                    兒童座椅需求 / High Chair (選填)
                  </label>
                  <select 
                    name="highChair"
                    value={reservationForm.highChair}
                    onChange={handleReservationChange}
                    className="w-full px-4 py-3 rounded bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400 transition-colors font-sans"
                  >
                    <option value="no">不需要兒童座椅</option>
                    <option value="1">需要 1 張兒童座椅</option>
                    <option value="2">需要 2 張兒童座椅</option>
                  </select>
                </div>

              </div>

              {/* Special Notes [Optional - FEAT_02] */}
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-2">
                  特殊需求或飲食限制 / Special Requests (選填)
                </label>
                <textarea 
                  name="notes"
                  rows="3"
                  value={reservationForm.notes}
                  onChange={handleReservationChange}
                  placeholder="食材過敏、生日紀念日慶祝、其他特殊說明..."
                  className="w-full px-4 py-3 rounded bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 transition-colors font-sans resize-none"
                />
              </div>

              {/* Submit Button */}
              <button 
                type="submit"
                className="w-full py-4 rounded bg-gradient-to-r from-cyan-500 via-teal-500 to-amber-500 hover:opacity-95 text-slate-950 font-bold text-lg shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all cursor-pointer"
              >
                送出預約申請與資料驗證
              </button>
            </form>

          </div>

        </div>

        {/* Modal for Reservation Success & Data Summary (FEAT_02 requirement) */}
        {reservationSummary && (
          <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-cyan-500/50 rounded-2xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative font-sans space-y-5">
              <div className="w-14 h-14 bg-cyan-500/20 text-cyan-400 rounded-full flex items-center justify-center mx-auto border border-cyan-400">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="text-center space-y-1">
                <h3 className="text-2xl font-bold text-white">預約資料送出成功！</h3>
                <p className="text-xs font-mono text-cyan-400">// RESERVATION_SUMMARY_GENERATED</p>
              </div>

              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 font-mono text-xs space-y-2">
                <div className="flex justify-between border-b border-slate-800 pb-1.5">
                  <span className="text-slate-400">訂位姓名：</span>
                  <span className="text-white font-bold">{reservationSummary.name}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-1.5">
                  <span className="text-slate-400">聯絡電話：</span>
                  <span className="text-white">{reservationSummary.phone}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-1.5">
                  <span className="text-slate-400">Email：</span>
                  <span className="text-white">{reservationSummary.email}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-1.5">
                  <span className="text-slate-400">用餐時間：</span>
                  <span className="text-amber-400 font-bold">{reservationSummary.date} @ {reservationSummary.time}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-1.5">
                  <span className="text-slate-400">人數 / 座位：</span>
                  <span className="text-white">{reservationSummary.guests} 人 ({reservationSummary.seatingPreference})</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-1.5">
                  <span className="text-slate-400">兒童座椅：</span>
                  <span className="text-white">{reservationSummary.highChair === 'no' ? '無需求' : `${reservationSummary.highChair} 張`}</span>
                </div>
                {reservationSummary.notes && (
                  <div className="pt-1 text-slate-300">
                    <span className="text-slate-500">備註：</span>{reservationSummary.notes}
                  </div>
                )}
              </div>

              <div className="p-3 rounded bg-amber-950/40 border border-amber-500/30 text-amber-300 text-[11px] font-mono leading-relaxed text-center">
                ⚠️ 此為課堂展示表單摘要，未對外連接真實訂位系統。
              </div>

              <button 
                onClick={closeReservationModal}
                className="w-full py-3 rounded bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition-colors"
              >
                了解並關閉視窗
              </button>
            </div>
          </div>
        )}
      </section>

      {/* FEAT_03: Google Maps Spatial Location Section */}
      <section id="info" className="py-24 bg-slate-900/60 border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Operational Info Left */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <div className="font-mono text-cyan-400 text-sm tracking-widest uppercase mb-1">
                  // FEAT_03 // OPERATIONAL_INFO
                </div>
                <h2 className="text-3xl font-extrabold text-white">
                  門市營業與交通資訊
                </h2>
                <p className="text-slate-400 text-sm mt-2">
                  嚴格對應舊金山 Mission District 展示門市地址。
                </p>
              </div>

              <div className="space-y-6 font-mono text-sm">
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded bg-slate-950 border border-slate-800 text-cyan-400">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-slate-400 text-xs">// 門市地址 ADDRESS</div>
                    <div className="text-white font-bold text-base mt-1">
                      777 Mission St, Mission District
                    </div>
                    <div className="text-slate-300 text-xs">San Francisco, CA 94103, USA</div>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded bg-slate-950 border border-slate-800 text-amber-400">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-slate-400 text-xs">// 營業時間 HOURS</div>
                    <div className="text-white font-semibold mt-1">
                      週二至週四：17:00 - 01:00
                    </div>
                    <div className="text-white font-semibold">
                      週五至週日：17:00 - 02:30 (深夜賽博酒吧)
                    </div>
                    <div className="text-slate-500 text-xs mt-0.5">* 每週一公休 (Closed on Mondays)</div>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded bg-slate-950 border border-slate-800 text-teal-400">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-slate-400 text-xs">// 聯絡電話與 Email CONTACT</div>
                    <div className="text-white font-semibold mt-1">+1 (415) 888-2077</div>
                    <div className="text-slate-300 text-xs">contact@afterlife-sf.com</div>
                  </div>
                </div>
              </div>

              {/* Transportation Notes */}
              <div className="p-4 rounded border border-slate-800 bg-slate-950/80 text-xs text-slate-400 space-y-2">
                <div className="text-white font-bold font-mono text-sm flex items-center gap-1.5">
                  <Info className="w-4 h-4 text-cyan-400" />
                  舊金山大眾運輸與停車指引
                </div>
                <p>
                  ・搭乘捷運 BART 至 24th St Mission 站，出站步行約 5 分鐘。
                </p>
                <p>
                  ・自行開車周邊設有路邊收費車位與特約停車場。
                </p>
              </div>
            </div>

            {/* FEAT_03 Google Maps Iframe & Direct Link Right */}
            <div className="lg:col-span-7 flex flex-col">
              <div className="flex-1 min-h-[400px] rounded-xl border border-cyan-500/30 bg-slate-950 overflow-hidden relative flex flex-col shadow-xl">
                
                {/* Header bar */}
                <div className="flex justify-between items-center bg-slate-900 px-4 py-3 border-b border-slate-800 font-mono text-xs">
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
                    <span className="text-slate-300 ml-2">GOOGLE_MAPS_IFRAME_EMBED</span>
                  </div>
                  <span className="text-cyan-400 hidden sm:inline">SAN FRANCISCO, CA</span>
                </div>

                {/* Google Maps Real Iframe (FEAT_03 requirement) */}
                <div className="w-full flex-1 min-h-[340px] relative bg-slate-950">
                  <iframe 
                    title="來生餐酒館舊金山 Google 地圖"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.086389270278!2d-122.406417!3d37.785834!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808580878939c36d%3A0x1d36d24660d5c0bf!2s777%20Mission%20St%2C%20San%20Francisco%2C%20CA%2094103!5e0!3m2!1szh-TW!2sus!4v1700000000000!5m2!1szh-TW!2sus"
                    className="w-full h-full border-0 absolute inset-0 filter saturate-125 contrast-110"
                    allowFullScreen="" 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>

                {/* Direct Google Maps External Navigation Link (FEAT_03 requirement) */}
                <div className="p-4 bg-slate-900 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-xs">
                  <span className="text-slate-300">
                    📍 嚴格對應地址：777 Mission St, San Francisco, CA 94103
                  </span>
                  <a 
                    href="https://maps.google.com/?q=777+Mission+St,+San+Francisco,+CA+94103" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-4 py-2 rounded bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>在 Google Maps 中開啟導航</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-slate-950 border-t border-slate-900 font-mono text-xs text-slate-500 text-center">
        <div className="max-w-7xl mx-auto px-4">
          <p>© {new Date().getFullYear()} AFTERLIFE BISTRO & BAR (來生餐酒館). All Rights Reserved.</p>
          <p className="mt-1 text-slate-600">San Francisco, California // Retro-Futuristic Post-Apocalyptic Dining Experience</p>
        </div>
      </footer>

    </div>
  );
}