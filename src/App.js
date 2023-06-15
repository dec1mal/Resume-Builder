import Home from './pages/home';
import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import './styles.css';

const Section = ({ id, title, description, onSectionNameChange, onSectionOrderChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [draggedSectionId, setDraggedSectionId] = useState(null);
  const [isToggleOn, setIsToggleOn] = useState(true);
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (event) => {
    setNewTitle(event.target.value);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    onSectionNameChange(id, newTitle);
  };

  const handleDragStart = (event) => {
    event.dataTransfer.setData('text/plain', id.toString());
    setDraggedSectionId(id);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedSectionId = parseInt(event.dataTransfer.getData('text/plain'));
    if (droppedSectionId !== id) {
      onSectionOrderChange(droppedSectionId, id);
    }
    setDraggedSectionId(null);
  };

  const handleToggleChange = () => {
    setIsToggleOn(!isToggleOn);
  };

  const handleInfoClick = () => {
    setIsDescriptionVisible(!isDescriptionVisible);
  };

  const isDragging = draggedSectionId === id;

  return (
    <>
      <div
        className={`section${isDragging ? ' dragging' : ''}${isToggleOn ? '' : ' faded'}`}
        draggable
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <img className="bullet-icon" src="./Images/bullet.png" alt="Bullet Icon" />
        <img className="info-icon" src="./Images/info.png" alt="Info Icon" onClick={handleInfoClick} />
        {isEditing ? (
          <input className="section-title-edit" type="text" value={newTitle} onChange={handleInputChange} />
        ) : (
          <h5 className="section-title">{title}</h5>
        )}
        <img className="edit-icon" src="./Images/draw.png" alt="Edit Icon" onClick={handleEditClick} />
        <label className="toggle-switch">
          <input type="checkbox" checked={isToggleOn} onChange={handleToggleChange} />
          <span className="toggle-switch-label"></span>
        </label>
        {isEditing && (
          <button className="save-button" onClick={handleSaveClick}>
            Save
          </button>
        )}
        {isDescriptionVisible && <p className="section-description">{description}</p>}
      </div>
      <hr className="section-separator" />
    </>
  );
};

const App = () => {
  const [sections, setSections] = useState([
    { id: 1, title: 'Profile Summary', description: 'Description for Profile Summary' },
    { id: 2, title: 'Academic and Co-curricular Achievements', description: 'Description for Academic and Co-curricular Achievements' },
    { id: 3, title: 'Summer Internship Experience', description: 'Description for Summer Internship Experience' },
    { id: 4, title: 'Work Experience', description: 'Description for Work Experience' },
    { id: 5, title: 'Projects', description: 'Description for Projects' },
    { id: 6, title: 'Certifications', description: 'Description for Certifications' },
    { id: 7, title: 'Leadership Positions', description: 'Description for Leadership Positions' },
    { id: 8, title: 'Extracurricular', description: 'Description for Extracurricular' },
    { id: 9, title: 'Education', description: 'Description for Education' },
  ]);

  const handleSectionNameChange = (id, newTitle) => {
    setSections((prevSections) =>
      prevSections.map((section) => (section.id === id ? { ...section, title: newTitle } : section))
    );
  };

  const handleSectionOrderChange = (draggedId, droppedId) => {
    setSections((prevSections) => {
      const draggedSection = prevSections.find((section) => section.id === draggedId);
      const droppedSection = prevSections.find((section) => section.id === droppedId);
      const updatedSections = prevSections.map((section) => {
        if (section.id === draggedId) {
          return { ...draggedSection, title: droppedSection.title };
        } else if (section.id === droppedId) {
          return { ...droppedSection, title: draggedSection.title };
        }
        return section;
      });
      return updatedSections;
    });
  };

  return (
    <div className="container">
      <h2>Select you section</h2>
      {sections.map((section) => (
        <Section
          key={section.id}
          id={section.id}
          title={section.title}
          description={section.description}
          onSectionNameChange={handleSectionNameChange}
          onSectionOrderChange={handleSectionOrderChange}
        />
      ))}
      <div className="center-align">
        <a href="#" className="btn">
          Save and Next
        </a>
      </div>
    </div>
  );
};

export default App;
