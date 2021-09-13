import { Component } from "react";
import './ForgotPassword.css'
import InputBox from "../../components/ui/input_box/InputBox";
import Button from "../../components/ui/button/Button";
import properties from "../../utils/properties";
import Utils from "../../utils/utils";
import {isEmpty} from"lodash"
class ForgotPassword extends Component {

    constructor(props) {
        super(props)
        this.username = '';
        this.password = '';
        this.confirmPassword = '';
        this.state = {
            worningClassEmail: false,
            worningClassPassword: false,
            worningClassConfirmPsw: false
        }
    }

    handleInputEmail = (e) => {
        this.email = e
    }

    handleInputPassword = (e) => {
        this.password = e
    }

    handleInputConfirmPsw = (e) => {
        this.confirmPassword = e
    }

    // Al Focus nelle input togliamo lo stato di warning 
    handleInputFocus = (className) => () => {
        let obj = {};

        obj[className] = false;

        this.setState(obj);
    }

    handleInputSubmit = () => {
        let inputErrors = {};

        let inputCheckedEmail = Utils.validateEmail(this.email);

        if (!inputCheckedEmail || this.email.length > 64) {
            inputErrors.worningClassEmail = true;
        }
        if (this.password.length < 4 || this.password.length > 20) {
            inputErrors.worningClassPassword = true;
        }
        if (this.confirmPassword !== this.password) {
            inputErrors.worningClassPassword = true;
            inputErrors.worningClassConfirmPsw = true;
        }

        if (!isEmpty(inputErrors)) {
            this.setState(inputErrors);
        } else {
            // Rendirizzamento pagina Welcome
            this.props.history.push(properties.ROUTING.WELCOME_PAGE, {
                validation: true,
                from: 'forgot-pwd'
            });
        }
    }

    render() {
        return (
            <div className={'Forgot-password'}>
                <div className="access-form">
                    <header>
                        <h1 className="title">
                            Reset Password
                        </h1>
                    </header>

                    <main>
                        <InputBox
                            label={'Email'}
                            callback={this.handleInputEmail}
                            type={'email'}
                            cssContent={'Email is invalid'}
                            maxlength={64}
                            warning_class={`${this.state.worningClassEmail ? 'alert' : ''}`}
                            callbackFocus={this.handleInputFocus('worningClassEmail')}
                        />

                        <InputBox
                            label={'Password'}
                            callback={this.handleInputPassword}
                            type={'password'}
                            cssContent={'Password is invalid'}
                            maxlength={20}
                            minlength={4}
                            warning_class={`${this.state.worningClassPassword ? 'alert' : ''}`}
                            callbackFocus={this.handleInputFocus('worningClassPassword')}
                        />

                        <InputBox
                            label={'Confirm Password'}
                            callback={this.handleInputConfirmPsw}
                            type={'password'}
                            cssContent={'Password is invalid'}
                            maxlength={20}
                            warning_class={`${this.state.worningClassConfirmPsw ? 'alert' : ''}`}
                            callbackFocus={this.handleInputFocus('worningClassConfirmPsw')}
                        />

                        <Button
                            button_content={'Sign in'}
                            callback={this.handleInputSubmit}
                            style={{ marginTop: '17px' }}
                        />
                    </main>
                </div>
            </div >
        )
    }
}

export default ForgotPassword;