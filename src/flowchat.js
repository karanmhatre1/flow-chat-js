"use strict";
(function( $ ) {

  $.fn.flowchat = function( options ) {

    // override options with user preferences

    var settings = $.extend({
      delay: 1500,
      startButtonId: '#startButton',
      autoStart: true,
      startMessageId: 1,
      dataJSON: null
    }, options );

    var container = $(this);

    $(function() {
      if(settings.autoStart)
        startChat(container, settings.dataJSON, settings.startMessageId, settings.delay)
    });

    $(document).on('click', '#' + container.attr('id') + ' .options li', function() {

      // clear the options when one option is selected by the user
      $(this).parent().hide();

      // insert user chat
      var userReply = '<li class="user"><div class="text">'+ $(this).html() +'</div></li>';
      container.children('.chat-window').append(userReply);

      // get the next message
      var messages = settings.dataJSON;
      var nextMessageId = $(this).attr('data-nextId');
      var nextMessage = findMessageInJsonById(messages, nextMessageId);

      // add next message
      generateMessageHTML(container, messages, nextMessage, settings.delay);

    });

    // on click of Start button
    $(document).on('click', settings.startButtonId, function() {

      startChat(container, settings.dataJSON, settings.startMessageId, settings.delay)

    });
  }

  function startChat(container, data, startId, delay) {
    // clear chat window
    container.html("");
    container.append("<ul class='chat-window'></ul>");

    // get the first message
    var message = findMessageInJsonById(data, startId);

    // add message
    generateMessageHTML(container, data, message, delay);
  }

  function findMessageInJsonById(data, id) {

    var messages = data;

    for (var i = 0; messages.length > i; i ++)
      if (messages[i].id == id)
        return messages[i];

  }

  function addOptions(m) {

    var template = '<li class="options"><ul>';

    var optionText = null;

    var optionMessageId = null;

    for (var i=1;i<6;i++) {
      optionText = m["option"+i]
      optionMessageId = m["option"+i+"_nextMessageId"]

      if (optionText != "" && optionText != undefined && optionText != null) // add option only if text exists
        template = template + "<li data-nextId=" + optionMessageId + ">" + optionText + "</li>"
    }

    template = template + '</ul></li>';

    return template;
  }

  function toggleLoader(status, container) {
    if(status=="show")
      container.children('.chat-window').append("<li class='typing-indicator'><span></span><span></span><span></span></li>");
    else
      container.find('.typing-indicator').remove();
  }

  function generateMessageHTML(container, messages, m, delay) {

    // create template
    var template = '<li class="bot"><div class="text">'+ m.text +'</div></li>';

    // if the message is a question then add options
    if (m.messageType == "Question")
      template = template + addOptions(m);

    toggleLoader("show", container);

    container.children(".chat-window").scrollTop($(".chat-window").prop('scrollHeight'));

    // add delay to chat message
    setTimeout(function() {

      toggleLoader("hide", container);

      container.children('.chat-window').append(template);

      container.children(".chat-window").scrollTop($(".chat-window").prop('scrollHeight'));

      // call recursively if nextMessageId exists
      if (m.nextMessageId != "") {
        var nextMessage = findMessageInJsonById(messages, m.nextMessageId)
        generateMessageHTML(container, messages, nextMessage, delay)
      }

    }, delay);
    // end delay

  } // end function

}( jQuery ));