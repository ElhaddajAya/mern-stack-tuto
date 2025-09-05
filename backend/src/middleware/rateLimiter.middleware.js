import rateLimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
    try { // Apply rate limiting per user/IP
        const { success } = await rateLimit.limit('my-limit-key'); // We can use any unique key here, e.g., user ID or IP address

        if (!success) {
            return res.status(429).json({ message: 'Too many requests, please try again later.' });
        }

        next();
    } catch (error) {
        console.log("Rate limiting error: ", error);
        next(error);
    }
}

export default rateLimiter;