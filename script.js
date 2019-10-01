$(document).ready(function () {

    console.log("hi")
    
  // Your web app's Firebase configuration
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


//var database = firebase.database();

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
                
                // Create td element <td></td>
                let tableData1 = $("<td>");
                // Create tr element <tr></tr>
                let trElement = $("<tr>");
                // Insert text (name) into td <td>basem</td>
                tableData1.text(name);
                // Append td to tr 
                trElement.append(tableData1);
                // Append tr to tbody with id Train-info
                $("#Train-info").append(trElement);

                
              

            });

    });

});
