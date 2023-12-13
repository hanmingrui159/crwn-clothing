import { useState } from "react";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import {
  signInAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
  getSpecifiedDoc,
  signInWithGooglePopUp
} from '../../utils/firebase/firebase.utils';

import './sign-in-form.styles.scss';

const defaultFormFields = {
  email: '',
  password: ''
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  }

  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopUp();
    console.log(user);
    const userDocRef = await createUserDocumentFromAuth(user);
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { user } = await signInAuthUserWithEmailAndPassword(email, password)
      const userDocRef = await createUserDocumentFromAuth(user);
      const docSnapShot = await getSpecifiedDoc(userDocRef);
      console.log("docSnapShot.data():", docSnapShot.data());
      resetFormFields();
    } catch (error) {
      if (error.code === "auth/invalid-credential"){
        alert('incorrect password or email')
      } else {
        alert("something unexpected happened")
      }
    }
  }

  return (
    <div className="sign-in-container">
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit} action="">
        <FormInput label="Email" type="email" required onChange={handleChange} name="email" value={email} />

        <FormInput label="Password" type="password" required onChange={handleChange} name="password" value={password} />

        <div className="buttons-container">
          <Button type="submit" >Sign In</Button>
          <Button type="button" buttonType="google" onClick={signInWithGoogle} >Google sign in</Button>
        </div>
      </form>
    </div>
  )
}

export default SignInForm;