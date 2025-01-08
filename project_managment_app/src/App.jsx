import SideBar from "./components/SideBar";
import NewProject from "./components/NewProject";
import NoProject from "./components/NoProject";
import SelectedProject from "./components/SelectedProject";
import { useState } from "react";
function App() {
  const [projectsState, setProjectsState] = useState({
    action: null,
    projects: [],
  });
  function handleCreate() {
    setProjectsState((prev) => ({
      ...prev,
      action: "creating",
      projects: [...prev.projects],
    }));
  }
  function handleCancel() {
    setProjectsState((prev) => ({
      ...prev,
      action: null,
      projects: [...prev.projects],
    }));
  }

  function handleAddProject(project) {
    setProjectsState((prev) => {
      const tmpProj = {
        ...project,
        id: Math.random(),
      };
      return {
        action: null,
        projects: [...prev.projects, tmpProj],
      };
    });
  }

  function selectProject(id) {
    setProjectsState((prev) => {
      return {
        ...prev,
        action: id,
      };
    });
  }

  function deleteProject(id) {
    setProjectsState((prev) => {
      return {
        ...prev,
        action: null,
        projects: prev.projects.filter((project) => project.id !== id),
      };
    });
  }

  function handleAddTask(text) {
    setProjectsState((prev) => {
      const newTask = { text: text, id: Math.random() };
      const newProjects = prev.projects.filter(
        (proj) => proj.id !== prev.action
      );
      const project = prev.projects.find((proj) => proj.id === prev.action);
      const newProj = { ...project, tasks: [...project.tasks] };
      newProj.tasks.push(newTask);
      newProjects.push(newProj);
      return {
        ...prev,
        projects: newProjects,
      };
    });
  }

  function handleClearTask(id) {
    setProjectsState((prev) => {
      const newProjects = prev.projects.filter(
        (proj) => proj.id !== prev.action
      );
      const project = prev.projects.find((proj) => proj.id === prev.action);
      const projTasks = project.tasks.filter((task) => task.id !== id);
      const newProj = { ...project, tasks: [...projTasks] };
      newProjects.push(newProj);
      return {
        ...prev,
        projects: newProjects,
      };
    });
  }

  return (
    <main className="h-screen my-8 flex gap-8 ">
      <SideBar
        onCreate={handleCreate}
        projects={projectsState.projects}
        onSelectProj={selectProject}
        selectedId={projectsState.action}
      />
      {!projectsState.action ? (
        <NoProject onCreate={handleCreate} />
      ) : projectsState.action === "creating" ? (
        <NewProject onCancel={handleCancel} onAdd={handleAddProject} />
      ) : (
        <SelectedProject
          project={projectsState.projects.find(
            (project) => project.id == projectsState.action
          )}
          onDeleteProject={deleteProject}
          onAddTask={handleAddTask}
          onClearTask={handleClearTask}
        />
      )}
    </main>
  );
}

export default App;
