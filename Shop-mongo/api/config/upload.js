const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const uploadDir = path.resolve(process.env.UPLOAD_DIR || path.join(__dirname, '..', 'uploads'));
fs.mkdirSync(uploadDir, { recursive: true });

const extensions = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
};

const upload = multer({
  storage: multer.diskStorage({
    destination: uploadDir,
    filename: (_req, file, callback) => {
      callback(null, `${crypto.randomUUID()}.${extensions[file.mimetype]}`);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, callback) => {
    if (extensions[file.mimetype]) return callback(null, true);
    const error = new Error('Chỉ nhận ảnh JPG, PNG hoặc WebP');
    error.status = 415;
    callback(error);
  },
});

async function removeImageFile(filename) {
  if (!filename || !/^[0-9a-f-]{36}\.(jpg|png|webp)$/.test(filename)) return;
  try {
    await fs.promises.unlink(path.join(uploadDir, filename));
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }
}

module.exports = { upload, uploadDir, removeImageFile };
