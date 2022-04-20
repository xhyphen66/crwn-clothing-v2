import { useState } from "react";
import { signInWithGooglePopup, createUserDoc, signInAuthUserWithEmailAndPassword } from "../../Utils/Firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import './sign-in-form.style.scss'

const defaultFormField = {
    email: '',
    password: '',
};
 
const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormField);
    const { email, password } = formFields;

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({...formFields, [name]: value});
    };

    const signInWithGoogle = async () => {
        const {user} = await signInWithGooglePopup();
        await createUserDoc(user);
    }

    console.log(formFields);

    const resetFormFields = () => {
        setFormFields(defaultFormField);
    }

    const handleSubmit = async (eve) => {
        eve.preventDefault();
        try {
            const response = await signInAuthUserWithEmailAndPassword(email, password);
            console.log(response);
            resetFormFields();
        } catch (e) {
            switch (e.code) {
                case 'auth/user-not-found':
                    alert('no user associated with this email');
                    break;
                case 'auth/wrong-password':
                    alert('incorrect password');
                    break
                default:
                    console.log(e);
            };
        }
    };

    return (
        <div className="sign-up-container">
            <h2>Already have an account ?</h2>
            <span>Sign in with email and password</span>
            <form onSubmit={handleSubmit}>                
                <FormInput label='Email' type='email' name="email" value={email} onChange={handleChange} required /> 
                <FormInput label='Password' type='password' name="password" value={password} onChange={handleChange} required />
                
                <div className="buttons-container">
                    <Button type="submit">Sign In</Button>
                    <Button buttonType='google' type='button' onClick={signInWithGoogle}>Google Sign In</Button>
                </div>

            </form>
        </div>
    );
};

export default SignInForm;