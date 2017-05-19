import React from 'react';


export default class Category extends React.Component {
    constructor(){
        super();
        console.log(this.props);
    }

    render(){
      console.log(this.props);
        return(
            <div className="slide">
                <h1>{this.props.match.params.categoryKey}</h1>    
                <p>Should load videos from specified category</p>

            </div>
            
        );
    }
}
