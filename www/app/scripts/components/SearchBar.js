import React from 'react'
import AutoComplete from 'material-ui/AutoComplete';

//Should also have validation.
//A tutorial: http://redux-form.com/6.0.0-rc.1/examples/material-ui/
//Autocomplete material ui: http://www.material-ui.com/#/components/auto-complete
const dataSource3 = [
  {textKey: 'Some Text', valueKey: 'someFirstValue'},
  {textKey: 'Some Text', valueKey: 'someSecondValue'},
];

const styles = {
  autocomplete: {
    color: 'red',
  }
};


const SearchForm = () => {
  return(
   
      <AutoComplete 
        floatingLabelText="Søk"
        dataSource={dataSource3}
        filter={AutoComplete.noFilter}
        className="inline"
        invert={true}
      />
    )
}

export default SearchForm;