import React, { useState } from 'react';
import { Translation } from '../types';
import { Database, Server, Smartphone, DollarSign, Layers, Globe, Code, PlayCircle, Terminal, Zap } from 'lucide-react';

interface Props {
  t: Translation;
  lang: string;
}

const BizPlan: React.FC<Props> = ({ t, lang }) => {
  const [activeTab, setActiveTab] = useState<'architecture' | 'backend' | 'playstore'>('architecture');
  const isRtl = lang === 'ar';
  
  return (
    <div className={`max-w-5xl mx-auto p-4 md:p-8 space-y-8 ${isRtl ? 'rtl' : 'ltr'}`}>
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-100 font-bold text-sm uppercase tracking-wide">
            <Zap size={16} className="fill-emerald-700" /> Professional Roadmap
        </div>
        <h1 className="text-4xl font-black text-slate-900 mb-3 tracking-tight">Souqvia Master Plan</h1>
        <p className="text-slate-500 max-w-2xl mx-auto font-medium">Your step-by-step technical and business guide to launching the leading e-commerce aggregator in Algeria.</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 mb-8 overflow-x-auto gap-2 no-scrollbar">
        <button 
            onClick={() => setActiveTab('architecture')}
            className={`px-6 py-4 font-bold text-sm whitespace-nowrap border-b-2 transition-all ${activeTab === 'architecture' ? 'border-brand-primary text-brand-primary' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
        >
            <Server className="inline-block w-4 h-4 mr-2"/> Architecture & Monetization
        </button>
        <button 
            onClick={() => setActiveTab('backend')}
            className={`px-6 py-4 font-bold text-sm whitespace-nowrap border-b-2 transition-all ${activeTab === 'backend' ? 'border-brand-primary text-brand-primary' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
        >
            <Code className="inline-block w-4 h-4 mr-2"/> Real-World Python Backend
        </button>
        <button 
            onClick={() => setActiveTab('playstore')}
            className={`px-6 py-4 font-bold text-sm whitespace-nowrap border-b-2 transition-all ${activeTab === 'playstore' ? 'border-brand-primary text-brand-primary' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
        >
            <PlayCircle className="inline-block w-4 h-4 mr-2"/> App Store Deployment
        </button>
      </div>

      {activeTab === 'architecture' && (
        <div className="space-y-8 animate-fadeIn">
            {/* Architecture Section */}
            <section className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
                <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-emerald-100 rounded-2xl text-emerald-700">
                    <Server size={28} />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">Technical Foundation</h2>
                    <p className="text-sm text-slate-500">The infrastructure behind Souqvia.</p>
                </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                        <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2"><Smartphone size={18} className="text-brand-primary"/> Client</h3>
                        <p className="text-sm text-slate-600 leading-relaxed">Modern React/Next.js PWA. Optimized for Algerian mobile speeds (3G/4G). Runs smooth on low-end devices.</p>
                    </div>
                    <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                        <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2"><Globe size={18} className="text-brand-primary"/> Discovery API</h3>
                        <p className="text-sm text-slate-600 leading-relaxed">FastAPI (Python) core. Handles real-time scraping, caching, and AI-driven relevance ranking for the Algerian market.</p>
                    </div>
                    <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                        <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2"><Database size={18} className="text-brand-primary"/> Data Layer</h3>
                        <p className="text-sm text-slate-600 leading-relaxed">PostgreSQL for storage. Redis for ultra-fast search results. Cloudinary for optimized product images.</p>
                    </div>
                </div>
            </section>

             {/* Monetization */}
            <section className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
                <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-blue-100 rounded-2xl text-blue-700">
                    <DollarSign size={28} />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">Revenue Streams</h2>
                    <p className="text-sm text-slate-500">How Souqvia generates profit in Algeria.</p>
                </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                <div className="p-6 border border-emerald-100 bg-emerald-50/30 rounded-2xl">
                    <h3 className="font-bold text-slate-900 mb-2">Jumia Affiliates</h3>
                    <p className="text-sm text-slate-600">Earn 3-10% commission on every sale referred to Jumia DZ via the "Go to Store" button.</p>
                </div>
                <div className="p-6 border border-blue-100 bg-blue-50/30 rounded-2xl">
                    <h3 className="font-bold text-slate-900 mb-2">Promoted Shops</h3>
                    <p className="text-sm text-slate-600">Local "Boutiques" pay a fixed fee (e.g., 5000 DZD/mo) to have their products pinned at the top of search.</p>
                </div>
                <div className="p-6 border border-slate-100 bg-slate-50 rounded-2xl">
                    <h3 className="font-bold text-slate-900 mb-2">DZ-Targeted Ads</h3>
                    <p className="text-sm text-slate-600">Integration with AdMob or local ad networks to show relevant offers to shoppers.</p>
                </div>
                </div>
            </section>
        </div>
      )}

      {activeTab === 'backend' && (
          <div className="space-y-6 animate-fadeIn">
              <div className="bg-slate-900 text-slate-300 p-8 rounded-3xl font-mono text-sm overflow-x-auto border border-slate-800 shadow-2xl">
                  <div className="flex items-center justify-between mb-6 border-b border-slate-800 pb-4">
                      <div className="flex items-center gap-3">
                        <Terminal className="text-emerald-400" size={20}/> 
                        <span className="text-white font-bold tracking-tight">Souqvia Backend Core (Python)</span>
                      </div>
                      <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest bg-slate-800 px-2 py-1 rounded">FastAPI + Scrapers</span>
                  </div>
                  <pre className="no-scrollbar">{`# --- SOUQVIA PRODUCTION BACKEND BLUEPRINT ---
from fastapi import FastAPI, Query
from typing import List
import requests
from bs4 import BeautifulSoup
import asyncio

app = FastAPI(title="Souqvia AI Discovery Engine")

# This simulated worker handles scraping multiple sources concurrently
async def fetch_dz_market(source: str, query: str):
    # Example logic for Ouedkniss or Jumia
    if source == "jumia":
        url = f"https://www.jumia.dz/catalog/?q={query}"
        # ... logic to parse BeautifulSoup ...
        return {"store": "Jumia", "items": []}
    return {"store": source, "items": []}

@app.get("/api/v1/search")
async def search(q: str = Query(..., min_length=2)):
    """The main entry point for Souqvia search results"""
    tasks = [
        fetch_dz_market("jumia", q),
        fetch_dz_market("ouedkniss", q),
        fetch_dz_market("marketplace", q)
    ]
    results = await asyncio.gather(*tasks)
    
    # Flatten and sort by AI Relevance / Price
    flat_results = [item for sublist in results for item in sublist["items"]]
    return {"query": q, "count": len(flat_results), "results": flat_results}

# Deployment Tip: Host this on Railway.app or Heroku for Algerian users.
`}</pre>
              </div>
              <div className="flex items-center gap-4 bg-emerald-50 p-6 rounded-2xl border border-emerald-100">
                  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 flex-shrink-0">
                      <Code size={24}/>
                  </div>
                  <div>
                      <h4 className="font-bold text-emerald-900">Developer Note</h4>
                      <p className="text-sm text-emerald-700">Use <strong>Playwright</strong> for headless browser scraping of JavaScript-heavy sites like Ouedkniss to ensure accurate data extraction.</p>
                  </div>
              </div>
          </div>
      )}

      {activeTab === 'playstore' && (
          <div className="space-y-6 animate-fadeIn">
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 bg-amber-100 rounded-2xl text-amber-700">
                        <PlayCircle size={28} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900">Google Play Deployment</h2>
                        <p className="text-sm text-slate-500">Transform Souqvia from a website to a mobile app.</p>
                    </div>
                  </div>

                  <div className="grid gap-6">
                      <div className="flex gap-6 p-6 hover:bg-slate-50 rounded-2xl transition-colors group">
                          <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-bold flex-shrink-0 group-hover:scale-110 transition-transform">1</div>
                          <div>
                              <h3 className="font-bold text-slate-900 text-lg mb-1">Verify Domain Ownership</h3>
                              <p className="text-sm text-slate-500 leading-relaxed">Publish a <code>digital-asset-links.json</code> file on your domain to verify your site for Google’s Trusted Web Activity (TWA).</p>
                          </div>
                      </div>

                      <div className="flex gap-6 p-6 hover:bg-slate-50 rounded-2xl transition-colors group">
                          <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-bold flex-shrink-0 group-hover:scale-110 transition-transform">2</div>
                          <div>
                              <h3 className="font-bold text-slate-900 text-lg mb-1">Build with Bubblewrap</h3>
                              <p className="text-sm text-slate-500 mb-3">The industry standard tool for converting high-quality PWAs like Souqvia into Play Store bundles.</p>
                              <div className="bg-slate-900 text-emerald-400 p-4 rounded-xl font-mono text-xs shadow-inner">
                                  bubblewrap init --manifest=https://souqvia.dz/manifest.json<br/>
                                  bubblewrap build
                              </div>
                          </div>
                      </div>

                      <div className="flex gap-6 p-6 hover:bg-slate-50 rounded-2xl transition-colors group">
                          <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-bold flex-shrink-0 group-hover:scale-110 transition-transform">3</div>
                          <div>
                              <h3 className="font-bold text-slate-900 text-lg mb-1">Play Console Submission</h3>
                              <p className="text-sm text-slate-500 leading-relaxed">Upload your <code>.aab</code> file. Set your target country to <strong>Algeria</strong>. Provide high-quality screenshots showing the AI search experience.</p>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      )}

    </div>
  );
};

export default BizPlan;
