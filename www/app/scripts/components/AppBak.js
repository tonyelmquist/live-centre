import React from 'react';
import {
  TabRouter,
  addNavigationHelpers,
  createNavigator,
} from 'react-navigation';


import Topics from './Topics';

const BasicExample = React.createClass({

    getInitialState() {
        return { lng: "nb" };
    },

    componentWillMount(){
        this.setLang(this.state.lng);
    },


    setLang(lang) {

        i18next.init({
            lng: lang,
            resources: {
                en: {
                    translation: require('../../locale/en-US.po')
                },
                nb: {
                    translation: require('../../locale/nb-NO.po')
                }
            }
        });
        this.setState({lng: lang});

    },

    handleLangChange(e){
        e.preventDefault();
        this.setLang(e.target.value);
    },

    render() {
        return(
            <Router>
              <div>
                <div>
                    <button onClick = {this.handleLangChange} value="en">English</button>
                    <button onClick = {this.handleLangChange} value="nb">Norsk</button>
                </div>
                <ul>
                  <li><Link to="/">{i18next.t('route_home')}</Link></li>
                  <li><Link to="/about">{i18next.t('route_about')}</Link></li>
                  <li><Link to="/topics">{i18next.t('route_topics')}</Link></li>
                </ul>

                <hr/>

                <Route exact path="/" component={Home}/>
                <Route path="/about" component={About}/>
                <Route path="/topics" component={Topics}/>
              </div>
            </Router>
        );
    }
});


const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
);

const About = () => (
  <div> 
    <h2>About</h2>
  </div>
);

export default BasicExample;
