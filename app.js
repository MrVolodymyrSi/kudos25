// DOM Elements
const chatList = document.getElementById('chatList');
const messages = document.getElementById('messages');
const chatName = document.getElementById('chatName');
const chatAvatar = document.getElementById('chatAvatar');

// State
let selectedPersonId = null;

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

// Get preview text (first line, no newlines)
function getPreview(text) {
    return text.split('\n')[0].substring(0, 50) + (text.length > 50 ? '...' : '');
}

// Render chat list
function renderChatList() {
    chatList.innerHTML = kudosData.map(person => {
        const read = isRead(person.id);
        return `
        <li class="chat-item ${person.id === selectedPersonId ? 'active' : ''} ${read ? 'read' : ''}" 
            data-id="${person.id}">
            <img src="${person.avatar}" alt="${person.name}" class="avatar">
            <div class="chat-item-info">
                <div class="chat-item-header">
                    <span class="chat-item-name">${person.name}</span>
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

    // Re-render chat list to update read state
    renderChatList();

    // Render messages
    renderMessages(person.kudos);
}

// Format text with line breaks
function formatText(text) {
    return text
        .replace(/\n/g, '<br>')
        .replace(/---/g, '<hr style="border: none; border-top: 1px solid #e4e6eb; margin: 8px 0;">');
}

// Render kudos messages
function renderMessages(kudos) {
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
        <div class="date-divider"><span>🏆 Highlights & Wins</span></div>
        ${kudos.map(kudo => `
            <div class="message received">
                <div class="message-text">${formatText(kudo.text)}</div>
            </div>
        `).join('')}
    `;
}

// Initialize
function init() {
    renderChatList();

    // Select first person by default
    if (kudosData.length > 0) {
        selectPerson(kudosData[0].id);
    }
}

// Run on DOM ready
document.addEventListener('DOMContentLoaded', init);
