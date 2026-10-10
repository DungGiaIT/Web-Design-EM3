const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const os = require('os');
const path = require('path');
const express = require('express');

const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'shop-mongo-upload-'));
process.env.UPLOAD_DIR = tempDir;
const { upload, removeImageFile } = require('../config/upload');

test('ảnh được lưu, giới hạn định dạng/kích thước và có thể xóa', async () => {
  const app = express();
  app.post('/image', upload.single('image'), (req, res) => res.json({ name: req.file.filename }));
  app.use((error, _req, res, _next) => res.status(error.code === 'LIMIT_FILE_SIZE' ? 413 : error.status || 400).json({ message: error.message }));

  const server = await new Promise((resolve) => {
    const listener = app.listen(0, '127.0.0.1', () => resolve(listener));
  });
  const url = `http://127.0.0.1:${server.address().port}/image`;

  try {
    const image = new FormData();
    image.append('image', new Blob(['demo'], { type: 'image/png' }), 'sample.png');
    const uploaded = await fetch(url, { method: 'POST', body: image });
    assert.equal(uploaded.status, 200);
    const { name } = await uploaded.json();
    assert.match(name, /^[0-9a-f-]{36}\.png$/);
    assert.equal(fs.existsSync(path.join(tempDir, name)), true);
    await removeImageFile(name);
    assert.equal(fs.existsSync(path.join(tempDir, name)), false);

    const wrongType = new FormData();
    wrongType.append('image', new Blob(['text'], { type: 'text/plain' }), 'sample.txt');
    assert.equal((await fetch(url, { method: 'POST', body: wrongType })).status, 415);

    const tooLarge = new FormData();
    tooLarge.append('image', new Blob([Buffer.alloc(5 * 1024 * 1024 + 1)], { type: 'image/png' }), 'large.png');
    assert.equal((await fetch(url, { method: 'POST', body: tooLarge })).status, 413);
  } finally {
    await new Promise((resolve) => server.close(resolve));
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
});
