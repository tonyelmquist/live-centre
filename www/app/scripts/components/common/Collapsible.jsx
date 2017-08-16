import React, { Component } from 'react';
import { Motion, spring } from 'react-motion';
import AnimatedExpandIcon from '../Icons/AnimatedExpandIcon';

class Collapsible extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showCollapseButton: true,
        };
    }

    componentDidMount() {
        const el = this.collapseInnerElement;
        const fullText = this.props.text;

        if (el.scrollHeight <= el.clientHeight) {
            this.setCollapseState(false);
        }  
        if (this.props.isCollapsed) {
            this.shortenText(el);
        }
    }

    shouldComponentUpdate(nextProps) {
        // console.log(nextProps === this.props);
        // console.log(nextProps, this.props);
        return true;
    }

    componentDidUpdate() {
        // console.log('component did update');
        const el = this.collapseInnerElement;
        if (this.props.isCollapsed) {
            setTimeout(() => { this.shortenText(el); }, 300);
        } else {
            el.textContent = this.props.text;
        }
    }

    shortenText(el) {
        // console.log('shortenText');
        // console.log(el.scrollHeight);
        // For loop for maximal amount of iterations, should break before maxlength.
        for (let i = 0; i < el.textContent.length; i++) {
            if (el.scrollHeight <= el.clientHeight) {
                break;
            }
            el.textContent = el.textContent.replace(/\W*\s(\S)*$/, '...');
        }
    }

    collapseButton() {
        if (typeof this.collapseInnerElement !== 'undefined' && this.collapseInnerElement !== null) {
            if (this.collapseInnerElement.scrollHeight <= this.collapseInnerElement.clientHeight) {
                return (<span onTouchTap={() => this.props.toggleCollapseInfo()} className="collapseIcon">
                <AnimatedExpandIcon isCollapsed={this.props.isCollapsed} />
                </span>);
            }
        }
        return (<span />);
    }


    getCollapseHeight(){
        const defaultHeight = 55;
        if (typeof this.collapseInnerElement !== 'undefined' && this.collapseInnerElement !== null) {
            // console.log(this.collapseInnerElement.scrollHeight, this.collapseInnerElement.clientHeight);

            if (this.props.isCollapsed) {
                return defaultHeight;
            }

            this.collapseInnerElement.textContent = this.props.text;
            return this.collapseInnerElement.scrollHeight;
        }
        return defaultHeight;
    }

    setCollapseState(showCollapseButton) {
        this.setState(() => ({showCollapseButton}));
    }

    render() {
        const collapseHeight = this.getCollapseHeight();
        return (
            <div className="collapsible">
            {this.state.showCollapseButton
                ? <span onTouchTap={() => this.props.toggleCollapseInfo()} className="collapseIcon">
                    <AnimatedExpandIcon isCollapsed={this.props.isCollapsed} />
                  </span>
                : <span />
            }

            <Motion style={this.props.isCollapsed ? { height: spring(55) } : { height: spring(collapseHeight) }} >
                {style =>
                    (<div
                        id="hest"
                        ref={ref => (this.collapseInnerElement = ref)}
                        style={{
                            overflow: 'hidden',
                            maxHeight: `${style.height}px`,
                        }}
                    >
                        {this.props.text}
                    </div>)
                }
            </Motion>
            </div>
        );
    }
}


export default Collapsible;
