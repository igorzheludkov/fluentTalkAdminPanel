import { useState } from 'react'
import { useAppSelector } from '@/store/hooks'
import { useSignInMutation, useSignUpMutation, useSignOutMutation } from '@/store/api/auth/authApi'

export default function AuthFormBlock() {
  const [signIn, signInState] = useSignInMutation()
  const [signUp, signUpState] = useSignUpMutation()
  const [signOut, signOutState] = useSignOutMutation()
  const [isSignUp, setisSignUp] = useState(false)
  const { user } = useAppSelector((state) => state.user)

  const [email, setEmail] = useState('500griven@gmail.com')
  const [password, setPassword] = useState('energystar5520')

  const handleSubmit = () => {
    signIn({ email, password })
    console.log('Email:', email)
    console.log('Password:', password)
  }

  console.log('~~~~~~~~~~~~~~ auth redux user', user?.uid)
  console.log('~~~~~~~~~~~~~~ signInState', signInState.error)

  return (
    <div style={styles.container}>
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
      <button style={styles.button} onClick={handleSubmit}>
        {isSignUp ? 'Sign Up' : 'Log In'}
      </button>
      <button style={styles.button} onClick={signOut}>
        SignOut
      </button>
    </div>
  )
}

const styles = {
  container: {
    padding: '20px'
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
