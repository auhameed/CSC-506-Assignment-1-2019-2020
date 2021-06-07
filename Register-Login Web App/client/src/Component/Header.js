import {
    NavLink,
} from "react-router-dom"; 


const Header = () => {
        <nav className="navbar navbar-inverse navbar-fixed-top">
            <div className="container-fluid">

                <div className="navbar-header">
                    <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#DevNavbar">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    <a className="navbar-brand" href="#home" target="_blank"><span className="rwd-line">HOME <i className="fa fa-empire" aria-hidden="true"></i> PAGE</span>
                    </a>
                </div>

                <div className="collapse navbar-collapse" id="DevNavbar">
                    <ul className="nav navbar-nav navbar-right text-center">
                        <li className="home_btn"><NavLink exact to="/">  HOME</NavLink></li>
                        {profile === '' ?
                            <>
                                <li className="about_btn"><NavLink to="/login">  LOGIN</NavLink></li>
                                <li className="portfolio_btn"><NavLink to="/register"> REGISTER</NavLink></li>
                            </>
                            :
                            <>
                                <li className="contact_btn"><NavLink to="/profile"> PROFILE</NavLink></li>
                                <li className="contact_btn"><NavLink to="/"> LOGOUT</NavLink></li>
                            </>
                        }

                    </ul>
                </div>
            </div>
        </nav>

    return(

    )
}

export default Header