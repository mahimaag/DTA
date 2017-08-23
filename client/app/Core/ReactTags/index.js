import React from 'react';
import ReactTags from 'react-tag-autocomplete';

class Tags extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tags: [],
            suggestions: [
                {
                    id: 2756,
                    name:"abhishek"
                },
                {
                    id: 2590,
                    name:"Puja"
                },
                {
                    id: 2595,
                    name:"Mahima"
                },
                {
                    id: 2597,
                    name:"Raman"
                }
            ]
        }
    }

    handleDelete (i) {
        const tags = this.state.tags.slice(0);
        tags.splice(i, 1);
        this.setState({ tags });
        this.props.updateTag(tags);
    }

    handleAddition (tag) {
        const tags = [].concat(this.state.tags, tag);
        this.setState({ tags });
        this.props.updateTag(tags);
    }

    render () {
        return (
            <ReactTags
                tags={this.state.tags}
                suggestions={this.state.suggestions}
                handleDelete={this.handleDelete.bind(this)}
                handleAddition={this.handleAddition.bind(this)} />
        )
    }
}

export default Tags;