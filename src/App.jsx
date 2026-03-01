import AppRoutes from './routes/AppRoutes';
import AuthProvider from './components/AuthProvider';

export default function App() {
    return (
        <div>
            <AuthProvider>
                <AppRoutes />
            </AuthProvider>
        </div>

    )
}