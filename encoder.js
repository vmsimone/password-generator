let MAX = 30;

function printPassword(password) {
    $('#your-pass').text(`
        Your password is ${password}
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

function showCurrentHash() {
    const currentHash = createHash().join('');
    $('#current-hash').text(currentHash);
}

function createHash() {
    let hash = '';

    const caps = valueIfChecked("capital-letters");
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = valueIfChecked("numbers");
    const symbols = valueIfChecked("symbols");

    hash = caps + lowercase + numbers + symbols;
    return hash.split('');
}

function shiftLetter(letter) {
    const hash = createHash();
    const shift = $('input[name="shift"]').val();

    shiftedIndex = hash.indexOf(letter) + shift;
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
    const max = $('input[name="max"]').val();

    const encryptedKey = encrypt(key);
    const pass = hashPassword(encryptedKey, max);
    printPassword(pass);
}

function loadPage() {
    $('input[type="checkbox"]').on('change', () => {
        showCurrentHash();
    });
    
    $('form').on('submit', (e) => {
        e.preventDefault();
        generatePassword();
    });
}

$(loadPage);