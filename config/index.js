import path from 'path';
import development from './env/development';
import test from './env/test';
import production from './env/production';

const defaults = {
    root: path.normalize(`${__dirname}/..`)
}

const environment = {
    development: Object.assign(development, defaults),
    test: Object.assign(test, defaults),
    production: Object(production, defaults)
}[process.env.NODE_ENV || 'development'];

console.log(environment, 'env')
export default environment;
