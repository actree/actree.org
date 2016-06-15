# actree.org

actree.org - built with Meteor, some shell scripts, and glue

## Import and Export data

Use `export.sh` and `import.sh`

## Run on Uberspace

https://wiki.uberspace.de/system:daemontools

### Start

1. Start MongoDB: `svc -u ~/service/mongodb`
2. Start Meteor: `svc -u ~/service/meteor`

### Stop

1. Stop Meteor: `svc -d ~/service/meteor`
2. Stop MongoDB: svc -d ~/service/meteor
