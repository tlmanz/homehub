
#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>
#include <DHT.h>
#include <Servo.h>


#define DHTTYPE DHT11
#define DHTPIN 5

DHT dht(DHTPIN, DHTTYPE, 11);
// Update these with values suitable for your network.

const char* ssid = "";
const char* password = "";
const char* mqtt_server = "test.mosquitto.org";

WiFiClient espClient;
PubSubClient client(espClient);
char msg[50];
char data[80];
char inmsg[60];

int value = 0;
int motor = 0;
int old_motor = 1;
int door = 0;
int old_door = 1;
int light = 0;
int old_light = 1;
int fan = 0;
int old_fan = 1;

long old_lpg = 10;
long old_smoke = 10;
long LPG = 0;
long Smoke = 0;

int Re1 = 14;
int Re2 = 12;
int Re3 = 13;

float humidity, old_hume = 0.0; 
float temp, old_temp = 0.0;

// defines pins numbers
const int trigPin = 4;  //D5
const int echoPin = 0;  //D6

int maxDistance = 11;
int minDistance = 4;
int level,old_level = 0;

// defines variables
long duration;
float distance;

long lastMsg = 0;
int door_stat = 0;

Servo servo;

//Gas Sensor

const int MQ_PIN=A0;
int RL_VALUE=5;                                    
float RO_CLEAN_AIR_FACTOR=9.83;

int CALIBARAION_SAMPLE_TIMES=50;
int CALIBRATION_SAMPLE_INTERVAL=500;
int READ_SAMPLE_INTERVAL=50;
int READ_SAMPLE_TIMES=5;

int caliberated = 0;


#define         GAS_LPG             0   
#define         GAS_SMOKE           2   

float           LPGCurve[3]  =  {2.3,0.21,-0.47};
float           SmokeCurve[3] ={2.3,0.53,-0.44};                                                
float           Ro           =  10;               


int pump_auto = 0;
int old_pump_auto = 0;


void setup() {

  servo.attach(15);  //D8
  pinMode(trigPin, OUTPUT); // Sets the trigPin as an Output
  pinMode(echoPin, INPUT); // Sets the echoPin as an Input
  
  pinMode(BUILTIN_LED, OUTPUT);     // Initialize the BUILTIN_LED pin as an output
  Serial.begin(115200);

  Serial.print("Warming up..");
//  for(int t = 0 ; t <=20 ; t++){
//    digitalWrite(LED_BUILTIN,HIGH);
//    delay(100);
//    digitalWrite(LED_BUILTIN,LOW);
//    delay(50);
//    digitalWrite(LED_BUILTIN,HIGH);
//    delay(100);
//    digitalWrite(LED_BUILTIN,LOW);
//    delay(750);
//    
//  }
  Serial.println("Calibrating .. .. .. ");
  Ro = MQCalibration(MQ_PIN);
  
  setup_wifi();
  client.setServer(mqtt_server, 1883);
  client.setCallback(callback);

  dht.begin();

  humidity = dht.readHumidity();
  temp = dht.readTemperature();

  servo.write(90);
  
  delay(1000);
  pinMode(A0,INPUT);

  pinMode(Re1,OUTPUT);
  pinMode(Re2,OUTPUT);
  pinMode(Re3,OUTPUT);

  digitalWrite(Re1,HIGH);
  digitalWrite(Re2,HIGH);
  digitalWrite(Re3,HIGH);
  
}

void loop() {

  LPG = MQGetGasPercentage(MQRead(MQ_PIN)/Ro,GAS_LPG);
  Smoke = MQGetGasPercentage(MQRead(MQ_PIN)/Ro,GAS_SMOKE);


  long now = millis();  
  
  if (now - lastMsg > 2000){
    Serial.println("Checking Water Level");
    waterLevel();
    lastMsg = now;
  }

  water_auto();
  
  humidity = dht.readHumidity();          // Read humidity (percent)
  temp = dht.readTemperature();     // 
  
  if (!client.connected()) {
    
    digitalWrite(Re1,HIGH);
    digitalWrite(Re2,HIGH);
    digitalWrite(Re3,HIGH);
    
    reconnect();
  }
  relay();
  doorStat();
  client.loop();
  if (pump_auto != old_pump_auto || LPG != old_lpg || Smoke != old_lpg || old_level != level || humidity != old_hume || temp != old_temp || old_motor != motor || old_door != door || old_fan != fan || old_light != light){
    oldVal();
    StaticJsonDocument<200> doc;
    doc["temp"] = temp;
    doc["hue"] = humidity;
    doc["gas"] = LPG;
    doc["smoke"] = Smoke;
    doc["level"] = level;
    doc["motor"] = (char)motor;
    doc["door"] = (char)door;
    doc["light"] = (char)light;
    doc["fan"] = (char)fan;
    doc["pump_auto"] = (char)pump_auto;
    String JSONmsg;
    serializeJson(doc,JSONmsg);
    client.publish("tharukalakshan1", (char*) JSONmsg.c_str());
    printing();
  }
  delay(50);
}
