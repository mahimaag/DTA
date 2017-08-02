/**
 * Created by saubhagya on 28/7/17.
 */
import React, { Component } from 'react'

class ActivityLogCollaborator extends Component{
    constructor(props) {
        super(props);
    }

    onCollaboratorChange = (index, event) => {
        let newArray = this.props.collaborators;
        newArray[index] = event.target.value;
        this.props.onCollabChange(newArray);
    }

    render()
    {
        return (
            <div className="collab-div">
                {this.props.editable ?
                    <div>
                        <span
                            className="activity-collaborators">Collaborators:{this.props.collaborators.map((collaborator, index) => {
                                return (<input type="text"
                                               value={collaborator}
                                               onChange={(value) => {this.onCollaboratorChange(index, value)}}/>)
                            }
                        )}
                        </span>
                    </div> :
                    <span
                        className="activity-collaborators">Collaborators:{this.props.collaborators.map((collaborator, index) => {
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
