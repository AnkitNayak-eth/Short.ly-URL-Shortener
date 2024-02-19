const crypto = require('crypto');

class urlShortener{
    static generateShortUrl(){
        return crypto.randomBytes(3).toString('hex');
    }
}

module.exports = urlShortener;