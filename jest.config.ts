import type { JestConfigWithTsJest } from 'ts-jest'

const config: JestConfigWithTsJest = {
  extensionsToTreatAsEsm: ['.ts'],
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { useESM: true }]
  },
}

export default config