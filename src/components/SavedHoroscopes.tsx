import React from 'react';
import { FullHoroscopeReport } from '../types/astrology';
import { Clock, Trash2, ArrowRight, UserCheck } from 'lucide-react';

interface SavedHoroscopesProps {
  savedList: FullHoroscopeReport[];
  onSelect: (report: FullHoroscopeReport) => void;
  onDelete: (timestamp: string) => void;
}

export const SavedHoroscopes: React.FC<SavedHoroscopesProps> = ({
  savedList,
  onSelect,
  onDelete,
}) => {
  if (savedList.length === 0) {
    return (
      <div className="bg-[#fffdf9] rounded-2xl border border-[#d8c39e] p-8 text-center">
        <div className="w-12 h-12 rounded-full bg-[#faf2e1] text-[#8c5015] flex items-center justify-center mx-auto mb-3 text-xl font-bold border border-[#e4cca2]">
          ௐ
        </div>
        <h3 className="text-base font-bold text-[#4a1c0d]">
          சேமிக்கப்பட்ட ஜாதகங்கள் இல்லை
        </h3>
        <p className="text-xs text-[#785942] mt-1 max-w-md mx-auto">
          புதிய ஜாதகத்தைக் கணிக்கும்போது, அது உங்கள் வசதிக்காக தானாகவே இங்கே சேமிக்கப்படும்.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#fffdf9] rounded-2xl border border-[#d8c39e] p-5 md:p-6 shadow-sm">
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#ebdcc4]">
        <div>
          <h3 className="text-base md:text-lg font-bold text-[#4a1c0d] font-cinzel">
            சேமித்த ஜாதகங்கள் ({savedList.length})
          </h3>
          <p className="text-xs text-[#785942]">
            முந்தைய ஜாதகங்களை மீண்டும் பார்க்க அல்லது ஒப்பிட தேர்வு செய்க
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {savedList.map((item) => (
          <div
            key={item.timestamp}
            className="p-4 bg-[#faf4e6] hover:bg-[#f6ebd4] rounded-xl border border-[#e2d0b0] transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-sm text-[#4a1c0d] truncate">
                  {item.input.name}
                </span>
                <span className="text-[10px] text-[#8c674e] bg-[#f0e2cd] px-2 py-0.5 rounded">
                  {item.input.gender}
                </span>
              </div>

              <div className="text-xs text-[#6e4e3b] space-y-0.5">
                <div>
                  <strong>தேதி:</strong> {item.input.dob} ({item.input.time})
                </div>
                <div className="truncate">
                  <strong>இடம்:</strong> {item.input.place}
                </div>
                <div className="text-[11px] text-[#8c5015] font-semibold pt-1 border-t border-[#ebd8ba] mt-1">
                  ல: {item.calculated.lagnaRasi.tamil} · ரா: {item.calculated.rasi.tamil} · ந: {item.calculated.nakshatra.tamil} ({item.calculated.nakshatra.pada})
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 mt-3 border-t border-[#ebd8ba]">
              <button
                onClick={() => onDelete(item.timestamp)}
                className="p-1.5 text-[#a71d2a] hover:bg-[#ffebee] rounded-lg transition-colors"
                title="நீக்குக"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => onSelect(item)}
                className="px-3 py-1.5 bg-[#78280f] text-white text-xs font-semibold rounded-lg hover:bg-[#5f1f0a] transition-colors flex items-center gap-1"
              >
                <span>திறக்க</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
