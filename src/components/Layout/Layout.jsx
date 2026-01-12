import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

export default function Layout() {
  return (
    <div className="dark min-h-screen flex flex-col bg-gray-50 text-gray-900 dark:bg-zinc-950 dark:text-zinc-100">
      <Header />

      <main className="flex-1">
        <div className="mx-auto max-w-5xl px-4 py-8">
          <Outlet />
        </div>
      </main>

      <Footer />
    </div>
  );
}
