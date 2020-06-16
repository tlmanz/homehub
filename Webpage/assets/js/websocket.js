// Called after form input is processed
$(document).ready(function () {
  startConnect();
  var msg = JSON.parse(
    '{"temp":"34.2","hue":"10.1","gas":"10","level":"50","motor":"0","door":"0","light":"0","fan":"0","smoke":"100","pump_auto":"0"}'
  );

  set_data(msg);
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
    topic = "supunpramudhitha1";
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
    msg = JSON.parse(message.payloadString);
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
  function updateScroll() {
    var element = document.getElementById("messages");
    element.scrollTop = element.scrollHeight;
  }

  $("#pumpon").click(function () {
    msg.motor = "1";
    publish(msg);
  });
  $("#pumpoff").click(function () {
    msg.motor = "0";
    publish(msg);
  });

  $("#dooropen").click(function () {
    msg.door = "1";
    publish(msg);
  });
  $("#doorclose").click(function () {
    msg.door = "0";
    publish(msg);
  });

  $("#lighton").click(function () {
    msg.light = "1";
    publish(msg);
  });
  $("#lightoff").click(function () {
    msg.light = "0";
    publish(msg);
  });

  $("#fanon").click(function () {
    msg.fan = "1";
    publish(msg);
  });
  $("#fanoff").click(function () {
    msg.fan = "0";
    publish(msg);
  });

  $("#autoon").click(function () {
    msg.pump_auto = "1";
    publish(msg);
  });
  $("#autooff").click(function () {
    msg.pump_auto = "0";
    publish(msg);
  });

  function publish(data) {
    var pub_msg = JSON.parse(JSON.stringify(data));
    var message = new Paho.MQTT.Message(JSON.stringify(pub_msg));
    message.destinationName = "supunpramudhitha2";
    message.qos = 0;
    client.send(message);
  }

  function set_data(data) {
    //////////////////////////////////////////////Level
    var level = parseFloat(data.level);
    //////////////////////////////////////////////pump
    var pump = parseInt(data.motor);
    /////////////////////////////////////////////////Temp
    var temp = parseFloat(data.temp);
    //////////////////////////////////////////////Hue
    var hue = parseFloat(data.hue);
    ///////////////////////////////////////////////Gas
    var gas = parseInt(data.gas);
    //////////////////////////////////////////////Door
    var door = parseInt(data.door);
    //////////////////////////////////////////////Light
    var light = parseInt(data.light);
    ///////////////////////////////////////////////Fan
    var fan = parseInt(data.fan);
    ///////////////////////////////////////////////Smoke
    var smoke = parseInt(data.smoke);
    var auto = parseInt(data.pump_auto);
    ///////////////////////////////////////////////
    if (level > 100) {
      tank_data = { width: 180, height: 140, color: "skyblue", level: 0 };
    } else {
      tank_data = {
        width: 180,
        height: 140,
        color: "skyblue",
        level: 100 - level,
      };
    }

    if (auto == 1) {
      $(".auto_stat").css({ color: "#48e89b" }).html("Auto");
    } else {
      $(".auto_stat").css({ color: "red" }).html("Manual");
    }

    if (temp > 32) {
      $("#temp-icon").removeClass();
      $("#temp-icon").addClass("fad fa-temperature-hot fa-5x");
      $("#temp-icon").css("--fa-primary-color", "orange");
      $(".Temperature").css({ color: "orange" });
    } else if (temp > 20) {
      $("#temp-icon").removeClass();
      $("#temp-icon").addClass("fad fa-thermometer-half fa-5x");
      $("#temp-icon").css("--fa-primary-color", "gold");
      $(".Temperature").css({ color: "gold" });
    } else {
      $("#temp-icon").removeClass();
      $("#temp-icon").addClass("fad fa-temperature-frigid fa-5x");
      $("#temp-icon").css("--fa-primary-color", "aqua");
      $(".Temperature").css({ color: "aqua" });
    }

    if (hue > 30 && hue < 50) {
      $("#humid-icon").removeClass();
      $("#humid-icon").addClass("fad fa-humidity fa-5x");
      $("#humid-icon").css("--fa-secondary-color", "#00FA9A");
      $(".Humidity").css({ color: "#00FA9A" });
    } else if (hue > 50 && hue < 60) {
      $("#humid-icon").removeClass();
      $("#humid-icon").addClass("fad fa-humidity fa-5x");
      $("#humid-icon").css("--fa-secondary-color", "#befc03");
      $(".Humidity").css({ color: "#befc03" });
    } else if (hue > 60) {
      $("#humid-icon").removeClass();
      $("#humid-icon").addClass("fad fa-humidity fa-5x");
      $("#humid-icon").css("--fa-secondary-color", "#03a5fc");
      $(".Humidity").css({ color: "#03a5fc" });
    } else {
      $("#humid-icon").removeClass();
      $("#humid-icon").addClass("fad fa-humidity fa-5x");
      $("#humid-icon").css("--fa-secondary-color", "#fc0352");
      $(".Humidity").css({ color: "#fc0352" });
    }

    if (gas == 1) {
      $(".Gas").css({ color: "#FC6400" }).html("High");
    } else {
      $(".Gas").css({ color: "#42f5a1" }).html("Normal");
    }

    if (smoke == 1) {
      $(".Smoke").css({ color: "#FC6400" }).html("High");
    } else {
      $(".Smoke").css({ color: "#42f5a1" }).html("Normal");
    }

    if (pump == 1) {
      $("#pump-icon").removeClass();
      $("#pump-icon").addClass("fad fa-faucet-drip fa-5x");
      $("#pump-icon").css({
        "--fa-secondary-opacity": "1.0",
        "--fa-primary-color": "#03a5fc",
      });
      $(".pump_stat").css({ color: "#03a5fc" }).html("ON");
    } else {
      $("#pump-icon").removeClass();
      $("#pump-icon").addClass("fad fa-faucet fa-5x");
      $("#pump-icon").css({
        "--fa-secondary-opacity": "1.0",
        "--fa-primary-color": "red",
      });
      $(".pump_stat").css({ color: "red" }).html("OFF");
    }

    if (door == 1) {
      $("#door-icon").removeClass();
      $("#door-icon").addClass("fad fa-door-open fa-5x");
      $("#door-icon").css({
        "--fa-secondary-opacity": "1.0",
        "--fa-primary-color": "#50a5bf",
        "--fa-secondary-color": "#94593b",
      });
      $(".door_stat").css({ color: "#48e89b" }).html("Open");
    } else {
      $("#door-icon").removeClass();
      $("#door-icon").addClass("fad fa-door-closed fa-5x");
      $("#door-icon").css({
        "--fa-secondary-opacity": "1.0",
        "--fa-primary-color": "#50a5bf",
        "--fa-secondary-color": "#94593b",
      });
      $(".door_stat").css({ color: "red" }).html("Close");
    }

    if (light == 1) {
      $("#light-icon").removeClass();
      $("#light-icon").addClass("fad fa-lightbulb-on fa-5x");
      $("#light-icon").css({
        "--fa-secondary-opacity": "1.0",
        "--fa-primary-color": "gold",
        "--fa-secondary-color": "#707070",
      });
      $(".light_stat").css({ color: "#48e89b" }).html("On!");
    } else {
      $("#light-icon").removeClass();
      $("#light-icon").addClass("fad fa-lightbulb fa-5x");
      $("#light-icon").css({
        "--fa-secondary-opacity": "1.0",
        "--fa-primary-color": "gold",
        "--fa-secondary-color": "#707070",
      });
      $(".light_stat").css({ color: "red" }).html("Off!");
    }

    if (fan == 1) {
      $("#fan-icon").removeClass();
      $("#fan-icon").addClass("fad fa-lightbulb-on fa-5x");
      $("#fan-icon").css({
        "--fa-secondary-opacity": "1.0",
        "--fa-primary-color": "gold",
        "--fa-secondary-color": "#707070",
      });
      $(".fan_stat").css({ color: "#48e89b" }).html("On!");
    } else {
      $("#fan-icon").removeClass();
      $("#fan-icon").addClass("fad fa-lightbulb fa-5x");
      $("#fan-icon").css({
        "--fa-secondary-opacity": "1.0",
        "--fa-primary-color": "gold",
        "--fa-secondary-color": "#707070",
      });
      $(".fan_stat").css({ color: "red" }).html("Off!");
    }

    $(".Temperature").html(temp + " &#8451;");
    $(".Humidity").html(hue + " %");

    $(".waterTankHere1").waterTank(tank_data);
  }
});
