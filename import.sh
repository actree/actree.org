#!/bin/bash

collections=(
    app_updates
    users

    entries
    pages
    tags
    posts
    postcategories
)

if [ $1 ] && [ $2 ]; then
    echo "Importing collection $1"
    mongoimport --port $MONGO_PORT -u $MONGO_USER -p $MONGO_PASSWORD -d $MONGO_DB --authenticationDatabase admin -c $1 --file=$2
else
    echo "Importing all collections"

    for i in "${collections[@]}"
    do
        echo "Importing " $i
        mongoimport --port $MONGO_PORT -u $MONGO_USER -p $MONGO_PASSWORD -d $MONGO_DB --authenticationDatabase admin -c $i --file=export/$i.json
    done
fi
