import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import doctors from "../data/doctors";
import Spinner from "../components/Spinner";

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

function DoctorDetailPage() {
    const { doctorId } = useParams();
  const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

  useEffect(() => {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 500);

    return () => clearTimeout(timer);
    }, [doctorId]);

  const doctor = doctors.find((doc) => doc.id === doctorId);

  if (loading) {
      return (
      <div className="page-container">
          <Spinner />
        </div>
      );
  }

  if (!doctor) {
      return (
      <div className="page-container">
          <p>Doctor not found.</p>
        <Link to="/">← Back to all doctors</Link>
        </div>
      );
  }

  return (
    <div className="page-container">
        <Link to="/" className="back-link">
        ← Back to all doctors
        </Link>

        <div className="doctor-detail">
        <img src={doctor.photo} alt={doctor.name} className="detail-photo" />
          <div>
          <h1>{doctor.name}</h1>
            <p className="specialty">{doctor.specialty}</p>
          <p>⭐ {doctor.rating} · {doctor.experienceYears} years experience</p>
            <p className="location">📍 {doctor.location}</p>
          <p className="bio">{doctor.bio}</p>
          </div>
        </div>

      <h2>Available Slots</h2>
        {doctor.availableSlots.length === 0 ? (
        <p className="empty-state">No available slots right now.</p>
        ) : (
        <ul className="slots-list">
            {doctor.availableSlots.map((slot) => (
            <li key={slot}>{formatSlot(slot)}</li>
            ))}
          </ul>
        )}

      <button
          className="book-btn"
        onClick={() => navigate(`/doctors/${doctor.id}/book`)}
        >
        Book an Appointment
        </button>
      </div>
  );
}

export default DoctorDetailPage;
