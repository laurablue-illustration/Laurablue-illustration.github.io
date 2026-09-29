const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');
menu.addEventListener('click', () => nav.classList.toggle('open'));

document.querySelectorAll('nav a').forEach(a => {
  a.addEventListener('click', () => nav.classList.remove('open'));
});

const filters = document.querySelectorAll('.filter');
const works = document.querySelectorAll('.work');
filters.forEach(button => {
  button.addEventListener('click', () => {
    filters.forEach(b => b.classList.remove('active'));
    button.classList.add('active');
    const filter = button.dataset.filter;
    works.forEach(work => {
      work.style.display = filter === 'all' || work.classList.contains(filter) ? '' : 'none';
    });
  });
});