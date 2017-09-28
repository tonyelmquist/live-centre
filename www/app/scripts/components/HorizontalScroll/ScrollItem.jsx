import React from 'react';

class ScrollItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            imageLoaded: false,
        };
    }

    onImageLoad = () => {
        this.setState({
            imageLoaded: true,
        });
    }

    render() {
        return (
            <div className={`inline scrollItem ${this.state.imageLoaded ? '' : 'loading'}`} onTouchTap={this.props.handleClick} key={`scroll-item-${this.props.id}`}>
                <img src={this.props.img} className="itemImage" onLoad={this.onImageLoad} />
                {this.props.overlay}
            </div>
        );
    }
}

export default ScrollItem;
