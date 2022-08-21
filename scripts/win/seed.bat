@echo off

@REM database name
set DB_NAME=ISBAT-Hub-DB

set SEED_DATA_DIR=..\..\src\db\model-seed-data\

setlocal enabledelayedexpansion

if exist %SEED_DATA_DIR% (
  for %%f in (%SEED_DATA_DIR%*.json) do (
    set FILE_NAME=%%~nf

    @rem seeder data file extension.
    set FILE_EXTENSION=json

    @REM the actual file with the extension. ../src/db/model-samples/user.json
    set FILE_PATH="!SEED_DATA_DIR!/!FILE_NAME!.!FILE_EXTENSION!"

    ::checking if the file is not empty
    if FILE_PATH EQU 0 (
      color 0C
      echo %FILE_NAME% is empty
    ) else (
      @REM collection name variable
      set COLLECTION_NAME=!FILE_NAME!

      echo Seeding !FILE_NAME! data......
      mongoimport --db=!DB_NAME! --collection=!COLLECTION_NAME! --file=!FILE_PATH! --jsonArray
      color 02
      echo Seeding !FILE_NAME! done successfully ✔
    )
  )
  echo.
  echo Seeding is completed enjoy hacking %USERNAME%
) else (
  echo No
)
