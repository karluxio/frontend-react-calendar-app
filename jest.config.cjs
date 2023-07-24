// snippet --> config-jest
module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  setupFiles: ['./jest.setup.js'],
  transformIgnorePattern: [],

  // ModuleNameMapper sólo si ocupamos importar CSS en nuestros componentes para el testing
  moduleNameMapper: {
    '\\.(css|less)$': '<rootDir>/tests/mocks/styleMock.js'
  }
}