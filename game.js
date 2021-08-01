/*
	Copyright (C) 2021 Gameblabla
	MIT License
	
	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in all
	copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	SOFTWARE.
*/
var img_memory = Array(21);
var precalculed_fps = 1000/30;

var timer_game = 0;
var timer_game2 = 0;
var animation_titlescreen = 0;

var titlescreen_logo0x = 0;
var titlescreen_logo1_x = 0;
var titlescreen_logo2_x = 0;

var titlescreen_scale = 0;
var transition_black = 0.0;

var story_state = 0;
var fuck_state = 0;
var fuck_character = 0;

var fuck_current_speed = 0;
var fuck_required_speed = 0;
var fuck_gain_speed = 0;
var fuck_speed = 0;
var fuck_state_text = 0;
var fuck_frames = 0;

var animation_sprite = 0;
var animation_time = 0;
var animation_sprite_time_passed = 0;

var background;
var first_layer;
var sound = Array(10);
var poss_x, poss_y;
var tapped;
var logo_y = -90;
var titlescreen_state = 0;

var touch_state = 0;
var game_mode;

var touch_state_time = 0;
var poss_x_old = 0;
var poss_y_old = 0;

var game_loaded = 0;
var game_started = 0;
var sound_total = 0;

window.onload = function() 
{
	var mc;
	var i;
	first_layer = document.getElementById('canvas');
	background = first_layer.getContext('2d'); // A layer for the background
	
	background.font = "30px Arial";
	background.fillStyle = "white";
	
	mc = new Hammer(first_layer);
	
	first_layer.imageSmoothingEnabled = false;
	
	game_mode = 0;
	
	for (i=0;i<21;i++)
	{
		img_memory[i] = new Image();
	}

	sound[0] = new Howl({ src: ['data/title.webm', 'data/title.ogg', 'data/title.mp3'], loop: true, onload: function() {game_loaded++;}, onloaderror: function() {game_loaded++;}});
	sound[1] = new Howl({ src: ['data/ya.webm', 'data/ya.ogg', 'data/ya.mp3'], onload: function() {game_loaded++;}, onloaderror: function() {game_loaded++;}});
	sound[2] = new Howl({ src: ['data/ya2.webm', 'data/ya2.ogg', 'data/ya2.mp3'], onload: function() {game_loaded++;}, onloaderror: function() {game_loaded++;}});
	sound[3] = new Howl({ src: ['data/ya3.webm', 'data/ya3.ogg', 'data/ya3.mp3'], onload: function() {game_loaded++;}, onloaderror: function() {game_loaded++;}});
	sound[4] = new Howl({ src: ['data/ya4.webm', 'data/ya4.ogg', 'data/ya4.mp3'], onload: function() {game_loaded++;}, onloaderror: function() {game_loaded++;}});
	sound[5] = new Howl({ src: ['data/loading.webm', 'data/loading.ogg', 'data/loading.mp3'], loop: true, onload: function() {game_loaded++;}, onloaderror: function() {game_loaded++;}});
	sound[6] = new Howl({ src: ['data/ending.webm', 'data/ending.ogg', 'data/ending.mp3'], loop: true, onload: function() {game_loaded++;}, onloaderror: function() {game_loaded++;}});
	sound[7] = new Howl({ src: ['data/game.webm', 'data/game.ogg', 'data/game.mp3'], loop: true, onload: function() {game_loaded++;}, onloaderror: function() {game_loaded++;} });
	sound[8] = new Howl({ src: ['data/gameover.webm', 'data/gameover.ogg', 'data/gameover.mp3'], loop: true, onload: function() {game_loaded++;}, onloaderror: function() {game_loaded++;}});
	sound[9] = new Howl({ src: ['data/scary.webm', 'data/scary.ogg', 'data/scary.mp3'], onload: function() {game_loaded++;}, onloaderror: function() {game_loaded++;}});
	sound[10] = new Howl({ src: ['data/fuck.webm', 'data/fuck.ogg', 'data/fuck.mp3'], onload: function() {game_loaded++;}, onloaderror: function() {game_loaded++;},});
	sound[11] = new Howl({ src: ['data/fuck2.webm', 'data/fuck2.ogg', 'data/fuck2.mp3'], onload: function() {game_loaded++;}, onloaderror: function() {game_loaded++;}});
	
	img_memory[0].src = 'data/titlescreen.jpg';
	//img_memory[1].src = 'data/time.jpg';
	//img_memory[2].src = 'data/score.png';
	img_memory[3].src = 'data/tap.png';
	img_memory[4].src = 'data/orban_fucked_sheet_1.jpg';
	img_memory[5].src = 'data/orban_fucked_sheet_2.jpg';
	img_memory[6].src = 'data/orban_fucked_sheet_3.jpg';
	//img_memory[7].src = 'data/orban_icon.png';
	img_memory[8].src = 'data/go.png';
	img_memory[9].src = 'data/tap.png';
	img_memory[10].src = 'data/title_text.png';
	img_memory[11].src = 'data/black.png';
	
	img_memory[12].src = 'data/story1.jpg';
	img_memory[13].src = 'data/story2.jpg';
	img_memory[14].src = 'data/story3.jpg';
	img_memory[15].src = 'data/story4.jpg';
	img_memory[16].src = 'data/story5.jpg';
	
	img_memory[17].src = 'data/gameover2.jpg';
	img_memory[18].src = 'data/death.jpg';

	img_memory[19].src = 'data/story6.jpg';
	img_memory[20].src = 'data/story7.jpg';

	logo_y = -90;
	titlescreen_state = 0;
	game_mode = 0;
	
	(function (window) 
	{
		function mainloop() 
		{
			touch();
			if (game_loaded < 12)
			{
				// Render blackground while still loading
				background.drawImage(img_memory[11], 0, 0);
				background.fillText("Downloading game assets, please wait", 10, 520);
			}
			else
			{
				if (game_started == 0)
				{
					game_started = 1;
					Init_Game_state(0);
				}
				
				switch(game_mode)
				{
					case 0:
						Titlescreen();
					break;
					case 1:
						Story();
					break;
					case 2:
						Game_fuck();
					break;
					case 3:
						End();
					break;
					case 4:
						GameOver();
					break;
					
				}
			}
			tapped = 0;
	    }
	    requestAnimationFrame(mainloop);
		window.setInterval(mainloop, precalculed_fps);
		
	} (window));
	
	/* | 0 is used for rounding numbers */
	mc.on("tap", function(e) 
	{
		var currX, currY;
		currX = e.pointers[0].layerX;
		currY = e.pointers[0].layerY;
		poss_x = (currX*(960/$(first_layer).width())) | 0;
		poss_y = (currY*(540/$(first_layer).height())) | 0;
		tapped = 1;
	});

	mc.on("pan", function(e) 
	{
		var currX, currY;
		currX = e.pointers[0].layerX;
		currY = e.pointers[0].layerY;
		poss_x = (currX*(960/$(first_layer).width())) | 0;
		poss_y = (currY*(540/$(first_layer).height())) | 0;
		tapped = 1;
	});
	
};  

function Init_Game_state(b)
{
	sound[0].stop();
	sound[5].stop();
	sound[6].stop();
	sound[7].stop();
	sound[8].stop();
	switch(b)
	{
		case 0:
			titlescreen_logo0x = -959;
			titlescreen_logo1_x = -350;
			titlescreen_logo2_x = 850;
			timer_game = 0;
			timer_game2 = 0;
			titlescreen_scale = 2;	
			transition_black = 1;
			titlescreen_state = 0;
			animation_titlescreen = 0;
			sound[0].play();
		break;
		case 1:
			transition_black = 1;
			timer_game = 0;
			timer_game2 = 0;
			story_state = 0;
			sound[5].play();
		break;
		case 2:
			transition_black = 1;
			timer_game = 0;
			timer_game2 = 0;
			fuck_state = 0;
			fuck_character = 0;
			fuck_speed = 100;
			fuck_state_text = 0;
			animation_titlescreen = 0;
			fuck_required_speed = 0;
			fuck_frames = 11;
			animation_sprite = 0;
			animation_time = 0;
			animation_sprite_time_passed = 0;
			sound[7].play();
		break;
		case 3:
			transition_black = 1;
			timer_game = 0;
			timer_game2 = 0;
			story_state = 0;
			touch_state = 0;
			sound[6].play();
		break;
		case 4:
			transition_black = 1;
			timer_game = 0;
			timer_game2 = 0;
			fuck_state = 0;
			fuck_character = 0;
			fuck_speed = 100;
			fuck_state_text = 0;
			animation_titlescreen = 0;
			fuck_required_speed = 0;
			fuck_frames = 11;
			animation_sprite = 0;
			animation_time = 0;
			animation_sprite_time_passed = 0;
			sound[8].play();
		break;
	}
	
	game_mode = b;

}


/*
 * Controls
*/

function touch()
{
	poss_x_old = poss_x;
	poss_y_old = poss_y;
	switch(touch_state)
	{
		case 0:
			if (tapped == 1)
			{
				touch_state = 1;
			}
		break;
		case 1:
			touch_state_time++;
			if (touch_state_time > 0)
			{
				touch_state = 2;
				touch_state_time = 0;
			}
		break;
		case 2:
			if (tapped == 0)
			{
				touch_state = 3;
				touch_state_time = 0;
			}
		break;
		case 3:
			touch_state_time++;
			if (touch_state_time > 1)
			{
				touch_state = 0;
				touch_state_time = 0;
			}
		break;
	}
}

function Put_image(a, b, c, d)
{
	background.drawImage(img_memory[a], b, c);
}

function Put_sprite(a, b, c, d, e, f, scale)
{
	background.drawImage(img_memory[a], d*f, 0, d, e, b, c, d, e);
}

function Put_animated_background(a, b, c, d, e, f, scale)
{
	background.drawImage(img_memory[a], 0, e*f, d, e, b, c, d * scale, e * scale);
}

function Titlescreen()
{
	switch(titlescreen_state)
	{
		case 0:		
			if (titlescreen_logo0x > -1)
			{
				titlescreen_logo0x = 0;
				titlescreen_scale = titlescreen_scale - 0.08;
			}
			else
			{
				titlescreen_logo0x += 12;
			}
			
			Put_animated_background(0, titlescreen_logo0x, 0, 960, 540, 0, titlescreen_scale);
			if (transition_black > 0.05)
			{
				transition_black = transition_black - 0.05;
				background.globalAlpha = transition_black;
				Put_animated_background(11, 0, 0, 960, 540, 0, 1);
				background.globalAlpha = 1.0;
			}

			if (titlescreen_scale < 1.09)
			{
				titlescreen_state = 1;
				timer_game = 0;
				transition_black = 0;
			}
		break;
		case 1:	
			Put_animated_background(0, 0, 0, 960, 540, animation_titlescreen, 1);
			
			if (timer_game < 19)
			{
				timer_game += 1;
			}
			
			if (timer_game > 18)
			{
				timer_game2++;
				
				if (timer_game2 > 3 && animation_titlescreen < 9) 
				{
					timer_game2 = 0;
					animation_titlescreen = animation_titlescreen + 1;
				}
			}
			
			if (animation_titlescreen > 8)
			{
				titlescreen_state = 2;
			}
		break;
		case 2:
			Put_animated_background(0, 0, 0, 960, 540, 9, 1);
			background.drawImage(img_memory[10], titlescreen_logo1_x,30);
			background.drawImage(img_memory[3], 200, titlescreen_logo2_x);
			
			if (titlescreen_logo1_x < 20) titlescreen_logo1_x = titlescreen_logo1_x + 10;
			
			if (titlescreen_logo2_x > 440) titlescreen_logo2_x = titlescreen_logo2_x - 5;
			else titlescreen_state = 3;
		break;
		case 3:
			Put_animated_background(0, 0, 0, 960, 540, 9, 1);
			background.drawImage(img_memory[10], titlescreen_logo1_x,30);
			background.drawImage(img_memory[3], 200, titlescreen_logo2_x);
			
			if (touch_state == 1)
			{
				titlescreen_state = 4;
			}
		break;
		case 4:
			Put_animated_background(0, 0, 0, 960, 540, 9, 1);
			background.globalAlpha = transition_black;
			Put_animated_background(11, 0, 0, 960, 540, 0, 1);
			background.globalAlpha = 1.0;
			
			transition_black = transition_black + 0.04;
			if (transition_black > 1.1)
			{
				transition_black = 1;
				titlescreen_state = 5;
			}
		break;
		case 5:
			Init_Game_state(1);
		break;
	}
}


function Story()
{
	background.drawImage(img_memory[11], 0, 0);
	switch(story_state)
	{
		case 0:
			background.drawImage(img_memory[12], 0, 0);
			background.fillText("For 10 years, Viktor Orban ruled the country with complete control", 10, 480);
			background.fillText("of the media and diverting EU money to himself and his friends.", 10, 520);
		break;
		case 1:
			background.drawImage(img_memory[12], 0, 0);
			background.fillText("One day, he was bored and decided to get pictures of women.", 10, 480);
		break;
		case 2:
			background.drawImage(img_memory[13], 0, 0);
			background.fillText("He used the spying tool Pegasus to retrieve a few pictures from", 10, 480);
			background.fillText("journalists he spied on.", 10, 520);
		break;
		case 3:
			background.drawImage(img_memory[13], 0, 0);
			background.fillText("He was looking through the pictures, desperate to find", 10, 480);
			background.fillText("anything he could masturbate to.", 10, 520);
		break;
		case 4:
			background.drawImage(img_memory[14], 0, 0);
			background.fillText("Eventually, he stumpled upon a 14 years old girl.", 10, 480);
			background.fillText("She was the daughter of one of the journalists he spied on.", 10, 520);
		break;
		case 5:
			background.drawImage(img_memory[14], 0, 0);
			background.fillText("Orban couldn't resist and he started to jack off to her.", 10, 480);
		break;
		case 6:
			background.drawImage(img_memory[15], 0, 0);
			background.fillText("Unbeknownst to him however, his phone was also hacked in", 10, 480);
			background.fillText("a counter-espionage operation by Anonymous.", 10, 520);
		break;
		case 7:
			background.drawImage(img_memory[15], 0, 0);
			background.fillText("Anonymous saw what he did and warned the father", 10, 480);
			background.fillText("about what Orban did.", 10, 520);
		break;
		case 8:
			background.drawImage(img_memory[15], 0, 0);
			background.fillText("The father swears to avenge her and make him pay for", 10, 480);
			background.fillText("what he did.", 10, 520);
		break;
		case 9:
			background.drawImage(img_memory[16], 0, 0);
			background.fillText("One day, he was able to sucessfully kidnap him and", 10, 480);
			background.fillText("run away from the police.", 10, 520);
		break;
		case 10:
			background.drawImage(img_memory[16], 0, 0);
			background.fillText("He made a promise to himself :", 10, 480);
			background.fillText("he will pay for Pegasus and what he did...", 10, 520);
		break;
		case 11:
			background.fillText("And he will fucking rape him.", 300, 240);
		break;
		case 12:
			Init_Game_state(2);
		break;
	}
	
	background.fillText("Skip =>", 830, 40);
	
			
	if (timer_game < 10)
	{
		timer_game += 1;
	}
		
	if (touch_state == 1)
	{
		if (poss_x > 820 && poss_y < 70)
		{
			story_state = 12;
		}
		else
		{
			story_state = story_state + 1;
		}
		timer_game = 0;
	}	
	
	if (transition_black > 0.05)
	{
		transition_black = transition_black - 0.05;
		background.globalAlpha = transition_black;
		Put_animated_background(11, 0, 0, 960, 540, 0, 1);
		background.globalAlpha = 1.0;
	}
}

function Game_fuck()
{
	switch(fuck_state)
	{
		case 0:					
			Put_animated_background(4, 0, 0, 960, 540, 0, 1);
			
			background.fillText("Ready ?", 430, 250);
			
			if (transition_black > 0.05)
			{
				transition_black = transition_black - 0.05;
				background.globalAlpha = transition_black;
				Put_animated_background(11, 0, 0, 960, 540, 0, 1);
				background.globalAlpha = 1.0;
			}
			
			timer_game++;
			if (timer_game > 60)
			{
				fuck_state = 1;
				animation_titlescreen = 0;
				timer_game = 0;
				timer_game2 = 0;
				fuck_state_text = 0;
				animation_sprite = 0;
				animation_time = 0;
				animation_sprite_time_passed = 0;
			}
		break;
		case 1:	
			Put_animated_background(4, 0, 0, 960, 540, animation_titlescreen, 1);
			switch(fuck_state_text)
			{
				case 0:
					background.fillText("Tap / Click to rape", 20, 500);
				break;
				case 1:
					background.fillText("Rape Orban faster!", 20, 500);
				break;
				case 2:
					background.fillText("Keep Going !", 20, 500);
				break;
				case 3:
					background.fillText("Do it harder", 20, 500);
				break;
				case 4:
					fuck_state = 2;
					timer_game = 0;
				break;
			}

			background.fillText("Fucking bar", 20, 30);
			background.fillStyle = "green";
			background.fillRect(20, 50, fuck_speed * 2, 30);
			background.fillStyle = "white";
			
			timer_game++;
			timer_game2++;
			
			if (timer_game > 10 - (fuck_required_speed * 3))
			{
				timer_game = 0;
				fuck_speed = fuck_speed - 1;
				if (fuck_speed < 1)
				{
					fuck_speed = 0;
					fuck_state = 6;
					sound[0].stop();
					sound[5].stop();
					sound[6].stop();
					sound[7].stop();
					sound[8].stop();
					sound[9].play();
				}
			}
			
			if (timer_game2 > 200)
			{
				timer_game2 = 0;
				fuck_required_speed = fuck_required_speed + 1;
				fuck_state_text = fuck_state_text + 1;
			}
			
			switch(fuck_character)
			{
				case 0:
					if (touch_state == 1)
					{
						Play_random_noise();
						sound[10].play();
						fuck_character = 1;
						switch(fuck_state_text)
						{
							case 0:
								fuck_current_speed = 1;
							break;
							case 1:
								fuck_current_speed = 2;
							break;
							case 2:
								fuck_current_speed = 3;
							break;
						}
					}
				break;
				case 1:
					animation_titlescreen = animation_titlescreen + fuck_current_speed;
					if (animation_titlescreen > 12)
					{
						animation_titlescreen = 12;
						fuck_character = 2;
					}
				break;
				case 2:
					animation_titlescreen = animation_titlescreen - fuck_current_speed;
					if (animation_titlescreen < 1)
					{
						animation_titlescreen = 0;
						fuck_character = 0;
					}
				break;
			}
			
			if (touch_state == 1)
			{
				fuck_speed++;
				if (fuck_speed > 100)
				{
					fuck_speed = 100;
				}
			}
		break;
		case 2:
			Put_animated_background(4, 0, 0, 960, 540, animation_titlescreen, 1);
			
			background.fillText("NEXT PHASE !", 380, 250);
			
			timer_game++;
			if (timer_game > 60)
			{
				transition_black = 1;
				timer_game = 0;
				timer_game2 = 0;
				fuck_state = 3;
				fuck_character = 0;
				fuck_speed = 100;
				fuck_state_text = 0;
				animation_titlescreen = 0;
				fuck_required_speed = 0;
				fuck_frames = 11;
				animation_sprite_time_passed = 4;
			}
		break;
		case 3:
			Put_animated_background(5, 0, 0, 960, 540, 0, 1);
			
			background.fillText("Ready ?", 430, 250);
			
			if (transition_black > 0.05)
			{
				transition_black = transition_black - 0.05;
				background.globalAlpha = transition_black;
				Put_animated_background(11, 0, 0, 960, 540, 0, 1);
				background.globalAlpha = 1.0;
			}
			
			timer_game++;
			if (timer_game > 60)
			{
				fuck_state = 4;
				animation_titlescreen = 0;
				timer_game = 0;
				timer_game2 = 0;
				fuck_state_text = 0;
			}
		break;
		case 4:
			switch(fuck_state_text)
			{
				case 0:
					Put_animated_background(5, 0, 0, 960, 540, animation_titlescreen, 1);
					background.fillText("Rape Orban", 20, 500);
				break;
				case 1:
					Put_animated_background(5, 0, 0, 960, 540, animation_titlescreen, 1);
					background.fillText("Rape Orban faster!", 20, 500);
				break;
				case 2:
					Put_animated_background(5, 0, 0, 960, 540, animation_titlescreen, 1);
					background.fillText("Keep Going !", 20, 500);
				break;
				case 3:
					Put_animated_background(6, 0, 0, 960, 540, animation_titlescreen, 1);
					background.fillText("CUM !", 20, 500);
				break;
				case 4:
					fuck_state = 5;
					timer_game = 0;
					background.clearRect(0, 0, 960, 540); 
				break;
			}
			
			
			/*Put_animated_background(7, 960 - 240, 540 - 240, 200, 200, animation_sprite, 1);
			
			animation_time++;
			if (animation_time > 10 - (fuck_required_speed * 3))
			{
				animation_sprite++;
				if (animation_sprite > 2)
				{
					animation_sprite = 0;
				}
				animation_time = 0;
			}*/
			
			background.fillText("Fucking bar", 20, 30);
			background.fillStyle = "green";
			background.fillRect(20, 50, fuck_speed * 2, 30);
			background.fillStyle = "white";
			
			timer_game++;
			timer_game2++;
			
			if (timer_game > 10 - (fuck_required_speed * 3))
			{
				timer_game = 0;
				fuck_speed = fuck_speed - 1;
				if (fuck_speed < 1)
				{
					fuck_speed = 0;
					fuck_state = 6;
					sound[0].stop();
					sound[5].stop();
					sound[6].stop();
					sound[7].stop();
					sound[8].stop();
					sound[9].play();
				}
			}
			
			if (timer_game2 > 200)
			{
				timer_game2 = 0;
				fuck_required_speed = fuck_required_speed + 1;
				fuck_state_text = fuck_state_text + 1;
			}
			
			switch(fuck_character)
			{
				case 0:
					if (touch_state == 1)
					{
						Play_random_noise();
						fuck_character = 1;
						switch(fuck_state_text)
						{
							case 0:
								fuck_current_speed = 1;
								animation_sprite_time_passed = 4;
								sound[10].play();
							break;
							case 1:
								fuck_current_speed = 2;
								animation_sprite_time_passed = 3;
								sound[10].play();
							break;
							case 2:
								fuck_current_speed = 2;
								animation_sprite_time_passed = 2;
								sound[10].play();
							break;
							case 3:
								fuck_current_speed = 1;
								animation_sprite_time_passed = 1;
								sound[11].play();
								fuck_frames = 16;
							break;
						}
					}
				break;
				case 1:
					animation_titlescreen = animation_titlescreen + fuck_current_speed;
					if (animation_titlescreen > fuck_frames)
					{
						animation_titlescreen = fuck_frames;
						fuck_character = 2;
					}
				break;
				case 2:
					animation_titlescreen = animation_titlescreen - fuck_current_speed;
					if (animation_titlescreen < 1)
					{
						animation_titlescreen = 0;
						fuck_character = 0;
					}
				break;
			}
			
			if (touch_state == 1)
			{
				fuck_speed++;
				if (fuck_speed > 100)
				{
					fuck_speed = 100;
				}
			}
		break;
		case 5:
			Put_animated_background(6, 0, 0, 960, 540, animation_titlescreen, 1);
			
			background.fillText("SUCCESS !", 380, 250);
			
			timer_game++;
			if (timer_game > 60)
			{
				Init_Game_state(3);
			}
		break;
		case 6:
			background.drawImage(img_memory[17], 0, 0);
			
			timer_game++;
			if (timer_game > 30)
			{
				Init_Game_state(4);
			}
		break;
	}
}

function GameOver()
{
	background.drawImage(img_memory[11], 0, 0);
	background.drawImage(img_memory[8], 344, 50);
	
	background.fillText("He broke free and killed you.", 290, 240);
	
	background.fillText("Continue ?", 405, 400);
		
	if (touch_state == 1)
	{
		Init_Game_state(2);
		timer_game = 0;
	}	
	
	if (transition_black > 0.04)
	{
		transition_black = transition_black - 0.04;
		background.globalAlpha = transition_black;
		Put_animated_background(11, 0, 0, 960, 540, 0, 1);
		background.globalAlpha = 1.0;
	}
}


function End()
{
	background.drawImage(img_memory[11], 0, 0);
	switch(story_state)
	{
		case 0:
			background.drawImage(img_memory[18], 0, 0);
			background.fillText("Finally, Viktor Orban got the punishment he", 10, 480);
			background.fillText("deserved.", 10, 520);
		break;
		case 1:
			background.drawImage(img_memory[18], 0, 0);
			background.fillText("He got fucked for so long, his asshole is bleeding", 10, 480);
			background.fillText("to death.", 10, 520);
		break;
		case 2:
			background.drawImage(img_memory[19], 0, 0);
			background.fillText("He was sent to an hospital due to his severe injuries.", 10, 480);
			background.fillText("But the doctors say he is unlikely to survive.", 10, 520);
		break;
		case 3:
			background.drawImage(img_memory[19], 0, 0);
			background.fillText("Orban fell into coma 3 days later and the doctors", 10, 480);
			background.fillText("were, so far, unable to resuscitate him.", 10, 520);
		break;
		case 4:
			background.drawImage(img_memory[20], 0, 0);
			background.fillText("Finally, you can rest in peace knowing he got", 10, 480);
			background.fillText("just what he was deserved.", 10, 520);
		break;
		case 5:
			background.drawImage(img_memory[20], 0, 0);
			background.fillText("Your daughter has been avenged and", 10, 480);
			background.fillText("Israel stopped their contracts with Hungary.", 10, 520);
		break;
		case 6:
			background.drawImage(img_memory[20], 0, 0);
			background.fillText("But you have the feeling that he may recover from", 10, 480);
			background.fillText("his injuries after all...", 10, 520);
		break;
		case 7:
			background.drawImage(img_memory[20], 0, 0);
			background.fillText("And despite this, the Fidesz party is still around", 10, 480);
			background.fillText("willingly spying on their own citizens.", 10, 520);
		break;
		case 8:
			background.drawImage(img_memory[20], 0, 0);
			background.fillText("The end ?", 10, 480);
		break;
		case 9:
			Init_Game_state(0);
		break;
	}
	

	if (timer_game < 10)
	{
		timer_game += 1;
	}
		
	if (touch_state == 1)
	{
		story_state = story_state + 1;
		timer_game = 0;
	}	
	
	if (transition_black > 0.05)
	{
		transition_black = transition_black - 0.05;
		background.globalAlpha = transition_black;
		Put_animated_background(11, 0, 0, 960, 540, 0, 1);
		background.globalAlpha = 1.0;
	}
}

/*
 * The results screen, when you die.
 * You can either decide to share your highscore (via Twitter)
 * or go back to the titlescreen.
 * 
*/
/*function results_screen()
{
	Put_image(4,gameover_x,202,1);
	Put_image(10,gameover_x+48,320,1);
	
	if (gameover_x < 24) 
	{
		gameover_x+=4;
	}
	else
	{
		Draw_time(200, 0);	
		if (tapped == 1)
		{
			if (poss_x > 69 && poss_x < 264)
			{
				if (poss_y > 280 && poss_y < 350)
				{
					window.open('https://twitter.com/intent/tweet?text=I have fucked Orban real good ! :D #orbanpussyhole');	
				}
				else if (poss_y > 380 && poss_y < 444)
				{
					gameover_x = -272;
					toTitlescreen();
				}
			}
		}
	}
}*/

function Collision(x, y, w, h, x2, y2, w2, h2)
{
	if ((x + w > x2) && (x < x2 + w2) && (y + h > y2) && (y < y2 + h2))
	{
		return 1;
	}	
	return 0;
}

function Play_random_noise()
{
	var result;
	result = rand_a_b(0, 3);
	switch(result)
	{
		case 0:
			sound[1].play();	
		break;
		case 1:
			sound[2].play();	
		break;
		case 2:
			sound[3].play();	
		break;
		case 3:
			sound[4].play();	
		break;
	}
}

function rand_a_b(a, b)
{
	a = Math.ceil(a);
	b = Math.floor(b);
	return Math.floor(Math.random() * (b - a + 1)) + a;
}
