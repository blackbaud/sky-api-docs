---
layout: layout-sidebar
name: Connecting to SKY API
order: 500
published: true
showInNav: true
title: Connecting to SKY API
---
{{ include stache.config.partial_header_edit }}

# {{ name }}






Connecting to SKY API
 
Todo:  
discuss the process of showing a button in the UI to handle initiating the SKY API OAuth flow
mention including envId in the authorization endpoint, to filter the environments shown to only the current environment
mention that for security reasons to prevent clickjacking the OAuth flow cannot be launched in the add-in’s iframe – it must be launched in a separate window (should be listed in the common issues section as well)
mention that the same technique can be used to OAuth into the 3rd-party system
 
Some simple functions (somewhat incomplete):
 
function connectToSkyApi() {
 
    var url = "/api/authorize" +
      "?token=" + userIdentityToken +
      "&envid=" + initialArgs.envId;
 
    var child = window.open(url, '_blank', 'toolbar=0,status=0,width=625,height=500');
    var timer = setInterval(checkChild, 500);
 
    function checkChild() {
      if (child.closed) {
        clearInterval(timer);
 
        loadTile();
      }
    }
  }
 
  function disconnectFromSkyApi() {
 
    $("#welcome").hide();
    $("#tileDetails").hide();
    $("#loading").show();
 
    client.getAuthToken().then((token) => {
      userIdentityToken = token;
 
      var dataToPost = {
        userIdentityToken: userIdentityToken
      };
 
      $.ajax({
        url: "/api/disconnect",
        type: "POST",
        data: dataToPost
      }).done(function (data) {
        loadTile();
      }).fail(function (status) {
        //$('#errorMessage').text(JSON.stringify(status));
      });
 
    });
 
  }