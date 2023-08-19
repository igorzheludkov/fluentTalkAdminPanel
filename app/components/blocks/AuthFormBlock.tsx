import { useEffect, useState } from 'react'
import { useAppSelector } from '@/store/hooks'
import { useSignInMutation, useSignUpMutation, useSignOutMutation } from '@/store/api/auth/authApi'
import { FirebaseAuthErrorCode } from '@/types/errors'

export default function AuthFormBlock() {
  const [signIn, signInState] = useSignInMutation()
  const [signUp, signUpState] = useSignUpMutation()
  const [signOut, signOutState] = useSignOutMutation()
  const { user } = useAppSelector((state) => state.user)

  const [error, setError] = useState<{ data: string; status: FirebaseAuthErrorCode } | undefined>(undefined)
  const [showError, setShowError] = useState(false)

  const [email, setEmail] = useState('500griven@gmail.com')
  const [password, setPassword] = useState('energystar5520')

  const handleSignIn = () => {
    signIn({ email, password })
  }
  const handleSignUp = () => {
    signUp({ email, password })
  }
  const handleSignOut = () => {
    signOut({ email, password })
  }

  useEffect(() => {
    setError(signInState.error || signUpState.error || signOutState.error)
  }, [signInState.error, signUpState.error, signOutState.error])

  useEffect(() => {
    if (error) {
      setShowError(true)
      setTimeout(() => {
        setShowError(false)
      }, 1000)
    }
  }, [error])

  return (
    <div style={styles.container}>
      {user ? (
        <div>
          <h2>{user.email}</h2>
          <button style={styles.button} onClick={handleSignOut}>
            {'Sign Out'}
          </button>
        </div>
      ) : (
        <>
          <div style={styles.errorMessage}>{showError && <h2>{error?.status}</h2>}</div>
          <input
            type='text'
            placeholder='Email'
            onChange={(event) => setEmail(event.target.value)}
            value={email}
          />
          <input
            type='password'
            placeholder='Password'
            onChange={(event) => setPassword(event.target.value)}
            value={password}
          />
          <div>
            <button style={styles.button} onClick={handleSignIn}>
              {'Log In'}
            </button>
            <button style={styles.button} onClick={handleSignUp}>
              {'Sign Up'}
            </button>
          </div>
        </>
      )}
    </div>
  )
}

const styles = {
  container: {
    padding: '20px'
  },
  errorMessage: {
    position: 'absolute',
    bottom: 0
  },
  button: {
    marginTop: '20px',
    backgroundColor: 'blue',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    cursor: 'pointer'
  }
}
