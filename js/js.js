let bannedWords = "";
    let regxBannedWords = "";
    let stringToBeEdited = "";

    function saveBannedWords(){

        document.getElementById("bannedList").innerHTML = "";

        // Alert if no banned word saved when save button is clicked
        if(document.getElementById("bannedText").value == ""){
            alert("Please add at least one banned word.");
            return;
        }
        
        bannedWords = document.getElementById("bannedText").value;
        let regxString = /([\w!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]\S*)|("([^"]|"")*")|('([^']|'')*')/g;
        regxBannedWords = bannedWords.match(regxString);
        document.getElementById("bannedText").value = "";

        let noBannedText = document.getElementById("noBannedWords");
        let displayBannedText= document.getElementById("dislayBannedWords")

        noBannedText.classList.add("d-none");
        displayBannedText.classList.remove("d-none");

        for(i = 0; i < regxBannedWords.length; i++){

            let ul = document.getElementById("bannedList");
            let li = document.createElement("li");

            if(regxBannedWords[i].split('\"').length > 2 || regxBannedWords[i].split('\'').length > 2){
                if(regxBannedWords[i].includes('\"')){
                    regxBannedWords[i] = regxBannedWords[i].replace(/\"*/g,"");
                } else if(regxBannedWords[i].includes("\'")){
                    regxBannedWords[i] = regxBannedWords[i].replace(/\'*/g,"");
                }
            }

            li.appendChild(document.createTextNode(regxBannedWords[i]));
            li.setAttribute("class", "list-group-item");
            ul.appendChild(li);

        }
    }

    function updateDocument(){

        stringToBeEdited = document.getElementById("originalText").value;

        // Alert if no words are saved
        if(regxBannedWords == ""){
            alert("No banned words saved.");
        }

        for(i = 0; i < regxBannedWords.length; i++){

            let removeStr = regxBannedWords[i];

            // Account for Special Characters
            const specialChar = new RegExp(/([.^$*+?()[{\|])/g);
            const specialCharStr = "[.^$*+?()[{\|]";

            if(specialChar.test(removeStr)){

                // console.log("step 1: " + removeStr + " contains special character.")

                for(i = 0; i < specialCharStr.length; i++){
                    if(removeStr.includes(specialCharStr[i])){
                        removeStr = removeStr.replace(specialChar, "\\" + specialCharStr[i]);
                    }

                }
                // console.log("Step 1b: after special char code: " + removeStr);
                
            }


            // Remove Single or Double Quotes
            if(removeStr.split('\"').length > 2 || removeStr.split('\'').length > 2){

                if(removeStr.includes('\"')){
                    removeStr = removeStr.replace(/\"*/g,"");
                    // console.log("step 2; removing double quotes");
                } else if(removeStr.includes("\'")){
                    removeStr = removeStr.replace(/\'*/,"");
                    // console.log("step 2; removing single quotes");
                }
            }


            // Determine if a banned word is one word or a phrase
            if(removeStr.split(' ').length > 1){
                const rgx = new RegExp("\\b" + removeStr, 'gi');
                stringToBeEdited = stringToBeEdited.replace(rgx, "XXXX");
                // console.log("step 3: phrase contains more than one word: " + rgx);
            } else {
                const rgx = new RegExp("\\b" + removeStr + "+", 'gi');
                stringToBeEdited = stringToBeEdited.replace(rgx, "XXXX");
                // console.log("step 3: phrase contains only one word: " +rgx);
                console.log(stringToBeEdited);
            }

            
            // console.log("removeStr end result: " + removeStr);
        
        }

        // console.log("stringToBeEdited end result: " + stringToBeEdited);

        document.getElementById("updatedText").innerHTML = stringToBeEdited;

    }