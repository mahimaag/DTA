import React, {Component} from 'react';
import {Form} from 'react-bootstrap';

export default class TsmsForm extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Form bsClass={this.props.formClassName}>
                {this.props.children}
            </Form>
        )
    }
}
