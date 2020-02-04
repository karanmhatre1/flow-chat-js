# Flow Chat JS Plugin

A Javascript plugin to help developers build simple conversational chat flow.

![License](https://img.shields.io/npm/l/@oclif/example-plugin-js.svg)

## Demos

[Flow Chat Demo](http://karanmhatre.com/flow-chat-js-demo.html)

## Usage
### Include With Vanilla JS

1. Include JQuery
1. Include the main script and
2. target elements using JS notation:

```html
<script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
<script src="textblock.min.js"></script>

<script>
  $('#flowchat').flowchat({
    data: false, // require a JSON to be passed
    delay: 1500,
    startButtonId: '#startButton',
    autoStart: true,
    startMessageId: 1
  });
</script>

```

## Parameters

- **`data`** (required): default `false`. Data should be passed as a JSON. Check format of the JSON below.
- **`delay`**: default '1500'ms. This allows you to add a time delay to simulate typing before the bot messages.
- **`startButtonId`**: default `#startButton`. You can define a start button id. Clicking this button will restart the chat flow.
- **`autoStart`**: default `true`. If true, the chat flow will start as soon as the page load. If you need to delay the start, set it to 'false'
- **`startMessageId`**: default `1`. Change if you wish to start from a different message id.

## JSON format

I have included as .tsv file as a demo. You can modify the TSV, [covert it to a JSON](https://www.csvjson.com/csv2json), and use.


This is the format for a single message.
```json
{
  "id": 1,
  "text": "How are you?",
  "messageType": "Question",
  "imageUrl": "",
  "nextMessageId": "",
  "option1": "Fine",
  "option1_nextMessageId": 2,
  "option2": "Good",
  "option2_nextMessageId": "3",
  "option3": "No Good",
  "option3_nextMessageId": "4",
  "option4": "",
  "option4_nextMessageId": "",
  "option5": "",
  "option5_nextMessageId": "",
  "option6": "",
  "option6_nextMessageId": ""
}
```

- **`id`** (required): This is the message id. Should be kept unique.
- **`text`**: The message to be sent.
- **`messageType`**: Currently supports TEXT, and QUESTION. If QUESTION, then options will be presented to the user.
- **`nextMessageId`**: If type of message is TEXT, then the next message based on this field will be auto-triggered.
- **`option1`**: If type is a "Question", then option text will be shown to the user to select as input.
- **`option1_nextMessageId`**: If user selects option 1, then the id of the next message to be sent.

You can add as many message as you like and chain them together. The conversation will end when there is no "nextMessageId"

## Future Scope

- Future Scope
- Image and GIF support
- URL message support
- Designing options - background image, etc.
- TSV to JSON converter
- Link to Google Spreadsheet to pull data
