import { useAuth } from './AuthContext';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const {loading, isAuthenticated} = useAuth()

    if (loading) return <div>Loading...</div>
    return (isAuthenticated ? children : <Navigate to="/login" />);
};

export default PrivateRoute;
