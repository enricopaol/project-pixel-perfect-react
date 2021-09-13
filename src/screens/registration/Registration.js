import './Registration.css'
import { Component } from "react";

import moment from 'moment'
import Utils from '../../utils/utils';
import Button from '../../components/ui/button/Button'
import InputBox from '../../components/ui/input_box/InputBox';
import AnchorLink from '../../components/ui/anchorlink/AnchorLink';
import properties from '../../utils/properties';
import Select from '../../components/ui/select/Select';
import { isEmpty } from 'lodash';
import { Link } from 'react-router-dom';


class Registration extends Component {
    constructor(props) {
        super(props)        
      
        this.registrationData = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            course: '',
            code: '',
            birthDate: '',
            gender: ''
        }

        this.courses = [
            'Frontend',
            'Backend'
        ];

        this.genders = [
            'Male',
            'Female',
            'Other'
        ];


        this.state = {
            worningClassFirstName: false,
            worningClassLastName: false,
            worningClassEmail: false,
            worningClassPassword: false,
            worningClassConfirmPsw: false,
            worningClassCourse: false,
            worningClassCode: false,
            worningClassBirthDate: false,
            worningClassGender: false,
        }
    }    

    handleInput = (e, name) => {
        this.registrationData[name] = e;       
    }


    // Invio Dati Registrazione + controlli di validazione 
    handleInputSubmit = () => {
        let inputErrors = {};

        let inputCheckedEmail = Utils.validateEmail(this.registrationData.email);
        let inputBirthDateChecked = Utils.validateDate(this.registrationData.birthDate);     


        if (!this.registrationData.firstName || this.registrationData.firstName.length > 24) {
            inputErrors.worningClassFirstName = true;
        }
        if (!this.registrationData.lastName || this.registrationData.lastName.length > 16) {
            inputErrors.worningClassLastName = true;
        }
        if (!inputCheckedEmail || this.registrationData.email.length > 64) {
            inputErrors.worningClassEmail = true;
        }
        if (this.registrationData.password.length < 4 || this.registrationData.password.length > 20) {
            inputErrors.worningClassPassword = true;
        }
        if (this.registrationData.confirmPassword !== this.registrationData.password) {
            inputErrors.worningClassPassword = true;
            inputErrors.worningClassConfirmPsw = true;
        }
        if (!inputBirthDateChecked || !this.registrationData.birthDate) {
            inputErrors.worningClassBirthDate = true;
        }
        if (!this.registrationData.gender) {
            inputErrors.worningClassGender = true;
        }
        if (!this.registrationData.course) {
            inputErrors.worningClassCourse = true;
        }
        if (!this.registrationData.code || this.registrationData.code.length > 6) {
            inputErrors.worningClassCode = true;
        }

        if (!isEmpty(inputErrors)) {
            this.setState(inputErrors);
        } else {
            
            /* Cambio Pagina passandogli l'oggetto  registratioData */
            // this.props.history.push(`${properties.ROUTING.WELCOME_PAGE}?validation=true`, this.registratioData);
            console.log('USER DATA', this.registrationData)

            /* Vai a Welcome mettendo lo stato di validateRegistration a true, lo trovo il props.location.state.nome_parametro*/
            this.props.history.push(properties.ROUTING.WELCOME_PAGE,{
                validation:true,
                from: 'registration'
            })

        }
    }

    // Al Focus nelle input togliamo lo stato di warning 
    handleInputFocus = (className) => () => {
        let obj = {};

        obj[className] = false;

        this.setState(obj);
    }

    render() {
        return (
            <div className={'registration'}>
                <div className="access-form">

                    <header>
                        <h1 className="title">
                            Registration
                        </h1>
                    </header>

                    <main>
                        <div className="flex-container-inputs">
                            <InputBox
                                label={'First Name'}
                                callback={this.handleInput}  
                                name="firstName"                              
                                type={'text'}
                                cssContent={'First name is required'}
                                maxlength={24}
                                warning_class={`${this.state.worningClassFirstName ? 'alert' : ''}`}
                                callbackFocus={this.handleInputFocus('worningClassFirstName')}
                            />

                            <InputBox
                                label={'Last Name'}
                                callback={this.handleInput}
                                name="lastName"
                                type={'text'}
                                cssContent={'Last name is required'}
                                maxlength={16}
                                warning_class={`${this.state.worningClassLastName ? 'alert' : ''}`}
                                callbackFocus={this.handleInputFocus('worningClassLastName')}
                            />
                        </div>

                        <InputBox
                            label={'Email'}
                            callback={this.handleInput}
                            name="email"
                            type={'email'}
                            cssContent={'Email is invalid'}
                            maxlength={64}
                            warning_class={`${this.state.worningClassEmail ? 'alert' : ''}`}
                            callbackFocus={this.handleInputFocus('worningClassEmail')}
                        />

                        <InputBox
                            label={'Password'}
                            callback={this.handleInput}
                            name="password"
                            type={'password'}
                            cssContent={'Password is invalid'}
                            maxlength={20}
                            minlength={4}
                            warning_class={`${this.state.worningClassPassword ? 'alert' : ''}`}
                            callbackFocus={this.handleInputFocus('worningClassPassword')}
                        />

                        <InputBox
                            label={'Confirm Password'}
                            callback={this.handleInput}
                            name="confirmPassword"
                            type={'password'}
                            cssContent={'Password is invalid'}
                            maxlength={20}
                            warning_class={`${this.state.worningClassConfirmPsw ? 'alert' : ''}`}
                            callbackFocus={this.handleInputFocus('worningClassConfirmPsw')}
                        />

                        <div className="flex-container-inputs">
                            <InputBox
                                label={'Date of birth'}
                                callback={this.handleInput}
                                name="birthDate"
                                type={'date'}
                                cssContent={'Date is required'}
                                warning_class={`${this.state.worningClassBirthDate ? 'alert' : ''}`}
                                callbackFocus={this.handleInputFocus('worningClassBirthDate')}
                            />

                            <Select
                                options={this.genders}
                                lable="Gender"
                                callback={this.handleInput}
                                name="gender"
                                cssContent={'Gender is required'}
                                warning_class={`${this.state.worningClassGender ? 'alert' : ''}`}
                                callbackFocus={this.handleInputFocus('worningClassGender')}
                            />
                        </div>

                        <Select
                            options={this.courses}
                            lable="Course"
                            callback={this.handleInput}
                            name = {'course'}
                            cssContent={'Course is required'}
                            warning_class={`${this.state.worningClassCourse ? 'alert' : ''}`}
                            callbackFocus={this.handleInputFocus('worningClassCourse')}
                        />

                        <InputBox
                            label={'Registration Code'}
                            callback={this.handleInput}
                            name = {'code'}
                            type={'text'}
                            cssContent={'Code is required'}
                            maxlength={6}
                            warning_class={`${this.state.worningClassCode ? 'alert' : ''}`}
                            callbackFocus={this.handleInputFocus('worningClassCode')}
                        />

                        <Button
                            button_content={'Sign up'}
                            callback={this.handleInputSubmit}
                            style={{ marginTop: '17px' }}
                        />

                    </main>


                </div>
            </div>
        )
    }

}

export default Registration