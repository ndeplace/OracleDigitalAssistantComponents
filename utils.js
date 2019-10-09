var unless = function (path, middleware) {
    return function(req, res, next) {
        if (path === req.path) {
            return next();
        } else {
            return middleware(req, res, next);
        }
    };
};


var getCityCode = function(city){
    let getCityCode = '000';

    if(city.toLowerCase()=="strasbourg"){getCityCode = '0x70388934c1b';}
    if(city.toLowerCase()=="nantes"){getCityCode = '0x705555681fc';}
    if(city.toLowerCase()=="lille"){getCityCode = '0x7054492eb4d';}
    if(city.toLowerCase()=="marseille"){getCityCode = '0x70187919fa5';}
    if(city.toLowerCase()=="lyon"){getCityCode = '0x70394254ead';}
    if(city.toLowerCase()=="toulouse"){getCityCode = '0x7036119a63d';}


    return getCityCode;
};

var getEventId = function(city){
    let getEventId = '000';

    if(city.toLowerCase()=="strasbourg"){getEventId = '32746';}
    if(city.toLowerCase()=="nantes"){getEventId = '32810';}
    if(city.toLowerCase()=="lille"){getEventId = '32806';}
    if(city.toLowerCase()=="marseille"){getEventId = '32666';}
    if(city.toLowerCase()=="lyon"){getEventId = '32748';}
    if(city.toLowerCase()=="toulouse"){getEventId = '32734';}


    return getEventId;
};


var getEventImage = function(url){
    let getEventImage = 'https://www.oracle.com/a/ocom/img/976x300-bnr-lpl-autonomous.jpg';

    if(url=="https://eventreg.oracle.com/profile/web/index.cfm?PKwebID=0x622270abcd&source=EMMK181220P00062:OW:ES:LV"){getEventImage = 'https://www.oracle.com/a/ocom/img/dc/oer100731246-banner.jpg';}
    if(url=="https://eventreg.oracle.com/profile/web/index.cfm?PKwebID=0x619553abcd&source=EMMK181017P00015:OW:ES:LV"){getEventImage = 'https://www.oracle.com/a/ocom/img/dc/em/one-to-one-monacobannerv2.jpg';}
    if(url=="https://eventreg.oracle.com/profile/web/index.cfm?PKwebID=0x603954abcd&source=WWSA181109P00063:OW:ES:LV"){getEventImage = 'https://www.oracle.com/a/ocom/img/dc/em/event-banner-oer100763647.jpg';}
    if(url=="https://eventreg.oracle.com/profile/web/index.cfm?PKwebID=0x621662abcd&source=EMMK190124P00039:OW:ES:LV"){getEventImage = 'https://www.oracle.com/a/ocom/img/dc/em/oraclefrance976.png';}
    if(url=="https://eventreg.oracle.com/profile/web/index.cfm?PKwebID=0x622935abcd&source=EMMK190124P00036:OW:ES:LV"){getEventImage = 'https://www.oracle.com/a/ocom/img/dc/em/oraclefrance976.png';}
    if(url=="https://eventreg.oracle.com/profile/web/index.cfm?PKwebID=0x620123abcd&source=EMMK190124P00041:OW:ES:LV"){getEventImage = 'https://www.oracle.com/a/ocom/img/dc/em/oraclefrance976.png';}
    if(url=="https://eventreg.oracle.com/profile/web/index.cfm?PKwebID=0x619629abcd&source=EMMK190116P00024:OW:ES:LV"){getEventImage = 'https://www.oracle.com/a/ocom/img/dc/oer100777148-emslink.jpg';}
    if(url=="https://eventreg.oracle.com/profile/web/index.cfm?PKwebID=0x625025abcd&source=EMMK190201P00002:OW:ES:LV"){getEventImage = 'https://www.oracle.com/a/ocom/img/dc/em/eventopaoracledxc78555.jpg';}
    if(url=="https://eventreg.oracle.com/profile/web/index.cfm?PKwebID=0x628673abcd&source=EMMK190114P00023:OW:ES:LV"){getEventImage = 'https://www.oracle.com/a/ocom/img/dc/em/event-bannière-lp-oer100786961.jpg';}
    

    return getEventImage;
};



module.exports = {
    unless: unless,
    getCityCode : getCityCode,
    getEventId : getEventId,
    getEventImage : getEventImage
  }