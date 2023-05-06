function validator(options) {
    var selectorRules = {};
    function validate(inputElement, rule) {
        var errorElement = rule.test(inputElement.value);
        var rules = selectorRules[rule.selector];
        for (let i = 0; i < rules.length; i++) {
            errorElement = rules[i](inputElement.value);
            if (errorElement) break;
        }

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
        return !errorElement;
    }
    function removeError(errorMessage) {
        errorMessage.innerHTML = "";
        errorMessage.parentElement.classList.remove("invalid");
    }
    var elementForm = document.querySelector(options.form);
    if (elementForm) {
        elementForm.onsubmit = function (e) {
            e.preventDefault();

            var isValidForm = true;
            options.rules.forEach(function (rule) {
                var inputElement = document.querySelector(rule.selector);
                var isValid = validate(inputElement, rule);

                if (!isValid) {
                    isValidForm = false;
                }
            });

            if (isValidForm) {
                if (typeof options.onSubmit === "function") {
                    var Enebleinput = elementForm.querySelectorAll("[name]");
                    var formValues = Array.from(Enebleinput).reduce(function (
                        value,
                        input
                    ) {
                        value[input.name] = input.value;
                        return value;
                    },
                    {});
                    options.onSubmit({ formValues });
                }
            }
        };
    }

    options.rules.forEach(function (rule) {
        var inputElement = document.querySelector(rule.selector);
        if (selectorRules[rule.selector]) {
            selectorRules[rule.selector].push(rule.test);
        } else {
            selectorRules[rule.selector] = [rule.test];
        }
        if (inputElement) {
            inputElement.onblur = function () {
                validate(inputElement, rule);
            };
            var errorMessage = inputElement.parentElement.querySelector(
                options.errorMessage
            );
            if (errorMessage) {
                inputElement.oninput = function () {
                    removeError(errorMessage);
                };
            }
        }
    });
}

validator.isRequired = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            return value.trim() ? undefined : message;
        },
    };
};
validator.isEmail = function (selector) {
    return {
        selector: selector,
        test: function (value) {
            var regax = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regax.test(value)
                ? undefined
                : "Định dạng này không phải email";
        },
    };
};
validator.minLength = function (selector, min) {
    return {
        selector: selector,
        test: function (value) {
            return value.length <= min
                ? undefined
                : `Mật khẩu tối thiểu ${min} kí tự`;
        },
    };
};
validator.isConfirmed = function (selector, cb) {
    return {
        selector: selector,
        test: function (value) {
            return value === cb()
                ? undefined
                : `The password not the same please try again`;
        },
    };
};
