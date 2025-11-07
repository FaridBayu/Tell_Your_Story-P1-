import 'leaflet/dist/leaflet.css'; 
import '../styles/styles.css';

import App from './pages/app';
import { isUserLoggedIn, removeUserToken } from './utils/auth'; 

document.addEventListener('DOMContentLoaded', async () => {
  const app = new App({
    content: document.querySelector('#main-content'),
    drawerButton: document.querySelector('#drawer-button'),
    navigationDrawer: document.querySelector('#navigation-drawer'),
  });

  
  const logoutButton = document.getElementById('logout-button');
  const loginNav = document.getElementById('login-nav');
  const navList = document.getElementById('nav-list');
  
  if (isUserLoggedIn()) {
    // Tampilkan tombol Add Story & Logout
    logoutButton.style.display = 'block';
    const addStoryLink = document.createElement('li');
    addStoryLink.innerHTML = '<a href="#/add">Tambah Story</a>';
    navList.appendChild(addStoryLink);

    // Sembunyikan tombol Login
    if (loginNav) loginNav.style.display = 'none';

  } else {
    // Sembunyikan tombol Logout
    logoutButton.style.display = 'none';
    
    // Tampilkan tombol Login 
    if (loginNav) loginNav.style.display = 'block';
  }

  // Event listener untuk Logout
  logoutButton.addEventListener('click', (e) => {
    e.preventDefault();
    removeUserToken();
    window.location.hash = '#/login';
    window.location.reload(); 
  });
  



  const renderWithTransition = async () => {
    if (!document.startViewTransition) {
      await app.renderPage();
      return;
    }
    
    document.startViewTransition(async () => {
      await app.renderPage();
    });
  };

  await renderWithTransition();

  window.addEventListener('hashchange', async () => {
    await renderWithTransition();
  });
});