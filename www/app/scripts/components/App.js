import React from 'react';
import {
  HashRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import {Button, ButtonGroup} from 'react-bootstrap';


import Topics from './Topics';
import Animation from './Animation';
import NavbarTop from './Navbar';

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
            fallbackLng: "en",
            resources: {
                en: {
                    translation: require('../../locale/en_us.po')
                },
                nb: {
                    translation: require('../../locale/nb_no.po')
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
              <div className = "container">
                <NavbarTop />
                <ButtonGroup style={{marginTop:'55px'}}>
                    <Button bsStyle="success" onClick = {this.handleLangChange} value="en">English</Button>
                    <Button bsStyle="warning" onClick = {this.handleLangChange} value="nb">Norsk</Button>
                </ButtonGroup>
                <ul>
                  <li><Link to="/">{i18next.t('route_home')}</Link></li>
                  <li><Link to="/about">{i18next.t('route_about')}</Link></li>
                  <li><Link to="/topics">{i18next.t('route_topics')}</Link></li>
                  <li><Link to="/anim">Animation</Link></li>
                </ul>

                <hr/>

                <Route exact path="/" component={Home}/>
                <Route path="/about" component={About}/>
                <Route path="/topics" component={Topics}/>
                <Route path="/anim" component={Animation}/>
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
