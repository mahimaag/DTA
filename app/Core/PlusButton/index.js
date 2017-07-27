import React, {Component} from 'react';

import CustomModal from './../CustomModal'
import events from './../../../utils/event'

class AddButton extends Component {
    constructor() {
        super();
        this.state = {
            show: false,
        }
    }

    close = (e) => {
        e.preventDefault();
        this.setState({show: false})
    };

    render() {
        return (
            <div className="modal-container">
                <button
                    onClick={() => this.setState({show: true}, () => {
                        console.log("date clicked is ---------", this.props.currentDated)
                        let dated = this.props.currentDated.date.getMonth() + 1 + '/' + this.props.currentDated.date.getDate() + '/' + this.props.currentDated.date.getFullYear();
                        events.push({
                            'title': '8hrs on project work',
                            'start': new Date(dated),
                            'end': new Date(dated),
                        });
                        console.log("date clicked is ---------", dated)
                    })}
                >
                    <span>+</span>
                </button>
                {
                    this.state.show ?
                        <CustomModal show={this.state.show}
                                     close={(e) => this.close(e)}
                                     message={this.props.currentDated.date.toString()}
                        /> : null
                }
            </div>
        );
    }
}

export default AddButton


