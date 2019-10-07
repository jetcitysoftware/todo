import React, {useState} from 'react';

function Draggable(props) {

  const [dragging, setDragging] = useState(false);

  const handleDragStart = (e) => {
    let payload = JSON.stringify(props.payload);
    e.dataTransfer.setData('text/json', payload);
    setDragging(true);
  };

  const handleDragEnd = (e) => {
    setDragging(false);
  };

  return (
    <div
      className={ dragging ? props.dragClass : '' }
      draggable="true"
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      {props.children}
    </div>
  );


}

export default Draggable;
