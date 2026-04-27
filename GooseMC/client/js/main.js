// Переключение темы
function toggleTheme() {
    document.body.classList.toggle('light-theme');
    const theme = document.body.classList.contains('light-theme') ? 'light' : 'dark';
    localStorage.setItem('theme', theme); // Сохраняем выбор
}

// Копирование IP с уведомлением
function copyIp() {
    const ipText = document.getElementById('ipText').innerText;
    navigator.clipboard.writeText(ipText).then(() => {
        const box = document.querySelector('.ip-box');
        const originalText = box.innerHTML;
        
        box.innerHTML = "<span>СКОПИРОВАНО!</span>";
        box.style.borderColor = "#2ecc71";
        
        setTimeout(() => {
            box.innerHTML = originalText;
            box.style.borderColor = "var(--accent)";
        }, 2000);
    });
}

// Анимация появления при скролле
window.addEventListener('scroll', reveal);

function reveal() {
    var reveals = document.querySelectorAll('.reveal');
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var revealTop = reveals[i].getBoundingClientRect().top;
        var revealPoint = 150;

        if (revealTop < windowHeight - revealPoint) {
            reveals[i].classList.add('active');
        }
    }
}

// Проверка темы при загрузке
window.onload = () => {
    if (localStorage.getItem('theme') === 'light') {
        document.body.classList.add('light-theme');
    }
    reveal(); // Запускаем проверку видимости сразу
    
    // Проверка логина
    checkLogin();
};

// Переключение вкладок
function switchTab(tabName, btn) {
    // Скрыть все вкладки
    const panes = document.querySelectorAll('.tab-pane');
    panes.forEach(pane => pane.classList.remove('active'));
    
    // Убрать active у кнопок
    const buttons = document.querySelectorAll('.tabs-desktop .tab-btn');
    buttons.forEach(button => button.classList.remove('active'));
    
    // Показать выбранную вкладку
    const activePane = document.getElementById(tabName);
    if (activePane) activePane.classList.add('active');
    
    // Отметить активную кнопку
    if (btn) btn.classList.add('active');
}

// Обработка видеоплеера
document.addEventListener('DOMContentLoaded', function() {
    const videoPlayer = document.querySelector('.video-player');
    if (videoPlayer) {
        videoPlayer.addEventListener('click', function() {
            // Здесь можно добавить открытие видео, например модальное окно
            alert('Видео будет загружено здесь');
        });
    }
    
    // Обработка загрузки скина
    const skinUpload = document.getElementById('skinUpload');
    if (skinUpload) {
        skinUpload.addEventListener('change', function(e) {
            alert('Скин загружен: ' + e.target.files[0].name);
        });
    }
    
    // Обработка загрузки плаща
    const capeUpload = document.getElementById('capeUpload');
    if (capeUpload) {
        capeUpload.addEventListener('change', function(e) {
            alert('Плащ загружен: ' + e.target.files[0].name);
        });
    }
});

// Обработка формы логина
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            // Генерация ID
            const id = Date.now().toString();
            
            // Дата регистрации
            const joinDate = new Date().toLocaleDateString('ru-RU');
            
            // Создание объекта пользователя
            const user = {
                id: id,
                username: username,
                email: email,
                password: password,
                joinDate: joinDate,
                balance: 0, // Начальный баланс
                avatar: null // Аватар по умолчаниюz dct
            };
            
            // Сохранение в localStorage как JSON
            localStorage.setItem('user', JSON.stringify(user));
            
            // Показать кабинет
            showCabinet(user);
        });
    }
});

// Функция проверки логина
function checkLogin() {
    const userData = localStorage.getItem('user');
    if (userData) {
        const user = JSON.parse(userData);
        showCabinet(user);
    }
}

// Функция показа кабинета
function showCabinet(user) {
    const loginCard = document.querySelector('.login-card');
    const cabinet = document.getElementById('cabinet');
    
    if (loginCard) loginCard.style.display = 'none';
    if (cabinet) {
        cabinet.style.display = 'flex';
        
        // Боковая панель
        const playerNick = document.getElementById('playerNick');
        const playerEmail = document.getElementById('playerEmail');
        const playerBalance = document.getElementById('playerBalance');
        const playerId = document.getElementById('playerId');
        const playerAvatar = document.getElementById('playerAvatar');
        
        // Вкладка Обзор
        const playerId2 = document.getElementById('playerId2');
        const playerEmail2 = document.getElementById('playerEmail2');
        const playerJoinDate = document.getElementById('playerJoinDate');
        
        // Заполнение боковой панели
        if (playerNick) playerNick.textContent = user.username;
        if (playerEmail) playerEmail.textContent = user.email;
        if (playerBalance) playerBalance.innerHTML = `<span class="balance-value">${user.balance} ₽</span>`;
        if (playerId) playerId.textContent = user.id;
        
        // Заполнение вкладки Обзор
        if (playerId2) playerId2.textContent = user.id;
        if (playerEmail2) playerEmail2.textContent = user.email;
        if (playerJoinDate) playerJoinDate.textContent = user.joinDate;
        
        // Аватар - загружаем путем плейсхолдера, пользователь может загрузить свой
        if (playerAvatar) {
            playerAvatar.src = 'assets/img/default-avatar.png'; // Плейсхолдер
        }
        
        // Обработчик для загрузки аватара
        const avatarUpload = document.getElementById('avatarUpload');
        if (avatarUpload) {
            avatarUpload.addEventListener('change', function(e) {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function(event) {
                        if (playerAvatar) {
                            playerAvatar.src = event.target.result;
                            // Сохранить в localStorage
                            user.avatar = event.target.result;
                            localStorage.setItem('user', JSON.stringify(user));
                        }
                    };
                    reader.readAsDataURL(file);
                }
            });
        }
    }
}

// Функция выхода
function logout() {
    localStorage.removeItem('user');
    const cabinet = document.getElementById('cabinet');
    const loginCard = document.querySelector('.login-card');
    
    if (cabinet) cabinet.style.display = 'none';
    if (loginCard) {
        loginCard.style.display = 'block';
        // Очистить форму
        const form = document.getElementById('loginForm');
        if (form) form.reset();
    }
}