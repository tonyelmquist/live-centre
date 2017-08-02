import React from 'react';
import PropTypes from 'prop-types';
import MediaQuery from 'react-responsive';
import { Link } from 'react-router-dom';
import i18next from 'i18next';
import FlatButton from 'material-ui/FlatButton';
import BackIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import SearchBar from './SearchBar';
import SearchInput from './SearchInput';
import UserMenu from '../../containers/UserMenu';

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

    const printLocation = () => {
        if (props.locationName === 'Home') {
            return (<Link to="/Home">
                      <FlatButton className="menuItem logo" label="IMR" />
                    </Link>);
        }
        return (<div onTouchTap={() => props.goBack()} className="menuItem links">
                    <BackIcon style={{ padding: 8, float: 'left', color:'#000' }} />
                    <span className="menuItemLabel">{props.locationName}</span>
                </div>);
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

          {printLocation()}
          
          <SearchInput
            handleSearch={props.handleSearch}
            searchState={props.searchState}
            handleSearchFocus={props.handleSearchFocus}
          />

          </div>
        </MediaQuery>

        <MediaQuery minWidth={1001} className="inline">
          <FlatButton className="logo" label="IMR" />
          {HeaderMenuItem(props.pageItems)}
        </MediaQuery>
        {/* <MediaQuery minWidth={1500} className="inline">
          {HeaderMenuItem(props.categoryItems)}
        </MediaQuery> */}
        <div className={
            props.searchState.isOpen
              ? 'rightMenu searchOpen'
              : 'rightMenu searchClosed'}
        >
          <SearchBar
            handleSearch={props.handleSearch}
            searchState={props.searchState}
            openCloseSearch={props.openCloseSearch}
            handleSearchFocus={props.handleSearchFocus}
          />
          <UserMenu changeRoute={props.changeRoute} />
        </div>
      </div>
    );
};

HeaderMenu.propTypes = {
    pageItems: PropTypes.arrayOf(PropTypes.any).isRequired,
    categoryItems: PropTypes.arrayOf(PropTypes.any).isRequired,
    changeRoute: PropTypes.func.isRequired,
    searchState: PropTypes.objectOf(PropTypes.any).isRequired,
    handleSearch: PropTypes.func.isRequired,
    openCloseSearch: PropTypes.func.isRequired,
    locationName: PropTypes.string.isRequired,
    handleSearchFocus: PropTypes.func.isRequired,
};

export default HeaderMenu;
