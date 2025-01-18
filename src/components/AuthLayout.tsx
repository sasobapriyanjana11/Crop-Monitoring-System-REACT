import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default AuthLayout