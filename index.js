//MENU-BAR DELEGATION //Changing what's on the right panel
document.addEventListener('DOMContentLoaded', function(){
  let deleteButton = document.createElement("button")
  const menuBar = document.querySelector('#menu-bar')
  const menuItem = document.querySelector('.menu-item')

  menuBar.addEventListener('click', clickHandler)
})

const renderForm = () => {
  let panelData = document.querySelector('#rt-panel-data')
    panelData.innerHTML = ' '
  let formDiv = document.createElement('div')
    formDiv.innerHTML =
    `
      <h1>LOG IN</h1>
      <form id=“form”>
        <input id="form_input" type="text" name="" value="" placeholder="username">
        <br><br>
        <input type="submit" value="Log In">
        <br><br>
      </form>
    `
    panelData.append(formDiv)
    formDiv.addEventListener('submit', userMethod)
}

const clickHandler = (event) => {
  if (event.target.id === 'user-button'){
    userButtonMethod(event);
  } else if (event.target.id === 'leaderboard'){
    gamePanel(event);
  } else if (event.target.id === 'rules'){
    rules(event)
  } else if (event.target.outerText === 'Delete User'){
    deleteUser(event)
  }
}

const userButtonMethod = (event) => {
  if (event.target.innerText === 'Log In'){
    renderForm()
  } else {
    event.target.innerText = 'Log Out'
  }
}

const userMethod = (event) => {
  event.preventDefault();
  let username = event.target[0].value
  createUser(event)
}

const loggedIn = (event) => {
  let userButton = document.querySelector("#user-button")
      userButton.addEventListener('click', logOut)
      userButton.innerText = "Log Out"
  let welcomePanel = document.querySelector('#rt-panel-data')
  welcomePanel.innerHTML = ' '
  let h1 = document.createElement("h1")
  h1.innerText = `Welcome ${event.username}`
  welcomePanel.append(h1)
  welcomePanel.dataset.id = event.id

  renderStats()
}

const logOut = (event) => {
  let userButton = document.querySelector("#user-button")
  userButton.innerText = "Log In"
  const middleDiv = document.querySelector("#rt-panel-middle")
  const bottomDiv = document.querySelector("#rt-panel-bottom")
  document.querySelector('#rt-panel-data').dataset.id = ''
  middleDiv.innerHTML = ''
  bottomDiv.innerHTML = ''

  renderForm()
}

const renderUserData = (event) => {
  let panelData = document.querySelector('#rt-panel-middle')
      panelData.innerHTML = ' '
  let statDiv = document.createElement("div")
  let ul = document.createElement("ul")
  let deleteButton = document.createElement("button")
  deleteButton.innerText = "Delete User"
  statDiv.append(ul)
  deleteButton.dataset.id = event.id
  counter = 1
  event.games.map(game => {
    let li = document.createElement("li")
    li.innerText = `Game ${counter++}: ${game.click_total} clicks`
    ul.append(li)
  })
  statDiv.append(deleteButton)
  panelData.append(statDiv)
  statDiv.addEventListener('click', clickHandler)
}

const gameData = (gameJson) => {
  const dataDiv = document.querySelector('#rt-panel-bottom')
  dataDiv.innerHTML = ''
  const lbUl = document.createElement('ul')

  const scoreTitle = document.createElement("h1")
  scoreTitle.innerText = "Top 5 Scores"
  dataDiv.append(scoreTitle)
  let fullGameArray = gameJson.sort(function(game1,game2) {
    if (game1.click_total > game2.click_total) return 1;
    if (game1.click_total < game2.click_total) return -1;
  });

  let gameArray = fullGameArray.slice(0, 5)

  gameArray.forEach (game => {
    let li = document.createElement('li')
    li.className = "user-li"
    li.dataset = "user-li-" + "${user.id}"
    li.innerText =
    `${game.user.username} - Moves: ${game.click_total}`
    lbUl.append(li)
  })
  dataDiv.append(lbUl)
}

const rules = (event) => {
  const dataDiv = document.querySelector('#rt-panel-bottom')
  dataDiv.innerHTML = ''
  let h1 = document.createElement("h1")
  let h3 = document.createElement("h3")
  h1.innerText = "How To Play"
  h3.innerHTML = `<p>Try to find the cards that match.</p><p> Points scored based on each move</p><p>(two cards flipped over)</p>`
  dataDiv.append(h1)
  dataDiv.append(h3)
}
