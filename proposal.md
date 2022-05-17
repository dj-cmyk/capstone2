## CAPSTONE 2 PROJECT PROPOSAL - Dance Teacher class plans + playlists app

Springboard Software Engineering Track - May 2022

1. What tech stack will you use for your final project? 

	React/Node
	
2. Is the front-end UI or the back-end going to be the focus of your project? Or are you going to make an evenly focused full-stack application? 

	Planning for an evenly focused full-stack application
	
3. Will this be a website? A mobile app? Something else? 

	Planning to build a website that works smoothly on mobile. When teaching I usually use my phone to connect directly to the audio in the studio, so I’d love to be able to access it easily from my phone whether it’s a website or mobile app

4. What goal will your project be designed to achieve? 
	
	Create web app for dance teachers to access class plans with associated playlists / ability to playback songs directly from the class plan 
	
5. What kind of users will visit your app? In other words, what is the demographic of your users? 
	
	Dance Teachers - specifically ballet but it could potentially be expanded to other styles of dance quite easily
	
6. What data do you plan on using? How are you planning on collecting your data? 
	
	For the music/playlist aspect was planning to use the Spotify API: 
		
		https://developer.spotify.com/documentation/web-playback-sdk/ 
		https://developer.spotify.com/documentation/web-api/reference/#category-playlists 

	For the class plans / exercises I’ll be using my existing class plans

7. In brief, outline your approach to creating your project (knowing that you may not know everything in advance and that these details might change later). Answer questions like the ones below, but feel free to add more information: 
	
	a. What does your database schema look like? 


	b. What kinds of issues might you run into with your API? 
	c. Is there any sensitive information you need to secure? 
		
	- Will definitely need to use authentication to secure user/teacher data, also will want to make sure that specific users only have access to specific class plans 

	d. What functionality will your app include? 

	e. What will the user flow look like? 
	
	- User (Teacher) logs in
	- User Dashboard has options to 
	- Create new class plan / playlist
	- Read/use class plans/playlists for specific level 
	- Update class plans / playlist with new songs, new exercises

	f. What features make your site more than a CRUD app? What are your stretch goals? 
	
	- additional features to recommend similar songs / alternative songs for each exercise based on tempo, etc., 
	- Teachers able to add / suggest different songs for the same exercises
	- Rating system?
