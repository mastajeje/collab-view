"use client";

import { useRouter } from "next/navigation";
import EnterRoomView from "../../../components/organisms/EnterRoomView";
import { generateRoomId } from "@/app/lib/room";
export default function HomeContainer() {
  const router = useRouter();

  const handleEnter = () => {
    const roomId = generateRoomId();
    const username = "test";

    router.push(`/room/${roomId}?username=${username}`);
  };

  return <EnterRoomView onEnter={handleEnter} />;
}
