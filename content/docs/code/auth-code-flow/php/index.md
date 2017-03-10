---
layout: layout-container
name: PHP
title: Authorization Code Flow - PHP
icon: fa fa-file-code-o
description: Learn how to create a PHP server-side app that utilizes the OAuth 2.0 Authorization Code Flow and retrieves constituent data from our <%= stache.config.product_name_short %>.
order: 4
showInNav: true
showBreadcrumbs: true
tutorial: true
redirectUrl: http://localhost:8888/auth/callback.php
---

{{ include stache.config.partial_header_comments }}{{ include stache.config.partial_header_edit }}

# Authorization Code Flow - PHP

<a class="btn btn-primary" href="{{ stache.config.github_repo_web_api_authorization_php }}" target="_blank"><i class="fa fa-github fa-lg"></i> GitHub</a>

## Overview

We use OAuth 2.0 to secure access to a user's {{ stache.config.product_name_short }} data. In this tutorial we obtain user authorization using the [Authorization Code Flow]({{ stache.config.guide_web_api_authorization_auth_code_flow }}). From the user's perspective, the user authenticates as a Blackbaud user with the normal credentials for Blackbaud NXT and then authorizes (or denies) your application. To accomplish this, your application obtains an authorization code from the {{ stache.config.authorization_service_name }}. The authorization code is then exchanged for an access token that signs requests to the {{ stache.config.product_name_short }} on behalf of the user. The exchange involves your registered application's **{{ stache.config.guide_apps_client_secret_name }}**. For security reasons, the exchange is done through direct server-to-server communication. For this reason, we use [PHP](https://secure.php.net/) on the server.

In this tutorial, we will accomplish the following tasks:

- Ensure that you signed up for a developer account and obtained your subscription to an API product.
- Register an application with {{ stache.config.product_name_short }}.
- Obtain authorization to access user data for a specific tenant.
- Retrieve data from a {{ stache.config.api_type_name }} endpoint.

For this tutorial, we strip down the user interface to highlight the Authorization Code Flow. Our [Barkbaud code sample]({{ stache.config.guide_code }}) provides a rich user interface using <a href="http://skyux.developer.blackbaud.com/" target="blank">SKY UX</a>.

## Prerequisites
0. A server such as your local machine that is capable of running PHP.  We recommend [MAMP](https://www.mamp.info/en/).
0. Familiarity using a command line interface (CLI) such as Terminal or Windows Command Prompt.
0. Sign up for a [GitHub](https://github.com) account, if you don't already have one. The source code for this tutorial is stored in GitHub repository.
0. Install [Git](https://git-scm.com/) and have the ability to clone or fork a repo.
0. A reliable Internet connection.

## Step 1 &mdash; Get Your Keys

If you have not already done so, complete the <a href="{{ stache.config.guide_getting_started }}">Getting Started guide</a>. The tutorial guides you through signing up for a Blackbaud developer account and requesting a subscription to an API product. After you are approved, your subscription contains a **Primary key** and **Secondary key**. You can use either key as the subscription key value for the `bb-api-subscription-key` request header in calls to the API.

### {{ stache.config.sandbox_name }} Tenant

After your subscription is approved, your developer account can access the {{ stache.config.sandbox_name }} tenant that represents a sample database. With this particular tenant, keep in mind that you share this sandbox with other developers. You can access the {{ stache.config.sandbox_name }} tenant and learn the various endpoints through the interactive {{ stache.config.dev_console_name }} within the <a href="{{ stache.config.portal_endpoints }}" target="_blank">API Reference</a>.

## Step 2 &mdash; Register Your App

{{ include 'includes/shared/nxt-web-api/registering-your-app/index.md' }}


## Step 3 &mdash; Grab the Source Code

The <a href="{{ stache.config.github_repo_web_api_authorization_php }}" target="_blank">sky-api-tutorial-auth-code-php</a> repo on GitHub provides a starter project to work through the Authorization Code Flow.

Use a command prompt to clone the `sky-api-tutorial-auth-code-php` repo which creates a working directory by the same name that contains the code for the tutorial:

	<pre><code class="language-git">$ git clone https://github.com/blackbaud/sky-api-tutorial-auth-code-php.git</code></pre>

## Step 4 &mdash; Prepare Your Environment

<ol>
	<li>Open the **sky-api-tutorial-auth-code-php** working directory and copy the configuration file **config.php.sample** as **config.php**. The **config.php** file contains the application's environment variables for the PHP environment.</li>
	<li>
	  <p>Update **config.php** with the following values:</p>
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
            For this tutorial, enter `{{ redirectUrl }}`. <br>
	        </td>
	      </tr>
	      <tr>
	        <td>**`AUTH_SUBSCRIPTION_KEY`**</td>
	        <td>
            Your Blackbaud Developer **Subscription Key**.<br>
            Use either the **Primary key** or **Secondary key**, visible on your [Blackbaud Developer Profile](https://developer.sky.blackbaud.com/developer).
	        </td>
	      </tr>
	    </table>
	  </div>
	</li>
	<li>Save the config file.</li>
	<li>Review the **.gitignore** file. The purpose of the file is to specify the untracked files to ignore. Note that **config.php** file is ignored. This prevents the config file from being synced to GitHub and protects your registered application's keys and other sensitive data from being exposed.</li>
</ol>

## Step 5 &mdash; Install and Configure MAMP

After you have your subscription key, {{ stache.config.guide_apps_client_id_name }}, {{ stache.config.guide_apps_client_secret_name }}, and the <a href="{{ stache.config.github_repo_web_api_authorization_php }}" target="_blank">sky-api-auth-tutorial-php</a> source code, It's time to establish your development environment. Since we are using the [Authorization Code Flow]({{ stache.config.guide_web_api_authorization_auth_code_flow }}), we need to use a server-side software platform. For this tutorial, we will use PHP with [MAMP](https://www.mamp.info/en/) to serve the project locally.

0. Download and install <a href="https://www.mamp.info/en/" target="blank">MAMP</a>.
0. Launch MAMP and edit the following in **`Preferences`**.

  <div class="table-responsive">
    <table class="table table-striped table-hover">
      <thead> 
        <tr>
          <th>Tab</th>
          <th>Field</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>**`Web Server`**</td>
          <td>**`Document Root`**</td>
          <td>Change this path to point at your cloned **`sky-api-tutorial-auth-code-php`** directory.</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div>![MAMP Document Root](/assets/img/auth_tutorial_mamp.png "Document Root settings in MAMP")</div>
0. Select `Ok` and `Start Servers`.
0. In a Web browser, navigate to <a href="http://localhost:8888" target="blank">localhost:8888</a>. The Web server displays our app.

## Application Starting Point

<ol>
<li>Open the **index.html** file. MAMP serves this file as our applications root where we initialize our app and load assets to build our page.</li>

<li>The `body` tag includes an attribute named `ng-app`. The front-end of our application uses <a href="https://angularjs.org/">AngularJS</a> to interact with our PHP server. 
</li>
    <pre><code class="language-markup">&lt;!-- INITIALIZE THE APP -->
    &lt;body ng-app="AuthCodeFlowTutorial">
        &lt;div class="container" ng-controller="ConstituentCtrl" ng-cloak>
        ... </code></pre>

<li>
    <p>Open your browser to <a href="http://localhost:8888" target="http://localhost:8888">http://localhost:8888</a> to request the Home page. When the front page loads, the AngularJS on the Home page (**/Views/Shared/_Layout.cshtml**) makes a request to the `/auth/authenticated.php` endpoint:</p>
<pre><code class="language-javascript">(function (angular) {
  'use strict';

  angular.module('AuthCodeFlowTutorial', [])
    .controller('ConstituentCtrl', function ($scope, $http, $window) {

      // Check user access token.
      $http.get('/auth/authenticated.php').then(function (res) {
        $scope.isAuthenticated = res.data.authenticated;
        if ($scope.isAuthenticated === false) {
          $scope.isReady = true;
          return;
        }
        ...</code></pre>
    <p>The call to the endpoint routes to the corresponding php page (**/auth/authenticated.php**) and returns a Boolean representing the current user's authentication status.  First, it requires and loads the **/includes/blackbaud/blackbuad.php** file.</p>
<pre><code class="language-php">&lt;?php
    require_once '../includes/blackbaud/blackbaud.php';

    echo json_encode(array(
    'authenticated' => blackbaud\Session::isAuthenticated()
    ));
        ...</code></pre>
</li>
<li>
    <p>Open the **/includes/blackbaud/blackbaud.php** file. The PHP code pulls in the rest of our required controllers, config environment variables, and http library for making API requests.  We can see `**require_once 'session.php';**` pulls in the **includes/blackbaud/session.php** file.</p>
<pre>
    <code class="language-php">&lt;?php
    // Error reporting, for development only.
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);

    require_once 'session.php';
    require_once join(DIRECTORY_SEPARATOR, array($_SERVER['DOCUMENT_ROOT'], 'config.php'));
    require_once join(DIRECTORY_SEPARATOR, array('api', 'constituents.php'));
    require_once 'auth.php';
    require_once 'http.php';
        ...</code></pre>
</li>
<li>
    <p>Open the **/includes/blackbaud/session.php** file.  It begins by defining our **namespace blackbaud**, allowing the methods and variables defined beneath it to be accessed by any other classes also under that namespace.  Our original call to `/auth/authenticated/`  made use of the `isAuthenticated()` method in this Session object.  This method checks for the existance of a PHP `$_SESSION` object and looks for an `access_token`. If the application has not yet been authorized by the end user, then `IsAuthenticated()` will return `false`.</p>
    
<pre><code class="language-php">&lt;?php
    public static function isAuthenticated() {
    return isset($_SESSION[self::$tokenName]) && isset($_SESSION[self::$tokenName]['access_token']);
    }
        ...</code></pre>
</li>
</ol>

## Display the Log in button
<ol>
<li><p>If the user is not authenticated, a **Log in** button is displayed.</p>
<p class="alert alert-info"><strong><em>Note:</em></strong> The browser may display a warning that the connection is not private. For this tutorial, you can ignore this message. To proceed, select <strong>Show advanced</strong> and then select <strong>Proceed to localhost (unsafe)</strong>.</p>
![Login](/assets/img/auth_tutorial_login_php.png "Log in")</li>
<li><p>Open the **Views/Shared/_Layout.cshtml** file. Notice that the `body` tag includes an attribute named `ng-app`. The front-end of our application uses AngularJS to interact with our Web server routes. The `div.container` element includes an attribute named `ng-controller` which references an AngularJS controller to handle the model data.</p>
<pre><code class="language-markup">&lt;body ng-app="AuthCodeFlowTutorial">
  &lt;div class="container" ng-controller="ConstituentCtrl" ng-cloak>
    ...</code></pre></li>
<li><p>When the Home page first loads the app will not have received authorization from the user to access their SKY API data. As a result the `isAuthenticated` scope variable will be `false` and the Home page's Angular HTML template displays the **Log in** button.</p>
<pre><code class="language-markup">&lt;div ng-if="!isAuthenticated">
	&lt;a href="/auth/login" class="btn btn-primary">Log in&lt;/a>
&lt;/div>
...</code></pre></li>
</ol>

## Obtain an Access Token
<ol>
<li>Open **/includes/blackbaud/auth.php**.</li>
<li><p>When the user selects the **Log in** button, a call is made to `auth/login.php`, which redirects the request to `/includes/blackbaud/auth.php` file. Here, the `redirect()` method is called, which redirects the browser to SKY API’s authorization endpoint to start the authentication and authorization process. The user must authenticate with their Blackbaud credentials (if they are not already signed in) and authorize your application to access their SKY API data.</p>
<pre><code class="language-php">&lt;?php
class Auth {
  public static function redirect() {
    $auth_uri = self::getAuthorizationUri();
    header("Location: $auth_uri", true, 301);
    exit();
  }
    ...
  private static function getAuthorizationUri() {
    return AUTH_BASE_URI . 'authorization?' . 
      http_build_query(array(
        'client_id'=> AUTH_CLIENT_ID,
        'response_type' => 'code',
        'redirect_uri' => AUTH_REDIRECT_URI
      ));
  }
    ...</code></pre></li>
<li><p>Once authorized, SKY API redirects the user back to the `/auth/callback.php` URI with an authorization code. Once an authorization code has been obtained, it exchanges the code for an access token.  The app is then redirected back to the Home page.</p>
<pre><code class="language-php">&lt;?php
require_once '../includes/blackbaud/blackbaud.php';

blackbaud\Auth::exchangeCodeForAccessToken($_GET['code']);

header('Location: /');
exit();

    ...
// build out the request body with the code from the redirect URI, and call the fetchTokens() method, passing the newly made $body array.
public static function exchangeCodeForAccessToken($code = 0) {
$body = array(
    'code' => $code,
    'grant_type' => 'authorization_code',
    'redirect_uri' => AUTH_REDIRECT_URI
);
return self::fetchTokens($body);
}
    ...
// build out the appropriate token headers, and make the reqeust to the SKY API endpoint.   Grab the returned JSON response and
// store the tokens in the Session.
private static function fetchTokens($body = array()) {
$headers = array(
    'Content-type: application/x-www-form-urlencoded',
    'Authorization: Basic ' . base64_encode(AUTH_CLIENT_ID . ':' . AUTH_CLIENT_SECRET)
);

$url = AUTH_BASE_URI . 'token';

$response = Http::post($url, $body, $headers);
$token = json_decode($response, true);
Session::setToken($token);
return $response;
}
</code></pre></li>
</ol>

## Retrieve Constituent Data
<ol>
<li>Open the **index.html** file.</li>
<li><p>AngularJS again makes the request to `auth/authenticated`, which now returns `true`. Since the user is authorized, AngularJS then makes a request the application’s constituent API endpoint `/api/constituents.php?id=280` to retrieve a constituent record.</p>
<pre><code class="language-javascript">angular.module('AuthCodeFlowTutorial', [])
	.controller('ConstituentCtrl', function ($scope, $http, $watch) {

       // Check user access token.
        $http.get('/auth/authenticated.php').then(res => {
          $scope.isAuthenticated = res.data.authenticated;
          if ($scope.isAuthenticated === false) {
            $scope.isReady = true;
            return;
          }

          // Access token is valid. Fetch constituent record.
          $http.get('/api/constituents.php?id=280').then(res => {
            $scope.constituent = res.data.constituent;
            $scope.isReady = true;
          });
        });
	    ...</code></pre>
</li>
 <li>Open **api/constituents.php** and **includes/blackbaud/api/constituents.php**.</li>
  <li>
    <p>The get request in **index.html** file directs the request to **api/constituents.php**, where the access token is refreshed and the call is passed along to **/includes/blackbaud/api/constituents.php** with the id from the route param `?id=280` that we passed into the request.</p> 
    <pre><code class="language-php">&lt;?php
    ...
   $response = blackbaud\Auth::refreshAccessToken();
    $token = json_decode($response, true);
    if (!isset($token['access_token'])) {
      echo json_encode($token);
      return;
    }
    $data = blackbaud\Constituents::getById($_GET['id']);
    ...</code></pre>
    
    <p>
        The `getById()` method interacts directly with the SKY API endpoints making a `get` request to the `https://api.sky.blackbaud.com/constituent/v1/constituents/280` endpoint and passing in the required `headers`.
    </p>
    <pre><code class="language-php">&lt;?php
    ...
        self::$headers = array(
        'bb-api-subscription-key: ' . AUTH_SUBSCRIPTION_KEY,
        'Authorization: Bearer ' . Session::getAccessToken(),
        'Content-type: application/x-www-form-urlencoded'
        );
        self::$baseUri = SKY_API_BASE_URI . 'constituent/v1/';
    }

    public static function getById($id = 0) {
        $url = self::$baseUri . 'constituents/' . $id;
        $response = Http::get($url, self::$headers);
        return json_decode($response, true);
    }
    ...</code></pre>

    <p>The `bb-api-subscription-key` value represents your Blackbaud developer account's approved subscription to an API product. You can use your account's **Primary key** or **Secondary key**. The `Authorization` value represents your authorization to use the API. The `Authorization` header starts with `Bearer` followed by a space and then the value for the access token.</p>
  	<p>A call to the  [Constituent (Get) endpoint]({{ stache.config.portal_endpoints_constituent_get }}) retrieves constituent data and sends it back to the browser.</p>
    <pre><code class="language-javascript">    
function get(request, endpoint, callback) {
    return proxy(request, 'GET', endpoint, '', callback);
}</code></pre>
    <p>The data is returned as JSON to the browser where the model's data is projected through the view of the Angular template.</p>
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
<li>Once the constituent information is retrieved and added to the front page, **Log Out** and **Refresh Access Token** buttons are displayed.</li>
<li>Open **/auth/logout.php** and **includes/blackbaud/session.php**.</li>
<li>If the user selects **Log Out**, they are redirected to **/auth/logout.php**, which calls the `blackbaud\Session::logout()` in **includes/blackaud/session.php**. The `logout()` method destroys the token stored in the PHP server's `$_SESSION`.</li>
    <pre><code class="language-php">&lt;?php
    ...
    public static function logout() {
      unset($_SESSION[self::$tokenName]);
    }
    ...</code></pre>

<li>If the user selects **Refresh Access Token**, AngularJS makes a request to **/auth/refresh-token.php**. The call is passed to the `refreshAccessToken()` method in **includes/blackbaud/auth.php**, which builds out the request body with the required fields.  The `grant_type` is set to `refresh_token` and the `refresh_token` field is populated with the **refresh_token** we have stored in the `$_SESSION`. This body is then passed to the `fetchTokens()` method where the `post` to the SKY API endpoint is made.</li>

  <pre><code class="language-php">&lt;?php
  ...
  public static function refreshAccessToken() {
    $body = array(
      'grant_type' => 'refresh_token',
      'refresh_token' => Session::getRefreshToken()
    );
    return self::fetchTokens($body);
  }
  ...
    private static function fetchTokens($body = array()) {
    $headers = array(
      'Content-type: application/x-www-form-urlencoded',
      'Authorization: Basic ' . base64_encode(AUTH_CLIENT_ID . ':' . AUTH_CLIENT_SECRET)
    );

    $url = AUTH_BASE_URI . 'token';

    $response = Http::post($url, $body, $headers);
    $token = json_decode($response, true);
    Session::setToken($token);
    return $response;
  }
  ...
  </code></pre>

  <p>
    The `JSON` response from SKY API is then parsed, the new set of tokens are stored in our `$_SESSION`, and the data is sent back to Angular to be displayed on the page for your reference.
  </p>
</ol>

That's it!

- Be sure to take a look at our other [code samples]({{ stache.config.guide_code }}).
- You can [create an issue]({{ stache.config.github_repo_web_api_authorization_php }}issues) to report a bug or request a feature for this code sample.  For all other feature requests, see [ideas]({{ stache.config.support_ideas }}).

[auth-tutorial-getconstituent]: /assets/img/auth_tutorial_GETConstituent.png


{{ include stache.config.partial_disqus }}