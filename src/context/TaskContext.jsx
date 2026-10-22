import { createContext, useContext, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "kanban-board-tasks-v1";

const defaultColumns = [
  { id: "todo", title: "To Do", color: "bg-sky-500" },
  { id: "in-progress", title: "In Progress", color: "bg-amber-500" },
  { id: "done", title: "Done", color: "bg-emerald-500" },
];

const demoTasks = [
  {
    id: "task-1",
    title: "Plan project structure",
    description: "Define components, folders, routes, and the state model.",
    status: "todo",
    priority: "High",
    tags: ["planning", "react"],
    deadline: "",
    createdAt: "2026-10-01T09:00:00.000Z",
  },
  {
    id: "task-2",
    title: "Build responsive dashboard",
    description: "Create the board layout and make it work on mobile, tablet, and desktop.",
    status: "in-progress",
    priority: "Medium",
    tags: ["ui", "tailwind"],
    deadline: "",
    createdAt: "2026-10-02T09:00:00.000Z",
  },
  {
    id: "task-3",
    title: "Add localStorage persistence",
    description: "Persist task changes so the board survives a page refresh.",
    status: "done",
    priority: "Medium",
    tags: ["storage"],
    deadline: "",
    createdAt: "2026-10-03T09:00:00.000Z",
  },
];

const TaskContext = createContext(null);

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : demoTasks;
    } catch {
      return demoTasks;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (taskData) => {
    const newTask = {
      id: crypto.randomUUID ? crypto.randomUUID() : `task-${Date.now()}`,
      title: taskData.title.trim(),
      description: taskData.description.trim(),
      status: taskData.status,
      priority: taskData.priority,
      tags: taskData.tags,
      deadline: taskData.deadline || "",
      createdAt: new Date().toISOString(),
    };
    setTasks((current) => [newTask, ...current]);
  };

  const updateTask = (id, changes) => {
    setTasks((current) =>
      current.map((task) => (task.id === id ? { ...task, ...changes } : task))
    );
  };

  const deleteTask = (id) => {
    setTasks((current) => current.filter((task) => task.id !== id));
  };

  const moveTask = (id, status) => {
    updateTask(id, { status });
  };

  const resetDemo = () => {
    setTasks(demoTasks);
  };

  const value = useMemo(
    () => ({
      tasks,
      columns: defaultColumns,
      addTask,
      updateTask,
      deleteTask,
      moveTask,
      resetDemo,
    }),
    [tasks]
  );

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

export function useTaskContext() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext must be used inside TaskProvider");
  }
  return context;
}