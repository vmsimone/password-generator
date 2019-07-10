let KEY = 'test';
let HASH = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()'.split('');
let SHIFT = 24;
let MAX = 30;

function printPassword(password) {
    $('main').append(`
        <p>Your password is ${password}</p>
    `)
}

function shiftLetter(letter) {
    shiftedIndex = HASH.indexOf(letter) + SHIFT;
    //make this a while loop
    if (shiftedIndex > HASH.length) {
        shiftedIndex = shiftedIndex - HASH.length;
    }
    return HASH[shiftedIndex];
}

function encrypt(keyword) {
    let keywordArray = keyword.split('');
    for(i=0; i<keywordArray.length; i++) {
        keywordArray[i] = shiftLetter(keywordArray[i]);
    }
    return keywordArray.join('');
}

function generatePassword(keyword, maxLength) {
    let startingPosition = keyword.length;
    let keywordArray = keyword.split('');

    for (i=startingPosition; i<maxLength; i++) {
        keywordArray.unshift(
            shiftLetter(keywordArray[0])
        );
    }
    console.log(keywordArray.length);
    return keywordArray.join('');
}

function loadPage() {
    let encryptedKey = encrypt(KEY);
    let pass = generatePassword(encryptedKey, MAX);
    printPassword(pass);
}

$(loadPage);