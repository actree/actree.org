#!/bin/bash

# rm -rf actree-meteor/
cd $HOME/actree.org/app/
demeteorizer -o $HOME/actree-meteor
cd $HOME/actree-meteor/bundle/programs/server/

PATH=/package/host/localhost/nodejs-0.10.43/bin:$PATH npm install
