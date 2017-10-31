import React from 'react';
import Avatar from 'material-ui/Avatar';
import { Link } from 'react-router-dom';
import Badge from 'material-ui/Badge';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import firebase from 'firebase';
import FirebaseDB from '../../../../../native/shared/utils/FirebaseDB';
import EditableInput from '../../components/Common/EditableInput';
import i18next from 'i18next';


class ProfilePage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            profileImage: '/img/avatars/blank.png',
        };

        this.setProfilePicture();
    }

    setProfilePicture = () => {
        FirebaseDB.readProfilePicture((url) => {
            console.log('url', url);
            this.setState({ profileImage: url });
        });
    }

    handleChange = () => {
        const currentUser = firebase.auth().currentUser;
        const file = this.fileUpload.files[0];
        let extension = '.';
        if (file.type === 'image/png') {
            extension = '.png';
        } else if (file.type === 'image/jpg' || file.type === 'image/jpeg') {
            extension = '.jpg';
        } else {
            console.error('Wrong file type, handle this error more elegantly', file.type);
            return;
        }

        const imageUrl = `/ProfilePictures/${currentUser.uid}_ProfileImage${extension}`;

        const storageRef = firebase.storage().ref(imageUrl);
        console.log('UPLOADING...');
        storageRef.put(file).then((snapshot) => {
            console.log('Uploaded a blob or file!', snapshot, imageUrl);
            FirebaseDB.writeNewUserProfilePicture(imageUrl, () => {
                console.log('success!');
                this.setProfilePicture();
            }, () => { console.error('no'); });
        });
    }

    uploadNewImage = () => {
        this.fileUpload.click();
    }

    onDisplayNameChange = (newValue) => {
        FirebaseDB.writeNewUserDisplayName(newValue, () => {
            this.props.setDisplayName(newValue);
        });
    }

    profilePictureUrl = '';

    render() {
        return (
        <div className="slide container-fluid profile-page">
            <input type="file" accept="image/*" onChange={this.handleChange} ref={ref => (this.fileUpload = ref)} style={{ position: 'absolute', right: '200%' }}/>
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

                <h1><EditableInput value={this.props.user.displayName} onChange={this.onDisplayNameChange} /></h1>
                <p>{this.props.user.email}</p>
            </div>

            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Curabitur at nunc et diam vestibulum fermentum vel ut nisi.
                Aliquam a dapibus diam. Cras vulputate rhoncus nibh quis pretium.
                Morbi ultricies mi eget gravida congue. Nulla ut tincidunt dui.
                Ut rhoncus, turpis a vehicula vestibulum, neque tellus commodo quam,
                nec lacinia augue turpis ac sapien. </p>

            <p className="bottom-info">
            <strong>{i18next.t('profile_legal')}</strong><br />
            <Link to="/privacy">{i18next.t('profile_privacy_policy')}</Link><br />
            <Link to="/terms">{i18next.t('profile_terms_use')}</Link>
            </p>
        </div>
        );
    }
}

export default ProfilePage;
