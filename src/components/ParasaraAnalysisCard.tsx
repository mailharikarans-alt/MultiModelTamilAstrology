import React from 'react';
import { ParasaraDetails } from '../utils/astrologyEngine';
import { Shield, Sparkles, Eye, Award, CheckCircle, AlertCircle } from 'lucide-react';

interface ParasaraAnalysisCardProps {
  parasara: ParasaraDetails;
  lagnaTamil: string;
}

export const ParasaraAnalysisCard: React.FC<ParasaraAnalysisCardProps> = ({
  parasara,
  lagnaTamil,
}) => {
  return (
    <div className="bg-[#fffdf9] rounded-xl border border-[#d8c39e] p-4 md:p-6 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#ebdcc4] gap-2">
        <div>
          <div className="text-[11px] font-semibold text-[#8c5015] flex items-center gap-1.5">
            <span className="text-[#b8860b]">☸</span>
            <span>பிருஹத் பராசர ஹோரா சாஸ்திர பகுப்பாய்வு (BPHS Tenets)</span>
          </div>
          <h3 className="text-base md:text-lg font-bold text-[#4a1c0d] font-cinzel">
            பராசரர் முறை பாவக & யோக ஆய்வுக் குறிப்பு
          </h3>
        </div>
        <div className="px-3 py-1 bg-[#faf0de] border border-[#e2cca4] rounded-full text-xs font-semibold text-[#78280f] self-start sm:self-auto">
          தூய பராசரர் ஜோதிட முறை
        </div>
      </div>

      {/* 1. Kendras & Trikonas (Vishnu & Lakshmi Sthanas) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Kendras */}
        <div className="p-4 bg-[#fbf6ea] rounded-xl border border-[#ebd8b7]">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xs md:text-sm font-bold text-[#5c2311] flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-[#b8860b]" />
              <span>கேந்திர ஸ்தானங்கள் (1, 4, 7, 10 — விஷ்ணு ஸ்தானங்கள்)</span>
            </h4>
          </div>
          <p className="text-[11px] text-[#70523d] mb-3">
            பராசரர் விதி: கேந்திரங்களில் சுப கிரகங்கள் அமர்வது ஜாதகத்திற்கு அசைக்க முடியாத பலத்தையும் தலைமைப் பண்பையும் அளிக்கும்.
          </p>
          <div className="grid grid-cols-2 gap-2">
            {parasara.kendras.map((k) => (
              <div key={k.house} className="p-2 bg-white rounded-lg border border-[#e4d0ae] text-xs">
                <div className="font-bold text-[#4a1c0d]">
                  {k.house}-ஆம் பாவம்: {k.rasiTamil}
                </div>
                <div className="text-[10px] text-[#8c674e]">
                  அதிபதி: {k.lordTamil}
                </div>
                <div className="text-[10px] text-[#553b27] truncate mt-0.5">
                  கிரகங்கள்: {k.planets.length > 0 ? k.planets.join(', ') : 'இல்லை'}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trikonas */}
        <div className="p-4 bg-[#fbf6ea] rounded-xl border border-[#ebd8b7]">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xs md:text-sm font-bold text-[#5c2311] flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#b8860b]" />
              <span>திரிகோண ஸ்தானங்கள் (1, 5, 9 — லட்சுமி ஸ்தானங்கள்)</span>
            </h4>
          </div>
          <p className="text-[11px] text-[#70523d] mb-3">
            பராசரர் விதி: திரிகோணங்கள் பூர்வபுண்ணியம், தெய்வ அனுகூலம் மற்றும் உயர்ந்த தர்ம சிந்தனையைத் தரும் அதிர்ஷ்ட பாவங்கள்.
          </p>
          <div className="grid grid-cols-3 gap-2">
            {parasara.trikonas.map((t) => (
              <div key={t.house} className="p-2 bg-white rounded-lg border border-[#e4d0ae] text-xs">
                <div className="font-bold text-[#4a1c0d]">
                  {t.house}-ஆம் பாவம்
                </div>
                <div className="text-[10px] text-[#5c2311] font-medium truncate">
                  {t.rasiTamil}
                </div>
                <div className="text-[9px] text-[#8c674e]">
                  {t.lordTamil}
                </div>
                <div className="text-[9px] text-[#553b27] truncate mt-0.5">
                  {t.planets.length > 0 ? t.planets.join(', ') : '·'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Upachayas, Dusthanas, Maraka & Badhaka */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Upachayas */}
        <div className="p-3 bg-[#faf4e6] rounded-xl border border-[#ebd8ba]">
          <div className="text-xs font-bold text-[#5c2311] mb-1">
            உபசய ஸ்தானங்கள் (3, 6, 10, 11)
          </div>
          <div className="text-[10px] text-[#70523d] mb-2">
            காலப்போக்கில் விடாமுயற்சியால் வளர்ச்சி தரும் பாவங்கள்
          </div>
          <div className="text-[11px] text-[#4a1c0d] font-semibold space-y-0.5">
            {parasara.upachayas.map((u) => (
              <div key={u.house} className="flex justify-between border-b border-[#f0e2cc] pb-0.5">
                <span>{u.house}-ஆம் பாவம்:</span>
                <span>{u.rasiTamil}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Dusthanas */}
        <div className="p-3 bg-[#faf4e6] rounded-xl border border-[#ebd8ba]">
          <div className="text-xs font-bold text-[#5c2311] mb-1">
            மறைவு ஸ்தானங்கள் (6, 8, 12)
          </div>
          <div className="text-[10px] text-[#70523d] mb-2">
            துஸ்தானங்கள் (ரோகம், அஷ்டமம், விரயம்)
          </div>
          <div className="text-[11px] text-[#4a1c0d] font-semibold space-y-0.5">
            {parasara.dusthanas.map((d) => (
              <div key={d.house} className="flex justify-between border-b border-[#f0e2cc] pb-0.5">
                <span>{d.house}-ஆம் பாவம்:</span>
                <span>{d.rasiTamil}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Marakas */}
        <div className="p-3 bg-[#faf4e6] rounded-xl border border-[#ebd8ba]">
          <div className="text-xs font-bold text-[#5c2311] mb-1">
            மாரக ஸ்தானங்கள் (2, 7)
          </div>
          <div className="text-[10px] text-[#70523d] mb-2">
            பராசரர் விதி: ஆயுள் மற்றும் எச்சரிக்கைக்குரிய ஸ்தானங்கள்
          </div>
          <div className="text-[11px] text-[#4a1c0d] font-semibold space-y-0.5">
            {parasara.marakas.map((m) => (
              <div key={m.house} className="flex justify-between border-b border-[#f0e2cc] pb-0.5">
                <span>{m.house}-ஆம் பாவம்:</span>
                <span>{m.rasiTamil} ({m.lordTamil})</span>
              </div>
            ))}
          </div>
        </div>

        {/* Badhaka */}
        <div className="p-3 bg-[#fdf2e2] rounded-xl border border-[#e8cfa8]">
          <div className="text-xs font-bold text-[#78280f] mb-1">
            பாதக ஸ்தானம் (Badhaka)
          </div>
          <div className="text-[10px] text-[#8c674e] mb-2 truncate">
            {parasara.badhaka.typeTamil}
          </div>
          <div className="text-xs font-bold text-[#4a1c0d]">
            {parasara.badhaka.house}-ஆம் பாவம் ({parasara.badhaka.rasiTamil})
          </div>
          <div className="text-[10px] text-[#70523d] mt-1">
            அதிபதி: <strong>{parasara.badhaka.lordTamil}</strong>
          </div>
        </div>
      </div>

      {/* 3. Pancha Mahapurusha Yogas & Vargottama Planets */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Pancha Mahapurusha Yogas */}
        <div className="p-4 bg-gradient-to-br from-[#faf4e6] to-[#fffcf5] rounded-xl border border-[#ebd8ba]">
          <div className="flex items-center gap-1.5 mb-2">
            <Award className="w-4 h-4 text-[#b8860b]" />
            <h4 className="text-xs md:text-sm font-bold text-[#5c2311]">
              பஞ்ச மகாபுருஷ யோகங்கள் (Pancha Mahapurusha Yogas per BPHS)
            </h4>
          </div>
          {parasara.panchaMahapurushaYogas.length === 0 ? (
            <p className="text-xs text-[#785942] italic">
              செவ்வாய், புதன், குரு, சுக்கிரன், சனி ஆகிய 5 கிரகங்கள் கேந்திரத்தில் ஆட்சி/உச்சம் பெற்று அமைந்திருக்கும் நேரடி பஞ்ச மகாபுருஷ யோகம் தற்போது இல்லை. பிற பராசர சுப யோகங்கள் வலுவாக உள்ளன.
            </p>
          ) : (
            <div className="space-y-2">
              {parasara.panchaMahapurushaYogas.map((yoga, idx) => (
                <div key={idx} className="p-2.5 bg-white rounded-lg border border-[#e4cca2]">
                  <div className="text-xs font-bold text-[#78280f] flex items-center gap-1">
                    <span>✦</span>
                    <span>{yoga.yogaName}</span>
                    <span className="text-[10px] text-[#8c674e] font-normal">({yoga.planetTamil} - {yoga.rasiTamil})</span>
                  </div>
                  <p className="text-[11px] text-[#523522] mt-0.5 leading-relaxed">
                    {yoga.description}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Vargottama Planets */}
        <div className="p-4 bg-gradient-to-br from-[#faf4e6] to-[#fffcf5] rounded-xl border border-[#ebd8ba]">
          <div className="flex items-center gap-1.5 mb-2">
            <CheckCircle className="w-4 h-4 text-[#2e7d32]" />
            <h4 className="text-xs md:text-sm font-bold text-[#5c2311]">
              வர்கோத்தம கிரகங்கள் (Vargottama per Parasara)
            </h4>
          </div>
          <p className="text-[11px] text-[#70523d] mb-2">
            பராசரர் விதிப்படி ராசியிலும் நவாம்சத்திலும் ஒரே ராசியில் அமரும் கிரகம் வர்கோத்தம பலம் பெற்று உச்சத்திற்கு நிகரான சுப பலனைத் தரும்.
          </p>
          {parasara.vargottamaPlanets.length === 0 ? (
            <p className="text-xs text-[#785942] italic">
              வர்கோத்தம அமைப்பில் கிரகங்கள் இல்லை.
            </p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {parasara.vargottamaPlanets.map((v, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 bg-white rounded-lg border border-[#d9c7aa] text-xs font-bold text-[#4a1c0d] shadow-2xs"
                >
                  ⭐ {v.planetTamil} ({v.rasiTamil})
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 4. Parasara Graha Drishti (Aspects) Table */}
      <div className="border border-[#ebdcc4] rounded-xl p-3.5 bg-[#faf4e6]/50">
        <h4 className="text-xs md:text-sm font-bold text-[#5c2311] mb-2 flex items-center gap-1.5">
          <Eye className="w-4 h-4 text-[#8c5015]" />
          <span>பராசரர் கிரக பார்வைகள் (Parasara Graha Drishti)</span>
        </h4>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="text-[#8c674e] border-b border-[#ebdcc4] text-[11px]">
              <tr>
                <th className="py-1 px-2 font-semibold">கிரகம்</th>
                <th className="py-1 px-2 font-semibold">பராசரர் பார்வை பாவகங்கள் (Houses Aspected)</th>
                <th className="py-1 px-2 font-semibold">பார்வை பெறும் ராசிகள் (Rasis Aspected)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#ebdcc4]/60">
              {parasara.parasaraDrishti.map((d, i) => (
                <tr key={i} className="hover:bg-white/60 transition-colors">
                  <td className="py-1.5 px-2 font-bold text-[#4a1c0d]">{d.planetTamil}</td>
                  <td className="py-1.5 px-2 font-mono tabular-nums text-[#78280f]">
                    {d.aspectedHouses.map((h) => `${h}-ஆம் பாவம்`).join(', ')}
                  </td>
                  <td className="py-1.5 px-2 text-[#523522]">
                    {d.aspectedRasis.join(', ')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
