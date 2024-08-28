import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./Form.css";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import SentimentSatisfiedOutlinedIcon from "@mui/icons-material/SentimentSatisfiedOutlined";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import SentimentNeutralIcon from "@mui/icons-material/SentimentNeutral";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import categories from "./categories icon.png";
import radiobutton from "./radiobutton.png";
import singleline from "./singleline.png";
import numericicon from "./numeric-rating.png";
import textarea from "./textarea.png";

const fieldOptions = [
  {
    id: "textarea",
    label: "Textarea",
    icon: <img width="16" height="15" src={textarea} alt="textarea icon" />,
    p: "Would you like to add a comment?",
  },
  {
    id: "numeric",
    label: "Numeric rating",
    icon: (
      <img width="16" height="15" src={numericicon} alt="numeric rating icon" />
    ),
    p: "How likely is it that you will recommend us to your family and friends?",
  },
  {
    id: "star",
    label: "Star rating",
    icon: <StarBorderOutlinedIcon fontSize="small" />,
    p: "Give a star rating for the website.",
  },
  {
    id: "smiley",
    label: "Smiley rating",
    icon: <SentimentSatisfiedOutlinedIcon fontSize="small" />,
    p: "What is your opinion of this page?",
  },
  {
    id: "singleline",
    label: "Single line input",
    icon: <img width="16" height="15" src={singleline} alt="singleline icon" />,
    p: "Do you have any suggestions to improve our website",
  },
  {
    id: "radio",
    label: "Radio button",
    icon: (
      <img width="16" height="15" src={radiobutton} alt="radiobutton icon" />
    ),
    p: "Multiple choice - 1 answer",
    radioOptions: ["Radio 1", "Radio 2", "Radio 3"],
  },
  {
    id: "categories",
    label: "Categories",
    icon: <img width="16" height="15" src={categories} alt="categories icon" />,
    p: "Pick a subject and provide your feedback",
    categoryOptions: ["Bug", "Content", "Other"],
  },
];

export default function Form() {
  const location = useLocation();
  const formName = location.state?.formName || "FEEDBACK FORM";
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [headingText, setHeadingText] = useState(formName);
  const [inputValue, setInputValue] = useState("");
  const [formFields, setFormFields] = useState([]);
  const [numericRating, setNumericRating] = useState(null);
  const [rating, setRating] = useState(null);
  const [smileyRating, setSmileyRating] = useState(null);
  const [editingFieldId, setEditingFieldId] = useState(null);
  const [editPara, setEditPara] = useState("");
  const [editRequired, setEditRequired] = useState(false);
  const [editErrorMessage, setEditErrorMessage] = useState("");
  const [editRadioOptions, setEditRadioOptions] = useState([]);
  const [editCategoryOptions, setEditCategoryOptions] = useState([]);

  const [isUrlToggleOn, setUrlToggleOn] = useState(false);
  const [isDateToggleOn, setDateToggleOn] = useState(false);
  const [isTimeToggleOn, setTimeToggleOn] = useState(false);

  const [urlCondition, setUrlCondition] = useState('');
  const [dateCondition, setDateCondition] = useState('');
  const [timeCondition, setTimeCondition] = useState('');

  const handleUrlToggle = () => {
    setUrlToggleOn(!isUrlToggleOn);
  };

  const handleDateToggle = () => {
    setDateToggleOn(!isDateToggleOn);
  };

  const handleTimeToggle = () => {
    setTimeToggleOn(!isTimeToggleOn);
  };


  
  const handleHeadingEdit = () => {
    setPopupVisible(true);
    setInputValue(headingText);
  };

  const handleHeadingSave = () => {
    setHeadingText(inputValue);
    setPopupVisible(false);
  };

  const handleHeadingCancel = () => {
    setPopupVisible(false);
  };

  const addField = (field) => {
    if (formFields.length < 7) {
      setFormFields([
        ...formFields,
        {
          id: `${field.id}-${formFields.length}`,
          type: field.id,
          label: field.label || "",
          p: field.p,
          radioOptions: field.radioOptions,
          categoryOptions: field.categoryOptions,
        },
      ]);
    } else {
      alert("You can only add 7 fields!");
    }
  };

  const removeField = (id) => {
    setFormFields(formFields.filter((field) => field.id !== id));
  };

  const handleNumericClick = (value) => {
    setNumericRating(value);
  };

  const handleStarClick = (value) => {
    setRating(value);
  };

  const handleSmileyClick = (value) => {
    setSmileyRating(value);
  };

  const handleEditClick = (
    id,
    para,
    required,
    errorMessage,
    radioOptions,
    categoryOptions
  ) => {
    setEditingFieldId(id);
    setEditPara(para || "");
    setEditRequired(required);
    setEditErrorMessage(errorMessage || "");
    setEditRadioOptions(radioOptions || []);
    setEditCategoryOptions(categoryOptions || []);
  };

  const handleSaveEdit = () => {
    setFormFields(
      formFields.map((field) =>
        field.id === editingFieldId
          ? {
              ...field,
              p: editPara,
              required: editRequired,
              errorMessage: editErrorMessage,
              radioOptions: editRadioOptions,
              categoryOptions: editCategoryOptions,
            }
          : field
      )
    );
    setEditingFieldId(null);
    setEditPara("");
    setEditRequired(false);
    setEditErrorMessage("");
    setEditRadioOptions([]);
    setEditCategoryOptions([]);
  };

  const handleCancelEdit = () => {
    setEditingFieldId(null);
    setEditPara("");
    setEditRequired(false);
    setEditErrorMessage("");
    setEditRadioOptions([]);
    setEditCategoryOptions([]);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const reorderedFields = Array.from(formFields);
    const [movedField] = reorderedFields.splice(result.source.index, 1);
    reorderedFields.splice(result.destination.index, 0, movedField);
    setFormFields(reorderedFields);
  };

  return (
    <div>
      <div className={`box ${isPopupVisible ? "blur" : ""}`}>
        <div className="dashboard">
          <ChatBubbleOutlineOutlinedIcon className="chatbubble" />
          <ThumbUpIcon className="thumbup" />
          <div className="user-feedback">USER FEEDBACK</div>
          <div className="button-div">
            <button className="save">SAVE</button>
            <button className="publish">PUBLISH</button>
          </div>
        </div>
        <div className="formfields">
          {editingFieldId ? (
            <div>
              <div className="header-container">
                <ArrowBackIosIcon
                  className="header-back-arrow"
                  onClick={() => setEditingFieldId(null)}
                />
                <div className="back-header">Back to Add Fields</div>
              </div>
              <div className="inputels">
                <div>
                  <label className="input-label" htmlFor="label">
                    Label
                  </label>
                  <input
                    type="text"
                    value={editPara}
                    onChange={(e) => setEditPara(e.target.value)}
                    placeholder="Field Label"
                  />
                </div>
                <div className="edit-options">
                  <div className="required-container">
                    <div
                      className={`toggle-switch ${editRequired ? "on" : "off"}`}
                      onClick={() => setEditRequired(!editRequired)}
                    >
                      <div className="toggle-slider"></div>
                    </div>
                    <span className="required-text">Required</span>
                  </div>
                  {editRequired && (
                    <div className="error-div">
                      <label className="input-label" htmlFor="errormsg">
                        Error Message
                      </label>
                      <input
                        type="text"
                        value={editErrorMessage}
                        onChange={(e) => setEditErrorMessage(e.target.value)}
                        placeholder="Value"
                      />
                      <p>Helper Text</p>
                    </div>
                  )}

                  {formFields.find((field) => field.id === editingFieldId)
                    ?.type === "radio" && (
                    <div className="radio-edit-options">
                      <label className="input-label" htmlFor="radio-btns">
                        Options
                      </label>
                      {editRadioOptions.map((option, index) => (
                        <div key={index} className="radio-option-edit">
                          <input
                            type="text"
                            value={option}
                            placeholder={option}
                            onChange={(e) => {
                              const updatedOptions = [...editRadioOptions];
                              updatedOptions[index] = e.target.value;
                              setEditRadioOptions(updatedOptions);
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                  {formFields.find((field) => field.id === editingFieldId)
                    ?.type === "categories" && (
                    <div className="category-edit-options">
                      {console.log(editCategoryOptions)}
                      <label className="input-label" htmlFor="category-options">
                        Options
                      </label>
                      {editCategoryOptions.map((option, index) => (
                        <div key={index} className="category-option-edit">
                          <input
                            type="text"
                            value={option}
                            placeholder={option}
                            onChange={(e) => {
                              const updatedOptions = [...editCategoryOptions];
                              updatedOptions[index] = e.target.value;
                              setEditCategoryOptions(updatedOptions);
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="btn-container">
                <button className="save-btn" onClick={handleSaveEdit}>
                  Save
                </button>
                <button className="cancel-btn" onClick={handleCancelEdit}>
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div>
              <h3 className="header">Add Fields</h3>
              <div className="add-formfields">
                {fieldOptions.map((field, index) => (
                  <div
                    className="formfields-options"
                    key={index}
                    onClick={() => addField(field)}
                  >
                    <span className="formfield-icon">{field.icon}</span>
                    <span className="formfield-text">{field.label}</span>
                    <AddIcon className="formfield-addicon" />
                  </div>
                ))}
                <div className="specifics-one">
                  <div className="content-toggle">
                  <p>Show based on URL conditions</p>
                  <div className="toggle-container">
                    <div
                      className={`toggle-switch ${isUrlToggleOn ? "on" : "off"}`}
                      onClick={() => setUrlToggleOn(!isUrlToggleOn)}
                    >
                      <div className="toggle-slider"></div>
                    </div>
                    </div>
                  </div>
                  {isUrlToggleOn && (
                    <input type="text" value={isUrlToggleOn}
                    onChange={(e) => setUrlCondition(e.target.value)} placeholder="http://" />
                  )} 
                </div>
                <div className="specifics-two">
                <div className="content-toggle">
                  <p>Show on a specific date</p>
                  <div className="toggle-container">
                    <div
                      className={`toggle-switch ${isDateToggleOn ? "on" : "off"}`}
                      onClick={() => setDateToggleOn(!isDateToggleOn)}
                    >
                      <div className="toggle-slider"></div>
                    </div>
                    </div>
                  </div>
                  <label className="start-date"htmlFor="startdate">Start-date</label>
                  {isDateToggleOn && (
                    <input type="date" value={isDateToggleOn}
                    onChange={(e) => setDateCondition(e.target.value)} placeholder="MM/DD/YYYY" />
                  )} 
                </div>
                <div className="specifics-three">
                <div className="content-toggle">
                <p>Show on a specific time</p>
                  <div className="toggle-container">
                    <div
                      className={`toggle-switch ${isTimeToggleOn ? "on" : "off"}`}
                      onClick={() => setTimeToggleOn(!isTimeToggleOn)}
                    >
                      <div className="toggle-slider"></div>
                    </div>
                    </div>
                  </div>
                  <label className="start-time"htmlFor="starttime">Start-time</label> 
                  {isTimeToggleOn && (
                    <input type="time" value={isTimeToggleOn}
                    onChange={(e) => setTimeCondition(e.target.value)} placeholder="hh:mm aa" />
                  )} 
                </div>
                
              </div>
            </div>
          )}
        </div>
        <div className="newFormBox-container">
          <div className="header">
            <ArrowBackIosIcon className="back-arrow" />
            <div className="header-text">{headingText}</div>
            <EditIcon className="edit-icon" onClick={handleHeadingEdit} />
          </div>
          <div className="dragdrop-comp">
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="formFieldsDroppable">
                {(provided) => (
                  <div
                    className="form-container"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {formFields.length === 0 ? (
                      <div className="add-fields">Add Fields</div>
                    ) : (
                      formFields.map((field, index) => (
                        <Draggable
                          key={field.id}
                          draggableId={field.id}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              className="formField-item"
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              {field.type === "textarea" && (
                                <div className="textarea-field">
                                  <p>{field.p}</p>
                                  <textarea
                                    name="comment"
                                    placeholder={
                                      field.required ? field.errorMessage : ""
                                    }
                                  ></textarea>
                                  <div className="editanddelete">
                                    <EditIcon
                                      className="edit-icon"
                                      onClick={() =>
                                        handleEditClick(
                                          field.id,
                                          field.p,
                                          field.required,
                                          field.errorMessage
                                        )
                                      }
                                    />
                                    <DeleteIcon
                                      className="delete-icon"
                                      onClick={() => removeField(field.id)}
                                    />
                                  </div>
                                </div>
                              )}
                              {field.type === "numeric" && (
                                <div className="numeric-rating">
                                  <p>{field.p}</p>
                                  <div className="rating-numbers">
                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(
                                      (number) => (
                                        <div
                                          key={number}
                                          onClick={() =>
                                            handleNumericClick(number)
                                          }
                                          className={`rating-number ${
                                            numericRating === number
                                              ? "selected"
                                              : ""
                                          }`}
                                        >
                                          {number}
                                        </div>
                                      )
                                    )}
                                  </div>
                                  <div className="editanddelete">
                                    <EditIcon
                                      className="edit-icon"
                                      onClick={() =>
                                        handleEditClick(
                                          field.id,
                                          field.p,
                                          field.required,
                                          field.errorMessage
                                        )
                                      }
                                    />
                                    <DeleteIcon
                                      className="delete-icon"
                                      onClick={() => removeField(field.id)}
                                    />
                                  </div>
                                </div>
                              )}
                              {field.type === "star" && (
                                <div className="star-rating">
                                  <p>Give a star rating for the website.</p>
                                  {[1, 2, 3, 4, 5].map((star) => (
                                    <span
                                      key={star}
                                      onClick={() => handleStarClick(star)}
                                      className={`star ${
                                        star <= rating ? "selected" : ""
                                      }`}
                                    >
                                      ★
                                    </span>
                                  ))}
                                  <div className="editanddelete">
                                    <EditIcon
                                      className="edit-icon"
                                      onClick={() =>
                                        handleEditClick(
                                          field.id,
                                          field.p,
                                          field.required,
                                          field.errorMessage
                                        )
                                      }
                                    />
                                    <DeleteIcon
                                      className="delete-icon"
                                      onClick={() => removeField(field.id)}
                                    />
                                  </div>
                                </div>
                              )}
                              {field.type === "smiley" && (
                                <div className="smiley-rating">
                                  <p>{field.p}</p>
                                  <div className="smiley-icons">
                                    {[1, 2, 3, 4, 5].map((smiley) => (
                                      <div
                                        key={smiley}
                                        onClick={() =>
                                          handleSmileyClick(smiley)
                                        }
                                        className={`smiley ${
                                          smileyRating === smiley
                                            ? "selected"
                                            : ""
                                        }`}
                                      >
                                        {smiley === 1 && (
                                          <SentimentVeryDissatisfiedIcon
                                            sx={{ fontSize: 35 }}
                                          />
                                        )}
                                        {smiley === 2 && (
                                          <SentimentDissatisfiedIcon
                                            sx={{ fontSize: 35 }}
                                          />
                                        )}
                                        {smiley === 3 && (
                                          <SentimentNeutralIcon
                                            sx={{ fontSize: 35 }}
                                          />
                                        )}
                                        {smiley === 4 && (
                                          <SentimentSatisfiedIcon
                                            sx={{ fontSize: 35 }}
                                          />
                                        )}
                                        {smiley === 5 && (
                                          <SentimentVerySatisfiedIcon
                                            sx={{ fontSize: 35 }}
                                          />
                                        )}
                                      </div>
                                    ))}
                                  </div>
                                  <div className="editanddelete">
                                    <EditIcon
                                      className="edit-icon"
                                      onClick={() =>
                                        handleEditClick(
                                          field.id,
                                          field.p,
                                          field.required,
                                          field.errorMessage
                                        )
                                      }
                                    />
                                    <DeleteIcon
                                      className="delete-icon"
                                      onClick={() => removeField(field.id)}
                                    />
                                  </div>
                                </div>
                              )}
                              {field.type === "singleline" && (
                                <div className="singleline-field">
                                  <p>{field.p}</p>
                                  <input type="text" />
                                  <div className="editanddelete">
                                    <EditIcon
                                      className="edit-icon"
                                      onClick={() =>
                                        handleEditClick(
                                          field.id,
                                          field.p,
                                          field.required,
                                          field.errorMessage
                                        )
                                      }
                                    />
                                    <DeleteIcon
                                      className="delete-icon"
                                      onClick={() => removeField(field.id)}
                                    />
                                  </div>
                                </div>
                              )}
                              {field.type === "radio" && (
                                <div className="radio-buttons">
                                  <p>{field.p}</p>
                                  <div className="radio-options">
                                    {field.radioOptions?.map((option, idx) => (
                                      <label key={idx}>
                                        <input
                                          type="radio"
                                          name={`radio-${field.id}`}
                                          value={option}
                                        />
                                        {option}
                                      </label>
                                    ))}
                                  </div>
                                  <div className="editanddelete">
                                    <EditIcon
                                      className="edit-icon"
                                      onClick={() =>
                                        handleEditClick(
                                          field.id,
                                          field.p,
                                          field.required,
                                          field.errorMessage,
                                          field.radioOptions,
                                          field.categoryOptions
                                        )
                                      }
                                    />
                                    <DeleteIcon
                                      className="delete-icon"
                                      onClick={() => removeField(field.id)}
                                    />
                                  </div>
                                </div>
                              )}
                              {field.type === "categories" && (
                                <div className="category">
                                  <p>{field.p}</p>
                                  {field.categoryOptions?.map((option, idx) => (
                                    <label key={idx}>
                                      <button className="categories-btn">
                                        {option}
                                      </button>
                                    </label>
                                  ))}
                                  <div className="editanddelete">
                                    <EditIcon
                                      className="edit-icon"
                                      onClick={() =>
                                        handleEditClick(
                                          field.id,
                                          field.p,
                                          field.required,
                                          field.errorMessage,
                                          field.radioOptions,
                                          field.categoryOptions
                                        )
                                      }
                                    />
                                    <DeleteIcon
                                      className="delete-icon"
                                      onClick={() => removeField(field.id)}
                                    />
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </Draggable>
                      ))
                    )}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        </div>
      </div>
      <div className={`popup ${isPopupVisible ? "active" : ""}`}>
        <div className="heading">Edit</div>
        <div className="input-container">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </div>
        <div className="heading-btn-container">
          <button className="heading-save" onClick={handleHeadingSave}>
            SAVE
          </button>
          <button className="heading-cancel" onClick={handleHeadingCancel}>
            CANCEL
          </button>
        </div>
      </div>
    </div>
  );
}
