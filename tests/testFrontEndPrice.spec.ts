import { test, Page } from "@playwright/test";
import fs from "fs";

import { START_DATE, BASE_URL, QA_MARKER, DAYS } from "./config/config";
import { City, CITIES } from "./utils/Cities";
import { MONTHS } from "./utils/Months";
import { csvAsTable } from "./utils/CSV.utils";
import { dateToLocalISOShortDate, getFutureDate } from "./utils/Dates.utils";

const browseBooking = async (page: Page, city: City, date: string) => {
  const TEST_URL = `${BASE_URL}/booking?city=${city.name}#date=${date}&city=${city.name}${QA_MARKER}`;

  await page.goto(TEST_URL, { waitUntil: "networkidle" });

  await getData(page, city, date);
};

const getData = async (page: Page, city: City, date: string) => {
  // select the date
  const newDay = date.substring(8, 10);
  const newMonth = date.substring(5, 7);
  const newMonthInt = parseInt(newMonth, 10);

  // console.log("DATE NEW", newDay, MONTHS[newMonthInt - 1].name);

  const nowadayDay = await page.locator(".cell.day.selected >> nth=0").innerText();
  let nowadayMonth = await page.locator(".day__month_btn >> nth=0").innerText();
  nowadayMonth = nowadayMonth.split(" ")[0];

  // await page.waitForTimeout(1000);

  if (nowadayMonth === MONTHS[newMonthInt - 1].name && parseInt(nowadayDay, 10) > parseInt(newDay, 10)) {
    test.skip();
  }

  const roomSlots = await page.evaluate(() => {
    const rooms = [];
    // eslint-disable-next-line no-undef
    const room = document.querySelectorAll(".booking-result") || [];
    const numberRoom = room.length;
    for (let i = 0; i < numberRoom; i++) {
      const roomName = room[i].querySelector(".room-name")?.innerHTML?.trim() || "";
      if (roomName !== "") {
        const roomPrices = room[i].querySelectorAll(".booking-slot__price__default, .booking-slot__price__promo");
        const roomCapacity = room[i].querySelector(".seats")?.innerHTML?.trim() || "";
        const roomSlotHours = room[i].querySelectorAll(".booking-slot__hour");
        const roomSlotAvailable = roomSlotHours.length;
        for (let j = 0; j < roomSlotAvailable; j++) {
          const roomPrice = roomPrices.length > j ? (roomPrices[j].textContent || "").replace("€", "") : "";
          const roomStartHour = roomSlotHours[j].childNodes[0].textContent || "";
          const roomEndHour = roomSlotHours[j].childNodes[4].textContent || "";
          const roomEndHourInt = roomEndHour;
          let slotDuration = 0;

          const roomStartHourInMinute =
            parseInt(roomStartHour.substring(0, 2), 10) * 60 + parseInt(roomStartHour.substring(3, 5), 10);

          let roomEndHourInMinute =
            parseInt(roomEndHour.substring(0, 2), 10) * 60 + parseInt(roomEndHour.substring(3, 5), 10);
          if (
            (roomStartHour[0] === "0" && roomEndHour[0] === "0") ||
            (roomEndHour[0] !== "0" && roomStartHour[0] !== "0")
          ) {
            slotDuration = roomEndHourInMinute - roomStartHourInMinute;
          }
          if (roomEndHour[0] === "0" && roomStartHour[0] !== "0") {
            const newEndHour = `${parseInt(roomEndHourInt.substring(0, 2), 10) + 24}:${roomEndHour.substring(3, 5)}`;
            roomEndHourInMinute =
              parseInt(newEndHour.substring(0, 2), 10) * 60 + parseInt(newEndHour.substring(3, 5), 10);

            slotDuration = roomEndHourInMinute - roomStartHourInMinute;
          }

          rooms.push(`${roomName},${roomCapacity},${roomStartHour},${roomEndHour},${slotDuration},${roomPrice}`);
        }
      }
    }
    return rooms;
  });

  const priceRows: string[] = [
    "DATE,ROOM_NAME,CAPACITY,SLOT_START_TIME,SLOT_END_TIME,SLOT_DURATION,TOTAL_PRICE",
    ...roomSlots.map((roomSlot) => `${date},${roomSlot}`),
  ];

  const priceRowsCSV = priceRows.join("\n");
  // console.log('----------------------------------------------------------------------');
  // console.log(checkToString);
  // console.log('----------------------------------------------------------------------');
  console.table(csvAsTable(priceRowsCSV));
  // let venues = city.venues;
  // if (venues?.length) {
  //   for (let i = 0; i < venues?.length; i++) {
  //     fs.writeFileSync(
  //       `./PriceCSV/${date} - ${city.name} - ${
  //         venue.name
  //       }.csv`,
  //       checkToString
  //     );
  //   }
  // } else {
  fs.writeFileSync(`./PriceCSV/${date} - ${city.name}.csv`, priceRowsCSV);
  // }
};

[...Array(DAYS).keys()].forEach((day) => {
  const testDay: Date = getFutureDate(START_DATE, day);
  const isoShortTestDay = dateToLocalISOShortDate(testDay);

  CITIES.forEach((city) => {
    const venues = city.venues;

    if (venues) {
      venues.forEach((venue) => {
        test(`${isoShortTestDay} - ${city.name} - ${venue.name}`, async ({ page }) =>
          browseBooking(page, city, isoShortTestDay));
      });
    } else {
      test(`${isoShortTestDay} - ${city.name}`, async ({ page }) => browseBooking(page, city, isoShortTestDay));
    }
  });
});
