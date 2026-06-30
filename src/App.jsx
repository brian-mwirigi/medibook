import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import DoctorsListPage from "./pages/DoctorsListPage";
import DoctorDetailPage from "./pages/DoctorDetailPage";
import BookAppointmentPage from "./pages/BookAppointmentPage";
import MyAppointmentsPage from "./pages/MyAppointmentsPage";
import { AppointmentsProvider } from "./context/AppointmentsContext";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import "./App.css";

function AppContent() {
  const { darkMode } = useTheme();

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<DoctorsListPage />} />
          <Route path="/doctors/:doctorId" element={<DoctorDetailPage />} />
          <Route
            path="/doctors/:doctorId/book"
            element={<BookAppointmentPage />}
          />
          <Route path="/appointments" element={<MyAppointmentsPage />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppointmentsProvider>
        <AppContent />
      </AppointmentsProvider>
    </ThemeProvider>
  );
}

export default App;
