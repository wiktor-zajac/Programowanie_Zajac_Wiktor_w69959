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

    static checkPhoneNumber(input) {
        return /[0-9]{9}/.test(input.value);
    }
}

class ValidationCustomMessages {
    static #framework(messageInvalid, checkFn, input, arg = undefined) {
        const isValid = checkFn(input, arg);
        input.setCustomValidity(!isValid ? messageInvalid : '');
        return isValid;
    }

    static checkRequired(input) {
        return this.#framework('To pole jest wymagane', ValidationHelper.checkRequired, input);
    }

    static checkLengthMin(input, min) {
        return this.#framework('Podana wartość jest zbyt krótka', ValidationHelper.checkLengthMin, input, min);
    }

    static checkLengthMax(input, max) {
        return this.#framework('Podana wartość jest zbyt długa', ValidationHelper.checkLengthMax, input, max);
    }

    static checkEmail(input) {
        return this.#framework('Podany adres email jest niepoprawny', ValidationHelper.checkEmail, input);
    }

    static checkPassword(input) {
        return this.#framework('Podane hasło nie spełnia wymogów bezpieczeństwa', ValidationHelper.checkPassword, input);
        // TODO: split password validation to each part (eg. 1 capital letter and 1 lower letter as separate messages)
    }

    static checkPasswordRepeat(inputPass, inputPassRepeat) {
        return this.#framework('Podane hasła nie zgadzają się', ValidationHelper.checkPasswordRepeat, inputPass, inputPassRepeat);
    }

    static checkOfAge(input) {
        return this.#framework('Musisz być osobą pełnoletnią aby skorzystać z tej usługi', ValidationHelper.checkOfAge, input);
    }

    static checkPhoneNumber(input) {
        return this.#framework('Podany numer telefonu jest niepoprawny', ValidationHelper.checkPhoneNumber, input);
    }
}

class Validator {
    static validate(input) {
        if (input.disabled) {
            input.setCustomValidity('');
            return true;
        }

        if (input.required && !ValidationCustomMessages.checkRequired(input))
            return false;

        if (input.minLength > 0 && !ValidationCustomMessages.checkLengthMin(input, input.minLength))
            return false;

        if (input.maxLength > 0 && !ValidationCustomMessages.checkLengthMax(input, input.maxLength))
            return false;

        if (input.type == 'email')
            return ValidationCustomMessages.checkEmail(input);

        if (input.type == 'password' && input.id != 'form-input-password-repeat')
            return ValidationCustomMessages.checkPassword(input);

        if (input.id == 'form-input-password-repeat')
            return ValidationCustomMessages.checkPasswordRepeat(input, fiPassword);

        if (input.id == 'form-input-dob')
            return ValidationCustomMessages.checkOfAge(input);

        if (input.id == 'form-input-phone')
            return ValidationCustomMessages.checkPhoneNumber(input);

        return true;
    }
}

const updateAddressInputs = () => {
    const
        countryIsPoland = fiCountry.value.toLowerCase() == 'polska' || fiCountry.value.toLowerCase() == 'pl',
        countryFieldEmpty = fiCountry.value.length == 0;
    const
        voivodeshipTextDisabled = countryIsPoland || countryFieldEmpty,
        addressDisabled = !countryIsPoland && fiVoivodeshipText.value.length == 0 || countryFieldEmpty,
        correspondenceAddressDisabled = addressDisabled || fiCorrespondenceCheck.checked;

    fiVoivodeshipText.disabled = voivodeshipTextDisabled;
    fiVoivodeshipSelect.disabled = !countryIsPoland;
    fiAddress.disabled = addressDisabled;
    fiCorrespondenceAddress.disabled = correspondenceAddressDisabled;

    fiCorrespondenceAddressContainer.classList.toggle('hidden', fiCorrespondenceCheck.checked);
    fiVoivodeshipTextContainer.classList.toggle('hidden', countryIsPoland);
    fiVoivodeshipSelectContainer.classList.toggle('hidden', !countryIsPoland);
}

const form = $('.form'),
    fiVoivodeshipTextContainer = $fi('voivodeship-text-container'),
    fiVoivodeshipSelectContainer = $fi('voivodeship-select-container'),
    fiCorrespondenceAddressContainer = $fi('correspondence-address-container');

const formInputs = [
    fiCorrespondenceAddress = $fi('correspondence-address'),
    fiCorrespondenceCheck = $fi('correspondence-check'),
    fiAddress = $fi('address'),
    fiVoivodeshipSelect = $fi('voivodeship-select'),
    fiVoivodeshipText = $fi('voivodeship-text'),
    fiCountry = $fi('country'),
    $fi('dob'),
    fiPhone = $fi('phone'),
    $fi('gender'),
    $fi('password-repeat'),
    fiPassword = $fi('password'),
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
        updateAddressInputs();
    }
});

formInputs.forEach((input) => {
    input.addEventListener('input', () => {
        Validator.validate(input);
        input.checkValidity();
    });
});

fiCountry.addEventListener('input', () => updateAddressInputs());
fiVoivodeshipText.addEventListener('input', () => updateAddressInputs());
fiCorrespondenceCheck.addEventListener('input', () => updateAddressInputs());
fiPhone.addEventListener('beforeinput', (e) => {
    if (e.inputType != 'insertFromPaste' &&
        e.inputType != 'deleteContentForward' &&
        e.inputType != 'deleteContentBackward' &&
        (e.inputType != 'insertText' || isNaN(parseInt(e.data)))
    ) {
        e.preventDefault();
        return;
    }
});
