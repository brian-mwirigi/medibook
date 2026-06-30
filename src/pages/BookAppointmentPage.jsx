import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import doctors from "../data/doctors";
import { useAppointments } from "../context/AppointmentsContext";

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

function BookAppointmentPage() {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const { bookAppointment, appointments } = useAppointments();

  const doctor = doctors.find((doc) => doc.id === doctorId);

  const [selectedSlot, setSelectedSlot] = useState("");
  const [patientName, setPatientName] = useState("");
  const [reason, setReason] = useState("");
  const [slotError, setSlotError] = useState("");
  const [nameError, setNameError] = useState("");

  if (!doctor) {
    return (
      <div className="page-container">
        <p>Doctor not found.</p>
        <Link to="/">← Back to all doctors</Link>
      </div>
    );
  }

  const bookedSlots = appointments
    .filter((appt) => appt.doctorId === doctor.id)
    .map((appt) => appt.slot);

  const availableSlots = doctor.availableSlots.filter(
    (slot) => !bookedSlots.includes(slot)
  );

  function handleSubmit(e) {
    e.preventDefault();

    setSlotError("");
    setNameError("");

    let hasError = false;

    if (!selectedSlot) {
      setSlotError("Please select a time slot.");
      hasError = true;
    }
    if (!patientName.trim()) {
      setNameError("Please enter your name.");
      hasError = true;
    }

    if (hasError) {
      return;
    }

    const newAppointment = {
      id: `appt-${Date.now()}`,
      doctorId: doctor.id,
      doctorName: doctor.name,
      specialty: doctor.specialty,
      slot: selectedSlot,
      patientName: patientName.trim(),
      reason: reason.trim() || "General consultation",
    };

    bookAppointment(newAppointment);
    navigate("/appointments");
  }

  return (
    <div className="page-container">
      <Link to={`/doctors/${doctor.id}`} className="back-link">
        ← Back to {doctor.name}'s profile
      </Link>

      <h1>Book an Appointment</h1>
      <p className="specialty">
        with {doctor.name} ({doctor.specialty})
      </p>

      <form onSubmit={handleSubmit} className="booking-form">
        <label htmlFor="slot">Choose a time slot</label>
        <select
          id="slot"
          value={selectedSlot}
          onChange={(e) => setSelectedSlot(e.target.value)}
          className={slotError ? "input-error" : ""}
        >
          <option value="">-- Select a slot --</option>
          {availableSlots.map((slot) => (
            <option key={slot} value={slot}>
              {formatSlot(slot)}
            </option>
          ))}
        </select>
        {slotError && <p className="error-text">{slotError}</p>}

        {availableSlots.length === 0 && (
          <p className="error-text">All slots have been booked for this doctor!</p>
        )}

        <label htmlFor="name">Your full name</label>
        <input
          id="name"
          type="text"
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
          placeholder="e.g. John Mwangi"
          className={nameError ? "input-error" : ""}
        />
        {nameError && <p className="error-text">{nameError}</p>}

        <label htmlFor="reason">Reason for visit (optional)</label>
        <textarea
          id="reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="e.g. Annual checkup, persistent cough..."
          rows={3}
        />

        <button type="submit" className="book-btn">
          Confirm Appointment
        </button>
      </form>
    </div>
  );
}

export default BookAppointmentPage;
