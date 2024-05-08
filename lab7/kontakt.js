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

        if (input.id == 'form-input-phone')
            return ValidationCustomMessages.checkPhoneNumber(input);

        return true;
    }
}

class Contact {
    firstName = '';
    lastName = '';
    phoneNumber = '';

    constructor(fname, lname, pnum) {
        this.firstName = fname;
        this.lastName = lname;
        this.phoneNumber = pnum;
    }
}

class ContactList {
    #contactList = [];

    constructor(contactList = []) {
        this.#contactList = contactList;
    }

    addContact(fname, lname, pnum) {
        const contact = new Contact(fname, lname, pnum);
        this.addContact(contact);
    }

    addContact(contact) {
        this.#contactList.push(contact);
    }

    get contacts() {
        return this.#contactList;
    }
}

const form = $('.form'),
    tableBody = $('#contact-list-tbody');

const formInputs = [
    phoneNumber = $fi('phone'),
    firstName = $fi('last-name'),
    lastName = $fi('first-name'),
];

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const reports = [];
    for (const input of formInputs) {
        Validator.validate(input);
        reports.push(input.reportValidity());
    }

    if (reports.every(x => x == true)) {
        const
            row = tableBody.insertRow(),
            contact = new Contact(firstName.value, lastName.value, phoneNumber.value),
            propertiesToDisplay = Reflect.ownKeys(contact);

        for (const property of propertiesToDisplay) {
            const cell = row.insertCell();
            cell.innerHTML = contact[property];
        }

        form.reset();
    }
});

formInputs.forEach((input) => {
    input.addEventListener('input', () => {
        Validator.validate(input);
        input.checkValidity();
    });
});
