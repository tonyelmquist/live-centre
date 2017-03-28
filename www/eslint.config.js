module.exports = {
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true,
            "arrowFunctions": true,
            "blockBindings": true,
            "generators": true,
            "modules": true,
            "experimentalObjectRestSpread": true
        }
    },
    rules: {
        "arrow-parens": 2,
        "curly": 2,
        "no-var": 2,
        "prefer-arrow-callback": 2,
        "prefer-const": 2,
        "prefer-spread": 2,
        "prefer-template": 2,
        "require-yield": 2,
        semi: ["warn", "always"]
    },
    "env": {
        "browser": true,
        "node": true,
        "es6": true,
        "jasmine": true
    },
    "plugins": [
        "react"
    ]
}
