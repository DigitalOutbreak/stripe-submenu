import sublinks from './data.js';

const toggleBtn = document.querySelector('.toggle-btn');
const closeBtn = document.querySelector('.close-btn');
const sidebarWrapper = document.querySelector('.sidebar-wrapper');
const sidebar = document.querySelector('.sidebar-links');
const linkBtns = [...document.querySelectorAll('.link-btn')];
const submenu = document.querySelector('.submenu');
const nav = document.querySelector('.nav');
const hero = document.querySelector('.hero');
// hide
toggleBtn.addEventListener('click', () => {
  console.log('wtf');
  sidebarWrapper.classList.add('show');
});
closeBtn.addEventListener('click', () => {
  sidebarWrapper.classList.remove('show');
});

// set sidebar
// console.log(sublinks);
sidebar.innerHTML = sublinks
  .map(item => {
    // console.log(item);
    const { links, page } = item;
    console.log(links);
    return `<article>
  <h4>${page}</h4>
  <div class="sidebar-sublinks">
  ${links
    .map(link => {
      return `<a href="${link.url}"><i class="${link.icon}"></i>${link.label}`;
    })
    .join('')}
  </div>
  </article>`;

    console.log(item);
  })
  .join('');

linkBtns.forEach(btn => {
  btn.addEventListener('mouseover', function (e) {
    const text = e.currentTarget.textContent;
    const tempBtn = e.currentTarget.getBoundingClientRect();
    const center = (tempBtn.left + tempBtn.right) / 2;
    const bottom = tempBtn.bottom - 3;

    const tempPage = sublinks.find(({ page }) => page === text);
    if (tempPage) {
      const { page, links } = tempPage;

      // columns

      let columns = 'col-2';
      if (links.length === 3) {
        columns = 'col-3';
      }
      if (links.length > 4) {
        columns = 'col-4';
      }

      submenu.classList.add('show');
      submenu.style.left = `${center}px`;
      submenu.style.top = `${bottom}px`;
      submenu.innerHTML = `
      <section>
        <h4>${page}</h4>
        <div class="submenu-center ${columns}">
        ${links
          .map(link => {
            return `<a href="${link.url}">
            <i class="${link.icon}"></i> ${link.label}
            
            </a>`;
          })
          .join('')}
        </div>

      </section>
      
      `;
    }
  });
});

hero.addEventListener('mouseover', function (e) {
  submenu.classList.remove('show');
});
nav.addEventListener('mouseover', function (e) {
  if (!e.target.classList.contains('link-btn')) {
    submenu.classList.remove('show');
  }
});
