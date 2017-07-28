/**
 * Created by saubhagya on 20/7/17.
 */
import React, { Component } from 'react'
import { Row, Col} from 'react-bootstrap'
import { TSMS_TextButton } from './../../Core/Button'

class ActivityLogHeader extends Component{
    render(){
        return(
            <Row className="show-grid">
                <Col md={2} lg={2} className="log-col">
                    <span className="log-date-day">{this.props.logDate}</span>
                    <span className="log-date-day">thu</span>
                </Col>
                <Col md={4} lg={4} lgOffset={6} className="log-col">
                    <TSMS_TextButton bClassName="log-clear-button"
                                     onClickFunc={this.props.onLogTimeClick}
                                     dispName="Log Time"/>

                    <TSMS_TextButton bClassName="log-clear-button"
                                     onClickFunc={this.props.onClearClick}
                                     dispName="Clear"/>


                </Col>
            </Row>
        );
    }
}

export default ActivityLogHeader