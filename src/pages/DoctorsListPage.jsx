import { useState, useMemo } from "react";
import doctors from "../data/doctors";
import DoctorCard from "../components/DoctorCard";

function DoctorsListPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [specialtyFilter, setSpecialtyFilter] = useState("All");

  const specialties = useMemo(() => {
    const unique = new Set(doctors.map((doc) => doc.specialty));
    return ["All", ...unique];
  }, []);

  const filteredDoctors = useMemo(() => {
    return doctors.filter((doc) => {
      const matchesSearch = doc.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesSpecialty =
        specialtyFilter === "All" || doc.specialty === specialtyFilter;
      return matchesSearch && matchesSpecialty;
    });
  }, [searchTerm, specialtyFilter]);

  return (
    <div className="page-container">
      <h1>Find a Doctor</h1>

      <div className="filters">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          value={specialtyFilter}
          onChange={(e) => setSpecialtyFilter(e.target.value)}
        >
          {specialties.map((spec) => (
            <option key={spec} value={spec}>
              {spec}
            </option>
          ))}
        </select>
      </div>

      <div className="doctor-list">
        {filteredDoctors.length === 0 ? (
          <p className="empty-state">No doctors match your search.</p>
        ) : (
          filteredDoctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))
        )}
      </div>
    </div>
  );
}

export default DoctorsListPage;
