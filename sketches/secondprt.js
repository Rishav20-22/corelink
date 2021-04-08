function() {

   
    this.label = 'first_part';
    this.x_bot = 100;
    this.y_bot = 300;
    this.x_top = 400;
    this.y_top = 450;
   
    var mssg_x = "0" ;
    var mssg_y = "0" ;
    var x_ratio = 0  ;
    var y_ratio = 0  ;
    var client = new Paho.MQTT.Client("192.168.1.5", 1884, "clientid");
  

    client.onMessageArrived = onMessageArrived;
   
    this.onSwipe[2] = ["Connect to the network", function() {
        try{
        client.connect({
            onSuccess: onConnect
        })
       
    }
    catch(e)
    {
        console.log(e);
    }
    }];
  

    function onConnect() {

        console.log("Connected");
        client.subscribe('tag/x');
        client.subscribe('tag/y');
    }
    
    function onMessageArrived(message) {
       
        if(message.destinationName == "tag/x")
        {
            mssg_x = message.payloadString
        }
        if(message.destinationName == "tag/y")
        {
            mssg_y = message.payloadString
        }
      }

    this.render = function() {
       
     
        x_ratio = (parseInt(mssg_x)-this.x_bot)/(this.x_top-this.x_bot);
        y_ratio = ((parseInt(mssg_y))-this.y_bot)/(this.y_top-this.y_bot);
        mLine([x_ratio*2,y_ratio],[x_ratio*2+0.3,(y_ratio)+0.3])
        mDrawRect([x_ratio*2,y_ratio],[x_ratio*2+0.3,(y_ratio)+0.3])
        mDrawRect([0,0],[2,1])
        textHeight(this.mScale(0.1));
        mText("Hospital",[0.9,0.9])
        mDrawRoundRect([0.75,0.75],[1.5,1],0.1)
        mLine([0,0.5],[2,0.5])
        
        mFillRect([0.25,0.225+0.075],[0.5,0.425-0.075])
        mFillRect([0.75,0.225+0.075],[1.0,0.425-0.075])
        mFillRect([1.25,0.225+0.075],[1.5,0.425-0.075])
        mFillRect([1.75,0.225+0.075],[1.95,0.425-0.075])
        mLine([0,0.15],[2,0.15])
        //mStickFigure([1,0.65,2],0.01,false)
        //mStickFigure([1.2,0.65,2],0.01,true)

    }
}