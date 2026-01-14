# Theme System Documentation

## Overview
The kudos page now features 3 distinct themes inspired by popular social media platforms: Twitter, Facebook, and Instagram. Users can switch between themes using the toggle buttons in the top-right corner of the chat header.

## Themes

### 1. Twitter Theme (Default)
**Colors:**
- Primary: `#1da1f2` (Twitter Blue)
- Background: White with light blue gradients
- Messages: Blue sent bubbles, light gray received
- Badge: Blue notification badges
- Border: Light gray `#eff3f4`

**Design Features:**
- Clean, minimal borders
- Rounded message bubbles (8px)
- Blue accent color throughout
- Light, airy feel

### 2. Facebook Theme
**Colors:**
- Primary: `#0866ff` (Facebook Blue)
- Background: White with light gray gradients
- Messages: Blue sent bubbles, light gray received
- Badge: Red notification badges `#e41e3f`
- Border: Light gray `#e4e6eb`

**Design Features:**
- Rounded search bar (20px radius)
- Highly rounded message bubbles (18px)
- Active chat has light blue background
- Warm, friendly feel

### 3. Instagram Theme
**Colors:**
- Primary: `#e1306c` (Instagram Pink)
- Background: White with very light gray
- Messages: Gradient sent bubbles (Instagram gradient), light gray received
- Badge: Pink notification badges
- Border: Medium gray `#dbdbdb`

**Design Features:**
- Message bubbles with Instagram's signature gradient
- Very rounded bubbles (22px)
- Subtle borders throughout
- Modern, clean aesthetic

## Theme Toggle

### Location
The theme toggle is located in the top-right corner of the chat header, next to the person's name.

### Responsive Behavior
- **Desktop (1024px+)**: Full size buttons (32px) with 8px gap
- **Tablet (768px-1023px)**: Standard size buttons
- **Mobile (375px-767px)**: Smaller buttons (28px) with 4px gap
- **Small Mobile (320px-374px)**: Compact buttons (26px) with 2px gap

### Icons
- Twitter: X logo (new Twitter branding)
- Facebook: Facebook logo
- Instagram: Instagram logo

## Technical Implementation

### CSS Variables
Each theme defines a set of CSS custom properties:
```css
--primary-color: Theme's main accent color
--bg-primary: Main background color
--bg-gradient-start: Gradient start for messages area
--bg-gradient-end: Gradient end for messages area
--text-primary: Main text color
--text-secondary: Secondary text color
--border-color: Border color
--message-bg: Sent message background
--received-message-bg: Received message background
--badge-bg: Notification badge color
--tab-active-color: Active tab color
--notification-bg: Banner background
```

### JavaScript API
```javascript
// Get current theme
getTheme() // Returns: 'twitter', 'facebook', or 'instagram'

// Set theme
setTheme('facebook') // Changes to Facebook theme

// Initialize theme (loads from localStorage)
initTheme()
```

### LocalStorage
Theme preference is saved to localStorage with key `kudos_theme` and persists across sessions.

## Usage

### For Users
1. Click on any of the three theme icons in the top-right
2. The theme changes instantly
3. Your preference is saved automatically

### For Developers

#### Adding a New Theme
1. Add theme CSS variables in `styles/themes.css`:
```css
body[data-theme="yourtheme"] {
    --primary-color: #color;
    --bg-primary: #color;
    /* ... other variables */
}
```

2. Add theme-specific overrides:
```css
body[data-theme="yourtheme"] .element {
    /* custom styles */
}
```

3. Add theme button to HTML:
```html
<button class="theme-btn" data-theme="yourtheme" aria-label="Your Theme">
    <svg><!-- icon --></svg>
</button>
```

#### Customizing Theme Colors
Edit the CSS variables in `styles/themes.css` under the appropriate theme section.

## Browser Support
- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+
- iOS Safari 14+
- Android Chrome 88+

## Accessibility
- Theme buttons have proper `aria-label` attributes
- Active theme button is visually highlighted
- Themes maintain proper contrast ratios
- Keyboard navigable

## Performance
- Theme switching is instant (CSS variables)
- No page reload required
- Minimal JavaScript overhead
- CSS is cached by browser

## File Structure
```
styles/
├── themes.css          # All theme styles and variables
├── chat-header.css     # Updated to use theme variables
├── sidebar.css         # Updated to use theme variables
├── chat-list.css       # Updated to use theme variables
├── messages.css        # Updated to use theme variables
└── responsive.css      # Theme toggle responsive styles
```

## Testing Checklist
- [ ] Toggle works on all screen sizes (320px - 2560px+)
- [ ] Theme persists after page reload
- [ ] All UI elements update when theme changes
- [ ] Icons render correctly in all browsers
- [ ] Active state shows correctly
- [ ] Hover states work properly
- [ ] Touch interaction works on mobile
- [ ] Themes work in landscape and portrait modes

