import React from 'react';
import { Sparkles, Printer, RotateCcw } from 'lucide-react';

export type NavSection = 'home' | 'method' | 'chart' | 'prediction' | 'remedies' | 'saved';

interface HeaderProps {
  onReset: () => void;
  onPrint: () => void;
  activeSection: NavSection;
  setActiveSection: (sec: NavSection) => void;
  hasCalculated: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onReset,
  onPrint,
  activeSection,
  setActiveSection,
  hasCalculated,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#fbf8f2]/95 backdrop-blur border-b border-[#e2d6c3] px-4 md:px-8 py-3 transition-colors no-print">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Zone 1: Single text element Brand wordmark */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            setActiveSection('home');
          }}
          className="text-xl md:text-2xl font-bold tracking-tight text-[#4a1c0d] font-cinzel hover:text-[#78280f] transition-colors flex items-center gap-2"
        >
          <span className="w-8 h-8 rounded-full bg-gradient-to-br from-[#d4af37] to-[#8c5015] flex items-center justify-center text-white font-bold text-sm shadow-sm">
            ௐ
          </span>
          <span className="hidden sm:inline">தமிழ் ஜோதிடம்</span>
          <span className="sm:hidden">ஜோதிடம்</span>
        </a>

        {/* Zone 2: Clean text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[#6e4e3b]">
          <button
            onClick={() => setActiveSection('home')}
            className={`transition-colors pb-0.5 ${
              activeSection === 'home'
                ? 'text-[#78280f] font-semibold border-b-2 border-[#b8860b]'
                : 'hover:text-[#4a1c0d]'
            }`}
          >
            ஜாதகக் கணிப்பு
          </button>
          {hasCalculated && (
            <>
              <button
                onClick={() => setActiveSection('method')}
                className={`transition-colors pb-0.5 ${
                  activeSection === 'method'
                    ? 'text-[#78280f] font-semibold border-b-2 border-[#b8860b]'
                    : 'hover:text-[#4a1c0d]'
                }`}
              >
                சாஸ்திர ஆய்வு (Method)
              </button>
              <button
                onClick={() => setActiveSection('chart')}
                className={`transition-colors pb-0.5 ${
                  activeSection === 'chart'
                    ? 'text-[#78280f] font-semibold border-b-2 border-[#b8860b]'
                    : 'hover:text-[#4a1c0d]'
                }`}
              >
                ராசி & நவாம்சம்
              </button>
              <button
                onClick={() => setActiveSection('prediction')}
                className={`transition-colors pb-0.5 ${
                  activeSection === 'prediction'
                    ? 'text-[#78280f] font-semibold border-b-2 border-[#b8860b]'
                    : 'hover:text-[#4a1c0d]'
                }`}
              >
                ஜோதிடப் பலன்கள்
              </button>
              <button
                onClick={() => setActiveSection('remedies')}
                className={`transition-colors pb-0.5 ${
                  activeSection === 'remedies'
                    ? 'text-[#78280f] font-semibold border-b-2 border-[#b8860b]'
                    : 'hover:text-[#4a1c0d]'
                }`}
              >
                பரிகாரங்கள்
              </button>
            </>
          )}
          <button
            onClick={() => setActiveSection('saved')}
            className={`transition-colors pb-0.5 ${
              activeSection === 'saved'
                ? 'text-[#78280f] font-semibold border-b-2 border-[#b8860b]'
                : 'hover:text-[#4a1c0d]'
            }`}
          >
            சேமித்தவை
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-2">
          {hasCalculated && (
            <button
              onClick={onPrint}
              className="px-3 py-1.5 text-xs font-semibold text-[#4a1c0d] bg-[#f0e6d2] border border-[#d9c8aa] rounded-lg hover:bg-[#e6d8bf] transition-colors whitespace-nowrap flex items-center gap-1.5 shadow-xs"
              title="ஜாதகக் குறிப்பேடு அச்சிட"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">அச்சிட / PDF</span>
            </button>
          )}
          <button
            onClick={onReset}
            className="px-3.5 py-1.5 text-xs font-semibold text-white bg-[#78280f] hover:bg-[#5f1f0a] rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 shadow-sm"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>புதிய ஜாதகம்</span>
          </button>
        </div>
      </div>
    </header>
  );
};
