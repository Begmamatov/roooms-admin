import "rc-toastr/dist/index.css";
import { RouterProvider } from 'react-router-dom';
import { router } from './router/AppRouter';
import LoginScreen from "./screens/auth/loginScreen";

function App() {
  return (
    <div>
      <RouterProvider router={router} />
      {/* <LoginScreen /> */}
    </div>
  );
}

export default App;
