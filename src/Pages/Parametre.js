import React, { Component } from "react";
import { connect } from "react-redux";
import { updateProfile, fetchStart, usersList } from "../redux/features/auth"

class Parametre extends Component {
    constructor(props) {
        super(props);
        this.email = props.email;
        this.pwd = "";
        this.newPwd = "";
        this.confirmPwd = "";
    }

    handleUpdate = (e) => {
        const body = {
            email: this.email,
            password: this.pwd,
            newPwd: this.newPwd,
        }
        this.props.fetchStart();
        this.props.updateProfile({body, token: this.props.token});
        e.preventDefault();
    }

    componentDidMount() {
        this.props.usersList();
    }

    render() {
        console.log(this.props);
        return(
            <section className="parametre">
                <h2><i style={{margin: "0 16px"}} className="fas fa-cog"></i>Parametres</h2>
                <div className="parametre__container">
                    <div className="parametre__container__elt">
                        <h2>Editez vos identifiants</h2>
                        <div className="parametre__container__elt__body">
                            {(!this.props.fetching) ?
                                <EditUser email={this.props.email} t={this}/> :
                                <Spinner/>
                            }
                        </div>
                    </div>
                    <div className="parametre__container__elt">
                        <h2>Utilisateurs</h2>
                        {this.props.users.map((val, key) => (
                            (val.email !== this.props.email) &&
                                <div key={key} className="parametre__container__elt__user">
                                    <h3>{val.email}</h3>
                                </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }
}

const Spinner = () => (
    <div className="parametre__container__elt__body--spinner">
        <i className="fas fa-circle-notch"></i>
    </div>
);

const EditUser = (props) => (
    <form className="parametre__container__elt__body__form" onSubmit={props.t.handleUpdate}>
        <input className="parametre__container__elt__body__form--input" 
            name="email" type="email" 
            placeholder="Votre email" 
            defaultValue={props.t.email}
            onChange={(e) => {props.t.email = e.target.value}}/>
        <input className="parametre__container__elt__body__form--input" 
            name="pwd" type="password" 
            placeholder="Mot de passe actuel"
            onChange={(e) => {props.t.pwd = e.target.value}}/>
        <input className="parametre__container__elt__body__form--input" 
            name="new_pwd" type="password" 
            placeholder="Nouveau mot de passe"
            onChange={(e) => {props.t.newPwd = e.target.value}}/>
        <input className="parametre__container__elt__body__form--input" 
            name="confirm_pwd" type="password" 
            placeholder="Confirmez le mot de passe"
            onChange={(e) => {props.t.confirmPwd = e.target.value}}/>
        <button className="parametre__container__elt__body__form--btn">Modifier</button>
    </form>
)

const mapStateToProps = state => {
    return state.auth;
}

const mapDispatchToProps = {
    updateProfile,
    fetchStart,
    usersList,
}

export default connect(mapStateToProps, mapDispatchToProps)(Parametre);