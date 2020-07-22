# Homehub <img alt="Website" src="https://img.shields.io/website?down_color=red&down_message=Offline&label=homehub.projects.com.lk&up_message=Online&url=https://homehub.projects.com.lk"> <img alt="GitHub release (latest by date including pre-releases)" src="https://img.shields.io/github/v/release/tharukamannapperuma/homehub?include_prereleases"> <img alt="GitHub All Releases" src="https://img.shields.io/github/downloads/tharukamannapperuma/homehub/total?color=green"> <img alt="GitHub" src="https://img.shields.io/github/license/tharukamannapperuma/homehub">
## Smart Home Application with ESP8266

### Introduction
  
  This is a small implementation of a smart home application with ESP8266 (NodeMCU). Arduino IDE is used for programming and VSCode used for Web page development.  For communication MQTT protocol was used. JSON is the main data type used to send data between MQTT server and NodeMCU since JSON is a very versatile data format. As an interface web page was designed using HTML and JavaScript. Paho MQTT client is used in both NodeMCU and Web page. Since this is a prototype, user authentication was not considered. Hosted web page can be found in https://homehub.projects.com.lk.<br> Website is hosted with in a private server
  <p align="center">
  <img width="600" height="300" src="https://drive.google.com/uc?export=view&id=1uO93WY-KICRMWEp0Y-bqNJMQTnH6iOR7">
</p>


### Features of the system
1. Temperature monitoring
2. Humidity monitoring
3.	LPG/Smoke level monitoring
4.	Water level of water tank
5.	Controlling water pump
6.	Controlling Door
7.	Controlling Light, Fan
8.	Setting water pump to turn on/off at certain water levels

### Components used
- NodeMCU as the main microcontroller
- DHT11 Digital Temperature and Humidity Sensor
- MQ-4 Sensor for LPG level and Smoke level
- 1 HC-SR04 Ultrasonic Sensor
- 4 Relay Modules
- 1 Small Servo Motor
- Wires
- Vero Board

### Javascript Code Walkthrough
websocket.js file is discussed here. This file is the backbone since this handles all the communications with MQTT and siplaying all in the webpage
```js
  function startConnect() {
    // Generate a random client ID
    clientID = "clientID-" + parseInt(Math.random() * 100);

    // Fetch the hostname/IP address and port number from the form
    host = "test.mosquitto.org";
    port = "8081";

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
```
This function starts the connection to the MQTT server. In here public MQTT server was used for testing purposes. It connects to the port 8081 which is the websocket port and 8081 uses TLS encryption to connect over a secure connection. On successfull connection below function is called. Comments are used to describe the code more.

```js
  // Called when the client connects
  function onConnect() {
    // Fetch the MQTT topic from the form
    topic = "supunpramudhitha1";
    console.log("Connected");
    // Subscribe to the requested topic
    client.subscribe(topic);
  }
```
This above onConnect function subscribes to the given topic in the function and it will check for message arrivals. 

```js
  // Called when a message arrives
  function onMessageArrived(message) {
    console.log("onMessageArrived: " + message.payloadString);
    console.log("Message Arrived");
    msg = JSON.parse(message.payloadString);
    set_data(msg);
  }
```
This above onMessageArrived function is called when a message is recieved by the topic and is will parse the coming data to a JSON type. Then it will cann the set_data function which displays the data on the web page.

```js
 function publish(data) {
    var pub_msg = JSON.parse(JSON.stringify(data));
    var message = new Paho.MQTT.Message(JSON.stringify(pub_msg));
    message.destinationName = "supunpramudhitha2";
    message.qos = 0;
    client.send(message);
  }
```
This publish function publishes user inputs from the webpage to the MQTT server for the given topic which NodeMCU can grab. First it will parse the strings to a JSON format and then it will convert that to a string before publishing.

This is the basic idea of the system when it comes to the web application side. 
more information can be found refering http://www.steves-internet-guide.com/mqtt-websockets/ this wbpage. I used online resources like this for this project
