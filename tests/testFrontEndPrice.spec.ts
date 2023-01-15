import { test, Page } from '@playwright/test';

const START_DATE = new Date();
const DAYS = 60;

interface city {
    name: string;
    venues?:{name:string,arr:string}[];
  }

  interface venue {
    name: string;
    arr:string;
  }

const Month = [{
  name: 'Janvier',
},
{
  name: 'Fevrier',
},
{
  name: 'Mars',
},
{
  name: 'Avril',
},
{
  name: 'Mai',
},
{
  name: 'Juin',
},
{
  name: 'Juillet',
},
{
  name: 'Août',
},
{
  name: 'Septembre',
},
{
  name: 'Octobre',
},
{
  name: 'Novembre',
},
{
  name: 'Decembre',
},
]
const CITY: city[] = [
    {
      name: 'Paris',
      venues:[{
        name : 'Etoile',
        arr: ' (17ème)',
        }, {
        name: 'Madeleine',
        arr: ' (9ème)',
        }, {
        name : 'Parmentier',
        arr: ' (11ème)',
        }, {
        name : 'Richer',
        arr: ' (9ème)',
        }, {
        name : 'Sentier',
        arr: ' (2ème)',
      }]
    },
    {
      name: 'Bordeaux',
    },
    {
      name: 'Madrid',
    },
]
    
    const browseBooking = async(page:Page,city:city, date:Date,day:number ,venue?:any) =>{
        
        const BASE_URL = `https://fr.bam-karaokebox.com/booking?city=${city.name}#date=${dateToLocalISOShortDate(date)}&city=${city.name}?utm_source=bkb-website-tests&utm_medium=qa-bot&utm_campaign=monitoring`;

        await page.goto(BASE_URL);

        let venues = city.venues
      
        if(venues?.length){
            console.log(`${venue.name}${venue.arr}`)
            await page.locator('span:has-text("Lieux")').click();
            await page.locator(`text= ${venue.name}${venue.arr}`).click();
            await page.locator('span:has-text("Lieux")').click();
            await getData(page,city,date,day,venue)
          }
        else{
          await getData(page,city,date,day)
        }
    }

    const getData = async (page: Page, city:city, date: Date, day:number ,venue?:any) => {
        await page.waitForTimeout(3000);
        // select the date
        await page.waitForTimeout(3000);
        
        const newDay = `${dateToLocalISOShortDate(date)}`.substring(8,10)
        const newMonth = `${dateToLocalISOShortDate(date)}`.substring(5,7)
        const newMonthInt = parseInt(`${dateToLocalISOShortDate(date)}`.substring(5,7),10)

        console.log('DATE NEW',newDay,Month[newMonthInt-1].name)

        let nowadayDay = await page.locator('.cell.day.selected >> nth=0').innerText()
        let nowadayMonth = await page.locator('.day__month_btn >> nth=0').innerText()
        nowadayMonth = nowadayMonth.split(' ')[0]
        
        await page.waitForTimeout(1000);

        if(nowadayMonth == Month[newMonthInt-1].name && parseInt(nowadayDay,10) > parseInt(newDay,10)){
          test.skip()
        }

        await page.waitForTimeout(3000);

        const roomSlots = await page.evaluate(() => {
            const rooms=[];
            const room = document.querySelectorAll('.booking-result');
            const numberRoom = room.length;
            for (let i =0; i<numberRoom; i++){
            const roomName = room[i].querySelector('.room-name')?.innerHTML;
            const roomCapacity = room[i].querySelector('.seats')?.innerHTML;
            const roomSlotAvailable = room[i].querySelectorAll('.booking-slot__hour').length;
            for (let j=0; j<roomSlotAvailable; j++){
                const roomStartHour = room[i].querySelectorAll('.booking-slot__hour')[j].childNodes[0].textContent;
                const roomEndHour = room[i].querySelectorAll('.booking-slot__hour')[j].childNodes[4].textContent;
                const roomPrice = room[i].querySelectorAll('.booking-slot__price__default, .booking-slot__price__promo')[j].textContent.replace('€','');

                //create slot duration
                var roomEndHourInt = roomEndHour
                var roomStartHourInt = roomStartHour
                var newStartHour:string
                var newEndHour:string
                var slotDuration:number
                var roomEndHourInMinute:number
                var roomStartHourInMinute:number

                roomEndHourInMinute = (parseInt(roomEndHour.substring(0,2),10)*60) + parseInt(roomEndHour.substring(3,5),10)
                roomStartHourInMinute = (parseInt(roomStartHour.substring(0,2),10)*60) + parseInt(roomStartHour.substring(3,5),10)

                if(roomStartHour[0] == '0' && roomEndHour[0] == '0' || roomEndHour[0] != '0' && roomStartHour[0] != '0'){
                  slotDuration = roomEndHourInMinute - roomStartHourInMinute
                }
                if(roomEndHour[0] == '0' && roomStartHour[0] != '0'){
                  newEndHour = `${(parseInt(roomEndHourInt.substring(0,2),10) + 24)}:${(roomEndHour.substring(3,5))}`
                  roomEndHourInMinute = (parseInt(newEndHour.substring(0,2),10)*60) + parseInt(newEndHour.substring(3,5),10)
              
                  slotDuration = roomEndHourInMinute - roomStartHourInMinute
                }

                rooms.push(`${roomName},${roomCapacity},${roomStartHour},${roomEndHour},${slotDuration},${roomPrice}`);
            }
        }
        return rooms;
    });

    let check = []
    check[0] = 'DATE,ROOM_NAME,CAPACITY,SLOT_START_TIME,SLOT_END_TIME,SLOT_DURATION,TOTAL_PRICE \n'
    for (let i=0; i < roomSlots.length; i++){
        check.push(`${dateToLocalISOShortDate(date)},${roomSlots[i]}\n`)
    }

    let checkToString = check.join("")
    console.log(checkToString)
 
    var arrObj =[]
    var lines = checkToString.split('\n');
    var headers = lines[0].split(',');

    for(var i=1; i<lines.length; i++){
      var rowData = lines[i].split(',');
      arrObj[i] = {};

      for (var j=0; j<rowData.length; j++){
        arrObj[i][headers[j]] = rowData[j]
      }
    }
    console.table(arrObj);
    let venues = city.venues
    if(venues?.length){
      for(let i=0; i< venues?.length; i++){
      require("fs").writeFileSync(`./PriceCSV/${dateToLocalISOShortDate(date)} - ${city.name} - ${venue.name}.CSV`, checkToString)
    }
  } else{
      require("fs").writeFileSync(`./PriceCSV/${dateToLocalISOShortDate(date)} - ${city.name}.CSV`, checkToString)
    }
}

    const getFutureDate = (givenDate: Date, increment: Int): Date => 
        new Date(givenDate.getTime() + increment * 24 * 60 * 60 * 1000);

    const dateToLocalISOShortDate = (date: Date): string => {
        const offset = date.getTimezoneOffset();
        const localDate = new Date(date.getTime() - offset * 60 * 1000);
        return localDate.toISOString().substring(0, 10);
      };
      
      [...Array(DAYS).keys()].forEach((day) => {
        const testDay: Date = getFutureDate(START_DATE, day);

        CITY.forEach((city) => {
          if(`${city.name}`=='Paris'){

              const venues = city.venues;

              venues.forEach(venue => {
                test(`${dateToLocalISOShortDate(testDay)} - ${city.name} - ${venue.name}`, async ({ page }) =>
                browseBooking(page, city,testDay,day,venue));
              });
            }else{
                test(`${dateToLocalISOShortDate(testDay)} - ${city.name}`, async ({ page }) =>
                browseBooking(page, city, testDay,day));
          }
        });
      });
