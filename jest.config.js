const config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts'],
  transform: {
    '^.+\\.ts$': ['ts-jest', { useESM: true, tsconfig: './tsconfig.test.json' }]
  },
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1'
  },
  testMatch: ['<rootDir>/tests/**/*.test.ts'],
  collectCoverage: true, // <- Enable coverage
  coverageDirectory: 'coverage', // <- Folder where coverage is output
  collectCoverageFrom: [
    '**/*.{ts,js}', // <- Adjust this to your actual source folder
    '!**/node_modules/**',
    '!**/tests/**',
    '!**/views/**',
    '!**/frontend/**',
    '!**/public/**',
    '!**/dist/**',
    '!**/migrations/**',
    '!**/types/**',
    '!**/utils/**',
    '!**/controllers/**',
    '!**/routes/**',
    '!**/middlewares/**',
    '!**/config/**',
    '!**/services/**',
    '!**/models/**',
    '!**/constants/**',
    '!**/validationSchemas/**',
    '!**/eslint.config.js',
    '!**/jest.config.js',
    '!**/migrate-mongo-config.js',
    '!**/coverage/**',
    '!**/block-navigation.js',
    '!**/prettify.js',
    '!**/sorter.js',
    '!**/index.ts'
  ]
}

export default config
