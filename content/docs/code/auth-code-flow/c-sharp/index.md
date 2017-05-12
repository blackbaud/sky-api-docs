---
layout: layout-container
name: C# .NET Core
title: Authorization Code Flow - C# .NET Core
icon: fa fa-fw fa-3x fa-windows
description: Learn how to create a .NET Core MVC C# server-side app that utilizes the OAuth 2.0 Authorization Code Flow and retrieves constituent data from our <%= stache.config.product_name_short %>.
order: 1
published: true
showInNav: true
showBreadcrumbs: true
tutorial: true
back_to_top: true
redirectUrl: http://localhost:5000/auth/callback
---

{{ include stache.config.partial_header_comments }}{{ include stache.config.partial_header_edit }}

# Authorization Code Flow - C&#35; .NET Core

<a class="btn btn-primary" href="{{ stache.config.github_repo_web_api_authorization_c_sharp }}" target="_blank"><i class="fa fa-github fa-lg"></i> GitHub</a>
<a class="btn btn-default" href="{{ stache.config.tutorial_auth_code_flow_dotnet_live_demo }}" target="_blank"><i class="fa fa-lg fa-globe"></i> Live Demo</a>

## Overview

We use OAuth 2.0 to secure access to a user's {{ stache.config.product_name_short }} data. In this tutorial we obtain user authorization using the [Authorization Code Flow]({{ stache.config.guide_web_api_authorization_auth_code_flow }}). From the user's perspective, the user authenticates as a Blackbaud user with the normal credentials for Blackbaud NXT and then authorizes (or denies) your application. To accomplish this, your application obtains an authorization code from the {{ stache.config.authorization_service_name }}. The authorization code is then exchanged for an access token that signs requests to the {{ stache.config.product_name_short }} on behalf of the user. The exchange involves your registered application's **{{ stache.config.guide_apps_client_secret_name }}**. For security reasons, the exchange is done through direct server-to-server communication. For this reason, we use [ASP.NET Core](https://blogs.msdn.microsoft.com/webdev/2016/05/16/announcing-asp-net-core-rc2/) for the server-side platform and C&#35;.

In this tutorial, we will accomplish the following tasks:

- Ensure that you signed up for a developer account and obtained your subscription to an API product.
- Register an application with {{ stache.config.product_name_short }}.
- Obtain authorization to access user data for a specific tenant.
- Retrieve data from a {{ stache.config.api_type_name }} endpoint.

For this tutorial, we strip down the user interface to highlight the Authorization Code Flow. Our [Barkbaud code sample]({{ stache.config.guide_code }}) provides a rich user interface using <a href="http://skyux.developer.blackbaud.com/" target="blank">SKY UX</a>.

## Prerequisites
0. Since we are using the [Authorization Code Flow]({{ stache.config.guide_web_api_authorization_auth_code_flow }}), we need to use a server-side software platform, such as .NET Core. You will need to [Download and install](https://www.microsoft.com/net/core) .NET Core
0. Familiarity using a command line interface (CLI) such as Terminal or Windows Command Prompt.
0. Sign up for a [GitHub](https://github.com) account, if you don't already have one. The source code for this tutorial is stored in GitHub repository.
0. Install [Git](https://git-scm.com/) and have the ability to clone or fork a repo.
0. A reliable Internet connection.

## Step 1 &mdash; Get Your Keys

If you have not already done so, complete the <a href="{{ stache.config.guide_getting_started }}">Getting Started guide</a>. The tutorial guides you through signing up for a Blackbaud developer account and requesting a subscription to an API product. After you are approved, your subscription contains a **Primary key** and **Secondary key**. You can use either key as the subscription key value for the `bb-api-subscription-key` request header in calls to the API.

### {{ stache.config.sandbox_name }} Tenant

After your subscription is approved, your developer account can access the {{ stache.config.sandbox_name }} tenant that represents a sample database. With this particular tenant, keep in mind that you share this sandbox with other developers. You can access the {{ stache.config.sandbox_name }} tenant and learn the various endpoints through the interactive {{ stache.config.dev_console_name }} within the <a href="{{ stache.config.portal_endpoints }}" target="_blank">API Reference</a>.

## Step 2 &mdash; Register Your App

{{ include 'includes/createapp/registerapp.md' }}

{{ include 'includes/createapp/credentials.md' }}

## Step 3 &mdash; Grab the Source Code

The <a href="{{ stache.config.github_repo_web_api_authorization_c_sharp }}" target="_blank">sky-api-auth-tutorial-c-sharp</a> repo on GitHub provides a starter project to work through the Authorization Code Flow.

- Use a command prompt to clone the `sky-api-auth-tutorial-c-sharp` repo which creates a working directory by the same name that contains the code for the tutorial:

	<pre><code class="language-git">$ git clone https://github.com/blackbaud/sky-api-auth-tutorial-c-sharp.git</code></pre>

## Step 4 &mdash; Prepare Your Environment

Let's explore some application settings files and prep your environment variables.

- Open the **sky-api-auth-tutorial-c-sharp** working directory.
- Open the **appsettings.json** which details generic properties to be used by the application. Take note of the following SKY API URI property values:

	<div class="table-responsive">
			<table class="table table-striped table-condensed">
				<tr>
					<td>**`AuthBaseUri`**</td>
					<td>URI to the Authorization Service.</td>
				</tr>
				<tr>
					<td>**`SkyApiBaseUri`**</td>
					<td>URI to the SKY API Endpoints.</td>
				</tr>
			</table>
		</div>

- For local development, duplicate the file **appsettings.json-sample**, renaming it to **appsettings.Development.json**.   The **appsettings.Development.json** file contains your registered application's environment variables.  Note that private properties, such as your **{{ stache.config.guide_apps_client_id_name }}** and **{{ stache.config.guide_apps_client_secret_name }}**, are stored in this file. For security, the **appsettings.Development.json** is excluded from being syncronized with GitHub via the file  <a href="https://github.com/blackbaud/sky-api-auth-tutorial-c-sharp/blob/master/.gitignore" target="_blank"><strong>.gitignore</strong></a>.

	At run time, the application will merge these properties into the available environment variables.   In .NET Core, the Startup class, **Startup.cs** provides the entry point for an application, and is required for all applications. This class configures the application and sets up the required middleware.

	<pre><code class="language-json">{
	"AppSettings": {
		"AuthClientId": "",
		"AuthClientSecret": "",
		"AuthRedirectUri": "http://localhost:5000/auth/callback",
		"AuthSubscriptionKey": ""
	}
}</code></pre>

- Using the values from your registered application and the subscription key from your Blackbaud Developer Profile, update **appsettings.Development.json** with the following values.  All values are required.:

	<div class="table-responsive">
    <table class="table table-striped table-condensed">
			<tr>
			<td>**`AuthClientId`**</td>
        <td>
          Your registered application's **Application ID**.
        </td>
			</tr>
      <tr>
        <td>**`AuthClientSecret`**</td>
        <td>
          Your registered application's **{{ stache.config.guide_apps_client_secret_name }}**.
        </td>
      </tr>
      <tr>
        <td>**`AuthRedirectUri`**</td>
        <td>
          One of your registered application's **Redirect URIs**.<br>
          For this tutorial, we will use `http://localhost:5000/auth/callback`.
        </td>
      </tr>
      <tr>
        <td>**`AuthSubscriptionKey`**</td>
        <td>
          Your Blackbaud Developer **Subscription Key**.<br>
					Use either the **Primary key** or **Secondary key**, visible on your <a href="https://developer.sky.blackbaud.com/developer" target="_blank">Blackbaud Developer Profile</a>.
        </td>
      </tr>
    </table>
  </div>

- Save the file.

## Step 5 &mdash; Run the Application

- Using Command Prompt/Terminal/bash prompt, ensure you are in the working directory.
- Open and review the **project.json** file.  This file details the application’s dependencies. These NuGet modules (project dependencies) are installed when issuing the  `dotnet restore` command within Command Prompt/Terminal/bash prompt.
- On a Mac, issue the following commands to restore the packages specified in the **project.json** file and run the actual sample:

	```
$  dotnet restore
$  export ASPNETCORE_ENVIRONMENT=Development && dotnet run
	```

	On a PC, type:

	```
$  dotnet restore
$  set ASPNETCORE_ENVIRONMENT=Development && dotnet run
	```

- Visit [http://localhost:5000/](http://localhost:5000/) to view your locally running application.

## Application Starting Point
<ul>
<li>IIS is used as the webserver.  An ASP.NET Core Module configured in **project.json** is used to list dependencies and configure IIS to launch and host your application.</li>
<li>Open the **Program.cs** file. The `Main()` method is the starting point of our application. It is responsible for initializing the application. We use `WebHostBuilder` to listen on a particular IP address and port:  `http://localhost:5000/`. As of RC2 an ASP.NET Core application is a .NET Core Console application that calls into ASP.NET specific libraries.  This code runs on the server-side and is _not_ visible to the application user. Running the code server-side helps to protect your **{{ stache.config.guide_apps_client_secret_name }}**.</li>
<li><pre><code class="language-csharp">using System.IO;
using Microsoft.AspNetCore.Hosting;

namespace Blackbaud.AuthCodeFlowTutorial
{
	public class Program
	{
		public static void Main(string[] args)
		{
			var host = new WebHostBuilder()
				.UseKestrel()
				.UseContentRoot(Directory.GetCurrentDirectory())
				.UseIISIntegration()
				.UseStartup<Startup>()
				.Build();
			host.Run();
		}
	}
}</code></pre></li>
<li><p>Open your browser to <a href="http://localhost:5000/" target="http://localhost:5000/">http://localhost:5000/</a> to request the Home page. When the front page loads, the AngularJS on the Home page (**/Views/Shared/_Layout.cshtml**) makes a request to the `/auth/authenticated` endpoint:</p>
<pre><code class="language-javascript">(function (angular) {
  'use strict';

  angular.module('AuthCodeFlowTutorial', [])
    .controller('ConstituentCtrl', function ($scope, $http) {

      // Check user access token.
      $http.get('/auth/authenticated').then(function (res) {
        $scope.isAuthenticated = res.data.authenticated;
        if ($scope.isAuthenticated === false) {
          $scope.isReady = true;
          return;
        }
	...</code></pre>
<p>The call to the endpoint routes to the corresponding controller (**/Controllers/AuthenticationController.cs**) and returns a Boolean representing the current user's authentication status.  If the application has not yet been authorized by the end user, then `IsAuthenticated()` will return `false`.</p>
<pre><code class="language-csharp">[HttpGet("authenticated")]
public ActionResult Authenticated()
{
	return Json(new {
		authenticated = _authService.IsAuthenticated()
	});
}
...</code></pre>
</li>
</ul>

## Displaying the Log in button
<ul>
<li><p>If the user is not authenticated, a **Log in** button is displayed.</p>
<p class="alert alert-info"><strong><em>Note:</em></strong> The browser may display a warning that the connection is not private. For this tutorial, you can ignore this message. To proceed, click <strong>Show advanced</strong> and then click <strong>Proceed to localhost (unsafe)</strong>.</p>
![Login](/assets/img/auth_tutorial_login_c_sharp.png "Log in")</li>
<li><p>Open the **Views/Shared/_Layout.cshtml** file. Notice that the `body` tag includes an attribute named `ng-app`. The front-end of our application uses AngularJS to interact with our Web server routes. The `div.container` element includes an attribute named `ng-controller` which references an AngularJS controller to handle the model data.</p>
<pre><code class="language-markup">&lt;body ng-app="AuthCodeFlowTutorial">
  &lt;div class="container" ng-controller="ConstituentCtrl" ng-cloak>
    ...</code></pre></li>
<li><p>When the Home page first loads the app will not have received authorization from the user to access their SKY API data. As a result the `isAuthenticated` scope variable will be `false` and the Home page's Angular HTML template displays the **Log in** button:</p>
<pre><code class="language-markup">&lt;div ng-if="!isAuthenticated">
	&lt;a href="/auth/login" class="btn btn-primary">Log in&lt;/a>
&lt;/div>
...</code></pre></li>
</ul>

## Obtain an Access Token
<ul>
<li>Open **/Controllers/AuthenticationController.cs**.</li>
<li><p>When the user clicks the **Log in** button, a call is made to `LogIn()` which redirects the browser to SKY API’s authorization endpoint to start the authentication and authorization process.  The user must authenticate with their Blackbaud credentials (if they are not already signed in) and authorize your application to access their SKY API data.</p>
<pre><code class="language-csharp">[HttpGet("login")]
public ActionResult LogIn()
{
	Uri address = _authService.GetAuthorizationUri();
	return Redirect(address.ToString());
}
...</code></pre></li>
<li><p>Once authorized, SKY API redirects the user back to the `/auth/callback` URI with an authorization code. Once an authorization code has been obtained, it is exchanged the code for an access token.  The app is then redirected back to the Home page.</p>
<pre><code class="language-csharp"> [HttpGet("callback")]
public ActionResult Callback()
{
	string code = Request.Query["code"];
	_authService.ExchangeCodeForAccessToken(code);
	return Redirect("/");
}
...</code></pre></li>
</ul>

## Retrieve Constituent Data
<ul>
<li>Open the Home page (**Views/Shared/_Layout.cshtml**).</li>
<li><p>AngularJS again makes the request to `auth/authenticated`, which now returns `true`. Since the user is authorized, AngularJS then makes a request the application’s constituent API endpoint `/api/constituents/280` to retrieve a constituent record:</p>
<pre><code class="language-javascript">angular.module('AuthCodeFlowTutorial', [])
	.controller('ConstituentCtrl', function ($scope, $http) {

		// Check user access token.
		$http.get('/auth/authenticated').then(function (res) {
			$scope.isAuthenticated = res.data.authenticated;
			if ($scope.isAuthenticated === false) {
				$scope.isReady = true;
				return;
			}

			// Access token is valid. Fetch constituent record.
			$http.get('/api/constituents/280').then(function (res) {
				$scope.constituent = res.data;
				$scope.isReady = true;
			});
		});
	...</code></pre>
</li>
<li><p>The data is returned as JSON to the Home page where the model's data is projected through the view of the HTML template:</p>
<pre><code class="language-markup" ng-non-bindable>&lt;div ng-if="isAuthenticated">
  &lt;h3>Constituent: {{ constituent.name }}&lt;/h3>
  &lt;p>
    See &lt;a href="{{ stache.config.constituent_entity_reference }}">Constituent&lt;/a>
    within the SKY API entity reference for a full listing of properties.
  &lt;/p>
  &lt;p ng-if="::constituent.error" ng-bind="::constituent.error" class="alert alert-danger">&lt;/p>
  &lt;div ng-if="::constituent.id" class="table-responsive">
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
...</code></pre>
![GET Constituent](/assets/img/auth_tutorial_GETConstituent.png "GET Constituent")
</li>
<li>Once the constituent information is retrieved and added to the front page, **Log Out** and **Refresh Access Token** buttons are displayed.</li>
<li>Open **/Controllers/AuthenticationController.cs**</li>
<li>If the user clicks **Log Out**, they are redirected to `/auth/logout` which destroys the access/refresh token stored in the browser’s session.</li>
<li>If the user clicks **Refresh Access Token**, AngularJS makes a request to `/auth/refresh-token`, which asks SKY API to return a refreshed access token, which is then stored in the browser’s session.</li>
</ul>

That's it!

- Be sure to take a look at our other [code samples]({{ stache.config.guide_code }}).
- Check out the [README]({{ stache.config.github_repo_web_api_authorization_c_sharp }}/blob/master/README.md) where you can view a live demo of the application hosted on Microsoft Azure.
- The README also contains instructions for deploying to Azure App Services rather than your local development environment.
- You can [create an issue]({{ stache.config.github_repo_web_api_authorization_c_sharp }}issues) to report a bug or request a feature for this code sample.  For all other feature requests, see [ideas]({{ stache.config.support_ideas }}).

{{ include stache.config.partial_disqus }}