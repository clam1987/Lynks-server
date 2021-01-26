const addressFormatter = data => data.replace(/[^a-z0-9]+/gi, '-').replace(/^-+/, '').replace(/-+$/, '').toLowerCase();

const streetFormatte = data => {
    const USPSMap = {
        "apartment": "Apt",
        "avenue": "Ave",
        "boulevard": "Blvd",
        "building": "Bldg",
        "center": "Ctr",
        "centers": "Ctr",
        "circles": "Ctr",
        "court": "Ct", 
        "drive": "Dr",
        "east": "E",
        "expressway": "Expy", 
        "extension": "Ext",
        "fort": "Ft", 
        "freeway": "Fwy", 
        "height": "Hts",
        "heights": "Hts", 
        "highway": "Hwy", 
        "island": "Is",
        "junction": "Jct", 
        "lane": "Ln", 
        "mount": "Mt",
        "mountain": "Mt", 
        "north": "N", 
        "northeast": "NE", 
        "northwest": "NW", 
        "parkway": "Pky", 
        "place": "Pl", 
        "post-office": "PO",  
        "road": "Rd", 
        "rural-delivery": "RD", 
        "rural-route": "RR", 
        "saint": "St", 
        "south": "S", 
        "southeast": "SE", 
        "southwest": "SW", 
        "spring": "Spg", 
        "springs": "Spgs", 
        "square": "Sq",
        "squares": "Sq", 
        "street": "St", 
        "suite": "Ste", 
        "terrace": "Ter", 
        "turnpike": "Tpke", 
        "west": "W"     
}
}

module.exports = {
    addressFormatter,
}