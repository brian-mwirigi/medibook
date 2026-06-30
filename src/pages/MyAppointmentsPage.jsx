import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppointments } from "../context/AppointmentsContext";
import AppointmentCard from "../components/AppointmentCard";
import ConfirmDialog from "../components/ConfirmDialog";
import doctors from "../data/doctors";

function MyAppointmentsPage() {
    const { appointments, cancelAppointment, editAppointment } = useAppointments();

  const [cancelId, setCancelId] = useState(null);
    const [editingId, setEditingId] = useState(null);
  const [newSlot, setNewSlot] = useState("");

  const sortedAppointments = [...appointments].sort(
      (a, b) => new Date(a.slot) - new Date(b.slot)
    );

    function handleCancel(appointmentId) {
      setCancelId(appointmentId);
    }

  function confirmCancel() {
    cancelAppointment(cancelId);
      setCancelId(null);
  }

    function closeDialog() {
    setCancelId(null);
    }

  function handleEdit(appointmentId) {
    setEditingId(appointmentId);
      const appt = appointments.find((a) => a.id === appointmentId);
      if (appt) {
      setNewSlot(appt.slot);
      }
  }

    function saveEdit() {
      if (newSlot) {
        editAppointment(editingId, newSlot);
      }
      setEditingId(null);
    setNewSlot("");
    }

  function cancelEdit() {
      setEditingId(null);
      setNewSlot("");
  }

  function getSlotsForDoctor(doctorId) {
    const doc = doctors.find((d) => d.id === doctorId);
      if (doc) {
        return doc.availableSlots;
      }
    return [];
  }

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

  return (
      <div className="page-container">
      <h1>My Appointments</h1>

        {cancelId && (
        <ConfirmDialog
            message="Are you sure you want to cancel this appointment?"
            onYes={confirmCancel}
          onNo={closeDialog}
          />
        )}

      {sortedAppointments.length === 0 ? (
          <div className="empty-state">
          <p>You have no upcoming appointments.</p>
            <Link to="/" className="book-btn">
              Find a Doctor
            </Link>
          </div>
        ) : (
          sortedAppointments.map((appt) => (
          <div key={appt.id}>
              <AppointmentCard
                appointment={appt}
              onCancel={handleCancel}
                onEdit={handleEdit}
              />
              {editingId === appt.id && (
              <div className="edit-slot-form">
                  <label>Change time slot: </label>
                <select value={newSlot} onChange={(e) => setNewSlot(e.target.value)}>
                    {getSlotsForDoctor(appt.doctorId).map((slot) => (
                    <option key={slot} value={slot}>
                        {formatSlot(slot)}
                      </option>
                    ))}
                  </select>
                  <button className="book-btn" onClick={saveEdit}>Save</button>
                <button className="no-btn" onClick={cancelEdit}>Cancel</button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
  );
}

export default MyAppointmentsPage;
