import { useAppSelector } from '@/store/hooks'
import s from './index.module.css' // Import your stylesheet

const Header = () => {
  const { user } = useAppSelector((state) => state.user)
  console.log('~~~~~~~~~~~~~~ user.photoURL', user)

  return (
    <header className={s.wrapper}>
      <div className={s.logo}>Logo</div>
      <a href={`/auth`}>
        <div className={s.userinfo}>
          <div className={s.username}>{user ? user.email : 'Login'}</div>
          <div className={s.avatar}>{user ? user.email?.substring(0, 1).toUpperCase() : 'A'}</div>
        </div>
      </a>
    </header>
  )
}

export default Header
