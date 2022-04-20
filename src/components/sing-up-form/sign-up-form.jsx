import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDoc } from "../../Utils/Firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import './sign-up-form.style.scss'

const defaultFormField = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
};
 
const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormField);
    const { displayName, email, password, confirmPassword } = formFields;

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({...formFields, [name]: value});
    };

    console.log(formFields);

    const resetFormFields = () => {
        setFormFields(defaultFormField);
    }

    const handleSubmit = async (eve) => {
        eve.preventDefault();
        if (password !== confirmPassword) {
            alert('password do not match');
            return;
        };
        try {
            const { user } = await createAuthUserWithEmailAndPassword(email, password);
            await createUserDoc(user, { displayName });
            resetFormFields();
        } catch (e) {
            if (e.code === 'auth/email-already-in-use') {
                alert('email already in use');
            };
            console.log(e);
        }
    };

    return (
        <div className="sign-up-container">
            <h2>Don't have an account ?</h2>
            <span>Sign up with email and password</span>
            <form onSubmit={handleSubmit}>
                
                <FormInput label='Display Name' type='text' name="displayName" value={displayName} onChange={handleChange} required />

                
                <FormInput label='Email' type='email' name="email" value={email} onChange={handleChange} required />

                
                <FormInput label='Password' type='password' name="password" value={password} onChange={handleChange} required />

                
                <FormInput label='Confirm Password' type='password' name="confirmPassword" value={confirmPassword} onChange={handleChange} required />
                
                <Button type="submit">Sign Up</Button>
            </form>
        </div>
    );
};

export default SignUpForm;