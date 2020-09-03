void relay(){
  if(motor == 1 && pump_auto == 0){
    digitalWrite(Re1,LOW);
  }
  else if(motor == 0 && pump_auto == 0){
    digitalWrite(Re1,HIGH);
  }

  if(fan == 1){
    digitalWrite(Re2,LOW);
  }
  else if(fan == 0){
    digitalWrite(Re2,HIGH);
  }

  if(light == 1){
    digitalWrite(Re3,LOW);
  }
  else if(light == 0){
    digitalWrite(Re3,HIGH);
  }
}

void water_auto(){
  if(pump_auto == 1 && level > 70){
    digitalWrite(Re1,LOW);
  }
  else if(pump_auto == 1 && level < 35){
    digitalWrite(Re1,HIGH);
  }
}

void waterLevel(){
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);

  // Sets the trigPin on HIGH state for 10 micro seconds
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);

// Reads the echoPin, returns the sound wave travel time in microseconds
  duration = pulseIn(echoPin, HIGH);

// Calculating the distance
  distance= duration*0.034/2;
// Prints the distance on the Serial Monitor
  Serial.print("Distance: ");
  Serial.println(distance);
  
  level = (distance / maxDistance)*100;
  

  Serial.print("Level: ");
  Serial.println(level);
}

void doorStat(){
  if(door == 1 && door_stat == 0){
      servo.write(180);
    door_stat = 1;
    Serial.println("Door Opened");
    delay(2000);
  }
  else if (door == 0 && door_stat == 1){
      servo.write(90);
    door_stat = 0;
    Serial.println("Door Closed");
    delay(2000);
  }
}
