import React, { Component } from "react";
import { connect } from "react-redux";
import { updateProfile, 
        fetchStart, 
        usersList, 
        openForm, 
        closeForm, 
        deleteUser,
        addUser } from "../redux/features/auth"

class Parametre extends Component {
    constructor(props) {
        super(props);
        this.email = props.email;
        this.pwd = "";
        this.newPwd = "";
        this.confirmPwd = "";
        this.userEmail = "";
        this.userPwd = "";
    }

    handleUpdate = (e) => {
        const body = {
            email: this.email,
            password: this.pwd,
            newPwd: this.newPwd,
        };
        this.props.fetchStart();
        this.props.updateProfile({body, token: this.props.token});
        e.preventDefault();
    }

    handleAddUser = (e) => {
        console.log(this.userEmail, this.userPwd);
        this.props.addUser({ 
            user: {
                email: this.userEmail, 
                password: this.userPwd
            },
            token: this.props.token,
        }).then((res) => {
            console.log(res);
        });
        e.preventDefault();
    }

    handleDelete = (id) => {
        this.props.deleteUser({id, token: this.props.token});
    }

    componentDidMount() {
        this.props.usersList();
    }

    render() {
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
                        <div className="parametre__container__elt__head">
                            <h2>Utilisateurs</h2>
                            <div onClick={() => this.props.openForm()} className="parametre__container__elt__head--icon">
                                <i className="fas fa-user-plus"></i>
                            </div>
                        </div>
                        {(this.props.newUser) &&
                            <div className="parametre__container__elt__register">
                                <form className="parametre__container__elt__register__form" onSubmit={this.handleAddUser}>
                                    <input className="parametre__container__elt__register__form--input" 
                                        type="email" placeholder="Entrez l'email utilisateur"
                                        onChange={(e) => this.userEmail = e.target.value } />
                                    <input className="parametre__container__elt__register__form--input" 
                                        type="password" placeholder="Entrez le mot de passe"
                                        onChange={(e) => this.userPwd = e.target.value } />
                                    <button className="parametre__container__elt__register__form--btn">Ajouter</button>
                                </form>
                                <div onClick={() => this.props.closeForm()} className="parametre__container__elt__register--icon">
                                    <i className="fas fa-times"></i>
                                </div>
                            </div>
                        }
                        {this.props.users.map((val, key) => (
                            (val.email !== this.props.email) &&
                                <div key={key} className="parametre__container__elt__user">
                                    <h3>{val.email}</h3>
                                    <div 
                                        className="parametre__container__elt__user--icon"
                                        onClick={() => this.handleDelete(val._id)}>
                                        <i className="fas fa-trash"></i>
                                    </div>
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
);

const mapStateToProps = state => {
    return state.auth;
};

const mapDispatchToProps = {
    updateProfile,
    fetchStart,
    usersList,
    openForm,
    closeForm,
    deleteUser,
    addUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Parametre);