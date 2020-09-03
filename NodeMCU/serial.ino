void printing(){
  Serial.println(msg);
  Serial.print("Motor: ");
  Serial.print(motor);
  Serial.print(" Door: ");
  Serial.print(door);
  Serial.print(" Light: ");
  Serial.print(light);
  Serial.print(" Fan: ");
  Serial.print(fan);
  Serial.print(" Pump Auto: ");
  Serial.print(pump_auto);
  Serial.print(" Door Stat: ");
  Serial.println(door_stat);
}
