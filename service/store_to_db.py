#!/usr/bin/env python3
import ast
from datetime import datetime
import json
import time

import paho.mqtt.client as mqtt
import MySQLdb


MQTT_BROKER_ADDR = '172.29.156.52'
MQTT_BROKER_PORT = 1883
MAIN_TOPIC = 'leaf_eye/#'
HOST = "localhost"
USER = "leaf_eye"
PASSWD = "leaf_eye"
DB = "leaf_eye"


def onConnect(mqtt_sub, user_data, flags, response_code):
    mqtt_sub.subscribe(MAIN_TOPIC, qos=1)


def onMessage(mqtt_sub, user_data, msg):
    payload_dit  = ast.literal_eval(msg.payload.decode('utf-8'))
    timestamp = payload_dit['timestamp']
    leaf_id = payload_dit['leaf_id']
    data_dit = payload_dit['data']
    temperature = data_dit['temperature']
    humidity = data_dit['humidity']
    pressure = data_dit['pressure']
    
    query = "insert into data (timestamp, leaf_id, temperature, humidity, pressure) values (%s, %s, %s, %s, %s)"
    ret = cur.execute(query, (timestamp, leaf_id, temperature, humidity, pressure))

    while not ret == 1:
        ret = cur.execute(query, (timestamp, leaf_id, temperature, humidity, pressure))
        time.sleep(0.001)

    db.commit()


mqtt_sub = mqtt.Client(protocol=mqtt.MQTTv31)
mqtt_sub.on_connect = onConnect
mqtt_sub.on_message = onMessage
mqtt_sub.connect(host=MQTT_BROKER_ADDR, port=MQTT_BROKER_PORT, keepalive=10)

db = MySQLdb.connect(host=HOST, user=USER, passwd=PASSWD, db=DB)
cur = db.cursor()

try:
    mqtt_sub.loop_forever()

except KeyboardInterrupt:
    mqtt_sub.disconnect()
    cur.close()
    db.close()
    exit(0)

