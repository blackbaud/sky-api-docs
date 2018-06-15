---
layout: layout-sidebar
name: Extension Points
order: 500
published: true
showInNav: true
title: Extension Points
---
{{ include stache.config.partial_header_edit }}

# {{ name }}

Each location within the Blackbaud application user interface that can be customized is known as an **extension point**.  

The extension point represents a named location in the product where add-ins can be rendered, and it defines both the "class" of add-in (tile, button, tab, etc.), as well as the shape of the context values that will be provided at runtime. The set of extension points is expected to start small and expand over time based on priority. The initial "class" of add-ins supported are custom tiles and custom "page-level" buttons.

<bb-alert alertType="info">
Each extension point will define its own "context", which represents the initial set of values that will be made available at runtime.  The context represents a contract with consumers and is subject to backwards compatibility logic.
</bb-alert>

For example, the <stache-code>Constituent Tile Dashboard</stache-code> defines the context as:

<code language-type="json">
      "context_properties": [
      {
          "name": "recordId",
          "description": "The system record ID of the current constituent"
      }
</code>

This means that, for constituent tiles, the following JSON shape will be made available through the context object at runtime:

    <code language-type="json">
      {
        "recordId": "280"
      }
    </code>

Keep in mind that the context values made available to add-ins for a given extension point potentially represent sensitive data.  So, while each extension point can in theory define its context to include several pieces of data, in practice teams defining extension points should consider limiting the information immediately available to only that which is needed.  Additional contextual information can be obtained through APIs as needed based on the initial set of context values.
