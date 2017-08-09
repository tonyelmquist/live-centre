import React from 'react';
import Avatar from 'material-ui/Avatar';
import { Link } from 'react-router-dom';
import Badge from 'material-ui/Badge';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
// import FileInput from 'react-file-input';

class ProfilePage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            profileImage: '/img/avatars/3.jpg',
        };
    }

    handleChange = (e) => {
        console.log(e.target.files[0]);
    }

    render() {
        console.log('profile page rerender');
        return (
        <div className="slide container-fluid profile-page">
            {/*<FileInput
                name="myImage"
                accept=".png,.gif"
                placeholder="My Image"
                className="inputClass"
                onChange={this.handleChange}
            />*/}
            <div className="center">

                <Badge
                    className="profile-badge"
                    badgeContent={<EditIcon style={{ color: '#000' }} onClick={this.uploadNewImage} />}
                    primary
                    style={{ padding: 0 }}
                    badgeStyle={{ top: '25px', width: '48px', height: '48px', border: 'solid 3px #0092ab', color: '#0092ab' }}
                >
                    <Avatar
                        size={200}
                        src={this.state.profileImage}
                        className="profile-avatar"
                    />
                </Badge>

                <h1>User</h1>
                <p>{this.props.user.email}</p>
            </div>

            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Curabitur at nunc et diam vestibulum fermentum vel ut nisi.
                Aliquam a dapibus diam. Cras vulputate rhoncus nibh quis pretium.
                Morbi ultricies mi eget gravida congue. Nulla ut tincidunt dui.
                Ut rhoncus, turpis a vehicula vestibulum, neque tellus commodo quam,
                nec lacinia augue turpis ac sapien. </p>

            <p className="bottom-info">
            <strong>Legal</strong><br />
            <Link to="/privacy">Privacy Policy</Link><br />
            <Link to="/terms">Terms of Use</Link>
            </p>
        </div>
        );
    }
}

export default ProfilePage;
