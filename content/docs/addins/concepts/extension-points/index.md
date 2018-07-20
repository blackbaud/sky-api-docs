---
layout: layout-sidebar
name: Extension points
order: 10
published: true
showInNav: true
back_to_top: true
title: Extension points
---
{{ include stache.config.partial_header_edit }}

# {{ name }}

Each location within the Blackbaud application user interface that can be customized is known as an **extension point**.  

The extension point represents a named location in the product where add-ins can be rendered, and it defines both the "class" of add-in (tile, button, tab, etc.), as well as the shape of the context values that will be provided at runtime. The set of extension points is expected to start small and expand over time based on priority.

<bb-alert alertType="info">
Each extension point defines its own "context", which represents the initial set of values that will be made available at runtime.  The context represents a contract with consumers (and thus it will be backwards compatible with future changes).
</bb-alert>

For example, the <stache-code>Constituent Tile Dashboard</stache-code> defines the context as containing a `recordId` property representing the system record ID of the current constituent.  This means that, for constituent tiles, the following JSON shape will be made available through the context object at runtime:

```json
{
  "recordId": "280"
}
```

Additional contextual information about the current record can be obtained through SKY API as needed based on the initial set of context values.

The following extension points have been defined:

todo: improve this presentation

### Constituent

<div class="table-responsive">
  <table class="table table-striped table-hover">
    <thead>
      <tr>
        <th>Extension point</th>
        <th>Notes</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Constituent Tile Dashboard</td>
        <td>
          <div>Tile dashboard on the constituent record page</div>
          <div>The context object will contain the following properties:</div>
          <div>`recordId` - The system record ID of the current constituent</div>
        </td>
      </tr>
    </tbody>
  </table>
</div>

### Payables

<div class="table-responsive">
  <table class="table table-striped table-hover">
    <thead>
      <tr>
        <th>Extension point</th>
        <th>Notes</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Invoice Tile Dashboard</td>
        <td>
          <div>Tile dashboard on the invoice record page</div>
          <div>The context object will contain the following properties:</div>
          <div>`recordId` - The system record ID of the current invoice</div>
        </td>
      </tr>
      <tr>
        <td>Vendor Tile Dashboard</td>
        <td>
          <div>Tile dashboard on the vendor record page</div>
          <div>The context object will contain the following properties:</div>
          <div>`recordId` - The system record ID of the current vendor</div>
        </td>
      </tr>
      <tr>
        <td>Purchase Order Tile Dashboard</td>
        <td>
          <div>Tile dashboard on the purchase order record page</div>
          <div>The context object will contain the following properties:</div>
          <div>`recordId` - The system record ID of the current purchase order</div>
        </td>
      </tr>
    </tbody>
  </table>
</div>

### General Ledger

<div class="table-responsive">
  <table class="table table-striped table-hover">
    <thead>
      <tr>
        <th>Extension point</th>
        <th>Notes</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Account Tile Dashboard</td>
        <td>
          <div>Tile dashboard on the purchase order record page</div>
          <div>The context object will contain the following properties:</div>
          <div>`recordId` - The system record ID of the current purchase order</div>
        </td>
      </tr>
      <tr>
        <td>Project Tile Dashboard</td>
        <td>
          <div>Tile dashboard on the project record page</div>
          <div>The context object will contain the following properties:</div>
          <div>`recordId` - The system record ID of the current project</div>
        </td>
      </tr>
      <tr>
        <td>Journal Entry Batch Tile Dashboard</td>
        <td>
          <div>Tile dashboard on the journal entry batch record page</div>
          <div>The context object will contain the following properties:</div>
          <div>`recordId` - The system record ID of the current journal entry batch</div>
        </td>
      </tr>
    </tbody>
  </table>
</div>

### Treasury

<div class="table-responsive">
  <table class="table table-striped table-hover">
    <thead>
      <tr>
        <th>Extension point</th>
        <th>Notes</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Bank Account Tile Dashboard</td>
        <td>
          <div>Tile dashboard on the bank account record page</div>
          <div>The context object will contain the following properties:</div>
          <div>`recordId` - The system record ID of the current bank account</div>
        </td>
      </tr>
    </tbody>
  </table>
</div>