import React, {useState} from 'react';

function DropZone(props) {

  const [classes, setClasses] = useState([props.className]);

  const removeHoverClass = () => {
    setClasses( classes.filter( c => c !== props.hoverClass ) );
  };

  const addHoverClass = () => {
    setClasses( [...classes, props.hoverClass] );
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragEnter = (e) => {
    addHoverClass();
  };

  const handleDragLeave = (e) => {
    removeHoverClass();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    try {
      let targetPayload = props.payload;
      let droppedPayload = JSON.parse(e.dataTransfer.getData('text/json'));
      props.onDrop(targetPayload, droppedPayload);
    } catch(e) { console.error(e); }

    removeHoverClass();
  };

  return (
    <div
      className={classes.join(' ')}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
    >
      {props.children}
    </div>
  );
}

export default DropZone;
