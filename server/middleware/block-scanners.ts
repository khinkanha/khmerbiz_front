import { defineEventHandler, setResponseStatus } from 'h3'

// Paths commonly probed by bots/scanners — block them early
const BLOCKED_PREFIXES = [
  '/node_modules',
  '/.env',
  '/.git',
  '/wp-admin',
  '/wp-login',
  '/wp-content',
  '/wp-includes',
  '/phpmyadmin',
  '/adminer',
  '/config',
  '/backup',
  '/.htaccess',
  '/.DS_Store',
  '/debug',
  '/test',
  '/phpinfo',
  '/elmah.axd',
  '/trace.axd',
  '/cgi-bin',
  '/scripts',
  '/setup.php',
  '/install.php',
  '/xmlrpc.php',
  '/vendor',
  '/composer.',
  '/package.json',
  '/tsconfig.json',
  '/.vscode',
  '/.idea',
]

export default defineEventHandler((event) => {
  const url = event.path.split('?')[0].toLowerCase()

  for (const prefix of BLOCKED_PREFIXES) {
    if (url === prefix || url.startsWith(prefix + '/') || url === prefix + '/') {
      setResponseStatus(event, 404)
      return 'Not Found'
    }
  }
})
