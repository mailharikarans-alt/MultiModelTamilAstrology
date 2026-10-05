import React, { useState } from 'react';
import { PlanetaryPosition, TAMIL_RASIS } from '../utils/astrologyEngine';
import { Info, Sparkles } from 'lucide-react';

interface RasiGridChartProps {
  rasiChart: { [rasiIndex: number]: PlanetaryPosition[] };
  navamsaChart: { [rasiIndex: number]: PlanetaryPosition[] };
  lagnaRasiIndex: number;
  personName?: string;
}

// Mapping of South Indian Grid (4x4) coordinates to Rasi Index
// 12 outer boxes, center 4 boxes merged
const GRID_CELLS: {
  row: number;
  col: number;
  rasiIndex: number;
}[] = [
  // Row 0
  { row: 0, col: 0, rasiIndex: 11 }, // மீனம் (Meenam)
  { row: 0, col: 1, rasiIndex: 0 },  // மேஷம் (Mesham)
  { row: 0, col: 2, rasiIndex: 1 },  // ரிஷபம் (Rishabam)
  { row: 0, col: 3, rasiIndex: 2 },  // மிதுனம் (Mithunam)
  // Row 1
  { row: 1, col: 0, rasiIndex: 10 }, // கும்பம் (Kumbam)
  { row: 1, col: 3, rasiIndex: 3 },  // கடகம் (Katakam)
  // Row 2
  { row: 2, col: 0, rasiIndex: 9 },  // மகரம் (Makaram)
  { row: 2, col: 3, rasiIndex: 4 },  // சிம்மம் (Simmam)
  // Row 3
  { row: 3, col: 0, rasiIndex: 8 },  // தனுசு (Dhanusu)
  { row: 3, col: 1, rasiIndex: 7 },  // விருச்சிகம் (Viruchigam)
  { row: 3, col: 2, rasiIndex: 6 },  // துலாம் (Thulam)
  { row: 3, col: 3, rasiIndex: 5 },  // கன்னி (Kanni)
];

const BHAVAM_NAMES: { [key: number]: string } = {
  1: '1 (லக்ன / தனு பாவம் - உடல் & ஆளுமை)',
  2: '2 (தன / வாக்கு பாவம் - செல்வம் & பேச்சு)',
  3: '3 (சகோதர / தைரிய பாவம் - முயற்சி & இளையோர்)',
  4: '4 (மாத்ரு / சுக பாவம் - தாய், வீடு, வாகனம்)',
  5: '5 (புத்ர / பூர்வபுண்ணிய பாவம் - குழந்தைகள் & அறிவு)',
  6: '6 (சத்ரு / ரோக பாவம் - எதிரி, கடன், நோய்)',
  7: '7 (களத்திர / கூட்டு பாவம் - மனைவி/கணவன், நட்பு)',
  8: '8 (ஆயுள் / அஷ்டம பாவம் - நீண்ட ஆயுள், ரகசியம்)',
  9: '9 (பாக்ய / பித்ரு பாவம் - தந்தை, தர்மம், அதிர்ஷ்டம்)',
  10: '10 (கர்ம / ஜீவன பாவம் - தொழில், அதிகாரம், புகழ்)',
  11: '11 (லாப பாவம் - வருமானம், வெற்றி, மூத்தோர்)',
  12: '12 (விரய / மோட்ச பாவம் - சுப செலவு, வெளிநாடு)',
};

export const RasiGridChart: React.FC<RasiGridChartProps> = ({
  rasiChart,
  navamsaChart,
  lagnaRasiIndex,
  personName,
}) => {
  const [chartMode, setChartMode] = useState<'rasi' | 'navamsa' | 'both'>('both');
  const [selectedRasi, setSelectedRasi] = useState<number | null>(null);

  const activeChart = (mode: 'rasi' | 'navamsa') =>
    mode === 'rasi' ? rasiChart : navamsaChart;

  const getBhavamNumber = (rasiIdx: number) => {
    // 1-based house calculation from Lagna
    let diff = rasiIdx - lagnaRasiIndex;
    if (diff < 0) diff += 12;
    return diff + 1;
  };

  const renderSingleGrid = (type: 'rasi' | 'navamsa', title: string) => {
    const data = activeChart(type);

    return (
      <div className="bg-[#fffdf9] p-3 md:p-4 rounded-xl border border-[#d8c39e] shadow-sm flex flex-col items-center">
        <div className="w-full flex items-center justify-between mb-2 pb-2 border-b border-[#ebdcc4]">
          <h3 className="text-base font-bold text-[#5c2311] flex items-center gap-1.5">
            <span className="text-[#b8860b]">☸</span>
            <span>{title}</span>
          </h3>
          <span className="text-xs text-[#825e46]">
            {type === 'rasi' ? 'ராசி நிலை' : 'நவாம்ச நிலை (D-9)'}
          </span>
        </div>

        {/* 4x4 South Indian Astrology Grid */}
        <div className="w-full max-w-[420px] aspect-square grid grid-cols-4 grid-rows-4 border-2 border-[#8b4513] bg-[#faf5eb] rounded-md overflow-hidden relative shadow-xs">
          {/* Outer 12 cells */}
          {GRID_CELLS.map((cell) => {
            const rasiInfo = TAMIL_RASIS[cell.rasiIndex];
            const planets = data[cell.rasiIndex] || [];
            const bhavam = getBhavamNumber(cell.rasiIndex);
            const isLagnaHouse = cell.rasiIndex === lagnaRasiIndex;
            const isSelected = selectedRasi === cell.rasiIndex;

            return (
              <div
                key={`${type}-${cell.row}-${cell.col}`}
                onClick={() => setSelectedRasi(cell.rasiIndex)}
                style={{
                  gridRowStart: cell.row + 1,
                  gridColumnStart: cell.col + 1,
                }}
                className={`border border-[#8b4513]/40 p-1 md:p-1.5 flex flex-col justify-between transition-all cursor-pointer relative ${
                  isLagnaHouse
                    ? 'bg-[#fcedd7]'
                    : isSelected
                    ? 'bg-[#f4e2be]'
                    : 'hover:bg-[#f6ebd4]'
                }`}
              >
                {/* Header: Sign name and House number */}
                <div className="flex items-center justify-between text-[10px] md:text-[11px] leading-none border-b border-[#e4cb9c] pb-0.5">
                  <span className="font-semibold text-[#5c2311]">
                    {rasiInfo.tamil}
                  </span>
                  <span
                    className={`font-mono text-[9px] px-1 rounded ${
                      isLagnaHouse
                        ? 'bg-[#b8860b] text-white font-bold'
                        : 'text-[#8b4513]/70'
                    }`}
                    title={BHAVAM_NAMES[bhavam]}
                  >
                    {bhavam}
                  </span>
                </div>

                {/* Planets inside this house */}
                <div className="flex-1 flex flex-wrap gap-1 items-center justify-center content-center py-1">
                  {planets.length === 0 ? (
                    <span className="text-[#a48e78] text-[10px] italic">·</span>
                  ) : (
                    planets.map((p, idx) => {
                      const isLagna = p.name === 'Lagna';
                      return (
                        <div
                          key={idx}
                          className={`text-xs md:text-sm font-bold px-1 rounded leading-tight flex items-center gap-0.5 ${
                            isLagna
                              ? 'bg-[#b8860b] text-white shadow-xs'
                              : p.name === 'Jupiter' || p.name === 'Venus'
                              ? 'text-[#1d6b2c] font-bold bg-[#e8f5e9]'
                              : p.name === 'Mars' || p.name === 'Sun'
                              ? 'text-[#a71d2a] font-bold bg-[#ffebee]'
                              : p.name === 'Saturn' || p.name === 'Rahu' || p.name === 'Ketu'
                              ? 'text-[#263238] font-bold bg-[#eceff1]'
                              : 'text-[#5d4037] bg-[#efebe9]'
                          }`}
                          title={`${p.tamilName} (${p.degreeInRasi}° - ${p.nakshatraTamil} பாதம் ${p.pada})`}
                        >
                          <span>{p.shortTamil}</span>
                          {p.name === 'Moon' && <span className="text-[10px]">🌙</span>}
                        </div>
                      );
                    })
                  )}
                </div>

                {/* Footer lord info */}
                <div className="text-[9px] text-[#856b54] text-right truncate">
                  {rasiInfo.lord}
                </div>
              </div>
            );
          })}

          {/* Merged Center Area (Row 2, 3 and Col 2, 3) */}
          <div
            style={{
              gridRowStart: 2,
              gridRowEnd: 4,
              gridColumnStart: 2,
              gridColumnEnd: 4,
            }}
            className="border border-[#8b4513]/60 bg-gradient-to-b from-[#faf2e1] via-[#fffbf3] to-[#f7eed9] p-2 flex flex-col items-center justify-center text-center shadow-inner relative"
          >
            <div className="w-10 h-10 rounded-full border border-[#d4af37] bg-[#fbf5e6] flex items-center justify-center text-[#8b4513] font-bold text-lg mb-1 shadow-xs">
              உ
            </div>
            <div className="text-xs md:text-sm font-bold text-[#5c2311] tracking-wide font-cinzel">
              {type === 'rasi' ? 'ராசி சக்கரம்' : 'நவாம்ச சக்கரம்'}
            </div>
            {personName && (
              <div className="text-[11px] text-[#7a4e2d] font-medium truncate max-w-[120px]">
                {personName}
              </div>
            )}
            <div className="text-[10px] text-[#8e6e52] mt-0.5">
              லக்னம்: {TAMIL_RASIS[lagnaRasiIndex].tamil}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const selectedInfo =
    selectedRasi !== null ? TAMIL_RASIS[selectedRasi] : null;
  const selectedPlanets =
    selectedRasi !== null ? rasiChart[selectedRasi] || [] : [];
  const selectedBhavam =
    selectedRasi !== null ? getBhavamNumber(selectedRasi) : null;

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Chart Selector Segmented Control */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <h2 className="text-lg md:text-xl font-bold text-[#4a1c0d] font-cinzel flex items-center gap-2">
            <span>ஜாதக சக்கரங்கள் (கட்டம்)</span>
          </h2>
          <p className="text-xs text-[#70533f]">
            தென்னிந்திய பாரம்பரிய ராசி மற்றும் நவாம்ச அமைப்பு
          </p>
        </div>

        <div className="flex items-center p-1 bg-[#ede2cf] rounded-lg border border-[#d9c7aa]">
          <button
            onClick={() => setChartMode('both')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              chartMode === 'both'
                ? 'bg-white text-[#5c2311] shadow-xs'
                : 'text-[#6e503b] hover:text-[#381608]'
            }`}
          >
            இரு கட்டங்களும்
          </button>
          <button
            onClick={() => setChartMode('rasi')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              chartMode === 'rasi'
                ? 'bg-white text-[#5c2311] shadow-xs'
                : 'text-[#6e503b] hover:text-[#381608]'
            }`}
          >
            ராசி மட்டும்
          </button>
          <button
            onClick={() => setChartMode('navamsa')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              chartMode === 'navamsa'
                ? 'bg-white text-[#5c2311] shadow-xs'
                : 'text-[#6e503b] hover:text-[#381608]'
            }`}
          >
            நவாம்சம் மட்டும்
          </button>
        </div>
      </div>

      {/* Grid Display Container */}
      <div
        className={`grid gap-4 ${
          chartMode === 'both' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1 max-w-[460px] mx-auto'
        }`}
      >
        {(chartMode === 'both' || chartMode === 'rasi') &&
          renderSingleGrid('rasi', 'ராசிக் கட்டம்')}
        {(chartMode === 'both' || chartMode === 'navamsa') &&
          renderSingleGrid('navamsa', 'நவாம்சக் கட்டம்')}
      </div>

      {/* Selected House Interactive Details Drawer */}
      {selectedInfo && selectedBhavam && (
        <div className="p-3.5 bg-[#fbf6ec] rounded-xl border border-[#decbb0] shadow-xs transition-all">
          <div className="flex items-start justify-between flex-wrap gap-2 mb-2 pb-2 border-b border-[#ebdcc4]">
            <div>
              <div className="text-xs text-[#8c674e] font-medium">தேர்ந்தெடுக்கப்பட்ட ராசி & பாவம்:</div>
              <div className="text-sm md:text-base font-bold text-[#5c2311]">
                {selectedInfo.tamil} ({selectedInfo.english}) — {BHAVAM_NAMES[selectedBhavam]}
              </div>
            </div>
            <div className="text-xs text-[#6e4e3b] bg-[#f0e4cf] px-2.5 py-1 rounded-md">
              அதிபதி: <strong className="text-[#4a1c0d]">{selectedInfo.lord}</strong>
            </div>
          </div>

          <div className="text-xs text-[#614533]">
            {selectedPlanets.length === 0 ? (
              <p className="italic text-[#927863]">
                இந்த பாவத்தில் கிரகங்கள் எதுவும் இல்லை. இதன் அதிபதியான {selectedInfo.lord} அமைப்பின்படி பலன்கள் செயல்படும்.
              </p>
            ) : (
              <div className="flex flex-col gap-1.5">
                <span className="font-semibold text-[#4a1c0d]">அமர்ந்துள்ள கிரகங்கள்:</span>
                <div className="flex flex-wrap gap-2">
                  {selectedPlanets.map((p, i) => (
                    <div
                      key={i}
                      className="px-2.5 py-1 bg-white rounded border border-[#d9c7aa] shadow-2xs text-[11px] flex items-center gap-1.5"
                    >
                      <strong className="text-[#5c2311]">{p.tamilName}</strong>
                      <span className="text-[#8c6d54]">({p.degreeInRasi}°)</span>
                      <span className="text-[#553b27]">· {p.nakshatraTamil} பாதம் {p.pada}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Legend / Guidance note */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[#70523d] pt-1">
        <span className="font-semibold text-[#4a1c0d]">குறியீடுகள்:</span>
        <span className="flex items-center gap-1">
          <span className="w-4 h-4 rounded bg-[#b8860b] text-white text-[10px] flex items-center justify-center font-bold">
            ல
          </span>{' '}
          லக்னம்
        </span>
        <span className="flex items-center gap-1">
          <strong className="text-[#a71d2a]">சூ</strong> சூரியன்
        </span>
        <span className="flex items-center gap-1">
          <strong className="text-[#1565c0]">ச</strong> சந்திரன்
        </span>
        <span className="flex items-center gap-1">
          <strong className="text-[#c62828]">செ</strong> செவ்வாய்
        </span>
        <span className="flex items-center gap-1">
          <strong className="text-[#2e7d32]">பு</strong> புதன்
        </span>
        <span className="flex items-center gap-1">
          <strong className="text-[#ef6c00]">கு</strong> குரு
        </span>
        <span className="flex items-center gap-1">
          <strong className="text-[#6a1b9a]">சு</strong> சுக்கிரன்
        </span>
        <span className="flex items-center gap-1">
          <strong className="text-[#37474f]">சனீ</strong> சனி
        </span>
        <span className="flex items-center gap-1">
          <strong className="text-[#455a64]">ரா</strong> ராகு
        </span>
        <span className="flex items-center gap-1">
          <strong className="text-[#455a64]">கே</strong> கேது
        </span>
      </div>
    </div>
  );
};
