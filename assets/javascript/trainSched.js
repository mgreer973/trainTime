var trainSched = new Firebase("https://mg-train-schedule.firebaseio.com/");

// 2. Button for adding Employees
$("#submit").on("click", function(){

    // Grabs user input
    var trainName = $("#trainName").val().trim();
    var destination = $("#destination").val().trim();
//    var firstTrainTime = moment($("#firstTrainTime").val().trim(), "DD/MM/YY").format("X");
    var firstTrainTime = $("#firstTrainTime").val().trim();
    var freq = $("#freq").val().trim();

    // Creates local "temporary" object for holding employee data
    var newTrain = {
        trainName:  trainName,
        destination: destination,
        firstTrainTime: firstTrainTime,
        freq: freq
    }

    // Uploads employee data to the database
    trainSched.push(newTrain);

    // Clears all of the text-boxes
    $("#trainName").val("");
    $("#destination").val("");
    $("#firstTrainTime").val("");
    $("#freq").val("");

    // Prevents moving to new page
    return false;
});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
trainSched.on("child_added", function(childSnapshot, prevChildKey){

    // Store everything into a variable.
    var trainName = childSnapshot.val().trainName;
    var destination = childSnapshot.val().destination;
    var firstTrainTime = childSnapshot.val().firstTrainTime;
    var freq = childSnapshot.val().freq;

    var firstTimeConverted = moment(firstTrainTime,"hh:mm").subtract(1, "years");

    // Current Time
    var currentTime = moment();

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

    // Time apart (remainder)
    var tRemainder = diffTime % freq; 

    // Minute Until Train
    var tMinutesTillTrain = freq - tRemainder;

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes")

    var arrivalTime = moment(nextTrain).format("hh:mm A");

    // Add each train's data into the table 
    $("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + freq + "</td><td>" + arrivalTime + "</td><td>" + tMinutesTillTrain + "</td><tr>" );

});


function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('txt').innerHTML =
    h + ":" + m + ":" + s;
    var t = setTimeout(startTime, 500);
}
function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}