'use strict';
/* globals $ */

 /*jshint unused:false*/
function ListFilter(dataSet) {
  var data = dataSet.data;
  var itemsPerPage = 10;
  var pageNumber = 0;
  var currentList = data;

  var setPageNumber = function(number) {
    pageNumber = number;
  };

  var getPageNumber = function() {
    return pageNumber;
  };

  var totalPages = function () {
    return data.length/itemsPerPage;
  };

  var setItemsPerPage = function(maxPage) {
    itemsPerPage = maxPage;
  };

  var filterUsersByLikes = function(num) {
    if (!num) {
      num = 10;
    }

    currentList = currentList.filter( function(item) {
      return item.user.metadata.connections.likes.total>num;
    });
  };

  var filterDescription = function(text) {
    currentList = currentList.filter( function(item) {
      var result = false;
      if (!!item.description) {
        result = item.description.indexOf(text)>-1;
      }
      
      return result;
    });
  };

  var getCurrentPage = function(filterUser, filterText) {
    currentList = data;

    if (filterText && filterText !== '') {
      filterDescription(filterText);
    }

    if (filterUser) {
      filterUsersByLikes();
    }


    if (currentList.length <= pageNumber*itemsPerPage) {
      pageNumber = Math.ceil(currentList.length/itemsPerPage) - 1;
    }

    currentList = currentList.slice(pageNumber*itemsPerPage, (pageNumber*itemsPerPage)+itemsPerPage);

    return currentList;
  };


  var render = function() {
    var ul = $('<ul></ul>');
    var list = currentList;
    var length = list.length;
    var li;

    for (var i=0; i<length; i++) {
      var avatar = 'http://placehold.it/70x70';

      if (list[i].user.pictures) {
        var idx = list[i].user.pictures.sizes.length-1;
        avatar = list[i].user.pictures.sizes[idx].link;
      }

      li = $(
        '<li class="video">'+
          '<section class="author">'+
            '<a href="'+list[i].user.link+'">'+
              '<img src="'+avatar+'">'+
            '</a>'+
          '</section>'+
          '<section class="info">'+
            '<h2>'+
              '<a href="'+list[i].link+'">'+
                list[i].name+
              '</a>'+
            '</h2>'+
            '<p class="description">'+
              list[i].description+
            '</p>'+
            '<div class="meta">'+
              '<span class="plays">Plays: '+
                list[i].stats.plays+
              '</span>'+
              '<span class="comments">Comments: '+
                list[i].metadata.connections.comments.total+
              '</span>'+
              '<span class="likes">Likes: '+
                list[i].metadata.connections.likes.total+
              '</span>'+
            '</div>'+
          '</section>'+
        '</li>');
      ul.append(li);
    }

    return ul;
  };

  return {
    getCurrentPage: getCurrentPage,
    setItemsPerPage: setItemsPerPage,
    render: render,
    filterUsersByLikes: filterUsersByLikes,
    filterDescription: filterDescription,
    getPageNumber: getPageNumber,
    setPageNumber: setPageNumber,
    totalPages: totalPages
  };
}