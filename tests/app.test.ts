import request from 'supertest'
import app from '../app.js' // Adjust the import path as necessary

describe('GET /api/health', () => {
  it('should return the status and detail of API', async () => {
    const res = await request(app).get('/api/health')
    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual({
      status: 'success',
      data: {
        message: 'API is healthy',
        uptime: expect.any(Number),
        timestamp: expect.any(String)
      }
    })
  })
})
