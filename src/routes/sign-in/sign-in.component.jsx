import { signInWithGooglePopUp, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';

function SignIn() {
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopUp();
    const userDocRef = await createUserDocumentFromAuth(user);
  }

  return (
    <div>
      <h1>Sign In Page</h1>
      <button onClick={logGoogleUser }>
        Sign in with Google Popup
      </button>
    </div>
  )
}

export default SignIn