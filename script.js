const modal = document.getElementById('modal')
const modalShow = document.getElementById('show-modal')
const modalClose = document.getElementById('close-modal')
const bookmarkForm = document.getElementById('bookmark-form')
const websiteNameEl = document.getElementById('website-name')
const websiteUrlEl = document.getElementById('website-url')
const bookmarksContainer = document.getElementById('bookmarks-container')

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