module.exports = {
    // verbose: true,
    preset: 'react-native',
    testEnvironment: 'node',
    bail: true,
    globals: {
        __DEV__: true
    },
    transform: {
        '^.+\\.js?$': 'babel-jest'
    },
    setupTestFrameworkScriptFile: './node_modules/jest-enzyme/lib/index.js',
    collectCoverageFrom: ['src/**/*.js', '!**/index.js', '!**/*.bak.js', '!**/(constants)/**'],
    coverageReporters: ['json', 'lcov', 'text-summary'],
    transformIgnorePatterns: [
        'node_modules/(?!(jest-)?react-native|react-clone-referenced-element|native-base|react-native-vector-icons)'
    ],
    snapshotSerializers: ['enzyme-to-json/serializer']
};
