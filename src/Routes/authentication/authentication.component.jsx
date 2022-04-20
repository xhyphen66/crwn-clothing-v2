import { signInWithGooglePopup, createUserDoc } from "../../Utils/Firebase/firebase.utils";
import SignUpForm from "../../components/sing-up-form/sign-up-form";
import SignInForm from "../../components/sign-in-form/sign-in-form.component";
import './authentication.style.scss';

const Authentication = () => {

    return (
        <div className="authentication-container">
            <SignInForm/>
            <SignUpForm />
        </div>
    );
};

export default Authentication;