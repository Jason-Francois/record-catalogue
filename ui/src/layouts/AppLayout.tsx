import { Outlet } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ToastProvider from "../components/ToastProvider";
import { ThemeProvider } from "../components/ThemeProvider";
export default function AppLayout() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <Header />
        <main className="flex-1 flex flex-col mx-auto px-6 max-w-7xl w-full">
          <Outlet />
        </main>
        <Footer />
      </ToastProvider>
    </ThemeProvider>
  );
}
