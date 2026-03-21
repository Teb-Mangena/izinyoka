import AuthorizedPage from "../components/HomePage/AuthorizedPage";
import UnauthorizedPage from "../components/HomePage/UnauthorizedPage"
import { useAuthStore } from "../store/useAuthStore"
import AdminDashboard from "./Admin/AdminDashboard";

function HomePage() {
  const {user} = useAuthStore();

  switch(user?.role){
    case 'user': 
      return <AuthorizedPage />
    case 'admin':
      return <AdminDashboard />
    default: 
      return <UnauthorizedPage />
  }
}

export default HomePage