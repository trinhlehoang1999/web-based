import React, { Component } from "react";
import Alert  from "react-bootstrap/Alert";
import Config from "../scripts/config";

class Connection extends Component{
    state = { connnected: false, ros: null };

    constructor(){
        super();
        this.init_connection();
    }

    init_connection() {
        this.state.ros = new window.ROSLIB.Ros();
        console.log(this.state.ros); 

        this.state.ros.on("connection", () => {
            console.log("connection established!");
            this.setState({ connnected: true });
        });

        this.state.ros.on("close", () => {
            console.log("connection is closed!");
            this.setState({ connnected: false });
            // try to connect every3 seconds
            setTimeout(() => {
                try {
                    this.state.ros.connect(
                        "ws://"+ 
                        Config.ROSBRIDGE_SERVER_IP+ 
                        ":" +
                        Config.ROSBRIDGE_SERVER_PORT+
                        "");
            
                    } catch (error) {
                        console.log("connection problem ");
                    }


            }, Config.RECONNECTION_TIMER);
        });
        try {
        this.state.ros.connect(
            "ws://"+ 
        Config.ROSBRIDGE_SERVER_IP+ 
        ":" +
        Config.ROSBRIDGE_SERVER_PORT+
        "");

        } catch (error) {
            console.log("ws://"+ 
            Config.ROSBRIDGE_SERVER_IP+ 
            ":" +
            Config.ROSBRIDGE_SERVER_PORT+
            "")
            console.log("connection problem ");
        }

        
    }
    render() {
        return (<div>
            <Alert className="text-center m-3" variant={this.state.connnected? "success" : "danger"}>
                {this.state.connnected? "Robot connected":"Robot disconnected"}
            </Alert>

        </div>
        );
    }

}

export default Connection;