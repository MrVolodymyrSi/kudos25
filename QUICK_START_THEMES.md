# Quick Start - Theme System

## For Users

### Switching Themes
1. Look at the **top-right corner** of the chat header
2. You'll see **3 circular buttons** with icons:
   - 🐦 **X icon** = Twitter theme (blue)
   - 👥 **F icon** = Facebook theme (blue)
   - 📸 **Camera icon** = Instagram theme (pink/gradient)
3. **Click any button** to switch themes instantly
4. Your choice is **automatically saved**

### On Mobile
- The buttons are **smaller but still easy to tap**
- Works great on phones from 320px width upwards
- **Touch-friendly** design

## For Developers

### Quick Setup (Already Done)
```html
<!-- In index.html header -->
<div class="theme-toggle" id="themeToggle">
    <button class="theme-btn active" data-theme="twitter">...</button>
    <button class="theme-btn" data-theme="facebook">...</button>
    <button class="theme-btn" data-theme="instagram">...</button>
</div>
```

### JavaScript API
```javascript
// Get current theme
const theme = getTheme(); // 'twitter', 'facebook', or 'instagram'

// Set theme programmatically
setTheme('facebook');

// Initialize on page load (already in init())
initTheme();
```

### CSS Variables
Each theme sets these variables:
```css
body[data-theme="twitter"] {
    --primary-color: #1da1f2;
    --bg-primary: #ffffff;
    --message-bg: #1da1f2;
    /* etc... */
}
```

Use in your CSS:
```css
.my-element {
    background: var(--primary-color);
    color: var(--text-primary);
}
```

### Adding a New Theme
1. Add CSS variables in `styles/themes.css`:
```css
body[data-theme="mynewtheme"] {
    --primary-color: #yourcolor;
    /* ... all other variables ... */
}
```

2. Add button in `index.html`:
```html
<button class="theme-btn" data-theme="mynewtheme" aria-label="My Theme">
    <svg><!-- your icon --></svg>
</button>
```

3. Done! The JavaScript automatically handles it.

### File Structure
```
styles/
├── themes.css           ← All theme definitions
├── responsive.css       ← Theme toggle responsive styles
├── chat-header.css      ← Uses theme variables
├── sidebar.css          ← Uses theme variables
├── chat-list.css        ← Uses theme variables
└── messages.css         ← Uses theme variables

app.js                   ← Theme switching logic
index.html               ← Theme toggle UI
```

## Theme Comparison

| Feature | Twitter | Facebook | Instagram |
|---------|---------|----------|-----------|
| **Primary Color** | Blue #1da1f2 | Blue #0866ff | Pink #e1306c |
| **Message Bubbles** | 8px rounded | 18px rounded | 22px rounded |
| **Search Bar** | Standard | Pill-shaped | Standard |
| **Badge Color** | Blue | Red | Pink |
| **Special Feature** | Clean minimal | Red badges | Gradient messages |
| **Vibe** | Professional | Social | Creative |

## Tips

### For Best Results
- Test all themes after making CSS changes
- Use CSS variables instead of hardcoded colors
- Keep theme definitions in `themes.css`
- Maintain consistent element structure

### Debugging
```javascript
// Check current theme
console.log(document.body.getAttribute('data-theme'));

// Force a theme
setTheme('instagram');

// Check saved theme
console.log(localStorage.getItem('kudos_theme'));
```

## Browser DevTools
1. Open DevTools (F12)
2. Look at `<body>` element
3. See `data-theme="twitter"` (or current theme)
4. Click theme buttons and watch it change

## That's It!
The theme system is **simple**, **powerful**, and **fully functional**. Enjoy! 🎨

