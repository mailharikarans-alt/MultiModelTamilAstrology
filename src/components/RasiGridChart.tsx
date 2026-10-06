import React, { useState } from 'react';
import { PlanetaryPosition, DasaPeriod, TAMIL_RASIS } from '../utils/astrologyEngine';
import { Info, Sparkles, Table2, Clock, Eye, ChevronDown, ChevronUp } from 'lucide-react';

interface RasiGridChartProps {
  rasiChart: { [rasiIndex: number]: PlanetaryPosition[] };
  navamsaChart: { [rasiIndex: number]: PlanetaryPosition[] };
  lagnaRasiIndex: number;
  personName?: string;
  allPlanets?: PlanetaryPosition[];
  dasaTimeline?: DasaPeriod[];
  ayanamshaStr?: string;
}

// Mapping of South Indian Grid (4x4) coordinates to Rasi Index
// 12 outer boxes in clockwise order from Pisces to Aquarius
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
  allPlanets = [],
  dasaTimeline = [],
  ayanamshaStr,
}) => {
  const [chartMode, setChartMode] = useState<'both' | 'rasi' | 'navamsa'>('both');
  const [selectedRasi, setSelectedRasi] = useState<number | null>(null);
  const [showTable, setShowTable] = useState(true);
  const [showDasaTable, setShowDasaTable] = useState(false);

  const activeChart = (mode: 'rasi' | 'navamsa') =>
    mode === 'rasi' ? rasiChart : navamsaChart;

  const getBhavamNumber = (rasiIdx: number) => {
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
          <span className="text-xs text-[#825e46] font-medium">
            {type === 'rasi' ? 'ராசிக் கட்டம் (D-1)' : 'நவாம்சக் கட்டம் (D-9)'}
          </span>
        </div>

        {/* 4x4 Traditional South Indian Astrology Grid */}
        <div className="w-full max-w-[440px] aspect-square grid grid-cols-4 grid-rows-4 border-2 border-[#7a3e1d] bg-[#faf5eb] rounded-md overflow-hidden relative shadow-xs">
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
                    ? 'bg-[#faebd7]/90'
                    : isSelected
                    ? 'bg-[#f4e2be]'
                    : 'hover:bg-[#f6ebd4]'
                }`}
              >
                {/* Header: Sign name and House number */}
                <div className="flex items-center justify-between text-[10px] md:text-[11px] leading-none border-b border-[#e4cb9c] pb-0.5">
                  <span className="font-bold text-[#5c2311]">
                    {rasiInfo.tamil}
                  </span>
                  <span
                    className={`font-mono text-[9px] px-1 rounded ${
                      isLagnaHouse
                        ? 'bg-[#b8860b] text-white font-bold'
                        : 'text-[#8b4513]/70 font-semibold'
                    }`}
                    title={BHAVAM_NAMES[bhavam]}
                  >
                    {bhavam}
                  </span>
                </div>

                {/* Planets inside this house with degrees and retrograde marking */}
                <div className="flex-1 flex flex-col gap-0.5 justify-center py-1 overflow-hidden">
                  {planets.length === 0 ? (
                    <span className="text-[#a48e78] text-[10px] italic text-center">·</span>
                  ) : (
                    planets.map((p, idx) => {
                      const isLagna = p.name === 'Lagna';
                      return (
                        <div
                          key={idx}
                          className={`text-[10px] sm:text-[11px] font-semibold px-1 py-0.5 rounded leading-tight flex items-center justify-between gap-1 ${
                            isLagna
                              ? 'bg-[#b8860b] text-white font-bold shadow-2xs'
                              : p.name === 'Jupiter' || p.name === 'Venus'
                              ? 'text-[#1b5e20] bg-[#e8f5e9]/90'
                              : p.name === 'Mars' || p.name === 'Sun'
                              ? 'text-[#b71c1c] bg-[#ffebee]/90'
                              : p.name === 'Saturn' || p.name === 'Rahu' || p.name === 'Ketu'
                              ? 'text-[#263238] bg-[#eceff1]/90'
                              : 'text-[#4e342e] bg-[#efebe9]/90'
                          }`}
                          title={`${p.tamilName} (${p.degreeInRasi}° - ${p.nakshatraTamil} பாதம் ${p.pada})${
                            p.isRetrograde && !isLagna ? ' [வக்ரம்]' : ''
                          }`}
                        >
                          <span className="font-bold whitespace-nowrap">
                            {p.shortTamil}
                            {p.isRetrograde && !isLagna && (
                              <span className="text-[9px] text-[#c62828] font-bold ml-0.5">
                                (வ)
                              </span>
                            )}
                          </span>
                          <span className="font-mono text-[9px] opacity-80 whitespace-nowrap">
                            {p.degMinStr}
                          </span>
                        </div>
                      );
                    })
                  )}
                </div>

                {/* Footer sign lord */}
                <div className="text-[8px] text-[#856b54] text-right truncate leading-none">
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
            <div className="w-9 h-9 rounded-full border border-[#d4af37] bg-[#fbf5e6] flex items-center justify-center text-[#8b4513] font-bold text-base mb-1 shadow-xs">
              உ
            </div>
            <div className="text-xs md:text-sm font-bold text-[#5c2311] tracking-wide font-cinzel">
              {type === 'rasi' ? 'ராசிக் கட்டம்' : 'நவாம்சக் கட்டம்'}
            </div>
            {personName && (
              <div className="text-[11px] text-[#7a4e2d] font-semibold truncate max-w-[130px] mt-0.5">
                {personName}
              </div>
            )}
            <div className="text-[10px] text-[#8e6e52] mt-0.5 font-medium">
              லக்னம்: <strong className="text-[#5c2311]">{TAMIL_RASIS[lagnaRasiIndex].tamil}</strong>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const selectedInfo = selectedRasi !== null ? TAMIL_RASIS[selectedRasi] : null;
  const selectedPlanets = selectedRasi !== null ? rasiChart[selectedRasi] || [] : [];
  const selectedBhavam = selectedRasi !== null ? getBhavamNumber(selectedRasi) : null;

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Chart Selector Segmented Control */}
      <div className="flex items-center justify-between flex-wrap gap-2 pb-1 border-b border-[#ebdcc4]">
        <div>
          <h2 className="text-lg md:text-xl font-bold text-[#4a1c0d] font-cinzel flex items-center gap-2">
            <span>ஜாதகச் சக்கரங்கள் & கிரக நிலைகள்</span>
          </h2>
          <p className="text-xs text-[#70533f]">
            துல்லியமான லஹரி அயனாம்சக் கணிப்பு (Prokerala & திருக்கணித முறைப்படி)
            {ayanamshaStr && <span className="font-semibold text-[#8c5015] ml-1">· அயனாம்சம்: {ayanamshaStr}</span>}
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
        className={`grid gap-5 ${
          chartMode === 'both'
            ? 'grid-cols-1 lg:grid-cols-2'
            : 'grid-cols-1 max-w-[480px] mx-auto'
        }`}
      >
        {(chartMode === 'both' || chartMode === 'rasi') &&
          renderSingleGrid('rasi', 'ராசிக் கட்டம் (D-1)')}
        {(chartMode === 'both' || chartMode === 'navamsa') &&
          renderSingleGrid('navamsa', 'நவாம்சக் கட்டம் (D-9)')}
      </div>

      {/* Selected House Interactive Details Drawer */}
      {selectedInfo && selectedBhavam && (
        <div className="p-4 bg-[#fbf6ec] rounded-xl border border-[#decbb0] shadow-xs transition-all">
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
              <div className="flex flex-col gap-2">
                <span className="font-semibold text-[#4a1c0d]">அமர்ந்துள்ள கிரகங்கள்:</span>
                <div className="flex flex-wrap gap-2">
                  {selectedPlanets.map((p, i) => (
                    <div
                      key={i}
                      className="px-3 py-1.5 bg-white rounded-lg border border-[#d9c7aa] shadow-2xs text-xs flex items-center gap-2"
                    >
                      <strong className="text-[#5c2311] font-bold">{p.tamilName}</strong>
                      <span className="font-mono text-[#8c6d54]">({p.degMinStr})</span>
                      <span className="text-[#553b27]">· {p.nakshatraTamil} பாதம் {p.pada}</span>
                      {p.isRetrograde && p.name !== 'Lagna' && (
                        <span className="px-1.5 py-0.2 rounded bg-[#ffebee] text-[#c62828] text-[10px] font-bold">
                          வக்ரம்
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Prokerala-Standard Complete Planetary Positions Table */}
      {allPlanets.length > 0 && (
        <div className="bg-[#fffdf9] rounded-xl border border-[#d8c39e] overflow-hidden shadow-sm">
          <div className="bg-[#f6eee0] px-4 py-3 border-b border-[#ebdcc4] flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <Table2 className="w-4 h-4 text-[#8c5015]" />
              <h3 className="text-sm font-bold text-[#4a1c0d]">
                நவக்கிரக ஸ்புட அட்டவணை (Planetary Positions Table)
              </h3>
            </div>
            <button
              onClick={() => setShowTable(!showTable)}
              className="text-xs font-semibold text-[#78280f] hover:underline flex items-center gap-1"
            >
              {showTable ? 'சுருக்குக' : 'காண்பிக்க'}
              {showTable ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>

          {showTable && (
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-[#faf3e7] text-[#6b4c37] border-b border-[#ebdcc4] text-[11px]">
                  <tr>
                    <th className="py-2.5 px-3 font-bold">கிரகம் (Planet)</th>
                    <th className="py-2.5 px-3 font-semibold">நிலை (Status)</th>
                    <th className="py-2.5 px-3 font-semibold">ராசி (Sign)</th>
                    <th className="py-2.5 px-3 font-bold font-mono">பாகை & கலை</th>
                    <th className="py-2.5 px-3 font-semibold">நட்சத்திரம்</th>
                    <th className="py-2.5 px-3 font-semibold">பாதம்</th>
                    <th className="py-2.5 px-3 font-semibold">நட்சத்திர நாதன்</th>
                    <th className="py-2.5 px-3 font-semibold">நவாம்சம்</th>
                    <th className="py-2.5 px-3 font-semibold">ராசி நாதன்</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#ebdcc4]/60">
                  {allPlanets.map((p, idx) => {
                    const isLagna = p.name === 'Lagna';
                    return (
                      <tr key={idx} className="hover:bg-[#fbf7ee] transition-colors">
                        <td className="py-2 px-3 font-bold text-[#4a1c0d] flex items-center gap-1.5">
                          <span
                            className={`w-5 h-5 rounded text-[10px] flex items-center justify-center font-bold ${
                              isLagna
                                ? 'bg-[#b8860b] text-white'
                                : 'bg-[#f0e4cf] text-[#5c2311]'
                            }`}
                          >
                            {p.shortTamil}
                          </span>
                          <span>{p.tamilName}</span>
                        </td>
                        <td className="py-2 px-3">
                          {isLagna ? (
                            <span className="text-[#8c674e] font-semibold">உதய லக்னம்</span>
                          ) : p.isRetrograde ? (
                            <span className="px-1.5 py-0.5 rounded bg-[#ffebee] text-[#c62828] font-bold text-[10px]">
                              வக்ரம் (R)
                            </span>
                          ) : (
                            <span className="text-[#2e7d32] font-semibold text-[11px]">
                              நேர்கதி (D)
                            </span>
                          )}
                        </td>
                        <td className="py-2 px-3 text-[#5c2311] font-semibold">{p.rasiTamil}</td>
                        <td className="py-2 px-3 font-mono tabular-nums font-bold text-[#694833]">
                          {p.degMinStr}
                        </td>
                        <td className="py-2 px-3 text-[#4a1c0d]">{p.nakshatraTamil}</td>
                        <td className="py-2 px-3 font-semibold text-[#8c674e]">{p.pada}</td>
                        <td className="py-2 px-3 text-[#523522]">{p.starLordTamil}</td>
                        <td className="py-2 px-3 font-semibold text-[#78280f] bg-[#fcf5e8]/60">
                          {p.navamsaRasiTamil}
                        </td>
                        <td className="py-2 px-3 text-[#523522]">{p.signLordTamil}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Vimshottari Dasa-Bhukti Timeline Table */}
      {dasaTimeline.length > 0 && (
        <div className="bg-[#fffdf9] rounded-xl border border-[#d8c39e] overflow-hidden shadow-sm">
          <div className="bg-[#f6eee0] px-4 py-3 border-b border-[#ebdcc4] flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#8c5015]" />
              <h3 className="text-sm font-bold text-[#4a1c0d]">
                விம்சோத்தரி தசா கால அட்டவணை (Vimshottari Dasa Timeline)
              </h3>
            </div>
            <button
              onClick={() => setShowDasaTable(!showDasaTable)}
              className="text-xs font-semibold text-[#78280f] hover:underline flex items-center gap-1"
            >
              {showDasaTable ? 'சுருக்குக' : 'தசா காலங்களை விரிவாகக் காண்க'}
              {showDasaTable ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>

          {showDasaTable && (
            <div className="overflow-x-auto p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {dasaTimeline.map((d, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-white rounded-lg border border-[#e2d0b0] hover:border-[#b8860b] transition-all flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between pb-1.5 border-b border-[#f0e4cf]">
                      <span className="font-bold text-[#4a1c0d] text-sm">
                        {d.lordTamil} தசை
                      </span>
                      <span className="text-[11px] font-semibold text-[#8c674e] bg-[#f6eee0] px-2 py-0.5 rounded">
                        {d.durationYears} ஆண்டுகள்
                      </span>
                    </div>
                    <div className="text-xs text-[#523522] mt-2 space-y-1">
                      <div className="flex justify-between">
                        <span className="text-[#8c674e]">வயது:</span>
                        <strong className="font-mono">{d.startAge} - {d.endAge}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#8c674e]">காலம்:</span>
                        <strong className="font-mono text-[#78280f]">{d.startDateStr} முதல் {d.endDateStr} வரை</strong>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
