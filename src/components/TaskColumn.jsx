import { useDroppable } from "@dnd-kit/core";
import TaskCard from "./TaskCard";

export default function TaskColumn({
  column,
  tasks,
  onTaskClick,
  onEdit,
  onDelete,
}) {
  const { setNodeRef, isOver } = useDroppable({ id: column.id });

  return (
    <section
      ref={setNodeRef}
      className={`min-h-[430px] rounded-2xl border bg-slate-100/80 p-3 transition ${
        isOver
          ? "border-indigo-400 bg-indigo-50/60 ring-2 ring-indigo-100"
          : "border-slate-200"
      }`}
    >
      <div className="mb-3 flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <span className={`h-2.5 w-2.5 rounded-full ${column.color}`} />
          <h2 className="font-bold text-slate-800">{column.title}</h2>
          <span className="rounded-full bg-white px-2 py-0.5 text-xs font-semibold text-slate-500 shadow-sm">
            {tasks.length}
          </span>
        </div>
      </div>

      <div className="space-y-3">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onClick={() => onTaskClick(task)}
            onEdit={() => onEdit(task)}
            onDelete={() => onDelete(task.id)}
          />
        ))}

        {tasks.length === 0 && (
          <div className="rounded-xl border border-dashed border-slate-300 bg-white/60 p-7 text-center text-sm text-slate-400">
            Drop tasks here
          </div>
        )}
      </div>
    </section>
  );
}