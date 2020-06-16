# homehub
## Smart Home Application with ESP8266

### Introduction
  
  This is a small implementation of a smart home application with ESP8266 (NodeMCU) and for communication MQTT protocol was used. JSON is the main data type used to send data between MQTT server and NodeMCU since JSON is a very versatile data format. As an interface web page was designed using HTML and JavaScript. Paho MQTT client is used in both NodeMCU and Web page. Since this is a prototype, user authentication was not considered. Hosted web page can be found in http://homehub.ml 

### Features of the system
- Temperature monitoring
- Humidity monitoring
-	LPG/Smoke level monitoring
-	Water level of water tank
-	Controlling water pump
-	Controlling Door
-	Controlling Light, Fan
-	Setting water pump to turn on/off at certain water levels
