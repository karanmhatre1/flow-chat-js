(function( $ ) {

  $.fn.flowchat = function( options ) {

    // override options with user preferences

    var settings = $.extend({
      delay: 1500,
      startButtonId: '#startButton',
      autoStart: true,
      startMessageId: 1,
      data: null
    }, options );

    var container = $(this)

    $(function() {

      if(settings.autoStart)
        startChat(container, settings.data, settings.startMessageId, settings.delay)
    });

    $(document).on('click', '.options li', function() {

      // clear the options when one option is selected by the user
      $(this).parent().hide();

      // insert user chat
      userReply = '<li class="user"><div class="text">'+ $(this).html() +'</div></li>';
      container.children('.chat-window').append(userReply);

      // get the next message
      messages = settings.data;
      nextMessageId = $(this).attr('data-nextId');
      nextMessage = findMessageInJsonById(messages, nextMessageId);

      // add next message
      generateMessageHTML(messages, nextMessage, settings.delay);

    });

    // on click of Start button
    $(document).on('click', settings.startButtonId, function() {

      startChat(container, settings.data, settings.startMessageId, settings.delay)

    });
  }

  function startChat(container, data, startId, delay) {
    // clear chat window
    container.html("");
    container.append("<ul class='chat-window'></ul>");

    // get the first message
    message = findMessageInJsonById(data, startId);

    // add message
    generateMessageHTML(data, message, delay);
  }

  function findMessageInJsonById(data, id) {

    var messages = data;

    for (i = 0; messages.length > i; i ++)
      if (messages[i].id == id)
        return messages[i];

  }

  function addOptions(m) {

    template = '<li class="options"><ul>'

    for (i=1;i<6;i++){
      optionText = m["option"+i]
      optionMessageId = m["option"+i+"_nextMessageId"]

      if (optionText != "") // add option only if text exists
        template = template + "<li data-nextId=" + optionMessageId + ">" + optionText + "</li>"
    }

    template = template + '</ul></li>';

    return template;
  }

  function toggleLoader(status) {
    if(status=="show")
      $('.chat-window').append("<li class='typing-indicator'><span></span><span></span><span></span></li>");
    else
      $('.typing-indicator').remove();
  }

  function generateMessageHTML(messages, m, delay) {

    // create template
    template = '<li class="bot"><div class="text">'+ m.text +'</div></li>';

    // if the message is a question then add options
    if (m.messageType == "Question")
      template = template + addOptions(m);

    toggleLoader("show");

    $(".chat-window").scrollTop($(".chat-window").prop('scrollHeight'));

    // add delay to chat message
    setTimeout(function() {

      toggleLoader("hide");
      $('.chat-window').append(template);

      $(".chat-window").scrollTop($(".chat-window").prop('scrollHeight'));

      // call recursively if nextMessageId exists
      if (m.nextMessageId != "") {
        console.log(m.nextMessageId);
        nextMessage = findMessageInJsonById(messages, m.nextMessageId)
        generateMessageHTML(messages, nextMessage, delay)
      }

    }, delay);
    // end delay

  } // end function

}( jQuery ));