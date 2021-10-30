const menu = [
  {
    id: 1,
    title: 'Clothing store 1',
    category: 'Electronics',
    img: './img/main-bcg.jpeg',
    desc: 'This is store description',
    cash: '2% cash back',
  },
  {
    id: 2,
    title: 'Clothing store 2',
    category: 'Clothing',
    img: './img/main-bcg.jpeg',
    desc: 'This is store description',
    cash: '3% cash back',
  },
  {
    id: 3,
    title: 'Clothing store 3',
    category: 'Clothing',
    img: './img/main-bcg.jpeg',
    desc: 'This is store description',
    cash: '1% cash back',
  },
  {
    id: 4,
    title: 'Store title',
    category: 'Clothing',
    img: './img/main-bcg.jpeg',
    desc: 'This is store description',
    cash: '2% cash back',
  },
  {
    id: 5,
    title: 'Store title',
    category: 'Clothing',
    img: './img/main-bcg.jpeg',
    desc: 'This is store description',
    cash: '4% cash back',
  },
  {
    id: 6,
    title: 'Store title',
    category: 'Office',
    img: './img/main-bcg.jpeg',
    desc: 'This is store description',
    cash: '2% cash back',
  },
  {
    id: 7,
    title: 'Store title',
    category: 'Home_tools_&_improvement',
    img: './img/main-bcg.jpeg',
    desc: 'This is store description',
    cash: '2% cash back',
  },
  {
    id: 8,
    title: 'Store title',
    category: 'Office',
    img: './img/main-bcg.jpeg',
    desc: 'This is store description',
    cash: '2% cash back',
  },
  {
    id: 9,
    title: 'Store title',
    category: 'Office',
    img: './img/main-bcg.jpeg',
    desc: 'This is store description',
    cash: '2% cash back',
  },
]

// toggleSidebar
// ###################################################
const toogleNav = document.querySelector('.toggle-nav'),
  sidebarOverlay = document.querySelector('.sidebar-overlay'),
  sidebarClose = document.querySelector('.sidebar-close')

toogleNav.addEventListener('click', () => {
  sidebarOverlay.classList.add('show')
})
sidebarClose.addEventListener('click', () => {
  sidebarOverlay.classList.remove('show')
})
// ###########################################

// ##############################
// Main section
// #######################

const btnContainer = document.querySelector('.btn-container'),
  sectionCenter = document.querySelector('.section-centers')

window.addEventListener('DOMContentLoaded', () => {
  addItemMenu(menu)
  showBtnItem(menu)
})
function addItemMenu(MenuItem) {
  const newMenu = MenuItem.map((item) => {
    const { title, img, desc, cash, stars } = item
    return `
     <article class="product">
          <div class="product-container">
            <img src="${img}" class="product-img img" alt="${name}" />
          </div>
           <footer>
             <p class="product-name">${title}</p>
             <p class="product-desc">${desc}</p>
             <p class="product-cash-back">${cash}</p>
             <nav>
             <ul class="section-block-stars">
              <li class="section-stars">
                <i class='fa fa-star'></i>
                <i class='fa fa-star'></i>
                <i class='fa fa-star-o'></i>
                <i class='fa fa-star-o'></i>
                <i class='fa fa-star-o'></i>
              </li>
            </ul>
             </nav>
          </footer>
        </article>
    `
  }).join('')
  sectionCenter.innerHTML = newMenu
}

function showBtnItem(MenuBtn, _) {
  const newBtn = MenuBtn.reduce(
    (value, item) => {
      if (!value.includes(item.category)) {
        value.push(item.category)
      }
      return value
    },
    ['all']
  )

  const newItem = newBtn
    .map((item) => {
      return `<button class="filter-btn" type="button" data-id=${item}>${item}</button>`
    })
    .join('')
  btnContainer.innerHTML = newItem

  const linkActive = document.querySelectorAll('.filter-btn')
  function hideItem() {
    linkActive.forEach((item) => {
      item.classList.remove('active')
    })
  }
  function showItem(i = 0) {
    linkActive[i].classList.add('active')
  }
  hideItem()
  showItem()
  linkActive.forEach((item, i) => {
    item.addEventListener('click', () => {
      hideItem()
      showItem(i)
    })
  })

  const btns = document.querySelectorAll('.filter-btn')

  btns.forEach((item) => {
    item.addEventListener('click', (e) => {
      const filter = e.target.dataset.id
      const itemFilter = MenuBtn.filter((item) => {
        if (item.category === filter) {
          return item
        }
      })
      if (filter === 'all') {
        addItemMenu(menu)
      } else {
        addItemMenu(itemFilter)
      }
    })
  })
}

// ###############################
// Search
// ####################
const setupSearch = (store) => {
  const form = document.querySelector('.input-form'),
    input = document.querySelector('.search-input')

  form.addEventListener('keyup', (e) => {
    const value = input.value
    // console.log(value)
    if (value) {
      const newStore = store.filter((item) => {
        let { title } = item
        if (title.toLowerCase().startsWith(value)) {
          return item
        }
      })
      addItemMenu(newStore)
    } else {
      addItemMenu(store)
    }
  })
}
setupSearch(menu)

const setupCompanies = (store, location) => {
  const newItemStore = ['all', ...new Set(store.map((item) => item.category))]
  const newItems = newItemStore
    .map((item) => {
      return `<button class="company-btn">${item}</button>`
    })
    .join('')
  location.innerHTML = newItems

  location.addEventListener('click', (e) => {
    if (e.target.classList.contains('company-btn')) {
      let toggleArrey = []
      if (e.target.textContent === 'all') {
        toggleArrey = [...store]
      } else {
        toggleArrey = store.filter(
          (item) => item.category === e.target.textContent
        )
      }
      addItemMenu(toggleArrey)
    }
  })
}
setupCompanies(menu, document.querySelector('.companies'))
