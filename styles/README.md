# Styles Directory

This directory contains modular CSS files for the Kudos Chat Application.

## File Structure

```
styles/
├── reset.css          - Base styles, resets, and container
├── scrollbar.css      - Custom scrollbar styling
├── sidebar.css        - Sidebar, search box, and tabs navigation
├── chat-list.css      - Chat list items and related components
├── chat-header.css    - Chat header and notification banner
├── messages.css       - Messages, bubbles, and date dividers
├── components.css     - Reusable components (avatars, indicators)
└── responsive.css     - Media queries and responsive breakpoints
```

## Purpose of Each File

### reset.css
- Global resets and box-sizing
- Body and container base styles
- Font family definition

### scrollbar.css
- Custom webkit scrollbar styling
- Scrollbar track and thumb colors
- Hover states

### sidebar.css
- Sidebar container layout
- Search box with icon
- Tabs navigation with active states

### chat-list.css
- Chat list container and items
- Chat item name, preview, time, badge
- Read/unread states
- Hover and active states

### chat-header.css
- Chat header layout
- Chat name and avatar
- Notification banner

### messages.css
- Messages container with gradient background
- Message bubbles (sent/received)
- Message text and timestamps
- Date dividers
- Empty state

### components.css
- Avatar wrapper
- Online indicator
- Other reusable UI components

### responsive.css
- Mobile/tablet breakpoints
- Responsive layout adjustments

## Usage

The main `styles.css` file imports all modular files:

```css
@import url('styles/reset.css');
@import url('styles/scrollbar.css');
@import url('styles/sidebar.css');
@import url('styles/chat-list.css');
@import url('styles/chat-header.css');
@import url('styles/messages.css');
@import url('styles/components.css');
@import url('styles/responsive.css');
```

## Benefits

- **Maintainability**: Each file focuses on a specific component or feature
- **Readability**: Easy to locate and update specific styles
- **Scalability**: Simple to add new features in dedicated files
- **Organization**: Clear separation of concerns
- **Collaboration**: Multiple developers can work on different files simultaneously

