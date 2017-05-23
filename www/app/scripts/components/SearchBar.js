import React from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import SearchIcon from 'material-ui/svg-icons/action/search';
import MediaQuery from 'react-responsive';

//Should also have validation.
//A tutorial: http://redux-form.com/6.0.0-rc.1/examples/material-ui/
//Autocomplete material ui: http://www.material-ui.com/#/components/auto-complete
const dataSource3 = [
  {textKey: 'Some Text', valueKey: 'someFirstValue'},
  {textKey: 'Some Text', valueKey: 'someSecondValue'},
];

const SearchForm = () => {
  return(
    <div className="inline">

      <MediaQuery minWidth={640}>
        <AutoComplete 
          floatingLabelText="Søk"
          dataSource={dataSource3}
          filter={AutoComplete.noFilter}
          className="inline"
        />
      </MediaQuery>

      <MediaQuery maxWidth={639}>
        <SearchIcon/>
      </MediaQuery>

    </div>
    );
};

export default SearchForm;