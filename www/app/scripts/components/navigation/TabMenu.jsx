import React from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab } from 'material-ui/Tabs';
import MediaQuery from 'react-responsive';
import i18next from 'i18next';
import AnimatedMenuIcon from './../animatedIcons/AnimatedMenuIcon';


const TabMenu = ({
  pageItems,
  closeSearch,
  changeRoute,
  isMenuOpen,
  isSubPage,
  openCloseMenu,
  hideMenu,
  isNaviconIncluded,
}) => {
    const items = pageItems;
    const listItems = items.map(item =>
    (<Tab
      label={i18next.t(item.key)}
      onClick={() => {
          changeRoute(item.path);
          closeSearch();
          hideMenu();
      }}
      key={item.key}
      icon={item.icon}
    />),
  );

    return (
      <MediaQuery maxWidth={1000}>
        <Tabs className="bottomTabs">
          {listItems}
          {isNaviconIncluded ?
          <Tab
            onClick={() => openCloseMenu()}
            icon={
              <AnimatedMenuIcon isMenuOpen={isMenuOpen} isSubPage={isSubPage} />
          }
            label="Menu"
          /> : ''
          }
        </Tabs>
      </MediaQuery>
    );
};

TabMenu.defaultProps = {
    isNaviconIncluded: false,
};

TabMenu.propTypes = {
    pageItems: PropTypes.arrayOf(PropTypes.any).isRequired,
    changeRoute: PropTypes.func.isRequired,
    openCloseMenu: PropTypes.func.isRequired,
    isMenuOpen: PropTypes.func.isRequired,
    isSubPage: PropTypes.bool.isRequired,
    closeSearch: PropTypes.func.isRequired,
    hideMenu: PropTypes.func.isRequired,
    isNaviconIncluded: PropTypes.bool.isRequired
};

export default TabMenu;
