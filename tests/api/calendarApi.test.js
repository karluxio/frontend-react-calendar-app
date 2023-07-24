import calendarApi from "../../src/api/calendarApi"

describe('calendarApi', () => {
    it('should has a default config', () => {
        expect(calendarApi.defaults.baseURL).toBe(process.env.VITE_URL_API)
    })

    it('should has x-token in all requests', async () => {
        const token = "ABC-123-XYZ"
        localStorage.setItem('token', token)
        const res = await calendarApi
        .get('/auth')
        // .then(res => res)
        .catch(res => res)

        // console.log(res.config.headers);
        expect(res.config.headers["x-token"]).toBe(token);
    })
})
