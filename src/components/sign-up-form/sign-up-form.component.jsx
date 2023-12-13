import { useState } from 'react';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import { 
  createAuthUserWithEmailAndPassword, 
  createUserDocumentFromAuth 
} from '../../utils/firebase/firebase.utils';

import './sign-up-form.styles.scss'


const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
}

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  console.log(formFields);

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log(email, password)

    // TODO: confirm the passwords match
    if (!password === confirmPassword) {
      alert("passwords do not match");
      return;
    }

    // TODO: see if email and password can be authenticated
    try {
      const { user } = await createAuthUserWithEmailAndPassword(email, password)

      // TODO: create a user document from what this returns
      const userDocRef = await createUserDocumentFromAuth(user, { displayName });
      resetFormFields();
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        alert('Cannot create user, email already in use');
      } else {
        console.log("user creation encountered an error", error);
      }
    }

  }

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  }

  return (
    <div className='sign-up-container'>
      <h2>Don't have an account?</h2>
      <span>Sign Up with your email and password</span>
      <form onSubmit={handleSubmit} action="">
        <FormInput label="Display Name" type="text" required onChange={handleChange} name="displayName" value={displayName} />

        <FormInput label="Email" type="email" required onChange={handleChange} name="email" value={email} />

        <FormInput label="Password" type="password" required onChange={handleChange} name="password" value={password} />

        <FormInput label="Confirm Password" type="password" required onChange={handleChange} name="confirmPassword" value={confirmPassword} />
        <Button buttonType='inverted' type="submit" >Sign Up</Button>
      </form>
    </div>
  )
};

export default SignUpForm;