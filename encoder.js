let HASH = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()'.split('');
let SHIFT = 24;
let MAX = 30;

function printPassword(password) {
    $('main').append(`
        <p>Your password is ${password}</p>
    `)
}

function createHash() {
    const hashbrown = $('input[type="checkbox"][checked="true"]').val();
    console.log(hashbrown);
}

function shiftLetter(letter) {
    createHash();
    shiftedIndex = HASH.indexOf(letter) + SHIFT;
    while (shiftedIndex > HASH.length) {
        shiftedIndex = shiftedIndex - HASH.length;
    }
    return HASH[shiftedIndex];
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