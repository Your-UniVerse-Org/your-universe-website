import { writeFileSync, readFileSync } from 'fs';
const B = 'C:/Users/ayand/Documents/VILATECH/your-universe/components/';

// Fix Waitlist.tsx - correct placeholder handling
let w = readFileSync(B + 'Waitlist.tsx', 'utf8');

// Fix step display: use wait_step + wait_of separately
w = w.replace(
  `{currentStep === 5 ? t("wait_review_lbl") : t("wait_step").replace("{n}", String(stepIndex + 1)).replace("{total}", String(steps.length))}`,
  `{currentStep === 5 ? t("wait_review_lbl") : \`\${t("wait_step")} \${stepIndex + 1} \${t("wait_of")} \${steps.length}\`}`
);

// Fix wait_rev_heading (no {name} placeholder)
w = w.replace(
  `{t("wait_rev_heading").replace("{name}", data.firstName)}`,
  `{\`\${t("wait_rev_heading")}, \${data.firstName}?\`}`
);

// Fix wait_success_p (no {name}/{email} placeholder — use template literal)
w = w.replace(
  `{t("wait_success_p").replace("{name}", data.firstName).replace("{email}", data.email)}`,
  `{\`\${t("wait_success_p")} \${data.email}.\`}`
);

// Fix wait_surname_q (no {name} placeholder — prefix manually)
w = w.replace(
  `question={t("wait_surname_q").replace("{name}", data.firstName)}`,
  `question={data.firstName ? \`Nice to meet you, \${data.firstName}. \${t("wait_surname_q")}\` : t("wait_surname_q")}`
);

// Fix wait_email_q for StepEmail (no {name} placeholder)
w = w.replace(
  `{name ? \`\${t("wait_email_q").replace("{name}", name)}\` : t("wait_email_q").replace("{name} — ", "")}`,
  `{name ? \`\${name}. \${t("wait_email_q")}\` : t("wait_email_q")}`
);

writeFileSync(B + 'Waitlist.tsx', w);

// Fix Footer.tsx - copyright without {year} placeholder
let f = readFileSync(B + 'Footer.tsx', 'utf8');
f = f.replace(
  `{t("foot_copyright").replace("{year}", String(new Date().getFullYear()))}`,
  `&copy; {new Date().getFullYear()} Your Uni-Verse. {t("foot_copyright")}`
);
writeFileSync(B + 'Footer.tsx', f);

console.log('Waitlist + Footer patched');
