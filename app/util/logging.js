import pino from 'pino'
import stdoutAsync from 'stdout-stream'

const prettyOption = {
  levelFirst: true,
  forceColor: true,
}

let logger

export function getLogger(name) {
  if (logger != null) return logger

  return pino({
    name,
    level: process.env.LOG_LEVEL || 'info',
    // redact: {
    //   paths: ['req.headers.authorization'],
    //   censor: '*****',
    // },
    prettyPrint: getPrettyPrint(),
  },
  getStdOut())
}

function getPrettyPrint() {
  return process.env.NODE_ENV === 'production' ? false : prettyOption
}

let stdout

function getStdOut() {
  if (stdout != null) return stdout

  return stdout = process.env.NODE_ENV === 'production' ? stdoutAsync : process.stdout
}
