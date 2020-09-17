import scrapy

FEED_EXPORT_ENCODING = 'utf-8'

class PlacesSpider(scrapy.Spider):
    name = 'places'
    start_urls = [
        'https://www.jungletribe.rs/destinacije/evropa/srbija'
    ]

    def parse(self, response):

        places = response.css('.h5 .text-body::text').extract()
        arrivals = response.css('.d-lg-none::text').extract()
        departures = response.css('.w-lg-15::text').extract()
        prices = response.css('#upcoming-tours-expander .tour-highlight-price-discounted::text').extract()
        currencies = response.css('#upcoming-tours-expander .ml-1::text').extract()
        links = response.css('.h5 .text-body::attr(href)').extract()
        icons = response.css('#upcoming-tours-expander .position-relative::attr(src)').extract()

        # places = [p.encode('utf-8') for p in places]
        departures = [d.strip() for d in departures]
        departures = [d for d in departures if len(d) > 0]
        arrivals = [a.strip() for a in arrivals]
        arrivals = [a for a in arrivals if len(a) > 0]
        prices = [p.strip() for p in prices]
        prices = [p for p in prices if len(p) > 0]
        currencies = [c.strip() for c in currencies]
        currencies = [c for c in currencies if len(c) > 0]
        agency = ["Jungle Tribe" for i in range(len(places))]

        for i in range(len(places)):
            yield {
                'agency' : agency[i],
                'location': places[i],
                'departure': departures[i],
                'arrival': arrivals[i],
                'prices': prices[i],
                'currency': currencies[i],
                'links': links[i],
                'icons': icons[i]
            }


