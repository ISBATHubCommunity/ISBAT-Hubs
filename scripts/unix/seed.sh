#!/bin/bash

# message showing seed the database
function seedUserCollection() {
  if [ -f ./user.json ]; then
    # check if the system has mongodb shell installed
    command cd C: && cd "Program Files\MongoDB\Server\5.0\bin"

    echo "moved into MongoDB\Server\4.0\bin"

    # if mongodb is installed populate the databse

    command mongoimport --db --collection users --file ./user.json --jsonArray
    echo "Backup directory is created ✔"
  fi
}

seedUserCollection

#mongoimport --db --${collection} users --file ./user.json --jsonArray
