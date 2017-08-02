import BaseClass from './baseClass';

class TeamMember extends BaseClass {
    constructor(data) {
        super();

        this.assignData({
            _id: 0,
            _name: '',
            _team: '',
            _number: 0,
            _description: '',
            _portrait: '',
            _actionShot: '',
        }, {
            _id: data.id,
            _name: data.name,
            _team: data.team,
            _number: data.shirtNumber,
            _description: data.description,
            _portrait: data.portraitImage,
            _actionShot: data.actionShot,
        });
    }

    get id() {
        if (typeof this._id === 'undefined') {
        // console.error('Tried to get ID of Video, was not set');
            return false;
        }
        return this._id;
    }
    set id(newID) {
        if (newID) {
            this._id = newID;
        }
    }
}
export default TeamMember;
