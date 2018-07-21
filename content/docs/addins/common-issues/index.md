---
layout: "layout-sidebar"
name: Common issues with add-ins
order: 60
published: true
showInNav: true
title: Common add-in issues
---
{{ include stache.config.partial_header_edit }}

# {{ name }}

### Add-in does not appear

Add-ins support conditional visibility, which allows for an add-in to perform initialization logic to determine whether it should be shown or not.  By default, add-ins are hidden and must inform the parent page when it's time to be shown.  This happens as part of the `init` callback from the host application.

Using the information provided in the `init` arguments, the add-in should determine if and how it should be rendered.  Then it should call the `ready` callback, informing the host page.

```js
var client = new AddinClient({
callbacks: {
    init: (args) => {
      args.ready({ showUI: true, title: 'My Custom Tile Title' });
    }
}
});
```

For more information, see the <a href="https://github.com/blackbaud/sky-addin-client" target="_new">Add-in Client JavaScript library</a>