import { Component } from 'react'
import { isEmpty } from 'lodash';

import googleIcon from '../../asset/images/icon-google.webp'
import Utils from '../../utils/utils';
import Button from '../../components/ui/button/Button'
import InputBox from '../../components/ui/input_box/InputBox';
import AnchorLink from '../../components/ui/anchorlink/AnchorLink';
import properties from '../../utils/properties';

import './Login.css';

class Login extends Component {
  constructor(props) {
    super(props)

    this.facebookButton = <div className='icon'><i className="fab fa-facebook-square"></i> Facebook</div>
    this.googleButton = <div className='icon'><img src={googleIcon} /> Google</div>

    this.username = '';
    this.password = '';

    this.state = {
      worningClassUsername: false,
      worningClassPassword: false
    }
  }

  handleInputUsername = (e) => {
    this.username = e
  }

  handleInputPassword = (e) => {
    this.password = e
  }

  //Funzione di controllo email e pws 
  checkInput = () => {
    let userChecked = Utils.validateEmail(this.username);

    let inputChecked = {};

    //Se email non è valida imposta lo state worning di email e pws a true
    if (!userChecked) {
      inputChecked.worningClassUsername = true;
    }

    if (this.password.length < 4) {
      inputChecked.worningClassPassword = true;
    }

    // Aggiornamento degli stati solo se l'oggetto è pieno (isEmpty è una funzione di lodash)
    if (!isEmpty(inputChecked)) {
      this.setState(inputChecked);
    } else {

      // Se Login avvenuto correttamente Indirizzami nel Welcome
      
       this.props.history.push(properties.ROUTING.WELCOME_PAGE,{
        validation:true,
        from: 'login'
       });
    }
  }

  // Forgot Password
  // handelForgotpsw = () => {
  //   let emailChecked = Utils.validateEmail(this.username);
  //   let inputChecked = {};
  //   if(!emailChecked){
  //     inputChecked.worningClassUsername = true;
  //   }

  //Aggiornamento degli stati solo se l'oggetto è pieno (isEmpty è una funzione di lodash)
  //   if (!isEmpty(inputChecked)) {
  //     this.setState(inputChecked);
  //   }
  // }

  // Al focus nelle input togliamo lo state di warning 
  handleInputFocus = (className) => () => {
    let obj = {};

    obj[className] = false

    this.setState(obj)
  }

  render() {
    return (
      <div className={'login'}>
        <div className="access-form">

          <header>
            <h1 className="title">
              Sign in with
            </h1>
          </header>

          <nav>
            <div className="container-button">
              <Button
                classCss='button-facebook'
                button_content={this.facebookButton}
              />
              <Button
                classCss='button-google'
                button_content={this.googleButton}
              />
            </div>
          </nav>

          <main>
            {/* worning_class è una props che aggiunge o toglie la classe alert che controlla i worning */}
            <InputBox
              label="Username"
              type="email"
              style={{ paddingTop: 31 }}
              warning_class={`${this.state.worningClassUsername ? 'alert' : ''}`}
              callback={this.handleInputUsername}
              callbackFocus={this.handleInputFocus('worningClassUsername')}
              cssContent="Username is required"
            />

            <InputBox
              label="Password"
              type="password"
              style={{ paddingTop: 13 }}
              inputLabelStyle={{ paddingTop: 0 }}
              content={<AnchorLink
                lable={'Forgot?'}
                link={properties.ROUTING.FORGOT_PSWD_PAGE}
                linkStyle={{ marginLeft: 5 }}
              //callbackForgotpsw={this.handelForgotpsw}
              />}
              callback={this.handleInputPassword}
              warning_class={`${this.state.worningClassPassword ? 'alert' : ''}`}
              callbackFocus={this.handleInputFocus('worningClassPassword')}
              cssContent="Password is required"
            />

            <div style={{ paddingTop: 17 }}>
              <Button
                callback={this.checkInput}
              />
            </div>

            <div className={'sign-up-link'}>
              <span>{'Not a member?'}</span>
              <AnchorLink
                lable={'Sign up now'}
                link={properties.ROUTING.REGISTRATION_PAGE}
              />
            </div>
          </main>

        </div>
      </div>
    )
  }

}

export default Login;
