import { useHMSActions } from "@100mslive/react-sdk";
import { useState, useEffect } from "react";

const JoinForm = ({ userName, email }) => {
  console.log("JoinForm received:", userName, email); // ✅ this should not say 'undefined'
  const hmsActions = useHMSActions();
  console.log("📥 JoinForm received:", userName, email); // ✅ Place this here
  const [inputValues, setInputValues] = useState({
    name: "",
    roomCode: "",
  });

  useEffect(() => {
    if (userName) {
      setInputValues((prev) => ({ ...prev, name: userName }));
    }
  }, [userName]);

  const handleInputChange = (e) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, roomCode } = inputValues;

    try {
      const authToken = await hmsActions.getAuthTokenByRoomCode({ roomCode });

      // ✅ SET email metadata DURING JOIN call — NOT separately
      console.log("📤 Joining with metadata:", JSON.stringify({ email }));

      await hmsActions.join({
        userName: name,
        authToken,
        metadata: JSON.stringify({ email }), // 👈 make sure email here is NOT undefined
      });
      await hmsActions.changeMetadata(JSON.stringify({ email }));
    } catch (e) {
      console.error("❌ Failed to join room:", e);
      alert("Error joining room. Please check the room code.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>🎥 Join Room</h2>
      <div className="input-container">
        <input
          required
          id="name"
          type="text"
          name="name"
          value={inputValues.name}
          onChange={handleInputChange}
          placeholder="Your Name"
        />
      </div>
      <div className="input-container">
        <input
          required
          id="room-code"
          type="text"
          name="roomCode"
          value={inputValues.roomCode}
          onChange={handleInputChange}
          placeholder="Room Code"
        />
      </div>
      <button type="submit" className="btn-primary">
        Join
      </button>
    </form>
  );
};

export default JoinForm;
