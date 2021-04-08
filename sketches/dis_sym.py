import paho.mqtt.client as mqtt
import random
import time

client = mqtt.Client( protocol=mqtt.MQTTv311,transport="websockets")
client.connect("192.168.1.5", 1884, 60)
def turn_left(x):
    client.publish("tag/networktest","MoveTank -50 50")
    time.sleep(x)
    client.publish("tag/networktest", "MoveTank 0 0")

def turn_right(x):
    client.publish("tag/networktest","MoveTank 50 -50")
    time.sleep(x)
    client.publish("tag/networktest", "MoveTank 0 0")
while True:
    x = input()
    send = ""
    if x=="exit":
        exit()
    elif x=="ADHD":
        for i in range(0,10):
            y = random.randint(10,50)
            
            o = random.randint(0,1)
            if o == 0:
                send="MoveTank "+str(y)+" "+str(-y)
            else:
                send="MoveTank "+str(-y)+" "+str(y)

            client.publish("tag/networktest", send)
            
            time.sleep(0.8)
            
            client.publish("tag/networktest", "MoveTank 0 0")
            time.sleep(0.8)
    elif x=="cold":
        client.publish("tag/networktest","cough")
    elif x=="right":
        y = int(input())
        turn_right((y/20)*0.15)
    elif x=="left":
        y = int(input())
        turn_left((y/20)*0.15)
    elif x=="forward":
        y = int(input())
        client.publish("tag/networktest","MoveTank 50 50")
        time.sleep(y)
        client.publish("tag/networktest", "MoveTank 0 0")
    elif x=="backward":
        y = int(input())
        client.publish("tag/networktest","MoveTank -50 -50")
        time.sleep(y)
        client.publish("tag/networktest", "MoveTank 0 0")
    elif x=="asthma":
        client.publish("tag/networktest","asthma")
    elif x=="impaired motion"
    else:
        client.publish("tag/networktest",x)


    
        


