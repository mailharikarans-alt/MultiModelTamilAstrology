import React from 'react';
import { HoroscopeInput, PredictionResult } from '../types/astrology';
import { CalculatedHoroscope, TAMIL_RASIS } from '../utils/astrologyEngine';

interface PrintLeafletProps {
  input: HoroscopeInput;
  calculated: CalculatedHoroscope;
  prediction?: PredictionResult;
}

const GRID_CELLS = [
  { row: 0, col: 0, rasiIndex: 11 },
  { row: 0, col: 1, rasiIndex: 0 },
  { row: 0, col: 2, rasiIndex: 1 },
  { row: 0, col: 3, rasiIndex: 2 },
  { row: 1, col: 0, rasiIndex: 10 },
  { row: 1, col: 3, rasiIndex: 3 },
  { row: 2, col: 0, rasiIndex: 9 },
  { row: 2, col: 3, rasiIndex: 4 },
  { row: 3, col: 0, rasiIndex: 8 },
  { row: 3, col: 1, rasiIndex: 7 },
  { row: 3, col: 2, rasiIndex: 6 },
  { row: 3, col: 3, rasiIndex: 5 },
];

export const PrintLeaflet: React.FC<PrintLeafletProps> = ({
  input,
  calculated,
  prediction,
}) => {
  const renderSmallGrid = (
    chart: { [rasiIdx: number]: any[] },
    title: string
  ) => {
    return (
      <div className="flex flex-col items-center">
        <div className="text-xs font-bold text-center mb-1 text-black">
          {title}
        </div>
        <div className="w-[260px] h-[260px] grid grid-cols-4 grid-rows-4 border-2 border-black bg-white">
          {GRID_CELLS.map((cell) => {
            const rasiInfo = TAMIL_RASIS[cell.rasiIndex];
            const planets = chart[cell.rasiIndex] || [];
            const isLagna = cell.rasiIndex === calculated.lagnaRasi.index;

            return (
              <div
                key={`${title}-${cell.row}-${cell.col}`}
                style={{
                  gridRowStart: cell.row + 1,
                  gridColumnStart: cell.col + 1,
                }}
                className={`border border-black p-0.5 flex flex-col justify-between text-[9px] ${
                  isLagna ? 'bg-amber-100 font-bold' : ''
                }`}
              >
                <div className="flex justify-between text-[8px] leading-tight text-neutral-700">
                  <span>{rasiInfo.tamil}</span>
                </div>
                <div className="flex-1 flex flex-wrap gap-1 items-center justify-center content-center font-bold">
                  {planets.map((p, idx) => (
                    <span
                      key={idx}
                      className={`text-center leading-tight ${p.name === 'Lagna' ? 'underline font-extrabold text-black' : ''}`}
                    >
                      <span className="block">
                        {p.shortTamil}
                        {p.isRetrograde && p.name !== 'Lagna' ? '(வ)' : ''}
                      </span>
                      <span className="font-mono text-[7px] font-normal block leading-none text-neutral-600">
                        {p.degMinStr}
                      </span>
                    </span>
                  ))}
                </div>
                <div className="text-[7px] text-neutral-500 text-right leading-none">
                  {rasiInfo.lord}
                </div>
              </div>
            );
          })}

          {/* Merged Center Area */}
          <div
            style={{
              gridRowStart: 2,
              gridRowEnd: 4,
              gridColumnStart: 2,
              gridColumnEnd: 4,
            }}
            className="border border-black flex flex-col items-center justify-center text-center p-1 bg-neutral-50"
          >
            <div className="font-bold text-sm">உ</div>
            <div className="text-[10px] font-bold">{title}</div>
            <div className="text-[8px] text-neutral-600">
              ல: {calculated.lagnaRasi.tamil}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="hidden print:block p-8 bg-white text-black max-w-4xl mx-auto">
      {/* Top Auspicious Border & Header */}
      <div className="border-4 border-double border-black p-6">
        <div className="text-center pb-4 border-b border-black">
          <div className="text-sm font-semibold tracking-widest">
            {input.method === 'BPHS' && 'ௐ ஸ்ரீ பராசர மகரிஷயே நமஹ'}
            {input.method === 'KP' && 'ௐ ஸ்ரீ குருப்யோ நமஹ · பேராசிரியர் கே.எஸ். கிருஷ்ணமூர்த்தி'}
            {input.method === 'JAIMINI' && 'ௐ ஸ்ரீ ஜைமினி மகரிஷயே நமஹ'}
          </div>
          <h1 className="text-2xl font-bold mt-1">
            {input.method === 'BPHS' && 'ஸ்ரீ பராசர ஹோரா சாஸ்திர ஜாதகக் குறிப்பேடு (BPHS)'}
            {input.method === 'KP' && 'கே.பி. கிருஷ்ணமூர்த்தி பத்தாதி ஜாதகக் குறிப்பேடு (KP System)'}
            {input.method === 'JAIMINI' && 'ஸ்ரீ ஜைமினி மகரிஷி சூத்திர ஜாதகக் குறிப்பேடு (Jaimini Sutras)'}
          </h1>
          <p className="text-xs text-neutral-700 mt-0.5">
            {input.method === 'BPHS' && 'பராசரர் முறைப்படி கணிக்கப்பட்ட ராசி, நவாம்ச மற்றும் விம்சோத்தரி தசா பலாபலன்கள்'}
            {input.method === 'KP' && 'கே.பி. முறைப்படி கணிக்கப்பட்ட உப நாதன் (Sub-Lord), பாவ முனைகள் மற்றும் ஆளும் கிரக பலன்கள்'}
            {input.method === 'JAIMINI' && 'ஜைமினி முறைப்படி கணிக்கப்பட்ட சப்த காரகங்கள், காரகாம்சம், உபபதம் மற்றும் சர தசா பலன்கள்'}
          </p>
        </div>

        {/* Jathagar Details */}
        <div className="grid grid-cols-2 gap-4 py-4 text-xs border-b border-black">
          <div>
            <div><strong>பெயர்:</strong> {input.name}</div>
            <div><strong>பிறந்த தேதி:</strong> {input.dob}</div>
            <div><strong>பிறந்த நேரம்:</strong> {input.time}</div>
            <div><strong>பிறந்த இடம்:</strong> {input.place}</div>
            <div><strong>பாலினம்:</strong> {input.gender}</div>
            <div>
              <strong>ஜோதிட முறை:</strong>{' '}
              {input.method === 'BPHS'
                ? 'பராசரர் முறை (BPHS)'
                : input.method === 'KP'
                ? 'கே.பி. முறை (KP System)'
                : 'ஜைமினி முறை (Jaimini)'}
            </div>
          </div>
          <div>
            <div><strong>லக்னம்:</strong> {calculated.lagnaRasi.tamil} (அதிபதி: {calculated.lagnaRasi.lordTamil})</div>
            <div><strong>ராசி:</strong> {calculated.rasi.tamil} (அதிபதி: {calculated.rasi.lordTamil})</div>
            <div><strong>நட்சத்திரம்:</strong> {calculated.nakshatra.tamil} பாதம் {calculated.nakshatra.pada}</div>
            <div><strong>திதி & யோகம்:</strong> {calculated.panchangam.tithiTamil} · {calculated.panchangam.yogamTamil}</div>
            <div>
              <strong>தசா இருப்பு:</strong> {calculated.dasaBalance.lordTamil} தசை {calculated.dasaBalance.remainingYears} வருடம் {calculated.dasaBalance.remainingMonths} மாதம் {calculated.dasaBalance.remainingDays} நாள்
            </div>
          </div>
        </div>

        {/* Charts Side-by-Side */}
        <div className="flex justify-around items-center py-5 border-b border-black">
          {renderSmallGrid(calculated.rasiChart, 'ராசிக் கட்டம்')}
          {renderSmallGrid(calculated.navamsaChart, 'நவாம்சக் கட்டம்')}
        </div>

        {/* Compact Planetary Positions Table for Print */}
        <div className="py-4 border-b border-black">
          <div className="font-bold text-xs mb-2">கிரக நிலைகள் (Planetary Positions):</div>
          <table className="w-full text-[10px] text-left border border-black">
            <thead className="bg-neutral-100 border-b border-black font-bold">
              <tr>
                <th className="p-1">கிரகம்</th>
                <th className="p-1">நிலை</th>
                <th className="p-1">ராசி</th>
                <th className="p-1 font-mono">பாகை</th>
                <th className="p-1">நட்சத்திரம்</th>
                <th className="p-1">பாதம்</th>
                <th className="p-1">நவாம்சம்</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/30">
              {calculated.planets.map((p, idx) => (
                <tr key={idx}>
                  <td className="p-1 font-bold">{p.tamilName}</td>
                  <td className="p-1">
                    {p.name === 'Lagna' ? 'லக்னம்' : p.isRetrograde ? 'வக்ரம் (R)' : 'நேர்கதி'}
                  </td>
                  <td className="p-1">{p.rasiTamil}</td>
                  <td className="p-1 font-mono font-bold">{p.degMinStr}</td>
                  <td className="p-1">{p.nakshatraTamil}</td>
                  <td className="p-1">{p.pada}</td>
                  <td className="p-1">{p.navamsaRasiTamil}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Astrological Synopsis */}
        {prediction && (
          <div className="pt-4 text-xs space-y-3">
            <div>
              <div className="font-bold underline text-sm mb-1">
                ஜாதகப் பொதுப் பலன்கள் & குணாதிசயம்:
              </div>
              <p className="leading-relaxed">{prediction.personality}</p>
            </div>

            <div>
              <div className="font-bold underline text-sm mb-1">
                தொழில், தன யோகம் & விசேஷ யோகங்கள்:
              </div>
              <p className="leading-relaxed">{prediction.careerFinance}</p>
            </div>

            <div>
              <div className="font-bold underline text-sm mb-1">
                வழிபட வேண்டிய தெய்வம் & பரிகாரங்கள்:
              </div>
              <p className="leading-relaxed">
                <strong>இஷ்ட தெய்வம்:</strong> {prediction.remedies.deity} ·{' '}
                <strong>அதிர்ஷ்ட ரத்தினம்:</strong> {prediction.remedies.gemstone} ·{' '}
                <strong>அதிர்ஷ்ட எண்:</strong> {prediction.remedies.luckyNumber} ·{' '}
                <strong>உகந்த கிழமை:</strong> {prediction.remedies.luckyDay}
              </p>
              <p className="italic mt-1">
                மந்திரம்: "{prediction.remedies.mantra}"
              </p>
            </div>
          </div>
        )}

        <div className="text-center pt-6 text-[10px] text-neutral-500 border-t border-black mt-6">
          சுபம் சுபமஸ்து · நன்மைகள் பெருகட்டும்
        </div>
      </div>
    </div>
  );
};
