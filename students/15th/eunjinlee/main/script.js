const storyContainer = document.getElementById('stories-container')
const suggestionContainer = document.getElementById('suggestionContainer')

const searchList = document.getElementById('search-list-container') //ul
const searchInput = document.getElementById('nav-search-input')

const moreArticleBtn = document.getElementById('more-article-button')

const commentForm = document.getElementById('comment-form')
const commentInput = document.getElementById('comment-input')
const commentBtn = document.getElementById('comment-btn')
const commentDeleteBtn = document.getElementById('delete-btn')
// const commentHeart = document.getElementById('comment-heart')

const viewCommentsBtn = document.getElementById('comment-view-all')
const commentList = document.getElementById('comment-list')
const commentItem = document.getElementsByClassName('comment__content-list')

//comments from the local Storage
let comments =
  localStorage.getItem('comments') !== null
    ? JSON.parse(localStorage.getItem('comments')) : []

//setting new comments in the local storage
const updateLocalStorage = () => {
  localStorage.setItem('comments', JSON.stringify(comments))
}

//just adding comments array in localstorage with random id
const addCommentsInLocalStorage = () => {
  const generateID = () => Math.floor(Math.random() * 100000000)
  const comment = {
    id: generateID(),
    text: commentInput.value,
  }
  comments.push(comment)
  updateLocalStorage()
}

//add localstorage comments on the html one by one
const addCommentDOM = (comment) => {
  const commentEl = document.createElement('li')
  if (comment.text !== '') {
    viewCommentsBtn.innerText = `View ${comments.length === 1 ? '' : 'all'} ${comments.length} comment${comments.length === 1 ? '' : 's'}`
    commentEl.classList.add('comment__content-list')
    commentEl.innerHTML = ''
    commentEl.innerHTML = `
    <div class="comment__content-box">
      <span class="comment__content"><span class="comment__user user-link">workoutbutlazy</span>${comment.text}</span>
      <i class="comment__content-delete fas fa-times" id="delete-btn" onclick="removeComment(${comment.id})"></i>
    </div>
    <i class="far fa-heart comment__heart" id="comment-heart"></i>
    `
    commentList.appendChild(commentEl)
  }
}

const searchResultEl = document.createElement('li') //li
const addSearchResultDOM = (inputText, userInfo) => {
  if (inputText !== '') {
    searchResultEl.classList.add('search-list__result')

    searchResultEl.innerHTML = `
    <div class="search-list__user-image-container">
      <img src="${userInfo.userProfile}" alt="User profile" class="search-list__user-image">
    </div>
    <div class="search-list__user-info-container">
      <div class="search-list__user-id user-link">${userInfo.userId}</div>
      <div class="search-list__user-name">${userInfo.userName}</div>
    </div>
    `
    searchList.appendChild(searchResultEl)
    return searchList
  } else {
    searchResultEl.innerHTML = ''
  }
}

//search users
const renderSearchResult = () => {
  const searchText = searchInput.value

  // let filteredUsers = userInfos.filter((userInfo) => {
  //   if (userInfo.userId.toLowerCase().includes(searchText.toLowerCase())
  //      || userInfo.userName.toLowerCase().includes(searchText.toLowerCase())) {
  //     return userInfo
  //   }
  // })

  searchResultEl.innerHTML = ''
  // filteredUsers.forEach((filteredUser) => addSearchResultDOM(searchText, filteredUser))
  // // searchList.appendChild(searchResultEl)
  // console.log(filteredUsers)
  userInfos.forEach((userInfo) => addSearchResultDOM(searchText, userInfo))
  // searchList.appendChild(searchResultEl)
  console.log(userInfos)
}

//search user event listener
searchInput.addEventListener('keyup', renderSearchResult)

//selecting random index without same element
const selectIndex = (totalIndex, selectingNumber) => {
  let randomIndexArray = []
  
  //check if there is any duplicate index
  for (i=0; i<selectingNumber; i++) {
    randomNum = Math.floor(Math.random() * totalIndex)
    if (randomIndexArray.indexOf(randomNum) === -1) {
      randomIndexArray.push(randomNum)
    } else { //if the randomNum is already in the array retry
      i--
    }
  }
  return randomIndexArray
}

//rendering stories / getting data from user-infos.js
const renderStories = () => {
  const randomIndexArray = selectIndex(24, 7)
  randomIndexArray.map((index) => {
    const story = document.createElement('div')
    story.classList.add('story')
    story.innerHTML = `
    <div class="story__view-button"><img src="${userInfos[index].userProfile}" alt="User image" class="story__user-image"></div>
    <div class="story__user-id">${userInfos[index].userId}</div>
    `
    storyContainer.appendChild(story)
  })
}

//rendering suggestion dom
const renderSuggestion = () => {
  const randomIndexArray = selectIndex(24, 5)
  randomIndexArray.map((index) => {
    const recommendedUser = document.createElement('li')
    recommendedUser.classList.add('suggestion-user')
    recommendedUser.innerHTML = `
    <div class="suggestion-user-container">
      <img src="${userInfos[index].userProfile}" class="suggestion-user-profile"></img>
    </div>
    <div class="suggestion-user-info">
      <div class="suggestion-user-id user-link">${userInfos[index].userId}</div>
      <div class="suggestion-detail">${userInfos[index].userStatus}</div>
    </div>
    <a href="#" class="follow-btn">Follow</a>
    `
    suggestionContainer.appendChild(recommendedUser)
    console.log(recommendedUser)
  })
}

//remove comments by id
const removeComment = (id) => {
  commentList.innerHTML = ''
  comments = comments.filter((comment) => comment.id !== id)
  updateLocalStorage()
  renderComments()
}

//render each comments from localstorage when refreshed
const renderComments = () => {
  comments.forEach((comment) => addCommentDOM(comment))
}

//submitting comment and rendering on pages
const submitTextAndRender = (e) => {
  e.preventDefault() //댓 달 때마다 새로고침되는 것 방지
  commentList.innerHTML = '' //DOM 비워주고
  addCommentsInLocalStorage() //로컬스토리지 저장하고
  renderComments() //로컬스토리지 값들 다 DOM에 출력
  commentInput.value = '' //폼은 비워준다.
  searchInput.value = '' //폼은 비워준다.
}

//opening an article with more button
const openArticle = () => {
  const article = document.getElementById('article')
  article.classList.add('open')
  moreArticleBtn.classList.add('open')
}

//view all comments with button
const toggleViewCommentsBtn = () => {
  commentList.classList.toggle('view')
  if (commentList.classList.contains('view')) {
    viewCommentsBtn.innerText = 'Hide comments'
  } else {
    viewCommentsBtn.innerText = `View ${comments.length === 1 ? '' : 'all'} ${
      comments.length
    } comment${comments.length === 1 ? '' : 's'}`
  }
}

//toggle comment heart
const toggleCommentHeart = (e) => {

  commentHeart.classList.toggle('like')
  if (commentHeart.classList.contains('like')) {
    commentHeart.classList.remove('far')
    commentHeart.classList.add('fas')
  } else {
    commentHeart.classList.add('far')
    commentHeart.classList.remove('fas')
  }
}


//submit event listener
commentForm.addEventListener('submit', submitTextAndRender)

//input box event listener
// commentForm.addEventListener('keyup', activateLoginBtn)

//window load event
window.addEventListener('load', () => {
  renderComments()
  renderStories()
  renderSuggestion()
})

//more button event listener
moreArticleBtn.addEventListener('click', openArticle)

//view all comments button event listener
viewCommentsBtn.addEventListener('click', toggleViewCommentsBtn)

//comment heart toggle event listener
// commentHeart.addEventListener('click', toggleCommentHeart)