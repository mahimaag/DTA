/**
 * Created by saubhagya on 28/7/17.
 */
import React, { Component } from 'react'

class ActivityLogCollaborator extends Component{
    constructor(props) {
        super(props);

        this.state = {
            collaborators: this.props.collaborators,
            newCollaboratorArray: []

        }
    }

    onCollaboratorChange = (index, event) => {
        let newArray = this.state.collaborators;
        newArray[index] = event.target.value;
        this.setState({
            collaborators: newArray
        },() => {
            this.props.onCollabChange(this.state.collaborators);
        })
    }

    render()
    {
        return (
            <div className="collab-div">
                {this.props.editable ?
                    <div>
                        <span
                            className="activity-collaborators">Collaborators:{this.state.collaborators.map((collaborator, index) => {
                                return (<input type="text"
                                               value={collaborator}
                                               onChange={(value) => {this.onCollaboratorChange(index, value)}}/>)
                            }
                        )}
                        </span>
                    </div> :
                    <span
                        className="activity-collaborators">Collaborators:{this.state.collaborators.map((collaborator, index) => {
                            return (<p key={index}>{collaborator}</p>)
                        }
                    )}
                    </span>
                }

            </div>
        )
    }
}

export default ActivityLogCollaborator;
