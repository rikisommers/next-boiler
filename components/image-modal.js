import React, { useState, useEffect, useCallback } from "react";
import ReactDOM from "react-dom";
import "../styles/styles.scss"

const ModalImage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState("");
  const [imageList, setImageList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const handleModalOpen = useCallback((imageSrc, images) => {
    setCurrentImage(imageSrc);
    setImageList(images);
    setModalOpen(true);
  }, []);

  const handleCloseClick = () => {
    setModalOpen(false);
  };

  const handleNextClick = () => {
    if (currentIndex === imageList.length - 1) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
    setCurrentImage(imageList[currentIndex + 1]);
  };

  const handlePrevClick = () => {
    if (currentIndex === 0) {
      setCurrentIndex(imageList.length - 1);
    } else {
      setCurrentIndex(currentIndex - 1);
    }
    setCurrentImage(imageList[currentIndex - 1]);
  };

  const handleTouchStart = (event) => {
    setTouchStart(event.touches[0].clientX);
  };

  const handleTouchMove = (event) => {
    setTouchEnd(event.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart && touchEnd) {
      if (touchEnd < touchStart) {
        handleNextClick();
      } else {
        handlePrevClick();
      }
    }
    setTouchStart(null);
    setTouchEnd(null);
  };

  const handleImgClick = (event) => {

    console.log('handleclick')
    // Check if clicked element is an img
    if (event.target.tagName.toLowerCase() === "img") {
      const images = document.querySelectorAll("img");
      const imageSrc = event.target.src;
      const index = Array.from(images).findIndex((img) => img.src === imageSrc);
      setCurrentIndex(index);
      handleModalOpen(imageSrc, Array.from(images).map((img) => img.src));

    }
  };

  useEffect(() => {
    // Add event listener to document to listen for click events on img elements
    document.addEventListener("click", handleImgClick);

    // Clean up event listener on component unmount
    return () => {
      document.removeEventListener("click", handleImgClick);
    };
  }, [handleImgClick]);

  useEffect(() => {
    setCurrentImage(imageList[currentIndex]);
  }, [currentIndex, imageList]);

  return (
    <>
      {modalOpen && (
        <div className="modal" onClick={handleCloseClick} onTouchEnd={handleTouchEnd}>
          <div className="modal-content" onClick={(event) => event.stopPropagation()}>
            <div
              className="modal-img-wrapper"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
            >
              <img src={currentImage} alt="modal" />
              <button className="prev-btn" onClick={handlePrevClick}>
                &#8249;
              </button>
              <button className="next-btn" onClick={handleNextClick}>
                &#8250;
              </button>
            </div>
          </div>
        </div>
      )}
      {!modalOpen && null}
    </>
  );
};

export default ModalImage;
