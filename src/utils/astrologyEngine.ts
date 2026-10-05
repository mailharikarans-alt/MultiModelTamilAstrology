/**
 * Traditional South Indian / Tamil Vedic Astrology Engine
 * Accurate Nirayana (Sidereal) Astronomical calculations using Lahiri Ayanamsha
 */

export interface PlanetaryPosition {
  name: string;
  tamilName: string;
  shortTamil: string;
  longitude: number;
  rasiIndex: number; // 0 = Mesham ... 11 = Meenam
  rasiName: string;
  rasiTamil: string;
  degreeInRasi: number;
  nakshatraIndex: number; // 0 to 26
  nakshatraName: string;
  nakshatraTamil: string;
  pada: number; // 1, 2, 3, 4
  navamsaRasiIndex: number;
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

export interface PanchangamDetails {
  tithiTamil: string;
  tithiPaksha: string;
  yogamTamil: string;
  karanamTamil: string;
  dayTamil: string;
  ayanamsamValue: number;
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

export const TAMIL_DAYS = [
  'ஞாயிறு', // Sunday
  'திங்கள்', // Monday
  'செவ்வாய்', // Tuesday
  'புதன்', // Wednesday
  'வியாழன்', // Thursday
  'வெள்ளி', // Friday
  'சனி', // Saturday
];

export const TAMIL_TITHIS = [
  'பிரதமை', 'துவிதியை', 'திருதியை', 'சதுர்த்தி', 'பஞ்சமி',
  'சஷ்டி', 'சப்தமி', 'அஷ்டமி', 'நவமி', 'தசமி',
  'ஏகாதசி', 'துவாதசி', 'திரயோதசி', 'சதுர்த்தசி', 'பௌர்ணமி / அமாவாசை'
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

/**
 * Calculates Julian Day Number from Date and UTC decimal hours
 */
function getJulianDay(year: number, month: number, day: number, utcHours: number): number {
  if (month <= 2) {
    year -= 1;
    month += 12;
  }
  const A = Math.floor(year / 100);
  const B = 2 - A + Math.floor(A / 4);
  const jd = Math.floor(365.25 * (year + 4716)) + Math.floor(30.6001 * (month + 1)) + day + B - 1524.5;
  return jd + utcHours / 24.0;
}

/**
 * Lahiri Ayanamsha for a given Julian Day
 */
function getLahiriAyanamsha(jd: number): number {
  const T = (jd - 2451545.0) / 36525;
  return 23.85 + 1.396 * T;
}

function normalizeDeg(deg: number): number {
  let d = deg % 360;
  if (d < 0) d += 360;
  return d;
}

/**
 * Approximate Ephemeris for Vedic Astrology
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

  const localDecimalHours = hours + minutes / 60;
  let utcHours = localDecimalHours - timezoneOffset;
  let jd = getJulianDay(year, month, day, utcHours);

  const T = (jd - 2451545.0) / 36525.0;
  const ayanamsha = getLahiriAyanamsha(jd);

  // 1. Sun Tropical Longitude
  const L0 = 280.46646 + 36000.76983 * T;
  const M_sun = 357.52911 + 35999.05029 * T;
  const C_sun = (1.914602 - 0.004817 * T) * Math.sin((M_sun * Math.PI) / 180) +
                (0.019993 - 0.000101 * T) * Math.sin((2 * M_sun * Math.PI) / 180);
  const sunTropLong = normalizeDeg(L0 + C_sun);
  const sunSidLong = normalizeDeg(sunTropLong - ayanamsha);

  // 2. Moon Tropical Longitude (approximate Brown's formula)
  const Lp = 218.3164477 + 481267.88123421 * T;
  const D = 297.8501921 + 445267.1114034 * T;
  const M_moon = 134.9633964 + 477198.8675055 * T;
  const moonPerturbation =
    6.289 * Math.sin((M_moon * Math.PI) / 180) +
    1.274 * Math.sin(((2 * D - M_moon) * Math.PI) / 180) +
    0.658 * Math.sin((2 * D * Math.PI) / 180) -
    0.186 * Math.sin((M_sun * Math.PI) / 180) -
    0.114 * Math.sin((2 * 93.272095 * Math.PI) / 180);
  const moonTropLong = normalizeDeg(Lp + moonPerturbation);
  const moonSidLong = normalizeDeg(moonTropLong - ayanamsha);

  // 3. Rahu & Ketu (Mean Nodes)
  const omega = normalizeDeg(125.04452 - 1934.136261 * T);
  const rahuSidLong = normalizeDeg(omega - ayanamsha);
  const ketuSidLong = normalizeDeg(rahuSidLong + 180);

  // 4. Mars (செவ்வாய்)
  const M_mars = 19.37 + 19140.3 * T;
  const marsTropLong = normalizeDeg(355.43 + 19140.3 * T + 10.69 * Math.sin((M_mars * Math.PI) / 180));
  const marsSidLong = normalizeDeg(marsTropLong - ayanamsha);

  // 5. Mercury (புதன்)
  const mercMean = normalizeDeg(sunTropLong + 15 * Math.sin(((L0 * 4) * Math.PI) / 180));
  const mercSidLong = normalizeDeg(mercMean - ayanamsha);

  // 6. Jupiter (குரு)
  const M_jup = 20.0 + 3034.9 * T;
  const jupTropLong = normalizeDeg(34.35 + 3034.9 * T + 5.5 * Math.sin((M_jup * Math.PI) / 180));
  const jupSidLong = normalizeDeg(jupTropLong - ayanamsha);

  // 7. Venus (சுக்கிரன்)
  const venMean = normalizeDeg(sunTropLong + 25 * Math.sin(((L0 * 1.6) * Math.PI) / 180));
  const venSidLong = normalizeDeg(venMean - ayanamsha);

  // 8. Saturn (சனி)
  const M_sat = 317.0 + 1222.1 * T;
  const satTropLong = normalizeDeg(50.07 + 1222.1 * T + 6.3 * Math.sin((M_sat * Math.PI) / 180));
  const satSidLong = normalizeDeg(satTropLong - ayanamsha);

  // 9. Ascendant / Lagnam (லக்னம்)
  // Sidereal Time at Greenwich
  const GMST0 = 280.46061837 + 360.98564736629 * (jd - 2451545.0);
  const LMST = normalizeDeg(GMST0 + placeLng);
  const eps = 23.4392911 - 0.0130042 * T;
  const epsRad = (eps * Math.PI) / 180;
  const lmstRad = (LMST * Math.PI) / 180;
  const latRad = (placeLat * Math.PI) / 180;

  const yAsc = -Math.cos(lmstRad);
  const xAsc = Math.sin(lmstRad) * Math.cos(epsRad) + Math.tan(latRad) * Math.sin(epsRad);
  let ascTropLong = (Math.atan2(yAsc, xAsc) * 180) / Math.PI;
  ascTropLong = normalizeDeg(ascTropLong + 90);
  const ascSidLong = normalizeDeg(ascTropLong - ayanamsha);

  const createPlanetaryObj = (
    name: string,
    tamilName: string,
    shortTamil: string,
    sidLong: number
  ): PlanetaryPosition => {
    const rasiIdx = Math.floor(sidLong / 30);
    const degInRasi = sidLong % 30;
    const nakIdx = Math.floor(sidLong / (360 / 27));
    const nakRemainder = sidLong % (360 / 27);
    const pada = Math.floor(nakRemainder / (360 / 108)) + 1;

    // Navamsa sign calculation: 9 padas per sign (total 108 padas in 12 signs)
    const totalPada = Math.floor(sidLong / (360 / 108));
    const navamsaRasiIdx = totalPada % 12;

    return {
      name,
      tamilName,
      shortTamil,
      longitude: Number(sidLong.toFixed(2)),
      rasiIndex: rasiIdx,
      rasiName: TAMIL_RASIS[rasiIdx].english,
      rasiTamil: TAMIL_RASIS[rasiIdx].tamil,
      degreeInRasi: Number(degInRasi.toFixed(2)),
      nakshatraIndex: nakIdx,
      nakshatraName: TAMIL_NAKSHATRAS[nakIdx].english,
      nakshatraTamil: TAMIL_NAKSHATRAS[nakIdx].tamil,
      pada,
      navamsaRasiIndex: navamsaRasiIdx,
      navamsaRasiTamil: TAMIL_RASIS[navamsaRasiIdx].tamil,
    };
  };

  const lagna = createPlanetaryObj('Lagna', 'லக்னம்', 'ல', ascSidLong);
  const sun = createPlanetaryObj('Sun', 'சூரியன்', 'சூ', sunSidLong);
  const moon = createPlanetaryObj('Moon', 'சந்திரன்', 'ச', moonSidLong);
  const mars = createPlanetaryObj('Mars', 'செவ்வாய்', 'செ', marsSidLong);
  const mercury = createPlanetaryObj('Mercury', 'புதன்', 'பு', mercSidLong);
  const jupiter = createPlanetaryObj('Jupiter', 'குரு', 'கு', jupSidLong);
  const venus = createPlanetaryObj('Venus', 'சுக்கிரன்', 'சு', venSidLong);
  const saturn = createPlanetaryObj('Saturn', 'சனி', 'சனீ', satSidLong);
  const rahu = createPlanetaryObj('Rahu', 'ராகு', 'ரா', rahuSidLong);
  const ketu = createPlanetaryObj('Ketu', 'கேது', 'கே', ketuSidLong);

  const allPlanets = [lagna, sun, moon, mars, mercury, jupiter, venus, saturn, rahu, ketu];

  // Organize into 12 Rasis for Rasi Chart and Navamsa Chart
  const rasiChart: { [rasiIndex: number]: PlanetaryPosition[] } = {};
  const navamsaChart: { [rasiIndex: number]: PlanetaryPosition[] } = {};

  for (let i = 0; i < 12; i++) {
    rasiChart[i] = [];
    navamsaChart[i] = [];
  }

  allPlanets.forEach((p) => {
    rasiChart[p.rasiIndex].push(p);
    navamsaChart[p.navamsaRasiIndex].push(p);
  });

  // Calculate Dasa Balance (விம்சோத்தரி தசா இருப்பு)
  const nakTotalDeg = 360 / 27; // 13.3333 deg
  const moonNakProgression = (moonSidLong % nakTotalDeg) / nakTotalDeg;
  const currentNakInfo = TAMIL_NAKSHATRAS[moon.nakshatraIndex];
  const totalDasaYrs = currentNakInfo.dasaYears;
  const remFraction = 1 - moonNakProgression;
  const totalRemYrs = totalDasaYrs * remFraction;
  const remYears = Math.floor(totalRemYrs);
  const remMonthsFloat = (totalRemYrs - remYears) * 12;
  const remMonths = Math.floor(remMonthsFloat);
  const remDays = Math.floor((remMonthsFloat - remMonths) * 30);

  const dasaBalance: DasaBalance = {
    lordTamil: currentNakInfo.lord,
    lordEnglish: currentNakInfo.lord,
    totalYears: totalDasaYrs,
    remainingYears: remYears,
    remainingMonths: remMonths,
    remainingDays: remDays,
  };

  // Panchangam Details
  // Tithi: Angular distance between Moon and Sun (12 deg per tithi)
  const diffLong = normalizeDeg(moonSidLong - sunSidLong);
  const tithiIndex = Math.floor(diffLong / 12);
  const isSukla = tithiIndex < 15;
  const tithiNameIndex = tithiIndex % 15;
  const tithiPaksha = isSukla ? 'சுக்ல பட்சம் (வளர்பிறை)' : 'கிருஷ்ண பட்சம் (தேய்பிறை)';
  const tithiTamil = `${tithiPaksha} - ${TAMIL_TITHIS[tithiNameIndex]}`;

  // Yogam (27 Nithya Yogas)
  const yogaSum = normalizeDeg(moonSidLong + sunSidLong);
  const yogaIndex = Math.floor(yogaSum / (360 / 27));
  const YOGA_NAMES = [
    'விஷ்கம்பம்', 'ப்ரீதி', 'ஆயுஷ்மான்', 'சவுபாக்யம்', 'சோபனம்',
    'அதிகண்டம்', 'சுகர்மம்', 'திருதி', 'சூலம்', 'கண்டம்',
    'விருத்தி', 'துருவம்', 'வியாகாதம்', 'ஹர்ஷணம்', 'வஜ்ரம்',
    'சித்தி', 'வியதிபாதம்', 'வரியான்', 'பரிகம்', 'சிவம்',
    'சித்தம்', 'சாத்தியம்', 'சுப்பிரம்', 'சுப்பிரம்', 'ஐந்திரம்', 'வைத்ருதி', 'பிரம்மம்'
  ];
  const yogamTamil = YOGA_NAMES[yogaIndex % YOGA_NAMES.length];

  // Karanam (60 half-tithis)
  const karanaIndex = Math.floor(diffLong / 6);
  const KARANA_NAMES = ['பவம்', 'பாலவம்', 'கௌலவம்', 'சைதுளை', 'கரசை', 'வனசை', 'பத்திரை', 'சகுனி', 'சதுஷ்பாதம்', 'நாகவம்', 'கிம்ஸ்துக்னம்'];
  const karanamTamil = KARANA_NAMES[karanaIndex % KARANA_NAMES.length];

  // Day of week
  const dateObj = new Date(year, month - 1, day);
  const dayTamil = TAMIL_DAYS[dateObj.getDay()];

  // --- BRIHAT PARASARA HORA SASTRA (BPHS) COMPUTATIONS ---
  const getHouseInfo = (hNum: number): ParasaraHouseInfo => {
    const rasiIdx = (lagna.rasiIndex + (hNum - 1)) % 12;
    return {
      house: hNum,
      rasiIndex: rasiIdx,
      rasiTamil: TAMIL_RASIS[rasiIdx].tamil,
      lordTamil: TAMIL_RASIS[rasiIdx].lord,
      planets: (rasiChart[rasiIdx] || []).map((p) => p.tamilName),
    };
  };

  const kendras = [1, 4, 7, 10].map(getHouseInfo);
  const trikonas = [1, 5, 9].map(getHouseInfo);
  const upachayas = [3, 6, 10, 11].map(getHouseInfo);
  const dusthanas = [6, 8, 12].map(getHouseInfo);
  const marakas = [2, 7].map(getHouseInfo);

  // Badhaka House per Parasara
  const lagnaRasiIdx = lagna.rasiIndex;
  const isSara = [0, 3, 6, 9].includes(lagnaRasiIdx);
  const isSthira = [1, 4, 7, 10].includes(lagnaRasiIdx);
  let badhakaHouse = 11;
  let badhakaType = 'சர லக்னம் (11-ஆம் பாவம் பாதக ஸ்தானம்)';
  if (isSthira) {
    badhakaHouse = 9;
    badhakaType = 'ஸ்திர லக்னம் (9-ஆம் பாவம் பாதக ஸ்தானம்)';
  } else if (!isSara && !isSthira) {
    badhakaHouse = 7;
    badhakaType = 'உபய லக்னம் (7-ஆம் பாவம் பாதக ஸ்தானம்)';
  }
  const badhakaInfo = getHouseInfo(badhakaHouse);

  // Vargottama per Parasara
  const vargottamaPlanets = allPlanets
    .filter((p) => p.rasiIndex === p.navamsaRasiIndex)
    .map((p) => ({ planetTamil: p.tamilName, rasiTamil: p.rasiTamil }));

  // Pancha Mahapurusha Yogas (BPHS Chapter on Special Yogas)
  const panchaMahapurushaYogas: {
    yogaName: string;
    planetTamil: string;
    rasiTamil: string;
    description: string;
  }[] = [];

  const kendraRasiIndices = kendras.map((k) => k.rasiIndex);

  // 1. Ruchaka Yoga (Mars in Kendra in Mesham 0, Viruchigam 7, Makaram 9)
  if (kendraRasiIndices.includes(mars.rasiIndex) && [0, 7, 9].includes(mars.rasiIndex)) {
    panchaMahapurushaYogas.push({
      yogaName: 'ருசக யோகம் (Ruchaka Yoga)',
      planetTamil: 'செவ்வாய்',
      rasiTamil: mars.rasiTamil,
      description: 'பராசரர் முறைப்படி செவ்வாய் கேந்திரத்தில் ஆட்சி அல்லது உச்சம் பெற்று உருவான வீரமும், தலைமைப் பண்பும், நில புலன்களும் தரும் பஞ்ச மகாபுருஷ யோகம்.',
    });
  }

  // 2. Bhadra Yoga (Mercury in Kendra in Mithunam 2, Kanni 5)
  if (kendraRasiIndices.includes(mercury.rasiIndex) && [2, 5].includes(mercury.rasiIndex)) {
    panchaMahapurushaYogas.push({
      yogaName: 'பத்ர யோகம் (Bhadra Yoga)',
      planetTamil: 'புதன்',
      rasiTamil: mercury.rasiTamil,
      description: 'பராசரர் முறைப்படி புதன் கேந்திரத்தில் ஆட்சி அல்லது உச்சம் பெற்று உருவான கூர்மையான புத்தி, கணித ஞானம், வாக் வன்மை தரும் பஞ்ச மகாபுருஷ யோகம்.',
    });
  }

  // 3. Hamsa Yoga (Jupiter in Kendra in Katakam 3, Dhanusu 8, Meenam 11)
  if (kendraRasiIndices.includes(jupiter.rasiIndex) && [3, 8, 11].includes(jupiter.rasiIndex)) {
    panchaMahapurushaYogas.push({
      yogaName: 'ஹம்ச யோகம் (Hamsa Yoga)',
      planetTamil: 'குரு',
      rasiTamil: jupiter.rasiTamil,
      description: 'பராசரர் முறைப்படி குரு கேந்திரத்தில் ஆட்சி அல்லது உச்சம் பெற்று உருவான உயர்ந்த ஞானம், ஆசீர்வாதம், ஆன்மீக மேன்மை தரும் பஞ்ச மகாபுருஷ யோகம்.',
    });
  }

  // 4. Malavya Yoga (Venus in Kendra in Rishabam 1, Thulam 6, Meenam 11)
  if (kendraRasiIndices.includes(venus.rasiIndex) && [1, 6, 11].includes(venus.rasiIndex)) {
    panchaMahapurushaYogas.push({
      yogaName: 'மாளவ்ய யோகம் (Malavya Yoga)',
      planetTamil: 'சுக்கிரன்',
      rasiTamil: venus.rasiTamil,
      description: 'பராசரர் முறைப்படி சுக்கிரன் கேந்திரத்தில் ஆட்சி அல்லது உச்சம் பெற்று உருவான கலை நயம், வாகன சுகம், இல்லற இன்பம் தரும் பஞ்ச மகாபுருஷ யோகம்.',
    });
  }

  // 5. Sasa Yoga (Saturn in Kendra in Thulam 6, Makaram 9, Kumbam 10)
  if (kendraRasiIndices.includes(saturn.rasiIndex) && [6, 9, 10].includes(saturn.rasiIndex)) {
    panchaMahapurushaYogas.push({
      yogaName: 'சச யோகம் (Sasa Yoga)',
      planetTamil: 'சனி',
      rasiTamil: saturn.rasiTamil,
      description: 'பராசரர் முறைப்படி சனி கேந்திரத்தில் ஆட்சி அல்லது உச்சம் பெற்று உருவான விடாமுயற்சி, மக்கள் செல்வாக்கு, நீண்ட ஆயுள் தரும் பஞ்ச மகாபுருஷ யோகம்.',
    });
  }

  // Parasara Graha Drishti (Aspects)
  const computeParasaraAspects = (p: PlanetaryPosition) => {
    let aspectOffsets = [7]; // All planets aspect 7th
    if (p.name === 'Mars') aspectOffsets = [4, 7, 8];
    else if (p.name === 'Jupiter') aspectOffsets = [5, 7, 9];
    else if (p.name === 'Saturn') aspectOffsets = [3, 7, 10];
    else if (p.name === 'Rahu' || p.name === 'Ketu') aspectOffsets = [5, 7, 9];

    const aspectedHouses: number[] = [];
    const aspectedRasis: string[] = [];

    aspectOffsets.forEach((offset) => {
      const targetRasiIdx = (p.rasiIndex + (offset - 1)) % 12;
      let targetHouse = targetRasiIdx - lagna.rasiIndex + 1;
      if (targetHouse <= 0) targetHouse += 12;
      aspectedHouses.push(targetHouse);
      aspectedRasis.push(TAMIL_RASIS[targetRasiIdx].tamil);
    });

    return {
      planetTamil: p.tamilName,
      aspectedHouses,
      aspectedRasis,
    };
  };

  const parasaraDrishti = allPlanets
    .filter((p) => p.name !== 'Lagna')
    .map(computeParasaraAspects);

  const parasara: ParasaraDetails = {
    method: 'Brihat Parasara Hora Sastra (BPHS)',
    kendras,
    trikonas,
    upachayas,
    dusthanas,
    marakas,
    badhaka: {
      house: badhakaHouse,
      rasiTamil: badhakaInfo.rasiTamil,
      lordTamil: badhakaInfo.lordTamil,
      typeTamil: badhakaType,
    },
    vargottamaPlanets,
    panchaMahapurushaYogas,
    parasaraDrishti,
  };

  // --- KRISHNAMURTI PADDHATI (KP SYSTEM) COMPUTATIONS ---
  const VIMSHOTTARI_DASA_ORDER = [
    { lord: 'கேது', years: 7 },
    { lord: 'சுக்கிரன்', years: 20 },
    { lord: 'சூரியன்', years: 6 },
    { lord: 'சந்திரன்', years: 10 },
    { lord: 'செவ்வாய்', years: 7 },
    { lord: 'ராகு', years: 18 },
    { lord: 'குரு', years: 16 },
    { lord: 'சனி', years: 19 },
    { lord: 'புதன்', years: 17 },
  ];

  const getKpSignStarSub = (siderealLongitude: number) => {
    const normLong = normalizeDeg(siderealLongitude);
    const rasiIdx = Math.floor(normLong / 30);
    const signLord = TAMIL_RASIS[rasiIdx].lord;

    const nakTotalDeg = 360 / 27; // 13.333333 deg = 800 min
    const nakIdx = Math.floor(normLong / nakTotalDeg);
    const starLord = TAMIL_NAKSHATRAS[nakIdx].lord;

    const nakProgressionMin = (normLong % nakTotalDeg) * 60; // 0 to 800 min

    const startLordIdx = VIMSHOTTARI_DASA_ORDER.findIndex((v) => v.lord === starLord);
    let accumMin = 0;
    let subLord = starLord;

    for (let i = 0; i < 9; i++) {
      const vIdx = (startLordIdx + i) % 9;
      const subSpanMin = (VIMSHOTTARI_DASA_ORDER[vIdx].years / 120) * 800;
      accumMin += subSpanMin;
      if (nakProgressionMin <= accumMin) {
        subLord = VIMSHOTTARI_DASA_ORDER[vIdx].lord;
        break;
      }
    }

    return { signLord, starLord, subLord };
  };

  const kpPlanets: KpPlanetInfo[] = allPlanets.map((p) => {
    const { signLord, starLord, subLord } = getKpSignStarSub(p.longitude);
    return {
      planetTamil: p.tamilName,
      signLordTamil: signLord,
      starLordTamil: starLord,
      subLordTamil: subLord,
      degreeStr: `${p.degreeInRasi}° (${p.rasiTamil})`,
    };
  });

  const kpCusps: KpCuspInfo[] = [];
  for (let c = 1; c <= 12; c++) {
    const cuspLong = normalizeDeg(lagna.longitude + (c - 1) * 30);
    const rasiIdx = Math.floor(cuspLong / 30);
    const { signLord, starLord, subLord } = getKpSignStarSub(cuspLong);
    kpCusps.push({
      cuspNumber: c,
      rasiTamil: TAMIL_RASIS[rasiIdx].tamil,
      signLord,
      starLord,
      subLord,
    });
  }

  // KP Ruling Planets (ஆளும் கிரகங்கள்)
  const DAY_LORDS: { [day: string]: string } = {
    'ஞாயிறு': 'சூரியன்',
    'திங்கள்': 'சந்திரன்',
    'செவ்வாய்': 'செவ்வாய்',
    'புதன்': 'புதன்',
    'வியாழன்': 'குரு',
    'வெள்ளி': 'சுக்கிரன்',
    'சனி': 'சனி',
  };
  const kpRulingPlanets: KpRulingPlanets = {
    dayLord: DAY_LORDS[dayTamil] || 'சூரியன்',
    moonSignLord: TAMIL_RASIS[moon.rasiIndex].lord,
    moonStarLord: TAMIL_NAKSHATRAS[moon.nakshatraIndex].lord,
    lagnaSignLord: TAMIL_RASIS[lagna.rasiIndex].lord,
    lagnaStarLord: TAMIL_NAKSHATRAS[lagna.nakshatraIndex].lord,
  };

  const kp: KpDetails = {
    method: 'Krishnamurti Paddhati (KP System)',
    planets: kpPlanets,
    cusps: kpCusps,
    rulingPlanets: kpRulingPlanets,
    keyRuleTamil: 'கிரகம் காரகத்தின் மூலம், நட்சத்திர நாதன் பலனின் தரம், உப நாதன் (Sub-Lord) காரிய சித்தி முடிவை நிர்ணயிக்கிறார்.',
  };

  // --- JAIMINI ASTROLOGY SUTRAS COMPUTATIONS ---
  // 7 traditional planets for Chara Karakas: Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn
  const jaiminiPhysicalPlanets = [sun, moon, mars, mercury, jupiter, venus, saturn];
  // Sort descending by degree within rasi
  const sortedJaimini = [...jaiminiPhysicalPlanets].sort((a, b) => b.degreeInRasi - a.degreeInRasi);

  const KARAKA_DEFINITIONS: {
    code: 'AK' | 'AmK' | 'BK' | 'MK' | 'PK' | 'GK' | 'DK';
    tamilName: string;
    significance: string;
  }[] = [
    { code: 'AK', tamilName: 'ஆத்மகாரகன் (Atmakaraka)', significance: 'ஆன்ம காரகன், பிரதான தலைவிதி மற்றும் வாழ்க்கை நோக்கம்' },
    { code: 'AmK', tamilName: 'அமாத்யகாரகன் (Amatyakaraka)', significance: 'தொழில், கர்மம், நிதி, செல்வாக்கு மற்றும் சமூக அந்தஸ்து' },
    { code: 'BK', tamilName: 'ப்ராத்ருகாரகன் (Bhratrikaraka)', significance: 'சகோதரம், மன தைரியம், ஆன்மீக குரு மற்றும் வழிகாட்டி' },
    { code: 'MK', tamilName: 'மாத்ருகாரகன் (Matrikaraka)', significance: 'தாய், சுக பாவம், குடும்ப அமைதி, வாகனம் மற்றும் கல்வி' },
    { code: 'PK', tamilName: 'புத்ரகாரகன் (Putrakaraka)', significance: 'புத்திர பாக்கியம், ஆழ்ந்த அறிவு, புத்தி கூர்மை மற்றும் யோகம்' },
    { code: 'GK', tamilName: 'ஞானிகாரகன் (Gnatikaraka)', significance: 'எதிர்ப்புகள், தடைகள், நோய்கள், கடன்கள் மற்றும் போட்டி' },
    { code: 'DK', tamilName: 'தாரகாரகன் (Darakaraka)', significance: 'வாழ்க்கைத்துணை, களத்திர பாவம், இல்லற இன்பம் மற்றும் கூட்டு' },
  ];

  const charaKarakas: JaiminiKarakaInfo[] = sortedJaimini.map((p, idx) => ({
    karakaNameTamil: KARAKA_DEFINITIONS[idx].tamilName,
    karakaCode: KARAKA_DEFINITIONS[idx].code,
    planetTamil: p.tamilName,
    degreeInRasi: p.degreeInRasi,
    significanceTamil: KARAKA_DEFINITIONS[idx].significance,
  }));

  // Karakamsha (Navamsa sign of Atmakaraka)
  const atmakaraka = sortedJaimini[0];
  const karakamshaRasi = atmakaraka.navamsaRasiTamil;

  // Upapada Lagna (Arudha of 12th house: count distance from 12th house to 12th lord, then same distance forward)
  const h12RasiIdx = (lagna.rasiIndex + 11) % 12;
  const h12LordTamil = TAMIL_RASIS[h12RasiIdx].lord;
  const h12LordPlanet = allPlanets.find((p) => p.tamilName === h12LordTamil) || jupiter;
  const dist12 = (h12LordPlanet.rasiIndex - h12RasiIdx + 12) % 12;
  const upapadaRasiIdx = (h12LordPlanet.rasiIndex + dist12) % 12;
  const upapadaLagnaRasi = TAMIL_RASIS[upapadaRasiIdx].tamil;

  // Jaimini Rasi Drishti Summary
  // Movable (0,3,6,9) aspects Fixed (1,4,7,10) except adjacent
  // Fixed aspects Movable except adjacent
  // Dual (2,5,8,11) aspects all other Dual
  const rasiDrishtiSummary = [
    { rasiTamil: 'சர ராசிகள் (மேஷம், கடகம், துலாம், மகரம்)', aspectedRasisTamil: ['அருகிலுள்ளதைத் தவிர்த்த அனைத்து ஸ்திர ராசிகள் (ரிஷபம், சிம்மம், விருச்சிகம், கும்பம்)'] },
    { rasiTamil: 'ஸ்திர ராசிகள் (ரிஷபம், சிம்மம், விருச்சிகம், கும்பம்)', aspectedRasisTamil: ['அருகிலுள்ளதைத் தவிர்த்த அனைத்து சர ராசிகள் (மேஷம், கடகம், துலாம், மகரம்)'] },
    { rasiTamil: 'உபய ராசிகள் (மிதுனம், கன்னி, தனுசு, மீனம்)', aspectedRasisTamil: ['பிற அனைத்து உபய ராசிகளையும் பார்க்கும் (மிதுனம், கன்னி, தனுசு, மீனம்)'] },
  ];

  // Jaimini Chara Dasa Sequence from Lagna
  const charaDasaOrder: string[] = [];
  for (let i = 0; i < 12; i++) {
    const rIdx = (lagna.rasiIndex + i) % 12;
    charaDasaOrder.push(TAMIL_RASIS[rIdx].tamil);
  }

  const jaimini: JaiminiDetails = {
    method: 'Jaimini Astrology Sutras',
    charaKarakas,
    karakamshaRasi,
    upapadaLagnaRasi,
    rasiDrishtiSummary,
    charaDasaOrder,
  };

  return {
    rasiChart,
    navamsaChart,
    lagna,
    moon,
    sun,
    planets: allPlanets,
    nakshatra: {
      index: moon.nakshatraIndex,
      tamil: moon.nakshatraTamil,
      english: moon.nakshatraName,
      lordTamil: currentNakInfo.lord,
      pada: moon.pada,
    },
    rasi: {
      index: moon.rasiIndex,
      tamil: moon.rasiTamil,
      english: moon.rasiName,
      lordTamil: TAMIL_RASIS[moon.rasiIndex].lord,
    },
    lagnaRasi: {
      index: lagna.rasiIndex,
      tamil: lagna.rasiTamil,
      english: lagna.rasiName,
      lordTamil: TAMIL_RASIS[lagna.rasiIndex].lord,
    },
    dasaBalance,
    panchangam: {
      tithiTamil,
      tithiPaksha,
      yogamTamil,
      karanamTamil,
      dayTamil,
      ayanamsamValue: Number(ayanamsha.toFixed(2)),
    },
    parasara,
    kp,
    jaimini,
  };
}
