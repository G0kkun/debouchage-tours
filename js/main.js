// =====================================================
// INITIALISATION GLOBALE
// =====================================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== TOP BAR - AFFICHAGE TEMPS RÉEL =====
    function updateNextSlot() {
        const now = new Date();
        const minutesToAdd = Math.floor(Math.random() * 61) + 60;
        now.setMinutes(now.getMinutes() + minutesToAdd);
        const minutes = now.getMinutes();
        const roundedMinutes = Math.ceil(minutes / 15) * 15;
        now.setMinutes(roundedMinutes);
        now.setSeconds(0);
        
        const hours = now.getHours();
        const mins = now.getMinutes().toString().padStart(2, '0');
        const currentHour = new Date().getHours();
        let dayText = 'Aujourd\'hui';
        
        if (hours < currentHour || (hours === currentHour && now.getMinutes() <= new Date().getMinutes())) {
            dayText = 'Demain';
        }
        
        const nextSlotElement = document.getElementById('next-slot');
        if (nextSlotElement) {
            nextSlotElement.textContent = dayText + ' dès ' + hours + 'h' + mins;
        }
    }
    
    function updateTechnicianActivity() {
        const activities = [
            'Technicien en route sur Tours Nord',
            'Intervention en cours à Saint-Cyr-sur-Loire',
            'Équipe disponible pour urgence immédiate',
            'Technicien en route sur Joué-lès-Tours',
            'Intervention terminée - Prochaine dispo immédiate',
            'Camion hydrocurage disponible secteur Tours'
        ];
        
        const activityElement = document.getElementById('technician-activity');
        if (activityElement) {
            let newActivity;
            do {
                newActivity = activities[Math.floor(Math.random() * activities.length)];
            } while (newActivity === activityElement.textContent && activities.length > 1);
            
            activityElement.textContent = newActivity;
        }
    }
    
    updateNextSlot();
    updateTechnicianActivity();
    setInterval(updateNextSlot, 5 * 60 * 1000);
    setInterval(updateTechnicianActivity, 12000);
    
    
    // ===== MENU HAMBURGER =====
    const menuToggle = document.getElementById('menuToggle');
    const menuOverlay = document.getElementById('menuOverlay');
    const menuClose = document.getElementById('menuClose');
    const menuLinks = document.querySelectorAll('.menu-link');
    
    if (menuToggle && menuOverlay) {
        menuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            menuOverlay.classList.toggle('active');
            menuToggle.classList.toggle('active');
            document.body.style.overflow = menuOverlay.classList.contains('active') ? 'hidden' : '';
        });
    }
    
    if (menuClose) {
        menuClose.addEventListener('click', function() {
            menuOverlay.classList.remove('active');
            menuToggle.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    // Ferme le menu au clic sur un lien
    menuLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            menuOverlay.classList.remove('active');
            menuToggle.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Ferme le menu avec Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && menuOverlay.classList.contains('active')) {
            menuOverlay.classList.remove('active');
            menuToggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Ferme le menu au clic sur le fond
    if (menuOverlay) {
        menuOverlay.addEventListener('click', function(e) {
            if (e.target === menuOverlay || e.target.classList.contains('menu-overlay-bg')) {
                menuOverlay.classList.remove('active');
                menuToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    
    // ===== CARTE LEAFLET =====
    const mapElement = document.getElementById('tours-map');
    
    if (mapElement && !mapElement._leaflet_id) {
        try {
            const map = L.map('tours-map').setView([47.3941, 0.6848], 11);
            
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
                maxZoom: 19
            }).addTo(map);
            
            const marker = L.marker([47.3941, 0.6848]).addTo(map);
            marker.bindPopup('<strong>Tours</strong><br>Zone d\'intervention d\'Artiserv Débouchage<br><a href="tel:+33200000000">Appelez-nous</a>').openPopup();
            
            const circle = L.circle([47.3941, 0.6848], {
                color: '#F88309',
                fillColor: '#F88309',
                fillOpacity: 0.1,
                radius: 30000
            }).addTo(map);
        } catch (error) {
            console.log('Erreur carte:', error);
        }
    }
    
    
    // ===== GESTION DES COOKIES =====
    const cookieConsent = document.getElementById('cookieConsent');
    const cookieAccept = document.getElementById('cookieAccept');
    const cookieReject = document.getElementById('cookieReject');
    
    function checkCookieConsent() {
        const consent = localStorage.getItem('cookieConsent');
        if (!consent) {
            setTimeout(function() {
                if (cookieConsent) {
                    cookieConsent.classList.add('show');
                }
            }, 1000);
        }
    }
    
    function acceptCookies() {
        localStorage.setItem('cookieConsent', 'accepted');
        localStorage.setItem('cookieConsentDate', new Date().toISOString());
        hideCookieBanner();
        console.log('Cookies acceptés');
    }
    
    function rejectCookies() {
        localStorage.setItem('cookieConsent', 'rejected');
        localStorage.setItem('cookieConsentDate', new Date().toISOString());
        hideCookieBanner();
        console.log('Cookies refusés');
    }
    
    function hideCookieBanner() {
        if (cookieConsent) {
            cookieConsent.classList.remove('show');
            setTimeout(function() {
                cookieConsent.style.display = 'none';
            }, 400);
        }
    }
    
    if (cookieAccept) {
        cookieAccept.addEventListener('click', acceptCookies);
    }
    
    if (cookieReject) {
        cookieReject.addEventListener('click', rejectCookies);
    }
    
    checkCookieConsent();
    
    window.resetCookieConsent = function() {
        localStorage.removeItem('cookieConsent');
        localStorage.removeItem('cookieConsentDate');
        location.reload();
    };
});
