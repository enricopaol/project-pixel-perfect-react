import { Component } from 'react';
import './Welcome.css';
import { get } from 'lodash';
import AnchorLink from '../../components/ui/anchorlink/AnchorLink'
import properties from '../../utils/properties';
class Welcome extends Component {
    constructor(props) {
        super(props)

        // Validazione forgot pwd e registration
        this.validate = get(this.props, 'location.state.validation', false);

        this.pageFrom = get(this.props, 'location.state.from', false);

        if (!this.validate || !this.pageFrom) {
            this.props.history.push(properties.ROUTING.LOGIN_PAGE, {
                validatePsw: 'Non autorizzato'
            });
        }
    }

    render() {
        return (
            <div className={'Welcome'}>
                <div className="access-form">

                    <header>
                        <h1 className="title">
                            Welcome
                        </h1>
                    </header>

                    <nav>
                        {
                            this.pageFrom === 'login' &&
                            <div className="ValidationTrue">Successful Login</div>
                        }
                        {
                            this.pageFrom === 'registration' &&
                            <div className="ValidationTrue">Successful Registration</div>
                        }
                        {
                            this.pageFrom === 'forgot-pwd' &&
                            <div className="ValidationTrue">Successful Reset Password</div>
                        }
                        <AnchorLink
                            link={properties.ROUTING.LOGIN_PAGE}
                            lable={'Return Login'}
                        />
                    </nav>
                </div>
            </div>
        )
    }
}

export default Welcome;