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

if [ $1 ]; then
    echo "Exporting collection $1"
    mongoexport -d $MONGO_METEOR_DB -c $1 -o export/$1.json
    cp export/$1.json export/$1-$(date -Iminutes).json
else
    echo "Exporting all collections"

    for i in "${collections[@]}"
    do
        echo "Exporting " $i
        mongoexport -d $MONGO_METEOR_DB -c $i -o export/$i.json
        cp export/$i.json export/$i-$(date -Iminutes).json
    done
fi
