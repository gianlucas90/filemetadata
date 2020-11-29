var express = require('express');
var cors = require('cors');
require('dotenv').config();
const multer = require('multer');

var app = express();

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/img');
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    cb(null, `img-${Date.now()}.${ext}`);
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new console.log('error'));
  }
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  const { originalname, mimetype, size } = req.file;
  res.json({ name: originalname, type: mimetype, size: size });
});

const port = process.env.PORT || 4000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port);
});
