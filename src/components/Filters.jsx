import React, { Component } from 'react';

class Filters extends Component {

    handleChange(e) {
        this.props.filterChange(e.target.name, e.target.value);
    }

    render() {
        return (
            <fieldset className='filters'>
                <legend>Filtres</legend>
                <input type="text" name="name" onChange={(e) => this.handleChange(e)}/>
            </fieldset>
        );
    }

}

export default Filters;