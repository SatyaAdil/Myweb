console.log("Aplikasi dimuat");


// DOM Elements
const sidebar = document.getElementById('sidebar');
const mainContent = document.getElementById('mainContent');
const sidebarCollapseBtn = document.getElementById('sidebarCollapseBtn');
const menuToggleBtn = document.getElementById('menuToggleBtn');
const sidebarOverlay = document.getElementById('sidebarOverlay');


const searchInput = document.getElementById('searchInput');
const sidebarLinks = document.querySelectorAll('.sidebar-link');
const darkModeToggle = document.getElementById('darkModeToggle');
const dashboardSection = document.getElementById('dashboard-section');
const tugasSection = document.getElementById('tugas-section');
const tambahSection = document.getElementById('tambah-section');
const taskList = document.getElementById('taskList');
const upcomingTasks = document.getElementById('upcomingTasks');
const emptyState = document.getElementById('emptyState');
const totalTasksElement = document.getElementById('totalTasks');
const ongoingTasksElement = document.getElementById('ongoingTasks');
const completedTasksElement = document.getElementById('completedTasks');
const addTaskBtn = document.getElementById('addTaskBtn');
const editModal = document.getElementById('editModal');
const confirmDeleteModal = document.getElementById('confirmDeleteModal');
const tabButtons = document.querySelectorAll('.tab-btn');

// State variables
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let currentTaskId = null;
let currentFilter = 'semua';
let isDarkMode = localStorage.getItem('darkMode') === 'true';

// Initialize the application
function initApp() {
    renderTasks();
    updateDashboardSummary();
    setupEventListeners();
    applyDarkMode();
}

// Apply dark mode if enabled
function applyDarkMode() {
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        darkModeToggle.querySelector('.sidebar-icon').classList.remove('fa-moon');
        darkModeToggle.querySelector('.sidebar-icon').classList.add('fa-sun');
        darkModeToggle.querySelector('.sidebar-text').textContent = 'Mode Terang';
    } else {
        document.body.classList.remove('dark-mode');
        darkModeToggle.querySelector('.sidebar-icon').classList.remove('fa-sun');
        darkModeToggle.querySelector('.sidebar-icon').classList.add('fa-moon');
        darkModeToggle.querySelector('.sidebar-text').textContent = 'Mode Gelap';
    }
}

// Setup all event listeners
function setupEventListeners() {
    // Sidebar toggle
    sidebarCollapseBtn.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
        localStorage.setItem('sidebarCollapsed', sidebar.classList.contains('collapsed'));
    });

    // Tutup sidebar saat overlay diklik
    sidebarOverlay.addEventListener('click', () => {
    sidebar.classList.remove('open');
    sidebarOverlay.classList.remove('show');
    mainContent.classList.remove('sidebar-open');
});


    // Mobile menu toggle
        menuToggleBtn.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    sidebarOverlay.classList.toggle('show');
    mainContent.classList.toggle('sidebar-open');
});


    // Dark mode toggle
    darkModeToggle.addEventListener('click', () => {
        isDarkMode = !isDarkMode;
        localStorage.setItem('darkMode', isDarkMode);
        applyDarkMode();
    });

    // Navigation links
    sidebarLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if (link.id === 'darkModeToggle') return; // Skip for dark mode toggle
            
            e.preventDefault();
            const target = link.getAttribute('href').substring(1);
            
            // Hide all sections
            dashboardSection.classList.add('hidden');
            tugasSection.classList.add('hidden');
            tambahSection.classList.add('hidden');
            
            // Show selected section
            if (target === 'dashboard') {
                dashboardSection.classList.remove('hidden');
            } else if (target === 'tugas') {
                tugasSection.classList.remove('hidden');
            } else if (target === 'tambah') {
                tambahSection.classList.remove('hidden');
            }
            
            // Update active state
            sidebarLinks.forEach(l => l.parentElement.classList.remove('active'));
            link.parentElement.classList.add('active');
            
            // Close sidebar on mobile
            if (window.innerWidth <= 991) {
                sidebar.classList.remove('open');
            }
        });
    });

    // Task tabs
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            tabButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            renderTasks();
        });
    });

    // Add task button
    addTaskBtn.addEventListener('click', addNewTask);

    // Search functionality
    searchInput.addEventListener('input', () => {
        renderTasks();
    });

    // Close modals with X button
    document.querySelectorAll('.close-modal').forEach(closeBtn => {
        closeBtn.addEventListener('click', () => {
            editModal.classList.remove('show');
            confirmDeleteModal.classList.remove('show');
        });
    });

    // Cancel edit button
    document.getElementById('cancelEditBtn').addEventListener('click', () => {
        editModal.classList.remove('show');
    });

    // Save edit button
    document.getElementById('saveEditBtn').addEventListener('click', saveTaskEdit);

    // Progress slider value display
    document.getElementById('editProgress').addEventListener('input', function() {
        document.getElementById('progressValue').textContent = this.value + '%';
    });

    // Cancel delete button
    document.getElementById('cancelDeleteBtn').addEventListener('click', () => {
        confirmDeleteModal.classList.remove('show');
    });

    // Confirm delete button
    document.getElementById('confirmDeleteBtn').addEventListener('click', () => {
        if (currentTaskId !== null) {
            deleteTask(currentTaskId);
            confirmDeleteModal.classList.remove('show');
        }
    });

    // Apply sidebar state from localStorage
    if (localStorage.getItem('sidebarCollapsed') === 'true') {
        sidebar.classList.add('collapsed');
    }
}

// Add a new task
function addNewTask() {
    const taskTitle = document.getElementById('taskInput').value.trim();
    const taskDescription = document.getElementById('taskDescription').value.trim();
    const courseName = document.getElementById('courseInput').value.trim();
    const instructorName = document.getElementById('instructorInput').value.trim();
    const deadlineDate = document.getElementById('deadlineDate').value;
    const deadlineTime = document.getElementById('deadlineTime').value;
    const priority = document.getElementById('prioritySelect').value;
    
    if (!taskTitle) {
        showToast('Judul tugas tidak boleh kosong', 'error');
        return;
    }
    
    if (!deadlineDate) {
        showToast('Tanggal deadline harus diisi', 'error');
        return;
    }
    
    const newTask = {
        id: Date.now().toString(),
        title: taskTitle,
        description: taskDescription,
        course: courseName,
        instructor: instructorName,
        date: deadlineDate,
        time: deadlineTime || '23:59',
        priority: priority,
        completed: false,
        progress: 0,
        createdAt: new Date().toISOString()
    };
    
    tasks.push(newTask);
    saveTasks();
    resetTaskForm();
    showToast('Tugas berhasil ditambahkan', 'success');
}

// Save tasks to localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
    updateDashboardSummary();
}

// Reset the add task form
function resetTaskForm() {
    document.getElementById('taskInput').value = '';
    document.getElementById('taskDescription').value = '';
    document.getElementById('courseInput').value = '';
    document.getElementById('instructorInput').value = '';
    document.getElementById('deadlineDate').value = '';
    document.getElementById('deadlineTime').value = '';
    document.getElementById('prioritySelect').value = 'sedang';
}

// Update dashboard summary numbers
function updateDashboardSummary() {
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    const ongoing = total - completed;
    
    totalTasksElement.textContent = total;
    ongoingTasksElement.textContent = ongoing;
    completedTasksElement.textContent = completed;
}

// Render tasks based on current filter and search
function renderTasks() {
    const searchQuery = searchInput.value.toLowerCase();
    
    // Filter tasks based on tabs and search query
   let filteredTasks = tasks.filter(task => {
    const matchesSearch = 
        (task.title || '').toLowerCase().includes(searchQuery) ||
        (task.description || '').toLowerCase().includes(searchQuery) ||
        (task.course || '').toLowerCase().includes(searchQuery);
 

        if (currentFilter === 'hari-ini') {
            const today = new Date().toISOString().split('T')[0];
            return matchesSearch && task.date === today;
        } else if (currentFilter === 'selesai') {
            return matchesSearch && task.completed;
        } else {
            return matchesSearch;
        }
    });
    
    // Sort tasks by deadline
    filteredTasks.sort((a, b) => {
        const dateA = new Date(`${a.date}T${a.time}`);
        const dateB = new Date(`${b.date}T${b.time}`);
        return dateA - dateB;
    });
    
    // Render task list
    if (filteredTasks.length === 0) {
        taskList.innerHTML = '';
        emptyState.classList.remove('hidden');
    } else {
        emptyState.classList.add('hidden');
        taskList.innerHTML = '';
        
        filteredTasks.forEach(task => {
            const taskCard = createTaskCard(task);
            taskList.appendChild(taskCard);
        });
    }
    
    // Render upcoming tasks on dashboard
    renderUpcomingTasks();
}

// Render upcoming tasks for the dashboard
function renderUpcomingTasks() {
    // Get non-completed tasks and sort by deadline
    let upcomingTasksList = tasks.filter(task => !task.completed);
    upcomingTasksList.sort((a, b) => {
        const dateA = new Date(`${a.date}T${a.time}`);
        const dateB = new Date(`${b.date}T${b.time}`);
        return dateA - dateB;
    });
    
    // Take only the first 3 upcoming tasks
    upcomingTasksList = upcomingTasksList.slice(0, 3);
    
    if (upcomingTasksList.length === 0) {
        upcomingTasks.innerHTML = '<div class="empty-state"><p>Tidak ada tugas mendatang</p></div>';
    } else {
        upcomingTasks.innerHTML = '';
        upcomingTasksList.forEach(task => {
            const taskCard = createTaskCard(task);
            upcomingTasks.appendChild(taskCard);
        });
    }
}

// Create a task card element
function createTaskCard(task) {
    const template = document.getElementById('taskTemplate');
    const taskCard = document.importNode(template.content, true);
    
    // Set task data attributes
    const card = taskCard.querySelector('.task-card');
    card.dataset.id = task.id;
    card.dataset.priority = task.priority;
    
    if (task.completed) {
        card.classList.add('completed');
    }
    
    // Fill in task details
    taskCard.querySelector('.task-title').textContent = task.title;
    taskCard.querySelector('.task-description').textContent = task.description || 'Tidak ada deskripsi';
    
    if (task.course) {
        taskCard.querySelector('.course-name').textContent = task.course;
    } else {
        taskCard.querySelector('.course-name').remove();
    }
    
    const taskDate = new Date(`${task.date}T${task.time}`);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    taskCard.querySelector('.task-date').textContent = taskDate.toLocaleDateString('id-ID', options);
    taskCard.querySelector('.task-time').textContent = task.time;
    
    // Set remaining time text
    const timeRemaining = getTimeRemaining(taskDate);
    const timeRemainingElement = taskCard.querySelector('.time-remaining');
    timeRemainingElement.textContent = timeRemaining;
    
    if (timeRemaining.includes('terlambat')) {
        timeRemainingElement.style.color = 'var(--danger-color)';
    } else if (timeRemaining.includes('hari ini')) {
        timeRemainingElement.style.color = 'var(--warning-color)';
    }
    
    // Setup action buttons
    taskCard.querySelector('.btn-edit').addEventListener('click', () => {
        openEditModal(task.id);
    });
    
    const completeBtn = taskCard.querySelector('.btn-complete');
    if (task.completed) {
        completeBtn.innerHTML = '<i class="fas fa-redo"></i> Ulangi';
        completeBtn.classList.add('btn-warning');
        completeBtn.classList.remove('btn-complete');
    }
    
    completeBtn.addEventListener('click', () => {
        toggleTaskComplete(task.id);
    });
    
    taskCard.querySelector('.btn-delete').addEventListener('click', () => {
        openDeleteConfirmation(task.id);
    });
    
    return taskCard;
}

// Get formatted time remaining text
function getTimeRemaining(deadline) {
    const now = new Date();
    const diff = deadline - now;
    
    if (diff < 0) {
        const days = Math.floor(Math.abs(diff) / (1000 * 60 * 60 * 24));
        if (days === 0) {
            return 'terlambat hari ini';
        } else if (days === 1) {
            return 'terlambat 1 hari';
        } else {
            return `terlambat ${days} hari`;
        }
    }
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) {
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        if (hours === 0) {
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            return `${minutes} menit lagi`;
        }
        return `${hours} jam lagi`;
    } else if (days === 1) {
        return 'hari ini';
    } else if (days <= 7) {
        return `${days} hari lagi`;
    } else {
        return deadline.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
    }
}

// Toggle task complete status
function toggleTaskComplete(taskId) {
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex !== -1) {
        tasks[taskIndex].completed = !tasks[taskIndex].completed;
        
        // If marking as complete, set progress to 100%
        if (tasks[taskIndex].completed) {
            tasks[taskIndex].progress = 100;
        } else {
            tasks[taskIndex].progress = 0;
        }
        
        saveTasks();
        showToast(
            tasks[taskIndex].completed 
                ? 'Tugas ditandai sebagai selesai' 
                : 'Tugas dikembalikan ke dalam pengerjaan', 
            'success'
        );
    }
}

// Open edit task modal
function openEditModal(taskId) {
    const task = tasks.find(task => task.id === taskId);
    if (!task) return;
    
    currentTaskId = taskId;
    
    document.getElementById('editTaskTitle').value = task.title;
    document.getElementById('editTaskDescription').value = task.description || '';
    document.getElementById('editCourseInput').value = task.course || '';
    document.getElementById('editInstructorInput').value = task.instructor || '';
    document.getElementById('editDeadlineDate').value = task.date;
    document.getElementById('editDeadlineTime').value = task.time;
    document.getElementById('editPrioritySelect').value = task.priority;
    document.getElementById('editProgress').value = task.progress;
    document.getElementById('progressValue').textContent = task.progress + '%';
    
    editModal.classList.add('show');
}

// Save task edit
function saveTaskEdit() {
    if (currentTaskId === null) return;
    
    const taskIndex = tasks.findIndex(task => task.id === currentTaskId);
    if (taskIndex === -1) return;
    
    const taskTitle = document.getElementById('editTaskTitle').value.trim();
    
    if (!taskTitle) {
        showToast('Judul tugas tidak boleh kosong', 'error');
        return;
    }
    
    const deadlineDate = document.getElementById('editDeadlineDate').value;
    if (!deadlineDate) {
        showToast('Tanggal deadline harus diisi', 'error');
        return;
    }
    
    tasks[taskIndex].title = taskTitle;
    tasks[taskIndex].description = document.getElementById('editTaskDescription').value.trim();
    tasks[taskIndex].course = document.getElementById('editCourseInput').value.trim();
    tasks[taskIndex].instructor = document.getElementById('editInstructorInput').value.trim();
    tasks[taskIndex].date = deadlineDate;
    tasks[taskIndex].time = document.getElementById('editDeadlineTime').value || '23:59';
    tasks[taskIndex].priority = document.getElementById('editPrioritySelect').value;
    tasks[taskIndex].progress = parseInt(document.getElementById('editProgress').value);
    
    // If progress is 100%, mark as completed
    if (tasks[taskIndex].progress === 100) {
        tasks[taskIndex].completed = true;
    } else {
        tasks[taskIndex].completed = false;
    }
    
    saveTasks();
    editModal.classList.remove('show');
    showToast('Tugas berhasil diperbarui', 'success');
}

// Open delete confirmation modal
function openDeleteConfirmation(taskId) {
    const task = tasks.find(task => task.id === taskId);
    if (!task) return;
    
    currentTaskId = taskId;
    document.querySelector('.task-to-delete').textContent = task.title;
    confirmDeleteModal.classList.add('show');
}

// Delete task
function deleteTask(taskId) {
    tasks = tasks.filter(task => task.id !== taskId);
    saveTasks();
    showToast('Tugas berhasil dihapus', 'success');
}

// Show toast notification
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    let icon;
    switch (type) {
        case 'success':
            icon = 'fa-check-circle';
            break;
        case 'error':
            icon = 'fa-exclamation-circle';
            break;
        default:
            icon = 'fa-info-circle';
    }
    
    toast.innerHTML = `
        <span class="toast-icon"><i class="fas ${icon}"></i></span>
        <span class="toast-message">${message}</span>
    `;
    
    const toastContainer = document.getElementById('toastContainer');
    toastContainer.appendChild(toast);
    
    // Show animation
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    // Auto hide after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toastContainer.removeChild(toast);
        }, 300);
    }, 3000);
}

// Initialize the app when DOM is fully loaded
document.addEventListener('DOMContentLoaded', initApp);



