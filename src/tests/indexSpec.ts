import App from './../index'
import supertest from 'supertest'
import image_path from '../utility/images_path'
import fs from 'fs'
const request = supertest(App)

// some tests

describe('Test endpoint responses', () => {
  it('test expect to fail', async () => {
    const response = await request.get('/images?filename=hello')
    expect(response.status).toEqual(404)
  })
})

describe('Test endpoint responses', () => {
  it('test expect to pass', async () => {
    const response = await request.get(
      '/images?filename=fjord&height=1000&width=2000'
    )
    expect(response.status).toEqual(200)
  })
})

describe('Test endpoint responses', () => {
  it('test expect to pass', async () => {
    const response = await request.get('/images?filename=fjord&height=1000')
    expect(response.status).toEqual(200)
  })
})

describe('Test endpoint responses', () => {
  it('test expect to pass', async () => {
    const response = await request.get('/images?filename=fjord&width=600')
    expect(response.status).toEqual(200)
  })
})

describe('Test endpoint responses', () => {
  it('test expect to fail', async () => {
    const response = await request.get('images?filename=fjord&width=p')
    expect(response.status).toEqual(404)
  })
})

describe('Test endpoint responses', () => {
  it('test expect to fail', async () => {
    const response = await request.get('/images?filename=fjord&height=N')
    expect(response.status).toEqual(404)
  })
})

describe('Test endpoint responses', () => {
  it('test expect to pass', async () => {
    const response = await request.get(
      '//images?filename=santamonica&height=1000&width=1200'
    )
    expect(response.status).toEqual(200)
  })
})

describe('Test endpoint responses', () => {
  it('test expect to pass', async () => {
    expect(fs.readdirSync(image_path).includes(`santamonica.jpg`))
  })
})
