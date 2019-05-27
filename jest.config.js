
module.exports = {
    modulePaths: [
        '<rootDir>',
        'src',
        'src/scenes',
    ],
    verbose: true,
    testPathIgnorePatterns: [
        '/node_modules/',
    ],
    moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'node'],
    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|css|less)$': '<rootDir>/test/mocks/fileMock.js',
    },
    moduleDirectories: [
        'node_modules', 'client',
    ],
    collectCoverage: true,
    coverageDirectory: './coverage',
    testEnvironment: 'jsdom',
};
