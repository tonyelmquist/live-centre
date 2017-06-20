class Video{
	constructor(data){
		this.data = data;
		this._id = this.data.id;
		this._title = this.data.title;
		this._description = this.data.description;
		this._video_url = this.data.video_url;
		this._thumbnail = this.data.thumbnail;
		this._views = this.data.views;
		this._eposide_number = this.data.eposide_number;
		this._tags = this.data.tags;
	}

	get id() {
		if(typeof this._id === 'undefined') {
			console.error("Tried to get ID of Video, was not set");
			return false;
		}
		return this._id;
	}
	set id(newID) {
		if(newID) {
			this._id = newID;
		}
	}

	get title() {
		if(typeof this._title === 'undefined') {
			console.error("Tried to get title of Video, was not set");
			return false;
		}
		return this._title;
	}
	set title(newTitle) {
		if(newTitle){
			this._title = newTitle;
		}
	}

	get thumbnail() {
		if(typeof this._thumbnail === 'undefined') {
			console.error("Tried to get title of Video, was not set");
			return false;
		}
		return this._thumbnail;
	}
	set thumbnail(newThumb) {
		if(newThumb){
			this._thumbnail = newThumb;
		}
	}

	get video_url() {
		if(typeof this._video_url === 'undefined') {
			console.error("Tried to get title of Video, was not set");
			return false;
		}
		return this._video_url;
	}
	set video_url(videoUrl) {
		if(videoUrl){
			this._video_url = videoUrl;
		}
	}

	/*printTags(){

		const tagString = "";
		if(this._tags.length>0){
			console.log("hest");
			for(let i =0; i<this._tags.length; i++){
				tagString = `${tagString + this._tags[i].name}`;
			}
		}
		return tagString;
	}*/

	get tags(){
		if(typeof this._tags == 'undefined'){
			console.error("tried to get tags from video");
			return false;
		}
		return this._tags;
	}

	set tags(tags){
		if(tags){
			this._tags = tags;
		}
	}

	get description(){
		if(typeof this._description == 'undefined'){
			console.error("Tried to get description of video, was not set.");
			return false;
		}
		return this._description;
	}

	set description(description){
		if(description){
			this._description = description;
		}
	}

}
export default Video;

