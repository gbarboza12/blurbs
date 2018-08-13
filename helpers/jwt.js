"use strict";
const expressJwt = require('express-jwt');
const userService = require('../services/userservice');
const secret = process.env.SECRET || "bryan"
 
module.exports = jwt;
 
function jwt() {

    return expressJwt({ secret, isRevoked }).unless({
        path: [
            // public routes that don't require authentication
            '/api/authenticate',
            '/api/register'
        ]
    });
}
 
async function isRevoked(req, payload, done) {
    const user = await userService.getById(payload.sub);
 
    // revoke token if user no longer exists
    if (!user) {
        return done(null, true);
    }
 
    done();
};