
import React, { useState, useEffect, useCallback } from 'react';
import { HashRouter, Routes, Route, Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Search, Home, LayoutGrid, Menu, X, Filter, LogIn, ChevronRight, Zap, ShoppingBag } from 'lucide-react';
import { Product, Language, SearchFilters } from './types';
import { MOCK_TRENDING_PRODUCTS, TRANSLATIONS, WILAYAS } from './constants';
import ProductCard from './components/ProductCard';
import ProductDetails from './components/ProductDetails';
import LanguageSwitcher from './components/LanguageSwitcher';
import BizPlan from './components/BizPlan';
import { searchProductsWithGemini, getSmartRecommendations } from './services/geminiService';

// --- Header Component ---
const Header = ({ 
  lang, 
  setLang, 
  t, 
  user, 
  handleLogin 
}: { 
  lang: Language, 
  setLang: (l: Language) => void, 
  t: any, 
  user: any, 
  handleLogin: () => void 
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="relative w-9 h-9 bg-brand-primary rounded-xl flex items-center justify-center shadow-lg shadow-emerald-200 group-hover:rotate-6 transition-transform">
                 <Zap className="text-white fill-white" size={20} />
                 <div className="absolute -top-1 -right-1 w-3 h-3 bg-brand-accent rounded-full border-2 border-white"></div>
              </div>
              <div className="flex flex-col -space-y-1">
                <span className="text-xl font-bold text-slate-900 tracking-tight">
                  Souqvia
                </span>
                <span className="text-[10px] font-bold text-brand-primary uppercase tracking-[0.2em]">AI Powered</span>
              </div>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
             <Link to="/" className="text-slate-600 hover:text-brand-primary font-medium transition-colors">{t.search}</Link>
             <Link to="/bizplan" className="text-slate-600 hover:text-brand-primary font-medium transition-colors">{t.techPlan}</Link>
             <div className="h-4 w-px bg-slate-200"></div>
             <LanguageSwitcher currentLang={lang} onLanguageChange={setLang} />
             {user ? (
               <div className="flex items-center gap-3">
                 <div className="text-right">
                    <div className="text-xs font-bold text-slate-900">{user.name}</div>
                    <div className="text-[10px] text-slate-500">Member</div>
                 </div>
                 <img src={user.avatar} alt="User" className="w-9 h-9 rounded-full ring-2 ring-emerald-100" />
               </div>
             ) : (
               <button 
                onClick={handleLogin}
                className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-xl hover:bg-slate-800 transition-all active:scale-95 shadow-lg shadow-slate-200"
               >
                 <LogIn size={16} />
                 <span className="font-semibold">{t.login}</span>
               </button>
             )}
          </div>

          <div className="md:hidden flex items-center gap-3">
             <LanguageSwitcher currentLang={lang} onLanguageChange={setLang} />
             <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-slate-600 bg-slate-50 rounded-lg">
               {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
             </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-100 px-4 py-6 space-y-4 animate-in slide-in-from-top duration-300">
          <Link to="/" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 py-3 text-slate-700 font-medium">
            <Home size={18} className="text-brand-primary"/> {t.search}
          </Link>
          <Link to="/bizplan" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 py-3 text-slate-700 font-medium">
            <LayoutGrid size={18} className="text-brand-primary"/> {t.techPlan}
          </Link>
          <div className="pt-4 border-t border-slate-100">
            <button onClick={handleLogin} className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold">{t.login}</button>
          </div>
        </div>
      )}
    </header>
  );
};

// --- Home Page ---
const HomePage = ({ lang, t }: { lang: Language, t: any }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [trending, setTrending] = useState<Product[]>(MOCK_TRENDING_PRODUCTS);
  const [loadingTrending, setLoadingTrending] = useState(false);

  useEffect(() => {
    const fetchTrending = async () => {
        setLoadingTrending(true);
        const smart = await getSmartRecommendations(lang);
        if (smart.length > 0) {
            setTrending(prev => [...smart, ...prev].slice(0, 8)); 
        }
        setLoadingTrending(false);
    };
    fetchTrending();
  }, [lang]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const isRtl = lang === 'ar';

  return (
    <div className={`flex flex-col min-h-screen ${isRtl ? 'rtl' : 'ltr'}`}>
      {/* Hero Section */}
      <div className="relative bg-white pt-16 pb-24 px-4 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-emerald-50 rounded-full blur-3xl opacity-50 -z-10"></div>
        
        <div className="max-w-4xl mx-auto text-center space-y-8 relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
            <Zap size={14} className="fill-emerald-700" /> New: AI Search 2.0
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-[1.15] tracking-tight">
            {lang === 'ar' ? 'اكتشف أفضل صفقات التسوق في الجزائر' : lang === 'fr' ? 'Découvrez les meilleures offres en Algérie' : 'The Smartest Way to Shop in Algeria'}
          </h1>
          <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto font-medium">
            {lang === 'ar' 
              ? 'سوق فيا يجمع لك أفضل العروض من جوميا، واد كنيس، وفيسبوك بذكاء.' 
              : lang === 'fr' 
              ? 'Souqvia agrège intelligemment les meilleures offres de Jumia, Ouedkniss et Facebook.' 
              : 'Souqvia intelligently aggregates the best deals from Jumia, Ouedkniss, and Facebook in one place.'}
          </p>
          
          <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto group">
            <div className="absolute -inset-1 bg-gradient-to-r from-brand-primary to-emerald-400 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity"></div>
            <div className="relative flex bg-white rounded-2xl shadow-xl overflow-hidden p-1.5 border border-slate-200">
                <div className={`flex-1 relative flex items-center`}>
                    <Search className={`absolute ${isRtl ? 'right-4' : 'left-4'} text-slate-400`} size={20} />
                    <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t.searchPlaceholder}
                    className={`w-full h-14 ${isRtl ? 'pl-4 pr-12' : 'pl-12 pr-4'} bg-transparent border-none focus:ring-0 text-lg text-slate-900 font-medium`}
                    />
                </div>
                <button 
                    type="submit"
                    className="bg-slate-900 text-white px-8 rounded-xl font-bold hover:bg-emerald-600 transition-all active:scale-95 flex items-center gap-2"
                >
                    {t.search}
                </button>
            </div>
          </form>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-2.5 text-sm text-slate-600 pt-4">
            {['MacBook Air M2', 'PS5 Slim', 'Nike TN', 'S24 Ultra'].map(tag => (
              <button key={tag} 
                onClick={() => navigate(`/search?q=${tag}`)}
                className="px-4 py-1.5 bg-slate-50 border border-slate-200 rounded-lg cursor-pointer hover:border-brand-primary hover:text-brand-primary hover:bg-white transition-all font-medium"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Trending Section */}
      <div className="max-w-7xl mx-auto px-4 py-16 w-full">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
            <div>
                <h2 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
                    <ShoppingBag className="text-brand-primary" />
                    {t.trending}
                </h2>
                <p className="text-slate-500 mt-1">Hottest items updated in real-time by AI.</p>
            </div>
            <Link to="/search?q=trending" className="inline-flex items-center gap-2 bg-white border border-slate-200 px-5 py-2.5 rounded-xl text-slate-700 font-bold text-sm hover:border-brand-primary hover:text-brand-primary transition-colors shadow-sm">
                {t.newArrivals} <ChevronRight size={16} />
            </Link>
        </div>

        {loadingTrending ? (
             <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[1,2,3,4].map(n => <div key={n} className="h-80 bg-slate-200 rounded-2xl animate-pulse"></div>)}
             </div>
        ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {trending.map((p) => (
                <ProductCard 
                    key={p.id} 
                    product={p} 
                    onClick={() => navigate(`/product/${p.id}`, { state: { product: p } })} 
                    t={t} 
                    lang={lang} 
                />
            ))}
            </div>
        )}
      </div>
    </div>
  );
};

// --- Product Details Wrapper ---
const ProductDetailsPage = ({ lang, t }: { lang: Language, t: any }) => {
    const { id } = useParams();
    const location = useLocation();
    const product = location.state?.product || MOCK_TRENDING_PRODUCTS.find(p => p.id === id) || MOCK_TRENDING_PRODUCTS[0];
    return <ProductDetails product={product} t={t} lang={lang} />;
};

// --- Search Page ---
const SearchPage = ({ lang, t }: { lang: Language, t: any }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({});
  const [showFilters, setShowFilters] = useState(false);
  const query = new URLSearchParams(location.search).get('q') || '';

  const executeSearch = useCallback(async () => {
    if (!query) return;
    setLoading(true);
    const results = await searchProductsWithGemini(query, filters, lang);
    setProducts(results);
    setLoading(false);
  }, [query, filters, lang]);

  useEffect(() => {
    executeSearch();
  }, [executeSearch]);

  return (
    <div className={`max-w-7xl mx-auto px-4 py-10 ${lang === 'ar' ? 'rtl' : 'ltr'}`}>
        <div className="flex flex-col md:flex-row gap-10">
            {/* Filters Sidebar */}
            <div className={`md:w-72 flex-shrink-0 ${showFilters ? 'block' : 'hidden md:block'}`}>
                <div className="bg-white p-6 rounded-2xl border border-slate-200 sticky top-24 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-xl text-slate-900">{t.filters}</h3>
                        <button onClick={() => setShowFilters(false)} className="md:hidden p-2 bg-slate-50 rounded-lg"><X size={20}/></button>
                    </div>
                    
                    <div className="space-y-8">
                        <div>
                            <label className="block text-sm font-bold mb-3 text-slate-900 uppercase tracking-tight">{t.price} (DZD)</label>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-1">
                                    <span className="text-[10px] text-slate-400 font-bold uppercase">Min</span>
                                    <input 
                                        type="number" 
                                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-primary focus:bg-white outline-none"
                                        onChange={(e) => setFilters({...filters, minPrice: Number(e.target.value)})}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <span className="text-[10px] text-slate-400 font-bold uppercase">Max</span>
                                    <input 
                                        type="number" 
                                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-primary focus:bg-white outline-none"
                                        onChange={(e) => setFilters({...filters, maxPrice: Number(e.target.value)})}
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                             <label className="block text-sm font-bold mb-3 text-slate-900 uppercase tracking-tight">{t.condition}</label>
                             <div className="flex flex-wrap gap-2">
                                {['New', 'Used', 'Refurbished'].map(c => (
                                    <button 
                                        key={c}
                                        onClick={() => setFilters({...filters, condition: c})}
                                        className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${filters.condition === c ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-600 border-slate-200 hover:border-brand-primary'}`}
                                    >
                                        {c}
                                    </button>
                                ))}
                             </div>
                        </div>

                        <div>
                             <label className="block text-sm font-bold mb-3 text-slate-900 uppercase tracking-tight">{t.wilaya}</label>
                             <select 
                                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-brand-primary outline-none"
                                onChange={(e) => setFilters({...filters, location: e.target.value})}
                             >
                                <option value="">Everywhere in DZ</option>
                                {WILAYAS.map(w => <option key={w} value={w}>{w}</option>)}
                             </select>
                        </div>
                        
                        <button 
                            onClick={executeSearch}
                            className="w-full bg-brand-primary text-white py-4 rounded-xl font-bold hover:bg-emerald-700 shadow-lg shadow-emerald-100 transition-all active:scale-95"
                        >
                            Apply Discovery Filters
                        </button>
                    </div>
                </div>
            </div>

            {/* Results Grid */}
            <div className="flex-1">
                <div className="flex justify-between items-center mb-8 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                    <div>
                        <span className="text-slate-400 text-sm font-medium">Found results for:</span>
                        <h2 className="text-lg font-bold text-slate-900">"{query}"</h2>
                    </div>
                    <button 
                        onClick={() => setShowFilters(!showFilters)}
                        className="md:hidden flex items-center gap-2 px-4 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold shadow-lg shadow-slate-200"
                    >
                        <Filter size={16} /> {t.filters}
                    </button>
                </div>

                {loading ? (
                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1,2,3,4,5,6].map(n => (
                            <div key={n} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm animate-pulse">
                                <div className="h-56 bg-slate-100 rounded-xl mb-4"></div>
                                <div className="h-5 bg-slate-100 rounded w-3/4 mb-3"></div>
                                <div className="h-4 bg-slate-100 rounded w-1/2"></div>
                            </div>
                        ))}
                     </div>
                ) : products.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products.map(p => (
                            <ProductCard 
                                key={p.id} 
                                product={p} 
                                onClick={() => navigate(`/product/${p.id}`, { state: { product: p } })}
                                t={t}
                                lang={lang}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-24 bg-white rounded-3xl border-2 border-dashed border-slate-200">
                        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Search className="text-slate-300" size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-1">No matches found</h3>
                        <p className="text-slate-500 max-w-xs mx-auto">Our AI couldn't find exactly that. Try broadening your keywords or removing filters.</p>
                        <button onClick={() => setFilters({})} className="mt-6 text-brand-primary font-bold hover:underline">Clear all filters</button>
                    </div>
                )}
            </div>
        </div>
    </div>
  );
};


// --- Main App ---
export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const [user, setUser] = useState<any>(null);

  const t = TRANSLATIONS[lang];

  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  const handleLogin = () => {
    setUser({
        id: 'u1',
        name: 'Amine Ben',
        email: 'amine@souqvia.dz',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Amine'
    });
  };

  return (
    <HashRouter>
      <div className={`min-h-screen bg-slate-50 font-sans ${lang === 'ar' ? 'font-arabic' : ''}`}>
        <Header lang={lang} setLang={setLang} t={t} user={user} handleLogin={handleLogin} />
        
        <Routes>
          <Route path="/" element={<HomePage lang={lang} t={t} />} />
          <Route path="/search" element={<SearchPage lang={lang} t={t} />} />
          <Route path="/product/:id" element={<ProductDetailsPage lang={lang} t={t} />} />
          <Route path="/bizplan" element={<BizPlan t={t} lang={lang} />} />
        </Routes>

        <footer className="bg-slate-900 text-slate-400 py-16 mt-20">
            <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-12">
                <div className="col-span-2">
                    <div className="flex items-center gap-2 mb-4">
                         <Zap className="text-brand-primary fill-brand-primary" size={24} />
                         <span className="text-2xl font-bold text-white tracking-tight">Souqvia</span>
                    </div>
                    <p className="max-w-sm text-slate-400 text-sm leading-relaxed mb-6">
                        Souqvia is Algeria's first AI-powered marketplace aggregator. We help millions of Algerians discover the best prices across the digital landscape instantly.
                    </p>
                    <div className="flex gap-4">
                        <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-brand-primary hover:text-white transition-colors cursor-pointer">F</div>
                        <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-brand-primary hover:text-white transition-colors cursor-pointer">X</div>
                        <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-brand-primary hover:text-white transition-colors cursor-pointer">I</div>
                    </div>
                </div>
                <div>
                    <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-widest">Platform</h4>
                    <ul className="space-y-2 text-sm">
                        <li><Link to="/" className="hover:text-brand-primary transition-colors">Marketplace</Link></li>
                        <li><Link to="/search?q=trending" className="hover:text-brand-primary transition-colors">Trending</Link></li>
                        <li><Link to="/bizplan" className="hover:text-brand-primary transition-colors">API Docs</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-widest">Company</h4>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#" className="hover:text-brand-primary transition-colors">About DZ</a></li>
                        <li><a href="#" className="hover:text-brand-primary transition-colors">Privacy Policy</a></li>
                        <li><a href="#" className="hover:text-brand-primary transition-colors">Terms of Service</a></li>
                    </ul>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-slate-800 text-center text-xs">
                <p>© 2024 Souqvia Algeria Inc. Made with ❤️ for the 58 Wilayas.</p>
            </div>
        </footer>
      </div>
    </HashRouter>
  );
}
