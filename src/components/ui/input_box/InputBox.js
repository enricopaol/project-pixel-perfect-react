import './InputBox.css';

const InputBox = (props) => {

    const handleCallback = (e) => {
        props.callback(e.target.value, props.name)
    }

    const handleOnFocus = (e) => {
        if (props.callbackFocus) {
            props.callbackFocus()
        }
    }

    return (
        <div className="input-group-container">
            <div className="input-label-container" style={props.style}>
                <span className="input-label" style={{ paddingTop: '13px', ...props.inputLabelStyle }}>{props.label}</span>

                {
                    props.content &&
                    <div>{props.content}</div>
                }

            </div>

            {/* Accetta la props worning class (alert) che si aggiunge a quella di defautl per affar apparire il worning gestito da css*/}
            <div
                className={`input-box-container ${props.warning_class}`}
                cssContent={props.cssContent}
            >
                <input
                    name={props.name}
                    className="input-box"
                    type={props.type}
                    onChange={handleCallback}
                    onFocus={handleOnFocus}
                    cssContent={props.cssContent}
                    maxLength={props.maxlength}
                    minLength={props.minlength}
                ></input>
                <span className="input-box-focus"></span>
            </div>
        </div>
    )
}

export default InputBox;