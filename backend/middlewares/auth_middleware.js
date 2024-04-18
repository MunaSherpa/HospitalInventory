// // authMiddleware.js

// const jwt = require('jsonwebtoken');
// // const User = require('../model/users');
// const User = require('../model/userModel');

// const { sendBadResponse } = require('../helpers/helper');

// module.exports.authenticateJWTForUser = async (req, res, next) => {
//   try {
//     const token = req.header('Authorization').split(" ")[1];

//     if (!token) {
//       return sendBadResponse(res, { msg: 'Unauthorized - No token provided' });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
//     const user = await User.findById(decoded.userId);

//     if (!user) {
//       return res.status(401).json({ msg: 'Unauthorized - Invalid token' });
//     }

//     req.user = user;
//     next();
//   } catch (e) {
//     return sendBadResponse(res, { msg: "Unauthorized" });
//   }
// };

// module.exports.authenticateJWTForAdmin = async (req, res, next) => {
//   const token = req.header('Authorization').split(" ")[1];

//   if (!token) {
//     return res.status(401).json({ msg: 'Unauthorized - No token provided' });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
//     const user = await User.findById(decoded.userId);

//     if (!user || user.role !== "admin") {
//       return res.status(403).json({ msg: 'Unauthorized - Admin access required' });
//     }

//     req.user = user;
//     next();
//   } catch (error) {
//     console.error('Error during authentication:', error);
//     return sendBadResponse(res, { msg: 'Unauthorized - Invalid token' }, 500);
//   }
// };
















// // const jwt = require('jsonwebtoken');
// // const User = require('../model/userModel');
// // const { sendBadResponse } = require('../helpers/helper');

// // module.exports.authenticateJWTForUser = async (req, res, next) => {
// //   try {
// //     const token = req.header('Authorization');

// //     if (!token || !token.startsWith('Bearer ')) {
// //       console.error('No token provided');
// //       return sendBadResponse(res, { msg: 'Unauthorized - No token provided' });
// //     }

// //     const tokenValue = token.split(' ')[1];
// //     console.log('Token value:', tokenValue);

// //     const decoded = jwt.verify(tokenValue, process.env.JWT_SECRET_KEY);
// //     console.log('Decoded token:', decoded);

// //     const user = await User.findById(decoded.userId);
// //     console.log('User:', user);

// //     if (!user) {
// //       console.error('User not found');
// //       return res.status(401).json({ msg: 'Unauthorized - Invalid token or user not found' });
// //     }

// //     req.user = user;
// //     next();
// //   } catch (error) {
// //     console.error('Error during user authentication:', error);
// //     return sendBadResponse(res, { msg: "Unauthorized - Error during user authentication" }, 500);
// //   }
// // };

// // module.exports.authenticateJWTForAdmin = async (req, res, next) => {
// //   try {
// //     const token = req.header('Authorization');

// //     if (!token || !token.startsWith('Bearer ')) {
// //       console.error('No token provided');
// //       return res.status(401).json({ msg: 'Unauthorized - No token provided' });
// //     }

// //     const tokenValue = token.split(' ')[1];
// //     console.log('Token value:', tokenValue);

// //     const decoded = jwt.verify(tokenValue, process.env.JWT_SECRET_KEY);
// //     console.log('Decoded token:', decoded);

// //     const user = await User.findById(decoded.userId);
// //     console.log('User:', user);

// //     if (!user) {
// //       console.error('User not found');
// //       return res.status(401).json({ msg: 'Unauthorized - Invalid token or user not found' });
// //     }

// //     if (user.role !== "admin") {
// //       console.error('User is not an admin');
// //       return res.status(403).json({ msg: 'Forbidden - Admin access required' });
// //     }

// //     req.user = user;
// //     next();
// //   } catch (error) {
// //     console.error('Error during admin authentication:', error);
// //     return sendBadResponse(res, { msg: 'Unauthorized - Error during admin authentication' }, 500);
// //   }
// // };





// authMiddleware.js
// const jwt = require('jsonwebtoken');
// const User = require('../model/userModel');
// const { sendBadResponse } = require('../helpers/helper');

// module.exports.authenticateJWTForUser = async (req, res, next) => {
//   try {
//     const token = req.header('Authorization').split(" ")[1];

//     if (!token) {
//       return sendBadResponse(res, { msg: 'Unauthorized - No token provided' });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
//     const user = await User.findById(decoded.userId);
//     console.log(`authenticate jwt for user ${user.id}`);
//     if (!user) {
//       return res.status(401).json({ msg: 'Unauthorized - Invalid token' });
//     }

//     req.user = user; // Attach the user to the request for future use
//     console.log(user.toJSON());

//     next();

//   } catch (e) {
//     return sendBadResponse(res, { msg: "unauthorized", })
//   }
// }

// /**
//  * 
//  * @param {import('express').Request} req 
//  * @param {import('express').Response} res 
//  * @param {import('express').NextFunction} next 
//  * @returns 
//  */
// module.exports.authenticateOptionalJWTForUser = async (req, res, next) => {

//   //bearer eruieurieruieur
//   try {
//     const token = req.header('Authorization').split(" ")[1];

//     const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
//     const user = await User.findById(decoded.userId);

//     if (!user) {
//       req.user = user.toJSON()
//     } else {
//       req.user = null; // Attach the user to the request for future use
//     }
//   } catch (error) {
//     console.log(`middleware error JWT ${error}`)
//   } finally {
//     next();
//   }
// };
// module.exports.authenticateJWTForAdmin = async (req, res, next) => {
//   const token = req.header('Authorization').split(" ")[1];

//   if (!token) {
//     return res.status(401).json({ msg: 'Unauthorized - No token provided' });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
//     const user = await User.findById(decoded.userId);

//     if (!user || user?.role !== "admin") {
//       return res.status(403).json({ msg: 'Unauthorized - Admin access required' });
//     }

//     console.log(`Admin user ${user.id} authenticated`); // Optional logging

//     req.user = user; // Attach the user to the request for future use
//     next();
//   } catch (error) {
//     console.error('Error during authentication:', error);
//     return sendBadResponse(res, { msg: 'Unauthorized - Invalid token' }, 500);
//   }
// };








const jwt = require('jsonwebtoken');
const User = require('../model/userModel');
const { sendBadResponse } = require('../helpers/helper');

module.exports.authenticateJWTForUser = async (req, res, next) => {
  try {
    const token = req.header('Authorization');

    if (!token || !token.startsWith('Bearer ')) {
      return sendBadResponse(res, { msg: 'Unauthorized - No token provided' });
    }

    const tokenValue = token.split(' ')[1];
    const decoded = jwt.verify(tokenValue, process.env.JWT_SECRET_KEY);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ msg: 'Unauthorized - Invalid token' });
    }

    req.user = user;
    next();

  } catch (error) {
    console.error('Error during user authentication:', error);
    return sendBadResponse(res, { msg: 'Unauthorized - Invalid token' }, 401);
  }
};

module.exports.authenticateOptionalJWTForUser = async (req, res, next) => {
  try {
    const token = req.header('Authorization');

    if (token && token.startsWith('Bearer ')) {
      const tokenValue = token.split(' ')[1];
      const decoded = jwt.verify(tokenValue, process.env.JWT_SECRET_KEY);
      const user = await User.findById(decoded.userId);

      if (user) {
        req.user = user.toJSON();
      }
    }
  } catch (error) {
    console.error('Error during optional user authentication:', error);
  } finally {
    next();
  }
};

module.exports.authenticateJWTForAdmin = async (req, res, next) => {
  try {
    const token = req.header('Authorization');

    if (!token || !token.startsWith('Bearer ')) {
      return res.status(401).json({ msg: 'Unauthorized - No token provided' });
    }

    const tokenValue = token.split(' ')[1];
    const decoded = jwt.verify(tokenValue, process.env.JWT_SECRET_KEY);
    const user = await User.findById(decoded.userId);

    if (!user || user.role !== 'admin') {
      return res.status(403).json({ msg: 'Unauthorized - Admin access required' });
    }

    req.user = user;
    next();

  } catch (error) {
    console.error('Error during admin authentication:', error);
    return sendBadResponse(res, { msg: 'Unauthorized - Invalid token' }, 401);
  }
};






