# odin-tic-tac-toe

Project to create a Tic Tac Toe game you can play in your browser


# Reflections

I'm calling the project here, I'm mostly happy with the JS logic and the game works with most functionality, even if some of it is in the console. I've omitted having player names/turns on the display, a reset button, or victory/tie messages on the UI, as I don't feel like practising those, seeing as though the project was about modules/factory functions/IIFEs. We'll see if that comes back to bite me.

I think I followed the spirit of the project by keeping all of the code in factories and having as little global scope as possible, although I ended up exposing so many functions (as well as one major property) out of the factories that it felt like it defeated the point (also I'm still shaky on the correct terminology here).

The other major challenge was deciding how to get the modules(?) to interact. I had a gameController, displayController, and a gameboard. Throughout the project I got more comfortable with deciding which module should do what, although my main issue was that because of the suggested naming of "gameController" and "displayController", I thought they should be 'equal' in terms of hierarchy. With some prompting from chatGPT in review at the end I was able to shift more control from the displayController to the gameController so that it handled most of the logic, but it needed more access to displayController and gameboard to do so.

Overall I think I'm more comfortable with factory functions, IIFEs and modules now.