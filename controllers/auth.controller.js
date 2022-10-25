import { getHashWithSalt, getHashedString } from '../hash.js';
import HttpException from '../exceptions/HttpException.js';

class AuthController {
  constructor(db) {
    this.db = db;
  }

  signUp = async (req, res, next) => {
    try {
      const { name, email, password, postal, address, gender } = req.body;

      const hashedPassword = getHashedString(password);

      const postSignUp = await this.db.User.create({
        name,
        email,
        password: hashedPassword,
        postal,
        address,
        gender,
      });

      console.log('Sign up: ', postSignUp);

      res.status(200).json({
        success: true,
        data: { name: name },
      });
      console.log('Signed up!');
    } catch (err) {
      console.log(err);
      next(err);
    }
  };

  signIn = async (req, res, next) => {
    const cookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    };

    try {
      const { email, password } = req.body;

      const user = await this.db.User.findOne({
        where: {
          email: email,
        },
      });

      console.log('Login: ', user);

      if (email !== user.email) {
        throw new HttpException(500, 30001, 'Email not found');
      }

      const hashedPasswordInDatabase = user.password;
      const hashedPasswordFromLogin = getHashedString(password);

      if (hashedPasswordInDatabase === hashedPasswordFromLogin) {
        const hashedCookieString = getHashWithSalt(user.id);

        res.cookie('LoggedInHash', hashedCookieString, cookieOptions);
        res.cookie('userId', user.id, cookieOptions);
        res.cookie('isLoggedIn', true, cookieOptions);
        res.status(200).json({
          success: true,
          data: { name: user.name },
        });
        console.log('LoggedIn');
      } else {
        console.log('Email and password combination incorrect!');
        throw new HttpException(
          500,
          30001,
          'Email and password combination incorrect!'
        );
      }
    } catch (err) {
      console.log(err);
      next(err);
    }
  };

  reAuth = async (req, res, next) => {
    const cookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    };

    try {
      console.log('re-auth ran');
      const { user } = req;
      if (user) res.cookie('isLoggedIn', true, cookieOptions);
      res.status(200).json({
        success: true,
        data: { name: user.name },
      });
    } catch (err) {
      next(err);
    }
  };

  verifySignIn = async (req, res, next) => {
    try {
      res.status(200).json('You are logged in!');
    } catch (err) {
      next(err);
    }
  };

  signOut = async (req, res, next) => {
    const cookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    };

    try {
      res.clearCookie('isLoggedIn', cookieOptions);
      res.clearCookie('userId', cookieOptions);
      res.clearCookie('LoggedInHash', cookieOptions);
      res.status(200).json({
        success: true,
        message: 'Logout',
      });
    } catch (err) {
      next(err);
    }
  };
}

export default AuthController;
