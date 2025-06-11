import { useAVToggle, useHMSActions } from "@100mslive/react-sdk";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMicrophone,
  faMicrophoneSlash,
  faVideo,
  faVideoSlash,
  faPhoneSlash,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { faUsers } from "@fortawesome/free-solid-svg-icons";


const Footer = () => {
  const { isLocalAudioEnabled, toggleAudio, isLocalVideoEnabled, toggleVideo } =
    useAVToggle();
  const hmsActions = useHMSActions();
  const navigate = useNavigate();

  const handleLeave = () => {
    hmsActions.leave();
  };

  return (
    <div className="control-bar">
      <button className="btn-control" onClick={toggleAudio}>
        <FontAwesomeIcon
          icon={isLocalAudioEnabled ? faMicrophone : faMicrophoneSlash}
        />
      </button>
      <button className="btn-control" onClick={toggleVideo}>
        <FontAwesomeIcon icon={isLocalVideoEnabled ? faVideo : faVideoSlash} />
      </button>
      <button
        className="btn-control"
        title="Manage Participants"
        onClick={() => navigate("/participants")}
      >
        <FontAwesomeIcon icon={faUsers} />
      </button>

      <button className="btn-control leave-btn" onClick={handleLeave}>
        <FontAwesomeIcon icon={faPhoneSlash} />
      </button>
    </div>
  );
};

export default Footer;
