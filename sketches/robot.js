function() {
    this.label = 'robot';
    var client = new Paho.MQTT.Client("192.168.0.160", 11883, "clientid")
    this.isExcited = false;
    this.isBored = false;
    this.isDelay = false;
    this.str = ""
    var message = new Paho.MQTT.Message(this.str);
    message.destinationName = "tag/networktest"
    client.connect({
        onSuccess: onConnect
    })
    this.onSwipe[2] = ["Excited", function() {
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
    this.onSwipe[6] = ["Bored", function() {
        //Left  
        this.isBored != this.isBored
        this.color = "green"

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