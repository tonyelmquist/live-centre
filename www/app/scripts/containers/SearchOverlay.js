import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SearchFilters from './SearchFilters';
import VideoGrid from '../components/common/VideoGrid';
import MasonryTiles from '../components/common/MasonryTiles';

import CirclesRow from '../components/common/CirclesRow';
import { toggleFilter, clearFilter } from '../actions/search.js';


class SearchContainer extends Component {
    /* One or more of the filteritems can have a clear property that when clicked,
    will reset the filters. */
    handleFilter = (filteritem) => {
        if (filteritem.clear == true) {
            // console.log("CLEAR FILTERS");
            this.props.dispatch(clearFilter());
        } else {
            // console.log(filteritem.key);
            this.props.dispatch(toggleFilter(filteritem.key));
        }
    }

    render() {
        const people = [
            { img: '/img/avatars/1.jpg', key: 'Lisa10', uid: 0 },
            { img: '/img/avatars/2.jpg', key: 'Per1', uid: 1 },
            { img: '/img/avatars/3.jpg', key: 'BoyGamer192', uid: 2 },
            { img: '/img/avatars/4.jpg', key: 'Lisa23', uid: 3 },
            { img: '/img/avatars/5.jpg', key: 'Mari4', uid: 4 },
            { img: '/img/avatars/6.jpg', key: 'Helene5', uid: 5 },
            { img: '/img/avatars/1.jpg', key: 'Hans16', uid: 6 },
            { img: '/img/avatars/2.jpg', key: 'SuperNintendoLongNameTest', uid: 7 },
            { img: '/img/avatars/3.jpg', key: 'Hans27', uid: 8 },
            { img: '/img/avatars/4.jpg', key: 'Petter8', uid: 9 },
        ];


        const createFilterFromTags = (tags) => {
            // console.log(tags);
            let filters = [];

            // Used to clear the filters.
            filters.push({ key: 'all', clear: true, active: true });

            if (tags.length > 0) {
                filters = tags.map(tag => ({ key: tag.name }));
            }

            return filters;
        };

        // Extract the filter strings so they can be combined with searchquery.
        const parseFilters = (filters) => {
            const parsed = [];
            for (const key in filters) {
                if (filters[key].active) {
                    parsed.push(filters[key].filterOn);
                }
            }
            return parsed;
        };

        return (
          <div className={(this.props.search.isOpen) ? 'searchContainer expand' : 'searchContainer close'}>
            <h4 className="container-fluid hideOnMobile">{i18next.t('filter')}</h4>
            <SearchFilters handleFilter={this.handleFilter} filters={this.props.filter.filters} />

            <h4 className="container-fluid">{i18next.t('suggested_people')}</h4>
            <CirclesRow items={people} />

            <div className="container-fluid">

              {this.props.search.isSearching
                        ? <h4>{i18next.t('search_results')} {this.props.search.keyword}</h4>
                        : <h4>{i18next.t('suggested_videos')}</h4>
                    }

              {/* Uncategorized is a temporary "suggested" category that is default. */}
              <MasonryTiles
                filter={this.props.search.isSearching || !this.props.filter.isClear
                                ? [this.props.search.keyword, ...parseFilters(this.props.filter.filters)]
                                : ['Lost In Time']}
                videos={this.props.videos}
              />

            </div>

          </div>
        );
    }
}

SearchContainer.propTypes = {
    dispatch: PropTypes.func.isRequired,
    videos: PropTypes.array.isRequired,
    search: PropTypes.object.isRequired,
    filter: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    search: state.search,
    filter: state.filter,
    videos: state.videos.items,
    tags: state.tags.items,

});

export default connect(mapStateToProps)(SearchContainer);
