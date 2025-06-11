import React, { useState } from "react";
import {
  useHMSStore,
  useHMSActions,
  selectPeers,
  selectLocalPeer,
} from "@100mslive/react-sdk";
import { useNavigate } from "react-router-dom";

const Participant = () => {
  const peers = useHMSStore(selectPeers);
  const localPeer = useHMSStore(selectLocalPeer);
  const hmsActions = useHMSActions();
  const navigate = useNavigate();

  const [selectedPeers, setSelectedPeers] = useState([]);
  const [roomCode, setRoomCode] = useState("");

  const handleCheckboxChange = (peerId) => {
    setSelectedPeers((prev) =>
      prev.includes(peerId)
        ? prev.filter((id) => id !== peerId)
        : [...prev, peerId]
    );
  };

  const handleSendToBreakRoom = async () => {
    if (!roomCode || selectedPeers.length === 0) {
      alert("⚠️ Please select users and enter a room code.");
      return;
    }

    const selectedEmails = selectedPeers
      .map((peerId) => {
        const peer = peers.find((p) => p.id === peerId);

        let metadata = {};
        try {
          if (peer?.metadata) {
            metadata = JSON.parse(peer.metadata);
          }
        } catch (e) {
          console.warn(
            "⚠️ Failed to parse metadata for:",
            peer.name,
            peer.metadata
          );
        }

        console.log("🧠 Selected peer metadata:", metadata);
        return metadata.email || "";
      })
      .filter(Boolean);

    
      selectedPeers.forEach((peerId) => {
        const peer = peers.find((p) => p.id === peerId);
        console.log("🔍 Selected peer metadata:", peer?.metadata);
      });
      

    console.log("📦 Frontend sending:", selectedEmails, roomCode);

    try {
      const res = await fetch(
        "http://localhost:5000/api/email/send-breakroom-email",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ emails: selectedEmails, roomCode }),
        }
      );

      const result = await res.text();
      console.log("📬 Backend response:", result);

      if (!res.ok) throw new Error("Backend email failed");
    } catch (err) {
      console.error("❌ Email API failed:", err);
      alert("❌ Email not sent.");
      return;
    }

    for (let peerId of selectedPeers) {
      try {
        if (peerId === localPeer.id) {
          await hmsActions.leave();
        } else {
          await hmsActions.removePeer(peerId, "Sent to break room");
        }
      } catch (err) {
        console.error(`❌ Error removing ${peerId}`, err);
      }
    }

    alert("🎉 Email sent and participants removed.");
    navigate("/");
  };
  

  return (
    <div style={{ padding: "2rem", color: "white" }}>
      <h2>👥 Select Participants for Break Room</h2>
      <ul style={{ listStyle: "none", paddingLeft: 0 }}>
        {peers.map((peer) => (
          <li key={peer.id} style={{ marginBottom: "10px" }}>
            <label>
              <input
                type="checkbox"
                checked={selectedPeers.includes(peer.id)}
                onChange={() => handleCheckboxChange(peer.id)}
              />
              &nbsp; {peer.name} {peer.id === localPeer.id && "(You)"}
            </label>
          </li>
        ))}
      </ul>

      <div style={{ marginTop: "20px" }}>
        <input
          type="text"
          placeholder="Enter break room code"
          value={roomCode}
          onChange={(e) => setRoomCode(e.target.value)}
          style={{
            padding: "8px",
            width: "250px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
      </div>

      <button
        onClick={handleSendToBreakRoom}
        style={{
          marginTop: "20px",
          padding: "10px 16px",
          backgroundColor: "#2196f3",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Send to Break Room
      </button>
    </div>
  );
};

export default Participant;
