var _ = require('lodash');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var walk = require('walk');
var fs = require('fs');
var path = require('path');
var slug = require('slug');
var mkdir = require('mkdir-p');
var async = require('async');
var marked = require('marked');

var url = process.env.MONGO_URI;
var contentFolder = process.argv[2];
var appFolder = process.argv[3];

var entries = [];
var alltags = [];

console.log('Migrating entries from ' + contentFolder);

var findAndCopyImage = function (rootPath, name) {
  var files = fs.readdirSync(rootPath);

  var image = _.find(files, function(filename) {
    return ['.png', '.jpg', '.jpeg'].indexOf(path.extname(filename)) > -1;
  });

  if (!image) {
    return null;
  }

  // check for png, then for jpg, then jpeg
  var extension = path.extname(image);
  var publicFolder = path.join(appFolder, "public");
  var targetFilename = path.join("images/entries", slug(name, {
      lower: true
  }) + extension);
  // copy file
  mkdir.sync(path.join(publicFolder, "images/entries"));
  fs.createReadStream(path.join(rootPath, image)).pipe(
      fs.createWriteStream(path.join(publicFolder, targetFilename))
  );

  return path.join("/", targetFilename);
}

var unifyTags = function(tag) {
    var tags = {
        "made in Germany": "Made in Germany",
        "made in Europe": "Made in Europe",
        "CO2-neutral": "CO2 neutral",
        "waste-reduction": "waste reduction",
        "idea": "ideas",
        "Fairwear": "Fairwear",
        "fairwear foundation": "Fairwear",
        "hand-made": "handmade",
        "sustainability": "sustainable",
        "waste": "waste reduction"
    };

    if (tags.hasOwnProperty(tag)) {
        return tags[tag];
    }

    return tag;
}

var parseArr = function(a) {
    return a
        .split(",")
        .map(function(s) {
            return s.trim();
        })
        .filter(function(s) {
            return s !== "";
        });
}

var scanFolder = function(folder) {
    var walker = walk.walk(folder, {
        followLinks: false
    });

    walker.on("file", function(root, fileStat, next) {
        // If it's not an actree entry, we don't care :)
        if (fileStat.name !== "link.txt") {
            return next();
        }

        fs.readFile(path.resolve(root, fileStat.name), "utf8", function(err, buffer) {
            var e = {};
            buffer.split("\n\n----\n\n").forEach(function(line) {
                var key = line.match("([a-zA-Z ]+)\: ")[1];
                e[key] = line.substr(key.length + 2);
            });

            var image = findAndCopyImage(root, e["Title"].trim());

            var markdown = e["Description"].trim().replace(/\r\n/g, "\n");

            entries.push({
                title: e["Title"].trim(),
                description: {
                    md: markdown,
                    html: marked(markdown)
                },
                descriptionEnglish: {
                    md: markdown,
                    html: marked(markdown)
                },
                // geographies: parseArr(e["Geographies"]),
                tags: parseArr(e["Tags"]).map(unifyTags),
                state: "published",
                publishedDate: e["Dateadded"],
                url: e["Externalurl"].trim(),
                oldImage: image,
                slug: slug(e["Title"].trim(), {
                    lower: true
                }),
                __v: 0
            });

            next();
        });
    });

    walker.on("end", function() {
        alltags = entries.reduce(function(arr, entry) {
            return arr.concat(entry.tags);
        }, []);

        MongoClient.connect(url, function(err, db) {
            assert.equal(null, err);
            console.log("Connected correctly to server");
            insertTags(db, function() {
                insertDocuments(db, function() {

                    db.close();
                });
            });
        });
    })
}

scanFolder(contentFolder);

var insertTags = function(db, callback) {
    alltags = _.uniq(alltags).map(function(tag) {
        return {
            name: tag,
            slug: slug(tag.trim(), {
                lower: true
            })
        }
    });
    // console.log(alltags);
    db.collection("tags").insertMany(alltags, function(err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log("Inserted " + result.result.n + " documents into the document collection");
            // console.log(result)
        }

        callback(result);
    });


}

var insertDocuments = function(db, callback) {
    console.log(entries.length + " entries");
    // Insert some documents
    async.eachSeries(entries, function(entry, nextEntry) {
        async.mapSeries(entry.tags, function(tag, nextTag) {
            db.collection("tags").findOne({
                slug: slug(tag.trim(), {lower: true})
            }, function(err, doc) {
                console.log(doc);
                nextTag(err, doc._id);
            });

        }, function(err, allTags) {
            console.log(allTags)
            entry.tags = allTags;
            db.collection("entries").insert(entry, function(err, res) {
                if(err) {
                    console.error(err)
                };
                nextEntry()
            });
        });

    }, function() {
        console.log("Inserted documents into the document collection");
        callback();
    })

}
