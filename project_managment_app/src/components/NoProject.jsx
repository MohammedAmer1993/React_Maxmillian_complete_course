import noProjImg from "../assets/no-projects.png";
import Button from "./Button";
export default function NoProject({ onCreate }) {
  return (
    <div className="mt-24 text-center w-2/3">
      <img
        src={noProjImg}
        alt="creating project"
        className="w-16 h-16 object-contain mx-auto"
      />
      <h2 className="text-xl font-bold text-stone-500 my-4">
        No Project Selected
      </h2>
      <p className="text-stone-400 mb-4">select a project or start a new one</p>
      <p className="mt-8">
        <Button onClick={onCreate}>Create new project</Button>
      </p>
    </div>
  );
}
