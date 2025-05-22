// "use client";

// import { useEffect } from "react";
// import { log } from "comm-utils";
// // import { socket } from "@/sockets";
// import { useSocketStore } from "../stores/socketStore";
// import { JOIN } from "@shared/dist";
// // import {socket} from "@/sockets";

// export default function RoomPage() {
//   const { socket, connect, isConnected, onEvents } = useSocketStore();

//   useEffect(() => {
//     connect();
//     // };
//   }, []);

//   useEffect(() => {
//     if (isConnected && socket) {
//       onEvents();
//       socket.emit(JOIN, { roomId: "123", userName: "test" });
//     }
//   }, [isConnected]);

//   const handleTest = () => {
//     if (socket) {
//       socket.emit("test", { text: "test text" }, (response) => {
//         console.log("Test event response:", response);
//       });
//     } else {
//       console.log("Socket is null");
//     }
//   };

//   return (
//     <div>
//       <div>Room</div>
//       <button onClick={handleTest}>test</button>
//     </div>
//   );
// }
export default function Page() {
  return <div>RoomPage</div>;
}
