import Header from '@/routes/RootLayout/Header'
import Sidebar from '@/routes/RootLayout/Sidebar'
import { Outlet } from 'react-router-dom'
import s from './root.module.css'

export default function Root() {
  return (
    <div className={s.wrapper}>
      <Header />
      <div className={s.flexContainer}>
        <div id='sidebar' className={s.sidebar}>
          <Sidebar />
        </div>
        <div id='content' className={s.content}>
          <Outlet />
        </div>
      </div>
    </div>
  )
}
