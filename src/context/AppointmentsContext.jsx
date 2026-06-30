import { createContext, useContext, useState, useEffect } from "react";

const AppointmentsContext = createContext(null);

const STORAGE_KEY = "medibook-appointments";

export function AppointmentsProvider({ children }) {
    const [appointments, setAppointments] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(appointments));
    }, [appointments]);

  function bookAppointment(newAppointment) {
      setAppointments((prev) => [...prev, newAppointment]);
  }

    function cancelAppointment(appointmentId) {
      setAppointments((prev) =>
      prev.filter((appt) => appt.id !== appointmentId)
      );
    }

  function editAppointment(appointmentId, newSlot) {
      setAppointments((prev) =>
        prev.map((appt) => {
          if (appt.id === appointmentId) {
            return { ...appt, slot: newSlot };
          }
        return appt;
        })
      );
    }

  const value = {
      appointments,
      bookAppointment,
    cancelAppointment,
      editAppointment,
    };

    return (
      <AppointmentsContext.Provider value={value}>
        {children}
      </AppointmentsContext.Provider>
    );
}

export function useAppointments() {
    const context = useContext(AppointmentsContext);
  if (!context) {
      throw new Error(
      "useAppointments must be used within an AppointmentsProvider"
      );
  }
    return context;
}
