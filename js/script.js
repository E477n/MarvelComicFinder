$(document).ready(function(){
    $('.manage-bar').hide();
    $("#advancedSearch").click(function(){
        $(".manage-bar").toggle(1000);
    });
});


$(function () {
    $("#datepicker").datepicker({
        format: "yyyy",
        viewMode: "years",
        minViewMode: "years"
    });
});

function checkInput(){
    var condition = true;
    var title = $('#title').val();
    var startYear = $('#startYear').val();
    if(title == '' && startYear == ''){
        $('#warningMessage').html('please enter a comic title and start year');
        return false;
    }
    else if(title == '' && startYear != '' ){
        $('#warningMessage').html('please enter a comic title or initial letter');
        return false;
    }
    else if(title != '' && startYear == ''){
        $('#warningMessage').html('please select a start year');
        return false;
    }
    else{
        return true;
    }

}


var PRIVATE_KEY = "c0ae57951cc6640e698010f6ea7e4df8aa9b0995";
var PUBLIC_KEY = "658926fc61920c69f7d438579f287117";

var searchResultPage = [];
function getMarvelResponse(){
    searchResultPage = [];
    var ts = new Date().getTime();
    var hash = md5(ts + PRIVATE_KEY + PUBLIC_KEY).toString();
    var url = 'http://gateway.marvel.com:80/v1/public/comics';

    var title = $('#title').val();
    var startYear = $('#startYear').val();

    $.ajax({
    type: "GET",
    url: url,
    data: {
        ts: ts,
        apikey: PUBLIC_KEY,
        hash: hash,
        limit: 100,
        titleStartsWith: title,
        startYear: startYear
    },
    async: false,
    cache: true,
    success: function (data) {
        console.log(data);
        $('#resultRow').html('');
        if(data.data.total == 0){
            $('#resultNumber').html('Sorry, no results found. Please try other titles or dates.');
        }
        else{
            $('#resultNumber').html('We found ' + data.data.total + ' results for you.');
        }
        for(var i =0; i < data.data.count; i++){
            getCharacterResponse(data.data.results[i].characters.collectionURI, ts, hash, data.data.results[i].title);
        }
        if(data.data.total>100){
            for(i=100;i<data.data.total;i=i+100){
                $.ajax({
                    type: "GET",
                    url: url,
                    data: {
                        ts: ts,
                        apikey: PUBLIC_KEY,
                        hash: hash,
                        limit: 100,
                        offset: i,
                        titleStartsWith: title,
                        startYear: startYear
                    },
                    async: false,
                    cache: true,
                    success: function (data) {
                        console.log(data);
                        for(var j =0; j < data.data.count; j++){
                            getCharacterResponse(data.data.results[j].characters.collectionURI, ts, hash, data.data.results[j].title);
                        }
                    }
                });
            }
        }

        }
    });
    var pagenumber = Math.ceil(searchResultPage.length / 10);
    $('.pagination').html('');
    for(var i=1; i<=pagenumber; i++){
        $('.pagination').append('<li id="' + i + '" class="page-item" onclick="pageSwitch(this)"><a class="page-link" href="#">' + i +'</a></li>\n');
    }
    for(var j=0; j<10; j++){
        $('#resultRow').append(searchResultPage[j]);
    }
};

function getMarvelResponseAdvance(columnarray, sortbycolumn, sortorder){
    searchResultPage = [];
    var ts = new Date().getTime();
    var hash = md5(ts + PRIVATE_KEY + PUBLIC_KEY).toString();
    var url = 'http://gateway.marvel.com:80/v1/public/comics';

    var title = $('#title').val();
    var startYear = $('#startYear').val();

    var countResults = 0;
    $('#resultRow').html('');
    if(sortbycolumn == ""){//default
        $.ajax({
        type: "GET",
        url: url,
        data: {
            ts: ts,
            apikey: PUBLIC_KEY,
            hash: hash,
            limit: 100,
            titleStartsWith: title,
            startYear: startYear,
        },
        async: false,
        cache: true,
        success: function (data) {
            console.log(data);
            for (var i = 0; i < data.data.count; i++) {
                if (columnarray.indexOf(data.data.results[i].format) != -1) {
                    getCharacterResponse(data.data.results[i].characters.collectionURI, ts, hash, data.data.results[i].title);
                    countResults++;
                }
            }
            if(data.data.total>100){
                for(i=100;i<data.data.total;i=i+100){
                    $.ajax({
                        type: "GET",
                        url: url,
                        data: {
                            ts: ts,
                            apikey: PUBLIC_KEY,
                            hash: hash,
                            limit: 100,
                            offset: i,
                            titleStartsWith: title,
                            startYear: startYear
                        },
                        async : false,
                        cache: true,
                        success: function (data) {
                            console.log(data);
                            for(var j =0; j < data.data.count; j++){
                                if (columnarray.indexOf(data.data.results[j].format) != -1) {
                                    getCharacterResponse(data.data.results[j].characters.collectionURI, ts, hash, data.data.results[j].title);
                                    countResults++;
                                }
                            }
                        }
                    });
                }
            }
            if (countResults == 0) {
                $('#resultNumber').html('Sorry, no results found. Please try other titles or dates.');
            }
            else {
                $('#resultNumber').html('We found ' + countResults + ' results for you.');
            }
        }
        });
    }
    else{
        $.ajax({
        type: "GET",
        url: url,
        data: {
            ts: ts,
            apikey: PUBLIC_KEY,
            hash: hash,
            limit: 100,
            titleStartsWith: title,
            startYear: startYear,
            orderBy: sortorder+sortbycolumn ,
        },
        async: false,
        cache: true,
        success: function (data) {
            console.log(data);
            for (var i = 0; i < data.data.count; i++) {
                if (columnarray.indexOf(data.data.results[i].format) != -1) {
                    getCharacterResponse(data.data.results[i].characters.collectionURI, ts, hash, data.data.results[i].title);
                    countResults++;
                }
            }
            if(data.data.total>100) {
                for (i = 100; i < data.data.total; i = i + 100) {
                    $.ajax({
                        type: "GET",
                        url: url,
                        data: {
                            ts: ts,
                            apikey: PUBLIC_KEY,
                            hash: hash,
                            limit: 100,
                            offset: i,
                            titleStartsWith: title,
                            startYear: startYear
                        },
                        async : false,
                        cache: true,
                        success: function (data) {
                            console.log(data);
                            for (var j = 0; j < data.data.count; j++) {
                                if (columnarray.indexOf(data.data.results[j].format) != -1) {
                                    getCharacterResponse(data.data.results[j].characters.collectionURI, ts, hash, data.data.results[j].title);
                                    countResults++;
                                }
                            }
                        }
                    });
                }
            }
            if (countResults == 0) {
                $('#resultNumber').html('Sorry, no results found. Please try other titles or dates.');
            }
            else {
                $('#resultNumber').html('We found ' + countResults + ' results for you.');
            }
        }
        });
    }
    var pagenumber = Math.ceil(searchResultPage.length / 10);
    $('.pagination').html('');
    for(var i=1; i<=pagenumber; i++){
        $('.pagination').append('<li id="' + i + '" class="page-item" onclick="pageSwitch(this)"><a class="page-link" href="#">' + i +'</a></li>\n');
    }
    for(var j=0; j<10; j++){
        $('#resultRow').append(searchResultPage[j]);
    }
};


// function getCharacterResponse(characterURL, ts, hash, title){
//     var cname;
//     var cdesc;
//     var path;
//     var extension;
//     $.ajax({
//         type: "GET",
//         url: characterURL,
//         data: {
//             ts: ts,
//             apikey: PUBLIC_KEY,
//             hash: hash,
//             limit: 1
//         },
//         cache: true,
//         success: function(data){
//             if(data.data.results.length != 0){
//                 cname = data.data.results[0].name;
//                 cdesc = data.data.results[0].description;
//                 path = data.data.results[0].thumbnail.path;
//                 extension = data.data.results[0].thumbnail.extension;
//                 $('#resultRow').append('            <div class="card col-xs-6 col-sm-6 col=md-2 col-lg-2">\n' +
//                     '              <img class="card-img-top" src="' + path + '.' + extension + '" alt="character thumbnail">\n' +
//                     '              <div class="card-body">\n' +
//                     '                <h5 class="card-title">' + cname + '</h5>\n' +
//                     '                <p class="card-text">' + cdesc + '</p>\n' +
//                     '                <h6 class="card-title">' + title + '</h6>\n' +
//                     '              </div>\n' +
//                     '            </div>\n')
//             }
//             else if(data.data.results.length == 0){
//                 $('#resultRow').append('            <div class="card col-xs-6 col-sm-6 col=md-2 col-lg-2">\n' +
//                     '              <img class="card-img-top" src="photo/replaceImage.jpg" alt="no character found">\n' +
//                     '              <div class="card-body">\n' +
//                     '                <h5 class="card-title"></h5>\n' +
//                     '                <p class="card-text">no character found</p>\n' +
//                     '                <h6 class="card-title">' + title + '</h6>\n' +
//                     '              </div>\n' +
//                     '            </div>\n')
//             }
//         }
//     });
// }

function getCharacterResponse(characterURL, ts, hash, title){
    var cname;
    var cdesc;
    var path;
    var extension;
    $.ajax({
        type: "GET",
        url: characterURL,
        data: {
            ts: ts,
            apikey: PUBLIC_KEY,
            hash: hash,
            limit: 1
        },
        async: false,
        cache: true,
        success: function(data){
            if(data.data.results.length != 0){
                cname = data.data.results[0].name;
                cdesc = data.data.results[0].description;
                path = data.data.results[0].thumbnail.path;
                extension = data.data.results[0].thumbnail.extension;
                searchResultPage.push('            <div class="card col-xs-6 col-sm-6 col=md-2 col-lg-2">\n' +
                    '              <img class="card-img-top" src="' + path + '.' + extension + '" alt="character thumbnail">\n' +
                    '              <div class="card-body">\n' +
                    '                <h5 class="card-title">' + cname + '</h5>\n' +
                    '                <p class="card-text">' + cdesc + '</p>\n' +
                    '                <h6 class="card-title">' + title + '</h6>\n' +
                    '              </div>\n' +
                    '            </div>\n')
            }
            else if(data.data.results.length == 0){
                searchResultPage.push('            <div class="card col-xs-6 col-sm-6 col=md-2 col-lg-2">\n' +
                    '              <img class="card-img-top" src="photo/replaceImage.jpg" alt="no character found">\n' +
                    '              <div class="card-body">\n' +
                    '                <h5 class="card-title"></h5>\n' +
                    '                <p class="card-text">no character found</p>\n' +
                    '                <h6 class="card-title">' + title + '</h6>\n' +
                    '              </div>\n' +
                    '            </div>\n')
            }
        }
    });
}

function pageSwitch(obj){
    var gotopage = parseInt($(obj).attr("id"));
    $('#resultRow').html('');
    for(var i=0; i<10; i++){
        $('#resultRow').append(searchResultPage[(gotopage-1)*10+i]);
    }
}

function startSearch(){
    if(checkInput() == true){
        $('#warningMessage').html('');
        if($('.manage-bar').css('display') == 'none'){
            getMarvelResponse();
        }
        else{
            var columnarray = new Array();
            var sortbycolumn = $('#sortbycolumn').val();
            var sortorder = $('#sortorder').val();
            if($('#cb1').is(':checked')){
                columnarray.push($('#cb1').val());
            }
            if($('#cb2').is(':checked')){
                columnarray.push($('#cb2').val());
            }
            if($('#cb3').is(':checked')){
                columnarray.push($('#cb3').val());
            }
            getMarvelResponseAdvance(columnarray, sortbycolumn, sortorder);
        }
    }
}

function reset(){
    $('#title').val('');
    $('#startYear').val('');
    $('#cb1').prop('checked', true);
    $('#cb2').prop('checked', true);
    $('#cb3').prop('checked', true);
    $('#sortbycolumn').val('');
    $('#sortorder').val('');
    $('#resultRow').html('');
    $('#nav').html('');
    $('#warningMessage').html('');
    $('#resultNumber').html('');
}
