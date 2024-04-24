const $ = (s, c = document) => c.querySelector(s);
const $fi = (s, c = document) => c.querySelector('#form-input-' + s);

class Validator {
    static isEmpty(input) {
        return input.value.length > 0;
    }

    static getLength(input) {
        return input.value.length;
    }

    static checkEmail(input) {
        const splitted = input.value.split('@');

        if (splitted.length != 2) return false;

        const [local, domain] = splitted;

        if (!local.match(/[A-Za-z0-9]{1}[A-Za-z0-9.+-]{0,62}[A-Za-z0-9]{1}/))
            return false;

        if (!local.match(/\.\./))
            return false;

        if (!domain.match(/[A-Za-z0-9]{1}[A-Za-z0-9.-]{0,251}[A-Za-z0-9]{1}/))
            return false;

        if (!domain.match(/\.\./))
            return false;

        return true;
    }

    static checkPassword(input) {
        const rawPassword = input.value;

        // Regex from: https://regexr.com/3bfsi
        if (!rawPassword.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/))
            return false;

        return true;
    }
}

const formInputs = {
    firstName: $fi('first-name'),
    lastName: $fi('last-name'),
    email: $fi('email'),
    password: $fi('password'),
    passwordRepeat: $fi('password-repeat'),
    gender: $fi('gender'),
    phone: $fi('phone'),
    dateOfBirth: $fi('dob'),
    country: $fi('country'),
    voivodeship: $fi('voivodeship'),
    address: $fi('address'),
    correspondenceCheck: $fi('correspondence-check'),
    correspondenceAddress: $fi('correspondence-address'),
}
// CONTINUE 1e