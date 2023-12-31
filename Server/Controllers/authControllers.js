import User from "../schemas/User.js";
import jwt from "jsonwebtoken";
import bodyParser from "body-parser";

// handle errors
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { email: '', password: '' };

    // incorrect email
    if (err.message === 'incorrect email') {
        errors.email = 'That email is not registered';
    }

    // incorrect password
    if (err.message === 'incorrect password') {
        errors.password = 'That password is incorrect';
    }

    // duplicate email error
    if (err.code === 11000) {
        errors.email = 'that email is already registered';
        return errors;
    }

    // validation errors
    if (err.message.includes('user validation failed')) {
        // console.log(err);
        Object.values(err.errors).forEach(({ properties }) => {
            // console.log(val);
            // console.log(properties);
            errors[properties.path] = properties.message;
        });
    }

    return errors;
}

// create json web token
const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
    return jwt.sign({ id }, 'special secret', {
        expiresIn: 3 * 24 * 60 * 60
    });
};

// // controller actions
const signup_get = (req, res) => {
    res.render('signup');
}

const login_get = (req, res) => {
    res.render('login');
}

const signup_post = async (req, res) => {
    const { email, password, Username } = req.body;
    console.log(req.body);
    try {
        const user = await User.create({ email, password, Username });
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(201).json({ user: user._id });
    }
    catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }

}

const login_post = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, {
            // httpOnly: true,
            // maxAge: maxAge * 1000,
            httpOnly: true,
            maxAge: maxAge * 1000,
            domain: 'localhost',
            sameSite: 'Lax',
            secure: false,
            path: '/',
        });
        // res.status(200).json({ user: user._id });
        res.status(200).json({ user_id: user._id, username: user.Username, email: user.email });
    }
    catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }

}

const logout_get = (req, res) => {
    console.log('Logout route reached'); // Debugging line
    res.clearCookie('jwt');
    res.redirect('/');
}

export default {
    signup_get,
    login_get,
    signup_post,
    login_post,
    logout_get
}