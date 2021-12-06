// return 1 if date1 > date2
// return -1 if date1 < date2
// return 0 if date1==date2

function compareTwoDates(date1, date2){
    let y1 = date1.getFullYear()
    let y2 = date2.getFullYear()
    let m1 = date1.getMonth()
    let m2 = date2.getMonth()
    let d1 = date1.getDate()
    let d2 = date2.getDate()

    if (y1 > y2) return 1;
    if (y2 > y1) return -1;
    if(y1===y2){
        if(m1>m2) return 1;
        if(m2>m1) return -1;
        if(m2===m1){
            if(d1>d2) return 1;
            if(d2>d1) return -1;
            if(d1===d2)
                return 0;
        }
    }
}

function addTime(start, duration) {

    if (start===undefined || duration===undefined) return "0"
    let durationHours = parseInt(duration[0])
    let durationMinutes = parseInt(duration.substr(3,2))
    if (!durationHours) durationHours=0
    if (!durationMinutes) durationMinutes=0

    let startHour = parseInt(start.substr(0,2))
    let startMinute = parseInt(start.substr(3,2))

    let endHour = startHour + durationHours
    let endMinute = startMinute + durationMinutes

    if (endMinute >= 60){
        endMinute -= 60
        endHour += 1
    }

    if (endHour >= 24) endHour -= 24

    let retEndhour = ""
    let retEndminute = ""

    if (endHour < 10)
        retEndhour = "0" + endHour
    else
        retEndhour = endHour.toString()

    if (endMinute < 10)
        retEndminute = "0" + endMinute
    else
        retEndminute = endMinute.toString()

    return retEndhour+":"+retEndminute

}

const checkIfTimeIsBetween = (timeStart, timeToCheck, timeEnd) =>
{
    if (compareTwoHours(timeStart, timeToCheck) === 1) return false // jeżeli film sie jeszcze nie zaczął

    if (compareTwoHours(timeToCheck, timeEnd) === 1) return false // jeżeli film się skończył

    return true // jeżeli film trwa
}

const compareTwoHours = (time1, time2) => {
    let hours1 = parseInt(time1.substr(0,2))
    let hours2 = parseInt(time2.substr(0,2))
    let minute1 = parseInt(time1.substr(3, 2))
    let minute2 = parseInt(time2.substr(3, 2))

    if (hours1 > hours2) return 1
    if (hours1 < hours2) return -1
    if (hours1 === hours2){
        if(minute1 > minute2) return 1
        if(minute1 < minute2) return -1
        if(minute1 === minute2) return 0
    }
}


export {compareTwoDates, addTime, checkIfTimeIsBetween}