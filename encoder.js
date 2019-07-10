let SHIFT = 24;
let MAX = 30;

function printPassword(password) {
    $('main').append(`
        <p>Your password is ${password}</p>
    `)
}

function valueIfChecked(inputName) {
    const boxIsChecked = $(`input[name=${inputName}]`).prop('checked');
    if (boxIsChecked) {
        return $(`input[name=${inputName}]`).val();
    } else {
        return '';
    }
}

function createHash() {
    let hash = '';

    let caps = valueIfChecked("capital-letters");
    let lowercase = valueIfChecked("lowercase-letters");
    let numbers = valueIfChecked("numbers");
    let symbols = valueIfChecked("symbols");

    hash = caps + lowercase + numbers + symbols;
    return hash.split('');
}

function shiftLetter(letter) {
    let hash = createHash();
    shiftedIndex = hash.indexOf(letter) + SHIFT;
    while (shiftedIndex > hash.length) {
        shiftedIndex = shiftedIndex - hash.length;
    }
    return hash[shiftedIndex];
}

function encrypt(keyword) {
    let keywordArray = keyword.split('');
    for(i=0; i<keyword.length; i++) {
        keywordArray[i] = shiftLetter(keywordArray[i]);
    }
    return keywordArray.join('');
}

function hashPassword(keyword, maxLength) {
    let startingPosition = keyword.length;
    let keywordArray = keyword.split('');

    for (i=startingPosition; i<maxLength; i++) {
        keywordArray.unshift(
            shiftLetter(keywordArray[0])
        );
    }
    return keywordArray.join('');
}

function generatePassword() {
    const key = $('input[name="keyword"]').val();
    let encryptedKey = encrypt(key);
    let pass = hashPassword(encryptedKey, MAX);
    printPassword(pass);
}

function loadPage() {
    $('form').on('submit', (e) => {
        e.preventDefault();
        generatePassword();
    });
}

$(loadPage);