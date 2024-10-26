import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

const Modal = ({show, onClose, children, title}) => {
  const [isBrowser, setIsBrowser] = useState(false);
  useEffect(() => {
    setIsBrowser(true);
  }, []);
  const modalContent = show ? (
    <div className="w-full h-full bg-black bg-opacity-70 flex flex-col justify-center 
    fixed top-0 left-0">
        <div className="bg-white flex flex-col justify-between w-3/5 h-4/5 self-center p-5 z-50 rounded-lg">
          <div className="flex flex-col gap-2 h-5/6">
            {title && <h2 className="font-bold text-2xl">{title}</h2>}
            <div className="flex flex-col gap-1 mt-2 overflow-y-auto">{children}</div>
          </div>
          <button onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onClose();
            }} className="rounded-xl w-24 bg-blue-500 text-white p-3 hover:bg-blue-700 transition-colors duration-300">Close</button>
        </div>
    </div>
  ): null;
  if(isBrowser) {
    return ReactDOM.createPortal(modalContent, document.getElementById("modal-root"));
  }
  else{
    return null;
  }
}

export default Modal