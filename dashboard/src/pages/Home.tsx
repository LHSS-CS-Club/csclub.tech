import { useEffect, useState } from "react";
import usePocketbase from "../hooks/usePocketbase";

const Home = () => {
  const pocketbase = usePocketbase();

  const [numUsers, setNumUsers] = useState(0);
  const [numLessons, setNumLessons] = useState(0);
  const [numProjects, setNumProjects] = useState(0);

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await pocketbase.collection('users').getFullList();
      setNumUsers(users.length);
    };
    fetchUsers();

    const fetchLessons = async () => {
      const lessons = await pocketbase.collection('lessons').getFullList();
      setNumLessons(lessons.length);
    };
    fetchLessons();

    const fetchProjects = async () => {
      const projects = await pocketbase.collection('projects').getFullList();
      setNumProjects(projects.length);
    };
    fetchProjects();
  }, [pocketbase]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Welcome</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardCard title="Members" value={numUsers} />
        <DashboardCard title="Lessons" value={numLessons} />
        <DashboardCard title="Projects" value={numProjects} />
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Recent Activity</h2>
        <ActivityFeed />
      </div>
    </div>
  );
};

interface DashboardCardProps {
  title: string;
  value: string | number;
}

const DashboardCard = ({ title, value }: DashboardCardProps) => (
  <div className="bg-neutral-800 p-4 rounded-lg">
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-3xl font-bold">{value}</p>
  </div>
);

const ActivityFeed = () => (
  <ul className="space-y-4">
    <li className="bg-neutral-800 p-4 rounded-lg">
      <p className="font-semibold">New member joined</p>
      <p className="text-sm text-neutral-400">2 hours ago</p>
    </li>
    <li className="bg-neutral-800 p-4 rounded-lg">
      <p className="font-semibold">Project "Web Dev 101" created</p>
      <p className="text-sm text-neutral-400">1 day ago</p>
    </li>
  </ul>
);

export default Home;
