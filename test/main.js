document.addEventListener('DOMContentLoaded', () => {
            const navButtons = document.querySelectorAll('.section-nav button');
            const pages = document.querySelectorAll('#left-section .page');
            const darkModeToggle = document.getElementById('darkModeToggle');
            const body = document.body;
            const breakpoint = 1023; 

            function applyDarkModePreference() { 
                const savedPreference = localStorage.getItem('darkMode'); 
                if (savedPreference === 'enabled') { 
                    body.classList.add('dark-mode'); 
                } else { 
                    body.classList.remove('dark-mode'); 
                } 
            }
            darkModeToggle.addEventListener('click', () => { body.classList.toggle('dark-mode'); localStorage.setItem('darkMode', body.classList.contains('dark-mode') ? 'enabled' : 'disabled'); });
            applyDarkModePreference();

            function setActivePage(targetId) {
                 let pageActivated = false; 
                 const isDesktopLayout = window.innerWidth > breakpoint;
                 
                 pages.forEach(page => { 
                     page.classList.remove('active'); 
                     page.style.display = 'none'; 
                     page.style.opacity = '0'; 
                     page.style.transform = 'translateY(20px)'; 
                 });
                 navButtons.forEach(button => button.classList.remove('active'));

                 const targetPageElement = document.getElementById(targetId);

                 if (targetPageElement) {
                     if (isDesktopLayout && targetPageElement.classList.contains('form-page')) {
                         targetPageElement.style.display = 'flex'; 
                     } else { 
                         targetPageElement.style.display = 'block'; 
                     }
                     targetPageElement.classList.add('active'); 
                    
                     requestAnimationFrame(() => { 
                         targetPageElement.style.opacity = '1'; 
                         targetPageElement.style.transform = 'translateY(0)';
                     }); 

                     pageActivated = true; 
                     const correspondingButton = document.querySelector(`.section-nav button[data-target="${targetId}"]`); 
                     if(correspondingButton) { 
                         correspondingButton.classList.add('active'); 
                     }
                 }

                 if (!pageActivated && pages.length > 0) { 
                     const homePageId = 'home-page'; 
                     const homePageElement = document.getElementById(homePageId); 
                     const homeButton = document.getElementById('home-btn');
                     if (homePageElement) { 
                         homePageElement.style.display = 'block'; 
                         homePageElement.classList.add('active');
                         requestAnimationFrame(() => { 
                             homePageElement.style.opacity = '1'; 
                             homePageElement.style.transform = 'translateY(0)';
                         }); 
                     }
                     if(homeButton) homeButton.classList.add('active');
                 }
            }


            navButtons.forEach(button => { button.addEventListener('click', (e) => { 
                e.preventDefault(); 
                const targetPageId = button.dataset.target; 
                setActivePage(targetPageId);
            }); });
            
            const loginPasswordInput = document.getElementById('login-password');
            const loginPasswordToggle = document.getElementById('loginPasswordToggle');

            if (loginPasswordInput && loginPasswordToggle) {
                const iconElement = loginPasswordToggle.querySelector('i'); 

                loginPasswordToggle.addEventListener('click', () => {
                    const currentType = loginPasswordInput.getAttribute('type');
                    if (currentType === 'password') {
                        loginPasswordInput.setAttribute('type', 'text');
                        iconElement.classList.remove('fa-eye');
                        iconElement.classList.add('fa-eye-slash');
                    } else {
                        loginPasswordInput.setAttribute('type', 'password');
                        iconElement.classList.remove('fa-eye-slash');
                        iconElement.classList.add('fa-eye');
                    }
                    loginPasswordInput.focus(); 
                });
            }


            let currentLayoutMode = window.innerWidth > breakpoint ? 'desktop' : 'mobile';
            window.addEventListener('resize', () => {
                 const newLayoutMode = window.innerWidth > breakpoint ? 'desktop' : 'mobile';
                 if (newLayoutMode !== currentLayoutMode) {
                     const activeButton = document.querySelector('.section-nav button.active'); 
                     let currentActivePageId = 'home-page'; 
                     if (activeButton) {
                         currentActivePageId = activeButton.dataset.target;
                     } else {
                         const activePage = document.querySelector('#left-section .page.active');
                         if (activePage) currentActivePageId = activePage.id;
                     }
                    
                     pages.forEach(page => { 
                         page.classList.remove('active'); 
                         page.style.display = 'none'; 
                         page.style.opacity = '0'; 
                         page.style.transform = 'translateY(20px)';
                     });
                     setActivePage(currentActivePageId); 
                     currentLayoutMode = newLayoutMode;
                 }
            });
            setActivePage('home-page'); 

            // Skeleton loader removal
            window.addEventListener('load', () => {
                setTimeout(() => {
                    document.body.classList.remove('content-loading');
                }, 1000); // Adjust this delay as needed (e.g., 0 for nearly instant after load)
            });
        });