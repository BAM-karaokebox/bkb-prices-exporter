#!/bin/sh

DIR="${1:-.}"

# create new aggregate files for each city,
# based on existing exports, and add only of the header lines
awk 'FNR==1' "${DIR}"/*Paris*.csv | uniq > paris.csv
awk 'FNR==1' "${DIR}"/*Bordeaux*.csv | uniq > bordeaux.csv
awk 'FNR==1' "${DIR}"/*Madrid*.csv | uniq > madrid.csv

# then add content of all the daily exports for each city
awk FNR-1 "${DIR}"/*Paris*.csv >> paris.csv
awk FNR-1 "${DIR}"/*Bordeaux*.csv >> bordeaux.csv
awk FNR-1 "${DIR}"/*Madrid*.csv >> madrid.csv

# then convert the aggregate city exports to XLSX
soffice \
    --headless \
    --convert-to xlsx:"Calc MS Excel 2007 XML" \
    --infilter="csv:44,34,UTF8" \
    paris.csv madrid.csv bordeaux.csv


# TODO:
#  - rewrite this to treat each city individually and sequentially
#  - find a way to merge all resulting xslx files in a single
#    file with different sheets, or to import the CSV as separate sheets
