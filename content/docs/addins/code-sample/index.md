---
layout: layout-sidebar
name: Add-in Code Sample
order: 700
published: true
showInNav: true
title: Add-in Code Sample
---
{{ include stache.config.partial_header_edit }}

# {{ name }}


## Project scaffolding
 
First, I’ll open Visual Studio (I’m using VS 2017, but any version will work), and create a new ASP.NET Web Application.

<img src="/assets/img/new_web_app.png" class="img-responsive">

To keep things simple, I’ll use the Empty template and enable Web API.

<img src="/assets/img/new_web_app_template.png" class="img-responsive">

Once Visual Studio has finished scaffolding my project, I’ll manually add a few files (and for simplicity, I’ll add them to the root folder).  Specifically, I’ll add:
- An HTML file to contain the markup for my add-in.
- A JavaScript file to contain the client-side code for my add-in (you could of course embed this into your HTML file, but I’ll separate them to keep things clean).
- A CSS file which I’ll use to provide some basic styling for the tile.
 
## Create the add-in files
 
First, let’s add the HTML file.

<img src="/assets/img/addin_html_file.jpg" class="img-responsive">

Next, add the JavaScript file.

<img src="/assets/img/addin_js_file.jpg" class="img-responsive">


And finally, add the CSS file.

<img src="/assets/img/addin_css_file.jpg" class="img-responsive">

 
## Define the add-in markup
 
Visual Studio will produce a very basic HTML file like this.

<pre><code class="language-html">   &lt;!DOCTYPE html>
    &lt;html>
    &lt;head>
        &lt;meta charset="utf-8" />
        &lt;title>&lt;/title>
    &lt;/head>
    &lt;body>
       
    &lt;/body>
    &lt;/html>
</code></pre>
 
I’m going to be using a few jQuery statements in my JavaScript, so I’ll also add jQuery to the page by referencing the latest version from the jQuery CDN, as <a href="http://jquery.com/download/#using-jquery-with-a-cdn">documented on their website</a>.

<pre><code class="language-html">&lt;script src="https://code.jquery.com/jquery-3.2.1.min.js" integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4=" crossorigin="anonymous">&lt;/script></code></pre>
 
Next, a requirement for SKY API Add-ins is that they must include the Add-in Client JavaScript library on the page to facilitate the interop with the host application.  This library is <a href="https://github.com/blackbaud/sky-api-addin" target="_new">open source on GitHub</a> and available as an <a href="https://www.npmjs.com/package/@blackbaud/sky-api-addin" target="_new">NPM package</a>.  You can add it to the page a few different ways, but for simplicity here, I’ll just reference it from one of the npm CDNs.

<pre><code class="language-html">&lt;script src="https://cdn.jsdelivr.net/npm/@blackbaud/sky-api-addin@1.0.0-alpha.1/bundles/sky-api-addin.umd.min.js">&lt;/script></code></pre>
 
I’ll also add a few lines to the `<head>` to include my tile’s JavaScript and CSS files onto the page.

<pre><code class="language-html">&lt;script src="HelloWorld.js">&lt;/script>
    &lt;link href="HelloWorld.css" rel="stylesheet" />
</code></pre>
 
Finally, I’ll add the obligatory “hello world” text so we have something to show in the UI.

<pre><code class="language-html">&lt;h2>Hello world!&lt;/h2>
    &lt;span>This is a simple custom tile&lt;/span>
</code></pre>
 
So now, my initial HTML is complete.

<pre><code class="language-html">   &lt;!DOCTYPE html>
    &lt;html>
    &lt;head>
        &lt;meta charset="utf-8" />
        &lt;title></title>
 
        &lt;script src="https://code.jquery.com/jquery-3.2.1.min.js" integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4=" crossorigin="anonymous"></script>
        &lt;script src="https://cdn.jsdelivr.net/npm/@blackbaud/sky-api-addin@1.0.0-alpha.1/bundles/sky-api-addin.umd.min.js">&lt;/script>
 
        &lt;script src="HelloWorld.js">&lt;/script>
        &lt;link href="HelloWorld.css" rel="stylesheet" />
    &lt;/head>
    &lt;body>
        &lt;h2>Hello world!</h2>
        &lt;span>This is a simple custom tile</span>
    &lt;/body>
    &lt;/html>
</code></pre>
 
## Style the add-in
 
Next, let’s shift focus to our stylesheet – not much to do here, just give the body a bit of padding. To note, we are still improving the default styling so this step may be optional in the future.

<pre><code class="language-css">body {
        margin-top: 20px;
    }
</code></pre>
 
## Basic add-in code
 
Now, on to the JavaScript…
 
First, we’ll wrap our code in a self-executing function.

<pre><code class="language-javascript"> (function () {
 
    // Add-in code goes here
 
  }());
</code></pre>
 
As described in the <a href="https://github.com/blackbaud/sky-api-addin/blob/master/README.md" target="_new">sky-api-addin client documentation</a>, Add-ins must be instantiated using the following JavaScript, which registers a callback with the host page.  This provides a mechanism for the host page to supply key contextual information to the add-in, and also provides a way for the add-in to inform the host page that it is ready to be rendered.  This allows add-in authors to conditionally display add-ins based on the context (ex: only show a tile for individuals who are board members). 
 
We’ll start with the basic minimal requirement to get a tile showing:
 
<pre><code class="language-javascript">(function () {
 
  // Add-in code goes here
 
  // BBSkyApiAddin is global here.
  var client = new BBSkyApiAddin.AddinClient({
    callbacks: {
      init: (args) => {
 
        // perform any initialization needed for the add-in
 
        // inform the host page that the add-in is ready to be shown
        args.ready({ showUI: true, title: 'My Custom Tile' });
      }
    }
  });
 
}());
</code></pre>
 
## Deploy the add-in
 
At this point, we can deploy our web application – in this case, I’ll publish to an Azure App service.  The web application will be running at: `https://blackbaudaddinhelloworld.azurewebsites.net`
 
…and of course we can view the tile at: `https://blackbaudaddinhelloworld.azurewebsites.net/helloworld.html`
 

## Register the add-in

Now that my web application has been deployed, I can register it as part of my SKY API application by navigating to the SKY API Developer Portal. From the **Developer Account** menu, select **My applications**. The Applications page appears. From the list of applications, I’ll select the application name for which I want to register the add=in. In the Add-ins tile, to create a new add-in definition,  I'll select **Add**.

<p><img src="/assets/img/add_addin.png" class="img-responsive"></p>

On this dialog, I just need to provide the URL for my web application and indicate the extension point - in this case, our tile represents an extension to the “Constituent Tile Dashboard”.  I can also provide a friendly name for the add-in, just to help distinguish it from other add-ins I might create later.  The name itself is not currently presented to customers.
 
A few notes about the URL:

- We do support local development, so if you’re able to serve the web site locally, you can provide a localhost:port value for the URL (for example:  https://localhost:4000).  To avoid mixed content problems in the browser, you’ll need to use https and have SSL configured locally. 
- The URL must be a fully qualified URL, and can include static parameter values.
 
That all!  Once defined, the add-in will be shown for any customers who’ve enabled the SKY API application.

## View the add-in within Raiser’s Edge NXT
 
The add-in feature is available in Raiser’s Edge NXT in production today, but it requires a special query param for now until we’re closer to GA.  Within Raiser’s Edge NXT, you can add the following query parameter to tell the page to check for add-ins: `&extendedFeatureConfiguration={"new_features":{"uiextensions":true}}`
 
For example, you’d specify the query param on the constituent page like this: `https://renxt.blackbaud.com/constituents/280?tenantid=YOURTENANTID&extendedFeatureConfiguration={"new_features":{"uiextensions":true}}`
 
When the page loads, our custom tile will appear (likely at the bottom of the page):

<p><img src="/assets/img/addin_custom_tile.jpg" class="img-responsive"></p>

## Show contextual values

Now, let’s update the UI to display the various contextual values that are made available to add-ins.
 
First, we’ll start by displaying the “environment ID” – you’ll hear more about “environments” in the future, but for now you can think of the environment as a replacement for the concept of “tenant”.  As described in the SKY API Addin Client library documentation, the environment ID is provided as part of the args sent to the init function.
 
To show this, we’ll add the following markup to the HTML:
<pre><code class="language-html">&lt;div>
        &lt;p />
        &lt;div>The environment ID is a context value that is available to all add-ins:&lt;/div>
        &lt;span id="environmentId">&lt;/span>
    &lt;/div>
</code></pre>
 
Next, we’ll display context values that are specific to the extension point itself – in the case of a “Constituent Tile Dashboard” extension point, the context value will be the ID of the constituent.  This context value is provided along with the environment ID as part of the args sent to the init function, and we’ll show it in the UI via the following markup.

<pre><code class="language-html">&lt;div>
        &lt;p />
        &lt;div>Additional context values vary for each extension point - for constituent tiles, the ID of the constituent is provided:&lt;/div>
        &lt;span id="contextRecordId">&lt;/span>
    &lt;/div>
</code></pre>
 
You can find complete documentation for each extension point on the <a href="/docs/addins/context">Extension Points documentation page</a>.
 
So now our HTML looks like this.
 
<pre><code class="language-html">&lt;!DOCTYPE html>
&lt;html>
&lt;head>
    &lt;meta charset="utf-8" />
    &lt;title>&lt;/title>
 
    &lt;script src="https://code.jquery.com/jquery-3.2.1.min.js" integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4=" crossorigin="anonymous">&lt;/script>
    &lt;script src="https://cdn.jsdelivr.net/npm/@blackbaud/sky-api-addin@1.0.0-alpha.1/bundles/sky-api-addin.umd.min.js">&lt;/script>
 
    &lt;script src="HelloWorld.js">&lt;/script>
    &lt;link href="HelloWorld.css" rel="stylesheet" />
&lt;/head>
&lt;body>
    &lt;h2>Hello world!&lt;/h2>
    &lt;span>This is a very simple custom tile&lt;/span>
 
    &lt;div>
        &lt;p />
        &lt;div>The environment ID is a context value that is available to all add-ins:&lt;/div>
        &lt;span id="environmentId">&lt;/span>
    &lt;/div>
 
    &lt;div>
        &lt;p />
        &lt;div>Additional context values vary for each extension point - for constituent tiles, the ID of the constituent is provided:&lt;/div>
        &lt;span id="contextRecordId">&lt;/span>
    &lt;/div>
 
&lt;/body>
&lt;/html>
</code></pre>
 
In our JavaScript file, we’ll add the following lines to the init method before informing the host page to show the tile – this code will use jQuery to display the environment ID and context record ID.

<pre><code class="language-javascript">$('#environmentId').text(args.envId);
        $('#contextRecordId').text(args.context.recordId);
</code></pre>
 
The complete JavaScript is shown here.
 
<pre><code class="language-javascript">(function () {
 
  // BBSkyApiAddin is global here.
  var client = new BBSkyApiAddin.AddinClient({
    callbacks: {
      init: (args) => {
       
        $('#environmentId').text(args.envId);
        $('#contextRecordId').text(args.context.recordId);
 
        // inform the host page that the add-in is ready to be shown
        args.ready({ showUI: true, title: 'My Custom Tile' });
      }
    }
  });
 
}());
</code></pre>

## Fetch and display the user identity token

A final piece of contextual data that is available is the “user identity token”.  This value can be used to convey the user ID in a secure fashion to the add-in’s backend (where it can be validated and decoded).  Having this value on the server will provide a means of mapping the “Blackbaud user” to a user identity in the 3rd-party system.  Add-ins can obtain a user identity token by requesting it from the host page via the “getAuthToken” method of the <a href="https://github.com/blackbaud/sky-api-addin" target="_new">SKY API Add-in Client JavaScript library</a>.
 
<bb-alert bb-alert-type="info">The “user identity token” is not the same as the SKY API access token, and cannot be used to make calls to the SKY API.  For proper security, add-ins should expect to initiate the SKY API OAuth 2.0 Authorization Code flow by rendering a “Connect to SKY API” button in the user interface.  The result of that operation will be a SKY API access token, which (along with the Blackbaud user ID) can be persisted along with the native user identity in the 3rd-party system.</bb-alert>
 
For the purpose of this simple demo, we’ll simply fetch and display the user identity token value.  Later tutorials will demonstrate how to pass this token to the add-in’s backend for validation.
 
Let’s add the following markup to render a button in the UI for getting a user identity token.

<pre><code class="language-html">
    &lt;div>
        &lt;p />
        &lt;div>Click the button to request a user identity token for the currently logged-in user&lt;/div>
        &lt;button id="getAuthToken">Get auth token&lt;/button>
    &lt;/div>
 
    &lt;div id="authToken">
        &lt;p />
        &lt;div>The following string represents the identity of the current user, and can be provided to the add-in's backend for validation:&lt;/div>
        &lt;span id="authTokenValue">&lt;/span>
    &lt;/div>
</code></pre>
 
Let’s hide the authToken element until the user clicks the button by adding some styling to the CSS.

<pre><code class="language-css">#authToken {
    display: none;
}
</code></pre>
 
In the JavaScript, we’ll wire up a click handler for the button in the init method.

<pre><code class="language-javascript">
        // wire up a click handler for the login button
        $("#getAuthToken").click(getAuthToken);
</code></pre>
 
…and provide the implementation to fetch and display the token.

<pre><code class="language-javascript">
  function getAuthToken() {
    $("#authToken").hide();
    $("#authTokenValue").text("");
 
    client.getAuthToken().then((token) => {
      $("#authTokenValue").text(token);
      $("#authToken").show();
    });
 
  }
</code></pre>
 
Now, our markup looks like this.

<pre><code class="language-html">&lt;!DOCTYPE html>
&lt;html>
&lt;head>
    &lt;meta charset="utf-8" />
    &lt;title>&lt;/title>
 
    &lt;script src="https://code.jquery.com/jquery-3.2.1.min.js" integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4=" crossorigin="anonymous">&lt;/script>
    &lt;script src="https://cdn.jsdelivr.net/npm/@blackbaud/sky-api-addin@1.0.0-alpha.1/bundles/sky-api-addin.umd.min.js">&lt;/script>
 
    &lt;script src="HelloWorld.js">&lt;/script>
    &lt;link href="HelloWorld.css" rel="stylesheet" />
&lt;/head>
&lt;body>
    &lt;h2>Hello world!&lt;/h2>
    &lt;span>This is a very simple custom tile&lt;/span>
 
    &lt;div>
        &lt;p />
        &lt;div>The environment ID is a context value that is available to all add-ins:&lt;/div>
        &lt;span id="environmentId">&lt;/span>
    &lt;/div>
 
    &lt;div>
        &lt;p />
        &lt;div>Additional context values vary for each extension point - for constituent tiles, the ID of the constituent is provided:&lt;/div>
        &lt;span id="contextRecordId">&lt;/span>
    &lt;/div>
 
    &lt;div>
        &lt;p />
        &lt;div>Click the button to request a user identity token for the currently logged-in user&lt;/div>
        &lt;button id="getAuthToken">Get auth token&lt;/button>
    &lt;/div>
 
    &lt;div id="authToken">
        &lt;p />
        &lt;div>The following string represents the identity of the current user, and can be provided to the add-in's backend for validation:&lt;/div>
        &lt;span id="authTokenValue">&lt;/span>
    &lt;/div>
 
&lt;/body>
&lt;/html>
</code></pre>
 
The complete JavaScript is shown here.

<pre><code class="language-javascript">(function () {
 
  // BBSkyApiAddin is global here.
  var client = new BBSkyApiAddin.AddinClient({
    callbacks: {
      init: (args) => {
       
        $('#environmentId').text(args.envId);
        $('#contextRecordId').text(args.context.recordId);
 
        // wire up a click handler for the login button
        $("#getAuthToken").click(getAuthToken);
 
        // inform the host page that the add-in is ready to be shown
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
</code></pre>

## View the user identity token within Raiser’s Edge NXT
 
After redeploying the add-in and refreshing the page, the context values will be shown.


<p><img src="/assets/img/addin_identitytoken_renxt.jpg" class="img-responsive"></p>

Clicking the button will fetch and display the user identity token, which should be treated as an opaque string on the client.

<p><img src="/assets/img/addin_identitytoken_renxt_string.jpg" class="img-responsive"></p>

