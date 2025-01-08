import Button from "./Button";
export default function SideBar({
  onCreate,
  projects,
  onSelectProj,
  selectedId,
}) {
  const asideClasses =
    "w-1/3 px-8 py-16 bg-stone-900 text-stone-50 md:w-75 rounded-r-xl";

  const h2Classes = "mb-8 font-bold uppercase md:text-xl text-stone-200";

  return (
    <aside className={asideClasses}>
      <h2 className={h2Classes}>Project Bar</h2>
      <div>
        <Button onClick={onCreate}> + Add project</Button>
      </div>
      <ul className="mt-8">
        {projects.map((project) => {
          let cssClass =
            "w-full text-left px-2 py-1 rounded-sm my-1  hover:text-stone-200 hover:bg-stone-800";
          if (project.id === selectedId) {
            cssClass += " bg-stone-800 text-stone-200";
          } else {
            cssClass += " text-stone-400";
          }
          return (
            <li key={project.id}>
              <button
                onClick={() => onSelectProj(project.id)}
                className={cssClass}
              >
                {project.title}
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
