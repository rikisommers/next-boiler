import React, { useState, useEffect } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState(() => {
    const storedPosition = JSON.parse(localStorage.getItem('cursorPosition'));
    return storedPosition || { x: 0, y: 0 };
  });
  const [touchDevice, setTouchDevice] = useState(false);
  const [mouseClicked, setMouseClicked] = useState(false);

  useEffect(() => {
    checkTouchDevice();
    return () => removeEventListeners();
  }, []);

  useEffect(() => {
    localStorage.setItem('cursorPosition', JSON.stringify(position));
  }, [position]);

  const checkTouchDevice = () => {
    if ('ontouchstart' in window || navigator.maxTouchPoints) {
      setTouchDevice(true);
    } else {
      addEventListeners();
    }
  };

  const addEventListeners = () => {
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);
  };

  const removeEventListeners = () => {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mousedown', onMouseDown);
    document.removeEventListener('mouseup', onMouseUp);
  };

  
  const onMouseMove = (e) => {
    setPosition({ x: e.clientX, y: e.clientY });
  };

  const onMouseDown = () => {
    setMouseClicked(true);
  };

  const onMouseUp = () => {
    setMouseClicked(false);
  };

  const cursorClasses = () => {
    let classes = 'cursor';
    
    if (mouseClicked) {
      classes += ' clicked';
    }
  
    const isMouseOverBack = document.querySelector('.c-back:hover');
    if (isMouseOverBack) {
      classes += ' back';
    }

    const isMouseOverNext = document.querySelector('.next-project:hover');
    if (isMouseOverNext) {
      classes += ' next';
    }

    const isMouseOverImg = document.querySelector('.img:hover,.c-project');
    if (isMouseOverImg) {
      classes += ' img';
    }
  
    // const isMouseOverImg = document.querySelector('.img:hover');
    // if (isMouseOverImg) {
    //   classes += ' img';
    // }
    
  
    return classes;
  };

  if (touchDevice) {
    return null;
  }

  return (
   
    <div className={cursorClasses()} style={{ left: `${position.x}px`, top: `${position.y}px` }}>
      <div className="circle"></div>
    </div>
    
  );
};

export default CustomCursor;
