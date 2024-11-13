import rateLimiter from 'express-rate-limit'


const limiter=rateLimiter({
    windowMs:15*60*1000,
    max:100,
    message:"to many request from this ip,please try again",
})

export {limiter}



