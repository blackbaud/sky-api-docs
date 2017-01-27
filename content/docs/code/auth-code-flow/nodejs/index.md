---
layout: layout-container
name: NodeJS
title: Authorization Code Flow - NodeJS
description: Learn how to create a NodeJS server-side app that utilizes the OAuth 2.0 Authorization Code Flow and retrieves constituent data from our <%= stache.config.product_name_short %>.
order: 2
icon: fa fa-fw fa-desktop
published: true
showInNav: true
tutorial: true
showBreadcrumbs: true
back_to_top: true
---

# Authorization Code Flow - NodeJS

<a class="btn btn-primary" href="{{ stache.config.github_repo_web_api_authorization }}" target="blank"><i class="fa fa-github fa-lg"></i> GitHub</a>

## Overview

We use OAuth 2.0 to secure access to a user's {{ stache.config.product_name_short }} data. In this tutorial we obtain user authorization using the [Authorization Code Flow]({{ stache.config.guide_web_api_authorization_auth_code_flow }}). From the user's perspective, the user authenticates as a Blackbaud user with the normal credentials for Blackbaud NXT and then authorizes (or denies) your application. To accomplish this, your application obtains an authorization code from the {{ stache.config.authorization_service_name }}. The authorization code is then exchanged for an access token that signs requests to the {{ stache.config.product_name_short }} on behalf of the user. The exchange involves your registered application's **{{ stache.config.guide_apps_client_secret_name }}**. For security reasons, the exchange is done through direct server-to-server communication. For this reason, we use <a href="https://nodejs.org" target="blank">Node.js</a>, a server-side platform.

In this tutorial, we will accomplish the following tasks:

- Ensure that you signed up for a developer account and obtained your subscription to an API product.
- Register an application with {{ stache.config.product_name_short }}.
- Obtain authorization to access user data for a specific tenant.
- Retrieve data from a {{ stache.config.api_type_name }} endpoint.

For this tutorial, we strip down the user interface to highlight the Authorization Code Flow. Our [Barkbaud code sample]({{ stache.config.guide_code_barkbaud }}) provides a rich user interface using <a href="http://skyux.developer.blackbaud.com/" target="blank">SKY UX</a>.

## Prerequisites

0. A server such as your local machine that is capable of running <a href="https://nodejs.org" target="blank">Node.js</a>.
0. Familiarity with Node.js, using NPM to install project dependencies, and environment variables including setting them in either an OSX/Linux or Windows environment.
0. Familiarity using a command line interface (CLI) such as Terminal or Windows Command Prompt.
0. Sign up for a [GitHub](https://github.com) account, if you don't already have one. The source code for this tutorial is stored in GitHub repository.
0. Install [Git](https://git-scm.com/) and have the ability to clone or fork a repo.
0. A reliable Internet connection to clone the repo and install the project's dependencies.

## Step 1 &mdash; Get Your Keys

If you have not already done so, complete the <a href="{{ stache.config.guide_getting_started }}">Getting Started guide</a>. The tutorial guides you through signing up for a Blackbaud developer account and requesting a subscription to an API product. After you are approved, your subscription contains a **Primary key** and **Secondary key**. You can use either key as the subscription key value for the `bb-api-subscription-key` request header in calls to the API.

### {{ stache.config.sandbox_name }} Tenant

After your subscription is approved, your developer account can access the {{ stache.config.sandbox_name }} tenant that represents a sample database. Keep in mind that you share this sandbox with other developers. You can access the {{ stache.config.sandbox_name }} tenant through the interactive {{ stache.config.dev_console_name }} within the <a href="{{ stache.config.portal_endpoints }}" target="_blank">API Reference</a>.

## Step 2 &mdash; Register Your App

{{ include 'includes/shared/nxt-web-api/registering-your-app/index.md' }}

## Step 3 &mdash; Install Node.js

After you have your subscription key, {{ stache.config.guide_apps_client_id_name }}, and {{ stache.config.guide_apps_client_secret_name }}, it's time to establish your development environment. Since we are using the [Authorization Code Flow]({{ stache.config.guide_web_api_authorization_auth_code_flow }}), we need to use a server-side software platform. For this tutorial, we will use Node.js.

- Download and install <a href="https://nodejs.org" target="blank">Node.js</a>. Use the default settings for your development environment.
- Create a file named **testserver.js** and add the following code:
  <pre><code class="language-javascript">  // Create a very simple HTTP web server on your local machine.
	// Set up a HTTP Web server and client, require('http').
	var http = require('http');

	// createServer returns a new instance of the http server.
	// A function is used as a request listener.
	// req is an instance of the incoming request.
	// res is an instance of the server response.
	// When you browse to http://localhost:1337/, a 'request' event occurs and
	//   "Hello World" is written from the HTTP Web server back to your browser.
	http.createServer(function (req, res) {
	  res.writeHead(200, { 'Content-Type': 'text/plain' });
	  res.end('Hello World');
	}).listen(1337, "localhost");

	console.log('Server running at http://localhost:1337/');</code></pre>

- Save the file in a folder named **testnodejs**.
- From a command prompt, change the directory to **testnodejs** and run the **testserver.js** file:

	<pre><code class="language-bash">$ cd testnodejs
$ node testserver.js</code></pre>

	The Web server listens for requests on your localhost, port 1337.

![Starting Hello World from command prompt][auth-tutorial-starthelloworld]

- In a Web browser, navigate to <a href="http://localhost:1337/" target="blank">localhost:1337</a>. The Web server displays a page with with "Hello World."

![Hello World][auth-tutorial-helloworld]

- To stop the Web server, type `CTRL-C` in the command line.

## Step 4 &mdash; Grab the Source Code

The <a href="{{ stache.config.github_repo_web_api_authorization }}" target="_blank">sky-api-auth-tutorial</a> repo on GitHub provides a starter project to work through the Authorization Code Flow.

- Use a command prompt to clone the `sky-api-auth-tutorial`. The following command creates a _working directory_ named `sky-api-auth-tutorial` that contains the code for the tutorial:

	<pre><code class="language-git">$  git clone https://github.com/blackbaud/sky-api-auth-tutorial.git</code></pre>

## Step 5 &mdash; Prepare Your Environment

<ul>
	<li>Open the **sky-api-auth-tutorial** working directory and copy the configuration file **sky.env-sample** as **sky.env**. The **sky.env** file contains the application's environment variables for NodeJS environments.</li>
	<li>
	  <p>Update **sky.env** with the following values:</p>
	  <div class="table-responsive">
	    <table class="table table-striped table-condensed">
	      <tr>
	        <td>**`AUTH_CLIENT_ID`**</td>
	        <td>
	          Your registered application's **Application ID** (from Step 2).<br>
	          (See, [Managing your apps](https://apidocs.sky.blackbaud.com/docs/apps/).)
	        </td>
	      </tr>
	      <tr>
	        <td>**`AUTH_CLIENT_SECRET`**</td>
	        <td>
	          Your registered application's **Application Secret** (from Step 2).<br>
	          (See, [Managing your apps](https://apidocs.sky.blackbaud.com/docs/apps/).)
	        </td>
	      </tr>
	      <tr>
	        <td>**`AUTH_REDIRECT_URI`**</td>
	        <td>
            One of your registered application's **Redirect URIs** (from Step 2).<br>
            For this tutorial, enter `http://localhost:5000/auth/callback`. <br>
            (See <a href="{{ stache.config.developer_app_management_url }}" target= "_blank">My Applications</a>.)
	        </td>
	      </tr>
	      <tr>
	        <td>**`AUTH_SUBSCRIPTION_KEY`**</td>
	        <td>
            Your Blackbaud Developer **Subscription Key**.<br>
            Use either the **Primary key** or **Secondary key**, visible on your [Blackbaud Developer Profile](https://developer.sky.blackbaud.com/developer).
	        </td>
	      </tr>
	      <tr>
	        <td>**`PORT`**</td>
	        <td>
            The Web server port that will run the application.<br>
            For this tutorial, enter `5000`.
	        </td>
	      </tr>
	    </table>
	  </div>
	</li>
	<li>Save the environment file.</li>
	<li>Review the **.gitignore** file. The purpose of the file is to specify the untracked files to ignore. Note that any **.env** files are ignored. This prevents the environment files from being synced to GitHub and protects your registered application's keys and other sensitive data from being exposed.</li>
</ul>

## Step 6 &mdash; Install Dependencies

- From the working directory, run `npm install` to install the project dependencies.</p>
  <p><a href="https://www.npmjs.com/" target="blank">NPM</a> is the package manager that comes bundled with Node.js (since you already installed Node.js, you also have NPM). The command `npm install` downloads any dependencies listed in the **package.json** file and adds them to the app's **node_modules** directory (this command also creates this directory if it doesn't already exist). Each dependency is represented as a child directory of **node_modules**.

	<pre><code class="language-git">$ cd sky-api-auth-tutorial
$ npm install</code></pre>

- After you run `npm install`, verify that the **sky-api-auth-tutorial** working directory contains the **node_modules** subfolder.

	<p class="alert alert-info"><code>npm install</code> depends on a reliable Internet connection to install dependencies. If you have issues running the command, you can hard delete the **node_modules** folder and run `npm install` again.</p>

## Step 7 &mdash; Run the Application

- Using Command Prompt/Terminal, ensure you are in the working directory.
- Type `npm start` to start the application server at <a href="http://localhost:5000" target="_blank">http://localhost:5000</a>.

	<pre><code class="language-git">$ npm start</code></pre>

## Application starting point

- Open the **index.js** file. This is the starting point of our application. This code runs on the server side and is _not_ visible to the application user. The code performs the following:
  - It registers our application dependencies such as <a href="http://expressjs.com/" target="blank">Express</a>.
  - It handles authorization and user requests to the home page and data endpoints.
  - It creates a web server on your local machine at `https://localhost:5000`.


- To request the home page open your browser to <a href="http://localhost:5000/" target="https://localhost:5000/">http://localhost:5000/</a>. It displays the authorization options.
  ![Login][auth-tutorial-login]
  <p class="alert alert-info">Your browser may display a warning that the connection is not private. For this tutorial, ignore this message. To proceed, click <strong>Show advanced</strong>, and then click <strong>Proceed to localhost (unsafe)</strong>.</p>

- Open the **ui** folder and the **index.html** file. This opens the home page for our application, where we can initialize our app and load assets to build our page.
- The `body` tag includes an attribute named `ng-app`. The front-end of our application uses <a href="https://angularjs.org/">AngularJS</a> to interact with our Node.js server routes.
- Below the `body` tag, the `ng-view` tag is used as a hook for our <a href="https://docs.angularjs.org/api/ngRoute">Angular Router</a> to load our desired template view.

  <pre><code class="language-markup">&lt;!-- INITIALIZE THE APP -->
  &lt;body ng-app="AuthCodeFlowTutorial">

    &lt;!-- LOAD OUR VIEWS -->
    &lt;ng-view>&lt;/ng-view>
    ...
  </code></pre>

## Set up the router
- Open the **app** folder and the **main.js** file.   Our application's logic lives here.
- First, we declare our angular module and inject the `ngRoute` dependency.

  <pre><code class="language-javascript">angular.module('AuthCodeFlowTutorial', ['ngRoute'])</code></pre>
- Next, we initialize our <a href="https://docs.angularjs.org/api/ngRoute">Angular Router</a> to manage our views and controllers.

    <pre><code class="language-javascript">angular.module('AuthCodeFlowTutorial', ['ngRoute'])
          .config(function ($routeProvider) {
              $routeProvider
                  .when('/home', {
                      templateUrl: './app/main-template.html',
                      controller: 'MainController'
                  })
                  .when('/auth-success', {
                      template: '<h1>Login Successful</h1>',
                      controller: 'AuthController'
                  })
                  .otherwise({
                      redirectTo: '/home'
                  })
                  </code></pre>
                  <p class="alert alert-info">In this example, we use two views and two controllers.  As your app grows, you can add more views and controllers.</p>

## Display the authorize buttons
- Open the **app** folder and the **main-template.html** file.  This is our application's core view.
- The **main.js** file holds the logic to initiate our <a href="https://docs.angularjs.org/guide/controller">AngularJS Controllers</a> and our <a href="https://docs.angularjs.org/api/ngRoute">Angular Router</a>.
- Just after the page `title`, the **authorize** buttons reference the server's authorization endpoint. When a user clicks one of these buttons, the authorization process begins. When a session is authenticated, the **authorize** buttons are hidden.

  - The **Authorize using redirect** button initiates the authorization process by redirecting the browser to the authorization endpoint to initiate the authentication process.
	<pre><code class="language-markup">&lt;div ng-if="!isAuthenticated" class="col-sm-12 well">
    ...
    &lt;div class="col-sm-5 well login-options">
      &lt;span class="login-options-label">Login using redirect&lt;/span>
      &lt;a href="/auth/login" class="btn btn-primary btn-block btn-lg">Log in&lt;/a>
&lt;/div></code></pre>

  - The **Authorize using popup** button opens a popup window that is directed to the server's authorization endpoint to initiate the authentication process.
  <pre><code class="language-markup">&lt;div ng-if="!isAuthenticated" class="col-sm-12 well">
    ...
    &lt;div class="col-sm-5 col-sm-offset-2 well login-options">
      &lt;span class="login-options-label">Login using popup&lt;/span>
      &lt;button ng-click="popupLogin()" class="btn btn-primary btn-block btn-lg" target="login-iframe">Log in&lt;/button>
&lt;/div></code></pre>

    Using the popup option, our Angular code performs the following actions:

      1. It calls the `popupLogin()` method.  This method opens a window at the specified URL, and we pass in a `?redirect=` parameter and set it to the hash `/%23/auth-success`, which translates to:`/#/auth-success`.

      <pre><code class="language-javascript">.controller('MainController', function ($scope, $http, $window) {
        ...
        $scope.popupLogin = function () {
            var popup

            popup = window.open('auth/login?redirect=/%23/auth-success', 'login', 'height=450,width=600,');
            if (window.focus) {
                popup.focus();
            }
        }
    </code></pre>
      2.  When the browser redirects to the `/#/auth-success`, the AuthController closes the current window and redirects the browser to the route `'/'` so our router will redirect the page to `#/home`.

      <pre><code class="language-javascript">.controller('AuthController', function ($window) {
             ...
             $window.opener.location = '/';
             $window.close();
     })
    </code></pre>


- The JavaScript in **main.js** in the **MainController** uses Ajax calls to the `/auth/authenticated` endpoint to determine whether the users are logged in. If the users access token has expired or is invalid, the page displays the **Authorize** buttons.    Users must log in to obtain a valid access token.

	<pre><code class="language-javascript">angular.module('AuthCodeFlowTutorial', ['ngRoute'])
    ...
    .controller('MainController', function ($scope, $http) {
        ...
        /**
        *  Check user access token.
        */
        $http.get('/auth/authenticated').then(function (res) {
            $scope.isAuthenticated = res.data.authenticated;

            /**
            *  Access token is valid. Fetch constituent record.
            */
            if ($scope.isAuthenticated === false) {
                $scope.isReady = true;
                return;
            }
        });
    });</code></pre>

## Obtain an Access Token

1. Click one of the **Authorize** buttons and enter your Blackbaud account credentials. After authentication, your browser redirects to the {{ stache.config.authorization_service_name }} authorization form.

  ![Authorize][auth-tutorial-authorize]

- Open **index.js** and **/server/routes/auth.js**.

	The **Authroize** button prompt a request to the web server's `/auth/login` endpoint. The route in the app's main **index.js** file directs requests to the `getLogin()` function within **/server/routes/auth.js**.

	<pre><code class="language-javascript">// Register our OAUTH2 routes
app.get('/auth/authenticated', routes.auth.getAuthenticated);
app.get('/auth/login', routes.auth.getLogin);
app.get('/auth/callback', routes.auth.getCallback);
app.get('/auth/logout', routes.auth.getLogout);</code></pre>

	The **auth.js** file relies on the <a href="https://github.com/lelylan/simple-oauth2">simple-oauth2</a> client library. To creating an object you must provide your registered application's **{{ stache.config.guide_apps_client_id_name }}** and **{{ stache.config.guide_apps_client_secret_name }}** values, which reside in the project's **sky.env** file as the `AUTH_CLIENT_ID` and `AUTH_CLIENT_SECRET` environment variables.  You need the URL to the {{ stache.config.authorization_service_name }} along with the token endpoint.

	<pre><code class="language-javascript">oauth2 = require('simple-oauth2')({
    clientID: process.env.AUTH_CLIENT_ID,
    clientSecret: process.env.AUTH_CLIENT_SECRET,
    site: '{{ stache.config.authorization_base_url }}',
    tokenPath: '/token'
});</code></pre>

	To obtain an authorization code, the `getLogin()` function uses simple-oauth2's `authorizeURL()` function to display the {{ stache.config.authorization_service_name }}'s authorization form. After users approve or deny the request, the responses are redirected using the value of the `AUTH_REDIRECT_URI` environment variable: `https://localhost:5000/auth/callback`.

	<pre><code class="language-javascript">function getLogin(request, response) {
    request.session.redirect = request.query.redirect;
    request.session.state = crypto.randomBytes(48).toString('hex');
    response.redirect(oauth2.authCode.authorizeURL({
        redirect_uri: process.env.AUTH_REDIRECT_URI,
        state: request.session.state
    }));
}</code></pre>

	<p class="alert alert-warning">The access token exchange should occur server side. Do not expose the **{{ stache.config.guide_apps_client_secret_name }}** to users in client-side code. Do not expose your **{{ stache.config.guide_apps_client_secret_name }}** in a source code repository such as GitHub.</p>

  The path `/auth/callback` is routed to the `getCallback()` function that exchanges authorization codes for access tokens.

	<pre><code class="language-javascript">function getCallback(request, response) {
    ...

    options = {
        code: request.query.code,
        redirect_uri: process.env.AUTH_REDIRECT_URI
    };
    oauth2.authCode.getToken(options, function (errorToken, ticket) {
        if (errorToken) {
            error = errorToken.message;
        } else {
            redirect = request.session.redirect || '/';

            request.session.redirect = '';
            request.session.state = '';

            saveTicket(request, ticket);
            response.redirect(redirect);
        }
    });

    ...
}</code></pre>

	The access token value is _not_ passed back to the client. Instead, the `saveTicket()` function saves it to the session state.

	<pre><code class="language-javascript">function saveTicket(request, ticket) {
    request.session.ticket = ticket;
    request.session.expires = (new Date().getTime() + (1000 &#42; ticket.expires_in));
}</code></pre>

## Retrieve constituent data

The response redirects users to the home page and AppController. The AppController verifies that users are logged in through calls to the web server's `/auth/authenticated` endpoint. After verification, calls are made to the web server's `api/constituents/280`.

<pre><code class="language-javascript">angular.module('AuthCodeFlowTutorial', [])
.controller('AppController', function ($scope, $http, $window) {

    //  Checks the user access token.

    $http.get('/auth/authenticated').then(function (res) {
        $scope.isAuthenticated = res.data.authenticated;
        if ($scope.isAuthenticated === false) {
            $scope.isReady = true;
            return;
        }

        //  Access token is valid. Fetch constituent record.

        $http.get('/api/constituents/280').then(function (res) {
            $scope.constituent = res.data;
            $scope.isReady = true;
        });
    });</code></pre>

<ul>
  <li>Open **/server/libs/sky.js** and **/server/routes/api.js**.</li>
  <li>
    <p>The route in the app's main **index.js** file directs the request to the `getConstituent()` function in **/server/libs/sky.js**. The call is passed along to **/server/routes/api.js**, which interacts directly with {{ stache.config.product_name_short }} endpoints.  Eventually the call makes its way to the `proxy()` function. Here, we can see the use of the `bb-api-subscription-key` and `Authorization` request headers:</p>
    <pre><code class="language-javascript">function proxy(request, method, endpoint, body, callback) {
    var options = {
        json: true,
        method: method,
        body: body,
        url: '{{ stache.config.resource_url }}/v1/'' + endpoint,
        headers: {
            'bb-api-subscription-key': process.env.AUTH_SUBSCRIPTION_KEY,
            'Authorization': 'Bearer ' + request.session.ticket.access_token
        }
    };

    promise(options)
        .then(callback)
        .catch(function (err) {
            console.log('Proxy Error: ', err);
        });
}</code></pre>
    <p>The `bb-api-subscription-key` value represents your Blackbaud developer account's approved subscription to an API product. You can use your account's **Primary key** or **Secondary key**. The `Authorization` value represents your authorization to use the API. The `Authorization` header starts with `Bearer` followed by a space and then the value for the access token.</p>
  	<p>A call to the  [Constituent (Get) endpoint]({{ stache.config.portal_endpoints_constituent_get }}) retrieves constituent data and sends it back to the browser.</p>
    <pre><code class="language-javascript">    
function get(request, endpoint, callback) {
    return proxy(request, 'GET', endpoint, '', callback);
}</code></pre>
    <p>The code is marries the constituent data to an <a href="https://angularjs.org/">AngularJS</a> template in our **ui/app/main-template.html** view and renders it in a <a href="http://getbootstrap.com/css/#tables" target="blank">Bootstrap table</a>.</p>
    <pre><code class="language-markup" ng-non-bindable>&lt;div ng-if="isAuthenticated">
  &lt;h3>Constituent: \{{ constituent.name }}&lt;/h3>
  &lt;p>
    See &lt;a href="https://developer.sky.blackbaud.com/contract-reference#Constituent" target="_blank">Constituent&lt;/a>
    within the SKY API contact reference for a full listing of properties.
  &lt;/p>
  &lt;div class="table-responsive">
    &lt;table class="table table-striped table-hover">
      &lt;thead>
        &lt;tr>
          &lt;th>Name&lt;/th>
          &lt;th>Value&lt;/th>
        &lt;/tr>
      &lt;/thead>
      &lt;tbody>
        &lt;tr>
          &lt;td>id&lt;/td>
          &lt;td>\{{ constituent.id }}&lt;/td>
        &lt;/tr>
        &lt;tr>
          &lt;td>type&lt;/td>
          &lt;td>\{{ constituent.type }}&lt;/td>
        &lt;/tr>
        &lt;tr>
          &lt;td>lookup_id&lt;/td>
          &lt;td>\{{ constituent.lookup_id }}&lt;/td>
        &lt;/tr>
        &lt;tr>
          &lt;td>first&lt;/td>
          &lt;td>\{{ constituent.first }}&lt;/td>
        &lt;/tr>
        &lt;tr>
          &lt;td>last&lt;/td>
          &lt;td>\{{ constituent.last }}&lt;/td>
        &lt;/tr>
      &lt;/tbody>
    &lt;/table>
  &lt;/div>
  &lt;a href="/auth/logout" class="btn btn-primary">Log out&lt;/a>
&lt;/div></code></pre>
    <p>![GET Constituent][auth-tutorial-getconstituent]</p>
  </li>
</ul>

##Summary

<p>You should now have a fully functioning application using implicit-flow.  Users of your app should be able to log in with their Blackbaud credentials, authorize the app, and get constituent data after they are authenticated.</p>

 Be sure to take a look at our other [code samples]({{ stache.config.guide_code }}).
 You can [create an issue]({{ stache.config.github_repo_web_api_authorization }}issues) to report a bug or request a feature for this code sample.
 For all other feature requests, see [ideas]({{ stache.config.support_ideas }}).

[auth-tutorial-appkeys]: /assets/img/auth_tutorial_appkeys.jpg
[auth-tutorial-helloworld]: /assets/img/auth_helloworld.jpg
[auth-tutorial-starthelloworld]: /assets/img/auth_starthelloworld.jpg
[auth-tutorial-startapp]: /assets/img/auth_tutorial_startapp.png

[auth-tutorial-login]: /assets/img/auth_tutorial_login.png
[auth-tutorial-authorize]: /assets/img/auth_tutorial_authorize.png
[auth-tutorial-getconstituent]: /assets/img/auth_tutorial_GETConstituent.png

