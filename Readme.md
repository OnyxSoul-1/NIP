# 🌐 No Internet

A nostalgic, interactive "No Internet" webpage inspired by the classic Chrome Dino game. This project features random dynamic backgrounds, ambient music, a custom cursor, and interactive grass that bends away from your mouse.

## ✨ Features

- 🖱️ **Custom Cursor:** A pixel-art Ender Pearl replaces the default mouse cursor.
- 🌿 **Interactive Grass:** HTML5 Canvas draws grass at the bottom of the screen that bends and sways when you move your mouse near it.
- 🎥 **Random Backgrounds:** The page randomly picks between images and videos to display in the background.
- 🎵 **Random Music:** Plays one of 4 MP3 tracks. (Note: Browsers require you to click the screen once to enable audio autoplay).

## 📁 File Structure

To make this work on your own GitHub Pages, you need to upload the following files into the root directory of your repository:

**Code Files:**
- `index.html`
- `style.css`
- `script.js`

**Image Assets:**
- `cursor.png` (Your custom cursor, ideally 32x32 pixels)
- `image1.png` to `image9.png` (Your 9 background images)

**Video Assets:**
- `video1.mp4` to `video4.mp4` (Your 4 background videos)

**Audio Assets:**
- `audio1.mp3` to `audio4.mp3` (Your 4 background songs)

## 🚀 How to Deploy on GitHub Pages

1. Upload all the files listed above to your GitHub repository.
2. Go to your repository **Settings**.
3. On the left sidebar, click on **Pages**.
4. Under **Build and deployment**, set the Source to **Deploy from a branch**.
5. Under **Branch**, select `main` (or `master`) and the `/ (root)` folder.
6. Click **Save**.
7. Wait a minute or two, refresh the page, and your website will be live at `https://yourusername.github.io/your-repo-name/`!

## ⚠️ Important Notes
- **Audio Autoplay:** Modern browsers block audio from playing automatically. You will see a "Click anywhere to enable sound" prompt in the bottom right corner. Once you click, the music will start.
- **File Names:** Ensure all your files are named *exactly* as listed above (lowercase letters, correct file extensions) so the `script.js` can find them.
- **Cursor Size:** If your `cursor.png` is larger than 32x32 or 64x64 pixels, web browsers will ignore it and show the default arrow.
