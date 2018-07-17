---
layout: layout-sidebar
name: Create an Add-in
order: 100
published: true
showInNav: true
title: Create an Add-in
---

{{ include stache.config.partial_header_edit }}

# {{ name }}

To create a SKY Add-in, you'll need to build and deploy your add-in's web application and then register the URL of your add-in as part of your SKY API application.  When Blackbaud customers enable your application, users will see the add-in(s) you've defined.

<bb-alert bb-alert-type="success">
Before you begin, make sure you've created a Blackbaud developer account as covered in the <a href="{{ stache.config.guide_getting_started }}">Getting Started</a> guide.  You'll also need a registered SKY API application, as covered in the <a href="/docs/createapp/">Create an Application</a> guide.
</bb-alert>

## Build your add-in

Since add-ins are web applications, you can use any framework/tech stack desired, both client-side and server-side.  For example, you can use ASP.NET, PHP, Node.js, MVC, Angular, React, etc.  To see an example of an add-in that uses plain HTML, CSS, and JavaScript, see our <a href="{{ stache.config.guide_addins/get-started/hello-world }}">Hello World</a> sample add-in walk-through.

A requirement for SKY Add-ins is that the web application must include the Add-in Client JavaScript library on the page and instantiate the `AddinClient` class in order to facilitate the interop with the host application.  This library is available as an <a href="https://www.npmjs.com/package/@blackbaud/sky-addin-client" target="_new">NPM package</a>, and more details can be found in the Readme.

At runtime, the add-in's web page will be rendered in a sandboxed iframe within the host application.  Note that add-ins are hidden by default until they are ready to be shown.  This gives the add-in an opportunity to perform any necessary initialization and logic to determine whether it should be visible or remain hidden.  When the add-in is ready to be shown, it will call the `ready` method provided in the `init` callback:  

```js
  // BBSkyAddinClient is global here.
  var client = new BBSkyAddinClient.AddinClient({
    callbacks: {
      init: (args) => {

        // perform any initialization work here...

        // inform the host page that the add-in is ready to be shown
        args.ready({ showUI: true, title: 'My Custom Tile' });
      }
    }
  });
```

## Deploy your add-in

In order to test your add-in, you can either deploy your web application to the cloud or serve it locally.  Note that for local development, you’ll need to use HTTPS and have SSL configured to avoid mixed content problems in the browser.  

For production, your add-in's web application can be deployed to any cloud, and you control when and how your application is updated.

## Register your add-in metadata

<bb-alert bb-alert-type="warning">
<strong>Important!</strong> Performing this step will immediately make your add-in visible to any existing customers who've enabled your SKY API application.  For development and testing purposes, we recommend using a non-production SKY API application to ensure your add-in functions properly before registering the add-in with your production application.</bb-alert>

<ol>
<li>From <a href="{{ stache.config.developer_app_management_url }}" target= "_blank">My Applications</a>, navigate to the detail page for your application by clicking on the application name link.</li>
<li>Under Add-ins, select <b>Add</b> to launch the <b>Add add-in</b> dialog.
<p><img src="/assets/img/add_addin.png" class="img-responsive"></p>
</li>
<li>Enter a unique name for the add-in. Currently, this value simply provides a reference for your use only - Blackbaud solution users will not see it.</li>
<li>Specify the extension point for where you want to insert your add-in into the Blackbaud solution. For more information about extension points, see the <a href="{{ stache.config.guide_addins/concepts/extension-points }}">Extension points</a> documentation.</li>
<li>Specify the URL of your add-in.  This value must be an absolute and fully qualified URL, and can include static parameter values.</li>
<li>Click <b>Save</b> to save your add-in definition.
</ol>

At this point, your add-in will be provisioned for any existing customers who've enabled your application, as well as any customers who enable your application in the future.

## Next steps

<ul>
<li>View the <a href="{{ stache.config.guide_addins/get-started/hello-world }}">Hello World</a> sample add-in walk-through.</li>
</ul>