# BAM Karaoke Box - Prices Exporter

## Purpose

This is a simple prices exporter developed to facilitate price checks
by the BAM Operations and BAM Finance teams.

It allows to check the accuracy of the publicly visible room prices
on our booking website by exporting them to flat files, so the teams
can run extended checks on them and easily detect pricing errors.

## Design

This exporter is design as a front-end website test suite, built with
Playwright. The reasoning behind this approach is that we want to
check our prices exactly in the manner a user would see them, to
ensure there are no mistakes that are introduced by middleware
in-between our backoffice price management system and the
customer-visible booking system.

## Usage

### Install

Assuming you already have `yarn` and `node` installed.

Then run:

```
yarn install
```

### Run

This command will run the test suite, which will crawl the site,
extract the prices and store them as CSV files.


```
npx playwright test
```

### Export Format

The exports are as separate files, with:

 - one file per city per day (e.g. 1 file for Paris, containing prices
   for the parisian BAM Karaoke Boxes, 2022-12-25),
 - one line per booking slot.

The files follow this format:

```
DATE,ROOM_NAME,CAPACITY,SLOT_START_TIME,SLOT_END_TIME,SLOT_DURATION,TOTAL_PRICE
2023-01-23,Ray Charles,4,18:10,20:10,120,45
2023-01-23,Ray Charles,4,20:20,22:20,120,65
2023-01-23,Ray Charles,4,22:30,00:30,120,65
2023-01-23,Ray Charles,4,00:40,01:40,60,33
2023-01-23,Electric Blue,4,20:10,22:10,120,65
2023-01-23,Electric Blue,4,22:20,00:20,120,65
2023-01-23,Electric Blue,4,00:30,01:30,60,33
2023-01-23,Electric Green,4,18:10,20:10,120,45
2023-01-23,Electric Green,4,22:30,00:30,120,65
2023-01-23,Electric Green,4,00:40,01:40,60,33
2023-01-23,Ananas,4,18:30,20:30,120,45
2023-01-23,Ananas,4,20:40,22:40,120,65
2023-01-23,Ananas,4,22:50,00:50,120,65
2023-01-23,Singes,4,18:00,20:00,120,45
2023-01-23,Singes,4,20:10,22:10,120,65
2023-01-23,Singes,4,22:20,00:20,120,65
2023-01-23,Singes,4,00:30,01:30,60,33
```
