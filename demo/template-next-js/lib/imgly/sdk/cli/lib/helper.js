// import { packageUp } from 'package-up';
import { readPackageUp } from 'read-package-up';
import * as errors from './errors.js'

export async function findProjectRoot() {
  return process.cwd()
}

export async function getPackageDetails() {
  return await readPackageUp();
}


export function validateChoice(value, choices) {
  if (!choices.includes(value)) {
    throw new errors.InvalidValueError(`Invalid value '${value}'. Must be one of: ${choices.join(', ')}`)
  }
  return value;
}