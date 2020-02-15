#!/usr/bin/env python3
import ast
from datetime import datetime
import json
import serial
import time
import threading
import os

from xbee import ZigBee
import paho.mqtt.client as mqtt


PORT = '/dev/ttyUSB0'
BAND_RATE = 9600
MQTT_BROKER_ADDR = '172.29.156.52'
MQTT_BROKER_PORT = 1883
MAIN_TOPIC = 'leaf_eye/'


def handle_xbee(xbee_packet):
    timestamp_datetime = datetime.now()
    timestamp = timestamp_datetime.strftime("%Y-%m-%dT%H:%M:%S")

    try:
        payload_dit = dict()
        payload_dit = ast.literal_eval((xbee_packet['rf_data']).decode('utf-8'))
        payload_dit['timestamp'] = timestamp
        sub_topic = 'leaf_id:' + str(payload_dit['leaf_id'])
        mqtt_pub.publish(MAIN_TOPIC + sub_topic, json.dumps(payload_dit), qos=1)

    except UnicodeDecodeError: 
        pass

    except ValueError:
        pass


serial_port = serial.Serial(PORT, BAND_RATE)
xbee = ZigBee(serial_port, escaped=True, callback=handle_xbee)
mqtt_pub = mqtt.Client(protocol=mqtt.MQTTv31)
mqtt_pub.connect(host=MQTT_BROKER_ADDR, port=MQTT_BROKER_PORT, keepalive=10)


try:
    while True:
        time.sleep(0.000001)

except KeyboardInterrupt:
    xbee.halt()
    serial_port.close()
    mqtt_pub.disconnect()
    exit(0)

