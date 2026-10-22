# Kanban Board

A responsive Kanban-style task management application built with React JS.

## Features

- To Do, In Progress, and Done columns
- Create tasks with title, description, status, priority, tags, and deadline
- Edit tasks from the task card or details modal
- Delete tasks
- Drag and drop tasks between columns using dnd-kit
- Search/filter tasks
- Task details modal with inline editing
- localStorage persistence
- Responsive TailwindCSS layout
- Reset sample data button

## Tech Stack

- React JS
- Vite
- TailwindCSS
- React Hooks
- Context API
- @dnd-kit/core
- @dnd-kit/sortable
- localStorage
- Lucide React icons

## Run Locally

Requirements: Node.js 18+ recommended.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

For production:

```bash
npm run build
npm run preview
```

## Netlify Deployment

1. Push this project to a public GitHub repository.
2. In Netlify choose **Add new project → Import an existing project**.
3. Select the GitHub repository.
4. Build command: `npm run build`
5. Publish directory: `dist`
6. Deploy.

No environment variables or backend are required.

## GitHub

Suggested repository name:

`kanban-board-react`

Do not commit `node_modules` or `dist`.

## Project Structure

```text
kanban-board/
├── public/
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Stats.jsx
│   │   ├── TaskCard.jsx
│   │   ├── TaskColumn.jsx
│   │   ├── TaskForm.jsx
│   │   └── TaskModal.jsx
│   ├── context/
│   │   └── TaskContext.jsx
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## Submission Checklist

- [ ] `npm install` works
- [ ] `npm run build` succeeds
- [ ] Application works in browser
- [ ] Drag/drop works
- [ ] Add/edit/delete works
- [ ] Refresh keeps tasks
- [ ] GitHub repository is public
- [ ] Netlify deployment is live
- [ ] Submit both URLs in the assessment portal
