---
layout: layout-sidebar
name: Add-in capabilities
order: 30
published: true
showInNav: true
title: Add-in capabilities
---
{{ include stache.config.partial_header_edit }}

# {{ name }}

### Showing a modal

Using the <a href="https://github.com/blackbaud/sky-addin-client" target="_new">Add-in Client JavaScript library</a>, SKY Add-ins are capable of launching a "modal" user experience to show more details or gather additional input from the user.  The modal will be rendered in a separate full-screen iframe to maximize the available real estate (meaning, it will not be scoped to the bounds of the add-in's initial iframe).

To launch a modal, call the showModal function on the client, passing the URL for the modal and any context data needed by the modal:

```js
var client = new AddinClient({...});

// To launch a modal, call the showModal method
client.showModal({
  url: '<modal-addin-url>',
  context: { /* arbitrary context object to pass to modal */ }
});
```

#### The modal add-in

The host page will show a full-screen mask element to block user input, and then launch a full-screen iframe for the URL provided.  The modal iframe will be loaded in the same way it does for other types of add-ins. The modal page must also pull in the SKY Add-in Client library and make use of the `AddinClient` class.

The modal add-in will be responsible for rendering the modal element itself (including any chrome around the modal content). To create a native-looking modal experience, the modal add-in may set the page body background to `transparent` and immediately launch a SKY UX modal within its full screen iframe.

As with a typical add-in, the modal add-in should register for the `init` callback and will receive the `envId` in the arguments. The context field for arguments will match the context object passed into the showModal call from the parent add-in. Note that this is crossing iframes so the object has been serialized and deserialized. It can be used for passing data but not functions.

#### Closing the modal

The modal add-in (not the parent add-in) is responsible for closing itself using the `closeModal` function on the `AddinClient`.  It is able to pass context information back to the parent add-in:

```js
// Modal add-in rendered in full screen iframe
var client = new AddinClient({...});
client.closeModal({
  context: { /* arbitrary context object to pass to parent add-in */ }
});
```

The parent add-in can listen to the close event via the `modalClosed` Promise returned from `showModal`. The Promise will resolve when the modal is closed, and will include the context data returned from the modal:

```js
// Parent add-in launching a modal
var client = new AddinClient({...});

// provide some context values from the parent add-in to the modal add-in
var modalContext = {
  someProperty: "Foo",
  anotherProperty: "Bar"
};

client.showModal({
  url: '<modal-addin-url>',
  context: modalContext
}).modalClosed.then((context) => {
  // context represents data returned by the closeModal method
});
```

### Navigate the parent page

An add-in can choose to navigate the parent page based on user interactions. To do so, call the `navigate` method on the `AddinClient` object.  This function takes an object argument with property `url` for where to navigate. A fully qualified url should be used:

```js
var client = new AddinClient({...});
client.navigate({ url: '<target_url>' });
```

### Opening the Blackbaud help window

An add-in can instruct the parent page to display the Help flyout window, and specify which page to display.  To do this, call the `openHelp` method on the `AddinClient` object. This function takes an object argument with property `helpKey` for the name of the help tab to display. A single .html file should be named.

```js
var client = new AddinClient({...});
client.openHelp({ helpKey: '<target_page>.html' });
```