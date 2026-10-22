import { useMemo, useState } from "react";
import {
  closestCorners,
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useTaskContext } from "./context/TaskContext";
import Header from "./components/Header";
import Stats from "./components/Stats";
import TaskColumn from "./components/TaskColumn";
import TaskForm from "./components/TaskForm";
import TaskModal from "./components/TaskModal";
import TaskCard from "./components/TaskCard";

export default function App() {
  const {
    tasks,
    columns,
    moveTask,
    addTask,
    updateTask,
    deleteTask,
    resetDemo,
  } = useTaskContext();

  const [search, setSearch] = useState("");
  const [activeId, setActiveId] = useState(null);
  const [modalTask, setModalTask] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } })
  );

  const filteredTasks = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return tasks;
    return tasks.filter((task) =>
      [task.title, task.description, ...(task.tags || []), task.priority]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [tasks, search]);

  const activeTask = tasks.find((task) => task.id === activeId);

  function handleDragStart(event) {
    setActiveId(event.active.id);
  }

  function handleDragEnd(event) {
    const { active, over } = event;
    setActiveId(null);
    if (!over) return;

    const targetId = over.id;
    const targetTask = tasks.find((task) => task.id === targetId);
    const targetColumn = columns.find((column) => column.id === targetId);

    if (targetTask) {
      moveTask(active.id, targetTask.status);
    } else if (targetColumn) {
      moveTask(active.id, targetColumn.id);
    }
  }

  function handleDragCancel() {
    setActiveId(null);
  }

  function handleAddTask(data) {
    addTask(data);
    setShowForm(false);
  }

  function handleEdit(task) {
    setModalTask(task);
  }

  function handleSaveTask(id, changes) {
    updateTask(id, changes);
    setModalTask((current) =>
      current && current.id === id ? { ...current, ...changes } : current
    );
  }

  return (
    <div className="min-h-screen">
      <Header
        search={search}
        setSearch={setSearch}
        onAdd={() => setShowForm(true)}
        onReset={resetDemo}
      />

      <main className="mx-auto max-w-7xl px-4 pb-10 pt-6 sm:px-6 lg:px-8">
        <Stats tasks={tasks} />

        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragCancel={handleDragCancel}
        >
          <section className="mt-6 grid gap-5 lg:grid-cols-3">
            {columns.map((column) => (
              <TaskColumn
                key={column.id}
                column={column}
                tasks={filteredTasks.filter((task) => task.status === column.id)}
                onTaskClick={setModalTask}
                onEdit={handleEdit}
                onDelete={deleteTask}
              />
            ))}
          </section>

          <DragOverlay>
            {activeTask ? <TaskCard task={activeTask} overlay /> : null}
          </DragOverlay>
        </DndContext>

        {filteredTasks.length === 0 && (
          <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
            <p className="font-semibold text-slate-700">No tasks found</p>
            <p className="mt-1 text-sm text-slate-500">
              Try a different search or create a new task.
            </p>
          </div>
        )}

        <footer className="mt-8 text-center text-xs text-slate-400">
          Kanban Board • React + TailwindCSS + Context API + localStorage + dnd-kit
        </footer>
      </main>

      {showForm && (
        <TaskForm
          onClose={() => setShowForm(false)}
          onSubmit={handleAddTask}
        />
      )}

      {modalTask && (
        <TaskModal
          task={tasks.find((task) => task.id === modalTask.id) || modalTask}
          onClose={() => setModalTask(null)}
          onSave={handleSaveTask}
          onDelete={(id) => {
            deleteTask(id);
            setModalTask(null);
          }}
        />
      )}
    </div>
  );
}