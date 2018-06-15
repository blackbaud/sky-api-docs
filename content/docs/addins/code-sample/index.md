---
layout: layout-sidebar
name: Add-in Code Sample
order: 400
published: true
showInNav: true
title: Add-in Code Sample
---
{{ include stache.config.partial_header_edit }}

# {{ name }}


Code Sample


Project scaffolding
 
First, I’ll open Visual Studio (I’m using VS 2017 but any version will work), and create a new ASP.NET Web Application:

To keep things simple, I’ll use the Empty template and enable Web API:

Once Visual Studio has finished scaffolding my project, I’ll manually add a few files (and for simplicity, I’ll add them to the root folder).  Specifically, I’ll add:
An HTML file to contain the markup for my add-in
A JavaScript file to contain the client-side code for my add-in (you could of course embed this into your HTML file, but I’ll separate them to keep things clean)
A CSS file which I’ll use to provide some basic styling for the tile
 
Create the add-in files
 
First, let’s add the HTML file:

Next, the JavaScript:

And finally, the CSS:

 
Define the add-in markup
 
Visual Studio will produce a very basic HTML file like this:
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8" />
        <title></title>
    </head>
    <body>
       
    </body>
    </html>
 
I’m going to be using a few jQuery statements in my JavaScript, so I’ll also add jQuery to the page by referencing the latest version from the jQuery CDN, as documented on their website:
    <script src="https://code.jquery.com/jquery-3.2.1.min.js" integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4=" crossorigin="anonymous"></script>
 
Next, a requirement for SKY API add-ins is that they must include the Addin Client JavaScript library on the page to facilitate the interop with the host application.  This library is OSS on GitHub and available as an NPM package.  You can add it to the page a few different ways, but for simplicity here, I’ll just reference it from one of the npm CDNs:
    <script src="https://cdn.jsdelivr.net/npm/@blackbaud/sky-api-addin@1.0.0-alpha.1/bundles/sky-api-addin.umd.min.js"></script>
 
     [Note:  we discussed making this available from a Blackbaud CDN and decided to hold off on that for now, but this may have changed recently with the need to publish some Stache2 libraries to a Blackbaud CDN – so doublecheck with Bobby/Brandon here)
 
I’ll also add a few lines to the <head> to include my tile’s JavaScript and CSS files onto the page:
    <script src="HelloWorld.js"></script>
    <link href="HelloWorld.css" rel="stylesheet" />
 
Finally, I’ll add the obligatory “hello world” text so we have something to show in the UI:
    <h2>Hello world!</h2>
    <span>This is a simple custom tile</span>
 
So now, my initial HTML is complete:
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8" />
        <title></title>
 
        <script src="https://code.jquery.com/jquery-3.2.1.min.js" integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4=" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/@blackbaud/sky-api-addin@1.0.0-alpha.1/bundles/sky-api-addin.umd.min.js"></script>
 
        <script src="HelloWorld.js"></script>
        <link href="HelloWorld.css" rel="stylesheet" />
    </head>
    <body>
        <h2>Hello world!</h2>
        <span>This is a simple custom tile</span>
    </body>
    </html>
 
Style the add-in
 
Next, let’s shift focus to our stylesheet – not much to do here, just give the body a bit of padding (NOTE:  we are still tweaking the default styling so this step may be optional in the future):
    body {
        margin-top: 20px;
    }
 
Basic add-in code
 
Now, on to the JavaScript…
 
First, we’ll wrap our code in a self-executing function:
  (function () {
 
    // Add-in code goes here
 
  }());
 
As described in the SKY API addin client documentation, add-ins must be instantiated using the following JavaScript, which registers a callback with the host page.  This provides a mechanism for the host page to supply key contextual information to the add-in, and also provides a way for the add-in to inform the host page that it is ready to be rendered.  This allows add-in authors to conditionally display add-ins based on the context (ex: only show a tile for individuals who are board members). 
 
We’ll start with the basic minimal requirement to get a tile showing:
 
(function () {
 
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
 
 
Deploy the add-in
 
At this point, we can deploy our web application – in this case, I’ll publish to an Azure App service.  The web application will be running at:
https://blackbaudaddinhelloworld.azurewebsites.net
 
…and of course we can view the tile at:
https://blackbaudaddinhelloworld.azurewebsites.net/helloworld.html
 