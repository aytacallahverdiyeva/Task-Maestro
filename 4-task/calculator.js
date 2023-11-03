var operators = ["+", "-", "/", "*"];
var box = null;
var output = null;
var operator = null;
var equal = null;
var dot = null;
var firstNum = true;
var numbers = [];
var operator_value;
var last_button;
var calc_operator;
var total;
var key_combination = [];

function button_number(button) {
    operator = document.getElementsByClassName("operator");
    box = document.getElementById("box");
    output = document.getElementById("output");
    equal = document.getElementById("equal_sign").value;
    dot = document.getElementById("dot").value;
    last_button = button;

    // if button is not an operator or = sign
    if (!operators.includes(button) && button!=equal){
        if (firstNum){
            if (button == dot){
                box.innerText = "0"+dot;
            } else {
                box.innerText = button;
            }
            firstNum = false;
        } else {
            // box value is 0
            if (box.innerText.length == 1 && box.innerText == 0){
                if (button == dot){
                    box.innerText += button;
                }
                return;
            }
            // return 
            if (box.innerText.includes(dot) && button == dot){
                return;
            }
            // max allowed numbers inputted 9
            if (box.innerText.length >= 9 ){
                return;
            }
            // if pressed dot and box already has a - sign, show -0.
            if (button == dot && box.innerText == "-"){
                box.innerText = "-0"+dot;
            } else {
                box.innerText += button;
            }}}
    // if it's an operator or = sign
    else {
        // return if operator is already pressed
        if (operator_value != null && button == operator_value){
            return
        }
        // show minus sign 
        if (button == "-" && box.innerText == 0){
            box.innerText = button;
            firstNum = false;
            operator_value = button
            showSelectedOperator()
            return;
        } else if (operators.includes(button) && box.innerText == "-"){
            return
        } else if (button == "-" && operator_value == "-" && output.innerText.includes("=")){
            return
        }
        // set value of operator if it's one
        if (operators.includes(button)){
            if (typeof last_operator != "undefined" && last_operator != null){
                calc_operator = last_operator
            } else {
                calc_operator = button
            } if (button == "*"){
                last_operator = "×"
            } else if (button == "/"){
                last_operator = "÷"
            } else {
                last_operator = button
            }
            operator_value = button
            firstNum = true
            showSelectedOperator()
        }
        if (numbers.length == 0){
            numbers.push(box.innerText)
            if (typeof last_operator != "undefined" && last_operator != null){
                // output.innerText = box.innerText + " " + last_operator + " " 
                output.innerText = box.innerText + " " + last_operator /* //yada burda*/
            }
        }
        // rest of calculations
        else {   
            if (numbers.length == 1){
                numbers[1] = box.innerText
            }
            var temp_num = box.innerText

            // calculate total
            if (button==equal && calc_operator != null){
                var total = calculate(numbers[0], numbers[1], calc_operator)
                box.innerText = total;

                // append second number to history
                if (!output.innerText.includes("=")){
                    output.innerText += " " + numbers[1] + " ="
                }
                temp_num = numbers[0]
                numbers[0] = total
                operator_value = null
                showSelectedOperator()

                // replace 1 number of history with value of total
                var history_arr = output.innerText.split(" ")
                history_arr[0] = temp_num
                output.innerText = history_arr.join(" ")
            }
            // update history with the value on screen and the pressed operator
            else if (calc_operator != null) {
                output.innerText = temp_num + " " + last_operator;
                calc_operator = button;
                numbers = [];
                numbers.push(box.innerText);
            }
        }
    }
}
 // operator button when selected
function showSelectedOperator(){
    var elements = document.getElementsByClassName("operator");

    for (var i=0; i<elements.length; i++){
        elements[i];
    }
    if (operator_value == "+"){
        document.getElementById("plusOp");
    } else if (operator_value == "-"){
        document.getElementById("subOp");
    } else if (operator_value == "*"){
        document.getElementById("multiOp");
    } else if (operator_value == "/"){
        document.getElementById("divOp");
    }
}

// function to calculate the result of 2 numbers and an operator
function calculate(num1, num2, operator){

    if (operator === "+"){
        total = (parseFloat)(num1)+(parseFloat)(num2)
    }
    else if (operator === "-"){
        total = (parseFloat)(num1)-(parseFloat)(num2)
    }
    else if (operator === "*"){
        total = (parseFloat)(num1)*(parseFloat)(num2)
    }
    else if (operator === "/"){
        total = (parseFloat)(num1)/(parseFloat)(num2)
    }
    else {
        if (total == box.innerText){
            return total
        }
        else {
            return box.innerText
        }
    }
    // if total isn't integer, show maximum 12 decimal places
    if (!Number.isInteger(total)){
        total = total.toPrecision(12);
    }
    return parseFloat(total);
}

// clear box and reset everything
function button_clear(){
    window.location.reload()
}

function backspace_remove(){

    box = document.getElementById("box");
    var elements = document.getElementsByClassName("operator");

    for (var i=0; i<elements.length; i++){
        elements[i];
    }
    var last_num = box.innerText;
    last_num = last_num.slice(0, -1)
    
    box.innerText = last_num

    // show 0  if all characters on screen are removed
    if (box.innerText.length == 0){
        box.innerText = 0
        firstNum = true
    }}

// to change the sign of a number currently on screen
function plus_minus(){
    box = document.getElementById("box");

    // if any operator is pressed
    if (typeof last_operator != "undefined"){
        if (numbers.length>0){
            if (operators.includes(last_button)){
                if (box.innerText == "-"){
                    box.innerText = 0
                    firstNum = true
                    return
                }
                else {
                    box.innerText = "-"
                    firstNum = false
                }}
            else {
                box.innerText = -box.innerText
                if (numbers.length==1){
                    numbers[0] = box.innerText
                }
                else {
                    numbers[1] = box.innerText
                }}}
        return
    }
    if (box.innerText == 0){
        box.innerText = "-"
        firstNum = false
        return
    }
    box.innerText = -box.innerText
}
// to calculate the percentage of a number
function calculate_percentage(){
    var elements = document.getElementsByClassName("operator");
    box = document.getElementById("box");

    if (numbers.length > 0 && typeof last_operator != "undefined"){

        var perc_value = ((box.innerText / 100) * numbers[0])
        if (!Number.isInteger(perc_value)) {
            perc_value = perc_value.toFixed(2);
        }
        box.innerText = perc_value
        numbers.push(box.innerText)
    
        // append second number to history
        if (!output.innerText.includes("=")){
            output.innerText += " " + numbers[1] + " ="
        } } else {
        box.innerText = box.innerText/100
    }

    numbers.push(box.innerText)
    var res = calculate(numbers[0], numbers[1], last_operator)
    box.innerText = res.substring(0,10)
    operator_value = "="

    // deselect operator if any selected
    for (var i=0; i<elements.length; i++){
        elements[i];
    } }

// to clear last number typed into the display
function clear_entry(){
    box = document.getElementById("box");

    if (numbers.length > 0 && typeof last_operator != "undefined"){
        box.innerText = 0
        var temp = numbers[0]
        numbers = []
        numbers.push(temp)
        firstNum = true;
    } }
document.addEventListener('keydown', keyPressed);
document.addEventListener('keyup', keyReleased);

// to capture keydown events
function keyPressed(e) {
    e.preventDefault()
    var equal = document.getElementById("equal_sign").value;
    var dot = document.getElementById("dot").value;

    if (e.key == "Delete"){
        button_clear();
        return;
    }

    var isNumber = isFinite(e.key);
    var enterPress;
    var dotPress;
    var commaPress = false;

    if (e.key == "Enter"){ enterPress = equal; }
    if (e.key == "."){ dotPress = dot; }
    if (e.key == ","){ commaPress = true; }
    
    if (isNumber || operators.includes(e.key) || e.key == "Enter" || e.key == dotPress || 
        commaPress || e.key == "Backspace"){
        if (e.key == "Enter"){ button_number(enterPress) }
        else if (e.key == "Backspace"){ backspace_remove() }
        else if (commaPress){ button_number(dot) }
        else { button_number(e.key) }   
    }
    if (e.key) {
        key_combination[e.code] = e.key;
    }}

// to capture keyup events
function keyReleased(e){
    if (key_combination['ControlLeft'] && key_combination['KeyV']) {
        navigator.clipboard.readText().then(text => {
            box = document.getElementById("box");
            var isNumber = isFinite(text);
            if (isNumber){
                var copy_number = text
                firstNum = true
                button_number(copy_number)
            }
        }).catch(err => {
            console.error('Failed to read clipboard contents: ', err);
        }); }
    if (key_combination['ControlLeft'] && key_combination['KeyC']) {
        box = document.getElementById("box");
        navigator.clipboard.writeText( box.innerText);
    }
    key_combination = []
    e.preventDefault()
}