import BaseClass from './baseClass';

class Tag extends BaseClass {
    constructor(data) {
        super();

        this.assignData({
            _type: '',
            _name: '',
            _id: 0,
            _test: '',
        }, {
            _type: data.type,
            _name: data.name,
            _id: data.id,
        });
    }

    get id() {
        if (typeof this._id === 'undefined') {
            console.error('Tried to get ID of Video, was not set');
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
            console.error('Tried to get title of Video, was not set');
            return false;
        }
        return this._name;
    }
    set name(newName) {
        if (newName) {
            this._name = newName;
        }
    }

    /* set videos(){

    }

    get videos(){

    }*/




}
export default Tag;

