import { CalculatedHoroscope } from '../utils/astrologyEngine';

export type AstrologyMethod = 'BPHS' | 'KP' | 'JAIMINI';

export interface HoroscopeInput {
  id?: string;
  name: string;
  dob: string; // YYYY-MM-DD
  time: string; // HH:mm
  place: string;
  placeLat: number;
  placeLng: number;
  gender: 'ஆண்' | 'பெண்' | 'மற்றவை';
  queryFocus: string;
  method: AstrologyMethod;
  createdAt?: string;
}

export interface PlanetaryYoga {
  yogaName: string;
  description: string;
}

export interface DoshaAnalysis {
  hasDosha: boolean;
  title: string;
  explanation: string;
}

export interface Remedies {
  deity: string;
  temples: string[];
  mantra: string;
  gemstone: string;
  luckyColor: string;
  luckyNumber: string;
  luckyDay: string;
  charity: string;
}

export interface PredictionResult {
  title: string;
  summary: string;
  personality: string;
  lagnaRasiAnalysis: string;
  planetaryYogas: PlanetaryYoga[];
  dashaBhuktiForecast: string;
  careerFinance: string;
  marriageFamily: string;
  healthVitality: string;
  doshaAnalysis: DoshaAnalysis;
  remedies: Remedies;
  positiveTraits: string[];
  cautionPoints: string[];
}

export interface FullHoroscopeReport {
  input: HoroscopeInput;
  calculated: CalculatedHoroscope;
  prediction?: PredictionResult;
  timestamp: string;
}
