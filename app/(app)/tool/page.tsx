import Link from "next/link";

export default function ToolDashboard() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
          <p className="mt-1 text-neutral-600">Create a new overlay project.</p>
        </div>
        <Link href="/tool/new" className="rounded-xl bg-black text-white px-5 py-3">
          New project
        </Link>
      </div>

      <div className="mt-8 rounded-2xl border bg-white p-6">
        <div className="text-sm text-neutral-600">MVP</div>
        <div className="mt-2 font-medium">Projects list can be added next.</div>
      </div>
    </div>
  );
}
