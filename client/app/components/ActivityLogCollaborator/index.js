/**
 * Created by saubhagya on 28/7/17.
 */
import React, { Component } from 'react'

class ActivityLogCollaborator extends Component{
    constructor(props) {
        super(props);
    }

    render()
    {
        return (
            <div className="collab-div">
                <span
                    className="activity-collaborators">Collaborators:{this.props.collaborators.map((collaborator, index) => {
                        return (<p key={index}>{collaborator}</p>)
                    }
                )}
                </span>
            </div>
        )
    }
}

export default ActivityLogCollaborator;
