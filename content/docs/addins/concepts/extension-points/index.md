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

The extension point represents a named location in the product where add-ins can be rendered, and it defines both the "class" of add-in (tile, button, tab, etc.), as well as the shape of the context values that will be provided at runtime.  As described in the <a href="https://github.com/blackbaud/sky-addin-client" target="_new">SKY Addin Client library documentation</a>, the context values for the extension point are made available to add-ins as part of the `args` object sent to the `init` callback function:

```js
  // BBSkyAddinClient is global here.
  var client = new BBSkyAddinClient.AddinClient({
    callbacks: {
      init: (args) => {

        // the context values are provided as part of the args object
        context = args.context;

        // most extension points provide the current record ID
        currentRecordId = context.recordId;

        ...
      }
    }
  });
```

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

The following section describes the extension points that have been defined to date:

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
          <br />
          <p>The context object will contain the following properties:</p>
          <div class="table-responsive">
            <table class="table table-striped table-hover">
              <thead>
                <tr>
                  <th>Property</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>`recordId`</td>
                  <td>The system record ID of the current constituent</td>
                </tr>
              </tbody>
            </table>
          </div>
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
          <br />
          <p>The context object will contain the following properties:</p>
          <div class="table-responsive">
            <table class="table table-striped table-hover">
              <thead>
                <tr>
                  <th>Property</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>`recordId`</td>
                  <td>The system record ID of the current invoice</td>
                </tr>
              </tbody>
            </table>
          </div>
        </td>
      </tr>
      <tr>
        <td>Vendor Tile Dashboard</td>
        <td>
          <div>Tile dashboard on the vendor record page</div>
          <br />
          <p>The context object will contain the following properties:</p>
          <div class="table-responsive">
            <table class="table table-striped table-hover">
              <thead>
                <tr>
                  <th>Property</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>`recordId`</td>
                  <td>The system record ID of the current vendor</td>
                </tr>
              </tbody>
            </table>
          </div>
        </td>
      </tr>
      <tr>
        <td>Purchase Order Tile Dashboard</td>
        <td>
          <div>Tile dashboard on the purchase order record page</div>
          <br />
          <p>The context object will contain the following properties:</p>
          <div class="table-responsive">
            <table class="table table-striped table-hover">
              <thead>
                <tr>
                  <th>Property</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>`recordId`</td>
                  <td>The system record ID of the current purchase order</td>
                </tr>
              </tbody>
            </table>
          </div>
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
          <br />
          <p>The context object will contain the following properties:</p>
          <div class="table-responsive">
            <table class="table table-striped table-hover">
              <thead>
                <tr>
                  <th>Property</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>`recordId`</td>
                  <td>The system record ID of the current account</td>
                </tr>
              </tbody>
            </table>
          </div>
        </td>
      </tr>
      <tr>
        <td>Project Tile Dashboard</td>
        <td>
          <div>Tile dashboard on the project record page</div>
          <br />
          <p>The context object will contain the following properties:</p>
          <div class="table-responsive">
            <table class="table table-striped table-hover">
              <thead>
                <tr>
                  <th>Property</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>`recordId`</td>
                  <td>The system record ID of the current project</td>
                </tr>
              </tbody>
            </table>
          </div>
        </td>
      </tr>
      <tr>
        <td>Journal Entry Batch Tile Dashboard</td>
        <td>
          <div>Tile dashboard on the journal entry batch record page</div>
          <br />
          <p>The context object will contain the following properties:</p>
          <div class="table-responsive">
            <table class="table table-striped table-hover">
              <thead>
                <tr>
                  <th>Property</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>`recordId`</td>
                  <td>The system record ID of the current journal entry batch</td>
                </tr>
              </tbody>
            </table>
          </div>
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
          <br />
          <p>The context object will contain the following properties:</p>
          <div class="table-responsive">
            <table class="table table-striped table-hover">
              <thead>
                <tr>
                  <th>Property</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>`recordId`</td>
                  <td>The system record ID of the current bank account</td>
                </tr>
              </tbody>
            </table>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</div>