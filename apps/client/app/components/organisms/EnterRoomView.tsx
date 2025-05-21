"use client";
import Button from "../atoms/Button";
import Input from "../atoms/Input";
import EnterForm from "../molecules/EnterForm";

export default function EnterRoomView({ onEnter }: { onEnter: () => void }) {
  return <EnterForm onEnter={onEnter} />;
}
