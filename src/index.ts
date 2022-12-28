import express from 'express'
import image from './routes/myroute'

const port = 3000
const App = express()
// use my main route "index"
App.use('/images', image)

App.listen(port, () => {
  // listen to the local host at port: 3000
  console.log(`http://localhost:3000/images?filename=`)
})
export default App
