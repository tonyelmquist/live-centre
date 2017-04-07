import React from 'react';
import { Link, Route } from 'react-router-dom';
import Topic from './Topic';


const Topics = React.createClass({
    render(){
        return (
            <div>
              <h2>Topics</h2>
              <ul>
                <li>
                  <Link to={`${this.props.match.url}/rendering`}>
                    {i18next.t('topics_rendering')}
                  </Link>
                </li>
                <li>
                  <Link to={`${this.props.match.url}/components`}>
                    {i18next.t('topics_component')}
                  </Link>
                </li>
                <li>
                  <Link to={`${this.props.match.url}/props-v-state`}>
                    {i18next.t('topics_state')}

                  </Link>
                </li>
              </ul>

              <Route path={`${this.props.match.url}/:topicId`} component={Topic}/>
              <Route exact path={this.props.match.url} render={() => (
                <h3>Please select a topic.</h3>
              )}/>
            </div>
        );
    }

});

export default Topics;
