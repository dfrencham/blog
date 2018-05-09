$(document).ready(function () {

  $('#gdrive_input').on('input', function () {

    $('#gdrive_messages-error').hide();
    $('#gdrive_messages-success').hide();
    var link = $('#gdrive_input').val();
    var fixedLink = 'http://drive.google.com/uc?export=view&id=';

    var patt = new RegExp("https://drive\.google\.com/file/./(.*)/.*");
    var result = patt.exec(link);

    if (link != '') {
      if ((result != null) && (result.length === 2)) {
        $('#gdrive_messages-success').text('Link found: ' + fixedLink + result[1]);
        $('#gdrive_messages-success').show();
      }
      else {
        $('#gdrive_messages-error').text('Link not valid');
        $('#gdrive_messages-error').show();
      }
    }

  });
});