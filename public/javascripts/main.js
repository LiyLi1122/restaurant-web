const forms = document.querySelectorAll('.needs-validation')
const deleteBtn = document.querySelectorAll('.delete-btn')

// Loop over them and alert message
deleteBtn.forEach((btn) => {
  btn.addEventListener('click', () => {
  alert('確定要刪除嗎?')
})
})

// Loop over them and prevent submission
forms.forEach((form) => {
  form.addEventListener('submit', function (event) {
    if (!form.checkValidity()) {
      event.preventDefault()
      event.stopPropagation()
    }

    form.classList.add('was-validated')
  })
})

