import React from 'react';
import i18next from 'i18next';

const styles = {
    mediumIcon: {
        width: 36,
        height: 36,
    }
};


//TABS MUST BE ARRAY.
const FilterTabs = ({tabItems, activeTab, changeTab, colortheme}) => {
    const tabs = tabItems.map((tab, key) => {
        return (
            <div 
              className={`items` + (tabItems[activeTab] == tab ? ' active' : '')}
              onTouchTap={() => changeTab(key)}
              key={`filterTab-${tab}`}
              role="button" 
            >
                {i18next.t(tab)}
            </div>
        );
    });

	return (
      <div className={`horizontalScroll filterTabs ${colortheme}`}>
        <div className={`horizontalScrollInner`}>
         {tabs}
        </div>
      </div>
	);
}

export default FilterTabs;

