
const isProductEnv = process.env.NODE_ENV === 'production';

function env(dev, product) {
    if (!product) {
        product = dev;
    }
    return isProductEnv ? product : dev;
}

module.exports = {
    env,
    isProductEnv
};