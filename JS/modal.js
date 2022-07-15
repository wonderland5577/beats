const validateFields = (form, fieldsArray) => {
  fieldsArray.forEach(field => {
    field.removeClass("input-error");
    if(field.val() === "") {
      field.addClass("input-error");
    }
  })
  const errorFields = form.find('.input-error');

  return errorFields.length === 0;
}

$('.form').submit((e) => {
  e.preventDefault();

  const form = $(e.currentTarget);
  const name = form.find("[name='name']");
  const phone = form.find("[name='phone']");
  const street = form.find("[name='street']");
  const home = form.find("[name='home']");
  const part = form.find("[name='part']");
  const flat = form.find("[name='flat']");
  const floor = form.find("[name='floor']");
  const comment = form.find("[name='comment']");
  const to = form.find("[name='to']");
  const modal = $('#modal');
  const content = modal.find('.modal__content');
  const isValid = validateFields(form, [name, phone, comment, to]);

if (isValid) {
  const request = $.ajax({
    url: "https://webdev-api.loftschool.com/sendmail",
    method: "post",
    data: {
      name: name.val(),
      phone: phone.val(),
      comment: comment.val(),
      to: to.val(),
    },
    error: (data) => {},
  });

  request.done((data) => {
    content.text(data.message);
  });

  request.fail((data) => {
    const message = data.responseJSON.message;
    content.text(message);
    // modal.addClass("error-modal");
  });

  request.always(() => {
    $.fancybox.open({
      src: "#modal",
      type: "inline",
    });
  });
}
});




$('.button--app').click(e => {
  e.preventDefault();

    $.fancybox.close();
})