import AuthorizedPage from "../components/HomePage/AuthorizedPage";
import UnauthorizedPage from "../components/HomePage/UnauthorizedPage"
import { useAuthStore } from "../store/useAuthStore"

function HomePage() {
  const {user} = useAuthStore();

  switch(user?.role){
    case 'user': 
      return <AuthorizedPage />
    default: 
      return <UnauthorizedPage />
  }
}

export default HomePage