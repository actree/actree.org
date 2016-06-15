#!/bin/bash

collections=(
    posts
    comments

    entry

    orion_config
    dictionary
    tabular_records

    users
    roles
    nicolaslopezj_roles_keys
)

if [ $1 && $2 ]; then
    echo "Importing collection $1"
    mongoimport -d $MONGO_METEOR_DB -c $1 --file=$2
else
    echo "Importing all collections"

    for i in "${collections[@]}"
    do
        echo "Importing " $i
        mongoexport -d $MONGO_METEOR_DB -c $i --file=export/$i.json
    done
fi
