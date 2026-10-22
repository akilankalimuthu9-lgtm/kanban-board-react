import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Edit3, GripVertical, Trash2 } from "lucide-react";

const priorityClasses = {
  High: "bg-rose-50 text-rose-700 ring-rose-200",
  Medium: "bg-amber-50 text-amber-700 ring-amber-200",
  Low: "bg-emerald-50 text-emerald-700 ring-emerald-200",
};

export default function TaskCard({
  task,
  onClick,
  onEdit,
  onDelete,
  overlay = false,
}) {
  const sortable = useSortable({ id: task.id });
  const style = {
    transform: CSS.Transform.toString(sortable.transform),
    transition: sortable.transition,
  };

  const setRefs = (node) => {
    sortable.setNodeRef(node);
  };

  if (overlay) {
    return (
      <article className="w-[min(360px,90vw)] rotate-1 rounded-xl border border-indigo-200 bg-white p-4 shadow-2xl">
        <p className="font-bold text-slate-900">{task.title}</p>
        <p className="mt-1 line-clamp-2 text-sm text-slate-500">{task.description}</p>
      </article>
    );
  }

  return (
    <article
      ref={setRefs}
      style={style}
      {...sortable.attributes}
      className={`group rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${
        sortable.isDragging ? "opacity-40" : ""
      }`}
      onClick={onClick}
    >
      <div className="flex items-start gap-2">
        <button
          type="button"
          aria-label="Drag task"
          {...sortable.listeners}
          onClick={(e) => e.stopPropagation()}
          className="mt-0.5 shrink-0 rounded p-1 text-slate-300 hover:bg-slate-100 hover:text-slate-500"
        >
          <GripVertical size={18} />
        </button>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold leading-5 text-slate-900">{task.title}</h3>
            <span
              className={`shrink-0 rounded-full px-2 py-1 text-[10px] font-bold uppercase ring-1 ${
                priorityClasses[task.priority] || priorityClasses.Medium
              }`}
            >
              {task.priority}
            </span>
          </div>

          <p className="mt-2 line-clamp-2 text-sm leading-5 text-slate-500">
            {task.description || "No description"}
          </p>

          {task.tags?.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {task.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md bg-slate-100 px-2 py-1 text-[11px] font-medium text-slate-600"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          <div className="mt-3 flex justify-end gap-1 opacity-100 sm:opacity-0 sm:transition group-hover:opacity-100">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit?.();
              }}
              className="rounded-lg p-2 text-slate-400 hover:bg-indigo-50 hover:text-indigo-600"
              title="Edit task"
            >
              <Edit3 size={15} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete?.();
              }}
              className="rounded-lg p-2 text-slate-400 hover:bg-rose-50 hover:text-rose-600"
              title="Delete task"
            >
              <Trash2 size={15} />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}