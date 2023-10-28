import { Metadata } from "next";
import Container from "./components/Container";

export const metadata: Metadata = {
  title: "Main page",
};

const Home = () => {
  return (
    <Container>
      <main className="flex justify-center items-center"></main>
    </Container>
  );
};

export default Home;
