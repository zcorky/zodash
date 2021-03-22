import { IMimeExt } from './type';

export const MAP_MIME_EXTS: IMimeExt = {
  // image
  'image/jpeg': ['jpg', 'jpeg'],
  'image/png': ['png'],
  'image/gif': ['gif'],
  'image/webp': ['webp'],
  'image/tiff': ['tif', 'tiff'],
  'image/bmp': ['bmp'],
  'image/vnd.adobe.photoshop': ['psd'],
  'image/svg+xml': ['svg'],
  // audio
  'audio/mp4': ['m4a', 'mp4a'],
  'audio/midi': ['midi'],
  'audio/mpeg': ['mpga', 'mp2', 'mp2a', 'mp3', 'm2a', 'm3a'],
  'audio/ogg': ['ogg'],
  'audio/wav': ['wav'],
  // video
  'video/mp4': ['mp4', 'mp4v', 'mpg4'],
  'video/x-matroska': ['mkv'],
  'video/webm': ['webm'],
  'video/x-msvideo': ['avi'],
  'video/quicktime': ['qt', 'mov'],
  'video/mpeg': ['mpeg', 'mpg', 'mpe', 'm1v', 'm2v'],
  'video/3gpp': ['3gp', '3gpp'],
  // text
  'text/css': ['css'],
  'text/html': ['html', 'htm', 'shtml'],
  'text/yaml': ['yml', 'yaml'],
  'text/csv': ['csv'],
  'text/markdown': ['md', 'markdown'],
  'text/plain': ['text', 'text', 'conf', 'log', 'ini'],
  // font
  'font/ttf': ['ttf'],
  'font/woff': ['woff'],
  'font/woff2': ['woff2'],
  // application
  'application/zip': ['zip'],
  'application/x-tar': ['tar'],
  'application/x-rar-compressed': ['rar'],
  'application/gzip': ['gz'],
  'application/x-7z-compressed': ['7z'],
  'application/octet-stream': [
    'bin',
    'so',
    'exe',
    'dll',
    'dmg',
    'iso',
    'msi',
  ],
  'application/epub+zip': ['epub'],
  'application/javascript': ['js'],
  'application/json': ['json'],
  'application/msword': ['doc', 'docx', 'dot', 'dotx'],
  'application/vnd.ms-excel': ['xls', 'xlsx', 'xla', 'xlt'],
  'application/vnd.ms-pwoerpoint': ['ppt', 'pptx', 'pps', 'pot'],
  'application/pdf': ['pdf'],
  'application/wasm': ['wasm'],
  'application/xml': ['xml'],
  'application/xml-dtd': ['dtd'],
};