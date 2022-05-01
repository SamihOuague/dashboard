import React, { Component } from "react";
import { connect } from "react-redux";
import Login from "./Login";
import { Router } from "./Routes";
import { Link } from "react-router-dom";
import { checkCookie } from "../redux/features/auth"

class Main extends Component {
    componentDidMount() {
        this.props.checkCookie();
    }

    render() {
        return(
            <section className="main">
                <div className="main__navigation">
                    <h2 className="main__navigation--title">Navigation</h2>
                    <div className="main__navigation__container">
                        <div className="main__navigation__container__bloc"></div>
                        <Link to="/" className="main__navigation__container__bloc">
                            <div className="main__navigation__container__bloc--title">
                                <i className="fas fa-tachometer-alt"></i>
                                <h3>Tableau de bord</h3>
                            </div>
                        </Link>
                        <Link to="/blog" className="main__navigation__container__bloc">
                            <div className="main__navigation__container__bloc--title">
                                <i className="fab fa-blogger"></i>
                                <h3>Blog</h3>
                            </div>
                            {/*<div className="main__navigation__container__bloc--bubble"></div>*/}
                        </Link>
                        <Link to="/shop" className="main__navigation__container__bloc">
                            <div className="main__navigation__container__bloc--title">
                                <i className="fas fa-store"></i>
                                <h3>Boutique</h3>
                            </div>
                            {/*<div className="main__navigation__container__bloc--bubble"></div>*/}
                        </Link>
                        <Link to="/message" className="main__navigation__container__bloc">
                            <div className="main__navigation__container__bloc--title">
                                <i className="fas fa-envelope"></i>
                                <h3>Messages</h3>
                            </div>
                            <div className="main__navigation__container__bloc--bubble">2</div>
                        </Link>
                        <Link to="/parametre" className="main__navigation__container__bloc">
                            <div className="main__navigation__container__bloc--title">
                                <i className="fas fa-cog"></i>
                                <h3>Parametres</h3>
                            </div>
                            {/*<div className="main__navigation__container__bloc--bubble"></div>*/}
                        </Link>
                    </div>
                </div>
                <div className="main__body">
                    {(!this.props.token) ? 
                        <Login/>
                        :
                        <Router/>
                    }
                </div>
            </section>
        );
    }
}

const mapStateToProps = state => {
    return state.auth;
}

const mapDispatchToProps = {
    checkCookie,
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);