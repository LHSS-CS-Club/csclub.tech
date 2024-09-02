import { RecordModel } from "pocketbase";
import usePocketbase from "../hooks/usePocketbase"
import { useState, useEffect } from "react"
import { toast } from "sonner"

interface Project {
  title: string;
  author: string;
  description: string;
  github: string;
  demo: string;
  type: "web" | "game" | "simulation" | "mobile" | "ai" | "blockchain" | "other" | "";
}

const Projects = () => {

  const pocketbase = usePocketbase()

  const [projects, setProjects] = useState<Project[] | RecordModel[]>([
    {
      title: "Loading...",
      author: "Loading...",
      description: "Loading...",
      github: "Loading...",
      demo: "Loading...",
      type: "other"
    }
  ])
  
  const [form, setForm] = useState({
    title: '',
    description: '',
    github: '',
    demo: '',
    type: ''
  });

  useEffect(() => {
    const fetchProjects = async () => {
      const fetchedProjects = await pocketbase.collection('projects').getFullList();
      setProjects(fetchedProjects);
    };
    fetchProjects();
  }, [pocketbase])

  const onChange = (e: React.FormEvent<HTMLFormElement>) => {
    const { name, value } = e.target as HTMLInputElement;

    setForm({
      ...form,
      [name]: value
    });
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
   
    await pocketbase.collection('projects').create({
      ...form,
      author: pocketbase.authStore.model?.name
    })

    toast.success(<div>Project submitted successfully! <button className="text-blue-500 hover:underline" onClick={() => {location.reload()}}>Reload the page.</button></div>);
  }

  return (
    <div>
      <h1>Projects</h1>
      <p>Have a cool project? Submit it here! You can demo it during Project Showcase.</p>
      <h2 className="mt-8 text-2xl font-bold">Add a project</h2>
      <form 
        onSubmit={onSubmit}
        onChange={onChange}
        onBlur={onChange}
        onInvalid={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          const form = e.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
          form.setCustomValidity("");
          toast.error(`An error occured with the "${form.name}" field.`);
        }}
      >
        <div className="flex flex-col mt-4">
          <label className="text-sm font-semibold">Title</label>
          <input type="text" name="title" className="bg-neutral-800 text-neutral-100 p-2 rounded-lg mt-2" required />
        </div>
        <div className="flex flex-col mt-4">
          <label className="text-sm font-semibold">Description</label>
          <textarea name="description" className="bg-neutral-800 text-neutral-100 p-2 rounded-lg mt-2" required />
        </div>
        <div className="flex flex-col mt-4">
          <label className="text-sm font-semibold">Type</label>
          <select name="type" className="bg-neutral-800 text-neutral-100 p-2 rounded-lg mt-2" required>
            <option value="web">Web</option>
            <option value="game">Game</option>
            <option value="simulation">Simulation</option>
            <option value="mobile">Mobile</option>
            <option value="ai">AI</option>
            <option value="blockchain">Blockchain</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="flex flex-col mt-4">
          <label className="text-sm font-semibold">GitHub</label>
          <input name="github" type="url" className="bg-neutral-800 text-neutral-100 p-2 rounded-lg mt-2" required />
        </div>
        <div className="flex flex-col mt-4">
          <label className="text-sm font-semibold">Demo</label>
          <input name="demo" type="url" className="bg-neutral-800 text-neutral-100 p-2 rounded-lg mt-2" required />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-lg mt-4">Submit</button>
      </form>

      <h2 className="mt-8 text-2xl font-bold">All projects</h2>
      <div className="mt-4 grid grid-cols-2 gap-4">
        {
          projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))
        }
      </div>
    </div>
  )
}

const ProjectCard = (props: Project | RecordModel) => (
  <div className="bg-neutral-800 p-4 rounded-lg">
    <h3 className="text-lg font-semibold mb-2">{props.title}</h3>
    <p className="text-sm mb-2">by {props.author}</p>
    <p className="mb-4">{props.description}</p>
    <div className="flex justify-between items-center">
      <span className="bg-blue-500 text-white px-2 py-1 rounded-md text-sm">
        {props.type}
      </span>
      <div>
        {props.github && (
          <a href={props.github} target="_blank" rel="noopener noreferrer" className="mr-2 text-blue-400 hover:underline">
            GitHub
          </a>
        )}
        {props.demo && (
          <a href={props.demo} target="_blank" rel="noopener noreferrer" className="text-green-400 hover:underline">
            Demo
          </a>
        )}
      </div>
    </div>
  </div>
);

export default Projects