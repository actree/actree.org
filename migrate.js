var _ = require('lodash');
var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');
var walk = require('walk');
var fs = require('fs')
var path = require('path')
var slug = require('slug');
var mkdir = require('mkdir-p');

var Q = require("q");

var url = "mongodb://127.0.0.1:3001/meteor";
var contentFolder = process.argv[2];
var appFolder = process.argv[3];

var entries = [];

console.log("Migrating entries from " + contentFolder);

var findAndCopyImage = function(rootPath, name) {
  var files = fs.readdirSync(rootPath);

  var image = _.find(files, function(filename) {
    return [".png", ".jpg", ".jpeg"].indexOf(path.extname(filename)) > -1;
  });

  if(!image) {
    return null;
  }

  // check for png, then for jpg, then jpeg
  var extension = path.extname(image);
  var publicFolder = path.join(appFolder, "public");
  var targetFilename = path.join("images", slug(name, {lower: true}) + extension);
  // copy file
  mkdir.sync(path.join(publicFolder, "images"));
  fs.createReadStream(path.join(rootPath, image)).pipe(
      fs.createWriteStream(path.join(publicFolder, targetFilename))
    );

  return path.join("/", targetFilename);
}

var parseArr = function(a) {
  return a.split(",").map(function(s) {return s.trim() });
}

var scanFolder = function(folder) {
  var walker  = walk.walk(folder, { followLinks: false });

  walker.on("file", function(root, fileStat, next) {
    // If it's not an actree entry, we don't care :)
    if(fileStat.name !== "link.txt") {
      return next();
    }

    fs.readFile(path.resolve(root, fileStat.name), "utf8", function(err, buffer) {
      var e = {};
      buffer.split("\n\n----\n\n").forEach(function(line) {
        var key = line.match("([a-zA-Z ]+)\: ")[1];
        e[key] = line.substr(key.length + 2);
      });

      var image = findAndCopyImage(root, e["Title"].trim());

      entries.push({
        name: e["Title"].trim(),
        description: e["Description"].trim().replace(/\r\n/g, "\n"),
        geographies: parseArr(e["Geographies"]),
        tags: parseArr(e["Tags"]),
        published: (e["Published"].trim() === "1"),
        url: e["Externalurl"].trim(),
        imageUrl: image
      });

      next();
    });
  });

  walker.on("end", function() {
    console.log(entries);

    MongoClient.connect(url, function(err, db) {
      assert.equal(null, err);
      console.log("Connected correctly to server");
      insertDocuments(db, function() {
        db.close()
      })
    });
  })
}

scanFolder(contentFolder);

var insertDocuments = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('entry');
  // Insert some documents
  collection.insertMany(entries, function(err, result) {
    console.log("Inserted " + result.result.n + " documents into the document collection");
    callback(result);
  });
}
