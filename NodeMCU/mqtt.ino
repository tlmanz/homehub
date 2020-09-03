void reconnect() {
  // Loop until we're reconnected
  while (!client.connected()) {
    
    digitalWrite(Re1,HIGH);
    digitalWrite(Re2,HIGH);
    digitalWrite(Re3,HIGH);
    
    Serial.print("Attempting MQTT connection...");
    String clientId = "ESP8266Client-";
    clientId += String(random(0xffff), HEX);
    if (client.connect(clientId.c_str())) {
      Serial.println("connected");
      client.subscribe("tharukalakshan2");
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      // Wait 5 seconds before retrying
      delay(5000);
    }
  }
}


void callback(char* topic, byte* payload, unsigned int length) {
  Serial.print("Message arrived....");
  if (strcmp(topic,"tharukalakshan2")==0){
    for (int i = 0; i < length; i++) {
    inmsg[i] = (char)payload[i];
  }
  
  const size_t capacity = JSON_OBJECT_SIZE(8) + 70;
  DynamicJsonDocument doc(capacity);
  deserializeJson(doc, inmsg);
  
  motor = (int)doc["motor"];
  door = (int)doc["door"];
  light = (int)doc["light"];
  fan = (int)doc["fan"];
  pump_auto = (int)doc["pump_auto"];
  }
  
  
  delay(100);
}
