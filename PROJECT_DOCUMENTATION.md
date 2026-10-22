# KANBAN BOARD — PROJECT DOCUMENTATION

## 1. Project Title

**Kanban Board — React Task Management Application**

## 2. Abstract

The Kanban Board is a responsive web-based task management application developed using React JS. It provides a visual workspace where users can create, organize, edit, delete, search, and move tasks across three workflow stages: To Do, In Progress, and Done.

The project demonstrates modern front-end development concepts including reusable React components, React Hooks, Context API, drag-and-drop interaction, responsive TailwindCSS design, and browser localStorage. Since task data is stored locally, users can refresh the application without losing their current board state.

## 3. Objectives

1. Build a practical Kanban task management interface.
2. Implement reusable React components.
3. Manage global task data with Context API.
4. Implement drag-and-drop task movement with dnd-kit.
5. Persist task information with localStorage.
6. Provide responsive UI for desktop, tablet, and mobile screens.
7. Provide task creation, editing, deletion, and details viewing.
8. Demonstrate clean project organization suitable for deployment.

## 4. Problem Statement

Traditional task lists can make it difficult to understand the current progress of work. A Kanban board provides a visual workflow by grouping tasks according to their current status. This project solves that problem by providing a simple browser-based board that can be updated through direct interaction.

## 5. Proposed Solution

The application divides tasks into three columns:

- To Do
- In Progress
- Done

A user can create a task, select its status, and later drag the task to another column. Task information is stored in React state through Context API and synchronized to localStorage with useEffect.

## 6. Main Features

### Task Management

- Create a task.
- Edit task details.
- Delete a task.
- View complete task details.
- Change task status.
- Set priority.
- Add tags.
- Add an optional deadline.

### Drag and Drop

The application uses dnd-kit to provide drag-and-drop interaction. When a task is dropped over another task or a column, its status is updated.

### Search

Users can search by title, description, tags, or priority.

### Persistence

Task state is stored in localStorage. Refreshing the browser loads the saved state.

### Responsive Design

TailwindCSS utility classes are used to create a layout that adapts to different screen sizes.

## 7. Technology Stack

| Technology | Purpose |
|---|---|
| React JS | UI development |
| Vite | Development/build tooling |
| TailwindCSS | Responsive styling |
| Context API | Global task state |
| React Hooks | State and lifecycle management |
| dnd-kit | Drag and drop |
| localStorage | Local persistence |
| Lucide React | UI icons |

## 8. Architecture

```text
                    App
                     |
              TaskProvider
                     |
          -----------------------
          |                     |
       Task State            Actions
          |                     |
     Context API        add / edit / delete
          |              move / reset
          |
     localStorage
          |
   --------------------
   |        |         |
  To Do  In Progress  Done
   |        |         |
 TaskCard TaskCard  TaskCard
```

## 9. Component Design

### App.jsx

Coordinates the board, search, drag-and-drop context, task form, and task modal.

### TaskContext.jsx

Contains the global task state and operations. It reads initial data from localStorage and writes updated data back whenever tasks change.

### Header.jsx

Provides branding, search, reset, and add-task controls.

### Stats.jsx

Displays total, To Do, In Progress, and completed task counts.

### TaskColumn.jsx

Represents one Kanban workflow column and acts as a drop zone.

### TaskCard.jsx

Displays task information and provides drag, edit, and delete controls.

### TaskForm.jsx

Collects information required to create a new task.

### TaskModal.jsx

Displays full task details and allows inline editing.

## 10. Data Model

Each task follows this structure:

```js
{
  id: "unique-id",
  title: "Task title",
  description: "Task description",
  status: "todo",
  priority: "Medium",
  tags: ["react", "ui"],
  deadline: "",
  createdAt: "ISO date"
}
```

## 11. State Management Flow

1. TaskProvider loads tasks from localStorage.
2. App and child components access tasks through Context API.
3. User performs an action.
4. Context action updates React state.
5. useEffect detects the change.
6. Updated tasks are serialized into localStorage.
7. Browser refresh restores the saved tasks.

## 12. Drag-and-Drop Flow

```text
User selects task
       ↓
dnd-kit tracks pointer movement
       ↓
User drops task on a card/column
       ↓
Target column is identified
       ↓
moveTask(id, targetStatus)
       ↓
React state updates
       ↓
localStorage updates
       ↓
UI re-renders
```

## 13. User Interface

The UI contains:

- Header
- Search bar
- Add Task button
- Statistics cards
- Three Kanban columns
- Task cards
- Create Task modal
- Task Details modal
- Responsive mobile layout

## 14. Validation

The create-task form requires a task title. Other fields are optional. Empty descriptions are supported.

## 15. Error Handling

- localStorage parsing is protected with try/catch.
- Empty search results display a helpful message.
- Invalid/missing task descriptions are displayed safely.
- Task IDs are generated using `crypto.randomUUID()` when available, with a timestamp fallback.

## 16. Testing Plan

| Test | Expected Result |
|---|---|
| Open application | Board loads |
| Add task | Task appears in selected column |
| Edit task | Updated values appear |
| Delete task | Task disappears |
| Drag To Do → Done | Status becomes Done |
| Search title | Matching task remains visible |
| Add tags | Tags appear on card |
| Refresh browser | Tasks remain |
| Reset | Demo tasks are restored |
| Mobile viewport | Layout remains usable |

## 17. Deployment

### GitHub

The complete source code can be stored in a public GitHub repository.

Recommended repository name:

`kanban-board-react`

### Netlify

Recommended settings:

- Build command: `npm run build`
- Publish directory: `dist`

No server or external API is required.

## 18. Advantages

- Simple and intuitive interface.
- No backend dependency.
- Fast local interaction.
- Persistent browser storage.
- Reusable React architecture.
- Responsive design.
- Drag-and-drop workflow.
- Easy to deploy.

## 19. Limitations

- Data is stored only in the user's browser.
- There is no multi-user synchronization.
- Clearing browser storage removes saved tasks.
- No authentication is included.
- No cloud database is required for this assessment.

## 20. Future Enhancements

- User authentication.
- Cloud database integration.
- Multi-user collaboration.
- Task comments.
- File attachments.
- Notifications.
- Calendar integration.
- Advanced filtering.
- Dark mode.
- Team/workspace support.

## 21. Conclusion

The Kanban Board demonstrates how React can be used to build a practical task management application. The project combines component-based UI development, Context API state management, Hooks, drag-and-drop interaction, TailwindCSS responsive styling, and localStorage persistence. The resulting application is lightweight, responsive, and suitable for deployment as a front-end project.

## 22. Submission Checklist

Before submission:

- Verify the application locally.
- Run `npm run build`.
- Push the project to a public GitHub repository.
- Deploy the same repository to Netlify.
- Test the live URL.
- Submit the GitHub URL and Netlify URL in the required portal.
