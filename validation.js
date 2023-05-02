<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
        <link rel="stylesheet" href="style.css" />
    </head>
    <body>
        <div class="main">
            <form action="" method="POST" class="form" id="form-1">
                <h3 class="heading">Register Account Be Member</h3>
                <p class="desc">Wellcome To My Projekt ❤️</p>

                <div class="spacer"></div>

                <div class="form-group">
                    <label for="fullname" class="form-label">Full Name</label>
                    <input
                        id="fullname"
                        name="fullname"
                        type="text"
                        placeholder="VD: Sofia Johansson"
                        class="form-control"
                    />
                    <span class="form-message"></span>
                </div>

                <div class="form-group">
                    <label for="email" class="form-label">Email</label>
                    <input
                        id="email"
                        name="email"
                        type="text"
                        placeholder="VD: email@domain.com"
                        class="form-control"
                    />
                    <span class="form-message"></span>
                </div>

                <div class="form-group">
                    <label for="password" class="form-label">Password</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Write pass here"
                        class="form-control"
                    />
                    <span class="form-message"></span>
                </div>

                <div class="form-group">
                    <label for="password_confirmation" class="form-label"
                        >Confirm Password</label
                    >
                    <input
                        id="password_confirmation"
                        name="password_confirmation"
                        placeholder="Confirm again"
                        type="password"
                        class="form-control"
                    />
                    <span class="form-message"></span>
                </div>

                <button class="form-submit">Register Account</button>
            </form>
        </div>
        <script src="./validationfake.js"></script>
        <script>
            validator({
            
                form: "#form-1",
                errorMessage: ".form-message",
                rules: [
                    validator.isRequired(
                        "#fullname",
                        "Please write your full name :)"
                    ),
                    validator.isRequired(
                        "#email",
                        "Please write your email :)"
                    ),
                    validator.isEmail(
                        "#email",
                        "This format not a type of email"
                    ),
                    validator.isRequired(
                        "#password",
                        "Please do not let it empty:)"
                    ),
                    validator.minLength("#password", 6, "Minimum 6 char"),
                    validator.isConfirmed(
                        "#password_confirmation",
                        function () {
                            return document.querySelector("#form-1 #password")
                                .value;
                        },
                        "Confirmed password is not correct"
                    ),
                    validator.isRequired(
                        "#password_confirmation",
                        "Please do not let it empty:)"
                    ),
                ],
                onSubmit: function (data) {
                    console.log(data);
                },
            });
        </script>
    </body>
</html>
