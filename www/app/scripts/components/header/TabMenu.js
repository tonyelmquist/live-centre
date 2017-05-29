import React from "react";
import {NavLink, Link} from 'react-router-dom';
import Paper from 'material-ui/Paper';

import {Tabs, Tab} from 'material-ui/Tabs';

import MediaQuery from 'react-responsive';


const TabMenu = ({pageItems, changeRoute}) => {

	/*
		For now we recieve categoryitems, this could be changed if other links
		will be of better fit.

		The tabs will only be displayed if the screensize is
		> less than 900px
	*/


	const items = pageItems;
	const listItems = items.map((item)=>

		<Tab 
			label={item.key}
			onClick={()=>changeRoute(item.path)}
			key={item.key}
		/>
		);


	return(
		<MediaQuery maxWidth={1000}>
			<Tabs className="bottomTabs">
				{listItems}
			</Tabs>
		</MediaQuery>
	);
}

export default TabMenu;

