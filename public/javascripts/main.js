const validateForm = document.querySelectorAll('.needs-validation')
const deleteBtns = document.querySelectorAll('.delete-btn')
const editForm = document.querySelector('#edit-form')
const cancelBtn = document.querySelector('#cancel-btn')
const searchForm = document.querySelector('#search-form')
const searchInput = document.querySelector('#search-input')

// edit form
if (cancelBtn) {
  cancelBtn.addEventListener('click', (event) => {
    const result = confirm('目前修改項目可能會遺失')
    if (!result) {
      event.preventDefault()
      event.stopPropagation()
    }
  })
}

//search form
if (searchForm) {
  searchForm.addEventListener('submit', (event) => {
    if (!searchInput.value.trim()) {
      event.preventDefault()
      event.stopPropagation()
    }
  })
}


// Loop over deleteBtns and show alert message
if (deleteBtns) {
  deleteBtns.forEach((deleteBtn) => {
    deleteBtn.addEventListener('click', (event) => {
      const result = confirm('確定刪除嗎?')
      if (!result) {
        event.preventDefault()
        event.stopPropagation()
      }
    })
  })
}

// Loop over input in validated form and prevent submission
if (validateForm) {
  validateForm.forEach((input) => {
    input.addEventListener('submit', function (event) {
      if (!input.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }
      input.classList.add('was-validated')
    })
  })
}






