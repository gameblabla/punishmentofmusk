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
var text_speed = Array(10);
var text_reach = Array(10);

var timer_game = 0;
var timer_game2 = 0;
var animation_titlescreen = 0;

var titlescreen_logo0x = 0;
var titlescreen_logo1_x = 0;
var titlescreen_logo2_x = 0;

var titlescreen_scale = 0;
var transition_black = 1;

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
var sound_total = 0;

var keyboard = 0;

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
	
	for (i=0;i<23;i++)
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
	
	sound[12] = new Howl({ src: ['snd/text.webm', 'snd/text.ogg', 'snd/text.mp3'], onload: function() {game_loaded++;}, onloaderror: function() {game_loaded++;}});
	sound[13] = new Howl({ src: ['snd/cur2.webm', 'snd/cur2.ogg', 'snd/cur2.mp3'], onload: function() {game_loaded++;}, onloaderror: function() {game_loaded++;}});
	sound[14] = new Howl({ src: ['snd/confirm.webm', 'snd/confirm.ogg', 'snd/confirm.mp3'], onload: function() {game_loaded++;}, onloaderror: function() {game_loaded++;}});
	
	img_memory[0].src = 'data/titlescreen.jpg';
	//img_memory[1].src = 'data/time.jpg';
	//img_memory[2].src = 'data/score.png';
	img_memory[3].src = 'data/tap.png';
	img_memory[4].src = 'data/sprites.jpg';
	/*img_memory[5].src = 'data/orban_fucked_sheet_2.jpg';
	img_memory[6].src = 'data/orban_fucked_sheet_3.jpg';*/
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
	img_memory[21].src = 'data/story8.jpg';
	img_memory[22].src = 'data/story10.jpg';
	
	logo_y = -90;
	titlescreen_state = 0;
	
	// Game assets loading screen
	game_mode = 5;
	
	(function (window) 
	{
		function mainloop() 
		{
			touch();
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
				case 5:
					// Render blackground while still loading
					background.drawImage(img_memory[11], 0, 0);
					background.fillText("Downloading game assets, please wait", 10, 520);
					if (game_loaded > 13)
					{
						Init_Game_state(0);
					}
				break;
			}
			tapped = 0;
			if (keyboard > 0) keyboard = 0;
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


window.addEventListener("keydown", function(evt) {
	keyboard = evt.keyCode;
}, this);

window.addEventListener("keyup", function(evt) {
	if (keyboard > 0) keyboard = 0;
}, this);

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
			text_speed[0] = 0;
			text_reach[0] = 0;
			text_speed[1] = 0;
			text_reach[1] = 0;
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

function truncateString(str, num) {
  if (str.length <= num) {
    return str
  }
  return str.slice(0, num) + '...'
}



/* This is for drawing our text slowly, kind of like in the JRPGs with dialog boxes.
 * There's a text speed variable for each line.
 * */
function Put_text(a, b, c, d)
{
	/* If we start drawing from line 1,
	 * check to see first if drawing the preceding line has been completed.
	 * If not, then we just ignore this function.
	 * */
	if (text_after_line > 0)
	{
		if (text_reach[text_after_line-1] == 0)
		{
			return;
		}
	}
	
	/*
	 * text_speed should not exceed the string's length. 
	*/
	if (text_speed[text_after_line] >= a.length)
	{
		text_speed[text_after_line] = a.length;
		text_reach[text_after_line] = 1;
	}
	else
	{
		text_speed[text_after_line] += 1.0;
		sound[12+d].play();
	}
	
	/* Actually truncating the string before drawing it */
	var myTruncatedString = a.substring(0,Math.round(text_speed[text_after_line]));
	background.fillText(myTruncatedString, b, c);
	
	/* Increment text_after_line global variable.
	 * We need to make sure to actually set this to 0 before we start using Put_text in a loop. */
	text_after_line++;
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
			
			if (timer_game < 11)
			{
				timer_game += 1;
			}
			
			if (timer_game > 10)
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
			Put_animated_background(0, 0, 0, 960, 540, 0, 1);
			background.drawImage(img_memory[10], titlescreen_logo1_x,30);
			background.drawImage(img_memory[3], 200, titlescreen_logo2_x);
			
			if (titlescreen_logo1_x < 20) titlescreen_logo1_x = titlescreen_logo1_x + 10;
			
			if (titlescreen_logo2_x > 440) titlescreen_logo2_x = titlescreen_logo2_x - 5;
			else titlescreen_state = 3;
		break;
		case 3:
			Put_animated_background(0, 0, 0, 960, 540, 0, 1);
			background.drawImage(img_memory[10], titlescreen_logo1_x,30);
			background.drawImage(img_memory[3], 200, titlescreen_logo2_x);
			
			if (touch_state == 1 || (keyboard == 13 || keyboard == 17 || keyboard == 32))
			{
				sound[0].stop();
				sound[14].play();
				titlescreen_state = 4;
			}
		break;
		case 4:
			Put_animated_background(0, 0, 0, 960, 540, 0, 1);
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
	text_after_line = 0;
	background.drawImage(img_memory[11], 0, 0);
	switch(story_state)
	{
		case 0:
			background.drawImage(img_memory[12], 0, 0);
			Put_text("Elon Musk :", 10, 480, 0);
			Put_text("Zzzzzz....", 10, 520, 0);
		break;
		case 1:
			background.drawImage(img_memory[13], 0, 0);
			Put_text("Uugggh... I feel kind of bored today.", 10, 480, 0);
		break;
		case 2:
			background.drawImage(img_memory[14], 0, 0);
			Put_text("I'm bored, i feel like buying twatter !", 10, 480, 0);
			Put_text("...", 10, 520, 0);
		break;
		case 3:
			background.drawImage(img_memory[15], 0, 0);
			Put_text("I'll save twatter and the entire world", 10, 480, 0);
			Put_text("from EVIL, WOKE PEOPLE !!!", 10, 520, 0);
		break;
		case 4:
			background.drawImage(img_memory[16], 0, 0);
			Put_text("Who cares about happens in Texas?", 10, 480, 0);
			Put_text("I gotta return the favour to my friend Greg !", 10, 520, 0);
		break;
		case 5:
			background.drawImage(img_memory[19], 0, 0);
			Put_text("NPCs : WOW !!! ELON MUSK IS OUR HERO !!! ", 10, 480, 0);
			Put_text("ANYONE WHO OPPOSES HIM IS WOKE!", 10, 520, 0);
		break;
		case 6:
			background.drawImage(img_memory[16], 0, 0);
			Put_text("I know right ? No one can stop me", 10, 480, 0);
			Put_text("and my meme investors.", 10, 520, 0);
		break;
		case 7:
			background.drawImage(img_memory[16], 0, 0);
			Put_text("If i have to, i would even go as far", 10, 480, 0);
			Put_text("as beating up Putin.", 10, 520, 0);
		break;
		case 8:
			background.drawImage(img_memory[20], 0, 0);
			Put_text("Putin : !!!", 10, 480, 1);
			Put_text("What did you say about me ???", 10, 520, 1);
			titlescreen_scale = 2.0;
		break;
		case 9:
			//background.drawImage(img_memory[21], 0, 0);
			Put_animated_background(21, 0, 0, 960, 540, 0, titlescreen_scale);
			if (titlescreen_scale > 1.00)
			{
				titlescreen_scale = titlescreen_scale - 0.05;
			}
			Put_text("Hmpf ! Come fight me then.", 10, 480, 1);
		break;
		case 10:
			background.drawImage(img_memory[16], 0, 0);
			Put_text("Well erm... Shit.", 10, 480, 0);
		break;
		case 11:
			Put_text("*Bam !*", 400, 240, 0);
		break;
		case 12:
			Put_text("Elon Musk : Ooof... What's going on ?", 10, 480, 0);
		break;
		case 13:
			//background.drawImage(img_memory[21], 0, 0);
			Put_animated_background(22, 0, 0, 960, 540, 0, titlescreen_scale);
			if (titlescreen_scale > 1.00)
			{
				titlescreen_scale = titlescreen_scale - 0.05;
			}
			Put_text("Wait...", 10, 480, 0);
			Put_text("Why do i have a vagina ?", 10, 520, 0);
		break;
		case 14:
			//background.drawImage(img_memory[21], 0, 0);
			Put_animated_background(20, 0, 0, 960, 540, 0, titlescreen_scale);
			if (titlescreen_scale > 1.00)
			{
				titlescreen_scale = titlescreen_scale - 0.05;
			}
			Put_text("Because the Kremlin gave you one.", 10, 480, 1);
		break;
		case 15:
			background.drawImage(img_memory[20], 0, 0);
			Put_text("Time for your lesson.", 10, 480, 1);
		break;
		case 16:
			Init_Game_state(2);
		break;
	}
	
	background.fillText("Skip =>", 830, 40);
			
	if (timer_game < 10)
	{
		timer_game += 1;
	}
		
	if (touch_state == 1 || (keyboard == 13 || keyboard == 17 || keyboard == 32))
	{
		if (poss_x > 820 && poss_y < 70)
		{
			story_state = 16;
		}
		else
		{
			story_state = story_state + 1;
		}
		timer_game = 0;
		text_speed[0] = 0;
		text_reach[0] = 0;
		text_speed[1] = 0;
		text_reach[1] = 0;
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
					background.fillText("Rape Elon Musk faster!", 20, 500);
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

			background.fillText("Rape life bar", 20, 30);
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
					if (touch_state == 1 || (keyboard == 13 || keyboard == 17 || keyboard == 32))
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
			
			if (touch_state == 1 || (keyboard == 13 || keyboard == 17 || keyboard == 32))
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
	
	background.fillText("Elon broke free and killed you.", 290, 240);
	background.fillText("Starlink was a success in Ukraine", 262, 280);
	background.fillText("and killed all of the russians there.", 260, 320);
	background.fillText("Continue ?", 405, 440);
		
	if (touch_state == 1 || (keyboard == 13 || keyboard == 17 || keyboard == 32))
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
	text_after_line = 0;
	switch(story_state)
	{
		case 0:
			background.drawImage(img_memory[18], 0, 0);
			Put_text("Elon Musk is bleeding due to being raped way", 10, 480, 0);
			Put_text("too hard by Vlad Putin.", 10, 520, 0);
		break;
		case 1:
			background.drawImage(img_memory[19], 0, 0);
			Put_text("Elon Musk Simps : What did you do to him ?", 10, 480, 0);
			Put_text("He was our saviour against WOKE PEOPLE!", 10, 520, 0);
		break;
		case 2:
			background.drawImage(img_memory[20], 0, 0);
			Put_text("Putin : I regret to inform you but Elon Musk", 10, 480, 1);
			Put_text("is now transgender.", 10, 520, 1);
		break;
		case 3:
			background.drawImage(img_memory[19], 0, 0);
			Put_text("Elon Musk Simps : LIES !!! You killed him", 10, 480, 0);
			Put_text("because you WORSHIP BLACK PEOPLE !!!", 10, 520, 0);
		break;
		case 4:
			background.drawImage(img_memory[20], 0, 0);
			Put_text("Putin : You should take a closer look", 10, 480, 1);
			Put_text("at a photo we took of him then.", 10, 520, 1);
		break;
		case 5:
			background.drawImage(img_memory[22], 0, 0);
			Put_text("... See ?", 10, 480, 1);
			Put_text("Elon Musk has a vagina.", 10, 520, 1);
		break;
		case 6:
			background.drawImage(img_memory[19], 0, 0);
			Put_text("Elon Musk Simps : ....", 10, 480, 0);
			Put_text("..............", 10, 520, 0);
		break;
		case 7:
			background.drawImage(img_memory[19], 0, 0);
			Put_text("Elon Musk Simps : Elon Musk LIED to US.", 10, 480, 0);
			Put_text("..............", 10, 520, 0);
		break;
		case 8:
			background.drawImage(img_memory[19], 0, 0);
			Put_text("Elon Musk Simps : Elon Musk is not our.", 10, 480, 0);
			Put_text("HERO.", 10, 520, 0);
		break;
		case 9:
			background.drawImage(img_memory[19], 0, 0);
			Put_text("Elon Musk is #NotOurMan !", 10, 480, 0);
		break;
		case 10:
			background.drawImage(img_memory[19], 0, 0);
			Put_text("Former Simps : Come on guises, let's retreat", 10, 480, 0);
			Put_text("back to our mancaves and eat more junk.", 10, 520, 0);
		break;
		case 11:
			background.drawImage(img_memory[20], 0, 0);
			Put_text("Putin : ....", 10, 480, 1);
		break;
		case 12:
			Put_text("In the end, not only Elon Musk lost his asshole", 10, 200, 0);
			Put_text("to Putin, but also lost his worshippers.", 10, 240, 0);
			Put_text("Bitch ass cried all day because Musk was no longer the", 10, 320, 0);
			Put_text("spotlight of this world and everyone died of type 2 diabetes", 10, 360, 0);
			Put_text("before they could go on Mars.", 10, 400, 0);
		break;
		case 13:
			Put_text("The end", 10, 440, 0);
		break;
		case 14:
			Init_Game_state(0);
		break;
	}
	

	if (timer_game < 10)
	{
		timer_game += 1;
	}
		
	if (touch_state == 1 || (keyboard == 13 || keyboard == 17 || keyboard == 32))
	{
		story_state = story_state + 1;
		timer_game = 0;
		timer_game = 0;
		for (let i = 0; i < text_speed.length; i++) 
		{
		  	text_speed[i] = 0;
			text_reach[i] = 0;
		}
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
