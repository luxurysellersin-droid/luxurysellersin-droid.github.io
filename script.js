// Sample transcript data
const transcriptData = [
  {
    id: 1,
    speaker: "John Doe",
    timestamp: "00:01:23",
    text: "Welcome everyone to today's meeting. We'll be discussing the quarterly results and our upcoming product launch.",
    category: "meeting"
  },
  {
    id: 2,
    speaker: "Sarah Smith",
    timestamp: "00:02:15",
    text: "Thank you John. I'd like to start by reviewing our Q3 performance metrics. We've seen a 15% increase in user engagement.",
    category: "meeting"
  },
  {
    id: 3,
    speaker: "Mike Johnson",
    timestamp: "00:03:42",
    text: "That's excellent news, Sarah. The marketing campaign we launched in August seems to be paying off.",
    category: "meeting"
  },
  {
    id: 4,
    speaker: "Lisa Chen",
    timestamp: "00:05:18",
    text: "I have some concerns about the technical implementation timeline. We might need to adjust our launch date.",
    category: "technical"
  },
  {
    id: 5,
    speaker: "John Doe",
    timestamp: "00:06:33",
    text: "Let's discuss the technical challenges in detail. What specific issues are we facing?",
    category: "technical"
  },
  {
    id: 6,
    speaker: "David Wilson",
    timestamp: "00:08:07",
    text: "The API integration is taking longer than expected. We're about two weeks behind schedule.",
    category: "technical"
  },
  {
    id: 7,
    speaker: "Sarah Smith",
    timestamp: "00:09:21",
    text: "Should we consider pushing the launch to next month? We want to ensure quality over speed.",
    category: "meeting"
  },
  {
    id: 8,
    speaker: "John Doe",
    timestamp: "00:10:45",
    text: "I agree with Sarah. Let's reconvene next week with a revised timeline and action plan.",
    category: "meeting"
  }
];

// Initialize the transcript functionality
class TranscriptManager {
  constructor(data) {
    this.originalData = [...data];
    this.filteredData = [...data];
    this.sortAscending = true;
    this.init();
  }

  init() {
    this.renderTranscript();
    this.updateStats();
    this.bindEvents();
  }

  bindEvents() {
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const sortBtn = document.getElementById('sortBtn');

    searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));
    categoryFilter.addEventListener('change', (e) => this.handleCategoryFilter(e.target.value));
    sortBtn.addEventListener('click', () => this.handleSort());
  }

  handleSearch(query) {
    const category = document.getElementById('categoryFilter').value;
    this.filteredData = this.originalData.filter(entry => {
      const matchesSearch = entry.text.toLowerCase().includes(query.toLowerCase()) ||
                           entry.speaker.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = !category || entry.category === category;
      return matchesSearch && matchesCategory;
    });
    this.renderTranscript();
    this.updateStats();
  }

  handleCategoryFilter(category) {
    const query = document.getElementById('searchInput').value;
    this.filteredData = this.originalData.filter(entry => {
      const matchesSearch = entry.text.toLowerCase().includes(query.toLowerCase()) ||
                           entry.speaker.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = !category || entry.category === category;
      return matchesSearch && matchesCategory;
    });
    this.renderTranscript();
    this.updateStats();
  }

  handleSort() {
    this.sortAscending = !this.sortAscending;
    this.filteredData.sort((a, b) => {
      const timeA = this.parseTime(a.timestamp);
      const timeB = this.parseTime(b.timestamp);
      return this.sortAscending ? timeA - timeB : timeB - timeA;
    });
    this.renderTranscript();
    
    const sortBtn = document.getElementById('sortBtn');
    sortBtn.textContent = this.sortAscending ? 'Sort by Time ↑' : 'Sort by Time ↓';
  }

  parseTime(timeString) {
    const [hours, minutes, seconds] = timeString.split(':').map(Number);
    return hours * 3600 + minutes * 60 + seconds;
  }

  renderTranscript() {
    const container = document.getElementById('transcriptContent');
    
    if (this.filteredData.length === 0) {
      container.innerHTML = '<div class="no-results">No transcript entries found matching your criteria.</div>';
      return;
    }

    container.innerHTML = this.filteredData.map(entry => `
      <div class="transcript-entry" data-category="${entry.category}">
        <div class="entry-header">
          <span class="speaker">${entry.speaker}</span>
          <span class="timestamp">${entry.timestamp}</span>
          <span class="category-badge category-${entry.category}">${entry.category}</span>
        </div>
        <div class="entry-text">${entry.text}</div>
      </div>
    `).join('');
  }

  updateStats() {
    const totalEntries = this.filteredData.length;
    const uniqueSpeakers = new Set(this.filteredData.map(entry => entry.speaker)).size;
    const lastEntry = this.filteredData[this.filteredData.length - 1];
    const totalDuration = lastEntry ? lastEntry.timestamp : '0:00';

    document.getElementById('totalEntries').textContent = totalEntries;
    document.getElementById('totalSpeakers').textContent = uniqueSpeakers;
    document.getElementById('totalDuration').textContent = totalDuration;
  }
}

// Initialize the transcript manager when the page loads
document.addEventListener('DOMContentLoaded', () => {
  new TranscriptManager(transcriptData);
});
