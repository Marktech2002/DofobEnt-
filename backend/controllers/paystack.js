

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
   return { verifyPayment }
}



module.exports = payStacks ;