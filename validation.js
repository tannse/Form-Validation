function validator(options) {
    function validate(inputElement, rule) {
        var errorElement = rule.test(inputElement.value);
        var errorMessage = inputElement.parentElement.querySelector(
            options.errorMessage
        );
        if (errorElement) {
            errorMessage.innerHTML = errorElement;
            errorMessage.parentElement.classList.add("invalid");
        } else {
            errorMessage.innerHTML = "";
            errorMessage.parentElement.classList.remove("invalid");
        }
    }
    var formElement = document.querySelector(options.form);

    if (formElement) {
        options.rules.forEach(function (rule) {
            var inputElement = formElement.querySelector(rule.selector);
            var errorMessage = inputElement.parentElement.querySelector(
                options.errorMessage
            );
            if (inputElement) {
                // Handling for the scenario people blur out
                inputElement.onblur = function () {
                    validate(inputElement, rule);
                };
                // Handling for the scenario people start to write
                inputElement.oninput = function () {
                    errorMessage.innerHTML = "";
                    errorMessage.parentElement.classList.remove("invalid");
                };
            }
        });
    }
}

validator.isRequired = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            return value.trim()
                ? undefined
                : message || " Get wrong please check again";
        },
    };
};
validator.isEmail = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            var regax = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regax.test(value)
                ? undefined
                : message || " This is not a email";
        },
    };
};
validator.minLength = function (selector, min, message) {
    return {
        selector: selector,
        test: function (value) {
            return value.length >= min
                ? undefined
                : message || ` Maximum  ${min} alphabet`;
        },
    };
};
validator.isConfirmed = function (selector, cb, message) {
    return {
        selector: selector,
        test: function (value) {
            return value === cb()
                ? undefined
                : message || " The password not the same please try again";
        },
    };
};
