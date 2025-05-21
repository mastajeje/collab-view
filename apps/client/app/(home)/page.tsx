import Image from "next/image";
import HomeContainer from "../components/containers/HomeContainer";

export default function Home() {
  return (
    <main className="flex h-full items-center justify-center bg-gray-100">
      <div className="rounded-md bg-white p-4">
        <div className="text-center text-2xl font-bold">Collab View</div>
        <HomeContainer />
      </div>
    </main>
  );
}
