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
        };
    }

    componentDidMount() {
        const activeTab = this.props.activeTab;
        if (this.tabElements[activeTab] !== undefined && this.scroller !== undefined) {
            this.updateScrollBar(this.tabElements[activeTab]);
        }
    }

    // Only update if the active element has changed.
    componentDidUpdate(prevProps) {
        const activeTab = this.props.activeTab;
        if (prevProps.activeTab !== activeTab && this.tabElements[activeTab] !== undefined && this.scroller !== undefined) {
            this.updateScrollBar(this.tabElements[activeTab]);
        }
    }

    updateScrollBar(activeElement) {
        const barPos = activeElement.getBoundingClientRect().left + this.scroller.scrollLeft;
        const barWidth = activeElement.offsetWidth;

        this.setState({ barWidth, barPos });
    }

    render() {
        // TODO: ADD slide inn animation.
        const tabItems = this.props.tabItems;
        const activeTab = this.props.activeTab;

        this.tabElements = [];

        // TODO; move to component did mount so this doesent happen with each update.
        const tabs = tabItems.map((tab, key) => (
                <div
                  className={'items' + (tabItems[activeTab] == tab ? ' active' : '')}
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
                    <div className={'horizontalScrollInner'}>
                        {tabs}
                    </div>
                    <Motion style={{ w: spring(this.state.barWidth), p: spring(this.state.barPos) }} >
                        {({ w, p }) =>
                            <div style={{ width: w, left: `${p}px` }} className="scroll-bar" />
                        }
                    </Motion>
                </div>
            </div>
        );
    }

}
export default FilterTabs;
