import "./ConfirmDialog.css";

function ConfirmDialog({ message, onYes, onNo }) {
    return (
      <div className="confirm-overlay">
        <div className="confirm-box">
        <p>{message}</p>
          <div className="confirm-buttons">
            <button className="no-btn" onClick={onNo}>No</button>
          <button className="yes-btn" onClick={onYes}>Yes</button>
        </div>
        </div>
      </div>
    );
}

export default ConfirmDialog;
