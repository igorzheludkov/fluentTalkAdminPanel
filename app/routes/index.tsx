import Content from '@/components/RootLayout/Content'
import Root from '@/components/RootLayout/root'
import AuthFormBlock from '@/components/blocks/AuthFormBlock'
import { createBrowserRouter } from 'react-router-dom'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: 'auth/',
        element: <AuthFormBlock />
      }
    ]
  }
])
