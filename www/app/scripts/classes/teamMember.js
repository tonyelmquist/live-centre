import BaseClass from './baseClass';

class TeamMember extends BaseClass {
    constructor(data) {
        super();

        this.assignData({
            _id: 0,
            _name: '',
            _type: '',
            _nationality: {},
            _dob: '',
            _height: '',
            _statistics: {},
            _number: '',
            _roles: [],
        }, {
            _id: data.id,
            _name: data.name,
            _type: data.type,
            _nationality: data.nationality,
            _dob: data.dob,
            _height: data.height,
            _statistics: data.statistics,
            _number: data.number,
            _roles: data.roles,
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

    get name() {
        if (typeof this._name === 'undefined') {
        // console.error('Tried to get name of Vnameeo, was not set');
            return false;
        }
        return this._name;
    }
    set name(newname) {
        if (newname) {
            this._name = newname;
        }
    }

    get type() {
        if (typeof this._type === 'undefined') {
        // console.error('Tried to get type of Vtypeeo, was not set');
            return false;
        }
        return this._type;
    }
    set type(newtype) {
        if (newtype) {
            this._type = newtype;
        }
    }

    get nationality() {
        if (typeof this._nationality === 'undefined') {
        // console.error('Tried to get nationality of Vnationalityeo, was not set');
            return false;
        }
        return this._nationality;
    }
    set nationality(newnationality) {
        if (newnationality) {
            this._nationality = newnationality;
        }
    }

    get dob() {
        if (typeof this._dob === 'undefined') {
        // console.error('Tried to get dob of Vdobeo, was not set');
            return false;
        }
        return this._dob;
    }
    set dob(newdob) {
        if (newdob) {
            this._dob = newdob;
        }
    }

    get height() {
        if (typeof this._height === 'undefined') {
        // console.error('Tried to get height of Vheighteo, was not set');
            return false;
        }
        return this._height;
    }
    set height(newheight) {
        if (newheight) {
            this._height = newheight;
        }
    }

    get statistics() {
        if (typeof this._statistics === 'undefined') {
        // console.error('Tried to get statistics of Vstatisticseo, was not set');
            return false;
        }
        return this._statistics;
    }
    set statistics(newstatistics) {
        if (newstatistics) {
            this._statistics = newstatistics;
        }
    }

    get number() {
        if (typeof this._number === 'undefined') {
        // console.error('Tried to get number of Vnumbereo, was not set');
            return false;
        }
        return this._number;
    }
    set number(newnumber) {
        if (newnumber) {
            this._number = newnumber;
        }
    }

    get role() {
        if (typeof this._role === 'undefined') {
        // console.error('Tried to get role of Vroleeo, was not set');
            return false;
        }
        return this._role;
    }
    set role(newrole) {
        if (newrole) {
            this._role = newrole;
        }
    }
}
export default TeamMember;
