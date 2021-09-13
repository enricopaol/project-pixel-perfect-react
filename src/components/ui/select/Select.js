import './Select.css'

const Select = (props) => {

    const handleSelect = (e) => {
        props.callback(e.target.value,props.name)
    }

    const handleSelectFocus = () => {
        if(props.callbackFocus) {
            props.callbackFocus();
        }
    }

    return (
        <div className="select-group-container">
            <div className="select-label-container" style={{ paddingTop: '13px' }}>
                <label className="select-label">{props.lable}</label>
            </div>

            <div 
                className={`select-box-container ${props.warning_class}`} 
                cssContent={props.cssContent}
            >
                <select
                    className="select-input"
                    onChange={handleSelect}  
                    onFocus={handleSelectFocus} 
                    name = {props.name}                 
                >
                    <option selected disabled value="">Select</option>
                    {
                        props.options.map((option, index) => {
                            return (
                                <option key={index} value={props.option}>
                                    {option}
                                </option>
                            )
                        })
                    }
                </select>
                <span className='select-focus'></span>
            </div>

        </div>

    )
}

export default Select