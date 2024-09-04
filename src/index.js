const express = require("express");
const morgan = require("morgan");
const { rateLimit } = require('express-rate-limit');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

const PORT = 3005;

const limiter = rateLimit({
	windowMs: 3 * 60 * 100, // 30 seconds
	limit: 5, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
})

app.use(morgan('combined'));
app.use(limiter);
//http-proxy-middleware
app.use('/bookingService', createProxyMiddleware({ target: 'http://localhost:3002/', changeOrigin: true }));
app.get('/home', (req,res)=>{
    return res.json({
        messgae:"recievced"
    });
});

app.listen(PORT, ()=>{
    console.log("Server Running on PORT "+PORT);
});
