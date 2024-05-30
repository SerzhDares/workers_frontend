module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "overrides": [
        {
            "env": {
                "es6": true,
                "browser": true,
                "jest": true,
                "worker": true,
                "serviceworker": true
            },

            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "rules": {
    }
}
