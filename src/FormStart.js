import {React, useState} from "react";
import { useNavigate } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import "./FormStart.css";
import formIcon from "./form_icon.png";

export const Box = () => {
  const navigate = useNavigate(); 
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [formValue, setFormValue] = useState('');


  const handleFormPopup = () => {
    setPopupVisible(true);
  };

  const handleFormCreation = () => {
    navigate("/form", { state: { formName: formValue } });
  }

  const handleCancel = () => {
    setPopupVisible(false);
  };

  return (
    <div>
    <div className={`box ${isPopupVisible ? 'blur' : ''}`}>
      <div className="dashboard">
          <ChatBubbleOutlineOutlinedIcon className="chatbubble" />
          <ThumbUpIcon className="thumbup" />
          <div className="user-feedback">USER FEEDBACK</div>
        </div>
        <div className="newform-container" onClick={handleFormPopup}>
          <div className="newform">
            <AddIcon className="addicon" />
            <div className="div">New form</div>
          </div>
        </div>
        <div className="container-2">
          <div className="icon-space" />
          <img className="form-icon" src={formIcon} alt="Form Icon" />
          <div className="form-heading">Delivery</div>
          <p className="submitted">
            <span>Submitted</span>
            <span className="span-value">10</span>
          </p>
          <p className="viewed">
            <span>Viewed</span>
            <span className="span-value">55</span>
          </p>
          <p className="date-published">
            <span>Date Published</span>
            <span className="date-value">08/08/2024</span>
          </p>
          <button className="view-submisson">VIEW SUBMISSION</button>
          <button className="edit">EDIT</button>
          <button className="delete">DELETE</button>
        </div>
    </div>
      <div className={`popup ${isPopupVisible ? 'active' : ''}`}>
        <div className="heading">Create Feedback Form</div>
        <div className="input-container">
          <input
            type="text"
            value={formValue}
            onChange={(e) => setFormValue(e.target.value)}
          />
        </div>
        <div className="popup-btn-container">
        <button className="create" onClick={handleFormCreation}>CREATE</button>
        <button className="cancel" onClick={handleCancel}>CANCEL</button>
        </div>
      </div>
    </div>
  );
};
