import BaseClass from './baseClass';

class Series extends BaseClass {
	constructor(data){
		super();
		this.data = data;
		this._id = this.data.id;
		this._title = this.data.title;
		this._description = this.data.description;
		this._thumbnail = this.data.thumbnail;
		this._seasons = this.data.seasons;
	}	

	get id() {
		if(typeof this._id === 'undefined') {
			console.error("Tried to get ID of Series, was not set");
			return false;
		}
		return this._id;
	}

	set id(newID) {
		if(newID) {
			this._id = newID;
		}
	}

}
export default Series;

