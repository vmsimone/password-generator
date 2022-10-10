function loadPage() {
    $('input[type="checkbox"]').on('change', () => {
        showCurrentHash();
    });

    $('input[type="number"]').on('change', () => {
        showCurrentNumbers();
    });
    
    $('form').on('submit', (e) => {
        e.preventDefault();
        generatePassword();
    });
}

function showCurrentHash() {
    const currentHash = createHash().join('');
    $('#current-hash').text(currentHash);
}

function showCurrentNumbers() {
    const currentMax = $('input[name="max"]').val();
    const currentShift = $('input[name="shift"]').val();

    $('#max').text(currentMax);
    $('#shift').text(currentShift);
}

function generatePassword() {
    const keyword = $('input[name="keyword"]').val();
    const secretNumber = $('input[name="shift"]').val();
    const max = $('input[name="max"]').val();

    const encryptedPassword = encryptPassword({ key: keyword, shift: secretNumber, maxLength: max });
    //const secondPass = encryptPassword({ key: encryptedPassword, shift: (secretNumber + 5), maxLength: max });
    // const encryptedKey = encrypt(key);
    // const pass = hashPassword(encryptedKey, max);
    printPassword(encryptedPassword);
}

function encryptPassword(inputObject) {
    const hash = createHash();
    const shift = parseInt(inputObject.shift);
    const maxLength = inputObject.maxLength;

    let keywordArray = inputObject.key.split('');
    let location = hash.indexOf(keywordArray[0])

    for(i=0; keywordArray.length<maxLength; i++) {
        location = location + hash.indexOf(keywordArray[i]) + shift;

        while (location >= hash.length) {
            location = location - hash.length;
        }
        console.log(location);

        keywordArray[i] = hash[location];
        keywordArray.push(hash[location + shift]);
    }
    return keywordArray.join('');
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

function valueIfChecked(inputName) {
    const boxIsChecked = $(`input[name=${inputName}]`).prop('checked');
    if (boxIsChecked) {
        return $(`input[name=${inputName}]`).val();
    } else {
        return '';
    }
}

function printPassword(password) {
    $('#your-pass').text(`
        Your password is ${password}
    `)
}

$(loadPage);