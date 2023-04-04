// import React, { useEffect, useRef, useState } from "react";
// import io from "socket.io-client";
// import Peer from "peerjs";
// import "./Videoroom.css";

// const VideoRoom = () => {
//   const [peers, setPeers] = useState([]);
//   const socketRef = useRef();
//   const userVideoRef = useRef();
//   const peersRef = useRef([]);
//   const roomID = "your-room-id"; // Replace this with a dynamic room ID

//   useEffect(() => {
//     socketRef.current = io.connect("/");
//     navigator.mediaDevices
//       .getUserMedia({ video: true, audio: true })
//       .then((stream) => {
//         userVideoRef.current.srcObject = stream;

//         socketRef.current.emit("join room", roomID);

//         socketRef.current.on("all users", (users) => {
//           const peers = [];
//           users.forEach((userID) => {
//             const peer = createPeer(userID, socketRef.current.id, stream);
//             peersRef.current.push({
//               peerID: userID,
//               peer,
//             });
//             peers.push(peer);
//           });
//           setPeers(peers);
//         });

//         socketRef.current.on("user joined", (payload) => {
//           const peer = addPeer(payload.signal, payload.callerID, stream);
//           peersRef.current.push({
//             peerID: payload.callerID,
//             peer,
//           });

//           setPeers((users) => [...users, peer]);
//         });

//         socketRef.current.on("receiving returned signal", (payload) => {
//           const item = peersRef.current.find((p) => p.peerID === payload.id);
//           item.peer.signal(payload.signal);
//         });
//       });
//   }, []);

//   function createPeer(userID, caller, stream) {
//     const peer = new Peer({
//       initiator: true,
//       trickle: false,
//       stream,
//     });

//     peer.on("signal", (signal) => {
//       socketRef.current.emit("sending signal", { userID, caller, signal });
//     });

//     return peer;
//   }

//   function addPeer(incomingSignal, callerID, stream) {
//     const peer = new Peer({
//       initiator: false,
//       trickle: false,
//       stream,
//     });

//     peer.on("signal", (signal) => {
//       socketRef.current.emit("returning signal", { signal, callerID });
//     });

//     peer.signal(incomingSignal);

//     return peer;
//   }

//   return (
//     <div>
//       <video ref={userVideoRef} autoPlay muted />
//       {peers.map((peer, index) => {
//         return <Video key={index} peer={peer} />;
//       })}
//     </div>
//   );
// };

// const Video = ({ peer }) => {
//   const ref = useRef();

//   useEffect(() => {
//     peer.on("stream", (stream) => {
//       ref.current.srcObject = stream;
//     });
//   }, [peer]);

//   return <video playsInline autoPlay ref={ref} />;
// };

// export default VideoRoom;

//////////////////////////////////////////////////////////////////////

// import React, { useEffect, useRef, useState } from "react";
// import io from "socket.io-client";
// import Peer from "simple-peer";
// import "./Videoroom.css";

// const Video = ({ peer }) => {
//   const ref = useRef();

//   useEffect(() => {
//     peer.on("stream", (stream) => {
//       ref.current.srcObject = stream;
//     });
//   }, [peer]);

//   return <video className="peerVideo" autoPlay playsInline ref={ref} />;
// };

// const VideoRoom = () => {
//   const [peers, setPeers] = useState([]);
//   const socketRef = useRef();
//   const userVideoRef = useRef();

//   useEffect(() => {
//     socketRef.current = io.connect("/");
//     const roomID = "jokes-room";

//     navigator.mediaDevices
//       .getUserMedia({ video: true, audio: true })
//       .then((stream) => {
//         userVideoRef.current.srcObject = stream;

//         socketRef.current.emit("join room", roomID);

//         socketRef.current.on("all users", (users) => {
//           const peers = users.map((userID) => {
//             const peer = new Peer({ initiator: true, trickle: false, stream });
//             peer.on("signal", (data) => {
//               socketRef.current.emit("sending signal", {
//                 userToSignal: userID,
//                 signal: data,
//               });
//             });
//             return peer;
//           });

//           setPeers(peers);
//         });

//         socketRef.current.on("user joined", (data) => {
//           const peer = new Peer({ initiator: false, trickle: false, stream });
//           peer.on("signal", (signal) => {
//             socketRef.current.emit("returning signal", { signal, id: data.id });
//           });
//           peer.signal(data.signal);
//           setPeers((oldPeers) => [...oldPeers, peer]);
//         });

//         socketRef.current.on("receiving returned signal", (data) => {
//           const peer = peers.find((peer) => peer.peerID === data.id);
//           if (peer) {
//             peer.signal(data.signal);
//           }
//         });
//       });

//     return () => {
//       socketRef.current.disconnect();
//       peers.forEach((peer) => peer.destroy());
//     };
//   }, [peers]);

//   return (
//     <div className="container">
//       <video
//         className="userVideo"
//         autoPlay
//         playsInline
//         muted
//         ref={userVideoRef}
//       />
//       {peers.map((peer, index) => (
//         <Video key={index} peer={peer} />
//       ))}
//     </div>
//   );
// };

// export default VideoRoom;

////////////////////////////////////////////////////////////////////////////

// import React, { useEffect, useRef, useState } from "react";
// import io from "socket.io-client";
// import Peer from "simple-peer";
// import "./Videoroom.css";

// const Video = ({ peer }) => {
//   const ref = useRef();

//   useEffect(() => {
//     peer.on("stream", (stream) => {
//       ref.current.srcObject = stream;
//     });
//   }, [peer]);

//   return <video className="peerVideo" autoPlay playsInline ref={ref} />;
// };

// const VideoRoom = () => {
//   const [peers, setPeers] = useState([]);
//   const socketRef = useRef();
//   const userVideoRef = useRef();
//   const peersRef = useRef([]);
//   const roomID = "jokes-room";

//   useEffect(() => {
//     socketRef.current = io.connect("/");
//     navigator.mediaDevices
//       .getUserMedia({ video: true, audio: true })
//       .then((stream) => {
//         userVideoRef.current.srcObject = stream;

//         socketRef.current.emit("join room", roomID);

//         socketRef.current.on("all users", (users) => {
//           const peers = users.map((userID) => {
//             const peer = createPeer(userID, socketRef.current.id, stream);
//             peersRef.current.push({ peerID: userID, peer });
//             return peer;
//           });
//           setPeers(peers);
//         });

//         socketRef.current.on("user joined", (payload) => {
//           const peer = addPeer(payload.signal, payload.callerID, stream);
//           peersRef.current.push({ peerID: payload.callerID, peer });
//           setPeers((users) => [...users, peer]);
//         });

//         socketRef.current.on("receiving returned signal", (payload) => {
//           const item = peersRef.current.find((p) => p.peerID === payload.id);
//           item.peer.signal(payload.signal);
//         });

//         socketRef.current.on("user left", (id) => {
//           const peerObj = peersRef.current.find((p) => p.peerID === id);
//           if (peerObj) {
//             peerObj.peer.destroy();
//           }
//           const peers = peersRef.current.filter((p) => p.peerID !== id);
//           peersRef.current = peers;
//           setPeers(peers);
//         });
//       });
//   }, []);

//   function createPeer(userToSignal, callerID, stream) {
//     const peer = new Peer({
//       initiator: true,
//       trickle: false,
//       stream,
//     });

//     peer.on("signal", (signal) => {
//       socketRef.current.emit("sending signal", {
//         userToSignal,
//         callerID,
//         signal,
//       });
//     });

//     return peer;
//   }

//   function addPeer(incomingSignal, callerID, stream) {
//     const peer = new Peer({
//       initiator: false,
//       trickle: false,
//       stream,
//     });

//     peer.on("signal", (signal) => {
//       socketRef.current.emit("returning signal", { signal, callerID });
//     });

//     peer.signal(incomingSignal);

//     return peer;
//   }

//   return (
//     <div className="video-container">
//       <video
//         className="userVideo"
//         muted
//         autoPlay
//         playsInline
//         ref={userVideoRef}
//       />
//       {peers.map((peer, index) => (
//         <Video key={index} peer={peer} />
//       ))}
//     </div>
//   );
// };

// export default VideoRoom;

//////////////////////////////////////////////////////////////////////////////////

// import React, { useEffect, useRef, useState } from "react";
// import io from "socket.io-client";
// import Peer from "simple-peer";
// import "./Videoroom.css";

// const Video = ({ peer }) => {
//   const ref = useRef();

//   useEffect(() => {
//     peer.on("stream", (stream) => {
//       ref.current.srcObject = stream;
//     });
//   }, [peer]);

//   return <video className="peerVideo" autoPlay playsInline ref={ref} />;
// };

// const VideoRoom = () => {
//   const [peers, setPeers] = useState([]);
//   const [audience, setAudience] = useState([]);
//   const [hostRequests, setHostRequests] = useState([]);
//   const [host, setHost] = useState(null);
//   const socketRef = useRef();
//   const userVideoRef = useRef();
//   const peersRef = useRef([]);
//   const roomID = "jokes-room";

//   useEffect(() => {
//     socketRef.current = io.connect("/");
//     navigator.mediaDevices
//       .getUserMedia({ video: true, audio: true })
//       .then((stream) => {
//         userVideoRef.current.srcObject = stream;

//         socketRef.current.emit("join room", roomID);

//         socketRef.current.on("all users", (users) => {
//             const peers = users.map((userID) => {
//               const peer = createPeer(userID, socketRef.current.id, stream);
//               peersRef.current.push({ peerID: userID, peer });
//               return peer;
//             });
//             setPeers(peers);
//           });

//           socketRef.current.on("user joined", (payload) => {
//             const peer = addPeer(payload.signal, payload.callerID, stream);
//             peersRef.current.push({ peerID: payload.callerID, peer });
//             setPeers((users) => [...users, peer]);
//           });

//           socketRef.current.on("receiving returned signal", (payload) => {
//             const item = peersRef.current.find((p) => p.peerID === payload.id);
//             item.peer.signal(payload.signal);
//           });

//           socketRef.current.on("user left", (id) => {
//             const peerObj = peersRef.current.find((p) => p.peerID === id);
//             if (peerObj) {
//               peerObj.peer.destroy();
//             }
//             const peers = peersRef.current.filter((p) => p.peerID !== id);
//             peersRef.current = peers;
//             setPeers(peers);
//           });

//           socketRef.current.on("update audience", (audienceList) => {
//             setAudience(audienceList);
//           });

//           socketRef.current.on("update host requests", (requests) => {
//             setHostRequests(requests);
//           });

//           socketRef.current.on("update host", (newHost) => {
//             setHost(newHost);
//           });
//           const handleHostRequest = () => {
//             socketRef.current.emit("host request");
//           };

//           const acceptNextHost = () => {
//             if (hostRequests.length > 0) {
//               const nextHost = hostRequests.shift();
//               setHost(nextHost);
//               setHostRequests([...hostRequests]);
//               socketRef.current.emit("accept host", nextHost);
//             }
//           };
//           return (
//             <div className="video-container">
//               <video
//                 className="userVideo"
//                 muted
//                 autoPlay
//                 playsInline
//                 ref={userVideoRef}
//               />
//               {peers.map((peer, index) => (
//                 <Video key={index} peer={peer} />
//               ))}
//                  <div className="audience-container">
//       {audience.map((member, index) => (
//         <div className="audience-member" key={index}>
//           {member.name}
//         </div>
//       ))}
//     </div>
//     <button onClick={handleHostRequest}>Request to be Host</button>
//     {host === socketRef.current.id && (
//       <button onClick={acceptNextHost}>Accept Next Host</button>
//     )}

//     </div>
//  );
// });

//  export default VideoRoom;

////////////////////////////////////////////////////////////////////////////////

// import React, { useEffect, useRef, useState } from "react";
// import io from "socket.io-client";
// import Peer from "simple-peer";
// import "./Videoroom.css";

// const Video = ({ peer }) => {
//   const ref = useRef();

//   useEffect(() => {
//     peer.on("stream", (stream) => {
//       ref.current.srcObject = stream;
//     });
//   }, [peer]);

//   return <video className="peerVideo" autoPlay playsInline ref={ref} />;
// };

// const VideoContainer = ({ peers, userVideoRef, audience, handleHostRequest, host, acceptNextHost }) => {
//   return (
//     <div className="video-container">
//       <video className="userVideo" muted autoPlay playsInline ref={userVideoRef} />
//       {peers.map((peer, index) => (
//         <Video key={index} peer={peer} />
//       ))}
//       <div className="audience-container">
//         {audience.map((member, index) => (
//           <div className="audience-member" key={index}>
//             {member.name}
//           </div>
//         ))}
//       </div>
//       <button onClick={handleHostRequest}>Request to be Host</button>
//       {host === socketRef.current.id && (
//         <button onClick={acceptNextHost}>Accept Next Host</button>
//       )}
//     </div>
//   );
// };

// const VideoRoom = () => {
//   const [peers, setPeers] = useState([]);
//   const [audience, setAudience] = useState([]);
//   const [hostRequests, setHostRequests] = useState([]);
//   const [host, setHost] = useState(null);
//   const socketRef = useRef();
//   const userVideoRef = useRef();
//   const peersRef = useRef([]);
//   const roomID = "jokes-room";

//   const createPeer = (userToSignal, callerID, stream) => {
//     const peer = new Peer({
//       initiator: true,
//       trickle: false,
//       stream,
//     });

//     peer.on("signal", (signal) => {
//       socketRef.current.emit("sending signal", {
//         userToSignal,
//         callerID,
//         signal,
//       });
//     });

//     return peer;
//   };

//   const addPeer = (incomingSignal, callerID, stream) => {
//     const peer = new Peer({
//       initiator: false,
//       trickle: false,
//       stream,
//     });

//     peer.on("signal", (signal) => {
//       socketRef.current.emit("returning signal", { signal, callerID });
//     });

//     peer.signal(incomingSignal);

//     return peer;
//   };

//   useEffect(() => {
//     socketRef.current = io.connect("/");
//     navigator.mediaDevices
//       .getUserMedia({ video: true, audio: true })
//       .then((stream) => {
//         userVideoRef.current.srcObject = stream;

//         socketRef.current.emit("join room", roomID);

//         socketRef.current.on("all users", (users) => {
//           const peers = users.map((userID) => {
//             const peer = createPeer(userID, socketRef.current.id, stream);
//             peersRef.current.push({ peerID: userID, peer });
//             return peer;
//           });
//           setPeers(peers);
//         });

//         socketRef.current.on("user joined", (payload) => {
//             const peer = addPeer(payload.signal, payload.callerID, stream);
//             peersRef.current.push({ peerID: payload.callerID, peer });
//             setPeers((users) => [...users, peer]);
//           });

//           socketRef.current.on("receiving returned signal", (payload) => {
//             const item = peersRef.current.find((p) => p.peerID === payload.id);
//             item.peer.signal(payload.signal);
//           });

//           socketRef.current.on("user left", (id) => {
//             const peerObj = peersRef.current.find((p) => p.peerID === id);
//             if (peerObj) {
//               peerObj.peer.destroy();
//             }
//             const peers = peersRef.current.filter((p) => p.peerID !== id);
//             peersRef.current = peers;
//             setPeers(peers);
//           });

//           socketRef.current.on("update audience", (audienceList) => {
//             setAudience(audienceList);
//           });

//           socketRef.current.on("update host requests", (requests) => {
//             setHostRequests(requests);
//           });

//           socketRef.current.on("update host", (newHost) => {
//             setHost(newHost);
//           });

//           const handleHostRequest = () => {
//             socketRef.current.emit("host request");
//           };

//           const acceptNextHost = () => {
//             if (hostRequests.length > 0) {
//               const nextHost = hostRequests.shift();
//               setHost(nextHost);
//               setHostRequests([...hostRequests]);
//               socketRef.current.emit("accept host", nextHost);
//             }
//           };

//           return (
//             <div className="video-container">
//               <video
//                 className="userVideo"
//                 muted
//                 autoPlay
//                 playsInline
//                 ref={userVideoRef}
//               />
//               {peers.map((peer, index) => (
//                 <Video key={index} peer={peer} />
//               ))}
//               <div className="audience-container">
//                 {audience.map((member, index) => (
//                   <div className="audience-member" key={index}>
//                     {member.name}
//                   </div>
//                 ))}
//               </div>
//               <button onClick={handleHostRequest}>Request to be Host</button>
//               {host === socketRef.current.id && (
//                 <button onClick={acceptNextHost}>Accept Next Host</button>
//               )}
//             </div>
//           );
// export default VideoRoom;

// import React, { useEffect, useRef, useState } from "react";
// import io from "socket.io-client";
// import Peer from "simple-peer";
// import "./Videoroom.css";

// const Video = ({ peer }) => {
//   const ref = useRef();

//   useEffect(() => {
//     peer.on("stream", (stream) => {
//       ref.current.srcObject = stream;
//     });
//   }, [peer]);

//   return <video className="peerVideo" autoPlay playsInline ref={ref} />;
// };

//////////////////////////////////////////////////////////////////////

// const VideoRoom = () => {
//   const [peers, setPeers] = useState([]);
//   const [audience, setAudience] = useState([]);
//   const [hostRequests, setHostRequests] = useState([]);
//   const [host, setHost] = useState(null);
//   const socketRef = useRef();
//   const userVideoRef = useRef();
//   const peersRef = useRef([]);
//   const roomID = "jokes-room";

//   useEffect(() => {
//     socketRef.current = io.connect("/");
//     navigator.mediaDevices
//       .getUserMedia({ video: true, audio: true })
//       .then((stream) => {
//         userVideoRef.current.srcObject = stream;

//         socketRef.current.emit("join room", roomID);

//         socketRef.current.on("all users", (users) => {
//           const peers = users.map((userID) => {
//             const peer = createPeer(userID, socketRef.current.id, stream);
//             peersRef.current.push({ peerID: userID, peer });
//             return peer;
//           });
//           setPeers(peers);
//         });

//         socketRef.current.on("user joined", (payload) => {
//           const peer = addPeer(payload.signal, payload.callerID, stream);
//           peersRef.current.push({ peerID: payload.callerID, peer });
//           setPeers((users) => [...users, peer]);
//         });

//         socketRef.current.on("receiving returned signal", (payload) => {
//           const item = peersRef.current.find((p) => p.peerID === payload.id);
//           item.peer.signal(payload.signal);
//         });

//         socketRef.current.on("user left", (id) => {
//           const peerObj = peersRef.current.find((p) => p.peerID === id);
//           if (peerObj) {
//             peerObj.peer.destroy();
//           }
//           const peers = peersRef.current.filter((p) => p.peerID !== id);
//           peersRef.current = peers;
//           setPeers(peers);
//         });

//         socketRef.current.on("update audience", (audienceList) => {
//           setAudience(audienceList);
//         });

//         socketRef.current.on("update host requests", (requests) => {
//           setHostRequests(requests);
//         });

//         socketRef.current.on("update host", (newHost) => {
//           setHost(newHost);
//         });
//       }, []);

//       const createPeer = (userToSignal, callerID, stream) => {
//         const peer = new Peer({
//           initiator: true,
//           trickle: false,
//           stream,
//         });

//         peer.on("signal", (signal) => {
//           socketRef.current.emit("sending signal", {
//             userToSignal,
//             callerID,
//             signal,
//           });
//         });

//         return peer;
//       };

//       const addPeer = (incomingSignal, callerID, stream) => {
//         const peer = new Peer({
//           initiator: false,
//           trickle: false,
//           stream,
//         });

//         peer.on("signal", (signal) => {
//           socketRef.current.emit("returning signal", { signal, callerID });
//         });

//         peer.signal(incomingSignal);

//         return peer;
//       };

//       const handleHostRequest = () => {
//         socketRef.current.emit("host request");
//       };

//       const acceptNextHost = () => {
//         if (hostRequests.length > 0) {
//           const nextHost = hostRequests.shift();
//           setHost(nextHost);
//           setHostRequests([...hostRequests]);
//           socketRef.current.emit("accept host", nextHost);
//         }
//       };
//       return (
//         <div className="video-container">
//           <video
//             className="userVideo"
//             muted
//             autoPlay
//             playsInline
//             ref={userVideoRef}
//           ></video>
//           {peers.map((peer, index) => (
//             <Video key={index} peer={peer} />
//           ))}
//           <div className="audience-container">
//             {audience.map((member, index) => (
//               <div className="audience-member" key={index}>
//                 {member.name}
//               </div>
//             ))}
//           </div>
//           <button onClick={handleHostRequest}>Request to be Host</button>
//           {host === socketRef.current.id && (
//             <button onClick={acceptNextHost}>Accept Next Host</button>
//           )}
//         </div>
//       );

// //       return (
// //         <div className="video-container">
// //         <video
// //           className="userVideo"
// //           muted
// //           autoPlay
// //           playsInline
// //           ref={userVideoRef}
// //         ></video>
// //  const createPeer = (userToSignal, callerID, stream) => {
// //     const peer = new Peer({
// //       initiator: true,
// //       trickle: false,
// //       stream,
// //     });

// //     peer.on("signal", (signal) => {
// //       socketRef.current.emit("sending signal", {
// //         userToSignal,
// //         callerID,
// //         signal,
// //       });
// //     });

// //     return peer;
// //   };

// //   const addPeer = (incomingSignal, callerID, stream) => {
// //     const peer = new Peer({
// //       initiator: false,
// //       trickle: false,
// //       stream,
// //     });

// //     peer.on("signal", (signal) => {
// //       socketRef.current.emit("returning signal", { signal, callerID });
// //     });

// //     peer.signal(incomingSignal);

// //     return peer;
// //   };

// //   const handleHostRequest = () => {
// //     socketRef.current.emit("host request");
// //   };

// //   const acceptNextHost = () => {
// //     if (hostRequests.length > 0) {
// //       const nextHost = hostRequests.shift();
// //       setHost(nextHost);
// //       setHostRequests([...hostRequests]);
// //       socketRef.current.emit("accept host", nextHost);
// //     }
// //   };

// //   return (
// //     <div className="video-container">
// //       <video
// //         className="userVideo"
// //         muted
// //         autoPlay
// //         playsInline
// //         ref={userVideoRef}
// //       />
// //             {peers.map((peer, index) => (
// //         <Video key={index} peer={peer} />
// //       ))}
// //       <div className="audience-container">
// //         {audience.map((member, index) => (
// //           <div className="audience-member" key={index}>
// //             {member.name}
// //           </div>
// //         ))}
// //       </div>
// //       <button onClick={handleHostRequest}>Request to be Host</button>
// //       {host === socketRef.current.id && (
// //         <button onClick={acceptNextHost}>Accept Next Host</button>
// //       )}
// //     </div>
// //   );
//  });

// export default VideoRoom;

import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import Peer from "simple-peer";
import "./Videoroom.css";

const Video = ({ peer }) => {
  const ref = useRef();

  useEffect(() => {
    peer.on("stream", (stream) => {
      ref.current.srcObject = stream;
    });
  }, [peer]);

  return <video className="peerVideo" autoPlay playsInline ref={ref} />;
};

const VideoRoom = () => {
  const [peers, setPeers] = useState([]);
  const [audience, setAudience] = useState([]);
  const [hostRequests, setHostRequests] = useState([]);
  const [host, setHost] = useState(null);
  const socketRef = useRef();
  const userVideoRef = useRef();
  const peersRef = useRef([]);
  const roomID = "jokes-room";

  //hard coded audience

  useEffect(() => {
    const hardcodedAudience = [
      { name: "User 1" },
      { name: "User 2" },
      { name: "User 3" },
      { name: "User 4" },
      { name: "User 5" },
      { name: "User 6" },
      { name: "User 7" },
      { name: "User 8" },
      { name: "User 9" },
      { name: "User 10" },
    ];
    setAudience(hardcodedAudience);
  }, []);

  useEffect(() => {
    socketRef.current = io.connect("https://wadal.vercel.app");
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        userVideoRef.current.srcObject = stream;

        socketRef.current.emit("join room", roomID);

        socketRef.current.on("all users", (users) => {
          const peers = users.map((userID) => {
            const peer = createPeer(userID, socketRef.current.id, stream);
            peersRef.current.push({ peerID: userID, peer });
            return peer;
          });
          setPeers(peers);
        });

        socketRef.current.on("user joined", (payload) => {
          const peer = addPeer(payload.signal, payload.callerID, stream);
          peersRef.current.push({ peerID: payload.callerID, peer });
          setPeers((users) => [...users, peer]);
        });

        socketRef.current.on("receiving returned signal", (payload) => {
          const item = peersRef.current.find((p) => p.peerID === payload.id);
          item.peer.signal(payload.signal);
        });

        socketRef.current.on("user left", (id) => {
          const peerObj = peersRef.current.find((p) => p.peerID === id);
          if (peerObj) {
            peerObj.peer.destroy();
          }
          const peers = peersRef.current.filter((p) => p.peerID !== id);
          peersRef.current = peers;
          setPeers(peers);
        });

        socketRef.current.on("update audience", (audienceList) => {
          setAudience(audienceList);
        });

        socketRef.current.on("update host requests", (requests) => {
          setHostRequests(requests);
        });

        socketRef.current.on("update host", (newHost) => {
          setHost(newHost);
        });
      });
  }, []);

  const createPeer = (userToSignal, callerID, stream) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socketRef.current.emit("sending signal", {
        userToSignal,
        callerID,
        signal,
      });
    });

    return peer;
  };
  const addPeer = (incomingSignal, callerID, stream) => {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socketRef.current.emit("returning signal", { signal, callerID });
    });

    peer.signal(incomingSignal);

    return peer;
  };
  //real handle request

  //   const handleHostRequest = () => {
  //     socketRef.current.emit("host request");
  //   };

  //tepm handle request

  const handleHostRequest = () => {
    // Simulate the host request by adding the current user to the hostRequests array
    setHostRequests((prevHostRequests) => [
      ...prevHostRequests,
      { id: socketRef.current.id, name: "Current User" },
    ]);
  };

  //   real user accept host

  const acceptNextHost = () => {
    if (hostRequests.length > 0) {
      const nextHost = hostRequests.shift();
      setHost(nextHost);
      setHostRequests([...hostRequests]);
      socketRef.current.emit("accept host", nextHost);
    }
  };

  //   //hard coded accept host

  //   const acceptNextHost = () => {
  //     if (audience.length > 0) {
  //       const nextHost = audience.shift();
  //       setHost(nextHost);
  //       setAudience([...audience]);
  //       // Comment out the following line if you're not using the socket for host switching
  //       // socketRef.current.emit("accept host", nextHost);
  //     }
  //   };

  //code without audience video

  //   return (
  //     <div className="video-container">
  //       <video
  //         className="userVideo"
  //         muted
  //         autoPlay
  //         playsInline
  //         ref={userVideoRef}
  //       ></video>
  //       {peers.map((peer, index) => (
  //         <Video key={index} peer={peer} />
  //       ))}
  //       <div className="audience-container">
  //         {audience.map((member, index) => (
  //           <div className="audience-member" key={index}>
  //             {member.name}
  //           </div>
  //         ))}
  //       </div>
  //       <button onClick={handleHostRequest}>Request to be Host</button>
  //       {socketRef.current && host === socketRef.current.id && (
  //         <button onClick={acceptNextHost}>Accept Next Host</button>
  //       )}
  //     </div>
  //   );

  //with audience video

  const userRole = () => {
    if (socketRef.current && host && host.id === socketRef.current.id) {
      return "host";
    } else {
      return "audience";
    }
  };

  return (
    <div className="video-container">
      <video
        className={userRole() === "host" ? "hostVideo" : "hidden"}
        muted
        autoPlay
        playsInline
        ref={userVideoRef}
      ></video>

      {/*  the actual audience

      <div className="audience-container">
        {peers.map((peer, index) => {
          if (host !== peer.peerID) {
            return <Video key={index} peer={peer} className="audienceVideo" />;
          } else {
            return null;
          }
        })}
      </div> */}

      {/* for real audience with video

          
    <div className="audience-container">
      {peers.map((peer, index) => {
        if (host !== peer.peerID) {
          return (
            <AudienceMember
              key={index}
              peer={peer.peer}
              name={`User ${index + 1}`}
            />
          );
        } else {
          return null;
        }
      })}
    </div>
          
          */}

      {/* for hard coded audience with video */}
      {/* <div className="audience-container">
        {audience.map((member, index) => (
          <div className="audience-member" key={index}>
            <div className="audience-video-container">
              <video className="audienceVideo" muted playsInline />
            </div>
            {member.name}
          </div>
        ))}
      </div> */}

      {/* the one that switches for real users when they come and hardcoded ehen there are no real usrs */}

      <div className="audience-container">
        {audience.map((member, index) => (
          <div className="audience-member" key={`hardcoded-${index}`}>
            <div className="audience-video-container">
              <video className="audienceVideo" muted playsInline />
            </div>
            {member.name}
          </div>
        ))}
        {peers.map((peer, index) => {
          if (host !== peer.peerID) {
            return (
              <div className="audience-member" key={`actual-${index}`}>
                <div className="audience-video-container">
                  <Video peer={peer} className="audienceVideo" />
                </div>
                {`User ${index + audience.length + 1}`}
              </div>
            );
          } else {
            return null;
          }
        })}
      </div>

      <button onClick={handleHostRequest}>Request to be Host</button>
      {socketRef.current && host && host.id === socketRef.current.id && (
        <button onClick={acceptNextHost}>Accept Next Host</button>
      )}
    </div>
  );
};
export default VideoRoom;
