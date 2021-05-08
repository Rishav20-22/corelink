function() {


    this.label = 'secnd_part';
    this.x_bot = 90;
    this.y_bot = 300;
    this.x_top = 350;
    this.y_top = 450;
    var level = 0;
    var mssg_x = "0";
    var mssg_y = "0";
    var x_ratio = 0;
    var y_ratio = 0;
    var client = new Paho.MQTT.Client("192.168.1.4", 1884, "clientid2");
    var temp = -1;
    var heartb = -1;
    var elev_open = 0;
    client.onMessageArrived = onMessageArrived;
    var appetite = 1;
    var lung = 0;
    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }
    this.onSwipe[2] = ["Connect to the network", function() {
        try {
            client.connect({
                onSuccess: onConnect
            })

        } catch (e) {
            console.log(e);
        }
    }];


    function onConnect() {

        console.log("Connected");
        client.subscribe('tag/x');
        client.subscribe('tag/y');
        client.subscribe('tag/temp');
        client.subscribe('tag/heartb');
        client.subscribe('tag/floor');
        client.subscribe('tag/food');
        client.subscribe("tag/lung")
    }

    function onMessageArrived(message) {

        if (message.destinationName == "tag/x") {
            mssg_x = message.payloadString
        }
        if (message.destinationName == "tag/y") {
            mssg_y = message.payloadString
        }
        if (message.destinationName == "tag/temp") {
            temp = parseFloat(message.payloadString)
        }
        if (message.destinationName == "tag/bpm") {
            heartb = parseInt(message.payloadString)
        }
        if (message.destinationName == "tag/floor") {
            level = parseInt(message.payloadString)
        }
        if (message.destinationName == "tag/food"){
            appetite = parseFloat(message.payloadString)
        }
        if (message.destinationName == "tag/lung"){
            lung = parseInt(message.payloadString)
        }
    }

    this.render = function() {

       
        x_ratio = (parseInt(mssg_x) - this.x_bot) / (this.x_top - this.x_bot);
        y_ratio = ((parseInt(mssg_y)) - this.y_bot) / (this.y_top - this.y_bot);
        
        mDrawRect([x_ratio * 2, y_ratio], [x_ratio * 2 + 0.1, (y_ratio) + 0.1])
        textHeight(this.mScale(0.032));

        mText("robot",[x_ratio*2+0.01,y_ratio+0.05])
        mDrawRect([0, 0], [2, 1])
        if (level == 0) {
            textHeight(this.mScale(0.1));
            mText("Reception", [0.9 - .15, 0.9 - 0.15])

            textHeight(this.mScale(0.07));
            mText("Elevator", [1.67, 0.9])
            mDrawRoundRect([1.75, 1.1 - 0.3], [1.95, 0.82 - 0.3], 0.02)
            if(x_ratio>0.8 &&  y_ratio>0&& y_ratio<0.5)
            {
                mDrawRect([1.85-elev_open*0.005, 0.8], [1.85+elev_open*0.005, 0.52])
                elev_open+=0.1
                if (elev_open>=20)
                {
                    elev_open = 20
                }
            }
            else
            {
                mDrawRect([1.85-elev_open*0.005, 0.8], [1.85+elev_open*0.005, 0.52])
                elev_open-=0.1
                if(elev_open<=0)
              { 
              elev_open = 0
            }
                
            }
            mDrawRoundRect([0.75 - .15, 0.75 - 0.15], [1.5 - .15, 1 - 0.15], 0.1)
            mDrawRoundRect([0.25, 0.25], [0.35, 0.35], 0.02)
            mDrawRoundRect([0.25, 0.25], [0.35, 0.35], 0.02)
            mDrawRoundRect([0.65, 0.25], [0.75, 0.35], 0.02)
            mDrawRoundRect([1.05, 0.25], [1.15, 0.35], 0.02)
            mDrawRoundRect([1.45, 0.25], [1.55, 0.35], 0.02)
            mDrawRoundRect([1.65, 0.5], [1.99, 1], 0.02)
            mDrawRoundRect([0.2, 0], [0.4, 0.02], 0.02)

            mArrow([0.3, 0.1], [0.3, 0.2], 0.2)
            textHeight(this.mScale(0.07));
            mText("Entrance", [0.15, 0.1])
            mArrow([0.4, 0.3], [0.6, 0.3], 0.13)
            mArrow([0.8, 0.3], [1, 0.3], 0.13)
            mArrow([1.2, 0.3], [1.4, 0.3], 0.13)
        }
        if (level == 1) {

            textHeight(this.mScale(0.1));
            mText("First Floor", [0.02, 0.98])
            mDrawRect([0, 0.89], [0.65, 1])

            textHeight(this.mScale(0.086));
            mText("General Health", [0.9 - .26, 0.9 - 0.1])
            mText("Screening",[0.9 - .15, 0.9 - 0.19])

            textHeight(this.mScale(0.07));
            mText("Elevator", [1.67, 0.9])
            mDrawRoundRect([1.75, 1.1 - 0.3], [1.95, 0.82 - 0.3], 0.02)
            mDrawRoundRect([0.75 - .15, 0.75 - 0.15], [1.5 - .15, 1 - 0.15], 0.1)

            if (temp != -1) {
                mDrawRoundRect([0.30, 0.2], [0.5, 0.5], 0.05)
                mText((temp + getRandomInt(3) * 0.1).toFixed(1), [0.32, 0.42])
                textHeight(this.mScale(0.04))
                mText("degrees", [0.32, 0.35])
                textHeight(this.mScale(0.03))
                mText("Fahrenheit", [0.32, 0.3])
            }
            if (heartb != -1) {
                mText(heartb + getRandomInt(3), [0.32, 0.42])
                mText("BPM", [0.32, 0.3])
                mDrawRoundRect([0.30, 0.2], [0.5, 0.5], 0.05)
            }
            if (heartb == -1 && temp == -1) {
                textHeight(this.mScale(0.05))
                //mText("ADVICE", [0.32, 0.42])
                mDrawRoundRect([0.30, 0.2], [0.5, 0.5], 0.05)
            }
            mDrawRoundRect([1.65, 0.5], [1.99, 1], 0.02)
            mDrawRoundRect([0.85, 0.25], [1.25, 0.5], 0.04)
            textHeight(this.mScale(0.065))
            mText("Stand here", [0.875, 0.45])
            textHeight(this.mScale(0.05))
            mText("for Pre-Check", [0.875, 0.35])
            mLine([1.85, 0.8], [1.85, 0.52])
        }
        if (level == 2) {
            textHeight(this.mScale(0.07));
            mText("Elevator", [1.67, 0.9])
            mDrawRoundRect([1.65, 0.5], [1.99, 1], 0.02)
            mDrawRoundRect([1.75, 1.1 - 0.3], [1.95, 0.82 - 0.3], 0.02)
            if(x_ratio>0.8 &&  y_ratio>0&& y_ratio<0.5)
            {
                mDrawRect([1.85-elev_open*0.005, 0.8], [1.85+elev_open*0.005, 0.52])
                elev_open+=0.1
                if (elev_open>=20)
                {
                    elev_open = 20
                }
            }
            else
            {
                mDrawRect([1.85-elev_open*0.005, 0.8], [1.85+elev_open*0.005, 0.52])
                elev_open-=0.1
                if(elev_open<=0)
              { 
              elev_open = 0
            }
                
            }
            textHeight(this.mScale(0.1));
            mText("Second Floor", [0.02, 0.98])
            mDrawRect([0, 0.89], [0.75, 1])
            mDrawRoundRect([0.75 - .15, 0.55 - 0.15], [1.5 - .15, 1 - 0.15], 0.1)
            textHeight(this.mScale(0.12));
            mText("Pneumonia",[0.68,0.75])
            mText("/Cold",[0.8,0.6])
            mDrawRoundRect([0.75,0.1],[1.25,0.35],0.1)
            textHeight(this.mScale(0.08));
            mText("Stand here",[0.775,0.25])
            mFillDisk([1.25,0.5],0.0425)
            mLine([1.25,0.5],[1.25,0.57])
            mLine([1.225,0.59],[1.25,0.57])
            mLine([1.25,0.59],[1.25,0.57])
            if(appetite<0.2)
             {
            color("red")
            textHeight(this.mScale(0.3))
              mText("x",[1.165,0.61])
              color("white")
             }
            
            if(lung==0)
            { 
              textHeight(this.mScale(0.08))
              mText("Waiting",[0.225,0.35])
              mText("For Scan",[0.225,0.275])
            }
            mFillRect([0.25,0.45],[0.5,0.45+0.3*lung/100])
            mDrawRect([0.2,0.8],[0.55,0.4])
            mDrawRect([0.25,0.75],[0.5,0.45])
            mLine([0.375,0.7],[0.375,0.5])
            mLine([0.3,0.68],[0.45,0.68])
            mLine([0.3,0.68],[0.275,0.625])
            mLine([0.45,0.68],[0.475,0.62])
            mLine([0.3,0.625],[0.45,0.625])
            mLine([0.325,0.6],[0.425,0.6])
            mLine([0.34,0.575],[0.415,0.575])
            mLine([0.35,0.55],[0.4,0.55])
            
        }
   if(level ==3)
         {
            textHeight(this.mScale(0.1));
            mText("Third Floor", [0.02, 0.98])
            mDrawRect([0, 0.89], [0.67, 1])
            textHeight(this.mScale(0.07));
            mText("Elevator", [1.67, 0.9])
            mDrawRoundRect([1.65, 0.5], [1.99, 1], 0.02)
            mDrawRoundRect([1.75, 1.1 - 0.3], [1.95, 0.82 - 0.3], 0.02)
            mDrawRoundRect([0.75 - .15, 0.55 - 0.15], [1.5 - .15, 1 - 0.15], 0.1)
            textHeight(this.mScale(0.18));
            mText("Stroke",[0.68,0.7])
            mDrawRoundRect([0.75,0.1],[1.25,0.35],0.1)
            textHeight(this.mScale(0.08));
            mText("Stand here",[0.775,0.25]) 
            
            if(x_ratio>0.8 &&  y_ratio>0&& y_ratio<0.5)
            {
                mDrawRect([1.85-elev_open*0.005, 0.8], [1.85+elev_open*0.005, 0.52])
                elev_open+=0.1
                if (elev_open>=20)
                {
                    elev_open = 20
                }
            }
            else
            {
                mDrawRect([1.85-elev_open*0.005, 0.8], [1.85+elev_open*0.005, 0.52])
                elev_open-=0.1
                if(elev_open<=0)
              { 
              elev_open = 0
            }
                
            }
         }
    if(level == 4){
     textHeight(this.mScale(0.1));
            mText("Fourth Floor", [0.02, 0.98])
            mDrawRect([0, 0.89], [0.73, 1])
            textHeight(this.mScale(0.07));
            mText("Elevator", [1.67, 0.9])
            mDrawRoundRect([1.65, 0.5], [1.99, 1], 0.02)
            mDrawRoundRect([1.75, 1.1 - 0.3], [1.95, 0.82 - 0.3], 0.02)
            mDrawRoundRect([0.75 - .15, 0.55 - 0.15], [1.5 - .15, 1 - 0.15], 0.1)
            textHeight(this.mScale(0.12));
            mText("Epilepsy/",[0.68,0.73]);
            mText("ADHD",[.72,0.6]);
            mDrawRoundRect([0.75,0.1],[1.25,0.35],0.1)
            textHeight(this.mScale(0.08));
            mText("Stand here",[0.775,0.25]) 
            
            if(x_ratio>0.8 &&  y_ratio>0&& y_ratio<0.5)
            {
                mDrawRect([1.85-elev_open*0.005, 0.8], [1.85+elev_open*0.005, 0.52])
                elev_open+=0.1
                if (elev_open>=20)
                {
                    elev_open = 20
                }
            }
            else
            {
                mDrawRect([1.85-elev_open*0.005, 0.8], [1.85+elev_open*0.005, 0.52])
                elev_open-=0.1
                if(elev_open<=0)
              { 
              elev_open = 0
            }
                
            }
    }

    }
}