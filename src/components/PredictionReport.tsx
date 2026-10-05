import React, { useState, useRef } from 'react';
import { PredictionResult, HoroscopeInput } from '../types/astrology';
import { CalculatedHoroscope } from '../utils/astrologyEngine';
import {
  Volume2,
  VolumeX,
  Sparkles,
  Briefcase,
  Heart,
  Activity,
  ShieldCheck,
  Flame,
  CheckCircle2,
  AlertTriangle,
  Play,
  Pause,
  Loader2,
} from 'lucide-react';

interface PredictionReportProps {
  prediction: PredictionResult;
  input: HoroscopeInput;
  calculated: CalculatedHoroscope;
}

export const PredictionReport: React.FC<PredictionReportProps> = ({
  prediction,
  input,
  calculated,
}) => {
  const [activeTab, setActiveTab] = useState<
    'general' | 'yogas' | 'career' | 'marriage' | 'health' | 'dasha' | 'dosha' | 'remedies'
  >('general');

  // Audio / Speech State
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isAudioLoading, setIsAudioLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handlePlayVoice = async () => {
    if (isPlayingAudio) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      setIsPlayingAudio(false);
      return;
    }

    const narrationText = `${prediction.title}. ${prediction.summary}. லக்னம் ${calculated.lagnaRasi.tamil}, ராசி ${calculated.rasi.tamil}, நட்சத்திரம் ${calculated.nakshatra.tamil} பாதம் ${calculated.nakshatra.pada}. ${prediction.personality.slice(0, 300)}`;

    setIsAudioLoading(true);

    try {
      // 1. Try server-side TTS
      const res = await fetch('/api/horoscope/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: narrationText }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.audioBase64) {
          const audio = new Audio(`data:audio/wav;base64,${data.audioBase64}`);
          audioRef.current = audio;
          audio.onended = () => setIsPlayingAudio(false);
          audio.onerror = () => fallbackWebSpeech(narrationText);
          await audio.play();
          setIsPlayingAudio(true);
          setIsAudioLoading(false);
          return;
        }
      }
      fallbackWebSpeech(narrationText);
    } catch (err) {
      fallbackWebSpeech(narrationText);
    } finally {
      setIsAudioLoading(false);
    }
  };

  const fallbackWebSpeech = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ta-IN';
      utterance.rate = 0.9;
      utterance.pitch = 1.0;
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(utterance);
      setIsPlayingAudio(true);
    }
  };

  return (
    <div className="bg-[#fffdf9] rounded-2xl border border-[#d8c39e] p-5 md:p-7 shadow-sm flex flex-col gap-6">
      {/* Title & Auspicious Header Banner */}
      <div className="bg-gradient-to-r from-[#faf2e1] via-[#fffbf3] to-[#f7eed9] p-4 md:p-5 rounded-xl border border-[#e4cca2] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#8c5015] mb-1">
            <span>ௐ ஸ்ரீ மஹா கணபதியே நமஹ</span>
            <span>·</span>
            <span>ஜாதக வாக்கு</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-[#5c2311] font-cinzel">
            {prediction.title}
          </h2>
          <p className="text-xs md:text-sm text-[#70523e] mt-1 leading-relaxed max-w-3xl">
            {prediction.summary}
          </p>
        </div>

        {/* Audio Player Button */}
        <div className="shrink-0 flex items-center gap-2 self-start md:self-auto">
          <button
            onClick={handlePlayVoice}
            disabled={isAudioLoading}
            className={`px-4 py-2 text-xs font-bold rounded-lg border transition-all flex items-center gap-2 shadow-xs ${
              isPlayingAudio
                ? 'bg-[#78280f] text-white border-[#78280f]'
                : 'bg-white hover:bg-[#faf4e6] text-[#5c2311] border-[#d9c7aa]'
            }`}
          >
            {isAudioLoading ? (
              <Loader2 className="w-4 h-4 animate-spin text-[#8c5015]" />
            ) : isPlayingAudio ? (
              <Pause className="w-4 h-4 text-white" />
            ) : (
              <Volume2 className="w-4 h-4 text-[#8c5015]" />
            )}
            <span>
              {isAudioLoading
                ? 'ஒலி தயாராகிறது...'
                : isPlayingAudio
                ? 'ஒலியை நிறுத்துக'
                : 'பலன்களைக் கேட்க (Voice)'}
            </span>
          </button>
        </div>
      </div>

      {/* Strengths & Mindfulness Bullet Strip */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Strengths */}
        <div className="p-4 bg-[#f4faee] rounded-xl border border-[#d2e9c2]">
          <h4 className="text-xs font-bold text-[#2e681c] mb-2 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#2e681c]" />
            <span>முக்கிய பலங்கள் & ஆளுமை (Key Strengths)</span>
          </h4>
          <ul className="space-y-1.5 text-xs text-[#2d4e22]">
            {prediction.positiveTraits.map((trait, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <span className="text-[#3b8724] font-bold">✔</span>
                <span>{trait}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Caution Points */}
        <div className="p-4 bg-[#fef7ee] rounded-xl border border-[#f5dab8]">
          <h4 className="text-xs font-bold text-[#945512] mb-2 flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-[#945512]" />
            <span>எச்சரிக்கையுடன் செயல்பட வேண்டியவை (Mindfulness)</span>
          </h4>
          <ul className="space-y-1.5 text-xs text-[#784715]">
            {prediction.cautionPoints.map((point, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <span className="text-[#c27622] font-bold">⚠</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Prediction Navigation Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-[#e6d8bf]">
        {[
          { key: 'general', label: 'லக்னம் & குணம்', icon: Sparkles },
          { key: 'yogas', label: 'விசேஷ யோகங்கள்', icon: Flame },
          { key: 'career', label: 'தொழில் & செல்வம்', icon: Briefcase },
          { key: 'marriage', label: 'திருமணம் & குடும்பம்', icon: Heart },
          { key: 'health', label: 'ஆரோக்கியம்', icon: Activity },
          { key: 'dasha', label: 'தசா-புக்தி பலன்', icon: ShieldCheck },
          { key: 'dosha', label: 'தோஷ விளக்கம்', icon: AlertTriangle },
          { key: 'remedies', label: 'பரிகாரங்கள் & திருத்தலங்கள்', icon: Sparkles },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`px-3 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap flex items-center gap-1.5 ${
                isActive
                  ? 'bg-[#78280f] text-white shadow-xs'
                  : 'bg-[#f5ecdd] text-[#634835] hover:bg-[#ede0cd] hover:text-[#3d1808]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content Display Area */}
      <div className="pt-2">
        {/* 1. General & Personality */}
        {activeTab === 'general' && (
          <div className="space-y-4">
            <div className="p-4 bg-[#faf4e6] rounded-xl border border-[#ebd8ba]">
              <h3 className="text-sm md:text-base font-bold text-[#4a1c0d] mb-2 flex items-center gap-2">
                <span className="text-[#b8860b]">☸</span>
                <span>லக்னம் மற்றும் ராசி தத்துவ விளக்கம்</span>
              </h3>
              <p className="text-xs md:text-sm text-[#422919] leading-relaxed whitespace-pre-line">
                {prediction.lagnaRasiAnalysis}
              </p>
            </div>

            <div className="p-4 bg-[#fffdf9] rounded-xl border border-[#ebd8ba]">
              <h3 className="text-sm md:text-base font-bold text-[#4a1c0d] mb-2">
                சுபாவம் & சிந்தனை ஆற்றல் (Personality & Intellect)
              </h3>
              <p className="text-xs md:text-sm text-[#422919] leading-relaxed whitespace-pre-line">
                {prediction.personality}
              </p>
            </div>
          </div>
        )}

        {/* 2. Planetary Yogas */}
        {activeTab === 'yogas' && (
          <div className="space-y-3">
            <div className="text-xs text-[#70523e] mb-2">
              ஜாதகத்தில் அமைந்திருக்கும் முக்கிய நன்மைகள் தரும் சுப யோகங்கள்:
            </div>
            {prediction.planetaryYogas.length === 0 ? (
              <p className="italic text-xs text-[#8c6d54]">
                குறிப்பிடத்தக்க விசேஷ யோகங்கள் சமநிலையில் உள்ளன.
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {prediction.planetaryYogas.map((yoga, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-gradient-to-br from-[#faf4e6] to-[#fffcf5] rounded-xl border border-[#e2d0b0] shadow-2xs"
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="w-5 h-5 rounded-full bg-[#b8860b] text-white text-[11px] flex items-center justify-center font-bold">
                        ✦
                      </span>
                      <h4 className="text-sm font-bold text-[#5c2311]">{yoga.yogaName}</h4>
                    </div>
                    <p className="text-xs text-[#4a2e1d] leading-relaxed">
                      {yoga.description}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 3. Career & Finance */}
        {activeTab === 'career' && (
          <div className="p-4 md:p-5 bg-[#faf4e6] rounded-xl border border-[#ebd8ba] space-y-3">
            <h3 className="text-sm md:text-base font-bold text-[#4a1c0d] flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-[#b8860b]" />
              <span>தொழில், வேலை வாய்ப்பு & தன யோகப் பலன்கள்</span>
            </h3>
            <p className="text-xs md:text-sm text-[#422919] leading-relaxed whitespace-pre-line">
              {prediction.careerFinance}
            </p>
          </div>
        )}

        {/* 4. Marriage & Family */}
        {activeTab === 'marriage' && (
          <div className="p-4 md:p-5 bg-[#faf4e6] rounded-xl border border-[#ebd8ba] space-y-3">
            <h3 className="text-sm md:text-base font-bold text-[#4a1c0d] flex items-center gap-2">
              <Heart className="w-4 h-4 text-[#a71d2a]" />
              <span>திருமணம், வாழ்க்கைத்துணை & குடும்ப வாழ்க்கை</span>
            </h3>
            <p className="text-xs md:text-sm text-[#422919] leading-relaxed whitespace-pre-line">
              {prediction.marriageFamily}
            </p>
          </div>
        )}

        {/* 5. Health */}
        {activeTab === 'health' && (
          <div className="p-4 md:p-5 bg-[#faf4e6] rounded-xl border border-[#ebd8ba] space-y-3">
            <h3 className="text-sm md:text-base font-bold text-[#4a1c0d] flex items-center gap-2">
              <Activity className="w-4 h-4 text-[#2e7d32]" />
              <span>உடல் நலம், ஆயுள் பலம் & மன நிம்மதி</span>
            </h3>
            <p className="text-xs md:text-sm text-[#422919] leading-relaxed whitespace-pre-line">
              {prediction.healthVitality}
            </p>
          </div>
        )}

        {/* 6. Dasha Bhukti */}
        {activeTab === 'dasha' && (
          <div className="p-4 md:p-5 bg-[#faf4e6] rounded-xl border border-[#ebd8ba] space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#e6d8bf]">
              <h3 className="text-sm md:text-base font-bold text-[#4a1c0d] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#b8860b]" />
                <span>தசா-புக்தி பலன்கள் & கால கணிப்பு</span>
              </h3>
              <span className="text-xs font-semibold text-[#78280f] bg-[#fbf1dc] px-2.5 py-0.5 rounded-full border border-[#ebd8ba]">
                பிறந்த இருப்பு: {calculated.dasaBalance.lordTamil} தசை
              </span>
            </div>
            <p className="text-xs md:text-sm text-[#422919] leading-relaxed whitespace-pre-line">
              {prediction.dashaBhuktiForecast}
            </p>
          </div>
        )}

        {/* 7. Dosha Analysis */}
        {activeTab === 'dosha' && (
          <div className="p-4 md:p-5 bg-[#faf4e6] rounded-xl border border-[#ebd8ba] space-y-3">
            <div className="flex items-center gap-2">
              <span
                className={`w-3 h-3 rounded-full ${
                  prediction.doshaAnalysis.hasDosha ? 'bg-[#c62828]' : 'bg-[#2e7d32]'
                }`}
              />
              <h3 className="text-sm md:text-base font-bold text-[#4a1c0d]">
                {prediction.doshaAnalysis.title}
              </h3>
            </div>
            <p className="text-xs md:text-sm text-[#422919] leading-relaxed whitespace-pre-line">
              {prediction.doshaAnalysis.explanation}
            </p>
          </div>
        )}

        {/* 8. Remedies & Auspicious Guidance */}
        {activeTab === 'remedies' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* Deity */}
              <div className="p-3.5 bg-[#fef9ee] rounded-xl border border-[#ebd8ba]">
                <div className="text-[11px] text-[#8c5015] font-semibold">வழிபட வேண்டிய தெய்வம்:</div>
                <div className="text-sm font-bold text-[#4a1c0d] mt-1">
                  {prediction.remedies.deity}
                </div>
              </div>

              {/* Gemstone */}
              <div className="p-3.5 bg-[#fef9ee] rounded-xl border border-[#ebd8ba]">
                <div className="text-[11px] text-[#8c5015] font-semibold">அதிர்ஷ்ட ரத்தினக் கல்:</div>
                <div className="text-sm font-bold text-[#4a1c0d] mt-1">
                  {prediction.remedies.gemstone}
                </div>
              </div>

              {/* Lucky Day & Color */}
              <div className="p-3.5 bg-[#fef9ee] rounded-xl border border-[#ebd8ba]">
                <div className="text-[11px] text-[#8c5015] font-semibold">உகந்த கிழமை & அதிர்ஷ்ட நிறம்:</div>
                <div className="text-sm font-bold text-[#4a1c0d] mt-1">
                  {prediction.remedies.luckyDay} கிழமை · நிறம்: {prediction.remedies.luckyColor}
                </div>
              </div>

              {/* Lucky Number */}
              <div className="p-3.5 bg-[#fef9ee] rounded-xl border border-[#ebd8ba]">
                <div className="text-[11px] text-[#8c5015] font-semibold">அதிர்ஷ்ட எண்:</div>
                <div className="text-sm font-bold text-[#4a1c0d] mt-1">
                  {prediction.remedies.luckyNumber}
                </div>
              </div>
            </div>

            {/* Recommended Temples */}
            <div className="p-4 bg-[#faf4e6] rounded-xl border border-[#ebd8ba]">
              <div className="text-xs font-bold text-[#5c2311] mb-2">
                தரிசிக்க வேண்டிய புண்ணிய திருத்தலங்கள் (Auspicious Tamil Nadu Temples):
              </div>
              <div className="flex flex-wrap gap-2">
                {prediction.remedies.temples.map((temple, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-white text-[#4a1c0d] text-xs font-semibold rounded-lg border border-[#d9c7aa] shadow-2xs"
                  >
                    🛕 {temple}
                  </span>
                ))}
              </div>
            </div>

            {/* Sacred Mantra & Charity */}
            <div className="p-4 bg-[#faf4e6] rounded-xl border border-[#ebd8ba] space-y-2">
              <div>
                <div className="text-xs font-bold text-[#5c2311]">
                  தினசரி பாராயணம் செய்ய வேண்டிய மந்திரம் / ஸ்லோகம்:
                </div>
                <div className="p-2.5 bg-white rounded-lg border border-[#e2d0b0] text-xs md:text-sm font-medium text-[#78280f] italic mt-1 font-serif">
                  "{prediction.remedies.mantra}"
                </div>
              </div>

              <div className="pt-2">
                <div className="text-xs font-bold text-[#5c2311]">
                  புண்ணிய தானம் & தர்ம காரியங்கள்:
                </div>
                <div className="text-xs text-[#523522] mt-0.5">
                  {prediction.remedies.charity}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
