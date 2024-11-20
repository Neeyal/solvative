document.addEventListener('DOMContentLoaded', () => {
  const searchBox = document.getElementById('search-box')
  const resultsTable = document.getElementById('results-table').querySelector('tbody')
  const spinner = document.getElementById('spinner')
  const limitInput = document.getElementById('limit-input')
  const paginationContainer = document.getElementById('pagination')

  let timeout = null
  let currentPageUrl = null 

  const fetchPlaces = async (url, query, limit = 5) => {
    spinner.classList.remove('hidden')
    try {
      const response = await fetch(url || `${CONFIG.API_URL}/v1/geo/cities?namePrefix=${query}&limit=${limit}`, {
        method: 'GET',
        headers: {
          'x-rapidapi-key': CONFIG.API_KEY,
          'x-rapidapi-host': CONFIG.API_HOST,
        },
      })
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error fetching data:', error)
      return exampleResponse
    } finally {
      spinner.classList.add('hidden')
    }
  }

  const updateTable = (data) => {
    resultsTable.innerHTML = ''
    if (data.length === 0) {
      resultsTable.innerHTML = '<tr><td colspan="3">No result found</td></tr>'
      return
    }
    data.forEach((item, index) => {
      const row = `<tr>
        <td>${index + 1}</td>
        <td>${item.city}</td>
        <td>
          <img src="https://flagsapi.com/${item.countryCode}/flat/24.png" alt="${item.country} flag" />
          ${item.country}
        </td>
      </tr>`
      resultsTable.innerHTML += row
    })
  }

  const updatePagination = (links) => {
    paginationContainer.innerHTML = '' 
  
    links.forEach((link) => {
      const button = document.createElement('button')
      button.textContent = link.rel.charAt(0).toUpperCase() + link.rel.slice(1) 
      button.classList.add('pagination-btn') 
      button.addEventListener('click', () => handlePageChange(link.href))
      paginationContainer.appendChild(button)
    })
  }

  const handlePageChange = async (relativeUrl) => {
    spinner.classList.remove('hidden')
    try {
      const response = await fetch(`${CONFIG.API_URL}${relativeUrl}`, {
        method: 'GET',
        headers: {
          'x-rapidapi-key': CONFIG.API_KEY,
          'x-rapidapi-host': CONFIG.API_HOST,
        },
      })
      const data = await response.json()
      updateTable(data.data)
      updatePagination(data.links) 
    } catch (error) {
      console.error('Error fetching page:', error)
    } finally {
      spinner.classList.add('hidden')
    }
  }
  

  const handleSearch = async () => {
    if(searchBox.value){
        if(limitInput.value <= 10) {
            const query = searchBox.value.trim()
            const limit = Math.min(parseInt(limitInput.value, 10) || 5, 10)
            const results = await fetchPlaces(null, query, limit)
            currentPageUrl = null
            updateTable(results.data)
            updatePagination(results.links)
        }
        else{
        resultsTable.innerHTML = ''
        paginationContainer.innerHTML = ''
        resultsTable.innerHTML = '<tr><td colspan="3">limit should be below 10</td></tr>'
        }
        
    }
    else{
        resultsTable.innerHTML = ''
        paginationContainer.innerHTML = ''
        resultsTable.innerHTML = '<tr><td colspan="3">Start searching</td></tr>'
    }
  }

  searchBox.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  })

  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === '/') {
      searchBox.focus()
    }
  })

  limitInput.addEventListener('change', handleSearch)
})
