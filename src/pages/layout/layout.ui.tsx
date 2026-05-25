import { Outlet } from 'react-router-dom';
import { Footer } from '~widgets/footer';
import { Header } from '~widgets/header';


export function GenericLayout() {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow    w-full md:max-w-[1200px] mx-auto">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
}

