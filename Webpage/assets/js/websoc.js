// Called after form input is processed
$(document).ready(function () {
  startConnect();
  var auto = 0;

  set_data(auto);

  function startConnect() {
    // Generate a random client ID
    clientID = "clientID-" + parseInt(Math.random() * 100);

    // Fetch the hostname/IP address and port number from the form
    host = "test.mosquitto.org";
    port = "8081";

    // Print output for the user in the messages div

    // Initialize new Paho client connection
    client = new Paho.MQTT.Client(host, Number(port), clientID);

    // Set callback handlers
    client.onConnectionLost = onConnectionLost;
    client.onMessageArrived = onMessageArrived;

    // Connect the client, if successful, call onConnect function
    console.log("Connecting...");
    client.connect({
      onSuccess: onConnect,
      useSSL: true,
    });
  }

  // Called when the client connects
  function onConnect() {
    // Fetch the MQTT topic from the form
    topic = "tharukalakshan3";
    console.log("Connected");
    // Print output for the user in the messages div

    // Subscribe to the requested topic
    client.subscribe(topic);
  }

  // Called when the client loses its connection
  function onConnectionLost(responseObject) {
    console.log("onConnectionLost: Connection Lost");
    if (responseObject.errorCode !== 0) {
      console.log("onConnectionLost: " + responseObject.errorMessage);
    }
  }

  // Called when a message arrives
  function onMessageArrived(message) {
    console.log("onMessageArrived: " + message.payloadString);
    console.log("Message Arrived");
    msg = parseInt(message.payloadString);
    set_data(msg);
  }

  // Called when the disconnection button is pressed
  function startDisconnect() {
    client.disconnect();
    document.getElementById("messages").innerHTML +=
      "<span>Disconnected</span><br/>";
    updateScroll(); // Scroll to bottom of window
  }

  // Updates #messages div to auto-scroll
  $("#autoon").click(function () {
    auto = "1";
    publish(auto);
  });
  $("#autooff").click(function () {
    auto = "0";
    publish(auto);
  });

  function publish(data) {
    var message = new Paho.MQTT.Message(String(data));
    message.destinationName = "tharukalakshan4";
    message.qos = 0;
    client.send(message);
  }

  function set_data(data) {
    var auto = parseInt(data);
    ///////////////////////////////////////////////
    if (auto == 1) {
      $(".auto_stat").css({ color: "#48e89b" }).html("Auto");
    } else {
      $(".auto_stat").css({ color: "red" }).html("Manual");
    }
  }
});
