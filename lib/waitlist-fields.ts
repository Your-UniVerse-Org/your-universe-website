/** Column headers — match the waitlist form questions on the website. */
export const WAITLIST_SHEET_HEADERS = [
  "Timestamp",
  "Type",
  "First Name",
  "Surname",
  "Email",
  "Organisation",
  "What grade are you in?",
  "What are you into right now?",
  "What do you want to achieve academically?",
  "Roughly where is your average?",
  "How did your last test or exam go?",
  "What grade is your child in?",
  "What matters most to you right now?",
  "What would you love them to achieve?",
  "What is your role?",
  "Roughly how many learners could use guidance?",
  "What are you most focused on?",
  "What would success look like in Year 1?",
] as const;

export interface WaitlistFormPayload {
  id: string;
  timestamp: string;
  type: string;
  firstName: string;
  surname: string;
  email: string;
  org: string;
  gradeLevel?: string;
  interests?: string;
  academicGoal?: string;
  currentAverage?: string;
  lastTestResult?: string;
  childGrade?: string;
  parentFocus?: string;
  parentGoal?: string;
  schoolRole?: string;
  learnerCount?: string;
  instFocus?: string;
  instGoal?: string;
}

/** Flatten API entry + profile into sheet row values keyed by header. */
export function toSheetRow(entry: {
  id: string;
  timestamp: string;
  type: string;
  name: string;
  email: string;
  org: string;
  firstName?: string;
  surname?: string;
  profile?: Record<string, string>;
}): Record<string, string> {
  const [fallbackFirst, ...rest] = entry.name.trim().split(/\s+/);
  const fallbackSurname = rest.join(" ");

  const p = entry.profile ?? {};

  return {
    Timestamp: entry.timestamp,
    Type: entry.type,
    "First Name": entry.firstName?.trim() || fallbackFirst || "",
    Surname: entry.surname?.trim() || fallbackSurname || "",
    Email: entry.email,
    Organisation: entry.org,
    "What grade are you in?": p.gradeLevel ?? "",
    "What are you into right now?": p.interests ?? "",
    "What do you want to achieve academically?": p.academicGoal ?? "",
    "Roughly where is your average?": p.currentAverage ?? "",
    "How did your last test or exam go?": p.lastTestResult ?? "",
    "What grade is your child in?": p.childGrade ?? "",
    "What matters most to you right now?": p.parentFocus ?? "",
    "What would you love them to achieve?": p.parentGoal ?? "",
    "What is your role?": p.schoolRole ?? "",
    "Roughly how many learners could use guidance?": p.learnerCount ?? "",
    "What are you most focused on?": p.instFocus ?? "",
    "What would success look like in Year 1?": p.instGoal ?? "",
    _id: entry.id,
  };
}
