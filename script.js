// hero slider

function toggleScreen(string) {
  document.getElementsByClassName(string)[0].classList.toggle('black-screen');
}

const slide1 = document.getElementById('slide1');
const slide2 = document.getElementById('slide2');
const [leftArrow, rightArrow] = document.getElementsByClassName('hero__arrow');

let mainSlide = slide1;
let sideSlide = slide2;

rightArrow.addEventListener('click', slideRight);
function slideRight() {
  rightArrow.removeEventListener('click', slideRight);
  sideSlide.setAttribute('style', 'transition:left 0s;left:100%;');
  mainSlide.setAttribute('style', 'transition:left 0s;left:0;');
  setTimeout(() => {
    sideSlide.setAttribute('style', 'transition:left 0.5s;left:0;');
    mainSlide.setAttribute('style', 'transition:left 0.5s;left:-100%;');
    let oldMainSlide = mainSlide;
    mainSlide = sideSlide;
    sideSlide = oldMainSlide;
    setTimeout(() => {
      sideSlide.setAttribute('style', 'transition:left 0s;left:-100%;');
      mainSlide.setAttribute('style', 'transition:left 0s;left:0;');
      setTimeout(() => {
        rightArrow.addEventListener('click', slideRight);
      },200);
    }, 500);
  }, 0); 
}

leftArrow.addEventListener('click', slideLeft);
function slideLeft() {
  leftArrow.removeEventListener('click', slideLeft);
  sideSlide.setAttribute('style', 'transition:left 0s;left:-100%;');
  mainSlide.setAttribute('style', 'transition:left 0s;left:0;');
  setTimeout(() => {
    sideSlide.setAttribute('style', 'transition:left 0.5s;left:0;');
    mainSlide.setAttribute('style', 'transition:left 0.5s;left:100%;');
    let oldMainSlide = mainSlide;
    mainSlide = sideSlide;
    sideSlide = oldMainSlide;
    setTimeout(() => {
      sideSlide.setAttribute('style', 'transition:left 0s;left:100%;');
      mainSlide.setAttribute('style', 'transition:left 0s;left:0;');
      setTimeout(() => {
        leftArrow.addEventListener('click', slideLeft);
      },100);
    }, 500);
  }, 0); 
}


// navigation links highlight

const navLinks = document.querySelectorAll('.navigation__link');

const scrollhandler = () => {
  const fromTop = window.scrollY;
  navLinks.forEach(link => {
    const section = document.querySelector(link.hash);

    if ( section.offsetTop <= fromTop + 160 ) {
      navLinks
        .forEach(link => link.classList.remove('navigation__link--active'));
      link.classList.add('navigation__link--active');
    } 
  });
}

window.addEventListener('scroll', scrollhandler);

navLinks.forEach(link => link.addEventListener('click', e => {
  window.removeEventListener('scroll', scrollhandler);
  navLinks.forEach(link => link.classList.remove('navigation__link--active'));
  link.classList.add('navigation__link--active');

  setTimeout(() => window.addEventListener('scroll', scrollhandler), 1000);
}));

scrollhandler();


// shuffle portfolio pictures

function shuffle(container) {
  children = container.children;
  for (var i = children.length; i >= 0; i--) {
    container.appendChild(children[Math.random() * i | 0]);
  }
}

function changeActiveTab(tabs, activeTab) {
  tabs.forEach(tab => tab.classList.remove('portfolio__nav-element--active'));
  activeTab.classList.add('portfolio__nav-element--active');
}

const container = document.querySelector('.portfolio__content');
const tabs = document.querySelectorAll('.portfolio__nav-element');

document.querySelector('.portfolio__nav-bar').addEventListener('click', e => {
  if (e.target.nodeName === 'A') {
    e.preventDefault();
    changeActiveTab(tabs, e.target);
    shuffle(container);
  }
});


// highlight portfolio img on click

const images = document.querySelectorAll('.portfolio__img');

function highlightPortfolioImg(e) {
  if (e.target.nodeName === 'IMG') {
    targetIsActive = e.target.classList.contains('portfolio__img--active');
    images.forEach(img => img.classList.remove('portfolio__img--active'));
    targetIsActive
      ? e.target.classList.remove('portfolio__img--active')
      : e.target.classList.add('portfolio__img--active');
  }
}

container.addEventListener('click', highlightPortfolioImg);


// form submit - modal window

const form = document.querySelector('form');
form.onsubmit = e => {
  e.preventDefault();
  submitform();
  toggleModal();
}

const modal = document.querySelector('.modal__content');

function submitform() {
  const inputSubject = document.querySelector('#subject').value;
  const inputDescription = document.querySelector('#textarea').value;

  const header = document.createElement('div');
  header.innerHTML = 'The letter was sent';

  const subject = document.createElement('div');
  subject.innerHTML = inputSubject ? '<b>Subject</b>: '+inputSubject : 'No subject';
  subject.classList.add('modal__subject');

  const description = document.createElement('div');
  description.classList.add('modal__description');
  description.innerHTML = inputDescription
                              ? '<b>Description</b>: '+inputDescription
                              : 'No description';

  const button = document.createElement('button');
  button.innerHTML = '<b>OK</b>';
  button.classList.add('modal__button');
  button.addEventListener('click', () => {
    toggleModal();
    form.reset();
  });

  modal.innerHTML = '';
  modal.append(header, subject, description, button);
}

function toggleModal() {
  let modal = document.querySelector('.modal');
  modal.classList.toggle('show-modal');
}


// mobile menu

const burger = document.querySelector('.burger');
const logo = document.querySelector('.logo');
const menuBack = document.querySelector('.menu-back');
const menu = document.querySelector('.menu');
const navMobile = document.querySelector('.navigation');

function toggleMenu() {
  menuBack.classList.toggle('menu-back-show');
  menu.classList.toggle('menu-show');
  burger.classList.toggle('burger-show');
  logo.classList.toggle('logo-show');
  navMobile.classList.toggle('navigation--menu-slide');
  setTimeout(()=>{
    menuBack.classList.toggle('menu-back-opacity');
  }, 0);

  navLinks.forEach(link => link.addEventListener('click', toggleMenu));
}

burger.addEventListener('click', toggleMenu);