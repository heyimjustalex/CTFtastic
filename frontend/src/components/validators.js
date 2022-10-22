
function emailValidator(input) {
    return String(input)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
}

function usernameValidator(input) {
    return String(input).match(/^(?=.{6,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/);
}

function teamNameValidator(input) {
    return String(input).match(/^(?=.{6,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/);
}


function titleValidator(input) {
    return String(input).match(/^[\S\s]{1,70}$/);
}

function oldPasswordValidator(input) {
    return String(input).match(/^[\S\s]{1,70}$/);
}

function descriptionValidator(input) {
    return String(input).match(/^[\S\s]{1,500}$/);
}


function passwordValidator(p) {
    var anUpperCase = /[A-Z]/;
    var aLowerCase = /[a-z]/;
    var aNumber = /[0-9]/;
    var aSpecial = /[!|@|#|$|%|^|&|*|(|)|-|_]/;
    var obj = {};
    obj.result = true;

    if (p.length < 8) {
        obj.result = false;
        obj.error = "Not long enough!"
        return obj.result;
    }

    var numUpper = 0;
    var numLower = 0;
    var numNums = 0;
    var numSpecials = 0;
    for (var i = 0; i < p.length; i++) {
        if (anUpperCase.test(p[i]))
            numUpper++;
        else if (aLowerCase.test(p[i]))
            numLower++;
        else if (aNumber.test(p[i]))
            numNums++;
        else if (aSpecial.test(p[i]))
            numSpecials++;
    }

    if (numUpper < 2 || numLower < 2 || numNums < 2 || numSpecials < 2) {
        obj.result = false;
        obj.error = "Wrong Format!";
        return obj.result;
    }
    return obj.result;
}

export { emailValidator, passwordValidator, usernameValidator, titleValidator, descriptionValidator, teamNameValidator, oldPasswordValidator };