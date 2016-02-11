'use strict';
/* globals $, data, ListFilter */

var listFilter = new ListFilter(data);


function refresh() {
  var content = $('#content');
  content.html('');
  var filterUser = false;
  var filterText = '';

  if ($('#filterDescription').val().length>0) {
    filterText = $('#filterDescription').val();
  }

  if ($('#filterUsers').is(':checked')) {
    filterUser = true;
  }

  var list = listFilter.getCurrentPage(filterUser, filterText);

  content.append(listFilter.render(list));
  $('#pageNumber').html('Page number: '+(listFilter.getPageNumber()+1));

  if ((listFilter.totalPages()-1)<=listFilter.getPageNumber()) {
    $('#nextPage').prop('disabled', true);
  } else {
    $('#nextPage').prop('disabled', false);
  }
}

$(document).ready(function() {
  refresh();

  $('#itemsPage').on('change', function() {
    listFilter.setItemsPerPage(parseInt($(this).find('option:selected').val(),10));
    refresh();
  });

  $('#filterUsers').on('change', function() {
    refresh();
  });

  $('#filterDescription').on('keyup', function() {
    refresh();
  });

  $('#nextPage').on('click', function() {
    listFilter.setPageNumber(listFilter.getPageNumber()+1);
    refresh();
  });
});