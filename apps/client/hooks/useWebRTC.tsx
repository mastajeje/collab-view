import { useSocketStore } from "@/stores/socketStore";
import { useEffect, useRef } from "react";

export const useWebRTC = (roomId: string) => {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const peerRef = useRef<RTCPeerConnection | null>(null);
  // const socket =
  const socket = useSocketStore.getState().socket;
  const pendingCandidates: RTCIceCandidate[] = [];

  const startCall = async () => {
    if (!socket) return;
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });

    if (localVideoRef.current) localVideoRef.current.srcObject = stream;

    peerRef.current = new RTCPeerConnection();

    //local track 추가
    stream
      .getTracks()
      .forEach((track) => peerRef.current!.addTrack(track, stream));

    // ICE candidate 전송
    peerRef.current.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("ice-candidate", { roomId, candidate: event.candidate });
      }
    };

    // remote stream 수신
    peerRef.current.ontrack = (event) => {
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = event.streams[0];
      }
    };

    const offer = await peerRef.current.createOffer();
    await peerRef.current.setLocalDescription(offer);
    socket.emit("offer", { roomId, offer });
  };

  useEffect(() => {
    if (!socket) return;

    const handleOffer = async ({
      offer,
    }: {
      offer: RTCSessionDescriptionInit;
    }) => {
      const peer = new RTCPeerConnection();
      peerRef.current = peer;

      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      stream.getTracks().forEach((track) => peer.addTrack(track, stream));
      if (localVideoRef.current) localVideoRef.current.srcObject = stream;

      peer.ontrack = (event) => {
        if (remoteVideoRef.current)
          remoteVideoRef.current.srcObject = event.streams[0];
      };

      await peer.setRemoteDescription(new RTCSessionDescription(offer));
      // 대기중인 candidate 추가
      pendingCandidates.forEach((candidate) => peer.addIceCandidate(candidate));
      pendingCandidates.length = 0;
      const answer = await peer.createAnswer();
      await peer.setLocalDescription(answer);
      socket.emit("answer", { roomId, answer });
    };

    const handleAnswer = async ({
      answer,
    }: {
      answer: RTCSessionDescriptionInit;
    }) => {
      try {
        if (peerRef.current && peerRef.current.signalingState !== "stable") {
          await peerRef.current.setRemoteDescription(
            new RTCSessionDescription(answer),
          );
        }
      } catch (e) {
        console.warn("Failed to set remote answer SDP:", e);
      }
    };

    const handleIceCandidate = ({
      candidate,
    }: {
      candidate: RTCIceCandidateInit;
    }) => {
      const iceCandidate = new RTCIceCandidate(candidate);
      if (peerRef.current?.remoteDescription) {
        peerRef.current.addIceCandidate(iceCandidate);
      } else {
        pendingCandidates.push(iceCandidate);
      }
    };

    socket.on("offer", handleOffer);

    socket.on("answer", handleAnswer);

    socket.on("ice-candidate", handleIceCandidate);

    return () => {
      socket.off("offer", handleOffer);
      socket.off("answer", handleAnswer);
      socket.off("ice-candidate", handleIceCandidate);
    };
  }, [socket]);

  return {
    startCall,
    localVideoRef,
    remoteVideoRef,
  };
};
