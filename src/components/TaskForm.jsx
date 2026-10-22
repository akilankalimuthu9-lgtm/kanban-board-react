import { useState } from "react";
import { X } from "lucide-react";

const initial = {
  title: "",
  description: "",
  status: "todo",
  priority: "Medium",
  tags: [],
  deadline: "",
};

export default function TaskForm({ onClose, onSubmit }) {
  const [form, setForm] = useState(initial);
  const [tagsText, setTagsText] = useState("");

  function change(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  function submit(e) {
    e.preventDefault();
    if (!form.title.trim()) return;
    onSubmit({
      ...form,
      tags: tagsText
        .split(",")
        .map((tag) => tag.trim().replace(/^#/, ""))
        .filter(Boolean),
    });
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-900/50 p-4 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-200 p-5">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Create Task</h2>
            <p className="text-sm text-slate-500">Add a new item to your board.</p>
          </div>
          <button onClick={onClose} className="rounded-lg p-2 hover:bg-slate-100">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={submit} className="space-y-4 p-5">
          <Field label="Task name">
            <input
              name="title"
              value={form.title}
              onChange={change}
              placeholder="e.g. Design login page"
              required
              className="input"
            />
          </Field>

          <Field label="Description">
            <textarea
              name="description"
              value={form.description}
              onChange={change}
              rows="4"
              placeholder="Describe the work..."
              className="input resize-none"
            />
          </Field>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Status">
              <select name="status" value={form.status} onChange={change} className="input">
                <option value="todo">To Do</option>
                <option value="in-progress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </Field>

            <Field label="Priority">
              <select name="priority" value={form.priority} onChange={change} className="input">
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </Field>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Tags (comma separated)">
              <input
                value={tagsText}
                onChange={(e) => setTagsText(e.target.value)}
                placeholder="react, ui, api"
                className="input"
              />
            </Field>

            <Field label="Deadline">
              <input
                type="date"
                name="deadline"
                value={form.deadline}
                onChange={change}
                className="input"
              />
            </Field>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold text-slate-700">{label}</span>
      {children}
    </label>
  );
}