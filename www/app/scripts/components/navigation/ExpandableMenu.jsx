/* global i18next*/
import React from 'react';
import PropTypes from 'prop-types';
import MediaQuery from 'react-responsive';

import { Motion, spring } from 'react-motion';

const ExpandableMenu = ({
  pageItems,
  categoryItems,
  openCloseMenu,
  isMenuOpen,
  changeRoute,
}) => {
    const MenuItems = (items) => {
        if (items.length > 0) {
            return items.map(item =>
        (<p
          key={item.key}
          onTouchTap={() => {
              changeRoute(item.path);
              openCloseMenu();
          }}
          className="expandableMenuItem"
        >
          {i18next.t(item.key)}
        </p>),
      );
        }
        return false;
    };

    const style = (isOpen) => {
        if (isOpen) {
            return {
                x: spring(0),
                y: spring(100),
                o: spring(1),
            };
        }
        return {
            x: spring(100),
            y: spring(0),
            o: spring(0),
        };
    };

    return (
      <MediaQuery maxWidth={1001}>
        <Motion
          defaultStyle={{ x: 0, y: 100, o: 0 }}
          style={style(isMenuOpen())}
        >
          {value =>
          (<div
            className="expandableMenu"
            style={{
                top: `${value.x}%`,
                width: `${value.y}%`,
                opacity: value.o,
            }}
          >
            <p className="divider">Menu</p>
            <div className="expandableMenuInner">
              {MenuItems(pageItems)}

              <p className="divider">Categories</p>
              {MenuItems(categoryItems)}
            </div>
          </div>)}
        </Motion>
      </MediaQuery>
    );
};

ExpandableMenu.propTypes = {
    pageItems: PropTypes.arrayOf(PropTypes.any).isRequired,
    categoryItems: PropTypes.arrayOf(PropTypes.any).isRequired,
    openCloseMenu: PropTypes.func.isRequired,
    isMenuOpen: PropTypes.func.isRequired,
    changeRoute: PropTypes.func.isRequired,
};

export default ExpandableMenu;
