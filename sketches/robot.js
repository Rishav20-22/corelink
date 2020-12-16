function() {
    /*
    MQTT over websockets

    Steps for connecting the chalktalk sketch to the MQTT server
    1. Create a client object with the same IP address and port number(11883) as the MQTT server
    2. Create a message object with the "destinationname set as the same topic (tag/networktest)"
    3. While sending a message call the object and reassign message with the intended string and destinationname
    4. Do not call client to connect repeatedly(for example calling client.connect() in this.render() ) or none of the messsages will be sent. Call client.connect()
       only once while starting the sketch.

    => There must be a mqttws31.js in the lib dir and an import to that file in index.html. If you have just downloaded the sketch either 
       perform the forementioned tasks or git clone the gitlab repo.
    */
    this.label = 'robot';
    var client = new Paho.MQTT.Client("192.168.0.160", 11883, "clientid")
    this.isExcited = false;
    this.isBored = false;
    this.isDelay = false;
    this.str = "MoveTank 0 0"
    var message = new Paho.MQTT.Message(this.str);
    message.destinationName = "tag/networktest"
    client.connect({
        onSuccess: onConnect
    })
    this.onSwipe[2] = ["Turn around at a high speed", function() {
        //Right     
        this.isExcited != this.isExcited
        this.color = "red"
        try {
            this.str = "MoveTank 40 -40"
            message = new Paho.MQTT.Message(this.str);
            message.destinationName = "tag/networktest"
            onConnect()

        } catch (err) {
            console.log(err)
        }
    }];
    this.onSwipe[6] = ["Turn around slowly", function() {
        //Left  
        this.isBored != this.isBored
        this.color = "yellow"

        try {
            this.str = "MoveTank -10 10"
            message = new Paho.MQTT.Message(this.str);
            message.destinationName = "tag/networktest"
            onConnect()

        } catch (err) {
            console.log(err)
        }

    }];

    function onConnect() {

        console.log("Connected");
        client.send(message)
    }

    this.render = function() {
        mDrawOval([-1, -1], [1, 1], 32, PI / 2, PI / 2 - TAU); //drawing the facial outline

    }
}