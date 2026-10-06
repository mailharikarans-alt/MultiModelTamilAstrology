import React, { useState, useEffect } from 'react';
import { Header, NavSection } from './components/Header';
import { InputForm } from './components/InputForm';
import { RasiGridChart } from './components/RasiGridChart';
import { PanchangamCard } from './components/PanchangamCard';
import { MethodAnalysisCard } from './components/MethodAnalysisCard';
import { PredictionReport } from './components/PredictionReport';
import { SavedHoroscopes } from './components/SavedHoroscopes';
import { PrintLeaflet } from './components/PrintLeaflet';
import { HoroscopeInput, FullHoroscopeReport, PredictionResult, AstrologyMethod } from './types/astrology';
import { calculateAstrologyData, CalculatedHoroscope } from './utils/astrologyEngine';
import { Sparkles, Compass, AlertCircle, ArrowUp, Printer, Shield, BookOpen } from 'lucide-react';

const STORAGE_KEY = 'tamil_astrology_saved_horoscopes_v1';

export default function App() {
  const [activeSection, setActiveSection] = useState<NavSection>('home');
  const [currentInput, setCurrentInput] = useState<HoroscopeInput | null>(null);
  const [calculatedData, setCalculatedData] = useState<CalculatedHoroscope | null>(null);
  const [predictionData, setPredictionData] = useState<PredictionResult | null>(null);
  const [isLoadingPrediction, setIsLoadingPrediction] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [savedHoroscopes, setSavedHoroscopes] = useState<FullHoroscopeReport[]>([]);

  // Load saved horoscopes on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setSavedHoroscopes(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to load saved horoscopes', e);
    }
  }, []);

  const handleSaveToStorage = (newReport: FullHoroscopeReport) => {
    try {
      const updated = [newReport, ...savedHoroscopes.filter((h) => h.timestamp !== newReport.timestamp)].slice(0, 10);
      setSavedHoroscopes(updated);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save horoscope', e);
    }
  };

  const handleDeleteSaved = (timestamp: string) => {
    try {
      const updated = savedHoroscopes.filter((h) => h.timestamp !== timestamp);
      setSavedHoroscopes(updated);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to delete horoscope', e);
    }
  };

  const handleGenerateHoroscope = async (input: HoroscopeInput) => {
    setErrorMessage(null);
    setIsLoadingPrediction(true);
    setCurrentInput(input);

    try {
      // 1. Calculate Astronomical Positions deterministically
      const calculated = calculateAstrologyData(
        input.dob,
        input.time,
        input.placeLat,
        input.placeLng
      );
      setCalculatedData(calculated);

      // 2. Query Server-side Gemini for Astrology Predictions with selected method
      const response = await fetch('/api/horoscope/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: input.name,
          dob: input.dob,
          time: input.time,
          place: input.place,
          gender: input.gender,
          queryFocus: input.queryFocus,
          method: input.method || 'BPHS',
          calculatedData: calculated,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'ஜாதகக் கணிப்பு உருவாக்குவதில் பிழை ஏற்பட்டது.');
      }

      const prediction: PredictionResult = await response.json();
      setPredictionData(prediction);

      // Auto save to local history
      const report: FullHoroscopeReport = {
        input,
        calculated,
        prediction,
        timestamp: new Date().toISOString(),
      };
      handleSaveToStorage(report);

      // Smooth scroll to results
      setTimeout(() => {
        const resultsEl = document.getElementById('results-section');
        if (resultsEl) {
          resultsEl.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || 'கணிப்பு உருவாக்குவதில் தடங்கல் ஏற்பட்டுள்ளது. தயவுசெய்து மீண்டும் முயற்சிக்கவும்.');
    } finally {
      setIsLoadingPrediction(false);
    }
  };

  // Switch between BPHS, KP, JAIMINI dynamically in results view
  const handleMethodChange = async (newMethod: AstrologyMethod) => {
    if (!currentInput || !calculatedData) return;
    const updatedInput: HoroscopeInput = { ...currentInput, method: newMethod };
    setCurrentInput(updatedInput);

    setIsLoadingPrediction(true);
    try {
      const response = await fetch('/api/horoscope/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: updatedInput.name,
          dob: updatedInput.dob,
          time: updatedInput.time,
          place: updatedInput.place,
          gender: updatedInput.gender,
          queryFocus: updatedInput.queryFocus,
          method: newMethod,
          calculatedData,
        }),
      });

      if (response.ok) {
        const prediction: PredictionResult = await response.json();
        setPredictionData(prediction);
        const report: FullHoroscopeReport = {
          input: updatedInput,
          calculated: calculatedData,
          prediction,
          timestamp: new Date().toISOString(),
        };
        handleSaveToStorage(report);
      }
    } catch (err) {
      console.error('Failed to regenerate prediction for method:', err);
    } finally {
      setIsLoadingPrediction(false);
    }
  };

  const handleSelectSaved = (report: FullHoroscopeReport) => {
    setCurrentInput(report.input);
    setCalculatedData(report.calculated);
    setPredictionData(report.prediction || null);
    setActiveSection('home');
    setTimeout(() => {
      const resultsEl = document.getElementById('results-section');
      if (resultsEl) {
        resultsEl.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleReset = () => {
    setCurrentInput(null);
    setCalculatedData(null);
    setPredictionData(null);
    setErrorMessage(null);
    setActiveSection('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSectionNav = (sec: NavSection) => {
    setActiveSection(sec);
    if (sec === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (sec === 'method') {
      const el = document.getElementById('method-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (sec === 'chart') {
      const el = document.getElementById('chart-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (sec === 'prediction' || sec === 'remedies') {
      const el = document.getElementById('prediction-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#faf6ef] text-[#2c1810] flex flex-col justify-between selection:bg-[#e0c068] selection:text-[#421b0d]">
      {/* Top Header */}
      <Header
        onReset={handleReset}
        onPrint={handlePrint}
        activeSection={activeSection}
        setActiveSection={handleSectionNav}
        hasCalculated={!!calculatedData}
      />

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto w-full px-4 md:px-8 py-6 md:py-8 flex-1 flex flex-col gap-8 no-print">
        {activeSection === 'saved' ? (
          <SavedHoroscopes
            savedList={savedHoroscopes}
            onSelect={handleSelectSaved}
            onDelete={handleDeleteSaved}
          />
        ) : (
          <>
            {/* Hero / Introduction Section */}
            <div className="text-center max-w-3xl mx-auto space-y-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#f2e6d0] border border-[#ddccb0] text-xs font-bold text-[#78280f]">
                <BookOpen className="w-3.5 h-3.5 text-[#8c5015]" />
                <span>3 முக்கிய ஜோதிட முறைகள்: BPHS · KP · JAIMINI</span>
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#4a1c0d] font-cinzel tracking-tight leading-tight">
                தமிழ் வேத ஜோதிடக் கணிப்பு
              </h1>
              <p className="text-xs sm:text-sm text-[#70523e] max-w-2xl mx-auto leading-relaxed">
                மகாமுனிவர் பராசரரின் <strong>பிருஹத் பராசர ஹோரா சாஸ்திரம் (BPHS)</strong>, பேராசிரியர் கே.எஸ். கிருஷ்ணமூர்த்தியின் <strong>கே.பி. பத்தாதி (KP System)</strong>, மற்றும் மகரிஷி ஜைமினியின் <strong>ஜைமினி சூத்திரங்கள் (Jaimini)</strong> ஆகிய மூன்று தலைசிறந்த முறைகளில் உங்கள் விருப்பப்படி தேர்வு செய்து துல்லியமான பலன்களைப் பெறலாம்.
              </p>
            </div>

            {/* Input Form */}
            <InputForm
              onSubmit={handleGenerateHoroscope}
              isLoading={isLoadingPrediction}
            />

            {/* Error Message Notice if any */}
            {errorMessage && (
              <div className="p-4 bg-[#fde8e8] border border-[#f8b4b4] rounded-xl text-xs md:text-sm text-[#9b1c1c] flex items-center gap-3">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <p>{errorMessage}</p>
              </div>
            )}

            {/* Results Section */}
            {calculatedData && (
              <div id="results-section" className="space-y-8 pt-4">
                {/* Section Title with Jathagar Header */}
                <div className="p-4 bg-gradient-to-r from-[#faf2e1] via-[#fffbf3] to-[#f7eed9] rounded-xl border border-[#ebdcc4] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
                  <div>
                    <div className="text-xs text-[#8c674e] font-semibold flex items-center gap-1.5">
                      <span>ஜாதகர் விவரம் & தேர்ந்தெடுக்கப்பட்ட முறை:</span>
                      <span className="font-bold text-[#78280f] bg-[#f2e2ca] px-2 py-0.5 rounded border border-[#e5d0b2] text-[11px]">
                        {currentInput?.method === 'BPHS' && '1. பராசரர் முறை (BPHS)'}
                        {currentInput?.method === 'KP' && '2. கே.பி. முறை (KP System)'}
                        {currentInput?.method === 'JAIMINI' && '3. ஜைமினி முறை (Jaimini)'}
                      </span>
                    </div>
                    <div className="text-base md:text-lg font-bold text-[#4a1c0d] mt-1">
                      {currentInput?.name} ({currentInput?.gender})
                    </div>
                    <div className="text-xs text-[#6e4e3b] mt-0.5">
                      பிறந்த தேதி: <strong>{currentInput?.dob}</strong> ({currentInput?.time}) · இடம்: <strong>{currentInput?.place}</strong>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handlePrint}
                      className="px-3.5 py-1.5 bg-white hover:bg-[#faf4e6] text-[#4a1c0d] text-xs font-semibold rounded-lg border border-[#d9c7aa] shadow-2xs flex items-center gap-1.5 transition-colors"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>ஜாதகக் குறிப்பேடு அச்சிட (Print)</span>
                    </button>
                  </div>
                </div>

                {/* 1. Panchangam Details Card */}
                <PanchangamCard data={calculatedData} />

                {/* 2. Selected Astrology Method Analysis Card (BPHS / KP / JAIMINI) */}
                <div id="method-section">
                  <MethodAnalysisCard
                    method={currentInput?.method || 'BPHS'}
                    onChangeMethod={handleMethodChange}
                    calculated={calculatedData}
                  />
                </div>

                {/* 3. Rasi & Navamsa South Indian Grids, Planetary Table & Dasa Timeline */}
                <div id="chart-section">
                  <RasiGridChart
                    rasiChart={calculatedData.rasiChart}
                    navamsaChart={calculatedData.navamsaChart}
                    lagnaRasiIndex={calculatedData.lagnaRasi.index}
                    personName={currentInput?.name}
                    allPlanets={calculatedData.planets}
                    dasaTimeline={calculatedData.dasaTimeline}
                    ayanamshaStr={calculatedData.panchangam.ayanamsamStr}
                  />
                </div>

                {/* 4. Deep Astrology AI Astrological Prophecy */}
                {predictionData && currentInput && (
                  <div id="prediction-section">
                    <PredictionReport
                      prediction={predictionData}
                      input={currentInput}
                      calculated={calculatedData}
                    />
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </main>

      {/* Printable Sheet for Traditional Tamil Horoscope (Visible only during Print) */}
      {calculatedData && currentInput && (
        <PrintLeaflet
          input={currentInput}
          calculated={calculatedData}
          prediction={predictionData || undefined}
        />
      )}

      {/* Quiet, Sacred Footer */}
      <footer className="bg-[#f5ecdc] border-t border-[#dfceb5] py-6 px-4 md:px-8 mt-12 text-center text-xs text-[#70523e] no-print">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-[#4a1c0d]">
            <span className="text-[#b8860b]">☸</span>
            <span>தமிழ் வேத ஜோதிடக் கணிப்பு (BPHS · KP · Jaimini)</span>
          </div>
          <div className="text-[11px] text-[#8c674e]">
            ஓம் ஸ்ரீ குருப்யோ நமஹ · சுபமஸ்து
          </div>
          <div className="text-[11px] text-[#8c674e]">
            © {new Date().getFullYear()} தமிழ் ஜோதிடக் கணிப்பு செயலி
          </div>
        </div>
      </footer>
    </div>
  );
}
