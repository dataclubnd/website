import Header from "../components/Header"
import Footer from "../components/Footer"
import { Outlet } from "react-router-dom"

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-30 md:pt-18">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}