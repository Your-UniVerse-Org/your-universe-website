import { readFileSync, writeFileSync } from 'fs';
const path = 'C:/Users/ayand/Documents/VILATECH/your-universe/components/LanguageContext.tsx';
let lc = readFileSync(path, 'utf8');

const fixes = [
  // problem_stat4_h AF
  [
    `problem_stat4_h: "bel\u00ea in besluitondersteuning"`,
    `problem_stat4_h: "bel\u00ea in leerder-besluitondersteuning"`
  ],
  // plat_p3_body AF - fix "wenkelbewegings" (wrong word)
  [
    `vroe\u00eb ingrypingswenkelbewegings voordat probleme permanent word.`,
    `vroe\u00eb ingrypingseine \u2014 voordat probleme permanent word.`
  ],
  // comp_sub AF
  [
    `comp_sub: "Tradisionele platforms wys vir jou lyste van loopbane en vereistes. Your Uni-Verse verstaan wie j\u00fd is en bou \u2019n persoonlike padkaart vanaf Graad 9."`,
    `comp_sub: "Tradisionele platforms wys bloot lyste van loopbane en vereistes. Your Uni-Verse verstaan wie j\u00fd is en bou \u2019n persoonlike padkaart \u2014 vanaf Graad 9, al die pad na jou toekoms."`
  ],
  // comp_r8_us AF (unicode ï)
  [
    `comp_r8_us: "Ingebou, passend, ge\u00efntegreer"`,
    `comp_r8_us: "Ingebou, passend, volledig ge\u00efntegreer"`
  ],
  // who_sub AF (em dash \u2014)
  [
    `who_sub: "Of jy nou matriek skryf, eerste jaar navigeer of jou honneurs voltooi \u2014 Your Universe pas aan by jou vlak en jou doelwitte."`,
    `who_sub: "Of jy nou matriek skryf, eerstejaars navigeer of jou honneurs voltooi \u2014 Your Universe pas aan by jou vlak en jou doelwitte."`
  ],
  // schools_sub AF (em dash \u2014)
  [
    `schools_sub: "Studente leer. Skole lei. Universiteite werf. Besighede ontdek talent. Your Uni-Verse dien die hele ekosisteem \u2014 een platform, een missie."`,
    `schools_sub: "Studente leer. Skole lei. Universiteite werf. Besighede ontdek talent. Your Uni-Verse bedien die hele ekosisteem \u2014 een platform, een missie."`
  ],
];

let count = 0;
for (const [from, to] of fixes) {
  if (lc.includes(from)) {
    lc = lc.replace(from, to);
    count++;
  } else {
    console.warn('NOT FOUND:', from.slice(0, 80));
  }
}
writeFileSync(path, lc);
console.log(count + '/6 remaining AF fixes applied');
