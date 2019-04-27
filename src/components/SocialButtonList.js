import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Jumbotron } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './bootstrap-social.css';


const propTypes = {
    buttonList: PropTypes.shape({
        github: PropTypes.shape({
            visible: PropTypes.bool.isRequired,
            provider: PropTypes.func.isRequired
        }),
        twitter: PropTypes.shape({
            visible: PropTypes.bool.isRequired,
            provider: PropTypes.func.isRequired
        }),
        facebook: PropTypes.shape({
            visible: PropTypes.bool.isRequired,
            provider: PropTypes.func.isRequired
        })
    }).isRequired,
    auth: PropTypes.func.isRequired,
    currentProviders: PropTypes.func
};

const defaultProps = {
    currentProviders: null
};

const SocialButtonList = ({ history, buttonList, auth, currentProviders }) => {
    const authHandler = authData => {
        if (authData) {
            if (currentProviders === null) {
                history.push('/dashboard');
            } else {
                currentProviders(authData.user.providerData);
            }
        } else {
            console.error('Error authenticating');
        }
    };

    const authenticate = (e, provider) => {
        const providerOAuth = buttonList[provider].provider();

        if (!auth().currentUser) {
            auth()
                .signInWithPopup(providerOAuth)
                .then(authHandler)
                .catch(err => console.error(err));
        }
    };

    const renderButtonList = provder => {
        const visible = buttonList[provder].visible;
        if (!auth().currentUser) {
            return (
                <a
                    key={provder}
                    className={`btn btn-block btn-social btn-${provder} btn-lg`}
                    onClick={e => authenticate(e, provder)}
                >
                    <span className={`fab fa-${provder}`}></span>
                    Sign in with  {provder}
                </a>
            );

        }

    };

    return (

        <Jumbotron>
            <p>Hello, world!</p>
            <div className="btn__social--list">
                {Object.keys(buttonList).map(renderButtonList)}
            </div>
        </Jumbotron>
    );
};

SocialButtonList.propTypes = propTypes;
SocialButtonList.defaultProps = defaultProps;

export default withRouter(SocialButtonList);