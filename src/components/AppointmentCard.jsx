import "./AppointmentCard.css";

function formatSlot(isoString) {
    const date = new Date(isoString);
  return date.toLocaleString(undefined, {
      weekday: "short",
    month: "short",
      day: "numeric",
    hour: "numeric",
      minute: "2-digit",
    });
}

function AppointmentCard({ appointment, onCancel, onEdit }) {
    return (
      <div className="appointment-card">
        <div>
        <h3>{appointment.doctorName}</h3>
          <p className="specialty">{appointment.specialty}</p>
          <p>🗓️ {formatSlot(appointment.slot)}</p>
        <p>👤 {appointment.patientName}</p>
          <p className="reason">📝 {appointment.reason}</p>
        </div>
        <div className="appointment-actions">
        <button className="edit-btn" onClick={() => onEdit(appointment.id)}>
            Edit
          </button>
          <button className="cancel-btn" onClick={() => onCancel(appointment.id)}>
          Cancel
          </button>
      </div>
      </div>
    );
}

export default AppointmentCard;
