import moment from 'moment';

const Utils = {
    validateEmail: (params) => {
        return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(params);
    },

    validateDate: (params)=>{
        // return new RegExp("([0-9]{4}[-](0[1-9]|1[0-2])[-]([0-2]{1}[0-9]{1}|3[0-1]{1})|([0-2]{1}[0-9]{1}|3[0-1]{1})[-](0[1-9]|1[0-2])[-][0-9]{4})").test(params);
        let sixteenYearsAgo = moment().subtract(16, 'years');

        // let inputDateMajorSixTeen = moment(params).isBefore();
        if(moment(params, 'YYYY-MM-DD').isSameOrAfter(sixteenYearsAgo)) {
            return false
        }

        return true
    }
}

export default Utils