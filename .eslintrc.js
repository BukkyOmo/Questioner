module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    "extends": "airbnb-base",
    "parserOptions": {
        "ecmaVersion": 2015,
        "sourceType": "module"
    },
    
    "plugins": [
        "import"
    ],
    "rules": {
        "indent": [
            2,
            "tab",
        ],
        "no-tabs": 0,
        "no-unused-vars": ["off"],
        'no-console': 'off',
        'no-console': process.env.NODE_ENV === 'production' ? 2 : 0,
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
        "linebreak-style": [
            "error",
            "windows"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ]
    }
};