const dotenv = require('../Scenario5/dotenv');
const joi = require('joi');

dotenv.config();

const envSchema=joi.object({
    NODE_ENV:joi.string().valid('development','production','test').default('development'),
    PORT:joi.number().default(3000),
    MONGO_URL:joi.string().required().description('Mongo DB connection URL'),
    SECREATE_KEY:joi.string().required().description('Secret key for JWT'),
}).unknowmn();

const {error,value:envVars}=envSchema.validate(process.env);
if(error){
    throw new Error(`Config validation error: ${error.message}`);
}
// module.exports={
//     env:envVars.NODE_ENV,
//     port:envVars.PORT,
//     mongoUrl:envVars.MONGO_URL,
//     secretKey:envVars.SECREATE_KEY,
// };
const config=object.freeze({
    env:envVars.NODE_ENV,
    port:envVars.PORT,
    mongoUrl:envVars.MONGO_URL,
    secretKey:envVars.SECREATE_KEY,
});
module.exports=config;
