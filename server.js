const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')
const {
    port
} = require('./config')
const app = express()
const articles = []

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs')
const URL = 'https://www.netflix.com/pl/browse/genre/83'

axios(URL)
    .then(res => {
        const htmlData = res.data
        const $ = cheerio.load(htmlData)


        const listItems = $('.nm-content-horizontal-row-item');
        
        listItems.each(function (idx, el) {
            const image = $(el).children('a').children('.nm-collections-title-img').attr('src')
            const title = $(el).children('a').children('.nm-collections-title-name').text()
            const titleURL = $(el).children('.nm-collections-link').attr('href')
           
            if(/^https/.test(image)&&title&&titleURL){
                articles.push({
                    image,
                    title,
                    titleURL
                })
            }
        })




    }).catch(err => console.error(err))
app.get('/', (req, res) => {
    res.render('index', {
        resources: articles
    })
})
app.listen(port, () => {
    console.log(`start backend port:${port}`);
})
