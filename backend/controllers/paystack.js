
// =================== Was not Used ===================//
const makePayment = (request) => {
    const IntializePayment = (ref , mycallback) => {
        const link = "https://api.paystack.co/transaction/intialize/" ;
        const params = JSON.stringify({
            "email": req.body.email,
            "amount": req.body.amount
        });
      const callback = (error , body) => {
        return mycallback(error ,body)
      };
      //http request
      request.post({
        headers: { Authorization: `Bearer ${process.env.SECRET_KEY}`, "content-type": "application/json", "cache-control": "no-cache", },
        url: link,
        body: params,
      }, callback);
    }
    return { IntializePayment } ;
};


//verifying payment used
const payStacks = (request) => {
    const verifyPayment = (ref, mycallback) => {
        const options = {
            url:
                "https://api.paystack.co/transaction/verify/" + encodeURIComponent(ref),
            headers: {
                Authorization: `Bearer ${process.env.SECRET_KEY}`,
                "content-type": "application/json",
                "cache-control": "no-cache",
            },
        };   
        const callback = (error, body) => {
            return mycallback(error, body);
        };
        request(options, callback); 
    };
   return { verifyPayment };
};
module.exports = payStacks;