import React, { useState } from 'react';
import { CalculatedHoroscope } from '../utils/astrologyEngine';
import { Compass, Calendar, Moon, Sun, Clock, ChevronDown, ChevronUp } from 'lucide-react';

interface PanchangamCardProps {
  data: CalculatedHoroscope;
}

export const PanchangamCard: React.FC<PanchangamCardProps> = ({ data }) => {
  const [showFullPlanets, setShowFullPlanets] = useState(false);

  return (
    <div className="bg-[#fffdf9] rounded-xl border border-[#d8c39e] p-4 md:p-5 shadow-sm">
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#ebdcc4]">
        <h3 className="text-base md:text-lg font-bold text-[#4a1c0d] font-cinzel flex items-center gap-2">
          <Compass className="w-5 h-5 text-[#b8860b]" />
          <span>பிறந்த பஞ்சாங்கக் குறிப்புகள்</span>
        </h3>
        <span className="text-xs text-[#8c674e]">
          ஆயனாம்சம்: லஹரி {data.panchangam.ayanamsamValue}°
        </span>
      </div>

      {/* Grid of Key Panchangam Elements */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-4">
        {/* Lagnam */}
        <div className="p-3 bg-[#faf4e6] rounded-lg border border-[#ebd8ba]">
          <div className="text-[11px] text-[#8c674e] font-medium flex items-center gap-1">
            <span className="w-3.5 h-3.5 rounded-full bg-[#b8860b] text-white text-[9px] flex items-center justify-center font-bold">
              ல
            </span>
            <span>லக்னம் (Ascendant)</span>
          </div>
          <div className="text-sm md:text-base font-bold text-[#4a1c0d] mt-1">
            {data.lagnaRasi.tamil}
          </div>
          <div className="text-[10px] text-[#785942] truncate">
            அதிபதி: {data.lagnaRasi.lordTamil} ({data.lagna.degreeInRasi}°)
          </div>
        </div>

        {/* Rasi */}
        <div className="p-3 bg-[#faf4e6] rounded-lg border border-[#ebd8ba]">
          <div className="text-[11px] text-[#8c674e] font-medium flex items-center gap-1">
            <Moon className="w-3.5 h-3.5 text-[#1565c0]" />
            <span>ராசி (Moon Sign)</span>
          </div>
          <div className="text-sm md:text-base font-bold text-[#4a1c0d] mt-1">
            {data.rasi.tamil}
          </div>
          <div className="text-[10px] text-[#785942] truncate">
            அதிபதி: {data.rasi.lordTamil}
          </div>
        </div>

        {/* Nakshatram */}
        <div className="p-3 bg-[#faf4e6] rounded-lg border border-[#ebd8ba]">
          <div className="text-[11px] text-[#8c674e] font-medium flex items-center gap-1">
            <span className="text-[#b8860b]">★</span>
            <span>நட்சத்திரம் & பாதம்</span>
          </div>
          <div className="text-sm md:text-base font-bold text-[#4a1c0d] mt-1">
            {data.nakshatra.tamil}
          </div>
          <div className="text-[10px] text-[#785942]">
            பாதம் {data.nakshatra.pada} · அதிபதி: {data.nakshatra.lordTamil}
          </div>
        </div>

        {/* Tithi */}
        <div className="p-3 bg-[#faf4e6] rounded-lg border border-[#ebd8ba]">
          <div className="text-[11px] text-[#8c674e] font-medium flex items-center gap-1">
            <Sun className="w-3.5 h-3.5 text-[#ef6c00]" />
            <span>திதி & பட்சம்</span>
          </div>
          <div className="text-xs md:text-sm font-bold text-[#4a1c0d] mt-1 truncate">
            {data.panchangam.tithiTamil}
          </div>
          <div className="text-[10px] text-[#785942]">
            {data.panchangam.tithiPaksha}
          </div>
        </div>

        {/* Yogam */}
        <div className="p-3 bg-[#faf4e6] rounded-lg border border-[#ebd8ba]">
          <div className="text-[11px] text-[#8c674e] font-medium">நித்ய யோகம்</div>
          <div className="text-sm font-bold text-[#4a1c0d] mt-1">
            {data.panchangam.yogamTamil}
          </div>
          <div className="text-[10px] text-[#785942]">சுப யோக அமைப்பு</div>
        </div>

        {/* Karanam */}
        <div className="p-3 bg-[#faf4e6] rounded-lg border border-[#ebd8ba]">
          <div className="text-[11px] text-[#8c674e] font-medium">கரணம்</div>
          <div className="text-sm font-bold text-[#4a1c0d] mt-1">
            {data.panchangam.karanamTamil}
          </div>
          <div className="text-[10px] text-[#785942]">திதி அந்தரம்</div>
        </div>

        {/* Day */}
        <div className="p-3 bg-[#faf4e6] rounded-lg border border-[#ebd8ba]">
          <div className="text-[11px] text-[#8c674e] font-medium flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-[#8c674e]" />
            <span>பிறந்த கிழமை</span>
          </div>
          <div className="text-sm font-bold text-[#4a1c0d] mt-1">
            {data.panchangam.dayTamil}க்கிழமை
          </div>
          <div className="text-[10px] text-[#785942]">தின பலன்</div>
        </div>

        {/* Dasa Balance */}
        <div className="p-3 bg-[#fdf0d5] rounded-lg border border-[#e8c88e] col-span-2 sm:col-span-1 lg:col-span-1">
          <div className="text-[11px] text-[#78280f] font-semibold flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-[#78280f]" />
            <span>பிறந்த தசா இருப்பு</span>
          </div>
          <div className="text-xs md:text-sm font-bold text-[#78280f] mt-1">
            {data.dasaBalance.lordTamil} தசை
          </div>
          <div className="text-[11px] text-[#6d341b] font-medium font-mono">
            {data.dasaBalance.remainingYears}வ {data.dasaBalance.remainingMonths}ம {data.dasaBalance.remainingDays}நா
          </div>
        </div>
      </div>

      {/* Planetary Details Collapsible Table */}
      <div className="border border-[#ebdcc4] rounded-lg overflow-hidden">
        <button
          onClick={() => setShowFullPlanets(!showFullPlanets)}
          className="w-full px-4 py-2.5 bg-[#f6eee0] hover:bg-[#efe3d1] transition-colors flex items-center justify-between text-xs md:text-sm font-semibold text-[#5c2311]"
        >
          <span>நவக்கிரக ஸ்புட விவரங்கள் (Planetary Longitudes & Padas)</span>
          <span className="flex items-center gap-1 text-xs text-[#8c674e]">
            {showFullPlanets ? 'சுருக்குக' : 'முழு விவரம் பார்க்க'}
            {showFullPlanets ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </span>
        </button>

        {showFullPlanets && (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-[#faf3e7] text-[#6b4c37] border-b border-[#ebdcc4]">
                <tr>
                  <th className="py-2 px-3 font-semibold">கிரகம்</th>
                  <th className="py-2 px-3 font-semibold">ராசி</th>
                  <th className="py-2 px-3 font-semibold font-mono tabular-nums">பாகை</th>
                  <th className="py-2 px-3 font-semibold">நட்சத்திரம்</th>
                  <th className="py-2 px-3 font-semibold">பாதம்</th>
                  <th className="py-2 px-3 font-semibold">நவாம்சம்</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#ebdcc4]/60">
                {data.planets.map((p, idx) => (
                  <tr key={idx} className="hover:bg-[#fbf7ee] transition-colors">
                    <td className="py-2 px-3 font-bold text-[#4a1c0d] flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded bg-[#f0e4cf] text-[#5c2311] text-[10px] flex items-center justify-center font-bold">
                        {p.shortTamil}
                      </span>
                      <span>{p.tamilName}</span>
                    </td>
                    <td className="py-2 px-3 text-[#5c2311] font-medium">{p.rasiTamil}</td>
                    <td className="py-2 px-3 font-mono tabular-nums text-[#694833]">{p.degreeInRasi}°</td>
                    <td className="py-2 px-3 text-[#4a1c0d]">{p.nakshatraTamil}</td>
                    <td className="py-2 px-3 font-semibold text-[#8c674e]">{p.pada}</td>
                    <td className="py-2 px-3 text-[#5c2311]">{p.navamsaRasiTamil}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
