import { useEffect, useState } from "react";
import { Save, Trash2, X } from "lucide-react";

export default function TaskModal({ task, onClose, onSave, onDelete }) {
  const [form, setForm] = useState(task);

  useEffect(() => setForm(task), [task]);

  function change(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  function save() {
    onSave(task.id, {
      title: form.title.trim(),
      description: form.description.trim(),
      status: form.status,
      priority: form.priority,
      deadline: form.deadline,
      tags:
        typeof form.tags === "string"
          ? form.tags.split(",").map((x) => x.trim()).filter(Boolean)
          : form.tags,
    });
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-900/50 p-4 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-200 p-5">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Task Details</h2>
            <p className="text-sm text-slate-500">View and edit task information.</p>
          </div>
          <button onClick={onClose} className="rounded-lg p-2 hover:bg-slate-100">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4 p-5">
          <label className="block">
            <span className="label">Task name</span>
            <input name="title" value={form.title} onChange={change} className="input" />
          </label>

          <label className="block">
            <span className="label">Description</span>
            <textarea
              name="description"
              value={form.description}
              onChange={change}
              rows="6"
              className="input resize-none"
            />
          </label>

          <div className="grid gap-4 sm:grid-cols-3">
            <label>
              <span className="label">Status</span>
              <select name="status" value={form.status} onChange={change} className="input">
                <option value="todo">To Do</option>
                <option value="in-progress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </label>

            <label>
              <span className="label">Priority</span>
              <select name="priority" value={form.priority} onChange={change} className="input">
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </label>

            <label>
              <span className="label">Deadline</span>
              <input
                type="date"
                name="deadline"
                value={form.deadline || ""}
                onChange={change}
                className="input"
              />
            </label>
          </div>

          <label className="block">
            <span className="label">Tags</span>
            <input
              value={(form.tags || []).join(", ")}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  tags: e.target.value.split(",").map((x) => x.trim()).filter(Boolean),
                }))
              }
              className="input"
              placeholder="react, frontend"
            />
          </label>

          <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-between">
            <button
              onClick={() => onDelete(task.id)}
              className="inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-rose-600 hover:bg-rose-50"
            >
              <Trash2 size={16} />
              Delete
            </button>

            <div className="flex justify-end gap-2">
              <button onClick={onClose} className="btn-secondary">
                Cancel
              </button>
              <button onClick={save} className="btn-primary">
                <Save size={16} />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}