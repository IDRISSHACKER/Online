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
			APP_URL : "https://online.js/server.php",
			APP_FOLDER : "https://online.js",
			APP_NAME : "online"
		}
	}


}

export default settings