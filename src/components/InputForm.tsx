import React, { useState } from 'react';
import { HoroscopeInput, AstrologyMethod } from '../types/astrology';
import { POPULAR_PLACES } from '../utils/astrologyEngine';
import { Calendar, Clock, MapPin, User, Sparkles, HelpCircle, BookOpen } from 'lucide-react';

interface InputFormProps {
  onSubmit: (input: HoroscopeInput) => void;
  isLoading: boolean;
}

const SAMPLE_PROFILES: { label: string; city: string; desc: string; input: HoroscopeInput }[] = [
  {
    label: 'கரூர் (Karur) - பராசரர் முறை',
    city: 'கரூர்',
    desc: 'BPHS கேந்திர-திரிகோண சுப யோகக் கணிப்பு',
    input: {
      name: 'செல்வன் கார்த்திக்',
      dob: '1995-04-14',
      time: '08:30',
      place: 'கரூர் (Karur)',
      placeLat: 10.9601,
      placeLng: 78.0766,
      gender: 'ஆண்',
      queryFocus: 'தொழில் வளர்ச்சி, சொந்த வியாபாரம் மற்றும் தன யோகம்',
      method: 'BPHS',
    },
  },
  {
    label: 'சென்னை (Chennai) - கே.பி. முறை (KP)',
    city: 'சென்னை',
    desc: 'உப நாதன் (Sub-Lord) & உத்தியோக பலன்',
    input: {
      name: 'செல்வி கவிதா',
      dob: '1998-11-20',
      time: '14:45',
      place: 'சென்னை (Chennai)',
      placeLat: 13.0827,
      placeLng: 80.2707,
      gender: 'பெண்',
      queryFocus: 'உயர்கல்வி, வெளிநாட்டு வேலை மற்றும் பதவி உயர்வு',
      method: 'KP',
    },
  },
  {
    label: 'மதுரை (Madurai) - ஜைமினி முறை (Jaimini)',
    city: 'மதுரை',
    desc: 'ஆத்மகாரகன், உபபதம் & களத்திர பாவம்',
    input: {
      name: 'திருமதி மீனாட்சி',
      dob: '1992-08-18',
      time: '06:15',
      place: 'மதுரை (Madurai)',
      placeLat: 9.9252,
      placeLng: 78.1198,
      gender: 'பெண்',
      queryFocus: 'திருமண யோகம், குழந்தை பாக்கியம் மற்றும் குடும்ப ஒற்றுமை',
      method: 'JAIMINI',
    },
  },
  {
    label: 'கோயம்புத்தூர் (Coimbatore) - பராசரர் முறை',
    city: 'கோவை',
    desc: 'ஆரோக்கியம், பூர்வபுண்ணியம் & இஷ்டதெய்வம்',
    input: {
      name: 'சுரேந்தர்',
      dob: '2001-01-26',
      time: '19:20',
      place: 'கோயம்புத்தூர் (Coimbatore)',
      placeLat: 11.0168,
      placeLng: 76.9558,
      gender: 'ஆண்',
      queryFocus: 'பொது வாழ்க்கை, உடல் நலம் மற்றும் வழிபட வேண்டிய திருத்தலங்கள்',
      method: 'BPHS',
    },
  },
];

const FOCUS_OPTIONS = [
  'பொது வாழ்க்கை மற்றும் எதிர்கால பலன்கள்',
  'தொழில் வளர்ச்சி, சொந்த வியாபாரம் மற்றும் தன யோகம்',
  'திருமண யோகம், களத்திர பாவம் மற்றும் குடும்ப ஒற்றுமை',
  'கல்வி, உயர்கல்வி மற்றும் வெளிநாட்டுப் பயணம்',
  'உடல் நலம், ஆயுள் பலம் மற்றும் மன அமைதி',
  'தசா-புக்தி பலன் மற்றும் வழிபட வேண்டிய பரிகாரங்கள்',
];

export const InputForm: React.FC<InputFormProps> = ({ onSubmit, isLoading }) => {
  const [name, setName] = useState('கார்த்திகேயன்');
  const [dob, setDob] = useState('1996-05-15');
  const [time, setTime] = useState('09:45');
  const [selectedPlaceIndex, setSelectedPlaceIndex] = useState(0); // Chennai default
  const [isCustomPlace, setIsCustomPlace] = useState(false);
  const [customPlaceName, setCustomPlaceName] = useState('');
  const [gender, setGender] = useState<'ஆண்' | 'பெண்' | 'மற்றவை'>('ஆண்');
  const [queryFocus, setQueryFocus] = useState(FOCUS_OPTIONS[0]);
  const [method, setMethod] = useState<AstrologyMethod>('BPHS');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let placeName = POPULAR_PLACES[selectedPlaceIndex].name;
    let lat = POPULAR_PLACES[selectedPlaceIndex].lat;
    let lng = POPULAR_PLACES[selectedPlaceIndex].lng;

    if (isCustomPlace && customPlaceName.trim()) {
      placeName = customPlaceName.trim();
      // Default to Tamil Nadu central coordinates if custom
      lat = 10.96;
      lng = 78.08;
    }

    onSubmit({
      name: name.trim() || 'ஜாதகர்',
      dob,
      time,
      place: placeName,
      placeLat: lat,
      placeLng: lng,
      gender,
      queryFocus,
      method,
    });
  };

  const loadSample = (sample: (typeof SAMPLE_PROFILES)[0]) => {
    setName(sample.input.name);
    setDob(sample.input.dob);
    setTime(sample.input.time);
    const placeIdx = POPULAR_PLACES.findIndex((p) => p.name === sample.input.place);
    if (placeIdx !== -1) {
      setSelectedPlaceIndex(placeIdx);
      setIsCustomPlace(false);
    } else {
      setIsCustomPlace(true);
      setCustomPlaceName(sample.input.place);
    }
    setGender(sample.input.gender);
    setQueryFocus(sample.input.queryFocus);
    setMethod(sample.input.method || 'BPHS');
  };

  return (
    <div className="bg-[#fffdf9] rounded-2xl border border-[#d8c39e] p-5 md:p-7 shadow-sm">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-[#ebdcc4] gap-2">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-[#4a1c0d] font-cinzel flex items-center gap-2">
            <span>ஜாதக விபரப் பதிவு (Birth Details)</span>
          </h2>
          <p className="text-xs md:text-sm text-[#70523e] mt-0.5">
            பிறந்த தேதி, நேரம் மற்றும் பிறந்த இடத்தைப் பதிவு செய்து துல்லியமான ஜோதிட பலன்களைப் பெறுக
          </p>
        </div>

        {/* Traditional Pillaiyar Suzhi and blessing */}
        <div className="flex items-center gap-2 self-start sm:self-auto bg-[#faf1de] px-3 py-1 rounded-full border border-[#e5d0b0] text-xs font-semibold text-[#78280f]">
          <span>
            {method === 'BPHS' && 'ஸ்ரீ பராசர மகரிஷி துணை · பராசரர் முறை (BPHS)'}
            {method === 'KP' && 'பேராசிரியர் கே.எஸ்.கே துணை · கே.பி. முறை (KP System)'}
            {method === 'JAIMINI' && 'ஸ்ரீ ஜைமினி மகரிஷி துணை · ஜைமினி முறை (Jaimini)'}
          </span>
        </div>
      </div>

      {/* Quick Sample Selector */}
      <div className="mb-6 p-3 bg-[#faf3e7] rounded-xl border border-[#ebdcc4]">
        <div className="text-xs font-semibold text-[#6e4e3b] mb-2 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#b8860b]" />
          <span>மாதிரி பிறந்த ஜாதகங்கள் (Quick Sample Profiles):</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {SAMPLE_PROFILES.map((sample, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => loadSample(sample)}
              className="text-left p-2.5 bg-white hover:bg-[#fff9ef] rounded-lg border border-[#e0cfae] hover:border-[#b8860b] transition-all text-xs group"
            >
              <div className="font-bold text-[#4a1c0d] group-hover:text-[#78280f] truncate">
                {sample.label}
              </div>
              <div className="text-[11px] text-[#8c674e] truncate mt-0.5">
                {sample.desc}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Input Form */}
      <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
        {/* Astrology Method Selection Dropdown */}
        <div className="p-4 bg-gradient-to-r from-[#faf3e7] via-[#fffbf2] to-[#faf3e7] rounded-xl border-2 border-[#d4af37]/80 shadow-2xs">
          <label className="block text-xs font-bold text-[#4a1c0d] mb-1.5 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-[#8c5015]" />
              <span>ஜோதிடக் கணிப்பு முறை (Choose Astrology Method):</span>
            </span>
            <span className="text-[10px] text-[#78280f] font-bold bg-[#f6e6cd] px-2 py-0.5 rounded border border-[#e6d0ac]">
              BPHS · KP · JAIMINI
            </span>
          </label>

          <select
            value={method}
            onChange={(e) => setMethod(e.target.value as AstrologyMethod)}
            className="w-full px-3.5 py-2.5 bg-white border border-[#cfae7d] rounded-lg text-sm font-semibold text-[#4a1c0d] focus:outline-none focus:ring-2 focus:ring-[#b8860b] shadow-2xs cursor-pointer"
          >
            <option value="BPHS">
              1. பராசரர் முறை (BPHS - Brihat Parasara Hora Sastra) — கேந்திர, திரிகோண சுப யோகங்கள் & விம்சோத்தரி தசை
            </option>
            <option value="KP">
              2. கே.பி. முறை (KP System - Krishnamurti Paddhati) — உப நாதன் (Sub-Lord), பாவ முனைகள் & ஆளும் கிரகங்கள்
            </option>
            <option value="JAIMINI">
              3. ஜைமினி முறை (Jaimini Sutras) — சப்த காரகங்கள் (ஆத்மகாரகன், அமாத்யகாரகன்), காரகாம்சம் & சர தசை
            </option>
          </select>

          <p className="text-[11px] text-[#70523e] mt-2 leading-relaxed">
            {method === 'BPHS' && 'மகாமுனிவர் பராசரரின் பிருஹத் பராசர ஹோரா சாஸ்திரம்: 1,4,7,10 கேந்திரங்கள், 1,5,9 திரிகோணங்கள், பஞ்ச மகாபுருஷ யோகங்கள், மற்றும் 120 ஆண்டுகால விம்சோத்தரி தசா கணிதம்.'}
            {method === 'KP' && 'பேராசிரியர் கே.எஸ். கிருஷ்ணமூர்த்தி அவர்களின் பத்தாதி: நவகிரக நட்சத்திரங்களை 9 உப பிரிவுகளாகப் பகுத்து, உப நாதன் (Sub-Lord) மூலமாக காரிய சித்தி முடிவை நிர்ணயிக்கும் முறை.'}
            {method === 'JAIMINI' && 'மகரிஷி ஜைமினி சூத்திரங்கள்: கிரக பாகைகளின் அடிப்படையில் ஆத்மகாரகன் (AK), அமாத்யகாரகன் (AmK) உள்ளிட்ட 7 சப்த காரகங்கள், காரகாம்சம் மற்றும் சர தசா முறை.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Name */}
          <div>
            <label className="block text-xs font-bold text-[#4a1c0d] mb-1.5 flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-[#8c674e]" />
              <span>பெயர் (Name):</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="எ.கா: கார்த்திக்"
              className="w-full px-3 py-2 bg-white border border-[#d9c7aa] rounded-lg text-sm text-[#4a1c0d] focus:outline-none focus:ring-2 focus:ring-[#b8860b] focus:border-transparent transition-all"
              required
            />
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-xs font-bold text-[#4a1c0d] mb-1.5 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-[#8c674e]" />
              <span>பிறந்த தேதி (Date of Birth):</span>
            </label>
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              max="2030-12-31"
              min="1920-01-01"
              className="w-full px-3 py-2 bg-white border border-[#d9c7aa] rounded-lg text-sm text-[#4a1c0d] focus:outline-none focus:ring-2 focus:ring-[#b8860b] focus:border-transparent transition-all"
              required
            />
          </div>

          {/* Time of Birth */}
          <div>
            <label className="block text-xs font-bold text-[#4a1c0d] mb-1.5 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#8c674e]" />
              <span>பிறந்த நேரம் (Time of Birth):</span>
            </label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-[#d9c7aa] rounded-lg text-sm text-[#4a1c0d] focus:outline-none focus:ring-2 focus:ring-[#b8860b] focus:border-transparent transition-all"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Place of Birth */}
          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-[#4a1c0d] mb-1.5 flex items-center justify-between">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#8c674e]" />
                <span>பிறந்த இடம் (Place of Birth):</span>
              </span>
              <button
                type="button"
                onClick={() => setIsCustomPlace(!isCustomPlace)}
                className="text-[11px] text-[#78280f] hover:underline font-semibold"
              >
                {isCustomPlace ? 'முக்கிய நகரங்கள் பட்டியல்' : '+ பிற ஊர் தட்டச்சு செய்க'}
              </button>
            </label>

            {isCustomPlace ? (
              <input
                type="text"
                value={customPlaceName}
                onChange={(e) => setCustomPlaceName(e.target.value)}
                placeholder="ஊரின் பெயர் (எ.கா: பொள்ளாச்சி, சிவகாசி, தஞ்சாவூர்)"
                className="w-full px-3 py-2 bg-white border border-[#d9c7aa] rounded-lg text-sm text-[#4a1c0d] focus:outline-none focus:ring-2 focus:ring-[#b8860b] focus:border-transparent transition-all"
                required
              />
            ) : (
              <select
                value={selectedPlaceIndex}
                onChange={(e) => setSelectedPlaceIndex(Number(e.target.value))}
                className="w-full px-3 py-2 bg-white border border-[#d9c7aa] rounded-lg text-sm text-[#4a1c0d] focus:outline-none focus:ring-2 focus:ring-[#b8860b] focus:border-transparent transition-all"
              >
                {POPULAR_PLACES.map((p, idx) => (
                  <option key={idx} value={idx}>
                    {p.name}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Gender */}
          <div>
            <label className="block text-xs font-bold text-[#4a1c0d] mb-1.5">
              பாலினம் (Gender):
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {(['ஆண்', 'பெண்', 'மற்றவை'] as const).map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setGender(g)}
                  className={`py-2 text-xs font-semibold rounded-lg border transition-all ${
                    gender === g
                      ? 'bg-[#78280f] text-white border-[#78280f] shadow-xs'
                      : 'bg-white text-[#5c2311] border-[#d9c7aa] hover:bg-[#faf4e6]'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Specific Focus Query */}
        <div>
          <label className="block text-xs font-bold text-[#4a1c0d] mb-1.5 flex items-center gap-1">
            <HelpCircle className="w-3.5 h-3.5 text-[#8c674e]" />
            <span>குறிப்பிட்ட பலன் கவனம் (Life Aspect to Focus):</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
            {FOCUS_OPTIONS.map((opt, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setQueryFocus(opt)}
                className={`text-left p-2.5 text-xs rounded-lg border transition-all ${
                  queryFocus === opt
                    ? 'bg-[#fcedd7] text-[#5c2311] border-[#b8860b] font-bold shadow-2xs'
                    : 'bg-white text-[#634835] border-[#dfceb5] hover:bg-[#faf4e8]'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full sm:w-auto px-8 py-3 text-sm font-bold text-white rounded-xl shadow-md transition-all flex items-center justify-center gap-2 ${
              isLoading
                ? 'bg-[#a37962] cursor-not-allowed'
                : 'bg-gradient-to-r from-[#78280f] via-[#8c3214] to-[#78280f] hover:from-[#5f1f0a] hover:to-[#5f1f0a] active:scale-[0.99]'
            }`}
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                <span>ஜாதகம் கணிக்கப்படுகிறது...</span>
              </>
            ) : (
              <>
                <span className="text-[#ffd700]">☸</span>
                <span>
                  {method === 'BPHS' && 'பராசரர் முறைப்படி கணிக்கவும் (Generate BPHS Horoscope)'}
                  {method === 'KP' && 'கே.பி. முறைப்படி கணிக்கவும் (Generate KP Horoscope)'}
                  {method === 'JAIMINI' && 'ஜைமினி முறைப்படி கணிக்கவும் (Generate Jaimini Horoscope)'}
                </span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
