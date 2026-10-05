import React, { useState } from 'react';
import { AstrologyMethod } from '../types/astrology';
import { CalculatedHoroscope } from '../utils/astrologyEngine';
import { ParasaraAnalysisCard } from './ParasaraAnalysisCard';
import { Shield, Sparkles, BookOpen, Layers, Compass, Award, CheckCircle } from 'lucide-react';

interface MethodAnalysisCardProps {
  method: AstrologyMethod;
  onChangeMethod?: (newMethod: AstrologyMethod) => void;
  calculated: CalculatedHoroscope;
}

export const MethodAnalysisCard: React.FC<MethodAnalysisCardProps> = ({
  method,
  onChangeMethod,
  calculated,
}) => {
  const [activeTab, setActiveTab] = useState<'planets' | 'cusps' | 'ruling' | 'chara' | 'drishti'>('planets');

  return (
    <div className="bg-[#fffdf9] rounded-xl border border-[#d8c39e] p-4 md:p-6 shadow-sm space-y-6">
      {/* Header and Method Switcher Segmented Control */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-3 border-b border-[#ebdcc4] gap-3">
        <div>
          <div className="text-[11px] font-semibold text-[#8c5015] flex items-center gap-1.5">
            <span className="text-[#b8860b]">☸</span>
            <span>தேர்ந்தெடுக்கப்பட்ட ஜோதிட சாஸ்திரப் பகுப்பாய்வு</span>
          </div>
          <h3 className="text-base md:text-lg font-bold text-[#4a1c0d] font-cinzel">
            {method === 'BPHS'
              ? 'பராசரர் முறை பாவக & யோக ஆய்வு (BPHS)'
              : method === 'KP'
              ? 'கே.பி. கிருஷ்ணமூர்த்தி பத்தாதி முறை (KP System)'
              : 'ஜைமினி மகரிஷி காரக & தசா முறை (Jaimini Sutras)'}
          </h3>
        </div>

        {/* Dynamic Method Switcher Dropdown & Segmented Buttons */}
        {onChangeMethod && (
          <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
            <div className="flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-[#8c5015]" />
              <select
                value={method}
                onChange={(e) => onChangeMethod(e.target.value as AstrologyMethod)}
                className="px-3 py-1.5 bg-white border-2 border-[#b8860b] rounded-lg text-xs font-bold text-[#4a1c0d] focus:outline-none focus:ring-2 focus:ring-[#78280f] shadow-2xs cursor-pointer"
              >
                <option value="BPHS">1. பராசரர் முறை (BPHS)</option>
                <option value="KP">2. கே.பி. முறை (KP System)</option>
                <option value="JAIMINI">3. ஜைமினி முறை (Jaimini)</option>
              </select>
            </div>

            <div className="hidden lg:flex items-center p-0.5 bg-[#ede2cf] rounded-lg border border-[#d9c7aa]">
              <button
                type="button"
                onClick={() => onChangeMethod('BPHS')}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors ${
                  method === 'BPHS'
                    ? 'bg-white text-[#5c2311] shadow-xs'
                    : 'text-[#6e503b] hover:text-[#381608]'
                }`}
              >
                BPHS
              </button>
              <button
                type="button"
                onClick={() => onChangeMethod('KP')}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors ${
                  method === 'KP'
                    ? 'bg-white text-[#5c2311] shadow-xs'
                    : 'text-[#6e503b] hover:text-[#381608]'
                }`}
              >
                KP
              </button>
              <button
                type="button"
                onClick={() => onChangeMethod('JAIMINI')}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors ${
                  method === 'JAIMINI'
                    ? 'bg-white text-[#5c2311] shadow-xs'
                    : 'text-[#6e503b] hover:text-[#381608]'
                }`}
              >
                Jaimini
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 1. BPHS Render */}
      {method === 'BPHS' && (
        <ParasaraAnalysisCard
          parasara={calculated.parasara}
          lagnaTamil={calculated.lagnaRasi.tamil}
        />
      )}

      {/* 2. KP System Render */}
      {method === 'KP' && (
        <div className="space-y-5">
          {/* Key Rule Banner */}
          <div className="p-3.5 bg-gradient-to-r from-[#faf2e1] to-[#fffbf3] rounded-xl border border-[#e4cca2] text-xs text-[#5c2311]">
            <strong className="text-[#8c5015]">கே.பி. மூல விதி (KP Golden Axiom): </strong>
            <span>{calculated.kp.keyRuleTamil}</span>
          </div>

          {/* Ruling Planets (ஆளும் கிரகங்கள்) */}
          <div className="p-4 bg-[#fbf6ea] rounded-xl border border-[#ebd8b7]">
            <h4 className="text-xs md:text-sm font-bold text-[#5c2311] mb-2 flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-[#b8860b]" />
              <span>கே.பி. ஆளும் கிரகங்கள் (KP Ruling Planets - RP)</span>
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 text-xs">
              <div className="p-2 bg-white rounded-lg border border-[#e2d0b0]">
                <div className="text-[10px] text-[#8c674e]">கிழமை நாதன்:</div>
                <div className="font-bold text-[#4a1c0d]">{calculated.kp.rulingPlanets.dayLord}</div>
              </div>
              <div className="p-2 bg-white rounded-lg border border-[#e2d0b0]">
                <div className="text-[10px] text-[#8c674e]">சந்திர ராசி நாதன்:</div>
                <div className="font-bold text-[#4a1c0d]">{calculated.kp.rulingPlanets.moonSignLord}</div>
              </div>
              <div className="p-2 bg-white rounded-lg border border-[#e2d0b0]">
                <div className="text-[10px] text-[#8c674e]">சந்திர நட்சத்திர நாதன்:</div>
                <div className="font-bold text-[#4a1c0d]">{calculated.kp.rulingPlanets.moonStarLord}</div>
              </div>
              <div className="p-2 bg-white rounded-lg border border-[#e2d0b0]">
                <div className="text-[10px] text-[#8c674e]">லக்ன ராசி நாதன்:</div>
                <div className="font-bold text-[#4a1c0d]">{calculated.kp.rulingPlanets.lagnaSignLord}</div>
              </div>
              <div className="p-2 bg-white rounded-lg border border-[#e2d0b0]">
                <div className="text-[10px] text-[#8c674e]">லக்ன நட்சத்திர நாதன்:</div>
                <div className="font-bold text-[#4a1c0d]">{calculated.kp.rulingPlanets.lagnaStarLord}</div>
              </div>
            </div>
          </div>

          {/* Planetary Sub-Lord Table */}
          <div className="border border-[#ebdcc4] rounded-xl overflow-hidden">
            <div className="bg-[#f6eee0] px-4 py-2 border-b border-[#ebdcc4] flex justify-between items-center text-xs font-bold text-[#5c2311]">
              <span>கிரகங்களின் உப அதிபதி அட்டவணை (Planetary Sign, Star & Sub-Lord)</span>
              <span className="text-[10px] text-[#8c674e]">உப நாதன் (Sub-Lord) காரிய முடிவை நிர்ணயிப்பவர்</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-[#faf3e7] text-[#6b4c37] border-b border-[#ebdcc4] text-[11px]">
                  <tr>
                    <th className="py-2 px-3">கிரகம்</th>
                    <th className="py-2 px-3">பாகை & ராசி</th>
                    <th className="py-2 px-3">ராசி நாதன்</th>
                    <th className="py-2 px-3">நட்சத்திர நாதன்</th>
                    <th className="py-2 px-3 font-bold text-[#78280f]">உப நாதன் (Sub Lord)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#ebdcc4]/60">
                  {calculated.kp.planets.map((p, idx) => (
                    <tr key={idx} className="hover:bg-[#fbf7ee]">
                      <td className="py-2 px-3 font-bold text-[#4a1c0d]">{p.planetTamil}</td>
                      <td className="py-2 px-3 text-[#523522]">{p.degreeStr}</td>
                      <td className="py-2 px-3 text-[#523522]">{p.signLordTamil}</td>
                      <td className="py-2 px-3 text-[#523522]">{p.starLordTamil}</td>
                      <td className="py-2 px-3 font-bold text-[#78280f] bg-[#fbf3e4]/50">{p.subLordTamil}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 12 Cusp Sub-Lords Table */}
          <div className="border border-[#ebdcc4] rounded-xl overflow-hidden">
            <div className="bg-[#f6eee0] px-4 py-2 border-b border-[#ebdcc4] text-xs font-bold text-[#5c2311]">
              12 பாவ முனைகளின் உப அதிபதிகள் (12 House Cusps Sub-Lords)
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-[#faf3e7] text-[#6b4c37] border-b border-[#ebdcc4] text-[11px]">
                  <tr>
                    <th className="py-1.5 px-3">பாவகம்</th>
                    <th className="py-1.5 px-3">ராசி</th>
                    <th className="py-1.5 px-3">ராசி நாதன்</th>
                    <th className="py-1.5 px-3">நட்சத்திர நாதன்</th>
                    <th className="py-1.5 px-3 font-bold text-[#78280f]">உப நாதன் (Sub Lord)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#ebdcc4]/60">
                  {calculated.kp.cusps.map((c) => (
                    <tr key={c.cuspNumber} className="hover:bg-[#fbf7ee]">
                      <td className="py-1.5 px-3 font-semibold text-[#4a1c0d]">{c.cuspNumber}-ஆம் பாவம்</td>
                      <td className="py-1.5 px-3 text-[#523522]">{c.rasiTamil}</td>
                      <td className="py-1.5 px-3 text-[#523522]">{c.signLord}</td>
                      <td className="py-1.5 px-3 text-[#523522]">{c.starLord}</td>
                      <td className="py-1.5 px-3 font-bold text-[#78280f] bg-[#fbf3e4]/50">{c.subLord}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 3. Jaimini Sutras Render */}
      {method === 'JAIMINI' && (
        <div className="space-y-5">
          {/* Karakamsha and Upapada Banner */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="p-3.5 bg-gradient-to-r from-[#faf2e1] to-[#fffbf3] rounded-xl border border-[#e4cca2]">
              <div className="text-[10px] text-[#8c674e] font-semibold">ஜைமினி காரகாம்சம் (Karakamsha):</div>
              <div className="text-base font-bold text-[#5c2311] mt-0.5">
                {calculated.jaimini.karakamshaRasi} ராசி
              </div>
              <div className="text-[11px] text-[#70523d] mt-0.5">
                ஆத்மகாரகன் (Atmakaraka) நவாம்சத்தில் அமர்ந்த ராசி
              </div>
            </div>

            <div className="p-3.5 bg-gradient-to-r from-[#faf2e1] to-[#fffbf3] rounded-xl border border-[#e4cca2]">
              <div className="text-[10px] text-[#8c674e] font-semibold">உபபத லக்னம் (Upapada Lagna - UL):</div>
              <div className="text-base font-bold text-[#5c2311] mt-0.5">
                {calculated.jaimini.upapadaLagnaRasi} ராசி
              </div>
              <div className="text-[11px] text-[#70523d] mt-0.5">
                12-ஆம் பாவக ஆரூடம் — களத்திர சுகம் மற்றும் இல்லறம்
              </div>
            </div>
          </div>

          {/* 7 Chara Karakas Table */}
          <div className="border border-[#ebdcc4] rounded-xl overflow-hidden">
            <div className="bg-[#f6eee0] px-4 py-2 border-b border-[#ebdcc4] flex justify-between items-center text-xs font-bold text-[#5c2311]">
              <span>ஜைமினி சப்த காரகங்கள் (7 Chara Karakas)</span>
              <span className="text-[10px] text-[#8c674e]">பாகை இறங்கு வரிசைப்படி (Highest to Lowest Degree)</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-[#faf3e7] text-[#6b4c37] border-b border-[#ebdcc4] text-[11px]">
                  <tr>
                    <th className="py-2 px-3">காரகம் (Karaka)</th>
                    <th className="py-2 px-3">குறியீடு</th>
                    <th className="py-2 px-3">கிரகம்</th>
                    <th className="py-2 px-3 font-mono tabular-nums">ராசியில் பாகை</th>
                    <th className="py-2 px-3">முக்கிய காரகத்துவம் (Significance)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#ebdcc4]/60">
                  {calculated.jaimini.charaKarakas.map((k, idx) => (
                    <tr key={idx} className="hover:bg-[#fbf7ee]">
                      <td className="py-2 px-3 font-bold text-[#4a1c0d]">{k.karakaNameTamil}</td>
                      <td className="py-2 px-3">
                        <span className="px-1.5 py-0.5 rounded bg-[#f3e7d3] text-[#78280f] font-mono text-[10px] font-bold">
                          {k.karakaCode}
                        </span>
                      </td>
                      <td className="py-2 px-3 font-bold text-[#5c2311]">{k.planetTamil}</td>
                      <td className="py-2 px-3 font-mono tabular-nums text-[#8c5015]">{k.degreeInRasi}°</td>
                      <td className="py-2 px-3 text-[#523522]">{k.significanceTamil}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Jaimini Rasi Drishti */}
          <div className="p-4 bg-[#fbf6ea] rounded-xl border border-[#ebd8b7]">
            <h4 className="text-xs md:text-sm font-bold text-[#5c2311] mb-2 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-[#b8860b]" />
              <span>ஜைமினி ராசி பார்வைகள் (Jaimini Rasi Aspects)</span>
            </h4>
            <div className="space-y-2 text-xs text-[#523522]">
              {calculated.jaimini.rasiDrishtiSummary.map((d, i) => (
                <div key={i} className="p-2.5 bg-white rounded-lg border border-[#e2d0b0] flex flex-col sm:flex-row justify-between sm:items-center gap-1">
                  <strong className="text-[#4a1c0d]">{d.rasiTamil}:</strong>
                  <span className="text-[#78280f]">{d.aspectedRasisTamil.join(', ')}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
