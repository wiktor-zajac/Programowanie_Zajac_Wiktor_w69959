const $ = (s, c = document) => c.querySelector(s);
const $fi = (s, c = document) => c.querySelector('#form-input-' + s);

class ValidationHelper {
    static checkRequired(input) {
        return input.value.length > 0;
    }

    static checkLengthMin(input, min) {
        return input.value.length >= min;
    }

    static checkLengthMax(input, max) {
        return input.value.length <= max;
    }

    static checkEmail(input) {
        const splitted = input.value.split('@');

        if (splitted.length != 2) return false;

        const [local, domain] = splitted;

        if (!local.match(/[A-Za-z0-9]{1}[A-Za-z0-9.+-]{0,62}[A-Za-z0-9]{1}/))
            return false;

        if (local.match(/\.\./))
            return false;

        if (!domain.match(/[A-Za-z0-9]{1}[A-Za-z0-9.-]{0,251}[A-Za-z0-9]{1}/))
            return false;

        if (domain.match(/\.\./))
            return false;

        return true;
    }

    static checkPassword(input) {
        // Regex from: https://regexr.com/3bfsi
        return input.value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
    }

    static checkPasswordRepeat(inputPass, inputPassRepeat) {
        return inputPass.value == inputPassRepeat.value;
    }

    static checkOfAge(input) {
        // 18 years, days in year, hours, minutes, seconds, miliseconds
        const validAgeTimeSpanMs = 18 * 365.242199 * 24 * 60 * 60 * 1000;
        return input.valueAsNumber < Date.now() + validAgeTimeSpanMs;
    }
}

class ValidationCustomMessages {
    static checkRequired(input) {
        const isValid = ValidationHelper.checkRequired(input);
        if (!isValid)
            input.setCustomValidity('To pole jest wymagane');
        else
            input.setCustomValidity('');
        return isValid;
    }

    static checkLengthMin(input, min) {
        const isValid = ValidationHelper.checkLengthMin(input, min);
        if (!isValid)
            input.setCustomValidity('Podana wartość jest zbyt krótka');
        else
            input.setCustomValidity('');
        return isValid;
    }

    static checkLengthMax(input, max) {
        const isValid = ValidationHelper.checkLengthMin(input, max);
        if (!isValid)
            input.setCustomValidity('Podana wartość jest zbyt długa');
        else
            input.setCustomValidity('');
        return isValid;
    }

    static checkEmail(input) {
        const isValid = ValidationHelper.checkEmail(input);
        if (!isValid)
            input.setCustomValidity('Podany adres email jest niepoprawny');
        else
            input.setCustomValidity('');
        return isValid;
    }

    static checkPassword(input) {
        // TODO: split password validation to each part (eg. 1 capital letter and 1 lower letter as separate messages)
        const isValid = ValidationHelper.checkPassword(input);
        if (!isValid)
            input.setCustomValidity('Podane hasło nie spełnia wymogów bezpieczeństwa');
        else
            input.setCustomValidity('');
        return isValid;
    }

    static checkPasswordRepeat(inputPass, inputPassRepeat) {
        const isValid = ValidationHelper.checkPasswordRepeat(inputPass, inputPassRepeat);
        if (!isValid)
            inputPassRepeat.setCustomValidity('Podane hasła nie zgadzają się');
        else
            inputPassRepeat.setCustomValidity('');
        return isValid;
    }

    static checkOfAge(input) {
        const isValid = ValidationHelper.checkOfAge(input);
        if (!isValid)
            input.setCustomValidity('Musisz być osobą pełnoletnią aby skorzystać z tej usługi');
        else
            input.setCustomValidity('');
        return isValid;
    }
}

class Validator {
    static validate(input) {
        if (input.id == 'form-input-correspondence-address' && formInputsCorrespondenceCheck.checked) {
            input.setCustomValidity('');
            return true;
        }

        if (input.required && !ValidationCustomMessages.checkRequired(input))
            return false;

        if (input.minLength > 0 && !ValidationCustomMessages.checkLengthMin(input, input.minLength))
            return false;

        if (input.maxLength > 0 && !ValidationCustomMessages.checkLengthMax(input, input.maxLength))
            return false;

        if (input.type == 'email' && !ValidationCustomMessages.checkEmail(input))
            return false;

        if (input.type == 'password' && input.id != 'form-input-password-repeat' && !ValidationCustomMessages.checkPassword(input))
            return false;

        if (input.id == 'form-input-password-repeat' && !ValidationCustomMessages.checkPasswordRepeat(formInputPassword, input))
            return false;

        if (input.id == 'form-input-dob' && !ValidationCustomMessages.checkOfAge(input))
            return false;

        return true;
    }
}

const updateDisabledStatus = () => {
    formInputsVoivodeship.disabled = formInputsCountry.value.length == 0;
    formInputsAddress.disabled = formInputsVoivodeship.disabled || formInputsVoivodeship.value.length == 0;
    formInputsCorrespondenceAddress.disabled = formInputsCorrespondenceCheck.checked || formInputsVoivodeship.disabled || formInputsVoivodeship.value.length == 0;
    formInputsCorrespondenceAddressContainer.classList.toggle('hidden', formInputsCorrespondenceCheck.checked);
}

const
    form = $('.form'),
    formInputPassword = $fi('password'),
    formInputsCountry = $fi('country'),
    formInputsVoivodeship = $fi('voivodeship'),
    formInputsVoivodeshipSelect = $fi('voivodeship-select'),
    formInputsAddress = $fi('address'),
    formInputsCorrespondenceCheck = $fi('correspondence-check'),
    formInputsCorrespondenceAddress = $fi('correspondence-address'),
    formInputsCorrespondenceAddressContainer = $fi('correspondence-address-container');

const formInputs = [
    formInputsCorrespondenceAddress,
    formInputsCorrespondenceCheck,
    formInputsAddress,
    // // formInputsVoivodeshipSelect,
    formInputsVoivodeship,
    formInputsCountry,
    $fi('dob'),
    $fi('phone'),
    $fi('gender'),
    // $fi('password-repeat'),
    // formInputPassword,
    $fi('email'),
    $fi('last-name'),
    $fi('first-name'),
];

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const reports = [];
    for (const input of formInputs) {
        Validator.validate(input);
        reports.push(input.reportValidity());
    }

    if (reports.every(x => x == true)) {
        alert('Wysłano formularz!');
        form.reset();
        updateDisabledStatus();
    }
});

formInputsCountry.addEventListener('input', () => updateDisabledStatus());
formInputsVoivodeship.addEventListener('input', () => updateDisabledStatus());
formInputsCorrespondenceCheck.addEventListener('input', () => updateDisabledStatus());
