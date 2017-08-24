import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Motion, spring } from 'react-motion';
import i18next from 'i18next';
// tabItems={tabs} activeTab={this.props.activeFilter} changeTab={this.changeTab}

class FilterTabs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            barPos: 0,
            barWidth: 0,
            scrollAnimation: 300,
            opacity: 0,
        };
    }

    componentDidMount() {
        const activeTab = this.props.activeTab;
        if (this.tabElements[activeTab] !== undefined && this.scroller !== undefined) {
            this.updateScrollBar(0, this.tabElements[activeTab].offsetWidth);
        }
        this.scrollToZero();
    }

    // Only update if the active element has changed.
    componentDidUpdate(prevProps) {
        const activeTab = this.props.activeTab;
        if (prevProps.activeTab !== activeTab && this.tabElements[activeTab] !== undefined && this.scroller !== undefined) {
            const barPos = this.tabElements[activeTab].getBoundingClientRect().left + this.scroller.scrollLeft;
            const barWidth = this.tabElements[activeTab].offsetWidth;
            this.updateScrollBar(barPos, barWidth);
        }
    }

    updateScrollBar(barPos, barWidth) {
        this.setState({ barWidth, barPos });
    }


    scrollToZero() {
        setTimeout(() => this.setState({ scrollAnimation: 0, opacity: 100 }), 300);
    }

    render() {
        // TODO: ADD slide inn animation.
        const tabItems = this.props.tabItems;
        const activeTab = this.props.activeTab;

        this.tabElements = [];

        // TODO; move to component did mount so this doesent happen with each update.
        const tabs = tabItems.map((tab, key) => (
                <div
                  className={'items' + (tabItems[activeTab] === tab ? ' active' : '')}
                  onTouchTap={() => this.props.changeTab(key)}
                  key={`filterTab-${tab}`}
                  ref={(ref) => { this.tabElements[key] = ref; }}
                  role="button"
                >
                    {i18next.t(tab)}
                </div>
            ));

        return (
            <div className={`horizontalScroll-outer filterTabs ${this.props.colortheme}`}>
                <div ref={(ref) => { this.scroller = ref; }} className='horizontalScroll' >
                    <div className={'horizontalScrollInner'} style={{ transition: '0.5s all', transform: `translate(-${this.state.scrollAnimation}px)`}}>
                        {tabs}
                    </div>
                    <Motion style={{ w: spring(this.state.barWidth), p: spring(this.state.barPos) }} >
                        {({ w, p }) =>
                            <div style={{ width: w, left: `${p}px`, transition: '0.7s opacity', opacity: this.state.opacity }} className="scroll-bar" />
                        }
                    </Motion>
                </div>
            </div>
        );
    }

}

FilterTabs.propTypes = {
    activeTab: PropTypes.number.isRequired,
    tabItems: PropTypes.array.isRequired,
    changeTab: PropTypes.func.isRequired,
    colortheme: PropTypes.string,
};

FilterTabs.defaultProps = {
    colortheme: '',
};


export default FilterTabs;
