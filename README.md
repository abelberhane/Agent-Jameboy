# Agent-Jameboy 🎮

A classic Snake game with a nostalgic Game Boy-style GUI! Play the timeless snake game with authentic Game Boy aesthetics, complete with animated button presses that simulate the real Game Boy experience.

![Game Boy Snake Game](https://github.com/user-attachments/assets/d45da384-c250-474e-8edc-4f11da2a1161)

## Features

✨ **Game Boy Authentic Design**
- Classic Game Boy color palette (green monochrome display)
- Realistic Game Boy body with D-pad, A/B buttons, START/SELECT buttons
- Speaker grille detail for that authentic look

🎮 **Interactive Gameplay**
- Classic Snake game mechanics
- Grow your snake by eating food
- Avoid walls and self-collision
- Score tracking

🕹️ **Button Press Animations**
- D-pad buttons visually press down when the snake moves in that direction
- Simulates the tactile feedback of a real Game Boy
- Works with both keyboard and mouse controls

## How to Play

### Controls

**Keyboard:**
- `Arrow Keys` or `WASD` - Control snake direction
- `SPACE` or `ENTER` - Start/Restart game

**Mouse:**
- Click the **D-pad buttons** to change direction
- Click **START** button to begin/restart

### Gameplay

1. Open `index.html` in your web browser
2. Press the **START** button or `SPACE` key to begin
3. Use arrow keys or click the D-pad to control your snake
4. Eat the yellow/green food to grow and score points
5. Avoid hitting the walls or your own tail
6. Watch the Game Boy buttons press as your snake moves!

## Getting Started

### Option 1: Direct File Open
Simply open `index.html` in any modern web browser (Chrome, Firefox, Safari, Edge).

### Option 2: Local Server
For the best experience, serve the files using a local web server:

```bash
# Using Python 3
python3 -m http.server 8000

# Using Python 2
python -m SimpleHTTPServer 8000

# Using Node.js (npx)
npx http-server
```

Then navigate to `http://localhost:8000` in your browser.

## Project Structure

```
Agent-Jameboy/
├── index.html      # Main HTML structure with Game Boy GUI
├── styles.css      # Game Boy styling and animations
├── game.js         # Snake game logic and button animations
├── README.md       # This file
└── LICENSE         # Project license
```

## Technical Details

- **Pure HTML/CSS/JavaScript** - No dependencies or frameworks required
- **Canvas-based rendering** - Smooth game graphics
- **Responsive design** - Adapts to different screen sizes
- **Pixelated rendering** - Authentic retro game feel

## Game Features

### Visual Elements
- Authentic Game Boy green monochrome display
- Pixelated graphics for retro aesthetics
- Score display overlay
- Game over screen

### Button Animations
The D-pad buttons automatically animate when the snake moves:
- Moving **right** → Right button presses
- Moving **left** → Left button presses  
- Moving **up** → Up button presses
- Moving **down** → Down button presses

This creates an immersive experience that mimics actually playing on a Game Boy!

## Screenshots

### Initial Game State
![Initial State](https://github.com/user-attachments/assets/d45da384-c250-474e-8edc-4f11da2a1161)

### Gameplay
![Playing](https://github.com/user-attachments/assets/62828867-44a7-4edc-a895-d04402e6de36)

### Direction Changes
![Direction Change](https://github.com/user-attachments/assets/6564264f-dbf5-414a-985f-91a4a7806b0c)

## Browser Compatibility

- ✅ Chrome/Edge (Recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Opera

## Future Enhancements

Possible improvements:
- Sound effects (beeps and boops)
- High score persistence
- Speed increase as snake grows
- Different difficulty levels
- Pause functionality

## License

See [LICENSE](LICENSE) file for details.

## Contributing

Feel free to fork this project and submit pull requests with improvements!

---

Made with ❤️ and nostalgia for the classic Game Boy