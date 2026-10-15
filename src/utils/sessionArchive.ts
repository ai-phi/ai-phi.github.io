import type { CollectionEntry } from "astro:content";
import getSessionDate from "./getSessionDate";

type Session = CollectionEntry<"sessions">;
export interface ArchiveGroup {
  id: string;
  title: string;
  description: string;
  type: "cycle" | "format";
  sessions: Session[];
}
export interface SessionEdition {
  startYear: number;
  number: number;
  label: string;
  years: string;
  path: string;
  introduction: string;
  sessions: Session[];
  groups: ArchiveGroup[];
}
interface GroupDefinition {
  id: string;
  title: string;
  description: string;
  members: number[];
}

// Retrospective browsing groups, based on the session descriptions and bodies.
// These do not change event metadata or claim historical cycle membership.
const HISTORICAL_GROUPS: Record<number, GroupDefinition[]> = {
  2023: [
    {
      id: "talks",
      title: "Talks & introductions",
      description:
        "Introductions and invited perspectives on AI, from deep learning and AGI to consciousness, agency and ethics.",
      members: [1, 3, 4, 5, 6, 8, 10, 11, 12, 13, 16],
    },
    {
      id: "discussions",
      title: "Open discussions & tributes",
      description:
        "Collective conversations, an AI forum, and screenings reflecting on the work of Daniel Kahneman and Daniel Dennett.",
      members: [2, 9, 14, 15],
    },
    {
      id: "community",
      title: "News & community",
      description:
        "A Christmas news session and a closing conversation about the community’s first year and what might come next.",
      members: [7, 17],
    },
  ],
  2024: [
    {
      id: "seminars",
      title: "Seminars & invited talks",
      description:
        "Invited perspectives on moral values, alignment, consent and artificial consciousness.",
      members: [18, 21, 22, 24, 25],
    },
    {
      id: "causeries",
      title: "Causeries",
      description:
        "The first of our informal, discussion-led causeries asks what reasoning means for minds and machines. These conversations are unrecorded.",
      members: [20],
    },
    {
      id: "community",
      title: "Informal news & community",
      description:
        "Open evenings to share AI news, questions and ideas without a set presentation.",
      members: [19, 23],
    },
  ],
  2025: [
    {
      id: "seminars",
      title: "Seminars",
      description:
        "Invited talks on reason, control, knowledge, abstraction, consciousness and creative practice.",
      members: [26, 28, 32, 33, 37, 38, 40],
    },
    {
      id: "causeries",
      title: "Causeries",
      description:
        "Informal, unrecorded conversations about AI’s promises, education, values and systemic challenges.",
      members: [27, 29, 31, 34, 35, 36],
    },
    {
      id: "community",
      title: "Community gatherings",
      description:
        "A New Year gathering and an end-of-year evening to reconnect and reflect together.",
      members: [30, 39],
    },
  ],
};

const INTRODUCTIONS: Record<number, string> = {
  2023: "Our first year built a shared language between AI and philosophy through introductions, invited talks and collective discussion.",
  2024: "Our second edition developed the seminar programme and introduced causeries, alongside informal AI news sessions.",
  2025: "Seminars, causeries and community gatherings explored AI’s concepts, research practices and wider effects.",
  2026: "This edition opens with Critical Perspectives on AI, exploring how critique can inform different ways of thinking about and developing AI.",
};

const CYCLES: Record<string, { id: string; description: string }> = {
  "Critical Perspectives on AI": {
    id: "critical-perspectives",
    description:
      "How can critical perspectives help us think, design and act differently around AI?",
  },
};
const GENERIC_SERIES = new Set([
  "AI-Phi Seminar Series",
  "AI-Phi Causeries",
  "ai-phi Community Session",
]);
const FORMATS: Record<string, { title: string; description: string }> = {
  seminar: {
    title: "Seminars",
    description:
      "Invited talks and research perspectives from across disciplines.",
  },
  causerie: {
    title: "Causeries",
    description:
      "Informal, discussion-led conversations. Causeries are unrecorded.",
  },
  community: {
    title: "Community gatherings",
    description: "Time to meet, share news and reflect on the community.",
  },
  workshop: {
    title: "Workshops",
    description: "Sessions to explore ideas and practices together.",
  },
  other: {
    title: "Other sessions",
    description: "Further conversations and gatherings from this edition.",
  },
};

export function getEditionStartYear(date: string | Date): number {
  const parts = new Intl.DateTimeFormat("en", {
    timeZone: "Europe/Paris",
    year: "numeric",
    month: "numeric",
  }).formatToParts(new Date(date));
  const year = Number(parts.find(part => part.type === "year")?.value);
  const month = Number(parts.find(part => part.type === "month")?.value);
  return month >= 9 ? year : year - 1;
}

export function getArchiveSessionFormat(session: Session): string {
  if (session.data.formatLabel) return session.data.formatLabel;
  const number = session.data.sessionNumber;
  if ([14, 15].includes(number)) return "Screening & discussion";
  if (number === 9) return "Forum";
  if ([2, 19, 23].includes(number)) return "Open discussion";
  if (number === 7) return "News & discussion";
  if ([17, 30, 39].includes(number)) return "Community gathering";
  if (number <= 18) return "Talk";
  const labels: Record<string, string> = {
    seminar: "Seminar",
    causerie: "Causerie",
    community: "Community gathering",
    workshop: "Workshop",
    "critical-perspectives": "Conversation",
    other: "Session",
  };
  return labels[session.data.kind] ?? "Session";
}

function groupSessions(startYear: number, sessions: Session[]): ArchiveGroup[] {
  const definitions = HISTORICAL_GROUPS[startYear] ?? [];
  const assigned = new Set<string>();
  const groups: ArchiveGroup[] = definitions.map(definition => {
    const members = sessions.filter(session =>
      definition.members.includes(session.data.sessionNumber)
    );
    for (const member of members) {
      if (assigned.has(member.id)) {
        throw new Error(`Session ${member.slug} belongs to two archive groups`);
      }
      assigned.add(member.id);
    }
    return { ...definition, type: "format", sessions: members };
  });

  // New published cycles use series, independently of the session's format.
  // Unannounced cycles require no placeholder or public metadata here.
  for (const session of sessions.filter(entry => !assigned.has(entry.id))) {
    const series = session.data.series?.trim();
    const cycle = series && !GENERIC_SERIES.has(series) ? series : undefined;
    const kind = session.data.kind;
    const format = FORMATS[kind] ?? FORMATS.other;
    const id = cycle
      ? CYCLES[cycle]?.id ?? `cycle-${encodeURIComponent(cycle)}`
      : `format-${kind}`;
    let group = groups.find(item => item.id === id);
    if (!group) {
      group = {
        id,
        title: cycle ?? format.title,
        description: cycle
          ? CYCLES[cycle]?.description ?? ""
          : format.description,
        type: cycle ? "cycle" : "format",
        sessions: [],
      };
      groups.push(group);
    }
    group.sessions.push(session);
    assigned.add(session.id);
  }
  return groups.filter(group => group.sessions.length);
}

export function getSessionEditions(entries: Session[]): SessionEdition[] {
  const sessions = entries.filter(({ data }) => !data.draft);
  const years = [
    ...new Set(
      sessions.map(session => getEditionStartYear(getSessionDate(session)))
    ),
  ].sort((a, b) => b - a);
  return years.map((startYear, index) => {
    const members = sessions
      .filter(
        session => getEditionStartYear(getSessionDate(session)) === startYear
      )
      .sort(
        (a, b) =>
          new Date(getSessionDate(b)).getTime() -
          new Date(getSessionDate(a)).getTime()
      );
    const yearsLabel = `${startYear}–${String(startYear + 1).slice(-2)}`;
    return {
      startYear,
      number: startYear - 2022,
      label: `ai-phi ${startYear - 2022}.0`,
      years: yearsLabel,
      path:
        index === 0
          ? "/sessions/"
          : `/sessions/${startYear}-${String(startYear + 1).slice(-2)}/`,
      introduction:
        INTRODUCTIONS[startYear] ??
        "Explore this edition’s talks, conversations and gatherings.",
      sessions: members,
      groups: groupSessions(startYear, members),
    };
  });
}
