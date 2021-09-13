import './Button.css';

const Button = (props) => {

    const handleCallback = () => {
        if (props.callback) {
            props.callback()
        }
    }

    return (
        <button
            style={props.style}
            className={`button-default ${props.classCss}`}
            onClick={handleCallback}>
            {props.button_content}
        </button>
    )
}

Button.defaultProps = {
    button_content: 'Sign In'
}

export default Button;