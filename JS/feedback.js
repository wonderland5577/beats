const findBlockByAlias = alias => {
  return $(".feedback__item").filter((ndx, item) => {
    return $(item).attr("data-linked-with") === alias;
  })
}

$(".icon__link").click(e => {
    e.preventDefault();
    const $this = $(e.currentTarget);
    const target = $this.attr("data-open");
    const itemToShow = findBlockByAlias(target);
    const curItem = $this.closest("");

    itemToShow.addClass("active").siblings().removeClass("active");
    curItem.addClass("active").siblings().removeClass("active");
})