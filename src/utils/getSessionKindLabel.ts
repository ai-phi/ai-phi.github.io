const KIND_LABELS: Record<string, string> = {
  "critical-perspectives": "Critical Perspectives",
  seminar: "Seminar series",
  causerie: "Causerie",
  community: "Community",
  workshop: "Workshop",
  other: "Other",
};

const getSessionKindLabel = (kind?: string) =>
  KIND_LABELS[(kind ?? "").toLowerCase()] ?? "Other";

export default getSessionKindLabel;
