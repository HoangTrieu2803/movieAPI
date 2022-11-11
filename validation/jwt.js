const JWT = require('jsonwebtoken')
const createError = require("http-errors")

module.exports = {
    signAccessToken : (userId) =>{
        return new Promise((resolve, reject)=>{
            const payload = {
              
            }
            const secret = "146e340b4f5dc92f0c800c2aae403f31c244975349c05bc4c186ee603e804b9c"
            const option = {
                expiresIn: "15s",
                issuer: "movieAPI.com",
                audience: userId
            }
            JWT.sign(payload, secret , option, (err,token)=>{
                if(err){
                    reject(createError.InternalServerError())
                }
                resolve(token)
            })
        })
    },
    signRefreshToken :(userId) =>{
        return new Promise((resolve, reject)=>{
            const payload = {
              
            }
            const secret = "519ec29f049630e7cd8c3ef795955ced37b5a24f5c51dedb81dc76729eeb3fe8"
            const option = {
                expiresIn: "1y",
                issuer: "movieAPI.com",
                audience: userId
            }
            JWT.sign(payload, secret , option, (err,token)=>{
                if(err){
                    reject(createError.InternalServerError())
                }
                resolve(token)
            })
        })
    },
    verifyAccessToken: (req, res , next)=>{
        if(!req.headers['authorization']) return next(createError.Unauthorized())
        const authHeader = req.headers['authorization']
        const bearerToken = authHeader.split(' ')
        const token = bearerToken[1]
        JWT.verify(token, "146e340b4f5dc92f0c800c2aae403f31c244975349c05bc4c186ee603e804b9c", (err,payload)=>{
            if(err){
                // if(err.name === 'JsonWebTokenError'){
                //     return next(createError.Unauthorized())
                // }
                // else{
                //     
                // }
                const message = err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message
                return next(createError.Unauthorized(message))
            }
            req.payload = payload
            next()
        })
    },
    verifyRefreshToken:(refreshToken)=>{
        return new Promise((resolve,reject)=>{
            JWT.verify(refreshToken, "519ec29f049630e7cd8c3ef795955ced37b5a24f5c51dedb81dc76729eeb3fe8",(err,payload)=>{
                if(err) return reject(createError.Unauthorized())
                const userID = payload.aud
                resolve(userID)
            })

        })
    }
}