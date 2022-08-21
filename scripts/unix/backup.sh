#!/usr/bin/env bash

# Get current date
current_date="$(date +'%d-%m-%Y_%H-%M')"

# A temporary directory path to store the backup
temp_dir=./ISBAT-Hub-DB_BACKUP

# A target directory path to finial store the backup
target_dir=/

# A variable for the name of the database
DB_NAME=2kole_DB

# A variable for the database connection uri
DB_URI=$1

# Name for the compressed backup file.
FILE_NAME="${DB_NAME}-${current_date}.tar.gz"

function backup {
  # Dumping database data
  mongodump --uri $DB_URI -o $temp_dir
  # mongoexport --db=<db-name> --collection=<collection-name> --out=<file-name.extention>

  # checking if there's argument passed in position 0
  if [ $? -eq 0]; then
    echo "MongoDB backup successfully done ✔"
  else
    echo "MongoDB backup failed ❌"
    exit 1
  fi

  # compress
  tar -zcvf $FILE_NAME $temp_dir

  # after the compressing is done, removing the temp_dir
  rm -fr $temp_dir
}

# calling the backup function
backup

# Upload the compressed file somewhere locally hosted or in the cloud.
