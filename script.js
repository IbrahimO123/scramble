//Variables
const form = document.querySelector("#scrambled")
const result = document.querySelector("#result");
const countMatched = document.querySelector("#count")
const exact = document.querySelector("#exact")

// Function I created to handle just one word (not in use for now)
function getMessage(message, remove, replace) {
message = message.trim();
remove = remove.trim();
replace = replace.trim();
const msg = message.split(" ");
const rem = remove;
let re = new RegExp(`${rem}.`);
let ok = message.match(re)
const rep = replace ? replace : "****" ;
const splitedMessage= []
msg.map((word) => {
      if ( word == rem) {
           word = rep;
      }
       if ( word == ok) {
         let sign = word.charAt(word.length - 1)
         word = rep+sign;
      }
    splitedMessage.push(word)
   }
   )
return splitedMessage;
}

// fucntion to handle more than one word (currently using this to handle the replacement)
function changeMoreThanOneWord(message, remove, replace) {
   if (exact.checked == false) {
      message = message.toLowerCase();
      remove = remove.toLowerCase();
      replace = replace.toLowerCase();
    }
   message = message.trim();
   remove = remove.trim();
   replace = replace.trim();
   const msg = message.split(" ")
   const rep = replace ? replace : "****" ;
   const remSplit = remove.split(" ")
   //const repSplit = replace.split(" ")
   let countCharacter = 0;
   let numberOfCharacters = 0;
   const splitedMessage= []
   msg.forEach( (word, num) => {
      remSplit.forEach( (removeWord) => {
        let regex = new RegExp(`${removeWord}[^a-zA-Z\d\s:]+`)
         let matchWordWithCharacter = word.match(regex)
         if ( word == matchWordWithCharacter) {
          let sign = word.charAt(word.length - 1)
          word = rep+sign;
          countCharacter = countCharacter + 1
          numberOfCharacters = numberOfCharacters + removeWord.length
         }
         else if ( word == removeWord) {
            word = rep;
            countCharacter = countCharacter + 1
            numberOfCharacters = numberOfCharacters + word.length
         }
         
   })
      splitedMessage.push(word)
} )
   return [splitedMessage , countCharacter, numberOfCharacters];
}

// function to join the message join 
function joinMessage(message, remove, replace) {
   // The expression to handle the one word function (not in use for now)
   //const result = getMessage(message, remove, replace);
   const result2 = changeMoreThanOneWord(message, remove, replace);
   [splitedMessage, count, numberOfCharacters] = result2;
   let joinedMessage = splitedMessage.join(" ") ;
   return [joinedMessage, count, numberOfCharacters];
}

// To scroll down when on mobile devices
function scrollToBottom() {
   if (document.documentElement.clientWidth <= 679) {
   window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
   }
 }


// form 
form.addEventListener("submit", (e) => {
    start = performance.now();
    e.preventDefault();
    let message = form.elements["message"].value
    let remove = form.elements["remove"].value
    let replace = form.elements["replace"].value
    const output = joinMessage(message, remove, replace);
    [outputMessage, count, numberOfCharacters] = output
    result.innerText = outputMessage;
    end = performance.now();
    let timeTaken = end - start;
    countMatched.innerText = `Matched words to be scrambled: ${count}
    Total characters scrambled: ${numberOfCharacters}
    Time taken for exceution: ${timeTaken.toFixed(2)} milliseconds`
    setTimeout(function() { scrollToBottom(); }, 100);
})
