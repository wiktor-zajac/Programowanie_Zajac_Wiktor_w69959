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
