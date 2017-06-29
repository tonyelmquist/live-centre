import BaseClass from "./baseClass";
import Tag from "./tag";

class Video extends BaseClass {
	constructor(data){
		super();

		this.assignData({
			_id: 0,
			_author: "",
		//	_channel: "",
			_description: "",
			_episode_number: "",
			_rating: 0,
		//	_season: "",
		//	_series: "",
			_tags: [],
			_title: "",
			_thumbnail: "",
			_video_url: "",
		//	_views: 0,
		}, {
			_id: data.id,
			_author: data.author,
		//	_channel: data.channel,
			_description: data.title,
			_episode_number: data.episode_number,
			_rating: data.rating,
			_season: data.season,
			_series: data.series,
			_tags: data.tags,
			_title: data.title,
			_thumbnail: data.thumbnail,
			_video_url: data.video_url,
		//	_views: data.views,
		});

		// this.hasMany(Tag);
		// this.belongsTo(Season);
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
			console.error("Tried to get video_URL of Video, was not set");
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

	set series(series){
		if(series){
			this._series = series;
		}
	}

	get series(){
		return this._series;
	}

	set season(season){
		if(season){
			this._season = season;
		}
	}

	get season(){
		return this._season;
	}

}
export default Video;
