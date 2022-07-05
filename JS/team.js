const teamList = document.querySelector('.team__list');

function openItem(link) {
  const contentWrap = link.nextElementSibling;
  const content = contentWrap.firstElementChild;
  const currentHeight = content.offsetHeight;
  
  contentWrap.style.height = currentHeight + 'px';
  link.classList.add('member__name--active');
}

function closeItem(link) {  
  if (!link) return;
  const contentWrap = link.nextElementSibling;
  contentWrap.style.height = 0;
  link.classList.remove('member__name--active');
}

teamList.addEventListener('click', function(e) {

  e.preventDefault();
  const target = e.target;
  
  
  const activeItem = document.querySelector('.member__name--active');
  
  if(target.classList.contains('member__name')) {
    if(target.classList.contains('member__name--active')) {
      closeItem(target);
    }
    else {
      closeItem(activeItem);
      openItem(target);
    }
  }
  
})