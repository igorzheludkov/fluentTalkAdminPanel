import { Link } from 'react-router-dom'
import './index.module.css' // Import your stylesheet

const Sidebar = () => {
  return (
    <div className='wrapper'>
      <p>Sidebar</p>
      <Link to={`/dialog-categories`}>Dialog Categories</Link>
    </div>
  )
}

export default Sidebar
