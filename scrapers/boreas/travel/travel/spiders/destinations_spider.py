import scrapy

class PostsSpider(scrapy.Spider):
    name = "destinations"

    start_urls = [
        "https://boreastravel.rs/izleti-srbija/"
    ]
    def parse(self, response):
        prices_curr = response.css("span.package-price::text").getall()
        places = response.css(".package-title a::text").getall()  
        info_date = response.css(".package-date::text").getall()
        img = response.css(".gdl-image img::attr(src)").getall()
        links = response.css(".gdl-package-grid2 a::attr(href)").getall()
        agency = ["Boreas travel" for i in range(len(places))]

        for i in range(len(places)):
            yield {
                'agency' : agency[i],
                'location' : places[i],
                'links' : links[i],
                'icons' : img[i],
                'info' : info_date[i],
                'price' : prices_curr[i]
            }

