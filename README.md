# Homehub <img alt="GitHub issues" src="https://img.shields.io/github/issues/tharukamannapperuma/homehub?color=red"> <img alt="GitHub closed issues" src="https://img.shields.io/github/issues-closed/tharukamannapperuma/homehub"> <img alt="GitHub All Releases" src="https://img.shields.io/github/downloads/tharukamannapperuma/homehub/total?color=green"> <img alt="GitHub" src="https://img.shields.io/github/license/tharukamannapperuma/homehub"> <img alt="GitHub watchers" src="https://img.shields.io/github/watchers/tharukamannapperuma/homehub?style=social">
## Smart Home Application with ESP8266

### Introduction
  
  This is a small implementation of a smart home application with ESP8266 (NodeMCU). Arduino IDE is used for programming and VSCode used for Web page development.  For communication MQTT protocol was used. JSON is the main data type used to send data between MQTT server and NodeMCU since JSON is a very versatile data format. As an interface web page was designed using HTML and JavaScript. Paho MQTT client is used in both NodeMCU and Web page. Since this is a prototype, user authentication was not considered. Hosted web page can be found in http://homehub.ml. Website is hosted with 000webhost free service
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
