import paho.mqtt.client as mqtt
import random
import time

client = mqtt.Client( protocol=mqtt.MQTTv311,transport="websockets")
client.connect("192.168.1.4", 1884, 60)


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
            y = random.randint(30,50)
            
            o = random.randint(0,1)
            if o == 0:
                send="MoveTank "+str(y)+" "+str(-y)
            else:
                send="MoveTank "+str(-y)+" "+str(y)

            client.publish("tag/networktest", send)
            
            time.sleep(0.8)
            
            client.publish("tag/networktest", "MoveTank 0 0")
            time.sleep(0.8)
    elif x=="cough":
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
    elif x=="wheezing":
        client.publish("tag/networktest","asthma")
    elif x=="impaired":
        turn_left((60/20)*0.15)
        y = 1
        client.publish("tag/networktest","MoveTank 50 50")
        time.sleep(y)
        client.publish("tag/networktest", "MoveTank 0 0")
        turn_right((40/20)*0.15)
        y = 1
        client.publish("tag/networktest","MoveTank -50 -50")
        time.sleep(y)
        client.publish("tag/networktest", "MoveTank 0 0")
        turn_right((20/20)*0.15)
    elif x=="heartrate":
        y = input()
        client.publish("tag/heartb",y)
    elif x=="body_temp":
        y = input()
        client("tag/temp",y)
    elif x=="Epilepsy":
        for i in range(0,4):
            client.publish("tag/networktest","MoveTank 90 -90")
            time.sleep(0.1)
            client.publish("tag/networktest","MoveTank -90 90")
            time.sleep(0.1)
    elif x=="stroke":
        for i in range(0,4):
            client.publish("tag/networktest","MoveTank 50 3")
            time.sleep(0.8)
            client.publish("tag/networktest","MoveTank -50 3")
            time.sleep(0.8)
    elif x=="floor":
        y = input()
        client.publish("tag/floor",y)
    elif x=="pneumonia":
        y = random.randint(30,70)
        client.publish("tag/lung",y)
        client.publish("tag/networktest","cough")
    elif x=="tts":
        y = input()
        client.publish("tag/networktest","tts:"+y)
    
    else:
        client.publish("tag/networktest",x)
