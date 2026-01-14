// DOM Elements
const chatList = document.getElementById('chatList');
const messages = document.getElementById('messages');
const chatName = document.getElementById('chatName');
const chatAvatar = document.getElementById('chatAvatar');
const notificationBanner = document.getElementById('notificationBanner');
const searchInput = document.getElementById('searchInput');

// State
let selectedPersonId = null;
let searchQuery = '';
let isMobile = window.innerWidth < 768;

// LocalStorage key for read state
const STORAGE_KEY = 'kudos_read_state';

// Get read state from localStorage
function getReadState() {
    try {
        const state = localStorage.getItem(STORAGE_KEY);
        return state ? JSON.parse(state) : {};
    } catch (e) {
        return {};
    }
}

// Mark a person's kudos as read
function markAsRead(personId) {
    const readState = getReadState();
    readState[personId] = true;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(readState));
}

// Check if a person's kudos have been read
function isRead(personId) {
    const readState = getReadState();
    return readState[personId] === true;
}

// Mobile view switching
function showChatView() {
    if (isMobile) {
        document.querySelector('.sidebar').classList.add('hidden');
        document.querySelector('.chat-area').classList.add('active');
    }
}

function showSidebarView() {
    if (isMobile) {
        document.querySelector('.sidebar').classList.remove('hidden');
        document.querySelector('.chat-area').classList.remove('active');
    }
}

// Handle window resize
function handleResize() {
    const wasMobile = isMobile;
    isMobile = window.innerWidth < 768;

    if (wasMobile && !isMobile) {
        // Switching from mobile to desktop
        document.querySelector('.sidebar').classList.remove('hidden');
        document.querySelector('.chat-area').classList.remove('active');
    }
}

// Get preview text (first line, no newlines)
function getPreview(text) {
    return text.split('\n')[0].substring(0, 50) + (text.length > 50 ? '...' : '');
}

// Render chat list
function renderChatList() {
    // Filter data by search query
    const filteredData = kudosData.filter(person =>
        person.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Show empty state if no results
    if (filteredData.length === 0) {
        chatList.innerHTML = `
            <div class="empty-search-state">
                <img src="assets/empty-search.svg" alt="No results" class="empty-search-icon">
                <h3>No chat with such user</h3>
                <p>To start chatting, go ahead and find someone interesting.</p>
            </div>
        `;
        return;
    }

    chatList.innerHTML = filteredData.map(person => {
        const read = isRead(person.id);
        return `
        <li class="chat-item ${person.id === selectedPersonId ? 'active' : ''} ${read ? 'read' : ''}" 
            data-id="${person.id}">
            <img src="${person.avatar}" alt="${person.name}" class="avatar">
            <div class="chat-item-info">
                <div class="chat-item-header">
                    <span class="chat-item-name">${person.name}</span>
                    <span class="chat-item-time">Jan 7</span>
                </div>
                <p class="chat-item-preview">${getPreview(person.kudos[0]?.text || 'No kudos yet')}</p>
            </div>
            ${!read ? `<span class="chat-item-badge">${person.kudos.length}</span>` : ''}
        </li>
    `}).join('');

    // Add click handlers
    document.querySelectorAll('.chat-item').forEach(item => {
        item.addEventListener('click', () => {
            const id = parseInt(item.dataset.id);
            selectPerson(id);
        });
    });
}

// Select a person and show their kudos
function selectPerson(id) {
    selectedPersonId = id;
    const person = kudosData.find(p => p.id === id);

    if (!person) return;

    // Mark as read and update the list
    markAsRead(id);

    // Update header
    chatName.textContent = person.name;
    chatAvatar.src = person.avatar;
    chatAvatar.alt = person.name;

    // Show notification banner
    if (notificationBanner) {
        notificationBanner.classList.remove('hidden');
    }

    // Re-render chat list to update read state
    renderChatList();

    // Render messages
    renderMessages(person.kudos, person.avatar);

    // Show chat view on mobile
    showChatView();
}

// Format text with line breaks
function formatText(text) {
    return text
        .replace(/\n/g, '<br>')
        .replace(/---/g, '<hr class="message-separator">');
}

// Render kudos messages
function renderMessages(kudos, avatarSrc) {
    if (kudos.length === 0) {
        messages.innerHTML = `
            <div class="empty-state">
                <h3>No kudos yet</h3>
                <p>Be the first to send some appreciation!</p>
            </div>
        `;
        return;
    }

    messages.innerHTML = `
        <div class="date-divider"><span>January 7, 2026</span></div>
        ${kudos.map((kudo) => `
            <div class="message received">
                <img src="${avatarSrc}" alt="" class="avatar">
                <div class="message-bubble">
                    <div class="message-text">${formatText(kudo.text)}</div>
                    <div class="message-time">3:42 pm</div>
                </div>
            </div>
        `).join('')}
    `;
}

// Initialize
function init() {
    renderChatList();

    // Select first person by default (only on desktop)
    if (kudosData.length > 0 && !isMobile) {
        selectPerson(kudosData[0].id);
    }

    // Add search input event listener
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value;
            renderChatList();
        });
    }

    // Add back button handler for mobile
    const chatHeader = document.querySelector('.chat-header');
    if (chatHeader) {
        chatHeader.addEventListener('click', (e) => {
            if (isMobile && e.target === chatHeader) {
                showSidebarView();
            }
        });
    }

    // Handle window resize
    window.addEventListener('resize', handleResize);
}

// Run on DOM ready
document.addEventListener('DOMContentLoaded', init);
