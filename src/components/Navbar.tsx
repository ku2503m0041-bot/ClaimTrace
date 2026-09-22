import React, { useState } from 'react';
import { Shield, BookOpen, Menu, X, Compass, ExternalLink, Activity } from 'lucide-react';
import { AudioAtmosphere } from './AudioAtmosphere';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const navItems = [
  { id: 'opening', label: 'The ₹5L Story', short: 'Opening' },
  { id: 'meet-data', label: 'Meet the Data', short: 'Data' },
  { id: 'follow-money', label: 'Follow Every Rupee', short: 'Money Flow' },
  { id: 'journey', label: 'Claim Journey', short: 'Journey' },
  { id: 'deductions', label: 'What Gets Deducted?', short: 'Deductions' },
  { id: 'glossary', label: 'Decode Your Policy', short: 'Glossary' },
  { id: 'people', label: 'People Behind Claims', short: 'People' },
  { id: 'anomalies', label: 'When Data Looks Unusual', short: 'Anomalies' },
  { id: 'macro', label: 'The Wider Picture', short: 'India Macro' },
  { id: 'synthesis', label: 'What Data Tells Us', short: 'Findings' },
  { id: 'explorer', label: 'Claim Sandbox', short: 'Explorer' },
  { id: 'sources', label: 'Sources & Methods', short: 'Sources' },
];

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSelect = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#faf9f5]/90 backdrop-blur-md border-b border-stone-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Brand Header */}
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => handleSelect('opening')}
          >
            <div className="w-9 h-9 rounded bg-stone-900 text-amber-400 flex items-center justify-center font-serif font-bold text-lg shadow-sm group-hover:bg-amber-950 transition-colors">
              CT
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif font-bold text-lg text-stone-900 tracking-tight">
                  ClaimTrace
                </span>
                <span className="hidden sm:inline-block text-[10px] uppercase font-mono tracking-widest px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-200">
                  Editorial Investigation
                </span>
              </div>
              <p className="text-[11px] text-stone-500 hidden md:block">
                Health Insurance Data Intelligence & Transparency Project
              </p>
            </div>
          </div>

          {/* Right Header Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <AudioAtmosphere />
            <div className="h-4 w-px bg-stone-200 mx-1" />
            <button
              id="btn-nav-sandbox"
              onClick={() => handleSelect('explorer')}
              className={`text-xs font-mono font-medium px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-all ${
                activeTab === 'explorer'
                  ? 'bg-amber-900 text-white'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              <Activity className="w-3.5 h-3.5 text-amber-400" />
              <span>Explore Claims</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-2 lg:hidden">
            <AudioAtmosphere />
            <button
              id="btn-mobile-menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-stone-600 hover:text-stone-900 hover:bg-stone-100"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Desktop Chapter Navigation Tabs */}
        <div className="hidden lg:flex items-center gap-1 overflow-x-auto py-1 border-t border-stone-200/50 scrollbar-none text-xs font-medium text-stone-600">
          {navItems.map((item, index) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`tab-${item.id}`}
                onClick={() => handleSelect(item.id)}
                className={`whitespace-nowrap px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-stone-900 text-white shadow-sm font-semibold'
                    : 'hover:text-stone-950 hover:bg-stone-200/60'
                }`}
              >
                <span className={`text-[10px] font-mono ${isActive ? 'text-amber-300' : 'text-stone-400'}`}>
                  0{index + 1}
                </span>
                <span>{item.short}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-200 bg-[#faf9f5] px-4 pt-3 pb-6 space-y-1 shadow-lg max-h-[80vh] overflow-y-auto">
          <div className="text-[11px] font-mono uppercase text-stone-400 px-3 py-1">
            Story Chapters & Investigations
          </div>
          {navItems.map((item, index) => (
            <button
              key={item.id}
              onClick={() => handleSelect(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-colors text-left ${
                activeTab === item.id
                  ? 'bg-stone-900 text-white font-semibold'
                  : 'text-stone-700 hover:bg-stone-100'
              }`}
            >
              <span>{item.label}</span>
              <span className="text-xs font-mono opacity-60">Chapter 0{index + 1}</span>
            </button>
          ))}
        </div>
      )}
    </header>
  );
};
