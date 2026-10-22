import { CheckCircle2, Circle, Clock3, ListTodo } from "lucide-react";

export default function Stats({ tasks }) {
  const todo = tasks.filter((t) => t.status === "todo").length;
  const progress = tasks.filter((t) => t.status === "in-progress").length;
  const done = tasks.filter((t) => t.status === "done").length;

  const stats = [
    { label: "Total", value: tasks.length, icon: ListTodo },
    { label: "To Do", value: todo, icon: Circle },
    { label: "In Progress", value: progress, icon: Clock3 },
    { label: "Completed", value: done, icon: CheckCircle2 },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {stats.map(({ label, value, icon: Icon }) => (
        <div
          key={label}
          className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">{label}</span>
            <Icon size={18} className="text-slate-400" />
          </div>
          <p className="mt-2 text-2xl font-bold text-slate-900">{value}</p>
        </div>
      ))}
    </div>
  );
}