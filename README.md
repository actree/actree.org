# actree.org

> [actree.org](https://www.actree.org) - built with Keystone, shell scripts, and glue.

## Development

### Getting started

Make sure MongoDB is installed and running locally.

```sh
npm install
npm run build
npm start
```

### Docker

```sh
docker-compose up --build
```

## Run on Uberspace

https://wiki.uberspace.de/system:daemontools

### Update

As we don't have any automatic deployment yet, an update script has to be manually run via ssh. In the Uberspace
home folder, run

```sh
./update.sh
```

This script pull down the latest master branch and restarts the service.

### Start

1. Start MongoDB: `svc -u ~/service/mongodb`
2. Start Meteor: `svc -u ~/service/keystone`

### Stop

1. Stop Meteor: `svc -d ~/service/keystone`
2. Stop MongoDB: `svc -d ~/service/mongodb`

## Import and Export data

Use `export.sh` and `import.sh`

**TODO:** Better docs on importing data into and exporting data from the database.
