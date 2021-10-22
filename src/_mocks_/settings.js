import {Component} from "react"

class settings extends Component{ 
	state = {
		conf: {}
	}
	constructor() {
		super();
	}

	init = function(){
		return {
			APP_URL : "http://online.js/server.php",
			APP_FOLDER : "http://online.js",
			APP_NAME : "online"
		}
	}


}

export default settings