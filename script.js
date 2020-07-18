const modal = document.getElementById('modal')
const modalShow = document.getElementById('show-modal')
const modalClose = document.getElementById('close-modal')
const bookmarkForm = document.getElementById('bookmark-form')
const websiteNameEl = document.getElementById('website-name')
const websiteUrlEl = document.getElementById('website-url')
const bookmarksContainer = document.getElementById('bookmarks-container')

// 
let bookmarks = []

// Show Modal - focus on the first Input
function showModal() {
  modal.classList.add('show-modal') // show the modal when clicking on h1 Add Bookmark
  websiteNameEl.focus()  // places cursor in the first field: Website Name
}

// Modal Even Listeners
modalShow.addEventListener('click', showModal)

// Two ways to close the modal...
// 1) click on the X
modalClose.addEventListener('click', () => modal.classList.remove('show-modal'))
// 2) click outside of the modal's form.  console > MouseEvent > target
window.addEventListener('click', (e) => (e.target === modal ? modal.classList.remove('show-modal') : false))
// window.addEventListener('click', (e) => console.log(e.target))

// Validate Form
function validate(nameValue, urlValue) {
  const expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g
  const regex = new RegExp(expression)
  if ( !nameValue || !urlValue ) {
    alert('Please submit values for both fields')
    return false
  }
  // if (urlValue.match(regex)) {
  //   alert('match')
  // }
  if (!urlValue.match(regex)) {
    alert('Please provide a valid web addess')
    return false
  }
  // Valid - if neither of the above statements are true
  return true
}

// Fetch the bookmarks from localStorage
function fetchBookmarks() {
  // Get bookmarks from localStorage if available
  if (localStorage.getItem('bookmarks')) {
    bookmarks = JSON.parse(localStorage.getItem('bookmarks'))
  } else {
    // Create a bookmarks array in localStorage
    bookmarks = [
      {
        name: "Alia's Design",
        url: "https://aliamk.github.io/Portfolio/"
      }
    ]
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
  }
  console.log(bookmarks)
}

// Handle Data from Form
function storeBookmark(e) {
  e.preventDefault()
  // console.log(e)
  const nameValue = websiteNameEl.value
  let urlValue = websiteUrlEl.value
  if (!urlValue.includes('http://', 'https://')) {
    urlValue = `https://${urlValue}`
  }
  // console.log(nameValue, urlValue)
  if (!validate(nameValue, urlValue)) {
    return false
  }
  validate(nameValue, urlValue)
  const bookmark = { 
    name: nameValue,
    url: urlValue
  }
  bookmarks.push(bookmark)
  // console.log(JSON.stringify(bookmarks))
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks)) // without JSON.stringify, we get Object: Object back
  fetchBookmarks()
  bookmarkForm.reset()
  websiteNameEl.focus()
}

// Event Listener
bookmarkForm.addEventListener('submit', storeBookmark)

// On load, fetch the bookmarks
fetchBookmarks()