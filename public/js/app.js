console.log('client side js file loaded!')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const location = search.value
  messageOne.textContent = 'Loading...'
  messageTwo.textContent = ''

  fetch(`/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        console.log(data.error)
        messageOne.textContent = ''
        messageTwo.textContent = data.error
      } else {
        console.log(data.forecast)
        messageOne.textContent = data.forecast + ' °C'
        messageTwo.textContent = data.location
        console.log(data.location)
      }
    })
  })

  //   console.log(location)
  //   console.log(weatherForm)
})
