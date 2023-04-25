const request = require("request") ;
const { verifyPayment } = require("../controllers/paystack")(request);

//@desc  initialize a paymet
//@route POST  /dofob/payment
//@access Private 
const createPayment =  (req , res) => {
    const https = require('https')

    const params = JSON.stringify({
        "email": req.body.email ,
        "amount": req.body.amount 
    }) 
    console.log(params)
    const options = {
        hostname: 'api.paystack.co',
        port: 443,
        path: '/transaction/initialize',
        method: 'POST',
        headers: {
            Authorization: `Bearer ${process.env.SECRET_KEY}`,
            'Content-Type': 'application/json'
        }
    }

    console.log(options.headers.Authorization) ;

    const reqPaystack = https.request(options, resPaystack => {
        let data = ''

        resPaystack.on('data', (chunk) => {
            data += chunk
        });

        resPaystack.on('end', () => {
            res.status(200).json({ authorizationUrl : res.data.authorization_url}) // the callback url for frontend
            console.log(JSON.parse(data))
        })
    }).on('error', error => {
        console.error(error)
        res.status(400)
        throw new Error('Payment Not Intialized')  
    })

    reqPaystack.write(params)
    reqPaystack.end()
}

//@desc  initialize a paymet
//@route POST  /dofob/payment/:reference
//@access Private 

const Payment = ( req , res ) => {
    const{reference} = req.query ;
    verifyPayment( reference , (error , body) => {
      if (error) {
        return res.status(400).json({
          msg: `${error.message}`,
          status: "invalid",
        });
      }
      const response = JSON.parse(body.body);
      res.send(response)
    }) 
}

module.exports = { createPayment , Payment };



