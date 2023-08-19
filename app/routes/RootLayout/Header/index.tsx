import { useAppSelector } from '@/store/hooks'
import s from './index.module.css' // Import your stylesheet
import { Link } from 'react-router-dom'

const Header = () => {
  const { user } = useAppSelector((state) => state.user)

  return (
    <header className={s.wrapper}>
      <Link to={`/`}>
        <div className={s.logo}>Logo</div>
      </Link>
      <Link to={`/auth`}>
        <div className={s.userinfo}>
          <div className={s.username}>{user ? user.email : 'Login'}</div>
          <div className={s.avatar}>{user ? user.email?.substring(0, 1).toUpperCase() : 'A'}</div>
        </div>
      </Link>
    </header>
  )
}

export default Header
