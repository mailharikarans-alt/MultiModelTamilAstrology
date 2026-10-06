/**
 * Traditional South Indian / Tamil Vedic Astrology Engine
 * Accurate Nirayana (Sidereal) Astronomical calculations using Lahiri Ayanamsha (Chitra Paksha)
 * Powered by high-precision VSOP87 / NOVAS ephemeris via astronomy-engine
 * Matching industry standards (Prokerala Tamil Jathagam & Thirukanitha Panchangam)
 */

import * as Astronomy from 'astronomy-engine';

export interface PlanetaryPosition {
  name: string;
  tamilName: string;
  shortTamil: string;
  longitude: number; // 0 to 360 sidereal longitude
  rasiIndex: number; // 0 = Mesham ... 11 = Meenam
  rasiName: string;
  rasiTamil: string;
  degreeInRasi: number;
  degMinStr: string; // e.g. "29° 55'"
  nakshatraIndex: number; // 0 to 26
  nakshatraName: string;
  nakshatraTamil: string;
  pada: number; // 1, 2, 3, 4
  starLordTamil: string;
  signLordTamil: string;
  navamsaRasiIndex: number; // 0 to 11
  navamsaRasiTamil: string;
  isRetrograde?: boolean;
}

export interface DasaBalance {
  lordTamil: string;
  lordEnglish: string;
  totalYears: number;
  remainingYears: number;
  remainingMonths: number;
  remainingDays: number;
}

export interface DasaPeriod {
  lordTamil: string;
  lordEnglish: string;
  startAge: number;
  endAge: number;
  startDateStr: string;
  endDateStr: string;
  durationYears: number;
  isCurrent?: boolean;
}

export interface PanchangamDetails {
  tithiTamil: string;
  tithiPaksha: string;
  tithiNumber: number;
  yogamTamil: string;
  karanamTamil: string;
  dayTamil: string;
  ayanamsamValue: number;
  ayanamsamStr: string; // e.g. 23° 47' 28" (லஹரி)
  sunriseTimeStr?: string;
  sunsetTimeStr?: string;
}

export interface ParasaraHouseInfo {
  house: number; // 1 to 12
  rasiIndex: number;
  rasiTamil: string;
  lordTamil: string;
  planets: string[];
}

export interface ParasaraDetails {
  method: 'Brihat Parasara Hora Sastra (BPHS)';
  kendras: ParasaraHouseInfo[]; // 1, 4, 7, 10
  trikonas: ParasaraHouseInfo[]; // 1, 5, 9
  upachayas: ParasaraHouseInfo[]; // 3, 6, 10, 11
  dusthanas: ParasaraHouseInfo[]; // 6, 8, 12
  marakas: ParasaraHouseInfo[]; // 2, 7
  badhaka: {
    house: number;
    rasiTamil: string;
    lordTamil: string;
    typeTamil: string;
  };
  vargottamaPlanets: { planetTamil: string; rasiTamil: string }[];
  panchaMahapurushaYogas: { yogaName: string; planetTamil: string; rasiTamil: string; description: string }[];
  parasaraDrishti: { planetTamil: string; aspectedHouses: number[]; aspectedRasis: string[] }[];
}

export interface KpPlanetInfo {
  planetTamil: string;
  signLordTamil: string;
  starLordTamil: string;
  subLordTamil: string;
  degreeStr: string;
}

export interface KpRulingPlanets {
  dayLord: string;
  moonSignLord: string;
  moonStarLord: string;
  lagnaSignLord: string;
  lagnaStarLord: string;
}

export interface KpCuspInfo {
  cuspNumber: number;
  rasiTamil: string;
  signLord: string;
  starLord: string;
  subLord: string;
}

export interface KpDetails {
  method: 'Krishnamurti Paddhati (KP System)';
  planets: KpPlanetInfo[];
  cusps: KpCuspInfo[];
  rulingPlanets: KpRulingPlanets;
  keyRuleTamil: string;
}

export interface JaiminiKarakaInfo {
  karakaNameTamil: string;
  karakaCode: 'AK' | 'AmK' | 'BK' | 'MK' | 'PK' | 'GK' | 'DK';
  planetTamil: string;
  degreeInRasi: number;
  significanceTamil: string;
}

export interface JaiminiDetails {
  method: 'Jaimini Astrology Sutras';
  charaKarakas: JaiminiKarakaInfo[];
  karakamshaRasi: string;
  upapadaLagnaRasi: string;
  rasiDrishtiSummary: { rasiTamil: string; aspectedRasisTamil: string[] }[];
  charaDasaOrder: string[];
}

export interface CalculatedHoroscope {
  rasiChart: { [rasiIndex: number]: PlanetaryPosition[] };
  navamsaChart: { [rasiIndex: number]: PlanetaryPosition[] };
  lagna: PlanetaryPosition;
  moon: PlanetaryPosition;
  sun: PlanetaryPosition;
  planets: PlanetaryPosition[];
  nakshatra: {
    index: number;
    tamil: string;
    english: string;
    lordTamil: string;
    pada: number;
  };
  rasi: {
    index: number;
    tamil: string;
    english: string;
    lordTamil: string;
  };
  lagnaRasi: {
    index: number;
    tamil: string;
    english: string;
    lordTamil: string;
  };
  dasaBalance: DasaBalance;
  dasaTimeline: DasaPeriod[];
  panchangam: PanchangamDetails;
  parasara: ParasaraDetails;
  kp: KpDetails;
  jaimini: JaiminiDetails;
}

export const TAMIL_RASIS = [
  { index: 0, tamil: 'மேஷம்', english: 'Mesham (Aries)', lord: 'செவ்வாய்' },
  { index: 1, tamil: 'ரிஷபம்', english: 'Rishabam (Taurus)', lord: 'சுக்கிரன்' },
  { index: 2, tamil: 'மிதுனம்', english: 'Mithunam (Gemini)', lord: 'புதன்' },
  { index: 3, tamil: 'கடகம்', english: 'Katakam (Cancer)', lord: 'சந்திரன்' },
  { index: 4, tamil: 'சிம்மம்', english: 'Simmam (Leo)', lord: 'சூரியன்' },
  { index: 5, tamil: 'கன்னி', english: 'Kanni (Virgo)', lord: 'புதன்' },
  { index: 6, tamil: 'துலாம்', english: 'Thulam (Libra)', lord: 'சுக்கிரன்' },
  { index: 7, tamil: 'விருச்சிகம்', english: 'Viruchigam (Scorpio)', lord: 'செவ்வாய்' },
  { index: 8, tamil: 'தனுசு', english: 'Dhanusu (Sagittarius)', lord: 'குரு' },
  { index: 9, tamil: 'மகரம்', english: 'Makaram (Capricorn)', lord: 'சனி' },
  { index: 10, tamil: 'கும்பம்', english: 'Kumbam (Aquarius)', lord: 'சனி' },
  { index: 11, tamil: 'மீனம்', english: 'Meenam (Pisces)', lord: 'குரு' },
];

export const TAMIL_NAKSHATRAS = [
  { index: 0, tamil: 'அஸ்வினி', english: 'Ashwini', lord: 'கேது', dasaYears: 7 },
  { index: 1, tamil: 'பரணி', english: 'Bharani', lord: 'சுக்கிரன்', dasaYears: 20 },
  { index: 2, tamil: 'கார்த்திகை', english: 'Krittika', lord: 'சூரியன்', dasaYears: 6 },
  { index: 3, tamil: 'ரோகிணி', english: 'Rohini', lord: 'சந்திரன்', dasaYears: 10 },
  { index: 4, tamil: 'மிருகசீரிஷம்', english: 'Mrigashirsha', lord: 'செவ்வாய்', dasaYears: 7 },
  { index: 5, tamil: 'திருவாதிரை', english: 'Thiruvathirai', lord: 'ராகு', dasaYears: 18 },
  { index: 6, tamil: 'புனர்பூசம்', english: 'Punarvasu', lord: 'குரு', dasaYears: 16 },
  { index: 7, tamil: 'பூசம்', english: 'Poosam', lord: 'சனி', dasaYears: 19 },
  { index: 8, tamil: 'ஆயில்யம்', english: 'Ayilyam', lord: 'புதன்', dasaYears: 17 },
  { index: 9, tamil: 'மகம்', english: 'Magham', lord: 'கேது', dasaYears: 7 },
  { index: 10, tamil: 'பூரம்', english: 'Pooram', lord: 'சுக்கிரன்', dasaYears: 20 },
  { index: 11, tamil: 'உத்திரம்', english: 'Uthiram', lord: 'சூரியன்', dasaYears: 6 },
  { index: 12, tamil: 'அஸ்தம்', english: 'Hastham', lord: 'சந்திரன்', dasaYears: 10 },
  { index: 13, tamil: 'சித்திரை', english: 'Chithirai', lord: 'செவ்வாய்', dasaYears: 7 },
  { index: 14, tamil: 'சுவாதி', english: 'Swathi', lord: 'ராகு', dasaYears: 18 },
  { index: 15, tamil: 'விசாகம்', english: 'Visakam', lord: 'குரு', dasaYears: 16 },
  { index: 16, tamil: 'அனுஷம்', english: 'Anusham', lord: 'சனி', dasaYears: 19 },
  { index: 17, tamil: 'கேட்டை', english: 'Kettai', lord: 'புதன்', dasaYears: 17 },
  { index: 18, tamil: 'மூலம்', english: 'Moolam', lord: 'கேது', dasaYears: 7 },
  { index: 19, tamil: 'பூராடம்', english: 'Pooradam', lord: 'சுக்கிரன்', dasaYears: 20 },
  { index: 20, tamil: 'உத்திராடம்', english: 'Uthiradam', lord: 'சூரியன்', dasaYears: 6 },
  { index: 21, tamil: 'திருவோணம்', english: 'Thiruvonam', lord: 'சந்திரன்', dasaYears: 10 },
  { index: 22, tamil: 'அவிட்டம்', english: 'Avittam', lord: 'செவ்வாய்', dasaYears: 7 },
  { index: 23, tamil: 'சதயம்', english: 'Sathayam', lord: 'ராகு', dasaYears: 18 },
  { index: 24, tamil: 'பூரட்டாதி', english: 'Poorattathi', lord: 'குரு', dasaYears: 16 },
  { index: 25, tamil: 'உத்திரட்டாதி', english: 'Uthirattathi', lord: 'சனி', dasaYears: 19 },
  { index: 26, tamil: 'ரேவதி', english: 'Revathi', lord: 'புதன்', dasaYears: 17 },
];

export const VIMSHOTTARI_DASA_ORDER = [
  { lordTamil: 'கேது', lordEnglish: 'Ketu', years: 7 },
  { lordTamil: 'சுக்கிரன்', lordEnglish: 'Venus', years: 20 },
  { lordTamil: 'சூரியன்', lordEnglish: 'Sun', years: 6 },
  { lordTamil: 'சந்திரன்', lordEnglish: 'Moon', years: 10 },
  { lordTamil: 'செவ்வாய்', lordEnglish: 'Mars', years: 7 },
  { lordTamil: 'ராகு', lordEnglish: 'Rahu', years: 18 },
  { lordTamil: 'குரு', lordEnglish: 'Jupiter', years: 16 },
  { lordTamil: 'சனி', lordEnglish: 'Saturn', years: 19 },
  { lordTamil: 'புதன்', lordEnglish: 'Mercury', years: 17 },
];

export const TAMIL_DAYS = [
  'ஞாயிறு', // Sunday
  'திங்கள்', // Monday
  'செவ்வாய்', // Tuesday
  'புதன்', // Wednesday
  'வியாழன்', // Thursday
  'வெள்ளி', // Friday
  'சனி', // Saturday
];

export const TAMIL_YOGAMS = [
  'விஷ்கம்பம்', 'ப்ரீதி', 'ஆயுஷ்மான்', 'சௌபாக்யம்', 'சோபனம்',
  'அதிகண்டம்', 'சுகர்மம்', 'திருதி', 'சூலம்', 'கண்டம்',
  'விருத்தி', 'துருவம்', 'வியாகாதம்', 'ஹர்ஷணம்', 'வஜ்ரம்',
  'சித்தி', 'வியதீபாதம்', 'வரீயான்', 'பரிகம்', 'சிவம்',
  'சித்தம்', 'சாத்தியம்', 'சுபம்', 'சுப்ரம்', 'பிராம்மம்',
  'ஐந்திரம்', 'வைதிருதி',
];

export const TAMIL_KARANAMS = [
  'பவம்', 'பாலவம்', 'கௌலவம்', 'சைதுளை',
  'கரசை', 'வணிசை', 'பத்திரை', 'சகுனி',
  'சதுஷ்பாதம்', 'நாகவம்', 'கிம்ஸ்துக்னம்',
];

export const POPULAR_PLACES = [
  { name: 'சென்னை (Chennai)', lat: 13.0827, lng: 80.2707, tz: 5.5 },
  { name: 'கரூர் (Karur)', lat: 10.9601, lng: 78.0766, tz: 5.5 },
  { name: 'மதுரை (Madurai)', lat: 9.9252, lng: 78.1198, tz: 5.5 },
  { name: 'கோயம்புத்தூர் (Coimbatore)', lat: 11.0168, lng: 76.9558, tz: 5.5 },
  { name: 'திருச்சிராப்பள்ளி (Tiruchirappalli)', lat: 10.7905, lng: 78.7047, tz: 5.5 },
  { name: 'சேலம் (Salem)', lat: 11.6643, lng: 78.1460, tz: 5.5 },
  { name: 'திருநெல்வேலி (Tirunelveli)', lat: 8.7139, lng: 77.7567, tz: 5.5 },
  { name: 'தஞ்சாவூர் (Thanjavur)', lat: 10.7870, lng: 79.1378, tz: 5.5 },
  { name: 'ஈரோடு (Erode)', lat: 11.3410, lng: 77.7172, tz: 5.5 },
  { name: 'வேலூர் (Vellore)', lat: 12.9165, lng: 79.1325, tz: 5.5 },
  { name: 'திண்டுக்கல் (Dindigul)', lat: 10.3673, lng: 77.9803, tz: 5.5 },
  { name: 'கும்பகோணம் (Kumbakonam)', lat: 10.9602, lng: 79.3845, tz: 5.5 },
  { name: 'கன்னியாகுமரி (Kanyakumari)', lat: 8.0883, lng: 77.5385, tz: 5.5 },
  { name: 'தூத்துக்குடி (Thoothukudi)', lat: 8.7642, lng: 78.1348, tz: 5.5 },
  { name: 'நாகர்கோவில் (Nagercoil)', lat: 8.1833, lng: 77.4119, tz: 5.5 },
  { name: 'புதுச்சேரி (Puducherry)', lat: 11.9416, lng: 79.8083, tz: 5.5 },
  { name: 'பெங்களூரு (Bengaluru)', lat: 12.9716, lng: 77.5946, tz: 5.5 },
  { name: 'மும்பை (Mumbai)', lat: 19.0760, lng: 72.8777, tz: 5.5 },
  { name: 'புதுதில்லி (New Delhi)', lat: 28.6139, lng: 77.2090, tz: 5.5 },
  { name: 'யாழ்ப்பாணம் (Jaffna)', lat: 9.6615, lng: 80.0255, tz: 5.5 },
  { name: 'கொழும்பு (Colombo)', lat: 6.9271, lng: 79.8612, tz: 5.5 },
  { name: 'சிங்கப்பூர் (Singapore)', lat: 1.3521, lng: 103.8198, tz: 8.0 },
  { name: 'கோலாலம்பூர் (Kuala Lumpur)', lat: 3.1390, lng: 101.6869, tz: 8.0 },
  { name: 'துபாய் (Dubai)', lat: 25.2048, lng: 55.2708, tz: 4.0 },
  { name: 'லண்டன் (London)', lat: 51.5074, lng: -0.1278, tz: 0.0 },
];

function normalizeDeg(deg: number): number {
  let d = deg % 360;
  if (d < 0) d += 360;
  return d;
}

function formatDegMin(deg: number): string {
  const d = Math.floor(deg);
  const m = Math.floor((deg - d) * 60);
  return `${d.toString().padStart(2, '0')}° ${m.toString().padStart(2, '0')}'`;
}

function formatAyanamsha(deg: number): string {
  const d = Math.floor(deg);
  const mFloat = (deg - d) * 60;
  const m = Math.floor(mFloat);
  const s = Math.round((mFloat - m) * 60);
  return `${d}° ${m}' ${s}" (லஹரி)`;
}

/**
 * Standard Lahiri Ayanamsha (Chitra Paksha Ayanamsha)
 * Formula based on IAU J2000 epoch used across Vedic astrology:
 * T = days_since_J2000 / 36525.0
 * Ayanamsha = 23° 51' 25.532" + 5029.0966" * T + 1.1120" * T^2
 */
function getLahiriAyanamsha(astroTime: Astronomy.AstroTime): number {
  const T = astroTime.tt / 36525.0;
  return 23.857092 + 1.396971 * T + 0.000309 * T * T;
}

/**
 * Calculates high-precision Ascendant / Lagna (லக்னம்)
 */
function calculateAscendant(
  astroTime: Astronomy.AstroTime,
  lat: number,
  lng: number,
  ayanamsha: number
): number {
  const gmstHours = Astronomy.SiderealTime(astroTime);
  const gmstDeg = (gmstHours * 15) % 360;
  const lmstDeg = normalizeDeg(gmstDeg + lng);

  const ramcRad = (lmstDeg * Math.PI) / 180;
  const latRad = (lat * Math.PI) / 180;
  const epsRad = (23.4392911 * Math.PI) / 180; // Obliquity of ecliptic

  const yAsc = Math.cos(ramcRad);
  const xAsc = -Math.sin(ramcRad) * Math.cos(epsRad) - Math.tan(latRad) * Math.sin(epsRad);

  let ascTropDeg = (Math.atan2(yAsc, xAsc) * 180) / Math.PI;
  ascTropDeg = normalizeDeg(ascTropDeg);

  return normalizeDeg(ascTropDeg - ayanamsha);
}

/**
 * Calculates KP Sub-Lord for any sidereal longitude
 */
function getKpSubLord(sidLong: number): { starLord: string; subLord: string } {
  const nakIdx = Math.floor(sidLong / (360 / 27));
  const nak = TAMIL_NAKSHATRAS[nakIdx];
  const offsetMinutes = (sidLong % (360 / 27)) * 60; // 0 to 800 arcminutes

  // Sub-lords in nakshatra start from the lord of the nakshatra
  const startLordIdx = VIMSHOTTARI_DASA_ORDER.findIndex(
    (d) => d.lordTamil === nak.lord
  );

  let accumulated = 0;
  let subLordTamil = nak.lord;

  for (let i = 0; i < 9; i++) {
    const curLord = VIMSHOTTARI_DASA_ORDER[(startLordIdx + i) % 9];
    const spanMinutes = (800 * curLord.years) / 120;
    if (accumulated + spanMinutes >= offsetMinutes || i === 8) {
      subLordTamil = curLord.lordTamil;
      break;
    }
    accumulated += spanMinutes;
  }

  return { starLord: nak.lord, subLord: subLordTamil };
}

/**
 * High-precision Vedic Astrological Engine
 */
export function calculateAstrologyData(
  dob: string, // YYYY-MM-DD
  time: string, // HH:mm
  placeLat: number,
  placeLng: number,
  timezoneOffset = 5.5
): CalculatedHoroscope {
  const [yStr, mStr, dStr] = dob.split('-');
  const [hrStr, minStr] = time.split(':');
  const year = parseInt(yStr, 10);
  const month = parseInt(mStr, 10);
  const day = parseInt(dStr, 10);
  const hours = parseInt(hrStr, 10);
  const minutes = parseInt(minStr, 10);

  // UTC Date conversion
  const utcHours = hours + minutes / 60 - timezoneOffset;
  const birthDateUtc = new Date(Date.UTC(year, month - 1, day, 0, 0, 0) + utcHours * 3600000);
  const astroTime = new Astronomy.AstroTime(birthDateUtc);
  const astroTimeNextHour = new Astronomy.AstroTime(new Date(birthDateUtc.getTime() + 3600000));

  const T = astroTime.tt / 36525.0;
  const ayanamsha = getLahiriAyanamsha(astroTime);

  // 1. Calculate Lagna (லக்னம்)
  const lagnaSidLong = calculateAscendant(astroTime, placeLat, placeLng, ayanamsha);

  // 2. Calculate Planets using astronomy-engine
  const PLANET_DEFINITIONS: {
    name: string;
    tamilName: string;
    shortTamil: string;
    body: Astronomy.Body | null;
  }[] = [
    { name: 'Sun', tamilName: 'சூரியன்', shortTamil: 'சூரி', body: Astronomy.Body.Sun },
    { name: 'Moon', tamilName: 'சந்திரன்', shortTamil: 'சந்', body: Astronomy.Body.Moon },
    { name: 'Mars', tamilName: 'செவ்வாய்', shortTamil: 'செவ்', body: Astronomy.Body.Mars },
    { name: 'Mercury', tamilName: 'புதன்', shortTamil: 'புத', body: Astronomy.Body.Mercury },
    { name: 'Jupiter', tamilName: 'குரு', shortTamil: 'குரு', body: Astronomy.Body.Jupiter },
    { name: 'Venus', tamilName: 'சுக்கிரன்', shortTamil: 'சுக்', body: Astronomy.Body.Venus },
    { name: 'Saturn', tamilName: 'சனி', shortTamil: 'சனி', body: Astronomy.Body.Saturn },
  ];

  const calculatedPlanets: PlanetaryPosition[] = [];

  for (const p of PLANET_DEFINITIONS) {
    if (p.body) {
      const v1 = Astronomy.GeoVector(p.body, astroTime, true);
      const e1 = Astronomy.Ecliptic(v1).elon;

      // Retrograde detection
      const v2 = Astronomy.GeoVector(p.body, astroTimeNextHour, true);
      const e2 = Astronomy.Ecliptic(v2).elon;
      let diff = e2 - e1;
      if (diff > 180) diff -= 360;
      if (diff < -180) diff += 360;
      const isRetrograde = p.name !== 'Sun' && p.name !== 'Moon' && diff < 0;

      const sidLong = normalizeDeg(e1 - ayanamsha);
      const rasiIndex = Math.floor(sidLong / 30);
      const degreeInRasi = Number((sidLong % 30).toFixed(2));
      const degMinStr = formatDegMin(degreeInRasi);

      const nakIdx = Math.floor(sidLong / (360 / 27));
      const nak = TAMIL_NAKSHATRAS[nakIdx];
      const pada = Math.floor((sidLong % (360 / 27)) / (360 / 108)) + 1;

      // Standard Vedic Navamsha: 108 divisions of 3° 20' across the 360 zodiac
      const navamsaRasiIndex = Math.floor(sidLong / (360 / 108)) % 12;

      calculatedPlanets.push({
        name: p.name,
        tamilName: p.tamilName,
        shortTamil: p.shortTamil,
        longitude: sidLong,
        rasiIndex,
        rasiName: TAMIL_RASIS[rasiIndex].english,
        rasiTamil: TAMIL_RASIS[rasiIndex].tamil,
        degreeInRasi,
        degMinStr,
        nakshatraIndex: nakIdx,
        nakshatraName: nak.english,
        nakshatraTamil: nak.tamil,
        pada,
        starLordTamil: nak.lord,
        signLordTamil: TAMIL_RASIS[rasiIndex].lord,
        navamsaRasiIndex,
        navamsaRasiTamil: TAMIL_RASIS[navamsaRasiIndex].tamil,
        isRetrograde,
      });
    }
  }

  // 3. Rahu & Ketu (Mean Lunar Node, matching Indian ephemeris)
  const omega = 125.04455501 - 1934.1361849 * T + 0.0020762 * T * T;
  const rahuTropLong = normalizeDeg(omega);
  const rahuSidLong = normalizeDeg(rahuTropLong - ayanamsha);
  const ketuSidLong = normalizeDeg(rahuSidLong + 180);

  const rahuRasiIdx = Math.floor(rahuSidLong / 30);
  const rahuDegInRasi = Number((rahuSidLong % 30).toFixed(2));
  const rahuNakIdx = Math.floor(rahuSidLong / (360 / 27));
  const rahuNak = TAMIL_NAKSHATRAS[rahuNakIdx];
  const rahuPada = Math.floor((rahuSidLong % (360 / 27)) / (360 / 108)) + 1;
  const rahuNavamsaIdx = Math.floor(rahuSidLong / (360 / 108)) % 12;

  calculatedPlanets.push({
    name: 'Rahu',
    tamilName: 'ராகு',
    shortTamil: 'ராகு',
    longitude: rahuSidLong,
    rasiIndex: rahuRasiIdx,
    rasiName: TAMIL_RASIS[rahuRasiIdx].english,
    rasiTamil: TAMIL_RASIS[rahuRasiIdx].tamil,
    degreeInRasi: rahuDegInRasi,
    degMinStr: formatDegMin(rahuDegInRasi),
    nakshatraIndex: rahuNakIdx,
    nakshatraName: rahuNak.english,
    nakshatraTamil: rahuNak.tamil,
    pada: rahuPada,
    starLordTamil: rahuNak.lord,
    signLordTamil: TAMIL_RASIS[rahuRasiIdx].lord,
    navamsaRasiIndex: rahuNavamsaIdx,
    navamsaRasiTamil: TAMIL_RASIS[rahuNavamsaIdx].tamil,
    isRetrograde: true, // Nodes are always retrograde in mean motion
  });

  const ketuRasiIdx = Math.floor(ketuSidLong / 30);
  const ketuDegInRasi = Number((ketuSidLong % 30).toFixed(2));
  const ketuNakIdx = Math.floor(ketuSidLong / (360 / 27));
  const ketuNak = TAMIL_NAKSHATRAS[ketuNakIdx];
  const ketuPada = Math.floor((ketuSidLong % (360 / 27)) / (360 / 108)) + 1;
  const ketuNavamsaIdx = Math.floor(ketuSidLong / (360 / 108)) % 12;

  calculatedPlanets.push({
    name: 'Ketu',
    tamilName: 'கேது',
    shortTamil: 'கேது',
    longitude: ketuSidLong,
    rasiIndex: ketuRasiIdx,
    rasiName: TAMIL_RASIS[ketuRasiIdx].english,
    rasiTamil: TAMIL_RASIS[ketuRasiIdx].tamil,
    degreeInRasi: ketuDegInRasi,
    degMinStr: formatDegMin(ketuDegInRasi),
    nakshatraIndex: ketuNakIdx,
    nakshatraName: ketuNak.english,
    nakshatraTamil: ketuNak.tamil,
    pada: ketuPada,
    starLordTamil: ketuNak.lord,
    signLordTamil: TAMIL_RASIS[ketuRasiIdx].lord,
    navamsaRasiIndex: ketuNavamsaIdx,
    navamsaRasiTamil: TAMIL_RASIS[ketuNavamsaIdx].tamil,
    isRetrograde: true,
  });

  // Lagna Position Object
  const lagnaRasiIdx = Math.floor(lagnaSidLong / 30);
  const lagnaDegInRasi = Number((lagnaSidLong % 30).toFixed(2));
  const lagnaNakIdx = Math.floor(lagnaSidLong / (360 / 27));
  const lagnaNak = TAMIL_NAKSHATRAS[lagnaNakIdx];
  const lagnaPada = Math.floor((lagnaSidLong % (360 / 27)) / (360 / 108)) + 1;
  const lagnaNavamsaIdx = Math.floor(lagnaSidLong / (360 / 108)) % 12;

  const lagnaPosition: PlanetaryPosition = {
    name: 'Lagna',
    tamilName: 'லக்னம்',
    shortTamil: 'ல',
    longitude: lagnaSidLong,
    rasiIndex: lagnaRasiIdx,
    rasiName: TAMIL_RASIS[lagnaRasiIdx].english,
    rasiTamil: TAMIL_RASIS[lagnaRasiIdx].tamil,
    degreeInRasi: lagnaDegInRasi,
    degMinStr: formatDegMin(lagnaDegInRasi),
    nakshatraIndex: lagnaNakIdx,
    nakshatraName: lagnaNak.english,
    nakshatraTamil: lagnaNak.tamil,
    pada: lagnaPada,
    starLordTamil: lagnaNak.lord,
    signLordTamil: TAMIL_RASIS[lagnaRasiIdx].lord,
    navamsaRasiIndex: lagnaNavamsaIdx,
    navamsaRasiTamil: TAMIL_RASIS[lagnaNavamsaIdx].tamil,
    isRetrograde: false,
  };

  const sunPos = calculatedPlanets.find((p) => p.name === 'Sun')!;
  const moonPos = calculatedPlanets.find((p) => p.name === 'Moon')!;

  // 4. Build Rasi Chart & Navamsa Chart grids
  const rasiChart: { [rasiIndex: number]: PlanetaryPosition[] } = {};
  const navamsaChart: { [rasiIndex: number]: PlanetaryPosition[] } = {};

  for (let i = 0; i < 12; i++) {
    rasiChart[i] = [];
    navamsaChart[i] = [];
  }

  // Include Lagna in charts
  rasiChart[lagnaRasiIdx].push(lagnaPosition);
  navamsaChart[lagnaNavamsaIdx].push(lagnaPosition);

  // Include Planets in charts
  for (const planet of calculatedPlanets) {
    rasiChart[planet.rasiIndex].push(planet);
    navamsaChart[planet.navamsaRasiIndex].push(planet);
  }

  // 5. Panchangam Calculations (matching standard Thirukanitha Panchangam)
  const tithiDiff = normalizeDeg(moonPos.longitude - sunPos.longitude);
  const tithiNumber = Math.floor(tithiDiff / 12) + 1;
  const tithiPaksha = tithiNumber <= 15 ? 'வளர்பிறை (சுக்கில பட்சம்)' : 'தேய்பிறை (கிருஷ்ண பட்சம்)';
  const tithiIdx = (tithiNumber - 1) % 15;
  const tithiNames = [
    'பிரதமை', 'துவிதியை', 'திருதியை', 'சதுர்த்தி', 'பஞ்சமி',
    'சஷ்டி', 'சப்தமி', 'அஷ்டமி', 'நவமி', 'தசமி',
    'ஏகாதசி', 'துவாதசி', 'திரயோதசி', 'சதுர்த்தசி',
    tithiNumber === 15 ? 'பௌர்ணமி' : 'அமாவாசை',
  ];
  const tithiTamil = `${tithiNames[tithiIdx]} (${tithiPaksha})`;

  const yogamSum = normalizeDeg(moonPos.longitude + sunPos.longitude);
  const yogamIdx = Math.floor(yogamSum / (360 / 27));
  const yogamTamil = TAMIL_YOGAMS[yogamIdx];

  const karanamIdx = Math.floor(tithiDiff / 6) % 11;
  const karanamTamil = TAMIL_KARANAMS[karanamIdx];

  // Day of week
  const dayOfWeekIdx = birthDateUtc.getUTCDay();
  const dayTamil = TAMIL_DAYS[dayOfWeekIdx];

  // 6. Vimshottari Dasa Balance & Lifecycle Timeline
  const moonNakIdx = moonPos.nakshatraIndex;
  const moonNak = TAMIL_NAKSHATRAS[moonNakIdx];
  const nakshatraSpan = 360 / 27; // 13.333333°
  const elapsedDeg = moonPos.longitude % nakshatraSpan;
  const elapsedFraction = elapsedDeg / nakshatraSpan;
  const remainingFraction = Math.max(0, Math.min(1, 1 - elapsedFraction));

  const totalDasaYears = moonNak.dasaYears;
  const remYearsTotal = remainingFraction * totalDasaYears;
  const remainingYears = Math.floor(remYearsTotal);
  const remainingMonths = Math.floor((remYearsTotal - remainingYears) * 12);
  const remainingDays = Math.floor(
    (((remYearsTotal - remainingYears) * 12) - remainingMonths) * 30.4375
  );

  const dasaBalance: DasaBalance = {
    lordTamil: moonNak.lord,
    lordEnglish: VIMSHOTTARI_DASA_ORDER.find((v) => v.lordTamil === moonNak.lord)?.lordEnglish || '',
    totalYears: totalDasaYears,
    remainingYears,
    remainingMonths,
    remainingDays,
  };

  // Build sequential Dasa timeline across 120-year cycle
  const dasaTimeline: DasaPeriod[] = [];
  const startLordIdx = VIMSHOTTARI_DASA_ORDER.findIndex(
    (d) => d.lordTamil === moonNak.lord
  );

  let currentStartAge = 0;
  let currentStartYear = year + (month - 1) / 12 + day / 365.25;

  for (let i = 0; i < 9; i++) {
    const curLord = VIMSHOTTARI_DASA_ORDER[(startLordIdx + i) % 9];
    const duration = i === 0 ? remYearsTotal : curLord.years;
    const endAge = currentStartAge + duration;
    const endYear = currentStartYear + duration;

    dasaTimeline.push({
      lordTamil: curLord.lordTamil,
      lordEnglish: curLord.lordEnglish,
      startAge: Number(currentStartAge.toFixed(1)),
      endAge: Number(endAge.toFixed(1)),
      startDateStr: Math.floor(currentStartYear).toString(),
      endDateStr: Math.floor(endYear).toString(),
      durationYears: Number(duration.toFixed(1)),
    });

    currentStartAge = endAge;
    currentStartYear = endYear;
  }

  // 7. Parasara House Classifications & Yogas
  const getHouseRasiIdx = (houseNum: number) => (lagnaRasiIdx + houseNum - 1) % 12;

  const buildHouseInfo = (h: number): ParasaraHouseInfo => {
    const rIdx = getHouseRasiIdx(h);
    const rInfo = TAMIL_RASIS[rIdx];
    const planetsInHouse = rasiChart[rIdx]
      .filter((p) => p.name !== 'Lagna')
      .map((p) => p.tamilName);
    return {
      house: h,
      rasiIndex: rIdx,
      rasiTamil: rInfo.tamil,
      lordTamil: rInfo.lord,
      planets: planetsInHouse,
    };
  };

  const kendras = [1, 4, 7, 10].map(buildHouseInfo);
  const trikonas = [1, 5, 9].map(buildHouseInfo);
  const upachayas = [3, 6, 10, 11].map(buildHouseInfo);
  const dusthanas = [6, 8, 12].map(buildHouseInfo);
  const marakas = [2, 7].map(buildHouseInfo);

  // Badhaka house: Movable -> 11, Fixed -> 9, Dual -> 7
  let badhakaHouseNum = 11;
  let badhakaType = 'சர ராசி (Movable) - 11-ஆம் பாவம் பாதக ஸ்தானம்';
  if ([1, 4, 7, 10].includes(lagnaRasiIdx)) {
    // Sthira (Fixed)
    badhakaHouseNum = 9;
    badhakaType = 'ஸ்திர ராசி (Fixed) - 9-ஆம் பாவம் பாதக ஸ்தானம்';
  } else if ([2, 5, 8, 11].includes(lagnaRasiIdx)) {
    // Dvisvabhava (Dual)
    badhakaHouseNum = 7;
    badhakaType = 'உபய ராசி (Dual) - 7-ஆம் பாவம் பாதக ஸ்தானம்';
  }
  const badhakaRasiIdx = getHouseRasiIdx(badhakaHouseNum);

  // Vargottama planets (occupying identical sign in Rasi and Navamsa)
  const vargottamaPlanets: { planetTamil: string; rasiTamil: string }[] = [];
  for (const p of calculatedPlanets) {
    if (p.rasiIndex === p.navamsaRasiIndex) {
      vargottamaPlanets.push({ planetTamil: p.tamilName, rasiTamil: p.rasiTamil });
    }
  }

  // Pancha Mahapurusha Yogas (Mars, Mercury, Jupiter, Venus, Saturn in Kendra and own/exaltation)
  const panchaMahapurushaYogas: {
    yogaName: string;
    planetTamil: string;
    rasiTamil: string;
    description: string;
  }[] = [];

  const kendraRasis = [1, 4, 7, 10].map(getHouseRasiIdx);

  // Mars -> Ruchaka Yoga (Mesham, Viruchigam, Makaram)
  const mars = calculatedPlanets.find((p) => p.name === 'Mars');
  if (mars && kendraRasis.includes(mars.rasiIndex) && [0, 7, 9].includes(mars.rasiIndex)) {
    panchaMahapurushaYogas.push({
      yogaName: 'ருசக யோகம் (Ruchaka Yoga - செவ்வாய் மகாபுருஷ யோகம்)',
      planetTamil: 'செவ்வாய்',
      rasiTamil: mars.rasiTamil,
      description: 'செவ்வாய் கேந்திரத்தில் ஆட்சி/உச்சம் பெற்று அமைந்ததால் சிறந்த தலைமைப் பண்பு, தைரியம், நிர்வாக அதிகாரம் மற்றும் நிலபுலன்கள் அமையும்.',
    });
  }

  // Jupiter -> Hamsa Yoga (Dhanusu, Meenam, Katakam)
  const jupiter = calculatedPlanets.find((p) => p.name === 'Jupiter');
  if (jupiter && kendraRasis.includes(jupiter.rasiIndex) && [8, 11, 3].includes(jupiter.rasiIndex)) {
    panchaMahapurushaYogas.push({
      yogaName: 'ஹம்ச யோகம் (Hamsa Yoga - குரு மகாபுருஷ யோகம்)',
      planetTamil: 'குரு',
      rasiTamil: jupiter.rasiTamil,
      description: 'குரு பகவான் கேந்திரத்தில் ஆட்சி/உச்சம் பெற்றதால் உயரிய தர்ம சிந்தனை, கல்வி ஞானம், மக்கள் செல்வாக்கு மற்றும் தெய்வ கடாட்சம் உண்டாகும்.',
    });
  }

  // Venus -> Malavya Yoga (Rishabam, Thulam, Meenam)
  const venus = calculatedPlanets.find((p) => p.name === 'Venus');
  if (venus && kendraRasis.includes(venus.rasiIndex) && [1, 6, 11].includes(venus.rasiIndex)) {
    panchaMahapurushaYogas.push({
      yogaName: 'மாளவ்ய யோகம் (Malavya Yoga - சுக்கிர மகாபுருஷ யோகம்)',
      planetTamil: 'சுக்கிரன்',
      rasiTamil: venus.rasiTamil,
      description: 'சுக்கிரன் கேந்திரத்தில் ஆட்சி/உச்சம் பெற்றதால் சகல போக பாக்கியங்கள், வாகன யோகம், கலை ஆர்வம் மற்றும் வசீகர ஆளுமை கிட்டும்.',
    });
  }

  // Saturn -> Sasa Yoga (Makaram, Kumbam, Thulam)
  const saturn = calculatedPlanets.find((p) => p.name === 'Saturn');
  if (saturn && kendraRasis.includes(saturn.rasiIndex) && [9, 10, 6].includes(saturn.rasiIndex)) {
    panchaMahapurushaYogas.push({
      yogaName: 'சச யோகம் (Sasa Yoga - சனி மகாபுருஷ யோகம்)',
      planetTamil: 'சனி',
      rasiTamil: saturn.rasiTamil,
      description: 'சனி பகவான் கேந்திரத்தில் ஆட்சி/உச்சம் பெற்றதால் நீண்ட ஆயுள், மக்கள் மத்தியில் தனிப்பெரும் நன்மதிப்பு மற்றும் உழைப்பால் உயரும் பாக்கியம் உண்டாகும்.',
    });
  }

  // Mercury -> Bhadra Yoga (Mithunam, Kanni)
  const mercury = calculatedPlanets.find((p) => p.name === 'Mercury');
  if (mercury && kendraRasis.includes(mercury.rasiIndex) && [2, 5].includes(mercury.rasiIndex)) {
    panchaMahapurushaYogas.push({
      yogaName: 'பத்ர யோகம் (Bhadra Yoga - புதன் மகாபுருஷ யோகம்)',
      planetTamil: 'புதன்',
      rasiTamil: mercury.rasiTamil,
      description: 'புதன் கேந்திரத்தில் ஆட்சி/உச்சம் பெற்று திகழ்வதால் கூரிய புத்தி கூர்மை, வாக்கு சாதுரியம், வணிக வெற்றி மற்றும் கல்வி மேன்மை அமையும்.',
    });
  }

  // Parasara Drishti (Special planetary aspects)
  const parasaraDrishti: { planetTamil: string; aspectedHouses: number[]; aspectedRasis: string[] }[] = [];
  for (const p of calculatedPlanets) {
    if (['Rahu', 'Ketu'].includes(p.name)) continue;
    const pHouseFromLagna = ((p.rasiIndex - lagnaRasiIdx + 12) % 12) + 1;
    const aspectHouses: number[] = [];

    // All planets aspect 7th
    aspectHouses.push(((pHouseFromLagna + 6 - 1) % 12) + 1);

    // Mars special 4, 8
    if (p.name === 'Mars') {
      aspectHouses.push(((pHouseFromLagna + 3 - 1) % 12) + 1);
      aspectHouses.push(((pHouseFromLagna + 7 - 1) % 12) + 1);
    }
    // Jupiter special 5, 9
    if (p.name === 'Jupiter') {
      aspectHouses.push(((pHouseFromLagna + 4 - 1) % 12) + 1);
      aspectHouses.push(((pHouseFromLagna + 8 - 1) % 12) + 1);
    }
    // Saturn special 3, 10
    if (p.name === 'Saturn') {
      aspectHouses.push(((pHouseFromLagna + 2 - 1) % 12) + 1);
      aspectHouses.push(((pHouseFromLagna + 9 - 1) % 12) + 1);
    }

    const uniqueHouses = Array.from(new Set(aspectHouses)).sort((a, b) => a - b);
    parasaraDrishti.push({
      planetTamil: p.tamilName,
      aspectedHouses: uniqueHouses,
      aspectedRasis: uniqueHouses.map((h) => TAMIL_RASIS[getHouseRasiIdx(h)].tamil),
    });
  }

  const parasara: ParasaraDetails = {
    method: 'Brihat Parasara Hora Sastra (BPHS)',
    kendras,
    trikonas,
    upachayas,
    dusthanas,
    marakas,
    badhaka: {
      house: badhakaHouseNum,
      rasiTamil: TAMIL_RASIS[badhakaRasiIdx].tamil,
      lordTamil: TAMIL_RASIS[badhakaRasiIdx].lord,
      typeTamil: badhakaType,
    },
    vargottamaPlanets,
    panchaMahapurushaYogas,
    parasaraDrishti,
  };

  // 8. KP Details (Sub-Lords, Cusps & Ruling Planets)
  const kpPlanets: KpPlanetInfo[] = calculatedPlanets.map((p) => {
    const { starLord, subLord } = getKpSubLord(p.longitude);
    return {
      planetTamil: p.tamilName,
      signLordTamil: p.signLordTamil,
      starLordTamil: starLord,
      subLordTamil: subLord,
      degreeStr: `${p.rasiTamil} ${p.degMinStr}`,
    };
  });

  const kpCusps: KpCuspInfo[] = [];
  for (let h = 1; h <= 12; h++) {
    const rIdx = getHouseRasiIdx(h);
    const cuspLong = normalizeDeg(lagnaSidLong + (h - 1) * 30);
    const { starLord, subLord } = getKpSubLord(cuspLong);
    kpCusps.push({
      cuspNumber: h,
      rasiTamil: TAMIL_RASIS[rIdx].tamil,
      signLord: TAMIL_RASIS[rIdx].lord,
      starLord,
      subLord,
    });
  }

  const { starLord: moonStarLord } = getKpSubLord(moonPos.longitude);
  const { starLord: lagnaStarLord } = getKpSubLord(lagnaSidLong);

  const kpRulingPlanets: KpRulingPlanets = {
    dayLord: dayTamil,
    moonSignLord: moonPos.signLordTamil,
    moonStarLord,
    lagnaSignLord: lagnaPosition.signLordTamil,
    lagnaStarLord,
  };

  const kp: KpDetails = {
    method: 'Krishnamurti Paddhati (KP System)',
    planets: kpPlanets,
    cusps: kpCusps,
    rulingPlanets: kpRulingPlanets,
    keyRuleTamil: 'கிரகம் காரகன், நட்சத்திர நாதன் பலன் தருபவர், உப நாதன் (Sub-Lord) காரிய சித்தியைத் தீர்மானிப்பவர்.',
  };

  // 9. Jaimini Details (7 Chara Karakas, Karakamsha, Upapada & Rasi Drishti)
  const nonNodePlanets = calculatedPlanets.filter((p) => p.name !== 'Rahu' && p.name !== 'Ketu');
  const sortedByDegree = [...nonNodePlanets].sort((a, b) => b.degreeInRasi - a.degreeInRasi);

  const KARAKA_ROLES: {
    code: JaiminiKarakaInfo['karakaCode'];
    nameTamil: string;
    significance: string;
  }[] = [
    { code: 'AK', nameTamil: 'ஆத்மகாரகன் (Atmakaraka)', significance: 'ஆன்மாவின் உயரிய நோக்கம், விருப்பம் மற்றும் தலைமை' },
    { code: 'AmK', nameTamil: 'அமாத்யகாரகன் (Amatyakaraka)', significance: 'தொழில், புத்தி கூர்மை, பதவி மற்றும் நிர்வாக மேன்மை' },
    { code: 'BK', nameTamil: 'பிராத்ருகாரகன் (Bhratrukaraka)', significance: 'உடன்பிறந்தோரின் ஆதரவு, தைரியம் மற்றும் குருவருள்' },
    { code: 'MK', nameTamil: 'மாத்ருகாரகன் (Matrukaraka)', significance: 'தாயன்பு, கல்வி, சுகபோகம் மற்றும் வாகன யோகம்' },
    { code: 'PK', nameTamil: 'பித்ருகாரகன் (Pitrukaraka)', significance: 'தந்தை, பூர்வபுண்ணியம் மற்றும் தர்ம சிந்தனை' },
    { code: 'GK', nameTamil: 'ஞானிகாரகன் (Jnatikaraka)', significance: 'நோய் எதிர்ப்பு ஆற்றல், தடைகளை வெல்லும் சாமர்த்தியம்' },
    { code: 'DK', nameTamil: 'தாரகாரகன் (Darakaraka)', significance: 'வாழ்க்கைத்துணை, குடும்ப அமைதி மற்றும் கூட்டாண்மை' },
  ];

  const charaKarakas: JaiminiKarakaInfo[] = sortedByDegree.slice(0, 7).map((p, idx) => ({
    karakaNameTamil: KARAKA_ROLES[idx].nameTamil,
    karakaCode: KARAKA_ROLES[idx].code,
    planetTamil: p.tamilName,
    degreeInRasi: p.degreeInRasi,
    significanceTamil: KARAKA_ROLES[idx].significance,
  }));

  // Karakamsha (Navamsha sign of Atmakaraka)
  const atmakaraka = sortedByDegree[0];
  const karakamshaRasi = atmakaraka ? atmakaraka.navamsaRasiTamil : 'மேஷம்';

  // Upapada Lagna (Arudha of 12th house: A12)
  const house12RasiIdx = getHouseRasiIdx(12);
  const house12Lord = TAMIL_RASIS[house12RasiIdx].lord;
  const house12LordPlanet = calculatedPlanets.find((p) => p.tamilName === house12Lord);
  let upapadaRasiIdx = house12RasiIdx;
  if (house12LordPlanet) {
    const dist = (house12LordPlanet.rasiIndex - house12RasiIdx + 12) % 12;
    upapadaRasiIdx = (house12LordPlanet.rasiIndex + dist) % 12;
  }
  const upapadaLagnaRasi = TAMIL_RASIS[upapadaRasiIdx].tamil;

  // Jaimini Rasi Drishti:
  // Chara (0,3,6,9) aspect Sthira (1,4,7,10) except adjacent
  // Sthira aspect Chara except adjacent
  // Ubhaya (2,5,8,11) aspect each other
  const rasiDrishtiSummary = TAMIL_RASIS.map((r, rIdx) => {
    const aspected: string[] = [];
    if ([0, 3, 6, 9].includes(rIdx)) {
      // Chara
      [1, 4, 7, 10].forEach((target) => {
        if (target !== (rIdx + 1) % 12) aspected.push(TAMIL_RASIS[target].tamil);
      });
    } else if ([1, 4, 7, 10].includes(rIdx)) {
      // Sthira
      [0, 3, 6, 9].forEach((target) => {
        if (target !== (rIdx + 11) % 12) aspected.push(TAMIL_RASIS[target].tamil);
      });
    } else {
      // Ubhaya
      [2, 5, 8, 11].forEach((target) => {
        if (target !== rIdx) aspected.push(TAMIL_RASIS[target].tamil);
      });
    }
    return { rasiTamil: r.tamil, aspectedRasisTamil: aspected };
  });

  const jaimini: JaiminiDetails = {
    method: 'Jaimini Astrology Sutras',
    charaKarakas,
    karakamshaRasi,
    upapadaLagnaRasi,
    rasiDrishtiSummary,
    charaDasaOrder: TAMIL_RASIS.map((r) => r.tamil),
  };

  return {
    rasiChart,
    navamsaChart,
    lagna: lagnaPosition,
    moon: moonPos,
    sun: sunPos,
    planets: calculatedPlanets,
    nakshatra: {
      index: moonPos.nakshatraIndex,
      tamil: moonPos.nakshatraTamil,
      english: moonPos.nakshatraName,
      lordTamil: moonPos.starLordTamil,
      pada: moonPos.pada,
    },
    rasi: {
      index: moonPos.rasiIndex,
      tamil: moonPos.rasiTamil,
      english: moonPos.rasiName,
      lordTamil: moonPos.signLordTamil,
    },
    lagnaRasi: {
      index: lagnaPosition.rasiIndex,
      tamil: lagnaPosition.rasiTamil,
      english: lagnaPosition.rasiName,
      lordTamil: lagnaPosition.signLordTamil,
    },
    dasaBalance,
    dasaTimeline,
    panchangam: {
      tithiTamil,
      tithiPaksha,
      tithiNumber,
      yogamTamil,
      karanamTamil,
      dayTamil,
      ayanamsamValue: Number(ayanamsha.toFixed(4)),
      ayanamsamStr: formatAyanamsha(ayanamsha),
    },
    parasara,
    kp,
    jaimini,
  };
}
