(function () {
  const closeEveryItemInContainer = (container) => {
    const items = container.find(".colors-menu__item");
    const content = container.find(".colors-menu__content");

    items.removeClass("active");
    content.width(0);
  };

  const measureWidth = (block) => {
    let itemWidth = 0;

    const screenWidth = $(window).width();
    const titlesWidth = block.find(".colors-menu__title").width() * 3;
    const textContainer = block.find(".colors-menu__container");
    const paddingLeft = parseInt(textContainer.css("padding-left"));
    const paddingRight = parseInt(textContainer.css("padding-right"));

    const isMobile = window.matchMedia("(max-width: 768px)");

    if (isMobile.matches) {
      itemWidth = screenWidth - titlesWidth
    } else {
      itemWidth = 500
    }

    return {
      container: itemWidth,
      textContainer: itemWidth - paddingLeft - paddingRight
    }
  };

  const openItem = (item) => {
    const hiddenBlock = item.find(".colors-menu__content");
    const reqWidth = measureWidth(item).container;
    const textBlock = item.find(".colors-menu__container");
    const textBlockWidth = measureWidth(item).textContainer;

    item.addClass("active");
    hiddenBlock.width(reqWidth);
    textBlock.width(textBlockWidth)
  };

  $(".colors-menu__title").click((e) => {
    e.preventDefault();

    const $this = $(e.currentTarget);
    const item = $this.closest(".colors-menu__item");
    const itemOpened = item.hasClass("active");
    const container = $this.closest(".colors-menu");

    if (itemOpened) {
      closeEveryItemInContainer(container);
    } else {
      closeEveryItemInContainer(container);
      openItem(item);
    }
  });

  // $(".colors-menu__close").click((e) => {
  //   e.preventDefault();

  //   closeEveryItemInContainer($('.colors-menu'));
  // });
}());