import React, { Component } from "react";
import { connect } from "react-redux";
import { authLogin, fetchStart, logRegister, authRegister, changeMsg } from "../redux/features/auth";

class Login extends Component {
    constructor(props) {
        super(props);
        this.username = "";
        this.password = "";
        this.pwdConfirm = "";
    }

    handleSubmit = (e) => {
        if (this.props.login) {
            this.props.fetchStart();
            this.props.authLogin({
                email: this.username, 
                password: this.password
            });
        } else {
            if (this.password === this.pwdConfirm) {
                this.props.fetchStart();
                this.props.authRegister({
                    email: this.username, 
                    password: this.password
                });
            } else {
                let message = (this.password !== this.pwdConfirm) ? "Confirm password !" : "Password too short !";
                this.props.changeMsg(message);
            }
        }
        e.preventDefault();
    }

    render() {
        return(
            <section className="login">
                <div className="login__container">
                    {(!this.props.fetching) ?
                        <FormControl t={this} p={this.props}/>
                        :
                        <Spinner/>
                    }
                </div>
            </section>
        );
    }
}

const FormControl = (props) => (
    <form className="login__container__form" onSubmit={props.t.handleSubmit}>
        <input className="login__container__form--input" 
            type="text" placeholder="Username" name="username" 
            onChange={(e) => props.t.username = e.target.value }/>
        <input className="login__container__form--input" 
            type="password" placeholder="Password" name="password"
            onChange={(e) => props.t.password = e.target.value }/>
        {(!props.p.login) &&
            <input className="login__container__form--input" 
                type="password" placeholder="Confirm password" name="confirm_pwd"
                onChange={(e) => props.t.pwdConfirm = e.target.value }/>
        }
        <a href="#" onClick={() => props.p.logRegister()}>{(props.p.login) ? "Je n'ai pas de compte !" : "J'ai deja un compte."}</a>
        {(props.p.message) && <p>{props.p.message}</p>}
        <button className="login__container__form--btn">{(props.p.login) ? "Se connecter" : "S'enregistrer"}</button>
    </form>
);

const Spinner = () => (
    <div className="login__container--spinner">
        <i className="fas fa-circle-notch"></i>
    </div>
);

const mapStateToProps = state => {
    return state.auth;
}
 
const mapDispatchToProps = {
    authLogin,
    fetchStart,
    authRegister,
    changeMsg,
    logRegister
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);