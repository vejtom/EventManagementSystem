import { Outlet } from 'react-router-dom';
import { Header } from '../components/general/Header';
import { Footer } from '../components/general/Footer';

const MainLayout = () => {
  return (
    <div className="bg-gray-100">
      <div className="flex min-h-screen flex-col w-full max-w-7xl mx-auto">
        <Header />
        <main className="flex flex-grow justify-center py-5 mx-4 md:py-0 md:mx-0">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;