/**
 * FoodBridge Main Layout Structure
 * Acts as the primary application shell and UI state manager.
 * Implements local authentication state management to handle the transition 
 * between Guest flows (Login/Signup) and Authenticated flows (Profile/Dashboard).
 * In production, local state should be replaced with a global AuthContext.
 */
import { Outlet, useNavigate } from "react-router-dom";
import { NavBar, Footer } from "@components/export/index";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/slices/authSlice";
import { type RootState } from "../store";

const MainLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const user = useSelector((state: RootState) => state.auth.user);

  const handleLoginNavigation = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar 
        user={user === null ? undefined : user} 
        onLogin={handleLoginNavigation} 
        onLogout={handleLogout} 
      />
      
      <main className="flex-grow">
        <Outlet /> 
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;