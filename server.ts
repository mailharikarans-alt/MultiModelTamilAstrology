import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';
import { generateTamilAstrologyFallback } from './src/utils/tamilAstrologyRules';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json({ limit: '10mb' }));

// Server-side Gemini AI client initialization
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Astrology prediction endpoint
app.post('/api/horoscope/predict', async (req, res) => {
  try {
    const {
      name,
      dob,
      time,
      place,
      gender,
      queryFocus,
      method = 'BPHS',
      calculatedData,
    } = req.body;

    if (!dob || !place) {
      return res.status(400).json({ error: 'Date of birth and place of birth are required.' });
    }

    let systemInstruction = '';
    let prompt = '';

    if (method === 'KP') {
      systemInstruction = `
You are an authority in Krishnamurti Paddhati (KP Astrology / கே.பி. முறை).
CRITICAL MANDATE: Use Krishnamurti Paddhati (KP System) principles.
Key KP Axioms to apply:
1. "Planet is the source, Constellation (Star Lord) shows the result, Sub-Lord (உப நாதன்) decides the final fructification (Yes or No)".
2. Cuspal Sub-Lord analysis: 1st cusp (Longevity/Health), 2nd cusp (Wealth/Speech), 7th cusp (Marriage/Partnership), 10th & 6th cusps (Career, Promotion, Service).
3. Ruling Planets (RP / ஆளும் கிரகங்கள்) at birth: Day Lord, Moon Sign & Star Lord, Ascendant Sign & Star Lord.
4. House combinations: 2, 7, 11 (Marriage); 2, 6, 10, 11 (Career/Income); 4, 9, 11 (Higher Education); 6, 8, 12 (Diseases/Obstacles).
5. All outputs must be in pure, authoritative, authentic Tamil script (தமிழ் எழுத்துக்கள்) using traditional KP Tamil terminology (உப நாதன், நட்சத்திர நாதன், பாவ முனை, ஆளும் கிரகங்கள்).
Always respond strictly in JSON matching the requested schema.
`;

      prompt = `
நீங்கள் பேராசிரியர் கே.எஸ். கிருஷ்ணமூர்த்தி அவர்களின் கே.பி. பத்தாதியில் (Krishnamurti Paddhati - KP System) தலைசிறந்த நிபுணர்.
கீழே கொடுக்கப்பட்டுள்ள ஜாதகரின் பிறந்த விவரங்கள், பாவ முனைகளின் உப நாதர்கள் (Cuspal Sub-Lords), கிரகங்களின் உப நாதர்கள், மற்றும் ஆளும் கிரகங்கள் (Ruling Planets) ஆகியவற்றின் அடிப்படையில் துல்லியமான கே.பி. முறை ஜோதிடப் பலன்களைத் தூய தமிழ் உரைநடையில் (Pure Tamil Script) வழங்கவும்.

[ஜாதகர் விவரங்கள்]:
- பெயர்: ${name || 'ஜாதகர்'}
- பிறந்த தேதி: ${dob}
- பிறந்த நேரம்: ${time || 'குறிப்பிடப்படவில்லை'}
- பிறந்த இடம்: ${place}
- பாலினம்: ${gender || 'குறிப்பிடப்படவில்லை'}
- முக்கிய கேள்வி / பலன் கவனம்: ${queryFocus || 'பொது வாழ்க்கை மற்றும் எதிர்காலம்'}
- தேர்ந்தெடுக்கப்பட்ட முறை: கே.பி. முறை (KP System)

[கே.பி. முறைப்படி கணிக்கப்பட்ட விவரங்கள்]:
- கே.பி. மூல விதி: ${calculatedData?.kp?.keyRuleTamil}
- கே.பி. ஆளும் கிரகங்கள் (Ruling Planets):
  * கிழமை நாதன்: ${calculatedData?.kp?.rulingPlanets?.dayLord}
  * சந்திர ராசி நாதன்: ${calculatedData?.kp?.rulingPlanets?.moonSignLord}
  * சந்திர நட்சத்திர நாதன்: ${calculatedData?.kp?.rulingPlanets?.moonStarLord}
  * லக்ன ராசி நாதன்: ${calculatedData?.kp?.rulingPlanets?.lagnaSignLord}
  * லக்ன நட்சத்திர நாதன்: ${calculatedData?.kp?.rulingPlanets?.lagnaStarLord}
- முக்கிய பாவ முனைகளின் உப நாதர்கள் (Cuspal Sub-Lords):
${calculatedData?.kp?.cusps?.map((c: any) => `  * ${c.cuspNumber}-ஆம் பாவம் (${c.rasiTamil}): ராசி நாதன் [${c.signLord}], நட்சத்திர நாதன் [${c.starLord}], உப நாதன் [${c.subLord}]`).join('\n')}
- கிரகங்களின் உப நாதர்கள் (Planetary Sub-Lords):
${calculatedData?.kp?.planets?.map((p: any) => `  * ${p.planetTamil}: ${p.degreeStr} (${p.signLordTamil} ராசி, ${p.starLordTamil} நட்சத்திரம், உப நாதன் [${p.subLordTamil}])`).join('\n')}
- விம்சோத்தரி தசா இருப்பு: ${calculatedData?.dasaBalance?.lordTamil} தசை ${calculatedData?.dasaBalance?.remainingYears} வருடம் ${calculatedData?.dasaBalance?.remainingMonths} மாதம் ${calculatedData?.dasaBalance?.remainingDays} நாள்

தயவுசெய்து அனைத்துப் பலன்களையும் கே.பி. பத்தாதி விதிகளின்படி (உப நாதன் தீர்மானம், பாவ முனை காரகத்துவங்கள்) தூய தமிழ் உரைநடையில் விரிவாக விளக்கவும்.
`;
    } else if (method === 'JAIMINI') {
      systemInstruction = `
You are a revered master of Maharishi Jaimini's Upadesha Sutras (Jaimini Astrology / ஜைமினி முறை).
CRITICAL MANDATE: Use Maharishi Jaimini's unique astrological methodology.
Key Jaimini Principles to apply:
1. 7 Chara Karakas based on decreasing longitudes:
   - Atmakaraka (AK / ஆத்மகாரகன்): King of chart, soul desires, inner spiritual path.
   - Amatyakaraka (AmK / அமாத்யகாரகன்): Intellect, career, advisor, profession.
   - Bhratrukaraka (BK / பிராத்ருகாரகன்): Siblings, courage, spiritual guru.
   - Matrukaraka (MK / மாத்ருகாரகன்): Mother, education, domestic happiness.
   - Pitrukaraka (PiK / பித்ருகாரகன்): Father, dharma, ancestry.
   - Jnatikaraka (GK / ஞானிகாரகன்): Obstacles, diseases, rivalry, endurance.
   - Darakaraka (DK / தாரகாரகன்): Spouse, marriage, business partnerships.
2. Karakamsha (காரகாம்சம்): The sign occupied by Atmakaraka in Navamsha, showing highest spiritual & worldly calling.
3. Upapada Lagna (UL / உபபத லக்னம்): Arudha of the 12th house, indicating marriage stability and spouse's character.
4. Jaimini Rasi Drishti: Signs aspect each other (Movable aspect Fixed except adjacent; Fixed aspect Movable except adjacent; Dual aspect each other).
5. Chara Dasa (சர தசை): Sign-based period evaluation.
6. All responses must be in pure, dignified, evocative Tamil script (தமிழ் எழுத்துக்கள்).
Always respond strictly in JSON matching the requested schema.
`;

      prompt = `
நீங்கள் மகரிஷி ஜைமினியின் உபதேச சூத்திரங்களில் (Jaimini Sutras) கரைகண்ட தலைசிறந்த ஜோதிட மாமேதை.
கீழே கொடுக்கப்பட்டுள்ள ஜாதகரின் பிறந்த விவரங்கள், சப்த காரகங்கள் (7 Chara Karakas), காரகாம்சம் (Karakamsha), உபபத லக்னம் (Upapada), மற்றும் ஜைமினி ராசி பார்வைகளின் அடிப்படையில் தூய தமிழ் உரைநடையில் (Pure Tamil Script) ஆழமான ஜைமினி ஜோதிடப் பலன்களைக் கணிக்கவும்.

[ஜாதகர் விவரங்கள்]:
- பெயர்: ${name || 'ஜாதகர்'}
- பிறந்த தேதி: ${dob}
- பிறந்த நேரம்: ${time || 'குறிப்பிடப்படவில்லை'}
- பிறந்த இடம்: ${place}
- பாலினம்: ${gender || 'குறிப்பிடப்படவில்லை'}
- முக்கிய கேள்வி / பலன் கவனம்: ${queryFocus || 'பொது வாழ்க்கை மற்றும் எதிர்காலம்'}
- தேர்ந்தெடுக்கப்பட்ட முறை: ஜைமினி முறை (Jaimini Sutras)

[ஜைமினி முறைப்படி கணிக்கப்பட்ட விவரங்கள்]:
- காரகாம்ச ராசி (Karakamsha): ${calculatedData?.jaimini?.karakamshaRasi} (ஆத்மகாரகன் நவாம்சத்தில் நின்ற ராசி)
- உபபத லக்னம் (Upapada Lagna - UL): ${calculatedData?.jaimini?.upapadaLagnaRasi} (12-ஆம் பாவக ஆரூடம் - களத்திர சுகம்)
- ஜைமினி சப்த காரகங்கள் (7 Chara Karakas):
${calculatedData?.jaimini?.charaKarakas?.map((k: any) => `  * ${k.karakaNameTamil} (${k.karakaCode}): ${k.planetTamil} - ${k.degreeInRasi}° பாகை (${k.significanceTamil})`).join('\n')}
- ஜைமினி ராசி பார்வைகள் (Rasi Drishti Summary):
${calculatedData?.jaimini?.rasiDrishtiSummary?.map((d: any) => `  * ${d.rasiTamil}: பார்வைகள் -> ${d.aspectedRasisTamil?.join(', ')}`).join('\n')}
- லக்னம்: ${calculatedData?.lagnaRasi?.tamil} | ராசி: ${calculatedData?.rasi?.tamil} | நட்சத்திரம்: ${calculatedData?.nakshatra?.tamil} (பாதம் ${calculatedData?.nakshatra?.pada})

தயவுசெய்து அனைத்துப் பலன்களையும் ஜைமினி சூத்திர விதிகளின்படி (ஆத்மகாரகன், அமாத்யகாரகன், காரகாம்சம், உபபதம், சர தசை) தூய தமிழ் எழுத்துக்களில் விரிவாக வழங்கவும்.
`;
    } else {
      // Default: BPHS (Brihat Parasara Hora Sastra)
      systemInstruction = `
You are a revered traditional Vedic Astrologer who strictly adheres to Brihat Parasara Hora Sastra (BPHS / பிருஹத் பராசர ஹோரா சாஸ்திரம்).
CRITICAL MANDATE: Use Sage Parasara's methodology (BPHS).
Everything must be evaluated according to Sage Parasara:
1. Houses: Kendras (Vishnu Sthanas 1,4,7,10), Trikonas (Lakshmi Sthanas 1,5,9), Upachayas (3,6,10,11), Dusthanas (6,8,12), Marakas (2,7), and Badhaka.
2. Yogas: Parasara Raja Yogas (Kendra-Trikona lord sambandha), Dhana Yogas, Pancha Mahapurusha Yogas (Ruchaka, Bhadra, Hamsa, Malavya, Sasa).
3. Aspects: Parasara Graha Drishti (all 7th; Mars 4,8; Jupiter 5,9; Saturn 3,10; Rahu/Ketu 5,9).
4. Dasa: Strictly Vimshottari Dasa System (120 years).
5. All outputs must be in pure, dignified, authentic Tamil script (தமிழ் எழுத்துக்கள்).
Always respond strictly in JSON matching the requested schema.
`;

      prompt = `
நீங்கள் பிருஹத் பராசர ஹோரா சாஸ்திரத்தில் (Brihat Parasara Hora Sastra - BPHS) கரைகண்ட தலைசிறந்த தூய பராசர ஜோதிட மாமேதை.
கீழே கொடுக்கப்பட்டுள்ள பிறந்த ஜாதக விவரங்கள் மற்றும் பராசரர் முறைப்படியான கிரக நிலைகளைக் கொண்டு, தூய மற்றும் நயமான தமிழ் உரைநடையில் (Pure Tamil Script Output) ஆழமான, துல்லியமான மற்றும் நம்பிக்கை தரும் பராசர ஜோதிடப் பலன்களைக் கணிக்கவும்.

[ஜாதகர் விவரங்கள்]:
- பெயர்: ${name || 'ஜாதகர்'}
- பிறந்த தேதி: ${dob}
- பிறந்த நேரம்: ${time || 'குறிப்பிடப்படவில்லை'}
- பிறந்த இடம்: ${place}
- பாலினம்: ${gender || 'குறிப்பிடப்படவில்லை'}
- முக்கிய கேள்வி / கவனம்: ${queryFocus || 'பொது வாழ்க்கை மற்றும் எதிர்காலம்'}
- தேர்ந்தெடுக்கப்பட்ட முறை: பராசரர் முறை (BPHS)

[பராசரர் முறைப்படி கணிக்கப்பட்ட விவரங்கள்]:
- லக்னம் (Ascendant): ${calculatedData?.lagnaRasi?.tamil} (அதிபதி: ${calculatedData?.lagnaRasi?.lordTamil})
- ராசி (Moon Sign): ${calculatedData?.rasi?.tamil} (அதிபதி: ${calculatedData?.rasi?.lordTamil})
- நட்சத்திரம் (Birth Star): ${calculatedData?.nakshatra?.tamil} - பாதம் ${calculatedData?.nakshatra?.pada} (அதிபதி: ${calculatedData?.nakshatra?.lordTamil})
- பராசரர் கேந்திரங்கள் (1, 4, 7, 10 விஷ்ணு ஸ்தானங்கள்): ${calculatedData?.parasara?.kendras?.map((k: any) => `${k.house}-ஆம் பாவம்: ${k.rasiTamil} (${k.lordTamil})`).join(', ')}
- பராசரர் திரிகோணங்கள் (1, 5, 9 லட்சுமி ஸ்தானங்கள்): ${calculatedData?.parasara?.trikonas?.map((t: any) => `${t.house}-ஆம் பாவம்: ${t.rasiTamil} (${t.lordTamil})`).join(', ')}
- பராசரர் மறைவு ஸ்தானங்கள் (6, 8, 12 துஸ்தானங்கள்): ${calculatedData?.parasara?.dusthanas?.map((d: any) => `${d.house}-ஆம் பாவம்: ${d.rasiTamil}`).join(', ')}
- பராசரர் உபசய ஸ்தானங்கள் (3, 6, 10, 11): ${calculatedData?.parasara?.upachayas?.map((u: any) => `${u.house}-ஆம் பாவம்: ${u.rasiTamil}`).join(', ')}
- பராசரர் பாதக ஸ்தானம்: ${calculatedData?.parasara?.badhaka?.typeTamil} - ${calculatedData?.parasara?.badhaka?.house}-ஆம் பாவம் ${calculatedData?.parasara?.badhaka?.rasiTamil} (அதிபதி: ${calculatedData?.parasara?.badhaka?.lordTamil})
- பராசரர் மாரக ஸ்தானங்கள் (2, 7): ${calculatedData?.parasara?.marakas?.map((m: any) => `${m.house}-ஆம் பாவம்: ${m.rasiTamil} (${m.lordTamil})`).join(', ')}
- வர்கோத்தம கிரகங்கள் (Vargottama): ${calculatedData?.parasara?.vargottamaPlanets?.map((v: any) => `${v.planetTamil} (${v.rasiTamil})`).join(', ') || 'இல்லை'}
- விம்சோத்தரி தசா இருப்பு (120 ஆண்டுகள் பராசர முறை): ${calculatedData?.dasaBalance?.lordTamil} தசை ${calculatedData?.dasaBalance?.remainingYears} வருடம் ${calculatedData?.dasaBalance?.remainingMonths} மாதம் ${calculatedData?.dasaBalance?.remainingDays} நாள்
- திதி: ${calculatedData?.panchangam?.tithiTamil} | யோகம்: ${calculatedData?.panchangam?.yogamTamil} | கரணம்: ${calculatedData?.panchangam?.karanamTamil}
- கிரக அமைப்புகள்:
${calculatedData?.planets?.map((p: any) => `  * ${p.tamilName} (${p.shortTamil}): ${p.rasiTamil} ராசியில் (${p.degreeInRasi} பாகை, ${p.nakshatraTamil} பாதம் ${p.pada})`).join('\n')}

தயவுசெய்து அனைத்துப் பதில்களையும் பராசரர் சாஸ்திரத்தின்படி தூய தமிழ் எழுத்துக்களில் (Tamil script) வழங்கவும். பராசரர் சுலோக தத்துவங்களான கேந்திர-திரிகோண ராஜ யோகம், பஞ்ச மகாபுருஷ யோகம், பராசர விசேஷ பார்வைகள் மற்றும் விம்சோத்தரி தசா-புக்தி அடிப்படையில் பலன்களை விளக்கவும்.
`;
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.7,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: {
              type: Type.STRING,
              description: 'Divine title in Tamil e.g. ஸ்ரீ விநாயகா துணை - பிறந்த ஜாதக பலாபலன்கள்',
            },
            summary: {
              type: Type.STRING,
              description: 'Executive auspicious summary of this horoscope in 2-3 inspiring Tamil sentences',
            },
            personality: {
              type: Type.STRING,
              description: 'Core nature, intellectual strengths, spiritual disposition, and character traits based on Lagna and Moon sign in Tamil',
            },
            lagnaRasiAnalysis: {
              type: Type.STRING,
              description: 'Detailed analysis of Lagnam and Rasi, house lords and their placement significance in Tamil',
            },
            planetaryYogas: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  yogaName: { type: Type.STRING, description: 'Yoga name in Tamil e.g. கஜகேசரி யோகம், குரு சந்திர யோகம், தர்ம கர்மாதிபதி யோகம், புதாதித்ய யோகம்' },
                  description: { type: Type.STRING, description: 'How it forms and what blessing it brings to the native in Tamil' },
                },
                required: ['yogaName', 'description'],
              },
              description: 'Special astrological yogas formed in this chart',
            },
            dashaBhuktiForecast: {
              type: Type.STRING,
              description: 'In-depth breakdown of current and upcoming Dasha-Bhukti periods, timing and guidance in Tamil',
            },
            careerFinance: {
              type: Type.STRING,
              description: 'Career path (Govt job, private business, creative fields), promotions, financial peaks and wealth yogas in Tamil',
            },
            marriageFamily: {
              type: Type.STRING,
              description: 'Marriage compatibility, partner nature, family harmony, timing of auspicious events in Tamil',
            },
            healthVitality: {
              type: Type.STRING,
              description: 'Health awareness, vital energy, dietary and wellness advice per Ayurveda/Astrology in Tamil',
            },
            doshaAnalysis: {
              type: Type.OBJECT,
              properties: {
                hasDosha: { type: Type.BOOLEAN, description: 'Whether significant dosha is present' },
                title: { type: Type.STRING, description: 'Dosha title in Tamil e.g. செவ்வாய் தோஷ விளக்கம் / ராகு கேது நாக தோஷ சமநிலை' },
                explanation: { type: Type.STRING, description: 'Balanced astrological clarification and reassurance in Tamil' },
              },
              required: ['hasDosha', 'title', 'explanation'],
            },
            remedies: {
              type: Type.OBJECT,
              properties: {
                deity: { type: Type.STRING, description: 'Primary deity to worship in Tamil e.g. திருச்செந்தூர் முருகன் / ஸ்ரீ ரங்கநாதர்' },
                temples: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: 'Famous auspicious temples in Tamil Nadu to visit',
                },
                mantra: { type: Type.STRING, description: 'Auspicious Tamil slokam or Thevaram/Thiruppugazh verse or Navagraha stotram' },
                gemstone: { type: Type.STRING, description: 'Lucky gemstone with wearing instructions in Tamil e.g. பவளம் அல்லது புஷ்பராகம்' },
                luckyColor: { type: Type.STRING, description: 'Auspicious colors e.g. மஞ்சள், வெண்மை' },
                luckyNumber: { type: Type.STRING, description: 'Lucky numbers e.g. 1, 3, 9' },
                luckyDay: { type: Type.STRING, description: 'Auspicious day for prayers e.g. வியாழக்கிழமை' },
                charity: { type: Type.STRING, description: 'Auspicious charitable acts e.g. அன்னதானம், குருமார்களுக்கு வஸ்திர தானம்' },
              },
              required: ['deity', 'temples', 'mantra', 'gemstone', 'luckyColor', 'luckyNumber', 'luckyDay', 'charity'],
            },
            positiveTraits: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: '3 to 5 key strengths in Tamil',
            },
            cautionPoints: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: '2 to 3 points of caution and mindfulness in Tamil',
            },
          },
          required: [
            'title',
            'summary',
            'personality',
            'lagnaRasiAnalysis',
            'planetaryYogas',
            'dashaBhuktiForecast',
            'careerFinance',
            'marriageFamily',
            'healthVitality',
            'doshaAnalysis',
            'remedies',
            'positiveTraits',
            'cautionPoints',
          ],
        },
      },
    });

    const parsedData = JSON.parse(response.text || '{}');
    return res.json(parsedData);
  } catch (error: any) {
    console.warn('AI generation encountered error/throttle, using traditional Vedic astrology engine fallback:', error?.message);
    try {
      const fallbackData = generateTamilAstrologyFallback({
        name: req.body.name || 'ஜாதகர்',
        dob: req.body.dob,
        time: req.body.time || '10:00',
        place: req.body.place || 'தமிழ்நாடு',
        gender: req.body.gender || 'ஆண்',
        queryFocus: req.body.queryFocus || 'பொது வாழ்க்கை',
        method: req.body.method || 'BPHS',
        calculatedData: req.body.calculatedData,
      });
      return res.json(fallbackData);
    } catch (fallbackErr: any) {
      console.error('Fallback generation also failed:', fallbackErr);
      return res.status(500).json({
        error: error?.message || 'ஜாதகக் கணிப்பு உருவாக்குவதில் பிழை ஏற்பட்டது. தயவுசெய்து மீண்டும் முயற்சிக்கவும்.',
      });
    }
  }
});

// Text-to-Speech audio recitation endpoint using gemini-3.8-flash-lite-tts
app.post('/api/horoscope/tts', async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ error: 'Text is required for TTS' });
    }

    const ttsText = String(text).slice(0, 400); // Keep concise and peaceful

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash-lite-tts',
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: ttsText,
              speechMetadata: {
                style: 'Calm, revered, spiritual elder Tamil astrologer offering divine horoscope blessings with clarity',
              },
            },
          ],
        },
      ],
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Kore' },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (!base64Audio) {
      return res.status(500).json({ error: 'Audio generation produced no output' });
    }

    return res.json({ audioBase64: base64Audio });
  } catch (err: any) {
    console.error('TTS generation failed:', err);
    return res.status(500).json({ error: err?.message || 'TTS generation failed' });
  }
});

// Mount Vite or serve static assets in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, () => {
    console.log(`Tamil Astrology server running on http://localhost:${port}`);
  });
}

startServer();
