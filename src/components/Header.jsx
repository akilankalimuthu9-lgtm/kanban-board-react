import { Plus, RotateCcw, Search, Trello } from "lucide-react";

export default function Header({ search, setSearch, onAdd, onReset }) {
  return (
    <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <div className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-xl bg-indigo-600 text-white shadow-sm">
            <Trello size={22} />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900">
              Kanban Board
            </h1>
            <p className="text-xs text-slate-500">
              Organize work, move tasks, stay productive
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <label className="relative">
            <Search
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search tasks..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 text-sm outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100 sm:w-56"
            />
          </label>
          <button
            onClick={onReset}
            title="Restore sample tasks"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
          >
            <RotateCcw size={16} />
            Reset
          </button>
          <button
            onClick={onAdd}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700"
          >
            <Plus size={17} />
            Add Task
          </button>
        </div>
      </div>
    </header>
  );
}