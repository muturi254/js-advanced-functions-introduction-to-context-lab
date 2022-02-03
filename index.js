// Your code here
function createEmployeeRecord(employeeDetails) {
    return {
        firstName: employeeDetails[0],
        familyName: employeeDetails[1],
        title: employeeDetails[2],
        payPerHour: employeeDetails[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(employeeDetails) {
    let refinedRecord = [];
    for (let record of employeeDetails) {
        record = createEmployeeRecord(record)
        refinedRecord.push(record)
    }
    return refinedRecord
}


function createTimeInEvent(employee, dateStamp) {
    let dateTime = dateStamp.split(' ');
    let time = {
        type: "TimeIn",
        hour: parseInt(dateTime[1]),
        date: dateTime[0]
    }
    employee.timeInEvents.push(time)
    return employee
  
}

function createTimeOutEvent(employee, dateStamp) {
    let dateTime = dateStamp.split(' ');
    let time = {
        type: "TimeOut",
        hour: parseInt(dateTime[1]),
        date: dateTime[0]
    }
    employee.timeOutEvents.push(time)
    return employee
  
}


function hoursWorkedOnDate(employee, datestamp) {
    let timeIn, timeOut, duration;
    let timeInKey = employee.timeInEvents;
    let timeOutKey = employee.timeOutEvents;

    for (dateDetail of timeInKey) {
        if (dateDetail.date === datestamp) {
            timeIn = dateDetail.hour;
            break;
        }
    }

    for (dateDetail of timeOutKey) {
        if (dateDetail.date === datestamp) {
            timeOut = dateDetail.hour;
            break;
        }
    }

    // timeIn = timeIn > 1200 ? ((timeIn - 1200) / 100) : (timeIn /100);
    // timeOut = timeOut > 1200 ? ((timeOut- 1200) / 100) : (timeOut /100) ;


    duration = (timeOut - timeIn)/100;
    console.log("timeIn", timeIn);
    console.log("timeout", timeOut);
    console.log("duration", duration)
    return duration;

}

function wagesEarnedOnDate(employee, dateStamp) {
    let hoursWorked = hoursWorkedOnDate(employee, dateStamp);
    let pay = employee.payPerHour * hoursWorked;
    console.log("pay", pay);
    return pay
}


function findEmployeeByFirstName(srcArray, firstName) {
    let results;
    for (let record of srcArray) {
        if (record.firstName === firstName) {
            results = record;
            break;
        }
    }

    return results;

}

function allWagesFor(employee) {
    let total= 0;
    for (let record of employee.timeInEvents) {
        // total = total + wagesEarnedOnDate(employee, record.date);
        console.log("total", wagesEarnedOnDate(employee, record.date));
        ++total
    }
    console.log("hello", total);
    return total;
}

let obj = createEmployeeRecord(["Julius", "Caesar", "General", 27])
// let srcArray = [obj]
createTimeInEvent(obj, "0044-03-15 0900");
createTimeOutEvent(obj, "0044-03-15 1100");
hoursWorkedOnDate(obj, "0044-03-15");
wagesEarnedOnDate(obj, "0044-03-15")

// mulitple tests
// createTimeInEvent(obj, '0044-03-14 0900');
// createTimeOutEvent(obj, '0044-03-14 2100');
// createTimeInEvent(obj, '0044-03-15 0900');
// createTimeOutEvent(obj, '0044-03-15 1100');
// wagesEarnedOnDate(obj, '0044-03-15')
// findEmployeeByFirstName(srcArray, "Julius")
// allWagesFor(obj)