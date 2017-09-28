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
            setTimeout(() => {
                this.shortenText(el);
                if (el.textContent === this.props.text) {
                    this.setCollapseState(false);
                } else {
                    this.setCollapseState(true);
                }
            }, 300);
        } else {
            el.textContent = this.props.text;
        }
    }

    getDescriptionSnippet(string, maxCharacters) {
        const array = string.split(' ');
        let count = 0;

        let finalCount = 0;

        for (let i = 0; i < array.length; i++) {
            count += array[i].length;
            if (count + i > maxCharacters) {
                finalCount = count + i;
                break;
            }
        }
        // console.log(finalCount, string.length, array, maxCharacters);
        if (finalCount === string.length) {
            return string;
        }
        return `${string.substr(0, finalCount)}...`;
    }

    shortenText(el) {
        // console.log(el.textContent);
        el.textContent = this.getDescriptionSnippet(el.textContent, 80);
    }

    getCollapseHeight() {
        const defaultHeight = 45;
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
        this.setState(() => ({ showCollapseButton }));
    }

    render() {
        console.log('COLLAPSE RENDERERER', this.state.showCollapseButton);
        const collapseHeight = this.getCollapseHeight();
        return (
            <div className="collapsible">
            {this.state.showCollapseButton
                ? <span onTouchTap={() => this.props.toggleCollapseInfo()} className="collapseIcon">
                    <AnimatedExpandIcon isCollapsed={this.props.isCollapsed} />
                  </span>
                : <span />
            }

            <Motion style={this.props.isCollapsed ? { height: spring(45) } : { height: spring(collapseHeight) }} >
                {style =>
                    (<div
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
