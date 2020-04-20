class Authentication {
    static async userSignUp(req, res) {
        return res.send({})
        // FLOW //
        // user sends in input body which contains his/her details
        // details should include firstname, lastname, email, password
        // first off validate the inputs before checing against the db
        // if validation check met
        // check the user email against db to ensure does not already exist in db
        // if yes, throw an error response 
        // else proceed
        // hash user password and salt the hash
        // next is to encode user details in a jwt token
        // then save data in db 
        // return success response along with data and token
        // end
    }

    static async userSignIn(req, res) {
        return res.send({})
        // FLOW //
        // user sends in his/her credentials which include email and password
        // validate the requset body to ensure they meet with the necessary validation checks
        // if no, throw err
        // else continue
        // check the email provided against database
        // if not in database return an error response
        // else if exist, verify the request password against the hash stored in database
        // if not the same throw error
        // else create a jwt token for user i.e tokenize user details needed for the session
        // return success login response
    }

    static async forgotPassword(req, res) {
        return res.send({})
        // FLOW // `/auth/password
        // user sends in details on forgetting password
        // the only detail required to verify user at this point is his/her email
        // user sends in his/her email
        // first off validate user input 
        // if validation successful, check email against database
        // if email is not in database throw an error response
        // generate a token(reset_password_token) for email in db and save in db
        // then send a link to reset password to user email(this link should have an expiry of say 1hour)
        // this link should contain the password_reset_toen that has been saved against user data in db
        // return successful response for user to check email for the next steps
    }

    static async resetPassword(req, res) {
        return res.send({})
        // FLOW // route `/users/password/edit?reset_password_token=token`
        // user sends in credentials which include new password
        // validate the req body sent in by user
        // if validation not met, throw error
        // check reset_token in db with that in the request params
        // it should be valid, same as the one in db and not expired
        // else throw an error
        // if checks met, 
        // else, hash user new password and salt it
        // save new password hash in db
        // return success response
    }


    // middle wares to be created
    // validation of req bodies to ensure they're good and not empty
    // verify user middleware to check if logged in user is authenticated and/or authorized to access routes(e.g isLoggedIn, isAdmin)

    // helpers
    // hash and salt password
    // verify password against hash
    // authentication(encode token)
    // authorization(decode token)
    // email functions for sending email on signup(sendgrid or nodemailer api would be used)
    // email function to send email on forgot password

    //utils
    // response body format either success or failure
}

export default Authentication;
