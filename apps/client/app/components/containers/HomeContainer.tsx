"use client";

import { useRouter } from "next/navigation";
import EnterRoomView from "../organisms/EnterRoomView";

export default function HomeContainer() {
  const router = useRouter();

  const handleEnter = () => {
    router.push("/room");
  };

  return <EnterRoomView onEnter={handleEnter} />;
}
