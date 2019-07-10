const config = {}

    config.JWT_KEY = 're9it_jwt_secret_key'
    config.MONGO_URL = 'mongo.exe mongodb://localhost:27017/re9it?authSource=$[authSource] --username rootio';
    config.SALT_ROUNDS = 13;
    
module.exports = config;