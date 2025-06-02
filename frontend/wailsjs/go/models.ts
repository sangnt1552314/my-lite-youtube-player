export namespace types {
	
	export class Video {
	    title: string;
	    author: string;
	    views: string;
	    duration: string;
	    id: string;
	    thumb: string;
	
	    static createFrom(source: any = {}) {
	        return new Video(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.title = source["title"];
	        this.author = source["author"];
	        this.views = source["views"];
	        this.duration = source["duration"];
	        this.id = source["id"];
	        this.thumb = source["thumb"];
	    }
	}

}

