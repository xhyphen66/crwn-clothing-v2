import { Outlet, Link } from "react-router-dom";
import { Fragment } from "react/cjs/react.development";

import {ReactComponent as Crownlogo} from '../../assets/crown.svg'
import './Navigation.style.scss'

const Navigation = () => {
    return (
      <Fragment>
        <div className="navigation">
            <Link to='/' className="logo-container">
                <Crownlogo className="logo"/>
            </Link>   
            <div className="nav-links-container">
                <Link to='/shop' className="nav-link">Shop</Link>
            </div>
        </div>
        <Outlet />
      </Fragment>
    );
};

export default Navigation;