import { readFileSync, writeFileSync } from 'fs';

const ROOT = 'C:/Users/ayand/Documents/VILATECH/your-universe/';

/* ─────────────────────────────────────────────
   1. GLOBALS.CSS — add hero background to every section
   ───────────────────────────────────────────── */
let css = readFileSync(ROOT + 'app/globals.css', 'utf8');

// Add global section background rules after the .glow-section definition
const SECTION_BG_CSS = `
/* ── Global section background: grid + glow on every section ─────────────── */
section{position:relative;overflow:hidden}
section::before{content:'';position:absolute;inset:0;background-image:linear-gradient(rgba(61,127,255,0.045) 1px,transparent 1px),linear-gradient(90deg,rgba(61,127,255,0.045) 1px,transparent 1px);background-size:64px 64px;pointer-events:none;z-index:0}
section::after{content:'';position:absolute;top:-5%;left:50%;transform:translateX(-50%);width:min(900px,100vw);height:480px;background:radial-gradient(ellipse at 50% 0%,rgba(61,127,255,0.10) 0%,rgba(61,127,255,0.03) 50%,transparent 75%);pointer-events:none;z-index:0}
/* Ensure all section content sits above the background pseudo-elements */
section > *{position:relative;z-index:1}
`;

if (!css.includes('Global section background')) {
  css = css.replace(
    '.glow-section{position:absolute;left:50%;transform:translateX(-50%);width:800px;height:400px;background:radial-gradient(ellipse at 50% 50%,rgba(61,127,255,0.07) 0%,transparent 70%);pointer-events:none}',
    '.glow-section{position:absolute;left:50%;transform:translateX(-50%);width:800px;height:400px;background:radial-gradient(ellipse at 50% 50%,rgba(61,127,255,0.07) 0%,transparent 70%);pointer-events:none}\n' + SECTION_BG_CSS
  );
  writeFileSync(ROOT + 'app/globals.css', css);
  console.log('✓ globals.css — section background added');
} else {
  console.log('· globals.css — already patched, skipping');
}

/* ─────────────────────────────────────────────
   2. LANGUAGE CONTEXT — fix all translations
   ───────────────────────────────────────────── */
let lc = readFileSync(ROOT + 'components/LanguageContext.tsx', 'utf8');

// ──── ENGLISH FIXES ────────────────────────────────────────────────────────
const EN_FIXES = [
  // More natural English phrasing
  ['problem_stat1_h: "choose subjects without guidance"', 'problem_stat1_h: "of learners choose subjects without guidance"'],
  ['problem_stat2_h: "is when most planning begins"', 'problem_stat2_h: "is when most career planning begins"'],
  ['problem_stat3_h: "information asymmetry"', 'problem_stat3_h: "information gap across SA schools"'],
  ['problem_stat4_h: "invested in decision support"', 'problem_stat4_h: "invested in learner decision support"'],
  // Fix "is when" stat body for clarity
  ['problem_stat2_b: "By then, critical subject doors are already closed."', 'problem_stat2_b: "By Grade 12, critical subject doors are already permanently closed."'],
  // Stats section — clearer unit labels
  ['stats_n1_unit: "000+"', 'stats_n1_unit: "k+"'],
  // More natural waitlist copy
  ['wait_firstname_hint: "We\'ll use this to personalise your experience."', 'wait_firstname_hint: "We\'ll personalise your experience based on your name."'],
  ['wait_email_hint: "We\'ll use this to notify you when we launch and send your confirmation."', 'wait_email_hint: "We\'ll send your confirmation and notify you at launch."'],
  // More natural footer
  ['foot_tagline: "South Africa\'s first educational decision intelligence platform. Guiding learners from Grade 9 to graduation and beyond."', 'foot_tagline: "South Africa\'s first educational decision-intelligence platform — guiding learners from Grade 9 to graduation and beyond."'],
  // Journey sub
  ['journey_sub: "Six phases. One continuous system that grows with you from Grade 9 through to your career."', 'journey_sub: "Six phases. One continuous system that grows with you — from Grade 9 through to your career."'],
  // Features sub — more natural
  ['features_sub: "Not adapted from abroad. Designed for the NSC, the IEB, and the institutions SA students actually attend."', 'features_sub: "Designed from the ground up for the NSC, the IEB, and the institutions South African students actually attend — not adapted from abroad."'],
  // Competitive sub — crisper
  ['comp_sub: "Traditional platforms show you lists of careers and requirements. Your Uni-Verse understands who you are and builds a personalised roadmap from Grade 9, all the way to your future."', 'comp_sub: "Traditional platforms show lists of careers and requirements. Your Uni-Verse understands who you are and builds a personalised roadmap — from Grade 9, all the way to your future."'],
  // Ecosystem section title fix
  ['eco_h2_1: "Built for students."', 'eco_h2_1: "Built for every student."'],
];

for (const [from, to] of EN_FIXES) {
  if (lc.includes(from)) { lc = lc.replace(from, to); }
  else { console.warn(`  ⚠ EN not found: ${from.slice(0, 60)}`); }
}

// ──── AFRIKAANS FIXES ──────────────────────────────────────────────────────
const AF_FIXES = [
  // Hero
  ['hero_badge: "Suid-Afrika se Eerste Onderwys-KI"', 'hero_badge: "Suid-Afrika se Eerste Onderwys-KI"'], // fine
  ['hero_sub: "KI-aangedrewe loopbaanleiding vir Suid-Afrikaanse leerders, vanaf Graad 9. Altyd gratis vir studente."', 'hero_sub: "KI-aangedrewe loopbaanleiding vir Suid-Afrikaanse leerders, van Graad 9 af. Altyd gratis vir studente."'],

  // Problem — fix unnatural Afrikaans
  ['problem_stat1_h: "kies vakke sonder leiding"', 'problem_stat1_h: "van leerders kies vakke sonder behoorlike leiding"'],
  ['problem_stat2_h: "is wanneer die meeste beplanning begin"', 'problem_stat2_h: "is wanneer die meeste loopbaanbeplanning eers begin"'],
  ['problem_stat2_b: "Teen dan is kritieke vakdeure reeds gesluit."', 'problem_stat2_b: "Teen Graad 12 is kritieke vakdeure reeds permanent gesluit."'],
  ['problem_stat3_h: "inligtingsongelykheid"', 'problem_stat3_h: "inligtingsgaping oor SA-skole heen"'],
  ['problem_stat4_h: "belê in besluitondersteuning"', 'problem_stat4_h: "belê in leerder-besluitondersteuning"'],

  // Stats
  ['stats_n1_unit: "000+"', 'stats_n1_unit: "k+"'],
  ['stats_h2_b: "Suid-Afrikaanse leerder te bereik."', 'stats_h2_b: "Suid-Afrikaanse leerder bereik."'],

  // Platform — fix "Aansoekverwaltingstelsel" (not natural Afrikaans, "verwaltings" is German/Dutch)
  ['plat_p3_body: "APS-trajekvoorspelling, akademiese agterstands-opsporing en vroeë ingrypingswenkelbewegings voordat probleme permanent word."', 'plat_p3_body: "APS-trajekvoorspelling, akademiese agterstandsopsporing en vroeë ingrypingseine — voordat probleme permanent word."'],
  ['plat_p6_title: "Aansoekverwaltingstelsel"', 'plat_p6_title: "Aansoekbestuursstelsel"'],
  ['plat_p6_body: "Doen aansoek by universiteite, TVET-kolleges en vaardigheidsprogramme op een plek, met pastelmaatintelligensie wat elke keuse lei."', 'plat_p6_body: "Doen aansoek by universiteite, TVET-kolleges en vaardigheidsprogramme op een plek, met passings-intelligensie wat elke keuse lei."'],

  // Features
  ['features_sub: "Nie aangepas van oorsee nie. Ontwerp vir die NSS, die IEB en die instellings wat SA-studente werklik bywoon."', 'features_sub: "Van grond af ontwerp vir die NSS, die IEB en die instellings wat Suid-Afrikaanse studente werklik bywoon — nie van oorsee aangepas nie."'],
  ['feat_f2_title: "Vorige-Vraestel-Intelligensie"', 'feat_f2_title: "Vorige-vraestel-intelligensie"'],
  ['feat_f2_body: "Meer as 10 jaar se NSS- en IEB-vraestelle ontleed. Weet watter onderwerpe die meeste gewig dra, watter vraagformate om te verwag en waar jy die meeste blootgestel is."', 'feat_f2_body: "Meer as 10 jaar se NSS- en IEB-vraestelle geanaliseer. Weet watter onderwerpe die meeste gewig dra, watter vraagformate om te verwag en waar jy die kwesbaars is."'],
  ['feat_f3_body: "Verstaan presies wat jou teikenuniversiteit en -fakulteit verwag. Sien hoe jou huidige prestasie ooreenstem met werklike toelatingsvlakke."', 'feat_f3_body: "Verstaan presies wat jou teikenuniversiteit en -fakulteit verwag. Sien hoe jou huidige prestasie vergelyk met werklike toelatingsvereistes."'],
  ['feat_f5_body: "Gestruktureerde, afleidingvrye sessies met aanpasbare vraestelle wat jou na meesterskap stoot, nie net vertroudheid nie."', 'feat_f5_body: "Gestruktureerde, afleidingvrye sessies met aanpasbare vraagstel­le wat jou na meesterskap dryf — nie net oppervlakige vertroudheid nie."'],

  // Competitive
  ['comp_sub: "Tradisionele platforms wys vir jou lyste van loopbane en vereistes. Your Uni-Verse verstaan wie jý is en bou \'n persoonlike padkaart vanaf Graad 9."', 'comp_sub: "Tradisionele platforms wys bloot lyste van loopbane en vereistes. Your Uni-Verse verstaan wie jý is en bou \'n persoonlike padkaart — vanaf Graad 9, al die pad na jou toekoms."'],
  ['comp_r8_feat: "Aansoekverwaltingstelsel"', 'comp_r8_feat: "Aansoekbestuur"'],
  ['comp_r8_them: "Afsonderlike hulpmiddel"', 'comp_r8_them: "Afsonderlike hulpmiddel"'], // fine
  ['comp_r8_us: "Ingebou, passend, geïntegreer"', 'comp_r8_us: "Ingebou, passend, volledig geïntegreer"'],

  // Journey
  ['journey_sub: "Ses fases. Een deurlopende stelsel wat saam met jou groei van Graad 9 tot jou loopbaan."', 'journey_sub: "Ses fases. Een deurlopende stelsel wat saam met jou groei — van Graad 9 tot jou loopbaan."'],
  ['phase5_name: "Aansoekverwaltingstelsel"', 'phase5_name: "Aansoekbestuursstelsel"'],
  ['phase5_head: "Een portaal. Elke instelling."', 'phase5_head: "Een portaal. Elke instelling."'], // fine
  ['phase5_body: "Doen aansoek by universiteite, TVET-kolleges en vaardigheidsprogramme met passende intelligensie wat elke stap lei."', 'phase5_body: "Doen aansoek by universiteite, TVET-kolleges en vaardigheidsprogramme — met passings-intelligensie wat elke stap lei."'],

  // Ecosystem — Fix "Bersterk" (NOT a word) and other issues
  ['eco_h2_1: "Gebou vir studente."', 'eco_h2_1: "Gebou vir elke student."'],
  ['eco_s2_cta: "Bersterk skooladviseurs"', 'eco_s2_cta: "Bemagtig skoolberaders"'],
  ['eco_s2_f3: "Outomatiese leidingswerkstrome"', 'eco_s2_f3: "Outomatiese leidingswerkvloeie"'],
  ['eco_s2_f5: "Prestasievertrouelingsvergelyking"', 'eco_s2_f5: "Prestasie-normvergelyking per skool"'],
  ['eco_s3_f3: "Loopbaanpadverwerkings"', 'eco_s3_f3: "Loopbaanpad-opdaterings"'],
  ['eco_s4_f4: "Gereeddheidsanalitika per program"', 'eco_s4_f4: "Gereedheidsanalitika per program"'], // typo fix

  // WhoItsFor
  ['who_sub: "Of jy nou matriek skryf, eerste jaar navigeer of jou honneurs voltooi — Your Universe pas aan by jou vlak en jou doelwitte."', 'who_sub: "Of jy nou matriek skryf, eerstejaars navigeer of jou honneurs voltooi — Your Universe pas aan by jou vlak en jou doelwitte."'],
  ['who_p2_body: "Die sprong van matriek na universiteit is sonder ondersteuning hard. Your Universe bou die akademiese gewoontes en struktuur wat eerstejaarstudente nodig het om te oorleef en te floreer."', 'who_p2_body: "Die sprong van matriek na universiteit is sonder ondersteuning brutaal moeilik. Your Universe bou die akademiese gewoontes en struktuur wat eerstejaarstudente nodig het om te oorleef en te floreer."'],

  // Waitlist
  ['wait_firstname_hint: "Ons sal dit gebruik om jou ervaring te personaliseer."', 'wait_firstname_hint: "Ons sal jou ervaring op grond van jou naam personaliseer."'],
  ['wait_email_hint: "Ons sal dit gebruik om jou in kennis te stel wanneer ons bekendgestel word."', 'wait_email_hint: "Ons stuur jou bevestiging en stel jou in kennis by bekendstelling."'],
  ['wait_org_parent_q: "Watter skool bywoon jou kind? (opsioneel)"', 'wait_org_parent_q: "By watter skool is jou kind? (opsioneel)"'],
  ['wait_rev_sub: "Hersien jou besonderhede voor jy by die waglys aansluit."', 'wait_rev_sub: "Gaan jou besonderhede deur voor jy by die waglys aansluit."'],
  ['wait_success_end: "Jy is deel van die infrastruktuur wat Afrika se opvoedkundige toekoms vorm."', 'wait_success_end: "Jy is deel van die infrastruktuur wat Afrika se opvoedkundige toekoms help vorm."'],

  // Footer
  ['foot_tagline: "Suid-Afrika se eerste opvoedkundige besluitintelligensieplatform. Lei leerders van Graad 9 tot graduering en verder."', 'foot_tagline: "Suid-Afrika se eerste opvoedkundige besluitintelligensie-platform — lei leerders van Graad 9 tot graduering en verder."'],

  // Schools page
  ['schools_sub: "Studente leer. Skole lei. Universiteite werf. Besighede ontdek talent. Your Uni-Verse dien die hele ekosisteem — een platform, een missie."', 'schools_sub: "Studente leer. Skole lei. Universiteite werf. Besighede ontdek talent. Your Uni-Verse bedien die hele ekosisteem — een platform, een missie."'],

  // Platform page
  ['plat_page_sub: "Van grond af gebou vir Suid-Afrikaanse leerders, skole en instellings. Geen aangepaste buitelandse sagteware nie. Doelgebou vir die NSS, die IEB en SA se unieke loopbaanlandskap."', 'plat_page_sub: "Van grond af gebou vir Suid-Afrikaanse leerders, skole en instellings. Geen aangepaste buitelandse sagteware nie — doelgebou vir die NSS, die IEB en SA se unieke loopbaanlandskap."'],
];

let afFixed = 0;
for (const [from, to] of AF_FIXES) {
  if (from === to) continue; // skip no-op checks
  if (lc.includes(from)) { lc = lc.replace(from, to); afFixed++; }
  else { console.warn(`  ⚠ AF not found: ${from.slice(0, 70)}`); }
}

writeFileSync(ROOT + 'components/LanguageContext.tsx', lc);
console.log(`✓ LanguageContext.tsx — ${afFixed} AF fixes applied`);

console.log('\n✅ All done — run: npm run build');
