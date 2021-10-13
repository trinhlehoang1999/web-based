import React, { Component} from "react";
import { Container } from "react-bootstrap";


class Footer extends Component {
    state = {};
    render() {
        return (<div>
            <Container className="text-center">
        <p>NGUYEN-CUONG-UTE Lab &copy; 2021</p>
        <img src="/image/FHQ.png" width="250" height="250" alt=""/>
        </Container>

        
        </div>);
    }
}

export default Footer;