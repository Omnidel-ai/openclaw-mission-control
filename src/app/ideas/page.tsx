import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function IdeasPage() {
  let ideas: Array<{ id: string; title: string; description: string | null; source: string | null; status: string | null; timestamp: Date }> = [];
  try {
    ideas = await prisma.idea.findMany({ orderBy: { timestamp: "desc" }, take: 50 });
  } catch {}

  return (
    <div className="p-8 max-w-[1000px] mx-auto">
      <h1 className="text-[32px] font-semibold tracking-[-0.02em] mb-2">Ideas</h1>
      <p className="text-[var(--ink-2)] mb-8">Your agents drop ideas here for you to review.</p>
      <div className="flex flex-col gap-2">
        {ideas.map((i) => (
          <div
            key={i.id}
            className="p-4 rounded-xl"
            style={{ background: "var(--panel)", border: "1px solid var(--line)" }}
          >
            <div className="font-medium text-[14px] mb-1">{i.title}</div>
            {i.description && (
              <div className="text-[13px] text-[var(--ink-2)] mb-2">{i.description}</div>
            )}
            <div className="text-[11px] text-[var(--ink-3)]">
              {i.source || "unknown agent"} · {i.status || "pending"}
            </div>
          </div>
        ))}
        {ideas.length === 0 && <div className="p-6 text-center text-[var(--ink-3)]">No ideas yet.</div>}
      </div>
    </div>
  );
}
