const validateForm = document.querySelectorAll('.needs-validation')
const deleteBtns = document.querySelectorAll('.delete-btn')
// const delForms = document.querySelectorAll('#delete-form')
const searchForm = document.querySelector('#search-form')
const searchInput = document.querySelector('#search-input')

// Loop over deleteBtns and show alert message
deleteBtns.forEach((deleteBtn) => {
  deleteBtn.addEventListener('click', (event) => {
    const result = confirm('確定刪除嗎?')
    if (!result) {
      event.preventDefault()
      event.stopPropagation()
    }
  })
})


// Loop over input in validated form and prevent submission
validateForm.forEach((input) => {
  input.addEventListener('submit', function (event) {
    if (!form.checkValidity()) {
      event.preventDefault()
      event.stopPropagation()
    }

    form.classList.add('was-validated')
  })
})

//search form
searchForm.addEventListener('submit', (event) => {
  if (!searchInput.value.trim()) {
    event.preventDefault()
    event.stopPropagation()
  }
})

