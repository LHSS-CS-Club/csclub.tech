import usePocketbase from "../hooks/usePocketbase";

const Home = () => {
  const { authStore } = usePocketbase();

  return <div>Home</div>;
};

export default Home;
