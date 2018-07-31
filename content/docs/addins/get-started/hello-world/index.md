---
layout: layout-sidebar
name: Hello world sample add-in
order: 200
published: true
showInNav: true
title: Hello world sample add-in
---
{{ include stache.config.partial_header_edit }}

# {{ name }}

In this article, we'll walk through the process of building a custom tile for the Constituent page using the SKY Add-in framework.  This add-in will be a pure client-side implementation using only vanilla HTML, CSS, and JavaScript (note that you can use any language or tech-stack you'd like however).

## Project scaffolding
 
First, we'll open Visual Studio (we're using VS 2017 here, but any version will work), and create a new ASP.NET Web Application.

<img style="border:none" src="/assets/img/new_web_app.png" class="img-responsive">

To keep things simple, we'll use the Empty template and enable Web API.

<img style="border:none" src="/assets/img/new_web_app_template.png" class="img-responsive">

Once Visual Studio has finished scaffolding the project, we'll manually add a few files (and for simplicity, we'll add them to the root folder).  Specifically, we'll add:

- An HTML file to contain the markup for the add-in.
- A JavaScript file to contain the client-side code for the add-in (this could of course be embedded into the HTML file, but we'll separate them to keep things clean).
- A CSS file which we'll use to provide some basic styling for the tile.
 
## Create the add-in files
 
First, let's add the HTML file.

<img style="border: none" src="/assets/img/addin_html_file.jpg" class="img-responsive">

Next, add the JavaScript file.

<img style="border: none" src="/assets/img/addin_js_file.jpg" class="img-responsive">

And finally, add the CSS file.

<img style="border: none" src="/assets/img/addin_css_file.jpg" class="img-responsive">
 
## Define the add-in markup
 
Visual Studio will produce a very basic HTML file like this:

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title></title>
</head>
<body>
    
</body>
</html>
```
 
We're going to be using a few <a href="https://jquery.com/">jQuery</a> statements in our JavaScript, so we'll also add jQuery to the page by referencing the latest version from the jQuery CDN, as <a href="http://jquery.com/download/#using-jquery-with-a-cdn">documented on their website</a>.

```html
<script src="https://code.jquery.com/jquery-3.2.1.min.js" integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4=" crossorigin="anonymous"></script>
```
 
Next, a requirement for SKY Add-ins is that they must include the Add-in Client JavaScript library on the page to facilitate the interop with the host application.  This library is <a href="https://github.com/blackbaud/sky-addin-client" target="_new">open source on GitHub</a> and available as an <a href="https://www.npmjs.com/package/@blackbaud/sky-addin-client" target="_new">npm package</a>.  You can add it to the page a few different ways, but for simplicity here, we'll just reference it from one of the npm CDNs:

```html
<script src="https://cdn.jsdelivr.net/npm/@blackbaud/sky-addin-client@1.0.0/bundles/sky-addin-client.umd.min.js"></script>
```

We'll also add a few lines to the `<head>` to include our tile's JavaScript and CSS files on the page:

```html
<script src="HelloWorld.js"></script>
<link href="HelloWorld.css" rel="stylesheet" />
```
 
Finally, we'll add the obligatory "hello world" text so we have something to show in the UI:

```html
<h2>Hello world!</h2>
<span>This is a simple custom tile</span>
```

So now, our initial HTML is complete:

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title></title>

    <script src="https://code.jquery.com/jquery-3.2.1.min.js" integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4=" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/@blackbaud/sky-addin-client@1.0.0/bundles/sky-addin-client.umd.min.js"></script>

    <script src="HelloWorld.js"></script>
    <link href="HelloWorld.css" rel="stylesheet" />
</head>
<body>
    <h2>Hello world!</h2>
    <span>This is a simple custom tile</span>
</body>
</html>
```
 
## Style the add-in
 
Next, let's shift focus to our stylesheet – not much to do here, just give the body a bit of padding. To note, we are still improving the default styling so this step may be optional in the future.

```css
body {
    margin-top: 20px;
}
``` 

## Basic add-in code
 
Now, on to the JavaScript…
 
First, we'll wrap our code in a self-executing function:

```js
(function () {

// Add-in code goes here

}());
```
 
As described in the <a href="https://github.com/blackbaud/sky-addin-client/blob/master/README.md" target="_new">sky-addin-client documentation</a>, Add-ins must be instantiated using the following JavaScript, which registers a callback with the host page.  This provides a mechanism for the host page to supply key contextual information to the add-in, and also provides a way for the add-in to inform the host page that it is ready to be rendered.  This allows add-in authors to conditionally display add-ins based on the context (ex: only show a tile for individuals who are board members). 
 
We'll start with the basic minimal requirement to get a tile showing:
 
```js
(function () {

  // Add-in code goes here

  // BBSkyAddinClient is global here.
  var client = new BBSkyAddinClient.AddinClient({
    callbacks: {
      init: (args) => {

        // perform any initialization needed for the add-in

        // when the tile is ready to be shown, inform the host page
        args.ready({ showUI: true, title: 'My Custom Tile' });
      }
    }
  });

}());
```
 
## Deploy the add-in
 
At this point, we can deploy our web application. We could serve it locally (ex: https://localhost:4000), but in this case, Visual Studio makes it easy to publish to an Azure App service.  For the purpose of this walk-through, we'll publish the web application to: `https://blackbaudaddinhelloworld.azurewebsites.net` (of course, since we've already claimed this Azure App Service name, you'll need to publish your working sample application to a different url)
 
As you'd expect, we can view the tile at: `https://blackbaudaddinhelloworld.azurewebsites.net/helloworld.html`

## Register the add-in

Now that our web application has been deployed, we can register it as part of our SKY API application by navigating to the <a href="https://developer.sky.blackbaud.com">SKY API Developer Portal</a>. From the **Developer Account** menu, select **My Applications**, and navigate to the SKY API application for which we want to register the add-in. 

<bb-alert bb-alert-type="warning">
<strong>Important!</strong> When you add add-in details to your SKY API application, the add-in will immediately become visible to any existing customers who've already enabled your SKY API application (as well as any customers who may enable your application in the future).  For development and testing purposes, we recommend using a non-production SKY API application to ensure your add-in functions properly before registering the add-in with your production application.</bb-alert>

On the application details page, select the **Add** button from within the **Add-ins** tile to create a new add-in definition:

<p><img style="border:none" src="/assets/img/add_addin_hello_world.png" class="img-responsive"></p>

On this dialog, we can provide the metadata about our add-in, including a friendly name to help distinguish this add-in from others we might create in the future, as well as the extension point (the location within the system where the add-in will be rendered), and the URL for the add-in itself.  In this case, we're building a custom tile for the constituent record page, so we'll choose the "Constituent Tile Dashboard" extension point.

A few notes about the URL:

- It must be an absolute and fully qualified URL, but it can include static parameter values.
- It must use HTTPS to avoid mixed content problems in the browser.
- We do support local development, so if you're able to serve the web site locally, you can provide a `localhost` value for the URL (for example:  `https://localhost:4000`).
 
<bb-alert bb-alert-type="success">
That all!  Once defined, the add-in will be shown for any customers who've enabled the SKY API application.</bb-alert>

## View the add-in
 
To view your add-in, visit the page or area within the system where the add-in will be rendered (according to the definition of the extension point).
 
When the page loads, our custom tile will appear (likely at the bottom of the page):

<p><img style="border: none" src="/assets/img/addin_custom_tile.jpg" class="img-responsive"></p>

The tile looks and behaves like any native tile within the system - users can drag the tile around, and the position (left or ride side) and state (expanded or collapsed) will be persisted along with other tile details.

## Show contextual values

Now, let's update the UI to display the various contextual values that are made available to add-ins.
 
First, we'll start by displaying the "environment ID" – you'll hear more about "environments" in the future, but for now you can think of the environment as a replacement for the concept of "tenant".  As described in the <a href="https://github.com/blackbaud/sky-addin-client" target="_new">SKY Addin Client library documentation</a>, the environment ID is provided as part of the `args` sent to the `init` callback function:

```js
  // BBSkyAddinClient is global here.
  var client = new BBSkyAddinClient.AddinClient({
    callbacks: {
      init: (args) => {

        // the environment ID is provided as part of the args object
        envId = args.envId;

        ...
      }
    }
  });
```
 
To show this value, we'll add the following markup to the HTML:

```html
<div>
    <p />
    <div>The environment ID is a context value that is available to all add-ins:</div>
    <span id="environmentId"></span>
</div>
``` 

Next, we'll display context values that are specific to the extension point itself. In the case of a "Constituent Tile Dashboard" extension point, the context value will be the ID of the constituent.  This context value is provided along with the environment ID as part of the args sent to the init function, and we'll show it in the UI by adding the following markup:

```html
<div>
    <p />
    <div>Additional context values vary for each extension point - for constituent tiles, the ID of the constituent is provided:</div>
    <span id="contextRecordId"></span>
</div>
``` 

You can find complete documentation for each extension point on the <a href="/docs/addins/concepts/extension-points">extension points</a> documentation page.
 
So now our HTML looks like this:
 
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title></title>

    <script src="https://code.jquery.com/jquery-3.2.1.min.js" integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4=" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/@blackbaud/sky-addin-client@1.0.0/bundles/sky-addin-client.umd.min.js"></script>

    <script src="HelloWorld.js"></script>
    <link href="HelloWorld.css" rel="stylesheet" />
</head>
<body>
    <h2>Hello world!</h2>
    <span>This is a very simple custom tile</span>

    <div>
        <p />
        <div>The environment ID is a context value that is available to all add-ins:</div>
        <span id="environmentId"></span>
    </div>

    <div>
        <p />
        <div>Additional context values vary for each extension point - for constituent tiles, the ID of the constituent is provided:</div>
        <span id="contextRecordId"></span>
    </div>

</body>
</html>
```

In our JavaScript file, we'll add the following lines to the `init` method before informing the host page to show the tile – this code will use jQuery to display the environment ID and context record ID.

```js
$('#environmentId').text(args.envId);
$('#contextRecordId').text(args.context.recordId);
```

The complete JavaScript is shown here.

```js
(function () {

  // BBSkyApiAddin is global here.
  var client = new BBSkyApiAddin.AddinClient({
    callbacks: {
      init: (args) => {
        
        $('#environmentId').text(args.envId);
        $('#contextRecordId').text(args.context.recordId);

        // inform the host page that the addin is ready to be shown
        args.ready({ showUI: true, title: 'My Custom Tile' });
      }
    }
  });

}());
``` 

## Fetch a user identity token

A final piece of contextual data that is available is the "user identity token".  This value can be used to convey the Blackbaud user ID in a secure fashion to the add-in's backend (where it can be validated and decoded).  Having this value on the server will provide a means of mapping the Blackbaud user to a user identity in the 3rd-party system.  Add-ins can obtain a user identity token by requesting it from the host page via the `getAuthToken` method of the <a href="https://github.com/blackbaud/sky-addin-client" target="_new">SKY Add-in Client JavaScript library</a>.
 
<bb-alert bb-alert-type="info">The "user identity token" is not the same as the SKY API access token and cannot be used to make calls to the SKY API.  For proper security, add-ins should expect to initiate the SKY API OAuth 2.0 Authorization Code flow by rendering a "Connect to SKY API" button in the add-in's user interface.  The result of that operation will be a SKY API access token, which (along with the Blackbaud user ID and environment ID) can be persisted along with the native user identity in the 3rd-party system.</bb-alert>
 
For the purpose of this simple demo, we'll simply fetch and display the user identity token value.  Later tutorials will demonstrate how to pass this token to the add-in's backend for validation.
 
Let's add the following markup to render a button in the UI for getting a user identity token:

```html
<div>
    <p />
    <div>Click the button to request a user identity token for the currently logged-in user</div>
    <button id="getAuthToken">Get auth token</button>
</div>

<div id="authToken">
    <p />
    <div>The following string represents the identity of the current user, and can be provided to the add-in's backend for validation:</div>
    <span id="authTokenValue"></span>
</div>
```

Let's hide the `authToken` div until the user clicks the button by adding some styling to the CSS:

```css
#authToken {
    display: none;
}
```
 
In the JavaScript, we'll wire up a click handler for the button in the init method:

```js
// wire up a click handler for the login button
$("#getAuthToken").click(getAuthToken);
```

…and provide the implementation to fetch and display the token:

```js
function getAuthToken() {
  $("#authToken").hide();
  $("#authTokenValue").text("");

  client.getAuthToken().then((token) => {
    $("#authTokenValue").text(token);
    $("#authToken").show();
  });
}
```
 
Now, our markup looks like this:

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title></title>

    <script src="https://code.jquery.com/jquery-3.2.1.min.js" integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4=" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/@blackbaud/sky-addin-client@1.0.0/bundles/sky-addin-client.umd.min.js"></script>

    <script src="HelloWorld.js"></script>
    <link href="HelloWorld.css" rel="stylesheet" />
</head>
<body>
    <h2>Hello world!</h2>
    <span>This is a very simple custom tile</span>

    <div>
        <p />
        <div>The environment ID is a context value that is available to all add-ins:</div>
        <span id="environmentId"></span>
    </div>

    <div>
        <p />
        <div>Additional context values vary for each extension point - for constituent tiles, the ID of the constituent is provided:</div>
        <span id="contextRecordId"></span>
    </div>

    <div>
        <p />
        <div>Click the button to request a user identity token for the currently logged-in user</div>
        <button id="getAuthToken">Get auth token</button>
    </div>

    <div id="authToken">
        <p />
        <div>The following string represents the identity of the current user, and can be provided to the add-in's backend for validation:</div>
        <span id="authTokenValue"></span>
    </div>

</body>
</html>
```

The complete JavaScript is shown here:

```js
(function () {

  // BBSkyApiAddin is global here.
  var client = new BBSkyApiAddin.AddinClient({
    callbacks: {
      init: (args) => {
        
        $('#environmentId').text(args.envId);
        $('#contextRecordId').text(args.context.recordId);

        // wire up a click handler for the login button
        $("#getAuthToken").click(getAuthToken);

        // inform the host page that the addin is ready to be shown
        args.ready({ showUI: true, title: 'My Custom Tile' });
      }
    }
  });

  function getAuthToken() {
    $("#authToken").hide();
    $("#authTokenValue").text("");

    client.getAuthToken().then((token) => {
      $("#authTokenValue").text(token);
      $("#authToken").show();
    });

  }

}());
```

## View the updated add-in
 
After redeploying the add-in and refreshing the constituent page, the context values will be shown:

<p><img style="border: none" src="/assets/img/addin_identitytoken_renxt.jpg" class="img-responsive"></p>

Clicking the button will fetch and display the user identity token, which should be treated as an opaque string on the client:

<p><img style="border: none" src="/assets/img/addin_identitytoken_renxt_string.jpg" class="img-responsive"></p>

## Next steps

* Get an <a href="{{ stache.config.guide_addins }}overview">overview</a> of the SKY Add-ins framework.
* View the <a href="{{ stache.config.guide_addins }}get-started/createaddin">Getting started</a> tutorial to learn more about how to build a SKY Add-in.
* View additional <a href="{{ stache.config.guide_addins }}/concepts">concepts</a> and capabilities associated with the SKY Add-ins framework.
* View our <a href="{{ stache.config.guide_addins }}how-to-guides/addin-design">design guidelines</a> to read about building an effective and compelling user experience for your add-in.