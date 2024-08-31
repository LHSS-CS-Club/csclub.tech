import usePocketbase from "../hooks/usePocketbase"
import { useState } from "react"

interface Project {
  title: string;
  author: string;
  description: string;
  github: string;
  demo: string;
  type: "web" | "game" | "simulation" | "mobile" | "ai" | "blockchain"
}

const Projects = () => {

  const pocketbase = usePocketbase()

  const [projects, setProjects] = useState<Project[]>([
    {
      title: "Pocketbase",
      author: "Pocketbase Team",
      description: "A no-code platform for building web and mobile apps.",
      github: "asd",
      demo: "asd",
      type: "web"
    }
  ])

  return (
    <div>
      <h1>Projects</h1>
      <p>Have a cool project? Submit it here! You can demo it during Project Showcase.</p>

      <div className="mt-4 grid grid-cols-2">
        {
          projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))
        }
      </div>
    </div>
  )
}

const ProjectCard = (props: Project) => (
  <div className="bg-neutral-800 p-4 rounded-lg">
    <h3 className="text-lg font-semibold mb-2">{props.title}</h3>
    <p className="text-sm mb-2">by {props.author}</p>
    <p className="mb-4">{props.description}</p>
    <div className="flex justify-between items-center mb-4">
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