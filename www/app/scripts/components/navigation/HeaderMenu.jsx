import React from 'react';
import PropTypes from 'prop-types';
import MediaQuery from 'react-responsive';
import { Link } from 'react-router-dom';
import i18next from 'i18next';
import FlatButton from 'material-ui/FlatButton';
import SearchBar from './SearchBar';
import SearchInput from './SearchInput';
import Logged from '../../containers/Logged';

const HeaderMenu = (props) => {

    const HeaderMenuItem = (items) => {
        if (items.length > 0) {
            return items.map(item =>
        (<FlatButton
          onTouchTap={() => {
              props.changeRoute(item.path);
              props.closeSearch();
          }}
          className="menuItem links"
          label={i18next.t(item.key)}
          key={`${item.key}-flatButton`}
        />),
      );
        }
        return <div />;
    };

    return (
      <div className="header">
        <MediaQuery maxWidth={1000}>
          <div
            className={
            props.searchState.isOpen
              ? 'expandable_searchbar open'
              : 'expandable_searchbar closed'
          }
          >
            <Link to="/Home">
              <FlatButton className="logo" label="IMR" />
            </Link>
            <SearchInput
              handleSearch={props.handleSearch}
              searchState={props.searchState}
            />
          </div>
        </MediaQuery>

        <MediaQuery minWidth={1001} className="inline">
          <FlatButton className="logo" label="IMR" />
          {HeaderMenuItem(props.pageItems)}
        </MediaQuery>
        <MediaQuery minWidth={1500} className="inline">
          {HeaderMenuItem(props.categoryItems)}
        </MediaQuery>
        <div className="rightMenu">
          <SearchBar
            handleSearch={props.handleSearch}
            searchState={props.searchState}
            openCloseSearch={props.openCloseSearch}
          />
          <Logged changeRoute={props.changeRoute} />
        </div>
      </div>
    );
};

HeaderMenu.propTypes = {
    pageItems: PropTypes.array.isRequired,
    categoryItems: PropTypes.array.isRequired,
    changeRoute: PropTypes.func.isRequired,
    searchState: PropTypes.object.isRequired,
    handleSearch: PropTypes.func.isRequired,
    openCloseSearch: PropTypes.func.isRequired,
};

export default HeaderMenu;
