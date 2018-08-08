---
layout: layout-sidebar
name: SKY UX tile
order: 200
published: true
showInNav: true
title: SKY UX tile
---
{{ include stache.config.partial_header_edit }}

# {{ name }}

In this article, we'll walk through the process of building a custom tile for the Constituent page using the SKY Add-in and SKY UX frameworks.  This add-in will be a pure client-side implementation using SKY UX (but note that you can use any language or tech-stack you'd like).

## SKY UX prerequisites
 
In order to develop using SKY UX, be sure you've gone through the <a href="https://developer.blackbaud.com/skyux/learn/get-started" target="_blank">SKY UX Getting Started</a> guide.

## Project scaffolding

To create a new SKY UX single-page-application (SPA), we'll make use of the <a href="https://developer.blackbaud.com/skyux/learn/reference/cli-commands"  target="_blank">SKY UX command-line interface (CLI)</a>, and we'll use the free <a href="https://code.visualstudio.com" target="_blank">Visual Studio Code</a> editor to invoke the CLI (you could also use the standard Command Prompt).

Launch VS Code, open the Terminal window, and navigate to the folder where you want to put the SPA.  In this case, we'll put the code in `d:\code\skyux`:

<img style="border:none" src="/assets/img/vs-code-terminal.png" class="img-responsive">

## Create the SPA

Within the terminal window, we'll use the `skyux new` command to create the new SPA, and we'll specify the `-t addin` parameter to tell the CLI to clone the <a href="https://github.com/blackbaud/skyux-template-addin" target="_blank">SKY UX Add-in template</a> repo (which is similar to the default <a href="https://github.com/blackbaud/skyux-template" target="_blank">SKY UX template</a> SPA repo, but contains a few additional references needed by add-ins):

<img style="border:none" src="/assets/img/skyux-new-addin.png" class="img-responsive">

When invoked, the CLI will show a few prompts requiring us to:
- Specify the "root directory" of the SPA (in order words, the "name" of the SPA)
- Provide an optional target repo into which the template will be cloned

In this case, we'll use a SPA name of `hello-world`, and we'll skip the target repo for simplicity (it can always be configured later if desired):

<img style="border:none" src="/assets/img/skyux-new-addin-hello-world.png" class="img-responsive">

The CLI will create a folder named `skyux-spa-hello-world`, and will clone the SKY UX Add-in Template repo into that folder.  As a helpful step, the CLI will also handle running `npm install` to pull down all the appropriate Node modules needed to run the SPA locally.

## Serve the SPA locally
 
After the CLI finishes installing the Node modules, we can navigate to the folder and use the `skyux serve` command to serve it locally:

<img style="border:none" src="/assets/img/skyux-serve.png" class="img-responsive">

After compiling, the SKY UX CLI will automatically launch the SPA in a new browser window.  Through the magic of <a href="https://developer.blackbaud.com/skyux/learn/overview#sky-ux-builder" target="_blank">SKY UX Builder</a> and the <a href="https://developer.blackbaud.com/skyux/learn/overview#sky-ux-host" target="_blank">SKY UX Host</a>, you can see that the SPA is being served locally - even though the URL is shown as: `https://host.nxt.blackbaud.com/hello-world`:

<img style="border:none" src="/assets/img/skyux-serve-hello-world.png" class="img-responsive">

<strong>Note:</strong> The SKY UX Host can be used to serve and debug 3rd-party SPAs locally.  For deploying to production hosts, the `skyux build` can be used to create a `dist` folder containing the static artifacts to deploy to your cloud.

The browser navigates to the root of the SPA, which is located in this case at `/hello-world`.  We'll look at the Angular code that was generated later, but for now note that the actual tile is located one level deeper within the SPA at `/hello-world/my-tile`.  We can access that page directly but it won't be fully functional since it's operation outside of the context of any host Blackbaud application:

<img style="border:none" src="/assets/img/skyux-serve-hello-world-my-tile.png" class="img-responsive">

When we register the add-in within the SKY API Developer portal, we'll need to provide the fully qualified URL of the add-in as `https://host.nxt.blackbaud.com/hello-world/my-tile`.

## Register the add-in

Now that we have a web application running (in this case, locally), we can register it as part of our SKY API application by navigating to the <a href="https://developer.sky.blackbaud.com" target="_blank">SKY API Developer Portal</a>. From the **Developer Account** menu, select **My Applications**, and navigate to the SKY API application for which we want to register the add-in. 

<bb-alert bb-alert-type="warning">
<strong>Important!</strong> When you add add-in details to your SKY API application, the add-in will immediately become visible to any existing customers who've already enabled your SKY API application (as well as any customers who may enable your application in the future).  For development and testing purposes, we recommend using a non-production SKY API application to ensure your add-in functions properly before registering the add-in with your production application.</bb-alert>

On the application details page, select the **Add** button from within the **Add-ins** tile to create a new add-in definition:

<p><img style="border:none" src="/assets/img/add_addin_hello_world_skyux.png" class="img-responsive"></p>

On this dialog, we can provide the metadata about our add-in, including a friendly name to help distinguish this add-in from others we might create in the future, as well as the extension point (the location within the system where the add-in will be rendered), and the URL for the add-in itself.  In this case, we're building a custom tile for the constituent record page, so we'll choose the "Constituent Tile Dashboard" extension point.

A few notes about the URL:

- It must be an absolute and fully qualified URL, but it can include static parameter values.
- It must use HTTPS to avoid mixed content problems in the browser.
- We do support local development, so if you're using the `-l` parameter with the `skyux serve` command, you can provide a `localhost` value for the URL (for example:  `https://localhost:8000/hello-world`).
 
<bb-alert bb-alert-type="success">
That all!  Once defined, the add-in will be shown for any customers who've enabled the SKY API application.  In this case, it will only be visible while we're serving the SPA locally.</bb-alert>

## View the add-in
 
To view the add-in, visit the page or area within the system where the add-in will be rendered (according to the definition of the extension point).
 
When the page loads, our custom tile will appear (likely at the bottom of the page):

<p><img style="border: none" src="/assets/img/addin_custom_tile_skyux.jpg" class="img-responsive"></p>

The tile looks and behaves like any native tile within the system - users can drag the tile around, and the position (left or ride side) and state (expanded or collapsed) will be persisted along with other tile details.

## Show contextual values

Now, let's update the UI to display the various contextual values that are made available to add-ins.
 
First, we'll start by displaying the "environment ID" – you'll hear more about "environments" in the future, but for now you can think of the environment as a replacement for the concept of "tenant".  As described in the <a href="https://github.com/blackbaud/sky-addin-client" target="_blank">SKY Add-in Client library documentation</a>, the environment ID is provided as part of the `args` sent to the `init` callback function.  

Next, we'll display context values that are specific to the extension point itself. In the case of a "Constituent Tile Dashboard" extension point, the context value will be the ID of the constituent.  This context value is provided along with the environment ID as part of the args sent to the `init` function:

To show these values, we'll start by defining variables named `environmentId` and `context` in our Angular component that will be set within the `init` callback function (and we'll just `JSON.stringify` the context object that is provided to see the full shape of it):

```js
public environmentId: string;
public context: string;

public ngOnInit() {
  this.client = new AddinClient({
    callbacks: {
      init: (args) => {
        this.environmentId = args.envId;
        this.context = JSON.stringify(args.context, undefined, 2);

        args.ready({ showUI: true, title: 'My tile' });
      }
    }
  });
}
```
 
To show these values in the UI, we'll add the following markup to the component HTML:

```html
<label for="environmentId" class="sky-control-label">
    The environment ID is a context value that is available to all add-ins:
</label>
<div id="environmentId">{ { environmentId }}</div>

<p></p>
<label for="context" class="sky-control-label">
    Additional context values vary for each extension point - for the current extension point, the following context is provided:
</label>
<div id="context">{ { context }}</div>
``` 

You can find complete documentation for each extension point on the <a href="/docs/addins/concepts/extension-points" target="_blank">extension points</a> documentation page.

Notice that as we change the component's HTML and TypeScript files, the changes are immediately visible on the constituent page.  This is because SKY UX is monitoring the file system for changes, and automatically rebuilding and refreshing the SPA! 

<img style="border:none" src="/assets/img/addin_custom_tile_skyux_context.jpg" class="img-responsive">

## Fetch a user identity token

A final piece of contextual data that is available is the "user identity token".  This value can be used to convey the Blackbaud user ID in a secure fashion to the add-in's backend (where it can be validated and decoded).  Having this value on the server will provide a means of mapping the Blackbaud user to a user identity in the 3rd-party system.  Add-ins can obtain a user identity token by requesting it from the host page via the `getAuthToken` method of the <a href="https://github.com/blackbaud/sky-addin-client" target="_blank">SKY Add-in Client JavaScript library</a>.
 
<bb-alert bb-alert-type="info">The "user identity token" is not the same as the SKY API access token and cannot be used to make calls to the SKY API.  For proper security, add-ins should expect to initiate the SKY API OAuth 2.0 Authorization Code flow by rendering a "Connect to SKY API" button in the add-in's user interface.  The result of that operation will be a SKY API access token, which (along with the Blackbaud user ID and environment ID) can be persisted along with the native user identity in the 3rd-party system.</bb-alert>
 
For the purpose of this simple demo, we'll simply fetch and display the user identity token value.  Later tutorials will demonstrate how to pass this token to the add-in's backend for validation.
 
Let's add the following markup to our component to render a button in the UI for getting a user identity token, and an element to display the token itself:

```html
<p></p>
<div>Click the button to request a user identity token for the current user:</div>
<button type="button" class="sky-btn sky-btn-default" (click)="getAuthToken()">Get auth token</button>

<div *ngIf="userIdentityToken">
  <p></p>
  <div>The following string represents the identity of the current user, and can be provided to the addin's backend for validation:</div>
  <span>{ { userIdentityToken }}</span>
</div>
```

In the TypeScript for our component, we'll provide the click handler for the button:

```js
public getAuthToken() {
  this.userIdentityToken = undefined;

  this.client.getAuthToken().then((token) => {
    this.userIdentityToken = token;
  });
}
```

So now our component's HTML markup looks like this:
 
```html
<div>
  <h1>{ { 'tile_header' | skyAppResources }}</h1>

  <p>Welcome to the SKY UX Add-in template.</p>

  <sky-alert alertType="info">
    You've just taken your first step into a larger world.
  </sky-alert>

  <p>
    <a
      href="https://apidocs.sky.blackbaud.com/docs/addins"
      target="_blank"
      rel="noopener noreferrer"
      class="sky-btn sky-btn-primary"
    >
      Learn more about SKY Add-ins
    </a>
  </p>

  <label for="environmentId" class="sky-control-label">
    The environment ID is a context value that is available to all add-ins:
  </label>
  <div id="environmentId">{ { environmentId }}</div>

  <p></p>
  <label for="context" class="sky-control-label">
    Additional context values vary for each extension point - for the current extension point, the following context is provided:
  </label>
  <div id="context">{ { context }}</div>

  <p></p>
  <div>Click the button to request a user identity token for the current user:</div>
  <button type="button" class="sky-btn sky-btn-default" (click)="getAuthToken()">Get auth token</button>

  <div *ngIf="userIdentityToken">
    <p></p>
    <div>The following string represents the identity of the current user, and can be provided to the addin's backend for validation:</div>
    <span>{ { userIdentityToken }}</span>
  </div>

</div>
```

...and our component's full TypeScript:

```js
import { Component, OnInit } from '@angular/core';
import { AddinClient } from '@blackbaud/sky-addin-client';

@Component({
  selector: 'my-tile',
  templateUrl: './my-tile.component.html',
  styleUrls: ['./my-tile.component.scss']
})
export class MyTileComponent implements OnInit {
  public client: AddinClient;
  public environmentId: string;
  public context: string;
  public userIdentityToken: string;

  constructor() {}

  public ngOnInit() {
    this.client = new AddinClient({
      callbacks: {
        init: (args) => {
          this.environmentId = args.envId;
          this.context = JSON.stringify(args.context, undefined, 2);

          args.ready({ showUI: true, title: 'My tile' });
        }
      }
    });
  }

  public getAuthToken() {
    this.userIdentityToken = undefined;

    this.client.getAuthToken().then((token) => {
      this.userIdentityToken = token;
    });
  }

}
```

## View the updated add-in
 
After saving the files, the context values will be shown:

<img style="border:none" src="/assets/img/addin_custom_tile_skyux_context2.png" class="img-responsive">

Clicking the button will fetch and display the user identity token, which should be treated as an opaque string on the client:

<img style="border:none" src="/assets/img/addin_custom_tile_skyux_context3.png" class="img-responsive">

## Next steps

* Get an <a href="{{ stache.config.guide_addins }}overview">overview</a> of the SKY Add-ins framework.
* View the <a href="{{ stache.config.guide_addins }}get-started/createaddin">Getting started</a> tutorial to learn more about how to build a SKY Add-in.
* View the <a href="{{ stache.config.guide_addins }}get-started/hello-world">Hello World</a> sample to see a detailed walk-through of building an add-in.
* View additional <a href="{{ stache.config.guide_addins }}/concepts">concepts</a> and capabilities associated with the SKY Add-ins framework.
* View our <a href="{{ stache.config.guide_addins }}how-to-guides/addin-design">design guidelines</a> to read about building an effective and compelling user experience for your add-in.