const inputBirthday = document.querySelector(".input-date");
const buttonShow = document.querySelector(".input-button");
const showOutput = document.querySelector(".output-container");

function reverseTheStr(str){
    var charSplittedList = str.split('');
    var reversedList = charSplittedList.reverse();
    var joinReversedList = reversedList.join('');
    return joinReversedList;
}

function checkForPalindrome(realStr){
    var reversedStr = reverseTheStr(realStr);
    if( reversedStr == realStr){
        return true;
    }else{
        return false;
    }
}

function convertingTheDate(date){
    var newDate = {
        day : '',
        month : '',
        year : ''
    };

    if(date.day < 10){
        newDate.day = '0' + date.day;
    }else{
        newDate.day = date.day.toString();
    }
    if(date.month < 10){
        newDate.month = '0' + date.month;
    }else{
        newDate.month = date.month.toString();
    }
    newDate.year = date.year.toString();
   return newDate;
}

function makeDateVariatons(date){
    var newDate = convertingTheDate(date);
    
    var ddmmyyyy = newDate.day + newDate.month + newDate.year;
    var mmddyyyy = newDate.month + newDate.day + newDate.year;
    var yyyymmdd = newDate.year + newDate.month + newDate.day;
    var ddmmyy = newDate.day + newDate.month + newDate.year.slice(-2);
    var mmddyy = newDate.month + newDate.day + newDate.year.slice(-2);
    var yymmdd = newDate.year.slice(-2) + newDate.month + newDate.day;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkPalindromeForAllDateVariations(date){
    var listOfPalindromes = makeDateVariatons(date);

    var flag = false;

    for( var i=0; i<listOfPalindromes.length; i++){
        if(checkForPalindrome(listOfPalindromes[i])){
            flag = true;
            break;
        }
    }
    return flag;
}

function isLeapYear(year){
    if(year % 4 ==0){
        return true;
    }
    if(year % 100 ==0){
        return false;
    }
    if(year % 400 ==0){
        return true;
    }
    return false;
}

function nextDate(date){
var storeTheDay = date.day + 1;
var storeTheMonth = date.month;
var storeTheYear = date.year;

var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

if(storeTheMonth == 2){
    if(isLeapYear(storeTheYear)){
    if(storeTheDay > 29){
        storeTheDay = 1;
        storeTheMonth++;
    }
}else{
    if(storeTheDay > 28){
        storeTheDay = 1;
        storeTheMonth++;
    }
}
}else{
    if(storeTheDay > daysInMonth[storeTheMonth -1]){
        storeTheDay = 1;
        storeTheMonth++;
    }
    if(storeTheMonth > 12){
        storeTheMonth = 1;
        storeTheYear++;
    }
}
     return{
         day : storeTheDay,
         month : storeTheMonth,
         year : storeTheYear
     };
}

function previousDate(date){
    var storeTheDay = date.day - 1;
    var storeTheMonth = date.month;
    var storeTheYear = date.year;
    
    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    
    if(storeTheMonth == 3){
        if(isLeapYear(storeTheYear)){
        if(storeTheDay < 1){
            storeTheDay = 29;
            storeTheMonth--;
        }
    }else{
        if(storeTheDay < 1){
            storeTheDay = 28;
            storeTheMonth--;
        }
    }
    }else{

        if(storeTheDay < 1){
            storeTheDay = daysInMonth[storeTheMonth - 2];
            storeTheMonth--;
        }
        if(storeTheMonth < 1){
            storeTheDay = 31;
            storeTheMonth = 12;
            storeTheYear--;
        }
    }
         return{
             day : storeTheDay,
             month : storeTheMonth,
             year : storeTheYear
         };
    }

function nextPalindromeDate(date){
var counter = 0;
var nextDayDate = nextDate(date);

while(1){
    counter++;
    var palindromeResult = checkPalindromeForAllDateVariations(nextDayDate);
    if(palindromeResult){
        break;
    }
    nextDayDate = nextDate(nextDayDate);
}
return [counter, nextDayDate];
}

function previousPalindromeDate(date){
    var counter = 0;
var previousDayDate = previousDate(date);

while(1){
    counter++;
    var palindromeResult = checkPalindromeForAllDateVariations(previousDayDate);
    if(palindromeResult){
        break;
    }
    previousDayDate = previousDate(previousDayDate);
}
return [counter, previousDayDate];
}

function decideLessDayFactorPalindromeDate(date){
var resultValueForPrevious = previousPalindromeDate(date);
var resultValueForNext = nextPalindromeDate(date);

if(resultValueForNext[0] > resultValueForPrevious[0]){
    return resultValueForPrevious;
}else{
    return resultValueForNext;
}
}

function clickEventHandler(){
    var birthdayStr = inputBirthday.value;
    if(birthdayStr != ''){
        var listOfCharSeperatedByHyphen = birthdayStr.split('-');
        var date = {
            day : Number(listOfCharSeperatedByHyphen[2]),
            month : Number(listOfCharSeperatedByHyphen[1]),
            year : Number(listOfCharSeperatedByHyphen[0]),
        };
         var knowIsItPallindrome = checkPalindromeForAllDateVariations(date);
         if(knowIsItPallindrome){
             showOutput.innerText = "Yay! Your birthday is a palindrome 😄."
         }else{
             var [counter, actualPalindromeDate] = decideLessDayFactorPalindromeDate(date);

            counter>1 ? showOutput.innerText = `The next palindrome date is ${actualPalindromeDate.day}-${actualPalindromeDate.month}-${actualPalindromeDate.year}, you missed it by ${counter} days 🥺.` : showOutput.innerText = `The next palindrome date is ${actualPalindromeDate.day}-${actualPalindromeDate.month}-${actualPalindromeDate.year}, you missed it by ${counter} day 🥺.`
         }
    }
    
}

buttonShow.addEventListener("click", clickEventHandler);
