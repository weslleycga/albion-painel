import { Outlet } from 'react-router-dom'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'

// Layout principal: Header e Footer fixos, página atual no <Outlet />
function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 pb-12 pt-24">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Layout
