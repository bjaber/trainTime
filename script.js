$(document).ready(function () {



    //  Firebase configuration
    var firebaseConfig = {
        apiKey: "AIzaSyAOOgAD64ADGZZUxrCJldahk8Tmam2UmEw",
        authDomain: "traintime-c583a.firebaseapp.com",
        databaseURL: "https://traintime-c583a.firebaseio.com",
        projectId: "traintime-c583a",
        storageBucket: "",
        messagingSenderId: "995503002773",
        appId: "1:995503002773:web:df8f300f5ea2f31223779c"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    var database = firebase.database();



    function currentTime() {
        var current = moment().format('HH:mm');
        $("#current-time").html(current);
        setTimeout(currentTime, 1000);
    };

    currentTime();

    $("#submit").on("click", function (event) {

        event.preventDefault();
        console.log("clicked");
        var trainName = $("#train-name").val().trim();
        var destination = $("#destination").val().trim();
        var trainTimes = $("#trainTimes").val().trim();
        var frequency = $("#frequency").val().trim();

        database
            .ref()
            .push({
                name: trainName,
                destination: destination,
                time: trainTimes,
                frequency: frequency
            });


        database
            .ref()
            .on("child_added", function (snapshot) {

                let snapshotValue = snapshot.val();
                console.log(snapshotValue);
                let { name, destination, time, frequency } = snapshotValue;
                console.log(name, destination, time, frequency);


                let nameElement = $("<td>");
                let trElement = $("<tr>");

                nameElement.text(name);
                trElement.append(nameElement);


                let desElement = $("<td>").text(destination);
                trElement.append(desElement);

                let frequencyElement = $("<td>").text(frequency);
                trElement.append(frequencyElement);


                var departureTime = snapshotValue.time;

                // Assumptions
                var tFrequency = frequency;

                console.log(departureTime);

                var firstTimeConverted = moment(departureTime, "HH:mm").subtract(1, "years");
                console.log(firstTimeConverted);

                var currentTime = moment();
                console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

                var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
                console.log("DIFFERENCE IN TIME: " + diffTime);

                // Time apart (remainder)
                var tRemainder = diffTime % tFrequency;
                console.log(tRemainder);



                // Minute Until Train
                var tMinutesTillTrain = tFrequency - tRemainder;
                console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

                // Next Train
                var nextTrain = moment().add(tMinutesTillTrain, "minutes");
                console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

                let nextArivalBro =  $("<td>").text( moment(nextTrain).format("hh:mm"));
                trElement.append(nextArivalBro);


                let minsTillParty = $("<td>").text(tMinutesTillTrain);
                trElement.append(minsTillParty);
                
                $("#Train-info").append(trElement);






            });
    });

});
